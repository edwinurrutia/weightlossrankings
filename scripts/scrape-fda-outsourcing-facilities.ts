/**
 * FDA 503B Outsourcing Facility scraper for WeightLossRankings.org
 *
 * Pulls the official FDA registry of registered 503B outsourcing
 * facilities and writes new entries to src/data/pharmacies-pending.json
 * — a separate "editorial review queue" file that lives alongside the
 * live src/data/pharmacies.json.
 *
 * Why a separate file: pharmacies.json is the editorially-curated
 * source of truth that powers /pharmacies and the per-pharmacy detail
 * pages. Those pages assume every entry has a real internal_score,
 * verified production claims (semaglutide/tirzepatide), a website,
 * and other manually-vetted fields. The FDA registry only tells us
 * "this facility is registered as 503B" — not what they actually
 * produce, what their score should be, or which telehealth
 * providers source from them. Auto-merging FDA imports directly
 * into pharmacies.json would either:
 *   (a) crash the live page (calling .toFixed() on a null score), or
 *   (b) require lying with placeholder values
 * Neither is acceptable. The pending file lets editors review the
 * 80+ scraped facilities and manually promote them into pharmacies.json
 * one at a time after enriching them with the missing data.
 *
 * Source:
 *   https://www.fda.gov/drugs/human-drug-compounding/registered-outsourcing-facilities
 *
 * The FDA page renders a single HTML <table> with one row per
 * facility. Columns:
 *   - Facility (name + city + state, comma-separated)
 *   - Contact (name + phone)
 *   - Initial Registration Date
 *   - Most Recent Registration Date
 *   - Last Inspection
 *   - Form 483 Issued?
 *   - Recall Conducted?
 *   - Action Based on Last Inspection
 *   - Intends to Compound Sterile Drugs From Bulk Substances
 *
 * Editorial rules — non-negotiable:
 *   - NEVER write to pharmacies.json. Always write to the pending file.
 *   - Dedupe against BOTH the live file and the pending file so
 *     re-running the scraper does not create duplicates.
 *   - NEVER claim produces_semaglutide or produces_tirzepatide. The FDA
 *     list does not say what each facility actually compounds.
 *   - Tag every entry with verification.confidence = "low".
 *
 * Usage:
 *   npx tsx scripts/scrape-fda-outsourcing-facilities.ts            # full run
 *   npx tsx scripts/scrape-fda-outsourcing-facilities.ts --dry-run  # don't write
 *   npx tsx scripts/scrape-fda-outsourcing-facilities.ts --verbose  # noisy logs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// ---------------- args ----------------

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const VERBOSE = args.includes("--verbose");

// ---------------- constants ----------------

const FDA_503B_URL =
  "https://www.fda.gov/drugs/human-drug-compounding/registered-outsourcing-facilities";

const REQUEST_TIMEOUT_MS = 30_000;
const REAL_CHROME_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const LIVE_PATH = join(process.cwd(), "src/data/pharmacies.json");
const PENDING_PATH = join(process.cwd(), "src/data/pharmacies-pending.json");

// ---------------- types ----------------

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
  type: "503A" | "503B" | "Hybrid" | "Unknown";
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

interface RawFacility {
  facilityCell: string;
  contactCell: string;
  initialRegDate: string;
  recentRegDate: string;
  lastInspection: string;
  form483: string;
  recall: string;
  action: string;
  intendsBulk: string;
}

// ---------------- helpers ----------------

function log(...parts: unknown[]) {
  console.log(...parts);
}
function vlog(...parts: unknown[]) {
  if (VERBOSE) console.log(...parts);
}
function elog(...parts: unknown[]) {
  console.error(...parts);
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Strip HTML tags and decode the few entities the FDA page actually
 * uses. Not a full HTML parser — sufficient for the table cells the
 * FDA renders, which are plain text wrapped in <td> with the
 * occasional &nbsp; or &amp;.
 */
