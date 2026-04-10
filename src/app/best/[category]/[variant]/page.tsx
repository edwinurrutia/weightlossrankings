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
import DYORCallout from "@/components/marketing/DYORCallout";
import Citation from "@/components/research/Citation";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";

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
      siteName: "Weight Loss Rankings",
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

  // -------------------------------------------------------------------
  // Build the per-variant citation list in document order. The numbering
  // below (n={CITE.methodology}, etc.) is derived from this array so the
  // SourcesPanel at the bottom renders in the same order as the inline
  // markers above.
  // -------------------------------------------------------------------
  const citationOrder: string[] = ["wlr-pricing-index"];

  if (cfg.formFilter === "compounded") {
    citationOrder.push("fda-503a-compounding", "fda-drug-shortage-list");
  } else if (cfg.formFilter === "brand" && cfg.drug === "semaglutide") {
    citationOrder.push("fda-wegovy-approval", "fda-ozempic-label");
  } else if (cfg.formFilter === "brand" && cfg.drug === "tirzepatide") {
    citationOrder.push("fda-zepbound-approval", "fda-mounjaro-label");
  }

  citationOrder.push(
    cfg.drug === "semaglutide" ? "step1-nejm-2021" : "surmount1-nejm-2022",
    "surmount5-nejm-2025",
  );

  if (cfg.insuranceFilter === "hsa") {
    citationOrder.push(
      "irs-pub-502-medical-expenses",
      "kff-medicaid-obesity-drug-coverage",
      "cms-medicaid-prescription-drugs",
    );
  } else if (cfg.insuranceFilter === "without") {
    citationOrder.push(
      "kff-medicaid-obesity-drug-coverage",
      "cms-medicaid-prescription-drugs",
    );
  }

  // Helper: 1-based display number for a source id. Returns 0 if the id
  // isn't in the current page's citation list (safety net).
  const n = (id: string): number => {
    const idx = citationOrder.indexOf(id);
    return idx === -1 ? 0 : idx + 1;
  };

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
    name: cfg.h1,
    description: `Ranked list of ${sorted.length} providers matching ${cfg.h1.toLowerCase()}.`,
    numberOfItems: sorted.length,
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

        <DYORCallout variant="compact" />

        {/* Methodology & regulatory grounding — variant-aware citations */}
        <section
          aria-labelledby="variant-methodology-heading"
          className="rounded-2xl border border-brand-violet/15 bg-white p-5 text-sm text-brand-text-secondary leading-relaxed space-y-3"
        >
          <h2
            id="variant-methodology-heading"
            className="text-sm font-semibold uppercase tracking-wider text-brand-text-primary"
          >
            Methodology &amp; sources
          </h2>
          <p>
            Providers in this variant are scored against our published{" "}
            <Link
              href="/methodology"
              className="text-brand-violet underline font-semibold"
            >
              six-factor rubric
            </Link>
            <Citation source="wlr-pricing-index" n={n("wlr-pricing-index")} />,
            then filtered to match the specific{" "}
            {cfg.doseDisplay ? "dose" : cfg.formFilter ? "form" : "criteria"}{" "}
            shown in the page title.
            {cfg.formFilter === "compounded" && (
              <>
                {" "}Compounded {cfg.drug} from licensed 503A and 503B
                pharmacies is legal under federal compounding law
                <Citation source="fda-503a-compounding" n={n("fda-503a-compounding")} />,
                and has been historically tolerated while {cfg.drug} has
                appeared on the FDA Drug Shortage List
                <Citation source="fda-drug-shortage-list" n={n("fda-drug-shortage-list")} />.
              </>
            )}
            {cfg.formFilter === "brand" && cfg.drug === "semaglutide" && (
              <>
                {" "}Brand-name Wegovy is separately FDA-approved for chronic
                weight management
                <Citation source="fda-wegovy-approval" n={n("fda-wegovy-approval")} />,
                with prescribing information maintained by the FDA
                <Citation source="fda-ozempic-label" n={n("fda-ozempic-label")} />.
              </>
            )}
            {cfg.formFilter === "brand" && cfg.drug === "tirzepatide" && (
              <>
                {" "}Brand-name Zepbound is separately FDA-approved for
                chronic weight management
                <Citation source="fda-zepbound-approval" n={n("fda-zepbound-approval")} />,
                and the Mounjaro label is maintained by the FDA for type 2
                diabetes
                <Citation source="fda-mounjaro-label" n={n("fda-mounjaro-label")} />.
              </>
            )}
          </p>
          <p>
            Published Phase 3 efficacy for{" "}
            {cfg.drug === "semaglutide" ? (
              <>
                semaglutide 2.4 mg (~14.9% mean weight loss over 68 weeks)
                comes from the STEP 1 trial
                <Citation source="step1-nejm-2021" n={n("step1-nejm-2021")} />
              </>
            ) : (
              <>
                tirzepatide (~20.9% mean weight loss at the 15 mg dose over 72
                weeks) comes from the SURMOUNT-1 trial
                <Citation source="surmount1-nejm-2022" n={n("surmount1-nejm-2022")} />
              </>
            )}
            . The SURMOUNT-5 head-to-head published in 2025 directly compared
            tirzepatide and semaglutide
            <Citation source="surmount5-nejm-2025" n={n("surmount5-nejm-2025")} />.
          </p>
          {cfg.insuranceFilter === "hsa" && (
            <p>
              Compounded and brand-name GLP-1s are generally FSA/HSA eligible
              with a valid prescription under IRS Publication 502
              <Citation source="irs-pub-502-medical-expenses" n={n("irs-pub-502-medical-expenses")} />.
              State Medicaid coverage of anti-obesity medications varies widely
              <Citation source="kff-medicaid-obesity-drug-coverage" n={n("kff-medicaid-obesity-drug-coverage")} />
              <Citation source="cms-medicaid-prescription-drugs" n={n("cms-medicaid-prescription-drugs")} />.
            </p>
          )}
          {cfg.insuranceFilter === "without" && (
            <p>
              This variant focuses on cash-pay access. Commercial and Medicaid
              coverage of anti-obesity medications varies widely by state and
              plan
              <Citation source="kff-medicaid-obesity-drug-coverage" n={n("kff-medicaid-obesity-drug-coverage")} />
              <Citation source="cms-medicaid-prescription-drugs" n={n("cms-medicaid-prescription-drugs")} />.
            </p>
          )}
        </section>

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

        <SourcesPanel
          sourceIds={citationOrder}
          heading="Sources & methodology"
          dataAsOf={getLatestVerificationDate()}
        />
      </div>
    </main>
  );
}
