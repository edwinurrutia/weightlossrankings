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
];

export function getResearchArticleBySlug(
  slug: string,
): ResearchArticle | null {
  return RESEARCH_ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function getAllResearchSlugs(): string[] {
  return RESEARCH_ARTICLES.map((a) => a.slug);
}
