/**
 * Canonical clinical trial data for GLP-1 weight management trials.
 *
 * SINGLE SOURCE OF TRUTH. All articles should import from this file
 * rather than hand-typing numbers, to prevent drift across the site.
 *
 * Every numeric value is annotated inline with its primary source:
 *   - FDA prescribing information (USPI) section, or
 *   - PubMed PMID of the pivotal peer-reviewed paper.
 *
 * Do NOT edit a value here without verifying against the source and
 * updating every article that cites it.
 */

// =============================================================================
// Interfaces
// =============================================================================

export interface TrialCitation {
  authors: string;
  title: string;
  journal: string;
  year: number;
  volume?: string;
  pages?: string;
  pmid: string;
  doi?: string;
}

export interface TrialAEs {
  /** Nausea incidence percentage */
  nausea?: number;
  /** Vomiting incidence percentage */
  vomiting?: number;
  /** Diarrhea incidence percentage */
  diarrhea?: number;
  /** Constipation incidence percentage */
  constipation?: number;
  /** Abdominal pain incidence percentage */
  abdominalPain?: number;
  /** Treatment discontinuation due to AE percentage */
  discontinuationDueToAE?: number;
}

export interface ClinicalTrial {
  /** Stable id used to import the trial */
  id: string;
  /** Trial acronym e.g. "STEP-1", "SURMOUNT-1" */
  name: string;
  /** Drug being tested in this arm of the trial */
  drug: string;
  /** Drug dose at the labeled maintenance dose */
  dose: string;
  /** Trial duration in weeks */
  durationWeeks: number;
  /** N total enrolled */
  n: number;
  /** N in the active drug arm */
  nActive: number;
  /** N in placebo arm */
  nPlacebo: number;
  /** Mean weight loss percentage — TREATMENT-REGIMEN estimand (primary, ITT-style) */
  weightLossPctTreatmentRegimen: number;
  /** Mean weight loss percentage — EFFICACY estimand (on-treatment, adherent) — only if reported */
  weightLossPctEfficacy?: number;
  /** Placebo weight change percentage (treatment-regimen). Negative = placebo lost weight. */
  placeboWeightLossPct: number;
  /** Pivotal paper citation */
  citation: TrialCitation;
  /** Detailed adverse event rates (active drug arm) */
  adverseEvents: TrialAEs;
  /** Detailed adverse event rates (placebo arm) */
  placeboAdverseEvents: TrialAEs;
  /** FDA label section in the prescribing information that documents these */
  fdaLabelSection: string;
  /** Optional free-form notes that don't fit the structured fields */
  notes?: string;
}

// =============================================================================
// Trials
// =============================================================================

/**
 * STEP-1 — Once-Weekly Semaglutide in Adults With Overweight or Obesity.
 * Pivotal phase 3 trial supporting Wegovy approval in adults without T2D.
 */
export const STEP_1: ClinicalTrial = {
  id: "step-1",
  name: "STEP-1",
  drug: "semaglutide",
  dose: "2.4 mg subcutaneous weekly",
  durationWeeks: 68, // PMID 33567185 (NEJM 2021;384:989-1002)
  n: 1961, // PMID 33567185
  nActive: 1306, // PMID 33567185 — 2:1 randomization
  nPlacebo: 655, // PMID 33567185
  weightLossPctTreatmentRegimen: -14.9, // PMID 33567185 — treatment-regimen estimand, active arm
  weightLossPctEfficacy: -16.9, // PMID 33567185 — efficacy estimand (on-treatment)
  placeboWeightLossPct: -2.4, // PMID 33567185 — placebo arm treatment-regimen estimand
  citation: {
    authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
    title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
    journal: "New England Journal of Medicine",
    year: 2021,
    volume: "384",
    pages: "989-1002",
    pmid: "33567185",
    doi: "10.1056/NEJMoa2032183",
  },
  adverseEvents: {
    nausea: 44.2, // Wegovy USPI Section 6.1 Table 3
    vomiting: 24.8, // Wegovy USPI Section 6.1 Table 3
    diarrhea: 31.5, // Wegovy USPI Section 6.1 Table 3
    constipation: 23.4, // Wegovy USPI Section 6.1 Table 3
    abdominalPain: 20.4, // Wegovy USPI Section 6.1 Table 3
    discontinuationDueToAE: 4.5, // Wegovy USPI Section 6.1
  },
  placeboAdverseEvents: {
    nausea: 9.8, // Wegovy USPI Section 6.1 Table 3
    vomiting: 2.9, // Wegovy USPI Section 6.1 Table 3
    diarrhea: 11.8, // Wegovy USPI Section 6.1 Table 3
    constipation: 9.5, // Wegovy USPI Section 6.1 Table 3
    abdominalPain: 10.3, // Wegovy USPI Section 6.1 Table 3
    discontinuationDueToAE: 0.8, // Wegovy USPI Section 6.1
  },
  fdaLabelSection: "Wegovy USPI Section 6.1, Section 14.1",
};

