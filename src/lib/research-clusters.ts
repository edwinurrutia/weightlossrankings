/**
 * Topic cluster definitions for the /research/topics/[cluster]
 * dynamic route. Each cluster groups related research articles by
 * shared theme — cardiovascular outcomes, safety, pricing, etc. —
 * to give Google a topical-authority signal and to give users a
 * curated entry point into the corpus.
 *
 * The clusters are derived from the topic-cluster analysis run on
 * 2026-04-08. Member slugs are validated against the actual files
 * in src/app/research/.
 *
 * Adding a new cluster: append to RESEARCH_CLUSTERS below. The
 * dynamic route, sitemap, and llms.txt index all auto-iterate over
 * this registry. The hub page renders an ItemList of the member
 * articles, each pulled by slug from RESEARCH_ARTICLES via
 * getResearchArticleBySlug.
 *
 * Adding a member to an existing cluster: append the slug to
 * memberSlugs. The page will render it on next build.
 */

import { RESEARCH_ARTICLES, type ResearchArticle } from "./research";

export interface ResearchCluster {
  /** URL slug — appears in /research/topics/{slug} */
  slug: string;
  /** User-facing H1 / page title */
  title: string;
  /** Short meta-description and intro paragraph */
  description: string;
  /**
   * SEO-targeted H2 / hook describing what the cluster covers.
   * Keep under ~250 characters; this becomes the lead paragraph
   * on the hub page.
   */
  intro: string;
  /** Slugs of research articles that belong to this cluster */
  memberSlugs: string[];
  /** ISO date of last cluster definition update */
  lastUpdated: string;
}

