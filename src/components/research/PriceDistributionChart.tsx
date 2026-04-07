import type { PriceBucket } from "@/lib/pricing-analytics";

interface PriceDistributionChartProps {
  buckets: PriceBucket[];
  /** Headline label shown above the bars (e.g. "Compounded Semaglutide"). */
  label: string;
  /** Optional subtitle (e.g. "Monthly cash price across 32 providers"). */
  subtitle?: string;
}

/**
 * Pure-SVG horizontal histogram. No charting library — keeps the bundle
 * small and gives precise control over the editorial styling. Bars use
 * the brand violet, with the count printed inside (or beside) each bar.
 *
 * Server component: takes pre-computed buckets so it stays static-friendly.
 */
export default function PriceDistributionChart({
  buckets,
  label,
  subtitle,
}: PriceDistributionChartProps) {
  const total = buckets.reduce((acc, b) => acc + b.count, 0);
  const max = Math.max(1, ...buckets.map((b) => b.count));

  return (
    <figure className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 not-prose">
      <figcaption className="mb-6">
        <h3 className="font-heading text-lg font-bold text-brand-text-primary">
          {label}
        </h3>
        {subtitle && (
          <p className="text-sm text-brand-text-secondary mt-1">{subtitle}</p>
        )}
      </figcaption>

      {total === 0 ? (
        <p className="text-sm text-brand-text-secondary italic">
          No pricing data available for this combination yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {buckets.map((b) => {
            // Bar fill: cap the largest bar at 75% of the track width so the
            // count label rendered after the bar always fits inside the same
            // grid column without overflowing into the percentage column.
            // For wide bars (>30% of track) we render the label INSIDE the
            // bar in white text, right-aligned, which keeps long labels like
            // "18 providers" comfortably within the track regardless of how
            // wide the bar gets.
            const MAX_BAR_PCT = 75;
            const rawPct = max > 0 ? (b.count / max) * MAX_BAR_PCT : 0;
            const widthPct = b.count === 0 ? 0 : Math.max(rawPct, 4);
            const labelInside = widthPct >= 30;
            const sharePct = total > 0 ? (b.count / total) * 100 : 0;
            return (
              <li
                key={b.label}
                className="grid grid-cols-[5.5rem_1fr_3.5rem] items-center gap-3 text-sm"
              >
                <span className="font-mono text-xs text-brand-text-secondary text-right tabular-nums">
                  {b.label}
                </span>
                <div className="relative h-7 bg-brand-violet/[0.06] rounded-md overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-brand-violet rounded-md flex items-center justify-end pr-3"
                    style={{ width: `${widthPct}%` }}
                    aria-hidden
                  >
                    {b.count > 0 && labelInside && (
                      <span className="text-xs font-semibold text-white whitespace-nowrap">
                        {b.count} provider{b.count === 1 ? "" : "s"}
                      </span>
                    )}
                  </div>
                  {b.count > 0 && !labelInside && (
                    <span
                      className="absolute inset-y-0 flex items-center text-xs font-semibold text-brand-text-primary whitespace-nowrap"
                      style={{ left: `calc(${widthPct}% + 0.5rem)` }}
                    >
                      {b.count} provider{b.count === 1 ? "" : "s"}
                    </span>
                  )}
                </div>
                <span className="text-xs text-brand-text-secondary tabular-nums text-right">
                  {sharePct.toFixed(0)}%
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </figure>
  );
}
