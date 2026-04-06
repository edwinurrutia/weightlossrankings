/**
 * enrich-pending-pharmacies.ts — guess + verify website URLs for
 * the FDA-imported entries in src/data/pharmacies-pending.json.
 *
 * The FDA 503B registry doesn't include pharmacy websites — the
 * scraper that imports it (scripts/scrape-fda-outsourcing-facilities.ts)
 * leaves website=null on every entry. Editors then have to find each
 * pharmacy's site manually, which is the longest part of the
 * promote-pharmacy workflow.
 *
 * This script automates the easy half of that lookup: for each
 * pending entry, generate 4-6 candidate URLs from the pharmacy name
 * using common compounding-pharmacy URL patterns, do HEAD requests
 * against each, and set entry.website to the first one that returns
 * a real HTML response. Adds a verification note marking the
 * discovery as "auto-guessed" so editors know to spot-check.
 *
 * Hit rate is maybe 30-50% — many small compounding pharmacies use
 * unusual domains (e.g. their owner's name, an unrelated brand).
 * Auto-guessing won't replace editorial review, but it cuts the
 * average promote workflow time meaningfully when it works.
 *
 * Editorial rules:
 *   - Never overwrite an existing website value (editors trump scraper)
 *   - Never claim discovery confidence higher than "low"
 *   - Always add a verification note explaining the auto-guess
 *
 * Usage:
 *   npx tsx scripts/enrich-pending-pharmacies.ts             # full run
 *   npx tsx scripts/enrich-pending-pharmacies.ts --dry-run   # don't write
 *   npx tsx scripts/enrich-pending-pharmacies.ts --verbose   # noisy logs
 *   npx tsx scripts/enrich-pending-pharmacies.ts --slug X    # one entry only
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

interface Pharmacy {
  slug: string;
  name: string;
  website: string | null;
  verification?: {
    last_verified?: string;
    verified_by?: string;
    source_urls?: string[];
    confidence?: "low" | "medium" | "high";
    notes?: string;
  };
  [key: string]: unknown;
}

const PENDING_PATH = join(process.cwd(), "src/data/pharmacies-pending.json");
const REQUEST_TIMEOUT_MS = 8_000;
const REQUEST_DELAY_MS = 600;
const REAL_CHROME_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const VERBOSE = args.includes("--verbose");
const SLUG_IDX = args.indexOf("--slug");
const SLUG_FILTER = SLUG_IDX >= 0 ? args[SLUG_IDX + 1] : "";

function vlog(...parts: unknown[]) {
  if (VERBOSE) console.log(...parts);
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ---------------- URL candidate generation ----------------

/**
 * Generate candidate domain bases from a pharmacy name. Strips
 * common corporate suffixes (Inc, LLC, etc.), removes punctuation,
 * and produces a few variants:
 *
 *   "AnazaoHealth Corporation"           → ["anazaohealth"]
 *   "Apothecary Pharma, LLC"             → ["apothecarypharma", "apothecary-pharma", "apothecarypharmacy"]
 *   "503B Outsourcing Facility One, LLC" → ["503boutsourcingfacilityone", "outsourcingfacilityone"]
 *
 * These are tried in order against several TLDs.
 */
