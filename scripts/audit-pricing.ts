/**
 * Pricing drift audit for WeightLossRankings.org
 *
 * Independent of scrape-providers.ts. Where the existing scraper produces
 * a verification report, THIS script answers a single question:
 *
 *   "For each provider, does the price we display in providers.json still
 *    match what is currently live on their website?"
 *
 * It is intentionally narrow:
 *   - fetches each provider's website
 *   - extracts price candidates with a small set of resilient heuristics
 *   - picks the mode/median as the "extracted price"
 *   - compares against providers.json monthly_cost / promo_price
 *   - flags drift by severity
 *   - exit code 1 if any HIGH severity drift detected (CI-friendly)
 *
 * Usage:
 *   npx tsx scripts/audit-pricing.ts                # audit a 10-provider sample
 *   npx tsx scripts/audit-pricing.ts --sample 20    # custom sample size
 *   npx tsx scripts/audit-pricing.ts --all          # audit every provider
 *   npx tsx scripts/audit-pricing.ts --slug hims    # audit just one provider
 *   npx tsx scripts/audit-pricing.ts --no-browser   # static fetch only
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// ---------------- types ----------------

interface PricingEntry {
  dose?: string;
  form?: string;
  drug?: string;
  monthly_cost?: number;
  promo_price?: number;
}

interface Provider {
  slug: string;
  name: string;
  affiliate_url?: string;
  website?: string;
  pricing?: PricingEntry[];
  [key: string]: unknown;
}

type Severity = "HIGH" | "MEDIUM" | "OK" | "UNKNOWN";

interface AuditResult {
  slug: string;
  name: string;
  url: string;
  datasetPrice: number | null;
  extractedPrice: number | null;
  candidates: number[];
  deltaUsd: number | null;
  deltaPct: number | null;
  severity: Severity;
  evidence: string;
  error?: string;
}

interface AuditReport {
  runDate: string;
  providersAudited: number;
  results: AuditResult[];
  summary: { high: number; medium: number; ok: number; unknown: number };
}

// ---------------- args ----------------

const args = process.argv.slice(2);
function flag(name: string): boolean {
  return args.includes(name);
}
function arg(name: string): string | undefined {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

const SAMPLE = parseInt(arg("--sample") ?? "10", 10);
const RUN_ALL = flag("--all");
const NO_BROWSER = flag("--no-browser");
const ONLY_SLUG = arg("--slug");

// ---------------- constants ----------------

const PER_PROVIDER_TIMEOUT_MS = 30_000;
const NAVIGATION_TIMEOUT_MS = 5_000;
const STATIC_FETCH_TIMEOUT_MS = 15_000;

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

// Heuristic A: $NN, $NNN, or $N,NNN (with optional cents) — broad sweep
const PRICE_ANY = /\$\s?(\d{1,3}(?:,\d{3})*|\d{2,4})(?:\.\d{2})?/g;

// Heuristic B: $X / month patterns (highest signal)
const PRICE_PER_MONTH =
  /\$\s?(\d{2,4})(?:\.\d{2})?\s*(?:\/|per\s+)?\s*(?:mo\b|month\b|monthly\b|mth\b)/gi;

// Heuristic C: structured JSON-LD price fields
const JSONLD_BLOCK = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

// ---------------- helpers ----------------

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function staticFetch(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.google.com/",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(STATIC_FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return await res.text();
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
    .replace(/\s+/g, " ")
    .trim();
}

// Normalize a parsed dollar string ("1,299" or "299") -> number
function toAmount(raw: string): number | null {
  const n = parseInt(raw.replace(/,/g, ""), 10);
  if (Number.isNaN(n)) return null;
  return n;
}

function extractPerMonthPrices(text: string): number[] {
  const out: number[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(PRICE_PER_MONTH.source, PRICE_PER_MONTH.flags);
  while ((m = re.exec(text)) !== null) {
    const n = toAmount(m[1]);
    if (n !== null && n >= 20 && n <= 5000) out.push(n);
  }
  return out;
}

/**
 * Per-month prices that occur near a GLP-1 keyword. Higher signal
 * than the unfiltered per-month extractor because it filters out
 * decoy prices like:
 *   - membership fees that don't include the medication
 *   - prices for unrelated services on the same page (enclomiphene,
 *     metformin, NAD+, rapamycin, etc.)
 *   - "first month" promotional banners that don't reflect ongoing
 *     monthly cost
 *
 * Implementation: scan a 300-char window around each per-month
 * price match for any of the GLP-1 keywords. Keep only matches
 * where the keyword appears within that window.
 *
 * Added 2026-04-08 after the false-positive audit run that flagged
 * Fella Health ($99 enclomiphene), Mochi Health ($39 membership),
 * and others as HIGH drift.
 */
