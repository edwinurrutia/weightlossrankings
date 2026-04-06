/**
 * Pricing analytics over providers.json.
 *
 * All functions are pure — they take an array of providers (or read from
 * the dataset directly) and return summary statistics. Used by the
 * /research articles to keep dynamic data sections in sync with the
 * provider catalog: when a new provider is added, the pricing index
 * regenerates automatically.
 */

import providersData from "@/data/providers.json";
import type { Provider, DrugType } from "./types";

const providers = providersData as unknown as Provider[];

export type DrugForm = "compounded" | "brand";

export interface PricingStats {
  count: number;
  min: number;
  max: number;
  median: number;
  /** 10th percentile — what the cheapest decile pays. */
  p10: number;
  /** 90th percentile — what the most expensive decile pays. */
  p90: number;
  mean: number;
}

interface PricingPoint {
  provider: Provider;
  monthly: number;
}

const EMPTY_STATS: PricingStats = {
  count: 0,
  min: 0,
  max: 0,
  median: 0,
  p10: 0,
  p90: 0,
  mean: 0,
};

/**
 * Quantile of a sorted array using linear interpolation between the two
 * surrounding ranks (R type-7 / Excel PERCENTILE / numpy default).
 */
function percentile(sortedAsc: number[], p: number): number {
  if (sortedAsc.length === 0) return 0;
  if (sortedAsc.length === 1) return sortedAsc[0];
  const idx = (sortedAsc.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sortedAsc[lo];
  const frac = idx - lo;
  return sortedAsc[lo] * (1 - frac) + sortedAsc[hi] * frac;
}

/**
 * Collect every monthly price for a (drug, form) combination across the
 * entire provider catalog. Uses the promo price when present (that's
 * what most readers will actually pay starting out).
 */
function collectPrices(drug: DrugType, form: DrugForm): PricingPoint[] {
  const out: PricingPoint[] = [];
  for (const p of providers) {
    if (!p.pricing) continue;
    for (const pr of p.pricing) {
      if (pr.drug !== drug || pr.form !== form) continue;
      const monthly = pr.promo_price ?? pr.monthly_cost;
      if (typeof monthly === "number" && monthly > 0 && monthly < 5000) {
        out.push({ provider: p, monthly });
      }
    }
  }
  return out;
}

export function getPricingStats(
  drug: DrugType,
  form: DrugForm,
): PricingStats {
  const points = collectPrices(drug, form);
  if (points.length === 0) return { ...EMPTY_STATS };

  const sorted = points.map((x) => x.monthly).sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);

  return {
    count: sorted.length,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    median: percentile(sorted, 0.5),
    p10: percentile(sorted, 0.1),
    p90: percentile(sorted, 0.9),
    mean: sum / sorted.length,
  };
}

export interface CheapestProvider {
  slug: string;
  name: string;
  monthly: number;
}

/**
 * Returns the N cheapest providers for a given (drug, form).
 * Used by article sidebars to surface the current best deal.
 */
export function getCheapestProviders(
  drug: DrugType,
  form: DrugForm,
  limit = 5,
): CheapestProvider[] {
  return collectPrices(drug, form)
    .sort((a, b) => a.monthly - b.monthly)
    .slice(0, limit)
    .map((x) => ({
      slug: x.provider.slug,
      name: x.provider.name,
      monthly: x.monthly,
    }));
}

export interface PriceBucket {
  /** Inclusive lower bound. */
  low: number;
  /** Exclusive upper bound (use Infinity for the open-ended last bucket). */
  high: number;
  label: string;
  count: number;
}

/**
 * Bucketed distribution of monthly prices for a (drug, form). Used for the
 * histogram visualization in the pricing index article. Buckets are fixed
 * dollar bins so the chart stays comparable as data evolves.
 */
export function getPriceDistribution(
  drug: DrugType,
  form: DrugForm,
): PriceBucket[] {
  const buckets: PriceBucket[] = [
    { low: 0, high: 100, label: "<$100", count: 0 },
    { low: 100, high: 150, label: "$100–149", count: 0 },
    { low: 150, high: 200, label: "$150–199", count: 0 },
    { low: 200, high: 300, label: "$200–299", count: 0 },
    { low: 300, high: 500, label: "$300–499", count: 0 },
    { low: 500, high: 1000, label: "$500–999", count: 0 },
    { low: 1000, high: Infinity, label: "$1,000+", count: 0 },
  ];

  for (const point of collectPrices(drug, form)) {
    const bucket = buckets.find(
      (b) => point.monthly >= b.low && point.monthly < b.high,
    );
    if (bucket) bucket.count += 1;
  }

  return buckets;
}

/**
 * Returns the most recent verification date in YYYY-MM-DD across the
 * entire provider catalog. Articles use this as their "data as of" stamp
 * so readers know how fresh the underlying numbers are.
 */
export function getLatestVerificationDate(): string {
  let latest = "";
  for (const p of providers) {
    const v = p.verification?.last_verified;
    if (typeof v === "string" && v > latest) latest = v;
  }
  return latest || new Date().toISOString().slice(0, 10);
}

/**
 * Total number of providers offering a given (drug, form). Used in
 * article copy as a denominator (e.g. "32 of 80 providers").
 */
export function countProvidersOffering(
  drug: DrugType,
  form: DrugForm,
): number {
  const seen = new Set<string>();
  for (const point of collectPrices(drug, form)) {
    seen.add(point.provider.slug);
  }
  return seen.size;
}

export const TOTAL_PROVIDERS = providers.length;
