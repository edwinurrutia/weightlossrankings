"use client";

import { useMemo, useState } from "react";
import {
  ACCESS_OPTIONS,
  compareCosts,
  getAccessOption,
  type AccessPath,
} from "@/lib/savings-calculator-2026";
import { trackToolEvent } from "@/lib/analytics";

const fmt = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function SavingsCalculator() {
  const [baselineId, setBaselineId] = useState<AccessPath>("wegovy-novocare");
  const [alternativeId, setAlternativeId] =
    useState<AccessPath>("foundayo-self-pay");

  const [baselineOverride, setBaselineOverride] = useState<string>("");
  const [alternativeOverride, setAlternativeOverride] = useState<string>("");

  const baselineOpt = getAccessOption(baselineId);
  const alternativeOpt = getAccessOption(alternativeId);

  const baselineMonthly =
    parseFloat(baselineOverride) || baselineOpt?.defaultMonthlyCost || 0;
  const alternativeMonthly =
    parseFloat(alternativeOverride) || alternativeOpt?.defaultMonthlyCost || 0;

  const comparison = useMemo(
    () => compareCosts(baselineMonthly, alternativeMonthly),
    [baselineMonthly, alternativeMonthly],
  );

  const isCheaper = comparison.monthlySavings > 0;
  const isMoreExpensive = comparison.monthlySavings < 0;

  return (
    <div className="not-prose space-y-8">
      {/* ── Baseline + Alternative pickers ── */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Baseline */}
        <div className="rounded-2xl border border-brand-violet/15 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2">
            Currently paying
          </p>
          <select
            value={baselineId}
            onChange={(e) => {
              setBaselineId(e.target.value as AccessPath);
              setBaselineOverride("");
              trackToolEvent("savings_calculator", "baseline_change", {
                baseline: e.target.value,
              });
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-base font-semibold text-brand-text-primary bg-white focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
          >
            {ACCESS_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label} — {fmt(o.defaultMonthlyCost)}/mo
              </option>
            ))}
          </select>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
              Override monthly cost
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-brand-text-secondary">
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                placeholder={String(baselineOpt?.defaultMonthlyCost ?? "")}
                value={baselineOverride}
                onChange={(e) => setBaselineOverride(e.target.value)}
                className="w-28 rounded-lg border border-slate-300 px-3 py-2 text-xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
              />
              <span className="text-sm text-brand-text-secondary">/mo</span>
            </div>
          </div>
          {baselineOpt && (
            <p className="mt-3 text-xs text-brand-text-secondary leading-relaxed">
              <strong>{baselineOpt.source}.</strong> {baselineOpt.notes}
            </p>
          )}
        </div>

        {/* Alternative */}
        <div className="rounded-2xl border border-brand-violet/15 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2">
            Switching to
          </p>
          <select
            value={alternativeId}
            onChange={(e) => {
              setAlternativeId(e.target.value as AccessPath);
              setAlternativeOverride("");
              trackToolEvent("savings_calculator", "alternative_change", {
                alternative: e.target.value,
              });
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-base font-semibold text-brand-text-primary bg-white focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
          >
            {ACCESS_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label} — {fmt(o.defaultMonthlyCost)}/mo
              </option>
            ))}
          </select>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
              Override monthly cost
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-brand-text-secondary">
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                placeholder={String(alternativeOpt?.defaultMonthlyCost ?? "")}
                value={alternativeOverride}
                onChange={(e) => setAlternativeOverride(e.target.value)}
                className="w-28 rounded-lg border border-slate-300 px-3 py-2 text-xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
              />
              <span className="text-sm text-brand-text-secondary">/mo</span>
            </div>
          </div>
          {alternativeOpt && (
            <p className="mt-3 text-xs text-brand-text-secondary leading-relaxed">
              <strong>{alternativeOpt.source}.</strong> {alternativeOpt.notes}
            </p>
          )}
        </div>
      </div>

      {/* ── Result card ── */}
      <div
        className={`rounded-2xl border p-6 sm:p-8 ${
          isCheaper
            ? "border-brand-violet/30 bg-brand-violet/5"
            : isMoreExpensive
              ? "border-slate-300 bg-slate-50"
              : "border-brand-violet/20 bg-white"
        }`}
      >
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold">
          {isCheaper
            ? "You would save"
            : isMoreExpensive
              ? "You would pay extra"
              : "Same monthly cost"}
        </p>

        <div className="mt-3 flex items-baseline gap-3 flex-wrap">
          <p className="text-4xl sm:text-5xl font-bold text-brand-violet tabular-nums">
            {fmt(Math.abs(comparison.monthlySavings))}
          </p>
          <p className="text-lg sm:text-xl font-semibold text-brand-text-secondary">
            per month
          </p>
        </div>
        <p className="mt-1 text-sm text-brand-text-secondary">
          {fmt(comparison.baselineMonthly)} →{" "}
          <strong className="text-brand-text-primary">
            {fmt(comparison.alternativeMonthly)}
          </strong>{" "}
          ({comparison.pctSavings.toFixed(0)}%
          {isCheaper ? " less" : isMoreExpensive ? " more" : ""})
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-brand-violet/20 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary">
              1 year
            </p>
            <p
              className={`mt-1 text-2xl font-bold tabular-nums ${
                comparison.yearOneSavings >= 0
                  ? "text-brand-violet"
                  : "text-slate-500"
              }`}
            >
              {comparison.yearOneSavings >= 0 ? "+" : ""}
              {fmt(Math.abs(comparison.yearOneSavings))}
            </p>
          </div>
          <div className="rounded-lg border border-brand-violet/20 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary">
              2 years
            </p>
            <p
              className={`mt-1 text-2xl font-bold tabular-nums ${
                comparison.yearTwoSavings >= 0
                  ? "text-brand-violet"
                  : "text-slate-500"
              }`}
            >
              {comparison.yearTwoSavings >= 0 ? "+" : ""}
              {fmt(Math.abs(comparison.yearTwoSavings))}
            </p>
          </div>
          <div className="rounded-lg border border-brand-violet/20 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary">
              5 years
            </p>
            <p
              className={`mt-1 text-2xl font-bold tabular-nums ${
                comparison.yearFiveSavings >= 0
                  ? "text-brand-violet"
                  : "text-slate-500"
              }`}
            >
              {comparison.yearFiveSavings >= 0 ? "+" : ""}
              {fmt(Math.abs(comparison.yearFiveSavings))}
            </p>
          </div>
        </div>
      </div>

      {/* ── Reference table ── */}
      <div>
        <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
          2026 monthly cost reference
        </h3>
        <p className="text-sm text-brand-text-secondary mb-4">
          Best-effort 2026 monthly cost snapshot for every common
          GLP-1 access path. Always confirm your actual price with
          your prescriber, pharmacy, or telehealth provider before
          committing.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-brand-violet/15 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-violet/15">
                <th className="px-4 py-3 text-left font-semibold text-brand-text-secondary uppercase text-xs tracking-wider">
                  Access path
                </th>
                <th className="px-4 py-3 text-right font-semibold text-brand-text-secondary uppercase text-xs tracking-wider">
                  Monthly
                </th>
                <th className="px-4 py-3 text-right font-semibold text-brand-text-secondary uppercase text-xs tracking-wider">
                  1 year
                </th>
                <th className="px-4 py-3 text-right font-semibold text-brand-text-secondary uppercase text-xs tracking-wider">
                  5 years
                </th>
              </tr>
            </thead>
            <tbody>
              {ACCESS_OPTIONS.map((opt) => (
                <tr
                  key={opt.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-3 font-semibold text-brand-text-primary">
                    {opt.label}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-brand-text-primary tabular-nums">
                    {fmt(opt.defaultMonthlyCost)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-brand-text-primary tabular-nums">
                    {fmt(opt.defaultMonthlyCost * 12)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-brand-text-primary tabular-nums">
                    {fmt(opt.defaultMonthlyCost * 60)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
