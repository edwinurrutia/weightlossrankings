import type { Metadata } from "next";
import Link from "next/link";
import { getAllDrugs } from "@/lib/drugs";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";
import JsonLd from "@/components/shared/JsonLd";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

export const metadata: Metadata = {
  title: "GLP-1 Drug Guides — Semaglutide, Tirzepatide & More",
  description:
    "Comprehensive guides to GLP-1 medications: Semaglutide, Tirzepatide, Wegovy, Ozempic, Mounjaro, and Zepbound. Costs, side effects, and where to buy.",
  alternates: { canonical: "/drugs" },
};

export default function DrugsIndexPage() {
  const drugs = getAllDrugs();

  // CollectionPage schema with each drug as a Drug entity in hasPart.
  // Drug schema is recognized by Google's medical knowledge graph and
  // helps the index page rank as a topical hub for GLP-1 medications.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/drugs`,
    name: "GLP-1 Drug Guides",
    description:
      "Comprehensive guides to GLP-1 medications: Semaglutide, Tirzepatide, Wegovy, Ozempic, Mounjaro, Zepbound, and orforglipron.",
    url: `${SITE_URL}/drugs`,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "Weight Loss Rankings", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Weight Loss Rankings", url: SITE_URL },
    // hasPart uses WebPage references (not Drug) so each child page
    // is discoverable without triggering Google's Product rich-result
    // validation. Previously we emitted @type: Drug here without
    // offers/review/aggregateRating, which Google flagged as a
    // Product Snippets error. The ItemList in mainEntity below still
    // conveys the full list of drugs to the crawler, and each Drug
    // page emits its own full Drug + MedicalWebPage schema at the
    // leaf level with real offers from the provider dataset.
    hasPart: drugs.map((d) => ({
      "@type": "WebPage",
      "@id": `${SITE_URL}/drugs/${d.slug}`,
      name: d.name,
      url: `${SITE_URL}/drugs/${d.slug}`,
      description: d.description,
    })),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: drugs.length,
      itemListElement: drugs.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/drugs/${d.slug}`,
        name: d.name,
      })),
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <JsonLd data={collectionSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Drugs", url: "/drugs" },
        ]}
      />
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary">
          <span className="text-gradient">Drug Guides</span>
        </h1>
        <p className="text-brand-text-secondary text-lg mt-3 max-w-2xl mx-auto">
          In-depth guides to every GLP-1 medication — costs, side effects,
          dosing schedules, and where to buy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drugs.map((drug) => (
          <Link
            key={drug.slug}
            href={`/drugs/${drug.slug}`}
            className="rounded-2xl bg-white border border-brand-violet/10 p-6 hover:border-brand-violet/30 hover:shadow-md transition-all"
          >
            <h2 className="font-heading font-bold text-xl text-brand-text-primary">
              {drug.name}
            </h2>
            {drug.brand_names && drug.brand_names.length > 0 && (
              <p className="text-xs text-brand-violet uppercase tracking-wide mt-1">
                {drug.brand_names.join(" • ")}
              </p>
            )}
            <p className="text-sm text-brand-text-secondary mt-3 line-clamp-3">
              {drug.description}
            </p>
            <p className="text-sm font-semibold text-brand-violet mt-4">
              Read guide →
            </p>
          </Link>
        ))}
      </div>

      {/* Sources — FDA labels behind every drug listed on this index */}
      <div className="mt-12">
        <SourcesPanel
          sourceIds={[
            "fda-wegovy-approval",
            "fda-zepbound-approval",
            "fda-ozempic-label",
            "fda-mounjaro-label",
            "fda-rybelsus-label",
          ]}
          heading="Sources & methodology"
          dataAsOf={getLatestVerificationDate()}
        />
      </div>
    </div>
  );
}
