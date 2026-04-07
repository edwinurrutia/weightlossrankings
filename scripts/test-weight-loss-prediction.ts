/**
 * Test runner for the weight loss prediction model.
 * Run with: npx tsx scripts/test-weight-loss-prediction.ts
 *
 * Tests:
 *   - Published trial endpoints match within tolerance
 *   - Linear interpolation sanity
 *   - Edge cases (week 0, negative, beyond max)
 *   - Per-drug curve shape (monotonic non-decreasing)
 *   - Starting weight × % math
 *   - Bacteriostatic water volume math
 */

import {
  TRIAL_DATA,
  type DrugId,
  predictMeanLossPct,
  predict,
  buildPredictionCurve,
  bacWaterVolumeMl,
} from "../src/lib/weight-loss-prediction";

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

function approx(a: number, b: number, tol: number): boolean {
  return Math.abs(a - b) <= tol;
}

// ============================================================
// Section 1: Published endpoints match
// ============================================================
console.log("\n[1] Published trial endpoints");

check(
  "semaglutide STEP-1 wk 68 endpoint = 14.9%",
  predictMeanLossPct("semaglutide", 68) === 14.9,
);
check(
  "tirzepatide SURMOUNT-1 wk 72 endpoint = 20.9%",
  predictMeanLossPct("tirzepatide", 72) === 20.9,
);
check(
  "orforglipron ATTAIN-1 wk 72 endpoint = 12.4%",
  predictMeanLossPct("orforglipron", 72) === 12.4,
);

// ============================================================
// Section 2: Week 0 and edge
// ============================================================
console.log("\n[2] Edge cases");

for (const id of ["semaglutide", "tirzepatide", "orforglipron"] as DrugId[]) {
  check(`${id} week 0 = 0%`, predictMeanLossPct(id, 0) === 0);
  check(`${id} week -1 clamps to 0`, predictMeanLossPct(id, -1) === 0);
  check(`${id} week NaN returns 0`, predictMeanLossPct(id, NaN) === 0);
}
check(
  "semaglutide week 999 clamps to final endpoint",
  predictMeanLossPct("semaglutide", 999) === 14.9,
);
check(
  "tirzepatide week 999 clamps to final endpoint",
  predictMeanLossPct("tirzepatide", 999) === 20.9,
);

// ============================================================
// Section 3: Monotonic non-decreasing curves
// ============================================================
console.log("\n[3] Curve shape (monotonic non-decreasing)");

for (const id of ["semaglutide", "tirzepatide", "orforglipron"] as DrugId[]) {
  const curve = TRIAL_DATA[id].curve;
  let ok = true;
  for (let i = 1; i < curve.length; i++) {
    if (curve[i].meanLossPct < curve[i - 1].meanLossPct) {
      ok = false;
      break;
    }
  }
  check(`${id} curve is monotonic non-decreasing`, ok);
}

// ============================================================
// Section 4: Interpolation sanity
// ============================================================
console.log("\n[4] Linear interpolation");

// Midpoint between week 4 (1.5%) and week 8 (3%) for sema = week 6 → 2.25%
check(
  "sema week 6 interpolates between 4 and 8",
  approx(predictMeanLossPct("semaglutide", 6), 2.25, 0.01),
);

// Midpoint week 12 to week 16 for sema: (6 + 8) / 2 = 7 at week 14
check(
  "sema week 14 interpolates between 12 and 16",
  approx(predictMeanLossPct("semaglutide", 14), 7, 0.01),
);

// Midpoint week 20 (10) to week 28 (12) = 11 at week 24
check(
  "sema week 24 interpolates between 20 and 28",
  approx(predictMeanLossPct("semaglutide", 24), 11, 0.01),
);

// Tirzepatide week 6 (between 2% @ wk 4 and 4% @ wk 8) = 3%
check(
  "tirz week 6 interpolates to 3%",
  approx(predictMeanLossPct("tirzepatide", 6), 3, 0.01),
);

// ============================================================
// Section 5: predict() with starting weight
// ============================================================
console.log("\n[5] predict() with starting weight");

{
  const p = predict(200, "semaglutide", 68);
  check(
    "200 lb @ sema wk 68: meanPct = 14.9",
    p.meanPct === 14.9,
  );
  check(
    "200 lb @ sema wk 68: mean loss ~= 29.8 lb",
    approx(p.meanLossAbsolute, 29.8, 0.01),
  );
  check(
    "200 lb @ sema wk 68: end weight = 170.2 lb",
    approx(p.meanEndWeight, 170.2, 0.01),
  );
  check("low < mean < high for 200 lb sema wk 68",
    p.lowPct < p.meanPct && p.meanPct < p.highPct);
}

{
  const p = predict(250, "tirzepatide", 72);
  check(
    "250 lb @ tirz wk 72: meanPct = 20.9",
    p.meanPct === 20.9,
  );
  check(
    "250 lb @ tirz wk 72: mean loss = 52.25 lb",
    approx(p.meanLossAbsolute, 52.25, 0.01),
  );
}