/**
 * SURMOUNT-1 — Tirzepatide Once Weekly for the Treatment of Obesity.
 * Pivotal phase 3 trial supporting Zepbound approval in adults without T2D.
 * Three separate dose arms (5, 10, 15 mg) with distinct efficacy and AE rates.
 */
export const SURMOUNT_1_5MG: ClinicalTrial = {
  id: "surmount-1-5mg",
  name: "SURMOUNT-1 (5 mg)",
  drug: "tirzepatide",
  dose: "5 mg subcutaneous weekly",
  durationWeeks: 72, // PMID 35658024 (NEJM 2022;387:205-216)
  n: 2539, // PMID 35658024 — total across all four arms
  nActive: 630, // PMID 35658024 — tirzepatide 5 mg arm
  nPlacebo: 643, // PMID 35658024 — placebo arm (shared across dose comparisons)
  weightLossPctTreatmentRegimen: -15.0, // PMID 35658024 — treatment-regimen estimand
  weightLossPctEfficacy: -16.0, // PMID 35658024 — efficacy estimand
  placeboWeightLossPct: -3.1, // PMID 35658024 — placebo treatment-regimen
  citation: {
    authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
    title: "Tirzepatide Once Weekly for the Treatment of Obesity",
    journal: "New England Journal of Medicine",
    year: 2022,
    volume: "387",
    pages: "205-216",
    pmid: "35658024",
    doi: "10.1056/NEJMoa2206038",
  },
  adverseEvents: {
    nausea: 24.6, // Zepbound USPI Section 6.1 dose-stratified table (5 mg)
    vomiting: 8.3, // Zepbound USPI Section 6.1 (5 mg)
    diarrhea: 18.7, // Zepbound USPI Section 6.1 (5 mg)
    constipation: 16.4, // Zepbound USPI Section 6.1 (5 mg)
  },
  placeboAdverseEvents: {
    nausea: 9.5, // Zepbound USPI Section 6.1 — placebo column
    vomiting: 1.7, // Zepbound USPI Section 6.1 — placebo column
    diarrhea: 9.0, // Zepbound USPI Section 6.1 — placebo column
  },
  fdaLabelSection: "Zepbound USPI Section 6.1, Section 14.1",
};

export const SURMOUNT_1_10MG: ClinicalTrial = {
  id: "surmount-1-10mg",
  name: "SURMOUNT-1 (10 mg)",
  drug: "tirzepatide",
  dose: "10 mg subcutaneous weekly",
  durationWeeks: 72, // PMID 35658024
  n: 2539, // PMID 35658024
  nActive: 636, // PMID 35658024 — tirzepatide 10 mg arm
  nPlacebo: 643, // PMID 35658024
  weightLossPctTreatmentRegimen: -19.5, // PMID 35658024
  weightLossPctEfficacy: -21.4, // PMID 35658024
  placeboWeightLossPct: -3.1, // PMID 35658024
  citation: {
    authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
    title: "Tirzepatide Once Weekly for the Treatment of Obesity",
    journal: "New England Journal of Medicine",
    year: 2022,
    volume: "387",
    pages: "205-216",
    pmid: "35658024",
    doi: "10.1056/NEJMoa2206038",
  },
  adverseEvents: {
    nausea: 33.3, // Zepbound USPI Section 6.1 (10 mg)
    vomiting: 10.7, // Zepbound USPI Section 6.1 (10 mg)
    diarrhea: 21.2, // Zepbound USPI Section 6.1 (10 mg)
    constipation: 11.7, // Zepbound USPI Section 6.1 (10 mg)
  },
  placeboAdverseEvents: {
    nausea: 9.5, // Zepbound USPI Section 6.1
    vomiting: 1.7, // Zepbound USPI Section 6.1
    diarrhea: 9.0, // Zepbound USPI Section 6.1
  },
  fdaLabelSection: "Zepbound USPI Section 6.1, Section 14.1",
};

