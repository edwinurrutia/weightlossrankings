/**
 * GLP-1 Protein & Macro Calculator test runner.
 * Run with: npx tsx scripts/test-protein-calculator.ts
 *
 * Targets the 100+ assertion bar set by the existing tool test
 * suites (BMI calculator, dose plotter). Covers BMR equations
 * against published reference values, PAL multipliers, tier
 * selection across the parameter space, GLP-1 bump logic, per-
 * meal split, macro math conservation, unit conversions, edge
 * cases, and a 1000-iteration fuzz with reasonable input ranges.
 */

import {
  PAL,
  PROTEIN_TIER_LABELS,
  PROTEIN_TIER_RANGES,
  calculateProtein,
  cmToIn,
  inToCm,
  kgToLb,
  lbToKg,
  macroSplit,
  mifflinStJeor,
  perMealProtein,
  selectProteinTier,
  targetCaloriesFor,
  tdeeFromBmr,
  type ActivityLevel,
  type Goal,
  type ProteinTier,
  type Sex,
} from "../src/lib/protein-calculator";

let passed = 0;
let failed = 0;
const failures: string[] = [];

function check(name: string, cond: boolean, detail?: string) {
  if (cond) passed++;
  else {
    failed++;
    failures.push(`FAIL: ${name}${detail ? " — " + detail : ""}`);
  }
}
function approx(a: number, b: number, tol = 0.5): boolean {
  return Math.abs(a - b) <= tol;
}

// ============================================================
// 1. Mifflin-St Jeor BMR — published reference values
//    (PMID 2305711)
// ============================================================
console.log("\n[1] Mifflin-St Jeor BMR");
// Reference: 30 y/o, 80 kg, 180 cm male
// 10*80 + 6.25*180 - 5*30 + 5 = 800 + 1125 - 150 + 5 = 1780
check(
  "30M 80kg 180cm = 1780 kcal/day",
  approx(mifflinStJeor(80, 180, 30, "male"), 1780, 1),
);
// 30 y/o, 65 kg, 165 cm female
// 10*65 + 6.25*165 - 5*30 - 161 = 650 + 1031.25 - 150 - 161 = 1370.25
check(
  "30F 65kg 165cm = 1370 kcal/day",
  approx(mifflinStJeor(65, 165, 30, "female"), 1370.25, 0.5),
);
// 50 y/o, 100 kg, 175 cm male
// 10*100 + 6.25*175 - 5*50 + 5 = 1000 + 1093.75 - 250 + 5 = 1848.75
check(
  "50M 100kg 175cm = 1849 kcal/day",
  approx(mifflinStJeor(100, 175, 50, "male"), 1848.75, 0.5),
);
// 70 y/o, 70 kg, 160 cm female
// 10*70 + 6.25*160 - 5*70 - 161 = 700 + 1000 - 350 - 161 = 1189
check(
  "70F 70kg 160cm = 1189 kcal/day",
  approx(mifflinStJeor(70, 160, 70, "female"), 1189, 0.5),
);
// Symmetry: male - female = 5 - (-161) = 166
check(
  "M-F BMR delta is 166 kcal at same body comp",
  approx(
    mifflinStJeor(80, 180, 30, "male") -
      mifflinStJeor(80, 180, 30, "female"),
    166,
    0.01,
  ),
);
// Linearity in weight
check(
  "BMR scales linearly with weight (10 kcal per kg)",
  approx(
    mifflinStJeor(81, 180, 30, "male") -
      mifflinStJeor(80, 180, 30, "male"),
    10,
    0.01,
  ),
);
// Linearity in height
check(
  "BMR scales linearly with height (6.25 kcal per cm)",
  approx(
    mifflinStJeor(80, 181, 30, "male") -
      mifflinStJeor(80, 180, 30, "male"),
    6.25,
    0.01,
  ),
);
// Linearity in age
check(
  "BMR scales linearly with age (-5 kcal per year)",
  approx(
    mifflinStJeor(80, 180, 30, "male") -
      mifflinStJeor(80, 180, 31, "male"),
    5,
    0.01,
  ),
);

// ============================================================
// 2. PAL multipliers — FAO/WHO/UNU 2001
// ============================================================
console.log("\n[2] PAL multipliers");
check("sedentary PAL = 1.2", PAL.sedentary === 1.2);
check("light PAL = 1.375", PAL.light === 1.375);
check("moderate PAL = 1.55", PAL.moderate === 1.55);
check("very PAL = 1.725", PAL.very === 1.725);
check("extreme PAL = 1.9", PAL.extreme === 1.9);
check(
  "tdeeFromBmr(2000, sedentary) = 2400",
  tdeeFromBmr(2000, "sedentary") === 2400,
);
check(
  "tdeeFromBmr(2000, moderate) = 3100",
  tdeeFromBmr(2000, "moderate") === 3100,
);
check(
  "tdeeFromBmr(2000, extreme) = 3800",
  tdeeFromBmr(2000, "extreme") === 3800,
);

