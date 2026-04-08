/**
 * check-brand-pricing-freshness.ts — prebuild guardrail for
 * brand-name GLP-1 pricing data in src/lib/brand-pricing.ts.
 *
 * Why this exists:
 *
 *   Brand-name GLP-1 pricing changes constantly:
 *     - Novo Nordisk cut Wegovy from $650 to $349 in March 2025
 *     - Novo Nordisk cut Ozempic from $997 to $499 in August 2025
 *     - Novo Nordisk launched $199 Ozempic intro offer November 2025
 *     - Eli Lilly launched Zepbound Journey Program with tiered
 *       dose-based pricing
 *     - Medicare Zepbound OSA copay set at $50/month in April 2026
 *
 *   Any of these figures could change again without warning. Prices
 *   silently going stale on a YMYL site is a real patient-harm risk
 *   — a patient could see "$25 savings card" and assume their
 *   actual cost is $25 when the real figure is something else.
 *
 *   This script enforces a freshness window: every pricing entry
 *   in src/lib/brand-pricing.ts must have been verified within the
 *   last N days (default: 60). Stale entries fail the build.
 *
 * What counts as "verified":
 *
 *   The `last_verified` field on each PricingEntry must be set to
 *   the date of the most recent manual verification against the
 *   primary source. "Manual verification" means someone — a human
 *   or a verification agent following the YMYL rule — opened the
 *   source URL, confirmed the price, and updated the field.
 *
 * How to re-verify when this check fails:
 *
 *   1. `npm run check:brand-pricing-freshness` to see which entries
 *      are stale.
 *   2. For each stale entry, dispatch a pricing-verification agent
 *      (per the YMYL 125% rule) to check the source_url against
 *      at least 2 independent sources.
 *   3. If the price is unchanged, update only the `last_verified`
 *      date in src/lib/brand-pricing.ts and commit with a message
 *      "re-verify: [entry] confirmed unchanged at [old price]".
 *   4. If the price changed, update ALL fields (price_usd, label,
 *      source_url, verbatim_quote, notes, last_verified) and
 *      commit with a message documenting the change, old/new
 *      values, and verification trail.
 *
 * Wire-up:
 *
 *   - npm run check:brand-pricing-freshness — manual check
 *   - npm run prebuild — chained automatically before every build
 */

import {
  getAllPricingEntries,
  type PricingEntry,
} from "../src/lib/brand-pricing";

// Prices older than this many days fail the build. 60 days is a
// reasonable window for GLP-1 pricing which can change a few times
// per year. Adjust if the business wants tighter or looser cadence.
const FRESHNESS_WINDOW_DAYS = 60;

// Warning threshold — entries older than this but within the fail
// window get a warning to nudge re-verification before they expire.
const WARNING_WINDOW_DAYS = 45;

interface Issue {
  brand: string;
  tier: string;
  label: string;
  last_verified: string;
  days_stale: number;
  severity: "WARN" | "FAIL";
}

function daysBetween(isoDate: string, today: Date): number {
  const then = new Date(isoDate);
  if (Number.isNaN(then.getTime())) return Number.POSITIVE_INFINITY;
  const ms = today.getTime() - then.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function main() {
  const today = new Date();
  const entries = getAllPricingEntries();
  const issues: Issue[] = [];

  for (const { brand, tier, entry } of entries) {
    const daysStale = daysBetween(entry.last_verified, today);
    if (daysStale > FRESHNESS_WINDOW_DAYS) {
      issues.push({
        brand,
        tier,
        label: entry.label,
        last_verified: entry.last_verified,
        days_stale: daysStale,
        severity: "FAIL",
      });
    } else if (daysStale > WARNING_WINDOW_DAYS) {
      issues.push({
        brand,
        tier,
        label: entry.label,
        last_verified: entry.last_verified,
        days_stale: daysStale,
        severity: "WARN",
      });
    }
  }

  const fails = issues.filter((i) => i.severity === "FAIL");
  const warns = issues.filter((i) => i.severity === "WARN");

  console.log(
    `check-brand-pricing-freshness: scanned ${entries.length} brand pricing entries`,
  );
  console.log(`  freshness window: ${FRESHNESS_WINDOW_DAYS} days`);
  console.log(`  warning threshold: ${WARNING_WINDOW_DAYS} days`);
  console.log("");

  if (warns.length > 0) {
    console.log(`Warnings (${warns.length} entries approaching staleness):`);
    for (const w of warns) {
      console.log(
        `  ${w.brand}.${w.tier}: ${w.label} (verified ${w.last_verified}, ${w.days_stale} days ago)`,
      );
    }
    console.log("");
  }

  if (fails.length === 0) {
    console.log(
      `✓ all ${entries.length} brand pricing entries are fresh (verified within ${FRESHNESS_WINDOW_DAYS} days)`,
    );
    process.exit(0);
  }

  console.error("");
  console.error(`✗ STALE BRAND PRICING DATA — build blocked (${fails.length} entries)`);
  console.error("");
  for (const f of fails) {
    console.error(`  ${f.brand}.${f.tier}: ${f.label}`);
    console.error(
      `    last verified ${f.last_verified} (${f.days_stale} days ago; max ${FRESHNESS_WINDOW_DAYS})`,
    );
    console.error("");
  }
  console.error(
    `To fix: dispatch a pricing-verification agent per the YMYL rule, confirm`,
  );
  console.error(
    `each stale price against at least 2 independent primary sources, and update`,
  );
  console.error(
    `src/lib/brand-pricing.ts with the new price (or just the last_verified date`,
  );
  console.error(
    `if the price is unchanged). Commit with a clear verification trail.`,
  );
  process.exit(1);
}

main();
