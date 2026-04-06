import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/data";
import type { BlogPost } from "@/lib/types";
import BlogContent from "@/components/blog/BlogContent";
import TrustBadge from "@/components/shared/TrustBadge";
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_date,
    dateModified: post.updated_date ?? post.published_date,
    author: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
    },
    publisher: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
      logo: {
        "@type": "ImageObject",
        url: "https://weightlossrankings.org/icon.svg",
      },
    },
  };

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* Trust badges */}
        <div className="flex flex-wrap gap-2">
          {post.category && (
            <TrustBadge icon="🏷️" text={post.category} />
          )}
          {formattedDate && (
            <TrustBadge icon="📅" text={`Published ${formattedDate}`} />
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-text-primary leading-tight">
          {post.title}
        </h1>

        {/* Author */}
        {post.author && (
          <p className="text-brand-text-secondary text-sm">
            By {post.author}
          </p>
        )}

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
      </div>
    </main>
  );
}
