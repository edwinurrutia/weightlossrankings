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
  period: "month" | "week" | "4weeks" | "first_month" | "3month" | "unknown";
  context: string;
  drug_hint?: "semaglutide" | "tirzepatide" | "compounded" | "brand" | null;
  glp1_proximity: boolean;
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
  match_status:
    | "match"
    | "mismatch"
    | "no_data_found"
    | "fetch_failed"
    | "stale_match";
  diff: string;
  recommendation: string;
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
  { re: /(?:starting|start|from|as\s+low\s+as)\s+(?:at\s+)?\$\s?(\d{2,4})(?:\.\d{2})?\s*(?:\/\s*(?:mo|month))?/gi, period: "month", multiplier: 1 },
  { re: /\bfrom\s+\$\s?(\d{2,4})(?:\.\d{2})?\b/gi, period: "month", multiplier: 1 },
  { re: /\$\s?(\d{2,4})(?:\.\d{2})?\s+first\s+month/gi, period: "first_month", multiplier: 1 },
  { re: /\$\s?(\d{2,4})(?:\.\d{2})?\s+(?:then|after\s+that|thereafter)/gi, period: "month", multiplier: 1 },
  // Quarterly / 3-month pricing: "$X for 3 months" or "$X / 3 months"
  { re: /\$\s?(\d{2,4})(?:\.\d{2})?\s+for\s+(?:3|three)\s+months?\b/gi, period: "3month", multiplier: 1 / 3 },
  { re: /\$\s?(\d{2,4})(?:\.\d{2})?\s*(?:\/|per\s+)?\s*3[- ]?month/gi, period: "3month", multiplier: 1 / 3 },
  { re: /(?:3|three)[- ]?months?\s+(?:for|at|plan)\s+\$\s?(\d{2,4})/gi, period: "3month", multiplier: 1 / 3 },
  { re: /\$\s?(\d{2,4})(?:\.\d{2})?\s*(?:to|–|—|-)\s*\$?\d{2,4}\s*\/\s*(?:mo|month)/gi, period: "month", multiplier: 1 },
];

// Tight proximity keywords — price must be near one of these to be considered GLP-1 relevant.
const GLP1_KEYWORDS = /\b(?:semaglutide|tirzepatide|glp[- ]?1|glp|weight[- ]?loss|compounded|injection|injectable|mounjaro|wegovy|ozempic|zepbound|rybelsus|microdos|oral\s+glp)\b/i;
const PROXIMITY_RADIUS = 125; // ±125 chars = 250 char window as per spec

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
  "/treatments",
  "/products",
  "/medications",
  "/get-started",
  "/how-it-works",
  "/membership",
];

const MAX_REQUESTS_PER_PROVIDER = 3;
const REQUEST_DELAY_MS = 600;

// ---------------- helpers ----------------

// Rotating realistic User-Agents — Chrome 122, Firefox 122, Safari 17 on desktop
const USER_AGENTS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15",
];

let uaIndex = 0;
function userAgent() {
  // Round-robin rotation across requests
  const ua = USER_AGENTS[uaIndex % USER_AGENTS.length];
  uaIndex += 1;
  return ua;
}

function normalizeBase(url: string): string {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.host}`;
  } catch {
    return url.replace(/\/$/, "");
  }
}

function altHostBases(baseUrl: string): string[] {
  // Generate www. <-> apex alternates so we can retry on hostname-level failures.
  try {
    const u = new URL(baseUrl);
    const out = new Set<string>();
    out.add(`${u.protocol}//${u.host}`);
    if (u.host.startsWith("www.")) {
      out.add(`${u.protocol}//${u.host.slice(4)}`);
    } else {
      out.add(`${u.protocol}//www.${u.host}`);
    }
    return Array.from(out);
  } catch {
    return [baseUrl];
  }
}

