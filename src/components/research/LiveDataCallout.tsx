import Link from "next/link";
import {
  getCheapestProviders,
  getPricingStats,
  getLatestVerificationDate,
  type DrugForm,
} from "@/lib/pricing-analytics";
import type { DrugType } from "@/lib/types";

interface LiveDataCalloutProps {
  /** Drug to summarize. */
  drug: DrugType;
  /** Compounded vs brand. */
  form: DrugForm;
  /** Custom label override. Defaults to "Live data: <drug> <form>". */
  label?: string;
  /** Number of provider names to surface. Default 3. */
  topN?: number;
}

const formatUsd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Live data sidebar used inside long-form research articles.
 *
 * Reads providers.json at request time and renders the cheapest N
 * providers for a (drug, form) combo plus a freshness stamp. The
 * surrounding article prose stays static — only the numbers in this
 * box update when the dataset changes. So the editorial doesn't go
 * stale even when prices shift or providers come and go.
 */
export default function LiveDataCallout({
  drug,
  form,
  label,
  topN = 3,
}: LiveDataCalloutProps) {
  const cheapest = getCheapestProviders(drug, form, topN);
  const stats = getPricingStats(drug, form);
  const verifiedDate = getLatestVerificationDate();
  const heading = label ?? `Live: cheapest ${form} ${drug}`;

  if (cheapest.length === 0) {
    return null;
  }

  return (
    <aside className="not-prose my-8 rounded-2xl border border-brand-violet/20 bg-brand-violet/[0.04] p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-brand-violet">
          {heading}
        </p>
        <p className="text-[10px] text-brand-text-secondary">
          Updated {verifiedDate}
        </p>
      </div>

      <ol className="flex flex-col gap-2.5 mb-4">
        {cheapest.map((c, i) => (
          <li
            key={c.slug}
            className="flex items-baseline justify-between gap-3"
          >
            <Link
              href={`/reviews/${c.slug}`}
              className="text-sm font-semibold text-brand-text-primary hover:text-brand-violet truncate"
            >
              <span className="font-mono text-brand-text-secondary mr-2">
                {i + 1}.
              </span>
              {c.name}
            </Link>
            <span className="font-heading text-base font-bold text-brand-violet whitespace-nowrap">
              {formatUsd(c.monthly)}
              <span className="text-xs font-normal text-brand-text-secondary ml-0.5">
                /mo
              </span>
            </span>
          </li>
        ))}
      </ol>

      {stats.count > 0 && (
        <p className="text-xs text-brand-text-secondary leading-relaxed">
          Across {stats.count} providers offering {form} {drug}, the median
          monthly price is{" "}
          <strong className="text-brand-text-primary">
            {formatUsd(stats.median)}
          </strong>
          . The cheapest decile is at or below{" "}
          <strong className="text-brand-text-primary">
            {formatUsd(stats.p10)}
          </strong>
          .
        </p>
      )}

      <Link
        href={`/best/${form === "compounded" ? "compounded-" : ""}${drug}-providers`}
        className="mt-4 inline-flex items-center text-xs font-semibold text-brand-violet hover:underline"
      >
        See all {titleCase(form)} {titleCase(drug)} providers →
      </Link>
    </aside>
  );
}
