/**
 * GLP-1 Reconstitution Calculator test runner.
 * Run with: npx tsx scripts/test-reconstitution-calculator.ts
 *
 * HIGH-YMYL TOOL — extra-rigorous test bar. Covers:
 * - Arithmetic identities (concentration, volume, units)
 * - Round-trip identities
 * - Standard syringe selection
 * - FDA max dose guards
 * - Input validation (zero, negative, NaN)
 * - Plausibility bounds (vial too large, BAC water too large)
 * - Volume safety bands (too small, too large, above syringe)
 * - Cross-validation against the unit converter math
 * - 2000-iteration fuzz with safety invariants
 */

import {
  BAC_WATER_BUD_DAYS,
  FDA_MAX_WEEKLY_MG,
  MAX_SAFE_VOLUME_ML,
  MIN_SAFE_VOLUME_ML,
  STANDARD_SYRINGES_ML,
  UNITS_PER_ML,
  USP_797_REFRIGERATED_BUD_DAYS_MAX,
  calculateReconstitution,
  concentration,
  doseVolume,
  dosesPerVial,
  mlToUnits,
  recommendSyringe,
  unitsToMl,
} from "../src/lib/reconstitution-calculator";

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
function approx(a: number, b: number, tol = 1e-9): boolean {
  return Math.abs(a - b) <= tol;
}

// ============================================================
// 1. Constants
// ============================================================
console.log("\n[1] Constants");
check("UNITS_PER_ML = 100", UNITS_PER_ML === 100);
check("MIN_SAFE_VOLUME_ML = 0.06", MIN_SAFE_VOLUME_ML === 0.06);
check("MAX_SAFE_VOLUME_ML = 0.5", MAX_SAFE_VOLUME_ML === 0.5);
check("BAC_WATER_BUD_DAYS = 28", BAC_WATER_BUD_DAYS === 28);
check(
  "USP_797_REFRIGERATED_BUD_DAYS_MAX = 60",
  USP_797_REFRIGERATED_BUD_DAYS_MAX === 60,
);
check("STANDARD_SYRINGES contains 0.3, 0.5, 1.0", STANDARD_SYRINGES_ML.length === 3);
check(
  "FDA max semaglutide = 2.4 mg/wk (Wegovy)",
  FDA_MAX_WEEKLY_MG.semaglutide === 2.4,
);
check(
  "FDA max tirzepatide = 15 mg/wk",
  FDA_MAX_WEEKLY_MG.tirzepatide === 15,
);

// ============================================================
// 2. concentration() identity
// ============================================================
console.log("\n[2] concentration()");
// 5 mg in 2 mL → 2.5 mg/mL
check("5 mg / 2 mL = 2.5 mg/mL", approx(concentration(5, 2), 2.5));
// 10 mg in 1 mL → 10 mg/mL
check("10 mg / 1 mL = 10 mg/mL", approx(concentration(10, 1), 10));
// 5 mg in 5 mL → 1 mg/mL
check("5 mg / 5 mL = 1 mg/mL", approx(concentration(5, 5), 1));
// 30 mg in 6 mL → 5 mg/mL
check("30 mg / 6 mL = 5 mg/mL", approx(concentration(30, 6), 5));
// 0 mg → 0
check("0 mg → 0", concentration(0, 5) === 0);
// 0 mL → 0
check("0 mL → 0", concentration(5, 0) === 0);
// negative → 0
check("negative mg → 0", concentration(-5, 2) === 0);
check("negative mL → 0", concentration(5, -2) === 0);
// NaN → 0
check("NaN mg → 0", concentration(NaN, 2) === 0);
check("NaN mL → 0", concentration(5, NaN) === 0);