const GLP1_KEYWORDS_RE = /\b(semaglutide|tirzepatide|wegovy|zepbound|mounjaro|ozempic|saxenda|foundayo|orforglipron|glp.?1|glucagon.?like|weight.?loss\s+medication|weight.?management\s+(?:drug|medication))/i;

function extractPerMonthPricesWithGlp1Context(text: string): number[] {
  const out: number[] = [];
  const re = new RegExp(PRICE_PER_MONTH.source, PRICE_PER_MONTH.flags);
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const n = toAmount(m[1]);
    if (n === null || n < 20 || n > 5000) continue;
    // Look at a 300-char window centered on the match
    const matchIdx = m.index;
    const windowStart = Math.max(0, matchIdx - 150);
    const windowEnd = Math.min(text.length, matchIdx + (m[0]?.length ?? 0) + 150);
    const window = text.slice(windowStart, windowEnd);
    if (GLP1_KEYWORDS_RE.test(window)) {
      out.push(n);
    }
  }
  return out;
}

function extractAnyPrices(text: string): number[] {
  const out: number[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(PRICE_ANY.source, PRICE_ANY.flags);
  while ((m = re.exec(text)) !== null) {
    const n = toAmount(m[1]);
    if (n !== null && n >= 20 && n <= 5000) out.push(n);
  }
  return out;
}

function extractJsonLdPrices(html: string): number[] {
  const out: number[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(JSONLD_BLOCK.source, JSONLD_BLOCK.flags);
  while ((m = re.exec(html)) !== null) {
    const block = m[1];
    try {
      const data = JSON.parse(block);
      walkForPrice(data, out);
    } catch {
      // Some sites embed multiple JSON-LD blocks or invalid JSON — skip.
    }
  }
  return out;
}

function walkForPrice(obj: unknown, out: number[]): void {
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    obj.forEach((x) => walkForPrice(x, out));
    return;
  }
  const o = obj as Record<string, unknown>;
  for (const [k, v] of Object.entries(o)) {
    if (k.toLowerCase() === "price" || k.toLowerCase() === "lowprice") {
      const num =
        typeof v === "number" ? v : typeof v === "string" ? parseFloat(v.replace(/[^0-9.]/g, "")) : NaN;
      if (!Number.isNaN(num) && num >= 20 && num <= 5000) out.push(Math.round(num));
    }
    if (typeof v === "object") walkForPrice(v, out);
  }
}

// Pick the mode (most common). Tie-breaker: median.
function consensus(values: number[]): number | null {
  if (values.length === 0) return null;
  const counts = new Map<number, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  let best = values[0];
  let bestCount = 0;
  for (const [v, c] of counts.entries()) {
    if (c > bestCount || (c === bestCount && v < best)) {
      best = v;
      bestCount = c;
    }
  }
  if (bestCount >= 2) return best;
  // No mode — fall back to median
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

// ---------------- playwright (optional) ----------------

let playwrightCache: { available: boolean; chromium?: unknown } | null = null;
async function loadPlaywright() {
  if (playwrightCache) return playwrightCache;
  if (NO_BROWSER) {
    playwrightCache = { available: false };
    return playwrightCache;
  }
  try {
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

async function browserFetch(url: string): Promise<{ html: string; text: string } | null> {
  const pw = await loadPlaywright();
  if (!pw.available) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromium = pw.chromium as any;
    const browser = await chromium.launch({ headless: true });
    try {
      const ctx = await browser.newContext({ userAgent: USER_AGENT });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: NAVIGATION_TIMEOUT_MS });
      try {
        await page.waitForLoadState("networkidle", { timeout: 4000 });
      } catch {
        // some sites never settle — that's fine
      }
      const html = await page.content();
      const text = await page.evaluate(() => document.body?.innerText ?? "");
      await ctx.close();
      return { html, text };
    } finally {
      await browser.close();
    }
  } catch {
    return null;
  }
}

// ---------------- core audit ----------------

function pickDatasetPrice(provider: Provider): number | null {
  const pricing = provider.pricing ?? [];
  // Prefer the lowest non-promo monthly cost — that's typically the "starting at" price
  const monthly = pricing.map((p) => p.monthly_cost).filter((v): v is number => typeof v === "number");
  if (monthly.length > 0) return Math.min(...monthly);
  const promo = pricing
    .map((p) => p.promo_price)
    .filter((v): v is number => typeof v === "number");
  if (promo.length > 0) return Math.min(...promo);
  return null;
}

/**
 * Classify drift severity given the dataset price, extracted price,
 * and the source heuristic that produced the extraction.
 *
 * Source quality matters because the broad-dollar-sweep fallback
 * routinely catches misleading numbers — promotional first-month
 * prices, decoy banners, membership fees, unrelated service prices.
 * If the audit had to fall back to that heuristic, the extracted
 * value cannot be trusted enough to fail CI on HIGH severity.
 *
 * Source-quality rules (added 2026-04-08 after the false-positive
 * audit run that flagged 9 providers with HIGH drift, only one of
 * which turned out to be a real price change):
 *
 *   - JSON-LD price: HIGH if drift exceeds threshold (most reliable)
 *   - Per-month pattern: HIGH if drift exceeds threshold (high signal)
 *   - Broad-dollar-sweep: max severity is MEDIUM, regardless of drift
 *     magnitude. The signal is too noisy to trigger CI failures.
 */
function classify(
  datasetPrice: number | null,
  extracted: number | null,
  source:
    | "json-ld"
    | "per-month-pattern-glp1-context"
    | "per-month-pattern"
    | "broad-dollar-sweep"
    | "",
): Severity {
  if (extracted === null) return "UNKNOWN";
  if (datasetPrice === null) return "UNKNOWN";
  const delta = Math.abs(extracted - datasetPrice);
  const pct = (delta / datasetPrice) * 100;

  // Broad-dollar-sweep: too noisy to trigger HIGH. Cap at MEDIUM.
  if (source === "broad-dollar-sweep") {
    if (delta > 20 || pct > 15) return "MEDIUM";
    return "OK";
  }

  // Per-month-pattern WITHOUT GLP-1 context: also untrustworthy
  // (catches membership fees, decoy prices, enclomiphene/metformin,
  // promotional first-month rates that don't reflect ongoing cost).
  // Cap at MEDIUM.
  if (source === "per-month-pattern") {
    if (delta > 20 || pct > 15) return "MEDIUM";
    return "OK";
  }

  // JSON-LD and per-month-pattern WITH GLP-1 context are trusted
  // enough to trigger HIGH severity and fail CI.
  if (delta > 20 || pct > 15) return "HIGH";
  if (delta > 10 || pct > 8) return "MEDIUM";
  return "OK";
}

async function auditProvider(provider: Provider): Promise<AuditResult> {
  const url = provider.affiliate_url ?? (provider.website as string | undefined) ?? "";
  const datasetPrice = pickDatasetPrice(provider);
  const base: AuditResult = {
    slug: provider.slug,
    name: provider.name,
    url,
    datasetPrice,
    extractedPrice: null,
    candidates: [],
    deltaUsd: null,
    deltaPct: null,
    severity: "UNKNOWN",
    evidence: "",
  };

  if (!url) {
    base.error = "no_url";
    base.evidence = "Provider has no affiliate_url or website field";
    return base;
  }

  // Wrap in a hard per-provider timeout so a single hung site never blocks the run.
  const work = (async () => {
    let html: string | null = null;
    let text = "";

    // Try static fetch first (fast)
    html = await staticFetch(url);
    if (html) text = stripTags(html);

    // Fall back to browser if (a) static failed entirely, OR
    // (b) static returned a page but no plausible per-month prices were found
    const staticPerMonth = text ? extractPerMonthPrices(text) : [];
    if ((!html || staticPerMonth.length === 0) && !NO_BROWSER) {
      const b = await browserFetch(url);
      if (b) {
        html = b.html;
        text = b.text;
      }
    }

    if (!html && !text) {
      base.error = "fetch_failed";
      base.evidence = "Both static fetch and browser fetch failed";
      return base;
    }

    // Heuristic stack (highest signal first):
    //   1. JSON-LD product prices
    //   2. $X / month patterns within 300 chars of a GLP-1 keyword
    //      (semaglutide, tirzepatide, Wegovy, etc.) — added 2026-04-08
    //      to filter out decoy prices like membership fees, enclomiphene
    //      prices, and unrelated service prices on multi-product pages
    //   3. $X / month patterns anywhere on the page (any signal)
    //   4. Any $X scattered throughout the page (lowest signal)
    const jsonLdPrices = html ? extractJsonLdPrices(html) : [];
    const perMonthGlp1Prices = extractPerMonthPricesWithGlp1Context(text);
    const perMonthPrices = extractPerMonthPrices(text);
    const anyPrices = extractAnyPrices(text);

    let candidates: number[] = [];
    let source = "";
    if (jsonLdPrices.length > 0) {
      candidates = jsonLdPrices;
      source = "json-ld";
    } else if (perMonthGlp1Prices.length > 0) {
      candidates = perMonthGlp1Prices;
      source = "per-month-pattern-glp1-context";
    } else if (perMonthPrices.length > 0) {
      candidates = perMonthPrices;
      source = "per-month-pattern";
    } else if (anyPrices.length > 0) {
      candidates = anyPrices;
      source = "broad-dollar-sweep";
    }

    base.candidates = candidates.slice(0, 20);
    if (candidates.length === 0) {
      base.evidence = "No price candidates extracted from page";
      return base;
    }

    const extracted = consensus(candidates);
    base.extractedPrice = extracted;

    if (extracted !== null && datasetPrice !== null) {
      base.deltaUsd = extracted - datasetPrice;
      base.deltaPct = (base.deltaUsd / datasetPrice) * 100;
    }
    base.severity = classify(
      datasetPrice,
      extracted,
      source as
        | "json-ld"
        | "per-month-pattern-glp1-context"
        | "per-month-pattern"
        | "broad-dollar-sweep"
        | "",
    );
    base.evidence = `source=${source}, ${candidates.length} candidates, mode/median=$${extracted}`;
    return base;
  })();

  const timeout = new Promise<AuditResult>((resolve) =>
    setTimeout(() => {
      base.error = "timeout";
      base.evidence = `Per-provider timeout (${PER_PROVIDER_TIMEOUT_MS}ms) exceeded`;
      resolve(base);
    }, PER_PROVIDER_TIMEOUT_MS)
  );

  try {
    return await Promise.race([work, timeout]);
  } catch (err) {
    base.error = (err as Error).message;
    base.evidence = `Exception: ${base.error}`;
    return base;
  }
}

// ---------------- main ----------------

function pickSample(providers: Provider[]): Provider[] {
  if (ONLY_SLUG) {
    const found = providers.find((p) => p.slug === ONLY_SLUG);
    return found ? [found] : [];
  }
  if (RUN_ALL) return providers;
  // Randomized sample of size SAMPLE
  const shuffled = [...providers].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(SAMPLE, providers.length));
}

