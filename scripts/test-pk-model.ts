/**
 * Exhaustive test runner for the PK model used in the GLP-1 dose plotter.
 *
 * Run with:  npx tsx scripts/test-pk-model.ts
 *
 * Tests are deliberately many and cover:
 *   - Mathematical sanity (Bateman equation properties)
 *   - Half-life decay verification
 *   - Steady-state convergence
 *   - Titration schedule construction
 *   - Missed-dose simulation
 *   - Edge cases (zero dose, t=0, t→∞, ka=ke degenerate)
 *   - Per-drug correctness (sema, tirz, orfo)
 *   - Cross-drug invariants
 */

import {
  DRUGS,
  type DrugId,
  halfLifeToK,
  singleDoseConcentration,
  accumulatedConcentration,
  buildDoseSchedule,
  steadyStatePeak,
  simulateTitrationCurve,
  currentDoseAtWeek,
} from "../src/lib/pk-model";

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
// Section 1: rate-constant math
// ============================================================
console.log("\n[1] Half-life → rate constant conversion");
check(
  "halfLifeToK(7d) ≈ ln2/168",
  approx(halfLifeToK(168), Math.LN2 / 168, 1e-12),
);
check(
  "halfLifeToK(5d) ≈ ln2/120",
  approx(halfLifeToK(120), Math.LN2 / 120, 1e-12),
);
check(
  "After one half-life, exp(-k*t1/2) = 0.5",
  approx(Math.exp(-halfLifeToK(36) * 36), 0.5, 1e-12),
);

// ============================================================
// Section 2: single-dose Bateman equation properties
// ============================================================
console.log("\n[2] Single-dose Bateman equation");

const ka = halfLifeToK(24);
const ke = halfLifeToK(168);

check(
  "C(0) = 0 (nothing absorbed yet)",
  singleDoseConcentration(0, 1, ka, ke) === 0,
);
check(
  "C(-1) = 0 (negative time → 0)",
  singleDoseConcentration(-1, 1, ka, ke) === 0,
);
check(
  "C(t) = 0 when dose = 0",
  singleDoseConcentration(50, 0, ka, ke) === 0,
);
check(
  "C(t) > 0 for positive t and positive dose",
  singleDoseConcentration(24, 1, ka, ke) > 0,
);
check(
  "C(t) → 0 as t → ∞ (drug eliminated)",
  singleDoseConcentration(10000, 1, ka, ke) < 1e-6,
);

// Bateman peak occurs at tmax = ln(ka/ke) / (ka - ke) for ka != ke
const expectedTmax = Math.log(ka / ke) / (ka - ke);
let observedPeakT = 0;
let observedPeakC = 0;
for (let t = 0; t <= 200; t += 0.1) {
  const c = singleDoseConcentration(t, 1, ka, ke);
  if (c > observedPeakC) {
    observedPeakC = c;
    observedPeakT = t;
  }
}
check(
  "Bateman peak time matches analytical tmax",
  approx(observedPeakT, expectedTmax, 0.5),
  `expected ${expectedTmax.toFixed(2)}h, observed ${observedPeakT.toFixed(2)}h`,
);

// ============================================================
// Section 3: half-life decay verification
// ============================================================
console.log("\n[3] Half-life decay verification");

