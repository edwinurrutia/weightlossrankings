"use client";

import { useMemo, useState } from "react";

// ---------------------------------------------------------------------------
// Drug efficacy data — sourced from FDA prescribing information.
// All percentages are mean total body weight loss reported in the trial
// arm that supports the FDA-approved labeled maintenance dose.
// ---------------------------------------------------------------------------

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
    defaultMonthlyCost: 1349,
  },
  {
    id: "zepbound-5",
    label: "Zepbound 5 mg (tirzepatide)",
    brand: "Zepbound 5 mg",
    trialPct: 15.0,
    trialWeeks: 72,
    trial: "SURMOUNT-1",
    defaultMonthlyCost: 1086,
  },
  {
    id: "zepbound-10",
    label: "Zepbound 10 mg (tirzepatide)",
    brand: "Zepbound 10 mg",
    trialPct: 19.5,
    trialWeeks: 72,
    trial: "SURMOUNT-1",
    defaultMonthlyCost: 1086,
  },
  {
    id: "zepbound-15",
    label: "Zepbound 15 mg (tirzepatide)",
    brand: "Zepbound 15 mg",
    trialPct: 20.9,
    trialWeeks: 72,
    trial: "SURMOUNT-1",
    defaultMonthlyCost: 1086,
  },
  {
    id: "foundayo-17_2",
    label: "Foundayo 17.2 mg (orforglipron)",
    brand: "Foundayo 17.2 mg",
    trialPct: 11.1,
    trialWeeks: 72,
    trial: "ATTAIN-1 (label)",
    defaultMonthlyCost: 999,
  },
  {
    id: "saxenda-3",
    label: "Saxenda 3 mg (liraglutide)",
    brand: "Saxenda 3 mg",
    trialPct: 8.0,
    trialWeeks: 56,
    trial: "SCALE",
    defaultMonthlyCost: 1349,
  },
];

// ---------------------------------------------------------------------------
// Pure calculation helpers — kept as named functions so the math is
// auditable and so the static fallback table can call the same code.
// ---------------------------------------------------------------------------

