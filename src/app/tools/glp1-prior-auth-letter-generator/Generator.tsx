"use client";

import Link from "next/link";
import { useMemo, useState } from "react";


import {
  DRUGS,
  INSURERS,
  COMORBIDITIES,
  PRIOR_ATTEMPTS,
  computeBmi,
  generateLetter,
  type DrugId,
  type InsurerId,
  type ComorbidityId,
  type PriorAttemptId,
  type ComorbiditySpec,
  type PriorAttemptSpec,
  type FormState,
} from "@/lib/glp1-prior-auth-letter";


const INITIAL: FormState = {
  patientName: "",
  patientDob: "",
  insurerId: "aetna",
  drugId: "wegovy-2_4",
  bmi: "",
  weightLbs: "210",
  heightFt: "5",
  heightIn: "8",
  comorbidities: ["t2d"],
  priorAttempts: ["diet", "exercise"],
  clinician: "",
};

export default function Generator() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [copied, setCopied] = useState<boolean>(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleComorbidity(id: ComorbidityId) {
    setForm((prev) => ({
      ...prev,
      comorbidities: prev.comorbidities.includes(id)
        ? prev.comorbidities.filter((x) => x !== id)
        : [...prev.comorbidities, id],
    }));
  }

  function togglePriorAttempt(id: PriorAttemptId) {
    setForm((prev) => ({
      ...prev,
      priorAttempts: prev.priorAttempts.includes(id)
        ? prev.priorAttempts.filter((x) => x !== id)
        : [...prev.priorAttempts, id],
    }));
  }

  const weightLbs = parseFloat(form.weightLbs);
  const heightFt = parseFloat(form.heightFt);
  const heightIn = parseFloat(form.heightIn);
  const manualBmi = parseFloat(form.bmi);

  const computedBmi = useMemo(
    () => computeBmi(weightLbs, heightFt, heightIn),
    [weightLbs, heightFt, heightIn],
  );

  const effectiveBmi: number | null = Number.isFinite(manualBmi) && manualBmi > 0
    ? manualBmi
    : computedBmi;

  const drug = DRUGS.find((d) => d.id === form.drugId) ?? DRUGS[0];
  const insurer = INSURERS.find((i) => i.id === form.insurerId) ?? INSURERS[0];

  const letter = useMemo(
    () =>
      generateLetter({
        patientName: form.patientName,
        patientDob: form.patientDob,
        insurer,
        drug,
        bmi: effectiveBmi,
        weightLbs: Number.isFinite(weightLbs) ? weightLbs : null,
        heightFt: Number.isFinite(heightFt) ? heightFt : null,
        heightIn: Number.isFinite(heightIn) ? heightIn : null,
        comorbidities: form.comorbidities
          .map((id) => COMORBIDITIES.find((c) => c.id === id))
          .filter((c): c is ComorbiditySpec => Boolean(c)),
        priorAttempts: form.priorAttempts
          .map((id) => PRIOR_ATTEMPTS.find((p) => p.id === id))
          .filter((p): p is PriorAttemptSpec => Boolean(p)),
        clinician: form.clinician,
      }),
    [form, drug, insurer, effectiveBmi, weightLbs, heightFt, heightIn],
  );

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const isMedicare = insurer.id === "medicare";

  return (
    <div className="rounded-2xl border border-brand-violet/15 bg-brand-violet/[0.04] p-6 sm:p-8">
      <div className="mb-6 rounded-xl border border-brand-violet/20 bg-brand-violet/[0.06] p-4">
        <p className="text-sm font-bold text-brand-violet">
          DRAFT — Review with prescribing clinician before submission. Not legal or medical advice.
        </p>
        <p className="mt-1 text-xs text-brand-text-secondary">
          This generator produces a template letter for the prescribing clinician to review, edit, and sign. It does not provide medical advice or guarantee coverage. No information you enter is stored or transmitted — the letter is generated entirely in your browser.
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="pa-patient" className="block text-sm font-semibold text-brand-text-primary mb-1">
            Patient name
          </label>
          <input
            id="pa-patient"
            type="text"
            placeholder="(leave blank — do not enter PII)"
            value={form.patientName}
            onChange={(e) => update("patientName", e.target.value)}
            className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          />
        </div>

        <div>
          <label htmlFor="pa-dob" className="block text-sm font-semibold text-brand-text-primary mb-1">
            Date of birth (optional)
          </label>
          <input
            id="pa-dob"
            type="text"
            placeholder="MM/DD/YYYY"
            value={form.patientDob}
            onChange={(e) => update("patientDob", e.target.value)}
            className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          />
        </div>

        <div>
          <label htmlFor="pa-insurer" className="block text-sm font-semibold text-brand-text-primary mb-1">
            Insurer
          </label>
          <select
            id="pa-insurer"
            value={form.insurerId}
            onChange={(e) => update("insurerId", e.target.value as InsurerId)}
            className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          >
            {INSURERS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pa-drug" className="block text-sm font-semibold text-brand-text-primary mb-1">
            Drug requested
          </label>
          <select
            id="pa-drug"
            value={form.drugId}
            onChange={(e) => update("drugId", e.target.value as DrugId)}
            className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          >
            {DRUGS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pa-weight" className="block text-sm font-semibold text-brand-text-primary mb-1">
            Current weight (lbs)
          </label>
          <input
            id="pa-weight"
            type="number"
            inputMode="decimal"
            min={50}
            max={700}
            value={form.weightLbs}
            onChange={(e) => update("weightLbs", e.target.value)}
            className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-brand-text-primary mb-1">
            Height
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={3}
              max={8}
              placeholder="ft"
              value={form.heightFt}
              onChange={(e) => update("heightFt", e.target.value)}
              className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
              aria-label="Height feet"
            />
            <input
              type="number"
              min={0}
              max={11}
              placeholder="in"
              value={form.heightIn}
              onChange={(e) => update("heightIn", e.target.value)}
              className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
              aria-label="Height inches"
            />
          </div>
        </div>

        <div>
          <label htmlFor="pa-bmi" className="block text-sm font-semibold text-brand-text-primary mb-1">
            BMI (auto-computed; override if needed)
          </label>
          <input
            id="pa-bmi"
            type="number"
            inputMode="decimal"
            min={15}
            max={70}
            placeholder={
              computedBmi != null ? computedBmi.toFixed(1) : "—"
            }
            value={form.bmi}
            onChange={(e) => update("bmi", e.target.value)}
            className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          />
          <p className="mt-1 text-xs text-brand-text-secondary">
            Computed from your weight + height: <span className="font-semibold text-brand-violet">{computedBmi != null ? computedBmi.toFixed(1) : "—"}</span>
          </p>
        </div>

        <div>
          <label htmlFor="pa-clinician" className="block text-sm font-semibold text-brand-text-primary mb-1">
            Clinician name + credentials
          </label>
          <input
            id="pa-clinician"
            type="text"
            placeholder="Jane Smith, MD"
            value={form.clinician}
            onChange={(e) => update("clinician", e.target.value)}
            className="w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          />
        </div>
      </div>

      {/* Comorbidities */}
      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-brand-text-primary mb-2">
          Documented weight-related comorbidities
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {COMORBIDITIES.map((c) => (
            <label key={c.id} className="flex items-start gap-2 text-sm text-brand-text-primary">
              <input
                type="checkbox"
                checked={form.comorbidities.includes(c.id)}
                onChange={() => toggleComorbidity(c.id)}
                className="mt-0.5 accent-brand-violet"
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Prior attempts */}
      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-brand-text-primary mb-2">
          Documented prior weight loss attempts
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRIOR_ATTEMPTS.map((p) => (
            <label key={p.id} className="flex items-start gap-2 text-sm text-brand-text-primary">
              <input
                type="checkbox"
                checked={form.priorAttempts.includes(p.id)}
                onChange={() => togglePriorAttempt(p.id)}
                className="mt-0.5 accent-brand-violet"
              />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Output */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text-primary">
            Generated PA letter
          </h3>
          <button
            type="button"
            onClick={copyToClipboard}
            className="rounded-lg bg-brand-violet px-4 py-2 text-sm font-bold text-white hover:bg-brand-violet/90 focus:outline-none focus:ring-2 focus:ring-brand-violet/40"
          >
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>

        {isMedicare && (
          <div className="mb-3 rounded-xl border border-brand-violet/20 bg-brand-violet/[0.06] p-4 text-sm text-brand-text-primary">
            <p className="font-bold text-brand-violet">Medicare does not currently cover GLP-1s for weight loss.</p>
            <p className="mt-1">
              This letter cannot be used for Medicare submissions.{" "}
              <Link href="/research/glp1-insurance-coverage-medicare-medicaid-commercial" className="text-brand-violet underline">
                Read about Medicare GLP-1 coverage →
              </Link>
            </p>
          </div>
        )}

        <pre className="whitespace-pre-wrap rounded-xl border border-brand-violet/15 bg-white p-5 text-xs sm:text-sm text-brand-text-primary leading-relaxed font-mono">
{letter}
        </pre>
      </div>
    </div>
  );
}
