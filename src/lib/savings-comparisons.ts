import type { Provider, DrugType } from "@/lib/types";
import { getAllProviders } from "@/lib/data";

export interface SavingsComparison {
  slug: string;
  brand_name: string;
  brand_drug: DrugType;
  generic_name: string; // "semaglutide" or "tirzepatide"
  brand_monthly_price: number;
  brand_indication: string; // weight loss vs T2D
  brand_company: string;
  intro: string;
}

export const SAVINGS_COMPARISONS: SavingsComparison[] = [
  {
    slug: "wegovy-vs-compounded",
    brand_name: "Wegovy",
    brand_drug: "semaglutide",
    generic_name: "semaglutide",
    brand_monthly_price: 1349,
    brand_indication: "chronic weight management",
    brand_company: "Novo Nordisk",
    intro:
      "Wegovy is the FDA-approved brand-name formulation of semaglutide 2.4mg, made by Novo Nordisk for chronic weight management. While clinically effective, its $1,349/month list price makes it unaffordable for most cash-pay patients. Compounded semaglutide is a much more affordable alternative dispensed by licensed 503A pharmacies.",
  },
  {
    slug: "ozempic-vs-compounded",
    brand_name: "Ozempic",
    brand_drug: "semaglutide",
    generic_name: "semaglutide",
    brand_monthly_price: 935,
    brand_indication: "type 2 diabetes",
    brand_company: "Novo Nordisk",
    intro:
      "Ozempic is the brand-name semaglutide indicated for type 2 diabetes and made by Novo Nordisk. Although it's frequently used off-label for weight loss, insurers rarely cover Ozempic without a diabetes diagnosis, leaving cash-pay patients facing $935+/month. Compounded semaglutide offers the same active ingredient at a fraction of the price.",
  },
  {
    slug: "zepbound-vs-compounded",
    brand_name: "Zepbound",
    brand_drug: "tirzepatide",
    generic_name: "tirzepatide",
    brand_monthly_price: 1086,
    brand_indication: "chronic weight management",
    brand_company: "Eli Lilly",
    intro:
      "Zepbound is Eli Lilly's brand-name tirzepatide formulation FDA-approved for chronic weight management. In head-to-head trials, tirzepatide produced more weight loss than semaglutide — but at $1,086/month list price, it remains out of reach for most cash-pay patients. Compounded tirzepatide is an affordable alternative dispensed by licensed pharmacies.",
  },
  {
    slug: "mounjaro-vs-compounded",
    brand_name: "Mounjaro",
    brand_drug: "tirzepatide",
    generic_name: "tirzepatide",
    brand_monthly_price: 1069,
    brand_indication: "type 2 diabetes",
    brand_company: "Eli Lilly",
    intro:
      "Mounjaro is the type 2 diabetes-indicated brand of tirzepatide from Eli Lilly. Like Ozempic, it's commonly used off-label for weight loss, but insurance coverage outside of diabetes is rare and the cash price is $1,069/month. Compounded tirzepatide offers the same molecule at substantially lower cost through licensed compounding pharmacies.",
  },
];

export function getComparisonBySlug(
  slug: string
): SavingsComparison | undefined {
  return SAVINGS_COMPARISONS.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): { comparison: string }[] {
  return SAVINGS_COMPARISONS.map((c) => ({ comparison: c.slug }));
}

/** Find the cheapest compounded provider for a given drug type. */
export async function getCheapestCompoundedProvider(
  drug: DrugType
): Promise<{ provider: Provider; monthly_cost: number } | null> {
  const providers = await getAllProviders();
  let best: { provider: Provider; monthly_cost: number } | null = null;

  for (const p of providers) {
    for (const pr of p.pricing) {
      if (pr.form !== "compounded") continue;
      const matchesDrug =
        pr.drug === drug ||
        pr.dose?.toLowerCase().includes(drug.toLowerCase());
      if (!matchesDrug) continue;
      if (!best || pr.monthly_cost < best.monthly_cost) {
        best = { provider: p, monthly_cost: pr.monthly_cost };
      }
    }
  }

  return best;
}

export async function getCompoundedProvidersForDrug(
  drug: DrugType
): Promise<Provider[]> {
  const providers = await getAllProviders();
  return providers.filter((p) =>
    p.pricing.some(
      (pr) =>
        pr.form === "compounded" &&
        (pr.drug === drug ||
          pr.dose?.toLowerCase().includes(drug.toLowerCase()))
    )
  );
}