export const SURMOUNT_1_15MG: ClinicalTrial = {
  id: "surmount-1-15mg",
  name: "SURMOUNT-1 (15 mg)",
  drug: "tirzepatide",
  dose: "15 mg subcutaneous weekly",
  durationWeeks: 72, // PMID 35658024
  n: 2539, // PMID 35658024
  nActive: 630, // PMID 35658024 — tirzepatide 15 mg arm
  nPlacebo: 643, // PMID 35658024
  weightLossPctTreatmentRegimen: -20.9, // PMID 35658024
  weightLossPctEfficacy: -22.5, // PMID 35658024
  placeboWeightLossPct: -3.1, // PMID 35658024
  citation: {
    authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
    title: "Tirzepatide Once Weekly for the Treatment of Obesity",
    journal: "New England Journal of Medicine",
    year: 2022,
    volume: "387",
    pages: "205-216",
    pmid: "35658024",
    doi: "10.1056/NEJMoa2206038",
  },
  adverseEvents: {
    nausea: 29.0, // Zepbound USPI Section 6.1 (15 mg)
    vomiting: 12.2, // Zepbound USPI Section 6.1 (15 mg)
    diarrhea: 21.2, // Zepbound USPI Section 6.1 (15 mg)
    constipation: 11.1, // Zepbound USPI Section 6.1 (15 mg)
  },
  placeboAdverseEvents: {
    nausea: 9.5, // Zepbound USPI Section 6.1
    vomiting: 1.7, // Zepbound USPI Section 6.1
    diarrhea: 9.0, // Zepbound USPI Section 6.1
  },
  fdaLabelSection: "Zepbound USPI Section 6.1, Section 14.1",
};

/**
 * SELECT — Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes.
 * Long-term cardiovascular outcomes trial. Mean follow-up 39.8 months.
 * MACE HR 0.80 (95% CI 0.72-0.90, P<0.001).
 * CV death HR 0.85 (P=0.07); nonfatal MI HR 0.72; nonfatal stroke HR 0.93.
 */
export const SELECT: ClinicalTrial = {
  id: "select",
  name: "SELECT",
  drug: "semaglutide",
  dose: "2.4 mg subcutaneous weekly",
  durationWeeks: 173, // PMID 37952131 — mean follow-up 39.8 months ≈ 173 weeks
  n: 17604, // PMID 37952131 (NEJM 2023;389:2221-2232)
  nActive: 8803, // PMID 37952131
  nPlacebo: 8801, // PMID 37952131
  weightLossPctTreatmentRegimen: -9.4, // PMID 37952131 — long-term mean % change (173-week, NOT 68-week)
  placeboWeightLossPct: -0.9, // PMID 37952131 — placebo long-term weight change
  citation: {
    authors: "Lincoff AM, Brown-Frandsen K, Colhoun HM, et al.",
    title: "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes",
    journal: "New England Journal of Medicine",
    year: 2023,
    volume: "389",
    pages: "2221-2232",
    pmid: "37952131",
    doi: "10.1056/NEJMoa2307563",
  },
  adverseEvents: {
    discontinuationDueToAE: 16.6, // PMID 37952131 — supplementary table, any AE leading to discontinuation
  },
  placeboAdverseEvents: {
    discontinuationDueToAE: 8.2, // PMID 37952131
  },
  fdaLabelSection: "Wegovy USPI Section 14.2 (Cardiovascular Risk Reduction)",
  notes:
    "MACE HR 0.80 (95% CI 0.72-0.90, P<0.001). CV death HR 0.85 (P=0.07). Nonfatal MI HR 0.72. Nonfatal stroke HR 0.93. Mean follow-up 39.8 months.",
};

/**
 * SCALE — Liraglutide 3.0 mg in Weight Management.
 * Pivotal phase 3 trial supporting Saxenda approval.
 */
