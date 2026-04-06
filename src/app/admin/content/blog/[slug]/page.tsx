import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPostForm from "@/components/admin/forms/BlogPostForm";
import blogPosts from "@/data/blog-posts.json";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Admin · Edit Blog Post",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function EditBlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = (blogPosts as BlogPost[]).find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="space-y-4">
      <header>
        <p className="text-xs font-semibold text-brand-text-secondary">
          <Link href="/admin/content" className="hover:underline">
            Content
          </Link>{" "}
          /{" "}
          <Link href="/admin/content/blog" className="hover:underline">
            Blog
          </Link>{" "}
          / {post.slug}
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Edit: {post.title}
        </h1>
      </header>
      <BlogPostForm initial={post} isNew={false} />
    </div>
  );
}
