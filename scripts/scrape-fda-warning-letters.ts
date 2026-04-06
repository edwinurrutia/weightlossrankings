/**
 * FDA Warning Letters scraper for WeightLossRankings.org
 *
 * Pulls newly-published warning letters from the FDA's public index and
 * appends compounded GLP-1 / weight-loss matches to
 * src/data/fda-warning-letters.json.
 *
 * EDITORIAL RULES — these are non-negotiable. See
 * docs/fda-warning-letters-howto.md before changing them:
 *   - Quote FDA language; never paraphrase a violation
 *   - Always include the original fda.gov URL
 *   - When in doubt, leave the entry out — manual review is better than
 *     a hallucinated cite on a regulatory page
 *
 * Usage:
 *   npx tsx scripts/scrape-fda-warning-letters.ts                 # full run
 *   npx tsx scripts/scrape-fda-warning-letters.ts --dry-run       # don't write
 *   npx tsx scripts/scrape-fda-warning-letters.ts --verbose       # noisy logs
 *   npx tsx scripts/scrape-fda-warning-letters.ts --limit 5       # cap results
 *   npx tsx scripts/scrape-fda-warning-letters.ts --enrich        # back-fill content on existing letters
 *   npx tsx scripts/scrape-fda-warning-letters.ts --enrich --slug join-josie-717986
 *   npx tsx scripts/scrape-fda-warning-letters.ts --help          # this help
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// ---------------- types ----------------

interface WarningLetter {
  id: string;
  company_name: string;
  company_dba: string | null;
  letter_number: string;
  letter_date: string;
  fda_url: string;
  issuing_office: string;
  subject: string;
  violations_summary: string;
  matched_provider_slug: string | null;
  status: "active" | "closed-out" | "withdrawn";
  added_date: string;
}

// ---------------- args ----------------

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const VERBOSE = args.includes("--verbose");
const HELP = args.includes("--help") || args.includes("-h");
const ENRICH = args.includes("--enrich");
const LIMIT_IDX = args.indexOf("--limit");
const LIMIT =
  LIMIT_IDX >= 0 ? parseInt(args[LIMIT_IDX + 1] ?? "0", 10) : 0;
const SLUG_IDX = args.indexOf("--slug");
const SLUG_FILTER =
  SLUG_IDX >= 0 ? (args[SLUG_IDX + 1] ?? "").trim() : "";

const LETTER_REQUEST_TIMEOUT_MS = 30_000;

// ---------------- constants ----------------

const FDA_INDEX_URL =
  "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters";

// Keywords used to filter incoming letters down to GLP-1 / compounded /
// weight-loss telehealth concerns. Lowercased substring match against
// company name + subject + (optional) snippet.
const KEYWORDS = [
  "semaglutide",
  "tirzepatide",
  "compounded",
  "glp-1",
  "glp 1",
  "glp1",
  "weight loss",
  "weight-loss",
  "obesity",
];

const REQUEST_TIMEOUT_MS = 15_000;
const REQUEST_DELAY_MS = 2_000;
const REAL_CHROME_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const DATA_PATH = join(
  process.cwd(),
  "src/data/fda-warning-letters.json",
);

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

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadExisting(): WarningLetter[] {
  if (!existsSync(DATA_PATH)) return [];
  try {
    return JSON.parse(readFileSync(DATA_PATH, "utf-8")) as WarningLetter[];
  } catch (err) {
    elog("Failed to parse existing JSON:", (err as Error).message);
    return [];
  }
}

/**
 * Derive a stable id slug from a company name + letter number, mirroring
 * the URL pattern FDA uses on their letter pages.
 */
