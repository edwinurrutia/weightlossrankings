/**
 * Tools registry — single source of truth for the /tools surface.
 *
 * Add a new tool here and it AUTOMATICALLY appears in:
 *   - src/app/sitemap.ts (no manual entry needed)
 *   - the /tools index page
 *   - the staleness audit / freshness manifest
 *
 * This pattern matches src/lib/research.ts (RESEARCH_ARTICLES). The
 * Wave 5 staleness audit identified the previous manual sitemap
 * enumeration as an SEO bug — multiple shipped tools were missing
 * from the sitemap because nobody remembered to update sitemap.ts
 * when adding a new tool. Auto-iteration prevents recurrence.
 *
 * Required for every entry:
 *   - slug: kebab-case, matches src/app/tools/<slug>/page.tsx
 *   - title: shown on /tools index card and used as fallback metadata
 *   - description: meta description, also drives the index card subtitle
 *   - publishedDate: ISO YYYY-MM-DD
 *   - lastUpdated: ISO YYYY-MM-DD — bump on meaningful changes
 *   - sitemapPriority: 0.0 - 1.0 for sitemap.ts
 *   - changeFrequency: sitemap changefreq for the tool's data type
 *   - dataFreshness: { lastVerified, nextReview, cadence } drives the
 *     ToolDataFreshness footer + check:tool-freshness script
 */

export type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type RefreshCadence = "monthly" | "quarterly" | "annual" | "static";

export interface ToolEntry {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  lastUpdated: string;
  sitemapPriority: number;
  changeFrequency: ChangeFreq;
  /**
   * Data freshness metadata. Surfaced in the ToolDataFreshness
   * footer on each tool page and validated by check:tool-freshness.
   */
  dataFreshness: {
    lastVerified: string;
    nextReview: string;
    cadence: RefreshCadence;
    sourceSummary: string;
  };
  /** Optional internal tag for the staleness audit report. */
  staticMath?: boolean;
}

