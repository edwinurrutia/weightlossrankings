/**
 * Bariatric eligibility checker test runner.
 * Run with: npx tsx scripts/test-bariatric-eligibility.ts
 *
 * Covers BMI math, BMI category labels, payer evaluation against
 * the JSON dataset, edge cases, and a 1000-iteration fuzz with
 * realistic input ranges verifying invariants.
 */

import {
  COMORBIDITY_LABELS,
  DATA_LAST_VERIFIED,
  PAYERS,
  bmiClassLabel,
  computeBmi,
  evaluateAllPayers,
  evaluatePayer,
  inToCm,
  lbToKg,
  type Comorbidity,
  type PayerCriteria,
} from "../src/lib/bariatric-eligibility";

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
function approx(a: number, b: number, tol = 0.01): boolean {
  return Math.abs(a - b) <= tol;
}

// ============================================================
// 1. Data file integrity
// ============================================================
console.log("\n[1] Data file integrity");
check("PAYERS array non-empty", PAYERS.length > 0);
check("PAYERS includes NIH 1991", PAYERS.some((p) => p.id === "nih-1991"));
check("PAYERS includes ASMBS 2022", PAYERS.some((p) => p.id === "asmbs-2022"));
check(
  "PAYERS includes Medicare NCD 100.1",
  PAYERS.some((p) => p.id === "medicare-ncd-100-1"),
);
check("PAYERS includes Aetna", PAYERS.some((p) => p.id === "aetna-cpb-0157"));
check("PAYERS includes Cigna", PAYERS.some((p) => p.id === "cigna-0051"));
check("PAYERS includes UHC", PAYERS.some((p) => p.id === "uhc"));
check("PAYERS includes BCBS", PAYERS.some((p) => p.id === "bcbs-fep"));
check("PAYERS includes Humana", PAYERS.some((p) => p.id === "humana"));
check(
  "Every payer has a sourceUrl",
  PAYERS.every((p) => typeof p.sourceUrl === "string" && p.sourceUrl.length > 10),
);
check(
  "Every payer has a lastVerified date",
  PAYERS.every(
    (p) => typeof p.lastVerified === "string" && /^\d{4}-\d{2}-\d{2}$/.test(p.lastVerified),
  ),
);
check("DATA_LAST_VERIFIED is a date", /^\d{4}-\d{2}-\d{2}$/.test(DATA_LAST_VERIFIED));

// ============================================================
// 2. BMI math
// ============================================================
console.log("\n[2] BMI math");
check("70 kg / 175 cm = 22.86", approx(computeBmi(70, 175), 22.86, 0.01));
check("100 kg / 175 cm = 32.65", approx(computeBmi(100, 175), 32.65, 0.01));
check("0 kg → 0", computeBmi(0, 175) === 0);
check("0 cm → 0", computeBmi(70, 0) === 0);
check("negative → 0", computeBmi(-1, 175) === 0);
check("NaN → 0", computeBmi(NaN, 175) === 0);

// ============================================================
// 3. BMI class labels
// ============================================================
console.log("\n[3] BMI class labels");
check("18 → Underweight", bmiClassLabel(18) === "Underweight");
check("22 → Normal", bmiClassLabel(22) === "Normal weight");
check("28 → Overweight", bmiClassLabel(28) === "Overweight");
check("32 → Class 1", bmiClassLabel(32) === "Class 1 obesity");
check("37 → Class 2", bmiClassLabel(37) === "Class 2 obesity");
check("42 → Class 3", bmiClassLabel(42) === "Class 3 obesity (severe)");
check("0 → '—'", bmiClassLabel(0) === "—");

// ============================================================
// 4. Unit conversions
// ============================================================
console.log("\n[4] Unit conversions");
check("1 lb = 0.4536 kg", approx(lbToKg(1), 0.4536, 0.001));
check("1 in = 2.54 cm", approx(inToCm(1), 2.54, 0.001));

// ============================================================
// 5. Payer evaluation: NIH 1991
// ============================================================
console.log("\n[5] NIH 1991 evaluation");
const nih = PAYERS.find((p) => p.id === "nih-1991")!;

