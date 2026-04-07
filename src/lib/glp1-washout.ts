/**
 * GLP-1 washout / clearance math.
 *
 * After your last GLP-1 dose, the drug decays from peak with the
 * elimination half-life. This module computes the time to reach
 * arbitrary residual fractions (50%, 25%, 5%, 1%, "undetectable")
 * using simple first-order kinetics:
 *
 *     C(t) = C_peak * (0.5 ^ (t / t_half))
 *
 * The DRUGS table (half-lives) is reused from pk-model.ts, which is
 * sourced from the Wegovy/Ozempic/Zepbound/Mounjaro/Foundayo FDA
 * prescribing information and the published clinical pharmacokinetics
 * literature.
 *
 * Caveats and disclaimers (must be surfaced in the UI):
 *
 *   - This is the population-mean half-life. Individual half-lives
 *     can vary by ±30% based on body composition, kidney function,
 *     and the steady-state context.
 *   - "Steady state" assumes the patient was on a stable dose for
 *     5+ half-lives before stopping. Patients in active titration
 *     have lower steady-state levels.
 *   - "Undetectable" depends entirely on the assay. There is no
 *     clinically standardized assay for semaglutide or tirzepatide
 *     blood levels in routine practice — this is a research-only
 *     concept.
 *   - The pharmacologic effect (gastric emptying, satiety) outlasts
 *     the blood concentration in many patients. Washout of blood
 *     levels is NOT the same as washout of clinical effect.
 *
 * Use cases this module is designed for:
 *
 *   1. Switching between GLP-1s — when can I start drug B after
 *      stopping drug A?
 *   2. Pre-procedure / surgery hold — see the ASA hold guidance
 *      article. Half-life data informs how long the drug actually
 *      lingers in the body.
 *   3. Pregnancy planning — how long after stopping should you wait
 *      before trying to conceive? (Manufacturer guidance for Wegovy
 *      is 2 months; this module shows the underlying PK reason.)
 *   4. Clinical trial enrollment — many trials have a washout
 *      requirement of 5x the half-life of any prior GLP-1.
 */

import { DRUGS, type DrugId, type DrugSpec } from "./pk-model";

export type { DrugId, DrugSpec };
export { DRUGS };

/** Residual fraction targets the calculator reports. */
export const RESIDUAL_TARGETS = [
  { label: "50%", fraction: 0.5 },
  { label: "25%", fraction: 0.25 },
  { label: "10%", fraction: 0.1 },
  { label: "5%", fraction: 0.05 },
  { label: "1%", fraction: 0.01 },
  { label: "0.1%", fraction: 0.001 },
] as const;

/**
 * Time (in hours) to decay from C_peak to a target residual fraction
 * with first-order half-life kinetics.
 *
 *   target = 0.5 ^ (t / t_half)
 *   t = t_half * log2(1 / target)
 */
export function timeToResidualHours(
  halfLifeHours: number,
  fraction: number,
): number {
  if (halfLifeHours <= 0) return 0;
  if (fraction <= 0) return Infinity;
  if (fraction >= 1) return 0;
  return halfLifeHours * Math.log2(1 / fraction);
}

/** Same, in days. */
export function timeToResidualDays(
  halfLifeHours: number,
  fraction: number,
): number {
  return timeToResidualHours(halfLifeHours, fraction) / 24;
}

/**
 * Residual concentration as a fraction of peak after t hours of
 * pure exponential decay (no further dosing).
 */
export function residualFractionAt(
  hoursSinceLastDose: number,
  halfLifeHours: number,
): number {
  if (hoursSinceLastDose < 0) return 1;
  if (halfLifeHours <= 0) return 0;
  return Math.pow(0.5, hoursSinceLastDose / halfLifeHours);
}

/**
 * Format a duration in hours into a human-readable "X days, Y hours"
 * string. Used in the UI result cards.
 */
export function formatDuration(hours: number): string {
  if (!Number.isFinite(hours) || hours < 0) return "—";
  if (hours < 1) {
    const mins = Math.round(hours * 60);
    return `${mins} min`;
  }
  if (hours < 24) {
    return `${hours.toFixed(1)} hr`;
  }
  const days = Math.floor(hours / 24);
  const remHours = Math.round(hours - days * 24);
  if (days < 14) {
    if (remHours === 0) return `${days} day${days === 1 ? "" : "s"}`;
    return `${days}d ${remHours}h`;
  }
  // For long durations just show days
  return `${days} days`;
}