function cleanCell(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchHtml(url: string): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": REAL_CHROME_UA },
      signal: ctrl.signal,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} fetching ${url}`);
    }
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

// ---------------- table parsing ----------------

function parseFdaTable(html: string): RawFacility[] {
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) {
    elog("No <table> found on FDA 503B page — page structure changed?");
    return [];
  }
  const tableHtml = tableMatch[1];
  const rowMatches = tableHtml.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) ?? [];
  const facilities: RawFacility[] = [];
  for (const rowHtml of rowMatches) {
    const tdMatches = rowHtml.match(/<td[^>]*>[\s\S]*?<\/td>/gi);
    if (!tdMatches || tdMatches.length < 2) continue;
    const cells = tdMatches.map(cleanCell);
    facilities.push({
      facilityCell: cells[0] ?? "",
      contactCell: cells[1] ?? "",
      initialRegDate: cells[2] ?? "",
      recentRegDate: cells[3] ?? "",
      lastInspection: cells[4] ?? "",
      form483: cells[5] ?? "",
      recall: cells[6] ?? "",
      action: cells[7] ?? "",
      intendsBulk: cells[8] ?? "",
    });
  }
  return facilities;
}

/**
 * Split "Facility Name, City, ST" into name + city + state.
 *
 * The FDA page uses comma separators but facility names themselves
 * sometimes contain commas ("503B Outsourcing Facility One, LLC,
 * West Palm Beach, FL"). The trailing two segments are always city
 * + 2-letter state, so we split from the right.
 */
function parseFacilityCell(
  cell: string
): { name: string; city: string | null; state: string | null } {
  const parts = cell.split(/,\s*/);
  if (parts.length < 3) {
    return { name: cell.trim(), city: null, state: null };
  }
  const last = parts[parts.length - 1].trim();
  const secondLast = parts[parts.length - 2].trim();
  // 2-letter US state code
  if (/^[A-Z]{2}$/.test(last)) {
    const name = parts.slice(0, -2).join(", ").trim();
    return { name, city: secondLast || null, state: last };
  }
  return { name: cell.trim(), city: null, state: null };
}

function parseContactCell(
  cell: string
): { contact: string | null; phone: string | null } {
  // Contact format: "Name 1-555-555-5555" or "Name 555-555-5555" or "Name 800-555-5555"
  const phoneMatch = cell.match(
    /(?:1[-\s]?)?\(?(\d{3})\)?[-\s]?(\d{3})[-\s]?(\d{4})/
  );
  if (!phoneMatch) {
    return { contact: cell.trim() || null, phone: null };
  }
  const phone = `(${phoneMatch[1]}) ${phoneMatch[2]}-${phoneMatch[3]}`;
  const contact = cell.slice(0, phoneMatch.index!).trim() || null;
  return { contact, phone };
}

/**
 * Convert "12/31/2025" → "2025-12-31". Returns null on anything that
 * doesn't look like a date (e.g. "Not yet inspected", "N/A").
 */
function parseUsDate(s: string): string | null {
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const mm = m[1].padStart(2, "0");
  const dd = m[2].padStart(2, "0");
  return `${m[3]}-${mm}-${dd}`;
}

// ---------------- conversion ----------------

function rawToPharmacy(raw: RawFacility): Pharmacy | null {
  const { name, city, state } = parseFacilityCell(raw.facilityCell);
  if (!name) return null;
  const { phone } = parseContactCell(raw.contactCell);
  const initialReg = parseUsDate(raw.initialRegDate);
  const recentReg = parseUsDate(raw.recentRegDate);

  const slug = slugify(name);
  if (!slug) return null;

  const descriptionParts: string[] = [];
  descriptionParts.push(
    `Registered with FDA as a 503B outsourcing facility${
      initialReg ? ` since ${initialReg}` : ""
    }${recentReg ? `, most recently re-registered ${recentReg}` : ""}.`
  );
  if (raw.intendsBulk && /yes/i.test(raw.intendsBulk)) {
    descriptionParts.push(
      "Registered intent to compound sterile drugs from bulk substances."
    );
  }
  if (raw.lastInspection && parseUsDate(raw.lastInspection)) {
    descriptionParts.push(
      `Last FDA inspection: ${parseUsDate(raw.lastInspection)}.`
    );
  }
  if (raw.form483 && /yes/i.test(raw.form483)) {
    descriptionParts.push(
      "FDA issued a Form 483 (inspectional observations) at the last inspection."
    );
  }
  if (raw.recall && /yes/i.test(raw.recall)) {
    descriptionParts.push(
      "Recall conducted following the last inspection."
    );
  }

  return {
    _id: slug,
    name,
    slug,
    city,
    state,
    established: null,
    type: "503B",
    certifications: ["503B"],
    states_licensed: state ? [state] : [], // FDA registry does not list per-state licenses
    // Editorial rule: NEVER claim production without verification
    produces_semaglutide: null,
    produces_tirzepatide: null,
    linked_providers: [],
    website: null,
    phone,
    regulatory_actions: [],
    external_reviews: {},
    internal_score: null,
    description: descriptionParts.join(" "),
    verification: {
      last_verified: todayISO(),
      verified_by: "fda-503b-scraper",
      source_urls: [FDA_503B_URL],
      confidence: "low",
      notes:
        "Auto-imported from FDA 503B registry. Production claims (semaglutide/tirzepatide), website, certifications beyond 503B, and linked telehealth providers all require editorial verification before this entry should be relied on.",
    },
  };
}

// ---------------- main ----------------

function loadJsonArray<T>(path: string): T[] {
  if (!existsSync(path)) return [];
  try {
    const parsed = JSON.parse(readFileSync(path, "utf-8"));
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (err) {
    elog(`Failed to parse ${path}: ${(err as Error).message}`);
    process.exit(1);
  }
}

async function main() {
  log("FDA 503B Outsourcing Facility scraper starting…");
  log(`  source:       ${FDA_503B_URL}`);
  log(`  live file:    ${LIVE_PATH}`);
  log(`  pending file: ${PENDING_PATH}`);
  log(`  dry run:      ${DRY_RUN}`);
  log("");

  let html: string;
  try {
    html = await fetchHtml(FDA_503B_URL);
  } catch (err) {
    elog("Fatal error fetching FDA 503B page:", (err as Error).message);
    process.exit(1);
  }

  const raws = parseFdaTable(html);
  log(`Parsed ${raws.length} facility rows from FDA registry.`);
  if (raws.length === 0) {
    elog("Zero rows parsed — bailing out without touching any file.");
    process.exit(1);
  }

  // Dedupe against BOTH the live file (editorially curated, must
  // never be touched by the scraper) and the pending file (previous
  // scraper runs that haven't been promoted yet).
  const live = loadJsonArray<Pharmacy>(LIVE_PATH);
  const pending = loadJsonArray<Pharmacy>(PENDING_PATH);
  log(`Loaded ${live.length} live pharmacies + ${pending.length} pending.`);

  const normalizeName = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "");

  const seenSlugs = new Set<string>();
  const seenNames = new Set<string>();
  for (const p of live) {
    seenSlugs.add(p.slug);
    seenNames.add(normalizeName(p.name));
  }
  for (const p of pending) {
    seenSlugs.add(p.slug);
    seenNames.add(normalizeName(p.name));
  }

  let added = 0;
  let skippedExisting = 0;
  let skippedInvalid = 0;
  const newPharmacies: Pharmacy[] = [];

  for (const raw of raws) {
    const pharmacy = rawToPharmacy(raw);
    if (!pharmacy) {
      skippedInvalid += 1;
      vlog(`  skip (invalid row): ${raw.facilityCell}`);
      continue;
    }
    if (
      seenSlugs.has(pharmacy.slug) ||
      seenNames.has(normalizeName(pharmacy.name))
    ) {
      skippedExisting += 1;
      vlog(`  skip (already known): ${pharmacy.name}`);
      continue;
    }
    newPharmacies.push(pharmacy);
    seenSlugs.add(pharmacy.slug);
    seenNames.add(normalizeName(pharmacy.name));
    added += 1;
    vlog(
      `  + ${pharmacy.name} (${pharmacy.city ?? "?"}, ${pharmacy.state ?? "?"})`
    );
  }

  log("");
  log(`Summary:`);
  log(`  + ${added} new pharmacies discovered`);
  log(`  • ${skippedExisting} already known (live or pending) — skipped`);
  log(`  • ${skippedInvalid} invalid/unparseable rows — skipped`);
  log("");

  if (added === 0 && pending.length === 0) {
    log("Nothing new to write.");
    return;
  }

  if (DRY_RUN) {
    log("--dry-run set; not modifying any file.");
    if (newPharmacies.length > 0) {
      log("Sample of what would be added to pending:");
      for (const p of newPharmacies.slice(0, 5)) {
        log(`  ${p.name} — ${p.city}, ${p.state}`);
      }
    }
    return;
  }

  const mergedPending = [...pending, ...newPharmacies].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  writeFileSync(PENDING_PATH, JSON.stringify(mergedPending, null, 2) + "\n");
  log(
    `Wrote ${mergedPending.length} pharmacies to ${PENDING_PATH} (live ${LIVE_PATH} untouched).`
  );
  log("");
  log("EDITORIAL REVIEW QUEUE:");
  log(`  ${mergedPending.length} pharmacies are now waiting for review in`);
  log(`  src/data/pharmacies-pending.json. To promote one to the live`);
  log("  pharmacies.json, an editor needs to:");
  log("    1. Verify production claims (semaglutide/tirzepatide)");
  log("    2. Add a website, phone (if missing), and internal_score");
  log("    3. Add states_licensed, linked_providers, established year");
  log("    4. Move the entry into pharmacies.json and remove from pending");
  log("    5. Bump verification.confidence to medium or high");
}

main().catch((err) => {
  elog("Fatal error:", err);
  process.exit(1);
});
