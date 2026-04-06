import type { Metadata } from "next";
import Link from "next/link";
import BlogPostForm from "@/components/admin/forms/BlogPostForm";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Admin · New Blog Post",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const empty: BlogPost = {
  _id: "",
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  author: "Weight Loss Rankings Team",
  published_date: new Date().toISOString(),
  category: "guides",
  tags: [],
  featured_image: undefined,
};

export default function NewBlogPostPage() {
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
          / New
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
          New Blog Post
        </h1>
      </header>
      <BlogPostForm initial={empty} isNew />
    </div>
  );
}
