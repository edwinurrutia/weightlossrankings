import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProviderSlugs,
  getProviderBySlug,
  getProvidersByCategory,
} from "@/lib/data";
import { computeOverallScore } from "@/lib/scoring";
import type { Provider } from "@/lib/types";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import CTAButton from "@/components/shared/CTAButton";
import EmailCapture from "@/components/shared/EmailCapture";
import ProviderCard from "@/components/providers/ProviderCard";
import ScoreBadge from "@/components/providers/ScoreBadge";
import FeatureBadge from "@/components/providers/FeatureBadge";
import PageHero from "@/components/marketing/PageHero";
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

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

  const title = `${provider.name} Alternatives: Best Competitors in 2026`;
  const description = `Looking for ${provider.name} alternatives? Compare the top-rated competitors by price, effectiveness, and user experience. Find the best GLP-1 provider for you.`;

  return {
    title,
    description,
    alternates: { canonical: `/alternatives/${slug}` },
    openGraph: {
      title,
      description,
      url: `/alternatives/${slug}`,
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

function getMinPrice(provider: Provider): number | null {
  if (!provider.pricing || provider.pricing.length === 0) return null;
  return provider.pricing.reduce((min, p) => {
    const effective = p.promo_price ?? p.monthly_cost;
    return effective < min ? effective : min;
  }, provider.pricing[0].promo_price ?? provider.pricing[0].monthly_cost);
}

function getComparisonAdvantage(alt: Provider, original: Provider): string {
  const altMinPrice = getMinPrice(alt);
  const origMinPrice = getMinPrice(original);

  if (
    altMinPrice !== null &&
    origMinPrice !== null &&
    altMinPrice < origMinPrice
  ) {
    const diff = origMinPrice - altMinPrice;
    return `$${diff}/mo cheaper`;
  }

  const altStates = alt.states_available?.length ?? 0;
  const origStates = original.states_available?.length ?? 0;
  if (altStates > origStates) {
    return "Available in more states";
  }

  const altScore = computeOverallScore(alt.scores);
  const origScore = computeOverallScore(original.scores);
  if (altScore > origScore) {
    return "Higher-rated overall";
  }

  return "Similar pricing with different features";
}

function buildWhyLookSection(provider: Provider): string {
  const cons = provider.cons ?? [];
  if (cons.length >= 2) {
    return `Many users explore alternatives to ${provider.name} due to concerns like "${cons[0]}" and "${cons[1]}". Other common reasons include price differences, state availability, or wanting a different formulation or level of support. Finding the right GLP-1 provider often comes down to matching your budget, location, and personal preferences.`;
  }
  if (cons.length === 1) {
    return `Some users look for alternatives to ${provider.name} because of "${cons[0]}". Price, availability in your state, the type of medication offered, and the level of ongoing support are all important factors that may lead you to explore other options.`;
  }
  return `People search for ${provider.name} alternatives for many reasons: pricing, availability in their state, preferred medication formulation, or level of clinical support. Exploring competitors helps ensure you find the provider that best fits your unique needs and goals.`;
}

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider: slug } = await params;

  const provider: Provider | null = await getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  // Fetch alternatives: same category, excluding self, sorted by score desc, top 8
  let alternatives: Provider[] = [];
  if (provider.category) {
    const categoryProviders: Provider[] = await getProvidersByCategory(
      provider.category
    );
    alternatives = categoryProviders
      .filter((p) => p.slug !== provider.slug)
      .sort(
        (a, b) => computeOverallScore(b.scores) - computeOverallScore(a.scores)
      )
      .slice(0, 8);
  }

  const origMinPrice = getMinPrice(provider);

  // Top 5 for comparison table
  const tableAlternatives = alternatives.slice(0, 5);

  const faqItems = [
    {
      question: `Why switch from ${provider.name}?`,
      answer: `There are several valid reasons to look beyond ${provider.name}. Users commonly switch due to pricing, limited state availability, changes in medication supply, or wanting more (or less) hands-on clinical support. The alternatives listed above were selected based on overall score, value, and user experience — one of them may be a better fit for your situation.`,
    },
    {
      question: `Are these alternatives cheaper than ${provider.name}?`,
      answer:
        origMinPrice !== null
          ? `${provider.name} starts at $${origMinPrice}/mo. Some alternatives on this page are priced lower, while others may cost more but offer additional features or a higher level of care. We recommend comparing the full pricing breakdowns on each provider's page to find the best value for your budget.`
          : `Pricing varies across providers. We recommend visiting each alternative's page for up-to-date pricing, as costs can change based on medication dose, formulation, and any active promotions.`,
    },
    {
      question: `Which alternative is most similar to ${provider.name}?`,
      answer: `The top-ranked alternative on this page is the most similar based on our scoring across value, effectiveness, user experience, trust, accessibility, and support. If you're looking for a near drop-in replacement, start there. Each provider card includes a quick comparison note highlighting the key difference versus ${provider.name}.`,
    },
  ];

  const whyLookContent = buildWhyLookSection(provider);

  return (
    <main className="min-h-screen bg-brand-gradient-light">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Alternatives", url: "/alternatives" },
          {
            name: `${provider.name} Alternatives`,
            url: `/alternatives/${slug}`,
          },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-10">

        <PageHero
          title={
            <>
              Best{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Alternatives
              </span>{" "}
              to {provider.name}
            </>
          }
          subtitle={`Looking for alternatives to ${provider.name}? Here are the top-rated competitors we recommend based on price, effectiveness, and user experience.`}
        >
          <AffiliateDisclosure />
        </PageHero>

        {/* Why look for alternatives */}
        <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-3">
          <h2 className="font-heading text-xl font-bold text-brand-text-primary">
            Why look for alternatives?
          </h2>
          <p className="text-brand-text-secondary leading-relaxed text-sm">
            {whyLookContent}
          </p>
        </section>

        {/* Original provider card */}
        <section className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary/60">
            You&apos;re looking at:
          </p>
          <div className="opacity-70">
            <ProviderCard
              provider={provider}
              trackingSource={`alternatives_${provider.slug}`}
            />
          </div>
        </section>

        {/* Top Alternatives */}
        {alternatives.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="font-heading text-xl font-bold text-brand-text-primary">
              Top Alternatives
            </h2>
            <div className="flex flex-col gap-5">
              {alternatives.map((alt, index) => {
                const advantage = getComparisonAdvantage(alt, provider);
                const altMinPrice = getMinPrice(alt);

                return (
                  <div
                    key={alt._id}
                    className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 flex flex-col gap-4"
                  >
                    {/* Rank + score badge row */}
                    <div className="flex items-center gap-4">
                      <span className="w-9 h-9 rounded-full bg-brand-violet/10 text-brand-violet font-bold text-lg flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <ScoreBadge scores={alt.scores} size="md" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading font-bold text-lg text-brand-text-primary leading-tight truncate">
                          {alt.name}
                        </span>
                        {alt.best_for && (
                          <span className="text-xs text-brand-text-secondary">
                            Best for: {alt.best_for}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Comparison note */}
                    <div className="rounded-xl bg-brand-violet/5 border border-brand-violet/10 px-4 py-2.5 text-sm text-brand-text-secondary">
                      <span className="font-semibold text-brand-violet">
                        Compared to {provider.name}:
                      </span>{" "}
                      {advantage}
                    </div>

                    {/* Features */}
                    {alt.features && alt.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {alt.features.slice(0, 4).map((feature) => (
                          <FeatureBadge
                            key={feature}
                            label={feature}
                            variant="default"
                          />
                        ))}
                      </div>
                    )}

                    {/* Price + CTA */}
                    <div className="flex items-center gap-4 flex-wrap">
                      {altMinPrice !== null && (
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold bg-brand-gradient bg-clip-text text-transparent">
                            ${altMinPrice}
                          </span>
                          <span className="text-sm text-brand-text-secondary">
                            /mo
                          </span>
                        </div>
                      )}
                      {alt.affiliate_url && (
                        <CTAButton
                          href={alt.affiliate_url}
                          external
                          size="md"
                          trackProvider={alt.slug}
                          trackSource={`alternatives_${provider.slug}`}
                        >
                          Visit {alt.name}
                        </CTAButton>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Comparison table — top 5 */}
        {tableAlternatives.length > 0 && (
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-brand-text-primary">
              Quick Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-4 font-semibold text-brand-text-primary">
                      Provider
                    </th>
                    <th className="text-left py-2 pr-4 font-semibold text-brand-text-primary">
                      Score
                    </th>
                    <th className="text-left py-2 pr-4 font-semibold text-brand-text-primary">
                      From
                    </th>
                    <th className="text-left py-2 pr-4 font-semibold text-brand-text-primary">
                      Best For
                    </th>
                    <th className="text-left py-2 font-semibold text-brand-text-primary">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableAlternatives.map((alt) => {
                    const altMinPrice = getMinPrice(alt);
                    const altScore = computeOverallScore(alt.scores);
                    return (
                      <tr
                        key={alt._id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-2.5 pr-4 font-medium text-brand-text-primary">
                          {alt.name}
                        </td>
                        <td className="py-2.5 pr-4 text-brand-text-secondary">
                          {altScore.toFixed(1)}/10
                        </td>
                        <td className="py-2.5 pr-4 text-brand-text-secondary">
                          {altMinPrice !== null ? `$${altMinPrice}/mo` : "—"}
                        </td>
                        <td className="py-2.5 pr-4 text-brand-text-secondary">
                          {alt.best_for ?? "—"}
                        </td>
                        <td className="py-2.5">
                          {alt.affiliate_url ? (
                            <CTAButton
                              href={alt.affiliate_url}
                              external
                              size="sm"
                              trackProvider={alt.slug}
                              trackSource={`alternatives_${provider.slug}`}
                            >
                              Visit
                            </CTAButton>
                          ) : (
                            <span className="text-brand-text-secondary/40">
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <FAQSection items={faqItems} />

        {/* Email capture */}
        <EmailCapture
          heading={`Compare More ${provider.name} Alternatives`}
          description="Get our free GLP-1 comparison guide plus weekly price alerts and new provider reviews."
          source={`alternatives_${provider.slug}`}
        />
      </div>
    </main>
  );
}
