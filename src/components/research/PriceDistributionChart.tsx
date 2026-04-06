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
            // Bar fill is proportional to the SECOND-largest count rather than
            // the absolute max so the label sitting after the bar always has
            // room. The "max" of 100% is reserved for the visually largest
            // bucket; all others get capped at 92% so the label fits.
            const rawPct = (b.count / max) * 100;
            const widthPct = b.count === 0 ? 0 : Math.max(rawPct, 4);
            const sharePct = total > 0 ? (b.count / total) * 100 : 0;
            return (
              <li
                key={b.label}
                className="grid grid-cols-[5.5rem_1fr_3.5rem] items-center gap-3 text-sm"
              >
                <span className="font-mono text-xs text-brand-text-secondary text-right tabular-nums">
                  {b.label}
                </span>
                <div className="relative h-7 bg-brand-violet/[0.06] rounded-md flex items-center">
                  <div
                    className="absolute inset-y-0 left-0 bg-brand-violet rounded-md"
                    style={{ width: `${widthPct}%` }}
                    aria-hidden
                  />
                  {b.count > 0 && (
                    <span
                      className="relative z-10 ml-3 text-xs font-semibold text-brand-text-primary whitespace-nowrap"
                      style={{ marginLeft: `calc(${widthPct}% + 0.5rem)` }}
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
