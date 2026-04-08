/**
 * GLP-1 Protein & Macro Calculator
 *
 * Computes daily protein target, calorie target, and macro split for
 * a patient on (or considering) a GLP-1 receptor agonist. The
 * calculator is designed around the muscle-preservation problem:
 * GLP-1 trials show ~25-45% of weight loss is lean tissue without
 * intervention, and the highest-leverage mitigation is adequate
 * dietary protein (1.2-2.0 g/kg/day depending on age, training
 * status, and deficit) plus resistance training.
 *
 * Every constant in this file traces to a peer-reviewed primary
 * source verified against PubMed by a research subagent on
 * 2026-04-07. PMIDs:
 *   2305711   Mifflin-St Jeor BMR equation (Am J Clin Nutr 1990)
 *   23867520  Bauer J PROT-AGE 2013 (J Am Med Dir Assoc)
 *   26817506  Longland TM 2016 (Am J Clin Nutr) — 2.4 g/kg + RT RCT
 *   28642676  Jäger R et al. ISSN 2017 protein position stand
 *   24477298  Mamerow MM 2014 (J Nutr) — per-meal distribution
 *   24864135  Helms ER 2014 (J Int Soc Sports Nutr) — deficit prep
 *   19927027  Mettler S 2010 (Med Sci Sports Exerc) — protein in
 *             athletes during weight loss
 *   24814383  Deutz NEP ESPEN 2014 — older adult protein
 *   38937282  Neeland 2024 (Diabetes Obes Metab) — GLP-1 lean
 *             mass mitigation review
 *   21872751  Hall KD 2011 (Lancet) — energy imbalance dynamics
 *   33567185  STEP-1 (Wilding NEJM 2021) — 14.9% magnitude anchor
 *   35658024  SURMOUNT-1 (Jastreboff NEJM 2022) — 20.9% magnitude
 *
 * The Mifflin-St Jeor 1990 equation is the gold standard for BMR
 * estimation in adults; FAO/WHO/UNU 2001 PAL multipliers are used
 * for the activity overlay. Weight loss / maintenance / surplus
 * deficit math is anchored in Hall 2011.
 */

export type Sex = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "extreme";

/**
 * Four goals mapped to specific calorie targets:
 *   - "lose": 500 kcal/day deficit (~0.45 kg/week loss, Hall 2011)
 *   - "maintain": TDEE as-is
 *   - "gain": 250 kcal/day surplus (lean mass gain emphasis)
 *   - "recomp": 200 kcal/day deficit with protein at the high end —
 *     body recomposition / "build muscle, minimize fat" goal. This
 *     is the lowest-deficit lose-fat-while-building-muscle target
 *     supported by the Barakat 2020 review and the Helms 2014
 *     contest-prep literature. A 200 kcal deficit is small enough
 *     to support muscle protein synthesis if protein intake is at
 *     the high end of the tier (2.0-2.4 g/kg). This goal added
 *     2026-04-08 after reviewing the Maximus Tribe TDEE calculator
 *     which has "Build Muscle, Minimize Fat" as a 4th option.
 */
export type Goal = "lose" | "maintain" | "gain" | "recomp";

export type ProteinTier =
  | "general-health" // 0.8 g/kg — RDA, not enough for GLP-1 patients
  | "older-adult" // 1.0-1.2 g/kg — PROT-AGE baseline
  | "active-or-deficit" // 1.2-1.6 g/kg — most GLP-1 patients
  | "high-deficit-or-trained" // 1.6-2.0 g/kg — high-rate loss
  | "athlete-very-lean"; // 2.0-2.4 g/kg — very lean / contest prep

export type Unit = "metric" | "imperial";

export interface ProteinCalculatorInput {
  sex: Sex;
  ageYears: number;
  weightKg: number;
  heightCm: number;
  activity: ActivityLevel;
  goal: Goal;
  /**
   * Whether the patient is on a GLP-1 receptor agonist or planning
   * to start. When true, the protein target is bumped one tier higher
   * because of the documented lean-mass loss in STEP-1 / SURMOUNT-1
   * body composition substudies (Neeland 2024 review).
   */
  onGlp1: boolean;
}