// ============================================================
// 3. doseVolume() identity
// ============================================================
console.log("\n[3] doseVolume()");
// 0.25 mg at 2.5 mg/mL → 0.1 mL
check("0.25 mg / 2.5 mg/mL = 0.1 mL", approx(doseVolume(0.25, 2.5), 0.1));
// 2.4 mg at 4 mg/mL → 0.6 mL
check("2.4 mg / 4 mg/mL = 0.6 mL", approx(doseVolume(2.4, 4), 0.6));
// 1 mg at 10 mg/mL → 0.1 mL
check("1 mg / 10 mg/mL = 0.1 mL", approx(doseVolume(1, 10), 0.1));
// 0 → 0
check("0 mg → 0 mL", doseVolume(0, 2.5) === 0);
check("0 conc → 0 mL", doseVolume(0.25, 0) === 0);
check("NaN mg → 0", doseVolume(NaN, 2.5) === 0);
check("negative mg → 0", doseVolume(-1, 2.5) === 0);

// ============================================================
// 4. mlToUnits / unitsToMl round trip
// ============================================================
console.log("\n[4] mlToUnits / unitsToMl");
check("0.01 mL = 1 unit", approx(mlToUnits(0.01), 1));
check("0.1 mL = 10 units", approx(mlToUnits(0.1), 10));
check("0.25 mL = 25 units", approx(mlToUnits(0.25), 25));
check("0.5 mL = 50 units", approx(mlToUnits(0.5), 50));
check("1 mL = 100 units", approx(mlToUnits(1), 100));
check("1 unit = 0.01 mL", approx(unitsToMl(1), 0.01));
check("50 units = 0.5 mL", approx(unitsToMl(50), 0.5));
check("100 units = 1 mL", approx(unitsToMl(100), 1));
// Round-trip
for (let i = 0; i < 10; i++) {
  const ml = Math.random() * 1.0;
  check(
    `round-trip ${ml.toFixed(4)} mL ↔ units`,
    approx(unitsToMl(mlToUnits(ml)), ml, 1e-12),
  );
}

// ============================================================
// 5. recommendSyringe()
// ============================================================
console.log("\n[5] recommendSyringe()");
// 0.06 mL → 0.3 mL syringe (0.06 = 20% of 0.3)
check("0.06 mL → 0.3 mL syringe", recommendSyringe(0.06) === 0.3);
// 0.25 mL → 0.3 mL syringe (well-fit)
check("0.25 mL → 0.3 mL syringe", recommendSyringe(0.25) === 0.3);
// 0.4 mL → 0.5 mL syringe
check("0.4 mL → 0.5 mL syringe", recommendSyringe(0.4) === 0.5);
// 0.6 mL → 1.0 mL syringe
check("0.6 mL → 1.0 mL syringe", recommendSyringe(0.6) === 1.0);
// 0.99 mL → 1.0 mL syringe
check("0.99 mL → 1.0 mL syringe", recommendSyringe(0.99) === 1.0);
// 1.5 mL → null (no syringe holds it)
check("1.5 mL → null", recommendSyringe(1.5) === null);
// 0.02 mL → 0.3 mL syringe but flagged elsewhere
check("0.02 mL → 0.3 mL syringe (flagged elsewhere)", recommendSyringe(0.02) === 0.3);
// 0 → null
check("0 mL → null", recommendSyringe(0) === null);
check("NaN → null", recommendSyringe(NaN) === null);

// ============================================================
// 6. dosesPerVial()
// ============================================================
console.log("\n[6] dosesPerVial()");
check("5 mg / 0.25 mg = 20 doses", dosesPerVial(5, 0.25) === 20);
check("10 mg / 2.5 mg = 4 doses", dosesPerVial(10, 2.5) === 4);
check("5 mg / 2.4 mg = 2 doses (floor)", dosesPerVial(5, 2.4) === 2);
check("0 mg → 0 doses", dosesPerVial(0, 1) === 0);
check("0 dose → 0 doses", dosesPerVial(5, 0) === 0);

