/**
 * Robust provider price scraper for WeightLossRankings.org
 *
 * Layer 1: Static HTML fetch + regex extraction (always runs)
 * Layer 2: Playwright headless browser fallback for JS-rendered sites
 *          (only used if Playwright is installed; gracefully skipped otherwise)
 * Layer 3: --auto-update flag to bump verification metadata (NEVER prices)
 *
 * Usage:
 *   npx tsx scripts/scrape-providers.ts                  # full run
 *   npx tsx scripts/scrape-providers.ts --no-browser     # static only
 *   npx tsx scripts/scrape-providers.ts --auto-update    # update metadata
 *   npx tsx scripts/scrape-providers.ts --limit 5        # smoke test
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// ---------------- types ----------------

interface PricingEntry {
  dose?: string;
  form?: string;
  monthly_cost: number;
}

interface Verification {
  last_verified?: string;
  verified_by?: string;
  source_urls?: string[];
  confidence?: "low" | "medium" | "high";
  notes?: string;
}

interface Provider {
  _id?: string;
  slug: string;
  name: string;
  affiliate_url?: string;
  pricing?: PricingEntry[];
  verification?: Verification;
  [key: string]: unknown;
}

interface FoundPrice {
  amount: number;
  currency: "USD";
  period: "month" | "week" | "4weeks" | "first_month" | "unknown";
  context: string;
  drug_hint?: "semaglutide" | "tirzepatide" | "compounded" | "brand" | null;
  source_url: string;
  source: "static" | "browser";
}

interface ProviderResult {
  slug: string;
  name: string;
  url: string;
  fetched_at: string;
  fetched_urls: string[];
  found_prices: FoundPrice[];
  stored_prices: PricingEntry[];
  match_status: "match" | "mismatch" | "no_data_found" | "fetch_failed";
  diff: string;
  used_browser: boolean;
  http_status?: number;
}

// ---------------- args ----------------

const args = process.argv.slice(2);
const NO_BROWSER = args.includes("--no-browser");
const AUTO_UPDATE = args.includes("--auto-update");
const LIMIT_IDX = args.indexOf("--limit");
const LIMIT = LIMIT_IDX >= 0 ? parseInt(args[LIMIT_IDX + 1] ?? "0", 10) : 0;

// ---------------- regex patterns ----------------

const PRICE_PATTERNS: Array<{
  re: RegExp;
  period: FoundPrice["period"];
  multiplier: number;
}> = [
  { re: /\$\s?(\d{2,4})(?:\.\d{2})?\s*(?:\/|per\s+)\s*(?:mo|month|monthly|mth)\b/gi, period: "month", multiplier: 1 },
  { re: /\$\s?(\d{2,4})(?:\.\d{2})?\s*(?:\/|per\s+)\s*(?:week|wk)\b/gi, period: "week", multiplier: 4 },
  { re: /\$\s?(\d{2,4})(?:\.\d{2})?\s*(?:\/|per\s+)\s*(?:4\s*weeks|28\s*days)\b/gi, period: "4weeks", multiplier: 1 },
  { re: /(?:starting|start|from|as\s+low\s+as)\s+(?:at\s+)?\$\s?(\d{2,4})(?:\.\d{2})?/gi, period: "month", multiplier: 1 },
  { re: /\$\s?(\d{2,4})(?:\.\d{2})?\s+first\s+month/gi, period: "first_month", multiplier: 1 },
  { re: /\$\s?(\d{2,4})(?:\.\d{2})?\s+(?:then|after\s+that|thereafter)/gi, period: "month", multiplier: 1 },
];

const DRUG_HINTS: Array<{ key: FoundPrice["drug_hint"]; words: RegExp }> = [
  { key: "tirzepatide", words: /tirzepatide|mounjaro|zepbound/i },
  { key: "semaglutide", words: /semaglutide|ozempic|wegovy|rybelsus/i },
  { key: "compounded", words: /compounded|compound/i },
  { key: "brand", words: /\bbrand[- ]name\b|fda[- ]approved\b/i },
];

// ---------------- candidate paths ----------------

const CANDIDATE_PATHS = [
  "",
  "/pricing",
  "/cost",
  "/plans",
  "/price",
  "/prices",
  "/semaglutide",
  "/tirzepatide",
  "/weight-loss",
  "/glp-1",
];

// ---------------- helpers ----------------

function userAgent() {
  return "Mozilla/5.0 (compatible; WLR-Scraper/1.0; +https://weightlossrankings.org)";
}

function normalizeBase(url: string): string {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.host}`;
  } catch {
    return url.replace(/\/$/, "");
  }
}

async function staticFetch(url: string): Promise<{ status: number; html: string } | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": userAgent(),
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const html = await res.text();
    return { status: res.status, html };
  } catch {
    return null;
  }
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#x?\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectDrug(context: string): FoundPrice["drug_hint"] {
  for (const hint of DRUG_HINTS) {
    if (hint.words.test(context)) return hint.key;
  }
  return null;
}

function extractPrices(text: string, sourceUrl: string, source: "static" | "browser"): FoundPrice[] {
  const prices: FoundPrice[] = [];
  for (const pat of PRICE_PATTERNS) {
    const re = new RegExp(pat.re.source, pat.re.flags);
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const raw = parseInt(m[1], 10);
      if (Number.isNaN(raw) || raw < 20 || raw > 5000) continue;
      const monthly = raw * pat.multiplier;
      const start = Math.max(0, m.index - 80);
      const end = Math.min(text.length, m.index + m[0].length + 80);
      const ctx = text.slice(start, end);
      prices.push({
        amount: monthly,
        currency: "USD",
        period: pat.period,
        context: ctx,
        drug_hint: detectDrug(ctx),
        source_url: sourceUrl,
        source,
      });
    }
  }
  // Dedupe by amount + period + drug_hint, keep first
  const seen = new Set<string>();
  return prices.filter((p) => {
    const key = `${p.amount}|${p.period}|${p.drug_hint ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ---------------- Playwright (optional) ----------------

let playwrightCache: { available: boolean; chromium?: unknown } | null = null;

async function loadPlaywright(): Promise<{ available: boolean; chromium?: unknown }> {
  if (playwrightCache) return playwrightCache;
  if (NO_BROWSER) {
    playwrightCache = { available: false };
    return playwrightCache;
  }
  try {
    // Dynamic import — only loads if installed.
    // Use a runtime-computed specifier so TypeScript doesn't try to type-check
    // against the optional `playwright` module (it's a devDep installed locally).
    const moduleName = "playwright";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pw = await (new Function("m", "return import(m)")(moduleName) as Promise<any>).catch(
      () => null
    );
    if (pw && (pw as { chromium?: unknown }).chromium) {
      playwrightCache = { available: true, chromium: (pw as { chromium: unknown }).chromium };
      return playwrightCache;
    }
  } catch {
    // ignore
  }
  playwrightCache = { available: false };
  return playwrightCache;
}

async function browserFetch(url: string): Promise<string | null> {
  const pw = await loadPlaywright();
  if (!pw.available) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromium = pw.chromium as any;
    const browser = await chromium.launch({ headless: true });
    try {
      const ctx = await browser.newContext({ userAgent: userAgent() });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
      try {
        await page.waitForLoadState("networkidle", { timeout: 5000 });
      } catch {
        // ignore — some sites never reach networkidle
      }
      const text = await page.evaluate(() => document.body?.innerText ?? "");
      await ctx.close();
      return text;
    } finally {
      await browser.close();
    }
  } catch {
    return null;
  }
}

// ---------------- per-provider scrape ----------------

async function scrapeProvider(provider: Provider): Promise<ProviderResult> {
  const fetchedAt = new Date().toISOString();
  const stored = provider.pricing ?? [];
  const baseUrl = provider.affiliate_url ?? "";
  const result: ProviderResult = {
    slug: provider.slug,
    name: provider.name,
    url: baseUrl,
    fetched_at: fetchedAt,
    fetched_urls: [],
    found_prices: [],
    stored_prices: stored,
    match_status: "no_data_found",
    diff: "",
    used_browser: false,
  };

  if (!baseUrl) {
    result.match_status = "fetch_failed";
    result.diff = "No affiliate_url in providers.json";
    return result;
  }

  const base = normalizeBase(baseUrl);
  let anySuccess = false;
  let lastStatus: number | undefined;

  // Layer 1: static
  for (const path of CANDIDATE_PATHS) {
    const url = base + path;
    const fetched = await staticFetch(url);
    if (!fetched) continue;
    lastStatus = fetched.status;
    if (fetched.status !== 200) continue;
    anySuccess = true;
    result.fetched_urls.push(url);
    const text = stripTags(fetched.html);
    const prices = extractPrices(text, url, "static");
    result.found_prices.push(...prices);
    if (result.found_prices.length >= 8) break;
  }
  result.http_status = lastStatus;

  // Layer 2: browser fallback
  if (result.found_prices.length === 0 && anySuccess && !NO_BROWSER) {
    const pw = await loadPlaywright();
    if (pw.available) {
      result.used_browser = true;
      for (const path of ["", "/pricing", "/plans"]) {
        const url = base + path;
        const text = await browserFetch(url);
        if (!text) continue;
        result.fetched_urls.push(url + " (browser)");
        const prices = extractPrices(text, url, "browser");
        result.found_prices.push(...prices);
        if (result.found_prices.length >= 5) break;
      }
    }
  }

  // Determine match status
  if (!anySuccess && result.found_prices.length === 0) {
    result.match_status = "fetch_failed";
    result.diff = `All fetches failed (last status: ${lastStatus ?? "n/a"})`;
    return result;
  }

  if (result.found_prices.length === 0) {
    result.match_status = "no_data_found";
    result.diff = "Fetched OK but no price patterns matched (likely JS-rendered)";
    return result;
  }

  const storedAmounts = stored.map((p) => p.monthly_cost);
  const foundAmounts = Array.from(new Set(result.found_prices.map((p) => p.amount)));

  const matched = storedAmounts.some((s) => foundAmounts.includes(s));
  if (matched) {
    const sharedAmounts = storedAmounts.filter((s) => foundAmounts.includes(s));
    result.match_status = "match";
    result.diff = `Stored prices [${storedAmounts.join(", ")}] — matched on [${sharedAmounts.join(", ")}]`;
  } else {
    result.match_status = "mismatch";
    result.diff = `Stored [${storedAmounts.join(", ") || "none"}], scraped [${foundAmounts.join(", ")}]`;
  }
  return result;
}

// ---------------- auto-update ----------------

function bumpConfidence(c: Verification["confidence"]): Verification["confidence"] {
  if (c === "low") return "medium";
  if (c === "medium") return "high";
  return "high";
}

function dropConfidence(c: Verification["confidence"]): Verification["confidence"] {
  if (c === "high") return "medium";
  if (c === "medium") return "low";
  return "low";
}

function applyAutoUpdate(providers: Provider[], results: ProviderResult[]) {
  const today = new Date().toISOString().slice(0, 10);
  let changed = 0;
  for (const r of results) {
    if (r.match_status !== "match" && r.match_status !== "mismatch") continue;
    const provider = providers.find((p) => p.slug === r.slug);
    if (!provider) continue;
    const v: Verification = provider.verification ?? {};
    if (r.match_status === "match") {
      v.last_verified = today;
      v.verified_by = "scraper";
      v.confidence = bumpConfidence(v.confidence);
      v.notes = `Auto-verified by scraper on ${today}`;
    } else {
      v.confidence = dropConfidence(v.confidence);
      v.notes = `Scraper mismatch on ${today}: ${r.diff}`;
    }
    provider.verification = v;
    changed += 1;
  }
  return changed;
}

// ---------------- report writer ----------------

function ensureDocsDir() {
  const dir = join(process.cwd(), "docs");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

function writeReports(results: ProviderResult[]) {
  const dir = ensureDocsDir();
  const today = new Date().toISOString().slice(0, 10);

  const matched = results.filter((r) => r.match_status === "match");
  const mismatched = results.filter((r) => r.match_status === "mismatch");
  const noData = results.filter((r) => r.match_status === "no_data_found");
  const failed = results.filter((r) => r.match_status === "fetch_failed");

  // JSON
  const jsonPath = join(dir, `scraper-report-${today}.json`);
  writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        summary: {
          total: results.length,
          matched: matched.length,
          mismatched: mismatched.length,
          no_data: noData.length,
          failed: failed.length,
        },
        results,
      },
      null,
      2
    )
  );

  // Markdown
  const lines: string[] = [];
  lines.push(`# Provider Scraper Report — ${today}`);
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push("| Metric | Count |");
  lines.push("|---|---|");
  lines.push(`| Total providers | ${results.length} |`);
  lines.push(`| Matched | ${matched.length} |`);
  lines.push(`| Mismatched | ${mismatched.length} |`);
  lines.push(`| No data found | ${noData.length} |`);
  lines.push(`| Fetch failed | ${failed.length} |`);
  lines.push("");

  if (mismatched.length > 0) {
    lines.push("## Mismatches (HIGH PRIORITY — review these)");
    lines.push("");
    for (const r of mismatched) {
      lines.push(`### ${r.name} (\`${r.slug}\`)`);
      lines.push("");
      lines.push(`- URL: ${r.url}`);
      lines.push(`- Used browser: ${r.used_browser}`);
      lines.push(`- Diff: ${r.diff}`);
      lines.push(`- Stored prices: ${JSON.stringify(r.stored_prices)}`);
      lines.push(`- Found prices:`);
      for (const p of r.found_prices.slice(0, 10)) {
        lines.push(`  - $${p.amount}/${p.period}${p.drug_hint ? ` [${p.drug_hint}]` : ""} — _${p.context.slice(0, 100).replace(/\n/g, " ")}_`);
      }
      lines.push("");
    }
  }

  if (noData.length > 0) {
    lines.push("## No price data found (suggest manual verification)");
    lines.push("");
    for (const r of noData) {
      lines.push(`- **${r.name}** (\`${r.slug}\`) — ${r.url} — used browser: ${r.used_browser}`);
    }
    lines.push("");
  }

  if (failed.length > 0) {
    lines.push("## Fetch failures");
    lines.push("");
    for (const r of failed) {
      lines.push(`- **${r.name}** (\`${r.slug}\`) — ${r.url} — ${r.diff}`);
    }
    lines.push("");
  }

  if (matched.length > 0) {
    lines.push("## Matched providers");
    lines.push("");
    for (const r of matched) {
      lines.push(`- **${r.name}** (\`${r.slug}\`) — ${r.diff}`);
    }
    lines.push("");
  }

  const mdPath = join(dir, `scraper-report-${today}.md`);
  writeFileSync(mdPath, lines.join("\n"));

  return { jsonPath, mdPath };
}

// ---------------- main ----------------

async function main() {
  const path = join(process.cwd(), "src/data/providers.json");
  const providers: Provider[] = JSON.parse(readFileSync(path, "utf-8"));

  const subset = LIMIT > 0 ? providers.slice(0, LIMIT) : providers;
  console.log(
    `Scraping ${subset.length} providers ${NO_BROWSER ? "(static only)" : "(static + browser fallback)"}...`
  );

  if (!NO_BROWSER) {
    const pw = await loadPlaywright();
    if (!pw.available) {
      console.log("Playwright not installed — running static-only mode.");
      console.log("To enable browser fallback: npm install -D playwright && npx playwright install chromium");
    }
  }

  const results: ProviderResult[] = [];
  for (let i = 0; i < subset.length; i++) {
    const provider = subset[i];
    process.stdout.write(`[${i + 1}/${subset.length}] ${provider.name}... `);
    try {
      const r = await scrapeProvider(provider);
      results.push(r);
      console.log(`${r.match_status}${r.used_browser ? " (browser)" : ""}`);
    } catch (err) {
      console.log(`ERROR: ${(err as Error).message}`);
      results.push({
        slug: provider.slug,
        name: provider.name,
        url: provider.affiliate_url ?? "",
        fetched_at: new Date().toISOString(),
        fetched_urls: [],
        found_prices: [],
        stored_prices: provider.pricing ?? [],
        match_status: "fetch_failed",
        diff: `Exception: ${(err as Error).message}`,
        used_browser: false,
      });
    }
  }

  const { jsonPath, mdPath } = writeReports(results);

  const matched = results.filter((r) => r.match_status === "match").length;
  const mismatched = results.filter((r) => r.match_status === "mismatch").length;
  const noData = results.filter((r) => r.match_status === "no_data_found").length;
  const failed = results.filter((r) => r.match_status === "fetch_failed").length;

  console.log("\n========== REPORT ==========");
  console.log(`Total:      ${results.length}`);
  console.log(`Matched:    ${matched}`);
  console.log(`Mismatched: ${mismatched}`);
  console.log(`No data:    ${noData}`);
  console.log(`Failed:     ${failed}`);
  console.log(`\nReports written:`);
  console.log(`  ${mdPath}`);
  console.log(`  ${jsonPath}`);

  if (AUTO_UPDATE) {
    const changed = applyAutoUpdate(providers, results);
    writeFileSync(path, JSON.stringify(providers, null, 2) + "\n");
    console.log(`\nAuto-update: modified verification metadata for ${changed} providers.`);
    console.log("Note: pricing values were NOT touched. Review mismatches manually.");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
