"use client";

import { useMemo, useState } from "react";
import {
  DRUGS,
  type DrugId,
  simulateTitrationCurve,
  currentDoseAtWeek,
  type SamplePoint,
} from "@/lib/pk-model";

// Compare-mode palette: each drug gets a clearly distinct hue while
// staying brand-aligned. Brand-violet and brand-blue are the two
// primary brand colors; teal and pink are complementary accent colors
// that read as separate curves at chart scale. Tested visually for
// distinguishability across all 4 simultaneous traces.
const DRUG_OPTIONS: {
  id: DrugId;
  label: string;
  color: string;
  investigational?: boolean;
}[] = [
  { id: "semaglutide", label: "Semaglutide", color: "#8b5cf6" }, // violet (brand)
  { id: "tirzepatide", label: "Tirzepatide", color: "#3b82f6" }, // blue (brand)
  { id: "orforglipron", label: "Orforglipron", color: "#14b8a6" }, // teal
  {
    id: "retatrutide",
    label: "Retatrutide",
    color: "#ec4899", // pink — investigational drug, visually distinct
    investigational: true,
  },
];

const DEFAULT_WEEKS = 24;

interface ChartDimensions {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
}

const DIMS: ChartDimensions = {
  width: 760,
  height: 360,
  padding: { top: 20, right: 30, bottom: 50, left: 50 },
};

function buildPath(
  points: SamplePoint[],
  totalWeeks: number,
  yMax: number,
  dims: ChartDimensions,
): string {
  const innerW = dims.width - dims.padding.left - dims.padding.right;
  const innerH = dims.height - dims.padding.top - dims.padding.bottom;
  const totalDays = totalWeeks * 7;
  const cmds: string[] = [];
  points.forEach((p, i) => {
    const x = dims.padding.left + (p.day / totalDays) * innerW;
    const yVal = Math.min(p.relativeConcentration, yMax);
    const y = dims.padding.top + innerH - (yVal / yMax) * innerH;
    cmds.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  });
  return cmds.join(" ");
}

