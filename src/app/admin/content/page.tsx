import type { Metadata } from "next";
import Link from "next/link";
import { isCmsConfigured } from "@/lib/github-cms";
import blogPosts from "@/data/blog-posts.json";
import drugs from "@/data/drugs.json";
import statesContent from "@/data/states-content.json";

export const metadata: Metadata = {
  title: "Admin · Content",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface CategoryCard {
  href: string;
  label: string;
  icon: string;
  count: number;
  description: string;
  disabled?: boolean;
}

export default async function AdminContentPage() {
  const cmsOk = isCmsConfigured();

  // Try to load learn-articles.json if it exists.
  let learnArticlesCount: number | null = null;
  try {
    const mod = await import("@/data/learn-articles.json").catch(() => null);
    if (mod) {
      const data = (mod as { default: unknown }).default;
      if (Array.isArray(data)) learnArticlesCount = data.length;
    }
  } catch {
    learnArticlesCount = null;
  }

  const categories: CategoryCard[] = [
    {
      href: "/admin/content/blog",
      label: "Blog Posts",
      icon: "✎",
      count: (blogPosts as unknown[]).length,
      description: "News, guides, comparisons and reviews.",
    },
    {
      href: "/admin/content/drugs",
      label: "Drug Guides",
      icon: "℞",
      count: (drugs as unknown[]).length,
      description: "Semaglutide, tirzepatide, and brand drug pages.",
    },
    {
      href: "/admin/content/states",
      label: "State Content",
      icon: "★",
      count: Object.keys(statesContent as Record<string, unknown>).length,
      description: "Telehealth legality, Medicaid coverage, pricing.",
    },
    learnArticlesCount != null
      ? {
          href: "/admin/content/learn",
          label: "Learn Articles",
          icon: "▤",
          count: learnArticlesCount,
          description: "SEO long-form education content.",
        }
      : {
          href: "/admin/content",
          label: "Learn Articles",
          icon: "▤",
          count: 0,
          description: "Coming soon — SEO content agent has not generated learn-articles.json yet.",
          disabled: true,
        },
  ];

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
          Content Editor
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Edit blog posts, drug guides, state content and learn articles. All
          changes commit directly to GitHub.
        </p>
      </header>

      {!cmsOk && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 leading-relaxed">
          <p className="font-semibold mb-1">GitHub CMS is not configured.</p>
          <p>
            Set <code className="font-mono">GITHUB_TOKEN</code>,{" "}
            <code className="font-mono">GITHUB_REPO_OWNER</code>, and{" "}
            <code className="font-mono">GITHUB_REPO_NAME</code> in your
            environment, then redeploy. You can still browse the editor, but
            saving will fail.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((c) => (
          <div
            key={c.label}
            className={[
              "rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-5",
              c.disabled ? "opacity-60" : "",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <span className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-brand-violet/10 text-lg text-brand-violet">
                  {c.icon}
                </span>
                <div className="min-w-0">
                  <h2 className="font-heading text-base font-bold text-brand-text-primary">
                    {c.label}
                  </h2>
                  <p className="text-xs text-brand-text-secondary mt-0.5">
                    {c.description}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-violet/5 border border-brand-violet/10 px-2 py-0.5 text-xs font-bold text-brand-text-primary">
                {c.count.toLocaleString("en-US")}
              </span>
            </div>
            <div className="mt-4">
              {c.disabled ? (
                <span className="inline-flex items-center rounded-lg border border-brand-violet/15 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-brand-text-secondary">
                  Coming soon
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="inline-flex items-center rounded-lg border border-brand-violet/15 bg-white px-3 py-1.5 text-xs font-semibold text-brand-text-primary hover:bg-brand-violet/5"
                >
                  Manage →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
