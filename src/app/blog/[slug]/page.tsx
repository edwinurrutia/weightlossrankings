import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/data";
import type { BlogPost } from "@/lib/types";
import BlogContent from "@/components/blog/BlogContent";
import EmailCapture from "@/components/shared/EmailCapture";
import JsonLd from "@/components/shared/JsonLd";
import SourcesPanel from "@/components/research/SourcesPanel";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: BlogPost | null = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: "article",
      siteName: "Weight Loss Rankings",
      ...(post.published_date ? { publishedTime: post.published_date } : {}),
      ...(post.updated_date ? { modifiedTime: post.updated_date } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post: BlogPost | null = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.published_date
    ? new Date(post.published_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://weightlossrankings.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://weightlossrankings.org/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://weightlossrankings.org/blog/${slug}`,
      },
    ],
  };

  // Author entity. Schema.org Article expects either an Organization
  // OR a Person — Person is significantly stronger for E-E-A-T because
  // Google's medical guidelines specifically reward identifiable
  // human authors with verifiable credentials. If post.author is the
  // brand string "Weight Loss Rankings" we fall back to an Organization
  // entity, but any real author name renders as a Person.
  const isOrgByline =
    !post.author || post.author === "Weight Loss Rankings";
  const authorEntity = isOrgByline
    ? {
        "@type": "Organization",
        name: "Weight Loss Rankings",
        url: "https://weightlossrankings.org",
      }
    : {
        "@type": "Person",
        name: post.author,
        url: `https://weightlossrankings.org/about#${
          post.author.toLowerCase().replace(/\s+/g, "-")
        }`,
        // Identifies the author as part of the WLR editorial team
        worksFor: {
          "@type": "Organization",
          name: "Weight Loss Rankings",
          url: "https://weightlossrankings.org",
        },
      };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `https://weightlossrankings.org/blog/${slug}/opengraph-image`,
    datePublished: post.published_date,
    dateModified: post.updated_date ?? post.published_date,
    author: authorEntity,
    publisher: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
      logo: {
        "@type": "ImageObject",
        url: "https://weightlossrankings.org/logo-600.png",
        width: 600,
        height: 600,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://weightlossrankings.org/blog/${slug}`,
    },
    ...(post.category && { articleSection: post.category }),
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(", ") }),
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Editorial eyebrow — category and date as a clean inline meta line */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-brand-violet">
          {post.category && <span>{post.category}</span>}
          {post.category && formattedDate && (
            <span className="text-brand-violet/40" aria-hidden>
              ·
            </span>
          )}
          {formattedDate && <span>{formattedDate}</span>}
        </div>

        {/* Title */}
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
        >
          {post.title}
        </h1>

        {/* Body content */}
        {post.body && (
          <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6 md:p-8">
            <BlogContent content={post.body} />
          </div>
        )}

        {/* Sources & methodology — registry-backed citations for this post. */}
        {post.sources && post.sources.length > 0 && (
          <SourcesPanel
            sourceIds={post.sources}
            dataAsOf={post.updated_date ?? post.published_date}
          />
        )}

        {/* Editorial policy note + pointer to the central sources registry. */}
        <div className="rounded-xl border border-brand-violet/10 bg-brand-violet/[0.03] px-4 py-3 text-xs text-brand-text-secondary leading-relaxed">
          Every factual claim on Weight Loss Rankings is sourced to FDA filings,
          peer-reviewed trials, or primary regulatory documents. See our{" "}
          <a href="/methodology" className="text-brand-violet underline">
            methodology
          </a>{" "}
          and{" "}
          <a href="/sources" className="text-brand-violet underline">
            master source list
          </a>{" "}
          for the full citation registry.
        </div>

        {/* Email capture */}
        <EmailCapture source={`blog_${post.slug}`} />
      </article>
    </main>
  );
}