function deriveId(companyName: string, letterNumber: string): string {
  const slug = companyName
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}-${letterNumber}`;
}

/** Filter check — does the letter look GLP-1-relevant? */
function looksRelevant(...fields: (string | null | undefined)[]): boolean {
  const hay = fields
    .filter((f): f is string => typeof f === "string")
    .join(" ")
    .toLowerCase();
  return KEYWORDS.some((k) => hay.includes(k));
}

// ---------------- Playwright loading (optional) ----------------

interface PlaywrightModule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chromium: any;
}

async function loadPlaywright(): Promise<PlaywrightModule | null> {
  try {
    const moduleName = "playwright";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pw = (await (new Function("m", "return import(m)")(
      moduleName,
    ) as Promise<any>).catch(() => null)) as PlaywrightModule | null;
    if (pw && pw.chromium) return pw;
    return null;
  } catch {
    return null;
  }
}

// ---------------- raw row type from FDA index ----------------

interface RawIndexRow {
  /** Posted/issue date as it appears on the index. */
  date: string;
  /** Company name as it appears in the index column. */
  company: string;
  /** Issuing office (e.g. "CDER"). */
  office: string;
  /** Subject column. */
  subject: string;
  /** Letter detail page URL on fda.gov. */
  detailUrl: string;
}

/**
 * Scrape the FDA warning letters index using Playwright.
 *
 * The FDA index is a server-rendered table with a search/filter UI on top.
 * The URL params support `search_api_fulltext=...` and a date filter.
 * If the page structure changes, this function logs and returns [] rather
 * than crashing the script.
 */
async function fetchIndexRows(): Promise<RawIndexRow[]> {
  const pw = await loadPlaywright();
  if (!pw) {
    elog(
      "Playwright is not installed. Install with `npm install -D playwright && npx playwright install chromium`.",
    );
    return [];
  }

  // Run a search for each keyword and merge — FDA's filter only takes one
  // value at a time, so we paginate per keyword.
  const seen = new Map<string, RawIndexRow>();
  const browser = await pw.chromium.launch({ headless: true });
  try {
    const ctx = await browser.newContext({ userAgent: REAL_CHROME_UA });
    const page = await ctx.newPage();

    for (const keyword of ["semaglutide", "tirzepatide", "compounded"]) {
      const searchUrl = `${FDA_INDEX_URL}?search_api_fulltext=${encodeURIComponent(
        keyword,
      )}`;
      vlog(`Fetching index for keyword "${keyword}": ${searchUrl}`);
      try {
        await page.goto(searchUrl, {
          waitUntil: "domcontentloaded",
          timeout: REQUEST_TIMEOUT_MS,
        });
        try {
          await page.waitForLoadState("networkidle", { timeout: 5000 });
        } catch {
          // Some pages don't reach networkidle quickly — that's fine.
        }

        // Try to extract rows from the table. FDA uses a standard
        // <table> with column headers; we read it generically.
        const rows: RawIndexRow[] = await page.evaluate(() => {
          const out: RawIndexRow[] = [];
          const tables = Array.from(document.querySelectorAll("table"));
          for (const table of tables) {
            const headerCells = Array.from(
              table.querySelectorAll("thead th"),
            ).map((th) => (th.textContent || "").trim().toLowerCase());
            // Find the columns we need
            const colIndex = (label: string) =>
              headerCells.findIndex((h) => h.includes(label));
            const dateIdx = colIndex("posted") >= 0
              ? colIndex("posted")
              : colIndex("date");
            const companyIdx = colIndex("company");
            const subjectIdx = colIndex("subject");
            const officeIdx = colIndex("office");
            if (companyIdx < 0 || subjectIdx < 0) continue;

            const trs = Array.from(table.querySelectorAll("tbody tr"));
            for (const tr of trs) {
              const tds = Array.from(tr.querySelectorAll("td"));
              const companyTd = tds[companyIdx];
              if (!companyTd) continue;
              const link = companyTd.querySelector("a") as
                | HTMLAnchorElement
                | null;
              if (!link) continue;
              const detailUrl = link.href;
              if (!detailUrl) continue;
              out.push({
                date: dateIdx >= 0 ? (tds[dateIdx]?.textContent || "").trim() : "",
                company: (companyTd.textContent || "").trim(),
                office:
                  officeIdx >= 0
                    ? (tds[officeIdx]?.textContent || "").trim()
                    : "FDA",
                subject:
                  (tds[subjectIdx]?.textContent || "").trim(),
                detailUrl,
              });
            }
          }
          return out;
        });

        for (const r of rows) {
          if (!seen.has(r.detailUrl)) seen.set(r.detailUrl, r);
        }
        vlog(`  → ${rows.length} rows for "${keyword}"`);
      } catch (err) {
        elog(
          `Failed to scrape index for "${keyword}": ${(err as Error).message}`,
        );
      }
      await sleep(REQUEST_DELAY_MS);
    }

    await ctx.close();
  } finally {
    await browser.close();
  }

  return Array.from(seen.values());
}

/**
 * Parse a row from the index and convert it into a WarningLetter object.
 * The letter number is parsed out of the URL slug (FDA encodes it as
 * <slug>-<letter-number>-<date>).
 */
function rowToLetter(row: RawIndexRow): WarningLetter | null {
  // Extract letter number from URL: .../warning-letters/<slug>-<num>-<MMDDYYYY>
  const m = row.detailUrl.match(
    /\/warning-letters\/([a-z0-9-]+?)-(\d{5,7})-(\d{8})\/?$/i,
  );
  if (!m) {
    vlog(`  skip: cannot parse URL ${row.detailUrl}`);
    return null;
  }
  const urlSlug = m[1];
  const letterNumber = m[2];
  const dateMMDDYYYY = m[3];
  const month = dateMMDDYYYY.slice(0, 2);
  const day = dateMMDDYYYY.slice(2, 4);
  const year = dateMMDDYYYY.slice(4, 8);
  const isoDate = `${year}-${month}-${day}`;

  // Parse company / dba — FDA uses "X LLC dba Y" or "X Inc dba Y"
  const dbaMatch = row.company.match(/^(.+?)\s+dba\s+(.+)$/i);
  const companyName = dbaMatch ? dbaMatch[1].trim() : row.company.trim();
  const companyDba = dbaMatch ? dbaMatch[2].trim() : null;

  return {
    id: `${urlSlug}-${letterNumber}`,
    company_name: companyName,
    company_dba: companyDba,
    letter_number: letterNumber,
    letter_date: isoDate,
    fda_url: row.detailUrl,
    issuing_office: row.office || "FDA",
    // Quote FDA's own subject line verbatim — never paraphrase
    subject: row.subject || "Compounded GLP-1 marketing and labeling concerns",
    // Measured boilerplate. The scraper does NOT pull body text — that's
    // done in editorial review to keep us safe from libel risk.
    violations_summary:
      "FDA cited the company in connection with the marketing and distribution of compounded GLP-1 products. See the linked FDA warning letter for the full text of the agency's concerns and the specific provisions of the Federal Food, Drug, and Cosmetic Act referenced.",
    matched_provider_slug: null,
    status: "active",
    added_date: todayISO(),
  };
}

// ---------------- letter content extraction ----------------

interface LetterContent {
  subject: string;
  violationsSummary: string;
  issuingOffice: string;
  rawText: string;
}

/**
 * Fetch and parse an individual FDA warning letter page. Returns null on
 * any error (404, timeout, parse failure). Strips the FDA nav/footer
 * boilerplate and extracts:
 *   - subject:           the "Subject:" line from the letter header
 *   - violationsSummary: a verbatim 2-3 sentence opening quote, or the
 *                        first ~300 chars of body if no clean summary
 *   - issuingOffice:     the FDA office that issued the letter
 *   - rawText:           first ~1500 chars of body for human review
 *
 * The browser `page` argument is a Playwright Page instance; caller owns
 * browser lifecycle so we can reuse one context across many letters.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchLetterContent(page: any, url: string): Promise<LetterContent | null> {
  try {
    vlog(`  fetching letter: ${url}`);
    const resp = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: LETTER_REQUEST_TIMEOUT_MS,
    });
    if (!resp || !resp.ok()) {
      elog(
        `  letter fetch failed: HTTP ${resp ? resp.status() : "no response"} for ${url}`,
      );
      return null;
    }
    try {
      await page.waitForLoadState("networkidle", { timeout: 5000 });
    } catch {
      // tolerate slow network idle
    }

    const extracted: LetterContent | null = await page.evaluate(() => {
      // Find the main article/content region, fall back to <main>/<body>.
      const main =
        (document.querySelector("article") as HTMLElement | null) ||
        (document.querySelector("main") as HTMLElement | null) ||
        (document.querySelector(".main-content") as HTMLElement | null) ||
        document.body;
      if (!main) return null;

      // Strip navigation / footer / side-bars that live inside main on
      // fda.gov. We mutate a clone so we don't affect the live DOM.
      const clone = main.cloneNode(true) as HTMLElement;
      const stripSelectors = [
        "nav",
        "header",
        "footer",
        ".breadcrumb",
        ".lcds-breadcrumb",
        ".usa-breadcrumb",
        ".lcds-sidenav",
        ".lcds-section-nav",
        "aside",
        "script",
        "style",
        "noscript",
      ];
      for (const sel of stripSelectors) {
        clone.querySelectorAll(sel).forEach((el) => el.remove());
      }

      const text = (clone.textContent || "")
        .replace(/\r/g, "")
        .replace(/\u00a0/g, " ")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      // Subject: look for "Subject:" line — FDA puts it in the letter
      // header block near the top of the body.
      let subject = "";
      const subjectMatch = text.match(/Subject:\s*([^\n]+)/i);
      if (subjectMatch) {
        subject = subjectMatch[1].trim();
      }

      // Issuing office: FDA typically stamps the letter "Office of ..."
      // or "Center for ..." near the top. We grab the first matching line.
      let issuingOffice = "";
      const officePatterns = [
        /\b(Office of [A-Z][A-Za-z ,&\-]+?)(?=\s{2,}|\n|,\s*[A-Z]{2}\b)/,
        /\b(Center for [A-Z][A-Za-z ,&\-]+?)(?=\s{2,}|\n|,\s*[A-Z]{2}\b)/,
        /\b(Division of [A-Z][A-Za-z ,&\-]+?)(?=\s{2,}|\n|,\s*[A-Z]{2}\b)/,
      ];
      for (const pat of officePatterns) {
        const m = text.match(pat);
        if (m) {
          issuingOffice = m[1].trim().replace(/\s+/g, " ");
          break;
        }
      }

      // Violations summary: prefer the first paragraph that begins with
      // "This letter" / "The U.S. Food and Drug Administration" — that's
      // FDA's standard opening sentence that names the violation.
      let violationsSummary = "";
      const openingPatterns = [
        /((?:This (?:letter|is to|warning letter|correspondence)|The United States Food and Drug Administration|The U\.?S\.? Food and Drug Administration|This is to advise)[^\n]{40,600}?[.?!])(?:\s|$)/i,
      ];
      for (const pat of openingPatterns) {
        const m = text.match(pat);
        if (m) {
          violationsSummary = m[1].trim();
          break;
        }
      }
      if (!violationsSummary) {
        // Fall back: first 300 chars of the body text after the subject
        // line (or after the header if no subject found).
        const cutIdx = subjectMatch
          ? text.indexOf(subjectMatch[0]) + subjectMatch[0].length
          : 0;
        violationsSummary = text.slice(cutIdx, cutIdx + 300).trim();
      }

      const rawText = text.slice(0, 1500);

      return {
        subject,
        violationsSummary,
        issuingOffice,
        rawText,
      };
    });

    if (!extracted) {
      elog(`  letter parse returned null for ${url}`);
      return null;
    }
    return extracted;
  } catch (err) {
    elog(`  letter fetch error for ${url}: ${(err as Error).message}`);
    return null;
  }
}

/**
 * Enrich mode: walk existing letters in the JSON and back-fill their
 * subject, violations_summary, and issuing_office from the live FDA page.
 * Never overwrites with empty strings — if extraction fails or produces
 * nothing useful, the original value is preserved.
 */
async function runEnrich(): Promise<void> {
  const existing = loadExisting();
  log(`Loaded ${existing.length} existing letters for enrichment.`);

  const targets = SLUG_FILTER
    ? existing.filter((l) => l.id === SLUG_FILTER)
    : existing;
  if (SLUG_FILTER && targets.length === 0) {
    elog(`No letter with id "${SLUG_FILTER}" found.`);
    return;
  }
  log(`Enriching ${targets.length} letter${targets.length === 1 ? "" : "s"}.`);

  const pw = await loadPlaywright();
  if (!pw) {
    elog(
      "Playwright is not installed. Install with `npm install -D playwright && npx playwright install chromium`.",
    );
    return;
  }

  const browser = await pw.chromium.launch({ headless: true });
  let updatedCount = 0;
  const failures: string[] = [];
  try {
    const ctx = await browser.newContext({ userAgent: REAL_CHROME_UA });
    const page = await ctx.newPage();

    for (const letter of targets) {
      log(`  * ${letter.id}`);
      const content = await fetchLetterContent(page, letter.fda_url);
      if (!content) {
        failures.push(letter.id);
        await sleep(REQUEST_DELAY_MS);
        continue;
      }

      // Only overwrite when we actually have something substantive.
      if (content.subject && content.subject.length > 3) {
        letter.subject = content.subject;
      }
      if (
        content.violationsSummary &&
        content.violationsSummary.length > 40
      ) {
        letter.violations_summary = content.violationsSummary;
      }
      if (content.issuingOffice && content.issuingOffice.length > 3) {
        letter.issuing_office = content.issuingOffice;
      }
      updatedCount += 1;
      log(`    subject: ${letter.subject.slice(0, 100)}`);
      await sleep(REQUEST_DELAY_MS);
    }

    await ctx.close();
  } finally {
    await browser.close();
  }

  log("");
  log(`Enriched ${updatedCount}/${targets.length} letters.`);
  if (failures.length > 0) {
    log(`Failures (${failures.length}):`);
    for (const id of failures) log(`  - ${id}`);
  }

  if (DRY_RUN) {
    log("--dry-run set; not modifying the JSON.");
    return;
  }
  if (updatedCount === 0) {
    log("Nothing updated; JSON left untouched.");
    return;
  }

  // Write the full list back (not just targets) so slug-filtered runs
  // don't drop the unfiltered entries.
  const merged = [...existing].sort((a, b) =>
    b.letter_date.localeCompare(a.letter_date),
  );
  writeFileSync(DATA_PATH, JSON.stringify(merged, null, 2) + "\n");
  log(`Wrote ${merged.length} letters to ${DATA_PATH}.`);
}

// ---------------- main ----------------

function printHelp() {
  console.log(`
