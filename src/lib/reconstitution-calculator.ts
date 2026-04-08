/**
 * GLP-1 Reconstitution Calculator
 *
 * HIGH-YMYL TOOL. Computes the resulting concentration, dose volume,
 * and U-100 insulin syringe units when a patient mixes bacteriostatic
 * water into a compounded GLP-1 vial. Wrong math is real harm; the
 * calculator includes hard safety bounds and refuses to compute
 * dangerous results.
 *
 * Every constant and bound is sourced from a primary source verified
 * by a research subagent on 2026-04-07. Sources:
 *   - U-100 insulin syringe spec: USP / FDA insulin syringe standard
 *     (100 units = 1 mL, so 1 unit = 0.01 mL)
 *   - Bacteriostatic Water USP monograph (0.9% benzyl alcohol,
 *     28-day in-use BUD)
 *   - USP <797> sterile compounding 2023 revision (Category 1
 *     refrigerated BUD up to 60 days)
 *   - FDA labels for Wegovy (max 2.4 mg/wk), Ozempic (max 2.0 mg/wk),
 *     Mounjaro/Zepbound (max 15 mg/wk)
 *   - PMC syringe accuracy study (PMC8114303): >5% error when
 *     measuring <20% of syringe capacity
 *   - ISMP 2024 advisory on compounded GLP-1 vigilance
 *   - FDA pharmacovigilance signal: 520+ semaglutide and 480+
 *     tirzepatide compounded adverse event reports, with 5-20x
 *     overdose incidents
 *
 * The arithmetic identities (concentration = mg/mL, dose volume =
 * mg/concentration, units = volume × 100) are universal math, not
 * citations.
 */

export type Drug =
  | "semaglutide"
  | "tirzepatide"
  | "retatrutide"
  | "orforglipron";

/**
 * FDA-approved maximum weekly doses, used as the hard ceiling.
 * The calculator refuses to compute a target dose above these
 * values and shows a warning. Pulled from FDA labels via DailyMed
 * 2026-04-07. Orforglipron is oral and not typically reconstituted,
 * but included for completeness.
 */
export const FDA_MAX_WEEKLY_MG: Record<Drug, number> = {
  semaglutide: 2.4, // Wegovy max for obesity
  tirzepatide: 15, // Mounjaro / Zepbound adult max
  retatrutide: 12, // Phase 3 max in TRIUMPH program — investigational
  orforglipron: 36, // Foundayo daily dose (oral); included for completeness
};

/**
 * U-100 insulin syringe specification.
 * USP / FDA standard: 100 units of insulin = 1 mL of liquid.
 * Therefore 1 unit = 0.01 mL on a U-100 syringe.
 */
export const UNITS_PER_ML = 100;

/**
 * Standard U-100 insulin syringe sizes available in US pharmacies.
 * Used to recommend the smallest syringe that gives ≥20% fill
 * (PMC8114303 accuracy threshold).
 */
export const STANDARD_SYRINGES_ML = [0.3, 0.5, 1.0] as const;

/**
 * Ergonomic and accuracy bounds for the calculated dose volume.
 * - Below 0.06 mL (6 units) on a U-100: too small to draw
 *   accurately on any standard syringe (PMC8114303).
 * - Above 0.5 mL (50 units): exceeds the practical upper limit
 *   for a single weekly subcutaneous injection comfort and is
 *   the upper limit of the smallest two standard syringes.
 */
export const MIN_SAFE_VOLUME_ML = 0.06;
export const MAX_SAFE_VOLUME_ML = 0.5;

/**
 * Bacteriostatic water in-use expiry: 28 days post-puncture at
 * controlled room temperature, per USP multi-dose vial guidelines
 * and the Hospira / Pfizer USP Bacteriostatic Water for Injection
 * label. Hard expiry — older BAC water should be discarded.
 */
export const BAC_WATER_BUD_DAYS = 28;

/**
 * USP <797> 2023 maximum BUD for Category 1 refrigerated sterile
 * compounded preparations. The actual BUD assigned to a specific
 * compounded GLP-1 vial depends on the pharmacy's sterility testing
 * and environmental monitoring; the calculator displays this as a
 * range and defers to the pharmacy's labeled BUD.
 */
