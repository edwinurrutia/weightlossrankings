import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getClusterBySlug,
  getClusterArticles,
  getAllClusterSlugs,
  RESEARCH_CLUSTERS,
} from "@/lib/research-clusters";
import JsonLd from "@/components/shared/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

export function generateStaticParams() {
  return getAllClusterSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster: slug } = await params;
  const cluster = getClusterBySlug(slug);
  if (!cluster) return {};
  return {
    title: { absolute: cluster.title },
    description: cluster.description,
    alternates: { canonical: `/research/topics/${slug}` },
    openGraph: {
      title: { absolute: cluster.title },
      description: cluster.description,
      type: "website",
      url: `/research/topics/${slug}`,
      siteName: "Weight Loss Rankings",
    },
    twitter: {
      card: "summary_large_image",
      title: cluster.title,
      description: cluster.description,
    },
  };
}

// Topic cluster hub pages — the canonical entry point for grouped
// research on a single theme (cardiovascular outcomes, safety,
// pricing, compounding, dosing, drug comparisons, lifestyle).
//
// Each hub page emits:
//   - CollectionPage JSON-LD with mainEntity → ItemList
//   - ItemList of every member article in publication order
//   - BreadcrumbList: Home → Research → Topics → [cluster name]
//
// The cluster definitions live in src/lib/research-clusters.ts so
// adding a new cluster or moving an article between clusters is a
// single-file edit. Member articles are validated against
// RESEARCH_ARTICLES so a typo'd slug fails the build.
export default async function ClusterHubPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster: slug } = await params;
  const cluster = getClusterBySlug(slug);
  if (!cluster) notFound();
  const articles = getClusterArticles(cluster);

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cluster.title,
    description: cluster.description,
    url: `${SITE_URL}/research/topics/${slug}`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Weight Loss Rankings",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      name: cluster.title,
      description: cluster.description,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: articles.length,
      itemListElement: articles.map((a, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/research/${a.slug}`,
        name: a.title,
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
      {
        "@type": "ListItem",
        position: 4,
        name: cluster.title,
        item: `${SITE_URL}/research/topics/${slug}`,
      },
    ],
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <nav className="mb-6 text-xs text-brand-text-secondary">
        <Link href="/research" className="hover:text-brand-violet">
          ← All research
        </Link>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Topic cluster
        </p>
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
        >
          {cluster.title}
        </h1>
        <p className="mt-5 text-lg text-brand-text-secondary leading-relaxed">
          {cluster.intro}
        </p>
        <p className="mt-6 text-sm text-brand-text-secondary">
          {articles.length} research article
          {articles.length === 1 ? "" : "s"} in this cluster · last updated{" "}
          <strong className="text-brand-text-primary">
            {cluster.lastUpdated}
          </strong>
        </p>
      </header>

      <section className="space-y-6">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/research/${a.slug}`}
            className="block rounded-2xl border border-brand-violet/15 bg-white p-6 hover:border-brand-violet/40 hover:shadow-md transition-all"
          >
            <h2 className="font-heading text-xl font-bold text-brand-text-primary leading-tight mb-2">
              {a.title}
            </h2>
            <p className="text-brand-text-secondary text-sm leading-relaxed">
              {a.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-text-secondary/80">
              <span>{a.readMinutes} min read</span>
              <span>·</span>
              <span>{a.citations} citations</span>
              {a.lastUpdated ? (
                <>
                  <span>·</span>
                  <span>Updated {a.lastUpdated}</span>
                </>
              ) : null}
            </div>
          </Link>
        ))}
      </section>

      <footer className="mt-14 pt-10 border-t border-brand-violet/10">
        <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-4">
          Other topic clusters
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RESEARCH_CLUSTERS.filter((c) => c.slug !== slug).map((c) => (
            <li key={c.slug}>
              <Link
                href={`/research/topics/${c.slug}`}
                className="block rounded-xl border border-brand-violet/10 bg-white p-4 hover:border-brand-violet/30 hover:shadow-sm transition-all text-sm font-medium text-brand-text-primary"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