/**
 * Fraction of the trial-endpoint weight loss expected by a given month.
 * Most weight loss happens in months 1-9, then plateaus. Anchor points
 * provided by the user spec, linearly interpolated between months.
 *
 *   Month  1: 25% of total
 *   Month  3: 55% of total
 *   Month  6: 80% of total
 *   Month  9: 95% of total
 *   Month 12+: 100% of total
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

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function fmtMoney(n: number, decimals = 0): string {
  if (!Number.isFinite(n)) return "—";
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function fmtLbs(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return `${n.toFixed(decimals)} lbs`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Calculator() {
  const [weightInput, setWeightInput] = useState<string>("220");
  const [drugId, setDrugId] = useState<string>("zepbound-15");
  const [costInput, setCostInput] = useState<string>("1086");
  const [months, setMonths] = useState<number>(12);
  const [costTouched, setCostTouched] = useState<boolean>(false);

  const drug = DRUGS.find((d) => d.id === drugId) ?? DRUGS[0];

  const startingWeight = Math.max(0, parseFloat(weightInput) || 0);
  const monthlyCost = Math.max(0, parseFloat(costInput) || 0);

  const projection = useMemo(
    () => projectDrug(drug, startingWeight, months, monthlyCost),
    [drug, startingWeight, months, monthlyCost],
  );

  const comparison = useMemo(
    () =>
      DRUGS.map((d) =>
        projectDrug(d, startingWeight, months, d.defaultMonthlyCost),
      ).sort((a, b) => {
        if (a.costPerLb == null) return 1;
        if (b.costPerLb == null) return -1;
        return a.costPerLb - b.costPerLb;
      }),
    [startingWeight, months],
  );

  function handleDrugChange(id: string) {
    setDrugId(id);
    if (!costTouched) {
      const next = DRUGS.find((d) => d.id === id);
      if (next) setCostInput(String(next.defaultMonthlyCost));
    }
  }

  return (
    <div className="rounded-2xl border border-brand-violet/15 bg-brand-violet/[0.04] p-6 sm:p-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="cpp-weight"
            className="block text-sm font-semibold text-brand-text-primary mb-1"
          >
            Starting weight (lbs)
          </label>
          <input
            id="cpp-weight"
            type="number"
            inputMode="decimal"
            min={50}
            max={700}
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          />
        </div>

        <div>
          <label
            htmlFor="cpp-drug"
            className="block text-sm font-semibold text-brand-text-primary mb-1"
          >
            Drug + dose
          </label>
          <select
            id="cpp-drug"
            value={drugId}
            onChange={(e) => handleDrugChange(e.target.value)}
            className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          >
            {DRUGS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="cpp-cost"
            className="block text-sm font-semibold text-brand-text-primary mb-1"
          >
            Monthly cost (USD)
          </label>
          <input
            id="cpp-cost"
            type="number"
            inputMode="decimal"
            min={0}
            max={5000}
            value={costInput}
            onChange={(e) => {
              setCostTouched(true);
              setCostInput(e.target.value);
            }}
            className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          />
          <p className="mt-1 text-xs text-brand-text-secondary">
            Default is the typical US brand cash list price. Override
            with your actual out-of-pocket if you have insurance, a
            manufacturer coupon, or are using a compounded version.
          </p>
        </div>

        <div>
          <label
            htmlFor="cpp-months"
            className="block text-sm font-semibold text-brand-text-primary mb-1"
          >
            Months on therapy: <span className="text-brand-violet">{months}</span>
          </label>
          <input
            id="cpp-months"
            type="range"
            min={1}
            max={24}
            step={1}
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value, 10))}
            className="w-full accent-brand-violet"
          />
          <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
            <span>1 mo</span>
            <span>12 mo</span>
            <span>24 mo</span>
          </div>
        </div>
      </div>

      {/* Headline output */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-brand-violet/15 bg-white p-5 text-center">
          <p className="text-xs uppercase tracking-wider text-brand-text-secondary font-semibold">
            Expected weight lost
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-text-primary">
            {fmtLbs(projection.expectedLossLbs)}
          </p>
          <p className="mt-1 text-xs text-brand-text-secondary">
            {projection.expectedLossPct.toFixed(1)}% of starting weight
          </p>
        </div>

        <div className="rounded-xl border-2 border-brand-violet bg-brand-violet/[0.06] p-5 text-center">
          <p className="text-xs uppercase tracking-wider text-brand-violet font-bold">
            Cost per pound lost
          </p>
          <p className="mt-2 text-4xl font-extrabold text-brand-violet">
            {projection.costPerLb != null
              ? fmtMoney(projection.costPerLb, 0)
              : "—"}
          </p>
          <p className="mt-1 text-xs text-brand-text-secondary">
            The headline efficiency metric
          </p>
        </div>

        <div className="rounded-xl border border-brand-violet/15 bg-white p-5 text-center">
          <p className="text-xs uppercase tracking-wider text-brand-text-secondary font-semibold">
            Total cost ({months} mo)
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-text-primary">
            {fmtMoney(projection.totalCost)}
          </p>
          <p className="mt-1 text-xs text-brand-text-secondary">
            {fmtMoney(monthlyCost)}/mo &times; {months}
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mt-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text-primary mb-3">
          All six options at {startingWeight || 0} lbs &times; {months} months
          (sorted by efficiency)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-brand-violet/15 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-brand-violet/[0.06] text-brand-text-primary">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Drug</th>
                <th className="px-3 py-2 text-right font-semibold">
                  Trial loss
                </th>
                <th className="px-3 py-2 text-right font-semibold">
                  Lbs lost
                </th>
                <th className="px-3 py-2 text-right font-semibold">
                  Total cost
                </th>
                <th className="px-3 py-2 text-right font-semibold">$/lb</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, idx) => (
                <tr
                  key={row.drug.id}
                  className={
                    idx === 0
                      ? "border-t border-brand-violet/15 bg-brand-violet/[0.04] font-semibold"
                      : "border-t border-brand-violet/10"
                  }
                >
                  <td className="px-3 py-2 text-brand-text-primary">
                    {row.drug.brand}
                    {idx === 0 && (
                      <span className="ml-2 inline-block rounded bg-brand-violet px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                        Best $/lb
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right text-brand-text-secondary">
                    {row.drug.trialPct.toFixed(1)}%
                  </td>
                  <td className="px-3 py-2 text-right text-brand-text-primary">
                    {row.expectedLossLbs.toFixed(1)}
                  </td>
                  <td className="px-3 py-2 text-right text-brand-text-primary">
                    {fmtMoney(row.totalCost)}
                  </td>
                  <td className="px-3 py-2 text-right text-brand-text-primary">
                    {row.costPerLb != null
                      ? fmtMoney(row.costPerLb)
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-brand-text-secondary leading-relaxed">
          Comparison uses each drug&apos;s typical US brand cash list
          price. The drug you selected above can use a custom monthly
          cost in the headline cards, but this table assumes
          everyone is paying sticker. If you have insurance coverage on
          one drug but not another, plug the real out-of-pocket
          numbers into the calculator above one at a time to compare.
        </p>
      </div>

      <p className="mt-6 rounded-lg border border-brand-violet/15 bg-white p-4 text-sm text-brand-text-secondary leading-relaxed">
        These numbers assume you reach the trial-average weight loss.
        Real-world results vary based on adherence, lifestyle, and
        biological response. Weight loss is also non-linear: most of
        the loss happens in months 1-9, then the curve flattens. The
        time-scaling here approximates that S-curve and is
        intentionally conservative for short horizons.
      </p>
    </div>
  );
}
