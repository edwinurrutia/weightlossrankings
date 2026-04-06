import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllCities,
  getCityBySlug,
  CITY_DRUG_SLUGS,
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
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import Citation from "@/components/research/Citation";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";

const GLP1_CATEGORIES = new Set(["GLP-1 Provider", "Weight Loss Program"]);

export function generateStaticParams() {
  return getAllCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `GLP-1 Weight Loss in ${city.city}, ${city.state_code} (2026): Best Providers & Pricing`;
  const description = `Compare the best GLP-1 telehealth providers serving ${city.city}, ${city.state}. Compounded semaglutide pricing, in-person clinics, and insurance coverage for ${city.city} residents.`;

  return {
    title,
    description,
    alternates: { canonical: `/cities/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `/cities/${city.slug}`,
      type: "article",
      siteName: "WeightLossRankings",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const allProviders: Provider[] = await getProvidersByState(city.state_code);
  const providers = allProviders.filter((p) => GLP1_CATEGORIES.has(p.category));
  const stateContent = getStateContent(city.state_code);
  const avgPrice = stateContent?.average_compounded_price_monthly ?? 199;
  const dataAsOf = getLatestVerificationDate();

  // Source ids in display order (drives footnote numbering):
  // 1 = Our own pricing index (the $avgPrice number)
  // 2 = CDC BRFSS adult obesity prevalence
  // 3 = CDC state obesity rankings
  // 4 = KFF Medicaid coverage research
  // 5 = FDA 503A compounding framework
  const SOURCE_WLR_PRICING = "wlr-pricing-index";
  const SOURCE_CDC_BRFSS = "cdc-brfss-obesity";
  const SOURCE_CDC_STATE_RANK = "cdc-state-obesity-rankings";
  const SOURCE_KFF_MEDICAID = "kff-medicaid-obesity-drug-coverage";
  const SOURCE_FDA_503A = "fda-503a-compounding";

  const sourceIds: string[] = [
    SOURCE_WLR_PRICING,
    SOURCE_CDC_BRFSS,
    SOURCE_CDC_STATE_RANK,
    SOURCE_KFF_MEDICAID,
    SOURCE_FDA_503A,
  ];

  const faqs = [
    {
      question: `How do I get GLP-1 medications in ${city.city}?`,
      answer: `${city.city} residents have two main options: in-person obesity-medicine clinics like ${city.notable_clinics
        .slice(0, 2)
        .join(" and ")}, or licensed telehealth providers that ship compounded semaglutide and tirzepatide directly to your address. Telehealth is typically faster (same-week prescriptions vs 6-12 week waitlists) and more affordable, with monthly costs around $${avgPrice} versus $1,000+ for brand-name medications.`,
    },
    {
      question: `Is telehealth GLP-1 better than in-person clinics in ${city.city}?`,
      answer: `For most ${city.city} residents, telehealth offers a better balance of cost, speed, and convenience. In-person ${city.state} programs are excellent for patients with complex medical needs or who need bariatric surgery, but for straightforward GLP-1 prescribing, telehealth providers offer same-week appointments, home delivery, and prices 70-85% lower than brand-name pharmacy pickup.`,
    },
    {
      question: `How much does compounded semaglutide cost in ${city.city}?`,
      answer: `Compounded semaglutide in ${city.city} averages around $${avgPrice} per month through licensed telehealth providers. Brand-name Wegovy and Zepbound typically cost $1,000-$1,350 per month without insurance. Some providers serving ${city.city} offer first-month promos starting under $150.`,
    },
    {
      question: `Are there in-person GLP-1 clinics in ${city.city}?`,
      answer: `Yes. Notable in-person options in ${city.city} include ${city.notable_clinics.join(", ")}. These academic medical centers offer comprehensive obesity medicine, but most have multi-month waitlists and can be significantly more expensive than telehealth alternatives, especially for patients without insurance coverage for weight-loss medications.`,
    },
    {
      question: `Does insurance cover GLP-1s in ${city.city}?`,
      answer: `Insurance coverage in ${city.city} follows ${city.state} norms. Most plans cover Ozempic and Mounjaro for type 2 diabetes diagnoses, but coverage for Wegovy and Zepbound (the obesity-indicated versions) is much more limited and typically requires prior authorization. If you're denied, compounded semaglutide through telehealth is the most affordable cash-pay alternative.`,
    },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `GLP-1 Weight Loss in ${city.city}, ${city.state_code} (2026)`,
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
    description: `Compare ${providers.length} GLP-1 providers serving ${city.city}, ${city.state}. Compounded semaglutide from $${avgPrice}/mo.`,
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={webPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Cities", url: "/cities" },
          { name: city.city, url: `/cities/${city.slug}` },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        <PageHero
          title={
            <>
              GLP-1 Weight Loss in{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {city.city}
              </span>{" "}
              (2026)
            </>
          }
          subtitle={`Compare ${providers.length} GLP-1 telehealth providers serving ${city.city}, ${city.state}. Average compounded semaglutide cost: $${avgPrice}/mo.`}
        >
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center rounded-full bg-brand-surface px-3 py-1 text-sm font-medium text-brand-text-primary border border-brand-border">
              {providers.length} providers
            </span>
            <span className="inline-flex items-center rounded-full bg-brand-surface px-3 py-1 text-sm font-medium text-brand-text-primary border border-brand-border">
              ${avgPrice}/mo average
            </span>
            <span className="inline-flex items-center rounded-full bg-brand-surface px-3 py-1 text-sm font-medium text-brand-text-primary border border-brand-border">
              Pop. {city.population.toLocaleString()}
            </span>
          </div>
          <AffiliateDisclosure />
        </PageHero>

        {/* City intro */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            About GLP-1 Access in {city.city}
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">{city.intro}</p>
          <p className="text-brand-text-secondary leading-relaxed">
            {city.state}&apos;s adult obesity rate is approximately{" "}
            {city.obesity_rate.toFixed(1)}% based on CDC Behavioral Risk Factor
            Surveillance System data
            <Citation source={SOURCE_CDC_BRFSS} n={2} />, and state rankings
            are published in CDC&apos;s Adult Obesity Facts
            <Citation source={SOURCE_CDC_STATE_RANK} n={3} />.
          </p>
        </section>

        {/* Drug-specific sub-pages */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Browse by Medication
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CITY_DRUG_SLUGS.map((drug) => (
              <Link
                key={drug}
                href={`/cities/${city.slug}/${drug}`}
                className="rounded-xl bg-white border border-brand-violet/10 p-5 hover:border-brand-violet/30 hover:shadow-md transition-all"
              >
                <div className="font-semibold text-brand-text-primary text-lg">
                  {getCityDrugLabel(drug)} in {city.city}
                </div>
                <div className="text-sm text-brand-text-secondary mt-1">
                  Best providers, pricing, and how to get started.
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Provider Grid */}
        <section aria-labelledby="providers-heading">
          <h2
            id="providers-heading"
            className="text-2xl font-bold text-brand-text-primary mb-6"
          >
            GLP-1 Providers Serving {city.city}
          </h2>
          {providers.length > 0 ? (
            <ProviderGrid
              providers={providers}
              trackingSource={`city_${city.slug}`}
            />
          ) : (
            <p className="text-brand-text-secondary">
              We&apos;re working on adding GLP-1 providers for {city.city}.
              Check back soon.
            </p>
          )}
        </section>

        {/* In-Person vs Telehealth */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            In-Person vs Telehealth in {city.city}
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            {city.city} has several well-regarded in-person obesity medicine
            programs, including {city.notable_clinics.join(", ")}. These
            academic medical centers offer comprehensive evaluations,
            multidisciplinary care, and bariatric surgery if needed. However,
            they typically have 2-3 month waitlists and rarely accept cash-pay
            patients at discounted rates.
          </p>
          <p className="text-brand-text-secondary leading-relaxed">
            Telehealth GLP-1 providers serving {city.city} offer same-week
            appointments, free shipping of compounded semaglutide and
            tirzepatide from licensed 503A compounding pharmacies
            <Citation source={SOURCE_FDA_503A} n={5} />, and pricing 70-85%
            lower than brand-name medications. For most {city.city} residents,
            telehealth is the fastest and most affordable path to starting
            GLP-1 treatment. Medicaid and commercial insurance coverage of
            anti-obesity GLP-1s in {city.state} varies by plan
            <Citation source={SOURCE_KFF_MEDICAID} n={4} />.
          </p>
        </section>

        {/* Cost section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Cost of GLP-1 Medications in {city.city}
          </h2>
          <div className="rounded-lg border border-brand-border bg-brand-surface p-4">
            <div className="text-sm text-brand-text-muted mb-1">
              Average compounded semaglutide ({city.state})
              <Citation source={SOURCE_WLR_PRICING} n={1} />
            </div>
            <div className="text-2xl font-bold text-brand-text-primary">
              ${avgPrice}/month
            </div>
          </div>
          <p className="text-brand-text-secondary leading-relaxed">
            Brand-name Wegovy in {city.city} typically costs $1,349/month
            without insurance, while Zepbound runs $1,086/month. Compounded
            semaglutide through telehealth providers averages $${avgPrice}/month
            in {city.state}, representing savings of more than $13,000 per
            year.
          </p>
        </section>

        <FAQSection items={faqs} />

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CTAButton href="/compare" size="lg">
            Compare All Providers
          </CTAButton>
          <CTAButton
            href="/savings-calculator"
            size="lg"
            variant="outline"
          >
            Calculate Savings
          </CTAButton>
        </div>

        <EmailCapture
          heading={`Get ${city.city} Price Alerts`}
          description={`Be the first to know about new GLP-1 providers and price changes in ${city.city}.`}
          source={`city_${city.slug}`}
        />

        <SourcesPanel sourceIds={sourceIds} dataAsOf={dataAsOf} />
      </div>
    </main>
  );
}