export const SCALE: ClinicalTrial = {
  id: "scale",
  name: "SCALE Obesity and Prediabetes",
  drug: "liraglutide",
  dose: "3.0 mg subcutaneous daily",
  durationWeeks: 56, // PMID 26132939 (NEJM 2015;373:11-22)
  n: 3731, // PMID 26132939
  nActive: 2487, // PMID 26132939 — 2:1 randomization
  nPlacebo: 1244, // PMID 26132939
  weightLossPctTreatmentRegimen: -8.0, // PMID 26132939 — mean % weight loss, liraglutide arm
  placeboWeightLossPct: -2.6, // PMID 26132939 — placebo arm
  citation: {
    authors: "Pi-Sunyer X, Astrup A, Fujioka K, et al.",
    title: "A Randomized, Controlled Trial of 3.0 mg of Liraglutide in Weight Management",
    journal: "New England Journal of Medicine",
    year: 2015,
    volume: "373",
    pages: "11-22",
    pmid: "26132939",
    doi: "10.1056/NEJMoa1411892",
  },
  adverseEvents: {
    nausea: 40.2, // Saxenda USPI Section 6.1 Table 3
    vomiting: 16.3, // Saxenda USPI Section 6.1 Table 3
    diarrhea: 20.9, // Saxenda USPI Section 6.1 Table 3
    constipation: 19.4, // Saxenda USPI Section 6.1 Table 3
    abdominalPain: 5.4, // Saxenda USPI Section 6.1 Table 3
    discontinuationDueToAE: 9.8, // Saxenda USPI Section 6.1
  },
  placeboAdverseEvents: {
    nausea: 14.7, // Saxenda USPI Section 6.1 Table 3
    vomiting: 4.1, // Saxenda USPI Section 6.1 Table 3
    diarrhea: 9.3, // Saxenda USPI Section 6.1 Table 3
    constipation: 8.5, // Saxenda USPI Section 6.1 Table 3
    abdominalPain: 3.1, // Saxenda USPI Section 6.1 Table 3
    discontinuationDueToAE: 4.3, // Saxenda USPI Section 6.1
  },
  fdaLabelSection: "Saxenda USPI Section 6.1, Section 14.1",
};

/**
 * ATTAIN-1 — Once-Daily Oral Orforglipron for Adults with Obesity.
 * Pivotal phase 3 supporting Foundayo (orforglipron) approval.
 * EXCLUDED patients with type 2 diabetes. See ATTAIN-2 / ACHIEVE program for T2D data.
 */
export const ATTAIN_1: ClinicalTrial = {
  id: "attain-1",
  name: "ATTAIN-1",
  drug: "orforglipron",
  dose: "36 mg oral daily", // Foundayo USPI Section 2 — top maintenance dose evaluated
  durationWeeks: 72, // PMID 40960239
  n: 3127, // PMID 40960239 — NEJM 2025 (not 3,500+)
  nActive: 2346, // PMID 40960239 — pooled 6/12/36 mg arms (3:1 randomization vs placebo)
  nPlacebo: 781, // PMID 40960239
  weightLossPctTreatmentRegimen: -11.1, // PMID 40960239 — treatment-policy (ITT), 36 mg pooled with regimen estimand
  weightLossPctEfficacy: -12.4, // PMID 40960239 — on-treatment efficacy estimand
  placeboWeightLossPct: -2.3, // PMID 40960239 — placebo treatment-policy
  citation: {
    authors: "Wharton S, et al.",
    title: "Once-Daily Oral Orforglipron for Adults with Obesity (ATTAIN-1)",
    journal: "New England Journal of Medicine",
    year: 2025,
    pmid: "40960239",
  },
  adverseEvents: {
    nausea: 33.7, // Foundayo USPI Section 6.1
    vomiting: 22.8, // Foundayo USPI Section 6.1
    diarrhea: 25.1, // Foundayo USPI Section 6.1
    constipation: 19.5, // Foundayo USPI Section 6.1
    discontinuationDueToAE: 10.2, // Foundayo USPI Section 6.1
  },
  placeboAdverseEvents: {
    nausea: 8.9, // Foundayo USPI Section 6.1
    vomiting: 2.6, // Foundayo USPI Section 6.1
    diarrhea: 10.8, // Foundayo USPI Section 6.1
    constipation: 5.3, // Foundayo USPI Section 6.1
    discontinuationDueToAE: 2.4, // Foundayo USPI Section 6.1
  },
  fdaLabelSection: "Foundayo USPI Section 6.1, Section 14.1",
  notes:
    "Conducted in 9 countries (NOT 10). Excluded patients with type 2 diabetes — do not cite for T2D efficacy. See ATTAIN-2 / ACHIEVE program for T2D data.",
};

/**
 * STEP-4 — Continued Semaglutide vs Switch to Placebo for Weight Maintenance.
 * Withdrawal trial: after 20-week run-in, participants randomized to continue sema vs switch to placebo.
 */
