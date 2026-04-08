/**
 * Supplement Evidence Grader test runner.
 * Run with: npx tsx scripts/test-supplement-evidence.ts
 *
 * Validates the JSON-backed supplement evidence dataset and the
 * library helpers that the /tools/supplement-evidence-grader tool
 * consumes. Lighter test bar than the dosing-math tools because
 * this tool is informational (no patient-facing math).
 */

import {
  ALL_CATEGORIES,
  DATA_LAST_VERIFIED,
  GRADE_ORDER,
  SUPPLEMENTS,
  compareByGrade,
  getSupplementById,
  gradeLabel,
} from "../src/lib/supplement-evidence";

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

// 1. Data file integrity
console.log("\n[1] Data file integrity");
check("SUPPLEMENTS array non-empty", SUPPLEMENTS.length > 0);
check("Has 16 supplement entries", SUPPLEMENTS.length === 16);
check(
  "DATA_LAST_VERIFIED is ISO date",
  /^\d{4}-\d{2}-\d{2}$/.test(DATA_LAST_VERIFIED),
);
check("Has berberine", SUPPLEMENTS.some((s) => s.id === "berberine"));
check("Has green tea", SUPPLEMENTS.some((s) => s.id === "green-tea"));
check("Has lemon-balm", SUPPLEMENTS.some((s) => s.id === "lemon-balm"));
check("Has l-lysine", SUPPLEMENTS.some((s) => s.id === "l-lysine"));
check("Has creatine", SUPPLEMENTS.some((s) => s.id === "creatine"));

// 2. Every supplement has required fields
console.log("\n[2] Required fields per supplement");
for (const s of SUPPLEMENTS) {
  check(
    `${s.id}: has name`,
    typeof s.name === "string" && s.name.length > 0,
  );
  check(
    `${s.id}: has mechanism`,
    typeof s.mechanism === "string" && s.mechanism.length > 0,
  );
  check(
    `${s.id}: has primaryStudy`,
    s.primaryStudy && typeof s.primaryStudy.weightEffect === "string",
  );
  check(
    `${s.id}: grade in valid set`,
    ["A", "B", "C", "D", "D-for-weight"].includes(s.grade),
  );
  check(
    `${s.id}: magnitudeVsGlp1Pct is finite >= 0`,
    typeof s.magnitudeVsGlp1Pct === "number" &&
      Number.isFinite(s.magnitudeVsGlp1Pct) &&
      s.magnitudeVsGlp1Pct >= 0,
  );
}

// 3. Grade A is rare and reserved
console.log("\n[3] Grade discipline");
const gradeA = SUPPLEMENTS.filter((s) => s.grade === "A");
check("Only one supplement reaches grade A", gradeA.length === 1);
check("That supplement is berberine", gradeA[0]?.id === "berberine");

// 4. Lemon balm and L-lysine are grade D (UNVERIFIED for weight)
console.log("\n[4] UNVERIFIED items correctly graded D");
const lemonBalm = getSupplementById("lemon-balm")!;
check("Lemon balm is grade D", lemonBalm.grade === "D");
check(
  "Lemon balm magnitude is 0",
  lemonBalm.magnitudeVsGlp1Pct === 0,
);
const lysine = getSupplementById("l-lysine")!;
check("L-lysine is grade D", lysine.grade === "D");
check(
  "L-lysine magnitude is 0",
  lysine.magnitudeVsGlp1Pct === 0,
);
check(
  "L-lysine primaryStudy.pmid is null",
  lysine.primaryStudy.pmid === null,
);

// 5. Creatine is correctly D-for-weight (not D)
console.log("\n[5] Creatine special case");
const creatine = getSupplementById("creatine")!;
check(
  "Creatine grade is D-for-weight",
  creatine.grade === "D-for-weight",
);
check(
  "Creatine has linkedArticleSlug to exercise pairing",
  creatine.linkedArticleSlug ===
    "exercise-pairing-glp1-lean-mass-preservation",
);

// 6. Berberine has linked article
console.log("\n[6] Cross-links");
const berberine = getSupplementById("berberine")!;
check(
  "Berberine links to dedicated article",
  berberine.linkedArticleSlug === "berberine-vs-glp1-evidence-review",
);

// 7. Sort order
console.log("\n[7] compareByGrade sort order");
const sorted = [...SUPPLEMENTS].sort(compareByGrade);
check("Sorted first is grade A", sorted[0].grade === "A");
check(
  "Sorted last is grade D",
  sorted[sorted.length - 1].grade === "D",
);

// 8. gradeLabel returns non-empty
console.log("\n[8] gradeLabel");
for (const g of GRADE_ORDER) {
  check(`gradeLabel(${g}) non-empty`, typeof gradeLabel(g) === "string" && gradeLabel(g).length > 0);
}

// 9. Categories
console.log("\n[9] Categories");
check("ALL_CATEGORIES non-empty", ALL_CATEGORIES.length > 0);
check("ALL_CATEGORIES sorted", ALL_CATEGORIES.every((c, i) => i === 0 || ALL_CATEGORIES[i - 1] <= c));

// 10. Magnitudes are reasonable (0-15% range vs GLP-1)
console.log("\n[10] Magnitudes plausible");
for (const s of SUPPLEMENTS) {
  check(
    `${s.id}: magnitudeVsGlp1Pct <= 15`,
    s.magnitudeVsGlp1Pct <= 15,
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
