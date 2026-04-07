/**
 * Tests for the savings calculator math.
 * Run with: npx tsx scripts/test-savings-calculator-2026.ts
 */

import {
  ACCESS_OPTIONS,
  compareCosts,
  getAccessOption,
  projectCost,
} from "../src/lib/savings-calculator-2026";

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
// 1. Access options registry
// ============================================================
console.log("\n[1] Access options");
check("ACCESS_OPTIONS has at least 10 entries", ACCESS_OPTIONS.length >= 10);
check("foundayo-self-pay = $149/mo", getAccessOption("foundayo-self-pay")?.defaultMonthlyCost === 149);
check("foundayo-insurance = $25/mo", getAccessOption("foundayo-insurance")?.defaultMonthlyCost === 25);
check("wegovy-novocare ≈ $499", getAccessOption("wegovy-novocare")?.defaultMonthlyCost === 499);
check("compounded-sema-cheap = $99", getAccessOption("compounded-sema-cheap")?.defaultMonthlyCost === 99);
check("Unknown ID returns undefined", getAccessOption("nonexistent" as never) === undefined);

// All entries have label, source, notes
for (const opt of ACCESS_OPTIONS) {
  check(`${opt.id} has label`, opt.label.length > 0);
  check(`${opt.id} has source`, opt.source.length > 0);
  check(`${opt.id} has notes`, opt.notes.length > 0);
  check(`${opt.id} has positive default cost`, opt.defaultMonthlyCost > 0);
}

// ============================================================
// 2. projectCost
// ============================================================
console.log("\n[2] projectCost");
check("$199/mo × 12 months = $2,388",
  projectCost(199, 12).totalCost === 2388);
check("$199/mo × 24 months = $4,776",
  projectCost(199, 24).totalCost === 4776);
check("$199/mo × 60 months = $11,940",
  projectCost(199, 60).totalCost === 11940);
check("$0/mo × 12 = $0", projectCost(0, 12).totalCost === 0);
check("Invalid mg returns 0", projectCost(NaN, 12).totalCost === 0);
check("Negative monthly returns 0", projectCost(-100, 12).totalCost === 0);
check("Zero months returns 0", projectCost(199, 0).totalCost === 0);

// ============================================================
// 3. compareCosts
// ============================================================
console.log("\n[3] compareCosts");

{
  // Baseline: Wegovy NovoCare $499. Alternative: compounded sema cheap $99.
  // Monthly savings = $400. Year 1 = $4,800. Year 5 = $24,000.
  const c = compareCosts(499, 99);
  check("499 vs 99 monthly savings = 400", c.monthlySavings === 400);
  check("499 vs 99 year 1 savings = 4800", c.yearOneSavings === 4800);
  check("499 vs 99 year 2 savings = 9600", c.yearTwoSavings === 9600);
  check("499 vs 99 year 5 savings = 24000", c.yearFiveSavings === 24000);
  check("499 vs 99 % savings ≈ 80.16%", approx(c.pctSavings, 80.16, 0.01));
}

{
  // Switch from Wegovy direct-pay $499 to Foundayo self-pay $149.
  // Monthly savings = $350. Year 1 = $4,200. Year 5 = $21,000.
  const c = compareCosts(499, 149);
  check("Wegovy direct → Foundayo monthly save = $350",
    c.monthlySavings === 350);
  check("Wegovy direct → Foundayo year 1 save = $4,200",
    c.yearOneSavings === 4200);
  check("Wegovy direct → Foundayo year 5 save = $21,000",
    c.yearFiveSavings === 21000);
}

{
  // Equal costs → zero savings
  const c = compareCosts(199, 199);
  check("equal costs save zero", c.monthlySavings === 0);
  check("equal costs year 5 save zero", c.yearFiveSavings === 0);
}

{
  // Negative case: alternative is MORE expensive
  // Baseline $25 (insurance), alternative $499 (self-pay) → savings = -$474
  const c = compareCosts(25, 499);
  check("more expensive alternative = negative savings",
    c.monthlySavings === -474);
  check("more expensive alternative year 1 = -$5,688",
    c.yearOneSavings === -5688);
}

{
  // Edge case: zero baseline
  const c = compareCosts(0, 100);
  check("zero baseline pct savings = 0", c.pctSavings === 0);
}

// ============================================================
// 4. Random fuzz
// ============================================================
console.log("\n[4] Random fuzz");
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
    const baseline = rand() * 1500;
    const alt = rand() * 1500;
    const c = compareCosts(baseline, alt);
    // Verify yearOneSavings always equals monthlySavings * 12
    if (approx(c.yearOneSavings, c.monthlySavings * 12, 0.01)) fuzzPass++;
  }
  check("1000 random comparisons preserve year=12*month identity",
    fuzzPass === 1000);
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