export const TOOLS: ToolEntry[] = [
  {
    slug: "glp1-bmi-calculator",
    title: "GLP-1 BMI Calculator",
    description:
      "Free BMI calculator with a GLP-1 outcome overlay — current WHO BMI category, Wegovy/Zepbound FDA eligibility, and predicted BMI at each STEP-1, SURMOUNT-1, and ATTAIN-1 trial endpoint.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.85,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2027-04-07",
      cadence: "annual",
      sourceSummary:
        "WHO BMI categories + FDA labels for Wegovy/Zepbound + STEP-1/SURMOUNT-1/ATTAIN-1 publications",
    },
    staticMath: true,
  },
  {
    slug: "glp1-cost-per-pound-calculator",
    title: "GLP-1 Cost Per Pound Lost Calculator",
    description:
      "Free calculator that converts GLP-1 monthly price into dollars per pound lost using STEP-1, SURMOUNT-1, ATTAIN-1, and SCALE trial data.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.85,
    changeFrequency: "weekly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2026-05-06",
      cadence: "monthly",
      sourceSummary:
        "WAC pricing constants in src/lib/citations.ts + STEP-1/SURMOUNT-1/ATTAIN-1/SCALE trial efficacy",
    },
  },
  {
    slug: "glp1-dose-plotter",
    title: "GLP-1 Dose Plotter",
    description:
      "Interactive PK simulator for GLP-1 receptor agonists. Plots plasma concentration build-up across 4 drugs (semaglutide, tirzepatide, orforglipron, retatrutide) using FDA-label half-lives and published PK literature.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.85,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2027-04-07",
      cadence: "annual",
      sourceSummary:
        "FDA labels + Hall 2019, Urva 2022, Ma 2024 PK publications",
    },
  },
  {
    slug: "glp1-drug-interaction-checker",
    title: "GLP-1 Drug Interaction Checker",
    description:
      "Free GLP-1 drug interaction checker. Search any medication to see how it interacts with Wegovy, Ozempic, Zepbound, Mounjaro, or Foundayo.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.85,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2026-07-07",
      cadence: "quarterly",
      sourceSummary:
        "FDA Section 7 (Drug Interactions) of Wegovy, Ozempic, Mounjaro, Zepbound, Foundayo prescribing information",
    },
  },
  {
    slug: "glp1-pen-leftover-calculator",
    title: "GLP-1 Pen Leftover Calculator",
    description:
      "Free calculator for how many doses are left in your Ozempic or Saxenda multi-dose pen, built on FDA-label fill volumes and dose counts.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.8,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2027-04-07",
      cadence: "annual",
      sourceSummary:
        "FDA prescribing information Section 3 + Section 16 (Ozempic, Saxenda)",
    },
    staticMath: true,
  },
  {
    slug: "glp1-prior-auth-letter-generator",
    title: "GLP-1 Prior Authorization Letter Generator",
    description:
      "Free GLP-1 PA letter generator. Build a Wegovy, Zepbound, Saxenda, or Foundayo prior authorization letter using FDA-label language and pivotal trial citations.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.85,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2026-07-07",
      cadence: "quarterly",
      sourceSummary:
        "FDA labels + insurer clinical policy bulletins (Aetna, Cigna, UHC, BCBS, Humana, Kaiser, Tricare, Medicare Part D)",
    },
  },
  {
    slug: "glp1-savings-calculator",
    title: "GLP-1 Savings Calculator",
    description:
      "Calculate how much you'd save by switching between brand-name Wegovy, Zepbound, compounded semaglutide or tirzepatide, and Foundayo.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.85,
    changeFrequency: "weekly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2026-05-06",
      cadence: "monthly",
      sourceSummary:
        "NovoCare, LillyDirect, compounded pharmacy pricing + WAC constants",
    },
  },
  {
    slug: "glp1-unit-converter",
    title: "GLP-1 Unit Converter",
    description:
      "mg ↔ insulin syringe units for compounded GLP-1 vials. Pure-math, FDA-label-anchored.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.9,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2027-04-07",
      cadence: "static",
      sourceSummary: "U-100 insulin syringe specification + FDA labels",
    },
    staticMath: true,
  },
  {
    slug: "glp1-washout-calculator",
    title: "GLP-1 Washout Calculator",
    description:
      "How long does semaglutide, tirzepatide, orforglipron, or retatrutide stay in your system? Built on FDA-label half-life values.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.85,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2027-04-07",
      cadence: "annual",
      sourceSummary:
        "FDA labels + Coskun 2022, Hall 2019, Urva 2022, Ma 2024 PK publications",
    },
  },
  {
    slug: "glp1-weight-loss-calculator",
    title: "GLP-1 Weight Loss Calculator",
    description:
      "Free interactive weight loss calculator backed by STEP-1 (semaglutide), SURMOUNT-1 (tirzepatide), and ATTAIN-1 (Foundayo) phase 3 trial data.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.9,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2027-04-07",
      cadence: "annual",
      sourceSummary:
        "STEP-1, SURMOUNT-1, ATTAIN-1 + editorial time-factor curve",
    },
  },
  {
    slug: "insurance-employer-checker",
    title: "Insurance Employer Checker",
    description:
      "Look up GLP-1 weight loss drug coverage by employer, with verification metadata per entry.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.8,
    changeFrequency: "weekly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2026-07-07",
      cadence: "quarterly",
      sourceSummary:
        "src/data/employer-coverage.json — high-confidence verified entries only after Wave 5 cleanup",
    },
  },
  {
    slug: "glp1-protein-calculator",
    title: "GLP-1 Protein & Macro Calculator",
    description:
      "Free protein and macro calculator for patients on (or starting) a GLP-1 receptor agonist. Anchored on PROT-AGE, Longland 2016, ISSN 2017, and the Neeland 2024 GLP-1 lean mass mitigation review.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.9,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2027-04-07",
      cadence: "annual",
      sourceSummary:
        "PROT-AGE 2013, Longland 2016, ISSN 2017, Mamerow 2014, Helms 2014, Mettler 2010, Neeland 2024, Mifflin-St Jeor, FAO/WHO/UNU PAL",
    },
    staticMath: true,
  },
  {
    slug: "glp1-reconstitution-calculator",
    title: "GLP-1 Reconstitution Calculator",
    description:
      "BAC water + concentration + U-100 unit math for compounded GLP-1 vials. Hard FDA-max-dose guards and ISMP-aligned safety warnings.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.9,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2026-10-07",
      cadence: "annual",
      sourceSummary:
        "USP <797> 2023, USP Bacteriostatic Water monograph, FDA labels for max doses, ISMP 2024 advisory, PMC8114303 syringe accuracy study",
    },
  },
  {
    slug: "bariatric-surgery-eligibility-checker",
    title: "Bariatric Surgery Eligibility Checker",
    description:
      "Eligibility under NIH 1991, ASMBS 2022, Medicare NCD 100.1, and 5 major commercial payers. Every payer entry traces to its published clinical policy bulletin.",
    publishedDate: "2026-04-07",
    lastUpdated: "2026-04-07",
    sitemapPriority: 0.85,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-07",
      nextReview: "2026-07-07",
      cadence: "quarterly",
      sourceSummary:
        "src/data/bariatric-payer-criteria.json — NIH/ASMBS/Medicare/Aetna/Cigna/UHC/BCBS/Humana per-payer source URLs",
    },
  },
  {
    slug: "supplement-evidence-grader",
    title: "Supplement Evidence Grader",
    description:
      "16 popular weight-loss supplements graded A through D against verified PubMed primary sources. Search by name, filter by grade, see magnitude vs GLP-1 and the primary study citation for each entry.",
    publishedDate: "2026-04-08",
    lastUpdated: "2026-04-08",
    sitemapPriority: 0.85,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-08",
      nextReview: "2027-04-08",
      cadence: "annual",
      sourceSummary:
        "src/data/supplement-evidence.json — 16 supplements with PubMed PMID anchors verified by research subagent",
    },
  },
  {
    slug: "non-glp1-drug-weight-effect-lookup",
    title: "Non-GLP-1 Drug Weight Effect Lookup",
    description:
      "20 prescription drugs and their weight effects: metformin, topiramate, Qsymia, phentermine, Contrave, bupropion, Vyvanse, Adderall, Trulicity, Jardiance, Farxiga, spironolactone, HRT, sertraline, Lexapro, paroxetine, mirtazapine, vortioxetine, rosiglitazone, glyburide. Each entry verified against PubMed.",
    publishedDate: "2026-04-08",
    lastUpdated: "2026-04-08",
    sitemapPriority: 0.9,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-08",
      nextReview: "2027-04-08",
      cadence: "annual",
      sourceSummary:
        "src/data/non-glp1-drug-weight-effects.json — 20 drugs with PMID-anchored magnitudes verified by research subagent",
    },
  },
  {
    slug: "glp1-exercise-pairing-configurator",
    title: "GLP-1 Exercise Pairing Configurator",
    description:
      "Personalized weekly exercise template for patients on (or starting) a GLP-1 receptor agonist. Inputs your fitness level, age, goal, and time on the drug; outputs a research-backed weekly plan with resistance days, cardio minutes, step target, and protein guidance — all anchored on the S-LiTE trial, ACSM position stands, and the Neeland 2024 lean mass mitigation review.",
    publishedDate: "2026-04-08",
    lastUpdated: "2026-04-08",
    sitemapPriority: 0.85,
    changeFrequency: "monthly",
    dataFreshness: {
      lastVerified: "2026-04-08",
      nextReview: "2027-04-08",
      cadence: "annual",
      sourceSummary:
        "src/lib/exercise-configurator.ts — anchored on S-LiTE (PMID 33951361), ACSM 2009/2011 position stands, Saint-Maurice 2020 step count cohort, Neeland 2024 GLP-1 review",
    },
  },
];

/**
 * Top-level / non-/tools-prefixed utility surfaces. Historically
 * this array held the root-level aliases `/savings-calculator` and
 * `/insurance-checker`, which were emitted as sitemap URLs in
 * addition to the canonical /tools/* versions. Both were retired
 * on 2026-04-08:
 *   - /savings-calculator → /tools/glp1-savings-calculator (301,
 *     the alias was a duplicate of the canonical tool)
 *   - /insurance-checker → /research/glp1-insurance-coverage-
 *     medicare-medicaid-commercial (301, YMYL-accuracy reasons —
 *     see docs/retired-tools.md for the full rationale)
 *
 * The array is kept as an empty export to preserve the sitemap
 * import site without breaking the build, and so future root-level
 * interactive pages (if any) have a clear place to register.
 * See also: redirects in next.config.mjs.
 */
export const NON_TOOLS_INTERACTIVE_PAGES: ToolEntry[] = [];

export function getToolBySlug(slug: string): ToolEntry | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
