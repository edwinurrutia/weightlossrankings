"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  generateWeeklyTemplate,
  type AgeBucket,
  type FitnessLevel,
  type Goal,
  type WeekOnGlp1,
} from "@/lib/exercise-configurator";
import { trackToolEvent } from "@/lib/analytics";

const FITNESS_OPTIONS: Array<{ value: FitnessLevel; label: string }> = [
  { value: "beginner", label: "Beginner — new to structured exercise" },
  { value: "intermediate", label: "Intermediate — exercising 1-3 days/wk" },
  { value: "advanced", label: "Advanced — exercising 4+ days/wk for ≥1 year" },
];

const AGE_OPTIONS: Array<{ value: AgeBucket; label: string }> = [
  { value: "under-50", label: "Under 50" },
  { value: "50-64", label: "50-64" },
  { value: "65-plus", label: "65+" },
];

const GOAL_OPTIONS: Array<{ value: Goal; label: string }> = [
  { value: "weight-loss", label: "Active weight loss" },
  { value: "lean-mass-preservation", label: "Lean mass preservation" },
  { value: "maintenance", label: "Weight maintenance" },
];

const WEEK_OPTIONS: Array<{ value: WeekOnGlp1; label: string }> = [
  { value: "starting", label: "About to start" },
  { value: "week-1-4", label: "Week 1-4" },
  { value: "week-5-12", label: "Week 5-12" },
  { value: "week-13-plus", label: "Week 13 or beyond" },
];

const TYPE_BADGE: Record<string, string> = {
  Resistance: "bg-brand-violet text-white",
  HIIT: "bg-brand-blue text-white",
  Walking: "bg-slate-400 text-white",
  Cardio: "bg-slate-400 text-white",
  Mobility: "bg-slate-300 text-slate-800",
};

export default function ExerciseConfigurator() {
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>("intermediate");
  const [ageBucket, setAgeBucket] = useState<AgeBucket>("under-50");
  const [goal, setGoal] = useState<Goal>("weight-loss");
  const [weekOnGlp1, setWeekOnGlp1] = useState<WeekOnGlp1>("week-13-plus");
  const [hasGymAccess, setHasGymAccess] = useState(true);
  const [availableDaysPerWeek, setAvailableDaysPerWeek] = useState(5);

  const result = useMemo(
    () =>
      generateWeeklyTemplate({
        fitnessLevel,
        ageBucket,
        goal,
        weekOnGlp1,
        hasGymAccess,
        availableDaysPerWeek,
      }),
    [fitnessLevel, ageBucket, goal, weekOnGlp1, hasGymAccess, availableDaysPerWeek],
  );

  return (
    <div className="not-prose space-y-8">
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Fitness level">
            <select
              value={fitnessLevel}
              onChange={(e) => {
                setFitnessLevel(e.target.value as FitnessLevel);
                trackToolEvent("exercise_config", "fitness_change", { value: e.target.value });
              }}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
            >
              {FITNESS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Age">
            <select
              value={ageBucket}
              onChange={(e) => setAgeBucket(e.target.value as AgeBucket)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
            >
              {AGE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
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
              {GOAL_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Time on GLP-1">
            <select
              value={weekOnGlp1}
              onChange={(e) => setWeekOnGlp1(e.target.value as WeekOnGlp1)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
            >
              {WEEK_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Available training days / week">
            <input
              type="number"
              min={1}
              max={7}
              value={availableDaysPerWeek}
              onChange={(e) => setAvailableDaysPerWeek(parseInt(e.target.value, 10) || 1)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
            />
          </Field>

          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasGymAccess}
                onChange={(e) => setHasGymAccess(e.target.checked)}
                className="h-5 w-5 text-brand-violet focus:ring-brand-violet"
              />
              <span className="text-sm font-medium text-brand-text-primary">
                I have access to a gym or weights at home
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-violet/20 bg-gradient-to-br from-brand-bg-purple to-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Your weekly template
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Stat label="RT days" value={`${result.resistanceDaysPerWeek}`} unit="/wk" />
          <Stat label="Cardio" value={`${result.weeklyCardioMinutes}`} unit="min/wk" />
          <Stat label="Step target" value={result.dailyStepTarget.toLocaleString()} unit="/day" />
          <Stat
            label="Protein"
            value={`${result.proteinTargetGramsPerKg.low}-${result.proteinTargetGramsPerKg.high}`}
            unit="g/kg"
          />
        </div>

        <div className="space-y-4">
          {result.weeklyTemplate.map((s, i) => (
            <article
              key={`${s.type}-${i}`}
              className="rounded-xl bg-white p-5 border border-brand-violet/15"
            >
              <header className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${TYPE_BADGE[s.type] ?? "bg-slate-300 text-slate-800"}`}
                  >
                    {s.type}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-brand-text-primary">
                    {s.daysPerWeek} day{s.daysPerWeek === 1 ? "" : "s"}/wk
                  </div>
                  <div className="text-xs text-brand-text-secondary">
                    {s.minutesPerSession} min/session
                  </div>
                </div>
              </header>
              <p className="text-sm text-brand-text-primary leading-relaxed">
                {s.description}
              </p>
              <p className="text-xs text-brand-text-secondary mt-3 italic">
                {s.rationale}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-white p-5 border border-brand-violet/15">
          <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-2">
            Estimated weekly calorie burn
          </div>
          <div className="text-2xl font-bold text-brand-violet">
            ~{result.estimatedWeeklyCalorieBurn.toLocaleString()} kcal
          </div>
          <div className="text-xs text-brand-text-secondary mt-1">
            Rough estimate for motivation only — not for prescription. Real burn varies with weight, intensity, and recovery.
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-violet/15 bg-brand-bg-purple p-6">
        <div className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-3">
          Caveats and safety notes
        </div>
        <ul className="space-y-3">
          {result.caveats.map((c, i) => (
            <li key={i} className="text-sm text-brand-text-primary leading-relaxed">
              · {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6">
        <div className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-3">
          Why these recommendations
        </div>
        <ul className="space-y-2">
          {result.rationale.map((r, i) => (
            <li key={i} className="text-sm text-brand-text-secondary leading-relaxed">
              · {r}
            </li>
          ))}
        </ul>
        <div className="mt-4 text-sm">
          <Link
            href="/research/exercise-pairing-glp1-lean-mass-preservation"
            className="font-semibold text-brand-violet hover:underline"
          >
            Read the full research deep-dive →
          </Link>
        </div>
      </div>
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
