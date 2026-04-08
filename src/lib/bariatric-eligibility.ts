/**
 * Bariatric Surgery Eligibility & Coverage Checker
 *
 * Computes eligibility for bariatric surgery under (a) the academic
 * NIH 1991 / ASMBS 2022 standards and (b) the major US payer
 * criteria. Backed by src/data/bariatric-payer-criteria.json, where
 * every payer entry has a verification block with source URL and
 * last_verified date — same pattern as src/data/insurers.json.
 *
 * Every threshold and PA criterion in the data file traces to a
 * primary source verified by a research subagent on 2026-04-07.
 * Sources documented in the data file's `notes` and `sourceUrl`
 * fields per entry.
 *
 * Anchor publications:
 *   PMID 1733140   NIH 1991 Consensus (Am J Clin Nutr 1992)
 *   PMID 36280539  Eisenberg 2022 ASMBS/IFSO indications
 *   PMID 28199805  Schauer 2017 STAMPEDE 5-year
 *   PMID 17715408  Sjöström 2007 SOS mortality
 *   PMID 17715409  Adams 2007 NEJM RYGB long-term mortality
 *   PMID 15479938  Buchwald 2004 meta-analysis (n=22,094)
 *   Medicare NCD 100.1 (CMS Medicare Coverage Database)
 */

import payerData from "@/data/bariatric-payer-criteria.json";

export type Comorbidity =
  | "type-2-diabetes"
  | "hypertension"
  | "severe-osa"
  | "dyslipidemia"
  | "nash"
  | "obesity-cardiomyopathy"
  | "severe-joint-disease"
  | "coronary-heart-disease"
  | "coronary-artery-disease"
  | "cardiovascular-disease"
  | "cardiomyopathy"
  | "medically-refractory-hypertension"
  | "gerd"
  | "pcos";

export const COMORBIDITY_LABELS: Record<Comorbidity, string> = {
  "type-2-diabetes": "Type 2 diabetes",
  hypertension: "Hypertension",
  "severe-osa": "Severe obstructive sleep apnea",
  dyslipidemia: "Dyslipidemia",
  nash: "NASH / fatty liver disease",
  "obesity-cardiomyopathy": "Obesity cardiomyopathy",
  "severe-joint-disease": "Severe joint disease (mobility-impairing)",
  "coronary-heart-disease": "Coronary heart disease",
  "coronary-artery-disease": "Coronary artery disease",
  "cardiovascular-disease": "Cardiovascular disease",
  cardiomyopathy: "Cardiomyopathy",
  "medically-refractory-hypertension": "Refractory hypertension",
  gerd: "GERD",
  pcos: "Polycystic ovary syndrome",
};

export interface PayerCriteria {
  id: string;
  label: string;
  type: "guideline" | "payer";
  bmiMin: number | null;
  bmiMinWithComorbidity: number | null;
  bmiMinWithT2D?: number;
  qualifyingComorbidities: string[];
  supervisedDietMonths: number | null;
  ageMin: number | null;
  psychEvalRequired: boolean;
  smokingCessationRequired: boolean;
  facilityRequirement?: string;
  sourceUrl: string;
  lastVerified: string;
  notes: string;
}

export const PAYERS: PayerCriteria[] = (
  payerData as { payers: PayerCriteria[] }
).payers;

export const DATA_LAST_VERIFIED: string = (
  payerData as { lastVerified: string }
).lastVerified;

export interface EligibilityInput {
  heightCm: number;
  weightKg: number;
  ageYears: number;
  comorbidities: Comorbidity[];
}

export interface PayerEligibilityResult {
  payer: PayerCriteria;
  eligible: boolean;
  pathway: "bmi-alone" | "bmi-plus-comorbidity" | "bmi-plus-t2d" | "ineligible";
  reasons: string[];
  unmetRequirements: string[];
}

export interface EligibilitySummary {
  bmi: number;
  bmiClass: string;
  results: PayerEligibilityResult[];
  qualifyingPayers: PayerCriteria[];
  ineligiblePayers: PayerCriteria[];
}

/* ─────────────────────────────────────────────────────────────────
 * BMI helpers
 * ───────────────────────────────────────────────────────────────── */

