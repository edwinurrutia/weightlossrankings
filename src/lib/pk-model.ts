/**
 * Pharmacokinetic model for the GLP-1 dose plotter.
 *
 * Educational tool only — not for clinical dosing.
 *
 * Model: one-compartment with first-order absorption (ka) and
 * first-order elimination (ke), with linear superposition for
 * repeated dosing.
 *
 * Single-dose plasma concentration (Bateman equation):
 *
 *     C(t) = (F * D / Vd) * (ka / (ka - ke)) * (e^(-ke t) - e^(-ka t))
 *
 * For the educational chart we report a relative concentration
 * normalized to the steady-state peak of the maintenance dose,
 * so the F/Vd constant cancels and only the rate constants and
 * dose ratios matter. This keeps the visualization grounded in
 * the actual pharmacokinetic shape (peak time, accumulation
 * across repeated doses, missed-dose recovery) without
 * pretending to predict absolute blood levels.
 *
 * Pharmacokinetic parameters are sourced from FDA prescribing
 * information and the published clinical pharmacology literature:
 *
 * - Semaglutide subcutaneous: t1/2 ~7 days (168 h), peak (Tmax) at
 *   ~1-3 days post-injection; Wegovy and Ozempic prescribing
 *   information; Hall S et al. Clin Pharmacokinet 2019.
 * - Tirzepatide subcutaneous: t1/2 ~5 days (120 h), peak at
 *   ~1-2 days post-injection; Mounjaro/Zepbound prescribing
 *   information; Urva S et al. Clin Pharmacokinet 2022.
 * - Orforglipron oral: t1/2 ~29-49 hours (effective ~36 h),
 *   peak at ~6 h post-dose; Ma X et al. Diabetes Therapy 2024
 *   PMID 38402332.
 */

export type DrugId =
  | "semaglutide"
  | "tirzepatide"
  | "orforglipron"
  | "retatrutide";

export interface DrugSpec {
  id: DrugId;
  displayName: string;
  brandNames: string[];
  /** Dosing interval in hours. 168 = once weekly, 24 = once daily. */
  intervalHours: number;
  /** Elimination half-life in hours. */
  halfLifeHours: number;
  /** Absorption half-life in hours (much shorter than elimination). */
  absorptionHalfLifeHours: number;
  /** Standard titration schedule, in mg, in order. */
  titration: { weeks: number; doseMg: number }[];
  /** Maintenance dose (used for relative-concentration normalization). */
  maintenanceDoseMg: number;
  /** Source documentation for the parameters above. */
  sources: string[];
}

