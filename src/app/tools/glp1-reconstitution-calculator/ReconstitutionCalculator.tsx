"use client";

import { useMemo, useState } from "react";
import {
  calculateReconstitution,
  type Drug,
} from "@/lib/reconstitution-calculator";
import { trackToolEvent } from "@/lib/analytics";

export default function ReconstitutionCalculator() {
  const [drug, setDrug] = useState<Drug>("semaglutide");
  const [vialMg, setVialMg] = useState("5");
  const [bacWaterMl, setBacWaterMl] = useState("2.5");
  const [targetDoseMg, setTargetDoseMg] = useState("0.25");

  const result = useMemo(
    () =>
      calculateReconstitution({
        vialMg: parseFloat(vialMg),
        bacWaterMl: parseFloat(bacWaterMl),
        targetDoseMg: parseFloat(targetDoseMg),
        drug,
      }),
    [vialMg, bacWaterMl, targetDoseMg, drug],
  );

  return (
    <div className="not-prose space-y-8">
      <div className="rounded-2xl border-2 border-brand-violet/25 bg-brand-bg-purple p-5">
        <div className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-2">
          Safety notice — read first
        </div>
        <p className="text-sm text-brand-text-primary leading-relaxed">
          Compounded GLP-1 medications are{" "}
          <strong>not FDA-approved</strong>. Use only PCAB-accredited or
          state-regulated pharmacies. As of February 2025 (tirzepatide)
          and April 2025 (semaglutide), FDA enforcement discretion for
          compounded GLP-1s under section 503A has ended; verify your
          pharmacy&apos;s legal status before ordering. <strong>Always
          verify the concentration on your specific vial label</strong>{" "}
          before drawing a dose &mdash; the #1 dosing error in patient
          communities is confusing units with milligrams. This
          calculator is educational and does not replace pharmacy-supplied
          dosing instructions.
        </p>
      </div>

      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Drug">
            <select
              value={drug}
              onChange={(e) => {
                setDrug(e.target.value as Drug);
                trackToolEvent("reconstitution_calculator", "drug_change", {
                  drug: e.target.value,
                });
              }}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
            >
              <option value="semaglutide">Semaglutide (Wegovy/Ozempic)</option>
              <option value="tirzepatide">Tirzepatide (Mounjaro/Zepbound)</option>
              <option value="retatrutide">Retatrutide (investigational)</option>
            </select>
          </Field>

          <Field label="Vial peptide content (mg)">
            <input
              type="number"
              value={vialMg}
              onChange={(e) => setVialMg(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
              step="0.5"
              min={0.1}
            />
          </Field>

          <Field label="Bacteriostatic water added (mL)">
            <input
              type="number"
              value={bacWaterMl}
              onChange={(e) => setBacWaterMl(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
              step="0.5"
              min={0.1}
            />
          </Field>

          <Field label="Target single dose (mg)">
            <input
              type="number"
              value={targetDoseMg}
              onChange={(e) => setTargetDoseMg(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-base"
              step="0.05"
              min={0.01}
            />
          </Field>
        </div>
      </div>

      {result.blocked ? (
        <div className="rounded-2xl border-2 border-brand-violet bg-white p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-2">
            Calculation blocked
          </div>
          <ul className="space-y-2">
            {result.warnings
              .filter((w) => w.level === "blocking")
              .map((w) => (
                <li
                  key={w.code}
                  className="text-sm text-brand-text-primary font-medium"
                >
                  {w.message}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-2xl border border-brand-violet/20 bg-gradient-to-br from-brand-bg-purple to-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
            Reconstituted vial math
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <Stat
              label="Concentration"
              value={result.concentrationMgPerMl.toFixed(2)}
              unit="mg/mL"
            />
            <Stat
              label="Volume per dose"
              value={result.doseVolumeMl.toFixed(3)}
              unit="mL"
            />
            <Stat
              label="Units (U-100)"
              value={result.doseUnits.toFixed(1)}
              unit="units"
            />
            <Stat
              label="Doses per vial"
              value={`${result.dosesPerVial}`}
              unit="full doses"
            />
          </div>

          {result.recommendedSyringeMl !== null && (
            <div className="rounded-xl bg-white p-5 border border-brand-violet/15 mb-4">
              <div className="text-xs uppercase tracking-wide text-brand-text-secondary font-bold mb-1">
                Recommended syringe
              </div>
              <div className="text-2xl font-bold text-brand-violet">
                {result.recommendedSyringeMl} mL U-100 insulin syringe
              </div>
              <div className="text-sm text-brand-text-secondary mt-2">
                Smallest standard U-100 syringe that gives ≥20% fill (the
                accuracy threshold from PMC8114303). Drawing accuracy
                degrades meaningfully when measuring less than 20% of
                syringe capacity.
              </div>
            </div>
          )}
        </div>
      )}

      {result.warnings.filter((w) => w.level === "warning").length > 0 && (
        <div className="rounded-2xl border-2 border-brand-violet/40 bg-white p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-3">
            Warnings
          </div>
          <ul className="space-y-3">
            {result.warnings
              .filter((w) => w.level === "warning")
              .map((w) => (
                <li
                  key={w.code}
                  className="text-sm text-brand-text-primary leading-relaxed"
                >
                  {w.message}
                </li>
              ))}
          </ul>
        </div>
      )}

      {result.warnings.filter((w) => w.level === "info").length > 0 && (
        <div className="rounded-2xl border border-brand-violet/15 bg-brand-bg-purple p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-3">
            Always-on safety reminders
          </div>
          <ul className="space-y-2">
            {result.warnings
              .filter((w) => w.level === "info")
              .map((w) => (
                <li
                  key={w.code}
                  className="text-sm text-brand-text-secondary leading-relaxed"
                >
                  {w.message}
                </li>
              ))}
          </ul>
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
