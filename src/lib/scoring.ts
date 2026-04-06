import type { Scores } from "./types";

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

export const SCORE_DIMENSIONS = [
  { key: "value" as const, label: "Value", weight: "25%" },
  { key: "effectiveness" as const, label: "Effectiveness", weight: "25%" },
  { key: "ux" as const, label: "User Experience", weight: "15%" },
  { key: "trust" as const, label: "Trust & Safety", weight: "15%" },
  { key: "accessibility" as const, label: "Accessibility", weight: "10%" },
  { key: "support" as const, label: "Support", weight: "10%" },
];