export const STEP_4: ClinicalTrial = {
  id: "step-4",
  name: "STEP-4",
  drug: "semaglutide",
  dose: "2.4 mg subcutaneous weekly",
  durationWeeks: 68, // PMID 33755728 — total trial; randomization at week 20
  n: 803, // PMID 33755728 — randomized at week 20
  nActive: 535, // PMID 33755728 — continued semaglutide arm
  nPlacebo: 268, // PMID 33755728 — switched to placebo arm
  weightLossPctTreatmentRegimen: -7.9, // PMID 33755728 — additional weight loss from week 20 to 68 on continued sema
  placeboWeightLossPct: 6.9, // PMID 33755728 — weight REGAIN from week 20 to 68 after switching to placebo
  citation: {
    authors: "Rubino D, Abrahamsson N, Davies M, et al.",
    title:
      "Effect of Continued Weekly Subcutaneous Semaglutide vs Placebo on Weight Loss Maintenance in Adults with Overweight or Obesity: The STEP 4 Randomized Clinical Trial",
    journal: "JAMA",
    year: 2021,
    volume: "325(14)",
    pages: "1414-1425",
    pmid: "33755728",
    doi: "10.1001/jama.2021.3224",
  },
  adverseEvents: {
    nausea: 24.8, // PMID 33755728 — continued sema arm (weeks 20-68)
    vomiting: 10.1, // PMID 33755728
    diarrhea: 17.1, // PMID 33755728
    constipation: 13.8, // PMID 33755728
  },
  placeboAdverseEvents: {
    nausea: 9.4, // PMID 33755728 — switched to placebo arm
    vomiting: 2.2, // PMID 33755728
    diarrhea: 7.5, // PMID 33755728
    constipation: 5.2, // PMID 33755728
  },
  fdaLabelSection: "Wegovy USPI Section 14.1 (maintenance evidence)",
};

/**
 * SURMOUNT-4 — Continued Tirzepatide for Weight Maintenance.
 * Withdrawal trial: 36-week lead-in on tirzepatide, then randomized to continue vs switch to placebo for 52 weeks.
 */
export const SURMOUNT_4: ClinicalTrial = {
  id: "surmount-4",
  name: "SURMOUNT-4",
  drug: "tirzepatide",
  dose: "10 or 15 mg subcutaneous weekly (maximum tolerated)",
  durationWeeks: 88, // PMID 38078870 — 36-week lead-in + 52-week randomized withdrawal
  n: 670, // PMID 38078870 — randomized at week 36
  nActive: 335, // PMID 38078870 — continued tirzepatide
  nPlacebo: 335, // PMID 38078870 — switched to placebo
  weightLossPctTreatmentRegimen: -5.5, // PMID 38078870 — additional weight loss from week 36 to 88 on continued tirz
  placeboWeightLossPct: 14.0, // PMID 38078870 — weight REGAIN from week 36 to 88 after switching to placebo
  citation: {
    authors: "Aronne LJ, Sattar N, Horn DB, et al.",
    title:
      "Continued Treatment With Tirzepatide for Maintenance of Weight Reduction in Adults With Obesity: The SURMOUNT-4 Randomized Clinical Trial",
    journal: "JAMA",
    year: 2024,
    volume: "331(1)",
    pages: "38-48",
    pmid: "38078870",
    doi: "10.1001/jama.2023.24945",
  },
  adverseEvents: {
    nausea: 12.2, // PMID 38078870 — randomized withdrawal phase, continued tirz
    vomiting: 5.7, // PMID 38078870
    diarrhea: 10.7, // PMID 38078870
  },
  placeboAdverseEvents: {
    nausea: 3.0, // PMID 38078870 — switched to placebo
    vomiting: 1.5, // PMID 38078870
    diarrhea: 4.5, // PMID 38078870
  },
  fdaLabelSection: "Zepbound USPI Section 14.1 (maintenance evidence)",
};

/**
 * STEP-HFpEF — Semaglutide in Heart Failure with Preserved Ejection Fraction and Obesity.
 */
