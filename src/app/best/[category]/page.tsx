import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProviders } from "@/lib/data";
import { computeOverallScore } from "@/lib/scoring";
import type { Provider, DrugType } from "@/lib/types";
import RankedProviderCard from "@/components/providers/RankedProviderCard";
import QuickPicksTable from "@/components/providers/QuickPicksTable";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import JsonLd from "@/components/shared/JsonLd";
import PageHero from "@/components/marketing/PageHero";
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import DYORCallout from "@/components/marketing/DYORCallout";

interface CategoryDef {
  label: string;
  filter: (providers: Provider[]) => Provider[];
  targetKeyword: string;
  title: string;
  description: string;
  intro: string;
  drugFilter?: DrugType;
  related: string[];
}

function minPriceForDrug(p: Provider, drug: DrugType): number {
  const entries = p.pricing.filter((pr) => pr.drug === drug);
  if (entries.length === 0) return Infinity;
  return Math.min(...entries.map((pr) => pr.promo_price ?? pr.monthly_cost));
}

const CATEGORY_MAP: Record<string, CategoryDef> = {
  "semaglutide-providers": {
    label: "Semaglutide Providers",
    filter: (providers) =>
      providers.filter((p) =>
        p.pricing.some((pr) => pr.drug === "semaglutide")
      ),
    targetKeyword: "semaglutide providers",
    title: "Best Semaglutide Providers in 2026 | Compare Prices & Reviews",
    description:
      "Compare 25+ semaglutide providers ranked by price, trust, and effectiveness. See real monthly costs, score breakdowns, and the cheapest legit options for 2026.",
    intro:
      "Looking for a trusted semaglutide provider? We independently scored every major telehealth clinic offering compounded and brand-name semaglutide in 2026. Each provider is evaluated on pricing transparency, clinical oversight, shipping, and user experience — so you can find a legitimate, affordable option without falling for sketchy ads.",
    drugFilter: "semaglutide",
    related: [
      "cheapest-semaglutide",
      "compounded-semaglutide",
      "tirzepatide-providers",
    ],
  },
  "tirzepatide-providers": {
    label: "Tirzepatide Providers",
    filter: (providers) =>
      providers.filter((p) =>
        p.pricing.some((pr) => pr.drug === "tirzepatide")
      ),
    targetKeyword: "tirzepatide providers",
    title: "Best Tirzepatide Providers in 2026 | Compare Prices & Reviews",
    description:
      "Best tirzepatide telehealth providers of 2026. Compare monthly costs, trust scores, and the cheapest compounded and brand-name tirzepatide options ranked by experts.",
    intro:
      "Tirzepatide (the active ingredient in Mounjaro and Zepbound) is the most effective GLP-1 medication on the market for weight loss. We ranked every major US telehealth provider offering tirzepatide in 2026 — compounded and brand-name — based on price, clinical care, shipping speed, and reputation. Use this list to find a legitimate provider before paying retail.",
    drugFilter: "tirzepatide",
    related: [
      "cheapest-tirzepatide",
      "compounded-tirzepatide",
      "semaglutide-providers",
    ],
  },
  "compounded-semaglutide": {
    label: "Compounded Semaglutide Providers",
    filter: (providers) =>
      providers.filter((p) =>
        p.pricing.some(
          (pr) => pr.drug === "semaglutide" && pr.form === "compounded"
        )
      ),
    targetKeyword: "compounded semaglutide",
    title: "Compounded Semaglutide: Best Telehealth Providers 2026",
    description:
      "The best compounded semaglutide telehealth providers in 2026. LegitScript-verified pharmacies, transparent pricing, monthly costs, and expert rankings.",
    intro:
      "Compounded semaglutide is a low-cost alternative to brand-name Wegovy and Ozempic, made by 503A and 503B pharmacies under physician supervision. We ranked the most reputable telehealth clinics offering compounded semaglutide in 2026 by price, pharmacy verification, clinical care, and shipping. Every provider on this list ships nationwide.",
    drugFilter: "semaglutide",
    related: [
      "semaglutide-providers",
      "cheapest-semaglutide",
      "compounded-tirzepatide",
    ],
  },
  "compounded-tirzepatide": {
    label: "Compounded Tirzepatide Providers",
    filter: (providers) =>
      providers.filter((p) =>
        p.pricing.some(
          (pr) => pr.drug === "tirzepatide" && pr.form === "compounded"
        )
      ),
    targetKeyword: "compounded tirzepatide",
    title: "Compounded Tirzepatide: Best Telehealth Providers 2026",
    description:
      "Top compounded tirzepatide providers ranked for 2026. Compare prices, pharmacy verification, and trust scores. Cheaper than brand-name Mounjaro and Zepbound.",
    intro:
      "Compounded tirzepatide gives you the same active ingredient found in Mounjaro and Zepbound at a fraction of the retail price. We ranked the most trusted telehealth providers shipping compounded tirzepatide in 2026 by clinical oversight, pharmacy reputation, monthly cost, and user experience.",
    drugFilter: "tirzepatide",
    related: [
      "tirzepatide-providers",
      "cheapest-tirzepatide",
      "compounded-semaglutide",
    ],
  },
  "cheapest-semaglutide": {
    label: "Cheapest Semaglutide Providers",
    filter: (providers) =>
      providers
        .filter((p) =>
          p.pricing.some((pr) => pr.drug === "semaglutide")
        )
        .sort(
          (a, b) =>
            minPriceForDrug(a, "semaglutide") -
            minPriceForDrug(b, "semaglutide")
        ),
    targetKeyword: "cheapest semaglutide",
    title: "Cheapest Semaglutide: Lowest Prices from 25+ Providers (2026)",
    description:
      "The absolute cheapest semaglutide providers in 2026 — ranked by lowest monthly price. Real costs, no hidden fees, only legitimate telehealth clinics.",
    intro:
      "Looking for the cheapest semaglutide in 2026? We ranked every legitimate telehealth provider in our database by their lowest published monthly price for semaglutide. No bait-and-switch teaser pricing — only providers that publish real, transparent costs. Compare and pick the lowest legit option below.",
    drugFilter: "semaglutide",
    related: [
      "semaglutide-providers",
      "compounded-semaglutide",
      "cheapest-tirzepatide",
    ],
  },
  "cheapest-tirzepatide": {
    label: "Cheapest Tirzepatide Providers",
    filter: (providers) =>
      providers
        .filter((p) =>
          p.pricing.some((pr) => pr.drug === "tirzepatide")
        )
        .sort(
          (a, b) =>
            minPriceForDrug(a, "tirzepatide") -
            minPriceForDrug(b, "tirzepatide")
        ),
    targetKeyword: "cheapest tirzepatide",
    title: "Cheapest Tirzepatide: Lowest Prices from 25+ Providers (2026)",
    description:
      "The cheapest tirzepatide telehealth providers of 2026 ranked by lowest monthly price. Compounded and brand-name. No teaser pricing — real monthly costs only.",
    intro:
      "Tirzepatide is the most effective GLP-1 weight loss medication, but retail prices can hit $1,000+/month. We ranked every legitimate telehealth provider offering tirzepatide by their lowest published monthly cost for 2026 — so you can find a real, affordable option without falling for hidden-fee pricing.",
    drugFilter: "tirzepatide",
    related: [
      "tirzepatide-providers",
      "compounded-tirzepatide",
      "cheapest-semaglutide",
    ],
  },
  "weight-loss-programs": {
    label: "Weight Loss Programs",
    filter: (providers) =>
      providers.filter((p) => p.category === "Weight Loss Program"),
    targetKeyword: "weight loss programs",
    title: "Best Weight Loss Programs in 2026 — Ranked & Reviewed",
    description:
      "We independently tested and ranked the top weight loss programs of 2026. See scores, pricing, pros and cons, and expert picks.",
    intro:
      "We independently evaluated and scored the top weight loss programs of 2026 based on value, effectiveness, user experience, and more.",
    related: ["semaglutide-providers", "meal-delivery-for-weight-loss"],
  },
  "weight-loss-supplements": {
    label: "Weight Loss Supplements",
    filter: (providers) => providers.filter((p) => p.category === "Supplement"),
    targetKeyword: "weight loss supplements",
    title: "Best Weight Loss Supplements in 2026 — Ranked & Reviewed",
    description:
      "We independently tested and ranked the top weight loss supplements of 2026. See scores, pricing, pros and cons, and expert picks.",
    intro:
      "We independently evaluated and scored the top weight loss supplements of 2026 based on value, effectiveness, user experience, and more.",
    related: ["weight-loss-programs", "fitness-apps-for-weight-loss"],
  },
  "meal-delivery-for-weight-loss": {
    label: "Meal Delivery for Weight Loss",
    filter: (providers) =>
      providers.filter((p) => p.category === "Meal Delivery"),
    targetKeyword: "meal delivery for weight loss",
    title: "Best Meal Delivery for Weight Loss in 2026 — Ranked & Reviewed",
    description:
      "We independently tested and ranked the top meal delivery services for weight loss in 2026. See pricing, pros and cons, and expert picks.",
    intro:
      "We independently evaluated and scored the top meal delivery services for weight loss in 2026.",
    related: ["weight-loss-programs", "weight-loss-supplements"],
  },
  "fitness-apps-for-weight-loss": {
    label: "Fitness Apps for Weight Loss",
    filter: (providers) =>
      providers.filter((p) => p.category === "Fitness App"),
    targetKeyword: "fitness apps for weight loss",
    title: "Best Fitness Apps for Weight Loss in 2026 — Ranked & Reviewed",
    description:
      "We independently tested and ranked the top fitness apps for weight loss in 2026. See pricing, pros and cons, and expert picks.",
    intro:
      "We independently evaluated and scored the top fitness apps for weight loss in 2026.",
    related: ["weight-loss-programs", "weight-loss-supplements"],
  },
};