{
  const p = predict(180, "orforglipron", 72);
  check(
    "180 lb @ orforglipron wk 72: mean loss = 22.32 lb",
    approx(p.meanLossAbsolute, 22.32, 0.01),
  );
}

// ============================================================
// Section 6: Starting weight edge cases
// ============================================================
console.log("\n[6] predict() edge cases");

{
  const p = predict(0, "semaglutide", 68);
  check("zero starting weight returns zero loss", p.meanLossAbsolute === 0);
  check("zero starting weight returns zero pct", p.meanPct === 0);
}
{
  const p = predict(-50, "semaglutide", 68);
  check("negative starting weight returns zero loss", p.meanLossAbsolute === 0);
}
{
  const p = predict(NaN, "semaglutide", 68);
  check("NaN starting weight returns zero loss", p.meanLossAbsolute === 0);
}

// ============================================================
// Section 7: Range width sanity
// ============================================================
console.log("\n[7] Low/high range");

{
  const p = predict(200, "semaglutide", 68);
  const spread = p.highPct - p.lowPct;
  check(
    "sema wk 68 range spread > 0",
    spread > 0,
  );
  check(
    "sema wk 68 low >= 0",
    p.lowPct >= 0,
  );
  check(
    "sema wk 68 range is symmetric around mean (within 0.01)",
    approx((p.highPct + p.lowPct) / 2, p.meanPct, 0.01),
  );
}

// Early weeks should have minimum spread of 2pp (1 pct each side)
{
  const p = predict(200, "semaglutide", 4);
  check(
    "sema wk 4 has minimum 1 pct spread",
    p.highPct - p.meanPct >= 1,
  );
}

// ============================================================
// Section 8: buildPredictionCurve
// ============================================================
console.log("\n[8] Prediction curve builder");

{
  const curve = buildPredictionCurve(200, "semaglutide");
  check(
    "sema curve has multiple points",
    curve.length >= 9,
  );
  check(
    "sema curve first point is week 0",
    curve[0].week === 0,
  );
  check(
    "sema curve last point is week 68",
    curve[curve.length - 1].week === 68,
  );
  check(
    "sema curve endpoint % matches final",
    curve[curve.length - 1].meanPct === 14.9,
  );
  // Verify curve is monotonic non-decreasing on the predicted %
  let monotonic = true;
  for (let i = 1; i < curve.length; i++) {
    if (curve[i].meanPct < curve[i - 1].meanPct) {
      monotonic = false;
      break;
    }
  }
  check("sema prediction curve is monotonic non-decreasing", monotonic);
}

{
  const curve = buildPredictionCurve(250, "tirzepatide");
  check(
    "tirz curve ends at week 72",
    curve[curve.length - 1].week === 72,
  );
  check(
    "tirz curve endpoint mean = 20.9%",
    curve[curve.length - 1].meanPct === 20.9,
  );
}

// ============================================================
// Section 9: Bacteriostatic water volume
// ============================================================
console.log("\n[9] Bacteriostatic water volume");

check("5 mg + 2.5 mg/mL target = 2 mL water", bacWaterVolumeMl(5, 2.5) === 2);
check("10 mg + 2.5 mg/mL = 4 mL water", bacWaterVolumeMl(10, 2.5) === 4);
check("10 mg + 5 mg/mL = 2 mL water", bacWaterVolumeMl(10, 5) === 2);
check("20 mg + 10 mg/mL = 2 mL water", bacWaterVolumeMl(20, 10) === 2);
check("30 mg + 10 mg/mL = 3 mL water", bacWaterVolumeMl(30, 10) === 3);
check("40 mg + 10 mg/mL = 4 mL water", bacWaterVolumeMl(40, 10) === 4);
check(
  "bacWater invalid mg = NaN",
  Number.isNaN(bacWaterVolumeMl(-1, 2.5)),
);
check(
  "bacWater zero concentration = NaN",
  Number.isNaN(bacWaterVolumeMl(5, 0)),
);

// ============================================================
// Section 10: Tirzepatide larger than sema at every week
// ============================================================
console.log("\n[10] Cross-drug invariants");

// Tirzepatide should produce equal or larger weight loss than sema
// at every week of therapy (SURMOUNT-1 consistently outperforms
// STEP-1 in head-to-head comparison).
{
  const weeks = [4, 8, 12, 16, 20, 28, 40, 52, 68];
  let allGood = true;
  for (const w of weeks) {
    const sema = predictMeanLossPct("semaglutide", w);
    const tirz = predictMeanLossPct("tirzepatide", w);
    if (tirz < sema) {
      allGood = false;
      break;
    }
  }
  check("tirzepatide >= semaglutide at every tested week", allGood);
}

// Orforglipron should be less than tirzepatide at every week (Zepbound
// outperforms Foundayo in trial-arm magnitude)
{
  const weeks = [4, 8, 12, 16, 20, 28, 40, 52, 68];
  let allGood = true;
  for (const w of weeks) {
    const orfo = predictMeanLossPct("orforglipron", w);
    const tirz = predictMeanLossPct("tirzepatide", w);
    if (orfo > tirz) {
      allGood = false;
      break;
    }
  }
  check("orforglipron <= tirzepatide at every tested week", allGood);
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