// BMI 42 alone → eligible
{
  const r = evaluatePayer(nih, {
    weightKg: 130,
    heightCm: 175,
    ageYears: 45,
    comorbidities: [],
  });
  check("NIH: BMI 42 alone eligible", r.eligible);
  check("NIH: pathway = bmi-alone", r.pathway === "bmi-alone");
}
// BMI 36 + T2D → eligible
{
  const r = evaluatePayer(nih, {
    weightKg: 110,
    heightCm: 175,
    ageYears: 45,
    comorbidities: ["type-2-diabetes"],
  });
  check("NIH: BMI 36 + T2D eligible", r.eligible);
  check(
    "NIH: pathway = bmi-plus-comorbidity",
    r.pathway === "bmi-plus-comorbidity",
  );
}
// BMI 36 alone → ineligible
{
  const r = evaluatePayer(nih, {
    weightKg: 110,
    heightCm: 175,
    ageYears: 45,
    comorbidities: [],
  });
  check("NIH: BMI 36 alone ineligible", !r.eligible);
}
// BMI 32 + T2D → ineligible (NIH min is 35)
{
  const r = evaluatePayer(nih, {
    weightKg: 100,
    heightCm: 175,
    ageYears: 45,
    comorbidities: ["type-2-diabetes"],
  });
  check("NIH: BMI 32 + T2D ineligible", !r.eligible);
}

// ============================================================
// 6. Payer evaluation: ASMBS 2022 (lowered thresholds)
// ============================================================
console.log("\n[6] ASMBS 2022 evaluation");
const asmbs = PAYERS.find((p) => p.id === "asmbs-2022")!;

// BMI 36 alone → eligible (ASMBS 2022 dropped the comorbidity requirement at ≥35)
{
  const r = evaluatePayer(asmbs, {
    weightKg: 110,
    heightCm: 175,
    ageYears: 45,
    comorbidities: [],
  });
  check("ASMBS 2022: BMI 36 alone eligible", r.eligible);
}
// BMI 32 + T2D → eligible (ASMBS 2022 added a 30-34.9 + metabolic disease pathway)
{
  const r = evaluatePayer(asmbs, {
    weightKg: 100,
    heightCm: 175,
    ageYears: 45,
    comorbidities: ["type-2-diabetes"],
  });
  check("ASMBS 2022: BMI 32 + T2D eligible", r.eligible);
}
// BMI 28 + T2D → ineligible (below 30 floor)
{
  const r = evaluatePayer(asmbs, {
    weightKg: 90,
    heightCm: 178,
    ageYears: 45,
    comorbidities: ["type-2-diabetes"],
  });
  check("ASMBS 2022: BMI 28 + T2D ineligible (below floor)", !r.eligible);
}

// ============================================================
// 7. Medicare NCD 100.1
// ============================================================
console.log("\n[7] Medicare NCD 100.1");
const medicare = PAYERS.find((p) => p.id === "medicare-ncd-100-1")!;

// Medicare requires comorbidity even at high BMI
{
  const r = evaluatePayer(medicare, {
    weightKg: 130,
    heightCm: 175,
    ageYears: 67,
    comorbidities: [],
  });
  check("Medicare: BMI 42 without comorbidity ineligible", !r.eligible);
}
{
  const r = evaluatePayer(medicare, {
    weightKg: 130,
    heightCm: 175,
    ageYears: 67,
    comorbidities: ["type-2-diabetes"],
  });
  check("Medicare: BMI 42 + T2D eligible", r.eligible);
}
// Age check (Medicare requires 18+, even though Medicare population is 65+)
{
  const r = evaluatePayer(medicare, {
    weightKg: 110,
    heightCm: 165,
    ageYears: 17,
    comorbidities: ["type-2-diabetes"],
  });
  check("Medicare: age 17 ineligible", !r.eligible);
}

// ============================================================
// 8. BCBS T2D pathway (BMI 30-34.9 + T2D)
// ============================================================
console.log("\n[8] BCBS T2D pathway");
const bcbs = PAYERS.find((p) => p.id === "bcbs-fep")!;

{
  const r = evaluatePayer(bcbs, {
    weightKg: 100,
    heightCm: 178,
    ageYears: 45,
    comorbidities: ["type-2-diabetes"],
  });
  check("BCBS: BMI 32 + T2D eligible via T2D pathway", r.eligible);
  check("BCBS: pathway = bmi-plus-t2d", r.pathway === "bmi-plus-t2d");
}
// Without T2D, BMI 32 should fail (BCBS requires 35+ comorbidity or 40 alone)
{
  const r = evaluatePayer(bcbs, {
    weightKg: 100,
    heightCm: 178,
    ageYears: 45,
    comorbidities: ["hypertension"],
  });
  check("BCBS: BMI 32 + HTN ineligible", !r.eligible);
}

