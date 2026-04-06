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
      siteName: "WeightLossRankings",
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

  const hasTrustpilot =
    provider.external_reviews?.trustpilot_score !== undefined &&
    provider.external_reviews?.trustpilot_count !== undefined;

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
            availability: "https://schema.org/InStock",
            url: provider.affiliate_url,
          },
        }
      : {}),
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(overallScore),
        bestRating: "10",
      },
      author: {
        "@type": "Organization",
        name: "WeightLossRankings",
      },
    },
    ...(hasTrustpilot
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(provider.external_reviews!.trustpilot_score),
            reviewCount: String(provider.external_reviews!.trustpilot_count),
            bestRating: "5",
          },
        }
      : {}),
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

            {/* Score badge + star rating row */}
            <div className="flex items-center gap-4 flex-wrap">
              <ScoreBadge scores={provider.scores} size="lg" />
              {provider.external_reviews?.trustpilot_score !== undefined && (
                <StarRating
                  score={provider.external_reviews.trustpilot_score}
                  count={provider.external_reviews.trustpilot_count}
                />
              )}
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
