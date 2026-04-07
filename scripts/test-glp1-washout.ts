/**
 * Tests for src/lib/glp1-washout.ts
 *
 * Run: npx tsx scripts/test-glp1-washout.ts
 */

import {
  DRUGS,
  RESIDUAL_TARGETS,
  timeToResidualHours,
  timeToResidualDays,
  residualFractionAt,
  formatDuration,
  residualMilestones,
  clinicalGuidanceForDrug,
  buildDecayCurve,
} from "../src/lib/glp1-washout";

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`  ok  ${name}`);
  } catch (err) {
    failed++;
    console.log(`  FAIL ${name}`);
    console.log(`       ${(err as Error).message}`);
  }
}

function assert(cond: unknown, msg: string) {
  if (!cond) throw new Error(msg);
}

function approx(actual: number, expected: number, tol: number, msg: string) {
  if (Math.abs(actual - expected) > tol) {
    throw new Error(`${msg}: expected ~${expected}, got ${actual}`);
  }
}

console.log("\nglp1-washout");

// ----------------------------------------------------------------
// Pure math
// ----------------------------------------------------------------
console.log("\n  timeToResidualHours");

test("50% target = 1 half-life", () => {
  approx(timeToResidualHours(168, 0.5), 168, 0.01, "168h");
  approx(timeToResidualHours(120, 0.5), 120, 0.01, "120h");
});

test("25% target = 2 half-lives", () => {
  approx(timeToResidualHours(168, 0.25), 336, 0.01, "336h");
});

test("12.5% target = 3 half-lives", () => {
  approx(timeToResidualHours(168, 0.125), 504, 0.01, "504h");
});

test("100% target = 0 hours", () => {
  approx(timeToResidualHours(168, 1.0), 0, 0.01, "0h");
});

test("0% target = Infinity", () => {
  assert(!Number.isFinite(timeToResidualHours(168, 0)), "expected Infinity");
});

test("returns 0 for zero half-life", () => {
  approx(timeToResidualHours(0, 0.5), 0, 0.01, "0h");
});

console.log("\n  residualFractionAt");

test("0 hours = 100%", () => {
  approx(residualFractionAt(0, 168), 1.0, 0.001, "100%");
});

test("1 half-life = 50%", () => {
  approx(residualFractionAt(168, 168), 0.5, 0.001, "50%");
});

test("2 half-lives = 25%", () => {
  approx(residualFractionAt(336, 168), 0.25, 0.001, "25%");
});

test("5 half-lives ≈ 3.125%", () => {
  approx(residualFractionAt(840, 168), 0.03125, 0.001, "3.125%");
});

test("10 half-lives ≈ 0.0977%", () => {
  approx(residualFractionAt(1680, 168), 0.0009766, 0.0001, "0.0977%");
});

test("negative time = 100%", () => {
  approx(residualFractionAt(-1, 168), 1.0, 0.001, "negative");
});

// ----------------------------------------------------------------
// Round-trip — fraction → time → fraction
// ----------------------------------------------------------------
console.log("\n  round-trip consistency");

test("round-trip semaglutide (168h)", () => {
  for (const t of [0.5, 0.25, 0.1, 0.05, 0.01, 0.001]) {
    const h = timeToResidualHours(168, t);
    const back = residualFractionAt(h, 168);
    approx(back, t, t * 0.01, `target ${t}`);
  }
});

test("round-trip tirzepatide (120h)", () => {
  for (const t of [0.5, 0.25, 0.1, 0.05, 0.01]) {
    const h = timeToResidualHours(120, t);
    const back = residualFractionAt(h, 120);
    approx(back, t, t * 0.01, `target ${t}`);
  }
});

test("round-trip orforglipron (36h)", () => {
  for (const t of [0.5, 0.25, 0.1, 0.05]) {
    const h = timeToResidualHours(36, t);
    const back = residualFractionAt(h, 36);
    approx(back, t, t * 0.01, `target ${t}`);
  }
});

// ----------------------------------------------------------------
// Specific clinical milestones
// ----------------------------------------------------------------
console.log("\n  clinical milestones");

test("semaglutide 5% takes ~30 days", () => {
  const d = timeToResidualDays(168, 0.05);
  approx(d, 30.27, 0.5, "5% sema");
});

test("tirzepatide 5% takes ~21.6 days", () => {
  const d = timeToResidualDays(120, 0.05);
  approx(d, 21.6, 0.5, "5% tirz");
});

test("semaglutide 1% takes ~46.5 days", () => {
  const d = timeToResidualDays(168, 0.01);
  approx(d, 46.5, 0.5, "1% sema");
});

