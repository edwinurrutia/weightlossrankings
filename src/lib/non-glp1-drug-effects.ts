/**
 * Non-GLP-1 drug weight-effect lookup library — backs the
 * /tools/non-glp1-drug-weight-effect-lookup tool.
 *
 * Single source of truth: src/data/non-glp1-drug-weight-effects.json
 *
 * Every drug entry has been verified against PubMed primary sources
 * or FDA labels by a research subagent on 2026-04-08. Anchors:
 *   PMID 11832527  Knowler 2002 DPP (metformin)
 *   PMID 17145742  Kahn 2006 ADOPT (metformin/glyburide/rosiglitazone)
 *   PMID 12805393  Bray 2003 topiramate dose-ranging
 *   PMID 21481449  Gadde 2011 CONQUER (Qsymia)
 *   PMID 20673995  Greenway 2010 COR-I (Contrave)
 *   PMID 12105285  Anderson 2002 bupropion SR
 *   PMID 25587645  McElroy 2015 Vyvanse for BED
 *   PMID 34189841  AWARD-11 dulaglutide
 *   PMID 26378978  Zinman 2015 EMPA-REG OUTCOME
 *   PMID 30415602  Wiviott 2019 DECLARE-TIMI 58
 *   PMID 12117397  Rossouw 2002 WHI primary
 *   PMID 29793997  Gafoor 2018 BMJ antidepressants
 *   PMID 11105740  Fava 2000 SSRIs and weight
 *   PMID 15107858  Maina 2004 SSRIs and weight in OCD
 *   PMID 25687662  Mahableshwarkar 2015 vortioxetine
 *   PMID 33567185  STEP-1 anchor
 *   PMID 35658024  SURMOUNT-1 anchor
 */

import data from "@/data/non-glp1-drug-weight-effects.json";

export type WeightDirection = "loss" | "gain" | "neutral";

export interface DrugStudy {
  pmid: string | null;
  trial: string;
  authors: string;
  journal: string;
  year: number | null;
  n: number | null;
}

export interface DrugEntry {
  id: string;
  name: string;
  brandNames: string[];
  drugClass: string;
  fdaApprovedFor: string[];
  fdaApprovedForWeightLoss: boolean;
  weightDirection: WeightDirection;
  magnitudeKg: number | null;
  magnitudePctBodyWeight: number | null;
  magnitudeNote: string;
  primaryStudy: DrugStudy;
  vsGlp1Magnitude: string;
  mechanism: string;
  safetyNotes: string;
  interactionWithGlp1: string;
  linkedArticleSlug?: string;
  costPerMonth: string;
}

export const DRUGS: DrugEntry[] = (data as { drugs: DrugEntry[] }).drugs;

export const DATA_LAST_VERIFIED: string = (data as { lastVerified: string })
  .lastVerified;

export function getDrugById(id: string): DrugEntry | undefined {
  return DRUGS.find((d) => d.id === id);
}

export const ALL_DRUG_CLASSES: string[] = Array.from(
  new Set(DRUGS.map((d) => d.drugClass)),
).sort();

/**
 * Search drug entries by name, brand name, or class.
 */
export function searchDrugs(query: string): DrugEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return DRUGS;
  return DRUGS.filter((d) => {
    if (d.name.toLowerCase().includes(q)) return true;
    if (d.brandNames.some((b) => b.toLowerCase().includes(q))) return true;
    if (d.drugClass.toLowerCase().includes(q)) return true;
    return false;
  });
}

/**
 * Sort: weight-loss drugs first (largest magnitude first), then
 * weight-neutral, then weight-gain (largest magnitude last).
 */
export function compareByWeightDirection(
  a: DrugEntry,
  b: DrugEntry,
): number {
  const order: Record<WeightDirection, number> = {
    loss: 0,
    neutral: 1,
    gain: 2,
  };
  const ai = order[a.weightDirection];
  const bi = order[b.weightDirection];
  if (ai !== bi) return ai - bi;
  // Within direction, larger magnitude first for loss; larger magnitude
  // last for gain (because gain is "worse" the bigger it gets)
  const am = a.magnitudeKg ?? 0;
  const bm = b.magnitudeKg ?? 0;
  if (a.weightDirection === "loss") return am - bm; // most negative first
  if (a.weightDirection === "gain") return bm - am; // largest gain last
  return 0;
}