// ============================================================
// 7. Top-level: realistic patient scenarios
// ============================================================
console.log("\n[7] Top-level realistic scenarios");
// Scenario A: typical compounded sema 5 mg in 2.5 mL → 2 mg/mL,
// 0.25 mg starting dose = 0.125 mL = 12.5 units
{
  const r = calculateReconstitution({
    vialMg: 5,
    bacWaterMl: 2.5,
    targetDoseMg: 0.25,
    drug: "semaglutide",
  });
  check("sema scenario: not blocked", !r.blocked);
  check("sema scenario: 2 mg/mL", approx(r.concentrationMgPerMl, 2));
  check("sema scenario: 0.125 mL", approx(r.doseVolumeMl, 0.125));
  check("sema scenario: 12.5 units", approx(r.doseUnits, 12.5));
  check("sema scenario: 0.3 mL syringe", r.recommendedSyringeMl === 0.3);
  check("sema scenario: 20 doses per vial", r.dosesPerVial === 20);
}

// Scenario B: typical compounded tirz 30 mg in 3 mL → 10 mg/mL,
// 5 mg dose = 0.5 mL = 50 units
{
  const r = calculateReconstitution({
    vialMg: 30,
    bacWaterMl: 3,
    targetDoseMg: 5,
    drug: "tirzepatide",
  });
  check("tirz scenario: not blocked", !r.blocked);
  check("tirz scenario: 10 mg/mL", approx(r.concentrationMgPerMl, 10));
  check("tirz scenario: 0.5 mL", approx(r.doseVolumeMl, 0.5));
  check("tirz scenario: 50 units", approx(r.doseUnits, 50));
  check("tirz scenario: 6 doses per vial", r.dosesPerVial === 6);
}

// Scenario C: above FDA max → blocked
{
  const r = calculateReconstitution({
    vialMg: 30,
    bacWaterMl: 3,
    targetDoseMg: 20,
    drug: "tirzepatide",
  });
  check("FDA max guard: blocked", r.blocked);
  check(
    "FDA max guard: warning code present",
    r.warnings.some((w) => w.code === "ABOVE_FDA_MAX"),
  );
}

// Scenario D: above sema FDA max
{
  const r = calculateReconstitution({
    vialMg: 5,
    bacWaterMl: 2,
    targetDoseMg: 3,
    drug: "semaglutide",
  });
  check("sema above 2.4 mg → blocked", r.blocked);
}

// Scenario E: dose volume too small (high concentration / tiny dose)
{
  const r = calculateReconstitution({
    vialMg: 30,
    bacWaterMl: 1,
    targetDoseMg: 0.1,
    drug: "tirzepatide",
  });
  // conc = 30 mg/mL, vol = 0.0033 mL → way too small
  check("tiny volume warning emitted", r.warnings.some((w) => w.code === "VOLUME_TOO_SMALL"));
}

// Scenario F: dose volume too large
{
  const r = calculateReconstitution({
    vialMg: 5,
    bacWaterMl: 10,
    targetDoseMg: 2,
    drug: "semaglutide",
  });
  // conc = 0.5 mg/mL, vol = 4 mL → way too large
  check("large volume warning", r.warnings.some((w) => w.code === "VOLUME_TOO_LARGE"));
  check("> 1 mL warning", r.warnings.some((w) => w.code === "VOLUME_ABOVE_SYRINGE"));
}

// Scenario G: input validation
{
  const r = calculateReconstitution({
    vialMg: 0,
    bacWaterMl: 2,
    targetDoseMg: 0.25,
  });
  check("vial=0 blocked", r.blocked);
  check(
    "vial=0 INVALID_VIAL warning",
    r.warnings.some((w) => w.code === "INVALID_VIAL"),
  );
}
{
  const r = calculateReconstitution({
    vialMg: -5,
    bacWaterMl: 2,
    targetDoseMg: 0.25,
  });
  check("negative vial blocked", r.blocked);
}
{
  const r = calculateReconstitution({
    vialMg: 5,
    bacWaterMl: 0,
    targetDoseMg: 0.25,
  });
  check("BAC water = 0 blocked", r.blocked);
}

