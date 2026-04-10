import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getStateBySlug, US_STATES } from "@/lib/states";
import { getProvidersByState } from "@/lib/data";
import { getStateContent } from "@/lib/states-content";
import type { Provider, Pricing } from "@/lib/types";
import ProviderGrid from "@/components/providers/ProviderGrid";
import CTAButton from "@/components/shared/CTAButton";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import EmailCapture from "@/components/shared/EmailCapture";
import JsonLd from "@/components/shared/JsonLd";
import PageHero from "@/components/marketing/PageHero";
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import DYORCallout from "@/components/marketing/DYORCallout";
import StateDrugFactSheet from "@/components/marketing/StateDrugFactSheet";
import {
  getLatestVerificationDate,
  getPricingStats,
} from "@/lib/pricing-analytics";
import {
  WEGOVY_MONTHLY_USD,
  ZEPBOUND_MONTHLY_USD,
} from "@/lib/citations";

const DRUGS = ["semaglutide", "tirzepatide"] as const;
type DrugSlug = (typeof DRUGS)[number];

// Pricing rows now carry an optional `drug` discriminator (added by another
// agent in providers.json). We don't import the field from the shared type to
// avoid touching src/lib/types.ts.
type PricingWithDrug = Pricing & { drug?: string };

// Brand prices come from the central citation registry so updates propagate
// site-wide. Don't hardcode dollar amounts here.
const DRUG_META: Record<
  DrugSlug,
  {
    label: string;
    brand: string;
    diabetesBrand: string;
    brandPrice: number;
    description: string;
  }
> = {
  semaglutide: {
    label: "Semaglutide",
    brand: "Wegovy",
    diabetesBrand: "Ozempic",
    brandPrice: WEGOVY_MONTHLY_USD,
    description:
      "the GLP-1 active ingredient in Wegovy and Ozempic, FDA-approved for chronic weight management and type 2 diabetes",
  },
  tirzepatide: {
    label: "Tirzepatide",
    brand: "Zepbound",
    diabetesBrand: "Mounjaro",
    brandPrice: ZEPBOUND_MONTHLY_USD,
    description:
      "the dual GIP/GLP-1 receptor agonist branded as Zepbound and Mounjaro, FDA-approved in 2023 with industry-leading weight-loss results",
  },
};

