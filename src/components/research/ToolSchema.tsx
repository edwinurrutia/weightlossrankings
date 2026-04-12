import JsonLd from "@/components/shared/JsonLd";

export interface ToolSchemaProps {
  /** The tool's user-facing name (e.g., "GLP-1 Drug Interaction Checker"). */
  name: string;
  /** Short description for the SoftwareApplication entity. */
  description: string;
  /** Canonical URL of the tool page (absolute, with https://). */
  url: string;
  /**
   * Optional applicationCategory override. Defaults to "HealthApplication"
   * for clinical tools and "FinanceApplication" for cost tools.
   */
  applicationCategory?:
    | "HealthApplication"
    | "FinanceApplication"
    | "BusinessApplication"
    | "UtilitiesApplication";
  /**
   * Whether to ALSO emit MedicalWebPage JSON-LD. Set true for tools
   * that present clinical / pharmacokinetic / drug-information data
   * (drug interaction checker, washout calculator, BMI calculator,
   * weight loss calculator, dose plotter). Set false for cost /
   * insurance tools that don't make medical claims.
   *
   * When true, the tool gets BOTH SoftwareApplication AND
   * MedicalWebPage schemas — Google's medical knowledge graph
   * uses MedicalWebPage to recognize health content; Google's
   * SERP renders SoftwareApplication with a "tool" treatment.
   * The two are complementary.
   */
  isMedical: boolean;
  /** Optional image URL (typically the per-route OG image). */
  image?: string;
  /**
   * Optional medical condition / drug class this tool is "about".
   * Defaults to GLP-1 receptor agonists. Only used when isMedical
   * is true.
   */
  medicalAbout?: {
    name: string;
    alternateName?: string[];
  };
  /**
   * Optional published / last-updated dates so the freshness signal
   * matches the rest of the site. Both should be ISO YYYY-MM-DD.
   */
  datePublished?: string;
  dateModified?: string;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.weightlossrankings.org";

const DEFAULT_GLP1_DRUG = {
  name: "GLP-1 receptor agonists",
  alternateName: [
    "Glucagon-like peptide-1 receptor agonists",
    "Semaglutide",
    "Tirzepatide",
    "Orforglipron",
  ],
};

/**
 * Emits SoftwareApplication JSON-LD for any tool, plus optionally
 * MedicalWebPage JSON-LD for clinically-oriented tools (drug
 * interaction checkers, calculators that present pharmacokinetic
 * or trial data, etc.).
 *
 * Why both schemas:
 *   - SoftwareApplication tells Google "this is a tool" — Google's
 *     SERP can render it with a tool treatment, and the operating
 *     system / browserRequirements / applicationCategory feed the
 *     "About this tool" panel.
 *   - MedicalWebPage tells Google's medical knowledge graph "this
 *     is patient-facing health content" — required to compete on
 *     YMYL queries and feeds the "About this result" panel.
 *
 * The two are complementary, not duplicative. Google handles
 * multiple JSON-LD blocks on the same page natively.
 *
 * Best practice: pass `isMedical={true}` for tools that present
 * clinical data (drug interactions, half-life, dose schedules,
 * BMI eligibility, weight-loss predictions). Pass `false` for
 * pure cost / insurance / utility tools.
 */
export default function ToolSchema({
  name,
  description,
  url,
  applicationCategory,
  isMedical,
  image,
  medicalAbout,
  datePublished,
  dateModified,
}: ToolSchemaProps) {
  // Default applicationCategory based on whether it's medical
  const category =
    applicationCategory ??
    (isMedical ? "HealthApplication" : "FinanceApplication");

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "Web Browser (any)",
    // Browser requirements: every tool is a pure-client SPA component
    // wrapped in a Next.js server-rendered page. Works in any modern
    // browser without plugins.
    browserRequirements: "Requires JavaScript enabled in modern browsers.",
    // offers.price = 0 with priceCurrency = USD signals "free tool"
    // which Google rewards with a free-tool badge in some SERP renders.
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
      url: SITE_URL,
    },
    ...(image ? { image } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };

  // lastReviewed fallback chain: prefer the per-tool dateModified,
  // fall back to datePublished, fall back to today's date. Google's
  // MedicalWebPage spec treats lastReviewed as a trust signal that
  // editorial review is current — never omit it, because the YMYL
  // category penalizes undated medical content.
  const lastReviewed =
    dateModified ?? datePublished ?? new Date().toISOString().slice(0, 10);

  const medicalSchema = isMedical
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name,
        description,
        url,
        lastReviewed,
        ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
        inLanguage: "en-US",
        medicalAudience: {
          "@type": "MedicalAudience",
          audienceType: "Patient",
        },
        // Schema.org type: DrugClass (https://schema.org/DrugClass) —
        // "a class of medical drugs, e.g., statins." GLP-1 receptor
        // agonists is a drug class, not a specific product. DrugClass
        // is NOT in Google's Product rich-result pipeline, so it does
        // not trigger the "Either offers, review, or aggregateRating
        // should be specified" error that Drug does. If a caller
        // passes a specific branded drug via medicalAbout it will
        // still render as DrugClass; that's a minor semantic compromise
        // but is accurate for most tool use cases (half-life
        // calculators, dose converters, etc. cover the whole class).
        about: {
          "@type": "DrugClass",
          ...(medicalAbout ?? DEFAULT_GLP1_DRUG),
        },
        reviewedBy: {
          "@type": "Organization",
          name: "Weight Loss Rankings",
          url: SITE_URL,
        },
        mainContentOfPage: {
          "@type": "WebPageElement",
          cssSelector: "main",
        },
      }
    : null;

  // BreadcrumbList JSON-LD — auto-generated from the canonical
  // tool URL so every tool gets a Home → Tools → [Tool name]
  // breadcrumb rich-result without each tool page having to
  // declare it manually. The Wave 5 SEO audit found that none of
  // the 14 tool pages were emitting BreadcrumbList, while the
  // research articles, reviews, states, drugs, insurance, and
  // pharmacies pages all already had them. Adding it here once
  // retrofits all 14 tools in a single change.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: url,
      },
    ],
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      {medicalSchema && <JsonLd data={medicalSchema} />}
    </>
  );
}