async function staticFetch(url: string, attempt = 0): Promise<{ status: number; html: string } | null> {
  try {
    const ua = userAgent();
    // Derive a plausible referrer so sites that key on Referer (Cloudflare, etc.) see
    // traffic coming from Google — the most common real-world referrer.
    const headers: Record<string, string> = {
      "User-Agent": ua,
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Referer: "https://www.google.com/",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
    };
    // Add Chrome client hints only when using a Chrome UA (best-effort).
    if (/Chrome\/122/.test(ua)) {
      headers["sec-ch-ua"] = '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"';
      headers["sec-ch-ua-mobile"] = "?0";
      headers["sec-ch-ua-platform"] = /Macintosh/.test(ua) ? '"macOS"' : '"Windows"';
    }
    const res = await fetch(url, {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const html = await res.text();
    return { status: res.status, html };
  } catch {
    // One retry with a fresh UA helps transient DNS / TLS resets.
    if (attempt === 0) {
      await sleep(500);
      return staticFetch(url, 1);
    }
    return null;
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
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
      const monthly = Math.round(raw * pat.multiplier);
      // Tight proximity window — match only keywords within PROXIMITY_RADIUS chars of the price
      const tightStart = Math.max(0, m.index - PROXIMITY_RADIUS);
      const tightEnd = Math.min(text.length, m.index + m[0].length + PROXIMITY_RADIUS);
      const tightCtx = text.slice(tightStart, tightEnd);
      // Wider window retained for debugging / display
      const start = Math.max(0, m.index - 200);
      const end = Math.min(text.length, m.index + m[0].length + 200);
      const ctx = text.slice(start, end);
      const drug = detectDrug(tightCtx);
      // GLP-1 keyword proximity check — strictly within the tight window
      const proximity = GLP1_KEYWORDS.test(tightCtx);
      prices.push({
        amount: monthly,
        currency: "USD",
        period: pat.period,
        context: ctx,
        drug_hint: drug,
        glp1_proximity: proximity,
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

// Filter to GLP-1-relevant prices when available; otherwise fall back to all.
function glp1Filtered(prices: FoundPrice[]): FoundPrice[] {
  const relevant = prices.filter((p) => p.glp1_proximity || p.drug_hint);
  return relevant.length > 0 ? relevant : prices;
}

function approxMatch(stored: number, found: number): boolean {
  if (stored === found) return true;
  const diff = Math.abs(stored - found);
  if (diff <= 10) return true;
  if (diff / Math.max(stored, found) <= 0.1) return true;
  return false;
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
    recommendation: "",
    used_browser: false,
  };

  if (!baseUrl) {
    result.match_status = "fetch_failed";
    result.diff = "No affiliate_url in providers.json";
    result.recommendation = "Add affiliate_url field to providers.json";
    return result;
  }

  const bases = altHostBases(baseUrl);
  let anySuccess = false;
  let lastStatus: number | undefined;
  let requestCount = 0;

  // Layer 1: static — only try paths until we exhaust budget or find prices
  outer: for (const base of bases) {
    for (const path of CANDIDATE_PATHS) {
      if (requestCount >= MAX_REQUESTS_PER_PROVIDER) break outer;
      const url = base + path;
      requestCount += 1;
      const fetched = await staticFetch(url);
      if (requestCount < MAX_REQUESTS_PER_PROVIDER) await sleep(REQUEST_DELAY_MS);
      if (!fetched) continue;
      lastStatus = fetched.status;
      if (fetched.status !== 200) continue;
      anySuccess = true;
      result.fetched_urls.push(url);
      const text = stripTags(fetched.html);
      const prices = extractPrices(text, url, "static");
      result.found_prices.push(...prices);
      // Stop early if we have at least one GLP-1-relevant price
      if (result.found_prices.some((p) => p.glp1_proximity || p.drug_hint)) {
        if (result.found_prices.length >= 4) break outer;
      }
    }
    if (anySuccess) break; // first base worked
  }
  result.http_status = lastStatus;

  // Layer 2: browser fallback — trigger if no prices OR no GLP-1-relevant prices
  const hasGlp1Prices = result.found_prices.some((p) => p.glp1_proximity || p.drug_hint);
  const shouldUseBrowser =
    !NO_BROWSER && (result.found_prices.length === 0 || (anySuccess && !hasGlp1Prices));

  if (shouldUseBrowser) {
    const pw = await loadPlaywright();
    if (pw.available) {
      result.used_browser = true;
      const browserBase = bases[0];
      for (const path of ["", "/pricing", "/plans"]) {
        const url = browserBase + path;
        const text = await browserFetch(url);
        if (!text) continue;
        result.fetched_urls.push(url + " (browser)");
        anySuccess = true;
        const prices = extractPrices(text, url, "browser");
        result.found_prices.push(...prices);
        if (result.found_prices.some((p) => p.glp1_proximity || p.drug_hint)) break;
      }
    }
  }

  // Determine match status
  if (!anySuccess && result.found_prices.length === 0) {
    result.match_status = "fetch_failed";
    result.diff = `All fetches failed (last status: ${lastStatus ?? "n/a"})`;
    result.recommendation =
      lastStatus === 403
        ? "Bot-protected (Cloudflare/etc). Manually verify pricing."
        : "Site unreachable. Check URL or manually verify.";
    return result;
  }

  if (result.found_prices.length === 0) {
    result.match_status = "no_data_found";
    result.diff = "Fetched OK but no price patterns matched (likely JS-rendered or no public pricing)";
    result.recommendation = "Manually verify pricing on provider site.";
    return result;
  }

  // Prefer GLP-1-relevant prices for matching
  const relevantPrices = glp1Filtered(result.found_prices);
  const storedAmounts = stored.map((p) => p.monthly_cost);
  const foundAmounts = Array.from(new Set(relevantPrices.map((p) => p.amount)));

  if (storedAmounts.length === 0) {
    // No stored prices to compare against — report what we found
    result.match_status = "mismatch";
    result.diff = `No stored prices. Scraped: [${foundAmounts.slice(0, 6).join(", ")}]`;
    result.recommendation = `Add pricing to providers.json from scraped values: ${foundAmounts
      .slice(0, 4)
      .map((a) => "$" + a)
      .join(", ")}`;
    return result;
  }

  const exactMatches = storedAmounts.filter((s) => foundAmounts.includes(s));
  const approxMatches = storedAmounts.filter((s) => foundAmounts.some((f) => approxMatch(s, f)));

  if (exactMatches.length > 0) {
    result.match_status = "match";
    result.diff = `Exact match on [${exactMatches.join(", ")}]`;
    result.recommendation = "No action needed.";
  } else if (approxMatches.length > 0) {
    result.match_status = "match";
    result.diff = `Approx match: stored [${storedAmounts.join(", ")}] vs scraped [${foundAmounts.slice(0, 6).join(", ")}]`;
    result.recommendation = "Within 10% — no action needed.";
  } else {
    // Genuine mismatch — but distinguish stale_match if GLP-1 keywords present
    const hasGlp1Context = relevantPrices.some((p) => p.glp1_proximity || p.drug_hint);
    if (hasGlp1Context) {
      result.match_status = "stale_match";
      result.diff = `Stored [${storedAmounts.join(", ")}], scraped GLP-1 prices [${foundAmounts.slice(0, 6).join(", ")}]`;
      result.recommendation = `Stored prices appear stale. Review and update to: ${foundAmounts
        .slice(0, 4)
        .map((a) => "$" + a)
        .join(", ")}`;
    } else {
      result.match_status = "mismatch";
      result.diff = `Stored [${storedAmounts.join(", ")}], scraped [${foundAmounts.slice(0, 6).join(", ")}] (no GLP-1 context)`;
      result.recommendation = "Low confidence — manually verify, scraped prices may not be GLP-1.";
    }
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
      // Conservative "high" confidence: only upgrade to high when we have
      //   (a) at least one price with GLP-1 proximity, AND
      //   (b) that price matches a stored value within ±10%.
      const glp1Prices = r.found_prices.filter((p) => p.glp1_proximity || p.drug_hint);
      const storedAmounts = r.stored_prices.map((p) => p.monthly_cost);
      const tightMatch = glp1Prices.some((p) =>
        storedAmounts.some((s) => approxMatch(s, p.amount))
      );
      if (tightMatch) {
        v.confidence = "high";
        v.notes = `Auto-verified by scraper on ${today} (GLP-1 price match)`;
      } else {
        // Keep or bump to medium — don't claim high without GLP-1 context
        v.confidence = v.confidence === "high" ? "high" : "medium";
        v.notes = `Auto-verified by scraper on ${today} (match without GLP-1 context)`;
      }
    } else {
      v.confidence = dropConfidence(v.confidence);
      v.notes = `Scraper mismatch on ${today}: ${r.diff}`;
    }
    provider.verification = v;
    changed += 1;
  }
  return changed;
}

// ---------------- price history snapshot ----------------

interface PriceHistoryPoint {
  date: string;
  price: number;
}

interface PriceHistoryEntry {
  provider_slug: string;
  dose: string;
  form: string;
  history: PriceHistoryPoint[];
}

// Plausibility floor for compounded GLP-1 monthly prices. Anything
// below this is almost certainly NOT a drug price — it's either a
// telehealth consult fee, a fitness app subscription, or a placeholder.
// $99 is below the cheapest legitimate compounded semaglutide we've
// ever seen ($129) but high enough to filter out all the obvious
// non-drug pricing rows in providers.json.
const MIN_PLAUSIBLE_COMPOUNDED_PRICE = 99;

// GLP-1 drug strings we accept on the `drug` field. Anything outside
// this set means the row is for a non-GLP-1 product and should not
// be snapshotted into the GLP-1 price-tracker series.
const GLP1_DRUGS = new Set([
  "semaglutide",
  "tirzepatide",
  "liraglutide",
  "compounded-semaglutide",
  "compounded-tirzepatide",
  "glp-1",
  "glp1",
]);

function isGlp1Drug(drug: unknown): boolean {
  if (typeof drug !== "string") return false;
  return GLP1_DRUGS.has(drug.toLowerCase().trim());
}

/**
 * Pick the single "canonical" entry-level price for a provider — the
 * one we use to power the /price-tracker chart and "recent changes"
 * table. The chart's semantics are "0.5mg compounded semaglutide
 * across providers", so we always emit a synthetic dose label of
 * `0.5mg` and form `compounded` regardless of how the provider's own
 * pricing rows are labelled.
 *
 * Strict filter — every accepted entry must satisfy ALL of:
 *   1. provider.category === "GLP-1 Provider"
 *      (kills Fitness App, Meal Delivery, Supplement, Weight Loss
 *       Program — none of which sell GLP-1 compounds)
 *   2. pricing[].form === "compounded"
 *      (kills brand-name and oral pricing)
 *   3. pricing[].drug is a known GLP-1 drug string
 *      (kills rows where someone added form="compounded" as a
 *       placeholder without specifying the actual drug)
 *   4. pricing[].monthly_cost >= MIN_PLAUSIBLE_COMPOUNDED_PRICE
 *      (kills consult fees and "Starting at $30" placeholders that
 *       are clearly not the drug price)
 *
 * Selection order among entries that pass the filter:
 *   1. Explicit "0.5mg" entry (matches the chart's canonical dose)
 *   2. "Starting" / "Starting dose" entry
 *   3. Cheapest plausible entry
 *   4. None — provider is skipped from the snapshot
 */
function pickCanonicalCompoundedPrice(
  provider: Provider
): { price: number } | null {
  // Hard category gate — non-GLP-1 categories never enter the pipeline.
  const category = (provider.category as string | undefined) ?? "";
  if (category !== "GLP-1 Provider") return null;

  if (!Array.isArray(provider.pricing) || provider.pricing.length === 0) {
    return null;
  }

  const eligible = provider.pricing.filter(
    (p) =>
      typeof p.monthly_cost === "number" &&
      isFinite(p.monthly_cost) &&
      p.monthly_cost >= MIN_PLAUSIBLE_COMPOUNDED_PRICE &&
      (p.form ?? "").toLowerCase() === "compounded" &&
      isGlp1Drug((p as { drug?: unknown }).drug)
  );
  if (eligible.length === 0) return null;

  const explicitHalfMg = eligible.find((p) =>
    /(^|[^0-9])0\.5\s*mg/i.test(p.dose ?? "")
  );
  if (explicitHalfMg) return { price: explicitHalfMg.monthly_cost };

  const starting = eligible.find((p) =>
    /^starting/i.test((p.dose ?? "").trim())
  );
  if (starting) return { price: starting.monthly_cost };

  const cheapest = eligible.reduce((min, p) =>
    p.monthly_cost < min.monthly_cost ? p : min
  );
  return { price: cheapest.monthly_cost };
}

/**
 * Append a snapshot of every provider's current editorially-approved
 * canonical compounded price into `src/data/price-history.json`.
 *
 * Editorial rule: snapshot the **stored** prices in providers.json (the
 * source of truth the website actually displays), not the scraper's
 * `found_prices`. Found prices need editorial review before they become
 * the public number — history should only ever record what we have
 * publicly told visitors the price was.
 *
 * Each provider produces one canonical history series keyed
 * `${slug}|0.5mg|compounded` regardless of how the provider's own
 * pricing rows are labelled. See `pickCanonicalCompoundedPrice`.
 *
 * Snapshot date = first of the current month (UTC). This preserves the
 * existing monthly cadence in price-history.json and is idempotent
 * within a month — running the scraper multiple times in April 2026
 * never creates more than one 2026-04-01 point per provider.
 */
function appendPriceHistorySnapshot(providers: Provider[]): {
  added: number;
  skipped: number;
  newSeries: number;
  noPrice: number;
  snapshotDate: string;
} {
  const HISTORY_PATH = join(process.cwd(), "src/data/price-history.json");

  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const snapshotDate = `${yyyy}-${mm}-01`;

  let history: PriceHistoryEntry[] = [];
  if (existsSync(HISTORY_PATH)) {
    try {
      const parsed = JSON.parse(readFileSync(HISTORY_PATH, "utf-8"));
      if (Array.isArray(parsed)) history = parsed as PriceHistoryEntry[];
    } catch (err) {
      console.error(
        `  price-history snapshot: failed to parse ${HISTORY_PATH}: ${(err as Error).message}`
      );
      return { added: 0, skipped: 0, newSeries: 0, noPrice: 0, snapshotDate };
    }
  }

  // Canonical key — every provider gets one series under
  // (slug, "0.5mg", "compounded") so the existing chart structure
  // continues to work and the table shows real cross-provider deltas.
  const CANON_DOSE = "0.5mg";
  const CANON_FORM = "compounded";
  const keyOf = (slug: string) => `${slug}|${CANON_DOSE}|${CANON_FORM}`;

  const byKey = new Map<string, PriceHistoryEntry>();
  for (const entry of history) {
    byKey.set(
      `${entry.provider_slug}|${entry.dose}|${entry.form}`,
      entry
    );
  }

  let added = 0;
  let skipped = 0;
  let newSeries = 0;
  let noPrice = 0;

  for (const provider of providers) {
    const canonical = pickCanonicalCompoundedPrice(provider);
    if (!canonical) {
      noPrice += 1;
      continue;
    }
    const k = keyOf(provider.slug);
    let entry = byKey.get(k);
    if (!entry) {
      entry = {
        provider_slug: provider.slug,
        dose: CANON_DOSE,
        form: CANON_FORM,
        history: [],
      };
      history.push(entry);
      byKey.set(k, entry);
      newSeries += 1;
    }
    // Idempotent — leave any existing point for this snapshot date alone.
    if (entry.history.some((pt) => pt.date === snapshotDate)) {
      skipped += 1;
      continue;
    }
    entry.history.push({ date: snapshotDate, price: canonical.price });
    entry.history.sort((a, b) => a.date.localeCompare(b.date));
    added += 1;
  }

  // Sort top-level entries by slug so the JSON diff is readable.
  history.sort((a, b) => {
    const slugCmp = a.provider_slug.localeCompare(b.provider_slug);
    if (slugCmp !== 0) return slugCmp;
    const doseCmp = a.dose.localeCompare(b.dose);
    if (doseCmp !== 0) return doseCmp;
    return a.form.localeCompare(b.form);
  });

  writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2) + "\n");
  return { added, skipped, newSeries, noPrice, snapshotDate };
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

  // Always snapshot current editorially-approved prices into
  // price-history.json. This is what makes the /price-tracker page
  // self-updating: every scraper run captures one (slug, dose, form,
  // first-of-month, monthly_cost) tuple per provider pricing entry.
  // Idempotent within a month — running the scraper twice in April 2026
  // will not double-write 2026-04-01.
  const snapshot = appendPriceHistorySnapshot(providers);
  console.log(
    `\nPrice history snapshot (${snapshot.snapshotDate}): +${snapshot.added} points, ${snapshot.skipped} already present, ${snapshot.newSeries} new series, ${snapshot.noPrice} providers without compounded pricing.`
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
