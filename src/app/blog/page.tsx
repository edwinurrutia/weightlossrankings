import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/data";
import type { BlogPost } from "@/lib/types";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Weight Loss News, Reviews & Guides",
  description:
    "Weight loss news, GLP-1 provider reviews, drug guides, and expert tips from the WeightLossRankings editorial team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts: BlogPost[] = await getAllBlogPosts(20);

  return (
    <main className="min-h-screen bg-brand-bg">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-text-primary mb-8">
          Blog
        </h1>

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