export const STEP_HFpEF: ClinicalTrial = {
  id: "step-hfpef",
  name: "STEP-HFpEF",
  drug: "semaglutide",
  dose: "2.4 mg subcutaneous weekly",
  durationWeeks: 52, // PMID 37622681 (NEJM 2023;389:1069-1084)
  n: 529, // PMID 37622681
  nActive: 263, // PMID 37622681
  nPlacebo: 266, // PMID 37622681
  weightLossPctTreatmentRegimen: -13.3, // PMID 37622681 — % body weight change, semaglutide arm
  placeboWeightLossPct: -2.6, // PMID 37622681 — placebo arm
  citation: {
    authors: "Kosiborod MN, Abildstrøm SZ, Borlaug BA, et al.",
    title: "Semaglutide in Patients with Heart Failure with Preserved Ejection Fraction and Obesity",
    journal: "New England Journal of Medicine",
    year: 2023,
    volume: "389",
    pages: "1069-1084",
    pmid: "37622681",
    doi: "10.1056/NEJMoa2306963",
  },
  adverseEvents: {
    discontinuationDueToAE: 13.3, // PMID 37622681
  },
  placeboAdverseEvents: {
    discontinuationDueToAE: 5.3, // PMID 37622681
  },
  fdaLabelSection: "Wegovy USPI Section 14 (HFpEF supportive evidence)",
  notes:
    "KCCQ-CSS change: +16.6 semaglutide vs +8.7 placebo (estimated treatment difference +7.8, P<0.001). 6-minute walk distance change +21.5 m vs +1.2 m.",
};

/**
 * FLOW — Semaglutide for Chronic Kidney Disease in Type 2 Diabetes.
 * Primary endpoint (major kidney disease events) HR 0.76 (95% CI 0.66-0.88), P=0.0003.
 */
export const FLOW: ClinicalTrial = {
  id: "flow",
  name: "FLOW",
  drug: "semaglutide",
  dose: "1.0 mg subcutaneous weekly",
  durationWeeks: 182, // PMID 38785209 — median follow-up 3.4 years ≈ 182 weeks
  n: 3533, // PMID 38785209 (NEJM 2024;391:109-121)
  nActive: 1767, // PMID 38785209
  nPlacebo: 1766, // PMID 38785209
  weightLossPctTreatmentRegimen: -4.1, // PMID 38785209 — % body weight change at end of follow-up
  placeboWeightLossPct: -0.4, // PMID 38785209
  citation: {
    authors: "Perkovic V, Tuttle KR, Rossing P, et al.",
    title: "Effects of Semaglutide on Chronic Kidney Disease in Patients with Type 2 Diabetes",
    journal: "New England Journal of Medicine",
    year: 2024,
    volume: "391",
    pages: "109-121",
    pmid: "38785209",
    doi: "10.1056/NEJMoa2403347",
  },
  adverseEvents: {
    discontinuationDueToAE: 13.2, // PMID 38785209
  },
  placeboAdverseEvents: {
    discontinuationDueToAE: 11.9, // PMID 38785209
  },
  fdaLabelSection: "Ozempic USPI Section 14 (kidney outcomes)",
  notes:
    "Primary composite (kidney failure, >=50% eGFR decline, kidney or CV death) HR 0.76 (95% CI 0.66-0.88), P=0.0003. Trial stopped early for efficacy.",
};

/**
 * SURMOUNT-OSA — Tirzepatide for Obstructive Sleep Apnea and Obesity.
 * Two parallel trials: Trial 1 (PAP-naive) and Trial 2 (on PAP therapy).
 */
export const SURMOUNT_OSA: ClinicalTrial = {
  id: "surmount-osa",
  name: "SURMOUNT-OSA",
  drug: "tirzepatide",
  dose: "10 or 15 mg subcutaneous weekly (maximum tolerated)",
  durationWeeks: 52, // PMID 38912654 (NEJM 2024;391:1193-1205)
  n: 469, // PMID 38912654 — total across both trials
  nActive: 234, // PMID 38912654 — pooled tirzepatide arms
  nPlacebo: 235, // PMID 38912654 — pooled placebo arms
  weightLossPctTreatmentRegimen: -18.1, // PMID 38912654 — Trial 1 (PAP-naive) tirz arm % weight loss
  placeboWeightLossPct: -1.3, // PMID 38912654 — Trial 1 placebo
  citation: {
    authors: "Malhotra A, Grunstein RR, Fietze I, et al.",
    title: "Tirzepatide for the Treatment of Obstructive Sleep Apnea and Obesity",
    journal: "New England Journal of Medicine",
    year: 2024,
    volume: "391",
    pages: "1193-1205",
    pmid: "38912654",
    doi: "10.1056/NEJMoa2404881",
  },
  adverseEvents: {
    nausea: 26.4, // PMID 38912654 — pooled tirzepatide
    diarrhea: 21.8, // PMID 38912654
    vomiting: 12.2, // PMID 38912654
  },
  placeboAdverseEvents: {
    nausea: 9.1, // PMID 38912654
    diarrhea: 6.0, // PMID 38912654
    vomiting: 2.6, // PMID 38912654
  },
  fdaLabelSection: "Zepbound USPI Section 14 (OSA indication)",
  notes:
    "Trial 1 (PAP-naive): AHI baseline 51.5; change tirzepatide -25.3 vs placebo -5.3 events/hour. Trial 2 (PAP-treated): AHI baseline 49.5; change tirzepatide -29.3 vs placebo -5.5 events/hour.",
};

