import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllCities,
  getCityBySlug,
  CITY_DRUG_SLUGS,
  isCityDrugSlug,
  getCityDrugLabel,
} from "@/lib/cities";
import { getProvidersByState } from "@/lib/data";
import { getStateContent } from "@/lib/states-content";
import type { Provider } from "@/lib/types";
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
import Citation from "@/components/research/Citation";
import SourcesPanel from "@/components/research/SourcesPanel";
import {
  WEGOVY_MONTHLY_USD,
  ZEPBOUND_MONTHLY_USD,
} from "@/lib/citations";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";

const GLP1_CATEGORIES = new Set(["GLP-1 Provider", "Weight Loss Program"]);

export function generateStaticParams() {
  const out: { city: string; drug: string }[] = [];
  for (const c of getAllCities()) {
    for (const d of CITY_DRUG_SLUGS) {
      out.push({ city: c.slug, drug: d });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; drug: string }>;
}): Promise<Metadata> {
  const { city: citySlug, drug: drugSlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || !isCityDrugSlug(drugSlug)) return {};
  const drugLabel = getCityDrugLabel(drugSlug);

  const title = `${drugLabel} in ${city.city}, ${city.state_code} (2026): Best GLP-1 Providers`;
  const description = `How to get ${drugLabel} in ${city.city}. Compare top telehealth providers, compounded vs brand pricing, and insurance coverage for ${city.city} residents.`;

  return {
    title,
    description,
    alternates: { canonical: `/cities/${city.slug}/${drugSlug}` },
    openGraph: {
      title,
      description,
      url: `/cities/${city.slug}/${drugSlug}`,
      type: "article",
      siteName: "Weight Loss Rankings",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function filterProvidersByDrug(
  providers: Provider[],
  drug: "semaglutide" | "tirzepatide"
): Provider[] {
  return providers.filter((p) =>
    p.pricing.some((pr) => {
      if (pr.drug === drug) return true;
      const dose = pr.dose?.toLowerCase() ?? "";
      if (drug === "semaglutide") {
        return (
          dose.includes("semaglutide") ||
          dose.includes("wegovy") ||
          dose.includes("ozempic")
        );
      }
      return (
        dose.includes("tirzepatide") ||
        dose.includes("zepbound") ||
        dose.includes("mounjaro")
      );
    })
  );
}

export default async function CityDrugPage({
  params,
}: {
  params: Promise<{ city: string; drug: string }>;
}) {
  const { city: citySlug, drug: drugSlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || !isCityDrugSlug(drugSlug)) notFound();

  const drugLabel = getCityDrugLabel(drugSlug);
  const brandNames =
    drugSlug === "semaglutide"
      ? "Wegovy and Ozempic"
      : "Zepbound and Mounjaro";
  // Brand price comes from the central citation registry — never hardcode.
  const brandPrice =
    drugSlug === "semaglutide" ? WEGOVY_MONTHLY_USD : ZEPBOUND_MONTHLY_USD;

  const allProviders: Provider[] = await getProvidersByState(city.state_code);
  const glpProviders = allProviders.filter((p) =>
    GLP1_CATEGORIES.has(p.category)
  );
  const providers = filterProvidersByDrug(glpProviders, drugSlug);
  const stateContent = getStateContent(city.state_code);
  const avgPrice = stateContent?.average_compounded_price_monthly ?? 199;
  const annualSavings = (brandPrice - avgPrice) * 12;
  const dataAsOf = getLatestVerificationDate();

  // Source ids in display order (drives footnote numbering):
  // 1 = Our pricing index (compounded avg price + providers count)
  // 2 = CDC BRFSS adult obesity (state context)
  // 3 = Manufacturer brand price (Novo Wegovy or Lilly Zepbound)
  // 4 = FDA 503A compounding framework
  // 5 = KFF Medicaid coverage research
  const SOURCE_WLR_PRICING = "wlr-pricing-index";
  const SOURCE_CDC_BRFSS = "cdc-brfss-obesity";
  const SOURCE_BRAND_PRICING =
    drugSlug === "semaglutide"
      ? "novocare-wegovy-cash-price"
      : "lilly-zepbound-cash-price";
  const SOURCE_FDA_503A = "fda-503a-compounding";
  const SOURCE_KFF_MEDICAID = "kff-medicaid-obesity-drug-coverage";

  const sourceIds: string[] = [
    SOURCE_WLR_PRICING,
    SOURCE_CDC_BRFSS,
    SOURCE_BRAND_PRICING,
    SOURCE_FDA_503A,
    SOURCE_KFF_MEDICAID,
  ];

  const faqs = [
    {
      question: `How do I get ${drugLabel} in ${city.city}?`,
      answer: `${city.city} residents can get ${drugLabel} through licensed telehealth providers that ship directly to ${city.state} addresses. Brand-name ${brandNames} can also be prescribed in-person by a local clinician and filled at a retail pharmacy; out-of-pocket retail list prices are around $${brandPrice}/mo.`,
    },
    {
      question: `What does ${drugLabel} cost in ${city.city}?`,
      answer: `Compounded ${drugLabel} pricing is set at the provider level, not the city level. See the provider cards above for current monthly pricing from providers that serve ${city.state}. Brand-name ${brandNames} retails around $${brandPrice}/month without insurance.`,
    },
    {
      question: `Is compounded ${drugLabel} legal in ${city.state}?`,
      answer: `Yes. Compounded ${drugLabel} is legal in ${city.state} when prescribed by a licensed provider and dispensed by a 503A or 503B compounding pharmacy. ${city.city} residents can legally receive shipments from licensed compounders located in any US state.`,
    },
    {
      question: `Does insurance cover ${drugLabel} in ${city.city}?`,
      answer: `Insurance coverage in ${city.city} for ${drugLabel} depends on your diagnosis and plan. Most insurers cover the diabetes-indicated brands (${
        drugSlug === "semaglutide" ? "Ozempic" : "Mounjaro"
      }) for type 2 diabetes, but coverage for the obesity-indicated brands (${
        drugSlug === "semaglutide" ? "Wegovy" : "Zepbound"
      }) is much more limited and typically requires prior authorization.`,
    },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${drugLabel} in ${city.city}, ${city.state_code} (2026)`,
    about: {
      "@type": "Place",
      name: `${city.city}, ${city.state}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.city,
        addressRegion: city.state_code,
        addressCountry: "US",
      },
    },
    description: `Best ${drugLabel} providers serving ${city.city}, ${city.state}. Compounded ${drugLabel} from $${avgPrice}/mo.`,
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={webPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Cities", url: "/cities" },
          { name: city.city, url: `/cities/${city.slug}` },
          { name: drugLabel, url: `/cities/${city.slug}/${drugSlug}` },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        <PageHero
          title={
            <>
              {drugLabel} in{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {city.city}
              </span>{" "}
              (2026)
            </>
          }
          subtitle={`The best ways to get ${drugLabel} in ${city.city}, ${city.state}. Compare ${providers.length} providers, compounded vs brand pricing, and local insurance.`}
        >
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center rounded-full bg-brand-surface px-3 py-1 text-sm font-medium text-brand-text-primary border border-brand-border">
              {providers.length} {drugLabel} providers
            </span>
            <span className="inline-flex items-center rounded-full bg-brand-surface px-3 py-1 text-sm font-medium text-brand-text-primary border border-brand-border">
              From ${avgPrice}/mo
            </span>
            <span className="inline-flex items-center rounded-full bg-brand-surface px-3 py-1 text-sm font-medium text-brand-text-primary border border-brand-border">
              Save ~${annualSavings.toLocaleString()}/yr
            </span>
          </div>
          <AffiliateDisclosure />
        </PageHero>

        <DYORCallout variant="compact" />

        {/* Intro */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Getting {drugLabel} in {city.city}
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">{city.intro}</p>
          <p className="text-brand-text-secondary leading-relaxed">
            {city.city} residents have access to both brand-name {drugLabel}{" "}
            ({brandNames}) and compounded {drugLabel} formulations through
            licensed 503A compounding pharmacies
            <Citation source={SOURCE_FDA_503A} n={4} />. Brand-name medication
            is typically priced around ${brandPrice}/month without insurance
            <Citation source={SOURCE_BRAND_PRICING} n={3} />, while compounded{" "}
            {drugLabel} from telehealth providers averages around ${avgPrice}
            /month in {city.state}
            <Citation source={SOURCE_WLR_PRICING} n={1} /> — a savings of
            about ${annualSavings.toLocaleString()} per year. Insurance
            coverage for anti-obesity GLP-1s in {city.state} varies by plan
            <Citation source={SOURCE_KFF_MEDICAID} n={5} />, and{" "}
            {city.state}&apos;s adult obesity rate is approximately{" "}
            {city.obesity_rate.toFixed(1)}%
            <Citation source={SOURCE_CDC_BRFSS} n={2} />.
          </p>
        </section>

        {/* Stats */}
        <section>
          <StatGrid
            columns={3}
            stats={[
              {
                label: `Brand ${drugLabel}`,
                value: `$${brandPrice}/mo`,
                sublabel: "Cash price without insurance",
              },
              {
                label: `Compounded ${drugLabel}`,
                value: `$${avgPrice}/mo`,
                sublabel: `${city.state} average`,
              },
              {
                label: "Annual savings",
                value: `$${annualSavings.toLocaleString()}`,
                sublabel: "vs brand-name",
              },
            ]}
          />
        </section>

        {/* Providers */}
        <section aria-labelledby="providers-heading">
          <h2
            id="providers-heading"
            className="text-2xl font-bold text-brand-text-primary mb-6"
          >
            Best {drugLabel} Providers Serving {city.city}
          </h2>
          {providers.length > 0 ? (
            <ProviderGrid
              providers={providers}
              trackingSource={`city_${city.slug}_${drugSlug}`}
            />
          ) : (
            <p className="text-brand-text-secondary">
              We&apos;re working on adding {drugLabel} providers for{" "}
              {city.city}. Check back soon.
            </p>
          )}
        </section>

        <FAQSection items={faqs} />

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CTAButton href="/compare" size="lg">
            Compare All Providers
          </CTAButton>
          <CTAButton
            href="/tools/glp1-savings-calculator"
            size="lg"
            variant="outline"
          >
            Calculate Savings
          </CTAButton>
        </div>

        <EmailCapture
          heading={`Get ${drugLabel} Price Alerts in ${city.city}`}
          description={`Be the first to know about new ${drugLabel} promos and providers in ${city.city}.`}
          source={`city_${city.slug}_${drugSlug}`}
        />

        <SourcesPanel sourceIds={sourceIds} dataAsOf={dataAsOf} />
      </div>
    </main>
  );
}
