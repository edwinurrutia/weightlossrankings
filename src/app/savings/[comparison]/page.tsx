import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SAVINGS_COMPARISONS,
  getComparisonBySlug,
  getCheapestCompoundedProvider,
  getCompoundedProvidersForDrug,
} from "@/lib/savings-comparisons";
import ProviderGrid from "@/components/providers/ProviderGrid";
import CTAButton from "@/components/shared/CTAButton";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import EmailCapture from "@/components/shared/EmailCapture";
import JsonLd from "@/components/shared/JsonLd";
import PageHero from "@/components/marketing/PageHero";
import StatGrid from "@/components/marketing/StatGrid";
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import DYORCallout from "@/components/marketing/DYORCallout";

export function generateStaticParams() {
  return SAVINGS_COMPARISONS.map((c) => ({ comparison: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ comparison: string }>;
}): Promise<Metadata> {
  const { comparison } = await params;
  const c = getComparisonBySlug(comparison);
  if (!c) return {};

  const cheapest = await getCheapestCompoundedProvider(c.brand_drug);
  const monthlySavings = cheapest
    ? c.brand_monthly_price - cheapest.monthly_cost
    : c.brand_monthly_price - 199;

  const title = `${c.brand_name} vs Compounded ${
    c.generic_name.charAt(0).toUpperCase() + c.generic_name.slice(1)
  }: Save $${monthlySavings.toLocaleString()}/Mo (2026)`;
  const description = `How much can you save switching from ${c.brand_name} to compounded ${c.generic_name}? See the full price comparison, top providers, and FDA safety info for 2026.`;

  return {
    title,
    description,
    alternates: { canonical: `/savings/${c.slug}` },
    openGraph: {
      title,
      description,
      url: `/savings/${c.slug}`,
      type: "article",
      siteName: "Weight Loss Rankings",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SavingsComparisonPage({
  params,
}: {
  params: Promise<{ comparison: string }>;
}) {
  const { comparison } = await params;
  const c = getComparisonBySlug(comparison);
  if (!c) notFound();

  const cheapest = await getCheapestCompoundedProvider(c.brand_drug);
  const compoundedPrice = cheapest?.monthly_cost ?? 199;
  const monthlySavings = c.brand_monthly_price - compoundedPrice;
  const annualSavings = monthlySavings * 12;
  const savingsPct = Math.round(
    (monthlySavings / c.brand_monthly_price) * 100
  );

  const providers = await getCompoundedProvidersForDrug(c.brand_drug);
  const genericTitle =
    c.generic_name.charAt(0).toUpperCase() + c.generic_name.slice(1);

  const faqs = [
    {
      question: `Is compounded ${c.generic_name} as effective as ${c.brand_name}?`,
      answer: `Compounded ${c.generic_name} contains the same active pharmaceutical ingredient as ${c.brand_name} (${c.generic_name}). When dispensed by a licensed 503A or 503B pharmacy that uses USP-grade ${c.generic_name} sourced from FDA-registered facilities, it delivers the same dose-for-dose pharmacology. Patient outcomes can vary, and compounded products are not FDA-approved as finished drugs, so quality depends on the compounding pharmacy.`,
    },
    {
      question: `Is compounded ${c.generic_name} FDA-approved?`,
      answer: `No. Compounded medications are not FDA-approved as finished drug products. However, the active ingredient (${c.generic_name}) is FDA-approved, and 503A pharmacies are state-licensed and inspected. Compounded ${c.generic_name} is legal under Section 503A of the Federal Food, Drug, and Cosmetic Act when prescribed for a specific patient by a licensed prescriber.`,
    },
    {
      question: `How much cheaper is compounded ${c.generic_name} than ${c.brand_name}?`,
      answer: `${c.brand_name} cash price is approximately $${c.brand_monthly_price.toLocaleString()}/month. Compounded ${c.generic_name} from the most affordable telehealth providers starts around $${compoundedPrice}/month — a savings of about $${monthlySavings.toLocaleString()}/month or $${annualSavings.toLocaleString()}/year. That's roughly ${savingsPct}% less than the brand.`,
    },
    {
      question: `Is compounded ${c.generic_name} safe?`,
      answer: `Compounded ${c.generic_name} is generally safe when sourced from licensed, reputable 503A pharmacies that use USP-grade APIs and follow strict sterility protocols. Risks include variability in potency between pharmacies, lack of FDA oversight on finished product, and potential for contamination at low-quality compounders. Always verify your provider uses LegitScript-certified pharmacies and request a Certificate of Analysis (COA) for each batch.`,
    },
    {
      question: `Why is ${c.brand_name} so expensive?`,
      answer: `${c.brand_name} is manufactured by ${c.brand_company} and protected by patents that prevent generic competition until at least the late 2020s. ${c.brand_company} sets the cash price at around $${c.brand_monthly_price.toLocaleString()}/month, and most insurance plans either don't cover ${c.brand_name} for ${c.brand_indication} or require extensive prior authorization. This pricing dynamic has driven the rapid growth of compounded alternatives.`,
    },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${c.brand_name} vs Compounded ${genericTitle}: 2026 Savings`,
    description: `Save up to $${monthlySavings.toLocaleString()}/month switching from ${c.brand_name} to compounded ${c.generic_name}.`,
  };

  // Brand product entity (the expensive option)
  const brandProductJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.brand_name,
    description: `Brand-name ${c.generic_name} for chronic weight management.`,
    brand: { "@type": "Brand", name: c.brand_name },
    category: "Prescription medication",
    offers: {
      "@type": "Offer",
      price: String(c.brand_monthly_price),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(c.brand_monthly_price),
        priceCurrency: "USD",
        unitText: "month",
      },
    },
  };

  // Compounded alternative (the cheap option) — use AggregateOffer
  // because price varies across providers and we want Google to show
  // the price range rather than a single price.
  const compoundedPrices = providers
    .map((p) =>
      p.pricing
        .filter((px) => px.form === "compounded")
        .map((px) => px.promo_price ?? px.monthly_cost)
    )
    .flat()
    .filter((n) => n > 0);
  const compoundedLow = compoundedPrices.length
    ? Math.min(...compoundedPrices)
    : compoundedPrice;
  const compoundedHigh = compoundedPrices.length
    ? Math.max(...compoundedPrices)
    : compoundedPrice;

  const compoundedProductJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Compounded ${genericTitle}`,
    description: `503A-pharmacy compounded ${c.generic_name} from licensed US telehealth providers, typically priced ${savingsPct}% below brand.`,
    category: "Prescription medication",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: String(compoundedLow),
      highPrice: String(compoundedHigh),
      priceCurrency: "USD",
      offerCount: providers.length,
      availability: "https://schema.org/InStock",
    },
  };

  // FAQPage from the page's faqs array (already used by FAQSection
  // visually, but we emit it explicitly here so the schema is colocated
  // with the other JSON-LD blocks).
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={brandProductJsonLd} />
      <JsonLd data={compoundedProductJsonLd} />
      <JsonLd data={faqJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Savings", url: "/tools/glp1-savings-calculator" },
          { name: `${c.brand_name} vs Compounded`, url: `/savings/${c.slug}` },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        <PageHero
          title={
            <>
              {c.brand_name} vs Compounded {genericTitle}:{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Save up to ${monthlySavings.toLocaleString()}/mo
              </span>
            </>
          }
          subtitle={`In 2026, switching from brand ${c.brand_name} to compounded ${c.generic_name} can save the average patient about $${annualSavings.toLocaleString()} per year — without changing the active ingredient.`}
        >
          <AffiliateDisclosure />
        </PageHero>

        <DYORCallout variant="compact" />

        {/* Big savings stat */}
        <section className="rounded-2xl bg-brand-gradient p-8 text-center text-white">
          <div className="text-sm uppercase tracking-wide opacity-90">
            Estimated Annual Savings
          </div>
          <div className="text-5xl sm:text-6xl font-bold mt-2">
            ${annualSavings.toLocaleString()}
          </div>
          <div className="text-sm mt-2 opacity-90">
            vs paying brand-name {c.brand_name} cash price ($
            {c.brand_monthly_price.toLocaleString()}/mo)
          </div>
        </section>

        {/* Comparison table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Cost Comparison
          </h2>
          <div className="overflow-hidden rounded-xl border border-brand-border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-brand-surface">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-brand-text-primary">
                    Option
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-brand-text-primary">
                    Monthly
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-brand-text-primary">
                    Annual
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-brand-border">
                  <td className="px-4 py-3 text-brand-text-primary">
                    {c.brand_name} (brand cash price)
                  </td>
                  <td className="px-4 py-3 text-right text-brand-text-primary">
                    ${c.brand_monthly_price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-brand-text-primary">
                    ${(c.brand_monthly_price * 12).toLocaleString()}
                  </td>
                </tr>
                <tr className="border-t border-brand-border bg-brand-surface/50">
                  <td className="px-4 py-3 text-brand-text-primary font-medium">
                    Compounded {c.generic_name} (cheapest provider)
                  </td>
                  <td className="px-4 py-3 text-right text-brand-text-primary font-medium">
                    ${compoundedPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-brand-text-primary font-medium">
                    ${(compoundedPrice * 12).toLocaleString()}
                  </td>
                </tr>
                <tr className="border-t border-brand-border bg-green-50">
                  <td className="px-4 py-3 text-green-800 font-semibold">
                    Your savings
                  </td>
                  <td className="px-4 py-3 text-right text-green-800 font-semibold">
                    ${monthlySavings.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-green-800 font-semibold">
                    ${annualSavings.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <StatGrid
            columns={3}
            stats={[
              {
                label: `${c.brand_name} cash price`,
                value: `$${c.brand_monthly_price.toLocaleString()}/mo`,
              },
              {
                label: "Cheapest compounded",
                value: `$${compoundedPrice}/mo`,
              },
              {
                label: "Savings",
                value: `${savingsPct}%`,
              },
            ]}
          />
        </section>

        {/* Intro / explanation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Why is {c.brand_name} so expensive?
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">{c.intro}</p>
          <p className="text-brand-text-secondary leading-relaxed">
            Compounded {c.generic_name} is legal under Section 503A of the
            Federal Food, Drug, and Cosmetic Act, which allows licensed
            pharmacists to prepare customized medications for individual
            patients. Compounded {c.generic_name} is not FDA-approved as a
            finished product, but the active ingredient is the same molecule
            used in {c.brand_name}. The FDA has issued guidance on compounded
            GLP-1s, and patients should always verify their provider works
            with LegitScript-certified pharmacies.
          </p>
        </section>

        {/* Top providers */}
        <section aria-labelledby="providers-heading">
          <h2
            id="providers-heading"
            className="text-2xl font-bold text-brand-text-primary mb-6"
          >
            Top Compounded {genericTitle} Providers (2026)
          </h2>
          {providers.length > 0 ? (
            <ProviderGrid
              providers={providers}
              trackingSource={`savings_${c.slug}`}
            />
          ) : (
            <p className="text-brand-text-secondary">
              No compounded {c.generic_name} providers in our database yet.
            </p>
          )}
        </section>

        <FAQSection items={faqs} />

        {/* Trademark notice */}
        <aside className="rounded-2xl bg-brand-text-secondary/5 border border-brand-text-secondary/10 p-5 text-xs text-brand-text-secondary leading-relaxed">
          <p>
            <strong className="text-brand-text-primary">Trademark Notice:</strong> Wegovy®, Ozempic®, and Rybelsus® are
            registered trademarks of Novo Nordisk A/S. Mounjaro® and Zepbound® are registered trademarks of Eli Lilly and
            Company. Compounded {c.generic_name} is not Wegovy®, Ozempic®, Mounjaro®, or Zepbound® — it is a separate
            preparation made by a licensed compounding pharmacy that contains the same active molecule.
            WeightLossRankings.org uses these brand names only to identify the products discussed in this comparison. We
            are not affiliated with Novo Nordisk, Eli Lilly, or any pharmaceutical manufacturer.{" "}
            <Link href="/trademarks" className="text-brand-violet underline">
              Full trademark disclaimer →
            </Link>
          </p>
        </aside>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CTAButton href="/tools/glp1-savings-calculator" size="lg">
            Get Personalized Savings Estimate
          </CTAButton>
          <CTAButton href="/compare" size="lg" variant="outline">
            Compare All Providers
          </CTAButton>
        </div>

        <EmailCapture
          heading={`Track ${c.brand_name} & Compounded Prices`}
          description={`Get notified when ${c.brand_name} and compounded ${c.generic_name} prices change.`}
          source={`savings_${c.slug}`}
        />
      </div>
    </main>
  );
}
