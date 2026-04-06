import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProvidersByCategory } from "@/lib/data";
import { computeOverallScore, SCORE_DIMENSIONS } from "@/lib/scoring";
import type { Provider } from "@/lib/types";
import ScoreBadge from "@/components/providers/ScoreBadge";
import CTAButton from "@/components/shared/CTAButton";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import JsonLd from "@/components/shared/JsonLd";
import PageHero from "@/components/marketing/PageHero";
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

const CATEGORY_MAP: Record<string, string> = {
  "semaglutide-providers": "GLP-1 Provider",
  "weight-loss-programs": "Weight Loss Program",
  "weight-loss-supplements": "Supplement",
  "meal-delivery-for-weight-loss": "Meal Delivery",
  "fitness-apps-for-weight-loss": "Fitness App",
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_MAP[category];
  if (!label) return {};

  const title = `Best ${label}s in 2026 — Ranked & Reviewed`;
  const description = `We independently tested and ranked the top ${label.toLowerCase()}s of 2026. See scores, pricing, pros and cons, and expert picks to find the best option for you.`;

  return {
    title,
    description,
    alternates: { canonical: `/best/${category}` },
    openGraph: {
      title,
      description,
      url: `/best/${category}`,
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

const FAQ_ITEMS = [
  {
    question: "How do you rank and score these providers?",
    answer:
      "Each provider is evaluated across six weighted dimensions: Value (25%), Effectiveness (25%), User Experience (15%), Trust & Safety (15%), Accessibility (10%), and Support (10%). We research publicly available information, user reviews, clinical evidence, and pricing data, then compute a weighted overall score out of 10.",
  },
  {
    question: "Are your rankings independent?",
    answer:
      "Our editorial rankings and scores are determined independently of commercial relationships. Some providers on this page may have affiliate agreements with us — meaning we earn a commission if you click through and make a purchase — but this does not influence rankings. Sponsored placements are clearly labeled.",
  },
  {
    question: "How often are the rankings updated?",
    answer:
      "Rankings are reviewed and updated on a rolling basis as pricing, availability, and clinical evidence changes. The 'Updated' badge at the top of the page reflects the most recent review date.",
  },
];

function getMinPrice(provider: Provider): string {
  if (!provider.pricing || provider.pricing.length === 0) return "—";
  const min = Math.min(...provider.pricing.map((p) => p.monthly_cost));
  return `$${min}/mo`;
}

export default async function RankingsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const label = CATEGORY_MAP[category];

  if (!label) {
    notFound();
  }

  const providers: Provider[] = await getProvidersByCategory(label);

  const sorted = [...providers].sort(
    (a, b) => computeOverallScore(b.scores) - computeOverallScore(a.scores)
  );

  const top5 = sorted.slice(0, 5);
  const updatedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sorted.map((provider, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: provider.name,
      url: `https://weightlossrankings.org/reviews/${provider.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={itemListSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Best", url: "/best" },
          { name: `Best ${label}s`, url: `/best/${category}` },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">

        <PageHero
          badges={[
            { icon: "📅", text: `Updated ${updatedDate}` },
            { icon: "✅", text: "Expert Reviewed" },
          ]}
          title={
            <>
              Best {label}s in 2026 —{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Ranked &amp; Reviewed
              </span>
            </>
          }
          subtitle={`We independently evaluated and scored the top ${label.toLowerCase()}s of 2026 based on value, effectiveness, user experience, and more. Here are our expert picks.`}
        >
          <AffiliateDisclosure />
        </PageHero>

        {/* Quick picks table */}
        {top5.length > 0 && (
          <section aria-labelledby="quick-picks-heading">
            <h2
              id="quick-picks-heading"
              className="text-xl font-bold text-brand-text-primary mb-4"
            >
              Quick Picks: Top {top5.length}
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-violet/10">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                      <th className="py-3 px-4 text-left w-8">#</th>
                      <th className="py-3 px-4 text-left">Provider</th>
                      <th className="py-3 px-4 text-center">Score</th>
                      <th className="py-3 px-4 text-left hidden sm:table-cell">
                        Best For
                      </th>
                      <th className="py-3 px-4 text-left hidden md:table-cell">
                        From
                      </th>
                      <th className="py-3 px-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {top5.map((provider, index) => {
                      const score = computeOverallScore(provider.scores);
                      return (
                        <tr
                          key={provider._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 font-bold text-brand-text-secondary">
                            {index + 1}
                          </td>
                          <td className="py-3 px-4 font-semibold text-brand-text-primary">
                            {provider.name}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="font-bold text-base bg-brand-gradient bg-clip-text text-transparent">
                              {score.toFixed(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-brand-text-secondary hidden sm:table-cell">
                            {provider.best_for ?? "—"}
                          </td>
                          <td className="py-3 px-4 text-brand-text-secondary hidden md:table-cell">
                            {getMinPrice(provider)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <CTAButton
                              href={provider.affiliate_url}
                              external
                              size="sm"
                              trackProvider={provider.slug}
                              trackSource={`rankings_${category}`}
                            >
                              Visit
                            </CTAButton>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Detailed reviews */}
        {sorted.length > 0 && (
          <section aria-labelledby="detailed-reviews-heading" className="space-y-8">
            <h2
              id="detailed-reviews-heading"
              className="text-xl font-bold text-brand-text-primary"
            >
              Detailed Reviews
            </h2>

            {sorted.map((provider, index) => {
              return (
                <div
                  key={provider._id}
                  className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm overflow-hidden"
                >
                  {/* Card header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      {/* Rank number */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gradient text-white font-extrabold text-lg flex items-center justify-center">
                        {index + 1}
                      </div>

                      {/* Name + best_for */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-brand-text-primary leading-tight">
                          {provider.name}
                        </h3>
                        {provider.best_for && (
                          <p className="text-sm text-brand-text-secondary mt-0.5">
                            Best for: {provider.best_for}
                          </p>
                        )}
                      </div>

                      {/* Score badge */}
                      <ScoreBadge scores={provider.scores} size="lg" />
                    </div>

                    {/* Description */}
                    {provider.description && (
                      <p className="mt-4 text-brand-text-secondary leading-relaxed text-sm">
                        {provider.description}
                      </p>
                    )}
                  </div>

                  {/* Score dimensions grid */}
                  <div className="p-6 border-b border-gray-100">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary mb-3">
                      Score Breakdown
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {SCORE_DIMENSIONS.map((dim) => {
                        const dimScore =
                          provider.scores[dim.key as keyof typeof provider.scores];
                        return (
                          <div
                            key={dim.key}
                            className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-brand-text-secondary font-medium">
                                {dim.label}
                              </span>
                              <span className="text-xs text-brand-text-secondary/60">
                                {dim.weight}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-brand-gradient rounded-full"
                                  style={{ width: `${(dimScore / 10) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-bold text-brand-text-primary w-6 text-right">
                                {dimScore}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pros / Cons */}
                  {((provider.pros && provider.pros.length > 0) ||
                    (provider.cons && provider.cons.length > 0)) && (
                    <div className="p-6 border-b border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {provider.pros && provider.pros.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-success mb-2">
                              Pros
                            </h4>
                            <ul className="space-y-1.5">
                              {provider.pros.map((pro, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-brand-text-secondary"
                                >
                                  <span className="text-brand-success mt-0.5 flex-shrink-0">
                                    ✓
                                  </span>
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {provider.cons && provider.cons.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                              Cons
                            </h4>
                            <ul className="space-y-1.5">
                              {provider.cons.map((con, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-brand-text-secondary"
                                >
                                  <span className="text-red-400 mt-0.5 flex-shrink-0">
                                    ✗
                                  </span>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CTA footer */}
                  <div className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                    <div className="text-sm text-brand-text-secondary">
                      Starting from{" "}
                      <span className="font-semibold text-brand-text-primary">
                        {getMinPrice(provider)}
                      </span>
                    </div>
                    <CTAButton
                      href={provider.affiliate_url}
                      external
                      size="md"
                      trackProvider={provider.slug}
                      trackSource={`rankings_${category}`}
                    >
                      Visit {provider.name} →
                    </CTAButton>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Empty state */}
        {sorted.length === 0 && (
          <div className="bg-white rounded-2xl border border-brand-violet/10 p-12 text-center text-brand-text-secondary">
            No providers found in this category yet. Check back soon.
          </div>
        )}

        <FAQSection items={FAQ_ITEMS} />
      </div>
    </main>
  );
}