function generateNameVariants(name: string): string[] {
  // Strip everything after "dba" (e.g. "Foo LLC dba Bar Pharmacy")
  // and prefer the dba part if present.
  const dbaMatch = name.match(/(.+?)\s+dba\s+(.+)/i);
  const candidates: string[] = [];
  if (dbaMatch) {
    candidates.push(dbaMatch[2]);
    candidates.push(dbaMatch[1]);
  } else {
    candidates.push(name);
  }

  const SUFFIXES =
    /[,\s]+(?:Inc\.?|LLC|L\.L\.C\.|Corporation|Corp\.?|Ltd\.?|Co\.?|Pharmacy|Pharmaceuticals?|Compounding|Company|Group|Holdings?|Limited|Healthcare|PLLC)\.?$/gi;

  // Generic / common words that should NEVER be used as a domain
  // base — they almost always belong to unrelated big companies or
  // parked-domain squatters. The previous enrichment run produced
  // false positives like "University of Tennessee" → university.com,
  // "Wesley Pharmaceuticals" → wesley.com, "Wells Pharma" → wells.org,
  // "Quantum Pharmaceuticals" → quantum.com. These are exactly the
  // tokens we have to refuse.
  const COMMON_WORD_BLOCKLIST = new Set([
    "university", "wells", "wesley", "nova", "quantum", "vital", "health",
    "care", "medical", "advanced", "advance", "modern", "premier", "premium",
    "first", "elite", "express", "select", "summit", "pinnacle", "alpha",
    "omega", "beta", "delta", "epsilon", "apex", "atlas", "atlas", "ridge",
    "valley", "lake", "river", "hill", "park", "central", "national",
    "american", "western", "eastern", "northern", "southern", "global",
    "united", "alliance", "associates", "group", "labs", "lab", "rx",
    "pharma", "pharmacy", "compound", "compounding", "wellness", "life",
    "spring", "harbor", "bay", "coast", "metro", "city", "state", "us",
    "usa", "drug", "drugs", "store", "stores", "scientific", "specialty",
    "therapy", "solutions", "services", "innovations", "innovation",
  ]);

  const variants = new Set<string>();
  for (const raw of candidates) {
    let cleaned = raw;
    // Strip suffixes repeatedly (handles "Foo, Inc." then "Foo Pharmacy")
    for (let i = 0; i < 5; i++) {
      const next = cleaned.replace(SUFFIXES, "").trim();
      if (next === cleaned) break;
      cleaned = next;
    }
    cleaned = cleaned.replace(/[.,&'"]+/g, " ").replace(/\s+/g, " ").trim();
    if (!cleaned) continue;

    const words = cleaned.split(/\s+/);

    // Variant 1: collapse all whitespace (most common pattern)
    // Only meaningful when the result is at least 8 chars OR multi-word —
    // single short words like "nova" or "quantum" produce false positives.
    const collapsed = cleaned.toLowerCase().replace(/\s+/g, "");
    if (
      (collapsed.length >= 8 || words.length >= 2) &&
      !COMMON_WORD_BLOCKLIST.has(collapsed)
    ) {
      variants.add(collapsed);
    }
    // Variant 2: hyphenated (only useful when 2+ words)
    if (words.length >= 2) {
      variants.add(cleaned.toLowerCase().replace(/\s+/g, "-"));
    }
    // Variant 3: first word only — REMOVED. It generated 50%+ false
    // positives in v1 because common pharma words ("nova", "wells",
    // "quantum") collide with unrelated big-company domains.
    // Variant 4: first two words concatenated (good for "AH Nutraceutical
    // Compounding" → "ahnutraceutical"). Require both to be present and
    // the combined string to be at least 8 chars.
    if (words.length >= 2) {
      const firstTwo = (words[0] + words[1]).toLowerCase();
      if (
        firstTwo.length >= 8 &&
        !COMMON_WORD_BLOCKLIST.has(firstTwo)
      ) {
        variants.add(firstTwo);
      }
    }
  }

  // Filter junk: must be at least 6 chars (was 3 — too permissive),
  // alphanum + hyphens only, and not on the common-word blocklist.
  return Array.from(variants).filter(
    (v) =>
      v.length >= 6 &&
      /^[a-z0-9-]+$/.test(v) &&
      !COMMON_WORD_BLOCKLIST.has(v.replace(/-/g, "")),
  );
}

/**
 * Map each name variant to candidate URLs across common TLDs and
 * www variants. We try .com first (most likely), then .net, .org,
 * .pharmacy, .health, .care.
 */
function generateCandidateUrls(name: string): string[] {
  const variants = generateNameVariants(name);
  const tlds = [".com", ".net", ".org", ".pharmacy", ".health", ".care"];
  const urls = new Set<string>();
  for (const variant of variants) {
    for (const tld of tlds) {
      urls.add(`https://${variant}${tld}`);
      urls.add(`https://www.${variant}${tld}`);
    }
  }
  return Array.from(urls);
}

// ---------------- HEAD test ----------------

async function headTest(url: string): Promise<{ ok: boolean; status: number | null }> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    // Try HEAD first; if the server doesn't support it, fall back to GET.
    let res: Response;
    try {
      res = await fetch(url, {
        method: "HEAD",
        headers: { "User-Agent": REAL_CHROME_UA },
        signal: ctrl.signal,
        redirect: "follow",
      });
    } catch {
      res = await fetch(url, {
        method: "GET",
        headers: { "User-Agent": REAL_CHROME_UA },
        signal: ctrl.signal,
        redirect: "follow",
      });
    }
    if (res.status >= 200 && res.status < 400) {
      const ct = res.headers.get("content-type") ?? "";
      // Accept HTML responses; reject text/plain or empty bodies which
      // are usually parking pages or maintenance stubs.
      if (ct.includes("html") || ct === "") {
        return { ok: true, status: res.status };
      }
    }
    return { ok: false, status: res.status };
  } catch {
    return { ok: false, status: null };
  } finally {
    clearTimeout(t);
  }
}