// For each drug, simulate a single dose, find Cmax, then check that
// concentration roughly halves every half-life past the peak.
for (const id of ["semaglutide", "tirzepatide", "orforglipron"] as DrugId[]) {
  const drug = DRUGS[id];
  const ka_d = halfLifeToK(drug.absorptionHalfLifeHours);
  const ke_d = halfLifeToK(drug.halfLifeHours);
  // Find peak
  let peakT = 0,
    peakC = 0;
  for (let t = 0; t <= 500; t += 0.5) {
    const c = singleDoseConcentration(t, drug.maintenanceDoseMg, ka_d, ke_d);
    if (c > peakC) {
      peakC = c;
      peakT = t;
    }
  }
  // After 1 half-life past peak, concentration should be roughly half
  const cAtOneHalfLife = singleDoseConcentration(
    peakT + drug.halfLifeHours,
    drug.maintenanceDoseMg,
    ka_d,
    ke_d,
  );
  const ratio = cAtOneHalfLife / peakC;
  // Should be slightly more than 0.5 in early phase (because absorption
  // also still contributes), but in the elimination-dominated phase it
  // approaches 0.5. We check it's in (0.4, 0.7).
  check(
    `${id}: 1 half-life past peak ratio in (0.4, 0.7)`,
    ratio > 0.4 && ratio < 0.7,
    `ratio = ${ratio.toFixed(3)}`,
  );
}

// ============================================================
// Section 4: steady-state convergence
// ============================================================
console.log("\n[4] Steady-state convergence");

// For each drug, repeated maintenance dosing should converge to a
// steady-state plateau. The peak after 5+ half-lives should be
// stable (next-cycle peak within 5%).
for (const id of ["semaglutide", "tirzepatide", "orforglipron"] as DrugId[]) {
  const drug = DRUGS[id];
  const dosesPerWeek = Math.round((7 * 24) / drug.intervalHours);
  const events = [];
  // 30 weeks of maintenance dosing
  for (let w = 0; w < 30; w++) {
    for (let n = 0; n < dosesPerWeek; n++) {
      events.push({
        tHours: w * 168 + n * drug.intervalHours,
        doseMg: drug.maintenanceDoseMg,
      });
    }
  }
  // Find peak in week 28 vs week 29 — should be within 5%
  const peakInWeek = (weekIdx: number) => {
    const start = weekIdx * 168;
    const end = start + 168;
    let p = 0;
    for (let t = start; t <= end; t += 1) {
      const c = accumulatedConcentration(t, events, drug);
      if (c > p) p = c;
    }
    return p;
  };
  const p28 = peakInWeek(28);
  const p29 = peakInWeek(29);
  const drift = Math.abs(p28 - p29) / p28;
  check(
    `${id}: steady-state achieved by week 28 (drift < 1%)`,
    drift < 0.01,
    `drift = ${(drift * 100).toFixed(3)}%`,
  );
}

// Verify steadyStatePeak() returns a positive value for each drug
for (const id of ["semaglutide", "tirzepatide", "orforglipron"] as DrugId[]) {
  const peak = steadyStatePeak(DRUGS[id]);
  check(
    `${id}: steadyStatePeak() returns positive value`,
    peak > 0,
    `peak = ${peak}`,
  );
}

// ============================================================
// Section 5: titration schedule construction
// ============================================================
console.log("\n[5] Titration schedule construction");

// Semaglutide should produce 1 dose per week
{
  const events = buildDoseSchedule(DRUGS.semaglutide, 8);
  check("semaglutide: 8 weeks → 8 dose events", events.length === 8);
  check("semaglutide: first dose at t=0", events[0].tHours === 0);
  check("semaglutide: dose interval = 168h", events[1].tHours === 168);
  check("semaglutide: first 4 doses are 0.25 mg", events.slice(0, 4).every((e) => e.doseMg === 0.25));
  check("semaglutide: doses 5-8 are 0.5 mg", events.slice(4, 8).every((e) => e.doseMg === 0.5));
}

// Tirzepatide should ramp through 6 dose levels
{
  const events = buildDoseSchedule(DRUGS.tirzepatide, 24);
  check("tirzepatide: 24 weeks → 24 events", events.length === 24);
  const doses = [...new Set(events.map((e) => e.doseMg))];
  check(
    "tirzepatide: 6 distinct dose levels in 24 weeks",
    doses.length === 6,
    `doses: ${doses.join(", ")}`,
  );
}

