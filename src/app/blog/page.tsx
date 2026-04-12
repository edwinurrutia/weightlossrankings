import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/data";
import type { BlogPost } from "@/lib/types";
import BlogCard from "@/components/blog/BlogCard";
import JsonLd from "@/components/shared/JsonLd";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.weightlossrankings.org";

export const metadata: Metadata = {
  title: "Blog — Weight Loss News, Reviews & Guides",
  description:
    "Weight loss news, GLP-1 provider reviews, drug guides, and expert tips from the Weight Loss Rankings editorial team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts: BlogPost[] = await getAllBlogPosts(20);

  // CollectionPage JSON-LD signals to Google that /blog is a topical
  // hub for the blog post collection. mainEntity ItemList gives the
  // ordered (newest-first) ranking; hasPart gives unordered membership
  // for crawl discovery without forcing Google to fetch each post.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/blog`,
    name: "Weight Loss Rankings Blog",
    description:
      "Weight loss news, GLP-1 provider reviews, drug guides, and expert tips from the Weight Loss Rankings editorial team.",
    url: `${SITE_URL}/blog`,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "Weight Loss Rankings", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Weight Loss Rankings", url: SITE_URL },
    hasPart: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${p.slug}`,
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.published_date,
      dateModified: p.updated_date ?? p.published_date,
    })),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 20).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={collectionSchema} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-text-primary mb-3">
          Blog
        </h1>
        <p className="text-sm text-brand-text-secondary max-w-3xl mb-8 leading-relaxed">
          Every post is edited against our{" "}
          <a href="/methodology" className="text-brand-violet underline">
            editorial methodology
          </a>{" "}
          and every clinical or regulatory claim is cited to primary sources
          from our{" "}
          <a href="/sources" className="text-brand-violet underline">
            central citation registry
          </a>{" "}
          — FDA filings, peer-reviewed trials (NEJM, JAMA, Lancet), and
          CDC/KFF/CMS data.
        </p>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-brand-violet/10 p-12 text-center text-brand-text-secondary">
            No posts yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