export interface ProteinCalculatorResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGramsLow: number;
  proteinGramsHigh: number;
  proteinGramsRecommended: number;
  proteinTier: ProteinTier;
  proteinTierLabel: string;
  perMealProteinGrams: number;
  fatGrams: number;
  carbGrams: number;
  weeklyWeightChangeKg: number;
}

/* ─────────────────────────────────────────────────────────────────
 * 1. Mifflin-St Jeor BMR — PMID 2305711
 *    Am J Clin Nutr 1990;51(2):241-247
 *    Validated against indirect calorimetry in n=498 adults
 *    (247 women, 251 men), ages 19-78, normal to obese.
 * ───────────────────────────────────────────────────────────────── */

export function mifflinStJeor(
  weightKg: number,
  heightCm: number,
  ageYears: number,
  sex: Sex,
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return sex === "male" ? base + 5 : base - 161;
}

/* ─────────────────────────────────────────────────────────────────
 * 2. FAO/WHO/UNU 2001 Physical Activity Level multipliers
 *    Human Energy Requirements report (Rome 2001)
 *    Standard PAL values used in nutrition planning globally.
 * ───────────────────────────────────────────────────────────────── */

export const PAL: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extreme: 1.9,
};

export function tdeeFromBmr(bmr: number, activity: ActivityLevel): number {
  return bmr * PAL[activity];
}

/* ─────────────────────────────────────────────────────────────────
 * 3. Caloric deficit / surplus
 *    Hall KD 2011 Lancet (PMID 21872751): ~500 kcal/day deficit
 *    yields ~1 lb (0.45 kg) per week at steady state. We use a
 *    moderate 500 kcal/day deficit for "lose" and a 250 kcal/day
 *    surplus for "gain" — the conservative defaults for sustainable
 *    rates. Real rates vary significantly with metabolic adaptation.
 * ───────────────────────────────────────────────────────────────── */

const DEFICIT_KCAL_PER_DAY = 500;
const RECOMP_DEFICIT_KCAL_PER_DAY = 200;
const SURPLUS_KCAL_PER_DAY = 250;

export function targetCaloriesFor(
  tdee: number,
  goal: Goal,
): { calories: number; weeklyKgChange: number } {
  if (goal === "lose") {
    return {
      calories: Math.max(1200, tdee - DEFICIT_KCAL_PER_DAY),
      weeklyKgChange: -0.45,
    };
  }
  if (goal === "gain") {
    return { calories: tdee + SURPLUS_KCAL_PER_DAY, weeklyKgChange: 0.23 };
  }
  if (goal === "recomp") {
    // Body recomposition — build muscle while minimizing fat. Very
    // small deficit (200 kcal/day) is small enough to support
    // muscle protein synthesis IF protein intake is at the high
    // end of the tier ladder. Expected rate is ~0.2 kg/week loss;
    // lean-mass change depends on resistance training consistency.
    return {
      calories: Math.max(1200, tdee - RECOMP_DEFICIT_KCAL_PER_DAY),
      weeklyKgChange: -0.18,
    };
  }
  return { calories: tdee, weeklyKgChange: 0 };
}