// Cohesive editorial photography — same warm, natural-light,
// cream-palette aesthetic used on the homepage hero and category cards.
const CATEGORY_HERO_IMAGE: Record<string, string> = {
  "semaglutide-providers":
    "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1600&q=80&auto=format&fit=crop",
  "tirzepatide-providers":
    "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1600&q=80&auto=format&fit=crop",
  "compounded-semaglutide":
    "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=1600&q=80&auto=format&fit=crop",
  "compounded-tirzepatide":
    "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?w=1600&q=80&auto=format&fit=crop",
  "cheapest-semaglutide":
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1600&q=80&auto=format&fit=crop",
  "cheapest-tirzepatide":
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1600&q=80&auto=format&fit=crop",
  "weight-loss-programs":
    "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?w=1600&q=80&auto=format&fit=crop",
  "weight-loss-supplements":
    "https://images.unsplash.com/photo-1576086265779-619d2f54d96b?w=1600&q=80&auto=format&fit=crop",
  "meal-delivery-for-weight-loss":
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80&auto=format&fit=crop",
  "fitness-apps-for-weight-loss":
    "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?w=1600&q=80&auto=format&fit=crop",
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
  const def = CATEGORY_MAP[category];
  if (!def) return {};

  const { title, description } = def;

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

function getMinPrice(provider: Provider, drug?: DrugType): string {
  if (!provider.pricing || provider.pricing.length === 0) return "—";
  const entries = drug
    ? provider.pricing.filter((p) => p.drug === drug)
    : provider.pricing;
  if (entries.length === 0) return "—";
  const min = Math.min(
    ...entries.map((p) => p.promo_price ?? p.monthly_cost)
  );
  return `$${min}/mo`;
}

export default async function RankingsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const def = CATEGORY_MAP[category];

  if (!def) {
    notFound();
  }

  const { label, filter, drugFilter, intro, related } = def;
  const all = await getAllProviders();
  const providers: Provider[] = filter(all);

  // For "cheapest-*" the filter already sorts by price; preserve that.
  // For all others, sort by overall score descending.
  const isCheapest = category.startsWith("cheapest-");
  const sorted = isCheapest
    ? providers
    : [...providers].sort(
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
          { name: label, url: `/best/${category}` },
        ]}
      />
      {CATEGORY_HERO_IMAGE[category] && (
        <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-brand-text-primary">
          <Image
            src={CATEGORY_HERO_IMAGE[category]}
            alt={label}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">
                Updated {updatedDate} · Expert Reviewed
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl">
                {label.startsWith("Best") || label.startsWith("Cheapest") || label.startsWith("Compounded")
                  ? label
                  : `Best ${label}`}{" "}
                in 2026
              </h1>
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">

        {!CATEGORY_HERO_IMAGE[category] && (
          <PageHero
            badges={[
              { icon: "📅", text: `Updated ${updatedDate}` },
              { icon: "✅", text: "Expert Reviewed" },
            ]}
            title={
              <>
                {label.startsWith("Best") || label.startsWith("Cheapest") || label.startsWith("Compounded")
                  ? label
                  : `Best ${label}`}{" "}
                in 2026 —{" "}
                <span className="bg-brand-gradient bg-clip-text text-transparent">
                  Ranked &amp; Reviewed
                </span>
              </>
            }
            subtitle={intro}
          >
            <AffiliateDisclosure />
          </PageHero>
        )}

        {CATEGORY_HERO_IMAGE[category] && (
          <div className="space-y-4">
            <p className="text-lg text-brand-text-secondary leading-relaxed max-w-3xl">
              {intro}
            </p>
            <AffiliateDisclosure />
          </div>
        )}

        <DYORCallout variant="compact" />

        {/* Quick links to sibling money pages */}
        {related.length > 0 && (
          <nav
            aria-label="Related rankings"
            className="flex flex-wrap gap-2"
          >
            <span className="text-xs uppercase tracking-wide text-brand-text-secondary font-semibold mr-1 self-center">
              Related:
            </span>
            {related.map((slug) => {
              const r = CATEGORY_MAP[slug];
              if (!r) return null;
              return (
                <Link
                  key={slug}
                  href={`/best/${slug}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-white border border-brand-violet/20 text-brand-text-primary hover:border-brand-violet/50 hover:bg-brand-violet/5 transition"
                >
                  {r.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Compounding pharmacy callout — only on compounded categories */}
        {(category === "compounded-semaglutide" ||
          category === "compounded-tirzepatide") && (
          <div className="rounded-xl border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
            <strong className="text-brand-text-primary">
              Looking for the pharmacies behind these compounded medications?
            </strong>{" "}
            See our{" "}
            <Link
              href="/pharmacies"
              className="text-brand-violet underline font-semibold"
            >
              compounding pharmacy directory
            </Link>{" "}
            with 503A/503B status, PCAB accreditation, and regulatory standing.
          </div>
        )}

        {/* Quick picks table */}
        <QuickPicksTable
          rows={top5.map((provider) => ({
            provider,
            priceLabel: getMinPrice(provider, drugFilter),
          }))}
          trackingSource={`rankings_${category}`}
        />

        {/* Detailed reviews */}
        {sorted.length > 0 && (
          <section aria-labelledby="detailed-reviews-heading" className="space-y-8">
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
                priceLabel="Starting from"
                priceValue={getMinPrice(provider, drugFilter)}
                trackingSource={`rankings_${category}`}
              />
            ))}
          </section>
        )}

        {/* Empty state */}
        {sorted.length === 0 && (
          <div className="bg-white rounded-2xl border border-brand-violet/10 p-12 text-center text-brand-text-secondary">
            No providers found in this category yet. Check back soon.
          </div>
        )}

        {/* Related rankings */}
        {related.length > 0 && (
          <section
            aria-labelledby="related-rankings-heading"
            className="bg-white rounded-2xl border border-brand-violet/10 p-6"
          >
            <h2
              id="related-rankings-heading"
              className="text-lg font-bold text-brand-text-primary mb-4"
            >
              Related Rankings
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((slug) => {
                const r = CATEGORY_MAP[slug];
                if (!r) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/best/${slug}`}
                      className="block p-3 rounded-xl border border-brand-violet/10 hover:border-brand-violet/40 hover:bg-brand-violet/5 transition"
                    >
                      <div className="font-semibold text-brand-text-primary text-sm">
                        {r.label}
                      </div>
                      <div className="text-xs text-brand-text-secondary mt-1">
                        {r.targetKeyword}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <FAQSection items={FAQ_ITEMS} />
      </div>
    </main>
  );
}
