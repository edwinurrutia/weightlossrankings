import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDrugBySlug, getAllDrugSlugs } from "@/lib/drugs";
import { getAllProviders } from "@/lib/data";
import type { Provider } from "@/lib/types";
import TrustBadge from "@/components/shared/TrustBadge";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import FaqAccordion from "@/components/shared/FaqAccordion";
import ProviderGrid from "@/components/providers/ProviderGrid";
import CTAButton from "@/components/shared/CTAButton";
import JsonLd from "@/components/shared/JsonLd";

export function generateStaticParams() {
  return getAllDrugSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ drug: string }>;
}): Promise<Metadata> {
  const { drug } = await params;
  const drugData = getDrugBySlug(drug);
  if (!drugData) return {};

  return {
    title: `${drugData.name} Guide: Cost, Side Effects & Where to Get It`,
    description: `Everything you need to know about ${drugData.name}: FDA status, how it works, dosing schedule, side effects, clinical trial results, and where to get it at the best price.`,
  };
}

function getMinPrice(provider: Provider): number | null {
  if (!provider.pricing || provider.pricing.length === 0) return null;
  return Math.min(...provider.pricing.map((p) => p.monthly_cost));
}

// For v1, include all GLP-1 providers for all drugs.
// In a future iteration, filter by drug-specific features (e.g., "Semaglutide" or "Tirzepatide" in provider.features).
function filterProvidersByDrug(providers: Provider[]): Provider[] {
  return providers.filter((p) => p.category === "GLP-1 Provider");
}