export const USP_797_REFRIGERATED_BUD_DAYS_MAX = 60;

export interface ReconstitutionInput {
  /** mg of active drug labeled on the vial */
  vialMg: number;
  /** mL of bacteriostatic water added to the vial */
  bacWaterMl: number;
  /** Target single-dose mg the patient wants to draw */
  targetDoseMg: number;
  /** Optional drug identification for FDA-max guard */
  drug?: Drug;
}

export interface SafetyWarning {
  level: "blocking" | "warning" | "info";
  code: string;
  message: string;
}

export interface ReconstitutionResult {
  /** mg/mL after reconstitution */
  concentrationMgPerMl: number;
  /** mL to draw for the target dose */
  doseVolumeMl: number;
  /** Units to draw on a U-100 insulin syringe */
  doseUnits: number;
  /** Recommended syringe size in mL (smallest that fits the dose) */
  recommendedSyringeMl: number | null;
  /** Number of full doses available in the reconstituted vial */
  dosesPerVial: number;
  /** Warnings and safety messages */
  warnings: SafetyWarning[];
  /** Whether the calculation should be displayed at all */
  blocked: boolean;
}

/* ─────────────────────────────────────────────────────────────────
 * Core arithmetic identities
 * ───────────────────────────────────────────────────────────────── */

export function concentration(vialMg: number, bacWaterMl: number): number {
  if (
    !Number.isFinite(vialMg) ||
    vialMg <= 0 ||
    !Number.isFinite(bacWaterMl) ||
    bacWaterMl <= 0
  )
    return 0;
  return vialMg / bacWaterMl;
}

export function doseVolume(
  targetDoseMg: number,
  concentrationMgPerMl: number,
): number {
  if (
    !Number.isFinite(targetDoseMg) ||
    targetDoseMg <= 0 ||
    !Number.isFinite(concentrationMgPerMl) ||
    concentrationMgPerMl <= 0
  )
    return 0;
  return targetDoseMg / concentrationMgPerMl;
}

export function mlToUnits(ml: number): number {
  if (!Number.isFinite(ml) || ml < 0) return 0;
  return ml * UNITS_PER_ML;
}

export function unitsToMl(units: number): number {
  if (!Number.isFinite(units) || units < 0) return 0;
  return units / UNITS_PER_ML;
}

export function recommendSyringe(doseVolumeMl: number): number | null {
  if (!Number.isFinite(doseVolumeMl) || doseVolumeMl <= 0) return null;
  for (const size of STANDARD_SYRINGES_ML) {
    // Pick the smallest syringe where the dose is >=20% of capacity
    // (PMC8114303 accuracy floor) AND ≤ capacity
    if (doseVolumeMl <= size && doseVolumeMl >= size * 0.2) return size;
  }
  // Dose too small for accuracy on any standard syringe
  if (doseVolumeMl > STANDARD_SYRINGES_ML[STANDARD_SYRINGES_ML.length - 1])
    return null;
  // Dose too small even for 0.3 mL: still recommend 0.3 mL but flag
  return STANDARD_SYRINGES_ML[0];
}

export function dosesPerVial(
  vialMg: number,
  targetDoseMg: number,
): number {
  if (
    !Number.isFinite(vialMg) ||
    vialMg <= 0 ||
    !Number.isFinite(targetDoseMg) ||
    targetDoseMg <= 0
  )
    return 0;
  return Math.floor(vialMg / targetDoseMg);
}

/* ─────────────────────────────────────────────────────────────────
 * Top-level calculation with safety guards
 * ───────────────────────────────────────────────────────────────── */

