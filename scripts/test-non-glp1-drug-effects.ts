/**
 * Non-GLP-1 drug weight-effect lookup test runner.
 * Run with: npx tsx scripts/test-non-glp1-drug-effects.ts
 */

import {
  ALL_DRUG_CLASSES,
  DATA_LAST_VERIFIED,
  DRUGS,
  compareByWeightDirection,
  getDrugById,
  searchDrugs,
} from "../src/lib/non-glp1-drug-effects";

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
check("DRUGS array non-empty", DRUGS.length > 0);
check("DRUGS has 20 entries", DRUGS.length === 20);
check(
  "DATA_LAST_VERIFIED is ISO date",
  /^\d{4}-\d{2}-\d{2}$/.test(DATA_LAST_VERIFIED),
);

// 2. Required fields per drug
console.log("\n[2] Required fields per drug");
for (const d of DRUGS) {
  check(`${d.id}: name`, typeof d.name === "string" && d.name.length > 0);
  check(
    `${d.id}: drugClass`,
    typeof d.drugClass === "string" && d.drugClass.length > 0,
  );
  check(
    `${d.id}: brandNames is array`,
    Array.isArray(d.brandNames),
  );
  check(
    `${d.id}: weightDirection valid`,
    ["loss", "gain", "neutral"].includes(d.weightDirection),
  );
  check(`${d.id}: has primaryStudy`, !!d.primaryStudy);
  check(
    `${d.id}: has interactionWithGlp1`,
    typeof d.interactionWithGlp1 === "string",
  );
}

// 3. Key drugs present
console.log("\n[3] Key drugs present");
check("metformin", !!getDrugById("metformin"));
check("phentermine", !!getDrugById("phentermine"));
check("vyvanse", !!getDrugById("vyvanse"));
check("jardiance", !!getDrugById("jardiance"));
check("hrt-estrogen", !!getDrugById("hrt-estrogen"));
check("paroxetine", !!getDrugById("paroxetine"));
check("rosiglitazone", !!getDrugById("rosiglitazone"));

// 4. FDA approval flags
console.log("\n[4] FDA approval flags");
const fdaApprovedWeightLoss = DRUGS.filter((d) => d.fdaApprovedForWeightLoss);
check(
  "Phentermine FDA-approved for weight loss",
  getDrugById("phentermine")?.fdaApprovedForWeightLoss === true,
);
check(
  "Qsymia FDA-approved for weight loss",
  getDrugById("qsymia")?.fdaApprovedForWeightLoss === true,
);
check(
  "Contrave FDA-approved for weight loss",
  getDrugById("naltrexone-bupropion")?.fdaApprovedForWeightLoss === true,
);
check(
  "Vyvanse NOT FDA-approved for weight loss",
  getDrugById("vyvanse")?.fdaApprovedForWeightLoss === false,
);
check(
  "Adderall NOT FDA-approved for weight loss",
  getDrugById("adderall")?.fdaApprovedForWeightLoss === false,
);
check(
  "Metformin NOT FDA-approved for weight loss",
  getDrugById("metformin")?.fdaApprovedForWeightLoss === false,
);
check(
  "At least 3 drugs FDA-approved for weight loss",
  fdaApprovedWeightLoss.length >= 3,
);

// 5. Weight direction sanity
console.log("\n[5] Weight direction sanity");
check(
  "Metformin is weight loss",
  getDrugById("metformin")?.weightDirection === "loss",
);
check(
  "Mirtazapine is weight gain",
  getDrugById("mirtazapine")?.weightDirection === "gain",
);
check(
  "Rosiglitazone is weight gain",
  getDrugById("rosiglitazone")?.weightDirection === "gain",
);
check(
  "HRT is weight neutral",
  getDrugById("hrt-estrogen")?.weightDirection === "neutral",
);
check(
  "Vortioxetine is weight neutral",
  getDrugById("vortioxetine")?.weightDirection === "neutral",
);

// 6. Search
console.log("\n[6] Search");
check("search 'wellbutrin' finds bupropion", searchDrugs("wellbutrin").length === 1);
check("search 'topamax' finds topiramate", searchDrugs("topamax").length === 1);
check("search 'jardiance' finds empagliflozin", searchDrugs("jardiance").length === 1);
check("search '' returns all", searchDrugs("").length === DRUGS.length);
check("search 'sglt2' finds 2 entries", searchDrugs("sglt2").length === 2);

// 7. Sort
console.log("\n[7] Sort");
const sorted = [...DRUGS].sort(compareByWeightDirection);
check(
  "Sorted first is loss direction",
  sorted[0].weightDirection === "loss",
);
check(
  "Sorted last is gain direction",
  sorted[sorted.length - 1].weightDirection === "gain",
);

// 8. Drug classes
console.log("\n[8] Drug classes");
check("ALL_DRUG_CLASSES non-empty", ALL_DRUG_CLASSES.length > 0);

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
