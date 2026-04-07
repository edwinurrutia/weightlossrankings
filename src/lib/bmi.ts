/**
 * BMI calculation + WHO categories + GLP-1 expected outcome overlay.
 *
 * Used by /tools/glp1-bmi-calculator. Math is intentionally simple
 * (BMI = kg / m²) but the value-add is the GLP-1-specific overlay
 * showing what category each STEP-1 / SURMOUNT-1 trial endpoint
 * would put the patient into.
 */

export type Unit = "metric" | "imperial";

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  categoryLabel: string;
  weightKg: number;
  heightM: number;
}

export type BmiCategory =
  | "underweight"
  | "normal"
  | "overweight"
  | "obese-class-1"
  | "obese-class-2"
  | "obese-class-3";

export const BMI_CATEGORIES: Record<
  BmiCategory,
  { label: string; min: number; max: number }
> = {
  underweight: { label: "Underweight", min: 0, max: 18.5 },
  normal: { label: "Normal weight", min: 18.5, max: 25 },
  overweight: { label: "Overweight", min: 25, max: 30 },
  "obese-class-1": { label: "Obesity (Class 1)", min: 30, max: 35 },
  "obese-class-2": { label: "Obesity (Class 2)", min: 35, max: 40 },
  "obese-class-3": { label: "Obesity (Class 3, severe)", min: 40, max: 100 },
};

/**
 * WHO BMI category boundaries (also used by CDC, ACOG, AHA, AACE).
 * Source: WHO Global Database on BMI; CDC Adult BMI page.
 */
export function categorize(bmi: number): BmiCategory {
  if (!Number.isFinite(bmi) || bmi <= 0) return "normal";
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  if (bmi < 35) return "obese-class-1";
  if (bmi < 40) return "obese-class-2";
  return "obese-class-3";
}

const KG_PER_LB = 0.45359237;
const M_PER_IN = 0.0254;

export function lbToKg(lb: number): number {
  return lb * KG_PER_LB;
}
export function kgToLb(kg: number): number {
  return kg / KG_PER_LB;
}
export function inToM(inches: number): number {
  return inches * M_PER_IN;
}
export function mToIn(m: number): number {
  return m / M_PER_IN;
}

/**
 * Compute BMI from raw inputs in either metric (kg + cm) or
 * imperial (lb + total inches) units.
 */
export function calculateBmi(
  weight: number,
  height: number,
  unit: Unit,
): BmiResult {
  let weightKg: number;
  let heightM: number;
  if (unit === "metric") {
    weightKg = weight;
    heightM = height / 100; // input cm → m
  } else {
    weightKg = lbToKg(weight);
    heightM = inToM(height);
  }
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return {
      bmi: 0,
      category: "normal",
      categoryLabel: "—",
      weightKg: 0,
      heightM: 0,
    };
  }
  if (!Number.isFinite(heightM) || heightM <= 0) {
    return {
      bmi: 0,
      category: "normal",
      categoryLabel: "—",
      weightKg,
      heightM: 0,
    };
  }
  const bmi = weightKg / (heightM * heightM);
  const cat = categorize(bmi);
  return {
    bmi,
    category: cat,
    categoryLabel: BMI_CATEGORIES[cat].label,
    weightKg,
    heightM,
  };
}

/**
 * For a starting BMI and a percent weight loss, compute the
 * resulting BMI. Used to overlay STEP-1 / SURMOUNT-1 trial endpoints
 * onto the patient's starting BMI.
 *
 * Math: weight_after = weight_before * (1 - pctLoss/100)
 *       bmi_after    = weight_after / height² = bmi_before * (1 - pctLoss/100)
 */
export function bmiAfterLoss(startingBmi: number, pctLoss: number): number {
  if (!Number.isFinite(startingBmi) || startingBmi <= 0) return 0;
  if (!Number.isFinite(pctLoss)) return startingBmi;
  return startingBmi * (1 - pctLoss / 100);
}

/**
 * Compute the resulting BMI category after a given percent weight
 * loss from a starting BMI.
 */
export function categoryAfterLoss(
  startingBmi: number,
  pctLoss: number,
): BmiCategory {
  return categorize(bmiAfterLoss(startingBmi, pctLoss));
}

/**
 * Compute the WHO eligibility for FDA-approved GLP-1 weight management
 * therapy. Both Wegovy and Zepbound require either:
 *   - BMI ≥ 30, OR
 *   - BMI ≥ 27 with at least one weight-related comorbidity
 * (Per Wegovy + Zepbound prescribing information.)
 */
export function isGlp1Eligible(bmi: number): {
  eligibleNoComorbidity: boolean;
  eligibleWithComorbidity: boolean;
} {
  return {
    eligibleNoComorbidity: bmi >= 30,
    eligibleWithComorbidity: bmi >= 27,
  };
}
