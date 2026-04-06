import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStateBySlug, US_STATES } from "@/lib/states";
import { getProvidersByState } from "@/lib/data";
import { getStateContent } from "@/lib/states-content";
import type { Provider } from "@/lib/types";
import ProviderGrid from "@/components/providers/ProviderGrid";
import CTAButton from "@/components/shared/CTAButton";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import EmailCapture from "@/components/shared/EmailCapture";

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
      siteName: "WeightLossRankings",
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
  const providers = allProviders.filter((p) => GLP1_CATEGORIES.has(p.category));
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://weightlossrankings.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "States",
        item: "https://weightlossrankings.org/states",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: stateName,
        item: `https://weightlossrankings.org/states/${stateData.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text-primary leading-tight">
            Best GLP-1 Providers in{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              {stateName}
            </span>{" "}
            (2026)
          </h1>
          <p className="text-brand-text-secondary text-lg leading-relaxed">
            Compare {providers.length} GLP-1 telehealth provider
            {providers.length === 1 ? "" : "s"} available in {stateName}.
            Average compounded semaglutide cost: ${avgPrice}/mo.
          </p>

          {/* Hero stats */}
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
        </div>

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
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-brand-border bg-brand-surface p-4">
                <div className="text-sm text-brand-text-muted mb-1">
                  Adult Obesity Rate
                </div>
                <div className="text-2xl font-bold text-brand-text-primary">
                  {content.obesity_rate}%
                </div>
              </div>
              <div className="rounded-lg border border-brand-border bg-brand-surface p-4">
                <div className="text-sm text-brand-text-muted mb-1">
                  US Rank
                </div>
                <div className="text-2xl font-bold text-brand-text-primary">
                  #{content.obesity_rank} of 50
                </div>
              </div>
            </div>
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

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="rounded-lg border border-brand-border bg-brand-surface p-4 group"
              >
                <summary className="cursor-pointer font-semibold text-brand-text-primary list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-brand-text-muted group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-brand-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTAs */}
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
