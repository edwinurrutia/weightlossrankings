/**
 * Central citation registry for WeightLossRankings.org
 *
 * Every external claim published on this site should trace back to a source
 * registered here. Add new sources to the CITATIONS map; never delete entries
 * once they are live (mark url as TODO:// if a source moves and you need a
 * human to re-verify the canonical URL).
 *
 * Update `accessedDate` whenever you re-verify a source is still live and
 * accurate. This drives the freshness stamp shown to readers.
 */

export type CitationCategory =
  | "regulatory"
  | "clinical-trial"
  | "pricing"
  | "statistics"
  | "guideline";

export interface CitationEntry {
  /** Kebab-case unique identifier, e.g. "cdc-brfss-obesity-2023". */
  id: string;
  /** Short display title shown in footnotes and the /sources index. */
  label: string;
  /** Full publisher / organization name. */
  publisher: string;
  /**
   * Canonical primary-source URL.
   * If the real URL cannot be verified, use "https://todo.invalid/<id>"
   * so a human reviewer can find and fix it quickly.
   */
  url: string;
  /** Broad category used to group entries on the /sources page. */
  category: CitationCategory;
  /** ISO YYYY-MM-DD — date we last confirmed this source is accurate and live. */
  accessedDate: string;
  /** Year (or quarter) of the underlying data, e.g. "2023" or "Q4 2024". */
  dataYear: string;
  /** PubMed ID for journal articles indexed in MEDLINE. */
  pmid?: string;
  /** Digital Object Identifier, e.g. "10.1056/NEJMoa2032183". */
  doi?: string;
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

const CITATIONS_LIST: CitationEntry[] = [
  // ── Pricing ──────────────────────────────────────────────────────────────

  {
    id: "novocare-wegovy-cash-price",
    label: "NovoCare — Wegovy cash-pay and savings program",
    publisher: "Novo Nordisk (NovoCare)",
    url: "https://www.novocare.com/obesity/products/wegovy/savings-card.html",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    id: "lilly-zepbound-cash-price",
    label: "LillyDirect — Zepbound self-pay program and cash price",
    publisher: "Eli Lilly and Company (LillyDirect)",
    url: "https://www.lillydirect.com/zepbound",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    id: "novocare-ozempic-cash-price",
    label: "NovoCare — Ozempic savings and patient assistance information",
    publisher: "Novo Nordisk (NovoCare)",
    url: "https://www.novocare.com/diabetes/products/ozempic/savings-card.html",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    id: "lilly-mounjaro-cash-price",
    label: "LillyDirect — Mounjaro self-pay and savings card program",
    publisher: "Eli Lilly and Company (LillyDirect)",
    url: "https://www.lillydirect.com/mounjaro",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    id: "wlr-pricing-index",
    label:
      "Weight Loss Rankings — GLP-1 Pricing Index 2026 (our independent dataset)",
    publisher: "WeightLossRankings.org",
    url: "/research/glp-1-pricing-index-2026",
    category: "pricing",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },

  // ── Regulatory ────────────────────────────────────────────────────────────

  {
    id: "fda-503a-compounding",
    label: "FDA — Compounding and the 503A Pharmacy Framework",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.fda.gov/drugs/human-drug-compounding/registered-outsourcing-facilities",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },
  {
    id: "fda-503b-outsourcing",
    label: "FDA — 503B Outsourcing Facility Registration and Requirements",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.fda.gov/drugs/human-drug-compounding/registered-outsourcing-facilities",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2024",
  },
  {
    id: "fda-drug-shortage-list",
    label: "FDA — Drug Shortages Database (current shortage listings)",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.accessdata.fda.gov/scripts/drugshortages/",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2026",
  },
  {
    id: "fda-glp1-warning-letters",
    label:
      "FDA — Warning Letters Regarding Compounded GLP-1 Drug Products",
    publisher: "U.S. Food & Drug Administration",
    url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },

  // ── Statistics ────────────────────────────────────────────────────────────

  {
    id: "cdc-brfss-obesity",
    label:
      "CDC BRFSS — Adult Obesity Prevalence Maps by State (Behavioral Risk Factor Surveillance System)",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/obesity/data/prevalence-maps.html",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2023",
  },
  {
    id: "cdc-state-obesity-rankings",
    label:
      "CDC — State Obesity Rankings and Adult Obesity Facts",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/obesity/data/adult.html",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2023",
  },
  {
    // Canonical KFF Medicaid topic page — stable hub URL rather than a deep
    // issue-brief link that rotates as KFF publishes new analyses. Readers
    // following this link land on the latest KFF Medicaid coverage research,
    // including their periodic anti-obesity drug analyses.
    id: "kff-medicaid-obesity-drug-coverage",
    label:
      "KFF — Medicaid coverage research (anti-obesity & GLP-1 drug policy)",
    publisher: "Kaiser Family Foundation",
    url: "https://www.kff.org/medicaid/",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },
  {
    // CMS is the authoritative federal source for state Medicaid prescription
    // drug coverage policy. Linking to the canonical Rx drugs landing page
    // (rather than a deep-link that may move) so the source stays valid.
    id: "cms-medicaid-prescription-drugs",
    label:
      "CMS — Medicaid prescription drug coverage policy (state-by-state)",
    publisher: "Centers for Medicare & Medicaid Services",
    url: "https://www.medicaid.gov/medicaid/prescription-drugs/index.html",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },
  {
    // IRS Publication 502 is the authoritative source on what counts as a
    // qualified medical expense for HSA/FSA purposes. Used to ground claims
    // about HSA/FSA eligibility for prescription drugs (including compounded
    // medications, which are generally eligible with a prescription).
    id: "irs-pub-502-medical-expenses",
    label:
      "IRS Publication 502 — Medical and Dental Expenses (HSA/FSA eligibility)",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/publications/p502",
    category: "regulatory",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },
  {
    id: "kff-glp1-pricing-brief",
    label:
      "KFF — Health costs research (GLP-1 pricing, Medicare & insurance coverage)",
    publisher: "Kaiser Family Foundation",
    url: "https://www.kff.org/health-costs/",
    category: "statistics",
    accessedDate: "2026-04-06",
    dataYear: "2025",
  },

  // ── Clinical Trials ───────────────────────────────────────────────────────

  {
    id: "step1-nejm-2021",
    label:
      "STEP 1 Trial — Once-Weekly Semaglutide in Adults with Overweight or Obesity (Wilding JPH et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2032183",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2021",
    pmid: "33567185",
    doi: "10.1056/NEJMoa2032183",
  },
  {
    id: "surmount1-nejm-2022",
    label:
      "SURMOUNT-1 Trial — Tirzepatide Once Weekly for the Treatment of Obesity (Jastreboff AM et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2206038",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2022",
    pmid: "35658024",
    doi: "10.1056/NEJMoa2206038",
  },
  {
    id: "select-nejm-2023",
    label:
      "SELECT Trial — Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (Lincoff AM et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2307563",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2023",
    pmid: "37952131",
    doi: "10.1056/NEJMoa2307563",
  },
  {
    id: "surmount5-nejm-2025",
    label:
      "SURMOUNT-5 Trial — Tirzepatide vs. Semaglutide Head-to-Head in Obesity (Garvey WT et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2413944",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2025",
    pmid: "40334173",
    doi: "10.1056/NEJMoa2413944",
  },
  {
    id: "surpass2-nejm-2021",
    label:
      "SURPASS-2 Trial — Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (Frías JP et al.)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2107519",
    category: "clinical-trial",
    accessedDate: "2026-04-06",
    dataYear: "2021",
    pmid: "34170647",
    doi: "10.1056/NEJMoa2107519",
  },
];

// ---------------------------------------------------------------------------
// Lookup map — keyed by id for O(1) access
// ---------------------------------------------------------------------------

export const CITATIONS: Readonly<Record<string, CitationEntry>> =
  Object.fromEntries(CITATIONS_LIST.map((c) => [c.id, c]));

/**
 * Return a citation entry by id. Throws at runtime (dev) if the id is not
 * registered, so mis-spellings surface immediately.
 */
export function getCitation(id: string): CitationEntry {
  const entry = CITATIONS[id];
  if (!entry) {
    throw new Error(
      `[citations] Unknown citation id: "${id}". Register it in src/lib/citations.ts first.`
    );
  }
  return entry;
}

/**
 * Return all citations for a given category, sorted alphabetically by label.
 */
export function getCitationsByCategory(
  category: CitationCategory
): CitationEntry[] {
  return CITATIONS_LIST.filter((c) => c.category === category).sort((a, b) =>
    a.label.localeCompare(b.label)
  );
}

/**
 * Return all citations, sorted by category then label. Used for the /sources
 * public index page.
 */
export function getAllCitations(): CitationEntry[] {
  const categoryOrder: CitationCategory[] = [
    "clinical-trial",
    "regulatory",
    "statistics",
    "pricing",
    "guideline",
  ];
  return [...CITATIONS_LIST].sort((a, b) => {
    const catDiff =
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    if (catDiff !== 0) return catDiff;
    return a.label.localeCompare(b.label);
  });
}

// ---------------------------------------------------------------------------
// Named price constants — sourced from the registry above
// ---------------------------------------------------------------------------

/** Wegovy (semaglutide 2.4 mg) published list price per month. Source: novocare-wegovy-cash-price */
export const WEGOVY_MONTHLY_USD = 1349;

/** Zepbound (tirzepatide) published list price per month. Source: lilly-zepbound-cash-price */
export const ZEPBOUND_MONTHLY_USD = 1086;

/** Ozempic (semaglutide 0.5–2 mg) published list price per month. Source: novocare-ozempic-cash-price */
export const OZEMPIC_MONTHLY_USD = 968;

/** Mounjaro (tirzepatide) published list price per month. Source: lilly-mounjaro-cash-price */
export const MOUNJARO_MONTHLY_USD = 1023;
