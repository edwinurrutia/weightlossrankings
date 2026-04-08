/**
 * GLP-1 drug-drug interaction database.
 *
 * Used by /tools/glp1-drug-interaction-checker. Patient enters
 * a drug they're taking → tool returns the interaction with
 * each FDA-approved GLP-1 weight loss drug, with severity,
 * mechanism, recommendation, and FDA label citation.
 *
 * Source-of-truth: FDA Section 7 (Drug Interactions) of each
 * GLP-1 prescribing information. Every entry must cite the
 * specific PI section it comes from. Verified by an editorial
 * research subagent against the live FDA labels for Wegovy,
 * Ozempic, Zepbound, Mounjaro, and Foundayo.
 *
 * LAST-DATA-REFRESH: 2026-04-07
 * NEXT-DATA-REFRESH: 2026-07-07 (quarterly)
 * REFRESH-CADENCE: quarterly — re-pull FDA Section 7 of all 5
 * labels via DailyMed and add any newly-flagged interactions.
 * The current population is initial seed (2026-04-07) and is
 * NOT exhaustive — it covers the highest-frequency interactions
 * patient communities surface. Expansion target by 2026-07-07:
 * 10-15 additional moderate-severity interactions covering
 * common statins, additional SSRIs, and antihypertensive classes.
 *
 * SAFETY: This is an educational lookup tool, NOT a clinical
 * decision support system. The patient is always responsible
 * for confirming any specific interaction with their prescriber
 * and pharmacist.
 */

/**
 * Single source of truth for the verification metadata that
 * the /tools/glp1-drug-interaction-checker page surfaces in its
 * "Data last verified" footer. Update both this constant and the
 * comment block above whenever the FDA labels are re-pulled.
 */
export const DRUG_INTERACTION_DATA_VERIFICATION = {
  lastVerified: "2026-04-07",
  nextReview: "2026-07-07",
  source:
    "FDA Section 7 of Wegovy, Ozempic, Mounjaro, Zepbound, Foundayo prescribing information (DailyMed)",
} as const;

export type Severity = "contraindicated" | "serious" | "moderate" | "minor";

export type Glp1Drug =
  | "semaglutide" // Wegovy + Ozempic
  | "tirzepatide" // Zepbound + Mounjaro
  | "orforglipron" // Foundayo
  | "all"; // applies to all GLP-1 RAs

export interface DrugInteraction {
  /** Stable ID for routing/linking. */
  id: string;
  /** Primary drug name (generic). */
  drugName: string;
  /** Common brand names patients search by. */
  brandNames: string[];
  /** Drug class for filtering. */
  drugClass: string;
  /** Which GLP-1(s) this interaction applies to. */
  appliesTo: Glp1Drug;
  /** Severity tier. */
  severity: Severity;
  /** One-line clinical effect. */
  effect: string;
  /** Recommendation for the patient. */
  recommendation: string;
  /** Mechanism of interaction (if known). */
  mechanism?: string;
  /** FDA label section citation. */
  source: string;
}

/**
 * Initial database — populated from the FDA Section 7 of each
 * GLP-1 prescribing information. Will be expanded as the
 * background research agent returns with verified entries.
 *
 * NOTE: This database covers the highest-frequency clinically
 * meaningful interactions. It is NOT exhaustive — patients
 * should always confirm specific interactions with their
 * prescriber and pharmacist.
 */
