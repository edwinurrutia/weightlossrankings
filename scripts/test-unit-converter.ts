/**
 * Exhaustive test runner for the GLP-1 unit converter math.
 *
 * Run with:  npx tsx scripts/test-unit-converter.ts
 *
 * Tests the mg ↔ units conversion at the heart of the
 * /tools/glp1-unit-converter page. The math is simple but the
 * stakes are high: a patient relying on this for dose calculation
 * needs the answer to be exactly correct, so we test:
 *   - Round-trip identity (mg → units → mg)
 *   - Known clinical landmark values
 *   - Edge cases (zero, negative, NaN, Infinity)
 *   - Common-dose tables for both drugs at all common concentrations
 *   - 1000-iteration random fuzz with round-trip verification
 *   - Inverse tables match forward conversion
 */

import {
  COMMON_CONCENTRATIONS,
  COMMON_UNIT_VALUES,
  STANDARD_TITRATION_DOSES,
  buildConversionTable,
  buildInverseTable,
  mgToUnits,
  roundToHalfUnit,
  unitsToMg,
  unitsToMl,
  type DrugName,
} from "../src/lib/unit-converter";

let passed = 0;
let failed = 0;
const failures: string[] = [];

function check(name: string, condition: boolean, detail?: string) {
  if (condition) {
    passed++;
  } else {
    failed++;
    failures.push(`FAIL: ${name}${detail ? " — " + detail : ""}`);
  }
}

function approx(a: number, b: number, tol = 1e-9): boolean {
  return Math.abs(a - b) <= tol;
}

// ============================================================
// Section 1: Bidirectional formula sanity
// ============================================================
console.log("\n[1] Forward and inverse formula sanity");

// 1 mL = 100 units regardless of concentration
check("1 mL = 100 units (U-100 syringe definition)", unitsToMl(100) === 1);
check("0.5 mL = 50 units", unitsToMl(50) === 0.5);
check("0.01 mL = 1 unit", unitsToMl(1) === 0.01);
check("0 units = 0 mL", unitsToMl(0) === 0);

// Concentration math: mg = units * c / 100
check(
  "100 units of 1 mg/mL = 1 mg",
  approx(unitsToMg(100, 1), 1),
);
check(
  "50 units of 2 mg/mL = 1 mg",
  approx(unitsToMg(50, 2), 1),
);
check(
  "10 units of 2.5 mg/mL = 0.25 mg",
  approx(unitsToMg(10, 2.5), 0.25),
);
check(
  "20 units of 2.5 mg/mL = 0.5 mg",
  approx(unitsToMg(20, 2.5), 0.5),
);
check(
  "40 units of 2.5 mg/mL = 1.0 mg",
  approx(unitsToMg(40, 2.5), 1),
);
check(
  "50 units of 10 mg/mL = 5 mg",
  approx(unitsToMg(50, 10), 5),
);

// Inverse direction
check("1 mg at 1 mg/mL = 100 units", approx(mgToUnits(1, 1), 100));
check("0.25 mg at 2.5 mg/mL = 10 units", approx(mgToUnits(0.25, 2.5), 10));
check("0.5 mg at 2.5 mg/mL = 20 units", approx(mgToUnits(0.5, 2.5), 20));
check("1.0 mg at 2.5 mg/mL = 40 units", approx(mgToUnits(1.0, 2.5), 40));
check("1.7 mg at 2.5 mg/mL = 68 units", approx(mgToUnits(1.7, 2.5), 68));
check("2.4 mg at 2.5 mg/mL = 96 units", approx(mgToUnits(2.4, 2.5), 96));
check("2.4 mg at 5 mg/mL = 48 units", approx(mgToUnits(2.4, 5), 48));
check("5 mg at 10 mg/mL = 50 units", approx(mgToUnits(5, 10), 50));
check("15 mg at 10 mg/mL = 150 units (off-syringe)", approx(mgToUnits(15, 10), 150));
check("15 mg at 5 mg/mL = 300 units (very off-syringe)", approx(mgToUnits(15, 5), 300));

// ============================================================
// Section 2: Round-trip identity
// ============================================================
console.log("\n[2] Round-trip identity (mg → units → mg)");

const testConcentrations = [1, 2, 2.5, 5, 7.5, 10, 12.5, 15];
const testDoses = [0.1, 0.25, 0.5, 1, 1.5, 2, 2.4, 5, 7.5, 10, 15];

for (const c of testConcentrations) {
  for (const mg of testDoses) {
    const u = mgToUnits(mg, c);
    const back = unitsToMg(u, c);
    check(
      `round-trip ${mg} mg @ ${c} mg/mL`,
      approx(back, mg, 1e-9),
      `mg=${mg} units=${u} back=${back}`,
    );
  }
}

// ============================================================
// Section 3: Edge cases
// ============================================================
console.log("\n[3] Edge cases");

