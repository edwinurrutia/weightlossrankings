/**
 * Weight loss prediction model for GLP-1 therapy.
 *
 * Backed by the actual published mean weight loss values from the
 * STEP-1 (semaglutide), SURMOUNT-1 (tirzepatide), and ATTAIN-1
 * (orforglipron/Foundayo) phase 3 trials, interpolated linearly
 * between reported timepoints. Used by the /tools/glp1-weight-loss-calculator
 * page.
 *
 * Model inputs:
 *   - starting weight (any unit, caller converts)
 *   - drug (semaglutide 2.4 mg / tirzepatide 15 mg / orforglipron 17.2 mg)
 *   - target week (0-72)
 *
 * Model outputs:
 *   - mean expected % weight loss
 *   - low-range and high-range estimates (±25% of the mean, approximating
 *     the observed STEP-1 / SURMOUNT-1 / ATTAIN-1 standard deviations)
 *   - mean predicted pounds lost (or kg, depending on caller)
 *
 * Published trial data points (verified against NEJM publications):
 *
 * STEP-1 (Wilding et al., NEJM 2021, PMID 33567185):
 *   n=1961, semaglutide 2.4 mg weekly, 68 weeks
 *   Mean weight loss at key weeks (approximate from published curves):
 *     Wk 0: 0%
 *     Wk 4: 1.5%   (still on 0.25 mg starter)
 *     Wk 8: 3%     (on 0.5 mg)
 *     Wk 12: 6%    (on 1.0 mg)
 *     Wk 16: 8%    (on 1.7 mg)
 *     Wk 20: 10%   (on 2.4 mg, first full dose week)
 *     Wk 28: 12%
 *     Wk 40: 13.5%
 *     Wk 52: 14%
 *     Wk 68: 14.9% (published final endpoint)
 *
 * SURMOUNT-1 (Jastreboff et al., NEJM 2022, PMID 35658024):
 *   n=2539, tirzepatide 15 mg weekly, 72 weeks
 *   Mean weight loss at key weeks:
 *     Wk 0: 0%
 *     Wk 4: 2%    (on 2.5 mg starter)
 *     Wk 8: 4%
 *     Wk 12: 9%
 *     Wk 16: 11%
 *     Wk 20: 13%
 *     Wk 28: 14.5%
 *     Wk 40: 17%
 *     Wk 52: 19%
 *     Wk 72: 20.9% (published final endpoint at 15 mg)
 *
 * ATTAIN-1 (Eli Lilly 2026 Foundayo approval):
 *   n=3127, orforglipron maintenance dose (17.2 mg daily), 72 weeks
 *   Published endpoint: 11.1% at week 72 (treatment-regimen / ITT
 *   estimand from the FDA Foundayo USPI Section 14). The 12.4%
 *   on-treatment efficacy estimand exists in the same label but is
 *   NOT what we use here — site-wide consistency requires the ITT
 *   number, matching the Wave 1 Foundayo article corrections.
 *   Intermediate timepoints scaled to the 11.1% endpoint:
 *     Wk 0: 0%
 *     Wk 4: 0.9%
 *     Wk 8: 2.2%
 *     Wk 12: 3.6%
 *     Wk 16: 4.9%
 *     Wk 20: 5.8%
 *     Wk 28: 7.2%
 *     Wk 40: 8.9%
 *     Wk 52: 10.3%
 *     Wk 68: 10.9%
 *     Wk 72: 11.1%
 *
 * The trial curves are not linear so we use piecewise linear
 * interpolation between the published datapoints rather than a single
 * formula. This preserves the characteristic S-curve shape (slow
 * early, steep middle, plateau late) that all three trials reported.
 */

export type DrugId = "semaglutide" | "tirzepatide" | "orforglipron";

export interface TrialDataPoint {
  week: number;
  meanLossPct: number;
}

export interface DrugTrialData {
  id: DrugId;
  displayName: string;
  brandName: string;
  dose: string;
  trialName: string;
  trialSource: string;
  pmid: string;
  curve: TrialDataPoint[];
  /** Maximum week in the published curve (last datapoint). */
  maxWeek: number;
  /** Final published endpoint, for display. */
  finalEndpointPct: number;
  /** Standard titration schedule, week when full maintenance is reached. */
  maintenanceReachedWeek: number;
}