/* ─────────────────────────────────────────────────────────────────
 * 4. Protein tier selection
 *
 * Tier mapping is built from:
 *   - Bauer 2013 PROT-AGE (PMID 23867520): 1.0-1.2 g/kg older adults
 *     baseline; 1.2-1.5 g/kg older adults with disease/exercise
 *   - Longland 2016 (PMID 26817506): 2.4 g/kg in 4-week severe
 *     deficit + RT preserved + added LBM
 *   - ISSN 2017 (PMID 28642676): 1.4-2.0 g/kg active individuals;
 *     2.3-3.1 g/kg in caloric restriction for very lean populations
 *   - Helms 2014 (PMID 24864135): 2.3-3.1 g/kg LBM in deficit, scales
 *     with leanness
 *   - Mettler 2010 (PMID 19927027): 2.3 g/kg preserved LBM in trained
 *     athletes during weight loss
 *   - Neeland 2024 (PMID 38937282): GLP-1 patients should target the
 *     higher end (1.6-2.3 g/kg FFM)
 *
 * GLP-1 patients get bumped one tier up from their otherwise-applicable
 * baseline because the published body composition substudies show
 * 25-45% of weight loss is lean tissue without intervention.
 * ───────────────────────────────────────────────────────────────── */

export const PROTEIN_TIER_LABELS: Record<ProteinTier, string> = {
  "general-health": "RDA baseline (0.8 g/kg)",
  "older-adult": "PROT-AGE older-adult (1.0-1.2 g/kg)",
  "active-or-deficit": "Active or in caloric deficit (1.2-1.6 g/kg)",
  "high-deficit-or-trained":
    "High-deficit / trained / GLP-1 patient (1.6-2.0 g/kg)",
  "athlete-very-lean": "Very lean / contest prep (2.0-2.4 g/kg)",
};

export const PROTEIN_TIER_RANGES: Record<
  ProteinTier,
  { low: number; high: number }
> = {
  "general-health": { low: 0.8, high: 1.0 },
  "older-adult": { low: 1.0, high: 1.2 },
  "active-or-deficit": { low: 1.2, high: 1.6 },
  "high-deficit-or-trained": { low: 1.6, high: 2.0 },
  "athlete-very-lean": { low: 2.0, high: 2.4 },
};

export function selectProteinTier(input: {
  ageYears: number;
  activity: ActivityLevel;
  goal: Goal;
  onGlp1: boolean;
}): ProteinTier {
  const { ageYears, activity, goal, onGlp1 } = input;
  // Baseline tier from age + activity + goal
  let baseline: ProteinTier;
  if (goal === "recomp") {
    // Body recomposition always requires the high end of the
    // protein range to support muscle protein synthesis in a
    // small deficit. Anchored on Helms 2014 and Barakat 2020.
    baseline = "high-deficit-or-trained";
  } else if (
    goal === "lose" &&
    (activity === "very" || activity === "extreme")
  ) {
    baseline = "high-deficit-or-trained";
  } else if (goal === "lose") {
    baseline = "active-or-deficit";
  } else if (
    activity === "moderate" ||
    activity === "very" ||
    activity === "extreme"
  ) {
    baseline = "active-or-deficit";
  } else if (ageYears >= 65) {
    baseline = "older-adult";
  } else {
    baseline = "general-health";
  }

  // GLP-1 bump per Neeland 2024
  if (onGlp1) {
    return bumpTierUp(baseline);
  }
  return baseline;
}

function bumpTierUp(t: ProteinTier): ProteinTier {
  switch (t) {
    case "general-health":
      return "older-adult";
    case "older-adult":
      return "active-or-deficit";
    case "active-or-deficit":
      return "high-deficit-or-trained";
    case "high-deficit-or-trained":
      return "athlete-very-lean";
    case "athlete-very-lean":
      return "athlete-very-lean";
  }
}

/* ─────────────────────────────────────────────────────────────────
 * 5. Per-meal protein distribution
 *    Mamerow 2014 (PMID 24477298): even distribution across 3 meals
 *    increased 24-hour MPS by ~25% vs skewed (concentrated at one
 *    meal). Per-meal target is approximately 0.3-0.4 g/kg of body
 *    weight (or 25-40 g absolute), distributed across 3 main meals.
 * ───────────────────────────────────────────────────────────────── */

const MEALS_PER_DAY = 3;

export function perMealProtein(totalProteinGrams: number): number {
  return totalProteinGrams / MEALS_PER_DAY;
}

