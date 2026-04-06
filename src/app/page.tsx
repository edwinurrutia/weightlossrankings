import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

// Cohesive editorial product photography — warm, natural light,
// cream/off-white palette, single focal subject, minimal props.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1400&q=80&auto=format&fit=crop";

const categories = [
  {
    label: "GLP-1 Providers",
    slug: "semaglutide-providers",
    description: "Telehealth clinics for semaglutide and tirzepatide.",
    image:
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80&auto=format&fit=crop",
    comingSoon: false,
  },
  {
    label: "Weight Loss Programs",
    slug: "weight-loss-programs",
    description: "Coaching, accountability, and structured plans.",
    image:
      "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?w=800&q=80&auto=format&fit=crop",
    comingSoon: false,
  },
  {
    label: "Supplements",
    slug: "weight-loss-supplements",
    description: "Science-backed over-the-counter options.",
    image:
      "https://images.unsplash.com/photo-1576086265779-619d2f54d96b?w=800&q=80&auto=format&fit=crop",
    comingSoon: false,
  },
  {
    label: "Meal Delivery",
    slug: "meal-delivery-for-weight-loss",
    description: "Portion-controlled meals shipped to your door.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&auto=format&fit=crop",
    comingSoon: false,
  },
];

export default async function HomePage() {
  const [featured, posts] = await Promise.all([
    getFeaturedProviders().catch(() => [] as Provider[]),
    getAllBlogPosts(3).catch(() => [] as BlogPost[]),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-bg-purple to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Copy column */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-violet mb-5">
                <span className="h-px w-8 bg-brand-violet" />
                Independent Editorial Rankings
              </span>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-text-primary leading-[1.05] tracking-tight">
                Find the Best{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                  }}
                >
                  Weight Loss Solution
                </span>{" "}
                for You
              </h1>
              <p className="text-xl sm:text-2xl text-brand-text-secondary leading-relaxed mt-6 max-w-2xl">
                Save up to{" "}
                <strong className="text-brand-text-primary">$800/mo</strong>{" "}
                on GLP-1s. Compare 50+ telehealth providers, prices, and
                reviews in 60 seconds.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:items-center">
                <CTAButton href="/compare" size="lg">
                  Compare All Providers
                </CTAButton>
                <Link
                  href="/savings-calculator"
                  className="inline-flex items-center justify-center sm:justify-start text-brand-text-primary font-semibold text-lg hover:text-brand-violet transition-colors tap-target"
                >
                  Calculate your savings →
                </Link>
              </div>
              {/* Stat bar — editorial, no checkmarks */}
              <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 border-t border-gray-200 pt-8 max-w-2xl">
                <div>
                  <dt className="sr-only">Providers tracked</dt>
                  <dd className="font-heading text-3xl sm:text-4xl font-bold text-brand-violet leading-none tracking-tight">
                    80+
                  </dd>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
                    Providers tracked
                  </p>
                </div>
                <div>
                  <dt className="sr-only">States covered</dt>
                  <dd className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary leading-none tracking-tight">
                    50
                  </dd>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
                    States covered
                  </p>
                </div>
                <div>
                  <dt className="sr-only">Drug &amp; provider guides</dt>
                  <dd className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary leading-none tracking-tight">
                    15
                  </dd>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
                    In-depth guides
                  </p>
                </div>
                <div>
                  <dt className="sr-only">Editorial independence</dt>
                  <dd className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary leading-none tracking-tight">
                    100%
                  </dd>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
                    Independent editorial
                  </p>
                </div>
              </dl>
            </div>

            {/* Image column */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-gray-100 shadow-xl ring-1 ring-black/5">
                <Image
                  src={HERO_IMAGE}
                  alt="Fresh produce and wellness lifestyle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                {/* subtle purple tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-violet/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Nav ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-violet mb-2">
              Browse
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary tracking-tight">
              Explore by Category
            </h2>
          </div>
        </div>
        <CategoryNavCards categories={categories} />
      </section>

      {/* ── Top Rated Providers ── */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <RelatedProvidersSection
            title="Top Rated Providers"
            providers={featured}
            trackingSource="homepage_top_rated"
            limit={3}
          />
        </section>
      )}

      {/* ── Tools Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <GradientCTACallout
          heading="Free Tools to Save You Money"
          description="Use our savings calculator to see what you could pay — then compare providers side by side to find the best deal."
          ctaHref="/savings-calculator"
          ctaText="Savings Calculator"
        />
      </section>

      {/* ── Blog ── */}
      {posts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl font-bold text-brand-text-primary tracking-tight">
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
