"use client";

import { useMemo, useState } from "react";
import {
  PEN_PRESETS,
  computePenLeftover,
  formatMl,
  getPenPreset,
  type PenId,
} from "@/lib/glp1-pen-leftover";
import { trackToolEvent } from "@/lib/analytics";

export default function Calculator() {
  const [penId, setPenId] = useState<PenId>("ozempic-1mg");
  const [doseMg, setDoseMg] = useState<number>(1);
  const [dosesTaken, setDosesTaken] = useState<number>(0);
  const [daysSinceStart, setDaysSinceStart] = useState<string>("");

  const preset = getPenPreset(penId);

  const result = useMemo(
    () =>
      computePenLeftover({
        penId,
        doseMg,
        dosesAlreadyTaken: dosesTaken,
      }),
    [penId, doseMg, dosesTaken],
  );

  const onPenChange = (next: PenId) => {
    setPenId(next);
    const nextPreset = getPenPreset(next);
    if (nextPreset && nextPreset.doses.length > 0) {
      setDoseMg(nextPreset.doses[0].doseMg);
      setDosesTaken(0);
    }
    trackToolEvent("pen_leftover_calculator", "pen_change", { pen: next });
  };

  const onDoseChange = (next: number) => {
    setDoseMg(next);
    setDosesTaken(0);
    trackToolEvent("pen_leftover_calculator", "dose_change", {
      pen: penId,
      dose_mg: next,
    });
  };

  return (
    <div className="not-prose space-y-8">
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-1">
          Multi-dose pen calculator
        </h2>
        <p className="text-sm text-brand-text-secondary mb-6">
          Use this for Ozempic and Saxenda. (Wegovy, Zepbound, and
          Mounjaro pens are single-dose — see the card above.)
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="block text-sm font-bold text-brand-text-primary mb-2">
              Pen
            </span>
            <select
              value={penId}
              onChange={(e) => onPenChange(e.target.value as PenId)}
              className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            >
              {PEN_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-bold text-brand-text-primary mb-2">
              Dose dialed per injection
            </span>
            <select
              value={doseMg}
              onChange={(e) => onDoseChange(Number(e.target.value))}
              className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            >
              {preset?.doses.map((d) => (
                <option key={d.label} value={d.doseMg}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-bold text-brand-text-primary mb-2">
              Doses already taken from this pen
            </span>
            <input
              type="number"
              min={0}
              max={result?.totalDoses ?? 30}
              step={1}
              value={dosesTaken}
              onChange={(e) =>
                setDosesTaken(Math.max(0, Number(e.target.value) || 0))
              }
              className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-bold text-brand-text-primary mb-2">
              Days since you started this pen{" "}
              <span className="font-normal text-brand-text-secondary">
                (optional)
              </span>
            </span>
            <input
              type="number"
              min={0}
              step={1}
              value={daysSinceStart}
              onChange={(e) => setDaysSinceStart(e.target.value)}
              placeholder="e.g. 14"
              className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            />
          </label>
        </div>
      </div>

      {result ? (
        <div className="rounded-2xl border border-brand-violet/15 bg-brand-violet/[0.06] p-6 sm:p-8">
          <h3 className="font-heading text-lg font-bold text-brand-text-primary mb-4">
            Your pen, by the numbers
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Stat
              label="Total doses in this pen"
              value={`${result.totalDoses}`}
              sub={`at ${doseMg} mg per ${
                result.frequency === "weekly" ? "week" : "day"
              }`}
            />
            <Stat
              label="Doses remaining"
              value={`${result.dosesRemaining}`}
              sub={`${result.totalDoses - result.dosesRemaining} taken`}
            />
            <Stat
              label="Volume remaining"
              value={formatMl(result.mlRemaining)}
              sub={`${formatMl(result.mlPerDose)} per dose`}
            />
            <Stat
              label="Days of supply remaining"
              value={`${result.daysOfSupplyRemaining} days`}
              sub={`${
                result.frequency === "weekly" ? "weekly" : "daily"
              } dosing`}
            />
          </div>

          <div className="mt-6 rounded-xl border border-brand-violet/20 bg-white p-4">
            {result.isExhausted ? (
              <p className="text-sm text-brand-text-primary">
                <strong>This pen is empty.</strong> The dose-stop
                mechanism will prevent dialing another dose. Discard
                per the FDA label and start your next pen — contact
                your prescriber if your refill has not arrived.
              </p>
            ) : result.isLastDose ? (
              <p className="text-sm text-brand-text-primary">
                <strong>You&rsquo;re on the last dose in this pen.</strong>{" "}
                Refill needed by{" "}
                <strong>{result.refillNeededByDate}</strong>. Contact
                your prescriber now if you don&rsquo;t already have
                your next pen on hand.
              </p>
            ) : (
              <p className="text-sm text-brand-text-primary">
                At your current schedule, this pen will run out around{" "}
                <strong>{result.refillNeededByDate}</strong>. Plan
                your refill request 1&ndash;2 weeks ahead to avoid a
                gap in dosing.
              </p>
            )}
          </div>
        </div>
      ) : null}

      <p className="text-xs text-brand-text-secondary leading-relaxed">
        Educational tool only — not medical advice. All fill volumes
        and dose counts are taken from the FDA prescribing information
        for each pen. Never attempt to extract drug from a pen with a
        syringe; sterility and dose accuracy cannot be guaranteed
        outside the pen&rsquo;s metered mechanism.
      </p>
    </div>
  );
}

interface StatProps {
  label: string;
  value: string;
  sub: string;
}

function Stat({ label, value, sub }: StatProps) {
  return (
    <div className="rounded-xl bg-white border border-brand-violet/15 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-brand-violet font-bold">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-brand-text-primary">
        {value}
      </p>
      <p className="mt-1 text-xs text-brand-text-secondary">{sub}</p>
    </div>
  );
}
