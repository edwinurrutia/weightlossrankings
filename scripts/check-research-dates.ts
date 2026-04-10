#!/usr/bin/env tsx
/**
 * check-research-dates.ts — prebuild guard for YMYL freshness signals.
 *
 * Purpose:
 *
 *   The deep SEO audit (2026-04-09) flagged that Google's Helpful
 *   Content guidance treats `dateModified` on YMYL content as a
 *   first-class freshness signal. Articles without a real
 *   per-content lastModified date wash out the "freshness" feature
 *   in the Google index.
 *
 *   This script enforces, at build time, that EVERY research article
 *   in src/lib/research.ts has both `publishedDate` and either
 *   `lastUpdated` (preferred) or a non-stale `publishedDate` we can
 *   fall back to. If a new article ships without these fields, the
 *   build fails — same pattern as scripts/check-provider-schema.ts.
 *
 *   Optional rules enforced:
 *     - publishedDate must be a valid ISO YYYY-MM-DD date
 *     - lastUpdated, when present, must be valid YYYY-MM-DD
 *     - lastUpdated must NOT be earlier than publishedDate
 *     - publishedDate must not be in the future relative to today
 *
 * Wired into package.json prebuild via:
 *   "prebuild": "... && npm run check:research-dates && ..."
 *
 * Failure mode: prints the offending slug + the missing/invalid
 * field, then exits with code 1 so the Vercel build aborts before
 * a regression ships.
 */

import { RESEARCH_ARTICLES } from "../src/lib/research";

interface DateError {
  slug: string;
  field: string;
  detail: string;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function parseDate(value: string | undefined): Date | null {
  if (!value || !ISO_DATE.test(value)) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

function main() {
  const errors: DateError[] = [];
  const today = new Date();
  today.setHours(23, 59, 59, 999); // allow same-day publishedDate

  for (const article of RESEARCH_ARTICLES) {
    const slug = article.slug;

    // publishedDate is required and must be valid ISO
    if (!article.publishedDate) {
      errors.push({
        slug,
        field: "publishedDate",
        detail: "missing — required for ScholarlyArticle.datePublished",
      });
      continue;
    }
    const published = parseDate(article.publishedDate);
    if (!published) {
      errors.push({
        slug,
        field: "publishedDate",
        detail: `invalid ISO date "${article.publishedDate}" — must be YYYY-MM-DD`,
      });
      continue;
    }

    // publishedDate must not be in the future
    if (published.getTime() > today.getTime()) {
      errors.push({
        slug,
        field: "publishedDate",
        detail: `${article.publishedDate} is in the future — articles cannot be pre-dated`,
      });
    }

    // lastUpdated is optional but when present must be valid
    if (article.lastUpdated) {
      const updated = parseDate(article.lastUpdated);
      if (!updated) {
        errors.push({
          slug,
          field: "lastUpdated",
          detail: `invalid ISO date "${article.lastUpdated}" — must be YYYY-MM-DD`,
        });
      } else if (updated.getTime() < published.getTime()) {
        errors.push({
          slug,
          field: "lastUpdated",
          detail: `${article.lastUpdated} is earlier than publishedDate ${article.publishedDate} — lastUpdated cannot rewind`,
        });
      } else if (updated.getTime() > today.getTime()) {
        errors.push({
          slug,
          field: "lastUpdated",
          detail: `${article.lastUpdated} is in the future`,
        });
      }
    }
  }

  if (errors.length > 0) {
    console.error(`✗ ${errors.length} research date violation(s):\n`);
    for (const err of errors) {
      console.error(`  [${err.field}] ${err.slug}: ${err.detail}`);
    }
    console.error(
      `\nResearch articles must have valid publishedDate and (when set) lastUpdated. ` +
        `These feed Google's freshness signal via ScholarlyArticle.dateModified and ` +
        `MedicalWebPage.lastReviewed. See src/lib/research.ts and ` +
        `src/components/research/ResearchArticleLayout.tsx.`,
    );
    process.exit(1);
  }

  console.log(
    `✓ ${RESEARCH_ARTICLES.length} research articles pass date freshness check`,
  );
}

main();