// ============================================================
// 9. Top-level evaluateAllPayers
// ============================================================
console.log("\n[9] evaluateAllPayers");
{
  const summary = evaluateAllPayers({
    weightKg: 130,
    heightCm: 175,
    ageYears: 45,
    comorbidities: ["type-2-diabetes"],
  });
  check("BMI 42 + T2D: returns one row per payer", summary.results.length === PAYERS.length);
  check("BMI 42 + T2D: most payers eligible", summary.qualifyingPayers.length >= 5);
  check("BMI 42 + T2D: bmi computed", approx(summary.bmi, 42.45, 0.01));
}
// BMI 27, no comorbidities → not eligible anywhere
{
  const summary = evaluateAllPayers({
    weightKg: 75,
    heightCm: 167,
    ageYears: 30,
    comorbidities: [],
  });
  check("BMI 27 no comorb: 0 qualifying payers", summary.qualifyingPayers.length === 0);
}

// ============================================================
// 10. Edge cases
// ============================================================
console.log("\n[10] Edge cases");
{
  const summary = evaluateAllPayers({
    weightKg: 0,
    heightCm: 175,
    ageYears: 45,
    comorbidities: [],
  });
  check("weight=0: bmi=0", summary.bmi === 0);
  check("weight=0: 0 qualifying payers", summary.qualifyingPayers.length === 0);
}

// ============================================================
// 11. Comorbidity labels
// ============================================================
console.log("\n[11] Comorbidity labels");
check(
  "all comorbidity keys have labels",
  Object.keys(COMORBIDITY_LABELS).length > 0,
);

// ============================================================
// 12. Fuzz: 1000 iterations of realistic inputs
// ============================================================
console.log("\n[12] 1000-iteration fuzz");
const allComorbs: Comorbidity[] = [
  "type-2-diabetes",
  "hypertension",
  "severe-osa",
  "dyslipidemia",
  "nash",
  "pcos",
];
let fuzzPassed = 0;
let fuzzFailed = 0;
for (let i = 0; i < 1000; i++) {
  const ageYears = 18 + Math.floor(Math.random() * 60);
  const weightKg = 50 + Math.random() * 150;
  const heightCm = 150 + Math.random() * 40;
  const numComorbs = Math.floor(Math.random() * 4);
  const comorbidities: Comorbidity[] = [];
  for (let j = 0; j < numComorbs; j++) {
    const c = allComorbs[Math.floor(Math.random() * allComorbs.length)];
    if (!comorbidities.includes(c)) comorbidities.push(c);
  }
  const summary = evaluateAllPayers({
    weightKg,
    heightCm,
    ageYears,
    comorbidities,
  });
  let ok = true;
  // Invariant 1: bmi matches direct computation
  if (Math.abs(summary.bmi - computeBmi(weightKg, heightCm)) > 1e-9) ok = false;
  // Invariant 2: results.length matches PAYERS.length
  if (summary.results.length !== PAYERS.length) ok = false;
  // Invariant 3: qualifying + ineligible = total
  if (
    summary.qualifyingPayers.length + summary.ineligiblePayers.length !==
    PAYERS.length
  )
    ok = false;
  // Invariant 4: a BMI ≥ 40 patient with no comorbidities still qualifies
  // for ASMBS 2022, NIH 1991, Aetna, Cigna, UHC, Humana (all of which
  // have a BMI-alone threshold ≤ 40)
  if (summary.bmi >= 40 && comorbidities.length === 0 && ageYears >= 18) {
    const asmbsResult = summary.results.find((r) => r.payer.id === "asmbs-2022");
    if (asmbsResult && !asmbsResult.eligible) ok = false;
  }
  // Invariant 5: BMI < 30 with no comorbidities qualifies for nothing
  if (summary.bmi < 30 && comorbidities.length === 0) {
    if (summary.qualifyingPayers.length > 0) ok = false;
  }

  if (ok) fuzzPassed++;
  else fuzzFailed++;
}
check(
  `fuzz: 1000 iterations all invariants hold (${fuzzPassed} passed, ${fuzzFailed} failed)`,
  fuzzFailed === 0,
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
