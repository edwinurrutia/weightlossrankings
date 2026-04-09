import Link from "next/link";
import type { Provider } from "@/lib/types";
import { computeOverallScore } from "@/lib/scoring";
import TrackedAffiliateLink from "@/components/shared/TrackedAffiliateLink";

interface HomeHeroProvidersProps {
  /** Featured providers, already sorted with #1 first. */
  providers: Provider[];
  trackingSource: string;
  /**
   * Total number of providers in the dataset (NOT just the featured
   * slice). Drives the "See all N+ providers" CTA. Falls back to
   * `providers.length` if not supplied, but should always be passed
   * from the page that knows the real count.
   */
  totalProviderCount?: number;
}

const formatUsd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

function getCheapestMonthly(p: Provider): number | null {
  if (!p.pricing || p.pricing.length === 0) return null;
  const prices = p.pricing.map((pr) => pr.promo_price ?? pr.monthly_cost);
  return Math.min(...prices);
}

/**
 * Phrases that are table-stakes for any legitimate telehealth Rx in this
 * category — listing them as a "differentiator" looks naive and undermines
 * the editorial voice. Filtered out of pull quotes and feature chips so
 * the hero only highlights things that actually distinguish a provider.
 */
const COMMODITY_PATTERNS = [
  /legitscript/i,
  /\bbbb\b/i,
  /\bhipaa\b/i,
  /accredited/i,
  /board[\s-]?certified/i,
  /licensed pharmac/i,
  /licensed (provider|physician)s?/i,
  /\bus[\s-]based\b/i,
];

const isCommodity = (s: string) =>
  COMMODITY_PATTERNS.some((re) => re.test(s));

/**
 * Pick the first pro that actually differentiates the provider — skipping
 * table-stakes claims like "LegitScript certified" that every legit
 * pharmacy carries.
 */
function pickPullQuote(p: Provider): string | null {
  const pros = p.pros ?? [];
  return pros.find((pro) => !isCommodity(pro)) ?? pros[0] ?? null;
}

/**
 * Hero "Top Rated" section: the #1 provider gets a large editorial card
 * with an Editor's Pick treatment, the next two render as a stacked
 * runner-up column to its right. Visually establishes a clear ranking
 * hierarchy instead of three identical tiles.
 */
