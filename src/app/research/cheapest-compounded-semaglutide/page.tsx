import type { Metadata } from "next";
import Link from "next/link";
import {
  getCheapestProviders,
  getPricingStats,
  getLatestVerificationDate,
  countProvidersOffering,
} from "@/lib/pricing-analytics";
import { getResearchArticleBySlug } from "@/lib/research";
import { getAllProviders } from "@/lib/data";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "cheapest-compounded-semaglutide";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: { canonical: `/research/${SLUG}` },
    openGraph: {
      title: { absolute: article.title },
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

// Every number in this article is computed at render time from
// src/data/providers.json + price-history.json. When the price
// scraper updates pricing, when new providers are added, or when
// the floor price changes, the article updates automatically.

export default async function CheapestCompoundedSemaglutideArticle() {
  const article = getResearchArticleBySlug(SLUG)!;
  const stats = getPricingStats("semaglutide", "compounded");
  const cheapest = getCheapestProviders("semaglutide", "compounded", 10);
  const totalProviders = countProvidersOffering("semaglutide", "compounded");
  const verifiedDate = getLatestVerificationDate();
  const allProviders = await getAllProviders();

  // Identify the floor price and every provider tied at it
  const floorPrice = cheapest[0]?.monthly ?? 99;
  const floorProviders = cheapest.filter((p) => p.monthly === floorPrice);
  const nearFloorProviders = cheapest.filter(
    (p) => p.monthly > floorPrice && p.monthly <= floorPrice + 10,
  );

  // For each floor provider, pull the full Provider record so we can
  // surface license, states, fulfillment pharmacy, and editorial score
  const floorProviderDetails = floorProviders.map((cp) => {
    const full = allProviders.find((p) => p.slug === cp.slug);
    return { ...cp, full };
  });

  // Floor price as % of median (used to dramatize how cheap it is)
  const floorVsMedian = ((floorPrice / stats.median) * 100).toFixed(0);

  const citations = [
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "FDA Declaratory Order: Resolution of the Semaglutide Injection Shortage (Feb 21, 2025).",
      source: "FDA Drug Shortages Database",
      year: 2025,
      url: "https://www.accessdata.fda.gov/scripts/drugshortages/dsp_ActiveIngredientDetails.cfm?AI=Semaglutide+Injection&st=r",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Medications Containing Semaglutide Marketed for Type 2 Diabetes or Weight Loss — consumer safety alert on salt forms (semaglutide sodium, semaglutide acetate).",
      source: "FDA.gov",
      year: 2024,
      url: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/medications-containing-semaglutide-marketed-type-2-diabetes-or-weight-loss",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Compounding and the FDA: Questions and Answers — 503A compounding pharmacy guidance.",
      source: "FDA.gov",
      year: 2024,
      url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
    },
  ];

  return (
    <ResearchArticleLayout article={article} dataAsOf={verifiedDate}>
      <p data-speakable="lead">
        The cheapest compounded semaglutide on the cash-pay telehealth market
        as of {verifiedDate} sits at <strong>{formatUsd(floorPrice)} per
        month</strong>, advertised by {floorProviders.length === 1 ? "one provider" : `${floorProviders.length} providers`} we
        track. That&apos;s only {floorVsMedian}% of the market median of{" "}
        {formatUsd(stats.median)}, and a small fraction of brand-name Wegovy
        cash-pay pricing. We verified each floor-price provider against our
        pricing index and pharmacy database to answer one question: is the
        floor price legitimate, or are there hidden gotchas?
      </p>

      <div className="my-8 rounded-lg border-l-4 border-brand-violet bg-brand-violet/5 px-6 py-5 not-prose">
        <p className="font-heading text-base font-bold text-brand-text-primary mb-3">
          Read this first: the regulatory landscape changed in 2025
        </p>
        <p className="text-sm text-brand-text-secondary leading-relaxed mb-3">
          The compounded semaglutide market in April 2026 is a very
          different animal from the 2023-2024 shortage-era market
          most older articles describe. Before you shop on price,
          you need to understand four things:
        </p>
        <ol className="text-sm text-brand-text-secondary leading-relaxed list-decimal pl-5 space-y-2">
          <li>
            <strong>The FDA declared the semaglutide shortage resolved
            on February 21, 2025.</strong> Semaglutide is no longer on
            the FDA Drug Shortages list. The Declaratory Order ended
            the regulatory discretion that let 503B outsourcing
            facilities mass-compound semaglutide during the shortage
            window.
          </li>
          <li>
            <strong>503A compounding for individual patients is the
            only remaining legal pathway.</strong> A state-licensed
            503A pharmacy can still compound semaglutide for a
            specific patient when a prescriber documents a
            patient-specific clinical need (e.g., an allergy to an
            excipient, a dose not commercially available). This is
            not the same as the bulk-compounding that dominated the
            market in 2024. Any provider still operating as though
            nothing changed is worth an extra round of diligence.
          </li>
          <li>
            <strong>Be extremely wary of &ldquo;semaglutide sodium&rdquo;
            or &ldquo;semaglutide acetate.&rdquo;</strong> FDA has
            issued repeated warnings that these salt forms are{" "}
            <em>not</em> the same API as FDA-approved semaglutide
            and have not been evaluated for safety or efficacy. Ask
            any prospective pharmacy to confirm in writing that
            they compound with base semaglutide, not a salt form.
          </li>
          <li>
            <strong>The market is contracting.</strong> Many of the
            large 503B outsourcing facilities that supplied
            telehealth platforms during the shortage have exited
            compounded semaglutide entirely. Pricing data on this
            page reflects the providers still actively offering it
            — that universe is smaller than it was a year ago, and
            availability may change without notice. Verify
            availability and legal status directly with any
            provider before signing up.
          </li>
        </ol>
        <p className="text-xs text-brand-text-secondary leading-relaxed mt-4">
          Sources: FDA Declaratory Order resolving the semaglutide
          shortage (Feb 21, 2025); FDA consumer alert on salt-form
          semaglutide; FDA 503A compounding guidance. Full citations
          in the References section below.
        </p>
      </div>

      <h2>The market context: where {formatUsd(floorPrice)} sits in the distribution</h2>

      <p>
        Across the {totalProviders} telehealth providers we track that offer
        compounded semaglutide, the price distribution looks like this:
      </p>

      <table>
        <thead>
          <tr>
            <th>Statistic</th>
            <th>Monthly price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cheapest (floor)</td>
            <td>{formatUsd(stats.min)}</td>
          </tr>
          <tr>
            <td>10th percentile</td>
            <td>{formatUsd(stats.p10)}</td>
          </tr>
          <tr>
            <td>Median</td>
            <td>{formatUsd(stats.median)}</td>
          </tr>
          <tr>
            <td>90th percentile</td>
            <td>{formatUsd(stats.p90)}</td>
          </tr>
          <tr>
            <td>Most expensive</td>
            <td>{formatUsd(stats.max)}</td>
          </tr>
        </tbody>
      </table>

      <p>
        At {formatUsd(floorPrice)}, the floor price is{" "}
        {((1 - floorPrice / stats.median) * 100).toFixed(0)}% below the
        median provider and {((1 - floorPrice / stats.p90) * 100).toFixed(0)}%
        below the 90th percentile. That kind of dispersion is unusual in any
        consumer drug market — it tells you the providers at the floor are
        playing a very different pricing game than the providers above it.
      </p>

      <h2>The {floorProviders.length === 1 ? "provider" : "providers"} at {formatUsd(floorPrice)}/month</h2>

      <p>
        Here&apos;s every provider we track that currently advertises
        compounded semaglutide at the {formatUsd(floorPrice)}/month floor,
        plus the editorial verification we&apos;ve completed for each:
      </p>

      <ul>
        {floorProviderDetails.map(({ slug, name, full }) => {
          const overallScore = full?.scores
            ? Object.values(full.scores).reduce((a, b) => a + b, 0) /
              Object.keys(full.scores).length
            : null;
          const stateCount = full?.states_available?.length ?? 0;
          return (
            <li key={slug}>
              <strong>
                <Link href={`/reviews/${slug}`}>{name}</Link>
              </strong>{" "}
              — {formatUsd(floorPrice)}/month
              {overallScore ? ` · WLR score ${overallScore.toFixed(1)}/10` : ""}
              {stateCount > 0 ? ` · ships to ${stateCount} states` : ""}
              .{" "}
              {full?.best_for ? `Best for: ${full.best_for}.` : ""}
            </li>
          );
        })}
      </ul>

      <h2>The next tier: providers within $10 of the floor</h2>

      {nearFloorProviders.length > 0 ? (
        <>
          <p>
            Just above the absolute floor sit a small group of providers within{" "}
            $10/month of the cheapest tier. If the floor providers don&apos;t
            ship to your state or don&apos;t carry your dose, these are the
            next-cheapest legitimate options:
          </p>
          <ul>
            {nearFloorProviders.map((p) => (
              <li key={p.slug}>
                <Link href={`/reviews/${p.slug}`}>{p.name}</Link> —{" "}
                {formatUsd(p.monthly)}/month
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          As of this update, every provider above the floor sits at least
          $10/month higher — there&apos;s no second tier within striking
          distance.
        </p>
      )}

      <h2>What floor pricing actually buys you (and what it doesn&apos;t)</h2>

      <p>
        A {formatUsd(floorPrice)}/month advertised price almost always
        refers to the <em>starting dose</em> of compounded semaglutide
        (typically 0.25mg weekly), not the maintenance dose most patients
        end up at after titration (1.0mg or 1.7mg weekly). When you actually
        progress through your dose schedule, the monthly cost on most
        floor-priced providers rises to match the higher-dose tier on
        their pricing page. We track maintenance pricing on the same{" "}
        <Link href="/price-tracker">price tracker</Link>, and our{" "}
        <Link href="/research/compounded-glp1-price-movement-12-months">
          12-month price movement investigation
        </Link>{" "}
        documents how that floor has shifted over time.
      </p>

      <p>
        Things the floor price <strong>does</strong> include for the
        verified providers above: a synchronous or asynchronous medical
        consultation, a prescription written by a licensed clinician, the
        compounded medication itself, basic patient support, and shipping.
        For a closer look at how the compounded vial actually compares
        to the brand-name pen on a day-to-day level, see our{" "}
        <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
          Wegovy pen vs compounded vial breakdown
        </Link>
        .
      </p>

      <p>
        Things the floor price typically <strong>does not</strong> include:
        labs, insurance billing, syringes (some providers; check the
        per-provider page), expedited shipping, after-hours support,
        and dose changes that fall outside the manufacturer&apos;s standard
        titration. None of these are deal-breakers, but they&apos;re worth
        knowing about before you commit.
      </p>

      <h2>Red flags that mean the cheapest price is too good</h2>

      <p>
        Not every {formatUsd(floorPrice)}/month listing is legitimate. We
        verified that the providers above are licensed and shipping real
        product, but elsewhere on the open internet there are sub-floor
        offers that come with serious problems. Watch for:
      </p>

      <ul>
        <li>
          <strong>No US-based prescriber.</strong> Compounded semaglutide
          requires a valid prescription from a clinician licensed in your
          state. Sites that skip the consultation step or that have a
          prescriber outside the US are violating federal law and your
          medication is not legitimate compounded product.
        </li>
        <li>
          <strong>No named compounding pharmacy.</strong> Reputable providers
          name their fulfillment pharmacy on their website or in their
          consent forms. If you can&apos;t find out who is actually
          compounding your medication, that&apos;s a problem.
        </li>
        <li>
          <strong>Salt forms.</strong> Multiple FDA warning letters cite
          providers using semaglutide sodium or semaglutide acetate (salt
          forms) instead of base semaglutide. Salt forms are not the same
          active ingredient as the molecule used in approved drugs and
          have not been evaluated for safety — our{" "}
          <Link href="/research/compounded-semaglutide-bioequivalence">
            compounded semaglutide bioequivalence investigation
          </Link>{" "}
          walks through what &ldquo;same molecule&rdquo; actually means
          in this context. See our{" "}
          <Link href="/research/fda-warning-letters-glp1">
            FDA warning letter investigation
          </Link>{" "}
          for the full pattern.
        </li>
        <li>
          <strong>Prices below the legitimate floor.</strong> Anything
          dramatically cheaper than the {formatUsd(floorPrice)}/month tier
          documented here should be treated as suspicious until proven
          otherwise.
        </li>
      </ul>

      <h2>Methodology</h2>

      <p>
        Every price in this article is computed at render time from the
        Weight Loss Rankings provider dataset. When new providers are added
        or existing providers change their pricing, this article updates
        automatically — the prose adjusts to reflect the new floor, the
        new median, and any new verified providers tied at the floor.
      </p>

      <p>
        The pricing dataset itself is verified directly against each
        provider&apos;s public website on a continuous basis by our
        editorial team. The verification process and data sources are
        documented at{" "}
        <Link href="/methodology">our methodology page</Link>. The full
        provider list and their pricing rows are available on the{" "}
        <Link href="/price-tracker">live price tracker</Link>.
      </p>

      <p>
        Last data refresh: {verifiedDate}.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
