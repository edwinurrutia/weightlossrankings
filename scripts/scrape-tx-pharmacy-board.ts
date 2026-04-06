/**
 * Texas State Board of Pharmacy scraper.
 *
 * Data source: https://www.pharmacy.texas.gov/dbsearch/phy_search.asp
 * Form posts to: https://www.pharmacy.texas.gov/dbsearch/phy_results.asp
 *
 * Form structure (verified by recon — no Turnstile, no reCAPTCHA,
 * no JavaScript-only validators, plain server-side ASP):
 *
 *   phy_lic        license number (text)
 *   phy_name       pharmacy name (text)
 *   own_name       owner name (text)
 *   own_pht_lic    owner's pharmacist license (text)
 *   phy_st1        street address (text)
 *   phy_zip        ZIP (text)
 *   phy_city       city (select — 1145 Texas city options)
 *   phy_cnty       county (select)
 *   B1             submit button value
 *
 * Strategy: iterate by single-letter pharmacy-name prefix
 * (phy_name=a, phy_name=b, ..., phy_name=z) and dedupe results by
 * license number. Should produce ~5,000-10,000 Texas pharmacies
 * total, of which ~500-1,000 are likely compounding pharmacies
 * (TX has the largest concentration of 503A/503B facilities in
 * the country after CA).
 *
 * CURRENT STATUS — 2026-04-06: BLOCKED BY UPSTREAM MAINTENANCE.
 *
 * The Texas board's "Versa Online" license database is showing a
 * maintenance banner: "Versa Online is temporarily unavailable.
 * We are working with our service provider to restore access as
 * soon as possible." Every POST to phy_results.asp returns the
 * same wrapper page with this banner, regardless of search
 * params. The scraper logic below is verified-correct against the
 * form structure (recon'd live), but cannot be validated end-to-end
 * until Versa is back online.
 *
 * No anti-bot measures on the actual board site itself — when
 * Versa comes back, this scraper should work without changes.
 * Re-test by curling phy_results.asp with a real search and
 * checking whether the response contains a result table or the
 * "temporarily unavailable" string.
 *
 * Usage (when Versa is back):
 *   npx tsx scripts/scrape-tx-pharmacy-board.ts
 *   npx tsx scripts/scrape-tx-pharmacy-board.ts --dry-run
 *   npx tsx scripts/scrape-tx-pharmacy-board.ts --letters ab  # only a, b prefixes
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const VERBOSE = args.includes("--verbose");
const LETTERS_IDX = args.indexOf("--letters");
const LETTERS_ARG =
  LETTERS_IDX >= 0 ? args[LETTERS_IDX + 1] ?? "" : "";
const LETTERS = LETTERS_ARG
  ? LETTERS_ARG.toLowerCase().split("")
  : "abcdefghijklmnopqrstuvwxyz".split("");

const LIVE_PATH = join(process.cwd(), "src/data/pharmacies.json");
const PENDING_PATH = join(process.cwd(), "src/data/pharmacies-pending.json");

const TX_FORM_URL = "https://www.pharmacy.texas.gov/dbsearch/phy_search.asp";
const TX_RESULTS_URL =
  "https://www.pharmacy.texas.gov/dbsearch/phy_results.asp";

const REAL_CHROME_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const REQUEST_DELAY_MS = 1500;

interface PharmacyVerification {
  last_verified?: string;
  verified_by?: string;
  source_urls?: string[];
  confidence?: "low" | "medium" | "high";
  notes?: string;
}

interface Pharmacy {
  _id: string;
  name: string;
  slug: string;
  city: string | null;
  state: string | null;
  established?: number | null;
  type: "503A" | "503B" | "Both" | "Hybrid" | "Unknown";
  certifications: string[];
  states_licensed: string[];
  produces_semaglutide: boolean | null;
  produces_tirzepatide: boolean | null;
  linked_providers: string[];
  website: string | null;
  phone: string | null;
  regulatory_actions: unknown[];
  external_reviews: Record<string, unknown>;
  internal_score: number | null;
  description: string;
  verification: PharmacyVerification;
}

interface RawTxRow {
  licenseNumber: string;
  name: string;
  city: string | null;
  zip: string | null;
}

function vlog(...parts: unknown[]) {
  if (VERBOSE) console.log(...parts);
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function loadJsonArray<T>(path: string): T[] {
  if (!existsSync(path)) return [];
  try {
    const parsed = JSON.parse(readFileSync(path, "utf-8"));
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Detect the upstream maintenance banner. Returns true if the
 * Versa Online system is currently down, in which case there's
 * no point trying to parse results.
 */
function isVersaUnavailable(html: string): boolean {
  return /Versa Online is temporarily unavailable/i.test(html);
}

/**
 * Parse the Texas pharmacy results page. The result table format
 * (when Versa is online) is a standard ASP-rendered HTML table.
 * Each row contains license number, pharmacy name, city, and ZIP.
 *
 * NOTE: This selector logic is provisional — it was written
 * against the form's recon'd structure but cannot be validated
 * end-to-end until Versa is back online. When the system comes
 * back, run with `--letters a` and check the parsed output.
 */