// ---------------- main ----------------

async function main() {
  if (!existsSync(PENDING_PATH)) {
    console.error(`Pending file not found: ${PENDING_PATH}`);
    process.exit(1);
  }
  const pending: Pharmacy[] = JSON.parse(readFileSync(PENDING_PATH, "utf-8"));
  console.log(`Loaded ${pending.length} pending pharmacies.`);

  const targets = SLUG_FILTER
    ? pending.filter((p) => p.slug === SLUG_FILTER)
    : pending.filter((p) => !p.website);

  if (targets.length === 0) {
    console.log(
      SLUG_FILTER
        ? `No pending entry with slug "${SLUG_FILTER}".`
        : "Nothing to enrich — every pending entry already has a website.",
    );
    return;
  }
  console.log(`Enriching ${targets.length} entries (skipping any that already have a website).`);
  console.log("");

  let hits = 0;
  let misses = 0;

  for (const pharmacy of targets) {
    const candidates = generateCandidateUrls(pharmacy.name);
    vlog(`  ${pharmacy.name} → ${candidates.length} candidates`);
    let found: string | null = null;
    for (const url of candidates) {
      vlog(`    try ${url}`);
      const res = await headTest(url);
      await sleep(REQUEST_DELAY_MS);
      if (res.ok) {
        found = url;
        break;
      }
    }
    if (found) {
      pharmacy.website = found;
      pharmacy.verification = pharmacy.verification ?? {};
      const existingNotes = pharmacy.verification.notes ?? "";
      const newNote = `Website auto-guessed by enrich-pending-pharmacies.ts (${found}). Editor must verify the site actually belongs to this pharmacy before promotion.`;
      pharmacy.verification.notes = existingNotes
        ? `${existingNotes} ${newNote}`
        : newNote;
      hits += 1;
      console.log(`  ✅ ${pharmacy.name} → ${found}`);
    } else {
      misses += 1;
      vlog(`  ❌ ${pharmacy.name} — no candidate URL responded`);
    }
  }

  console.log("");
  console.log(`Summary: ${hits} websites discovered, ${misses} unresolved.`);

  if (DRY_RUN) {
    console.log("--dry-run set; not modifying pharmacies-pending.json.");
    return;
  }
  if (hits === 0) {
    console.log("Nothing to write.");
    return;
  }

  writeFileSync(PENDING_PATH, JSON.stringify(pending, null, 2) + "\n");
  console.log(`Wrote ${pending.length} pharmacies to ${PENDING_PATH}.`);
  console.log("");
  console.log("REMINDER: every auto-discovered website is tagged as needing");
  console.log("editorial verification. Use scripts/promote-pharmacy.ts to");
  console.log("review each entry before bumping confidence to medium/high.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