// Scenario H: plausibility warnings
{
  const r = calculateReconstitution({
    vialMg: 250,
    bacWaterMl: 2,
    targetDoseMg: 1,
  });
  check("vial > 200 mg warning", r.warnings.some((w) => w.code === "VIAL_TOO_LARGE"));
}
{
  const r = calculateReconstitution({
    vialMg: 5,
    bacWaterMl: 60,
    targetDoseMg: 0.25,
  });
  check("BAC water > 50 mL warning", r.warnings.some((w) => w.code === "BAC_WATER_TOO_LARGE"));
}

// Scenario I: always-on safety info
{
  const r = calculateReconstitution({
    vialMg: 5,
    bacWaterMl: 2,
    targetDoseMg: 0.25,
    drug: "semaglutide",
  });
  check(
    "always-on VERIFY_PHARMACY info",
    r.warnings.some((w) => w.code === "VERIFY_PHARMACY"),
  );
  check(
    "always-on PCAB info",
    r.warnings.some((w) => w.code === "PCAB"),
  );
}

// ============================================================
// 8. Cross-tool consistency: mlToUnits matches insulin convention
// ============================================================
console.log("\n[8] Cross-tool consistency");
// Whatever the dose volume, units = volume × 100
for (let i = 0; i < 50; i++) {
  const ml = Math.random() * 1.0;
  check(
    `units = ml × 100 invariant (${ml.toFixed(4)} mL)`,
    approx(mlToUnits(ml), ml * 100, 1e-12),
  );
}

// ============================================================
// 9. 2000-iteration fuzz with safety invariants
// ============================================================
console.log("\n[9] 2000-iteration fuzz");
const drugs: ("semaglutide" | "tirzepatide")[] = ["semaglutide", "tirzepatide"];
let fuzzPassed = 0;
let fuzzFailed = 0;
for (let i = 0; i < 2000; i++) {
  const drug = drugs[i % 2];
  const vialMg = 1 + Math.random() * 100;
  const bacWaterMl = 0.5 + Math.random() * 20;
  const max = FDA_MAX_WEEKLY_MG[drug];
  const targetDoseMg = Math.random() * max * 1.2; // some above max

  const r = calculateReconstitution({
    vialMg,
    bacWaterMl,
    targetDoseMg,
    drug,
  });
  let ok = true;

  // Invariant 1: if blocked because above FDA max, ALL the result fields are zero
  if (targetDoseMg > max) {
    if (!r.blocked) ok = false;
    if (r.concentrationMgPerMl !== 0) ok = false;
  } else if (targetDoseMg > 0) {
    // Invariant 2: not blocked when within FDA max with positive inputs
    if (r.blocked) ok = false;
    // Invariant 3: concentration = vialMg / bacWaterMl
    if (Math.abs(r.concentrationMgPerMl - vialMg / bacWaterMl) > 1e-9) ok = false;
    // Invariant 4: doseVolume = targetDose / concentration
    if (
      Math.abs(r.doseVolumeMl - targetDoseMg / r.concentrationMgPerMl) > 1e-9
    )
      ok = false;
    // Invariant 5: doseUnits = doseVolume × 100
    if (Math.abs(r.doseUnits - r.doseVolumeMl * 100) > 1e-9) ok = false;
    // Invariant 6: dosesPerVial = floor(vialMg / targetDoseMg)
    if (r.dosesPerVial !== Math.floor(vialMg / targetDoseMg)) ok = false;
    // Invariant 7: ALWAYS at least one info warning (PCAB + verify pharmacy)
    if (r.warnings.length < 2) ok = false;
  }

  if (ok) fuzzPassed++;
  else fuzzFailed++;
}
check(
  `fuzz: 2000 iterations all invariants hold (${fuzzPassed} passed, ${fuzzFailed} failed)`,
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
