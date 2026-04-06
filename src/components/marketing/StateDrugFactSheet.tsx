import Link from "next/link";

interface FactItem {
  label: string;
  value: string;
  /** Optional 1-indexed citation reference (1-based, matches Sources list). */
  citation?: number;
}

interface SourceItem {
  /** Citation number — must match `citation` on FactItems above. */
  n: number;
  /** Display label, e.g. "CDC BRFSS 2023". */
  label: string;
  /** External URL or anchor — opens in a new tab. */
  url: string;
}

interface StateDrugFactSheetProps {
  /** Drug label, e.g. "Semaglutide". */
  drugLabel: string;
  /** Brand-name comparison drug, e.g. "Wegovy". */
  brandLabel: string;
  /** US state name, e.g. "Texas". */
  stateName: string;
  /** Number of providers shipping this drug to this state. */
  providerCount: number;
  /** Average compounded monthly price in this state. */
  avgPriceMonthly: number;
  /** Brand-name retail price for the comparison. */
  brandPriceMonthly: number;
  /** Adult obesity rate, percent (e.g. 34). */
  obesityRate?: number;
  /** State ranking for obesity, e.g. 16. */
  obesityRank?: number;
  /** Medicaid coverage state, e.g. "Diabetes only". */
  medicaidCoverage?: string;
  /** Top metro area for cross-link copy. */
  topCity?: string;
  /** Date the data was last verified — passed for the freshness stamp. */
  dataAsOf: string;
}

const formatUsd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

/**
 * Mobile-first intro for state × drug pages.
 *
 * Replaces the wall-of-paragraph that used to live at the top of these
 * pages with three pieces:
 *   1. A compact 4-tile fact grid (provider count, avg price, savings,
 *      obesity rate). Numbered citations link to the Sources block.
 *   2. A short two-sentence editorial intro — not a 7-sentence concat.
 *   3. A collapsible Sources block with real external links (CDC, KFF,
 *      manufacturer pages, our own pricing index).
 *
 * All numbers are passed in as props and computed at request time, so
 * the fact sheet stays in sync with providers.json and states-content.
 */
