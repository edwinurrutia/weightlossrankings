"use client";

import { useMemo, useState } from "react";
import {
  DRUGS,
  type DrugId,
  simulateTitrationCurve,
  buildDoseSchedule,
  type SamplePoint,
} from "@/lib/pk-model";

const DRUG_OPTIONS: { id: DrugId; label: string; color: string }[] = [
  { id: "semaglutide", label: "Semaglutide", color: "#2563eb" },
  { id: "tirzepatide", label: "Tirzepatide", color: "#16a34a" },
  { id: "orforglipron", label: "Orforglipron (Foundayo)", color: "#f97316" },
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
    const y =
      dims.padding.top + innerH - (yVal / yMax) * innerH;
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

  // Doses in the visible window for the missed-dose picker
  const allDoses = useMemo(
    () => buildDoseSchedule(drug, totalWeeks),
    [drug, totalWeeks],
  );

  const totalDays = totalWeeks * 7;
  const innerW = DIMS.width - DIMS.padding.left - DIMS.padding.right;
  const innerH = DIMS.height - DIMS.padding.top - DIMS.padding.bottom;

  return (
    <div className="not-prose space-y-8">
      {/* Drug picker */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
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
              }}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                drugId === opt.id && !compareMode
                  ? "border-amber-500 bg-amber-50 text-amber-900"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCompareMode((c) => !c)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              compareMode
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            {compareMode ? "Compare mode (on)" : "Compare all"}
          </button>
        </div>
        {!compareMode && (
          <p className="mt-3 text-sm text-slate-600">
            Brand names: {drug.brandNames.join(", ")} · Half-life{" "}
            {drug.halfLifeHours} h · Dosing every{" "}
            {drug.intervalHours === 168
              ? "week"
              : drug.intervalHours === 24
                ? "day"
                : `${drug.intervalHours} h`}
          </p>
        )}
      </div>

      {/* Chart */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <svg
          viewBox={`0 0 ${DIMS.width} ${DIMS.height}`}
          className="w-full"
          role="img"
          aria-label="GLP-1 plasma concentration curve over titration timeline"
        >
          {/* Y-axis grid */}
          {[0, 0.25, 0.5, 0.75, 1.0, 1.25].map((yv) => {
            const y =
              DIMS.padding.top + innerH - (yv / yMax) * innerH;
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
          {/* Steady-state reference line */}
          <line
            x1={DIMS.padding.left}
            x2={DIMS.padding.left + innerW}
            y1={DIMS.padding.top + innerH - (1 / yMax) * innerH}
            y2={DIMS.padding.top + innerH - (1 / yMax) * innerH}
            stroke="#fbbf24"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
          {/* X-axis labels (weeks) */}
          {Array.from({ length: Math.floor(totalWeeks / 4) + 1 }, (_, i) => i * 4).map(
            (wk) => {
              const x =
                DIMS.padding.left + ((wk * 7) / totalDays) * innerW;
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
                <span className="text-slate-700">{opt.label}</span>
              </div>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs text-slate-500">
          Yellow dashed line = steady-state peak of the maintenance dose
          (defined as 100%). Curves show the standard titration ramp;
          all values are educational and relative, not absolute blood
          levels.
        </p>
      </div>

      {/* Missed dose simulator */}
      {!compareMode && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-base font-semibold text-slate-900">
            Missed dose simulator
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Tap a dose number below to skip that injection and see how the
            concentration curve responds.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMissedDose(null)}
              className={`rounded-md border px-3 py-1 text-xs font-semibold ${
                missedDose === null
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700"
              }`}
            >
              No missed dose
            </button>
            {allDoses.slice(0, 12).map((d, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMissedDose(i)}
                className={`rounded-md border px-3 py-1 text-xs font-semibold ${
                  missedDose === i
                    ? "border-amber-500 bg-amber-100 text-amber-900"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                Dose {i + 1} ({d.doseMg} mg)
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PK constants table */}
      {!compareMode && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-900">
            Pharmacokinetic parameters
          </h3>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-4">
            <div>
              <dt className="text-slate-500">Half-life</dt>
              <dd className="font-semibold text-slate-900">
                {drug.halfLifeHours} h ({(drug.halfLifeHours / 24).toFixed(1)} d)
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Steady state</dt>
              <dd className="font-semibold text-slate-900">
                ~{Math.ceil((5 * drug.halfLifeHours) / 168)} weeks of constant dose
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Dosing interval</dt>
              <dd className="font-semibold text-slate-900">
                {drug.intervalHours === 168
                  ? "Once weekly"
                  : drug.intervalHours === 24
                    ? "Once daily"
                    : `Every ${drug.intervalHours} h`}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Maintenance dose</dt>
              <dd className="font-semibold text-slate-900">
                {drug.maintenanceDoseMg} mg
              </dd>
            </div>
          </dl>
          <div className="mt-4 border-t border-slate-200 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Sources
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {drug.sources.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