export const RESEARCH_CLUSTERS: ResearchCluster[] = [
  {
    slug: "cardiovascular-comorbidity-outcomes",
    title:
      "GLP-1s for Cardiovascular & Comorbidity Outcomes",
    description:
      "How GLP-1 receptor agonists affect cardiovascular events, heart failure, kidney disease, sleep apnea, and other comorbidities — anchored in the SELECT, FLOW, STEP-HFpEF, and SURMOUNT-OSA trials.",
    intro:
      "GLP-1 medications were developed for diabetes and weight loss, but the most consequential clinical evidence of the last three years has been about what these drugs do for the rest of the body — heart attacks, heart failure with preserved ejection fraction, chronic kidney disease, and obstructive sleep apnea. This cluster collects every research article on cardiovascular and comorbidity outcomes, all anchored in published phase 3 trial data.",
    memberSlugs: [
      "select-trial-cardiovascular-benefits-non-diabetics",
      "step-hfpef-semaglutide-heart-failure",
      "flow-trial-semaglutide-kidney-disease",
      "surmount-osa-tirzepatide-sleep-apnea",
      "does-glp1-affect-blood-pressure-evidence",
      "glp1-pregnancy-pcos-fertility-women-health",
      "glp1-menstrual-cycle-period-hormones",
      "sglt2-inhibitors-vs-glp1-jardiance-farxiga",
    ],
    lastUpdated: "2026-04-08",
  },
  {
    slug: "safety-side-effects-discontinuation",
    title: "GLP-1 Safety, Side Effects & Stopping Safely",
    description:
      "Trial-anchored answers to the most-searched safety questions about Wegovy, Ozempic, Zepbound, Mounjaro, and Foundayo — including thyroid cancer risk, liver effects, surgery prep, and what happens after stopping.",
    intro:
      "Patients starting a GLP-1 are typically more anxious about adverse effects than about efficacy — and the published evidence on safety is often very different from what circulates in social media. This cluster collects the trial-anchored safety articles on the site: side effect frequencies from the actual STEP and SURMOUNT adverse-event tables, the thyroid cancer black-box history, the liver and kidney evidence base, and the practical questions about surgery prep and how to discontinue safely.",
    memberSlugs: [
      "glp1-side-effects-what-trials-actually-showed",
      "glp1-side-effect-questions-answered",
      "does-glp1-cause-cancer-mtc-thyroid-evidence",
      "does-glp1-cause-liver-damage-nafld-nash-evidence",
      "can-you-drink-alcohol-on-glp1",
      "what-happens-when-you-stop-semaglutide",
      "how-to-taper-off-glp1-safely-guide",
      "glp1-side-effects-fatigue-hair-loss-duration",
      "glp1-nausea-management-practical-guide",
      "glp1-surgery-anesthesia-asa-guidance",
    ],
    lastUpdated: "2026-04-08",
  },
  {
    slug: "pricing-access-where-to-buy",
    title:
      "GLP-1 Pricing 2026: Insurance, Brand-Name, Compounded & Oral Options",
    description:
      "What GLP-1s actually cost in 2026 across insurance plans, brand-name pens, compounded telehealth, and the new oral option — plus practical guidance on how to get a prescription.",
    intro:
      "Cost and access are the primary barriers to GLP-1 therapy for most patients. This cluster collects the pricing data, insurance audits, provider verification, and prescription pathway articles in one place — so you can answer 'what will this actually cost me' regardless of whether you're going through brand-name, compounded, or insurance-covered routes.",
    memberSlugs: [
      "glp1-pricing-index",
      "cheapest-compounded-semaglutide",
      "compounded-glp1-price-movement-12-months",
      "glp1-insurance-coverage-audit",
      "glp1-insurance-coverage-medicare-medicaid-commercial",
      "where-to-buy-foundayo",
      "where-to-buy-semaglutide",
      "where-to-buy-tirzepatide",
      "how-to-get-glp1-prescription",
      "wegovy-pen-vs-compounded-vial-practical-differences",
    ],
    lastUpdated: "2026-04-08",
  },
  {
    slug: "compounded-glp1-quality-regulation",
    title:
      "Compounded GLP-1s: Bioequivalence, Pharmacy Standards & Safety",
    description:
      "The regulatory and quality picture for compounded semaglutide and tirzepatide — bioequivalence research, FDA enforcement actions, PCAB pharmacy accreditation, and reconstitution math.",
    intro:
      "Compounded semaglutide and tirzepatide are legal, widely used, and dramatically cheaper than the brand-name pens — but the quality varies pharmacy by pharmacy in ways that aren't visible from the marketing. This cluster collects every research article on the compounded regulatory and quality picture: bioequivalence evidence, FDA warning letters, PCAB accreditation data, and the practical reconstitution and dosing guides.",
    memberSlugs: [
      "compounded-semaglutide-bioequivalence",
      "fda-warning-letters-glp1",
      "pcab-accreditation-compounding-pharmacy-investigation",
      "compounded-glp1-reconstitution-mixing-guide",
      "glp1-units-to-mg-dosage-chart",
    ],
    lastUpdated: "2026-04-08",
  },
  {
    slug: "dosing-administration-pharmacology",
    title:
      "GLP-1 Dosing, Injection Technique & Pharmacokinetics",
    description:
      "Practical patient questions about how to use GLP-1s safely — injection technique, dose conversion, storage, travel, microdosing, switching between drugs, and how the new oral GLP-1 (Foundayo) is taken.",
    intro:
      "Once a prescription is in hand, the next set of questions is operational: how do I inject correctly, how long does the medication stay in my system, how do I store it, can I travel with it, what happens if I switch from semaglutide to tirzepatide. This cluster collects every practical patient-facing dosing and administration guide, all anchored in FDA prescribing information.",
    memberSlugs: [
      "how-long-does-glp1-stay-in-your-system",
      "glp1-units-to-mg-dosage-chart",
      "how-to-inject-glp1-step-by-step-technique",
      "where-to-inject-semaglutide-tirzepatide-guide",
      "how-to-travel-with-glp1-guide",
      "glp1-storage-shelf-life-refrigeration-guide",
      "tirzepatide-microdosing-evidence-guide",
      "semaglutide-microdosing-evidence-guide",
      "switching-between-glp1-medications-guide",
      "how-to-take-foundayo-orforglipron-guide",
    ],
    lastUpdated: "2026-04-08",
  },
  {
    slug: "drug-comparisons-pipeline-emerging",
    title:
      "GLP-1 Drug Comparisons & Pipeline: Wegovy, Zepbound, Foundayo & Beyond",
    description:
      "Side-by-side comparisons of every approved and pipeline GLP-1 — semaglutide vs tirzepatide, the new oral orforglipron (Foundayo), CagriSema, retatrutide, survodutide, and the rest of the 2026-2028 pipeline.",
    intro:
      "Patients comparing branded GLP-1s — or evaluating the newer oral and pipeline drugs — need side-by-side trial data, not marketing copy. This cluster collects the head-to-head comparisons (tirzepatide vs semaglutide), the Foundayo / orforglipron deep-dives, and the pipeline drug articles (CagriSema, retatrutide, survodutide, MariTide, ecnoglutide).",
    memberSlugs: [
      "tirzepatide-vs-semaglutide-head-to-head",
      "foundayo-vs-wegovy-vs-zepbound-comparison",
      "what-is-orforglipron-foundayo",
      "foundayo-orforglipron-fda-approval-2026",
      "orforglipron-foundayo-side-effects",
      "wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet",
      "can-you-take-phentermine-with-glp1",
      "glp1-pipeline-2026-survodutide-maridebart-ecnoglutide",
      "cagrisema-redefine-trial-results-2026",
      "retatrutide-triple-agonist-evidence-2026",
      "berberine-vs-glp1-evidence-review",
      "step-teens-semaglutide-adolescents",
    ],
    lastUpdated: "2026-04-08",
  },
  {
    slug: "lifestyle-comorbidities-longterm",
    title:
      "GLP-1 Lifestyle, Body Composition & Long-Term Outcomes",
    description:
      "Evidence-based guidance on nutrition, exercise, lean mass preservation, plateaus, alcohol use disorder, antidepressant interactions, and the long-term lifestyle picture on GLP-1 therapy.",
    intro:
      "Patients on GLP-1 therapy need more than dosing instructions — they need evidence on what to eat, how much protein, what kind of exercise preserves lean mass, why their weight loss has plateaued, how the drug interacts with antidepressants and alcohol, and how it compares to bariatric surgery and older weight-loss medications. This cluster consolidates the lifestyle, body composition, and long-term outcomes literature.",
    memberSlugs: [
      "what-to-eat-on-glp1-diet-protein-guide",
      "exercise-pairing-glp1-lean-mass-preservation",
      "semaglutide-muscle-mass-loss",
      "loose-skin-after-glp1-weight-loss",
      "why-am-i-not-losing-weight-glp1-plateau",
      "how-long-does-glp1-take-to-work",
      "glp1-alcohol-use-disorder-evidence",
      "antidepressants-weight-glp1-evidence",
      "metformin-vs-glp1-weight-loss-evidence",
      "topamax-qsymia-topiramate-weight-loss",
      "bariatric-surgery-vs-glp1-2026",
    ],
    lastUpdated: "2026-04-08",
  },
];

export function getClusterBySlug(slug: string): ResearchCluster | undefined {
  return RESEARCH_CLUSTERS.find((c) => c.slug === slug);
}

export function getClusterArticles(
  cluster: ResearchCluster,
): ResearchArticle[] {
  return cluster.memberSlugs
    .map((slug) =>
      RESEARCH_ARTICLES.find((a) => a.slug === slug),
    )
    .filter((a): a is ResearchArticle => a !== undefined);
}

export function getAllClusterSlugs(): { cluster: string }[] {
  return RESEARCH_CLUSTERS.map((c) => ({ cluster: c.slug }));
}
