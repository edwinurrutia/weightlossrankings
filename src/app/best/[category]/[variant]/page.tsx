import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProviders } from "@/lib/data";
import { computeOverallScore, SCORE_DIMENSIONS } from "@/lib/scoring";
import type { Provider } from "@/lib/types";
import {
  ALL_VARIANTS,
  findVariant,
  type VariantConfig,
} from "@/lib/variants";
import ScoreBadge from "@/components/providers/ScoreBadge";
import CTAButton from "@/components/shared/CTAButton";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import JsonLd from "@/components/shared/JsonLd";
import PageHero from "@/components/marketing/PageHero";
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

export function generateStaticParams() {
  return ALL_VARIANTS.map(({ category, variant }) => ({ category, variant }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; variant: string }>;
}): Promise<Metadata> {
  const { category, variant } = await params;
  const cfg = findVariant(category, variant);
  if (!cfg) return {};

  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    alternates: { canonical: `/best/${category}/${variant}` },
    openGraph: {
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      url: `/best/${category}/${variant}`,
      type: "article",
      siteName: "WeightLossRankings",
    },
    twitter: {
      card: "summary_large_image",
      title: cfg.metaTitle,
      description: cfg.metaDescription,
    },
  };
}

// =====================================================================
// Filtering helpers
// =====================================================================

function providerMatches(provider: Provider, cfg: VariantConfig): boolean {
  if (!provider.pricing || provider.pricing.length === 0) return false;

  const hasMatch = provider.pricing.some((pr) => {
    if (pr.drug !== undefined && pr.drug !== cfg.drug) return false;
    if (cfg.formFilter && pr.form !== cfg.formFilter) return false;
    if (cfg.doseDisplay && pr.dose !== cfg.doseDisplay) return false;
    return true;
  });
  if (!hasMatch) return false;

  // For drug-only variants (no dose, no form), additionally require GLP-1 category.
  if (
    !cfg.doseDisplay &&
    !cfg.formFilter &&
    provider.category !== "GLP-1 Provider"
  ) {
    return false;
  }

  // HSA filter: provider features must mention HSA/FSA
  if (cfg.insuranceFilter === "hsa") {
    const features = provider.features ?? [];
    if (!features.some((f) => /HSA|FSA/i.test(f))) return false;
  }

  return true;
}

function getMatchingMinPrice(provider: Provider, cfg: VariantConfig): number {
  const matching = (provider.pricing ?? []).filter((pr) => {
    if (pr.drug !== undefined && pr.drug !== cfg.drug) return false;
    if (cfg.formFilter && pr.form !== cfg.formFilter) return false;
    if (cfg.doseDisplay && pr.dose !== cfg.doseDisplay) return false;
    return true;
  });
  if (matching.length === 0) return Number.POSITIVE_INFINITY;
  return Math.min(...matching.map((p) => p.promo_price ?? p.monthly_cost));
}

function formatPrice(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return `$${n}/mo`;
}

// =====================================================================
// Page
// =====================================================================

export default async function VariantPage({
  params,
}: {
  params: Promise<{ category: string; variant: string }>;
}) {
  const { category, variant } = await params;
  const cfg = findVariant(category, variant);
  if (!cfg) notFound();

  const all = await getAllProviders();
  const matched = all.filter((p) => providerMatches(p, cfg));

  const isCheapest = cfg.category.startsWith("cheapest-");
  const sorted = [...matched].sort((a, b) => {
    if (isCheapest) {
      return getMatchingMinPrice(a, cfg) - getMatchingMinPrice(b, cfg);
    }
    return computeOverallScore(b.scores) - computeOverallScore(a.scores);
  });

  const top5 = sorted.slice(0, 5);
  const updatedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const breadcrumbItems = cfg.parentExists
    ? [
        { name: "Home", url: "/" },
        { name: "Best", url: "/best" },
        { name: cfg.parentLabel, url: `/best/${cfg.category}` },
        { name: cfg.h1, url: `/best/${cfg.category}/${cfg.variant}` },
      ]
    : [
        { name: "Home", url: "/" },
        { name: "Best", url: "/best" },
        { name: cfg.h1, url: `/best/${cfg.category}/${cfg.variant}` },
      ];

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
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        <PageHero
          badges={[
            { icon: "📅", text: `Updated ${updatedDate}` },
            { icon: "✅", text: "Expert Reviewed" },
          ]}
          title={
            <>
              {cfg.h1.replace(" in 2026", "")} —{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Ranked &amp; Reviewed
              </span>
            </>
          }
          subtitle={cfg.intro}
        >
          <AffiliateDisclosure />
        </PageHero>

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
                      <th className="py-3 px-4 text-left hidden md:table-cell">
                        {cfg.doseDisplay ? `${cfg.doseDisplay} Price` : "From"}
                      </th>
                      <th className="py-3 px-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {top5.map((provider, index) => {
                      const score = computeOverallScore(provider.scores);
                      const price = getMatchingMinPrice(provider, cfg);
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
                          <td className="py-3 px-4 text-brand-text-secondary hidden md:table-cell">
                            {formatPrice(price)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <CTAButton
                              href={provider.affiliate_url}
                              external
                              size="sm"
                              trackProvider={provider.slug}
                              trackSource={`variant_${cfg.category}_${cfg.variant}`}
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

        {sorted.length > 0 && (
          <section
            aria-labelledby="detailed-reviews-heading"
            className="space-y-8"
          >
            <h2
              id="detailed-reviews-heading"
              className="text-xl font-bold text-brand-text-primary"
            >
              Detailed Reviews
            </h2>

            {sorted.map((provider, index) => (
              <div
                key={provider._id}
                className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gradient text-white font-extrabold text-lg flex items-center justify-center">
                      {index + 1}
                    </div>
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
                    <ScoreBadge scores={provider.scores} size="lg" />
                  </div>
                  {provider.description && (
                    <p className="mt-4 text-brand-text-secondary leading-relaxed text-sm">
                      {provider.description}
                    </p>
                  )}
                </div>

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

                <div className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="text-sm text-brand-text-secondary">
                    {cfg.doseDisplay
                      ? `${cfg.doseDisplay} from `
                      : "Starting from "}
                    <span className="font-semibold text-brand-text-primary">
                      {formatPrice(getMatchingMinPrice(provider, cfg))}
                    </span>
                  </div>
                  <CTAButton
                    href={provider.affiliate_url}
                    external
                    size="md"
                    trackProvider={provider.slug}
                    trackSource={`variant_${cfg.category}_${cfg.variant}`}
                  >
                    Visit {provider.name} →
                  </CTAButton>
                </div>
              </div>
            ))}
          </section>
        )}

        {sorted.length === 0 && (
          <div className="bg-white rounded-2xl border border-brand-violet/10 p-12 text-center text-brand-text-secondary">
            No providers match this variant yet. Check back soon — pricing data
            is being backfilled.
          </div>
        )}

        {cfg.parentExists && (
          <div className="text-center">
            <Link
              href={`/best/${cfg.category}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primary/80"
            >
              ← See all {cfg.parentLabel}
            </Link>
          </div>
        )}

        <FAQSection items={cfg.faqs} />
      </div>
    </main>
  );
}
