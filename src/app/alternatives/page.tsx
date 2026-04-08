import type { Metadata } from "next";
import Link from "next/link";
import { getAllProviders } from "@/lib/data";
import { sortProvidersByRank } from "@/lib/scoring";
import JsonLd from "@/components/shared/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

export const metadata: Metadata = {
  title: "GLP-1 Provider Alternatives — Compare Competitors",
  description:
    "Looking for an alternative to your current GLP-1 telehealth provider? Browse alternative competitor lists for every provider we track, ranked by our independent scoring methodology.",
  alternates: { canonical: "/alternatives" },
  openGraph: {
    title: "GLP-1 Provider Alternatives — Weight Loss Rankings",
    description:
      "Alternative competitor lists for every provider we track. Find a better fit for your budget and clinical needs.",
    type: "website",
    url: "/alternatives",
    siteName: "Weight Loss Rankings",
  },
  twitter: { card: "summary_large_image" },
};

export default async function AlternativesIndexPage() {
  const allProviders = await getAllProviders();
  const ranked = sortProvidersByRank(allProviders);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GLP-1 Provider Alternatives",
    description:
      "Alternative competitor lists for every GLP-1 telehealth provider, weight-loss program, and supplement we track.",
    url: `${SITE_URL}/alternatives`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Weight Loss Rankings",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: ranked.length,
      itemListElement: ranked.slice(0, 100).map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/alternatives/${p.slug}`,
        name: `${p.name} alternatives`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Alternatives", item: `${SITE_URL}/alternatives` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Provider alternatives
        </p>
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
        >
          GLP-1 provider alternatives
        </h1>
        <p className="mt-5 text-lg text-brand-text-secondary leading-relaxed max-w-2xl">
          Looking for an alternative to your current GLP-1 provider?
          Each provider we track has a dedicated alternatives page
          showing the top-ranked competitors in the same category.
          Pick a provider below to see its alternatives.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ranked.slice(0, 100).map((p) => (
          <Link
            key={p.slug}
            href={`/alternatives/${p.slug}`}
            className="block rounded-xl border border-brand-violet/15 bg-white p-5 hover:border-brand-violet/40 hover:shadow-md transition-all"
          >
            <h2 className="font-heading text-base font-bold text-brand-text-primary leading-tight">
              {p.name} alternatives
            </h2>
            <p className="text-xs text-brand-text-secondary mt-1">
              {p.category}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