export default async function DrugPage({
  params,
}: {
  params: Promise<{ drug: string }>;
}) {
  const { drug } = await params;
  const drugData = getDrugBySlug(drug);

  if (!drugData) {
    notFound();
  }

  const allProviders = await getAllProviders();
  const glp1Providers = filterProvidersByDrug(allProviders);

  // Sort by score descending for the grid (top 6)
  const topProviders = [...glp1Providers]
    .sort((a, b) => {
      const scoreA =
        (a.scores.value +
          a.scores.effectiveness +
          a.scores.ux +
          a.scores.trust +
          a.scores.accessibility +
          a.scores.support) /
        6;
      const scoreB =
        (b.scores.value +
          b.scores.effectiveness +
          b.scores.ux +
          b.scores.trust +
          b.scores.accessibility +
          b.scores.support) /
        6;
      return scoreB - scoreA;
    })
    .slice(0, 6);

  // For cost comparison table: sort all GLP-1 providers by cheapest price ascending
  const providersWithPrice = glp1Providers
    .map((p) => ({ provider: p, minPrice: getMinPrice(p) }))
    .filter((item) => item.minPrice !== null)
    .sort((a, b) => (a.minPrice as number) - (b.minPrice as number));

  const updatedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedApprovalDate = drugData.approval_date
    ? new Date(drugData.approval_date + "T00:00:00").toLocaleDateString(
        "en-US",
        { month: "long", day: "numeric", year: "numeric" }
      )
    : "—";

  const maxDoseIndex = drugData.dosing_schedule.length - 1;

  const faqItems = [
    {
      question: `Is ${drugData.name} FDA-approved?`,
      answer: drugData.fda_status,
    },
    {
      question: `How much does ${drugData.name} cost?`,
      answer: `${drugData.name} costs vary significantly by provider and form. Brand-name versions can cost $1,000–$1,600/month without insurance. Compounded versions from telehealth providers typically range from $129–$400/month. See the cost comparison table above for current prices from top providers. Always check for manufacturer savings programs or telehealth promo codes.`,
    },
    {
      question: `What are the side effects of ${drugData.name}?`,
      answer: drugData.side_effects,
    },
    {
      question: `Where can I get ${drugData.name}?`,
      answer: `${drugData.name} requires a prescription from a licensed healthcare provider. You can get it through your primary care doctor, endocrinologist, or a telehealth platform. Telehealth providers like those listed above typically offer faster access and lower out-of-pocket costs than traditional pharmacies for compounded versions.`,
    },
  ];

  const drugSchema = {
    "@context": "https://schema.org",
    "@type": "Drug",
    name: drugData.name,
    activeIngredient: drugData.generic_name,
    description: drugData.description,
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={drugSchema} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-2">
          <TrustBadge icon="✅" text="FDA Reviewed" />
          <TrustBadge icon="📅" text={`Updated ${updatedDate}`} />
        </div>

        {/* H1 + Description */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text-primary leading-tight">
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              {drugData.name}
            </span>{" "}
            Guide
          </h1>
          <p className="text-brand-text-secondary text-lg leading-relaxed">
            {drugData.description}
          </p>
          <AffiliateDisclosure />
        </div>

        {/* At-a-Glance Table */}
        <section aria-labelledby="at-a-glance-heading">
          <h2
            id="at-a-glance-heading"
            className="text-xl font-bold text-brand-text-primary mb-4"
          >
            At a Glance
          </h2>
          <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-brand-text-secondary w-40 bg-gray-50">
                    Generic Name
                  </td>
                  <td className="py-3.5 px-5 text-brand-text-primary">
                    {drugData.generic_name}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-brand-text-secondary bg-gray-50">
                    Brand Names
                  </td>
                  <td className="py-3.5 px-5 text-brand-text-primary">
                    {drugData.brand_names.join(", ")}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-brand-text-secondary bg-gray-50">
                    FDA Status
                  </td>
                  <td className="py-3.5 px-5 text-brand-text-primary">
                    {drugData.fda_status}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-brand-text-secondary bg-gray-50">
                    Approval Date
                  </td>
                  <td className="py-3.5 px-5 text-brand-text-primary">
                    {formattedApprovalDate}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How It Works */}
        <section aria-labelledby="how-it-works-heading" className="space-y-3">
          <h2
            id="how-it-works-heading"
            className="text-xl font-bold text-brand-text-primary"
          >
            How {drugData.name} Works
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            {drugData.how_it_works}
          </p>
        </section>

        {/* Dosing Schedule */}
        <section aria-labelledby="dosing-heading" className="space-y-4">
          <h2
            id="dosing-heading"
            className="text-xl font-bold text-brand-text-primary"
          >
            Dosing Schedule
          </h2>
          <p className="text-sm text-brand-text-secondary">
            {drugData.name} uses a gradual dose escalation to minimize side
            effects. Always follow your prescriber&apos;s guidance.
          </p>
          <div className="space-y-3">
            {drugData.dosing_schedule.map((step, index) => {
              const progressPct = Math.round(
                ((index + 1) / drugData.dosing_schedule.length) * 100
              );
              const isMaintenance = index === maxDoseIndex;
              return (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-brand-text-primary">
                      {step.week_range}
                    </span>
                    <span
                      className={`font-semibold ${
                        isMaintenance
                          ? "bg-brand-gradient bg-clip-text text-transparent"
                          : "text-brand-text-secondary"
                      }`}
                    >
                      {step.dose}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-gradient transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Side Effects */}
        <section aria-labelledby="side-effects-heading" className="space-y-3">
          <h2
            id="side-effects-heading"
            className="text-xl font-bold text-brand-text-primary"
          >
            Side Effects
          </h2>
          <div className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6">
            <p className="text-brand-text-secondary leading-relaxed text-sm">
              {drugData.side_effects}
            </p>
            <p className="mt-4 text-xs text-brand-text-secondary/70">
              This is not a complete list. Consult your healthcare provider or
              prescriber for full safety information.
            </p>
          </div>
        </section>

        {/* Clinical Trial Results */}
        {drugData.clinical_trial_summary && (
          <section
            aria-labelledby="clinical-trials-heading"
            className="space-y-3"
          >
            <h2
              id="clinical-trials-heading"
              className="text-xl font-bold text-brand-text-primary"
            >
              Clinical Trial Results
            </h2>
            <blockquote className="relative bg-white rounded-2xl border-l-4 border-brand-violet shadow-sm p-6 pl-8">
              <span
                className="absolute top-4 left-4 text-4xl font-serif text-brand-violet/20 leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-brand-text-primary font-medium leading-relaxed">
                {drugData.clinical_trial_summary}
              </p>
              <footer className="mt-3 text-xs text-brand-text-secondary/70">
                Source: Published clinical trial data (STEP / SURMOUNT trial
                series)
              </footer>
            </blockquote>
          </section>
        )}

        {/* Where to Get */}
        <section aria-labelledby="where-to-get-heading" className="space-y-4">
          <h2
            id="where-to-get-heading"
            className="text-xl font-bold text-brand-text-primary"
          >
            Where to Get {drugData.name}
          </h2>
          <p className="text-sm text-brand-text-secondary">
            These telehealth providers offer access to{" "}
            {drugData.generic_name.toLowerCase()} or compounded equivalents
            with online consultations and home delivery.
          </p>
          <ProviderGrid
            providers={topProviders}
            trackingSource={`drug_${drug}`}
          />
        </section>

        {/* Cost Comparison Table */}
        <section aria-labelledby="cost-comparison-heading" className="space-y-4">
          <h2
            id="cost-comparison-heading"
            className="text-xl font-bold text-brand-text-primary"
          >
            Cost Comparison
          </h2>
          <p className="text-sm text-brand-text-secondary">
            Starting prices for compounded GLP-1 medications from top
            providers, sorted cheapest first. Prices may vary based on dose and
            promo availability.
          </p>
          <div className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                    <th className="py-3 px-5 text-left">Provider</th>
                    <th className="py-3 px-5 text-left hidden sm:table-cell">
                      Form
                    </th>
                    <th className="py-3 px-5 text-right">Starting Price</th>
                    <th className="py-3 px-5 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {providersWithPrice.map(({ provider, minPrice }) => (
                    <tr
                      key={provider._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-5 font-semibold text-brand-text-primary">
                        {provider.name}
                      </td>
                      <td className="py-3 px-5 text-brand-text-secondary hidden sm:table-cell capitalize">
                        {provider.pricing.find(
                          (p) => p.monthly_cost === minPrice
                        )?.form ?? "—"}
                      </td>
                      <td className="py-3 px-5 text-right font-bold text-brand-text-primary">
                        ${minPrice}/mo
                      </td>
                      <td className="py-3 px-5 text-right">
                        <CTAButton
                          href={provider.affiliate_url}
                          external
                          size="sm"
                          trackProvider={provider.slug}
                          trackSource={`drug_${drug}`}
                        >
                          Visit
                        </CTAButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="space-y-4">
          <h2
            id="faq-heading"
            className="text-xl font-bold text-brand-text-primary"
          >
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} />
        </section>
      </div>
    </main>
  );
}
