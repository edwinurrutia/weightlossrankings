/**
 * Exercise pairing configurator test runner.
 * Run with: npx tsx scripts/test-exercise-configurator.ts
 */

import {
  generateWeeklyTemplate,
  type ConfiguratorInput,
} from "../src/lib/exercise-configurator";

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

const baseInput: ConfiguratorInput = {
  fitnessLevel: "intermediate",
  ageBucket: "under-50",
  goal: "weight-loss",
  weekOnGlp1: "week-13-plus",
  hasGymAccess: true,
  availableDaysPerWeek: 5,
};

// 1. Basic generation
console.log("\n[1] Basic generation");
{
  const r = generateWeeklyTemplate(baseInput);
  check("returns weeklyTemplate array", Array.isArray(r.weeklyTemplate));
  check("weeklyTemplate non-empty", r.weeklyTemplate.length > 0);
  check("includes Resistance session", r.weeklyTemplate.some((s) => s.type === "Resistance"));
  check("includes Walking session", r.weeklyTemplate.some((s) => s.type === "Walking"));
  check("includes Mobility session", r.weeklyTemplate.some((s) => s.type === "Mobility"));
  check("dailyStepTarget = 10000 for under-50", r.dailyStepTarget === 10000);
  check("weeklyCardioMinutes = 250 for weight loss", r.weeklyCardioMinutes === 250);
  check("resistanceDaysPerWeek >= 2", r.resistanceDaysPerWeek >= 2);
  check("rationale is array", Array.isArray(r.rationale));
  check("caveats is array", Array.isArray(r.caveats));
}

// 2. Step target by age
console.log("\n[2] Step target by age");
{
  const u50 = generateWeeklyTemplate({ ...baseInput, ageBucket: "under-50" });
  const m = generateWeeklyTemplate({ ...baseInput, ageBucket: "50-64" });
  const o = generateWeeklyTemplate({ ...baseInput, ageBucket: "65-plus" });
  check("under-50 → 10,000 steps", u50.dailyStepTarget === 10000);
  check("50-64 → 8,500 steps", m.dailyStepTarget === 8500);
  check("65-plus → 7,500 steps", o.dailyStepTarget === 7500);
}

// 3. Cardio minutes by goal
console.log("\n[3] Cardio minutes by goal");
{
  const wl = generateWeeklyTemplate({ ...baseInput, goal: "weight-loss" });
  const lmp = generateWeeklyTemplate({ ...baseInput, goal: "lean-mass-preservation" });
  const m = generateWeeklyTemplate({ ...baseInput, goal: "maintenance" });
  check("weight-loss → 250 min/wk (intermediate)", wl.weeklyCardioMinutes === 250);
  check("lean-mass-preservation → 150 min/wk", lmp.weeklyCardioMinutes === 150);
  check("maintenance → 150 min/wk", m.weeklyCardioMinutes === 150);
}

// 4. Beginners get less cardio for weight loss
console.log("\n[4] Beginner gets reduced cardio");
{
  const beg = generateWeeklyTemplate({ ...baseInput, fitnessLevel: "beginner" });
  check("beginner weight-loss → 200 min/wk", beg.weeklyCardioMinutes === 200);
}

// 5. HIIT only for intermediate/advanced AND not in starting weeks
console.log("\n[5] HIIT logic");
{
  const adv = generateWeeklyTemplate({
    ...baseInput,
    fitnessLevel: "advanced",
    weekOnGlp1: "week-13-plus",
  });
  const beg = generateWeeklyTemplate({ ...baseInput, fitnessLevel: "beginner" });
  const start = generateWeeklyTemplate({ ...baseInput, weekOnGlp1: "starting" });
  check("advanced + week 13+ → has HIIT", adv.weeklyTemplate.some((s) => s.type === "HIIT"));
  check("beginner → no HIIT", !beg.weeklyTemplate.some((s) => s.type === "HIIT"));
  check("starting → no HIIT", !start.weeklyTemplate.some((s) => s.type === "HIIT"));
}

// 6. Resistance training days
console.log("\n[6] Resistance days");
{
  const lmp = generateWeeklyTemplate({
    ...baseInput,
    goal: "lean-mass-preservation",
    fitnessLevel: "advanced",
  });
  const beg = generateWeeklyTemplate({
    ...baseInput,
    goal: "maintenance",
    fitnessLevel: "beginner",
  });
  check("LMP advanced → 4 days RT", lmp.resistanceDaysPerWeek === 4);
  check("maintenance beginner → 2 days RT", beg.resistanceDaysPerWeek === 2);
}

// 7. Protein target tiers
console.log("\n[7] Protein target tiers");
{
  const lmp = generateWeeklyTemplate({
    ...baseInput,
    goal: "lean-mass-preservation",
  });
  const wl = generateWeeklyTemplate({ ...baseInput, goal: "weight-loss" });
  const m = generateWeeklyTemplate({ ...baseInput, goal: "maintenance" });
  check("LMP → 1.6-2.0 g/kg", lmp.proteinTargetGramsPerKg.low === 1.6 && lmp.proteinTargetGramsPerKg.high === 2.0);
  check("weight-loss → 1.4-1.8 g/kg", wl.proteinTargetGramsPerKg.low === 1.4 && wl.proteinTargetGramsPerKg.high === 1.8);
  check("maintenance → 1.2-1.6 g/kg", m.proteinTargetGramsPerKg.low === 1.2 && m.proteinTargetGramsPerKg.high === 1.6);
}

// 8. 65+ gets bumped to higher protein target
console.log("\n[8] 65+ protein bump");
{
  const olderMaint = generateWeeklyTemplate({
    ...baseInput,
    goal: "maintenance",
    ageBucket: "65-plus",
  });
  check("65+ maintenance → 1.6-2.0 g/kg", olderMaint.proteinTargetGramsPerKg.low === 1.6);
}

// 9. Caveats
console.log("\n[9] Caveats");
{
  const start = generateWeeklyTemplate({
    ...baseInput,
    weekOnGlp1: "starting",
  });
  check("starting → has 'first 4 weeks' caveat", start.caveats.some((c) => c.includes("First 4 weeks")));
  const beg = generateWeeklyTemplate({ ...baseInput, fitnessLevel: "beginner" });
  check("beginner → has technique caveat", beg.caveats.some((c) => c.includes("technique")));
  const old = generateWeeklyTemplate({ ...baseInput, ageBucket: "65-plus" });
  check("65+ → has PROT-AGE caveat", old.caveats.some((c) => c.includes("PROT-AGE")));
  // Murphy & Koehler caveat is universal
  check("All inputs → Murphy & Koehler caveat", start.caveats.some((c) => c.includes("Murphy")));
}

// 10. Estimated calorie burn is positive
console.log("\n[10] Calorie burn");
{
  const r = generateWeeklyTemplate(baseInput);
  check("estimatedWeeklyCalorieBurn > 0", r.estimatedWeeklyCalorieBurn > 0);
  check(
    "estimatedWeeklyCalorieBurn reasonable (< 5000)",
    r.estimatedWeeklyCalorieBurn < 5000,
  );
}

// Summary
console.log(`\n${"=".repeat(60)}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
if (failed > 0) {
  console.log("\nFailures:");
  failures.forEach((f) => console.log("  " + f));
  process.exit(1);
}
console.log("All tests passed.");
