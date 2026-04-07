/**
 * Compounded GLP-1 unit ↔ mg conversion math.
 *
 * Educational tool — patients on COMPOUNDED semaglutide and
 * tirzepatide receive their drug in vials at a known mg/mL
 * concentration and draw doses with standard U-100 insulin syringes.
 * Telehealth providers commonly tell patients "draw to the 20 unit
 * mark" without explaining the underlying math, and patients then
 * search Google for "how many mg is 40 units of semaglutide" to
 * confirm. This module is the math behind that question.
 *
 * Definitions:
 * - U-100 insulin syringe: 100 units = 1 mL. So 1 unit = 0.01 mL.
 *   This is the standard syringe used worldwide for insulin and is
 *   the syringe almost always shipped with compounded GLP-1 vials.
 *   Source: BD Ultra-Fine insulin syringe specifications; FDA
 *   guidance on insulin syringe standards.
 *
 * - Concentration (mg/mL): how many milligrams of active drug are
 *   dissolved in each milliliter of liquid in the vial. Set by the
 *   compounding pharmacy. Common compounded concentrations:
 *     * Semaglutide: 2.5 mg/mL or 5 mg/mL (most common: 2.5 mg/mL)
 *     * Tirzepatide: 5 mg/mL or 10 mg/mL (most common: 10 mg/mL)
 *   The patient MUST verify the exact concentration on their vial
 *   label before relying on any unit-to-mg conversion.
 *
 * Math:
 *     mg_dose = (units * concentration_mg_per_mL) / 100
 *     units   = (mg_dose * 100) / concentration_mg_per_mL
 *
 * Examples:
 * - 2.5 mg/mL semaglutide vial, 0.25 mg starting dose
 *     → units = (0.25 * 100) / 2.5 = 10 units on the syringe
 * - 10 mg/mL tirzepatide vial, 5 mg dose
 *     → units = (5 * 100) / 10 = 50 units on the syringe
 * - 5 mg/mL tirzepatide vial, 2.5 mg dose
 *     → units = (2.5 * 100) / 5 = 50 units on the syringe
 *
 * SAFETY: This module reports calculations only. The clinical safety
 * checks (right vial, right concentration, right syringe, right
 * patient, right time) are the prescriber's and the patient's
 * responsibility.
 */

export type DrugName = "semaglutide" | "tirzepatide";

/** Common compounded concentrations seen in US telehealth fulfillment. */
export const COMMON_CONCENTRATIONS: Record<DrugName, number[]> = {
  semaglutide: [2.5, 5],
  tirzepatide: [5, 10],
};

/** Standard FDA-approved injectable maintenance doses (mg). */
export const FDA_MAINTENANCE_DOSES: Record<DrugName, number> = {
  semaglutide: 2.4, // Wegovy
  tirzepatide: 15, // Zepbound
};

/** Standard titration schedules (mg) used to populate the dose picker. */
export const STANDARD_TITRATION_DOSES: Record<DrugName, number[]> = {
  semaglutide: [0.25, 0.5, 1.0, 1.7, 2.4],
  tirzepatide: [2.5, 5, 7.5, 10, 12.5, 15],
};

/**
 * Convert milligrams of active drug to insulin-syringe units, given
 * the vial concentration in mg/mL.
 *
 * Returns NaN for invalid input (negative or zero concentration).
 */
export function mgToUnits(mg: number, concentrationMgPerMl: number): number {
  if (!Number.isFinite(mg) || !Number.isFinite(concentrationMgPerMl)) return NaN;
  if (mg < 0) return NaN;
  if (concentrationMgPerMl <= 0) return NaN;
  return (mg * 100) / concentrationMgPerMl;
}

/**
 * Convert insulin-syringe units to milligrams of active drug.
 */
export function unitsToMg(units: number, concentrationMgPerMl: number): number {
  if (!Number.isFinite(units) || !Number.isFinite(concentrationMgPerMl)) return NaN;
  if (units < 0) return NaN;
  if (concentrationMgPerMl <= 0) return NaN;
  return (units * concentrationMgPerMl) / 100;
}

/**
 * Convert units to mL drawn into the syringe. Independent of drug
 * concentration since 1 unit on a U-100 syringe is always 0.01 mL.
 */
export function unitsToMl(units: number): number {
  if (!Number.isFinite(units) || units < 0) return NaN;
  return units / 100;
}

/**
 * Round a unit value to the nearest 0.5 unit (insulin syringe
 * gradations). For doses that don't fall on a whole-unit mark, the
 * rounded value is what the patient can actually draw.
 */
export function roundToHalfUnit(units: number): number {
  if (!Number.isFinite(units)) return NaN;
  return Math.round(units * 2) / 2;
}

/**
 * Build a full conversion table: for each common dose mg, show the
 * unit measurement at each common concentration. Used to populate the
 * static reference table on the converter page so the page also
 * answers static long-tail queries like "20 units of semaglutide is
 * how many mg" without requiring user interaction.
 */
export interface ConversionRow {
  doseMg: number;
  perConcentration: { concentration: number; units: number; rounded: number }[];
}

export function buildConversionTable(drug: DrugName): ConversionRow[] {
  const concentrations = COMMON_CONCENTRATIONS[drug];
  const doses = STANDARD_TITRATION_DOSES[drug];
  return doses.map((doseMg) => ({
    doseMg,
    perConcentration: concentrations.map((c) => {
      const u = mgToUnits(doseMg, c);
      return {
        concentration: c,
        units: u,
        rounded: roundToHalfUnit(u),
      };
    }),
  }));
}

/**
 * Build the inverse table: for common unit values (5, 10, 15, 20, 25,
 * 30, 40, 50), show the resulting mg at each common concentration.
 */
export interface InverseRow {
  units: number;
  perConcentration: { concentration: number; mg: number }[];
}

export const COMMON_UNIT_VALUES = [5, 10, 15, 20, 25, 30, 40, 50] as const;

export function buildInverseTable(drug: DrugName): InverseRow[] {
  const concentrations = COMMON_CONCENTRATIONS[drug];
  return COMMON_UNIT_VALUES.map((units) => ({
    units,
    perConcentration: concentrations.map((c) => ({
      concentration: c,
      mg: unitsToMg(units, c),
    })),
  }));
}