/**
 * STEP-TEENS — Once-Weekly Semaglutide in Adolescents with Obesity (ages 12-17).
 */
export const STEP_TEENS: ClinicalTrial = {
  id: "step-teens",
  name: "STEP-TEENS",
  drug: "semaglutide",
  dose: "2.4 mg subcutaneous weekly",
  durationWeeks: 68, // PMID 36322838 (NEJM 2022;387:2245-2257)
  n: 201, // PMID 36322838
  nActive: 134, // PMID 36322838 — 2:1 randomization
  nPlacebo: 67, // PMID 36322838
  weightLossPctTreatmentRegimen: -16.1, // PMID 36322838 — mean BMI change semaglutide arm
  placeboWeightLossPct: 0.6, // PMID 36322838 — mean BMI change placebo arm (positive = slight BMI gain)
  citation: {
    authors: "Weghuber D, Barrett T, Barrientos-Pérez M, et al.",
    title: "Once-Weekly Semaglutide in Adolescents with Obesity",
    journal: "New England Journal of Medicine",
    year: 2022,
    volume: "387",
    pages: "2245-2257",
    pmid: "36322838",
    doi: "10.1056/NEJMoa2208601",
  },
  adverseEvents: {
    nausea: 42.0, // PMID 36322838
    vomiting: 35.8, // PMID 36322838
    diarrhea: 22.4, // PMID 36322838
  },
  placeboAdverseEvents: {
    nausea: 17.9, // PMID 36322838
    vomiting: 10.4, // PMID 36322838
    diarrhea: 19.4, // PMID 36322838
  },
  fdaLabelSection: "Wegovy USPI Section 14.3 (Pediatric patients 12 years and older)",
  notes:
    "Primary endpoint is percentage change in BMI (not body weight) — standard for pediatric obesity trials. -16.1% BMI vs +0.6% placebo.",
};

/**
 * Retatrutide Phase 2 — Triple-Hormone-Receptor Agonist Retatrutide for Obesity.
 * Investigational; no FDA label as of April 2026.
 */
export const RETATRUTIDE_PHASE2: ClinicalTrial = {
  id: "retatrutide-phase2",
  name: "Retatrutide Phase 2",
  drug: "retatrutide",
  dose: "12 mg subcutaneous weekly",
  durationWeeks: 48, // PMID 37366315 (NEJM 2023;389:514-526)
  n: 338, // PMID 37366315
  nActive: 68, // PMID 37366315 — 12 mg arm
  nPlacebo: 70, // PMID 37366315
  weightLossPctTreatmentRegimen: -24.2, // PMID 37366315 — 12 mg arm % weight loss at 48 weeks
  placeboWeightLossPct: -2.1, // PMID 37366315 — placebo arm
  citation: {
    authors: "Jastreboff AM, Kaplan LM, Frías JP, et al.",
    title: "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial",
    journal: "New England Journal of Medicine",
    year: 2023,
    volume: "389",
    pages: "514-526",
    pmid: "37366315",
    doi: "10.1056/NEJMoa2301972",
  },
  adverseEvents: {
    nausea: 42.0, // PMID 37366315 — 12 mg arm
    vomiting: 16.0, // PMID 37366315
    diarrhea: 27.0, // PMID 37366315
    constipation: 21.0, // PMID 37366315
  },
  placeboAdverseEvents: {
    nausea: 13.0, // PMID 37366315
    vomiting: 3.0, // PMID 37366315
    diarrhea: 11.0, // PMID 37366315
    constipation: 9.0, // PMID 37366315
  },
  fdaLabelSection: "Not yet approved (investigational as of April 2026)",
  notes:
    "Phase 2 only. GIP/GLP-1/glucagon triple agonist. Highest dose 12 mg produced 24.2% mean weight loss at 48 weeks — the largest magnitude reported for any incretin monotherapy as of April 2026.",
};

