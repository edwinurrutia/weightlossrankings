import type { Metadata } from "next";
import Link from "next/link";
import { getAllProviders } from "@/lib/data";
import { sortProvidersByRank } from "@/lib/scoring";
import JsonLd from "@/components/shared/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.weightlossrankings.org";

export const metadata: Metadata = {
  title: "GLP-1 Provider Reviews — Independent Editorial Reviews",
  description:
    "Independent editorial reviews of every GLP-1 telehealth provider, weight-loss program, and supplement we track. Each review uses the same six-dimension scoring methodology.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "GLP-1 Provider Reviews — Weight Loss Rankings",
    description:
      "Independent reviews of every provider we track, scored across value, clinical effectiveness, user experience, safety, accessibility, and ongoing support.",
    type: "website",
    url: "/reviews",
    siteName: "Weight Loss Rankings",
  },
  twitter: { card: "summary_large_image" },
};

export default async function ReviewsIndexPage() {
  const allProviders = await getAllProviders();
  const ranked = sortProvidersByRank(allProviders);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GLP-1 Provider Reviews",
    description:
      "Independent editorial reviews of every GLP-1 telehealth provider, weight-loss program, and supplement we track.",
    url: `${SITE_URL}/reviews`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Weight Loss Rankings",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: ranked.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: ranked.slice(0, 100).map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/reviews/${p.slug}`,
        name: p.name,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Reviews", item: `${SITE_URL}/reviews` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Editorial reviews
        </p>
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
        >
          GLP-1 provider reviews
        </h1>
        <p className="mt-5 text-lg text-brand-text-secondary leading-relaxed max-w-2xl">
          Independent editorial reviews of every GLP-1 telehealth
          provider, weight-loss program, and supplement we track.
          {" "}
          {ranked.length} reviews total, ranked by our six-dimension
          scoring methodology.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ranked.slice(0, 100).map((p) => (
          <Link
            key={p.slug}
            href={`/reviews/${p.slug}`}
            className="block rounded-xl border border-brand-violet/15 bg-white p-5 hover:border-brand-violet/40 hover:shadow-md transition-all"
          >
            <h2 className="font-heading text-base font-bold text-brand-text-primary leading-tight">
              {p.name}
            </h2>
            <p className="text-xs text-brand-text-secondary mt-1">
              {p.category}
            </p>
          </Link>
        ))}
      </section>

      {ranked.length > 100 ? (
        <p className="mt-10 text-sm text-brand-text-secondary">
          Showing the top 100 of {ranked.length} reviews. Use the{" "}
          <Link href="/compare" className="text-brand-violet underline">
            /compare page
          </Link>{" "}
          to filter by category, drug, price, and more.
        </p>
      ) : null}
    </div>
  );
}
