/**
 * BMI calculator test runner.
 * Run with: npx tsx scripts/test-bmi.ts
 */

import {
  BMI_CATEGORIES,
  bmiAfterLoss,
  calculateBmi,
  categorize,
  categoryAfterLoss,
  isGlp1Eligible,
  kgToLb,
  lbToKg,
} from "../src/lib/bmi";

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
function approx(a: number, b: number, tol = 0.05): boolean {
  return Math.abs(a - b) <= tol;
}

// ============================================================
// 1. Unit conversions
// ============================================================
console.log("\n[1] Unit conversions");
check("1 kg = 2.2046 lb", approx(kgToLb(1), 2.2046, 0.001));
check("1 lb = 0.4536 kg", approx(lbToKg(1), 0.4536, 0.001));
check("100 lb = 45.36 kg round-trip", approx(lbToKg(100), 45.359237, 0.001));
check("kgToLb(lbToKg(150)) round-trip", approx(kgToLb(lbToKg(150)), 150, 1e-9));

// ============================================================
// 2. WHO category boundaries
// ============================================================
console.log("\n[2] WHO BMI categories");
check("BMI 17 = underweight", categorize(17) === "underweight");
check("BMI 18.4 = underweight", categorize(18.4) === "underweight");
check("BMI 18.5 = normal", categorize(18.5) === "normal");
check("BMI 22 = normal", categorize(22) === "normal");
check("BMI 24.99 = normal", categorize(24.99) === "normal");
check("BMI 25 = overweight", categorize(25) === "overweight");
check("BMI 29.9 = overweight", categorize(29.9) === "overweight");
check("BMI 30 = obese class 1", categorize(30) === "obese-class-1");
check("BMI 34.9 = obese class 1", categorize(34.9) === "obese-class-1");
check("BMI 35 = obese class 2", categorize(35) === "obese-class-2");
check("BMI 39.9 = obese class 2", categorize(39.9) === "obese-class-2");
check("BMI 40 = obese class 3", categorize(40) === "obese-class-3");
check("BMI 50 = obese class 3", categorize(50) === "obese-class-3");
check("BMI 0 returns normal (degenerate)", categorize(0) === "normal");
check("BMI NaN returns normal", categorize(NaN) === "normal");

// All categories defined
for (const key of Object.keys(BMI_CATEGORIES)) {
  check(
    `BMI_CATEGORIES has label for ${key}`,
    typeof BMI_CATEGORIES[key as keyof typeof BMI_CATEGORIES].label ===
      "string",
  );
}

// ============================================================
// 3. calculateBmi() — metric
// ============================================================
console.log("\n[3] calculateBmi metric");

{
  // 70 kg, 175 cm → BMI 22.86
  const r = calculateBmi(70, 175, "metric");
  check("70 kg + 175 cm BMI ≈ 22.86", approx(r.bmi, 22.86));
  check("70 kg + 175 cm category = normal", r.category === "normal");
}
{
  // 100 kg, 175 cm → BMI 32.65
  const r = calculateBmi(100, 175, "metric");
  check("100 kg + 175 cm BMI ≈ 32.65", approx(r.bmi, 32.65));
  check("100 kg + 175 cm = obese class 1", r.category === "obese-class-1");
}
{
  // 130 kg, 170 cm → BMI 44.98
  const r = calculateBmi(130, 170, "metric");
  check("130 kg + 170 cm BMI ≈ 44.98", approx(r.bmi, 44.98));
  check("130 kg + 170 cm = obese class 3", r.category === "obese-class-3");
}

// ============================================================
// 4. calculateBmi() — imperial
// ============================================================
console.log("\n[4] calculateBmi imperial");

{
  // 154 lb, 5'9" (69 in) → ≈22.74
  const r = calculateBmi(154, 69, "imperial");
  check("154 lb 5'9\" BMI ≈ 22.74", approx(r.bmi, 22.74, 0.1));
  check("154 lb 5'9\" = normal", r.category === "normal");
}
{
  // 220 lb, 5'9" (69 in) → ≈32.5
  const r = calculateBmi(220, 69, "imperial");
  check("220 lb 5'9\" BMI ≈ 32.5", approx(r.bmi, 32.5, 0.1));
  check("220 lb 5'9\" = obese class 1", r.category === "obese-class-1");
}
{
  // 200 lb, 5'5" (65 in) → ≈33.27
  const r = calculateBmi(200, 65, "imperial");
  check("200 lb 5'5\" BMI ≈ 33.27", approx(r.bmi, 33.27, 0.1));
  check("200 lb 5'5\" = obese class 1", r.category === "obese-class-1");
}