// Orforglipron should be 7 doses per week (daily oral)
{
  const events = buildDoseSchedule(DRUGS.orforglipron, 4);
  check(
    "orforglipron: 4 weeks → 28 daily dose events",
    events.length === 28,
    `actual = ${events.length}`,
  );
  check(
    "orforglipron: dose interval = 24h",
    events[1].tHours === 24,
  );
  check(
    "orforglipron: all 4 weeks at 0.8 mg",
    events.every((e) => e.doseMg === 0.8),
  );
}

// ============================================================
// Section 6: missed dose simulation
// ============================================================
console.log("\n[6] Missed dose simulation");

// Skip dose #4 of semaglutide (week 5, the first 0.5 mg dose)
{
  const normal = buildDoseSchedule(DRUGS.semaglutide, 12);
  const missed = buildDoseSchedule(DRUGS.semaglutide, 12, {
    missedDoseIndices: [4],
  });
  check(
    "semaglutide missed-dose: schedule has 1 fewer event",
    missed.length === normal.length - 1,
  );
  check(
    "semaglutide missed-dose: dose 4 is removed",
    !missed.some((e) => e.tHours === 4 * 168),
  );

  // The concentration at week 6 should be lower in the missed-dose case
  const tCheck = 6 * 168;
  const cNormal = accumulatedConcentration(tCheck, normal, DRUGS.semaglutide);
  const cMissed = accumulatedConcentration(tCheck, missed, DRUGS.semaglutide);
  check(
    "semaglutide missed-dose: concentration is lower at week 6",
    cMissed < cNormal,
    `normal=${cNormal.toFixed(3)} missed=${cMissed.toFixed(3)}`,
  );

  // After 2 more doses, concentrations should converge again
  const tRecover = 9 * 168;
  const cNormalR = accumulatedConcentration(tRecover, normal, DRUGS.semaglutide);
  const cMissedR = accumulatedConcentration(tRecover, missed, DRUGS.semaglutide);
  const recoveryGap = (cNormalR - cMissedR) / cNormalR;
  check(
    "semaglutide missed-dose: recovery within 25% by week 9",
    recoveryGap < 0.25,
    `recovery gap = ${(recoveryGap * 100).toFixed(1)}%`,
  );
}

// ============================================================
// Section 7: edge cases
// ============================================================
console.log("\n[7] Edge cases");

check(
  "ka == ke degenerate case returns finite value",
  Number.isFinite(singleDoseConcentration(10, 1, 0.1, 0.1)),
);
check(
  "ka == ke degenerate at t=0 returns 0",
  singleDoseConcentration(0, 1, 0.1, 0.1) === 0,
);
check(
  "ka == ke degenerate at t > 0 returns positive",
  singleDoseConcentration(5, 1, 0.1, 0.1) > 0,
);

check(
  "buildDoseSchedule with totalWeeks=0 returns empty",
  buildDoseSchedule(DRUGS.semaglutide, 0).length === 0,
);
check(
  "buildDoseSchedule with totalWeeks=1 returns 1 weekly dose",
  buildDoseSchedule(DRUGS.semaglutide, 1).length === 1,
);
check(
  "accumulatedConcentration with empty events returns 0",
  accumulatedConcentration(100, [], DRUGS.semaglutide) === 0,
);
check(
  "accumulatedConcentration with future dose only returns 0",
  accumulatedConcentration(0, [{ tHours: 100, doseMg: 1 }], DRUGS.semaglutide) === 0,
);

// ============================================================
// Section 8: simulateTitrationCurve full smoke test
// ============================================================
console.log("\n[8] simulateTitrationCurve smoke tests");