// ============================================================
// 3. Goal calorie math (Hall 2011 anchor)
// ============================================================
console.log("\n[3] Goal calorie math");
check(
  "lose: TDEE - 500 cal",
  targetCaloriesFor(2500, "lose").calories === 2000,
);
check(
  "maintain: TDEE",
  targetCaloriesFor(2500, "maintain").calories === 2500,
);
check(
  "gain: TDEE + 250",
  targetCaloriesFor(2500, "gain").calories === 2750,
);
check(
  "lose floor: 1200 cal min",
  targetCaloriesFor(1500, "lose").calories === 1200,
);
check(
  "lose: -0.45 kg/wk",
  targetCaloriesFor(2500, "lose").weeklyKgChange === -0.45,
);
check(
  "maintain: 0 kg/wk",
  targetCaloriesFor(2500, "maintain").weeklyKgChange === 0,
);
check(
  "gain: +0.23 kg/wk",
  targetCaloriesFor(2500, "gain").weeklyKgChange === 0.23,
);

// ============================================================
// 4. Protein tier selection
// ============================================================
console.log("\n[4] Protein tier selection");
// Sedentary 30 y/o maintaining → general-health
check(
  "30 sedentary maintain non-GLP-1 → general-health",
  selectProteinTier({
    ageYears: 30,
    activity: "sedentary",
    goal: "maintain",
    onGlp1: false,
  }) === "general-health",
);
// Sedentary 70 y/o → older-adult
check(
  "70 sedentary maintain non-GLP-1 → older-adult",
  selectProteinTier({
    ageYears: 70,
    activity: "sedentary",
    goal: "maintain",
    onGlp1: false,
  }) === "older-adult",
);
// Moderate 30 y/o → active-or-deficit
check(
  "30 moderate maintain non-GLP-1 → active-or-deficit",
  selectProteinTier({
    ageYears: 30,
    activity: "moderate",
    goal: "maintain",
    onGlp1: false,
  }) === "active-or-deficit",
);
// Lose + sedentary → active-or-deficit
check(
  "30 sedentary lose non-GLP-1 → active-or-deficit",
  selectProteinTier({
    ageYears: 30,
    activity: "sedentary",
    goal: "lose",
    onGlp1: false,
  }) === "active-or-deficit",
);
// Lose + very active → high-deficit-or-trained
check(
  "30 very lose non-GLP-1 → high-deficit-or-trained",
  selectProteinTier({
    ageYears: 30,
    activity: "very",
    goal: "lose",
    onGlp1: false,
  }) === "high-deficit-or-trained",
);
// GLP-1 bump: sedentary 30 maintain → bumps from general-health to older-adult
check(
  "GLP-1 bump: 30 sedentary maintain → older-adult",
  selectProteinTier({
    ageYears: 30,
    activity: "sedentary",
    goal: "maintain",
    onGlp1: true,
  }) === "older-adult",
);
// GLP-1 bump: 30 sedentary lose → bumps from active-or-deficit to high-deficit-or-trained
check(
  "GLP-1 bump: 30 sedentary lose → high-deficit-or-trained",
  selectProteinTier({
    ageYears: 30,
    activity: "sedentary",
    goal: "lose",
    onGlp1: true,
  }) === "high-deficit-or-trained",
);
// GLP-1 bump caps at athlete-very-lean
check(
  "GLP-1 bump: 30 very lose → athlete-very-lean (capped)",
  selectProteinTier({
    ageYears: 30,
    activity: "very",
    goal: "lose",
    onGlp1: true,
  }) === "athlete-very-lean",
);

