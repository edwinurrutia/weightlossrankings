/**
 * Supplement evidence grading library — backs the
 * /tools/supplement-evidence-grader tool.
 *
 * Single source of truth: src/data/supplement-evidence.json
 *
 * Every supplement entry has been verified against PubMed primary
 * sources by a research subagent on 2026-04-08. Items the subagent
 * could not confirm against a primary source (L-lysine, lemon balm
 * for weight loss specifically) are explicitly graded D and noted
 * as UNVERIFIED in the data file rather than fabricated.
 *
 * Anchors:
 *   PMID 32690176  Asbaghi 2020 berberine meta
 *   PMID 19597519  Hursel 2009 green tea catechin meta
 *   PMID 25636220  Mumme 2015 MCT vs LCT meta
 *   PMID 18842808  Sood 2008 glucomannan meta
 *   PMID 21787454  Pal 2011 psyllium
 *   PMID 17490954  Whigham 2007 CLA meta
 *   PMID 32170375  Launholt 2020 ACV systematic review
 *   PMID 24019277  Allen 2013 cinnamon meta
 *   PMID 23495911  Onakpoya 2013 chromium meta
 *   PMID 21197150  Onakpoya 2011 garcinia meta
 *   PMID 27055824  Choudhary 2017 ashwagandha
 *   PMID 23949208  Proksch 2014 collagen peptide
 *   PMID 32614129  Heshmati 2020 lemon balm meta (no weight)
 *   PMID 33567185  STEP-1 (semaglutide -14.9% anchor)
 *   PMID 35658024  SURMOUNT-1 (tirzepatide -20.9% anchor)
 */

import data from "@/data/supplement-evidence.json";

export type Grade = "A" | "B" | "C" | "D" | "D-for-weight";

export type SupplementCategory =
  | "Plant alkaloid"
  | "Plant polyphenol"
  | "Plant extract"
  | "Fatty acid"
  | "Soluble fiber"
  | "Mineral"
  | "Amino acid"
  | "Amino acid derivative"
  | "Adaptogen"
  | "Herb"
  | "Spice"
  | "Fermented food"
  | "Protein";

export interface SupplementStudy {
  pmid: string | null;
  authors: string;
  journal: string;
  year: number | null;
  design: string;
  n: string;
  duration: string;
  weightEffect: string;
}

export interface SupplementEntry {
  id: string;
  name: string;
  latinName: string;
  category: string;
  mechanism: string;
  primaryStudy: SupplementStudy;
  grade: Grade;
  magnitudeVsGlp1Pct: number;
  safetyConcerns: string;
  confidenceNote: string;
  costPerMonth: string;
  /** Optional cross-link to a research article on this site. */
  linkedArticleSlug?: string;
}

export const SUPPLEMENTS: SupplementEntry[] = (
  data as { supplements: SupplementEntry[] }
).supplements;

export const DATA_LAST_VERIFIED: string = (
  data as { lastVerified: string }
).lastVerified;

export const ALL_CATEGORIES: string[] = Array.from(
  new Set(SUPPLEMENTS.map((s) => s.category)),
).sort();

export function getSupplementById(id: string): SupplementEntry | undefined {
  return SUPPLEMENTS.find((s) => s.id === id);
}

export function gradeLabel(grade: Grade): string {
  switch (grade) {
    case "A":
      return "A — Strong RCT evidence";
    case "B":
      return "B — Moderate evidence";
    case "C":
      return "C — Weak / animal-only";
    case "D":
      return "D — No human weight evidence";
    case "D-for-weight":
      return "D for weight (oppositional)";
  }
}

/**
 * Sort order for grades (best to worst). Useful for default
 * display ordering in the tool's UI.
 */
export const GRADE_ORDER: Grade[] = ["A", "B", "C", "D-for-weight", "D"];

export function compareByGrade(a: SupplementEntry, b: SupplementEntry): number {
  const ai = GRADE_ORDER.indexOf(a.grade);
  const bi = GRADE_ORDER.indexOf(b.grade);
  if (ai !== bi) return ai - bi;
  return b.magnitudeVsGlp1Pct - a.magnitudeVsGlp1Pct;
}
