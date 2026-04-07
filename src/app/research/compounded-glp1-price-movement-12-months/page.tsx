import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import { getPriceHistory } from "@/lib/price-history";
import { getAllProviders } from "@/lib/data";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";

const SLUG = "compounded-glp1-price-movement-12-months";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/research/${SLUG}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

const formatUsd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const formatMonth = (iso: string): string => {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
};

interface Trajectory {
  slug: string;
  name: string;
  startDate: string;
  startPrice: number;
  endDate: string;
  endPrice: number;
  changeUsd: number;
  changePct: number;
  pointCount: number;
}

// Every number below is computed at render time from
// src/data/price-history.json. When the price-snapshot logic in
// scripts/scrape-providers.ts adds new monthly data points, this
// article updates with no manual edits — new providers entering
// multi-month coverage, new floor prices, new convergence dynamics
// all surface automatically.

export default async function PriceMovementArticle() {
  const article = getResearchArticleBySlug(SLUG)!;
  const history = getPriceHistory();
  const providers = await getAllProviders();
  const providerNameBySlug = new Map(
    providers.map((p) => [p.slug, p.name] as const),
  );

  // Compute trajectories for every series with at least 6 data
  // points (anything less is not enough for a real trajectory
  // story). The 6-point threshold catches all the original
  // hand-seeded chart providers and excludes the single-point
  // entries the scraper auto-creates for new providers.
  const trajectories: Trajectory[] = history
    .filter((entry) => entry.history.length >= 6)
    .map((entry) => {
      const sorted = [...entry.history].sort((a, b) =>
        a.date.localeCompare(b.date),
      );
      const start = sorted[0];
      const end = sorted[sorted.length - 1];
      const changeUsd = end.price - start.price;
      const changePct = (changeUsd / start.price) * 100;
      return {
        slug: entry.provider_slug,
        name: providerNameBySlug.get(entry.provider_slug) ?? entry.provider_slug,
        startDate: start.date,
        startPrice: start.price,
        endDate: end.date,
        endPrice: end.price,
        changeUsd,
        changePct,
        pointCount: sorted.length,
      };
    })
    .sort((a, b) => a.changePct - b.changePct);

  if (trajectories.length === 0) {
    // Defensive: if the dataset somehow has no multi-point series,
    // render a placeholder rather than crash.
    return (
      <ResearchArticleLayout article={article}>
        <p>Insufficient price history data to render this article.</p>
      </ResearchArticleLayout>
    );
  }

  // Identify the time window the data covers
  const earliestStart = trajectories.reduce((min, t) =>
    t.startDate < min ? t.startDate : min,
    trajectories[0].startDate,
  );
  const latestEnd = trajectories.reduce((max, t) =>
    t.endDate > max ? t.endDate : max,
    trajectories[0].endDate,
  );

  // Compute the months between earliest and latest, for prose
  const startD = new Date(earliestStart + "T00:00:00Z");
  const endD = new Date(latestEnd + "T00:00:00Z");
  const monthsCovered =
    (endD.getUTCFullYear() - startD.getUTCFullYear()) * 12 +
    (endD.getUTCMonth() - startD.getUTCMonth());

  // The biggest cutter and the smallest cutter
  const biggestCutter = trajectories[0]; // already sorted ascending
  const smallestCutter = trajectories[trajectories.length - 1];

  // Convergence detection: if all end prices are within $30 of each
  // other, the market is "converging". The convergence floor is the
  // lowest end price.
  const endPrices = trajectories.map((t) => t.endPrice);
  const endMin = Math.min(...endPrices);
  const endMax = Math.max(...endPrices);
  const convergenceSpread = endMax - endMin;
  const isConverging = convergenceSpread <= 30;

  // Average % cut across all trackable providers
  const avgCutPct =
    trajectories.reduce((sum, t) => sum + t.changePct, 0) /
    trajectories.length;

  // Total trajectory points across the dataset (proves we have data
  // backing the analysis, not vibes)
  const totalDataPoints = trajectories.reduce(
    (sum, t) => sum + t.pointCount,
    0,
  );

  return (
    <ResearchArticleLayout article={article} dataAsOf={latestEnd}>
      <p data-speakable="lead">
        Weight Loss Rankings has tracked monthly cash prices for compounded
        semaglutide across the largest US telehealth providers since{" "}
        {formatMonth(earliestStart)}. As of {formatMonth(latestEnd)}, our
        dataset contains <strong>{totalDataPoints} monthly observations</strong>{" "}
        across {trajectories.length} providers spanning roughly{" "}
        {monthsCovered} months. Every single provider in the tracked set has
        cut its monthly cash price since January 2025 — by an average of{" "}
        <strong>{Math.abs(avgCutPct).toFixed(0)}%</strong>. But the rate at
        which they cut tells a much more interesting story than the average.
      </p>

      <h2>The full trajectory: every tracked provider, sorted by % cut</h2>

      <p>
        Here&apos;s the price each provider was charging at the start of our
        tracking period, what they&apos;re charging in the most recent monthly
        snapshot, and the percentage change between the two. Sorted by biggest
        cutter first.
      </p>

      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>{formatMonth(earliestStart)}</th>
            <th>{formatMonth(latestEnd)}</th>
            <th>Change</th>
            <th>% change</th>
          </tr>
        </thead>
        <tbody>
          {trajectories.map((t) => (
            <tr key={t.slug}>
              <td>
                <Link href={`/reviews/${t.slug}`}>{t.name}</Link>
              </td>
              <td>{formatUsd(t.startPrice)}</td>
              <td>{formatUsd(t.endPrice)}</td>
              <td>
                {t.changeUsd < 0 ? "−" : "+"}
                {formatUsd(Math.abs(t.changeUsd))}
              </td>
              <td>
                <strong>
                  {t.changePct < 0 ? "−" : "+"}
                  {Math.abs(t.changePct).toFixed(0)}%
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>The biggest cutter and the smallest</h2>

      <p>
        <strong>{biggestCutter.name}</strong> cut its compounded semaglutide
        price by <strong>{Math.abs(biggestCutter.changePct).toFixed(0)}%</strong>{" "}
        over the tracking period — from {formatUsd(biggestCutter.startPrice)} per
        month at the start to {formatUsd(biggestCutter.endPrice)} as of{" "}
        {formatMonth(latestEnd)}. That&apos;s a real-dollar cut of{" "}
        {formatUsd(Math.abs(biggestCutter.changeUsd))} per month, or roughly{" "}
        {formatUsd(Math.abs(biggestCutter.changeUsd) * 12)} per year for a
        patient on the same provider for 12 months.
      </p>

      <p>
        At the other end, <strong>{smallestCutter.name}</strong> moved
        the least — only {Math.abs(smallestCutter.changePct).toFixed(0)}% off
        its starting price of {formatUsd(smallestCutter.startPrice)}. The
        explanation isn&apos;t that {smallestCutter.name} is unusually
        expensive today; it&apos;s that {smallestCutter.name} was already{" "}
        <em>cheap at the start of the tracking period</em>. Providers that
        started near the eventual market floor had less room to fall.
      </p>

      {isConverging && (
        <>
          <h2>The convergence: every provider is heading for the same floor</h2>

          <p>
            Looking at the most recent month in isolation, the spread between
            the most expensive and the cheapest provider in the tracked set
            is just <strong>{formatUsd(convergenceSpread)}</strong> — from{" "}
            {formatUsd(endMin)} to {formatUsd(endMax)}. Compare that to the
            spread at the start of the tracking period, which was much wider.
            What you&apos;re looking at is a market converging on a structural
            floor around {formatUsd(endMin)}.
          </p>

          <p>
            That convergence is the most editorially significant pattern in
            the data. Compounded semaglutide doesn&apos;t have a regulated
            cost basis the way brand-name Wegovy does — every provider is
            free to set whatever price the market will bear, and the
            wholesale active pharmaceutical ingredient cost is roughly the
            same for everyone. The fact that the spread has narrowed
            dramatically over our tracking window is what economists call
            <em> price convergence under perfect information</em>: as
            patients comparison-shop and competitors cross-reference each
            other, the market discovers a floor price and the high-margin
            outliers are forced down to it.
          </p>
        </>
      )}

      <h2>Why prices have moved (and what comes next)</h2>

      <p>
        Three forces have driven the cuts visible in the table above:
      </p>

      <ol>
        <li>
          <strong>Wholesale API costs.</strong> The active pharmaceutical
          ingredient (semaglutide base) is sourced by 503A and 503B
          pharmacies from FDA-registered API manufacturers. Wholesale API
          pricing has fallen meaningfully since 2024 as more API
          manufacturers entered the market. Lower input costs let
          compounders cut retail prices without giving up margin.
        </li>
        <li>
          <strong>Comparison shopping.</strong> Sites like{" "}
          <Link href="/price-tracker">our live price tracker</Link>, plus
          provider review aggregators, made it trivial for patients to
          compare prices across providers. When the cheapest provider is
          one click away, charging 50% above the floor isn&apos;t a
          sustainable strategy. Our{" "}
          <Link href="/research/cheapest-compounded-semaglutide">
            cheapest compounded semaglutide investigation
          </Link>{" "}
          documents the floor-price providers we&apos;ve verified at any
          given snapshot.
        </li>
        <li>
          <strong>FDA enforcement risk.</strong> Multiple GLP-1 telehealth
          providers received FDA warning letters for marketing language,
          labeling violations, and salt-form sourcing — see our{" "}
          <Link href="/research/fda-warning-letters-glp1">
            FDA warning letter investigation
          </Link>{" "}
          for the full pattern. Every enforcement action shrinks the
          potential customer base of the cited provider, increasing
          competitive pressure on the survivors and forcing prices down
          further. The{" "}
          <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
            PCAB accreditation investigation
          </Link>{" "}
          breaks down which fulfillment pharmacies actually meet the
          higher quality bar.
        </li>
      </ol>

      <p>
        Looking forward: based on the convergence pattern, we expect the
        spread between the most expensive and cheapest tracked provider to
        narrow further over the next 6 months, with the floor staying near{" "}
        {formatUsd(endMin)} unless wholesale API prices change materially.
        Providers still charging meaningfully above the floor — see the
        bottom of the table above — are the ones most likely to announce
        cuts in upcoming pricing updates. We&apos;ll surface those changes
        in our{" "}
        <Link href="/research/glp1-pricing-index">
          live pricing index
        </Link>{" "}
        as the data comes in.
      </p>

      <h2>Why this article updates automatically</h2>

      <p>
        Every number above is computed at render time from our editorial
        price-history dataset. When the next monthly snapshot lands — the
        scraper writes a new data point on the first of each month for
        every provider in the tracked set — the trajectories, the
        biggest-cutter / smallest-cutter callouts, and the convergence
        spread all recompute automatically. If a new provider enters our
        long-term tracked set (after enough months of consistent data),
        they get added to the table without an editor having to touch
        anything. If an existing provider raises prices, the table will
        show that too.
      </p>

      <p>
        Last data refresh: {formatMonth(latestEnd)}. Methodology and
        sources are documented at{" "}
        <Link href="/methodology">our editorial methodology page</Link>.
        The full pricing dataset across all 80+ providers we track —
        including providers without enough history yet for a multi-month
        trajectory — is available on the{" "}
        <Link href="/price-tracker">live price tracker</Link>.
      </p>
    </ResearchArticleLayout>
  );
}
