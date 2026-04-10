import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import { getAllProviders } from "@/lib/data";
import { sortProvidersByRank } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "Compare GLP-1 Providers, Programs & Prices",
  description:
    "Compare 100+ GLP-1 telehealth providers, weight loss programs, and supplements side by side. Filter by price, features, insurance acceptance, and more.",
  alternates: {
    canonical: "/compare",
  },
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

// Server-side schema for the compare page. The page itself is a
// client component (interactive filters/sort), so the schema lives
// in this layout where it can read the provider registry at request
// time. Emits CollectionPage + ItemList + BreadcrumbList.
//
// Why this matters: the compare page is the highest-commercial-intent
// query target on the site ("compare GLP-1 providers", "best
// telehealth weight loss"). Without ItemList schema Google can't
// render it as a comparison rich-result. This was caught in the
// 2026-04-08 schema audit as the single highest-priority gap.
export default async function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allProviders = await getAllProviders();
  // Use the same scoring sort that the page itself defaults to so the
  // schema's positional order matches what Google's crawler sees on
  // the rendered page.
  const ranked = sortProvidersByRank(allProviders);

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Compare GLP-1 Providers, Programs & Prices",
    description:
      "Compare 100+ GLP-1 telehealth providers, weight loss programs, and supplements side by side. Filter by price, features, insurance acceptance, and more.",
    url: `${SITE_URL}/compare`,
    isPartOf: {
      "@type": "WebSite",
      name: "Weight Loss Rankings",
      url: SITE_URL,
    },
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: ranked.length,
      itemListElement: ranked.slice(0, 50).map((provider, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/reviews/${provider.slug}`,
        name: provider.name,
      })),
    },
  };

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
        name: "Compare",
        item: `${SITE_URL}/compare`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
