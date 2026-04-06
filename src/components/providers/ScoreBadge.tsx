import { computeOverallScore } from "@/lib/scoring";
import type { Scores } from "@/lib/types";

type BadgeSize = "sm" | "md" | "lg";

interface ScoreBadgeProps {
  scores: Scores;
  size?: BadgeSize;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: "w-10 h-10 text-sm",
  md: "w-14 h-14 text-xl",
  lg: "w-20 h-20 text-3xl",
};

export default function ScoreBadge({ scores, size = "md" }: ScoreBadgeProps) {
  const overall = computeOverallScore(scores);

  return (
    <div
      className={`rounded-full bg-brand-gradient text-white font-bold flex items-center justify-center flex-shrink-0 ${sizeClasses[size]}`}
    >
      {overall}
    </div>
  );
}
