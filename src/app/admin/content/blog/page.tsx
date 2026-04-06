import type { Metadata } from "next";
import Link from "next/link";
import blogPosts from "@/data/blog-posts.json";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Admin · Blog Posts",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function fmtDate(d?: string | null): string {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return d;
  }
}

export default async function AdminBlogListPage() {
  const posts = (blogPosts as BlogPost[]).slice().sort((a, b) => {
    const da = a.published_date ?? "";
    const db = b.published_date ?? "";
    return db.localeCompare(da);
  });

  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs font-semibold text-brand-text-secondary">
            <Link href="/admin/content" className="hover:underline">
              Content
            </Link>{" "}
            / Blog
          </p>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
            Blog Posts
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            {posts.length} posts loaded from{" "}
            <code className="font-mono">src/data/blog-posts.json</code>.
          </p>
        </div>
        <Link
          href="/admin/content/blog/new"
          className="inline-flex items-center rounded-lg bg-brand-gradient px-4 py-2 text-sm font-bold text-white shadow-sm"
        >
          + Create New
        </Link>
      </header>

      <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                <th className="py-3 px-5 text-left">Title</th>
                <th className="py-3 px-5 text-left">Slug</th>
                <th className="py-3 px-5 text-left">Category</th>
                <th className="py-3 px-5 text-left">Published</th>
                <th className="py-3 px-5 text-left">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-brand-text-secondary"
                  >
                    No blog posts.
                  </td>
                </tr>
              ) : (
                posts.map((p) => (
                  <tr
                    key={p.slug}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-5 font-semibold text-brand-text-primary">
                      <Link
                        href={`/admin/content/blog/${p.slug}`}
                        className="hover:underline"
                      >
                        {p.title}
                      </Link>
                    </td>
                    <td className="py-3 px-5 text-xs font-mono text-brand-text-secondary">
                      {p.slug}
                    </td>
                    <td className="py-3 px-5 text-brand-text-secondary">
                      {p.category ?? "—"}
                    </td>
                    <td className="py-3 px-5 text-brand-text-secondary">
                      {fmtDate(p.published_date)}
                    </td>
                    <td className="py-3 px-5 text-brand-text-secondary">
                      {fmtDate(p.updated_date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
