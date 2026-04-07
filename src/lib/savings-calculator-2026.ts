/**
 * GLP-1 total cost of ownership (TCO) calculator over 1, 2, or 5
 * years. Used by /tools/glp1-savings-calculator.
 *
 * The math is straightforward — monthly cost × months — but the
 * value is in providing the verified 2026 monthly costs for every
 * common access path:
 *
 *   - Brand-name with commercial insurance (PA + copay)
 *   - Brand-name self-pay via NovoCare / LillyDirect direct-pay
 *   - Compounded semaglutide (cheap / median / expensive provider)
 *   - Compounded tirzepatide (cheap / median / expensive provider)
 *   - Foundayo (orforglipron) — $25/mo with insurance, $149/mo
 *     self-pay (verified from Lilly press release April 1, 2026)
 *
 * All prices are best-effort 2026 snapshots from public sources
 * documented in src/lib/research.ts and on the pricing index page.
 * The user can override any price to model their own scenario.
 */

export type AccessPath =
  | "wegovy-insurance"
  | "wegovy-novocare"
  | "zepbound-insurance"
  | "zepbound-lilly-direct"
  | "compounded-sema-cheap"
  | "compounded-sema-median"
  | "compounded-tirz-cheap"
  | "compounded-tirz-median"
  | "foundayo-insurance"
  | "foundayo-self-pay";

export interface AccessOption {
  id: AccessPath;
  label: string;
  drug: "semaglutide" | "tirzepatide" | "orforglipron";
  defaultMonthlyCost: number;
  source: string;
  notes: string;
}

/**
 * Best-effort 2026 monthly cost snapshot. Patient will override the
 * specific price they're paying. Sources documented in the article.
 */
export const ACCESS_OPTIONS: AccessOption[] = [
  {
    id: "wegovy-insurance",
    label: "Wegovy (commercial insurance + savings card)",
    drug: "semaglutide",
    defaultMonthlyCost: 25,
    source: "Wegovy savings card eligible commercial plan",
    notes:
      "Requires PA approval and a Novo Nordisk savings card. $25/month is the typical eligible-patient price.",
  },
  {
    id: "wegovy-novocare",
    label: "Wegovy NovoCare direct-pay",
    drug: "semaglutide",
    defaultMonthlyCost: 499,
    source: "NovoCare direct-pay program",
    notes:
      "Manufacturer direct-pay program for self-pay patients without commercial coverage. ~$499/month as of 2025.",
  },
  {
    id: "zepbound-insurance",
    label: "Zepbound (commercial insurance + savings card)",
    drug: "tirzepatide",
    defaultMonthlyCost: 25,
    source: "Zepbound savings card eligible commercial plan",
    notes:
      "Requires PA approval and Lilly savings card. $25/month is the typical eligible-patient price.",
  },
  {
    id: "zepbound-lilly-direct",
    label: "Zepbound LillyDirect single-vial",
    drug: "tirzepatide",
    defaultMonthlyCost: 499,
    source: "LillyDirect direct-pay vials",
    notes:
      "Single-vial direct pay through LillyDirect, $349-$599 depending on dose. ~$499/month is typical for the maintenance dose range.",
  },
  {
    id: "compounded-sema-cheap",
    label: "Compounded semaglutide (cheapest provider)",
    drug: "semaglutide",
    defaultMonthlyCost: 99,
    source: "WLR pricing index 2026 — p10",
    notes:
      "Floor-price compounded providers. Always verify pharmacy accreditation and concentration.",
  },
  {
    id: "compounded-sema-median",
    label: "Compounded semaglutide (median provider)",
    drug: "semaglutide",
    defaultMonthlyCost: 199,
    source: "WLR pricing index 2026 — median",
    notes: "Median price across the compounded telehealth market.",
  },
  {
    id: "compounded-tirz-cheap",
    label: "Compounded tirzepatide (cheapest provider)",
    drug: "tirzepatide",
    defaultMonthlyCost: 149,
    source: "WLR pricing index 2026 — p10",
    notes:
      "Floor-price compounded tirzepatide. Generally more expensive than compounded semaglutide because the API is more expensive.",
  },
  {
    id: "compounded-tirz-median",
    label: "Compounded tirzepatide (median provider)",
    drug: "tirzepatide",
    defaultMonthlyCost: 299,
    source: "WLR pricing index 2026 — median",
    notes: "Median price across the compounded tirzepatide market.",
  },
  {
    id: "foundayo-insurance",
    label: "Foundayo / orforglipron (insurance + savings card)",
    drug: "orforglipron",
    defaultMonthlyCost: 25,
    source: "Lilly press release, April 1, 2026",
    notes: "$25/month with commercial coverage and Lilly savings card.",
  },
  {
    id: "foundayo-self-pay",
    label: "Foundayo / orforglipron self-pay",
    drug: "orforglipron",
    defaultMonthlyCost: 149,
    source: "Lilly press release, April 1, 2026",
    notes:
      "$149/month for the lowest dose self-pay through LillyDirect. The most affordable branded GLP-1 self-pay option in 2026.",
  },
];

export function getAccessOption(id: AccessPath): AccessOption | undefined {
  return ACCESS_OPTIONS.find((o) => o.id === id);
}

export interface CostProjection {
  monthlyCost: number;
  months: number;
  totalCost: number;
}

export function projectCost(
  monthlyCost: number,
  months: number,
): CostProjection {
  if (!Number.isFinite(monthlyCost) || monthlyCost < 0) {
    return { monthlyCost: 0, months, totalCost: 0 };
  }
  if (!Number.isFinite(months) || months <= 0) {
    return { monthlyCost, months: 0, totalCost: 0 };
  }
  return {
    monthlyCost,
    months,
    totalCost: monthlyCost * months,
  };
}

export interface SavingsComparison {
  baselineMonthly: number;
  alternativeMonthly: number;
  monthlySavings: number;
  yearOneSavings: number;
  yearTwoSavings: number;
  yearFiveSavings: number;
  /** Savings as a percentage of baseline. */
  pctSavings: number;
}

export function compareCosts(
  baselineMonthly: number,
  alternativeMonthly: number,
): SavingsComparison {
  if (
    !Number.isFinite(baselineMonthly) ||
    !Number.isFinite(alternativeMonthly) ||
    baselineMonthly < 0 ||
    alternativeMonthly < 0
  ) {
    return {
      baselineMonthly: 0,
      alternativeMonthly: 0,
      monthlySavings: 0,
      yearOneSavings: 0,
      yearTwoSavings: 0,
      yearFiveSavings: 0,
      pctSavings: 0,
    };
  }
  const monthlySavings = baselineMonthly - alternativeMonthly;
  return {
    baselineMonthly,
    alternativeMonthly,
    monthlySavings,
    yearOneSavings: monthlySavings * 12,
    yearTwoSavings: monthlySavings * 24,
    yearFiveSavings: monthlySavings * 60,
    pctSavings:
      baselineMonthly > 0
        ? (monthlySavings / baselineMonthly) * 100
        : 0,
  };
}
