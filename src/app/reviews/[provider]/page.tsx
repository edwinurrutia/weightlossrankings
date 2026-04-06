import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProviderSlugs,
  getProviderBySlug,
  getProvidersByCategory,
} from "@/lib/data";
import { computeOverallScore, SCORE_DIMENSIONS } from "@/lib/scoring";
import type { Provider } from "@/lib/types";
import JsonLd from "@/components/shared/JsonLd";
import TrustBadge from "@/components/shared/TrustBadge";
import CTAButton from "@/components/shared/CTAButton";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import ScoreBadge from "@/components/providers/ScoreBadge";
import StarRating from "@/components/providers/StarRating";
import FeatureBadge from "@/components/providers/FeatureBadge";
import ProviderCard from "@/components/providers/ProviderCard";
import BlogContent from "@/components/blog/BlogContent";

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

  return {
    title: `${provider.name} Review 2026 — Is It Worth It?`,
    description: `Our in-depth ${provider.name} review scores it ${overall}/10. Read about pricing, pros & cons, and whether it's right for you.`,
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

  return (
    <>
      <JsonLd data={productJsonLd} />

      <main className="min-h-screen bg-brand-gradient-light">
        <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-10">
          {/* Hero card */}
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-5">
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              <TrustBadge icon="✓" text="Expert Reviewed" />
              <TrustBadge icon="🔒" text="Independently Rated" />
              <TrustBadge icon="📅" text="Updated 2026" />
              {provider.verification && (
                <TrustBadge
                  icon="✓"
                  text={`Verified ${new Date(
                    provider.verification.last_verified
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}`}
                />
              )}
            </div>

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

          {/* Score breakdown */}
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-brand-text-primary">
              Score Breakdown
            </h2>
            <div className="flex flex-col gap-3">
              {SCORE_DIMENSIONS.map(({ key, label }) => {
                const score = provider.scores[key];
                const widthPercent = (score / 10) * 100;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="w-36 text-sm text-brand-text-secondary shrink-0">
                      {label}
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-gradient"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                    <span className="w-8 text-sm font-semibold text-brand-text-primary text-right shrink-0">
                      {score}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pricing table */}
          {provider.pricing && provider.pricing.length > 0 && (
            <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
              <h2 className="font-heading text-xl font-bold text-brand-text-primary">
                Pricing
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 pr-4 font-semibold text-brand-text-primary">
                        Dose
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-brand-text-primary">
                        Form
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-brand-text-primary">
                        Price/mo
                      </th>
                      <th className="text-left py-2 font-semibold text-brand-text-primary">
                        Promo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {provider.pricing.map((p, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-2.5 pr-4 text-brand-text-secondary">
                          {p.dose}
                        </td>
                        <td className="py-2.5 pr-4 text-brand-text-secondary capitalize">
                          {p.form}
                        </td>
                        <td className="py-2.5 pr-4 font-medium text-brand-text-primary">
                          ${p.monthly_cost}
                          {p.promo_price && (
                            <span className="ml-2 text-brand-success font-semibold">
                              ${p.promo_price}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 text-brand-text-secondary">
                          {p.promo_code ? (
                            <span className="text-xs font-medium text-brand-success bg-brand-success/10 rounded-full px-2 py-0.5">
                              {p.promo_code}
                            </span>
                          ) : (
                            <span className="text-brand-text-secondary/40">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Pros / Cons */}
          {((provider.pros && provider.pros.length > 0) ||
            (provider.cons && provider.cons.length > 0)) && (
            <section className="grid md:grid-cols-2 gap-4">
              {/* Pros */}
              {provider.pros && provider.pros.length > 0 && (
                <div className="bg-brand-success/5 rounded-2xl border border-brand-success/20 p-6 flex flex-col gap-3">
                  <h2 className="font-heading text-lg font-bold text-brand-success">
                    Pros
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {provider.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brand-text-primary">
                        <span className="text-brand-success mt-0.5 shrink-0">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cons */}
              {provider.cons && provider.cons.length > 0 && (
                <div className="bg-red-50 rounded-2xl border border-red-100 p-6 flex flex-col gap-3">
                  <h2 className="font-heading text-lg font-bold text-red-500">
                    Cons
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {provider.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brand-text-primary">
                        <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Review content */}
          {provider.review_content && (
            <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8">
              <BlogContent content={provider.review_content} />
            </section>
          )}

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="font-heading text-xl font-bold text-brand-text-primary">
                Alternatives to {provider.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {alternatives.map((alt) => (
                  <ProviderCard
                    key={alt._id}
                    provider={alt}
                    trackingSource={`review_${provider.slug}`}
                  />
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-6">
            <h2 className="font-heading text-xl font-bold text-brand-text-primary">
              Frequently Asked Questions
            </h2>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-semibold text-brand-text-primary">
                  Is {provider.name} legit?
                </h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  Yes, {provider.name} is a legitimate provider. Our team
                  independently evaluated it and gave it an overall score of{" "}
                  {overallScore.toFixed(1)}/10. As with any healthcare service, we
                  recommend consulting with a licensed medical professional
                  before starting any new treatment.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-semibold text-brand-text-primary">
                  How much does {provider.name} cost?
                </h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  {displayPrice !== null ? (
                    <>
                      {provider.name} starts at ${displayPrice} per month.{" "}
                      {provider.pricing && provider.pricing.length > 1
                        ? `Pricing varies by dose and formulation — see the pricing table above for a full breakdown.`
                        : ""}
                    </>
                  ) : (
                    <>
                      Pricing information for {provider.name} is available on
                      their official website. We recommend visiting their site
                      directly for the most up-to-date pricing.
                    </>
                  )}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
