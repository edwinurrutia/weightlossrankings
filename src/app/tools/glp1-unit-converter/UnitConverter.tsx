"use client";

import { useMemo, useState } from "react";
import {
  COMMON_CONCENTRATIONS,
  COMMON_UNIT_VALUES,
  STANDARD_TITRATION_DOSES,
  buildConversionTable,
  buildInverseTable,
  mgToUnits,
  roundToHalfUnit,
  unitsToMg,
  unitsToMl,
  type DrugName,
} from "@/lib/unit-converter";
import { bacWaterVolumeMl } from "@/lib/weight-loss-prediction";

const DRUGS: { id: DrugName; label: string; brand: string }[] = [
  { id: "semaglutide", label: "Semaglutide", brand: "Wegovy / Ozempic" },
  { id: "tirzepatide", label: "Tirzepatide", brand: "Zepbound / Mounjaro" },
];

type Direction = "mg-to-units" | "units-to-mg" | "bac-water";

export default function UnitConverter() {
  const [drug, setDrug] = useState<DrugName>("semaglutide");
  const [direction, setDirection] = useState<Direction>("mg-to-units");
  const [concentration, setConcentration] = useState<number>(
    COMMON_CONCENTRATIONS[drug][0],
  );
  const [mgInput, setMgInput] = useState<string>("0.25");
  const [unitsInput, setUnitsInput] = useState<string>("10");
  const [vialMgInput, setVialMgInput] = useState<string>("10");
  const [targetConcInput, setTargetConcInput] = useState<string>("2.5");

  // When drug changes, reset to its lowest common concentration
  function handleDrugChange(newDrug: DrugName) {
    setDrug(newDrug);
    setConcentration(COMMON_CONCENTRATIONS[newDrug][0]);
    setMgInput(String(STANDARD_TITRATION_DOSES[newDrug][0]));
  }

  const mgValue = parseFloat(mgInput);
  const unitsValue = parseFloat(unitsInput);
  const vialMgValue = parseFloat(vialMgInput);
  const targetConcValue = parseFloat(targetConcInput);

  const mgToUnitsResult = useMemo(
    () => mgToUnits(mgValue, concentration),
    [mgValue, concentration],
  );
  const unitsToMgResult = useMemo(
    () => unitsToMg(unitsValue, concentration),
    [unitsValue, concentration],
  );
  const bacWaterResult = useMemo(
    () => bacWaterVolumeMl(vialMgValue, targetConcValue),
    [vialMgValue, targetConcValue],
  );

  const conversionTable = useMemo(() => buildConversionTable(drug), [drug]);
  const inverseTable = useMemo(() => buildInverseTable(drug), [drug]);

  return (
    <div className="not-prose space-y-8">
      {/* ── Drug picker ── */}
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold">
          Select your drug
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {DRUGS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => handleDrugChange(d.id)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                drug === d.id
                  ? "border-brand-violet bg-brand-violet/10 text-brand-violet"
                  : "border-slate-200 bg-white text-brand-text-primary hover:border-brand-violet/40"
              }`}
            >
              {d.label}
              <span className="ml-2 text-xs font-normal text-brand-text-secondary">
                ({d.brand})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Concentration picker ── */}
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold">
          Vial concentration (mg/mL)
        </p>
        <p className="mt-1 text-sm text-brand-text-secondary">
          Check your vial label. The concentration is printed on every
          compounded vial — it&apos;s the most common cause of dosing
          confusion.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {COMMON_CONCENTRATIONS[drug].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setConcentration(c)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                concentration === c
                  ? "border-brand-violet bg-brand-violet/10 text-brand-violet"
                  : "border-slate-200 bg-white text-brand-text-primary hover:border-brand-violet/40"
              }`}
            >
              {c} mg/mL
            </button>
          ))}
        </div>
      </div>

      {/* ── Direction picker ── */}
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold">
          What do you want to calculate?
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDirection("mg-to-units")}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              direction === "mg-to-units"
                ? "border-brand-violet bg-brand-violet text-white"
                : "border-slate-200 bg-white text-brand-text-primary hover:border-brand-violet/40"
            }`}
          >
            mg → units
          </button>
          <button
            type="button"
            onClick={() => setDirection("units-to-mg")}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              direction === "units-to-mg"
                ? "border-brand-violet bg-brand-violet text-white"
                : "border-slate-200 bg-white text-brand-text-primary hover:border-brand-violet/40"
            }`}
          >
            units → mg
          </button>
          <button
            type="button"
            onClick={() => setDirection("bac-water")}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              direction === "bac-water"
                ? "border-brand-violet bg-brand-violet text-white"
                : "border-slate-200 bg-white text-brand-text-primary hover:border-brand-violet/40"
            }`}
          >
            Reconstitution (BAC water)
          </button>
        </div>
      </div>

      {/* ── Calculator card ── */}
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        {direction === "mg-to-units" ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="mg-input"
                className="block text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2"
              >
                Prescribed dose in mg
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="mg-input"
                  type="number"
                  inputMode="decimal"
                  step="0.05"
                  min="0"
                  value={mgInput}
                  onChange={(e) => setMgInput(e.target.value)}
                  className="w-32 rounded-lg border border-slate-300 px-4 py-3 text-2xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
                />
                <span className="text-lg font-semibold text-brand-text-secondary">
                  mg
                </span>
                <span className="text-sm text-brand-text-secondary">
                  ÷ {concentration} mg/mL × 100 =
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {STANDARD_TITRATION_DOSES[drug].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setMgInput(String(d))}
                    className="text-xs font-semibold rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-brand-text-secondary hover:border-brand-violet/40 hover:text-brand-violet transition"
                  >
                    {d} mg
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-brand-violet/30 bg-brand-violet/5 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold">
                Draw to this mark on your insulin syringe
              </p>
              {Number.isFinite(mgToUnitsResult) ? (
                <>
                  <p className="mt-2 text-5xl font-bold text-brand-violet tabular-nums">
                    {mgToUnitsResult.toFixed(mgToUnitsResult % 1 === 0 ? 0 : 2)}
                    <span className="text-2xl font-semibold text-brand-text-secondary ml-2">
                      units
                    </span>
                  </p>
                  {roundToHalfUnit(mgToUnitsResult) !== mgToUnitsResult && (
                    <p className="mt-2 text-sm text-brand-text-secondary">
                      Closest mark on a standard insulin syringe:{" "}
                      <strong className="text-brand-text-primary">
                        {roundToHalfUnit(mgToUnitsResult)} units
                      </strong>
                    </p>
                  )}
                  <p className="mt-3 text-sm text-brand-text-secondary">
                    = <strong>{unitsToMl(mgToUnitsResult).toFixed(3)} mL</strong> drawn
                    into a U-100 insulin syringe
                  </p>
                  {mgToUnitsResult > 100 && (
                    <p className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                      ⚠ This dose exceeds the 100-unit capacity of a standard
                      U-100 insulin syringe. You will need to either split
                      the dose into two injections or use a higher-concentration
                      vial. Confirm with your prescriber before proceeding.
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-2xl font-bold text-brand-text-secondary">
                  Enter a valid dose
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="units-input"
                className="block text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2"
              >
                Units drawn on the syringe
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="units-input"
                  type="number"
                  inputMode="decimal"
                  step="1"
                  min="0"
                  value={unitsInput}
                  onChange={(e) => setUnitsInput(e.target.value)}
                  className="w-32 rounded-lg border border-slate-300 px-4 py-3 text-2xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
                />
                <span className="text-lg font-semibold text-brand-text-secondary">
                  units
                </span>
                <span className="text-sm text-brand-text-secondary">
                  × {concentration} mg/mL ÷ 100 =
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {COMMON_UNIT_VALUES.map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnitsInput(String(u))}
                    className="text-xs font-semibold rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-brand-text-secondary hover:border-brand-violet/40 hover:text-brand-violet transition"
                  >
                    {u}u
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-brand-violet/30 bg-brand-violet/5 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold">
                Equivalent dose
              </p>
              {Number.isFinite(unitsToMgResult) ? (
                <>
                  <p className="mt-2 text-5xl font-bold text-brand-violet tabular-nums">
                    {unitsToMgResult.toFixed(unitsToMgResult % 1 === 0 ? 0 : 3).replace(/\.?0+$/, "")}
                    <span className="text-2xl font-semibold text-brand-text-secondary ml-2">
                      mg
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-brand-text-secondary">
                    = <strong>{unitsToMl(unitsValue).toFixed(3)} mL</strong> drawn into
                    a U-100 insulin syringe
                  </p>
                </>
              ) : (
                <p className="mt-2 text-2xl font-bold text-brand-text-secondary">
                  Enter a valid number of units
                </p>
              )}
            </div>
          </div>
        )}

        {direction === "bac-water" && (
          <div className="space-y-6">
            <p className="text-sm text-brand-text-secondary">
              For lyophilized vials: enter the total mg of drug in the
              vial and the target concentration you want in the final
              solution, and this will tell you how many mL of
              bacteriostatic water to add. See our{" "}
              <a
                href="/research/compounded-glp1-reconstitution-mixing-guide"
                className="text-brand-violet underline"
              >
                reconstitution guide
              </a>{" "}
              for the full safety protocol and the step-by-step process.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="vial-mg-input"
                  className="block text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2"
                >
                  Drug in vial (mg)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="vial-mg-input"
                    type="number"
                    inputMode="decimal"
                    step="1"
                    min="0"
                    value={vialMgInput}
                    onChange={(e) => setVialMgInput(e.target.value)}
                    className="w-28 rounded-lg border border-slate-300 px-4 py-3 text-2xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
                  />
                  <span className="text-lg font-semibold text-brand-text-secondary">
                    mg
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[5, 10, 15, 20, 30, 40].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVialMgInput(String(v))}
                      className="text-xs font-semibold rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-brand-text-secondary hover:border-brand-violet/40 hover:text-brand-violet transition"
                    >
                      {v} mg
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="target-conc-input"
                  className="block text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2"
                >
                  Target concentration (mg/mL)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="target-conc-input"
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min="0"
                    value={targetConcInput}
                    onChange={(e) => setTargetConcInput(e.target.value)}
                    className="w-28 rounded-lg border border-slate-300 px-4 py-3 text-2xl font-bold text-brand-text-primary tabular-nums focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
                  />
                  <span className="text-lg font-semibold text-brand-text-secondary">
                    mg/mL
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[2.5, 5, 10].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setTargetConcInput(String(v))}
                      className="text-xs font-semibold rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-brand-text-secondary hover:border-brand-violet/40 hover:text-brand-violet transition"
                    >
                      {v} mg/mL
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-brand-violet/30 bg-brand-violet/5 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold">
                Add this much bacteriostatic water
              </p>
              {Number.isFinite(bacWaterResult) ? (
                <>
                  <p className="mt-2 text-5xl font-bold text-brand-violet tabular-nums">
                    {bacWaterResult.toFixed(bacWaterResult % 1 === 0 ? 0 : 2)}
                    <span className="text-2xl font-semibold text-brand-text-secondary ml-2">
                      mL
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-brand-text-secondary">
                    {vialMgValue} mg ÷ {targetConcValue} mg/mL ={" "}
                    <strong className="text-brand-text-primary">
                      {bacWaterResult.toFixed(2)} mL
                    </strong>
                    {" "}of bacteriostatic water to reach the target
                    concentration.
                  </p>
                  {bacWaterResult > 10 && (
                    <p className="mt-3 rounded-lg border border-brand-violet/30 bg-white p-3 text-sm text-brand-text-primary">
                      ⚠ This would exceed a typical 10 mL vial capacity.
                      Consider a higher target concentration or confirm
                      your vial size with the compounding pharmacy.
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-2xl font-bold text-brand-text-secondary">
                  Enter valid vial mg and target concentration
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 rounded-lg border border-brand-violet/30 bg-brand-violet/5 p-4 text-sm text-brand-text-primary">
          <strong>Always verify the concentration on your vial label.</strong>{" "}
          Compounded GLP-1 vials can be dispensed at multiple
          concentrations and the same number of units means a different
          dose at each concentration. If the concentration on your vial
          doesn&apos;t match what you selected here, recalculate before
          drawing your dose. For lyophilized vials, follow the
          reconstitution instructions that shipped with your specific
          product, not a generic recipe.
        </div>
      </div>

      {/* ── Reference table: dose → units at all concentrations ── */}
      <div>
        <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
          {drug === "semaglutide" ? "Semaglutide" : "Tirzepatide"} dose →
          syringe units lookup
        </h3>
        <p className="text-sm text-brand-text-secondary mb-4">
          Standard FDA-approved titration doses converted to insulin
          syringe units at the most common compounded concentrations.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-brand-violet/15 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-violet/15">
                <th className="px-4 py-3 text-left font-semibold text-brand-text-secondary uppercase text-xs tracking-wider">
                  Dose (mg)
                </th>
                {COMMON_CONCENTRATIONS[drug].map((c) => (
                  <th
                    key={c}
                    className="px-4 py-3 text-right font-semibold text-brand-text-secondary uppercase text-xs tracking-wider"
                  >
                    @ {c} mg/mL
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {conversionTable.map((row) => (
                <tr
                  key={row.doseMg}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-3 font-bold text-brand-text-primary">
                    {row.doseMg} mg
                  </td>
                  {row.perConcentration.map((p) => (
                    <td
                      key={p.concentration}
                      className="px-4 py-3 text-right font-mono text-brand-text-primary tabular-nums"
                    >
                      {p.units} units
                      {p.units > 100 && (
                        <span className="ml-1 text-xs text-amber-700">
                          (over 100u)
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Reference table: units → mg ── */}
      <div>
        <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
          Units → {drug === "semaglutide" ? "semaglutide" : "tirzepatide"} mg
          lookup
        </h3>
        <p className="text-sm text-brand-text-secondary mb-4">
          For when your prescriber tells you to draw &ldquo;X units&rdquo;
          and you want to know how many milligrams that is.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-brand-violet/15 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-violet/15">
                <th className="px-4 py-3 text-left font-semibold text-brand-text-secondary uppercase text-xs tracking-wider">
                  Units drawn
                </th>
                {COMMON_CONCENTRATIONS[drug].map((c) => (
                  <th
                    key={c}
                    className="px-4 py-3 text-right font-semibold text-brand-text-secondary uppercase text-xs tracking-wider"
                  >
                    @ {c} mg/mL
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inverseTable.map((row) => (
                <tr
                  key={row.units}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-3 font-bold text-brand-text-primary">
                    {row.units} units
                  </td>
                  {row.perConcentration.map((p) => (
                    <td
                      key={p.concentration}
                      className="px-4 py-3 text-right font-mono text-brand-text-primary tabular-nums"
                    >
                      {p.mg.toFixed(2).replace(/\.?0+$/, "") || "0"} mg
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
