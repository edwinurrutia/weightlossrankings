import type { Metadata } from "next";
import Link from "next/link";
import { RESEARCH_CLUSTERS, getClusterArticles } from "@/lib/research-clusters";
import JsonLd from "@/components/shared/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

export const metadata: Metadata = {
  title: "Research Topics — GLP-1 Cardiovascular, Safety, Pricing & More",
  description:
    "Browse our research by topic cluster: cardiovascular and comorbidity outcomes, safety and side effects, pricing and access, compounded GLP-1 quality, dosing and pharmacology, drug comparisons, and lifestyle.",
  alternates: { canonical: "/research/topics" },
  openGraph: {
    title: "Research Topics — GLP-1 Cardiovascular, Safety, Pricing & More",
    description:
      "Browse our research by topic cluster: cardiovascular and comorbidity outcomes, safety and side effects, pricing and access, compounded GLP-1 quality, dosing and pharmacology, drug comparisons, and lifestyle.",
    type: "website",
    url: "/research/topics",
    siteName: "Weight Loss Rankings",
  },
  twitter: { card: "summary_large_image" },
};

// Index of every research topic cluster. Acts as a hub-of-hubs:
// the canonical entry point for users (and crawlers) discovering
// the clustered research surface. Emits CollectionPage with an
// ItemList of clusters.
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Research Topics — Weight Loss Rankings",
  description:
    "Browse our research by topic cluster: cardiovascular and comorbidity outcomes, safety and side effects, pricing and access, compounded GLP-1 quality, dosing and pharmacology, drug comparisons, and lifestyle.",
  url: `${SITE_URL}/research/topics`,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "Weight Loss Rankings",
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: RESEARCH_CLUSTERS.length,
    itemListElement: RESEARCH_CLUSTERS.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}/research/topics/${c.slug}`,
      name: c.title,
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Research",
      item: `${SITE_URL}/research`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Topics",
      item: `${SITE_URL}/research/topics`,
    },
  ],
};

export default function ResearchTopicsIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <nav className="mb-6 text-xs text-brand-text-secondary">
        <Link href="/research" className="hover:text-brand-violet">
          ← All research
        </Link>
      </nav>

      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Research index
        </p>
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
        >
          Browse research by topic
        </h1>
        <p className="mt-5 text-lg text-brand-text-secondary leading-relaxed max-w-2xl">
          Every research article on Weight Loss Rankings, grouped by
          theme. Each cluster is a curated index of related primary-
          source investigations — start with the topic that matches
          your question.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {RESEARCH_CLUSTERS.map((cluster) => {
          const articles = getClusterArticles(cluster);
          return (
            <Link
              key={cluster.slug}
              href={`/research/topics/${cluster.slug}`}
              className="block rounded-2xl border border-brand-violet/15 bg-white p-6 hover:border-brand-violet/40 hover:shadow-md transition-all"
            >
              <h2 className="font-heading text-lg font-bold text-brand-text-primary leading-tight mb-2">
                {cluster.title}
              </h2>
              <p className="text-brand-text-secondary text-sm leading-relaxed mb-3">
                {cluster.description}
              </p>
              <p className="text-xs text-brand-violet font-semibold">
                {articles.length} article{articles.length === 1 ? "" : "s"} →
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
