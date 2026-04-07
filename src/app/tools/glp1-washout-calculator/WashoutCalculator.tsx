"use client";

import { useMemo, useState } from "react";
import {
  DRUGS,
  buildDecayCurve,
  clinicalGuidanceForDrug,
  residualMilestones,
  type DrugId,
} from "@/lib/glp1-washout";
import { trackToolEvent } from "@/lib/analytics";

const DRUG_OPTIONS: { id: DrugId; label: string; brands: string }[] = [
  { id: "semaglutide", label: "Semaglutide", brands: "Wegovy, Ozempic" },
  { id: "tirzepatide", label: "Tirzepatide", brands: "Zepbound, Mounjaro" },
  { id: "orforglipron", label: "Orforglipron", brands: "Foundayo (oral)" },
  { id: "retatrutide", label: "Retatrutide", brands: "investigational" },
];

export default function WashoutCalculator() {
  const [drugId, setDrugId] = useState<DrugId>("semaglutide");

  const drug = DRUGS[drugId];
  const milestones = useMemo(() => residualMilestones(drug.halfLifeHours), [drug]);
  const guidance = useMemo(() => clinicalGuidanceForDrug(drug), [drug]);
  const curve = useMemo(() => buildDecayCurve(drug.halfLifeHours, 90, 90), [drug]);

  // Build inline SVG decay curve
  const W = 600;
  const H = 200;
  const padX = 40;
  const padY = 20;
  const plotW = W - 2 * padX;
  const plotH = H - 2 * padY;
  const maxDays = curve[curve.length - 1].days;
  const xAt = (d: number) => padX + (d / maxDays) * plotW;
  const yAt = (f: number) => padY + (1 - f) * plotH;
  const linePath = curve
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(p.days).toFixed(1)} ${yAt(p.fraction).toFixed(1)}`)
    .join(" ");

  const onDrugChange = (id: DrugId) => {
    setDrugId(id);
    trackToolEvent("washout_calculator", "drug_change", { drug: id });
  };

  return (
    <div className="not-prose space-y-8">
      {/* ── Drug picker ── */}
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-3">
          Pick your GLP-1
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DRUG_OPTIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => onDrugChange(d.id)}
              className={`min-h-[44px] px-3 py-3 rounded-lg text-sm font-semibold border text-left ${
                drugId === d.id
                  ? "bg-brand-violet text-white border-brand-violet"
                  : "bg-white text-brand-text-primary border-slate-200 hover:border-brand-violet/40"
              }`}
            >
              <div>{d.label}</div>
              <div
                className={`text-[10px] font-normal mt-0.5 ${
                  drugId === d.id ? "text-white/80" : "text-brand-text-secondary"
                }`}
              >
                {d.brands}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-brand-violet/5 border border-brand-violet/15 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-brand-text-secondary font-bold">
              Elimination half-life
            </p>
            <p className="mt-1 text-2xl font-bold text-brand-violet tabular-nums">
              {(drug.halfLifeHours / 24).toFixed(1)} days
            </p>
            <p className="text-[11px] text-brand-text-secondary mt-1">
              {drug.halfLifeHours.toFixed(0)} hours
            </p>
          </div>
          <div className="rounded-lg bg-brand-violet/5 border border-brand-violet/15 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-brand-text-secondary font-bold">
              Dosing interval
            </p>
            <p className="mt-1 text-2xl font-bold text-brand-violet tabular-nums">
              {drug.intervalHours === 168 ? "Weekly" : "Daily"}
            </p>
            <p className="text-[11px] text-brand-text-secondary mt-1">
              {drug.intervalHours === 168 ? "Once per 7 days" : "Once per 24 hours"}
            </p>
          </div>
          <div className="rounded-lg bg-brand-violet/5 border border-brand-violet/15 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-brand-text-secondary font-bold">
              Source
            </p>
            <p className="mt-1 text-xs text-brand-text-primary leading-snug">
              FDA prescribing information + published PK literature
            </p>
          </div>
        </div>
      </div>

      {/* ── Decay curve chart ── */}
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold">
          Drug concentration after your last dose
        </p>
        <p className="mt-1 text-sm text-brand-text-secondary">
          Population-mean exponential decay starting from your final
          steady-state peak. The curve does not account for individual
          variation in clearance.
        </p>
        <div className="mt-4 overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="GLP-1 concentration decay curve over 90 days"
            className="w-full h-auto min-w-[400px]"
          >
            {/* Y axis grid lines at 50%, 25%, 10%, 5% */}
            {[1.0, 0.5, 0.25, 0.1, 0.05, 0.01].map((f) => (
              <g key={f}>
                <line
                  x1={padX}
                  x2={W - padX}
                  y1={yAt(f)}
                  y2={yAt(f)}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
                <text
                  x={padX - 6}
                  y={yAt(f) + 4}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="sans-serif"
                >
                  {(f * 100).toFixed(f < 0.05 ? 0 : 0)}%
                </text>
              </g>
            ))}
            {/* X axis days */}
            {[0, 7, 14, 30, 60, 90].map((d) => (
              <g key={d}>
                <line
                  x1={xAt(d)}
                  x2={xAt(d)}
                  y1={yAt(0)}
                  y2={yAt(0) + 4}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <text
                  x={xAt(d)}
                  y={yAt(0) + 16}
                  fill="#64748b"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  {d}d
                </text>
              </g>
            ))}
            {/* The curve */}
            <path
              d={linePath}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Filled area under curve */}
            <path
              d={`${linePath} L ${xAt(maxDays).toFixed(1)} ${yAt(0).toFixed(1)} L ${xAt(0).toFixed(1)} ${yAt(0).toFixed(1)} Z`}
              fill="#8b5cf6"
              fillOpacity="0.08"
            />
          </svg>
        </div>
      </div>

      {/* ── Residual milestones table ── */}
      <div>
        <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
          Time to each residual concentration
        </h3>
        <p className="text-sm text-brand-text-secondary mb-4">
          How long after your last dose until the drug level drops to
          each fraction of its peak.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {milestones.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-brand-violet/15 bg-white p-4"
            >
              <p className="text-[11px] uppercase tracking-[0.14em] text-brand-text-secondary font-bold">
                {m.label} of peak
              </p>
              <p className="mt-1 text-2xl font-bold text-brand-violet tabular-nums">
                {m.formatted}
              </p>
              <p className="text-[11px] text-brand-text-secondary mt-1">
                {m.days.toFixed(1)} days after last dose
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Clinical guidance ── */}
      <div>
        <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
          Clinical scenarios
        </h3>
        <p className="text-sm text-brand-text-secondary mb-4">
          Common reasons patients ask &ldquo;how long does it stay in
          my system&rdquo; — with the standard practice for each.
        </p>
        <div className="space-y-3">
          {guidance.map((g) => (
            <div
              key={g.scenario}
              className="rounded-xl border border-brand-violet/15 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-brand-text-primary">
                    {g.scenario}
                  </p>
                  <p className="text-sm text-brand-text-secondary mt-1 leading-relaxed">
                    {g.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-brand-violet tabular-nums">
                    {g.recommendedDays} {g.recommendedDays === 1 ? "day" : "days"}
                  </p>
                  <p className="text-[11px] text-brand-text-secondary">
                    ~{(g.fractionRemaining * 100).toFixed(g.fractionRemaining < 0.001 ? 3 : 2)}% remaining
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-brand-text-secondary border-t border-slate-100 pt-2">
                <span className="font-bold uppercase tracking-wider">
                  Source:
                </span>{" "}
                {g.source}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-brand-violet/20 bg-brand-violet/5 p-5">
        <p className="text-sm text-brand-text-primary leading-relaxed">
          <strong>Important caveats.</strong> These calculations use the
          population-mean half-life from the FDA prescribing
          information. Individual half-lives can vary by ±30% based on
          body composition, kidney function, and how long you were on
          a stable maintenance dose before stopping. The pharmacologic
          effect (gastric emptying, satiety) often outlasts the blood
          concentration. Do not use this tool to make medical
          decisions without confirming with your prescriber.
        </p>
      </div>
    </div>
  );
}
