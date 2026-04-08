"use client";

import { useMemo, useState } from "react";
import {
  calculateProtein,
  inToCm,
  lbToKg,
  type ActivityLevel,
  type Goal,
  type Sex,
  type Unit,
} from "@/lib/protein-calculator";
import { trackToolEvent } from "@/lib/analytics";

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (desk job, no exercise)",
  light: "Lightly active (1-3 d/wk light exercise)",
  moderate: "Moderately active (3-5 d/wk exercise)",
  very: "Very active (6-7 d/wk exercise)",
  extreme: "Extremely active (vigorous + physical job)",
};

const GOAL_LABELS: Record<Goal, string> = {
  lose: "Lose weight (-500 kcal/day deficit)",
  maintain: "Maintain weight",
  gain: "Gain weight / build muscle (+250 kcal/day)",
};

export default function ProteinCalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [sex, setSex] = useState<Sex>("female");
  const [age, setAge] = useState("52");
  const [weightInput, setWeightInput] = useState("210");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("5");
  const [heightCm, setHeightCm] = useState("165");
  const [activity, setActivity] = useState<ActivityLevel>("light");
  const [goal, setGoal] = useState<Goal>("lose");
  const [onGlp1, setOnGlp1] = useState(true);

  const weightKg = useMemo(() => {
    const w = parseFloat(weightInput);
    if (!Number.isFinite(w) || w <= 0) return 0;
    return unit === "metric" ? w : lbToKg(w);
  }, [unit, weightInput]);

  const heightCmCalc = useMemo(() => {
    if (unit === "metric") {
      const h = parseFloat(heightCm);
      return Number.isFinite(h) && h > 0 ? h : 0;
    }
    const ft = parseFloat(heightFt || "0");
    const inch = parseFloat(heightIn || "0");
    const totalIn = ft * 12 + inch;
    return totalIn > 0 ? inToCm(totalIn) : 0;
  }, [unit, heightCm, heightFt, heightIn]);

  const ageYears = parseFloat(age) || 0;

  const result = useMemo(
    () =>
      calculateProtein({
        sex,
        ageYears,
        weightKg,
        heightCm: heightCmCalc,
        activity,
        goal,
        onGlp1,
      }),
    [sex, ageYears, weightKg, heightCmCalc, activity, goal, onGlp1],
  );

  const valid = result.bmr > 0;

  return (
    <div className="not-prose space-y-8">
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden w-fit">
            <button
              type="button"
              onClick={() => {
                setUnit("imperial");
                trackToolEvent("protein_calculator", "unit_change", { unit: "imperial" });
              }}
              className={`px-4 py-2 text-sm font-semibold ${
                unit === "imperial"
                  ? "bg-brand-violet text-white"
                  : "bg-white text-brand-text-secondary hover:bg-slate-50"
              }`}
            >
              Imperial (lb / ft·in)
            </button>
            <button
              type="button"
              onClick={() => {
                setUnit("metric");
                trackToolEvent("protein_calculator", "unit_change", { unit: "metric" });
              }}
              className={`px-4 py-2 text-sm font-semibold ${
                unit === "metric"
                  ? "bg-brand-violet text-white"
                  : "bg-white text-brand-text-secondary hover:bg-slate-50"
              }`}
            >
              Metric (kg / cm)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Sex">
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as Sex)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </Field>

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
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
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

          <Field label="Activity">
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as ActivityLevel)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
            >
              {Object.entries(ACTIVITY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Goal">
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as Goal)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
            >
              {Object.entries(GOAL_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-6 flex items-center gap-3 p-4 rounded-lg bg-brand-bg-purple border border-brand-violet/15">
          <input
            type="checkbox"
            id="onglp1"
            checked={onGlp1}
            onChange={(e) => setOnGlp1(e.target.checked)}
            className="h-5 w-5 text-brand-violet focus:ring-brand-violet"
          />
          <label htmlFor="onglp1" className="text-sm font-medium text-brand-text-primary">
            On (or starting) a GLP-1 receptor agonist — bumps protein target one
            tier higher to mitigate documented lean-mass loss
          </label>
        </div>
      </div>

      {valid && (
        <div className="rounded-2xl border border-brand-violet/20 bg-gradient-to-br from-brand-bg-purple to-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
            Your daily targets
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <Stat label="BMR" value={`${result.bmr}`} unit="kcal" />
            <Stat label="TDEE" value={`${result.tdee}`} unit="kcal" />
            <Stat label="Target calories" value={`${result.targetCalories}`} unit="kcal" />
            <Stat
              label="Weekly change"
              value={`${result.weeklyWeightChangeKg >= 0 ? "+" : ""}${result.weeklyWeightChangeKg.toFixed(2)}`}
              unit="kg/wk"
            />
          </div>

          <div className="rounded-xl bg-white p-5 border border-brand-violet/15 mb-4">
            <div className="text-xs uppercase tracking-wide text-brand-text-secondary font-bold mb-1">
              Daily protein target
            </div>
            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-bold text-brand-violet">
                {result.proteinGramsRecommended} g
              </div>
              <div className="text-sm text-brand-text-secondary">
                ({result.proteinGramsLow}-{result.proteinGramsHigh} g range)
              </div>
            </div>
            <div className="text-sm text-brand-text-secondary mt-2">
              Tier: <strong>{result.proteinTierLabel}</strong>
              {onGlp1 && (
                <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-brand-violet/10 text-brand-violet text-xs font-bold">
                  GLP-1 BUMP APPLIED
                </span>
              )}
            </div>
            <div className="text-sm text-brand-text-secondary mt-2">
              Per meal (×3): <strong>~{result.perMealProteinGrams} g</strong>{" "}
              — even distribution across breakfast, lunch, and dinner
              maximizes 24-hour muscle protein synthesis (Mamerow 2014).
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Stat label="Protein" value={`${result.proteinGramsRecommended}`} unit="g" />
            <Stat label="Fat" value={`${result.fatGrams}`} unit="g" />
            <Stat label="Carbs" value={`${result.carbGrams}`} unit="g" />
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

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-lg bg-white border border-brand-violet/15 p-3">
      <div className="text-xs text-brand-text-secondary font-bold uppercase tracking-wide">
        {label}
      </div>
      <div className="mt-1">
        <span className="text-2xl font-bold text-brand-text-primary">{value}</span>{" "}
        <span className="text-sm text-brand-text-secondary">{unit}</span>
      </div>
    </div>
  );
}