function parseTxResults(html: string): RawTxRow[] {
  const rows: RawTxRow[] = [];
  // Find the result table — typically the only <table> with multiple <tr>
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/gi) ?? [];
  for (const tableHtml of tableMatch) {
    const trs = tableHtml.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) ?? [];
    if (trs.length < 2) continue; // skip non-result tables
    for (const tr of trs) {
      const tds = tr.match(/<td[^>]*>[\s\S]*?<\/td>/gi);
      if (!tds || tds.length < 3) continue;
      const cells = tds.map((td) =>
        td
          .replace(/<[^>]+>/g, " ")
          .replace(/&nbsp;/gi, " ")
          .replace(/\s+/g, " ")
          .trim(),
      );
      // Heuristic: license numbers are 5-7 digits; first cell
      // looking like one is the license, the next is the name
      const licIdx = cells.findIndex((c) => /^\d{5,7}$/.test(c));
      if (licIdx < 0) continue;
      const name = cells[licIdx + 1];
      if (!name) continue;
      rows.push({
        licenseNumber: cells[licIdx],
        name,
        city: cells[licIdx + 2] ?? null,
        zip: cells[licIdx + 3] ?? null,
      });
    }
  }
  return rows;
}

async function searchByLetter(letter: string): Promise<RawTxRow[]> {
  const body = new URLSearchParams({
    phy_lic: "",
    phy_name: letter,
    own_name: "",
    own_pht_lic: "",
    phy_st1: "",
    phy_zip: "",
    phy_city: "",
    phy_cnty: "",
    B1: "Submit",
  });

  const res = await fetch(TX_RESULTS_URL, {
    method: "POST",
    headers: {
      "User-Agent": REAL_CHROME_UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: TX_FORM_URL,
    },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} from ${TX_RESULTS_URL}`);
  }
  const html = await res.text();

  if (isVersaUnavailable(html)) {
    throw new Error(
      "Texas Versa Online system is temporarily unavailable. Re-try when the upstream maintenance window ends.",
    );
  }

  return parseTxResults(html);
}

async function main() {
  console.log("Texas Board of Pharmacy scraper starting…");
  console.log(`  source:       ${TX_RESULTS_URL}`);
  console.log(`  pending file: ${PENDING_PATH}`);
  console.log(`  dry run:      ${DRY_RUN}`);
  console.log(`  letters:      ${LETTERS.join("")}`);
  console.log("");

  const allRaw: RawTxRow[] = [];
  for (const letter of LETTERS) {
    vlog(`  searching name prefix "${letter}"…`);
    try {
      const rows = await searchByLetter(letter);
      vlog(`    → ${rows.length} rows`);
      allRaw.push(...rows);
    } catch (err) {
      console.error(`  Error on "${letter}":`, (err as Error).message);
      // If Versa is unavailable, no point continuing
      if ((err as Error).message.includes("Versa Online")) {
        process.exit(2);
      }
    }
    await sleep(REQUEST_DELAY_MS);
  }

  console.log(`Pulled ${allRaw.length} raw rows total.`);

  // Dedupe by license number
  const seenLic = new Set<string>();
  const deduped: RawTxRow[] = [];
  for (const r of allRaw) {
    if (seenLic.has(r.licenseNumber)) continue;
    seenLic.add(r.licenseNumber);
    deduped.push(r);
  }
  console.log(`Deduped to ${deduped.length} unique pharmacies.`);

  // Merge against existing
  const live = loadJsonArray<Pharmacy>(LIVE_PATH);
  const pending = loadJsonArray<Pharmacy>(PENDING_PATH);
  const seenSlugs = new Set<string>();
  const seenNames = new Set<string>();
  const normName = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
  for (const p of [...live, ...pending]) {
    seenSlugs.add(p.slug);
    seenNames.add(normName(p.name));
  }

  const newPharmacies: Pharmacy[] = [];
  let added = 0;
  let skipped = 0;
  for (const r of deduped) {
    const slug = slugify(r.name);
    if (!slug) continue;
    if (seenSlugs.has(slug) || seenNames.has(normName(r.name))) {
      skipped += 1;
      continue;
    }
    newPharmacies.push({
      _id: slug,
      name: r.name,
      slug,
      city: r.city,
      state: "TX",
      established: null,
      type: "Unknown", // TX board doesn't tag 503A vs 503B in the search results
      certifications: [],
      states_licensed: ["TX"],
      produces_semaglutide: null,
      produces_tirzepatide: null,
      linked_providers: [],
      website: null,
      phone: null,
      regulatory_actions: [],
      external_reviews: {},
      internal_score: null,
      description: `Licensed by the Texas State Board of Pharmacy (license #${r.licenseNumber}). Auto-imported from the public TSBP license search.`,
      verification: {
        last_verified: todayISO(),
        verified_by: "tx-pharmacy-board-scraper",
        source_urls: [TX_FORM_URL],
        confidence: "low",
        notes:
          "Auto-imported from Texas Board of Pharmacy license search. Pharmacy type (503A vs 503B), production claims, website, certifications, and ZIP all require editorial verification before this entry should be relied on.",
      },
    });
    seenSlugs.add(slug);
    seenNames.add(normName(r.name));
    added += 1;
  }

  console.log("");
  console.log(`Summary:`);
  console.log(`  + ${added} new pharmacies discovered`);
  console.log(`  • ${skipped} already known (live or pending) — skipped`);
  console.log("");

  if (added === 0) {
    console.log("Nothing new to write.");
    return;
  }
  if (DRY_RUN) {
    console.log("--dry-run set; not modifying any file.");
    console.log("Sample of new entries:");
    for (const p of newPharmacies.slice(0, 5)) {
      console.log(`  ${p.name} — ${p.city ?? "?"}, TX`);
    }
    return;
  }

  const merged = [...pending, ...newPharmacies].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  writeFileSync(PENDING_PATH, JSON.stringify(merged, null, 2) + "\n");
  console.log(
    `Wrote ${merged.length} pharmacies to ${PENDING_PATH} (live ${LIVE_PATH} untouched).`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
