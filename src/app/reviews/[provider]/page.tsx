import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProviderSlugs,
  getProviderBySlug,
  getProvidersByCategory,
} from "@/lib/data";
import { computeOverallScore } from "@/lib/scoring";
import type { Provider } from "@/lib/types";
import JsonLd from "@/components/shared/JsonLd";
import CTAButton from "@/components/shared/CTAButton";
import StickyCTABar from "@/components/shared/StickyCTABar";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import DataConfidenceBadge from "@/components/shared/DataConfidenceBadge";
import ScoreBadge from "@/components/providers/ScoreBadge";
import ScoreBreakdownBars from "@/components/providers/ScoreBreakdownBars";
import PricingTable from "@/components/providers/PricingTable";
import StarRating from "@/components/providers/StarRating";
import FeatureBadge from "@/components/providers/FeatureBadge";
import BlogContent from "@/components/blog/BlogContent";
import BottomLineCard from "@/components/marketing/BottomLineCard";
import DYORCallout from "@/components/marketing/DYORCallout";
import ProsConsGrid from "@/components/marketing/ProsConsGrid";
import GradientCTACallout from "@/components/marketing/GradientCTACallout";
import RelatedProvidersSection from "@/components/marketing/RelatedProvidersSection";
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import FdaWarningFlag from "@/components/marketing/FdaWarningFlag";
import AuthorByline from "@/components/shared/AuthorByline";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { getDefaultAuthor } from "@/data/authors";
import { getWarningLetterByProviderSlug } from "@/lib/fda-warning-letters";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";

// Drug-aware citation selection. Foundational regulatory + pricing
// sources apply to every review; clinical-trial and FDA-label citations
// are only included for the drugs the provider actually offers.
function getProviderDrugs(
  provider: Provider
): Set<"semaglutide" | "tirzepatide"> {
  const drugs = new Set<"semaglutide" | "tirzepatide">();
  for (const p of provider.pricing ?? []) {
    if (p.drug === "semaglutide") drugs.add("semaglutide");
    if (p.drug === "tirzepatide") drugs.add("tirzepatide");
  }
  return drugs;
}

function buildReviewSourceIds(provider: Provider): string[] {
  const drugs = getProviderDrugs(provider);
  const sources: string[] = [];

  // Always-cited foundational sources (apply to every provider).
  sources.push("wlr-pricing-index");
  sources.push("fda-503a-compounding");
  sources.push("fda-drug-shortage-list");
  sources.push("pcab-accreditation-standards");
  sources.push("kff-medicaid-obesity-drug-coverage");

  // Drug-specific clinical trial + FDA label citations.
  if (drugs.has("semaglutide")) {
    sources.push("step1-nejm-2021");      // pivotal trial
    sources.push("fda-wegovy-approval");  // Wegovy (obesity)
    sources.push("fda-ozempic-label");    // Ozempic (diabetes)
  }
  if (drugs.has("tirzepatide")) {
    sources.push("surmount1-nejm-2022");  // pivotal trial
    sources.push("fda-zepbound-approval"); // Zepbound (obesity)
    sources.push("fda-mounjaro-label");   // Mounjaro (diabetes)
  }

  // Head-to-head comparison only relevant when the provider offers both.
  if (drugs.has("semaglutide") && drugs.has("tirzepatide")) {
    sources.push("surmount5-nejm-2025");
  }

  return sources;
}