for (const id of ["semaglutide", "tirzepatide", "orforglipron"] as DrugId[]) {
  const points = simulateTitrationCurve(DRUGS[id], 24);
  // 24 weeks = 4032 hours; default step 6h → 4032/6 + 1 = 673 points
  check(
    `${id}: simulateTitrationCurve returns 673 points (6h step over 24w)`,
    points.length === 673,
    `actual = ${points.length}`,
  );
  check(
    `${id}: day 0 concentration is 0`,
    points[0].relativeConcentration === 0,
  );
  check(
    `${id}: every point has finite relativeConcentration`,
    points.every(
      (p) =>
        Number.isFinite(p.relativeConcentration) &&
        p.relativeConcentration >= 0,
    ),
  );
  check(
    `${id}: relative concentration eventually exceeds 0.5`,
    points.some((p) => p.relativeConcentration > 0.5),
  );
  check(
    `${id}: every point has currentDoseMg > 0 from day 1`,
    points.slice(1).every((p) => p.currentDoseMg > 0),
  );
}

// ============================================================
// Section 9: currentDoseAtWeek
// ============================================================
console.log("\n[9] currentDoseAtWeek");

check("sema week 0 = 0.25 mg", currentDoseAtWeek(DRUGS.semaglutide, 0) === 0.25);
check("sema week 3 = 0.25 mg", currentDoseAtWeek(DRUGS.semaglutide, 3) === 0.25);
check("sema week 4 = 0.5 mg", currentDoseAtWeek(DRUGS.semaglutide, 4) === 0.5);
check("sema week 7 = 0.5 mg", currentDoseAtWeek(DRUGS.semaglutide, 7) === 0.5);
check("sema week 8 = 1.0 mg", currentDoseAtWeek(DRUGS.semaglutide, 8) === 1.0);
check("sema week 16 = 2.4 mg (maintenance)", currentDoseAtWeek(DRUGS.semaglutide, 16) === 2.4);
check("sema week 200 = 2.4 mg", currentDoseAtWeek(DRUGS.semaglutide, 200) === 2.4);

check("tirz week 0 = 2.5 mg", currentDoseAtWeek(DRUGS.tirzepatide, 0) === 2.5);
check("tirz week 4 = 5 mg", currentDoseAtWeek(DRUGS.tirzepatide, 4) === 5);
check("tirz week 20 = 15 mg", currentDoseAtWeek(DRUGS.tirzepatide, 20) === 15);

check("orfo week 0 = 0.8 mg", currentDoseAtWeek(DRUGS.orforglipron, 0) === 0.8);
check("orfo week 20 = 17.2 mg", currentDoseAtWeek(DRUGS.orforglipron, 20) === 17.2);

// ============================================================
// Section 10: cross-drug invariants
// ============================================================
console.log("\n[10] Cross-drug invariants");

// All three drugs should reach steady state by ramp + 5 half-lives.
// We need to include the full titration ramp before SS testing because
// the ramp dose is below the maintenance dose.
for (const id of ["semaglutide", "tirzepatide", "orforglipron"] as DrugId[]) {
  const drug = DRUGS[id];
  const rampWeeks = drug.titration
    .filter((s) => s.weeks < 999)
    .reduce((sum, s) => sum + s.weeks, 0);
  const fiveHalfLivesWeeks = Math.ceil((5 * drug.halfLifeHours) / 168);
  const totalWeeks = rampWeeks + fiveHalfLivesWeeks + 4;
  const points = simulateTitrationCurve(drug, totalWeeks);
  // Find the max concentration in the last 2 weeks of the simulation
  // (to make sure we sweep across at least one full peak cycle)
  const samplesPerWeek = Math.ceil(points.length / totalWeeks);
  const lastWeekMax = points
    .slice(-samplesPerWeek * 2)
    .reduce((m, p) => Math.max(m, p.relativeConcentration), 0);
  check(
    `${id}: relative concentration approaches ~1.0 at maintenance steady state`,
    lastWeekMax > 0.85 && lastWeekMax < 1.5,
    `last week max = ${lastWeekMax.toFixed(3)}`,
  );
}