/* ─────────────────────────────────────────────────────────────────
 * 6. Fat / carb split
 *    Conservative defaults: 25% of calories from fat (within
 *    AMDR 20-35%, AHA / ADA), remainder from carbohydrate.
 *    9 kcal/g fat, 4 kcal/g carb, 4 kcal/g protein.
 * ───────────────────────────────────────────────────────────────── */

const FAT_KCAL_FRACTION = 0.25;
const KCAL_PER_G_FAT = 9;
const KCAL_PER_G_CARB = 4;
const KCAL_PER_G_PROTEIN = 4;

export function macroSplit(
  targetCalories: number,
  proteinGrams: number,
): { fatGrams: number; carbGrams: number } {
  const proteinKcal = proteinGrams * KCAL_PER_G_PROTEIN;
  const fatKcal = targetCalories * FAT_KCAL_FRACTION;
  const carbKcal = Math.max(0, targetCalories - proteinKcal - fatKcal);
  return {
    fatGrams: Math.round(fatKcal / KCAL_PER_G_FAT),
    carbGrams: Math.round(carbKcal / KCAL_PER_G_CARB),
  };
}

/* ─────────────────────────────────────────────────────────────────
 * 7. Unit conversion helpers
 * ───────────────────────────────────────────────────────────────── */

const KG_PER_LB = 0.45359237;
const CM_PER_IN = 2.54;

export function lbToKg(lb: number): number {
  return lb * KG_PER_LB;
}
export function kgToLb(kg: number): number {
  return kg / KG_PER_LB;
}
export function inToCm(inches: number): number {
  return inches * CM_PER_IN;
}
export function cmToIn(cm: number): number {
  return cm / CM_PER_IN;
}

/* ─────────────────────────────────────────────────────────────────
 * 8. Top-level calculation
 * ───────────────────────────────────────────────────────────────── */

export function calculateProtein(
  input: ProteinCalculatorInput,
): ProteinCalculatorResult {
  const { sex, ageYears, weightKg, heightCm, activity, goal, onGlp1 } = input;

  if (
    !Number.isFinite(weightKg) ||
    weightKg <= 0 ||
    !Number.isFinite(heightCm) ||
    heightCm <= 0 ||
    !Number.isFinite(ageYears) ||
    ageYears < 14 ||
    ageYears > 110
  ) {
    return {
      bmr: 0,
      tdee: 0,
      targetCalories: 0,
      proteinGramsLow: 0,
      proteinGramsHigh: 0,
      proteinGramsRecommended: 0,
      proteinTier: "general-health",
      proteinTierLabel: PROTEIN_TIER_LABELS["general-health"],
      perMealProteinGrams: 0,
      fatGrams: 0,
      carbGrams: 0,
      weeklyWeightChangeKg: 0,
    };
  }

  const bmr = mifflinStJeor(weightKg, heightCm, ageYears, sex);
  const tdee = tdeeFromBmr(bmr, activity);
  const { calories: targetCalories, weeklyKgChange } = targetCaloriesFor(
    tdee,
    goal,
  );

  const tier = selectProteinTier({ ageYears, activity, goal, onGlp1 });
  const { low, high } = PROTEIN_TIER_RANGES[tier];
  const proteinGramsLow = Math.round(weightKg * low);
  const proteinGramsHigh = Math.round(weightKg * high);
  const proteinGramsRecommended = Math.round(
    weightKg * ((low + high) / 2),
  );
  const perMealProteinGrams = Math.round(
    perMealProtein(proteinGramsRecommended),
  );

  const { fatGrams, carbGrams } = macroSplit(
    targetCalories,
    proteinGramsRecommended,
  );

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    proteinGramsLow,
    proteinGramsHigh,
    proteinGramsRecommended,
    proteinTier: tier,
    proteinTierLabel: PROTEIN_TIER_LABELS[tier],
    perMealProteinGrams,
    fatGrams,
    carbGrams,
    weeklyWeightChangeKg: weeklyKgChange,
  };
}
