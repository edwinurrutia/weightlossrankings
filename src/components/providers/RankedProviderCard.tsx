import type { Provider } from "@/lib/types";
import { SCORE_DIMENSIONS } from "@/lib/scoring";
import ScoreBadge from "@/components/providers/ScoreBadge";
import CTAButton from "@/components/shared/CTAButton";

interface RankedProviderCardProps {
  provider: Provider;
  rank: number;
  priceLabel: string;
  priceValue: string;
  trackingSource: string;
  showProsCons?: boolean;
}

/**
 * Numbered "ranked review" card used on /best/[category] and
 * /best/[category]/[variant] pages. Renders the card header, score
 * breakdown grid, optional pros/cons grid, and CTA footer.
 */
export default function RankedProviderCard({
  provider,
  rank,
  priceLabel,
  priceValue,
  trackingSource,
  showProsCons = true,
}: RankedProviderCardProps) {
  const hasPros = provider.pros && provider.pros.length > 0;
  const hasCons = provider.cons && provider.cons.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gradient text-white font-extrabold text-lg flex items-center justify-center">
            {rank}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-brand-text-primary leading-tight">
              {provider.name}
            </h3>
            {provider.best_for && (
              <p className="text-sm text-brand-text-secondary mt-0.5">
                Best for: {provider.best_for}
              </p>
            )}
          </div>
          <ScoreBadge scores={provider.scores} size="lg" />
        </div>

        {provider.description && (
          <p className="mt-4 text-brand-text-secondary leading-relaxed text-sm">
            {provider.description}
          </p>
        )}
      </div>

      {/* Score dimensions grid */}
      <div className="p-6 border-b border-gray-100">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary mb-3">
          Score Breakdown
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SCORE_DIMENSIONS.map((dim) => {
            const dimScore =
              provider.scores[dim.key as keyof typeof provider.scores];
            return (
              <div
                key={dim.key}
                className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-brand-text-secondary font-medium">
                    {dim.label}
                  </span>
                  <span className="text-xs text-brand-text-secondary/60">
                    {dim.weight}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-gradient rounded-full"
                      style={{ width: `${(dimScore / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-brand-text-primary w-6 text-right">
                    {dimScore}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pros / Cons */}
      {showProsCons && (hasPros || hasCons) && (
        <div className="p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {hasPros && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-success mb-2">
                  Pros
                </h4>
                <ul className="space-y-1.5">
                  {provider.pros!.map((pro, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-brand-text-secondary"
                    >
                      <span className="text-brand-success mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hasCons && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                  Cons
                </h4>
                <ul className="space-y-1.5">
                  {provider.cons!.map((con, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-brand-text-secondary"
                    >
                      <span className="text-red-400 mt-0.5 flex-shrink-0">
                        ✗
                      </span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA footer */}
      <div className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="text-sm text-brand-text-secondary">
          {priceLabel}{" "}
          <span className="font-semibold text-brand-text-primary">
            {priceValue}
          </span>
        </div>
        <CTAButton
          href={provider.affiliate_url}
          external
          size="md"
          trackProvider={provider.slug}
          trackSource={trackingSource}
          trackPosition={rank}
        >
          Visit {provider.name} →
        </CTAButton>
      </div>
    </div>
  );
}
