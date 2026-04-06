import Link from "next/link";
import { getFeaturedProviders, getAllBlogPosts } from "@/lib/data";
import type { Provider, BlogPost } from "@/lib/types";
import ProviderCard from "@/components/providers/ProviderCard";
import CTAButton from "@/components/shared/CTAButton";
import EmailCapture from "@/components/shared/EmailCapture";
import BlogCard from "@/components/blog/BlogCard";

const categories = [
  {
    emoji: "💊",
    label: "GLP-1 Providers",
    slug: "semaglutide-providers",
    comingSoon: false,
  },
  {
    emoji: "📋",
    label: "Weight Loss Programs",
    slug: "weight-loss-programs",
    comingSoon: false,
  },
  {
    emoji: "🧬",
    label: "Supplements",
    slug: "weight-loss-supplements",
    comingSoon: false,
  },
  {
    emoji: "🥗",
    label: "Meal Delivery",
    slug: "meal-delivery-for-weight-loss",
    comingSoon: false,
  },
];

export default async function HomePage() {
  const [featured, posts] = await Promise.all([
    getFeaturedProviders().catch(() => [] as Provider[]),
    getAllBlogPosts(3).catch(() => [] as BlogPost[]),
  ]);

  return (
    <main className="min-h-screen bg-brand-bg-purple">
      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-24 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text-primary leading-[1.15] tracking-tight mb-6">
          Find the Best{" "}
          <span
            className="text-transparent bg-clip-text inline-block pb-1"
            style={{
              backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
            }}
          >
            Weight Loss Solution
          </span>
          <br className="hidden sm:block" />
          {" "}for You
        </h1>
        <p className="text-lg sm:text-xl text-brand-text-secondary mb-8 max-w-2xl mx-auto">
          Save up to <strong className="text-brand-text-primary">$800/mo</strong> on GLP-1s. Compare 50+ telehealth providers, prices, and reviews in 60 seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <CTAButton href="/compare" size="lg">
            Compare All Providers
          </CTAButton>
          <Link
            href="/savings-calculator"
            className="inline-flex items-center justify-center text-brand-violet font-semibold text-lg hover:text-brand-blue transition-colors tap-target"
          >
            Calculate your savings →
          </Link>
        </div>
        {/* Trust strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-brand-success">✓</span> Independently researched
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-brand-success">✓</span> 50+ providers tracked
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-brand-success">✓</span> Updated monthly
          </span>
        </div>
      </section>

      {/* ── Category Nav ── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary text-center mb-6">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const inner = (
              <div className="rounded-2xl bg-white border border-brand-violet/10 p-5 flex flex-col items-center gap-2 shadow-sm text-center h-full transition-shadow hover:shadow-md">
                <span className="text-3xl">{cat.emoji}</span>
                <span className="font-heading font-semibold text-brand-text-primary text-sm leading-tight">
                  {cat.label}
                </span>
                {cat.comingSoon && (
                  <span className="text-xs text-brand-text-secondary">
                    Coming soon
                  </span>
                )}
              </div>
            );

            if (cat.comingSoon || !cat.slug) {
              return (
                <div key={cat.label} className="cursor-default">
                  {inner}
                </div>
              );
            }

            return (
              <Link key={cat.label} href={`/best/${cat.slug}`} className="group block">
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Top Rated Providers ── */}
      {featured.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-6">
            Top Rated Providers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 3).map((provider) => (
              <ProviderCard
                key={provider._id}
                provider={provider}
                trackingSource="homepage_top_rated"
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Tools Banner ── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div
          className="rounded-2xl p-8 sm:p-10 text-white text-center"
          style={{
            backgroundImage: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
          }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
            Free Tools to Save You Money
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Use our savings calculator to see what you could pay — then compare
            providers side by side to find the best deal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/savings-calculator"
              className="inline-flex items-center justify-center rounded-full bg-white text-brand-violet font-semibold px-6 py-3 text-base shadow hover:shadow-md transition-all tap-target"
            >
              Savings Calculator
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center rounded-full border-2 border-white text-white font-semibold px-6 py-3 text-base hover:bg-white hover:text-brand-violet transition-colors tap-target"
            >
              Compare Providers
            </Link>
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      {posts.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-semibold text-brand-text-primary">
              Latest Articles
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-brand-violet hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ── Email Capture ── */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <EmailCapture source="homepage" />
      </section>
    </main>
  );
}