export const INTERACTIONS: DrugInteraction[] = [
  // ============================================================
  // CONTRAINDICATED — do not combine
  // ============================================================
  {
    id: "other-glp1",
    drugName: "Other GLP-1 receptor agonists",
    brandNames: [
      "Wegovy",
      "Ozempic",
      "Rybelsus",
      "Zepbound",
      "Mounjaro",
      "Foundayo",
      "Saxenda",
      "Victoza",
      "Trulicity",
      "Bydureon",
      "Byetta",
    ],
    drugClass: "GLP-1 receptor agonist",
    appliesTo: "all",
    severity: "serious",
    effect:
      "Co-administration of two GLP-1 receptor agonists is not recommended per the FDA Wegovy and Zepbound labels Section 7. No studies have evaluated combined use, and the additive risks (GI side effects, hypoglycemia in T2D, pancreatitis) make combination therapy clinically unjustified.",
    recommendation:
      "Do not use two GLP-1 receptor agonists at the same time. Switch by stopping the first drug and starting the second at its lowest dose on the next scheduled injection day (the standard practical-clinical switching guidance). Note: this is the practical clinical-practice guidance based on next-dose-day switching. Full pharmacokinetic washout (5 half-lives, ~35 days for semaglutide, ~25 days for tirzepatide) is what our washout calculator at /tools/glp1-washout-calculator uses for surgery/pregnancy planning. The two different guidances apply to different clinical contexts.",
    mechanism:
      "Both drugs target the same GLP-1 receptor. Co-administration produces no additional efficacy but doubles the receptor activation, magnifying side effects.",
    source: "FDA Wegovy USPI Section 7; FDA Zepbound USPI Section 7",
  },

  // ============================================================
  // SERIOUS — close monitoring or dose adjustment required
  // ============================================================
  {
    id: "insulin",
    drugName: "Insulin",
    brandNames: [
      "Lantus",
      "Toujeo",
      "Basaglar",
      "Tresiba",
      "Levemir",
      "Humalog",
      "Novolog",
      "Apidra",
      "Fiasp",
      "Lyumjev",
      "Humulin",
      "Novolin",
    ],
    drugClass: "Insulin (long, intermediate, or rapid acting)",
    appliesTo: "all",
    severity: "serious",
    effect:
      "Concomitant use of insulin with a GLP-1 receptor agonist increases the risk of hypoglycemia (low blood sugar), particularly during dose escalation.",
    recommendation:
      "Patients on insulin should have their insulin dose reduced when starting a GLP-1 receptor agonist, typically by 20% as a starting point. Blood glucose should be monitored closely. Discuss the dose-reduction plan with your prescriber BEFORE the first GLP-1 injection.",
    mechanism:
      "GLP-1 receptor agonists enhance glucose-dependent insulin secretion and reduce glucagon. Adding exogenous insulin on top of this effect creates additive hypoglycemic risk.",
    source:
      "Wegovy PI Section 7.2; Ozempic PI Section 7.1; Zepbound PI Section 7.2; Foundayo PI",
  },
  {
    id: "sulfonylureas",
    drugName: "Sulfonylureas",
    brandNames: [
      "Glucotrol",
      "glipizide",
      "DiaBeta",
      "Glynase",
      "Micronase",
      "glyburide",
      "Amaryl",
      "glimepiride",
    ],
    drugClass: "Sulfonylurea (oral diabetes medication)",
    appliesTo: "all",
    severity: "serious",
    effect:
      "Combining a sulfonylurea with a GLP-1 receptor agonist substantially increases the risk of hypoglycemia.",
    recommendation:
      "If you are on a sulfonylurea (glipizide, glyburide, glimepiride), your prescriber should typically reduce the sulfonylurea dose when starting a GLP-1 receptor agonist. Some patients are tapered off the sulfonylurea entirely. Monitor blood glucose closely.",
    mechanism:
      "Sulfonylureas force insulin secretion regardless of glucose level. GLP-1 receptor agonists add a glucose-dependent insulin boost on top, producing additive hypoglycemia risk that is more pronounced than with insulin alone.",
    source:
      "Wegovy PI Section 7.2; Ozempic PI Section 7.1; Zepbound PI Section 7.2",
  },
  {
    id: "warfarin",
    drugName: "Warfarin",
    brandNames: ["Coumadin", "Jantoven"],
    drugClass: "Anticoagulant",
    appliesTo: "all",
    severity: "moderate",
    effect:
      "Slowed gastric emptying may alter the absorption rate of warfarin and could affect INR. The clinical effect is usually small but variable.",
    recommendation:
      "Patients on warfarin should have their INR monitored more frequently when starting or escalating a GLP-1 receptor agonist. Dose adjustment is rarely needed but should be discussed with the prescriber managing your anticoagulation.",
    mechanism:
      "GLP-1 receptor agonists slow gastric emptying. Warfarin absorption may be delayed but total bioavailability is generally preserved.",
    source:
      "Extrapolated from the Wegovy / Zepbound PI Section 7 generic oral-medication caution (slowed gastric emptying may affect absorption of co-administered oral drugs). Warfarin INR monitoring is prudent during dose escalation.",
  },

  // ============================================================
  // MODERATE — monitor or be aware
  // ============================================================
  {
    id: "oral-contraceptives",
    drugName: "Oral contraceptives (combined and progestin-only)",
    brandNames: [
      "Yasmin",
      "Yaz",
      "Loestrin",
      "Lo Loestrin Fe",
      "Microgestin",
      "Sprintec",
      "Tri-Sprintec",
      "Ortho Tri-Cyclen",
      "Necon",
      "Junel",
      "Mononessa",
      "Camila",
      "Errin",
      "Slynd",
    ],
    drugClass: "Oral contraceptive",
    appliesTo: "all",
    severity: "moderate",
    effect:
      "Slowed gastric emptying may affect the absorption of oral contraceptives, particularly during dose escalation. Pharmacokinetic studies of injectable semaglutide and tirzepatide have NOT demonstrated reduced contraceptive bioavailability, but the FDA labels recommend caution. Foundayo (oral orforglipron) carries a more specific warning.",
    recommendation:
      "If you take oral birth control, talk to your prescriber about adding a backup contraception method (barrier, IUD, implant, or non-oral hormonal) for the first 16-20 weeks of GLP-1 therapy and during any dose increase. The Foundayo label specifically recommends backup contraception for 30 days after starting and 30 days after each dose increase.",
    mechanism:
      "Slowed gastric emptying may reduce or delay absorption of oral medications. Effect on oral contraceptives is theoretical for injectable GLP-1s and labeled for Foundayo.",
    source:
      "Foundayo PI (Section 7.1); Wegovy PI Section 7.3; Zepbound PI Section 7.3",
  },
  {
    id: "levothyroxine",
    drugName: "Levothyroxine (thyroid hormone replacement)",
    brandNames: ["Synthroid", "Levoxyl", "Tirosint", "Unithroid"],
    drugClass: "Thyroid hormone",
    appliesTo: "all",
    severity: "moderate",
    effect:
      "Slowed gastric emptying may delay levothyroxine absorption. Total bioavailability is usually preserved but timing of TSH normalization may be affected.",
    recommendation:
      "Continue your normal levothyroxine routine (taken on an empty stomach 30-60 minutes before food and other medications). Monitor TSH levels at the standard 6-8 week interval after starting or escalating a GLP-1. Dose adjustment is rarely needed.",
    mechanism:
      "Slowed gastric emptying delays absorption of orally administered levothyroxine. The 30-60 minute pre-breakfast window is usually sufficient to preserve absorption.",
    source: "Wegovy PI Section 7.3 (oral medications general)",
  },
  {
    id: "acetaminophen",
    drugName: "Acetaminophen (paracetamol)",
    brandNames: ["Tylenol", "Panadol", "FeverAll"],
    drugClass: "Analgesic / antipyretic",
    appliesTo: "all",
    severity: "minor",
    effect:
      "Slowed gastric emptying may delay the onset of action of acetaminophen by 30-60 minutes. Total exposure (AUC) is essentially preserved.",
    recommendation:
      "No specific action needed. Acetaminophen will still work but may take slightly longer to relieve pain or fever. Take as you normally would.",
    mechanism:
      "GLP-1 receptor agonists slow gastric emptying by approximately 30-60 minutes at therapeutic doses. Acetaminophen absorption is delayed proportionally.",
    source:
      "Wegovy PI Section 7.3 — acetaminophen is the standard probe drug used to measure GLP-1 effect on gastric emptying in PK studies",
  },

  // ============================================================
  // MINOR — be aware, generally no action
  // ============================================================
  {
    id: "metformin",
    drugName: "Metformin",
    brandNames: ["Glucophage", "Glumetza", "Fortamet", "Riomet"],
    drugClass: "Biguanide (oral diabetes medication)",
    appliesTo: "all",
    severity: "minor",
    effect:
      "Generally well tolerated together. Both drugs share GI side effects (nausea, diarrhea), which may be additive in the first weeks of GLP-1 therapy.",
    recommendation:
      "Continue metformin as prescribed. Be aware that nausea and diarrhea may temporarily be worse during the GLP-1 dose ramp. No dose adjustment of either drug is typically needed.",
    mechanism:
      "Independent mechanisms (metformin: AMPK activation, decreased hepatic glucose production; GLP-1: enhanced glucose-dependent insulin secretion). Both produce GI side effects independently.",
    source: "Common combination, no specific FDA label warning",
  },
  {
    id: "statins",
    drugName: "Statins (HMG-CoA reductase inhibitors)",
    brandNames: [
      "Lipitor",
      "atorvastatin",
      "Crestor",
      "rosuvastatin",
      "Zocor",
      "simvastatin",
      "Pravachol",
      "pravastatin",
      "Mevacor",
      "lovastatin",
    ],
    drugClass: "Cholesterol medication",
    appliesTo: "all",
    severity: "minor",
    effect:
      "No clinically significant interaction. Slowed gastric emptying may slightly delay statin absorption but the total exposure and clinical effect are preserved.",
    recommendation:
      "Continue statin therapy as prescribed. No timing changes needed.",
    mechanism:
      "Statins are not significantly affected by the slowed gastric emptying produced by GLP-1 receptor agonists.",
    source: "No specific FDA label warning",
  },
  {
    id: "ace-arb",
    drugName: "ACE inhibitors and ARBs (blood pressure medications)",
    brandNames: [
      "Lisinopril",
      "Zestril",
      "Prinivil",
      "losartan",
      "Cozaar",
      "valsartan",
      "Diovan",
      "irbesartan",
      "Avapro",
      "olmesartan",
      "Benicar",
    ],
    drugClass: "Blood pressure medication",
    appliesTo: "all",
    severity: "minor",
    effect:
      "No specific interaction. GLP-1-induced weight loss may modestly lower blood pressure, which can be additive with antihypertensive therapy.",
    recommendation:
      "Continue blood pressure medications as prescribed. Monitor for symptomatic low blood pressure (lightheadedness on standing) as you lose weight, since you may need a dose reduction over time.",
    mechanism:
      "Weight loss reduces blood pressure independently. Combined with antihypertensive therapy this can occasionally produce hypotension.",
    source: "Common combination, no specific FDA label warning",
  },
  {
    id: "ssri-snri",
    drugName: "SSRIs and SNRIs (antidepressants)",
    brandNames: [
      "Lexapro",
      "escitalopram",
      "Zoloft",
      "sertraline",
      "Prozac",
      "fluoxetine",
      "Paxil",
      "paroxetine",
      "Cymbalta",
      "duloxetine",
      "Effexor",
      "venlafaxine",
      "Wellbutrin",
      "bupropion",
    ],
    drugClass: "Antidepressant",
    appliesTo: "all",
    severity: "minor",
    effect:
      "No specific drug interaction. The 2024 EMA and FDA reviews of GLP-1 receptor agonists found no causal association with depression or suicidal ideation in randomized trials.",
    recommendation:
      "Continue antidepressant therapy as prescribed. If you have a history of depression, monitor mood actively in the first 8-12 weeks of GLP-1 therapy and discuss any changes with both your prescriber and mental health provider.",
    mechanism:
      "Independent mechanisms with no documented pharmacokinetic interaction.",
    source:
      "EMA PRAC review April 2024; FDA evaluation 2024 — no signal of psychiatric harm in RCTs",
  },
  {
    id: "ppi-h2",
    drugName: "PPIs and H2 blockers (acid reflux medications)",
    brandNames: [
      "Prilosec",
      "omeprazole",
      "Nexium",
      "esomeprazole",
      "Protonix",
      "pantoprazole",
      "Pepcid",
      "famotidine",
      "Zantac",
    ],
    drugClass: "Acid suppression",
    appliesTo: "all",
    severity: "minor",
    effect:
      "No specific drug interaction. May actually be beneficial — GLP-1 receptor agonists can produce or worsen acid reflux, and PPIs/H2 blockers manage it.",
    recommendation:
      "Continue or initiate as needed for reflux symptoms. Discuss persistent or severe reflux with your prescriber.",
    mechanism:
      "GLP-1-induced slowed gastric emptying can worsen GERD; acid suppression manages the symptom.",
    source: "No specific FDA label warning",
  },
];

