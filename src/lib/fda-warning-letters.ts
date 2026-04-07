/**
 * FDA Warning Letters registry.
 *
 * Single source of truth for the editorial FDA warning letters database
 * surfaced under /fda-warning-letters and as flags on /reviews/[provider]
 * pages when a warning letter has been matched to a provider in our dataset.
 *
 * The dataset itself lives in `src/data/fda-warning-letters.json` and is
 * maintained by:
 *   1. Manual curation (preferred — every entry should be human-reviewed)
 *   2. The scraper at `scripts/scrape-fda-warning-letters.ts` which adds
 *      newly-published letters from the FDA's public warning letter index.
 *
 * Editorial rules (these are non-negotiable — see docs/fda-warning-letters-howto.md):
 *   - Always link to the original fda.gov URL
 *   - Quote FDA language; never editorialize
 *   - Use measured, factual descriptions
 *   - Surface the disclaimer that warning letters are public regulatory
 *     communications, not findings of illegal activity
 *
 * TODO(citations): Once src/lib/citations.ts is unblocked by the other
 * agent, register the FDA warning letters database as a citation source so
 * we can footnote it from research articles.
 */

import rawLetters from "@/data/fda-warning-letters.json";

export type WarningLetterStatus = "active" | "closed-out" | "withdrawn";

/** GLP-1 keywords this letter was found under in the FDA search. */
export type WarningLetterDrug = "semaglutide" | "tirzepatide" | "orforglipron";

export interface FdaWarningLetter {
  /** Stable slug used in the URL: /fda-warning-letters/[id] */
  id: string;
  /** Legal company name as it appears on the FDA letter. */
  company_name: string;
  /** "Doing business as" name, if different. */
  company_dba: string | null;
  /**
   * FDA-assigned letter identifier. Most letters have a 6–7 digit number;
   * some older letters were posted without one and this field is null.
   */
  letter_number: string | null;
  /** ISO YYYY-MM-DD — the date FDA issued the letter. */
  letter_date: string;
  /**
   * ISO YYYY-MM-DD — the date FDA POSTED the letter publicly. Often
   * weeks or months after letter_date. Optional because older entries
   * pre-date the field.
   */
  posted_date?: string;
  /** Canonical URL on fda.gov for the letter itself. */
  fda_url: string;
  /** FDA office that issued the letter (e.g. "FDA", "CDER"). */
  issuing_office: string;
  /**
   * Which GLP-1 drug keyword(s) this letter matched in the FDA search.
   * Many compounded GLP-1 sellers get cited for both semaglutide AND
   * tirzepatide in the same letter, so this is an array. Future scrapes
   * will also detect orforglipron / Foundayo as more letters land.
   */
  matched_drugs?: WarningLetterDrug[];
  /** One-line subject line. Quote FDA language where possible. */
  subject: string;
  /**
   * Measured factual summary of the violations cited in the letter.
   * MUST NOT editorialize. When in doubt, point readers to the FDA URL.
   */
  violations_summary: string;
  /**
   * Slug of a provider in src/data/providers.json this letter applies to,
   * or null if no provider in our dataset has been matched.
   */
  matched_provider_slug: string | null;
  /**
   * "active" — the warning letter is open
   * "closed-out" — FDA issued a close-out letter
   * "withdrawn" — FDA withdrew the warning letter
   */
  status: WarningLetterStatus;
  /** ISO YYYY-MM-DD — date this entry was added to our dataset. */
  added_date: string;
  /**
   * 3–6 verbatim FDA paragraphs from the letter body. Populated by the
   * scraper's --enrich mode (or auto-enriched on discovery). Empty for
   * letters where extraction couldn't find a clean paragraph structure.
   * Rendered on the per-letter detail page with attribution.
   */
  letter_excerpt?: string[];
}

const LETTERS: FdaWarningLetter[] = rawLetters as FdaWarningLetter[];

/** All warning letters, sorted by letter_date descending (most recent first). */
export function getAllWarningLetters(): FdaWarningLetter[] {
  return [...LETTERS].sort((a, b) =>
    b.letter_date.localeCompare(a.letter_date),
  );
}

/** Look up a warning letter by its slug/id. */
export function getWarningLetterBySlug(
  slug: string,
): FdaWarningLetter | null {
  return LETTERS.find((l) => l.id === slug) ?? null;
}

/**
 * Find a warning letter that has been matched to a given provider slug.
 * Returns null if there is no matched letter (the common case).
 */
export function getWarningLetterByProviderSlug(
  providerSlug: string,
): FdaWarningLetter | null {
  return (
    LETTERS.find(
      (l) => l.matched_provider_slug === providerSlug && l.status === "active",
    ) ?? null
  );
}

/** All slugs — used by sitemap and generateStaticParams. */
export function getAllWarningLetterSlugs(): string[] {
  return LETTERS.map((l) => l.id);
}

/** Filter by year (ISO year string, e.g. "2026"). */
export function getWarningLettersByYear(
  year: string,
): FdaWarningLetter[] {
  return getAllWarningLetters().filter((l) =>
    l.letter_date.startsWith(year + "-"),
  );
}

/**
 * Keyword filter on subject + summary. Used to power per-drug landing
 * sections (e.g. "warning letters involving semaglutide").
 */
export function getWarningLettersInvolvingDrug(
  drug: "semaglutide" | "tirzepatide" | "glp-1",
): FdaWarningLetter[] {
  const needle = drug.toLowerCase();
  // For "glp-1" match the broader umbrella term too
  const altNeedles =
    drug === "glp-1" ? ["glp-1", "glp 1", "glp1"] : [needle];
  return getAllWarningLetters().filter((l) => {
    const hay = (l.subject + " " + l.violations_summary).toLowerCase();
    return altNeedles.some((n) => hay.includes(n));
  });
}

/** Latest added_date across all letters — used for the "as of" stamp. */
export function getDatasetFreshnessDate(): string {
  return LETTERS.reduce((latest, l) =>
    l.added_date > latest ? l.added_date : latest,
    LETTERS[0]?.added_date ?? "",
  );
}