export default function DosePlotter() {
  const [drugId, setDrugId] = useState<DrugId>("semaglutide");
  const [compareMode, setCompareMode] = useState(false);
  const [missedDose, setMissedDose] = useState<number | null>(null);
  const totalWeeks = DEFAULT_WEEKS;
  const drug = DRUGS[drugId];

  const primaryCurve = useMemo(
    () =>
      simulateTitrationCurve(drug, totalWeeks, {
        missedDoseIndices: missedDose !== null ? [missedDose] : [],
      }),
    [drug, totalWeeks, missedDose],
  );

  const compareCurves = useMemo(() => {
    if (!compareMode) return null;
    return DRUG_OPTIONS.map((opt) => ({
      opt,
      curve: simulateTitrationCurve(DRUGS[opt.id], totalWeeks),
    }));
  }, [compareMode, totalWeeks]);

  const yMax = 1.4; // headroom above SS = 1.0

  // Compute the titration "steps" excluding the open-ended maintenance.
  const titrationSteps = drug.titration;

  const totalDays = totalWeeks * 7;
  const innerW = DIMS.width - DIMS.padding.left - DIMS.padding.right;
  const innerH = DIMS.height - DIMS.padding.top - DIMS.padding.bottom;

  // Compute steady-state weeks heuristic for the PK card
  const ssWeeks = Math.ceil((5 * drug.halfLifeHours) / 168);

  return (
    <div className="not-prose space-y-8">
      {/* ── Drug picker ── */}
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold">
          Select medication
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {DRUG_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setDrugId(opt.id);
                setMissedDose(null);
                setCompareMode(false);
              }}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition flex items-center gap-2 ${
                drugId === opt.id && !compareMode
                  ? "border-brand-violet bg-brand-violet/10 text-brand-violet"
                  : "border-slate-200 bg-white text-brand-text-primary hover:border-brand-violet/40"
              }`}
            >
              {opt.label}
              {opt.investigational && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-brand-blue bg-brand-blue/10 border border-brand-blue/20 rounded-full px-2 py-0.5">
                  Investigational
                </span>
              )}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCompareMode((c) => !c)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              compareMode
                ? "border-brand-violet bg-brand-violet text-white"
                : "border-slate-200 bg-white text-brand-text-primary hover:border-brand-violet/40"
            }`}
          >
            {compareMode ? "Comparing all" : "Compare all"}
          </button>
        </div>
        {!compareMode && (
          <p className="mt-3 text-sm text-brand-text-secondary">
            Brand names: {drug.brandNames.join(", ")} · Half-life{" "}
            {drug.halfLifeHours} h ({(drug.halfLifeHours / 24).toFixed(1)} d) ·{" "}
            {drug.intervalHours === 168
              ? "Once weekly"
              : drug.intervalHours === 24
                ? "Once daily"
                : `Every ${drug.intervalHours} h`}
          </p>
        )}
      </div>

      {/* ── Titration step row ── */}
      {!compareMode && (
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold">
            Standard titration schedule
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {titrationSteps.map((step, i) => {
              const stepStartWeek = titrationSteps
                .slice(0, i)
                .reduce((sum, s) => sum + s.weeks, 0);
              const stepEndWeek = stepStartWeek + step.weeks;
              const isMaintenance = step.weeks >= 999;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-brand-violet/15 bg-white p-4 text-center"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
                    {isMaintenance
                      ? "Maintenance"
                      : `Wk ${stepStartWeek + 1}–${stepEndWeek}`}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-brand-violet">
                    {step.doseMg}
                    <span className="text-sm font-semibold text-brand-text-secondary ml-0.5">
                      mg
                    </span>
                  </p>
                  {isMaintenance && (
                    <p className="mt-1 text-[10px] uppercase tracking-wide text-brand-text-secondary">
                      target dose
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Chart ── */}
      <div className="overflow-x-auto rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm">
        <svg
          viewBox={`0 0 ${DIMS.width} ${DIMS.height}`}
          className="w-full"
          role="img"
          aria-label="GLP-1 plasma concentration curve over titration timeline"
        >
          {/* Y-axis grid */}
          {[0, 0.25, 0.5, 0.75, 1.0, 1.25].map((yv) => {
            const y = DIMS.padding.top + innerH - (yv / yMax) * innerH;
            return (
              <g key={yv}>
                <line
                  x1={DIMS.padding.left}
                  x2={DIMS.padding.left + innerW}
                  y1={y}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth={1}
                />
                <text
                  x={DIMS.padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={11}
                  fill="#64748b"
                >
                  {(yv * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}
          {/* Missed-dose week overlay — drawn UNDER the curve so the curve
              still reads on top. Visible only in single-drug mode. */}
          {!compareMode && missedDose !== null && (() => {
            // Convert the missed-dose index back to a week-of-therapy
            // (1-indexed) and span exactly one dosing interval (1 week).
            const missedWeekStart =
              (missedDose * drug.intervalHours) / 24; // in days
            const missedWeekEnd = missedWeekStart + 7; // span 1 week
            const x1 =
              DIMS.padding.left + (missedWeekStart / totalDays) * innerW;
            const x2 =
              DIMS.padding.left + (missedWeekEnd / totalDays) * innerW;
            return (
              <g aria-hidden>
                <rect
                  x={x1}
                  y={DIMS.padding.top}
                  width={x2 - x1}
                  height={innerH}
                  fill="#ec4899"
                  opacity={0.12}
                />
                <line
                  x1={x1}
                  x2={x1}
                  y1={DIMS.padding.top}
                  y2={DIMS.padding.top + innerH}
                  stroke="#ec4899"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  opacity={0.55}
                />
                <text
                  x={(x1 + x2) / 2}
                  y={DIMS.padding.top + 14}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={700}
                  fill="#be185d"
                >
                  MISSED
                </text>
              </g>
            );
          })()}
          {/* Steady-state reference line — brand violet dashed */}
          <line
            x1={DIMS.padding.left}
            x2={DIMS.padding.left + innerW}
            y1={DIMS.padding.top + innerH - (1 / yMax) * innerH}
            y2={DIMS.padding.top + innerH - (1 / yMax) * innerH}
            stroke="#8b5cf6"
            strokeWidth={2}
            strokeDasharray="6 4"
            opacity={0.55}
          />
          {/* X-axis labels (weeks) */}
          {Array.from({ length: Math.floor(totalWeeks / 4) + 1 }, (_, i) => i * 4).map(
            (wk) => {
              const x = DIMS.padding.left + ((wk * 7) / totalDays) * innerW;
              return (
                <g key={wk}>
                  <line
                    x1={x}
                    x2={x}
                    y1={DIMS.padding.top + innerH}
                    y2={DIMS.padding.top + innerH + 4}
                    stroke="#94a3b8"
                  />
                  <text
                    x={x}
                    y={DIMS.padding.top + innerH + 18}
                    textAnchor="middle"
                    fontSize={11}
                    fill="#64748b"
                  >
                    Wk {wk}
                  </text>
                </g>
              );
            },
          )}
          <text
            x={DIMS.padding.left + innerW / 2}
            y={DIMS.height - 8}
            textAnchor="middle"
            fontSize={12}
            fill="#475569"
            fontWeight={600}
          >
            Weeks of therapy
          </text>
          <text
            x={12}
            y={DIMS.padding.top + innerH / 2}
            textAnchor="middle"
            fontSize={12}
            fill="#475569"
            fontWeight={600}
            transform={`rotate(-90 12 ${DIMS.padding.top + innerH / 2})`}
          >
            Relative concentration
          </text>

          {/* Curves */}
          {compareMode && compareCurves
            ? compareCurves.map(({ opt, curve }) => (
                <path
                  key={opt.id}
                  d={buildPath(curve, totalWeeks, yMax, DIMS)}
                  fill="none"
                  stroke={opt.color}
                  strokeWidth={2.5}
                />
              ))
            : (
                <path
                  d={buildPath(primaryCurve, totalWeeks, yMax, DIMS)}
                  fill="none"
                  stroke={DRUG_OPTIONS.find((d) => d.id === drugId)!.color}
                  strokeWidth={2.5}
                />
              )}
        </svg>
        {compareMode && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {DRUG_OPTIONS.map((opt) => (
              <div key={opt.id} className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-6 rounded"
                  style={{ background: opt.color }}
                />
                <span className="text-brand-text-primary">{opt.label}</span>
                {opt.investigational && (
                  <span className="text-[10px] font-bold uppercase tracking-wide text-brand-blue">
                    investigational
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs text-brand-text-secondary">
          Dashed violet line = steady-state peak of the maintenance dose
          (defined as 100%). Curves show the standard titration ramp; all
          values are educational and relative, not absolute blood levels.
        </p>
      </div>

      {/* ── PK constants ── */}
      {!compareMode && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-brand-violet/15 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
              Half-life
            </p>
            <p className="mt-1 text-xl font-bold text-brand-text-primary">
              {(drug.halfLifeHours / 24).toFixed(1)} d
            </p>
            <p className="text-xs text-brand-text-secondary">
              {drug.halfLifeHours} h
            </p>
          </div>
          <div className="rounded-xl border border-brand-violet/15 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
              Steady state
            </p>
            <p className="mt-1 text-xl font-bold text-brand-text-primary">
              ~{ssWeeks} weeks
            </p>
            <p className="text-xs text-brand-text-secondary">
              4–5 half-lives at constant dose
            </p>
          </div>
          <div className="rounded-xl border border-brand-violet/15 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
              Dosing interval
            </p>
            <p className="mt-1 text-xl font-bold text-brand-text-primary">
              {drug.intervalHours === 168
                ? "Weekly"
                : drug.intervalHours === 24
                  ? "Daily"
                  : `Every ${drug.intervalHours} h`}
            </p>
            <p className="text-xs text-brand-text-secondary">
              {drug.intervalHours === 168
                ? "Subcutaneous injection"
                : "Oral tablet"}
            </p>
          </div>
          <div className="rounded-xl border border-brand-violet/15 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
              Maintenance dose
            </p>
            <p className="mt-1 text-xl font-bold text-brand-text-primary">
              {drug.maintenanceDoseMg} mg
            </p>
            <p className="text-xs text-brand-text-secondary">
              target after titration
            </p>
          </div>
        </div>
      )}

      {/* ── Missed dose simulator (compact: first 8 doses only) ── */}
      {!compareMode && (
        <div className="rounded-2xl border border-brand-violet/15 bg-brand-bg-purple/60 p-6">
          <h3 className="font-heading text-base font-bold text-brand-text-primary">
            Missed dose simulator
          </h3>
          <p className="mt-1 text-sm text-brand-text-secondary">
            Tap a dose number below to skip that injection and see how the
            concentration curve responds. Showing the first 8{" "}
            {drug.intervalHours === 168 ? "weekly doses" : "weeks"} of the
            titration ramp.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMissedDose(null)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${
                missedDose === null
                  ? "border-brand-violet bg-brand-violet text-white"
                  : "border-slate-300 bg-white text-brand-text-primary hover:border-brand-violet/40"
              }`}
            >
              No missed dose
            </button>
            {/* For weekly drugs, show one button per week (1-8). For daily
                drugs, show one button per week, mapping to the first dose
                of that week. */}
            {Array.from({ length: 8 }, (_, weekIdx) => {
              const actualIdx =
                drug.intervalHours === 168 ? weekIdx : weekIdx * 7;
              const doseMg = currentDoseAtWeek(drug, weekIdx);
              return (
                <button
                  key={weekIdx}
                  type="button"
                  onClick={() => setMissedDose(actualIdx)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                    missedDose === actualIdx
                      ? "border-brand-violet bg-brand-violet text-white"
                      : "border-slate-300 bg-white text-brand-text-primary hover:border-brand-violet/40"
                  }`}
                >
                  Week {weekIdx + 1} ({doseMg} mg)
                </button>
              );
            })}
          </div>
          {missedDose !== null && (
            <p className="mt-3 text-xs text-brand-text-secondary italic">
              Skipping the dose at week{" "}
              {Math.floor((missedDose * drug.intervalHours) / (7 * 24)) + 1}.
              Notice how the concentration drops and then recovers over the
              following 2–3 doses.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
