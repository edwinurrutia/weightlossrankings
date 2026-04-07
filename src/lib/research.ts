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
    slug: "how-to-travel-with-glp1-guide",
    title:
      "How to Travel With a GLP-1: The Complete Guide for Pens, Vials, and TSA",
    description:
      "FDA-sourced storage windows for Wegovy, Ozempic, Zepbound, Mounjaro, and Foundayo, plus TSA carry-on rules, ice pack guidance, time-zone advice, and what to do if your pen gets warm.",
    excerpt:
      "Wegovy gives you 28 days out of the fridge. Ozempic gives you 56. Zepbound and Mounjaro give you 21. Foundayo, the new oral pill, needs no fridge at all. We pull every number from the FDA labels, walk through TSA's actual carry-on exemptions for injectables and frozen ice packs, and answer the practical travel questions patients keep searching for.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 11,
    citations: 6,
    tags: ["Travel", "Storage", "FDA sourced"],
  },
  {
    slug: "does-glp1-cause-liver-damage-nafld-nash-evidence",
    title:
      "Does a GLP-1 Cause Liver Damage? The Evidence on NAFLD, MASH, and Why the Answer Is Usually the Opposite",
    description:
      "Patients worry GLP-1s damage the liver. The trial evidence — Newsome 2021, SYNERGY-NASH 2024, STEP-1 and SURMOUNT-1 sub-analyses — shows the opposite: semaglutide and tirzepatide reduce liver fat and improve MASLD/MASH.",
    excerpt:
      "Semaglutide and tirzepatide have positive trial data on liver outcomes in MASLD/MASH — the exact opposite of what many patients fear. We walk through Newsome 2021, SYNERGY-NASH, the STEP-1 and SURMOUNT-1 liver enzyme sub-analyses, the rare DILI signal in postmarketing, and what to monitor.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 13,
    citations: 8,
    tags: ["Liver safety", "MASH / NASH", "PubMed sourced"],
  },
  {
    slug: "how-to-take-foundayo-orforglipron-guide",
    title:
      "How to Take Foundayo (Orforglipron): The Practical Daily Guide for the New Oral GLP-1",
    description:
      "Exactly how to take Foundayo, the first oral non-peptide GLP-1 approved by the FDA: titration schedule, morning empty-stomach window, food pitfalls, missed doses, contraception warning, storage, and travel.",
    excerpt:
      "Foundayo is the first daily oral GLP-1 pill for weight loss, but it has strict timing rules most patients get wrong. We walk through the full 20-week titration, the 30-minute fasted morning window, the absorption pitfall that wrecks results, and the 30-day backup contraception rule from the label.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 12,
    citations: 5,
    tags: ["Foundayo", "Orforglipron", "FDA sourced"],
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
  {
    slug: "wegovy-pen-vs-compounded-vial-practical-differences",
    title:
      "Wegovy Pen vs Compounded Vial: 12 Practical Differences Before You Switch",
    description:
      "Brand-name Wegovy ships in a pre-filled multi-dose injector pen. Compounded semaglutide ships in a vial with a separate syringe. Same molecule, very different patient experience. We document every operational difference — refrigeration, dose math, needle gauges, injection technique — that matters when you're deciding between the two.",
    excerpt:
      "The active molecule in Wegovy and most compounded semaglutide products is the same, but the delivery format is completely different. Wegovy ships in a pre-filled multi-dose injector pen designed to be operated by a patient with no syringe experience. Compounded semaglutide ships in a sterile vial that the patient draws from with a separate insulin syringe — every dose. The differences matter more than people expect, and the learning curve catches new patients off guard. Here are 12 specific operational differences worth knowing before you decide between the two formats.",
    kind: "data-investigation",
    publishedDate: "2026-04-06",
    readMinutes: 10,
    citations: 3,
    tags: ["Compounded GLP-1", "Wegovy", "Practical guide"],
  },
  {
    slug: "select-trial-cardiovascular-benefits-non-diabetics",
    title:
      "What SELECT Showed: Semaglutide Cuts Heart Attack Risk by 20% in Non-Diabetics with Cardiovascular Disease",
    description:
      "The SELECT trial (Lincoff et al., NEJM 2023) randomized 17,604 non-diabetic adults with established cardiovascular disease to weekly semaglutide 2.4 mg or placebo for nearly four years. The primary cardiovascular endpoint dropped 20% — and the benefit appears largely independent of weight loss. Here's what the trial actually measured and what it should change about how we think about GLP-1 therapy.",
    excerpt:
      "SELECT was the first major cardiovascular outcomes trial of a GLP-1 receptor agonist in non-diabetic patients. The trial randomized 17,604 adults with overweight/obesity and established cardiovascular disease to weekly semaglutide 2.4 mg or placebo for a mean 39.8 months of follow-up. The primary MACE composite (CV death, nonfatal MI, nonfatal stroke) dropped from 8.0% on placebo to 6.5% on semaglutide — a 20% relative risk reduction (HR 0.80, 95% CI 0.72–0.90, P<0.001). Crucially, the cardiovascular benefit appeared largely independent of how much weight participants actually lost. This article walks through every verified number from the published NEJM paper and the FDA approval that followed.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 13,
    citations: 5,
    tags: ["Semaglutide", "Cardiovascular", "PubMed sourced"],
  },
  {
    slug: "surmount-osa-tirzepatide-sleep-apnea",
    title:
      "Tirzepatide for Sleep Apnea: What SURMOUNT-OSA Showed and the FDA's First-Ever OSA Drug Approval",
    description:
      "SURMOUNT-OSA (Malhotra et al., NEJM 2024) is the trial that made Zepbound the first medication ever approved by the FDA for obstructive sleep apnea. We walk through the verified trial data: a 25–29 events-per-hour reduction in AHI, both with and without concurrent CPAP, in adults with moderate-to-severe OSA and obesity.",
    excerpt:
      "Until 2024, the standard pharmacological treatment for obstructive sleep apnea was nothing — there wasn't one. CPAP and oral appliances were the only options, and roughly two-thirds of patients prescribed CPAP don't tolerate it long-term. The SURMOUNT-OSA trial, published in NEJM in October 2024, changed that. Tirzepatide cut the apnea-hypopnea index by 25–29 events per hour from a baseline of ~50, both in patients on CPAP and patients off CPAP. The FDA followed with the first-ever approval of a prescription medication for OSA. Here's what the trial actually showed and what it changes for the millions of obese adults living with sleep apnea.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 11,
    citations: 4,
    tags: ["Tirzepatide", "Sleep apnea", "PubMed sourced"],
  },
  {
    slug: "step-teens-semaglutide-adolescents",
    title:
      "What STEP-TEENS Showed: Semaglutide for Adolescents with Obesity",
    description:
      "STEP-TEENS (Weghuber et al., NEJM 2022) is the trial that made Wegovy the first FDA-approved GLP-1 for adolescent obesity. 201 adolescents aged 12-17 randomized to weekly semaglutide or placebo for 68 weeks produced a 16.7-percentage-point separation in BMI change. Here's what the trial actually showed, what the AAP now recommends, and the long-term follow-up question that hasn't been answered yet.",
    excerpt:
      "STEP-TEENS is the trial that made Wegovy the first FDA-approved GLP-1 medication for adolescents with obesity. Published in NEJM in November 2022, the 68-week randomized trial of 201 adolescents aged 12-17 produced a remarkable 16.7-percentage-point separation in BMI change between the semaglutide and placebo arms — the largest pediatric pharmacological weight loss result ever recorded. The FDA approved the indication in December 2022, and the AAP's 2023 clinical practice guideline now recommends pharmacotherapy as adjunct treatment for adolescents with obesity. Here's the full trial data, the AAP guidance, and the open long-term safety question that the field hasn't yet answered.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 12,
    citations: 6,
    tags: ["Semaglutide", "Adolescents", "PubMed sourced"],
  },
  {
    slug: "glp1-insurance-coverage-2026-medicare-medicaid-commercial",
    title:
      "GLP-1 Insurance Coverage 2026: Medicare, Medicaid, Commercial, Tricare, VA, and FEHB Explained",
    description:
      "What Medicare Part D, Medicaid, commercial insurance, Tricare, the VA, and FEHB actually covered for Wegovy, Zepbound, Ozempic, and Foundayo in 2026. Verified against CMS rules, the Medicare GLP-1 Bridge program, KFF/Mercer surveys, and the Trump administration's November 2025 deal with Novo Nordisk and Eli Lilly. With prior auth criteria, BMI thresholds, and what to ask your benefits administrator.",
    excerpt:
      "Insurance coverage for GLP-1 weight loss drugs is the most volatile category in employer pharmacy benefits. The 2025-2026 landscape changed dramatically: the original CMS proposed rule allowing Wegovy under Part D was rejected in April 2025, then reversed by a November 2025 Trump administration deal that created a Medicare GLP-1 Bridge program (July-December 2026) and the BALANCE permanent model starting 2027. Medicaid coverage shrank from 16 states in October 2025 to 13 in January 2026 after California and Pennsylvania ended their programs. Commercial coverage expanded — 49% of large employers covered GLP-1s in 2025 per Mercer. Tricare changed too, dropping coverage for retirees on Medicare. Here's the verified state of coverage across every major US payer category, with prior auth criteria and the questions to ask your benefits administrator.",
    kind: "data-investigation",
    publishedDate: "2026-04-07",
    readMinutes: 14,
    citations: 8,
    tags: ["Insurance", "Medicare", "Medicaid", "Coverage"],
  },
  {
    slug: "glp1-pregnancy-pcos-fertility-women-health",
    title:
      "GLP-1s and Pregnancy, PCOS, and Fertility: What the FDA Labels and the Trial Evidence Actually Say",
    description:
      "Wegovy, Zepbound, Ozempic, and Foundayo are all contraindicated in pregnancy and require discontinuation 2 months before planned conception. We walk through the FDA prescribing information for each drug, the published PCOS pilot trials (Salamun, Jensterle), the contraception interaction during dose escalation, and the emerging 'GLP-1 babies' fertility restoration phenomenon — with primary source citations throughout.",
    excerpt:
      "GLP-1 weight loss drugs are contraindicated in pregnancy and the FDA labels recommend discontinuation at least 2 months before planned conception. But the women's health story is more nuanced than that headline: GLP-1-induced weight loss in PCOS patients consistently improves menstrual regularity, reduces androgen levels, and the most-cited fertility study (Salamun et al., European Journal of Endocrinology 2018, PMID 29703793) showed that pre-conception liraglutide therapy improved IVF pregnancy rates in obese PCOS women beyond what metformin alone achieved. This article walks through the verified FDA labels, the published PCOS evidence, the contraception interaction during dose escalation that the labels specifically warn about, and how to think about GLP-1 use through the family-planning timeline.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 13,
    citations: 7,
    tags: ["Pregnancy", "PCOS", "Fertility", "Women's health"],
  },
  {
    slug: "glp1-side-effect-questions-answered",
    title:
      "GLP-1 Side Effect Q&A: Headache, Sulfur Burps, Brain Fog, Mood, Acne, and 12 Other Patient Questions",
    description:
      "Specific patient-reported GLP-1 side effects with verified rates from STEP-1, SURMOUNT-1, and the FDA prescribing information adverse reactions tables. Includes the headache rate (14.2% sema vs 10% placebo), the sulfur-burp mechanism, the FDA suicidal ideation review conclusion, and the emerging brain fog FDA pharmacovigilance signal.",
    excerpt:
      "Our broader side effects investigation covered the headline GI tolerability numbers. This article answers the specific Q&A-style queries patients search for: 'does semaglutide cause headaches' (14.2% in STEP-1 vs 10% placebo), 'does tirzepatide cause sulfur burps' (yes — slowed gastric emptying changes the bacterial fermentation profile), 'does semaglutide cause depression' (no signal in 2024 EMA/FDA review of RCTs, but a separate observational signal exists), 'does GLP-1 cause brain fog' (an emerging FDA pharmacovigilance signal as of 2025), and 13 other specific symptom questions. Every rate is sourced from the STEP-1 and SURMOUNT-1 NEJM publications and the Wegovy and Zepbound FDA prescribing information.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 12,
    citations: 7,
    tags: ["Side effects", "FAQ", "Patient guide"],
  },
  {
    slug: "does-glp1-affect-blood-pressure-evidence",
    title:
      "Does a GLP-1 Affect Blood Pressure? Lower, Higher, or Both — The Evidence",
    description:
      "A thousand patients a month search 'does semaglutide lower blood pressure' or 'can semaglutide cause high blood pressure.' The honest answer is: GLP-1s lower systolic blood pressure by about 5-7 mmHg on average via weight loss and direct vascular mechanisms, with a small subset of patients experiencing dose-dependent heart-rate increases. Here is the evidence from STEP-1, SURMOUNT-1, SELECT, and the antihypertensive interaction.",
    excerpt:
      "GLP-1 receptor agonists have a modest but consistent effect on blood pressure: in the obesity registration trials, mean systolic blood pressure dropped by 5-7 mmHg and diastolic by 2-3 mmHg at the maintenance dose, an effect that is partly explained by weight loss and partly direct (vascular and renal). The cardiovascular outcomes trial SELECT (Lincoff et al. NEJM 2023) showed semaglutide 2.4 mg reduced major adverse cardiovascular events by 20% in patients with obesity and pre-existing CV disease, including a meaningful blood pressure component. There is also a small but real heart-rate increase (about 2-4 bpm) in many patients on GLP-1 therapy. This article walks through the trial data, the mechanism, and the practical implications for patients on antihypertensive medications.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 11,
    citations: 8,
    tags: ["Blood pressure", "Cardiovascular", "SELECT trial", "Patient question"],
  },
  {
    slug: "where-to-buy-foundayo-2026",
    title:
      "Where to Buy Foundayo (Orforglipron) in 2026: The Telehealth and Pharmacy Provider Directory",
    description:
      "Foundayo (orforglipron) was FDA-approved April 1, 2026 and dispensing started April 6, 2026. Here is the verified list of US providers and pharmacies offering it as of April 2026: LillyDirect (manufacturer), Weight Watchers Med+, NowPatient, and the rollout we are tracking. Cash pay is $149-$299/month at the labeled doses; the Lilly Savings Card brings commercially-insured patients to $25/month.",
    excerpt:
      "Foundayo (orforglipron), Eli Lilly's first oral GLP-1 for weight loss, became commercially available on April 6, 2026 — five days after its FDA approval. The rollout is in its first weeks, so the provider directory is still small but growing rapidly. This article tracks which US telehealth platforms and pharmacies are confirmed as Foundayo channels as of April 2026, the pricing tiers at each (verified directly from the provider websites), how the dispensing chain actually works (most channels go through LillyDirect for the actual drug), and the framework for finding a Foundayo prescription if your existing telehealth platform has not added it yet. We will update this list weekly as more providers come online.",
    kind: "data-investigation",
    publishedDate: "2026-04-07",
    readMinutes: 9,
    citations: 6,
    tags: ["Foundayo", "Where to buy", "Provider directory", "Pricing 2026", "Live dataset"],
  },
  {
    slug: "foundayo-vs-wegovy-vs-zepbound-comparison",
    title:
      "Foundayo vs Wegovy vs Zepbound: The Head-to-Head 2026 Comparison (Pill, Injection, Cost, Effect Size)",
    description:
      "Foundayo (orforglipron) is the first oral GLP-1 for weight loss, FDA-approved April 1, 2026. How does it stack up against Wegovy and Zepbound? Side-by-side: 17.2 mg labeled-dose Foundayo 11.1% vs STEP-1 Wegovy 14.9% vs SURMOUNT-1 Zepbound 20.9%, $25 vs $499 vs $449, daily pill vs weekly injection.",
    excerpt:
      "Foundayo (orforglipron), the first oral non-peptide GLP-1, was approved by the FDA on April 1, 2026 as a daily pill for weight management. It enters a market dominated by two injectable heavyweights: Wegovy (semaglutide 2.4 mg) and Zepbound (tirzepatide 15 mg). The three drugs differ on every dimension that matters to a patient: effect size (Wegovy 14.9% in STEP-1, Zepbound 20.9% in SURMOUNT-1, Foundayo 11.1% at the FDA-approved 17.2 mg labeled max dose per the prescribing information), delivery (weekly injection vs daily pill), cost (cash-pay $499 NovoCare vs $449 LillyDirect vs $25-$149 Foundayo), titration speed, side effect profile, and access. This is the head-to-head, with the trial data, the pricing tables, and the case for picking each one.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 13,
    citations: 11,
    tags: ["Foundayo", "Comparison", "Trial data", "Pricing 2026", "Patient guide"],
  },
  {
    slug: "tirzepatide-microdosing-evidence-guide",
    title:
      "Tirzepatide Microdosing: What the Trial Data Says About Sub-Therapeutic Doses (And Why Most of It Is Off-Label)",
    description:
      "A thousand patients a month search 'what is microdosing tirzepatide.' This is the evidence-based answer: the SURMOUNT-1 dose-ranging arms (2.5, 5, 7.5, 10 mg) tell us what each step actually produced, no formal trial has tested doses below 2.5 mg, and 'microdosing' below the FDA-approved starting dose is off-label. Includes the trial data on each dose, the harm-reduction framing for patients who already do it, and the prescriber conversation.",
    excerpt:
      "Tirzepatide microdosing — using doses below the FDA-approved 2.5 mg starting dose — has become a popular strategy in patient communities, particularly for cost reasons (compounded vials priced per mg) and side effect tolerance. The published SURMOUNT-1 trial included a 2.5 mg arm but no formal sub-2.5 mg dose-finding. This article walks through what the SURMOUNT-1 dose-response curve actually shows, what is known about pharmacokinetics at fractional doses, why any dose below the FDA-approved starting dose is off-label, and the conversation patients should have with their prescriber rather than self-microdosing in isolation.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 9,
    citations: 6,
    tags: ["Tirzepatide", "Microdosing", "Off-label", "Compounded", "Patient question"],
  },
  {
    slug: "can-you-take-phentermine-with-glp1",
    title:
      "Can You Take Phentermine With a GLP-1? The Combination Therapy Evidence and the Safety Concerns",
    description:
      "Five hundred patients a month search 'can you take phentermine with semaglutide.' This is the evidence-based answer: there is no FDA approval for the combination, no randomized trial data on it, and real safety concerns about cardiovascular risk and stimulant exposure on top of GLP-1 therapy. Some obesity-medicine specialists do prescribe both, with monitoring. Here is the actual evidence and the risk framework.",
    excerpt:
      "Phentermine is a stimulant appetite suppressant that has been prescribed for short-term weight loss in the US since 1959. It is the most prescribed weight-loss drug in the US after the GLP-1s themselves. With the rise of GLP-1 therapy, the question of combining the two has become increasingly common — and the answer is more nuanced than either 'never' or 'sure'. There is no randomized controlled trial of the combination, no FDA approval for it, and several legitimate concerns: cardiovascular load (phentermine raises heart rate and blood pressure; some GLP-1 patients also have these on top of obesity), abuse potential (phentermine is DEA Schedule IV), and the diminishing-returns argument (a maintenance-dose GLP-1 already produces appetite suppression — what does adding phentermine actually add?). At the same time, many obesity-medicine specialists do prescribe the combination in selected patients, particularly those plateauing on GLP-1 monotherapy. This article walks through the evidence, the physiology, the safety concerns, and the prescriber framework.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 11,
    citations: 7,
    tags: ["Combination therapy", "Phentermine", "Plateau", "Safety", "Patient question"],
  },
  {
    slug: "glp1-menstrual-cycle-period-hormones",
    title:
      "Does a GLP-1 Affect Your Period? Menstrual Cycle Changes, Hormones, and the PCOS Connection",
    description:
      "Hundreds of patients a month search 'does tirzepatide affect your period.' GLP-1s do not directly target the menstrual cycle, but the rapid weight loss they produce frequently does — restoring ovulation in PCOS, sometimes triggering temporary irregularity in patients with low body weight, and interacting with oral contraceptive absorption. Here is the evidence and what to do about each scenario.",
    excerpt:
      "GLP-1 receptor agonists do not act directly on the hypothalamic-pituitary-ovarian axis, so they do not have a primary effect on the menstrual cycle in the way that hormonal contraception does. But the rapid weight loss they produce often DOES change menstrual patterns: women with PCOS frequently see ovulation restored and previously absent or irregular cycles return; women with very low body fat percentages may experience temporary cycle disruption; and the slowed gastric emptying that GLP-1s produce can affect oral contraceptive absorption — a well-documented interaction with the new oral Foundayo and a labeled caution for the injectables. This article walks through the published evidence on PCOS, the weight-loss-and-fertility return, the contraception interaction, and the practical guidance for women on a GLP-1 who notice their period change.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 11,
    citations: 8,
    tags: ["Women's health", "Menstrual cycle", "PCOS", "Hormones", "Patient question"],
  },
  {
    slug: "does-glp1-cause-cancer-mtc-thyroid-evidence",
    title:
      "Does a GLP-1 Cause Cancer? The Medullary Thyroid Carcinoma Boxed Warning, the Pancreatic Cancer Signal, and What the Human Evidence Actually Shows",
    description:
      "Two thousand patients a month search 'does semaglutide cause cancer.' This is the evidence-based answer: the FDA boxed warning for medullary thyroid carcinoma comes from rodent studies, has not been replicated in humans, but is taken seriously enough to contraindicate GLP-1s in MEN2 and personal/family MTC history. The pancreatic cancer signal has been investigated in multiple large cohorts and found to be null. The 2023 BMJ thyroid signal paper and the 2024 EMA review.",
    excerpt:
      "Cancer is the single most common patient-anxiety question about GLP-1s, and the FDA black-box warning for medullary thyroid carcinoma is the reason. The warning comes from a series of rodent studies that found C-cell tumors at supraphysiologic doses; the human equivalent has not been demonstrated. Multiple large cohort studies have looked at thyroid cancer, pancreatic cancer, and other malignancy signals — most are null or inconclusive. The 2023 BMJ paper from a French national cohort generated a fresh thyroid cancer signal that the EMA and FDA both reviewed and did not find sufficient to change labeling. This article walks through the boxed warning, the rodent vs human distinction, the major cohort studies, the 2023 BMJ signal, the EMA/FDA reviews, and the contraindications that genuinely apply.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 13,
    citations: 9,
    tags: ["Cancer", "Safety", "MTC", "Black box warning", "Patient question"],
  },
  {
    slug: "can-you-drink-alcohol-on-glp1",
    title:
      "Can You Drink Alcohol on a GLP-1? The Evidence on Safety, Tolerance, and the Surprising Cravings Effect",
    description:
      "Two thousand patients a month search 'can you drink on semaglutide.' This is the evidence-based answer: there is no FDA contraindication, but GLP-1s lower alcohol tolerance, increase hypoglycemia risk in diabetics, and — unexpectedly — appear to reduce alcohol cravings in observational and trial data. Includes the practical drinking guidance and the red flags that mean stop.",
    excerpt:
      "GLP-1 receptor agonists do not have an FDA contraindication for alcohol, but the practical reality is more complicated. Most patients report a marked drop in alcohol tolerance, anecdotal hangovers from much smaller quantities, and — in a finding that's now been replicated in multiple observational studies and one published RCT — a significant reduction in alcohol cravings and consumption. Meanwhile, hypoglycemia risk goes up if you're also on insulin or a sulfonylurea, and the pancreatitis warning in the GLP-1 boxed warning interacts with the well-known alcohol-pancreatitis link. This guide walks through the safety evidence, the practical guidance, and the red flags.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 10,
    citations: 7,
    tags: ["Alcohol", "Patient question", "Safety", "Cravings"],
  },
  {
    slug: "how-to-get-glp1-prescription-2026",
    title:
      "How to Get a GLP-1 Prescription in 2026: The Patient Buyer Funnel",
    description:
      "Eight thousand patients a month search 'how to get semaglutide' or 'how to get tirzepatide.' This is the complete buyer funnel: insurance path (PBM step therapy and prior authorization), brand-name direct-pay (Wegovy NovoCare $199-$499, Zepbound LillyDirect $299-$449), compounded telehealth ($150-$400/mo), the new $25 oral Foundayo path, and the legitimacy red flags to watch for.",
    excerpt:
      "Most patients don't know there are at least four legitimate paths to a GLP-1 prescription in the US in 2026, each with different costs, different paperwork, and different waiting times. This buyer-funnel guide walks through all of them: the insurance route (eligibility, BMI documentation, step therapy, prior authorization), the brand-name direct-pay route (Wegovy NovoCare and Zepbound LillyDirect, with the actual 2026 price tiers), the compounded telehealth route ($150-$400/mo from licensed 503A pharmacies), and the new Foundayo oral route at $25-$149/mo with a savings card. Includes a checklist of red flags for illegitimate sellers and a decision tree for which path likely fits your situation.",
    kind: "data-investigation",
    publishedDate: "2026-04-07",
    readMinutes: 12,
    citations: 8,
    tags: ["Buyer guide", "Pricing 2026", "Insurance", "Compounded", "Patient guide"],
  },
  {
    slug: "how-to-inject-glp1-step-by-step-technique",
    title:
      "How to Inject a GLP-1: The Step-by-Step Technique Guide for Pens, Vials, and Compounded Syringes",
    description:
      "Five thousand patients a month search 'how to inject semaglutide' or 'how to inject tirzepatide.' This is the complete step-by-step technique guide: pre-filled pen (Wegovy, Ozempic, Zepbound, Mounjaro), multi-dose vial with a regular syringe, and compounded vial with an insulin syringe. Site rotation, angle, depth, common mistakes, what a missed dose looks like.",
    excerpt:
      "Most patients never get a hands-on injection lesson — they get a pen, a quick clinic demo if they're lucky, and a YouTube link. This guide is the written reference: hand-by-hand, click-by-click, for every common GLP-1 delivery format. Pre-filled single-use pens (Wegovy, Zepbound). Multi-dose pens (Ozempic, Mounjaro). Vials with regular syringes. Compounded vials with U-100 insulin syringes. Includes the FDA-recommended injection sites, the 90° vs 45° angle decision, the air-bubble issue, the common skin reactions and how to tell them apart from cellulitis, and the troubleshooting checklist for partial doses, broken needles, and bent needles.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 13,
    citations: 6,
    tags: ["Injection technique", "Patient guide", "Pens", "Syringes"],
  },
  {
    slug: "glp1-nausea-management-practical-guide",
    title:
      "GLP-1 Nausea: The Practical Management Guide (Trial Rates, Timeline, and What Actually Helps)",
    description:
      "Nausea is the #1 reason people quit GLP-1s. STEP-1 reported 44% on semaglutide, SURMOUNT-1 reported 33% on tirzepatide, and most of it lands in the first 8 weeks. This guide breaks down the exact rates, the typical timeline, and the practical strategies that have actual evidence behind them — plus the red flags that mean you should call your prescriber.",
    excerpt:
      "Nausea is the most common GLP-1 side effect and the leading reason patients discontinue therapy. STEP-1 reported 44% nausea on semaglutide 2.4 mg and SURMOUNT-1 reported 33% on tirzepatide 15 mg, but the headline rates hide the timeline: most nausea is concentrated in the first 4-8 weeks of each new dose step, then fades. This guide walks through the exact trial-reported rates, the typical week-by-week timeline, the practical management strategies with the strongest evidence (slower titration, smaller meals, hydration, antiemetics where appropriate), and the red flags — persistent vomiting, abdominal pain, signs of dehydration, signs of pancreatitis or gastroparesis — that mean stop and call your prescriber.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 11,
    citations: 7,
    tags: ["Side effects", "Nausea", "Patient guide", "Management"],
  },
  {
    slug: "glp1-surgery-anesthesia-asa-guidance",
    title:
      "Stopping GLP-1s Before Surgery: ASA Guidance, Aspiration Risk, and What to Tell Your Anesthesiologist",
    description:
      "The American Society of Anesthesiologists issued specific GLP-1 hold guidance in 2023 and updated it in 2024 because of aspiration cases under anesthesia. This is the patient-facing version: when to hold, when not to, what to tell your surgeon and anesthesia team, and what the actual evidence behind the guidance is.",
    excerpt:
      "GLP-1 receptor agonists slow gastric emptying — that's a feature, not a bug, of how they produce satiety. But the same mechanism increases the risk of aspirating stomach contents under general anesthesia or deep sedation, even after a long preoperative fast. Multiple case reports and a 2024 prospective study showed retained gastric contents in patients who had fasted the standard 8 hours. The American Society of Anesthesiologists issued formal pre-procedure hold guidance in June 2023 and a multi-society consensus update in October 2024. This article walks patients through the current guidance, the underlying evidence, and the conversation you should have with both your prescriber and your anesthesia team before any surgery, colonoscopy, endoscopy, or procedure with sedation.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 12,
    citations: 8,
    tags: ["Surgery", "Anesthesia", "Patient safety", "ASA guidance"],
  },
  {
    slug: "wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet",
    title:
      "Wegovy vs Ozempic vs Zepbound vs Mounjaro: The GLP-1 Brand Name Cheat Sheet",
    description:
      "Five brand names, three active ingredients, two drugs, one confusing market. We untangle which brand is which, which are identical products with different labels, which insurance covers what, and why 'is Zepbound the same as Mounjaro?' is the most-searched GLP-1 brand question.",
    excerpt:
      "The GLP-1 market is a mess of brand names: Wegovy, Ozempic, Rybelsus, Zepbound, Mounjaro, Foundayo. Most patients don't know that Zepbound and Mounjaro contain the same active ingredient dispensed by the same manufacturer, or that Wegovy and Ozempic are similarly related, or that Foundayo is the first non-peptide pill in the class. This cheat sheet explains which brand equals which drug, which indication each is approved for, and which insurance landscape each falls into — answering every brand confusion query in one place.",
    kind: "data-investigation",
    publishedDate: "2026-04-07",
    readMinutes: 8,
    citations: 6,
    tags: ["Brand names", "Patient guide", "Cheat sheet"],
  },
  {
    slug: "switching-between-glp1-medications-guide",
    title:
      "Switching Between GLP-1 Medications: The Complete Protocol Guide",
    description:
      "Can you switch from semaglutide to tirzepatide? From Ozempic to Wegovy? From Wegovy to Zepbound? From compounded to brand-name? This guide walks through every switching scenario with the recommended protocol, the washout timing, the dose mapping, and what to expect during the transition period.",
    excerpt:
      "Switching between GLP-1 medications is increasingly common as patients plateau on one drug, chase lower prices, move between insurance coverage tiers, or want the larger effect size of tirzepatide. Each switching scenario has a different protocol and different pitfalls. This guide walks through all of them: sema→tirz, tirz→sema, Ozempic→Wegovy, Wegovy→Zepbound, brand→compounded, and compounded→brand. Includes dose-equivalence mapping tables and the 1-2 week washout guidance from the FDA labels.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 11,
    citations: 5,
    tags: ["Switching", "Patient guide", "Protocol"],
  },
  {
    slug: "how-to-taper-off-glp1-safely-guide",
    title:
      "How to Taper Off Semaglutide and Tirzepatide Safely: The Discontinuation Protocol Guide",
    description:
      "Stopping a GLP-1 medication isn't the same as skipping a few weeks. The STEP-4 trial showed that patients who stopped semaglutide regained 67% of their lost weight within a year. This guide walks through the evidence-based tapering options, when to stop versus continue, and the rebound prevention protocol.",
    excerpt:
      "There is no FDA-approved tapering schedule for semaglutide or tirzepatide — the prescribing information treats discontinuation as 'simply stop.' But the clinical reality is more complicated: the STEP-4 trial showed that patients who stopped cold regained about 67% of their lost weight within a year. This guide walks through the evidence-based options: continuing at maintenance (the trial-supported protocol), stepping down to a lower dose (off-label but increasingly used), or full discontinuation with a lifestyle bridge plan. Includes the medical reasons to actually stop and when to call your prescriber instead.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 10,
    citations: 5,
    tags: ["Tapering", "Discontinuation", "Patient guide"],
  },
  {
    slug: "glp1-side-effects-fatigue-hair-loss-duration",
    title:
      "GLP-1 Side Effects Duration: Fatigue, Hair Loss, and How Long Everything Actually Lasts",
    description:
      "A trial-data-grounded guide to the three most-searched GLP-1 side effects that patients worry about most: fatigue ('does semaglutide make you tired?'), hair loss ('does tirzepatide cause hair loss?'), and how long standard GI side effects actually last. Covers onset timing, expected duration, resolution patterns, and what the STEP and SURMOUNT trials actually reported.",
    excerpt:
      "Three GLP-1 side effects drive the highest patient search volume: fatigue, hair loss, and duration of GI side effects. Our previous side-effects investigation covered the headline trial numbers; this article covers the narrower but higher-traffic question of how long each specific side effect lasts, when to expect it to resolve, and what the trial data actually says about attribution (drug vs rapid weight loss vs coincidence). Sourced from STEP-1, SURMOUNT-1, and the FDA Wegovy and Zepbound prescribing information adverse-event tables.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 11,
    citations: 6,
    tags: ["Side effects", "Fatigue", "Hair loss", "Patient guide"],
  },
  {
    slug: "why-am-i-not-losing-weight-glp1-plateau",
    title:
      "Why Am I Not Losing Weight on Semaglutide or Tirzepatide? The Plateau and Non-Responder Guide",
    description:
      "Roughly 10-15% of patients in the STEP-1 and SURMOUNT-1 trials did not lose meaningful weight on GLP-1 therapy. We walk through the documented causes of non-response, the early-titration vs late-plateau distinction, injection technique and dose math errors, and the evidence-based next steps when the scale stops moving.",
    excerpt:
      "Patient-reported 'the medication stopped working' complaints almost always fall into one of three buckets: (1) the patient is still in the early titration phase and the dose hasn't reached its full steady-state effect, (2) a technical error in dose or injection technique is silently reducing absorption, or (3) the patient has hit the natural trial-curve plateau that roughly 90% of participants reach in the second half of the STEP-1 / SURMOUNT-1 curves. This article walks through each bucket with the specific fix and the verified trial data.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 10,
    citations: 5,
    tags: ["Plateau", "Non-responder", "Patient guide"],
  },
  {
    slug: "compounded-glp1-reconstitution-mixing-guide",
    title:
      "Compounded GLP-1 Reconstitution Guide: Mixing Lyophilized Semaglutide and Tirzepatide Safely",
    description:
      "A step-by-step FDA-cited guide to reconstituting lyophilized compounded semaglutide and tirzepatide with bacteriostatic water. Covers concentration math, vial handling, storage after reconstitution, and the common mistakes that ruin a vial or under-dose the patient.",
    excerpt:
      "Some compounding pharmacies ship lyophilized (freeze-dried) semaglutide or tirzepatide powder that the patient reconstitutes with bacteriostatic water at home. This format is uncommon but not rare, and the patient search data shows consistent confusion about the math (how much water do I add?) and the technique (can you use sterile saline instead?). This guide walks through the reconstitution process, the resulting concentration math, post-reconstitution storage, and the safety boundaries.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 9,
    citations: 5,
    tags: ["Reconstitution", "Compounded", "Patient guide"],
  },
  {
    slug: "semaglutide-microdosing-evidence-guide",
    title:
      "Microdosing Semaglutide: What the Evidence Actually Says About Sub-Therapeutic GLP-1 Use",
    description:
      "'Microdosing' semaglutide and tirzepatide — using doses below the FDA-approved titration schedule — has become common in off-label practice. We walk through what the trial data shows about sub-therapeutic doses, why patients try it, what it can and cannot achieve, and the specific safety considerations and regulatory caveats around the practice.",
    excerpt:
      "The microdosing trend has almost no trial evidence but significant patient interest. The STEP-1 trial included a 0.25 mg starter dose that is functionally a 'microdose' and the dose-response data from that arm tells you roughly what a long-term sub-therapeutic dose would look like. This article walks through the actual STEP-1 0.25 mg arm results, the off-label nature of any dose below the FDA-approved maintenance, the practical safety profile, and why the honest answer to 'does microdosing work?' is 'less than full dose, and less than most patients expect.'",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 10,
    citations: 5,
    tags: ["Microdose", "Off-label", "Patient guide"],
  },
  {
    slug: "what-to-eat-on-glp1-diet-protein-guide",
    title:
      "What to Eat on a GLP-1: The Protein, Hydration, and Fiber Guide for Semaglutide and Tirzepatide",
    description:
      "GLP-1 therapy reduces caloric intake automatically — but the remaining calories you eat still matter enormously. This guide walks through the evidence-based protein target for lean mass preservation, the fiber and hydration targets that reduce GI side effects, the foods that commonly trigger GI side effects, and how to actually eat during the slow-loss plateau phase.",
    excerpt:
      "Reduced appetite is the point of GLP-1 therapy but it creates a second-order problem: patients eat less of everything, including protein, fiber, and water, which accelerates lean mass loss and worsens GI side effects. This guide walks through the evidence-based daily targets for protein (1.2-1.6 g/kg of lean body mass), fiber (25-35 g), and water (2-3 L), plus the foods that commonly trigger nausea/constipation/reflux on a GLP-1 and the ones that don't.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-07",
    readMinutes: 10,
    citations: 6,
    tags: ["Nutrition", "Protein", "Patient guide"],
  },
  {
    slug: "where-to-inject-semaglutide-tirzepatide-guide",
    title:
      "Where to Inject Semaglutide and Tirzepatide: The Complete Patient Guide",
    description:
      "A clear, FDA-label-cited guide to GLP-1 injection technique. The three approved injection sites (abdomen, front of thigh, back of upper arm), why patients rotate sites, what depth to inject at, and the patient-reported tricks that reduce injection-site soreness. Includes a labeled body diagram and answers every variation of 'where to inject semaglutide' and 'how to inject tirzepatide.'",
    excerpt:
      "Most GLP-1 telehealth providers ship a vial and a syringe with a one-line dosing instruction and almost no detail about where on the body the injection actually goes. The FDA prescribing information for Wegovy, Ozempic, Zepbound, and Mounjaro all approve three injection sites — the abdomen, the front of the thigh, and the back of the upper arm — and the patient-reported soreness varies meaningfully across them. This guide walks through the labeled anatomy, the rotation pattern that minimizes lipohypertrophy and bruising, the injection depth and angle, and the small technique details (skin pinch, needle size, post-injection pressure) that the FDA labels reference but that most prescribers never explain.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 11,
    citations: 6,
    tags: ["Injection technique", "Patient guide", "FDA label sourced"],
  },
  {
    slug: "how-long-does-glp1-take-to-work",
    title:
      "How Long Does Semaglutide and Tirzepatide Take to Work? The Trial Data on Onset, Appetite, and Weight Loss Timing",
    description:
      "When does appetite suppression actually start on a GLP-1? When do patients first see the scale move? When does steady state hit? We answer every onset and time-to-effect question using the published STEP-1, SURMOUNT-1, and FDA prescribing information data, with the actual trial timing curves quoted by week.",
    excerpt:
      "The most common patient question after starting a GLP-1 is some variant of 'how long until this starts working?' The answer comes from three different timescales that the trial data measures separately: the appetite-suppression onset (hours to days, driven by gastric emptying delay), the steady-state pharmacokinetics (4-5 weeks at each dose level), and the meaningful weight-loss curve (week 4 first measurable, week 16 ~5%, week 68 maintenance plateau). This article walks through all three using STEP-1 (Wilding NEJM 2021), SURMOUNT-1 (Jastreboff NEJM 2022), and the FDA prescribing information for each drug, so a patient can know what to expect at every milestone.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 12,
    citations: 6,
    tags: ["Onset", "Appetite", "STEP-1", "SURMOUNT-1"],
  },
  {
    slug: "glp1-storage-shelf-life-refrigeration-guide",
    title:
      "GLP-1 Storage Guide: Refrigeration, Room Temperature, Travel, and Expiration for Wegovy, Ozempic, Zepbound, and Mounjaro",
    description:
      "The complete FDA-label-cited storage and shelf-life reference for GLP-1 weight loss medications. How long Wegovy and Ozempic last in the fridge vs at room temperature, what to do if the pen sat in a hot car, how to travel with semaglutide, when to throw out an expired vial, and how compounded GLP-1 storage rules differ from brand-name pen rules.",
    excerpt:
      "GLP-1 storage rules are not common knowledge and the FDA labels are buried inside multi-page prescribing information PDFs. This reference walks through the actual approved storage rules for Wegovy, Ozempic, Zepbound, and Mounjaro pens (refrigerated and room-temperature limits, light exposure, freezing, expiration), what compounded vial pharmacies typically advise (which differs because BUDs work differently for compounded preparations), how to fly with a GLP-1, what to do if your medication was accidentally frozen or left at room temperature too long, and the patient-side practices that can extend or shorten effective shelf life.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 10,
    citations: 6,
    tags: ["Storage", "Shelf life", "Patient guide", "FDA label sourced"],
  },
  {
    slug: "glp1-pipeline-2026-survodutide-maridebart-ecnoglutide",
    title:
      "Beyond Wegovy and Zepbound: Three Pipeline GLP-1 Drugs That Could Reach Approval in 2026-2027",
    description:
      "Survodutide (Boehringer Ingelheim/Zealand), maridebart cafraglutide (MariTide, Amgen), and ecnoglutide (Sciwind/Pfizer) are the three most-watched GLP-1 pipeline drugs that aren't being made by Lilly or Novo. We walk through the verified phase 2 and phase 3 data on each, the mechanisms, and where they fit in the post-CagriSema, post-retatrutide landscape.",
    excerpt:
      "Lilly and Novo Nordisk dominate the public conversation about GLP-1 weight loss drugs because they make every drug currently on the US market. But the pipeline behind them includes three serious challengers from other companies. Survodutide (Boehringer Ingelheim/Zealand) is a glucagon + GLP-1 dual agonist with phase 2 data showing up to 19% weight loss and a phase 3 SYNCHRONIZE program enrolled. Maridebart cafraglutide (MariTide, Amgen) is a once-monthly GLP-1 agonist + GIP receptor antagonist that produced up to 16-20% weight loss in phase 2 (NEJM 2025). Ecnoglutide (Sciwind, licensed to Pfizer in China) is a biased GLP-1 agonist with a positive SLIMMER phase 3 readout (Lancet Diabetes Endocrinology 2025) and Chinese NMPA approval. Here's the verified evidence for each.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 11,
    citations: 6,
    tags: ["Pipeline", "Survodutide", "MariTide"],
  },
  {
    slug: "pcab-accreditation-compounding-pharmacy-investigation",
    title:
      "PCAB Accreditation: What It Actually Means When a Compounding Pharmacy Has It (and Doesn't)",
    description:
      "PCAB (Pharmacy Compounding Accreditation Board) accreditation is the most-cited quality marker in the compounded GLP-1 industry, but very few patients understand what it actually verifies — or that the majority of US 503A compounding pharmacies don't have it. We explain what PCAB accreditation does and doesn't guarantee, what USP 797/795 compliance means in practice, and how to ask a telehealth provider the right questions about their fulfillment pharmacy.",
    excerpt:
      "Compounded GLP-1 telehealth providers love to advertise that their fulfillment pharmacy has PCAB accreditation. But what does PCAB accreditation actually verify? What does it not verify? And how many of the 7,500+ compounding pharmacies in the US actually have it? This investigation walks through the PCAB program in plain language, explains the difference between PCAB, NABP, ACHC, FDA 503B registration, and state board licensure, and gives patients the specific questions to ask any compounded GLP-1 provider before they place a first order.",
    kind: "data-investigation",
    publishedDate: "2026-04-06",
    readMinutes: 10,
    citations: 5,
    tags: ["Compounding", "PCAB", "Pharmacy quality"],
  },
  {
    slug: "foundayo-orforglipron-fda-approval-2026",
    title:
      "Foundayo (orforglipron) Approved: The First Once-Daily Oral GLP-1 Pill for Weight Loss",
    description:
      "Eli Lilly's Foundayo (orforglipron) was approved by the FDA on April 1, 2026, becoming the first once-daily small-molecule oral GLP-1 receptor agonist approved for chronic weight management. We walk through the ATTAIN-1 trial data, the dosing, the $25-$149/month pricing, and how the oral pill compares to injectable semaglutide and tirzepatide.",
    excerpt:
      "On April 1, 2026, the FDA approved Foundayo (orforglipron), Eli Lilly's once-daily oral GLP-1 pill for chronic weight management — the first non-peptide small-molecule GLP-1 receptor agonist ever approved for obesity. The FDA-approved 17.2 mg labeled maintenance dose produced approximately 11.1% mean weight loss (about 24.9 lbs) in adults without type 2 diabetes at 72 weeks per the prescribing information; the supra-labeled 36 mg arm in the ATTAIN-1 phase 3 trial (Wharton et al. NEJM 2025, PMID 40960239) reached 12.4% on the efficacy estimand and 11.2% on the treatment-regimen estimand. Lilly is launching at $25/month with commercial coverage and $149/month for self-pay through LillyDirect, making this the most accessible branded GLP-1 to date. Here's the verified trial data, dosing, safety profile, and how it compares to injectable Wegovy and Zepbound.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 12,
    citations: 5,
    tags: ["Orforglipron", "Foundayo", "FDA approval"],
  },
  {
    slug: "cagrisema-redefine-trial-results-2026",
    title:
      "CagriSema REDEFINE: What Novo Nordisk's Amylin Combination Actually Showed",
    description:
      "CagriSema (cagrilintide + semaglutide) is Novo Nordisk's next-generation amylin-GLP-1 combination injection. We walk through the REDEFINE 1 and REDEFINE 2 phase 3 trial results — 22.7% adherent weight loss in non-diabetic patients, 15.7% in patients with type 2 diabetes — and explain why the result missed the 25% target Novo had guided to but still beat semaglutide alone.",
    excerpt:
      "CagriSema is Novo Nordisk's combination of cagrilintide (an amylin analog) and semaglutide (a GLP-1 agonist) — designed to outperform semaglutide alone by adding a second appetite-suppression mechanism. The REDEFINE 1 trial in 3,400+ adults with overweight or obesity (no diabetes) reported 20.4% mean weight loss at 68 weeks — 22.7% on the adherent estimand — versus 14.9% with semaglutide alone, 11.5% with cagrilintide alone, and 3.0% with placebo. REDEFINE 2 in patients with type 2 diabetes showed 13.7% vs 3.4% placebo. The results missed the 25% benchmark Novo had guided investors toward, but still represent the largest weight loss ever shown for an injectable combination of approved or near-approved drugs. Novo has filed an NDA. Here's the verified trial data and what it means for patients.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 13,
    citations: 6,
    tags: ["CagriSema", "Cagrilintide", "Pipeline"],
  },
  {
    slug: "retatrutide-triple-agonist-evidence-2026",
    title:
      "Retatrutide: What We Know About Lilly's Triple Agonist as TRIUMPH-4 Reads Out",
    description:
      "Retatrutide is Eli Lilly's investigational triple agonist targeting GLP-1, GIP, and glucagon receptors. The first phase 3 readout (TRIUMPH-4) reported 28.7% mean weight loss at the highest dose in adults with obesity and knee osteoarthritis. We walk through the published phase 2 data, the TRIUMPH-4 results, the open trials, and the new safety signal that emerged in the phase 3 program.",
    excerpt:
      "Retatrutide (LY3437943) is Eli Lilly's investigational triple agonist — it activates GLP-1, GIP, and glucagon receptors simultaneously. The phase 2 trial published in NEJM 2023 (Jastreboff et al.) showed up to 24.2% body weight reduction at 48 weeks at the highest dose, the largest weight loss any pharmacological obesity therapy had ever produced in a controlled trial. The first phase 3 readout, TRIUMPH-4 (n=445, knee osteoarthritis + obesity, December 2025), confirmed and extended that signal: 28.7% mean weight loss (about 71 pounds) and 75.8% reduction in OA pain at the highest dose. Seven additional TRIUMPH phase 3 readouts are expected throughout 2026. Here's the verified trial data, the proposed mechanism, and the new safety signal flagged in the TRIUMPH program.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 13,
    citations: 6,
    tags: ["Retatrutide", "Pipeline", "Triple agonist"],
  },
  {
    slug: "step-hfpef-semaglutide-heart-failure",
    title:
      "STEP-HFpEF: How Semaglutide Treats Heart Failure With Preserved Ejection Fraction",
    description:
      "The STEP-HFpEF trial family (Kosiborod et al., NEJM 2023 and 2024) randomized 1,145 patients with heart failure with preserved ejection fraction and obesity to semaglutide 2.4 mg or placebo. The KCCQ symptom score improved 7-8 points more than placebo, body weight dropped 6-11 percentage points more, and the 6-minute walk distance improved 17 meters. Here's the verified trial data and where semaglutide fits alongside the SGLT2 inhibitors in HFpEF care.",
    excerpt:
      "Heart failure with preserved ejection fraction (HFpEF) is one of the hardest cardiovascular phenotypes to treat. For decades there were no disease-modifying therapies. The SGLT2 inhibitors changed that with EMPEROR-Preserved (2021) and DELIVER (2022). Then Kosiborod et al. published STEP-HFpEF in NEJM in 2023 and STEP-HFpEF DM in 2024, demonstrating that semaglutide 2.4 mg in patients with HFpEF and obesity improved both heart failure symptoms (KCCQ-CSS) and functional capacity (6-minute walk distance) on top of weight loss. The pooled analysis (Lancet 2024) confirmed the benefit. Here's the verified trial data, how it compares to the SGLT2 inhibitor evidence, and what it means for the obesity-HFpEF phenotype.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 14,
    citations: 8,
    tags: ["Semaglutide", "Heart failure", "PubMed sourced"],
  },
  {
    slug: "flow-trial-semaglutide-kidney-disease",
    title:
      "FLOW: How Semaglutide Became the First GLP-1 Approved for Diabetic Kidney Disease",
    description:
      "The FLOW trial (Perkovic et al., NEJM 2024) randomized 3,533 patients with type 2 diabetes and chronic kidney disease to weekly semaglutide 1.0 mg or placebo and was stopped early for benefit. We walk through the trial design, the 24% reduction in major kidney events, the FDA approval, and how the kidney protection compares to the SGLT2 inhibitor trials.",
    excerpt:
      "FLOW is the trial that earned semaglutide an FDA-approved kidney indication in January 2025 — the first ever for a GLP-1 receptor agonist. 3,533 patients with type 2 diabetes plus chronic kidney disease randomized to semaglutide 1.0 mg or placebo, stopped early after 3.4 years of follow-up because the kidney benefit had crossed the prespecified efficacy boundary. The composite kidney endpoint dropped 24% (HR 0.76, 95% CI 0.66-0.88), all-cause mortality dropped 20%, and the eGFR slope difference was 1.16 mL/min/1.73m² per year. Here's the verified trial data and how it compares to the SGLT2 inhibitor kidney trials.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 13,
    citations: 8,
    tags: ["Semaglutide", "Kidney disease", "PubMed sourced"],
  },
  {
    slug: "glp1-alcohol-use-disorder-evidence-2026",
    title:
      "GLP-1 Drugs and Alcohol Use Disorder: What the Trial Evidence Actually Shows in 2026",
    description:
      "TikTok and the lay press have run far ahead of the trial evidence on semaglutide for alcohol cravings. We walk through the actual literature — exactly one completed Phase 2 RCT (Hendershot 2025, n=48), one ongoing Phase 2 protocol, the preclinical animal evidence, the mesolimbic dopamine mechanism, and the head-to-head against the three FDA-approved AUD medications (naltrexone, acamprosate, disulfiram).",
    excerpt:
      "Patient-reported and case-series accounts of semaglutide reducing alcohol cravings have made the rounds on TikTok and in the lay press for two years. The trial-level evidence is much narrower than the social-media coverage suggests. Exactly one completed Phase 2 randomized trial of semaglutide for alcohol use disorder has been published as of 2026 (Hendershot et al., JAMA Psychiatry, n=48). One additional Phase 2 trial (SEMALCO) is in progress. The preclinical animal-model evidence is real and points at a specific mesolimbic dopamine mechanism. But this is not yet an FDA-approved indication, the safety profile in patients with active heavy alcohol use is unstudied, and the standard of care remains naltrexone, acamprosate, and disulfiram. Here's the honest evidence map.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 13,
    citations: 8,
    tags: ["Semaglutide", "Alcohol use disorder", "PubMed sourced"],
  },
  {
    slug: "semaglutide-para-que-sirve",
    title: "Semaglutida: para qué sirve, cómo funciona y qué dicen los estudios clínicos",
    description:
      "Guía en español sobre la semaglutida (Wegovy, Ozempic): para qué sirve, cómo actúa como agonista del receptor de GLP-1, qué pérdida de peso mostró el estudio STEP 1, reacciones adversas, contraindicaciones y costo en Estados Unidos.",
    excerpt:
      "La semaglutida es un agonista del receptor de GLP-1 aprobado por la FDA para la diabetes tipo 2 (Ozempic) y el manejo crónico del peso (Wegovy). En el estudio STEP 1 (Wilding, NEJM 2021, n=1,961), los adultos con sobrepeso u obesidad sin diabetes perdieron en promedio 14.9% del peso corporal en 68 semanas con una inyección subcutánea semanal de 2.4 mg. Esta guía en español explica cómo funciona, para qué sirve, las reacciones adversas más frecuentes, quién no debe usarla y qué costos esperar en Estados Unidos.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 12,
    citations: 8,
    tags: ["Semaglutida", "Español", "PubMed sourced"],
  },
  {
    slug: "tirzepatide-para-que-sirve",
    title: "Tirzepatida: para qué sirve, cómo funciona y qué dicen los estudios clínicos",
    description:
      "Guía en español sobre la tirzepatida (Zepbound, Mounjaro): para qué sirve, cómo actúa como agonista dual de los receptores de GIP y GLP-1, qué pérdida de peso mostró el estudio SURMOUNT-1, reacciones adversas, contraindicaciones y costo en Estados Unidos.",
    excerpt:
      "La tirzepatida es un agonista dual de los receptores de GIP y GLP-1 aprobado por la FDA para la diabetes tipo 2 (Mounjaro) y el manejo crónico del peso (Zepbound). En el estudio SURMOUNT-1 (Jastreboff, NEJM 2022, n=2,539), los adultos con sobrepeso u obesidad sin diabetes perdieron en promedio 20.9% del peso corporal en 72 semanas con la dosis de 15 mg en inyección subcutánea semanal. Esta guía en español explica cómo funciona, para qué sirve, las reacciones adversas más frecuentes, quién no debe usarla y qué costos esperar en Estados Unidos.",
    kind: "scientific-deep-dive",
    publishedDate: "2026-04-06",
    readMinutes: 12,
    citations: 8,
    tags: ["Tirzepatida", "Español", "PubMed sourced"],
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