// Semaglutide accumulation ratio (Cmax SS / Cmax single) should be > 1
{
  const single = buildDoseSchedule(DRUGS.semaglutide, 1);
  const repeated = buildDoseSchedule(DRUGS.semaglutide, 30);
  let cmaxSingle = 0;
  for (let t = 0; t < 168; t += 1) {
    const c = accumulatedConcentration(t, single, DRUGS.semaglutide);
    if (c > cmaxSingle) cmaxSingle = c;
  }
  let cmaxSS = 0;
  for (let t = 28 * 168; t < 30 * 168; t += 1) {
    const c = accumulatedConcentration(t, repeated, DRUGS.semaglutide);
    if (c > cmaxSS) cmaxSS = c;
  }
  const accumulationRatio = cmaxSS / cmaxSingle;
  check(
    "semaglutide: SS accumulation ratio > 3 (long half-life confirms accumulation)",
    accumulationRatio > 3,
    `ratio = ${accumulationRatio.toFixed(2)}`,
  );
}

// ============================================================
// Section 11: stress test — many missed doses
// ============================================================
console.log("\n[11] Multiple missed dose stress test");

{
  // Skip every other dose
  const skipMany = buildDoseSchedule(DRUGS.semaglutide, 24, {
    missedDoseIndices: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
  });
  check(
    "semaglutide: 11 missed doses removes 11 events",
    skipMany.length === 24 - 11,
  );
  // Should still be finite and non-negative
  for (let day = 0; day <= 24 * 7; day++) {
    const c = accumulatedConcentration(day * 24, skipMany, DRUGS.semaglutide);
    if (!Number.isFinite(c) || c < 0) {
      check(
        `multi-miss day ${day}: concentration finite & non-negative`,
        false,
        `c = ${c}`,
      );
      break;
    }
  }
  check("multi-miss: all sampled days finite & non-negative", true);
}

// ============================================================
// Section 12: numerical stability — very long simulations
// ============================================================
console.log("\n[12] Long-simulation numerical stability");

{
  const long = simulateTitrationCurve(DRUGS.tirzepatide, 104); // 2 years
  // 104 weeks * 168 hours / 6 hour step + 1 = 2913
  check(
    "tirzepatide 104-week simulation: 2913 points",
    long.length === 2913,
    `actual = ${long.length}`,
  );
  check(
    "tirzepatide 104-week: every point finite",
    long.every((p) => Number.isFinite(p.relativeConcentration)),
  );
  // Steady state should be flat in the final 4 weeks
  const samplesPerWeek = Math.ceil(long.length / 104);
  const lastFourWeeks = long.slice(-samplesPerWeek * 4);
  const max = Math.max(...lastFourWeeks.map((p) => p.relativeConcentration));
  const min = Math.min(...lastFourWeeks.map((p) => p.relativeConcentration));
  check(
    "tirzepatide 104-week: final 4 weeks oscillate within normal range (max-min < 0.5)",
    max - min < 0.5,
    `range = ${(max - min).toFixed(3)}`,
  );
}

// ============================================================
// Section 13: random fuzz testing
// ============================================================
console.log("\n[13] Random fuzz testing (1000 iterations)");

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

{
  const rand = rng(42);
  let fuzzPasses = 0;
  let fuzzFails = 0;
  for (let i = 0; i < 1000; i++) {
    const drug = DRUGS[
      (["semaglutide", "tirzepatide", "orforglipron"] as DrugId[])[
        Math.floor(rand() * 3)
      ]
    ];
    const totalWeeks = 1 + Math.floor(rand() * 40);
    const numMissed = Math.floor(rand() * 3);
    const dosesPerWeek = Math.round((7 * 24) / drug.intervalHours);
    const totalDoses = totalWeeks * dosesPerWeek;
    const missed: number[] = [];
    for (let m = 0; m < numMissed; m++) {
      missed.push(Math.floor(rand() * totalDoses));
    }
    let allFinite = true;
    let allNonNeg = true;
    let monotonicWithinDose = true; // for early run-in (no missed)
    try {
      const points = simulateTitrationCurve(drug, totalWeeks, {
        missedDoseIndices: missed,
      });
      for (const p of points) {
        if (!Number.isFinite(p.relativeConcentration)) allFinite = false;
        if (p.relativeConcentration < 0) allNonNeg = false;
      }
    } catch {
      fuzzFails++;
      continue;
    }
    if (allFinite && allNonNeg) fuzzPasses++;
    else fuzzFails++;
  }
  check(
    "Fuzz: 1000 random simulations all finite and non-negative",
    fuzzFails === 0,
    `passes=${fuzzPasses} fails=${fuzzFails}`,
  );
}

