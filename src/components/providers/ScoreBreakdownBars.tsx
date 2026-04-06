import { SCORE_DIMENSIONS } from "@/lib/scoring";
import type { Provider } from "@/lib/types";

interface ScoreBreakdownBarsProps {
  scores: Provider["scores"];
}

export default function ScoreBreakdownBars({ scores }: ScoreBreakdownBarsProps) {
  return (
    <div className="flex flex-col gap-3">
      {SCORE_DIMENSIONS.map(({ key, label }) => {
        const score = scores[key];
        const widthPercent = (score / 10) * 100;
        return (
          <div key={key} className="flex items-center gap-3">
            <span className="w-36 text-sm text-brand-text-secondary shrink-0">
              {label}
            </span>
            <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-gradient"
                style={{ width: `${widthPercent}%` }}
              />
            </div>
            <span className="w-8 text-sm font-semibold text-brand-text-primary text-right shrink-0">
              {score}
            </span>
          </div>
        );
      })}
    </div>
  );
}