test("orforglipron 5% takes ~6.5 days", () => {
  const d = timeToResidualDays(36, 0.05);
  approx(d, 6.48, 0.5, "5% orforg");
});

// ----------------------------------------------------------------
// formatDuration
// ----------------------------------------------------------------
console.log("\n  formatDuration");

test("sub-hour returns minutes", () => {
  assert(formatDuration(0.5) === "30 min", `got ${formatDuration(0.5)}`);
});

test("under 24h returns hours", () => {
  assert(formatDuration(12) === "12.0 hr", `got ${formatDuration(12)}`);
});

test("exactly 24h returns 1 day", () => {
  assert(formatDuration(24) === "1 day", `got ${formatDuration(24)}`);
});

test("48h returns 2 days", () => {
  assert(formatDuration(48) === "2 days", `got ${formatDuration(48)}`);
});

test("60h returns 2d 12h", () => {
  assert(formatDuration(60) === "2d 12h", `got ${formatDuration(60)}`);
});

test("very long returns days only", () => {
  assert(formatDuration(720) === "30 days", `got ${formatDuration(720)}`);
});

test("invalid returns dash", () => {
  assert(formatDuration(NaN) === "—", `got ${formatDuration(NaN)}`);
  assert(formatDuration(-1) === "—", `got ${formatDuration(-1)}`);
});

// ----------------------------------------------------------------
// residualMilestones
// ----------------------------------------------------------------
console.log("\n  residualMilestones");

test("returns one milestone per RESIDUAL_TARGETS entry", () => {
  const m = residualMilestones(168);
  assert(m.length === RESIDUAL_TARGETS.length, "length mismatch");
});

test("milestones are monotonically increasing in days", () => {
  const m = residualMilestones(168);
  for (let i = 1; i < m.length; i++) {
    assert(m[i].days > m[i - 1].days, `not increasing at ${i}`);
  }
});

test("milestone formatted is non-empty", () => {
  const m = residualMilestones(168);
  for (const x of m) {
    assert(x.formatted.length > 0, `empty formatted for ${x.label}`);
  }
});

// ----------------------------------------------------------------
// clinicalGuidanceForDrug
// ----------------------------------------------------------------
console.log("\n  clinicalGuidanceForDrug");

test("returns at least 5 scenarios per drug", () => {
  for (const drug of Object.values(DRUGS)) {
    const g = clinicalGuidanceForDrug(drug);
    assert(g.length >= 5, `${drug.id} got ${g.length}`);
  }
});

test("every scenario has all required fields", () => {
  for (const drug of Object.values(DRUGS)) {
    for (const g of clinicalGuidanceForDrug(drug)) {
      assert(g.scenario.length > 0, `${drug.id} missing scenario`);
      assert(g.description.length > 0, `${drug.id} missing description`);
      assert(g.recommendedDays >= 0, `${drug.id} bad days`);
      assert(
        g.fractionRemaining >= 0 && g.fractionRemaining <= 1,
        `${drug.id} bad fraction`,
      );
      assert(g.source.length > 0, `${drug.id} missing source`);
    }
  }
});

test("pre-surgery hold = 7 days for all weekly drugs", () => {
  for (const drug of Object.values(DRUGS)) {
    if (drug.intervalHours !== 168) continue;
    const g = clinicalGuidanceForDrug(drug);
    const surgery = g.find((s) => s.scenario.includes("surgery"));
    assert(surgery !== undefined, `${drug.id} no surgery scenario`);
    assert(surgery!.recommendedDays === 7, `${drug.id} not 7 days`);
  }
});

// ----------------------------------------------------------------
// buildDecayCurve
// ----------------------------------------------------------------
console.log("\n  buildDecayCurve");

test("starts at fraction 1.0", () => {
  const c = buildDecayCurve(168, 90);
  approx(c[0].fraction, 1.0, 0.001, "first point");
});

test("monotonically decreasing", () => {
  const c = buildDecayCurve(168, 90);
  for (let i = 1; i < c.length; i++) {
    assert(c[i].fraction <= c[i - 1].fraction, `not decreasing at ${i}`);
  }
});

test("curve has steps + 1 points", () => {
  const c = buildDecayCurve(168, 90, 90);
  assert(c.length === 91, `got ${c.length}`);
});

test("at one half-life, fraction is 0.5", () => {
  const c = buildDecayCurve(168, 7, 7); // 168h = 7 days, 7 steps
  approx(c[7].fraction, 0.5, 0.001, "1 half-life");
});

// ----------------------------------------------------------------
console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
