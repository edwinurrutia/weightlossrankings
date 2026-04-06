/**
 * Research article registry.
 *
 * Single source of truth for everything in /research. Each entry is the
 * metadata; the actual article body lives in its own route file under
 * `app/research/[slug]/page.tsx`. The registry is used by:
 *   - the /research index page (article list)
 *   - the sitemap
 *   - cross-article "More from research" sections
 *
 * Adding a new piece: append to RESEARCH_ARTICLES and create the route.
 */

export type ResearchKind = "data-investigation" | "scientific-deep-dive";

export interface ResearchArticle {
  slug: string;
  title: string;
  /** One-sentence summary used on the index page and OG description. */
  description: string;
  /** Long-form excerpt for the article card. */
  excerpt: string;
  kind: ResearchKind;
  /** ISO YYYY-MM-DD. The date the underlying analysis was finalized. */
  publishedDate: string;
  /** Estimated reading time, in minutes, of the static prose only. */
  readMinutes: number;
  /** Number of PubMed / FDA / primary-source citations in the body. */
  citations: number;
  /** Tag chips shown on the index card. */
  tags: string[];
}

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    slug: "glp-1-pricing-index-2026",
    title: "GLP-1 Compounded Pricing Index 2026",
    description:
      "What 80+ telehealth providers actually charge for compounded semaglutide and tirzepatide — median, p10, p90, and how the gap to brand-name Wegovy has evolved.",
    excerpt:
      "We tracked monthly cash prices across the entire telehealth market for compounded semaglutide and tirzepatide. Here's the median, the cheapest decile, and the gap to brand-name Wegovy — updated live as our dataset changes.",
    kind: "data-investigation",
    publishedDate: "2026-04-06",
    readMinutes: 9,
    citations: 6,
    tags: ["Pricing data", "Compounded GLP-1", "Live dataset"],
  },
  {
    slug: "semaglutide-muscle-mass-loss",
    title: "Semaglutide and Muscle Mass: What the STEP Trial Sub-Analyses Actually Show",
    description:
      "Lean body mass loss is the most underreported side effect of GLP-1 weight loss. We summarize the STEP-1 DEXA sub-analysis and what it means for older adults and resistance-trained patients.",
    excerpt:
      "Up to 40% of weight lost on semaglutide is lean mass, not fat. We unpack the STEP-1 DEXA sub-analysis, the sarcopenia debate, and the protein-and-resistance-training protocols that have actually been studied in trials.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 14,
    citations: 14,
    tags: ["Semaglutide", "Body composition", "PubMed sourced"],
  },
  {
    slug: "tirzepatide-vs-semaglutide-head-to-head",
    title: "Tirzepatide vs Semaglutide: A Head-to-Head Look at SURMOUNT and STEP",
    description:
      "What the SURMOUNT and STEP trial families actually tell us about which GLP-1 drug produces more weight loss, fewer side effects, and longer-lasting results.",
    excerpt:
      "Tirzepatide consistently outperforms semaglutide on weight loss in head-to-head trial comparisons — but the picture is more nuanced when you look at side effects, discontinuation rates, and cost per pound lost. Here's the full data.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 13,
    citations: 12,
    tags: ["Tirzepatide", "Semaglutide", "PubMed sourced"],
  },
  {
    slug: "compounded-semaglutide-bioequivalence",
    title:
      "Compounded Semaglutide Bioequivalence: What 503A Pharmacies Actually Have to Test",
    description:
      "Compounded semaglutide isn't FDA-approved, but that doesn't mean it's untested. A close look at what 503A and 503B pharmacies are actually required to verify, and where the real quality risks live.",
    excerpt:
      "Is compounded semaglutide actually the same molecule as Wegovy? The answer is more interesting than either side of the debate suggests. We walk through the FDA's compounding rules, the salt-form controversy, and what tests reputable pharmacies actually run.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 11,
    citations: 9,
    tags: ["Compounded GLP-1", "Pharmacy regulation", "FDA sourced"],
  },
  {
    slug: "fda-warning-letters-glp1-2025-2026",
    title:
      "FDA Warning Letters to Compounded GLP-1 Telehealth Providers: 2025-2026 Investigation",
    description:
      "Every FDA warning letter sent to a compounded GLP-1 telehealth provider or compounding pharmacy in 2025 and 2026, with violation patterns, issuing offices, and what's actually being cited.",
    excerpt:
      "We track every FDA warning letter to a compounded GLP-1 provider in our editorial database. This investigation breaks down the violation categories, the most-cited statutes, the issuing offices, and the patterns that should make you cautious about specific business models.",
    kind: "data-investigation",
    publishedDate: "2026-04-06",
    readMinutes: 10,
    citations: 17,
    tags: ["FDA enforcement", "Compounded GLP-1", "Live dataset"],
  },
  {
    slug: "cheapest-compounded-semaglutide-2026",
    title:
      "Is $99 Compounded Semaglutide Real? We Verified Every Provider at the Floor Price",
    description:
      "Multiple telehealth providers advertise compounded semaglutide at $99 per month — well below the market median. We verified the licensing, pharmacy partner, dose, and total monthly cost for each one.",
    excerpt:
      "The cheapest compounded semaglutide on the market sits at $99/month, advertised by several telehealth providers. We verified each one against our pricing index and pharmacy database to answer the question: is the floor price legitimate, or are there hidden gotchas?",
    kind: "data-investigation",
    publishedDate: "2026-04-06",
    readMinutes: 9,
    citations: 8,
    tags: ["Pricing", "Compounded GLP-1", "Live dataset"],
  },
  {
    slug: "compounded-glp1-price-movement-12-months",
    title:
      "How Compounded GLP-1 Prices Moved Over the Last 16 Months: Provider-by-Provider Trajectories",
    description:
      "We tracked monthly cash prices for compounded semaglutide across the largest telehealth providers from January 2025 onward. Every provider in our tracked set has cut prices — but at very different rates, with the biggest movers converging on a $199 floor.",
    excerpt:
      "The compounded GLP-1 telehealth market is one of the most volatile cash-pay drug markets in modern US healthcare. We track monthly prices across the major providers and plot the trajectory for each. Every tracked provider has cut prices since January 2025 — but at dramatically different rates, with the biggest movers converging on what looks like a structural floor around $199.",
    kind: "data-investigation",
    publishedDate: "2026-04-06",
    readMinutes: 10,
    citations: 6,
    tags: ["Pricing", "Compounded GLP-1", "Live dataset"],
  },
  {
    slug: "what-happens-when-you-stop-semaglutide",
    title:
      "What Happens When You Stop Taking Semaglutide? STEP-4, STEP-1 Extension, and SURMOUNT-4 Tell the Story",
    description:
      "Semaglutide doesn't work like an antibiotic — you don't take a course and stay better. The STEP-4 withdrawal trial and the STEP-1 one-year extension showed that participants regain ~64% of lost weight within months of discontinuation. We walk through the actual trial data, mechanism, and what it means for anyone considering stopping.",
    excerpt:
      "Three large randomized trials have specifically measured what happens to body weight after semaglutide and tirzepatide are stopped. STEP-4 measured the divergence over 48 weeks. STEP-1 extension measured the full one-year regain. SURMOUNT-4 did the same for tirzepatide. The numbers are unambiguous and they should change how patients and prescribers think about \"a course\" of GLP-1 therapy.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 12,
    citations: 4,
    tags: ["Semaglutide", "Tirzepatide", "PubMed sourced"],
  },
  {
    slug: "glp1-insurance-coverage-audit-2026",
    title:
      "GLP-1 Insurance Coverage at the 10 Largest US Insurers: A 2026 Audit",
    description:
      "Does your insurance cover Wegovy or Zepbound? We audited the 10 largest US health insurers — covering more than 460 million members combined — and the answer is the same everywhere: technically yes, but every plan requires prior authorization and coverage is plan-specific.",
    excerpt:
      "We audited GLP-1 weight loss coverage across the 10 largest US health insurers, which combined cover the vast majority of insured Americans. The pattern is uniform and frustrating: every insurer in our index technically covers GLP-1 medications under at least some plans, every insurer requires prior authorization, and not a single one offers consistent, plan-wide approval. This is what \"varies by plan\" actually means in practice.",
    kind: "data-investigation",
    publishedDate: "2026-04-06",
    readMinutes: 9,
    citations: 5,
    tags: ["Insurance", "Coverage", "Live dataset"],
  },
  {
    slug: "glp1-side-effects-what-trials-actually-showed",
    title:
      "GLP-1 Side Effects: A Plain-English Guide to What the Trials Actually Showed",
    description:
      "What the STEP-1 and SURMOUNT-1 Phase 3 trials actually measured for nausea, vomiting, pancreatitis, gallbladder events, thyroid risk, and the so-called 'Ozempic face' — with every percentage cited to its source PMID. Includes the counterintuitive finding that semaglutide nausea rates exceeded tirzepatide's in head-to-head comparison.",
    excerpt:
      "Most plain-English coverage of GLP-1 side effects either understates the gut issues or overstates the rare ones. We pulled the actual adverse-event tables from the STEP-1 and SURMOUNT-1 Phase 3 publications and the FDA-approved labels, and walk through each side effect category with the verified percentages. Includes the counterintuitive finding that semaglutide had higher nausea rates than tirzepatide at the maximum dose in their respective trials — and an honest assessment of which safety signals are real, which are overstated, and which (like 'Ozempic face') aren't actually documented as adverse events at all.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 13,
    citations: 6,
    tags: ["Side effects", "Semaglutide", "Tirzepatide", "PubMed sourced"],
  },
];

export function getResearchArticleBySlug(
  slug: string,
): ResearchArticle | null {
  return RESEARCH_ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function getAllResearchSlugs(): string[] {
  return RESEARCH_ARTICLES.map((a) => a.slug);
}