function printTable(results: AuditResult[]) {
  const rows = results.map((r) => ({
    slug: r.slug.padEnd(28),
    dataset: (r.datasetPrice !== null ? `$${r.datasetPrice}` : "-").padStart(8),
    extracted: (r.extractedPrice !== null ? `$${r.extractedPrice}` : "-").padStart(10),
    delta:
      r.deltaUsd !== null
        ? `${r.deltaUsd >= 0 ? "+" : ""}$${r.deltaUsd} (${r.deltaPct!.toFixed(1)}%)`
        : "-",
    sev: r.severity,
  }));
  console.log("\n" + "slug".padEnd(28) + " " + "dataset".padStart(8) + " " + "extracted".padStart(10) + "  delta            severity");
  console.log("-".repeat(86));
  for (const r of rows) {
    console.log(`${r.slug} ${r.dataset} ${r.extracted}  ${r.delta.padEnd(16)} ${r.sev}`);
  }
}

async function main() {
  const path = join(process.cwd(), "src/data/providers.json");
  const providers: Provider[] = JSON.parse(readFileSync(path, "utf-8"));
  const sample = pickSample(providers);

  if (sample.length === 0) {
    console.error("No providers selected (check --slug value).");
    process.exit(2);
  }

  console.log(
    `audit-pricing: auditing ${sample.length}/${providers.length} providers (browser=${!NO_BROWSER})`
  );

  const results: AuditResult[] = [];
  for (let i = 0; i < sample.length; i++) {
    const p = sample[i];
    process.stdout.write(`[${i + 1}/${sample.length}] ${p.name}... `);
    const r = await auditProvider(p);
    results.push(r);
    console.log(r.severity + (r.error ? ` (${r.error})` : ""));
    // Tiny politeness delay between providers
    await sleep(400);
  }

  const summary = {
    high: results.filter((r) => r.severity === "HIGH").length,
    medium: results.filter((r) => r.severity === "MEDIUM").length,
    ok: results.filter((r) => r.severity === "OK").length,
    unknown: results.filter((r) => r.severity === "UNKNOWN").length,
  };

  const report: AuditReport = {
    runDate: new Date().toISOString(),
    providersAudited: results.length,
    results,
    summary,
  };

  const isoDate = new Date().toISOString().slice(0, 10);
  const outPath = `/tmp/pricing-audit-${isoDate}.json`;
  writeFileSync(outPath, JSON.stringify(report, null, 2));

  printTable(results);
  console.log("\n========== SUMMARY ==========");
  console.log(`HIGH:    ${summary.high}`);
  console.log(`MEDIUM:  ${summary.medium}`);
  console.log(`OK:      ${summary.ok}`);
  console.log(`UNKNOWN: ${summary.unknown}`);
  console.log(`\nReport written to ${outPath}`);

  // Wave 5 update (2026-04-08): the audit is now informational, not
  // CI-failing. Investigation of the 2026-04-07 HIGH-drift signals
  // (PeptidesRx, Fella Health, Eden, OnlineSemaglutide, ReflexMD,
  // Mochi, Invigor, OrderlyMeds, Moioon) showed only ONE was a real
  // price change (Mochi Health restructured to a $39 membership +
  // medication add-on model). The other 8 were audit false positives:
  // the regex was catching membership fees, decoy promotional
  // first-month prices, prices for unrelated services on the same
  // page (enclomiphene, metformin, NAD+, rapamycin, etc.), or
  // navigation banners that didn't reflect the GLP-1 monthly cost.
  //
  // The honest conclusion: regex pattern matching against arbitrary
  // telehealth landing pages cannot reliably extract the right
  // monthly cost. Most providers gate the actual GLP-1 prices behind
  // a quiz/intake form. The audit's role is to alert a human to
  // investigate, not to fail the build. Exit code 0 always; the
  // GitHub Actions workflow that posts comments to issue #1 still
  // runs nightly so the signals are visible, but the build no
  // longer fails on HIGH severity.
  //
  // Future improvement option: replace the regex extraction with
  // headless DOM walking (find the price IN the same UI card as
  // the drug name) or LLM-based extraction. Until then, manual
  // verification of HIGH/MEDIUM signals is the workflow.
  if (summary.high > 0) {
    console.log(
      `\n${summary.high} provider(s) flagged HIGH severity. ` +
        `These are signals to investigate, not automatic failures. ` +
        `See the audit script header comment for context.`,
    );
  }
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(2);
});
