// ---------------------------------------------------------------------------
// Pure data + math for the GLP-1 cost-per-pound calculator.
//
// Lives in /lib (no "use client") so BOTH the server-rendered page.tsx
// and the "use client" Calculator.tsx can import the same DRUGS table
// and the same calculation functions. Without this split Next 14 errors
// during static generation when the server tries to serialize a function
// reference exported from a client module.
//
// All efficacy percentages come from FDA prescribing information for
// the labeled maintenance dose. Costs are typical brand-cash US monthly
// list prices used as defaults; the user can override at runtime. The
// monthly WAC constants are imported from src/lib/citations.ts so any
// future WAC update only needs to be made in one place.
// ---------------------------------------------------------------------------

import {
  WEGOVY_MONTHLY_USD,
  ZEPBOUND_MONTHLY_USD,
  SAXENDA_MONTHLY_USD,
  FOUNDAYO_MONTHLY_USD,
} from "@/lib/citations";

export interface DrugRow {
  /** Stable id used in <select> options. */
  id: string;
  /** Brand name + dose, shown in the dropdown and table. */
  label: string;
  /** Short brand name only, used as a column heading. */
  brand: string;
  /** Mean total body weight loss percentage at the trial endpoint. */
  trialPct: number;
  /** Length of the pivotal trial in weeks (used as the 100% time point). */
  trialWeeks: number;
  /** Pivotal trial name. */
  trial: string;
  /** Typical brand-cash US monthly list price, used as the default. */
  defaultMonthlyCost: number;
}

export const DRUGS: DrugRow[] = [
  {
    id: "wegovy-2_4",
    label: "Wegovy 2.4 mg (semaglutide)",
    brand: "Wegovy 2.4 mg",
    trialPct: 14.9,
    trialWeeks: 68,
    trial: "STEP-1",
    defaultMonthlyCost: WEGOVY_MONTHLY_USD,
  },
  {
    id: "zepbound-5",
    label: "Zepbound 5 mg (tirzepatide)",
    brand: "Zepbound 5 mg",
    trialPct: 15.0,
    trialWeeks: 72,
    trial: "SURMOUNT-1",
    defaultMonthlyCost: ZEPBOUND_MONTHLY_USD,
  },
  {
    id: "zepbound-10",
    label: "Zepbound 10 mg (tirzepatide)",
    brand: "Zepbound 10 mg",
    trialPct: 19.5,
    trialWeeks: 72,
    trial: "SURMOUNT-1",
    defaultMonthlyCost: ZEPBOUND_MONTHLY_USD,
  },
  {
    id: "zepbound-15",
    label: "Zepbound 15 mg (tirzepatide)",
    brand: "Zepbound 15 mg",
    trialPct: 20.9,
    trialWeeks: 72,
    trial: "SURMOUNT-1",
    defaultMonthlyCost: ZEPBOUND_MONTHLY_USD,
  },
  {
    // 11.1% is the treatment-regimen estimand from the Foundayo USPI
    // Section 14, not the 12.4% on-treatment efficacy estimand.
    id: "foundayo-17_2",
    label: "Foundayo 17.2 mg (orforglipron)",
    brand: "Foundayo 17.2 mg",
    trialPct: 11.1,
    trialWeeks: 72,
    trial: "ATTAIN-1 (label)",
    defaultMonthlyCost: FOUNDAYO_MONTHLY_USD,
  },
  {
    id: "saxenda-3",
    label: "Saxenda 3 mg (liraglutide)",
    brand: "Saxenda 3 mg",
    trialPct: 8.0,
    trialWeeks: 56,
    trial: "SCALE",
    defaultMonthlyCost: SAXENDA_MONTHLY_USD,
  },
];

/**
 * Fraction of the trial-endpoint weight loss expected by a given month.
 * Most weight loss happens in months 1-9, then plateaus. Anchor points
 * are an editorial approximation, not from any single trial; the FAQ
 * notes this explicitly.
 *
 *   Month  1: 25% of total
 *   Month  3: 55% of total
 *   Month  6: 80% of total
 *   Month  9: 95% of total
 *   Month 12+: 100% of total
 *
 * EDITORIAL APPROXIMATION (not from a single published trial).
 * Derived as a smoothed envelope across the published weight-loss
 * trajectories in STEP-1 (Wilding NEJM 2021, PMID 33567185), SURMOUNT-1
 * (Jastreboff NEJM 2022, PMID 35658024), and ATTAIN-1 (Foundayo USPI
 * Section 14). All three trials show a steep early decline through
 * roughly month 6-9 followed by a plateau, and the anchor fractions
 * here approximate the population mean trajectory across those three
 * curves. Patient-level variance is large; tools that surface this
 * function should hedge accordingly.
 *
 * LAST-DATA-REFRESH: 2026-04-07
 * NEXT-DATA-REFRESH: 2026-10-07 (annual editorial review against any
 * new long-term trial publications)
 */
export function timeFactor(months: number): number {
  if (months <= 0) return 0;
  const anchors: Array<[number, number]> = [
    [0, 0],
    [1, 0.25],
    [3, 0.55],
    [6, 0.8],
    [9, 0.95],
    [12, 1.0],
  ];
  if (months >= 12) return 1.0;
  for (let i = 1; i < anchors.length; i++) {
    const [m0, f0] = anchors[i - 1];
    const [m1, f1] = anchors[i];
    if (months <= m1) {
      const t = (months - m0) / (m1 - m0);
      return f0 + t * (f1 - f0);
    }
  }
  return 1.0;
}

export interface DrugProjection {
  drug: DrugRow;
  startingWeight: number;
  months: number;
  monthlyCost: number;
  expectedLossPct: number;
  expectedLossLbs: number;
  totalCost: number;
  costPerLb: number | null;
}

/**
 * Compute the cost-per-pound projection for one drug at one weight,
 * one cost, one time horizon. Returns interim values so the UI can
 * display each step.
 */
export function projectDrug(
  drug: DrugRow,
  startingWeight: number,
  months: number,
  monthlyCost: number,
): DrugProjection {
  const tf = timeFactor(months);
  const expectedLossPct = drug.trialPct * tf;
  const expectedLossLbs = (startingWeight * expectedLossPct) / 100;
  const totalCost = monthlyCost * months;
  const costPerLb =
    expectedLossLbs > 0 ? totalCost / expectedLossLbs : null;
  return {
    drug,
    startingWeight,
    months,
    monthlyCost,
    expectedLossPct,
    expectedLossLbs,
    totalCost,
    costPerLb,
  };
}

/**
 * Project all six drugs at the same weight and time horizon, using
 * each drug's default monthly cost. Returned sorted ascending by $/lb.
 */
export function projectAllDrugs(
  startingWeight: number,
  months: number,
): DrugProjection[] {
  return DRUGS.map((d) =>
    projectDrug(d, startingWeight, months, d.defaultMonthlyCost),
  ).sort((a, b) => {
    if (a.costPerLb == null) return 1;
    if (b.costPerLb == null) return -1;
    return a.costPerLb - b.costPerLb;
  });
}