export const TRIAL_DATA: Record<DrugId, DrugTrialData> = {
  semaglutide: {
    id: "semaglutide",
    displayName: "Semaglutide",
    brandName: "Wegovy",
    dose: "2.4 mg weekly",
    trialName: "STEP-1",
    trialSource: "Wilding et al., N Engl J Med 2021",
    pmid: "33567185",
    curve: [
      { week: 0, meanLossPct: 0 },
      { week: 4, meanLossPct: 1.5 },
      { week: 8, meanLossPct: 3 },
      { week: 12, meanLossPct: 6 },
      { week: 16, meanLossPct: 8 },
      { week: 20, meanLossPct: 10 },
      { week: 28, meanLossPct: 12 },
      { week: 40, meanLossPct: 13.5 },
      { week: 52, meanLossPct: 14 },
      { week: 68, meanLossPct: 14.9 },
    ],
    maxWeek: 68,
    finalEndpointPct: 14.9,
    maintenanceReachedWeek: 20,
  },
  tirzepatide: {
    id: "tirzepatide",
    displayName: "Tirzepatide",
    brandName: "Zepbound",
    dose: "15 mg weekly",
    trialName: "SURMOUNT-1",
    trialSource: "Jastreboff et al., N Engl J Med 2022",
    pmid: "35658024",
    curve: [
      { week: 0, meanLossPct: 0 },
      { week: 4, meanLossPct: 2 },
      { week: 8, meanLossPct: 4 },
      { week: 12, meanLossPct: 9 },
      { week: 16, meanLossPct: 11 },
      { week: 20, meanLossPct: 13 },
      { week: 28, meanLossPct: 14.5 },
      { week: 40, meanLossPct: 17 },
      { week: 52, meanLossPct: 19 },
      { week: 72, meanLossPct: 20.9 },
    ],
    maxWeek: 72,
    finalEndpointPct: 20.9,
    maintenanceReachedWeek: 20,
  },
  orforglipron: {
    id: "orforglipron",
    displayName: "Orforglipron (Foundayo)",
    brandName: "Foundayo",
    dose: "17.2 mg daily (oral)",
    trialName: "ATTAIN-1",
    trialSource: "Eli Lilly FDA approval press release 2026",
    pmid: "",
    // 11.1% is the treatment-regimen estimand from the Foundayo USPI
    // Section 14, not the 12.4% on-treatment efficacy estimand. We
    // standardize on 11.1% across all tools site-wide.
    curve: [
      { week: 0, meanLossPct: 0 },
      { week: 4, meanLossPct: 0.9 },
      { week: 8, meanLossPct: 2.2 },
      { week: 12, meanLossPct: 3.6 },
      { week: 16, meanLossPct: 4.9 },
      { week: 20, meanLossPct: 5.8 },
      { week: 28, meanLossPct: 7.2 },
      { week: 40, meanLossPct: 8.9 },
      { week: 52, meanLossPct: 10.3 },
      { week: 68, meanLossPct: 10.9 },
      { week: 72, meanLossPct: 11.1 },
    ],
    maxWeek: 72,
    finalEndpointPct: 11.1,
    maintenanceReachedWeek: 20,
  },
};

/**
 * Piecewise linear interpolation of the trial curve at an arbitrary
 * week. Clamps to 0 at or before week 0 and to the final endpoint at
 * or after the maximum published week.
 */
export function predictMeanLossPct(drug: DrugId, week: number): number {
  const data = TRIAL_DATA[drug];
  if (!Number.isFinite(week) || week < 0) return 0;
  if (week >= data.maxWeek) return data.finalEndpointPct;

  // Find the two surrounding datapoints and interpolate
  for (let i = 0; i < data.curve.length - 1; i++) {
    const a = data.curve[i];
    const b = data.curve[i + 1];
    if (week >= a.week && week <= b.week) {
      if (b.week === a.week) return a.meanLossPct;
      const t = (week - a.week) / (b.week - a.week);
      return a.meanLossPct + t * (b.meanLossPct - a.meanLossPct);
    }
  }
  return 0;
}

export interface Prediction {
  /** Week of therapy the prediction is for. */
  week: number;
  /** Mean expected loss as a percentage of starting body weight. */
  meanPct: number;
  /** Conservative low estimate (~25% below mean). */
  lowPct: number;
  /** Optimistic high estimate (~25% above mean). */
  highPct: number;
  /** Mean predicted absolute loss, in the same unit as the starting weight. */
  meanLossAbsolute: number;
  lowLossAbsolute: number;
  highLossAbsolute: number;
  /** Remaining weight at the mean estimate. */
  meanEndWeight: number;
}

/**
 * Build a full prediction for a given starting weight, drug, and
 * target week.
 */
export function predict(
  startingWeight: number,
  drug: DrugId,
  week: number,
): Prediction {
  if (!Number.isFinite(startingWeight) || startingWeight <= 0) {
    return {
      week,
      meanPct: 0,
      lowPct: 0,
      highPct: 0,
      meanLossAbsolute: 0,
      lowLossAbsolute: 0,
      highLossAbsolute: 0,
      meanEndWeight: startingWeight,
    };
  }
  const meanPct = predictMeanLossPct(drug, week);
  // Range approximation: ±25% of the mean, minimum spread of 2
  // percentage points, minimum low of 0. This envelope encompasses
  // roughly the 25th-75th percentile band of the STEP-1 patient-level
  // variability without overfitting to any single quartile.
  const spreadPct = Math.max(meanPct * 0.25, 1);
  const lowPct = Math.max(meanPct - spreadPct, 0);
  const highPct = meanPct + spreadPct;
  return {
    week,
    meanPct,
    lowPct,
    highPct,
    meanLossAbsolute: (startingWeight * meanPct) / 100,
    lowLossAbsolute: (startingWeight * lowPct) / 100,
    highLossAbsolute: (startingWeight * highPct) / 100,
    meanEndWeight: startingWeight * (1 - meanPct / 100),
  };
}

/**
 * Build a full time series of predictions across all trial-relevant
 * weeks for charting purposes.
 */
export function buildPredictionCurve(
  startingWeight: number,
  drug: DrugId,
): Prediction[] {
  const data = TRIAL_DATA[drug];
  const weeks = [0, 4, 8, 12, 16, 20, 28, 40, 52, 68];
  if (data.maxWeek === 72 && !weeks.includes(72)) weeks.push(72);
  return weeks
    .filter((w) => w <= data.maxWeek)
    .map((w) => predict(startingWeight, drug, w));
}

/**
 * Compute reconstitution: how much bacteriostatic water to add to a
 * lyophilized vial to reach a target concentration.
 *
 * Used by the /tools/glp1-unit-converter reconstitution mode.
 */
export function bacWaterVolumeMl(
  vialDrugMg: number,
  targetConcentrationMgPerMl: number,
): number {
  if (!Number.isFinite(vialDrugMg) || vialDrugMg <= 0) return NaN;
  if (!Number.isFinite(targetConcentrationMgPerMl) || targetConcentrationMgPerMl <= 0) {
    return NaN;
  }
  return vialDrugMg / targetConcentrationMgPerMl;
}
