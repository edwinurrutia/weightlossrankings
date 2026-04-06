/**
 * PCAB / APC Compounding Pharmacy Locator scraper.
 *
 * Scrapes the Alliance for Pharmacy Compounding (APC) "Find a
 * Compounder" locator at https://a4pc.org/find-a-compounder, which
 * embeds a Bullseye Locations widget at:
 *
 *   https://iacprx.bullseyelocations.com/pages/compounders?f=1
 *
 * The Bullseye widget is geo-search-only — there is no public
 * "list all" endpoint. To get nationwide coverage we iterate
 * through 20 anchor cities at 200-mile radius and dedupe the
 * overlapping results by normalized name+address.
 *
 * Form selectors (verified via Playwright recon):
 *   #txtCityStateZip                       — city/state/zip input
 *   #ContentPlaceHolder1_radiusList        — radius select
 *   #ContentPlaceHolder1_searchButton      — search button
 *   .location                              — result row container
 *
 * Editorial rules — same as scrape-fda-outsourcing-facilities.ts:
 *   - NEVER write to pharmacies.json. Always write to pending file.
 *   - Dedupe against BOTH live + pending on every run
 *   - NEVER claim production (semaglutide/tirzepatide) — that
 *     requires editorial verification
 *   - Tag every entry with verification.confidence = "low"
 *
 * Usage:
 *   npx tsx scripts/scrape-pcab-pharmacies.ts             # full run
 *   npx tsx scripts/scrape-pcab-pharmacies.ts --dry-run   # don't write
 *   npx tsx scripts/scrape-pcab-pharmacies.ts --verbose   # noisy logs
 *   npx tsx scripts/scrape-pcab-pharmacies.ts --cities 5  # limit to first N anchor cities
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const VERBOSE = args.includes("--verbose");
const CITIES_IDX = args.indexOf("--cities");
const CITIES_LIMIT =
  CITIES_IDX >= 0 ? parseInt(args[CITIES_IDX + 1] ?? "0", 10) : 0;

const LIVE_PATH = join(process.cwd(), "src/data/pharmacies.json");
const PENDING_PATH = join(process.cwd(), "src/data/pharmacies-pending.json");

const BULLSEYE_URL =
  "https://iacprx.bullseyelocations.com/pages/compounders?f=1";

const REAL_CHROME_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

// 20 anchor cities chosen for ~uniform US coverage at 200-mile
// radius. Some overlap is expected and gets deduped on the way out.
const ANCHOR_CITIES = [
  "New York, NY",
  "Boston, MA",
  "Washington, DC",
  "Atlanta, GA",
  "Miami, FL",
  "Charlotte, NC",
  "Detroit, MI",
  "Chicago, IL",
  "Memphis, TN",
  "New Orleans, LA",
  "Houston, TX",
  "Dallas, TX",
  "Denver, CO",
  "Phoenix, AZ",
  "Salt Lake City, UT",
  "Los Angeles, CA",
  "San Francisco, CA",
  "Seattle, WA",
  "Minneapolis, MN",
  "Kansas City, MO",
];

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

interface RawResult {
  name: string;
  address: string;
  city: string | null;
  state: string | null;
  phone: string | null;
  website: string | null;
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
  } catch (err) {
    console.error(`Failed to parse ${path}: ${(err as Error).message}`);
    process.exit(1);
  }
}

// ---------------- Playwright loading ----------------

interface PlaywrightModule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chromium: any;
}

async function loadPlaywright(): Promise<PlaywrightModule | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pw = (await (new Function("m", "return import(m)")(
      "playwright",
    ) as Promise<any>).catch(() => null)) as PlaywrightModule | null;
    if (pw && pw.chromium) return pw;
    return null;
  } catch {
    return null;
  }
}

// ---------------- main ----------------

async function main() {
  console.log("PCAB / APC Locator scraper starting…");
  console.log(`  source:       ${BULLSEYE_URL}`);
  console.log(`  pending file: ${PENDING_PATH}`);
  console.log(`  dry run:      ${DRY_RUN}`);
  console.log(`  cities:       ${CITIES_LIMIT || ANCHOR_CITIES.length}`);
  console.log("");

  const pw = await loadPlaywright();
  if (!pw) {
    console.error(
      "Playwright is not installed. Install with `npm install -D playwright && npx playwright install chromium`.",
    );
    process.exit(1);
  }

  const cities = CITIES_LIMIT > 0 ? ANCHOR_CITIES.slice(0, CITIES_LIMIT) : ANCHOR_CITIES;

  const browser = await pw.chromium.launch({ headless: true });
  const allRaw: RawResult[] = [];
  try {
    const ctx = await browser.newContext({
      userAgent: REAL_CHROME_UA,
      viewport: { width: 1400, height: 2500 },
    });
    const page = await ctx.newPage();
    await page.goto(BULLSEYE_URL, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    try {
      await page.waitForLoadState("networkidle", { timeout: 10000 });
    } catch {
      // tolerate slow networkidle
    }
    await page.waitForTimeout(2000);

    // Set radius to 200 miles ONCE before the city loop. Bullseye's
    // radius select fires its own autopostback when changed which
    // resets the city field and breaks the search flow if we change
    // it inside the loop. Setting it once and letting it persist
    // across postbacks works correctly.
    try {
      await page.selectOption("#ContentPlaceHolder1_radiusList", {
        value: "200",
      });
      await page.waitForTimeout(1500);
    } catch {
      // tolerate — falls back to default 20mi (smaller radius =
      // fewer results, but the scraper still works)
    }

    for (const city of cities) {
      vlog(`  searching ${city}…`);

      // Clear the city/zip field and type the new query. Triple-click
      // to select-all then type — direct .fill() doesn't always
      // trigger the input validators that enable the search button.
      await page.click("#txtCityStateZip", { clickCount: 3 });
      await page.keyboard.type(city, { delay: 30 });
      await page.waitForTimeout(800);

      // Submit by pressing Enter on the input — this triggers the
      // ASP.NET WebForms postback that the search button click does
      // NOT reliably fire from Playwright (the click event gets
      // intercepted somewhere in Bullseye's JS handler chain and the
      // postback never goes out).
      await page.press("#txtCityStateZip", "Enter");

      // Wait for the postback response to complete
      try {
        await page.waitForLoadState("networkidle", { timeout: 15000 });
      } catch {
        // tolerate
      }
      await page.waitForTimeout(2000);

      // Extract results using schema.org microdata. Each result row
      // is a <li> with itemtype="http://schema.org/LocalBusiness"
      // containing structured itemprops for name, address (street/
      // locality/region/postalCode), telephone, and url.
      //
      // String-based evaluator (not a function literal) — tsx
      // injects __name helpers into function-literal page.evaluate
      // calls which crash inside the browser context. The FDA
      // scraper uses the same workaround.
      const cityRaw = (await page.evaluate(`(() => {
        var out = [];
        var items = Array.prototype.slice.call(
          document.querySelectorAll('[itemtype*="LocalBusiness"]')
        );
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          function text(sel) {
            var el = item.querySelector(sel);
            return (el && el.textContent ? el.textContent : '').replace(/\\s+/g, ' ').trim();
          }
          function attr(sel, name) {
            var el = item.querySelector(sel);
            return (el && el.getAttribute) ? (el.getAttribute(name) || '') : '';
          }
          var name = text('[itemprop="name"]');
          if (!name) continue;
          out.push({
            name: name,
            street: text('[itemprop="streetAddress"]'),
            city: text('[itemprop="addressLocality"]'),
            state: text('[itemprop="addressRegion"]'),
            zip: text('[itemprop="postalCode"]'),
            phone: text('[itemprop="telephone"]'),
            website: attr('[itemprop="url"]', 'href')
          });
        }
        return out;
      })()`)) as Array<{
        name: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        phone: string;
        website: string;
      }>;

      vlog(`    → ${cityRaw.length} raw results`);
      for (const r of cityRaw) {
        const addressParts = [
          r.street,
          [r.city, r.state, r.zip].filter(Boolean).join(" "),
        ]
          .filter(Boolean)
          .join(", ");
        allRaw.push({
          name: r.name,
          address: addressParts,
          city: r.city || null,
          state: r.state || null,
          phone: r.phone || null,
          website: r.website || null,
        });
      }

      // Polite delay between searches
      await page.waitForTimeout(1500);
    }

    await ctx.close();
  } finally {
    await browser.close();
  }

  console.log(`Pulled ${allRaw.length} raw results across ${cities.length} cities.`);

  // Dedupe by normalized name (and address as tiebreaker)
  const normalizeName = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "");
  const seen = new Map<string, RawResult>();
  for (const r of allRaw) {
    const key = normalizeName(r.name);
    if (!key) continue;
    if (!seen.has(key)) seen.set(key, r);
  }
  const deduped = Array.from(seen.values());
  console.log(`Deduped to ${deduped.length} unique pharmacies.`);

  // Load existing live + pending and dedupe again
  const live = loadJsonArray<Pharmacy>(LIVE_PATH);
  const pending = loadJsonArray<Pharmacy>(PENDING_PATH);
  const seenSlugs = new Set<string>();
  const seenNames = new Set<string>();
  for (const p of [...live, ...pending]) {
    seenSlugs.add(p.slug);
    seenNames.add(normalizeName(p.name));
  }

  let added = 0;
  let skippedExisting = 0;
  const newPharmacies: Pharmacy[] = [];

  for (const r of deduped) {
    const slug = slugify(r.name);
    if (!slug) continue;
    if (seenSlugs.has(slug) || seenNames.has(normalizeName(r.name))) {
      skippedExisting += 1;
      continue;
    }
    const pharmacy: Pharmacy = {
      _id: slug,
      name: r.name,
      slug,
      city: r.city,
      state: r.state,
      established: null,
      // PCAB locator includes both 503A and 503B pharmacies, but the
      // widget doesn't tag them. Default to 503A (more common in
      // PCAB listings) and let editors correct on promotion.
      type: "503A",
      // Pharmacies in the APC locator are by definition associated
      // with the Alliance for Pharmacy Compounding. Many but not
      // all are PCAB-accredited; we can't tell from the widget.
      // Tag with "APC" so editors know the source.
      certifications: ["APC"],
      states_licensed: r.state ? [r.state] : [],
      produces_semaglutide: null,
      produces_tirzepatide: null,
      linked_providers: [],
      website: r.website,
      phone: r.phone,
      regulatory_actions: [],
      external_reviews: {},
      internal_score: null,
      description: `Listed in the Alliance for Pharmacy Compounding (APC) compounder locator. Auto-imported from the public a4pc.org locator widget.`,
      verification: {
        last_verified: todayISO(),
        verified_by: "pcab-scraper",
        source_urls: ["https://a4pc.org/find-a-compounder"],
        confidence: "low",
        notes:
          "Auto-imported from APC compounder locator. PCAB accreditation status, production claims, type (503A vs 503B), and any additional certifications all require editorial verification before this entry should be relied on.",
      },
    };
    newPharmacies.push(pharmacy);
    seenSlugs.add(slug);
    seenNames.add(normalizeName(r.name));
    added += 1;
  }

  console.log("");
  console.log(`Summary:`);
  console.log(`  + ${added} new pharmacies discovered`);
  console.log(`  • ${skippedExisting} already known (live or pending) — skipped`);
  console.log("");

  if (added === 0) {
    console.log("Nothing new to write.");
    return;
  }

  if (DRY_RUN) {
    console.log("--dry-run set; not modifying any file.");
    console.log("Sample of new entries:");
    for (const p of newPharmacies.slice(0, 5)) {
      console.log(`  ${p.name} — ${p.city ?? "?"}, ${p.state ?? "?"}`);
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
  console.log("");
  console.log("EDITORIAL REVIEW QUEUE:");
  console.log(`  ${merged.length} pharmacies are now waiting for review.`);
  console.log("  Use scripts/promote-pharmacy.ts to promote one at a time.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