export const DRUGS: Record<DrugId, DrugSpec> = {
  semaglutide: {
    id: "semaglutide",
    displayName: "Semaglutide",
    brandNames: ["Wegovy", "Ozempic"],
    intervalHours: 168,
    halfLifeHours: 168, // ~7 days
    absorptionHalfLifeHours: 24, // sc absorption is much faster than elimination
    titration: [
      { weeks: 4, doseMg: 0.25 },
      { weeks: 4, doseMg: 0.5 },
      { weeks: 4, doseMg: 1.0 },
      { weeks: 4, doseMg: 1.7 },
      { weeks: 999, doseMg: 2.4 },
    ],
    maintenanceDoseMg: 2.4,
    sources: [
      "Wegovy (semaglutide 2.4 mg) US Prescribing Information",
      "Ozempic (semaglutide) US Prescribing Information",
      "Hall S et al. Clin Pharmacokinet 2019 — semaglutide PK review",
    ],
  },
  tirzepatide: {
    id: "tirzepatide",
    displayName: "Tirzepatide",
    brandNames: ["Zepbound", "Mounjaro"],
    intervalHours: 168,
    halfLifeHours: 120, // ~5 days
    absorptionHalfLifeHours: 24,
    titration: [
      { weeks: 4, doseMg: 2.5 },
      { weeks: 4, doseMg: 5 },
      { weeks: 4, doseMg: 7.5 },
      { weeks: 4, doseMg: 10 },
      { weeks: 4, doseMg: 12.5 },
      { weeks: 999, doseMg: 15 },
    ],
    maintenanceDoseMg: 15,
    sources: [
      "Zepbound (tirzepatide) US Prescribing Information",
      "Mounjaro (tirzepatide) US Prescribing Information",
      "Urva S et al. Clin Pharmacokinet 2022 — tirzepatide PK",
    ],
  },
  orforglipron: {
    id: "orforglipron",
    displayName: "Orforglipron",
    brandNames: ["Foundayo"],
    intervalHours: 24,
    halfLifeHours: 36,
    absorptionHalfLifeHours: 4, // oral, faster absorption
    titration: [
      { weeks: 4, doseMg: 0.8 },
      { weeks: 4, doseMg: 2.5 },
      { weeks: 4, doseMg: 5.5 },
      { weeks: 4, doseMg: 9 },
      { weeks: 4, doseMg: 14.5 },
      { weeks: 999, doseMg: 17.2 },
    ],
    maintenanceDoseMg: 17.2,
    sources: [
      "Foundayo (orforglipron) US Prescribing Information",
      "Ma X et al. Diabetes Therapy 2024 PMID 38402332 — orforglipron food-effect/PK",
    ],
  },
  retatrutide: {
    id: "retatrutide",
    displayName: "Retatrutide",
    brandNames: ["LY3437943 — investigational"],
    intervalHours: 168,
    halfLifeHours: 144, // ~6 days, per Coskun et al. Cell Metabolism 2022
    absorptionHalfLifeHours: 24,
    titration: [
      { weeks: 4, doseMg: 2 },
      { weeks: 4, doseMg: 4 },
      { weeks: 4, doseMg: 6 },
      { weeks: 4, doseMg: 8 },
      { weeks: 4, doseMg: 10 },
      { weeks: 999, doseMg: 12 },
    ],
    maintenanceDoseMg: 12,
    sources: [
      "Jastreboff AM et al. NEJM 2023 PMID 37366315 — phase 2 obesity trial",
      "Coskun T et al. Cell Metabolism 2022 PMID 36240769 — discovery and PK",
      "TRIUMPH-4 readout, Eli Lilly investor press release December 11, 2025",
    ],
  },
};

/** Convert half-life (hours) to first-order rate constant k (1/hour). */
export function halfLifeToK(halfLifeHours: number): number {
  return Math.LN2 / halfLifeHours;
}

/**
 * Single-dose plasma concentration via the Bateman equation, with
 * the F/Vd constant absorbed into a unit scale. Returns relative
 * concentration in mg-equivalent units (caller normalizes).
 */
export function singleDoseConcentration(
  tHours: number,
  doseMg: number,
  ka: number,
  ke: number,
): number {
  if (tHours < 0) return 0;
  if (doseMg <= 0) return 0;
  if (ka <= 0 || ke <= 0) return 0;
  // Guard against ka == ke degenerate case
  if (Math.abs(ka - ke) < 1e-9) {
    // limit form: C(t) = D * ka * t * e^(-ka t)
    return doseMg * ka * tHours * Math.exp(-ka * tHours);
  }
  return (
    (doseMg * ka) / (ka - ke) *
    (Math.exp(-ke * tHours) - Math.exp(-ka * tHours))
  );
}

export interface DoseEvent {
  /** Time of administration in hours since simulation start. */
  tHours: number;
  /** Dose amount in mg. */
  doseMg: number;
}

/**
 * Accumulated concentration at time t from a list of dose events
 * (linear superposition). The drug parameters set the rate constants.
 */
export function accumulatedConcentration(
  tHours: number,
  doses: DoseEvent[],
  drug: DrugSpec,
): number {
  const ka = halfLifeToK(drug.absorptionHalfLifeHours);
  const ke = halfLifeToK(drug.halfLifeHours);
  let total = 0;
  for (const d of doses) {
    if (d.tHours <= tHours) {
      total += singleDoseConcentration(tHours - d.tHours, d.doseMg, ka, ke);
    }
  }
  return total;
}

/**
 * Build a dose-event list from a titration schedule, optionally with
 * one or more missed doses (specified as 0-indexed dose numbers to skip).
 */