check("mgToUnits(0, 2.5) = 0", mgToUnits(0, 2.5) === 0);
check("unitsToMg(0, 2.5) = 0", unitsToMg(0, 2.5) === 0);
check("mgToUnits(-1, 2.5) = NaN", Number.isNaN(mgToUnits(-1, 2.5)));
check("unitsToMg(-1, 2.5) = NaN", Number.isNaN(unitsToMg(-1, 2.5)));
check("mgToUnits(1, 0) = NaN (zero concentration)", Number.isNaN(mgToUnits(1, 0)));
check("mgToUnits(1, -1) = NaN (negative concentration)", Number.isNaN(mgToUnits(1, -1)));
check("mgToUnits(NaN, 2.5) = NaN", Number.isNaN(mgToUnits(NaN, 2.5)));
check("mgToUnits(Infinity, 2.5) = NaN", Number.isNaN(mgToUnits(Infinity, 2.5)));
check("unitsToMl(-1) = NaN", Number.isNaN(unitsToMl(-1)));
check("roundToHalfUnit(10.3) = 10.5", roundToHalfUnit(10.3) === 10.5);
check("roundToHalfUnit(10.2) = 10", roundToHalfUnit(10.2) === 10);
check("roundToHalfUnit(10.74) = 10.5", roundToHalfUnit(10.74) === 10.5);
check("roundToHalfUnit(10.76) = 11", roundToHalfUnit(10.76) === 11);

// ============================================================
// Section 4: Known clinical landmark conversions (semaglutide)
// ============================================================
console.log("\n[4] Semaglutide clinical landmarks");

// Wegovy starting dose 0.25 mg, common compounded conc 2.5 mg/mL
check(
  "Wegovy start 0.25 mg @ 2.5 mg/mL → 10 units",
  approx(mgToUnits(0.25, 2.5), 10),
);
// Wegovy Wk 5-8: 0.5 mg
check(
  "Wegovy 0.5 mg @ 2.5 mg/mL → 20 units",
  approx(mgToUnits(0.5, 2.5), 20),
);
// Wegovy Wk 9-12: 1 mg
check(
  "Wegovy 1.0 mg @ 2.5 mg/mL → 40 units",
  approx(mgToUnits(1.0, 2.5), 40),
);
// Wegovy Wk 13-16: 1.7 mg
check(
  "Wegovy 1.7 mg @ 2.5 mg/mL → 68 units",
  approx(mgToUnits(1.7, 2.5), 68),
);
// Wegovy maintenance: 2.4 mg
check(
  "Wegovy 2.4 mg @ 2.5 mg/mL → 96 units",
  approx(mgToUnits(2.4, 2.5), 96),
);
// At 5 mg/mL the same dose halves on the syringe
check(
  "Wegovy 2.4 mg @ 5 mg/mL → 48 units",
  approx(mgToUnits(2.4, 5), 48),
);

// ============================================================
// Section 5: Tirzepatide clinical landmarks
// ============================================================
console.log("\n[5] Tirzepatide clinical landmarks");

// Zepbound start 2.5 mg
check(
  "Zepbound 2.5 mg @ 5 mg/mL → 50 units",
  approx(mgToUnits(2.5, 5), 50),
);
check(
  "Zepbound 2.5 mg @ 10 mg/mL → 25 units",
  approx(mgToUnits(2.5, 10), 25),
);
// Zepbound 5 mg
check(
  "Zepbound 5 mg @ 10 mg/mL → 50 units",
  approx(mgToUnits(5, 10), 50),
);
// Zepbound 7.5 mg
check(
  "Zepbound 7.5 mg @ 10 mg/mL → 75 units",
  approx(mgToUnits(7.5, 10), 75),
);
// Zepbound 10 mg
check(
  "Zepbound 10 mg @ 10 mg/mL → 100 units (full syringe)",
  approx(mgToUnits(10, 10), 100),
);
// Zepbound 12.5 mg — exceeds syringe capacity
check(
  "Zepbound 12.5 mg @ 10 mg/mL → 125 units (must split)",
  approx(mgToUnits(12.5, 10), 125),
);
// Zepbound 15 mg maintenance
check(
  "Zepbound 15 mg @ 10 mg/mL → 150 units (must split)",
  approx(mgToUnits(15, 10), 150),
);

// ============================================================
// Section 6: Common patient queries from Ahrefs data
// ============================================================
console.log("\n[6] Direct Ahrefs query answers");

// "how many mg is 40 units of semaglutide" — 2,500/mo, KD 0
// Answer depends on concentration
check(
  "40 units sema @ 2.5 mg/mL = 1.0 mg",
  approx(unitsToMg(40, 2.5), 1.0),
);
check(
  "40 units sema @ 5 mg/mL = 2.0 mg",
  approx(unitsToMg(40, 5), 2.0),
);

// "how many mg is 50 units of semaglutide" — 1,700/mo
check(
  "50 units sema @ 2.5 mg/mL = 1.25 mg",
  approx(unitsToMg(50, 2.5), 1.25),
);
check(
  "50 units sema @ 5 mg/mL = 2.5 mg",
  approx(unitsToMg(50, 5), 2.5),
);