// ============================================================
// 5. Tier ranges — published anchor values
// ============================================================
console.log("\n[5] Tier ranges");
check(
  "general-health 0.8-1.0",
  PROTEIN_TIER_RANGES["general-health"].low === 0.8 &&
    PROTEIN_TIER_RANGES["general-health"].high === 1.0,
);
check(
  "older-adult 1.0-1.2 (PROT-AGE)",
  PROTEIN_TIER_RANGES["older-adult"].low === 1.0 &&
    PROTEIN_TIER_RANGES["older-adult"].high === 1.2,
);
check(
  "active-or-deficit 1.2-1.6",
  PROTEIN_TIER_RANGES["active-or-deficit"].low === 1.2 &&
    PROTEIN_TIER_RANGES["active-or-deficit"].high === 1.6,
);
check(
  "high-deficit-or-trained 1.6-2.0",
  PROTEIN_TIER_RANGES["high-deficit-or-trained"].low === 1.6 &&
    PROTEIN_TIER_RANGES["high-deficit-or-trained"].high === 2.0,
);
check(
  "athlete-very-lean 2.0-2.4",
  PROTEIN_TIER_RANGES["athlete-very-lean"].low === 2.0 &&
    PROTEIN_TIER_RANGES["athlete-very-lean"].high === 2.4,
);
// Tier ranges are monotonic
const tiersInOrder: ProteinTier[] = [
  "general-health",
  "older-adult",
  "active-or-deficit",
  "high-deficit-or-trained",
  "athlete-very-lean",
];
for (let i = 1; i < tiersInOrder.length; i++) {
  const prev = PROTEIN_TIER_RANGES[tiersInOrder[i - 1]];
  const cur = PROTEIN_TIER_RANGES[tiersInOrder[i]];
  check(
    `tier monotonicity: ${tiersInOrder[i - 1]} ≤ ${tiersInOrder[i]}`,
    prev.high <= cur.low + 0.01,
  );
}
// Every tier has a label
for (const t of tiersInOrder) {
  check(
    `tier label exists: ${t}`,
    typeof PROTEIN_TIER_LABELS[t] === "string" &&
      PROTEIN_TIER_LABELS[t].length > 0,
  );
}

// ============================================================
// 6. Per-meal protein
// ============================================================
console.log("\n[6] Per-meal protein");
check("perMealProtein(120) = 40", perMealProtein(120) === 40);
check("perMealProtein(150) = 50", perMealProtein(150) === 50);
check("perMealProtein(0) = 0", perMealProtein(0) === 0);

// ============================================================
// 7. Macro split
// ============================================================
console.log("\n[7] Macro split");
// 2000 cal, 150 g protein
// Protein: 150*4 = 600 kcal
// Fat: 25% * 2000 = 500 kcal → 56 g
// Carb: 2000 - 600 - 500 = 900 kcal → 225 g
{
  const m = macroSplit(2000, 150);
  check("2000kcal/150gP fat = 56g", m.fatGrams === 56);
  check("2000kcal/150gP carb = 225g", m.carbGrams === 225);
}
// Conservation: protein*4 + fat*9 + carb*4 ≈ targetCalories
{
  const m = macroSplit(2400, 180);
  const total = 180 * 4 + m.fatGrams * 9 + m.carbGrams * 4;
  check(
    "2400/180 macro conservation within 5 kcal",
    Math.abs(total - 2400) < 5,
  );
}
// Edge: zero protein (degenerate)
{
  const m = macroSplit(2000, 0);
  check("0g protein → 56g fat", m.fatGrams === 56);
  check("0g protein → 375g carb", m.carbGrams === 375);
}
// Edge: protein eats 100% of calories
{
  const m = macroSplit(800, 200); // 200*4 = 800 = all kcal
  // Fat would be 200 kcal, carb negative → clamped to 0
  check("100% protein cal: carbs not negative", m.carbGrams >= 0);
}

// ============================================================
// 8. Unit conversions
// ============================================================
console.log("\n[8] Unit conversions");
check("1 lb = 0.4536 kg", approx(lbToKg(1), 0.4536, 0.001));
check("1 kg = 2.2046 lb", approx(kgToLb(1), 2.2046, 0.001));
check(
  "lbToKg/kgToLb round-trip",
  approx(kgToLb(lbToKg(150)), 150, 1e-9),
);
check("1 in = 2.54 cm", approx(inToCm(1), 2.54, 1e-9));
check("1 cm = 0.3937 in", approx(cmToIn(1), 0.3937, 0.001));
check(
  "inToCm/cmToIn round-trip",
  approx(cmToIn(inToCm(70)), 70, 1e-9),
);