export function buildDoseSchedule(
  drug: DrugSpec,
  totalWeeks: number,
  options: { missedDoseIndices?: number[] } = {},
): DoseEvent[] {
  const missed = new Set(options.missedDoseIndices ?? []);
  const events: DoseEvent[] = [];
  // Walk the titration steps and emit dose events
  let weekIndex = 0;
  let doseIdx = 0;
  for (const step of drug.titration) {
    const stepEnd = Math.min(weekIndex + step.weeks, totalWeeks);
    while (weekIndex < stepEnd) {
      // For weekly drugs: emit one dose per week.
      // For daily drugs: emit 7 doses per week.
      const dosesPerWeek = Math.round((7 * 24) / drug.intervalHours);
      for (let n = 0; n < dosesPerWeek; n++) {
        const t = (weekIndex * 7 * 24) + n * drug.intervalHours;
        if (!missed.has(doseIdx)) {
          events.push({ tHours: t, doseMg: step.doseMg });
        }
        doseIdx++;
      }
      weekIndex++;
    }
    if (weekIndex >= totalWeeks) break;
  }
  return events;
}

/**
 * Compute peak (Cmax) of the maintenance dose at steady state, used
 * for relative-concentration normalization. We define this as the
 * peak concentration reached after a long enough run-in (≥10 half-lives)
 * with maintenance dosing only.
 */
export function steadyStatePeak(drug: DrugSpec): number {
  // Run a long simulation at maintenance dose only.
  const runInWeeks = 20; // > 10 half-lives for all three drugs
  const events: DoseEvent[] = [];
  const dosesPerWeek = Math.round((7 * 24) / drug.intervalHours);
  for (let w = 0; w < runInWeeks; w++) {
    for (let n = 0; n < dosesPerWeek; n++) {
      const t = w * 7 * 24 + n * drug.intervalHours;
      events.push({ tHours: t, doseMg: drug.maintenanceDoseMg });
    }
  }
  // Sample concentration densely in the last week to find Cmax
  const startSample = (runInWeeks - 1) * 7 * 24;
  const endSample = runInWeeks * 7 * 24;
  let peak = 0;
  for (let t = startSample; t <= endSample; t += 1) {
    const c = accumulatedConcentration(t, events, drug);
    if (c > peak) peak = c;
  }
  return peak;
}

export interface SamplePoint {
  /** Time in days since simulation start (fractional). */
  day: number;
  /** Relative concentration (0..1+, normalized to maintenance steady-state peak). */
  relativeConcentration: number;
  /** Current dose level in mg at this time. */
  currentDoseMg: number;
}

/**
 * Sample the concentration curve across a full titration timeline.
 * Default sampling step is 6 hours (4 samples per day) which is fine
 * enough to capture daily-dose peaks for orforglipron and weekly-dose
 * shapes for semaglutide and tirzepatide without overloading the SVG.
 */
export function simulateTitrationCurve(
  drug: DrugSpec,
  totalWeeks: number,
  options: { missedDoseIndices?: number[]; sampleStepHours?: number } = {},
): SamplePoint[] {
  const stepHours = options.sampleStepHours ?? 6;
  const events = buildDoseSchedule(drug, totalWeeks, options);
  const peak = steadyStatePeak(drug);
  const points: SamplePoint[] = [];
  const totalHours = totalWeeks * 7 * 24;
  for (let tHours = 0; tHours <= totalHours; tHours += stepHours) {
    const c = accumulatedConcentration(tHours, events, drug);
    points.push({
      day: tHours / 24,
      relativeConcentration: peak > 0 ? c / peak : 0,
      currentDoseMg: currentDoseAtWeek(drug, Math.floor(tHours / (7 * 24))),
    });
  }
  return points;
}

/** Determine which titration step applies at a given week index. */
export function currentDoseAtWeek(drug: DrugSpec, weekIndex: number): number {
  let cum = 0;
  for (const step of drug.titration) {
    cum += step.weeks;
    if (weekIndex < cum) return step.doseMg;
  }
  return drug.maintenanceDoseMg;
}