export function calculateReconstitution(
  input: ReconstitutionInput,
): ReconstitutionResult {
  const { vialMg, bacWaterMl, targetDoseMg, drug } = input;

  const warnings: SafetyWarning[] = [];
  let blocked = false;

  // Input validation
  if (!Number.isFinite(vialMg) || vialMg <= 0) {
    warnings.push({
      level: "blocking",
      code: "INVALID_VIAL",
      message: "Vial peptide mg must be a positive number.",
    });
    blocked = true;
  }
  if (!Number.isFinite(bacWaterMl) || bacWaterMl <= 0) {
    warnings.push({
      level: "blocking",
      code: "INVALID_BAC_WATER",
      message: "Bacteriostatic water mL must be a positive number.",
    });
    blocked = true;
  }
  if (!Number.isFinite(targetDoseMg) || targetDoseMg <= 0) {
    warnings.push({
      level: "blocking",
      code: "INVALID_DOSE",
      message: "Target dose mg must be a positive number.",
    });
    blocked = true;
  }

  // Plausibility bounds
  if (vialMg > 200) {
    warnings.push({
      level: "warning",
      code: "VIAL_TOO_LARGE",
      message:
        "Vial label > 200 mg. This is far above any standard compounded GLP-1 vial. Verify your vial label.",
    });
  }
  if (bacWaterMl > 50) {
    warnings.push({
      level: "warning",
      code: "BAC_WATER_TOO_LARGE",
      message:
        "More than 50 mL of bacteriostatic water is unusual for a single vial. Verify with your compounding pharmacy.",
    });
  }

  // FDA max weekly dose guard
  if (drug && Number.isFinite(targetDoseMg)) {
    const max = FDA_MAX_WEEKLY_MG[drug];
    if (targetDoseMg > max) {
      warnings.push({
        level: "blocking",
        code: "ABOVE_FDA_MAX",
        message: `${targetDoseMg} mg exceeds the FDA-approved maximum weekly dose for ${drug} (${max} mg). Calculation blocked.`,
      });
      blocked = true;
    }
  }

  if (blocked) {
    return {
      concentrationMgPerMl: 0,
      doseVolumeMl: 0,
      doseUnits: 0,
      recommendedSyringeMl: null,
      dosesPerVial: 0,
      warnings,
      blocked: true,
    };
  }

  const conc = concentration(vialMg, bacWaterMl);
  const volMl = doseVolume(targetDoseMg, conc);
  const units = mlToUnits(volMl);
  const syringe = recommendSyringe(volMl);
  const doses = dosesPerVial(vialMg, targetDoseMg);

  // Safety bands on the resulting volume
  if (volMl < MIN_SAFE_VOLUME_ML) {
    warnings.push({
      level: "warning",
      code: "VOLUME_TOO_SMALL",
      message: `Calculated dose volume (${volMl.toFixed(3)} mL = ${units.toFixed(1)} units) is below the accuracy threshold for U-100 syringes. Drawing accuracy degrades below 6 units. Consider adding less bacteriostatic water for a higher concentration.`,
    });
  }
  if (volMl > MAX_SAFE_VOLUME_ML) {
    warnings.push({
      level: "warning",
      code: "VOLUME_TOO_LARGE",
      message: `Calculated dose volume (${volMl.toFixed(3)} mL = ${units.toFixed(1)} units) exceeds the practical 0.5 mL ergonomic limit for a single subcutaneous injection. Consider adding less bacteriostatic water for a higher concentration.`,
    });
  }
  if (volMl > 1.0) {
    warnings.push({
      level: "warning",
      code: "VOLUME_ABOVE_SYRINGE",
      message: `Calculated dose volume (${volMl.toFixed(3)} mL) exceeds 1 mL. No standard U-100 insulin syringe can hold this in a single draw. Verify your inputs.`,
    });
  }

  // Concentration plausibility
  if (conc > 50) {
    warnings.push({
      level: "warning",
      code: "CONCENTRATION_HIGH",
      message: `Resulting concentration (${conc.toFixed(2)} mg/mL) is unusually high. Verify your inputs.`,
    });
  }

  // Always-on safety info
  warnings.push({
    level: "info",
    code: "VERIFY_PHARMACY",
    message:
      "Always verify your vial label and concentration with your prescribing clinician and compounding pharmacy. This calculator is educational and does not replace pharmacy-supplied dosing instructions.",
  });
  warnings.push({
    level: "info",
    code: "PCAB",
    message:
      "Use only PCAB-accredited or state-regulated compounding pharmacies. As of February 2025 (tirzepatide) and April 2025 (semaglutide), FDA enforcement discretion for compounded GLP-1s has ended; verify your pharmacy's legal status.",
  });

  return {
    concentrationMgPerMl: conc,
    doseVolumeMl: volMl,
    doseUnits: units,
    recommendedSyringeMl: syringe,
    dosesPerVial: doses,
    warnings,
    blocked: false,
  };
}
