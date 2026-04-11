import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getDrugBySlug, getAllDrugSlugs } from "@/lib/drugs";
import { getAllProviders } from "@/lib/data";
import { sortProvidersByRank } from "@/lib/scoring";
import type { Provider } from "@/lib/types";
import AffiliateDisclosure from "@/components/shared/AffiliateDisclosure";
import ProviderGrid from "@/components/providers/ProviderGrid";
import CTAButton from "@/components/shared/CTAButton";
import StickyCTABar from "@/components/shared/StickyCTABar";
import JsonLd from "@/components/shared/JsonLd";
import PageHero from "@/components/marketing/PageHero";
import FAQSection from "@/components/marketing/FAQSection";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Citation from "@/components/research/Citation";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";
import { RESEARCH_ARTICLES, isSpanishResearchSlug } from "@/lib/research";

export function generateStaticParams() {
  return getAllDrugSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: drug } = await params;
  const drugData = getDrugBySlug(drug);
  if (!drugData) return {};

  const title = `${drugData.name} Guide: Cost, Side Effects & Where to Get It`;
  const description = `Everything you need to know about ${drugData.name}: FDA status, how it works, dosing schedule, side effects, clinical trial results, and where to get it at the best price.`;

  // Use the editorial verification date as the modifiedTime signal for
  // Google's medical-content crawler. We intentionally do NOT use
  // Date.now() here — that would falsely mark the page as "updated"
  // on every deploy even when the FDA label and trial data haven't
  // been re-verified. verification.last_verified is the only honest
  // freshness signal we have, and it's set by the editorial team when
  // they cross-check primary sources.
  const drugVerifiedDate =
    (drugData as { verification?: { last_verified?: string } }).verification
      ?.last_verified ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: `/drugs/${drug}` },
    openGraph: {
      title,
      description,
      url: `/drugs/${drug}`,
      type: "article",
      siteName: "Weight Loss Rankings",
      ...(drugVerifiedDate ? { modifiedTime: drugVerifiedDate } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// Drug slug classification used to filter providers and price rows
// per drug page. Maps each /drugs/[slug] URL to:
//   - the generic molecule the drug belongs to (lowercased)
//   - whether the slug is a brand page (Wegovy, Ozempic, etc.) that
//     should only match brand-form pricing rows, or a molecule page
//     (semaglutide, tirzepatide) that should match all forms
//   - the exact brand string to look for in features[] / pricing[].dose
//
// Previously the page reported the same offerCount / lowPrice /
// highPrice for every drug because filterProvidersByDrug returned
// all 154 GLP-1 providers regardless of slug. That made
// /drugs/foundayo falsely report "$25 low from 113 providers" —
// valid schema but dishonest pricing data.
interface DrugSlugProfile {
  molecule: "semaglutide" | "tirzepatide" | "orforglipron" | "liraglutide" | null;
  brandName: string | null; // null = molecule page, matches all forms
}

const DRUG_SLUG_PROFILES: Record<string, DrugSlugProfile> = {
  // Molecule pages — match any form of the molecule
  semaglutide: { molecule: "semaglutide", brandName: null },
  tirzepatide: { molecule: "tirzepatide", brandName: null },
  // Brand pages — match only brand-form rows for the molecule OR
  // providers whose features[] explicitly mention the brand name
  wegovy: { molecule: "semaglutide", brandName: "Wegovy" },
  ozempic: { molecule: "semaglutide", brandName: "Ozempic" },
  rybelsus: { molecule: "semaglutide", brandName: "Rybelsus" },
  zepbound: { molecule: "tirzepatide", brandName: "Zepbound" },
  mounjaro: { molecule: "tirzepatide", brandName: "Mounjaro" },
  // Foundayo (orforglipron) is a brand of its own molecule — brand
  // and molecule coincide because there's no compounded orforglipron.
  foundayo: { molecule: "orforglipron", brandName: "Foundayo" },
};

function getProfileForSlug(slug: string): DrugSlugProfile {
  return (
    DRUG_SLUG_PROFILES[slug] ?? { molecule: null, brandName: null }
  );
}

// Returns the price rows on a provider that are actually relevant
// to the given drug slug. A molecule page returns all rows for that
// molecule (compounded + brand). A brand page returns only the
// brand-form rows for that molecule, OR all molecule rows if the
// provider's features[] explicitly lists the brand (which means
// they carry the brand-name version).
function getRelevantPricingForDrug(
  provider: Provider,
  profile: DrugSlugProfile,
): Provider["pricing"] {
  if (!provider.pricing || provider.pricing.length === 0) return [];
  if (!profile.molecule) return provider.pricing;
  const featuresLower = (provider.features ?? [])
    .join(" ")
    .toLowerCase();
  const brandLower = profile.brandName?.toLowerCase() ?? null;
  const providerMentionsBrand =
    brandLower !== null && featuresLower.includes(brandLower);

  return provider.pricing.filter((row) => {
    // Row must match the target molecule (via pricing[].drug, if set)
    // OR be brand-form from a provider that explicitly mentions the
    // brand in its features (covers brand drugs stored in features[]
    // without drug= on the row itself).
    const rowDrug = row.drug?.toLowerCase() ?? null;
    if (rowDrug !== null && rowDrug !== profile.molecule) return false;

    if (profile.brandName === null) {
      // Molecule page — any form is fine
      return true;
    }

    // Brand page logic:
    //   1. If row.form is explicitly "brand" AND either (a) the
    //      provider's features include the brand, or (b) the row's
    //      dose string mentions the brand name.
    //   2. If the provider's features explicitly list the brand,
    //      count all brand-form rows for the matching molecule.
    if (row.form !== "brand") return false;
    const doseMentions = row.dose
      ?.toLowerCase()
      .includes(brandLower ?? "") ?? false;
    return providerMentionsBrand || doseMentions;
  });
}

// Cheapest monthly cost for the rows relevant to this drug slug.
function getMinPriceForDrug(
  provider: Provider,
  profile: DrugSlugProfile,
): number | null {
  const rows = getRelevantPricingForDrug(provider, profile);
  if (rows.length === 0) return null;
  return Math.min(
    ...rows.map((p) => p.promo_price ?? p.monthly_cost),
  );
}

// Filter GLP-1 providers to those with at least one price row
// matching this drug slug. Brand pages get only providers that
// actually carry the brand; molecule pages get every provider that
// carries any form of the molecule.
function filterProvidersByDrug(
  providers: Provider[],
  profile: DrugSlugProfile,
): Provider[] {
  return providers.filter((p) => {
    if (p.category !== "GLP-1 Provider") return false;
    const rows = getRelevantPricingForDrug(p, profile);
    return rows.length > 0;
  });
}

export default async function DrugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: drug } = await params;
  const drugData = getDrugBySlug(drug);

  if (!drugData) {
    notFound();
  }

  const allProviders = await getAllProviders();
  const drugProfile = getProfileForSlug(drug);
  const glp1Providers = filterProvidersByDrug(allProviders, drugProfile);

  // Sort by score desc with verification tiebreak for the grid (top 6).
  const topProviders = sortProvidersByRank(glp1Providers).slice(0, 6);

  // For cost comparison table: sort by cheapest DRUG-SPECIFIC price
  // (not all-drug min price). This is the honest per-drug price
  // signal used in both the visible table and the AggregateOffer
  // schema emitted for Google. Previously the schema reported the
  // same $25–$1350 range on every drug page because the filter
  // returned all GLP-1 providers and minPrice was cross-molecule.
  const providersWithPrice = glp1Providers
    .map((p) => ({
      provider: p,
      minPrice: getMinPriceForDrug(p, drugProfile),
    }))
    .filter((item) => item.minPrice !== null)
    .sort((a, b) => (a.minPrice as number) - (b.minPrice as number));

  // Honest "Updated" date. The drug page is a live view over
  // providers.json (cost comparison table + top provider grid) plus
  // the editorially-verified drug record. Using Date.now() here
  // would stamp every page with today's date on every deploy —
  // "fake freshness" that YMYL quality algorithms penalize.
  //
  // We use the site-wide most-recent verification date instead. It's
  // honest (it's a real date, sourced from the editorial verification
  // system) and it's typically within the last few days because we
  // re-verify providers constantly. The drug's own verification date
  // takes precedence — if the drug was re-verified more recently than
  // the most-recent provider verification, use that.
  const drugVerifiedRaw =
    (drugData as { verification?: { last_verified?: string } }).verification
      ?.last_verified ?? null;
  const siteLatest = getLatestVerificationDate();
  // Compare as lexicographic YYYY-MM-DD — works because both are
  // in ISO date format at source.
  const latestContentDate =
    drugVerifiedRaw && siteLatest && drugVerifiedRaw > siteLatest
      ? drugVerifiedRaw
      : siteLatest ?? drugVerifiedRaw ?? null;
  const updatedDate = latestContentDate
    ? new Date(latestContentDate + "T00:00:00").toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
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

  // -------------------------------------------------------------------
  // Per-drug citation plan. Each drug page cites the FDA label for its
  // specific molecule plus the pivotal Phase 3 trial(s) behind its
  // efficacy and safety claims. The order here determines the numbering
  // in the inline markers and the SourcesPanel below.
  // -------------------------------------------------------------------
  interface DrugCitationPlan {
    fdaLabel: string;
    fdaApprovalExtra?: string;
    pivotalTrial: string;
    headToHead?: string;
    cvOutcomes?: string;
    t2dGuideline?: string;
  }

  const CITATION_PLANS: Record<string, DrugCitationPlan> = {
    semaglutide: {
      fdaLabel: "fda-wegovy-approval",
      fdaApprovalExtra: "fda-ozempic-label",
      pivotalTrial: "step1-nejm-2021",
      headToHead: "surmount5-nejm-2025",
      cvOutcomes: "select-nejm-2023",
      t2dGuideline: "ada-standards-of-care-2025",
    },
    wegovy: {
      fdaLabel: "fda-wegovy-approval",
      pivotalTrial: "step1-nejm-2021",
      headToHead: "surmount5-nejm-2025",
      cvOutcomes: "select-nejm-2023",
    },
    ozempic: {
      fdaLabel: "fda-ozempic-label",
      pivotalTrial: "sustain6-nejm-2016",
      cvOutcomes: "sustain6-nejm-2016",
      t2dGuideline: "ada-standards-of-care-2025",
    },
    rybelsus: {
      fdaLabel: "fda-rybelsus-label",
      pivotalTrial: "oasis1-lancet-2023",
      t2dGuideline: "ada-standards-of-care-2025",
    },
    tirzepatide: {
      fdaLabel: "fda-zepbound-approval",
      fdaApprovalExtra: "fda-mounjaro-label",
      pivotalTrial: "surmount1-nejm-2022",
      headToHead: "surmount5-nejm-2025",
      t2dGuideline: "ada-standards-of-care-2025",
    },
    zepbound: {
      fdaLabel: "fda-zepbound-approval",
      pivotalTrial: "surmount1-nejm-2022",
      headToHead: "surmount5-nejm-2025",
    },
    mounjaro: {
      fdaLabel: "fda-mounjaro-label",
      pivotalTrial: "surpass2-nejm-2021",
      t2dGuideline: "ada-standards-of-care-2025",
    },
  };

  const plan: DrugCitationPlan =
    CITATION_PLANS[drug] ?? {
      fdaLabel: "fda-wegovy-approval",
      pivotalTrial: "step1-nejm-2021",
    };

  // Ordered list of sources rendered on this page. Deduped but preserves
  // first-seen order so inline n markers stay sequential.
  const citationOrder: string[] = [];
  const pushCite = (id?: string) => {
    if (id && !citationOrder.includes(id)) citationOrder.push(id);
  };
  pushCite(plan.fdaLabel);
  pushCite(plan.fdaApprovalExtra);
  pushCite(plan.pivotalTrial);
  pushCite(plan.headToHead);
  pushCite(plan.cvOutcomes);
  pushCite(plan.t2dGuideline);
  // Shared regulatory/compliance sources referenced on every drug page
  pushCite("fda-503a-compounding");
  pushCite("fda-drug-shortage-list");
  pushCite("irs-pub-502-medical-expenses");

  // Helper: 1-based display number for a source id.
  const n = (id: string): number => {
    const idx = citationOrder.indexOf(id);
    return idx === -1 ? 0 : idx + 1;
  };

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

  // Rich Drug schema for YMYL E-E-A-T. Schema.org's Drug type
  // supports many more fields than the original 3-field version —
  // populating them all gives Google more confidence that this is
  // a real drug profile and not generic content. Each field is
  // sourced from the editorially-curated Drug record.
  const drugSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Drug",
    name: drugData.name,
    alternateName: drugData.brand_names,
    description: drugData.description,
    nonProprietaryName: drugData.generic_name,
    activeIngredient: drugData.generic_name,
    proprietaryName: drugData.brand_names,
    mechanismOfAction: drugData.how_it_works,
    legalStatus: "PrescriptionOnly",
    recognizingAuthority: {
      "@type": "Organization",
      name: "U.S. Food and Drug Administration",
      url: "https://www.fda.gov",
    },
    relevantSpecialty: ["Endocrinology", "Bariatric medicine"],
    url: `https://weightlossrankings.org/drugs/${drug}`,
  };
  if (drugData.fda_status) {
    drugSchema.clinicalPharmacology = drugData.fda_status;
  }
  if (drugData.side_effects) {
    drugSchema.warning = drugData.side_effects;
  }
  if (drugData.dosing_schedule && drugData.dosing_schedule.length > 0) {
    drugSchema.doseSchedule = drugData.dosing_schedule.map((d) => ({
      "@type": "DoseSchedule",
      doseValue: d.dose,
      doseUnit: "mg",
      frequency: d.week_range,
    }));
  }

  // ── Schema.org Drug enrichment fields (added 2026-04-09 per the
  // deep SEO audit). Each field maps to a documented Schema.org Drug
  // property and is sourced from the FDA prescribing information for
  // each drug. These properties feed Google's medical knowledge graph
  // and the "About this result" panel for queries about specific drugs.
  if (drugData.drug_class) {
    drugSchema.drugClass = drugData.drug_class;
  }
  if (drugData.dosage_form) {
    drugSchema.dosageForm = drugData.dosage_form;
  }
  if (drugData.admin_route) {
    drugSchema.administrationRoute = drugData.admin_route;
  }
  if (drugData.available_strength && drugData.available_strength.length > 0) {
    drugSchema.availableStrength = drugData.available_strength;
  }
  if (drugData.manufacturer) {
    drugSchema.manufacturer = {
      "@type": "Organization",
      name: drugData.manufacturer.name,
      ...(drugData.manufacturer.url ? { url: drugData.manufacturer.url } : {}),
    };
  }
  if (drugData.prescribing_info) {
    drugSchema.prescribingInfo = drugData.prescribing_info;
  }
  if (drugData.indication) {
    drugSchema.indication = drugData.indication;
  }
  if (drugData.approval_date) {
    drugSchema.approvalStatus = `FDA-approved ${drugData.approval_date}`;
  }

  // offers — real AggregateOffer sourced from providersWithPrice
  // (computed earlier for the Cost Comparison table). Required by
  // Google's Product rich-result pipeline when @type is Drug, or
  // Google flags the schema with "Either offers, review, or
  // aggregateRating should be specified" as seen in GSC 2026-04-11
  // on /research/hrt-perimenopause-glp1-women-weight.
  //
  // Using AggregateOffer (not Offer) because the Drug is offered at
  // many prices across many providers — Google prefers the aggregate
  // when offerCount > 1. lowPrice/highPrice come from the full
  // sorted array so the range matches what renders on the page.
  const cheapestProvider = providersWithPrice[0];
  if (cheapestProvider && cheapestProvider.minPrice !== null) {
    const highestProvider = providersWithPrice[providersWithPrice.length - 1];
    // priceValidUntil: rolling 90-day window from the editorial
    // verification date. Google requires this on Offer — using a
    // real verification-tied window keeps the freshness signal
    // honest while satisfying the schema requirement.
    const priceValidBase = drugVerifiedRaw
      ? new Date(drugVerifiedRaw + "T00:00:00")
      : new Date();
    priceValidBase.setDate(priceValidBase.getDate() + 90);
    drugSchema.offers = {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: cheapestProvider.minPrice,
      highPrice: highestProvider?.minPrice ?? cheapestProvider.minPrice,
      offerCount: providersWithPrice.length,
      availability: "https://schema.org/InStock",
      url: `https://weightlossrankings.org/drugs/${drug}`,
      priceValidUntil: priceValidBase.toISOString().slice(0, 10),
    };
  }

  // Give the Drug schema a canonical @id so MedicalWebPage.about can
  // reference it by @id instead of re-declaring a duplicate Drug
  // entity (which also triggered the Product Snippets error before
  // this pass). The @id uses a fragment so the Drug is a named node
  // within the page graph.
  drugSchema["@id"] = `https://weightlossrankings.org/drugs/${drug}#drug`;

  // Freshness signal for Google's medical content crawler. We use the
  // drug entry's verification.last_verified date (the date the editorial
  // team last cross-checked the FDA label + trial data) as the
  // authoritative dateModified. This is more honest than using today's
  // date, which would falsely imply the content was reviewed on every
  // deploy. Schema.org/Drug doesn't have a dateModified property of its
  // own, so we emit a parallel MedicalWebPage wrapper that does.
  const drugVerifiedDate =
    (drugData as { verification?: { last_verified?: string } }).verification
      ?.last_verified ?? drugData.approval_date ?? undefined;

  // MedicalWebPage wraps the Drug schema in a medical-content-specific
  // container that Google uses for the medical knowledge panel and
  // health E-E-A-T scoring. It's separate from the Drug schema and
  // surfaces the editorial review metadata (dateModified, reviewedBy,
  // lastReviewed) that Drug alone doesn't expose.
  const medicalWebPageSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${drugData.name} Guide: Cost, Side Effects & Where to Get It`,
    description: drugData.description,
    url: `https://weightlossrankings.org/drugs/${drug}`,
    // Reference the top-level Drug schema by @id instead of
    // redeclaring a duplicate Drug entity. This avoids emitting the
    // same Drug twice (once at the top level with full fields +
    // offers, once here as a nested stub) — Google flags duplicate
    // Drug entities on the same page as separate Products for rich-
    // result validation, which caused the "offers/review/
    // aggregateRating" error on the wider site before this pass.
    about: {
      "@id": `https://weightlossrankings.org/drugs/${drug}#drug`,
    },
    medicalAudience: [
      { "@type": "MedicalAudience", audienceType: "Patient" },
      { "@type": "MedicalAudience", audienceType: "Caregiver" },
    ],
    specialty: "Endocrinology",
    ...(drugVerifiedDate ? { dateModified: drugVerifiedDate } : {}),
    ...(drugVerifiedDate ? { lastReviewed: drugVerifiedDate } : {}),
    reviewedBy: {
      "@type": "Organization",
      name: "Weight Loss Rankings Editorial Team",
      url: "https://weightlossrankings.org/editorial-policy",
    },
  };

  // Related research: find articles that mention this drug's name or
  // generic name in their tags or title. Excludes articles that are
  // obviously unrelated. Sorted by lastUpdated desc, limit 6.
  //
  // Language filter: /drugs/[slug] is the English route — Spanish
  // drug guides live at /es/drugs/[slug]. We exclude Spanish research
  // articles from the English drug page's Related Research list so
  // we never send an English reader to a /es/research/... page they
  // can't read. Spanish drug pages will mirror this logic when they
  // ship, filtering the other direction.
  const drugNameLower = drugData.name.toLowerCase();
  const genericLower = drugData.generic_name.toLowerCase();
  const brandNamesLower = drugData.brand_names.map((b) => b.toLowerCase());
  const relatedResearch = RESEARCH_ARTICLES.filter((article) => {
    if (isSpanishResearchSlug(article.slug)) return false;
    const haystack = (
      article.title +
      " " +
      article.description +
      " " +
      article.tags.join(" ")
    ).toLowerCase();
    return (
      haystack.includes(drugNameLower) ||
      haystack.includes(genericLower) ||
      brandNamesLower.some((b) => haystack.includes(b))
    );
  })
    .sort((a, b) => (b.lastUpdated || "").localeCompare(a.lastUpdated || ""))
    .slice(0, 6);

  const topProvider = topProviders[0];
  const topProviderMinPrice = topProvider
    ? getMinPriceForDrug(topProvider, drugProfile)
    : null;

  return (
    <main className="min-h-screen bg-brand-bg pb-24 lg:pb-0">
      <JsonLd data={drugSchema} />
      <JsonLd data={medicalWebPageSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Drug Guides", url: "/drugs" },
          { name: drugData.name, url: `/drugs/${drug}` },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Drug Guides", href: "/drugs" },
            { label: drugData.name },
          ]}
          className="mb-0"
        />

        <PageHero
          badges={[
            { icon: "", text: "FDA Reviewed" },
            { icon: "", text: `Updated ${updatedDate}` },
          ]}
          title={
            <>
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {drugData.name}
              </span>{" "}
              Guide
            </>
          }
          subtitle={drugData.description}
        >
          <AffiliateDisclosure />
        </PageHero>

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
                    <Citation source={plan.fdaLabel} n={n(plan.fdaLabel)} />
                    {plan.fdaApprovalExtra && (
                      <Citation
                        source={plan.fdaApprovalExtra}
                        n={n(plan.fdaApprovalExtra)}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-brand-text-secondary bg-gray-50">
                    Approval Date
                  </td>
                  <td className="py-3.5 px-5 text-brand-text-primary">
                    {formattedApprovalDate}
                    <Citation source={plan.fdaLabel} n={n(plan.fdaLabel)} />
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
            <Citation source={plan.pivotalTrial} n={n(plan.pivotalTrial)} />
            {plan.t2dGuideline && (
              <Citation
                source={plan.t2dGuideline}
                n={n(plan.t2dGuideline)}
              />
            )}
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
            effects. Always follow your prescriber&apos;s guidance and the
            current FDA label
            <Citation source={plan.fdaLabel} n={n(plan.fdaLabel)} />.
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
              <Citation source={plan.fdaLabel} n={n(plan.fdaLabel)} />
              <Citation
                source={plan.pivotalTrial}
                n={n(plan.pivotalTrial)}
              />
            </p>
            <p className="mt-4 text-xs text-brand-text-secondary/70">
              This is not a complete list. Consult your healthcare provider or
              prescriber for full safety information. The complete adverse
              reaction profile is published in the current FDA prescribing
              information
              <Citation source={plan.fdaLabel} n={n(plan.fdaLabel)} />.
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
                <Citation
                  source={plan.pivotalTrial}
                  n={n(plan.pivotalTrial)}
                />
                {plan.headToHead && (
                  <Citation
                    source={plan.headToHead}
                    n={n(plan.headToHead)}
                  />
                )}
                {plan.cvOutcomes && plan.cvOutcomes !== plan.pivotalTrial && (
                  <Citation
                    source={plan.cvOutcomes}
                    n={n(plan.cvOutcomes)}
                  />
                )}
              </p>
              <footer className="mt-3 text-xs text-brand-text-secondary/70">
                Source: Published clinical trial data (STEP / SURMOUNT trial
                series) — see the Sources panel below for full citations.
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
            providers, sorted cheapest first. Compounded{" "}
            {drugData.generic_name.toLowerCase()} from licensed 503A and 503B
            pharmacies is legal under federal compounding law
            <Citation
              source="fda-503a-compounding"
              n={n("fda-503a-compounding")}
            />, with additional tolerances historically allowed while the
            molecule has appeared on the FDA Drug Shortage List
            <Citation
              source="fda-drug-shortage-list"
              n={n("fda-drug-shortage-list")}
            />. Both compounded and brand-name prescriptions are generally
            FSA/HSA eligible under IRS Publication 502
            <Citation
              source="irs-pub-502-medical-expenses"
              n={n("irs-pub-502-medical-expenses")}
            />. Prices may vary based on dose and promo availability.
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
                        {getRelevantPricingForDrug(provider, drugProfile).find(
                          (p) => (p.promo_price ?? p.monthly_cost) === minPrice
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

        {/* Related Research — internal cross-links from this drug
            to the research articles that cover it. Pure internal-
            linking SEO: gives search engines a crawl path from the
            drug hub to its supporting scientific deep-dives and
            vice versa, and gives readers a natural next step after
            the drug overview. */}
        {relatedResearch.length > 0 && (
          <section
            aria-labelledby="related-research-heading"
            className="space-y-4"
          >
            <h2
              id="related-research-heading"
              className="text-xl font-bold text-brand-text-primary"
            >
              Related Research on {drugData.name}
            </h2>
            <p className="text-sm text-brand-text-secondary">
              Deep-dive articles from our research desk with primary-source
              trial data, FDA label verification, and editorial analysis.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedResearch.map((article) => (
                <Link
                  key={article.slug}
                  href={`/research/${article.slug}`}
                  className="group block rounded-xl border border-brand-violet/10 bg-white p-4 shadow-sm transition hover:border-brand-violet/40 hover:shadow-md"
                >
                  <div className="text-sm font-semibold text-brand-text-primary group-hover:text-brand-violet">
                    {article.title}
                  </div>
                  <div className="mt-1 text-xs text-brand-text-secondary line-clamp-2">
                    {article.description}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-brand-text-secondary/70">
                    <span>{article.readMinutes} min read</span>
                    <span aria-hidden>·</span>
                    <span>{article.citations} citations</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FAQSection items={faqItems} />

        {/* Central citation registry — matches numbering used above */}
        <SourcesPanel
          sourceIds={citationOrder}
          heading="Sources & methodology"
          dataAsOf={getLatestVerificationDate()}
        />

        {/* Trademark notice */}
        <aside className="rounded-2xl bg-brand-text-secondary/5 border border-brand-text-secondary/10 p-5 text-xs text-brand-text-secondary leading-relaxed">
          <p>
            <strong className="text-brand-text-primary">Trademark Notice:</strong> Wegovy®, Ozempic®, and Rybelsus® are
            registered trademarks of Novo Nordisk A/S. Mounjaro® and Zepbound® are registered trademarks of Eli Lilly and
            Company. WeightLossRankings.org uses these names only to identify the products discussed in this guide. We are
            not affiliated with Novo Nordisk, Eli Lilly, or any pharmaceutical manufacturer.{" "}
            <Link href="/trademarks" className="text-brand-violet underline">
              Full trademark disclaimer →
            </Link>
          </p>
        </aside>
      </div>

      {topProvider && topProvider.affiliate_url && (
        <StickyCTABar
          provider={{
            name: topProvider.name,
            slug: topProvider.slug,
            price: topProviderMinPrice,
            affiliateUrl: topProvider.affiliate_url,
          }}
          trackingSource={`drug_${drug}_sticky`}
        />
      )}
    </main>
  );
}
