import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/data";
import type { BlogPost } from "@/lib/types";
import BlogContent from "@/components/blog/BlogContent";
import TrustBadge from "@/components/shared/TrustBadge";
import EmailCapture from "@/components/shared/EmailCapture";

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

  return (
    <main className="min-h-screen bg-brand-bg">
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

        {/* Email capture */}
        <EmailCapture />
      </div>
    </main>
  );
}
