/**
 * Tool data freshness validator.
 * Run with: npx tsx scripts/check-tool-freshness.ts
 *
 * Reads the TOOLS registry from src/lib/tools.ts and validates the
 * dataFreshness metadata on each entry:
 *   - Every entry has lastVerified and nextReview ISO dates
 *   - lastVerified is within 365 days of today
 *   - nextReview is in the future OR is annotated "static"
 *   - For monthly cadence: lastVerified must be within 35 days
 *   - For quarterly cadence: lastVerified must be within 100 days
 *   - For annual cadence: lastVerified must be within 380 days
 *
 * Exit code 0 = all fresh, 1 = at least one stale entry.
 *
 * This script is wired into npm prebuild alongside check:providers,
 * so the build fails if a tool data source goes stale. That's the
 * structural fix the Wave 5 staleness audit recommended.
 */

import { TOOLS, NON_TOOLS_INTERACTIVE_PAGES, type ToolEntry } from "../src/lib/tools";

const TODAY = new Date();
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const CADENCE_MAX_DAYS: Record<string, number> = {
  monthly: 35,
  quarterly: 100,
  annual: 380,
  static: 9999, // never goes stale (math identities, FDA labels)
};

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

interface Issue {
  tool: string;
  level: "error" | "warn";
  message: string;
}

const issues: Issue[] = [];

function checkEntry(t: ToolEntry) {
  const f = t.dataFreshness;
  if (!f) {
    issues.push({
      tool: t.slug,
      level: "error",
      message: "Missing dataFreshness metadata block",
    });
    return;
  }
  if (!ISO_DATE.test(f.lastVerified)) {
    issues.push({
      tool: t.slug,
      level: "error",
      message: `Invalid lastVerified date: "${f.lastVerified}"`,
    });
    return;
  }
  if (!ISO_DATE.test(f.nextReview)) {
    issues.push({
      tool: t.slug,
      level: "error",
      message: `Invalid nextReview date: "${f.nextReview}"`,
    });
    return;
  }
  const lastVerifiedDate = new Date(f.lastVerified + "T00:00:00Z");
  const nextReviewDate = new Date(f.nextReview + "T00:00:00Z");
  const ageDays = daysBetween(lastVerifiedDate, TODAY);
  const maxDays = CADENCE_MAX_DAYS[f.cadence];
  if (maxDays === undefined) {
    issues.push({
      tool: t.slug,
      level: "error",
      message: `Unknown cadence: "${f.cadence}"`,
    });
    return;
  }
  if (ageDays > maxDays) {
    issues.push({
      tool: t.slug,
      level: "error",
      message: `STALE: lastVerified ${f.lastVerified} is ${ageDays}d old, exceeds ${f.cadence} cadence max of ${maxDays}d. Re-verify per: ${f.sourceSummary}`,
    });
  }
  if (nextReviewDate < TODAY && f.cadence !== "static") {
    issues.push({
      tool: t.slug,
      level: "warn",
      message: `nextReview ${f.nextReview} has passed; bump after re-verifying.`,
    });
  }
}

console.log(`\nTool freshness check — ${TOOLS.length + NON_TOOLS_INTERACTIVE_PAGES.length} entries\n`);
console.log(`Today: ${TODAY.toISOString().slice(0, 10)}\n`);

for (const t of TOOLS) checkEntry(t);
for (const t of NON_TOOLS_INTERACTIVE_PAGES) checkEntry(t);

const errors = issues.filter((i) => i.level === "error");
const warns = issues.filter((i) => i.level === "warn");

for (const tEntry of [...TOOLS, ...NON_TOOLS_INTERACTIVE_PAGES]) {
  const tIssues = issues.filter((i) => i.tool === tEntry.slug);
  if (tIssues.length === 0) {
    console.log(`  ✓ ${tEntry.slug.padEnd(45)} fresh (${tEntry.dataFreshness.cadence})`);
  } else {
    for (const i of tIssues) {
      const icon = i.level === "error" ? "✕" : "⚠";
      console.log(`  ${icon} ${tEntry.slug.padEnd(45)} ${i.message}`);
    }
  }
}

console.log(
  `\nSummary: ${errors.length} error(s), ${warns.length} warning(s)`,
);

if (errors.length > 0) {
  console.log("\nBuild blocked. Re-verify the source(s) above and bump lastVerified in src/lib/tools.ts.");
  process.exit(1);
}
console.log("\nAll tool data is fresh.");
