import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedProviders, getAllBlogPosts } from "@/lib/data";
import type { Provider, BlogPost } from "@/lib/types";
import CTAButton from "@/components/shared/CTAButton";
import EmailCapture from "@/components/shared/EmailCapture";
import BlogCard from "@/components/blog/BlogCard";
import CategoryNavCards from "@/components/marketing/CategoryNavCards";
import GradientCTACallout from "@/components/marketing/GradientCTACallout";
import RelatedProvidersSection from "@/components/marketing/RelatedProvidersSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
          <Link
            href="/press"
            className="inline-flex items-center gap-1.5 hover:text-brand-violet transition-colors"
          >
            <span className="text-brand-success">✓</span> Press &amp; media
          </Link>
          <Link
            href="/nature-of-reviews"
            className="inline-flex items-center gap-1.5 hover:text-brand-violet transition-colors"
          >
            <span className="text-brand-success">✓</span> How our reviews work
          </Link>
        </div>
      </section>

      {/* ── Category Nav ── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary text-center mb-6">
          Browse by Category
        </h2>
        <CategoryNavCards categories={categories} />
      </section>

      {/* ── Top Rated Providers ── */}
      {featured.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <RelatedProvidersSection
            title="Top Rated Providers"
            providers={featured}
            trackingSource="homepage_top_rated"
            limit={3}
          />
        </section>
      )}

      {/* ── Tools Banner ── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <GradientCTACallout
          heading="Free Tools to Save You Money"
          description="Use our savings calculator to see what you could pay — then compare providers side by side to find the best deal."
          ctaHref="/savings-calculator"
          ctaText="Savings Calculator"
        />
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