/**
 * Days from "last dose" to a list of residual milestone fractions.
 * Returned in order: most-recent (50%) → most-cleared (0.1%).
 */
export interface ResidualMilestone {
  label: string;
  fraction: number;
  hours: number;
  days: number;
  formatted: string;
}

export function residualMilestones(
  halfLifeHours: number,
): ResidualMilestone[] {
  return RESIDUAL_TARGETS.map((t) => {
    const hours = timeToResidualHours(halfLifeHours, t.fraction);
    return {
      label: t.label,
      fraction: t.fraction,
      hours,
      days: hours / 24,
      formatted: formatDuration(hours),
    };
  });
}

/**
 * Standard washout-rule-of-thumb returns for the use cases the
 * tool addresses. Each is a clinically interpreted milestone, not
 * a number from a single source.
 */
export interface ClinicalGuidance {
  scenario: string;
  description: string;
  recommendedDays: number;
  fractionRemaining: number;
  source: string;
}

export function clinicalGuidanceForDrug(drug: DrugSpec): ClinicalGuidance[] {
  const halfLifeDays = drug.halfLifeHours / 24;
  // 5 half-lives ~3% remaining — conventional clinical "washout"
  const fiveHalfLives = 5 * halfLifeDays;
  // 10 half-lives ~0.1% remaining — research / trial enrollment
  const tenHalfLives = 10 * halfLifeDays;
  return [
    {
      scenario: "Switching to another GLP-1",
      description:
        "Standard practice is to start the new GLP-1 at its lowest titration step on the next scheduled injection day after the last dose of the prior drug. No biological washout is required.",
      recommendedDays: drug.intervalHours / 24,
      fractionRemaining: residualFractionAt(drug.intervalHours, drug.halfLifeHours),
      source:
        "FDA Wegovy/Ozempic/Zepbound/Mounjaro PI; common clinical practice",
    },
    {
      scenario: "Pre-surgery hold (weight management indication)",
      description:
        "ASA 2023 guidance: hold weekly GLP-1s for 1 week before any general anesthesia or deep sedation procedure. The 2024 multi-society update adds a 24-hour clear-liquid diet on top.",
      recommendedDays: 7,
      fractionRemaining: residualFractionAt(7 * 24, drug.halfLifeHours),
      source: "ASA Consensus Statement 2023; ASA/AGA/ASMBS 2024 update",
    },
    {
      scenario: "Conventional clinical washout (5 half-lives)",
      description:
        "After 5 half-lives, approximately 97% of the drug has cleared. This is the standard pharmacology textbook definition of 'washed out' and is commonly used as the cutoff for crossover trial designs and clinical studies.",
      recommendedDays: Math.round(fiveHalfLives),
      fractionRemaining: 0.03125, // 0.5^5
      source: "Standard pharmacokinetic principle (Goodman & Gilman)",
    },
    {
      scenario: "Pregnancy planning (Wegovy label)",
      description:
        "The Wegovy prescribing information recommends discontinuing semaglutide at least 2 months before a planned pregnancy because of the long half-life and limited human pregnancy data. Apply the same 2-month rule for tirzepatide and other long-half-life GLP-1s.",
      recommendedDays: 60,
      fractionRemaining: residualFractionAt(60 * 24, drug.halfLifeHours),
      source: "Wegovy PI Section 8.1; analogous practice for tirzepatide",
    },
    {
      scenario: "Research-grade washout (10 half-lives)",
      description:
        "After 10 half-lives, approximately 99.9% of the drug has cleared. This is the threshold used by some clinical trials to declare a patient drug-free for enrollment in another GLP-1 study.",
      recommendedDays: Math.round(tenHalfLives),
      fractionRemaining: 0.001,
      source: "Standard pharmacokinetic principle",
    },
  ];
}

/** Returns a default unit-free concentration curve for a chart. */
export interface DecayPoint {
  days: number;
  fraction: number;
}

export function buildDecayCurve(
  halfLifeHours: number,
  totalDays: number = 90,
  steps: number = 90,
): DecayPoint[] {
  const out: DecayPoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const days = (totalDays * i) / steps;
    const hours = days * 24;
    out.push({ days, fraction: residualFractionAt(hours, halfLifeHours) });
  }
  return out;
}