export function generateStaticParams() {
  return US_STATES.flatMap((state) =>
    DRUGS.map((drug) => ({ state: state.slug, drug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; drug: string }>;
}): Promise<Metadata> {
  const { state, drug } = await params;
  const stateData = getStateBySlug(state);
  if (!stateData || !DRUGS.includes(drug as DrugSlug)) return {};

  const content = getStateContent(stateData.code);
  const meta = DRUG_META[drug as DrugSlug];
  const price = content?.average_compounded_price_monthly ?? 199;

  const title = `${meta.label} in ${stateData.name} (2026) | Compare Prices & Providers`;
  const description = `Find the cheapest ${meta.label} providers in ${stateData.name}. Compare compounded and brand pricing from licensed telehealth providers. Average monthly cost: $${price}.`;

  return {
    title,
    description,
    alternates: { canonical: `/states/${state}/${drug}` },
    openGraph: {
      title,
      description,
      url: `/states/${state}/${drug}`,
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

function providerMinPriceForDrug(p: Provider, drug: DrugSlug): number | null {
  const rows = (p.pricing as PricingWithDrug[]).filter(
    (pr) => pr.drug === drug
  );
  if (rows.length === 0) return null;
  return Math.min(
    ...rows.map((pr) => pr.promo_price ?? pr.monthly_cost)
  );
}

function providerMaxPriceForDrug(p: Provider, drug: DrugSlug): number | null {
  const rows = (p.pricing as PricingWithDrug[]).filter(
    (pr) => pr.drug === drug
  );
  if (rows.length === 0) return null;
  return Math.max(...rows.map((pr) => pr.monthly_cost));
}

export default async function StateDrugPage({
  params,
}: {
  params: Promise<{ state: string; drug: string }>;
}) {
  const { state: stateSlug, drug: drugSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData || !DRUGS.includes(drugSlug as DrugSlug)) {
    notFound();
  }
  const drug = drugSlug as DrugSlug;
  const meta = DRUG_META[drug];
  const stateName = stateData.name;
  const stateCode = stateData.code;
  const content = getStateContent(stateCode);

  const allProviders: Provider[] = await getProvidersByState(stateCode);
  const drugProviders = allProviders
    .filter((p) =>
      (p.pricing as PricingWithDrug[]).some((pr) => pr.drug === drug)
    )
    .sort((a, b) => {
      const ap = providerMinPriceForDrug(a, drug) ?? Number.POSITIVE_INFINITY;
      const bp = providerMinPriceForDrug(b, drug) ?? Number.POSITIVE_INFINITY;
      return ap - bp;
    });

  // Compute the state's average compounded price dynamically from the
  // providers actually shipping to this state. Falls back to the static
  // states-content.json value if we don't have enough data points yet,
  // and finally to a sane default.
  const stateMonthlyPrices = drugProviders
    .map((p) => providerMinPriceForDrug(p, drug))
    .filter((n): n is number => n !== null && n > 0);
  const dynamicAvgPrice =
    stateMonthlyPrices.length >= 3
      ? Math.round(
          stateMonthlyPrices.reduce((a, b) => a + b, 0) /
            stateMonthlyPrices.length,
        )
      : null;
  const avgPrice =
    dynamicAvgPrice ??
    content?.average_compounded_price_monthly ??
    (Math.round(getPricingStats(drug, "compounded").median) || 199);

  const dataAsOf = getLatestVerificationDate();

  // Cross-link: 5 other states for the same drug
  const otherStates = US_STATES.filter((s) => s.code !== stateCode).slice(0, 5);
  const otherDrug: DrugSlug = drug === "semaglutide" ? "tirzepatide" : "semaglutide";

  const faqs = [
    {
      question: `How much does ${meta.label} cost in ${stateName}?`,
      answer: `Compounded ${meta.label} in ${stateName} averages around $${avgPrice} per month through licensed telehealth providers. Brand-name ${meta.brand} typically costs about $${meta.brandPrice} per month without insurance. The cheapest cash-pay ${meta.label} option in ${stateName} starts around $${
        drugProviders.length > 0
          ? providerMinPriceForDrug(drugProviders[0], drug) ?? avgPrice
          : avgPrice
      }/mo.`,
    },
    {
      question: `Is ${meta.label} legal in ${stateName}?`,
      answer: `Yes. ${meta.label} is FDA-approved and legal to prescribe in ${stateName}. Compounded ${meta.label} is also legal when dispensed by a licensed 503A or 503B pharmacy under a valid prescription from a ${stateName}-licensed clinician. Telehealth visits for GLP-1 prescriptions are explicitly permitted statewide.`,
    },
    {
      question: `Does ${stateName} Medicaid cover ${meta.label}?`,
      answer: `${stateName} Medicaid coverage for GLP-1 weight-loss medication is currently: ${
        content?.medicaid_glp1_coverage ?? "Diabetes only"
      }. Brand-name ${meta.diabetesBrand} is generally covered for type 2 diabetes, while obesity-only indications (${meta.brand}) typically require prior authorization or are not covered. Compounded ${meta.label} is a cash-pay option and is not covered by Medicaid in any state.`,
    },
    {
      question: `Where can I get ${meta.label} in ${stateName}?`,
      answer: `Residents of ${stateName} can get ${meta.label} through ${
        drugProviders.length
      } licensed telehealth provider${
        drugProviders.length === 1 ? "" : "s"
      } that ship to all major ${stateName} cities${
        content?.top_cities?.length
          ? ` including ${content.top_cities.slice(0, 3).join(", ")}`
          : ""
      }. Local in-person clinics and compounding pharmacies are also available, but telehealth is typically faster and cheaper.`,
    },
    {
      question: `What's the cheapest compounded ${meta.label} provider in ${stateName}?`,
      answer:
        drugProviders.length > 0
          ? `The lowest-priced ${meta.label} provider currently serving ${stateName} is ${
              drugProviders[0].name
            } at approximately $${
              providerMinPriceForDrug(drugProviders[0], drug) ?? avgPrice
            }/mo. Pricing changes frequently — see the provider grid above for current promotions and dose-by-dose cost.`
          : `We're currently adding ${meta.label} providers for ${stateName}. Check back soon or join our price-alert list below.`,
    },
  ];

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "States", url: "/states" },
    { name: stateName, url: `/states/${stateData.slug}` },
    { name: meta.label, url: `/states/${stateData.slug}/${drug}` },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${meta.label} in ${stateName} (2026)`,
    url: `https://weightlossrankings.org/states/${stateData.slug}/${drug}`,
    about: {
      "@type": "Place",
      name: stateName,
      address: {
        "@type": "PostalAddress",
        addressRegion: stateCode,
        addressCountry: "US",
      },
    },
    description: `Compare ${drugProviders.length} ${meta.label} telehealth providers available in ${stateName}. Average compounded ${meta.label} cost: $${avgPrice}/mo.`,
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={webPageJsonLd} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        {/* Visible breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-brand-text-secondary"
        >
          <ol className="flex flex-wrap gap-1">
            <li>
              <Link href="/" className="hover:text-brand-primary">
                Home
              </Link>
              <span className="px-1.5">›</span>
            </li>
            <li>
              <Link href="/states" className="hover:text-brand-primary">
                States
              </Link>
              <span className="px-1.5">›</span>
            </li>
            <li>
              <Link
                href={`/states/${stateData.slug}`}
                className="hover:text-brand-primary"
              >
                {stateName}
              </Link>
              <span className="px-1.5">›</span>
            </li>
            <li className="text-brand-text-primary font-medium">
              {meta.label}
            </li>
          </ol>
        </nav>

        <DYORCallout variant="compact" />

        <PageHero
          title={
            <>
              {meta.label} in{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {stateName}
              </span>
              : Best Providers &amp; Prices (2026)
            </>
          }
          subtitle={`Compare ${drugProviders.length} ${meta.label} telehealth provider${
            drugProviders.length === 1 ? "" : "s"
          } available in ${stateName}, sorted by cheapest monthly price.`}
        />

        {/* Mobile-first fact sheet — replaces the wall-of-paragraph that
            used to live up here. Cited, dynamic, scannable on phones. */}
        <StateDrugFactSheet
          drugLabel={meta.label}
          brandLabel={meta.brand}
          stateName={stateName}
          providerCount={drugProviders.length}
          avgPriceMonthly={avgPrice}
          brandPriceMonthly={meta.brandPrice}
          obesityRate={content?.obesity_rate}
          obesityRank={content?.obesity_rank}
          medicaidCoverage={content?.medicaid_glp1_coverage}
          topCity={content?.top_cities?.[0]}
          dataAsOf={dataAsOf}
        />

        <AffiliateDisclosure />

        {/* Provider Grid */}
        <section aria-labelledby="providers-heading">
          <h2
            id="providers-heading"
            className="text-2xl font-bold text-brand-text-primary mb-6"
          >
            {meta.label} Providers Available in {stateName}
          </h2>
          {drugProviders.length > 0 ? (
            <ProviderGrid
              providers={drugProviders}
              trackingSource={`state_${stateData.slug}_${drug}`}
            />
          ) : (
            <p className="text-brand-text-secondary">
              We&apos;re working on adding {meta.label} providers for {stateName}.
              Check back soon.
            </p>
          )}
        </section>

        {/* Cost Breakdown Table */}
        {drugProviders.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-text-primary">
              {meta.label} Cost Breakdown in {stateName}
            </h2>
            <p className="text-brand-text-secondary leading-relaxed">
              Brand-name {meta.brand} retails for about ${meta.brandPrice}/mo
              without insurance. Here&apos;s how much each {meta.label} provider
              charges in {stateName}, and how much you save vs the brand cash
              price.
            </p>
            <div className="overflow-x-auto rounded-lg border border-brand-border">
              <table className="min-w-full text-sm">
                <thead className="bg-brand-surface">
                  <tr className="text-left text-brand-text-muted">
                    <th className="px-4 py-3 font-medium">Provider</th>
                    <th className="px-4 py-3 font-medium">Min/mo</th>
                    <th className="px-4 py-3 font-medium">Max/mo</th>
                    <th className="px-4 py-3 font-medium">
                      Savings vs {meta.brand}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {drugProviders.map((p) => {
                    const min = providerMinPriceForDrug(p, drug);
                    const max = providerMaxPriceForDrug(p, drug);
                    const savings =
                      min !== null ? meta.brandPrice - min : null;
                    return (
                      <tr key={p._id} className="text-brand-text-primary">
                        <td className="px-4 py-3 font-medium">
                          <Link
                            href={`/reviews/${p.slug}`}
                            className="hover:text-brand-primary"
                          >
                            {p.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          {min !== null ? `$${min}` : "—"}
                        </td>
                        <td className="px-4 py-3">
                          {max !== null ? `$${max}` : "—"}
                        </td>
                        <td className="px-4 py-3 text-brand-primary font-medium">
                          {savings !== null && savings > 0
                            ? `Save $${savings}/mo`
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* State-specific info */}
        {content && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-text-primary">
              {stateName} Coverage &amp; Regulations
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
              {content.regulatory_notes}
            </p>
            {content.top_cities.length > 0 && (
              <div>
                <div className="text-sm text-brand-text-muted mb-2">
                  Top {stateName} cities for {meta.label} telehealth:
                </div>
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
              </div>
            )}
          </section>
        )}

        <FAQSection items={faqs} />

        {/* Cross-links */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Related Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link
              href={`/states/${stateData.slug}`}
              className="rounded-lg border border-brand-border bg-brand-surface p-4 hover:border-brand-primary transition-colors"
            >
              <div className="font-semibold text-brand-text-primary">
                See all GLP-1 providers in {stateName} →
              </div>
              <div className="text-sm text-brand-text-secondary mt-1">
                Every weight-loss provider serving {stateName}, not just{" "}
                {meta.label}.
              </div>
            </Link>
            <Link
              href={`/states/${stateData.slug}/${otherDrug}`}
              className="rounded-lg border border-brand-border bg-brand-surface p-4 hover:border-brand-primary transition-colors"
            >
              <div className="font-semibold text-brand-text-primary">
                {DRUG_META[otherDrug].label} in {stateName} →
              </div>
              <div className="text-sm text-brand-text-secondary mt-1">
                Compare {DRUG_META[otherDrug].label} pricing and providers in{" "}
                {stateName}.
              </div>
            </Link>
          </div>
          <div>
            <div className="text-sm text-brand-text-muted mb-2">
              {meta.label} pricing in other states:
            </div>
            <div className="flex flex-wrap gap-2">
              {otherStates.map((s) => (
                <Link
                  key={s.code}
                  href={`/states/${s.slug}/${drug}`}
                  className="inline-flex items-center rounded-md bg-brand-surface px-3 py-1.5 text-sm font-medium text-brand-text-primary border border-brand-border hover:border-brand-primary"
                >
                  {meta.label} in {s.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

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
          heading={`Get ${stateName} ${meta.label} Price Alerts`}
          description={`Be the first to know when a new ${meta.label} provider launches in ${stateName} or drops their price.`}
          source={`state_${stateData.slug}_${drug}`}
        />
      </div>
    </main>
  );
}
