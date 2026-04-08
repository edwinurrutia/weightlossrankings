"use client";

import { useMemo, useState } from "react";
import {
  COMORBIDITY_LABELS,
  evaluateAllPayers,
  inToCm,
  lbToKg,
  type Comorbidity,
} from "@/lib/bariatric-eligibility";
import { trackToolEvent } from "@/lib/analytics";

type Unit = "metric" | "imperial";

const COMORBIDITIES_TO_OFFER: Comorbidity[] = [
  "type-2-diabetes",
  "hypertension",
  "severe-osa",
  "dyslipidemia",
  "nash",
  "pcos",
  "coronary-heart-disease",
  "severe-joint-disease",
];

export default function BariatricEligibilityChecker() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [weightInput, setWeightInput] = useState("260");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("8");
  const [heightCmInput, setHeightCmInput] = useState("173");
  const [age, setAge] = useState("45");
  const [comorbidities, setComorbidities] = useState<Set<Comorbidity>>(
    new Set(),
  );

  const weightKg = useMemo(() => {
    const w = parseFloat(weightInput);
    if (!Number.isFinite(w) || w <= 0) return 0;
    return unit === "metric" ? w : lbToKg(w);
  }, [unit, weightInput]);

  const heightCm = useMemo(() => {
    if (unit === "metric") {
      const h = parseFloat(heightCmInput);
      return Number.isFinite(h) && h > 0 ? h : 0;
    }
    const ft = parseFloat(heightFt || "0");
    const inch = parseFloat(heightIn || "0");
    return ft * 12 + inch > 0 ? inToCm(ft * 12 + inch) : 0;
  }, [unit, heightCmInput, heightFt, heightIn]);

  const ageYears = parseFloat(age) || 0;

  const summary = useMemo(
    () =>
      evaluateAllPayers({
        weightKg,
        heightCm,
        ageYears,
        comorbidities: Array.from(comorbidities),
      }),
    [weightKg, heightCm, ageYears, comorbidities],
  );

  const toggleComorbidity = (c: Comorbidity) => {
    setComorbidities((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      trackToolEvent("bariatric_eligibility", "comorbidity_change", { c });
      return next;
    });
  };

  return (
    <div className="not-prose space-y-8">
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden w-fit">
            <button
              type="button"
              onClick={() => setUnit("imperial")}
              className={`px-4 py-2 text-sm font-semibold ${
                unit === "imperial"
                  ? "bg-brand-violet text-white"
                  : "bg-white text-brand-text-secondary hover:bg-slate-50"
              }`}
            >
              Imperial
            </button>
            <button
              type="button"
              onClick={() => setUnit("metric")}
              className={`px-4 py-2 text-sm font-semibold ${
                unit === "metric"
                  ? "bg-brand-violet text-white"
                  : "bg-white text-brand-text-secondary hover:bg-slate-50"
              }`}
            >
              Metric
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Field label="Age (years)">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
              min={14}
              max={110}
            />
          </Field>
          <Field label={`Weight (${unit === "metric" ? "kg" : "lb"})`}>
            <input
              type="number"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
            />
          </Field>
          {unit === "metric" ? (
            <Field label="Height (cm)">
              <input
                type="number"
                value={heightCmInput}
                onChange={(e) => setHeightCmInput(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
              />
            </Field>
          ) : (
            <Field label="Height (ft / in)">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="w-1/2 rounded-md border border-slate-200 px-3 py-2 text-base"
                  placeholder="ft"
                />
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  className="w-1/2 rounded-md border border-slate-200 px-3 py-2 text-base"
                  placeholder="in"
                />
              </div>
            </Field>
          )}
        </div>

        <div className="mt-6">
          <div className="text-xs uppercase tracking-wide text-brand-text-secondary font-bold mb-3">
            Obesity-related comorbidities (check all that apply)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COMORBIDITIES_TO_OFFER.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-brand-bg-purple cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={comorbidities.has(c)}
                  onChange={() => toggleComorbidity(c)}
                  className="h-4 w-4 text-brand-violet"
                />
                <span className="text-sm text-brand-text-primary">
                  {COMORBIDITY_LABELS[c]}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {summary.bmi > 0 && (
        <div className="rounded-2xl border border-brand-violet/20 bg-gradient-to-br from-brand-bg-purple to-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-baseline gap-4 mb-6">
            <div className="text-4xl font-bold text-brand-violet">
              BMI {summary.bmi.toFixed(1)}
            </div>
            <div className="text-base text-brand-text-secondary">
              {summary.bmiClass}
            </div>
          </div>

          <div className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
            Eligibility under each standard
          </div>
          <div className="space-y-3">
            {summary.results.map((r) => (
              <div
                key={r.payer.id}
                className={`rounded-xl border p-4 ${
                  r.eligible
                    ? "border-brand-violet/40 bg-white"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-brand-text-primary">
                      {r.payer.label}
                    </div>
                    <div className="text-xs text-brand-text-secondary mt-0.5 uppercase tracking-wide">
                      {r.payer.type === "guideline" ? "Academic guideline" : "Payer policy"}
                    </div>
                  </div>
                  <div
                    className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded ${
                      r.eligible
                        ? "bg-brand-violet text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {r.eligible ? "Likely eligible" : "Not eligible"}
                  </div>
                </div>
                {r.reasons.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-brand-text-secondary">
                    {r.reasons.map((x, i) => (
                      <li key={i}>· {x}</li>
                    ))}
                  </ul>
                )}
                {r.unmetRequirements.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-brand-text-secondary">
                    {r.unmetRequirements.map((x, i) => (
                      <li key={i}>✕ {x}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-3 text-xs text-brand-text-secondary">
                  <a
                    href={r.payer.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-violet hover:underline break-all"
                  >
                    Source: {r.payer.sourceUrl}
                  </a>
                  <span className="ml-2 opacity-75">
                    Last verified {r.payer.lastVerified}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide text-brand-text-secondary font-bold mb-1 block">
        {label}
      </span>
      {children}
    </label>
  );
}
