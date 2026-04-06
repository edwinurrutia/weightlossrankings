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
  if (score >= 8) return "green";
  if (score >= 6) return "amber";
  return "red";
}

export const SCORE_DIMENSIONS: { key: keyof Scores; label: string; weight: number }[] = [
  { key: "value", label: "Value", weight: WEIGHTS.value },
  { key: "effectiveness", label: "Effectiveness", weight: WEIGHTS.effectiveness },
  { key: "ux", label: "User Experience", weight: WEIGHTS.ux },
  { key: "trust", label: "Trust", weight: WEIGHTS.trust },
  { key: "accessibility", label: "Accessibility", weight: WEIGHTS.accessibility },
  { key: "support", label: "Support", weight: WEIGHTS.support },
];
