/**
 * Phase C schema guard — prevents the Wave 4 recurrence failure mode.
 *
 * Runs in CI (or locally as `npm run check:providers`) and fails the
 * build if any entry in src/data/providers.json is missing the
 * required verification metadata or has obviously stale / invalid
 * fields. The intent is that a new provider cannot be merged into
 * main without its verification block — no more bulk-imported
 * fake entries.
 *
 * Rules enforced:
 *   1. Every provider must have a verification object.
 *   2. verification.last_verified must be an ISO YYYY-MM-DD date
 *      no older than MAX_VERIFICATION_AGE_DAYS.
 *   3. verification.confidence must be "high" | "medium" | "low".
 *   4. verification.notes must be a non-empty string.
 *   5. category must be a recognized GLP-1 category.
 *   6. For any provider with states_available.length === 0, the
 *      verification confidence must be "medium" or "low" (not "high").
 *   7. slug must match /^[a-z0-9-]+$/.
 *
 * Exit code 0 = all checks passed. Exit code 1 = one or more failures
 * (printed with slug + rule violated).
 */

import { readFileSync } from "fs";
import { join } from "path";

const MAX_VERIFICATION_AGE_DAYS = 180;

// Categories that the runtime page filter accepts. Must stay in sync with
// CATEGORY_MAP in src/app/best/[category]/page.tsx — when a new /best/<slug>
// page is added, its category needs to be in this set or the schema guard
// will reject providers attempting to use it.
const GLP1_CATEGORIES = new Set([
  "GLP-1 Provider",
  "Weight Loss Program",
  "Compounding Pharmacy",
  "Brand Manufacturer",
  "Supplement",         // /best/weight-loss-supplements
  "Meal Delivery",      // /best/meal-delivery-for-weight-loss
  "Fitness App",        // /best/fitness-apps-for-weight-loss
]);

interface Verification {
  last_verified?: string;
  verified_by?: string;
  confidence?: string;
  notes?: string;
  source_urls?: string[];
}

interface Provider {
  slug: string;
  name: string;
  category?: string;
  states_available?: string[];
  verification?: Verification;
}

interface Failure {
  slug: string;
  rule: string;
  detail: string;
}

function daysBetween(isoDate: string, now: Date): number {
  const then = new Date(isoDate);
  if (Number.isNaN(then.getTime())) return Infinity;
  return (now.getTime() - then.getTime()) / (24 * 60 * 60 * 1000);
}

function main(): void {
  const path = join(process.cwd(), "src/data/providers.json");
  const providers: Provider[] = JSON.parse(readFileSync(path, "utf-8"));

  const failures: Failure[] = [];
  const now = new Date();

  for (const p of providers) {
    const slug = p.slug || "<unknown>";

    // Rule 7: slug shape
    if (!/^[a-z0-9-]+$/.test(slug)) {
      failures.push({
        slug,
        rule: "slug-format",
        detail: `slug "${slug}" must match /^[a-z0-9-]+$/`,
      });
    }

    // Rule 5: category allowlist
    if (!p.category || !GLP1_CATEGORIES.has(p.category)) {
      failures.push({
        slug,
        rule: "category",
        detail: `category "${p.category ?? ""}" is not in the GLP1_CATEGORIES allowlist`,
      });
    }

    const v = p.verification;

    // Rule 1: verification block present
    if (!v) {
      failures.push({
        slug,
        rule: "verification-missing",
        detail: "provider has no verification block",
      });
      continue;
    }

    // Rule 3: confidence tier
    if (
      v.confidence !== "high" &&
      v.confidence !== "medium" &&
      v.confidence !== "low"
    ) {
      failures.push({
        slug,
        rule: "verification-confidence",
        detail: `confidence must be "high" | "medium" | "low", got "${v.confidence}"`,
      });
    }

    // Rule 4: notes required
    if (!v.notes || v.notes.trim().length < 10) {
      failures.push({
        slug,
        rule: "verification-notes",
        detail: "verification.notes must be at least 10 characters",
      });
    }

    // Rule 2: last_verified date freshness
    if (!v.last_verified || !/^\d{4}-\d{2}-\d{2}$/.test(v.last_verified)) {
      failures.push({
        slug,
        rule: "verification-date",
        detail: `last_verified must be YYYY-MM-DD, got "${v.last_verified ?? ""}"`,
      });
    } else {
      const age = daysBetween(v.last_verified, now);
      if (age > MAX_VERIFICATION_AGE_DAYS) {
        failures.push({
          slug,
          rule: "verification-stale",
          detail: `last_verified is ${Math.round(age)} days old (limit ${MAX_VERIFICATION_AGE_DAYS})`,
        });
      }
    }

    // Rule 6: high confidence requires state list
    if (
      v.confidence === "high" &&
      (!p.states_available || p.states_available.length === 0)
    ) {
      failures.push({
        slug,
        rule: "high-requires-states",
        detail:
          "high confidence requires a non-empty states_available array " +
          "(use medium if the state list is not publicly disclosed)",
      });
    }
  }

  if (failures.length === 0) {
    console.log(`✓ ${providers.length} providers pass schema check`);
    process.exit(0);
  }

  console.error(`✗ ${failures.length} schema violations:\n`);
  for (const f of failures) {
    console.error(`  [${f.rule}] ${f.slug}: ${f.detail}`);
  }
  process.exit(1);
}

main();