// ============================================================
// 9. Top-level calculation — realistic GLP-1 patient
// ============================================================
console.log("\n[9] Top-level — realistic GLP-1 patient");
{
  const r = calculateProtein({
    sex: "female",
    ageYears: 52,
    weightKg: 95,
    heightCm: 165,
    activity: "light",
    goal: "lose",
    onGlp1: true,
  });
  check("BMR > 0", r.bmr > 0);
  check("TDEE > BMR", r.tdee > r.bmr);
  check("targetCalories < TDEE (deficit)", r.targetCalories < r.tdee);
  check(
    "GLP-1 patient on lose → high-deficit-or-trained",
    r.proteinTier === "high-deficit-or-trained",
  );
  check(
    "protein recommended within tier range",
    r.proteinGramsRecommended >= 95 * 1.6 - 1 &&
      r.proteinGramsRecommended <= 95 * 2.0 + 1,
  );
  check("perMealProtein > 0", r.perMealProteinGrams > 0);
  check("fat > 0", r.fatGrams > 0);
  check("carb >= 0", r.carbGrams >= 0);
  check("weeklyChange = -0.45", r.weeklyWeightChangeKg === -0.45);
}

// ============================================================
// 10. Edge cases — invalid inputs
// ============================================================
console.log("\n[10] Edge cases");
{
  const r = calculateProtein({
    sex: "male",
    ageYears: 30,
    weightKg: 0,
    heightCm: 175,
    activity: "moderate",
    goal: "maintain",
    onGlp1: false,
  });
  check("weight=0 → bmr=0", r.bmr === 0);
}
{
  const r = calculateProtein({
    sex: "male",
    ageYears: 30,
    weightKg: 80,
    heightCm: -1,
    activity: "moderate",
    goal: "maintain",
    onGlp1: false,
  });
  check("height<0 → bmr=0", r.bmr === 0);
}
{
  const r = calculateProtein({
    sex: "male",
    ageYears: 200,
    weightKg: 80,
    heightCm: 175,
    activity: "moderate",
    goal: "maintain",
    onGlp1: false,
  });
  check("age>110 → bmr=0", r.bmr === 0);
}
{
  const r = calculateProtein({
    sex: "male",
    ageYears: 10,
    weightKg: 80,
    heightCm: 175,
    activity: "moderate",
    goal: "maintain",
    onGlp1: false,
  });
  check("age<14 → bmr=0", r.bmr === 0);
}

// ============================================================
// 11. Fuzz: 1000 iterations of random valid inputs
// ============================================================
console.log("\n[11] 1000-iteration fuzz");
const sexes: Sex[] = ["male", "female"];
const acts: ActivityLevel[] = [
  "sedentary",
  "light",
  "moderate",
  "very",
  "extreme",
];
const goals: Goal[] = ["lose", "maintain", "gain"];
let fuzzPassed = 0;
let fuzzInvariantFails = 0;
for (let i = 0; i < 1000; i++) {
  const sex = sexes[Math.floor(Math.random() * 2)];
  const ageYears = 18 + Math.floor(Math.random() * 65);
  const weightKg = 40 + Math.random() * 160;
  const heightCm = 140 + Math.random() * 65;
  const activity = acts[Math.floor(Math.random() * 5)];
  const goal = goals[Math.floor(Math.random() * 3)];
  const onGlp1 = Math.random() < 0.5;

  const r = calculateProtein({
    sex,
    ageYears,
    weightKg,
    heightCm,
    activity,
    goal,
    onGlp1,
  });
  let ok = true;
  // Invariant 1: BMR positive for valid inputs
  if (!(r.bmr > 0)) ok = false;
  // Invariant 2: TDEE >= BMR (sedentary multiplier ≥ 1.0)
  if (!(r.tdee >= r.bmr)) ok = false;
  // Invariant 3: protein recommended is within range
  const range = PROTEIN_TIER_RANGES[r.proteinTier];
  if (
    r.proteinGramsRecommended < weightKg * range.low - 1 ||
    r.proteinGramsRecommended > weightKg * range.high + 1
  )
    ok = false;
  // Invariant 4: macro conservation
  const macroKcal =
    r.proteinGramsRecommended * 4 + r.fatGrams * 9 + r.carbGrams * 4;
  if (Math.abs(macroKcal - r.targetCalories) > 10) ok = false;
  // Invariant 5: perMealProteinGrams ≈ recommended/3
  if (
    Math.abs(r.perMealProteinGrams - r.proteinGramsRecommended / 3) > 1
  )
    ok = false;
  // Invariant 6: targetCalories never below floor
  if (r.targetCalories < 1200) ok = false;

  if (ok) fuzzPassed++;
  else fuzzInvariantFails++;
}
check(
  `fuzz: 1000 iterations all invariants hold (${fuzzPassed} passed, ${fuzzInvariantFails} failed)`,
  fuzzInvariantFails === 0,
);

// ============================================================
// Summary
// ============================================================
console.log(`\n${"=".repeat(60)}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
if (failed > 0) {
  console.log("\nFailures:");
  failures.forEach((f) => console.log("  " + f));
  process.exit(1);
}
console.log("All tests passed.");