// ============================================================
// Section 14: regression tests on known clinical landmarks
// ============================================================
console.log("\n[14] Clinical landmark regression");

// Semaglutide steady-state should be reached around 4-5 weeks of
// CONSTANT dosing (per FDA Wegovy PI). Verify by running 12 weeks of
// 2.4 mg directly without titration ramp.
{
  const events = [];
  for (let w = 0; w < 12; w++) {
    events.push({ tHours: w * 168, doseMg: DRUGS.semaglutide.maintenanceDoseMg });
  }
  const peak = steadyStatePeak(DRUGS.semaglutide);
  // Find the relative concentration at the END of week 5 (right before week 6 dose)
  const cWeek5 = accumulatedConcentration(5 * 168 - 1, events, DRUGS.semaglutide);
  const cWeek10 = accumulatedConcentration(10 * 168 - 1, events, DRUGS.semaglutide);
  const ratio = cWeek5 / cWeek10;
  check(
    "semaglutide direct dosing: trough at week 5 within 15% of week 10 trough (SS reached)",
    ratio > 0.85,
    `ratio = ${ratio.toFixed(3)}`,
  );
}

// Tirzepatide ~5 day half-life: week 4 of constant dosing should give
// accumulation factor in the expected range.
{
  const events = [];
  for (let w = 0; w < 8; w++) {
    events.push({ tHours: w * 168, doseMg: DRUGS.tirzepatide.maintenanceDoseMg });
  }
  // Cmax of dose 1 vs dose 4
  let cmax1 = 0;
  for (let t = 0; t < 168; t += 1) {
    const c = accumulatedConcentration(t, [events[0]], DRUGS.tirzepatide);
    if (c > cmax1) cmax1 = c;
  }
  let cmax4 = 0;
  for (let t = 3 * 168; t < 4 * 168; t += 1) {
    const c = accumulatedConcentration(t, events, DRUGS.tirzepatide);
    if (c > cmax4) cmax4 = c;
  }
  const accumulation = cmax4 / cmax1;
  check(
    "tirzepatide week 4 accumulation factor in (1.5, 4.0)",
    accumulation > 1.5 && accumulation < 4.0,
    `accumulation = ${accumulation.toFixed(2)}`,
  );
}

// Orforglipron daily oral: trough/peak ratio at SS should be > 0.5
// because t1/2 36h > dosing interval 24h
{
  const events = [];
  for (let d = 0; d < 30; d++) {
    events.push({ tHours: d * 24, doseMg: DRUGS.orforglipron.maintenanceDoseMg });
  }
  // SS reached by day 8+. Sample peak and trough on day 25.
  let peak = 0;
  let trough = Infinity;
  for (let t = 25 * 24; t < 26 * 24; t += 0.25) {
    const c = accumulatedConcentration(t, events, DRUGS.orforglipron);
    if (c > peak) peak = c;
    if (c < trough) trough = c;
  }
  const ratio = trough / peak;
  check(
    "orforglipron daily SS: trough/peak ratio > 0.5 (long half-life vs short interval)",
    ratio > 0.5,
    `ratio = ${ratio.toFixed(3)}`,
  );
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