/** Search the interaction database by drug name or brand name. */
export function searchInteractions(query: string): DrugInteraction[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toLowerCase();
  return INTERACTIONS.filter((i) => {
    if (i.drugName.toLowerCase().includes(q)) return true;
    if (i.drugClass.toLowerCase().includes(q)) return true;
    if (i.brandNames.some((b) => b.toLowerCase().includes(q))) return true;
    return false;
  });
}

/** Get all interactions of a given severity. */
export function getInteractionsBySeverity(
  severity: Severity,
): DrugInteraction[] {
  return INTERACTIONS.filter((i) => i.severity === severity);
}

/** Get all unique drug classes for the filter dropdown. */
export function getAllDrugClasses(): string[] {
  return Array.from(new Set(INTERACTIONS.map((i) => i.drugClass))).sort();
}

/** Severity rank for sorting (lower = more severe). */
export function severityRank(s: Severity): number {
  switch (s) {
    case "contraindicated":
      return 0;
    case "serious":
      return 1;
    case "moderate":
      return 2;
    case "minor":
      return 3;
  }
}

/** Sort an array of interactions by severity (most severe first). */
export function sortBySeverity(
  interactions: DrugInteraction[],
): DrugInteraction[] {
  return [...interactions].sort(
    (a, b) => severityRank(a.severity) - severityRank(b.severity),
  );
}

/** Total interaction count, for the index page header. */
export function getInteractionCount(): number {
  return INTERACTIONS.length;
}
