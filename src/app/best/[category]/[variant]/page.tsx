import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProviders } from "@/lib/data";
import { computeOverallScore } from "@/lib/scoring";
import type { Provider } from "@/lib/types";
import {
  ALL_VARIANTS,
  findVariant,
  type VariantConfig,
} from "@/lib/variants";
import RankedProviderCard from "@/components/providers/RankedProviderCard";
import QuickPicksTable from "@/components/providers/QuickPicksTable";
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

        <QuickPicksTable
          rows={top5.map((provider) => ({
            provider,
            priceLabel: formatPrice(getMatchingMinPrice(provider, cfg)),
          }))}
          trackingSource={`variant_${cfg.category}_${cfg.variant}`}
          priceHeading={cfg.doseDisplay ? `${cfg.doseDisplay} Price` : "From"}
          showBestFor={false}
        />

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
              <RankedProviderCard
                key={provider._id}
                provider={provider}
                rank={index + 1}
                priceLabel={
                  cfg.doseDisplay
                    ? `${cfg.doseDisplay} from`
                    : "Starting from"
                }
                priceValue={formatPrice(getMatchingMinPrice(provider, cfg))}
                trackingSource={`variant_${cfg.category}_${cfg.variant}`}
                showProsCons={false}
              />
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
