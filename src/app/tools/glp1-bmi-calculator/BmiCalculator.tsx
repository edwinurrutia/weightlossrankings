"use client";

import { useMemo, useState } from "react";
import {
  BMI_CATEGORIES,
  bmiAfterLoss,
  calculateBmi,
  categorize,
  isGlp1Eligible,
  type BmiCategory,
  type Unit,
} from "@/lib/bmi";
import { trackToolEvent } from "@/lib/analytics";

const TRIAL_OUTCOMES = [
  {
    label: "Wegovy (semaglutide 2.4 mg)",
    pct: 14.9,
    trial: "STEP-1, NEJM 2021",
    color: "#8b5cf6",
  },
  {
    label: "Zepbound (tirzepatide 15 mg)",
    pct: 20.9,
    trial: "SURMOUNT-1, NEJM 2022",
    color: "#3b82f6",
  },
  {
    label: "Foundayo (orforglipron)",
    pct: 12.4,
    trial: "ATTAIN-1, Lilly 2026",
    color: "#4338ca",
  },
];

const CATEGORY_COLORS: Record<BmiCategory, string> = {
  underweight: "#06b6d4",
  normal: "#10b981",
  overweight: "#facc15",
  "obese-class-1": "#f97316",
  "obese-class-2": "#ef4444",
  "obese-class-3": "#b91c1c",
};

