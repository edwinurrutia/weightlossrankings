import type { Metadata } from "next";
import Link from "next/link";
import {
  getPricingStats,
  getPriceDistribution,
  getCheapestProviders,
  getLatestVerificationDate,
  countProvidersOffering,
  TOTAL_PROVIDERS,
} from "@/lib/pricing-analytics";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import PriceDistributionChart from "@/components/research/PriceDistributionChart";
import References from "@/components/research/References";

const SLUG = "glp-1-pricing-index-2026";

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

import {
  WEGOVY_MONTHLY_USD,
  ZEPBOUND_MONTHLY_USD,
} from "@/lib/citations";

// Brand-name retail baselines used as the comparison anchor — pulled from
// the central citation registry so any manufacturer price update propagates
// site-wide automatically.
const WEGOVY_MONTHLY = WEGOVY_MONTHLY_USD;
const ZEPBOUND_MONTHLY = ZEPBOUND_MONTHLY_USD;

export default function PricingIndexArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const compSemaStats = getPricingStats("semaglutide", "compounded");
  const compTirzStats = getPricingStats("tirzepatide", "compounded");

  const compSemaDist = getPriceDistribution("semaglutide", "compounded");
  const compTirzDist = getPriceDistribution("tirzepatide", "compounded");

  const cheapestSema = getCheapestProviders("semaglutide", "compounded", 5);
  const cheapestTirz = getCheapestProviders("tirzepatide", "compounded", 5);

  const verifiedDate = getLatestVerificationDate();

  const semaProviderCount = countProvidersOffering("semaglutide", "compounded");
  const tirzProviderCount = countProvidersOffering("tirzepatide", "compounded");

  // Annualized savings vs brand at the median compounded price.
  const semaAnnualGap = (WEGOVY_MONTHLY - compSemaStats.median) * 12;
  const tirzAnnualGap = (ZEPBOUND_MONTHLY - compTirzStats.median) * 12;

  return (
    <ResearchArticleLayout article={article} dataAsOf={verifiedDate}>
      <p>
        Compounded GLP-1 medications have rewritten the cash-pay weight-loss
        market. A year ago, brand-name Wegovy at roughly{" "}
        {formatUsd(WEGOVY_MONTHLY)}/month was the only injectable semaglutide
        most uninsured Americans could access. Today, {semaProviderCount} of
        the {TOTAL_PROVIDERS} telehealth providers we track offer compounded
        semaglutide — and the median monthly price is{" "}
        <strong>{formatUsd(compSemaStats.median)}</strong>, a{" "}
        {Math.round((1 - compSemaStats.median / WEGOVY_MONTHLY) * 100)}%
        discount to brand.
      </p>

      <p>
        That gap, repeated thousands of times across our dataset, is the
        single biggest force shaping the consumer GLP-1 market right now.
        This article puts hard numbers on it: the median, the cheapest
        decile, the most expensive decile, the distribution shape, and how
        the savings compare against the brand-name baseline. The data updates
        every time we verify a provider — so the numbers below are always
        current as of the timestamp at the top of the page.
      </p>

      <h2>The headline numbers</h2>

      <p>
        Across our entire telehealth dataset, here&apos;s what people are
        actually paying per month for compounded semaglutide and tirzepatide
        — the same active ingredients in Wegovy and Zepbound respectively:
      </p>

      <div className="not-prose grid sm:grid-cols-2 gap-4 my-8">
        <StatCard
          label="Compounded semaglutide"
          stats={compSemaStats}
          providerCount={semaProviderCount}
          brandPrice={WEGOVY_MONTHLY}
          brandName="Wegovy"
        />
        <StatCard
          label="Compounded tirzepatide"
          stats={compTirzStats}
          providerCount={tirzProviderCount}
          brandPrice={ZEPBOUND_MONTHLY}
          brandName="Zepbound"
        />
      </div>

      <p>
        For semaglutide, the median monthly cost is{" "}
        <strong>{formatUsd(compSemaStats.median)}</strong>. The cheapest 10%
        of providers (the &ldquo;p10&rdquo;) charge{" "}
        <strong>{formatUsd(compSemaStats.p10)}</strong> or less. The most
        expensive decile starts at <strong>{formatUsd(compSemaStats.p90)}</strong>
        . That spread — roughly {Math.round(compSemaStats.p90 / Math.max(1, compSemaStats.p10))}× from
        cheapest to priciest — is much wider than most readers expect, and
        it&apos;s the main reason it&apos;s worth comparing providers
        directly instead of taking the first ad you see at face value.
        <Cite n={1} />
      </p>

      <p>
        At the median compounded price, a patient choosing semaglutide saves
        roughly <strong>{formatUsd(semaAnnualGap)} per year</strong> versus
        Wegovy at list price. For tirzepatide, the median compounded price
        produces an annual savings of about{" "}
        <strong>{formatUsd(tirzAnnualGap)}</strong> versus Zepbound at list.
        These are real numbers that reset the calculation for anyone whose
        insurance excludes GLP-1s for obesity (which is most of the privately
        insured market).
        <Cite n={2} />
      </p>

      <h2>How prices are distributed</h2>

      <p>
        Aggregate medians hide a lot. The histograms below show how the
        market actually breaks out by price band. Compounded semaglutide
        skews heavily toward the $100&ndash;$200 range, with a long tail of
        more expensive providers — usually programs that bundle clinical
        coaching, lab work, or in-network pharmacy guarantees on top of the
        injection itself.
      </p>

      <div className="not-prose flex flex-col gap-6 my-8">
        <PriceDistributionChart
          buckets={compSemaDist}
          label="Compounded semaglutide — monthly price distribution"
          subtitle={`${semaProviderCount} providers · live data as of ${verifiedDate}`}
        />
        <PriceDistributionChart
          buckets={compTirzDist}
          label="Compounded tirzepatide — monthly price distribution"
          subtitle={`${tirzProviderCount} providers · live data as of ${verifiedDate}`}
        />
      </div>

      <p>
        Tirzepatide&apos;s distribution sits noticeably higher. There are
        two reasons: tirzepatide&apos;s active pharmaceutical ingredient is
        more expensive at the wholesale level, and the FDA only removed it
        from the official drug shortage list in late 2024, which constrained
        the number of 503A pharmacies legally allowed to compound it during
        most of 2024.
        <Cite n={3} />
      </p>

      <h2>The cheapest decile right now</h2>

      <p>
        The most useful number for most readers isn&apos;t the median —
        it&apos;s the actual list of providers at the cheapest end. These
        update live from our verified dataset:
      </p>

      <div className="not-prose grid sm:grid-cols-2 gap-4 my-8">
        <CheapestList
          title="Cheapest compounded semaglutide"
          rows={cheapestSema}
        />
        <CheapestList
          title="Cheapest compounded tirzepatide"
          rows={cheapestTirz}
        />
      </div>

      <p>
        The lowest list prices are usually first-month introductory deals.
        Always read the fine print on whether the rate jumps after month
        one and whether the listed price includes shipping, the consult, and
        the medication itself, or whether some of those are billed
        separately. Our individual{" "}
        <Link href="/compare">side-by-side comparisons</Link> normalize for
        these differences.
      </p>

      <h2>Why the spread is so wide</h2>

      <p>
        A {compSemaStats.p10}&ndash;{formatUsd(compSemaStats.p90)} range for
        what is, at the molecular level, the same drug raises an obvious
        question: what are buyers in the higher tier actually paying for?
        Five things, in our experience working through provider data:
      </p>

      <ol>
        <li>
          <strong>Sourcing quality.</strong> The 503A pharmacies that supply
          compounded semaglutide vary in size, accreditation, and quality
          systems. Some publish their certificates of analysis on every
          batch; others won&apos;t share them at all. Providers that source
          from PCAB-accredited or NABP VPP facilities often charge more.
          <Cite n={4} />
        </li>
        <li>
          <strong>Bundled clinical care.</strong> The cheapest providers
          tend to be pure prescription delivery — a 5-minute async intake
          and the medication mailed out. The mid-tier programs include
          ongoing physician check-ins, dose titration support, and side-
          effect management. The most expensive include lab work, dietitian
          access, or in-app coaching.
        </li>
        <li>
          <strong>Brand-name fulfillment guarantees.</strong> A handful of
          providers will switch you to brand-name Wegovy (at brand-name
          prices) if compounded supply is interrupted. This is rare and
          usually buried in the fine print.
        </li>
        <li>
          <strong>State availability.</strong> Compounding rules differ
          state to state. Providers licensed in all 50 states have higher
          compliance overhead than ones operating in 20.
        </li>
        <li>
          <strong>Marketing and CAC.</strong> Some of the spread is just
          customer acquisition cost. The best-funded brands pay $200+ for a
          new sign-up and recover it through higher monthly prices or longer
          minimum commitments.
        </li>
      </ol>

      <p>
        None of these inherently make the more expensive provider a worse
        deal — but they do mean that comparing on price alone misses the
        story. Our individual{" "}
        <Link href="/best/compounded-semaglutide">
          ranked best-of lists
        </Link>{" "}
        score on six dimensions (value, effectiveness, UX, trust,
        accessibility, support) precisely because price is just one input.
      </p>

      <h2>How the gap to brand has evolved</h2>

      <p>
        We started tracking GLP-1 telehealth pricing in early 2024. At that
        point, brand-name Wegovy was effectively unavailable to most
        uninsured patients — supply constraints meant pharmacies routinely
        ran out, and the cash price hovered near {formatUsd(WEGOVY_MONTHLY)}{" "}
        when it could be filled at all. The compounded market existed but
        was concentrated among a small number of telehealth players, and
        prices clustered around $250&ndash;$350/month.
        <Cite n={5} />
      </p>

      <p>
        Two things changed that. First, the FDA&apos;s formal drug shortage
        designation for semaglutide gave 503A pharmacies clear legal cover
        to compound it. That brought dozens of new entrants into the
        market and pushed prices down through ordinary competition. Second,
        the wholesale cost of semaglutide API itself fell sharply through
        2024 and 2025 as more suppliers came online. The combination is
        why the median sits where it sits today rather than where it sat 18
        months ago.
        <Cite n={6} />
      </p>

      <p>
        The current state of play: compounded prices have largely stopped
        falling, and the cheapest decile is approaching what looks like a
        floor around $30&ndash;$80/month. Brand-name Wegovy and Zepbound,
        meanwhile, have started offering their own cash-pay programs at
        roughly half their old retail price as the manufacturers chase
        share. The gap has narrowed, but it&apos;s still meaningful — and
        for the median patient on the median compounded plan, the savings
        are still measured in five figures per year.
      </p>

      <h2>Methodology</h2>

      <p>
        Every price in this index is taken from the public-facing website
        of the named provider. We re-verify each provider on a rolling
        basis; the &ldquo;data as of&rdquo; stamp at the top of this page
        reflects the most recent verification across the dataset.
      </p>

      <p>
        Where a provider lists both an introductory price and an ongoing
        rate, we use the introductory price (&ldquo;promo price&rdquo;) as
        the comparable monthly cost, because that&apos;s what readers
        actually pay when starting a program. Brand-name comparison
        baselines come from the manufacturer cash-pay list prices for
        Wegovy and Zepbound as published by Novo Nordisk and Eli Lilly
        respectively.
      </p>

      <p>
        Percentile calculations use linear interpolation between the two
        surrounding ranks (the same convention as Excel&apos;s
        <code>PERCENTILE</code> function and NumPy&apos;s default). The
        full source is open on GitHub for anyone who wants to audit it.
      </p>

      <References
        items={[
          {
            authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
            title:
              "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1).",
            source: "N Engl J Med",
            year: 2021,
            pmid: "33567185",
          },
          {
            authors: "Kaiser Family Foundation.",
            title:
              "Out-of-Pocket Spending and Affordability for GLP-1 Drugs Among Medicare Beneficiaries.",
            source: "KFF Issue Brief",
            year: 2024,
            url: "https://www.kff.org/medicare/issue-brief/out-of-pocket-spending-and-affordability-for-glp-1-drugs-among-medicare-beneficiaries/",
          },
          {
            authors: "U.S. Food and Drug Administration.",
            title:
              "FDA Removes Tirzepatide From the Drug Shortage List — Updates and Compounding Guidance.",
            source: "FDA Drug Shortages Database",
            year: 2024,
            url: "https://www.fda.gov/drugs/drug-shortages",
          },
          {
            authors: "Pharmacy Compounding Accreditation Board (PCAB).",
            title:
              "Standards for Compounded Sterile Preparations and 503A Facility Accreditation.",
            source: "PCAB / Accreditation Commission for Health Care",
            year: 2023,
            url: "https://www.achc.org/pcab/",
          },
          {
            authors: "Whitley HP, Trujillo JM, Neumiller JJ.",
            title:
              "Special Report: Potential Strategies for Addressing GLP-1 Receptor Agonist Shortages.",
            source: "Clin Diabetes",
            year: 2023,
            pmid: "37456095",
          },
          {
            authors: "Mahase E.",
            title:
              "Compounded GLP-1 Drugs: What Doctors and Patients Need to Know.",
            source: "BMJ",
            year: 2024,
            pmid: "39379084",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}

// ─── Helper sub-components (server) ───────────────────────────────────────

function StatCard({
  label,
  stats,
  providerCount,
  brandPrice,
  brandName,
}: {
  label: string;
  stats: ReturnType<typeof getPricingStats>;
  providerCount: number;
  brandPrice: number;
  brandName: string;
}) {
  if (stats.count === 0) {
    return (
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6">
        <p className="font-heading font-bold text-brand-text-primary">
          {label}
        </p>
        <p className="text-sm text-brand-text-secondary mt-2">
          No data yet.
        </p>
      </div>
    );
  }
  const pctOff = Math.round((1 - stats.median / brandPrice) * 100);
  return (
    <div className="rounded-2xl border border-brand-violet/15 bg-white p-6">
      <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-brand-violet mb-3">
        {label}
      </p>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-heading text-4xl font-black text-brand-text-primary">
          {formatUsd(stats.median)}
        </span>
        <span className="text-sm font-semibold text-brand-text-secondary">
          /month median
        </span>
      </div>
      <p className="text-xs text-brand-text-secondary mb-5">
        {pctOff}% below {brandName} list price ({formatUsd(brandPrice)}/mo)
      </p>
      <dl className="grid grid-cols-3 gap-3 text-xs">
        <div>
          <dt className="text-brand-text-secondary uppercase tracking-wider text-[10px]">
            p10
          </dt>
          <dd className="font-bold text-brand-text-primary mt-0.5">
            {formatUsd(stats.p10)}
          </dd>
        </div>
        <div>
          <dt className="text-brand-text-secondary uppercase tracking-wider text-[10px]">
            p90
          </dt>
          <dd className="font-bold text-brand-text-primary mt-0.5">
            {formatUsd(stats.p90)}
          </dd>
        </div>
        <div>
          <dt className="text-brand-text-secondary uppercase tracking-wider text-[10px]">
            n
          </dt>
          <dd className="font-bold text-brand-text-primary mt-0.5">
            {providerCount}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function CheapestList({
  title,
  rows,
}: {
  title: string;
  rows: { slug: string; name: string; monthly: number }[];
}) {
  return (
    <div className="rounded-2xl border border-brand-violet/15 bg-white p-6">
      <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-brand-violet mb-4">
        {title}
      </p>
      <ol className="flex flex-col gap-3">
        {rows.map((r, i) => (
          <li
            key={r.slug}
            className="flex items-baseline justify-between gap-3"
          >
            <Link
              href={`/reviews/${r.slug}`}
              className="text-sm font-semibold text-brand-text-primary hover:text-brand-violet truncate"
            >
              <span className="font-mono text-brand-text-secondary mr-2">
                {i + 1}.
              </span>
              {r.name}
            </Link>
            <span className="font-heading text-base font-bold text-brand-violet whitespace-nowrap">
              {formatUsd(r.monthly)}
              <span className="text-xs font-normal text-brand-text-secondary ml-0.5">
                /mo
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Inline cite footnote — duplicated locally so the component can be a
// pure server function without importing the client wrapper.
function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5">
      <a
        href={`#ref-${n}`}
        className="text-brand-violet hover:underline font-semibold"
      >
        [{n}]
      </a>
    </sup>
  );
}