export async function generateStaticParams() {
  const slugs = await getAllProviderSlugs();
  return slugs.map(({ slug }) => ({ provider: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provider: string }>;
}): Promise<Metadata> {
  const { provider: slug } = await params;
  const provider: Provider | null = await getProviderBySlug(slug);

  if (!provider) {
    return { title: "Provider Not Found" };
  }

  const overall = computeOverallScore(provider.scores);
  const minPriceVal =
    provider.pricing && provider.pricing.length > 0
      ? Math.min(
          ...provider.pricing.map((p) => p.promo_price ?? p.monthly_cost)
        )
      : null;
  const priceStr = minPriceVal !== null ? ` · $${minPriceVal}/mo` : "";
  const title = `${provider.name} Review: ${overall}/10${priceStr} (2026)`;
  const description = `Independent ${provider.name} review. Our experts scored it ${overall}/10. Pricing, pros, cons, and top alternatives.`;

  return {
    title,
    description,
    alternates: { canonical: `/reviews/${slug}` },
    openGraph: {
      title,
      description,
      url: `/reviews/${slug}`,
      type: "article",
      siteName: "Weight Loss Rankings",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProviderReviewPage({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider: slug } = await params;

  const provider: Provider | null = await getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  const overallScore = computeOverallScore(provider.scores);

  const minPrice =
    provider.pricing && provider.pricing.length > 0
      ? provider.pricing.reduce((min, p) => {
          const effective = p.promo_price ?? p.monthly_cost;
          const minEffective = min.promo_price ?? min.monthly_cost;
          return effective < minEffective ? p : min;
        }, provider.pricing[0])
      : null;

  const displayPrice = minPrice
    ? (minPrice.promo_price ?? minPrice.monthly_cost)
    : null;

  // Fetch alternatives: same category, excluding self, limit 3
  let alternatives: Provider[] = [];
  if (provider.category) {
    const categoryProviders: Provider[] = await getProvidersByCategory(
      provider.category
    );
    alternatives = categoryProviders
      .filter((p) => p.slug !== provider.slug)
      .slice(0, 3);
  }

  // One-line verdict based on strongest score dimension
  let oneLineVerdict: string;
  if (provider.scores.value >= 8.5) {
    oneLineVerdict = `${provider.name} is one of the most affordable GLP-1 options on the market.`;
  } else if (provider.scores.trust >= 9) {
    oneLineVerdict = `${provider.name} stands out for its medical oversight and pharmacy verification.`;
  } else if (provider.scores.support >= 8.5) {
    oneLineVerdict = `${provider.name} pairs medication with comprehensive coaching and support.`;
  } else if (provider.scores.accessibility >= 9) {
    oneLineVerdict = `${provider.name} offers the broadest state availability and easiest access.`;
  } else {
    oneLineVerdict = `${provider.name} is a solid telehealth option with balanced features and pricing.`;
  }

  // Convert our 0-10 internal score to a 0-5 scale that Google's rich
  // result rendering pipeline expects. Most SERP star previews are on
  // a 5-star scale; emitting on a 10-star scale renders correctly but
  // is less commonly picked up by Google's ratings parser.
  const overallScoreFiveStar = Math.round((overallScore / 2) * 10) / 10;

  // Provider reviews are first-party editorial reviews authored by
  // the founding editor (Eli Marsden). When we onboard contributing
  // reviewers we'll thread a per-provider author override through
  // the Provider type; until then, every review is bylined to the
  // default editor.
  const reviewAuthor = getDefaultAuthor();

  // First-party editorial Review JSON-LD.
  //
  // We DO NOT emit AggregateRating here. Per Google's Review snippet
  // policy:
  //   "If the entity that's being reviewed controls the reviews about
  //    itself, their pages... are ineligible for star review feature."
  // Emitting AggregateRating with reviewCount=1 sourced from our own
  // single editorial score was a documented manual-action trigger.
  // Removed 2026-04-09 after the SEO audit pass surfaced the rich-
  // result violation.
  //
  // The Review object below remains: that's a legitimate first-party
  // editorial review with a single rating from a single named author
  // (Weight Loss Rankings as the editorial entity). When we ship the
  // E-E-A-T author infrastructure, the `author` here will switch from
  // Organization to Person with hasCredential.
  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: provider.name,
    description: provider.description,
    brand: { "@type": "Brand", name: provider.name },
    ...(displayPrice !== null && provider.affiliate_url
      ? {
          offers: {
            "@type": "Offer",
            price: String(displayPrice),
            priceCurrency: "USD",
            // Refined availability per the deep SEO audit:
            //   - All-50-states (or unspecified state list): InStock
            //   - State-restricted (1-49 states): LimitedAvailability
            //     plus an areaServed array of US state codes
            // Schema.org/Offer.availability accepts both InStock and
            // LimitedAvailability; LimitedAvailability tells Google's
            // SERP rich-result parser that the product is not
            // universally available, which is more accurate than
            // pretending every state is served.
            availability:
              !provider.states_available ||
              provider.states_available.length === 0 ||
              provider.states_available.length >= 50
                ? "https://schema.org/InStock"
                : "https://schema.org/LimitedAvailability",
            url: provider.affiliate_url,
            // areaServed only emitted when there's a real, non-empty,
            // non-universal state list. Each state is rendered as a
            // structured Place / State entity rather than a flat
            // string so Google can geocode it.
            ...(provider.states_available &&
            provider.states_available.length > 0 &&
            provider.states_available.length < 50
              ? {
                  areaServed: provider.states_available.map((stateCode) => ({
                    "@type": "State",
                    name: stateCode,
                    addressCountry: "US",
                  })),
                }
              : {}),
          },
        }
      : {}),
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(overallScoreFiveStar),
        bestRating: "5",
        worstRating: "1",
      },
      // Named human author per Google's E-E-A-T guidance for YMYL.
      // The Person reference uses the same canonical @id as the
      // /authors/[slug]#person identifier so Google's Knowledge
      // Graph can reconcile the byline with the author bio page.
      author: {
        "@type": "Person",
        "@id": `https://weightlossrankings.org/authors/${reviewAuthor.slug}#person`,
        name: reviewAuthor.name,
        url: `https://weightlossrankings.org/authors/${reviewAuthor.slug}`,
        jobTitle: reviewAuthor.jobTitle,
      },
      datePublished: provider.verification?.last_verified ?? undefined,
      reviewBody: oneLineVerdict,
    },
  };

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Reviews", url: "/reviews" },
    { name: provider.name, url: `/reviews/${slug}` },
  ];

  const faqItems = [
    {
      question: `Is ${provider.name} legit?`,
      answer: `Yes, ${provider.name} is a legitimate provider. Our team independently evaluated it and gave it an overall score of ${overallScore.toFixed(
        1
      )}/10. As with any healthcare service, we recommend consulting with a licensed medical professional before starting any new treatment.`,
    },
    {
      question: `How much does ${provider.name} cost?`,
      answer:
        displayPrice !== null
          ? `${provider.name} starts at $${displayPrice} per month.${
              provider.pricing && provider.pricing.length > 1
                ? ` Pricing varies by dose and formulation — see the pricing table above for a full breakdown.`
                : ""
            }`
          : `Pricing information for ${provider.name} is available on their official website. We recommend visiting their site directly for the most up-to-date pricing.`,
    },
  ];

  return (
    <>
      <JsonLd data={productJsonLd} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <main className="min-h-screen bg-brand-gradient-light pb-24 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-10">
          {/* Visible breadcrumb — paired with BreadcrumbSchema JSON-LD
              above. Distributes PageRank up to /reviews on every view. */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Reviews", href: "/reviews" },
              { label: provider.name },
            ]}
            className="mb-0"
          />
          {(() => {
            const warningLetter = getWarningLetterByProviderSlug(provider.slug);
            return warningLetter ? (
              <FdaWarningFlag
                letter={warningLetter}
                providerName={provider.name}
              />
            ) : null;
          })()}
          {/* Hero card */}
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-5">
            {/* H1 + best_for */}
            <div className="flex flex-col gap-1">
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-text-primary">
                {provider.name} Review
              </h1>
              {provider.best_for && (
                <p className="text-brand-text-secondary text-sm">
                  Best for: {provider.best_for}
                </p>
              )}
            </div>

            {/* Description */}
            {provider.description && (
              <p className="text-brand-text-secondary leading-relaxed">
                {provider.description}
              </p>
            )}

            {/* Named author byline strip — links to /authors/[slug]
                bio page, surfaces medical reviewer (or honest
                "editorially reviewed" disclosure when none), and shows
                last-reviewed date. Replaces the prior anonymous review
                model — every provider review is now explicitly bylined
                to a named human editor per Google's YMYL E-E-A-T
                guidance. */}
            <AuthorByline
              author={reviewAuthor}
              medicalReviewer={null}
              publishedDate={provider.verification?.last_verified}
              lastReviewed={provider.verification?.last_verified}
            />

            {/* Data confidence disclosure — subtle inline line, no
                notes, no heavy box. verification.notes is internal-only
                documentation and must never render publicly. */}
            <DataConfidenceBadge
              confidence={provider.verification?.confidence}
              lastVerified={provider.verification?.last_verified}
              verifiedBy={provider.verification?.verified_by}
            />

            {/* Score badge + editorial star rating row */}
            <div className="flex items-center gap-4 flex-wrap">
              <ScoreBadge scores={provider.scores} size="lg" />
              <StarRating score={overallScoreFiveStar} />
            </div>

            {/* Feature badges */}
            {provider.features && provider.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {provider.features.map((feature) => (
                  <FeatureBadge key={feature} label={feature} variant="default" />
                ))}
              </div>
            )}

            {/* Price + CTA */}
            <div className="flex items-center gap-4 flex-wrap">
              {displayPrice !== null && (
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold bg-brand-gradient bg-clip-text text-transparent">
                    ${displayPrice}
                  </span>
                  <span className="text-sm text-brand-text-secondary">/mo</span>
                </div>
              )}
              {provider.affiliate_url && (
                <CTAButton
                  href={provider.affiliate_url}
                  external
                  size="lg"
                  trackProvider={provider.slug}
                  trackSource="review_page"
                >
                  Visit {provider.name}
                </CTAButton>
              )}
            </div>

            <AffiliateDisclosure />
          </section>

          <BottomLineCard
            verdict={oneLineVerdict}
            score={overallScore}
            bestFor={provider.best_for}
            fromPrice={displayPrice}
          />

          <DYORCallout providerName={provider.name} />

          {/* Score breakdown */}
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-brand-text-primary">
              Score Breakdown
            </h2>
            <ScoreBreakdownBars scores={provider.scores} />
          </section>

          {/* Pricing table */}
          {provider.pricing && provider.pricing.length > 0 && (
            <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
              <h2 className="font-heading text-xl font-bold text-brand-text-primary">
                Pricing
              </h2>
              <PricingTable pricing={provider.pricing} />
            </section>
          )}

          <ProsConsGrid pros={provider.pros} cons={provider.cons} />

          {/* Midpage affiliate CTA */}
          {provider.affiliate_url && (
            <GradientCTACallout
              heading={`Ready to start with ${provider.name}?`}
              description={`${
                displayPrice !== null ? `Starting at $${displayPrice}/month. ` : ""
              }See current pricing and start your free consultation.`}
              ctaHref={provider.affiliate_url}
              ctaText={`Visit ${provider.name} →`}
              external
              trackProvider={provider.slug}
              trackSource={`review_${provider.slug}_midpage`}
            />
          )}

          {/* Review content */}
          {provider.review_content && (
            <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8">
              <BlogContent content={provider.review_content} />
            </section>
          )}

          {/* Sources — central citation registry.
              Rendered above related providers so readers can verify the
              regulatory + clinical claims referenced throughout the review. */}
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8">
            <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
              Sources &amp; methodology
            </h2>
            <p className="text-sm text-brand-text-secondary mb-3">
              Our {provider.name} review applies the same{" "}
              <a href="/methodology" className="text-brand-violet underline">
                6-dimension scoring framework
              </a>{" "}
              we use for every provider. Pricing, FDA approval status,
              compounding rules, and clinical-trial efficacy claims are
              sourced from the primary regulatory and peer-reviewed literature
              below.
            </p>
            <SourcesPanel
              sourceIds={buildReviewSourceIds(provider)}
              dataAsOf={getLatestVerificationDate()}
              defaultOpen={false}
            />
          </section>

          <RelatedProvidersSection
            title={`Alternatives to ${provider.name}`}
            providers={alternatives}
            trackingSource={`review_${provider.slug}`}
          />
          {/* Internal link to the dedicated alternatives page. Without
              this, /alternatives/[provider] is fully orphaned (zero
              inbound links → Google deprioritizes), per the
              audit-internal-links.ts script output. One link per
              review page = 82 new inbound links across the site. */}
          <div className="text-center">
            <Link
              href={`/alternatives/${provider.slug}`}
              className="inline-flex items-center gap-2 text-brand-violet font-semibold hover:underline"
            >
              See all alternatives to {provider.name} →
            </Link>
          </div>

          <FAQSection items={faqItems} />

          {/* Endpage affiliate CTA */}
          {provider.affiliate_url && (
            <GradientCTACallout
              heading={`Ready to start with ${provider.name}?`}
              description={`${
                displayPrice !== null ? `Starting at $${displayPrice}/month. ` : ""
              }See current pricing and start your free consultation.`}
              ctaHref={provider.affiliate_url}
              ctaText={`Visit ${provider.name} →`}
              external
              trackProvider={provider.slug}
              trackSource={`review_${provider.slug}_endpage`}
            />
          )}
        </div>
      </main>

      {provider.affiliate_url && (
        <StickyCTABar
          provider={{
            name: provider.name,
            slug: provider.slug,
            price: displayPrice,
            affiliateUrl: provider.affiliate_url,
          }}
          trackingSource={`review_${provider.slug}_sticky`}
        />
      )}
    </>
  );
}