FDA Warning Letters scraper

Pulls newly-published warning letters from fda.gov and merges compounded
GLP-1 / weight-loss matches into src/data/fda-warning-letters.json.

USAGE
  npx tsx scripts/scrape-fda-warning-letters.ts [flags]

FLAGS
  --dry-run      Show what would be added but don't write the JSON
  --verbose      Print detailed progress for each row
  --limit N      Stop after adding N new letters
  --enrich       Back-fill subject/violations_summary/issuing_office on
                 letters already in the JSON by fetching their pages
  --slug <id>    (with --enrich) enrich only the letter with this id
  --help, -h     Show this help

NOTES
  - Requires Playwright (npm install -D playwright && npx playwright install chromium)
  - Polite: 2-second delay between requests, 15s timeout, real Chrome UA
  - Editorial rule: scraper never paraphrases violation text. Each new
    entry gets a measured boilerplate summary; an editor must replace it
    with verbatim FDA quotes before publishing.
`);
}

async function main() {
  if (HELP) {
    printHelp();
    return;
  }

  if (ENRICH) {
    log("FDA Warning Letters scraper — enrich mode");
    log(`  data file:  ${DATA_PATH}`);
    log(`  dry run:    ${DRY_RUN}`);
    log(`  slug:       ${SLUG_FILTER || "(all)"}`);
    log("");
    await runEnrich();
    return;
  }

  log("FDA Warning Letters scraper starting…");
  log(`  data file:  ${DATA_PATH}`);
  log(`  dry run:    ${DRY_RUN}`);
  log(`  limit:      ${LIMIT || "none"}`);
  log("");

  const existing = loadExisting();
  log(`Loaded ${existing.length} existing letters.`);
  const existingIds = new Set(existing.map((l) => l.id));
  const existingUrls = new Set(existing.map((l) => l.fda_url));

  let rows: RawIndexRow[];
  try {
    rows = await fetchIndexRows();
  } catch (err) {
    elog("Fatal error fetching FDA index:", (err as Error).message);
    process.exit(1);
  }
  log(`Pulled ${rows.length} candidate rows from FDA index.`);

  const newLetters: WarningLetter[] = [];
  for (const row of rows) {
    if (existingUrls.has(row.detailUrl)) {
      vlog(`  skip (already in DB): ${row.company}`);
      continue;
    }
    if (!looksRelevant(row.company, row.subject)) {
      vlog(`  skip (not GLP-1 relevant): ${row.company}`);
      continue;
    }
    const letter = rowToLetter(row);
    if (!letter) continue;
    if (existingIds.has(letter.id)) {
      vlog(`  skip (id collision): ${letter.id}`);
      continue;
    }
    newLetters.push(letter);
    log(`  + ${letter.company_name} (#${letter.letter_number}) — ${letter.letter_date}`);
    if (LIMIT > 0 && newLetters.length >= LIMIT) break;
  }

  log("");
  log(`Found ${newLetters.length} new letter${newLetters.length === 1 ? "" : "s"}.`);

  if (newLetters.length === 0) {
    log("Nothing to write.");
    return;
  }

  if (DRY_RUN) {
    log("--dry-run set; not modifying the JSON.");
    return;
  }

  const merged = [...existing, ...newLetters].sort((a, b) =>
    b.letter_date.localeCompare(a.letter_date),
  );
  writeFileSync(DATA_PATH, JSON.stringify(merged, null, 2) + "\n");
  log(`Wrote ${merged.length} letters to ${DATA_PATH}.`);
  log("");
  log("EDITORIAL REVIEW REQUIRED:");
  log(
    "  Each new entry has a boilerplate violations_summary. Open the FDA",
  );
  log(
    "  letter, copy the actual subject line and a brief verbatim quote of",
  );
  log("  the violations, and update the JSON before publishing.");
}

main().catch((err) => {
  elog("Fatal error:", err);
  process.exit(1);
});
