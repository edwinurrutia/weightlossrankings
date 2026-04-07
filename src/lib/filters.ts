import type { Provider, FilterState, SortOption } from "./types";
import { computeOverallScore } from "./scoring";

export const ALL_FEATURES = [
  "FSA/HSA",
  "Video Calls",
  "Dietitian",
  "24/7 Support",
  "Text Only",
  "In-Person",
  "Compounded",
  "Brand Name",
];

export const DOSE_OPTIONS = ["0.25mg", "0.5mg", "1mg", "1.7mg", "2.5mg"];

/**
 * Returns the minimum monthly_cost for a provider.
 * If dose is provided, only considers pricing entries for that dose.
 * Returns Infinity if no matching pricing entries exist.
 */
export function getMinPrice(provider: Provider, dose?: string): number {
  if (!provider.pricing || provider.pricing.length === 0) return Infinity;

  const entries = dose
    ? provider.pricing.filter((p) => p.dose === dose)
    : provider.pricing;

  if (entries.length === 0) return Infinity;

  return Math.min(...entries.map((p) => p.promo_price ?? p.monthly_cost));
}

function sortProviders(
  providers: Provider[],
  sort: SortOption,
  dose?: string
): Provider[] {
  const sorted = [...providers];

  switch (sort) {
    case "cheapest":
      return sorted.sort(
        (a, b) => getMinPrice(a, dose) - getMinPrice(b, dose)
      );
    case "highest-rated":
      return sorted.sort(
        (a, b) => computeOverallScore(b.scores) - computeOverallScore(a.scores)
      );
    case "most-reviewed":
      return sorted.sort(
        (a, b) =>
          (b.external_reviews?.google_count ?? 0) -
          (a.external_reviews?.google_count ?? 0)
      );
    default:
      return sorted;
  }
}

export function filterProviders(
  providers: Provider[],
  filters: FilterState
): Provider[] {
  let result = [...providers];

  // Filter by category
  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  // Filter by drug_type (maps to category or a feature)
  if (filters.drug_type) {
    result = result.filter(
      (p) =>
        p.category === filters.drug_type ||
        (p.features && p.features.includes(filters.drug_type!))
    );
  }

  // Filter by drug (semaglutide or tirzepatide)
  if (filters.drug) {
    result = result.filter(
      (p) =>
        p.pricing && p.pricing.some((pricing) => pricing.drug === filters.drug)
    );
  }

  // Filter by form (compounded or brand)
  if (filters.form) {
    result = result.filter(
      (p) =>
        p.pricing &&
        p.pricing.some((pricing) => pricing.form === filters.form)
    );
  }

  // Filter by state availability
  if (filters.state) {
    result = result.filter(
      (p) =>
        p.states_available &&
        (p.states_available.includes(filters.state!) ||
          p.states_available.includes("All") ||
          p.states_available.includes("all"))
    );
  }

  // Filter by dose availability
  if (filters.dose) {
    result = result.filter(
      (p) =>
        p.pricing && p.pricing.some((pricing) => pricing.dose === filters.dose)
    );
  }

  // Filter by features (provider must have ALL selected features)
  if (filters.features && filters.features.length > 0) {
    result = result.filter(
      (p) =>
        p.features &&
        filters.features!.every((feature) => p.features.includes(feature))
    );
  }

  // Filter by max_price
  if (filters.max_price !== undefined) {
    result = result.filter(
      (p) => getMinPrice(p, filters.dose) <= filters.max_price!
    );
  }

  // Sort results
  return sortProviders(result, filters.sort, filters.dose);
}
