"use client";

import { useMemo, useState } from "react";
import {
  TRIAL_DATA,
  type DrugId,
  predict,
  buildPredictionCurve,
} from "@/lib/weight-loss-prediction";
import { trackToolEvent } from "@/lib/analytics";

type WeightUnit = "lbs" | "kg";

const DRUG_OPTIONS: { id: DrugId; color: string }[] = [
  { id: "semaglutide", color: "#8b5cf6" },
  { id: "tirzepatide", color: "#3b82f6" },
  { id: "orforglipron", color: "#4338ca" },
];

const CHART_DIMS = {
  width: 760,
  height: 340,
  padding: { top: 30, right: 30, bottom: 50, left: 60 },
};

function formatNum(n: number, decimals = 1): string {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(decimals);
}

function kgToLb(kg: number): number {
  return kg * 2.20462;
}
function lbToKg(lb: number): number {
  return lb / 2.20462;
}

export default function WeightLossCalculator() {
  const [weightInput, setWeightInput] = useState<string>("200");
  const [unit, setUnit] = useState<WeightUnit>("lbs");
  const [drug, setDrug] = useState<DrugId>("semaglutide");
  const [targetWeek, setTargetWeek] = useState<number>(68);

  const weight = parseFloat(weightInput);
  const weightLbs = unit === "lbs" ? weight : kgToLb(weight);

  const trial = TRIAL_DATA[drug];
  const prediction = useMemo(
    () => predict(weightLbs, drug, targetWeek),
    [weightLbs, drug, targetWeek],
  );
  const curve = useMemo(
    () => buildPredictionCurve(weightLbs, drug),
    [weightLbs, drug],
  );
  const allCurves = useMemo(
    () =>
      DRUG_OPTIONS.map((opt) => ({
        id: opt.id,
        color: opt.color,
        curve: buildPredictionCurve(weightLbs, opt.id),
      })),
    [weightLbs],
  );

  const displayLoss = (lbs: number) =>
    unit === "lbs" ? `${formatNum(lbs)} lbs` : `${formatNum(lbToKg(lbs))} kg`;
  const displayWeight = (lbs: number) =>
    unit === "lbs"
      ? `${formatNum(lbs, 0)} lbs`
      : `${formatNum(lbToKg(lbs), 0)} kg`;

  // Chart math — plot the 3-drug comparison curves
  const innerW =
    CHART_DIMS.width - CHART_DIMS.padding.left - CHART_DIMS.padding.right;
  const innerH =
    CHART_DIMS.height - CHART_DIMS.padding.top - CHART_DIMS.padding.bottom;
  const maxWeek = 72;
  // yMax is max % loss across all curves + a little headroom
  const yMax = Math.max(
    ...allCurves.flatMap((c) => c.curve.map((p) => p.meanPct)),
    25,
  );

  const buildPath = (
    points: { week: number; meanPct: number }[],
  ): string => {
    const cmds: string[] = [];
    points.forEach((p, i) => {
      const x =
        CHART_DIMS.padding.left + (p.week / maxWeek) * innerW;
      const y =
        CHART_DIMS.padding.top + innerH - (p.meanPct / yMax) * innerH;
      cmds.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
    });
    return cmds.join(" ");
  };

  return (
    <div className="not-prose space-y-8">
      {/* ── Inputs ── */}
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Starting weight */}
          <div>
            <label
              htmlFor="weight-input"
              className="block text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2"
            >
              Starting weight
            </label>
            <div className="flex items-center gap-2">
              <input
                id="weight-input"
                type="number"
                inputMode="decimal"
                min="50"
                max="700"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="w-32 rounded-lg border border-slate-300 px-4 py-3 text-2xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
              />
              <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setUnit("lbs")}
                  className={`px-3 py-3 text-sm font-semibold ${
                    unit === "lbs"
                      ? "bg-brand-violet text-white"
                      : "bg-white text-brand-text-primary"
                  }`}
                >
                  lbs
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("kg")}
                  className={`px-3 py-3 text-sm font-semibold ${
                    unit === "kg"
                      ? "bg-brand-violet text-white"
                      : "bg-white text-brand-text-primary"
                  }`}
                >
                  kg
                </button>
              </div>
            </div>
          </div>

          {/* Week target */}
          <div>
            <label
              htmlFor="week-input"
              className="block text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2"
            >
              Target week of therapy
            </label>
            <div className="flex items-center gap-3">
              <input
                id="week-input"
                type="range"
                min="0"
                max={maxWeek}
                step="1"
                value={targetWeek}
                onChange={(e) => setTargetWeek(parseInt(e.target.value))}
                className="flex-1 accent-brand-violet"
              />
              <div className="w-20 text-right font-mono text-lg font-bold text-brand-text-primary tabular-nums">
                Wk {targetWeek}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {[4, 12, 20, 28, 52, 68].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setTargetWeek(w)}
                  className="text-sm font-semibold rounded-md border border-slate-200 bg-slate-50 px-3 py-2 min-h-[40px] text-brand-text-secondary hover:border-brand-violet/40 hover:text-brand-violet transition"
                >
                  Wk {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drug picker */}
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2">
            Medication
          </p>
          <div className="flex flex-wrap gap-2">
            {DRUG_OPTIONS.map((opt) => {
              const data = TRIAL_DATA[opt.id];
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setDrug(opt.id);
                    trackToolEvent("weight_loss_calc", "drug_change", {
                      drug: opt.id,
                    });
                  }}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition text-left ${
                    drug === opt.id
                      ? "border-brand-violet bg-brand-violet/10 text-brand-violet"
                      : "border-slate-200 bg-white text-brand-text-primary hover:border-brand-violet/40"
                  }`}
                >
                  <div>{data.displayName}</div>
                  <div className="text-xs font-normal text-brand-text-secondary mt-0.5">
                    {data.brandName} · {data.dose}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Prediction output card ── */}
      <div className="rounded-2xl border border-brand-violet/30 bg-brand-violet/5 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold">
          Predicted weight loss at week {targetWeek} on {trial.displayName}
        </p>

        <div className="mt-3 flex items-baseline gap-3 flex-wrap">
          <p className="text-4xl sm:text-5xl font-bold text-brand-violet tabular-nums">
            −{formatNum(prediction.meanPct)}%
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-brand-text-primary">
            ≈ {displayLoss(prediction.meanLossAbsolute)}
          </p>
        </div>

        <p className="mt-2 text-sm text-brand-text-secondary">
          Starting {displayWeight(weightLbs)} → predicted end weight{" "}
          <strong className="text-brand-text-primary">
            {displayWeight(prediction.meanEndWeight)}
          </strong>
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-brand-violet/20 bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary">
              Conservative
            </p>
            <p className="mt-1 text-xl font-bold text-brand-text-primary tabular-nums">
              −{formatNum(prediction.lowPct)}%
            </p>
            <p className="text-xs text-brand-text-secondary">
              {displayLoss(prediction.lowLossAbsolute)}
            </p>
          </div>
          <div className="rounded-lg border border-brand-violet/40 bg-brand-violet/10 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
              Mean (trial avg)
            </p>
            <p className="mt-1 text-xl font-bold text-brand-violet tabular-nums">
              −{formatNum(prediction.meanPct)}%
            </p>
            <p className="text-xs text-brand-text-secondary">
              {displayLoss(prediction.meanLossAbsolute)}
            </p>
          </div>
          <div className="rounded-lg border border-brand-violet/20 bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary">
              Optimistic
            </p>
            <p className="mt-1 text-xl font-bold text-brand-text-primary tabular-nums">
              −{formatNum(prediction.highPct)}%
            </p>
            <p className="text-xs text-brand-text-secondary">
              {displayLoss(prediction.highLossAbsolute)}
            </p>
          </div>
        </div>

        <p className="mt-5 text-xs text-brand-text-secondary">
          Sourced from {trial.trialSource} ({trial.trialName},{" "}
          {trial.pmid ? `PMID ${trial.pmid}` : "Lilly press release"}),
          scaled linearly to your starting weight. Individual results
          vary substantially — see the full range below and the
          disclaimer at the bottom of the page.
        </p>
      </div>

      {/* ── 3-drug comparison chart ── */}
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2">
          Trial weight loss curves (all 3 drugs)
        </p>
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${CHART_DIMS.width} ${CHART_DIMS.height}`}
            className="w-full"
            role="img"
            aria-label="STEP-1, SURMOUNT-1, and ATTAIN-1 weight loss trial curves"
          >
            {/* Y grid + labels */}
            {[0, 5, 10, 15, 20, 25].map((yv) => {
              const y =
                CHART_DIMS.padding.top + innerH - (yv / yMax) * innerH;
              return (
                <g key={yv}>
                  <line
                    x1={CHART_DIMS.padding.left}
                    x2={CHART_DIMS.padding.left + innerW}
                    y1={y}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeWidth={1}
                  />
                  <text
                    x={CHART_DIMS.padding.left - 8}
                    y={y + 4}
                    textAnchor="end"
                    fontSize={11}
                    fill="#64748b"
                  >
                    −{yv}%
                  </text>
                </g>
              );
            })}

            {/* X labels (weeks) */}
            {[0, 12, 24, 36, 48, 60, 72].map((wk) => {
              const x =
                CHART_DIMS.padding.left + (wk / maxWeek) * innerW;
              return (
                <g key={wk}>
                  <line
                    x1={x}
                    x2={x}
                    y1={CHART_DIMS.padding.top + innerH}
                    y2={CHART_DIMS.padding.top + innerH + 4}
                    stroke="#94a3b8"
                  />
                  <text
                    x={x}
                    y={CHART_DIMS.padding.top + innerH + 18}
                    textAnchor="middle"
                    fontSize={11}
                    fill="#64748b"
                  >
                    Wk {wk}
                  </text>
                </g>
              );
            })}
            <text
              x={CHART_DIMS.padding.left + innerW / 2}
              y={CHART_DIMS.height - 8}
              textAnchor="middle"
              fontSize={12}
              fill="#475569"
              fontWeight={600}
            >
              Weeks of therapy
            </text>
            <text
              x={14}
              y={CHART_DIMS.padding.top + innerH / 2}
              textAnchor="middle"
              fontSize={12}
              fill="#475569"
              fontWeight={600}
              transform={`rotate(-90 14 ${CHART_DIMS.padding.top + innerH / 2})`}
            >
              Mean weight loss
            </text>

            {/* Vertical marker at target week */}
            <line
              x1={CHART_DIMS.padding.left + (targetWeek / maxWeek) * innerW}
              x2={CHART_DIMS.padding.left + (targetWeek / maxWeek) * innerW}
              y1={CHART_DIMS.padding.top}
              y2={CHART_DIMS.padding.top + innerH}
              stroke="#8b5cf6"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              opacity={0.5}
            />

            {/* All 3 curves */}
            {allCurves.map((c) => (
              <g key={c.id}>
                <path
                  d={buildPath(c.curve)}
                  fill="none"
                  stroke={c.color}
                  strokeWidth={c.id === drug ? 3.5 : 2}
                  opacity={c.id === drug ? 1 : 0.35}
                />
                {c.curve.map((p, i) => (
                  <circle
                    key={i}
                    cx={CHART_DIMS.padding.left + (p.week / maxWeek) * innerW}
                    cy={
                      CHART_DIMS.padding.top +
                      innerH -
                      (p.meanPct / yMax) * innerH
                    }
                    r={c.id === drug ? 3.5 : 2}
                    fill={c.color}
                    opacity={c.id === drug ? 1 : 0.35}
                  />
                ))}
              </g>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {DRUG_OPTIONS.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-6 rounded"
                style={{ background: opt.color }}
              />
              <span className="text-brand-text-primary font-medium">
                {TRIAL_DATA[opt.id].displayName}
              </span>
              <span className="text-xs text-brand-text-secondary">
                ({TRIAL_DATA[opt.id].trialName})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Milestone table ── */}
      <div>
        <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
          Your predicted weight at every milestone — {trial.displayName}
        </h3>
        <p className="text-sm text-brand-text-secondary mb-4">
          Starting from {displayWeight(weightLbs)}, here&apos;s what the
          trial data predicts at each major timepoint.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-brand-violet/15 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-violet/15">
                <th className="px-4 py-3 text-left font-semibold text-brand-text-secondary uppercase text-xs tracking-wider">
                  Week
                </th>
                <th className="px-4 py-3 text-right font-semibold text-brand-text-secondary uppercase text-xs tracking-wider">
                  Loss %
                </th>
                <th className="px-4 py-3 text-right font-semibold text-brand-text-secondary uppercase text-xs tracking-wider">
                  Loss
                </th>
                <th className="px-4 py-3 text-right font-semibold text-brand-text-secondary uppercase text-xs tracking-wider">
                  End weight
                </th>
              </tr>
            </thead>
            <tbody>
              {curve.map((p) => (
                <tr
                  key={p.week}
                  className={`border-b border-slate-100 last:border-0 ${
                    p.week === targetWeek ? "bg-brand-violet/5" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-bold text-brand-text-primary">
                    Wk {p.week}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-brand-text-primary tabular-nums">
                    −{formatNum(p.meanPct)}%
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-brand-text-primary tabular-nums">
                    {displayLoss(p.meanLossAbsolute)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-brand-text-primary tabular-nums">
                    {displayWeight(p.meanEndWeight)}
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