// "20 units of semaglutide is how many mg" — 2,100/mo
check(
  "20 units sema @ 2.5 mg/mL = 0.5 mg",
  approx(unitsToMg(20, 2.5), 0.5),
);
check(
  "20 units sema @ 5 mg/mL = 1.0 mg",
  approx(unitsToMg(20, 5), 1.0),
);

// "how many units is 2.5 mg of tirzepatide" — 3,600/mo
check(
  "2.5 mg tirz @ 5 mg/mL = 50 units",
  approx(mgToUnits(2.5, 5), 50),
);
check(
  "2.5 mg tirz @ 10 mg/mL = 25 units",
  approx(mgToUnits(2.5, 10), 25),
);

// "how many units is 5 mg of tirzepatide" — 1,000/mo
check(
  "5 mg tirz @ 5 mg/mL = 100 units (full syringe)",
  approx(mgToUnits(5, 5), 100),
);
check(
  "5 mg tirz @ 10 mg/mL = 50 units",
  approx(mgToUnits(5, 10), 50),
);

// "how many mg is 40 units of tirzepatide" — 1,400/mo
check(
  "40 units tirz @ 10 mg/mL = 4 mg",
  approx(unitsToMg(40, 10), 4),
);
check(
  "40 units tirz @ 5 mg/mL = 2 mg",
  approx(unitsToMg(40, 5), 2),
);

// "how many mg is 20 units of tirzepatide" — 1,200/mo
check(
  "20 units tirz @ 10 mg/mL = 2 mg",
  approx(unitsToMg(20, 10), 2),
);

// ============================================================
// Section 7: Conversion table builder
// ============================================================
console.log("\n[7] Conversion table builder");

{
  const semaTable = buildConversionTable("semaglutide");
  check(
    "sema table has 5 dose rows",
    semaTable.length === 5,
  );
  check(
    "sema table first row is 0.25 mg",
    semaTable[0].doseMg === 0.25,
  );
  check(
    "sema table 0.25 mg @ 2.5 mg/mL = 10 units",
    semaTable[0].perConcentration[0].units === 10,
  );
  check(
    "sema table 2.4 mg @ 5 mg/mL = 48 units",
    semaTable[4].perConcentration[1].units === 48,
  );
}

{
  const tirzTable = buildConversionTable("tirzepatide");
  check(
    "tirz table has 6 dose rows",
    tirzTable.length === 6,
  );
  check(
    "tirz table 2.5 mg @ 10 mg/mL = 25 units",
    tirzTable[0].perConcentration[1].units === 25,
  );
  check(
    "tirz table 15 mg @ 10 mg/mL = 150 units",
    tirzTable[5].perConcentration[1].units === 150,
  );
}

{
  const semaInverse = buildInverseTable("semaglutide");
  check(
    "sema inverse table has 8 unit rows",
    semaInverse.length === COMMON_UNIT_VALUES.length,
  );
  // 40 units row
  const fortyRow = semaInverse.find((r) => r.units === 40);
  check(
    "sema inverse: 40 units @ 2.5 mg/mL = 1 mg",
    fortyRow !== undefined && approx(fortyRow.perConcentration[0].mg, 1),
  );
  check(
    "sema inverse: 40 units @ 5 mg/mL = 2 mg",
    fortyRow !== undefined && approx(fortyRow.perConcentration[1].mg, 2),
  );
}

// ============================================================
// Section 8: Random fuzz testing
// ============================================================
console.log("\n[8] Random fuzz (1000 iterations)");

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
  let fuzzFail = 0;
  for (let i = 0; i < 1000; i++) {
    const mg = rand() * 30; // 0-30 mg range
    const c = 0.5 + rand() * 19.5; // 0.5-20 mg/mL
    const u = mgToUnits(mg, c);
    const back = unitsToMg(u, c);
    if (Number.isFinite(u) && Number.isFinite(back) && approx(back, mg, 1e-9)) {
      fuzzPass++;
    } else {
      fuzzFail++;
    }
  }
  check(
    `Fuzz: 1000 random round-trips all preserve mg value`,
    fuzzFail === 0,
    `passes=${fuzzPass} fails=${fuzzFail}`,
  );
}

// ============================================================
// Section 9: Cross-reference safety checks
// ============================================================
console.log("\n[9] Cross-reference safety checks");

// Common concentrations are sane
check("sema common concentrations are [2.5, 5]",
  JSON.stringify(COMMON_CONCENTRATIONS.semaglutide) === JSON.stringify([2.5, 5]));
check("tirz common concentrations are [5, 10]",
  JSON.stringify(COMMON_CONCENTRATIONS.tirzepatide) === JSON.stringify([5, 10]));
check("sema standard doses include 0.25 and 2.4",
  STANDARD_TITRATION_DOSES.semaglutide.includes(0.25) &&
  STANDARD_TITRATION_DOSES.semaglutide.includes(2.4));
check("tirz standard doses include 2.5 and 15",
  STANDARD_TITRATION_DOSES.tirzepatide.includes(2.5) &&
  STANDARD_TITRATION_DOSES.tirzepatide.includes(15));

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
