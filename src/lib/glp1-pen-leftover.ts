/**
 * GLP-1 multi-dose pen reference data and pure-function helpers for
 * the pen leftover calculator at /tools/glp1-pen-leftover-calculator.
 *
 * All fill volumes and dose counts come directly from the FDA
 * prescribing information for each pen. Do NOT introduce values
 * that are not in the label.
 *
 *  - Ozempic 0.25/0.5 mg starter pen: 2 mg / 3 mL    → 4 doses at either 0.25 mg or 0.5 mg
 *    (per FDA Ozempic USPI Section 3 Dosage Forms and Strengths — the
 *    older 1.5 mL / 8-dose configuration is no longer marketed in the US)
 *  - Ozempic 1 mg pen:                4 mg / 3 mL    → 4 doses @ 1 mg
 *  - Ozempic 2 mg pen:                8 mg / 3 mL    → 4 doses @ 2 mg
 *  - Saxenda 18 mg/3 mL pen: titrated 0.6/1.2/1.8/2.4/3.0 mg per day
 *
 * Single-dose pens (Wegovy, Zepbound, Mounjaro) are NOT in this
 * dataset because they cannot be tracked dose-by-dose — each pen is
 * one injection.
 */

export type PenFrequency = "weekly" | "daily";
export type PenId =
  | "ozempic-starter"
  | "ozempic-1mg"
  | "ozempic-2mg"
  | "saxenda";

export interface PenDoseOption {
  /** Per-injection dose in mg, exactly as the user dials. */
  doseMg: number;
  /** Human label for the dropdown ("0.25 mg", "0.5 mg", ...). */
  label: string;
  /** Total doses available from this pen at this dialed dose. */
  dosesPerPen: number;
}

export interface PenPreset {
  id: PenId;
  label: string;
  totalMg: number;
  totalMl: number;
  frequency: PenFrequency;
  doses: PenDoseOption[];
}

export const PEN_PRESETS: PenPreset[] = [
  {
    id: "ozempic-starter",
    label: "Ozempic 0.25/0.5 mg starter pen",
    // Per FDA Ozempic USPI Section 3 Dosage Forms and Strengths: the
    // current US starter pen is 2 mg / 3 mL (0.68 mg/mL) and dispenses
    // 4 weekly doses at either 0.25 mg or 0.5 mg. The older 1.5 mL /
    // 8-dose configuration is no longer marketed.
    totalMg: 2,
    totalMl: 3,
    frequency: "weekly",
    doses: [
      { doseMg: 0.25, label: "0.25 mg", dosesPerPen: 4 },
      { doseMg: 0.5, label: "0.5 mg", dosesPerPen: 4 },
    ],
  },
  {
    id: "ozempic-1mg",
    label: "Ozempic 1 mg pen",
    totalMg: 4,
    totalMl: 3,
    frequency: "weekly",
    doses: [{ doseMg: 1, label: "1 mg", dosesPerPen: 4 }],
  },
  {
    id: "ozempic-2mg",
    label: "Ozempic 2 mg pen",
    totalMg: 8,
    totalMl: 3,
    frequency: "weekly",
    doses: [{ doseMg: 2, label: "2 mg", dosesPerPen: 4 }],
  },
  {
    id: "saxenda",
    label: "Saxenda 18 mg/3 mL pen",
    totalMg: 18,
    totalMl: 3,
    frequency: "daily",
    doses: [
      { doseMg: 0.6, label: "0.6 mg (week 1)", dosesPerPen: 30 },
      { doseMg: 1.2, label: "1.2 mg (week 2)", dosesPerPen: 15 },
      { doseMg: 1.8, label: "1.8 mg (week 3)", dosesPerPen: 10 },
      { doseMg: 2.4, label: "2.4 mg (week 4)", dosesPerPen: 7 },
      { doseMg: 3.0, label: "3.0 mg (maintenance)", dosesPerPen: 6 },
    ],
  },
];

export interface PenCalcInputs {
  penId: PenId;
  doseMg: number;
  dosesAlreadyTaken: number;
}

export interface PenCalcResult {
  totalDoses: number;
  dosesRemaining: number;
  mlPerDose: number;
  mlRemaining: number;
  daysOfSupplyRemaining: number;
  frequency: PenFrequency;
  refillNeededByDate: string;
  isLastDose: boolean;
  isExhausted: boolean;
}

/** Look up a preset by id. Returns undefined if id is unknown. */
export function getPenPreset(penId: PenId): PenPreset | undefined {
  return PEN_PRESETS.find((p) => p.id === penId);
}

/**
 * Look up the dose option for a given pen + dialed dose. We match on
 * doseMg with a small tolerance because of FP equality.
 */
export function getPenDoseOption(
  penId: PenId,
  doseMg: number,
): PenDoseOption | undefined {
  const preset = getPenPreset(penId);
  if (!preset) return undefined;
  return preset.doses.find((d) => Math.abs(d.doseMg - doseMg) < 1e-9);
}

/**
 * Pure calculator. Returns null if inputs are nonsensical (unknown
 * pen / dose, negative doses-taken, etc.).
 */
export function computePenLeftover(
  inputs: PenCalcInputs,
  today: Date = new Date(),
): PenCalcResult | null {
  const preset = getPenPreset(inputs.penId);
  if (!preset) return null;
  const doseOption = getPenDoseOption(inputs.penId, inputs.doseMg);
  if (!doseOption) return null;

  const totalDoses = doseOption.dosesPerPen;
  const taken = Math.max(
    0,
    Math.min(totalDoses, Math.floor(inputs.dosesAlreadyTaken)),
  );
  const dosesRemaining = totalDoses - taken;

  // mL per dose = (dose mg / total mg) * total mL — exact under the
  // assumption that concentration is uniform across the cartridge,
  // which is true for all FDA-labeled GLP-1 pens.
  const mlPerDose = (inputs.doseMg / preset.totalMg) * preset.totalMl;
  const mlRemaining = mlPerDose * dosesRemaining;

  const dayStep = preset.frequency === "weekly" ? 7 : 1;
  const daysOfSupplyRemaining = dosesRemaining * dayStep;

  const refillDate = new Date(today.getTime());
  refillDate.setDate(refillDate.getDate() + daysOfSupplyRemaining);
  const refillNeededByDate = refillDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return {
    totalDoses,
    dosesRemaining,
    mlPerDose,
    mlRemaining,
    daysOfSupplyRemaining,
    frequency: preset.frequency,
    refillNeededByDate,
    isLastDose: dosesRemaining === 1,
    isExhausted: dosesRemaining === 0,
  };
}

/** Format a mL value to 2 decimal places, trimming trailing zeros. */
export function formatMl(ml: number): string {
  return `${Number(ml.toFixed(2))} mL`;
}