function formatBmi(bmi: number): string {
  if (!Number.isFinite(bmi) || bmi <= 0) return "—";
  return bmi.toFixed(1);
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [weightInput, setWeightInput] = useState<string>("220");
  const [heightFtInput, setHeightFtInput] = useState<string>("5");
  const [heightInInput, setHeightInInput] = useState<string>("9");
  const [heightCmInput, setHeightCmInput] = useState<string>("175");

  const weight = parseFloat(weightInput);
  const totalInches =
    parseFloat(heightFtInput || "0") * 12 + parseFloat(heightInInput || "0");
  const heightCm = parseFloat(heightCmInput);

  const result = useMemo(() => {
    if (unit === "metric") return calculateBmi(weight, heightCm, "metric");
    return calculateBmi(weight, totalInches, "imperial");
  }, [unit, weight, totalInches, heightCm]);

  const eligibility = isGlp1Eligible(result.bmi);

  // Build the BMI scale visualization
  const bmiScaleMin = 15;
  const bmiScaleMax = 50;
  const scaleWidth = 100;
  const bmiToPct = (bmi: number): number => {
    const clamped = Math.max(bmiScaleMin, Math.min(bmiScaleMax, bmi));
    return ((clamped - bmiScaleMin) / (bmiScaleMax - bmiScaleMin)) * scaleWidth;
  };

  return (
    <div className="not-prose space-y-8">
      {/* ── Inputs ── */}
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        {/* Unit toggle */}
        <div className="mb-6">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden w-fit">
            <button
              type="button"
              onClick={() => {
                setUnit("imperial");
                trackToolEvent("bmi_calculator", "unit_change", { unit: "imperial" });
              }}
              className={`px-4 py-2 text-sm font-semibold ${
                unit === "imperial"
                  ? "bg-brand-violet text-white"
                  : "bg-white text-brand-text-primary"
              }`}
            >
              lbs / ft+in
            </button>
            <button
              type="button"
              onClick={() => {
                setUnit("metric");
                trackToolEvent("bmi_calculator", "unit_change", { unit: "metric" });
              }}
              className={`px-4 py-2 text-sm font-semibold ${
                unit === "metric"
                  ? "bg-brand-violet text-white"
                  : "bg-white text-brand-text-primary"
              }`}
            >
              kg / cm
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Weight */}
          <div>
            <label
              htmlFor="weight-input"
              className="block text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2"
            >
              Weight ({unit === "imperial" ? "pounds" : "kilograms"})
            </label>
            <div className="flex items-center gap-2">
              <input
                id="weight-input"
                type="number"
                inputMode="decimal"
                min="40"
                max="800"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="w-32 rounded-lg border border-slate-300 px-4 py-3 text-2xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
              />
              <span className="text-lg font-semibold text-brand-text-secondary">
                {unit === "imperial" ? "lb" : "kg"}
              </span>
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2">
              Height
            </label>
            {unit === "imperial" ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  min="3"
                  max="8"
                  value={heightFtInput}
                  onChange={(e) => setHeightFtInput(e.target.value)}
                  className="w-20 rounded-lg border border-slate-300 px-4 py-3 text-2xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
                />
                <span className="text-lg font-semibold text-brand-text-secondary">
                  ft
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="11"
                  value={heightInInput}
                  onChange={(e) => setHeightInInput(e.target.value)}
                  className="w-20 rounded-lg border border-slate-300 px-4 py-3 text-2xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
                />
                <span className="text-lg font-semibold text-brand-text-secondary">
                  in
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  min="100"
                  max="230"
                  value={heightCmInput}
                  onChange={(e) => setHeightCmInput(e.target.value)}
                  className="w-32 rounded-lg border border-slate-300 px-4 py-3 text-2xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
                />
                <span className="text-lg font-semibold text-brand-text-secondary">
                  cm
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Result card ── */}
      <div className="rounded-2xl border border-brand-violet/30 bg-brand-violet/5 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold">
          Your BMI
        </p>
        <div className="mt-2 flex items-baseline gap-3 flex-wrap">
          <p className="text-5xl sm:text-6xl font-bold text-brand-violet tabular-nums">
            {formatBmi(result.bmi)}
          </p>
          <p
            className="text-base sm:text-xl font-semibold px-3 py-1 rounded-full text-white"
            style={{ background: CATEGORY_COLORS[result.category] }}
          >
            {result.categoryLabel}
          </p>
        </div>

        {/* BMI scale visualization */}
        {result.bmi > 0 && (
          <div className="mt-6">
            <div className="relative h-8 rounded-full overflow-hidden flex">
              {(Object.keys(BMI_CATEGORIES) as BmiCategory[]).map((cat) => {
                const c = BMI_CATEGORIES[cat];
                const startPct = bmiToPct(c.min);
                const endPct = bmiToPct(Math.min(c.max, bmiScaleMax));
                const widthPct = endPct - startPct;
                if (widthPct <= 0) return null;
                return (
                  <div
                    key={cat}
                    className="h-full"
                    style={{
                      width: `${widthPct}%`,
                      background: CATEGORY_COLORS[cat],
                    }}
                    title={`${c.label}: ${c.min}-${c.max === 100 ? "+" : c.max}`}
                  />
                );
              })}
              {/* Marker for current BMI */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-brand-text-primary border-2 border-white rounded"
                style={{
                  left: `calc(${bmiToPct(result.bmi)}% - 2px)`,
                }}
                aria-label="Your BMI marker"
              />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-brand-text-secondary tabular-nums">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40</span>
              <span>50+</span>
            </div>
          </div>
        )}

        {/* GLP-1 eligibility hint */}
        {result.bmi > 0 && (
          <div className="mt-6 rounded-lg border border-brand-violet/20 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-secondary">
              Wegovy / Zepbound FDA eligibility
            </p>
            <p className="mt-1 text-sm text-brand-text-primary">
              {eligibility.eligibleNoComorbidity ? (
                <>
                  ✓ Your BMI of {formatBmi(result.bmi)} meets the FDA-approved
                  Wegovy and Zepbound eligibility criterion of{" "}
                  <strong>BMI ≥ 30</strong>.
                </>
              ) : eligibility.eligibleWithComorbidity ? (
                <>
                  Your BMI of {formatBmi(result.bmi)} is in the{" "}
                  <strong>BMI 27-30</strong> range — eligible for Wegovy or
                  Zepbound{" "}
                  <em>if you have at least one weight-related comorbidity</em>{" "}
                  (high blood pressure, type 2 diabetes, sleep apnea, high
                  cholesterol, or cardiovascular disease).
                </>
              ) : (
                <>
                  Your BMI of {formatBmi(result.bmi)} is below the
                  FDA-approved Wegovy and Zepbound eligibility threshold (BMI
                  27 with comorbidity, or BMI 30 without). Discuss with your
                  prescriber whether off-label use makes sense for your
                  situation.
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* ── Trial outcome overlay ── */}
      {result.bmi > 0 && (
        <div>
          <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
            Where you&apos;d land at each trial endpoint
          </h3>
          <p className="text-sm text-brand-text-secondary mb-4">
            Based on the published mean weight loss curves from STEP-1,
            SURMOUNT-1, and ATTAIN-1, scaled to your starting BMI.
          </p>
          <div className="space-y-3">
            {TRIAL_OUTCOMES.map((trial) => {
              const newBmi = bmiAfterLoss(result.bmi, trial.pct);
              const newCat = categorize(newBmi);
              return (
                <div
                  key={trial.label}
                  className="rounded-xl border border-brand-violet/15 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-semibold text-brand-text-primary">
                        {trial.label}
                      </p>
                      <p className="text-xs text-brand-text-secondary">
                        {trial.trial} · −{trial.pct}% mean
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-brand-violet tabular-nums">
                        {formatBmi(newBmi)}
                      </p>
                      <p
                        className="text-xs font-semibold px-2 py-0.5 rounded-full text-white inline-block mt-1"
                        style={{ background: CATEGORY_COLORS[newCat] }}
                      >
                        {BMI_CATEGORIES[newCat].label}
                      </p>
                    </div>
                  </div>
                  {/* Mini scale */}
                  <div className="mt-3 relative h-2 rounded-full overflow-hidden flex">
                    {(Object.keys(BMI_CATEGORIES) as BmiCategory[]).map(
                      (cat) => {
                        const c = BMI_CATEGORIES[cat];
                        const startPct = bmiToPct(c.min);
                        const endPct = bmiToPct(
                          Math.min(c.max, bmiScaleMax),
                        );
                        const widthPct = endPct - startPct;
                        if (widthPct <= 0) return null;
                        return (
                          <div
                            key={cat}
                            className="h-full"
                            style={{
                              width: `${widthPct}%`,
                              background: CATEGORY_COLORS[cat],
                              opacity: 0.55,
                            }}
                          />
                        );
                      },
                    )}
                    {/* Starting BMI marker (lighter) */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-brand-text-secondary"
                      style={{
                        left: `calc(${bmiToPct(result.bmi)}% - 1px)`,
                      }}
                    />
                    {/* Ending BMI marker (bold) */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-brand-text-primary"
                      style={{
                        left: `calc(${bmiToPct(newBmi)}% - 2px)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
