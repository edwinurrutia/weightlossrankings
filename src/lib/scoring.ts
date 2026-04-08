import type { Provider, Scores } from "./types";

export const WEIGHTS: Record<keyof Scores, number> = {
  value: 0.25,
  effectiveness: 0.25,
  ux: 0.15,
  trust: 0.15,
  accessibility: 0.1,
  support: 0.1,
};

export function computeOverallScore(scores: Scores): number {
  const raw =
    scores.value * WEIGHTS.value +
    scores.effectiveness * WEIGHTS.effectiveness +
    scores.ux * WEIGHTS.ux +
    scores.trust * WEIGHTS.trust +
    scores.accessibility * WEIGHTS.accessibility +
    scores.support * WEIGHTS.support;
  return Math.round(raw * 10) / 10;
}

export function getScoreColor(score: number): string {
  if (score >= 8) return "text-brand-success";
  if (score >= 6) return "text-brand-warning";
  return "text-red-500";
}

/**
 * Rank providers so that at the same overall editorial score, a higher-
 * verified provider always sorts above a lower-verified one. Keeps the
 * score visible (we don't modify the numeric score), just resolves ties
 * deterministically.
 *
 * Ordering key (higher is better):
 *   1. Editorial overall score
 *   2. Verification confidence: high (2) > medium (1) > low/none (0)
 *   3. Name (alphabetical, stable tiebreaker)
 */
function verificationRank(p: Provider): number {
  switch (p.verification?.confidence) {
    case "high":
      return 2;
    case "medium":
      return 1;
    default:
      return 0;
  }
}

export function sortProvidersByRank(providers: Provider[]): Provider[] {
  return [...providers].sort((a, b) => {
    const scoreA = computeOverallScore(a.scores);
    const scoreB = computeOverallScore(b.scores);
    if (scoreB !== scoreA) return scoreB - scoreA;
    const vb = verificationRank(b);
    const va = verificationRank(a);
    if (vb !== va) return vb - va;
    return a.name.localeCompare(b.name);
  });
}

export const SCORE_DIMENSIONS = [
  { key: "value" as const, label: "Value", weight: "25%" },
  { key: "effectiveness" as const, label: "Effectiveness", weight: "25%" },
  { key: "ux" as const, label: "User Experience", weight: "15%" },
  { key: "trust" as const, label: "Trust & Safety", weight: "15%" },
  { key: "accessibility" as const, label: "Accessibility", weight: "10%" },
  { key: "support" as const, label: "Support", weight: "10%" },
];
