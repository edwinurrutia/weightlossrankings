/**
 * Tests for src/lib/glp1-drug-interactions.ts
 *
 * Run: npx tsx scripts/test-glp1-drug-interactions.ts
 */

import {
  INTERACTIONS,
  searchInteractions,
  getInteractionsBySeverity,
  getAllDrugClasses,
  severityRank,
  sortBySeverity,
  getInteractionCount,
  type Severity,
} from "../src/lib/glp1-drug-interactions";

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

function assertEq<T>(actual: T, expected: T, msg: string) {
  if (actual !== expected) {
    throw new Error(`${msg}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

console.log("\nglp1-drug-interactions");

// ----------------------------------------------------------------
// Database integrity
// ----------------------------------------------------------------
console.log("\n  database integrity");

test("has at least 10 entries", () => {
  assert(INTERACTIONS.length >= 10, `only ${INTERACTIONS.length} entries`);
});

test("every entry has required fields", () => {
  for (const i of INTERACTIONS) {
    assert(i.id && i.id.length > 0, `entry missing id`);
    assert(i.drugName && i.drugName.length > 0, `${i.id} missing drugName`);
    assert(Array.isArray(i.brandNames), `${i.id} brandNames not array`);
    assert(i.drugClass && i.drugClass.length > 0, `${i.id} missing drugClass`);
    assert(i.appliesTo, `${i.id} missing appliesTo`);
    assert(i.severity, `${i.id} missing severity`);
    assert(i.effect && i.effect.length > 0, `${i.id} missing effect`);
    assert(
      i.recommendation && i.recommendation.length > 0,
      `${i.id} missing recommendation`,
    );
    assert(i.source && i.source.length > 0, `${i.id} missing source`);
  }
});

test("every id is unique", () => {
  const ids = new Set<string>();
  for (const i of INTERACTIONS) {
    assert(!ids.has(i.id), `duplicate id: ${i.id}`);
    ids.add(i.id);
  }
});

test("every severity is a valid tier", () => {
  const valid: Severity[] = ["contraindicated", "serious", "moderate", "minor"];
  for (const i of INTERACTIONS) {
    assert(
      valid.includes(i.severity),
      `${i.id} has invalid severity ${i.severity}`,
    );
  }
});

test("every appliesTo is a valid GLP-1 token", () => {
  const valid = ["semaglutide", "tirzepatide", "orforglipron", "all"];
  for (const i of INTERACTIONS) {
    assert(
      valid.includes(i.appliesTo),
      `${i.id} has invalid appliesTo ${i.appliesTo}`,
    );
  }
});

// ----------------------------------------------------------------
// searchInteractions
// ----------------------------------------------------------------
console.log("\n  searchInteractions");

test("empty query returns empty array", () => {
  assertEq(searchInteractions("").length, 0, "empty query");
  assertEq(searchInteractions("   ").length, 0, "whitespace query");
});

test("matches by generic drug name", () => {
  const r = searchInteractions("insulin");
  assert(r.some((i) => i.id === "insulin"), "did not find insulin");
});

test("matches by brand name", () => {
  const r = searchInteractions("Lantus");
  assert(r.some((i) => i.id === "insulin"), "Lantus did not match insulin");
});

test("matches by drug class", () => {
  const r = searchInteractions("anticoagulant");
  assert(r.some((i) => i.id === "warfarin"), "anticoagulant did not match warfarin");
});

test("is case insensitive", () => {
  const lower = searchInteractions("metformin");
  const upper = searchInteractions("METFORMIN");
  const mixed = searchInteractions("MetForMin");
  assertEq(lower.length, upper.length, "case mismatch lower vs upper");
  assertEq(lower.length, mixed.length, "case mismatch lower vs mixed");
  assert(lower.length > 0, "metformin returned no results");
});

test("partial brand name matches", () => {
  const r = searchInteractions("Synthr");
  assert(
    r.some((i) => i.id === "levothyroxine"),
    "Synthr did not match levothyroxine",
  );
});

test("nonsense query returns empty", () => {
  const r = searchInteractions("xyzqwerty12345");
  assertEq(r.length, 0, "nonsense query returned matches");
});

// ----------------------------------------------------------------
// getInteractionsBySeverity
// ----------------------------------------------------------------
console.log("\n  getInteractionsBySeverity");

test("contraindicated returns at least 1", () => {
  const r = getInteractionsBySeverity("contraindicated");
  assert(r.length >= 1, `expected >= 1, got ${r.length}`);
});

test("serious returns at least 1", () => {
  const r = getInteractionsBySeverity("serious");
  assert(r.length >= 1, `expected >= 1, got ${r.length}`);
});

test("moderate returns at least 1", () => {
  const r = getInteractionsBySeverity("moderate");
  assert(r.length >= 1, `expected >= 1, got ${r.length}`);
});

test("minor returns at least 1", () => {
  const r = getInteractionsBySeverity("minor");
  assert(r.length >= 1, `expected >= 1, got ${r.length}`);
});

test("severity counts sum to total", () => {
  const total =
    getInteractionsBySeverity("contraindicated").length +
    getInteractionsBySeverity("serious").length +
    getInteractionsBySeverity("moderate").length +
    getInteractionsBySeverity("minor").length;
  assertEq(total, INTERACTIONS.length, "severity buckets don't sum to total");
});

// ----------------------------------------------------------------
// severityRank + sortBySeverity
// ----------------------------------------------------------------
console.log("\n  severityRank + sortBySeverity");

test("severityRank orders correctly", () => {
  assert(severityRank("contraindicated") < severityRank("serious"), "ctrd<serious");
  assert(severityRank("serious") < severityRank("moderate"), "serious<moderate");
  assert(severityRank("moderate") < severityRank("minor"), "moderate<minor");
});

test("sortBySeverity puts most severe first", () => {
  const sorted = sortBySeverity(INTERACTIONS);
  for (let i = 1; i < sorted.length; i++) {
    assert(
      severityRank(sorted[i - 1].severity) <= severityRank(sorted[i].severity),
      `sort broken at index ${i}: ${sorted[i - 1].severity} > ${sorted[i].severity}`,
    );
  }
});

test("sortBySeverity does not mutate input", () => {
  const before = [...INTERACTIONS];
  sortBySeverity(INTERACTIONS);
  for (let i = 0; i < before.length; i++) {
    assertEq(before[i].id, INTERACTIONS[i].id, `mutated at index ${i}`);
  }
});

// ----------------------------------------------------------------
// getAllDrugClasses + getInteractionCount
// ----------------------------------------------------------------
console.log("\n  misc helpers");

test("getAllDrugClasses returns sorted unique list", () => {
  const classes = getAllDrugClasses();
  assert(classes.length > 0, "no classes");
  for (let i = 1; i < classes.length; i++) {
    assert(classes[i - 1] <= classes[i], `not sorted at ${i}`);
  }
  assertEq(new Set(classes).size, classes.length, "duplicates in classes");
});

test("getInteractionCount matches array length", () => {
  assertEq(getInteractionCount(), INTERACTIONS.length, "count mismatch");
});

// ----------------------------------------------------------------
// Source citations
// ----------------------------------------------------------------
console.log("\n  source citations");

test("non-minor entries cite an FDA label section", () => {
  for (const i of INTERACTIONS) {
    if (i.severity === "minor") continue;
    const s = i.source.toLowerCase();
    assert(
      s.includes("pi") || s.includes("fda") || s.includes("section") || s.includes("ema"),
      `${i.id} (${i.severity}) source missing PI/FDA citation: ${i.source}`,
    );
  }
});

// ----------------------------------------------------------------
console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
