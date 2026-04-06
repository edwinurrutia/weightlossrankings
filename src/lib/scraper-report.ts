// Helpers for reading the latest scraper report from the docs/ directory.
//
// Scraper reports are written by `scripts/scrape-providers.ts` to
// `docs/scraper-report-YYYY-MM-DD.json`. This module finds the most recent
// one and exposes a typed view of its contents.

import fs from "node:fs";
import path from "node:path";

export type ScraperMatchStatus =
  | "match"
  | "mismatch"
  | "no_data_found"
  | "fetch_failed";

export interface ScrapedPrice {
  amount: number;
  currency: string;
  period: string;
  context: string;
  drug_hint: string | null;
  source_url: string;
  source: string;
}

export interface StoredPriceLite {
  dose: string;
  form: string;
  monthly_cost: number;
  promo_code?: string;
  promo_price?: number;
}

export interface ScraperResult {
  slug: string;
  name: string;
  url: string;
  fetched_at: string;
  fetched_urls: string[];
  found_prices: ScrapedPrice[];
  stored_prices: StoredPriceLite[];
  match_status: ScraperMatchStatus;
  diff: string;
  used_browser: boolean;
  http_status?: number;
  error?: string;
}

export interface ScraperReport {
  generated_at: string;
  summary: {
    total: number;
    matched: number;
    mismatched: number;
    no_data: number;
    failed: number;
  };
  results: ScraperResult[];
}

export interface LatestReport {
  report: ScraperReport;
  filename: string;
  date: string;
}

const REPORT_PATTERN = /^scraper-report-(\d{4}-\d{2}-\d{2})\.json$/;

/**
 * Find the most recent scraper-report-*.json in /docs and return it.
 * Returns null if no report file exists.
 */
export function readLatestScraperReport(): LatestReport | null {
  const docsDir = path.join(process.cwd(), "docs");
  let entries: string[];
  try {
    entries = fs.readdirSync(docsDir);
  } catch {
    return null;
  }

  const matches: { file: string; date: string }[] = [];
  for (const file of entries) {
    const m = REPORT_PATTERN.exec(file);
    if (m) matches.push({ file, date: m[1] });
  }
  if (matches.length === 0) return null;

  matches.sort((a, b) => b.date.localeCompare(a.date));
  const latest = matches[0];
  const fullPath = path.join(docsDir, latest.file);
  try {
    const raw = fs.readFileSync(fullPath, "utf-8");
    const report = JSON.parse(raw) as ScraperReport;
    return { report, filename: latest.file, date: latest.date };
  } catch {
    return null;
  }
}
