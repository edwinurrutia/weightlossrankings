import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStateBySlug, US_STATES } from "@/lib/states";
import {
  getProvidersByState,
  getProvidersWithUndisclosedStateList,
} from "@/lib/data";
import { sortProvidersByRank } from "@/lib/scoring";
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
import Breadcrumb from "@/components/shared/Breadcrumb";

const GLP1_CATEGORIES = new Set(["GLP-1 Provider", "Weight Loss Program"]);

export function generateStaticParams() {
  return US_STATES.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const stateData = getStateBySlug(slug);

  if (!stateData) return {};

  const content = getStateContent(stateData.code);
  const providers = await getProvidersByState(stateData.code);
  const glpProviders = providers.filter((p) => GLP1_CATEGORIES.has(p.category));
  const price = content?.average_compounded_price_monthly ?? 199;

  const title = `Best GLP-1 Providers in ${stateData.name} (2026) | Compare Prices & Reviews`;
  const description = `Compare ${glpProviders.length} GLP-1 telehealth providers available in ${stateData.name}. Average compounded semaglutide cost: $${price}/mo. See reviews, prices, and insurance coverage.`;

  return {
    title,
    description,
    alternates: { canonical: `/states/${stateData.slug}` },
    openGraph: {
      title,
      description,
      url: `/states/${stateData.slug}`,
      type: "article",
      siteName: "Weight Loss Rankings",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const stateData = getStateBySlug(slug);

  if (!stateData) {
    notFound();
  }

  const allProviders: Provider[] = await getProvidersByState(stateData.code);
  const providers = sortProvidersByRank(
    allProviders.filter((p) => GLP1_CATEGORIES.has(p.category))
  );
  const undisclosedProviders = sortProvidersByRank(
    (await getProvidersWithUndisclosedStateList()).filter((p) =>
      GLP1_CATEGORIES.has(p.category)
    )
  );
  const content = getStateContent(stateData.code);

  const stateName = stateData.name;
  const avgPrice = content?.average_compounded_price_monthly ?? 199;

  const faqs = [
    {
      question: `How much does GLP-1 cost in ${stateName}?`,
      answer: `Compounded semaglutide in ${stateName} averages around $${avgPrice} per month through telehealth providers. Brand-name Wegovy and Zepbound typically cost $1,000-$1,350 per month without insurance. Prices vary by provider, dose, and any active promotions.`,
    },
    {
      question: `Does ${stateName} Medicaid cover Wegovy or Ozempic?`,
      answer: `${stateName} Medicaid coverage for GLP-1 medications is currently: ${content?.medicaid_glp1_coverage ?? "Diabetes only"}. Ozempic is generally covered for type 2 diabetes, while Wegovy (the obesity-indicated version) coverage varies and often requires prior authorization.`,
    },
    {
      question: `Is telehealth legal for GLP-1 prescriptions in ${stateName}?`,
      answer: `Yes. Telehealth is legal in ${stateName} for GLP-1 prescriptions. Licensed providers can evaluate you online, prescribe semaglutide or tirzepatide, and ship medication directly to your address through partnered compounding or retail pharmacies.`,
    },
    {
      question: `Where can I get semaglutide in ${stateName}?`,
      answer: `Residents of ${stateName} can get semaglutide through licensed telehealth providers that ship to all major cities including ${(content?.top_cities ?? []).slice(0, 3).join(", ")}. Compare the providers above to find the best fit for your budget and goals.`,
    },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Best GLP-1 Providers in ${stateName} (2026)`,
    about: {
      "@type": "Place",
      name: stateName,
      address: {
        "@type": "PostalAddress",
        addressRegion: stateData.code,
        addressCountry: "US",
      },
    },
    description: `Compare ${providers.length} GLP-1 telehealth providers available in ${stateName}. Average compounded semaglutide cost: $${avgPrice}/mo.`,
  };

  // ItemList enrichment so Google can render this state's provider
  // grid as a ranked list rich result. The state pages already have
  // WebPage + Place schema; this adds the third layer that comparison
  // queries need. Caught in the 2026-04-08 schema audit.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `GLP-1 Providers in ${stateName}`,
    description: `Ranked GLP-1 telehealth providers serving ${stateName} residents.`,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: providers.length,
    itemListElement: providers.slice(0, 20).map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://weightlossrankings.org/reviews/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "States", url: "/states" },
          { name: stateName, url: `/states/${stateData.slug}` },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "States", href: "/states" },
            { label: stateName },
          ]}
          className="mb-0"
        />

        <PageHero
          title={
            <>
              Best GLP-1 Providers in{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {stateName}
              </span>{" "}
              (2026)
            </>
          }
          subtitle={`Compare ${providers.length} GLP-1 telehealth provider${
            providers.length === 1 ? "" : "s"
          } available in ${stateName}. Average compounded semaglutide cost: $${avgPrice}/mo.`}
        >
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center rounded-full bg-brand-surface px-3 py-1 text-sm font-medium text-brand-text-primary border border-brand-border">
              {providers.length} providers
            </span>
            <span className="inline-flex items-center rounded-full bg-brand-surface px-3 py-1 text-sm font-medium text-brand-text-primary border border-brand-border">
              ${avgPrice}/mo average
            </span>
            <span className="inline-flex items-center rounded-full bg-brand-surface px-3 py-1 text-sm font-medium text-brand-text-primary border border-brand-border">
              Telehealth legal
            </span>
          </div>
          <AffiliateDisclosure />
        </PageHero>

        {/* Data confidence disclosure — state list transparency */}
        <aside
          className="rounded-xl border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary"
          aria-label="Data confidence disclosure"
        >
          <p className="leading-relaxed">
            <span className="font-semibold text-brand-violet">
              Data confidence:
            </span>{" "}
            Each provider listed below prescribes GLP-1 medication (confirmed
            on their own site), but many telehealth services do not publish
            a complete state-availability list publicly. A provider shown on
            this page may not currently serve {stateName} — always confirm
            state coverage directly with the provider during their signup
            intake before ordering. We flag the confidence level on every
            individual review page.
          </p>
        </aside>

        {/* See by medication */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            See by medication
          </h2>
          <p className="text-brand-text-secondary">
            Looking for a specific GLP-1? Browse {stateName} providers by drug.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`/states/${stateData.slug}/semaglutide`}
              className="rounded-xl border border-brand-border bg-brand-surface p-5 hover:border-brand-primary transition-colors"
            >
              <div className="text-lg font-bold text-brand-text-primary">
                {stateName} Semaglutide Providers →
              </div>
              <div className="text-sm text-brand-text-secondary mt-1">
                Compare every Semaglutide (Wegovy/Ozempic) provider serving {stateName}.
              </div>
            </a>
            <a
              href={`/states/${stateData.slug}/tirzepatide`}
              className="rounded-xl border border-brand-border bg-brand-surface p-5 hover:border-brand-primary transition-colors"
            >
              <div className="text-lg font-bold text-brand-text-primary">
                {stateName} Tirzepatide Providers →
              </div>
              <div className="text-sm text-brand-text-secondary mt-1">
                Compare every Tirzepatide (Zepbound/Mounjaro) provider serving {stateName}.
              </div>
            </a>
          </div>
        </section>

        {/* About GLP-1s in [State] */}
        {content && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-text-primary">
              About GLP-1s in {stateName}
            </h2>
            <p className="text-brand-text-secondary leading-relaxed">
              {content.regulatory_notes}
            </p>
            <ul className="space-y-2">
              {content.key_facts.map((fact, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-brand-text-secondary leading-relaxed"
                >
                  <span className="text-brand-primary mt-1">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Provider Grid */}
        <section aria-labelledby="providers-heading">
          <h2
            id="providers-heading"
            className="text-2xl font-bold text-brand-text-primary mb-6"
          >
            GLP-1 Providers Available in {stateName}
          </h2>
          {providers.length > 0 ? (
            <ProviderGrid
              providers={providers}
              trackingSource={`state_${stateData.slug}`}
            />
          ) : (
            <p className="text-brand-text-secondary">
              We&apos;re working on adding GLP-1 providers for {stateName}.
              Check back soon.
            </p>
          )}
        </section>

        {/* Providers with undisclosed state lists — GLP-1 service verified
            on the provider's own site, but the full state-availability list
            is gated behind signup intake. Surfaced separately so users see
            the option but understand we have not confirmed {stateName}
            coverage specifically. */}
        {undisclosedProviders.length > 0 && (
          <section
            aria-labelledby="undisclosed-heading"
            className="space-y-4"
          >
            <div className="rounded-xl border border-brand-violet/20 bg-brand-violet/5 p-5">
              <h2
                id="undisclosed-heading"
                className="text-xl font-bold text-brand-text-primary mb-2"
              >
                Also consider: {undisclosedProviders.length} providers with
                undisclosed state coverage
              </h2>
              <p className="text-sm text-brand-text-secondary leading-relaxed">
                These providers offer GLP-1 weight loss service (verified on
                their own websites) but do not publish a complete
                state-availability list publicly — their intake flow determines
                eligibility. We have not independently confirmed {stateName}{" "}
                coverage for the providers below. Start the signup intake to
                check whether they serve your state before proceeding.
              </p>
            </div>
            <ProviderGrid
              providers={undisclosedProviders}
              trackingSource={`state_${stateData.slug}_undisclosed`}
            />
          </section>
        )}

        {/* Top Cities */}
        {content && content.top_cities.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-text-primary">
              Top Cities for GLP-1 Treatment in {stateName}
            </h2>
            <p className="text-brand-text-secondary leading-relaxed">
              Telehealth providers ship to all {stateName} addresses, but
              demand is highest in these metro areas:
            </p>
            <div className="flex flex-wrap gap-2">
              {content.top_cities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center rounded-md bg-brand-surface px-3 py-1.5 text-sm font-medium text-brand-text-primary border border-brand-border"
                >
                  {city}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Insurance & Medicaid */}
        {content && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-text-primary">
              Insurance &amp; Medicaid in {stateName}
            </h2>
            <div className="rounded-lg border border-brand-border bg-brand-surface p-4">
              <div className="text-sm text-brand-text-muted mb-1">
                {stateName} Medicaid GLP-1 Coverage
              </div>
              <div className="text-lg font-semibold text-brand-text-primary">
                {content.medicaid_glp1_coverage}
              </div>
            </div>
            <p className="text-brand-text-secondary leading-relaxed">
              Most insurance plans in {stateName} cover GLP-1s for type 2
              diabetes (Ozempic, Mounjaro), but coverage for obesity-only
              indications (Wegovy, Zepbound) is much more limited and often
              requires prior authorization. If your insurance won&apos;t cover
              brand-name GLP-1s, compounded semaglutide through telehealth is
              typically the most affordable option at around ${avgPrice}/mo.
            </p>
          </section>
        )}

        {/* Obesity in [State] */}
        {content && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-text-primary">
              Obesity in {stateName}
            </h2>
            <p className="text-brand-text-secondary leading-relaxed">
              According to CDC data, {content.obesity_rate}% of {stateName}{" "}
              adults have obesity (BMI of 30 or higher). This places {stateName}{" "}
              at #{content.obesity_rank} out of 50 states. Access to GLP-1
              medications like semaglutide and tirzepatide has expanded
              significantly through telehealth, helping {stateName} residents
              get clinically supervised weight loss treatment from home.
            </p>
          </section>
        )}

        <FAQSection items={faqs} />

        {/* CTAs */}
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

        {/* Email Capture */}
        <EmailCapture
          heading={`Get ${stateName} Price Alerts`}
          description={`Be the first to know about new providers and price changes in ${stateName}.`}
          source={`state_${stateData.slug}`}
        />
      </div>
    </main>
  );
}