export default function StateDrugFactSheet({
  drugLabel,
  brandLabel,
  stateName,
  providerCount,
  avgPriceMonthly,
  brandPriceMonthly,
  obesityRate,
  obesityRank,
  medicaidCoverage,
  topCity,
  dataAsOf,
}: StateDrugFactSheetProps) {
  const monthlySavings = brandPriceMonthly - avgPriceMonthly;
  const annualSavings = monthlySavings * 12;
  const pctOff = Math.round((1 - avgPriceMonthly / brandPriceMonthly) * 100);

  // Citation indices reference the sources list at the bottom.
  // 1 = our dataset · 2 = CDC BRFSS · 3 = manufacturer list · 4 = KFF Medicaid tracker
  const facts: FactItem[] = [
    {
      label: `${drugLabel} providers`,
      value: providerCount.toString(),
      citation: 1,
    },
    {
      label: "Avg monthly cost",
      value: formatUsd(avgPriceMonthly),
      citation: 1,
    },
    {
      label: `Savings vs ${brandLabel}`,
      value: `${pctOff}%`,
      citation: 3,
    },
    {
      label: "State obesity rate",
      value: obesityRate ? `${obesityRate}%` : "—",
      citation: obesityRate ? 2 : undefined,
    },
  ];

  const sources: SourceItem[] = [
    {
      n: 1,
      label: `Weight Loss Rankings provider dataset (${providerCount} providers, verified ${dataAsOf})`,
      url: "/research/glp-1-pricing-index-2026",
    },
    {
      n: 2,
      label: "CDC Behavioral Risk Factor Surveillance System — adult obesity prevalence",
      url: "https://www.cdc.gov/obesity/data/prevalence-maps.html",
    },
    {
      n: 3,
      label: `${brandLabel} manufacturer cash price (Novo Nordisk / Eli Lilly published list)`,
      url:
        brandLabel === "Wegovy"
          ? "https://www.novocare.com/obesity/products/wegovy/savings-card.html"
          : "https://www.lilly.com/news/press-releases",
    },
    {
      n: 4,
      label: "Kaiser Family Foundation — state Medicaid coverage of obesity drugs",
      url: "https://www.kff.org/medicaid/issue-brief/medicaid-coverage-of-anti-obesity-drugs/",
    },
  ];

  return (
    <section className="not-prose">
      {/* Fact tiles — mobile: 2x2 grid, tablet+: 4-up row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {facts.map((f) => (
          <div
            key={f.label}
            className="rounded-xl border border-brand-violet/15 bg-white px-4 py-3.5 sm:px-5 sm:py-4"
          >
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary leading-tight">
              {f.label}
              {f.citation && (
                <a
                  href={`#sources`}
                  className="ml-1 text-brand-violet hover:underline align-super text-[9px]"
                  aria-label={`See source ${f.citation}`}
                >
                  [{f.citation}]
                </a>
              )}
            </p>
            <p className="mt-1.5 font-heading text-2xl sm:text-3xl font-black text-brand-text-primary leading-none tracking-tight">
              {f.value}
            </p>
          </div>
        ))}
      </div>

      {/* Short prose intro — replaces the 7-sentence wall */}
      <div className="mt-6 space-y-3 text-base text-brand-text-secondary leading-relaxed">
        <p>
          {providerCount} licensed telehealth providers ship compounded{" "}
          {drugLabel} to {stateName} addresses, with monthly prices averaging{" "}
          <strong className="text-brand-text-primary">
            {formatUsd(avgPriceMonthly)}
          </strong>
          {" "}— a roughly {pctOff}% discount to brand-name {brandLabel} at{" "}
          {formatUsd(brandPriceMonthly)}/month
          <a
            href="#sources"
            className="text-brand-violet hover:underline align-super text-[10px] ml-0.5"
          >
            [3]
          </a>
          .{" "}
          {obesityRate && obesityRank
            ? `${stateName}'s adult obesity rate of ${obesityRate}% (#${obesityRank} nationally)`
            : `Demand for medically-supervised weight loss in ${stateName}`}{" "}
          has driven the state into one of the country&apos;s most active
          cash-pay GLP-1 markets.
        </p>
        {medicaidCoverage && (
          <p>
            <strong className="text-brand-text-primary">
              {stateName} Medicaid coverage:
            </strong>{" "}
            {medicaidCoverage}
            <a
              href="#sources"
              className="text-brand-violet hover:underline align-super text-[10px] ml-0.5"
            >
              [4]
            </a>
            . At the median compounded price, switching from brand-name{" "}
            {brandLabel} would save roughly{" "}
            <strong className="text-brand-text-primary">
              {formatUsd(annualSavings)}/year
            </strong>{" "}
            out of pocket
            {topCity ? ` — and providers ship statewide from ${topCity} to smaller towns` : ""}
            .
          </p>
        )}
      </div>

      {/* Sources — collapsible, native <details> for zero-JS */}
      <details
        id="sources"
        className="mt-5 group rounded-xl border border-brand-violet/10 bg-brand-violet/[0.02] px-4 py-3"
      >
        <summary className="text-xs font-semibold text-brand-text-secondary cursor-pointer list-none flex items-center justify-between gap-2 select-none">
          <span>
            Sources &amp; methodology (data as of {dataAsOf})
          </span>
          <span
            aria-hidden
            className="text-brand-violet text-base group-open:rotate-180 transition-transform"
          >
            ⌄
          </span>
        </summary>
        <ol className="mt-3 flex flex-col gap-2 text-xs text-brand-text-secondary leading-relaxed">
          {sources.map((s) => (
            <li key={s.n} className="flex gap-2">
              <span className="font-mono font-bold text-brand-text-primary">
                {s.n}.
              </span>
              <span>
                {s.url.startsWith("/") ? (
                  <Link
                    href={s.url}
                    className="text-brand-violet hover:underline"
                  >
                    {s.label}
                  </Link>
                ) : (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-violet hover:underline break-all"
                  >
                    {s.label}
                  </a>
                )}
              </span>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