// ============================================================
// 5. Edge cases
// ============================================================
console.log("\n[5] Edge cases");

{
  const r = calculateBmi(0, 175, "metric");
  check("zero weight returns 0 BMI", r.bmi === 0);
}
{
  const r = calculateBmi(70, 0, "metric");
  check("zero height returns 0 BMI", r.bmi === 0);
}
{
  const r = calculateBmi(-10, 175, "metric");
  check("negative weight returns 0 BMI", r.bmi === 0);
}
{
  const r = calculateBmi(NaN, 175, "metric");
  check("NaN weight returns 0 BMI", r.bmi === 0);
}

// ============================================================
// 6. bmiAfterLoss
// ============================================================
console.log("\n[6] bmiAfterLoss");

check("BMI 35 - 14.9% (STEP-1) → 29.78", approx(bmiAfterLoss(35, 14.9), 29.78));
check("BMI 35 - 20.9% (SURMOUNT-1) → 27.685", approx(bmiAfterLoss(35, 20.9), 27.685));
check("BMI 40 - 14.9% (STEP-1) → 34.04", approx(bmiAfterLoss(40, 14.9), 34.04));
check("BMI 40 - 20.9% (SURMOUNT-1) → 31.64", approx(bmiAfterLoss(40, 20.9), 31.64));
check("BMI 30 - 0% loss = 30", bmiAfterLoss(30, 0) === 30);
check("BMI 30 - 100% loss = 0", bmiAfterLoss(30, 100) === 0);
check("Invalid BMI returns 0", bmiAfterLoss(0, 14.9) === 0);

// Category transitions
check(
  "BMI 35 with STEP-1 14.9% loss → drops to overweight (29.78)",
  categoryAfterLoss(35, 14.9) === "overweight",
);
check(
  "BMI 35 with SURMOUNT-1 20.9% loss → overweight",
  categoryAfterLoss(35, 20.9) === "overweight",
);
check(
  "BMI 40 with STEP-1 14.9% loss → obese class 1 (just barely)",
  categoryAfterLoss(40, 14.9) === "obese-class-1",
);

// ============================================================
// 7. GLP-1 eligibility
// ============================================================
console.log("\n[7] GLP-1 eligibility (Wegovy/Zepbound)");

{
  const e = isGlp1Eligible(28);
  check("BMI 28 — eligible with comorbidity, not without",
    e.eligibleWithComorbidity && !e.eligibleNoComorbidity);
}
{
  const e = isGlp1Eligible(27);
  check("BMI 27 — eligible with comorbidity, not without",
    e.eligibleWithComorbidity && !e.eligibleNoComorbidity);
}
{
  const e = isGlp1Eligible(26.9);
  check("BMI 26.9 — not eligible either way",
    !e.eligibleWithComorbidity && !e.eligibleNoComorbidity);
}
{
  const e = isGlp1Eligible(30);
  check("BMI 30 — eligible both ways",
    e.eligibleWithComorbidity && e.eligibleNoComorbidity);
}

// ============================================================
// 8. Random fuzz
// ============================================================
console.log("\n[8] Random fuzz");
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
{
  const rand = rng(42);
  let fuzzPass = 0;
  for (let i = 0; i < 1000; i++) {
    const w = 30 + rand() * 200;
    const h = 140 + rand() * 80;
    const r = calculateBmi(w, h, "metric");
    if (Number.isFinite(r.bmi) && r.bmi > 0) fuzzPass++;
  }
  check("1000 random metric inputs all return finite BMI", fuzzPass === 1000);
}

// ============================================================
// Summary
// ============================================================
console.log("\n" + "=".repeat(60));
console.log(`Total: ${passed + failed}  passed: ${passed}  failed: ${failed}`);
console.log("=".repeat(60));
if (failed > 0) {
  console.log("\nFailures:");
  failures.forEach((f) => console.log("  " + f));
  process.exit(1);
} else {
  console.log("\nAll tests passed.");
  process.exit(0);
}