export function computeBmi(weightKg: number, heightCm: number): number {
  if (
    !Number.isFinite(weightKg) ||
    weightKg <= 0 ||
    !Number.isFinite(heightCm) ||
    heightCm <= 0
  )
    return 0;
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function bmiClassLabel(bmi: number): string {
  if (!Number.isFinite(bmi) || bmi <= 0) return "—";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Class 1 obesity";
  if (bmi < 40) return "Class 2 obesity";
  return "Class 3 obesity (severe)";
}

const KG_PER_LB = 0.45359237;
const CM_PER_IN = 2.54;
export function lbToKg(lb: number): number {
  return lb * KG_PER_LB;
}
export function inToCm(inches: number): number {
  return inches * CM_PER_IN;
}

/* ─────────────────────────────────────────────────────────────────
 * Payer evaluation
 * ───────────────────────────────────────────────────────────────── */

export function evaluatePayer(
  payer: PayerCriteria,
  input: EligibilityInput,
): PayerEligibilityResult {
  const bmi = computeBmi(input.weightKg, input.heightCm);
  const reasons: string[] = [];
  const unmet: string[] = [];

  const hasQualifyingComorbidity = input.comorbidities.some((c) =>
    payer.qualifyingComorbidities.includes(c),
  );
  const hasT2D = input.comorbidities.includes("type-2-diabetes");

  let pathway: PayerEligibilityResult["pathway"] = "ineligible";
  let bmiOk = false;

  if (payer.bmiMin !== null && bmi >= payer.bmiMin) {
    pathway = "bmi-alone";
    bmiOk = true;
    reasons.push(
      `BMI ${bmi.toFixed(1)} meets the BMI-alone threshold of ${payer.bmiMin}.`,
    );
  } else if (
    payer.bmiMinWithComorbidity !== null &&
    bmi >= payer.bmiMinWithComorbidity &&
    hasQualifyingComorbidity
  ) {
    pathway = "bmi-plus-comorbidity";
    bmiOk = true;
    reasons.push(
      `BMI ${bmi.toFixed(1)} meets the BMI-with-comorbidity threshold of ${payer.bmiMinWithComorbidity} and you have a qualifying comorbidity.`,
    );
  } else if (
    payer.bmiMinWithT2D !== undefined &&
    bmi >= payer.bmiMinWithT2D &&
    hasT2D
  ) {
    pathway = "bmi-plus-t2d";
    bmiOk = true;
    reasons.push(
      `BMI ${bmi.toFixed(1)} meets the T2D pathway threshold of ${payer.bmiMinWithT2D} and you have type 2 diabetes.`,
    );
  } else {
    if (payer.bmiMin !== null) {
      unmet.push(
        `BMI ${bmi.toFixed(1)} is below the BMI-alone threshold of ${payer.bmiMin}.`,
      );
    }
    if (payer.bmiMinWithComorbidity !== null) {
      if (!hasQualifyingComorbidity) {
        unmet.push(
          `BMI-with-comorbidity pathway requires a qualifying comorbidity (T2D, OSA, etc.) — none selected.`,
        );
      } else {
        unmet.push(
          `BMI ${bmi.toFixed(1)} is below the BMI-with-comorbidity threshold of ${payer.bmiMinWithComorbidity}.`,
        );
      }
    }
  }

  // Age check
  if (payer.ageMin !== null && input.ageYears < payer.ageMin) {
    unmet.push(
      `Age ${input.ageYears} is below the minimum of ${payer.ageMin}.`,
    );
  }

  // Supervised diet (informational, not blocking — payers verify this
  // in the PA submission, not in the eligibility model)
  if (payer.supervisedDietMonths !== null) {
    reasons.push(
      `${payer.supervisedDietMonths}-month documented supervised weight management program required at PA submission.`,
    );
  }

  if (payer.psychEvalRequired) {
    reasons.push("Psychological evaluation required at PA submission.");
  }

  if (payer.facilityRequirement) {
    reasons.push(`Facility requirement: ${payer.facilityRequirement}.`);
  }

  const ageOk =
    payer.ageMin === null || input.ageYears >= payer.ageMin;
  const eligible = bmiOk && ageOk;

  return {
    payer,
    eligible,
    pathway: eligible ? pathway : "ineligible",
    reasons,
    unmetRequirements: unmet,
  };
}

export function evaluateAllPayers(
  input: EligibilityInput,
): EligibilitySummary {
  const bmi = computeBmi(input.weightKg, input.heightCm);
  const results = PAYERS.map((p) => evaluatePayer(p, input));
  return {
    bmi,
    bmiClass: bmiClassLabel(bmi),
    results,
    qualifyingPayers: results.filter((r) => r.eligible).map((r) => r.payer),
    ineligiblePayers: results
      .filter((r) => !r.eligible)
      .map((r) => r.payer),
  };
}
