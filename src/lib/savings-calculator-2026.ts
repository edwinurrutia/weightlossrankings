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
  | "wegovy-novocare-starter"
  | "wegovy-novocare-step"
  | "wegovy-novocare-baseline"
  | "zepbound-insurance"
  | "zepbound-lilly-2_5"
  | "zepbound-lilly-5"
  | "zepbound-lilly-7_5"
  | "zepbound-lilly-10-15"
  | "zepbound-lilly-journey"
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
    id: "wegovy-novocare-starter",
    label: "Wegovy NovoCare — first 2 fills (0.25/0.5 mg)",
    drug: "semaglutide",
    defaultMonthlyCost: 199,
    source:
      "NovoCare savings offer (https://www.novocare.com/patient/medicines/wegovy/savings-offer.html), promotion effective 11/17/2025–6/30/2026",
    notes:
      "$199/month for the first 2 fills of 0.25 mg or 0.5 mg, new self-pay patients only. Promotion subject to change, verify at NovoCare.",
  },
  {
    id: "wegovy-novocare-step",
    label: "Wegovy NovoCare — Take a Wegovy Step (ongoing)",
    drug: "semaglutide",
    defaultMonthlyCost: 349,
    source:
      "NovoCare savings offer (https://www.novocare.com/patient/medicines/wegovy/savings-offer.html), promotion effective 11/17/2025–6/30/2026",
    notes:
      "$349/month under the Take a Wegovy Step program for ongoing self-pay patients. Promotion subject to change, verify at NovoCare.",
  },
  {
    id: "wegovy-novocare-baseline",
    label: "Wegovy NovoCare — non-promotional baseline",
    drug: "semaglutide",
    defaultMonthlyCost: 499,
    source:
      "NovoCare direct-pay program (https://www.novocare.com/patient/medicines/wegovy/savings-offer.html)",
    notes:
      "$499/month is the non-promotional NovoCare self-pay baseline. Promotion subject to change, verify at NovoCare.",
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
    id: "zepbound-lilly-2_5",
    label: "Zepbound LillyDirect — 2.5 mg starter",
    drug: "tirzepatide",
    defaultMonthlyCost: 299,
    source: "LillyDirect Zepbound pricing (https://pricinginfo.lilly.com/zepbound), effective Dec 1 2025",
    notes:
      "$299/month for the 2.5 mg starter vial through LillyDirect self-pay.",
  },
  {
    id: "zepbound-lilly-5",
    label: "Zepbound LillyDirect — 5 mg",
    drug: "tirzepatide",
    defaultMonthlyCost: 399,
    source: "LillyDirect Zepbound pricing (https://pricinginfo.lilly.com/zepbound), effective Dec 1 2025",
    notes: "$399/month for 5 mg vial through LillyDirect self-pay.",
  },
  {
    id: "zepbound-lilly-7_5",
    label: "Zepbound LillyDirect — 7.5 mg",
    drug: "tirzepatide",
    defaultMonthlyCost: 499,
    source: "LillyDirect Zepbound pricing (https://pricinginfo.lilly.com/zepbound), effective Dec 1 2025",
    notes: "$499/month for 7.5 mg vial through LillyDirect self-pay.",
  },
  {
    id: "zepbound-lilly-10-15",
    label: "Zepbound LillyDirect — 10 / 12.5 / 15 mg maintenance",
    drug: "tirzepatide",
    defaultMonthlyCost: 699,
    source: "LillyDirect Zepbound pricing (https://pricinginfo.lilly.com/zepbound), effective Dec 1 2025",
    notes:
      "$699/month for 10 mg, 12.5 mg, or 15 mg maintenance vials through LillyDirect self-pay.",
  },
  {
    id: "zepbound-lilly-journey",
    label: "Zepbound Self Pay Journey Program (eligible 7.5–15 mg)",
    drug: "tirzepatide",
    defaultMonthlyCost: 449,
    source: "LillyDirect Self Pay Journey Program (https://pricinginfo.lilly.com/zepbound), effective Feb 23 2026",
    notes:
      "$449/month under the Self Pay Journey Program for eligible patients on 7.5/10/12.5/15 mg vials.",
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
