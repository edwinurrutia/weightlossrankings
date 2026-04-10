import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllInsurers,
  getInsurerBySlug,
  type Insurer,
} from "@/lib/insurers";
import { getAllProviders } from "@/lib/data";
import type { Provider } from "@/lib/types";
import ProviderGrid from "@/components/providers/ProviderGrid";
import CTAButton from "@/components/shared/CTAButton";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import EmailCapture from "@/components/shared/EmailCapture";
import JsonLd from "@/components/shared/JsonLd";
import PageHero from "@/components/marketing/PageHero";
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import DYORCallout from "@/components/marketing/DYORCallout";
import Citation from "@/components/research/Citation";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";

export function generateStaticParams() {
  return getAllInsurers().map((i) => ({ insurer: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ insurer: string }>;
}): Promise<Metadata> {
  const { insurer: slug } = await params;
  const insurer = getInsurerBySlug(slug);
  if (!insurer) return {};

  const title = `Does ${insurer.name} Cover GLP-1 Medications? (2026 Guide)`;
  const description = `Find out if ${insurer.name} covers Wegovy, Ozempic, Zepbound, and Mounjaro in 2026. Coverage rules, copays, prior auth, and what to do if you're denied.`;

  return {
    title,
    description,
    alternates: { canonical: `/insurance/${insurer.slug}` },
    openGraph: {
      title,
      description,
      url: `/insurance/${insurer.slug}`,
      type: "article",
      siteName: "Weight Loss Rankings",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function coverageBadge(value: Insurer["covers_glp1"]) {
  const map = {
    yes: { label: "Covered", className: "bg-green-100 text-green-800" },
    no: { label: "Not Covered", className: "bg-red-100 text-red-800" },
    limited: { label: "Limited", className: "bg-amber-100 text-amber-800" },
    varies: { label: "Varies by Plan", className: "bg-blue-100 text-blue-800" },
  } as const;
  return map[value];
}

export default async function InsurerPage({
  params,
}: {
  params: Promise<{ insurer: string }>;
}) {
  const { insurer: slug } = await params;
  const insurer = getInsurerBySlug(slug);
  if (!insurer) notFound();

  const allProviders = await getAllProviders();
  const altProviders: Provider[] = allProviders.filter((p) =>
    insurer.alternative_providers_when_denied.some((name) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    )
  );
  const fallbackProviders =
    altProviders.length > 0
      ? altProviders
      : allProviders
          .filter((p) =>
            p.pricing.some((pr) => pr.form === "compounded")
          )
          .slice(0, 6);

  const badge = coverageBadge(insurer.covers_glp1);
  const isMedicare = insurer.slug === "medicare";
  const isMedicaid = insurer.slug === "medicaid";
  const dataAsOf = getLatestVerificationDate();

  // Source ids used on this page, in display order (drives footnote numbers).
  // 1 = KFF employer / commercial benefits survey
  // 2 = KFF Medicaid obesity drug coverage research
  // 3 = CMS Medicare Part D (statutory weight-loss exclusion)
  // 4 = CMS Medicaid prescription drugs (state-by-state)
  // 5 = IRS Publication 502 (HSA/FSA eligibility)
  // 6 = ERISA self-funded employer plans
  // 7 = FDA 503A compounding framework (cash-pay compounded alternative)
  const SOURCE_KFF_EMPLOYER = "kff-employer-health-benefits-survey";
  const SOURCE_KFF_MEDICAID = "kff-medicaid-obesity-drug-coverage";
  const SOURCE_CMS_MEDICARE_PART_D = "cms-medicare-part-d";
  const SOURCE_CMS_MEDICAID_RX = "cms-medicaid-prescription-drugs";
  const SOURCE_IRS_PUB_502 = "irs-pub-502-medical-expenses";
  const SOURCE_ERISA = "erisa-employer-health-plans";
  const SOURCE_FDA_503A = "fda-503a-compounding";

  const SOURCE_WLR_INSURER_COVERAGE = "wlr-insurer-coverage-index";

  const sourceIds: string[] = [
    SOURCE_KFF_EMPLOYER,
    SOURCE_KFF_MEDICAID,
    SOURCE_CMS_MEDICARE_PART_D,
    SOURCE_CMS_MEDICAID_RX,
    SOURCE_IRS_PUB_502,
    SOURCE_ERISA,
    SOURCE_FDA_503A,
    SOURCE_WLR_INSURER_COVERAGE,
  ];

  const faqs = [
    {
      question: `Does ${insurer.name} cover Wegovy?`,
      answer: insurer.wegovy_coverage,
    },
    {
      question: `Does ${insurer.name} cover Ozempic for weight loss?`,
      answer: `${insurer.ozempic_coverage} For weight-loss-only use without a diabetes diagnosis, ${insurer.name} typically does not cover Ozempic, since the drug is FDA-approved only for type 2 diabetes (Wegovy is the obesity-indicated semaglutide).`,
    },
    {
      question: `Does ${insurer.name} cover Zepbound?`,
      answer: insurer.zepbound_coverage,
    },
    {
      question: `Does ${insurer.name} cover Mounjaro?`,
      answer: insurer.mounjaro_coverage,
    },
    {
      question: `What's the copay for GLP-1 medications with ${insurer.name}?`,
      answer: `When ${insurer.name} does cover a GLP-1, the typical patient copay is ${insurer.typical_copay_with_coverage} per month. ${
        insurer.prior_auth_required
          ? "Prior authorization is almost always required, and many plans also require step therapy through metformin or another diabetes medication first."
          : "Coverage rules vary, so check your specific plan documents."
      }`,
    },
    {
      question: `How do I appeal a ${insurer.name} GLP-1 denial?`,
      answer: `If ${insurer.name} denies your GLP-1 prescription, you have the right to appeal. Steps: (1) request the written denial letter and the specific clinical criteria, (2) ask your prescriber to submit a Letter of Medical Necessity citing BMI, comorbidities, and prior failed weight-loss attempts, (3) file a formal appeal within the deadline (usually 60-180 days), (4) escalate to an external review if denied again. Many denials are overturned on appeal with proper documentation.`,
    },
    {
      question: `What if I can't get ${insurer.name} to cover GLP-1?`,
      answer: `If your appeal is denied, the most affordable cash-pay option is compounded semaglutide or tirzepatide through telehealth providers. Monthly costs typically range from $149-$299 for compounded GLP-1s versus $1,000-$1,350 for brand-name medications. Top providers serving denied patients include ${insurer.alternative_providers_when_denied.join(", ")}.`,
    },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Does ${insurer.name} Cover GLP-1 Medications? (2026)`,
    url: `https://weightlossrankings.org/insurance/${insurer.slug}`,
    description: `${insurer.name} GLP-1 coverage rules for Wegovy, Ozempic, Zepbound, and Mounjaro in 2026.`,
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={webPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insurance", url: "/insurance" },
          { name: insurer.name, url: `/insurance/${insurer.slug}` },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        <PageHero
          title={
            <>
              Does{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {insurer.name}
              </span>{" "}
              Cover GLP-1 Medications? (2026)
            </>
          }
          subtitle={`Coverage rules, copays, prior auth requirements, and appeal options for ${insurer.name} members seeking Wegovy, Ozempic, Zepbound, or Mounjaro.`}
        >
          <AffiliateDisclosure />
        </PageHero>

        <DYORCallout variant="compact" />

        {/* Coverage summary card */}
        <section className="rounded-2xl border border-brand-border bg-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm text-brand-text-muted uppercase tracking-wide">
                {insurer.name} GLP-1 Coverage
                {isMedicare ? (
                  <Citation source={SOURCE_CMS_MEDICARE_PART_D} n={3} />
                ) : isMedicaid ? (
                  <Citation source={SOURCE_KFF_MEDICAID} n={2} />
                ) : (
                  <Citation source={SOURCE_KFF_EMPLOYER} n={1} />
                )}
              </div>
              <div className="text-3xl font-bold text-brand-text-primary mt-1">
                {badge.label}
              </div>
              <div className="text-sm text-brand-text-secondary mt-2">
                {insurer.member_count.toLocaleString()} members ·{" "}
                {insurer.prior_auth_required
                  ? "Prior auth required"
                  : "No prior auth"}
                {insurer.prior_auth_required && !isMedicare && !isMedicaid && (
                  <Citation source={SOURCE_KFF_EMPLOYER} n={1} />
                )}
              </div>
            </div>
            <div
              className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold ${badge.className}`}
            >
              {badge.label}
            </div>
          </div>
        </section>

        {/* Coverage table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            Coverage by Medication
            <Citation source={SOURCE_WLR_INSURER_COVERAGE} n={8} />
          </h2>
          <div className="overflow-hidden rounded-xl border border-brand-border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-brand-surface">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-brand-text-primary">
                    Medication
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-text-primary">
                    {insurer.short_name} Coverage
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-brand-border">
                  <td className="px-4 py-3 font-medium text-brand-text-primary align-top">
                    Wegovy (semaglutide)
                  </td>
                  <td className="px-4 py-3 text-brand-text-secondary">
                    {insurer.wegovy_coverage}
                  </td>
                </tr>
                <tr className="border-t border-brand-border">
                  <td className="px-4 py-3 font-medium text-brand-text-primary align-top">
                    Ozempic (semaglutide)
                  </td>
                  <td className="px-4 py-3 text-brand-text-secondary">
                    {insurer.ozempic_coverage}
                  </td>
                </tr>
                <tr className="border-t border-brand-border">
                  <td className="px-4 py-3 font-medium text-brand-text-primary align-top">
                    Zepbound (tirzepatide)
                  </td>
                  <td className="px-4 py-3 text-brand-text-secondary">
                    {insurer.zepbound_coverage}
                  </td>
                </tr>
                <tr className="border-t border-brand-border">
                  <td className="px-4 py-3 font-medium text-brand-text-primary align-top">
                    Mounjaro (tirzepatide)
                  </td>
                  <td className="px-4 py-3 text-brand-text-secondary">
                    {insurer.mounjaro_coverage}
                  </td>
                </tr>
                <tr className="border-t border-brand-border bg-brand-surface/50">
                  <td className="px-4 py-3 font-medium text-brand-text-primary">
                    Typical copay (when covered)
                  </td>
                  <td className="px-4 py-3 text-brand-text-primary font-semibold">
                    {insurer.typical_copay_with_coverage} / month
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Denied section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text-primary">
            If You&apos;re Denied by {insurer.name}
          </h2>
          <p className="text-brand-text-secondary leading-relaxed">
            If {insurer.name} denies coverage for Wegovy or Zepbound, you
            still have affordable options. Compounded semaglutide and
            tirzepatide are dispensed by licensed 503A pharmacies
            <Citation source={SOURCE_FDA_503A} n={7} /> and cost $149-$299/month
            — a fraction of brand-name pricing. Brand-name GLP-1 medications
            are generally an HSA/FSA-eligible medical expense with a
            prescription<Citation source={SOURCE_IRS_PUB_502} n={5} />, and
            many plan administrators also accept compounded GLP-1s with a
            Letter of Medical Necessity. The providers below ship to all 50
            states and offer same-week prescriptions.
          </p>
          {isMedicare && (
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              <strong className="text-brand-text-primary">
                Medicare statutory note:
              </strong>{" "}
              Medicare Part D is statutorily prohibited from covering
              &ldquo;agents when used for anorexia, weight loss, or weight
              gain&rdquo; under § 1860D-2(e)(2)(A) of the Social Security Act.
              This is why Wegovy and Zepbound are not covered for obesity
              indications, even when they are otherwise on a plan&apos;s
              formulary for diabetes or cardiovascular indications
              <Citation source={SOURCE_CMS_MEDICARE_PART_D} n={3} />.
            </p>
          )}
          {isMedicaid && (
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              <strong className="text-brand-text-primary">
                Medicaid varies by state:
              </strong>{" "}
              Medicaid anti-obesity drug coverage is set at the state level
              and varies widely — some states cover Wegovy and Zepbound with
              prior authorization, while others exclude anti-obesity drugs
              from the formulary entirely
              <Citation source={SOURCE_CMS_MEDICAID_RX} n={4} />
              <Citation source={SOURCE_KFF_MEDICAID} n={2} />.
            </p>
          )}
          {!isMedicare && !isMedicaid && (
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              Many large employers offer self-funded health plans governed by
              ERISA rather than state insurance law, which gives them
              discretion over whether to cover anti-obesity medications
              <Citation source={SOURCE_ERISA} n={6} />. If your employer
              self-funds its plan, check the Summary Plan Description for the
              specific GLP-1 coverage language.
            </p>
          )}
          <div className="rounded-lg bg-brand-surface border border-brand-border p-4">
            <div className="text-sm font-semibold text-brand-text-primary mb-2">
              Appeal first
            </div>
            <p className="text-sm text-brand-text-secondary">
              Before going cash-pay, file a formal appeal with {insurer.name}.
              Many denials are overturned with a Letter of Medical Necessity
              from your prescriber documenting BMI, comorbidities, and prior
              failed weight-loss attempts.
            </p>
          </div>
        </section>

        {/* Provider grid */}
        <section aria-labelledby="providers-heading">
          <h2
            id="providers-heading"
            className="text-2xl font-bold text-brand-text-primary mb-6"
          >
            Top Compounded Alternatives
          </h2>
          {fallbackProviders.length > 0 ? (
            <ProviderGrid
              providers={fallbackProviders}
              trackingSource={`insurer_${insurer.slug}`}
            />
          ) : (
            <p className="text-brand-text-secondary">
              No alternative providers in our database yet.
            </p>
          )}
        </section>

        <FAQSection items={faqs} />

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CTAButton
            href="/research/glp1-insurance-coverage-medicare-medicaid-commercial"
            size="lg"
          >
            Read the Coverage Landscape
          </CTAButton>
          <CTAButton
            href="/tools/glp1-savings-calculator"
            size="lg"
            variant="outline"
          >
            Calculate Cash-Pay Savings
          </CTAButton>
        </div>

        <EmailCapture
          heading={`${insurer.name} Coverage Updates`}
          description={`Get notified when ${insurer.name} GLP-1 coverage rules change.`}
          source={`insurer_${insurer.slug}`}
        />

        <SourcesPanel sourceIds={sourceIds} dataAsOf={dataAsOf} />
      </div>
    </main>
  );
}