/**
 * SURPASS-2 — Tirzepatide vs Semaglutide 1.0 mg in Type 2 Diabetes.
 * Head-to-head trial (glycemic primary endpoint; not a weight loss trial).
 */
export const SURPASS_2: ClinicalTrial = {
  id: "surpass-2",
  name: "SURPASS-2",
  drug: "tirzepatide",
  dose: "15 mg subcutaneous weekly",
  durationWeeks: 40, // PMID 34170647 (NEJM 2021;385:503-515)
  n: 1879, // PMID 34170647
  nActive: 470, // PMID 34170647 — tirzepatide 15 mg arm
  nPlacebo: 469, // PMID 34170647 — semaglutide 1.0 mg active comparator (NOT placebo)
  weightLossPctTreatmentRegimen: -11.2, // PMID 34170647 — tirzepatide 15 mg % weight loss (absolute -11.2 kg = -11.0%)
  placeboWeightLossPct: -5.7, // PMID 34170647 — semaglutide 1.0 mg comparator
  citation: {
    authors: "Frías JP, Davies MJ, Rosenstock J, et al.",
    title: "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes",
    journal: "New England Journal of Medicine",
    year: 2021,
    volume: "385",
    pages: "503-515",
    pmid: "34170647",
    doi: "10.1056/NEJMoa2107519",
  },
  adverseEvents: {
    nausea: 22.1, // PMID 34170647 — tirz 15 mg
    vomiting: 9.8, // PMID 34170647
    diarrhea: 15.7, // PMID 34170647
    constipation: 11.3, // PMID 34170647
  },
  placeboAdverseEvents: {
    nausea: 17.9, // PMID 34170647 — semaglutide 1.0 mg (active comparator, not placebo)
    vomiting: 8.5, // PMID 34170647
    diarrhea: 11.5, // PMID 34170647
    constipation: 4.5, // PMID 34170647
  },
  fdaLabelSection: "Mounjaro USPI Section 14.1",
  notes:
    "Active-comparator trial, not placebo-controlled. 'placebo' fields in this entry reference semaglutide 1.0 mg (Ozempic dose), not true placebo. HbA1c reduction: tirz 15 mg -2.30% vs sema 1.0 mg -1.86%.",
};

// =============================================================================
// Half-life data per FDA label
// =============================================================================

/** Half-life data per FDA label */
export const HALF_LIVES: Record<
  string,
  { hours: number; range?: [number, number]; source: string }
> = {
  semaglutide: { hours: 168, source: "Wegovy USPI Section 12.3 (~1 week)" },
  tirzepatide: { hours: 120, source: "Zepbound USPI Section 12.3 (~5 days)" },
  liraglutide: { hours: 13, source: "Saxenda USPI Section 12.3" },
  dulaglutide: { hours: 112, source: "Trulicity USPI Section 12.3 (~5 days)" },
  orforglipron: {
    hours: 36,
    range: [29, 49],
    source: "Foundayo USPI Section 12.3 (29-49 hours)",
  },
  exenatide_immediaterelease: { hours: 2.4, source: "Byetta USPI Section 12.3" },
};

// =============================================================================
// FDA label URLs (current as of April 2026)
// =============================================================================

/** FDA label URLs (current as of April 2026) */
export const FDA_LABEL_URLS: Record<string, string> = {
  wegovy:
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s026lbl.pdf",
  zepbound:
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/217806s002lbl.pdf",
  ozempic:
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s035,209637s037lbl.pdf",
  mounjaro:
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s039lbl.pdf",
  saxenda:
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/206321lbl.pdf",
  rybelsus:
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/213051s019lbl.pdf",
  foundayo: "https://pi.lilly.com/us/foundayo-uspi.pdf",
};

// =============================================================================
// Master array of every canonical trial
// =============================================================================

export const TRIALS: ClinicalTrial[] = [
  STEP_1,
  SURMOUNT_1_5MG,
  SURMOUNT_1_10MG,
  SURMOUNT_1_15MG,
  SELECT,
  SCALE,
  ATTAIN_1,
  STEP_4,
  SURMOUNT_4,
  STEP_HFpEF,
  FLOW,
  SURMOUNT_OSA,
  STEP_TEENS,
  RETATRUTIDE_PHASE2,
  SURPASS_2,
];

/** Look up a canonical trial by id. Returns undefined if not found. */
export function getTrial(id: string): ClinicalTrial | undefined {
  return TRIALS.find((t) => t.id === id);
}
