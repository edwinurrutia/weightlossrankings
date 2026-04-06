import type { Provider } from "@/lib/types";
import { computeOverallScore } from "@/lib/scoring";
import CTAButton from "@/components/shared/CTAButton";

interface QuickPicksRow {
  provider: Provider;
  priceLabel: string;
}

interface QuickPicksTableProps {
  rows: QuickPicksRow[];
  trackingSource: string;
  priceHeading?: string;
  showBestFor?: boolean;
  title?: string;
}

/**
 * Numbered top-N picks table used on ranking pages. Renders rank, provider,
 * score, optional best-for column, a per-row price string, and a Visit CTA.
 */
export default function QuickPicksTable({
  rows,
  trackingSource,
  priceHeading = "From",
  showBestFor = true,
  title,
}: QuickPicksTableProps) {
  if (!rows || rows.length === 0) return null;

  return (
    <section aria-labelledby="quick-picks-heading">
      <h2
        id="quick-picks-heading"
        className="text-xl font-bold text-brand-text-primary mb-4"
      >
        {title ?? `Quick Picks: Top ${rows.length}`}
      </h2>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-violet/10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                <th className="py-3 px-4 text-left w-8">#</th>
                <th className="py-3 px-4 text-left">Provider</th>
                <th className="py-3 px-4 text-center">Score</th>
                {showBestFor && (
                  <th className="py-3 px-4 text-left hidden sm:table-cell">
                    Best For
                  </th>
                )}
                <th className="py-3 px-4 text-left hidden md:table-cell">
                  {priceHeading}
                </th>
                <th className="py-3 px-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map(({ provider, priceLabel }, index) => {
                const score = computeOverallScore(provider.scores);
                return (
                  <tr
                    key={provider._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-brand-text-secondary">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 font-semibold text-brand-text-primary">
                      {provider.name}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-base bg-brand-gradient bg-clip-text text-transparent">
                        {score.toFixed(1)}
                      </span>
                    </td>
                    {showBestFor && (
                      <td className="py-3 px-4 text-brand-text-secondary hidden sm:table-cell">
                        {provider.best_for ?? "—"}
                      </td>
                    )}
                    <td className="py-3 px-4 text-brand-text-secondary hidden md:table-cell">
                      {priceLabel}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <CTAButton
                        href={provider.affiliate_url}
                        external
                        size="sm"
                        trackProvider={provider.slug}
                        trackSource={trackingSource}
                      >
                        Visit
                      </CTAButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