export default function HomeHeroProviders({
  providers,
  trackingSource,
  totalProviderCount,
}: HomeHeroProvidersProps) {
  if (!providers || providers.length === 0) return null;

  // "See all N+ providers" — show the rounded-down dataset total
  // (matching the headline elsewhere on the page) so the CTA reflects
  // the real catalog size, not the size of this hero slice.
  const seeAllCount = (() => {
    const total = totalProviderCount ?? providers.length;
    return Math.max(5, Math.floor(total / 5) * 5);
  })();

  const [pick, ...rest] = providers;
  const runnersUp = rest.slice(0, 2);

  const pickScore = computeOverallScore(pick.scores);
  const pickPrice = getCheapestMonthly(pick);
  const pullQuote = pickPullQuote(pick);
  // Derive structured hero chips from pricing rather than the free-text
  // features array, matching the ProviderCard taxonomy so the home hero
  // and state/compare cards look uniform.
  const pickDrugs = Array.from(
    new Set(
      (pick.pricing ?? [])
        .map((p) => p.drug)
        .filter(Boolean)
        .map((d) => d!.charAt(0).toUpperCase() + d!.slice(1))
    )
  );
  const pickForms = new Set(
    (pick.pricing ?? [])
      .map((p) => p.form)
      .filter(Boolean)
      .map((f) => f!.charAt(0).toUpperCase() + f!.slice(1))
  );
  const pickForm = pickForms.has("Compounded")
    ? "Compounded"
    : pickForms.has("Brand")
      ? "Brand"
      : null;
  const pickFeatures = [pickForm, ...pickDrugs].filter(
    (x): x is string => x !== null
  );

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-2">
            Top Rated
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary tracking-tight">
            Our picks for {new Date().getFullYear()}
          </h2>
        </div>
        <Link
          href="/compare"
          className="text-sm font-semibold text-brand-violet hover:underline"
        >
          See all {seeAllCount}+ providers →
        </Link>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Editor's Pick — large hero card spans 3/5 cols on desktop */}
        <article className="lg:col-span-3 relative rounded-3xl bg-white border-2 border-brand-violet/20 shadow-xl overflow-hidden">
          {/* Editor's Pick ribbon */}
          <div className="absolute top-0 right-0 bg-brand-violet text-white text-xs font-bold uppercase tracking-[0.12em] px-4 py-2 rounded-bl-2xl">
            Editor&apos;s Pick
          </div>

          <div className="p-7 sm:p-9">
            {/* Score + name */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-heading text-5xl font-black text-brand-violet leading-none">
                {pickScore.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-brand-text-secondary">
                / 10
              </span>
            </div>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary tracking-tight mt-3">
              <Link
                href={`/reviews/${pick.slug}`}
                className="hover:text-brand-violet transition-colors"
              >
                {pick.name}
              </Link>
            </h3>
            {pick.best_for && (
              <p className="mt-2 text-sm text-brand-text-secondary">
                Best for{" "}
                <span className="font-semibold text-brand-text-primary">
                  {pick.best_for}
                </span>
              </p>
            )}

            {/* Pull quote — first non-commodity pro (skips LegitScript etc.) */}
            {pullQuote && (
              <blockquote className="mt-6 border-l-2 border-brand-violet/40 pl-4 text-base text-brand-text-primary leading-relaxed italic">
                &ldquo;{pullQuote}&rdquo;
              </blockquote>
            )}

            {/* Price + reviews row */}
            <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              {pickPrice !== null && (
                <div>
                  <span className="font-heading text-3xl font-bold text-brand-text-primary">
                    {formatUsd(pickPrice)}
                  </span>
                  <span className="text-sm text-brand-text-secondary ml-1">
                    /month
                  </span>
                </div>
              )}
              <div className="text-sm text-brand-text-secondary">
                <span className="text-brand-violet">★</span>{" "}
                <span className="font-semibold text-brand-text-primary">
                  {(pickScore / 2).toFixed(1)}
                </span>{" "}
                <span>
                  /5 ·{" "}
                  <a href="/methodology" className="underline hover:text-brand-violet">
                    editorial score
                  </a>
                </span>
              </div>
            </div>

            {/* Feature chips */}
            {pickFeatures.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {pickFeatures.map((f) => (
                  <li
                    key={f}
                    className="text-xs font-semibold text-brand-violet bg-brand-violet/8 border border-brand-violet/15 rounded-full px-3 py-1.5"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div className="mt-8">
              <TrackedAffiliateLink
                href={pick.affiliate_url}
                provider={pick.slug}
                source={trackingSource}
                position={1}
                className="inline-flex items-center justify-center bg-brand-violet hover:bg-brand-violet/90 text-white font-bold text-base px-6 py-3.5 rounded-full transition-colors w-full sm:w-auto"
              >
                Get Started with {pick.name}
              </TrackedAffiliateLink>
              <div className="mt-3">
                <Link
                  href={`/reviews/${pick.slug}`}
                  className="text-sm text-brand-text-secondary hover:text-brand-violet transition-colors font-medium"
                >
                  Read our full {pick.name} review →
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Runners-up column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {runnersUp.map((p, idx) => {
            const score = computeOverallScore(p.scores);
            const price = getCheapestMonthly(p);
            return (
              <article
                key={p._id}
                className="relative rounded-3xl bg-white border border-brand-violet/15 shadow-md p-6 flex flex-col"
              >
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-brand-text-secondary mb-2">
                  #{idx + 2} {idx === 0 ? "Runner-up" : "Also great"}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-3xl font-bold text-brand-violet leading-none">
                    {score.toFixed(1)}
                  </span>
                  <span className="text-xs font-semibold text-brand-text-secondary">
                    / 10
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-text-primary mt-1.5">
                  <Link
                    href={`/reviews/${p.slug}`}
                    className="hover:text-brand-violet transition-colors"
                  >
                    {p.name}
                  </Link>
                </h3>
                {p.best_for && (
                  <p className="text-xs text-brand-text-secondary mt-1">
                    Best for {p.best_for}
                  </p>
                )}
                {price !== null && (
                  <div className="mt-3">
                    <span className="font-heading text-xl font-bold text-brand-text-primary">
                      {formatUsd(price)}
                    </span>
                    <span className="text-xs text-brand-text-secondary ml-1">
                      /mo
                    </span>
                  </div>
                )}
                <div className="mt-auto pt-5">
                  <TrackedAffiliateLink
                    href={p.affiliate_url}
                    provider={p.slug}
                    source={trackingSource}
                    position={idx + 2}
                    className="w-full inline-flex items-center justify-center bg-brand-violet/10 hover:bg-brand-violet hover:text-white text-brand-violet font-semibold text-sm px-4 py-2.5 rounded-full transition-colors"
                  >
                    Get started
                  </TrackedAffiliateLink>
                  <div className="mt-2 text-center">
                    <Link
                      href={`/reviews/${p.slug}`}
                      className="text-[11px] text-brand-text-secondary hover:text-brand-violet transition-colors"
                    >
                      Read review →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
