import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProviders, getAllBlogPosts } from "@/lib/data";
import type { Provider, BlogPost } from "@/lib/types";
import CTAButton from "@/components/shared/CTAButton";
import EmailCapture from "@/components/shared/EmailCapture";
import BlogCard from "@/components/blog/BlogCard";
import GradientCTACallout from "@/components/marketing/GradientCTACallout";
import RelatedProvidersSection from "@/components/marketing/RelatedProvidersSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Category cards with soft pastel backgrounds — each tile has a distinct
// identity while keeping them visually cohesive in the same saturation range.
const categories = [
  {
    label: "GLP-1 Providers",
    slug: "semaglutide-providers",
    bgColor: "#ddd6fe", // light violet
    image:
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80&auto=format&fit=crop",
  },
  {
    label: "Weight Loss Programs",
    slug: "weight-loss-programs",
    bgColor: "#fce7f3", // light pink
    image:
      "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?w=800&q=80&auto=format&fit=crop",
  },
  {
    label: "Supplements",
    slug: "weight-loss-supplements",
    bgColor: "#fef3c7", // light cream
    image:
      "https://images.unsplash.com/photo-1576086265779-619d2f54d96b?w=800&q=80&auto=format&fit=crop",
  },
  {
    label: "Meal Delivery",
    slug: "meal-delivery-for-weight-loss",
    bgColor: "#dcfce7", // light mint
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&auto=format&fit=crop",
  },
];

export default async function HomePage() {
  const [featured, posts] = await Promise.all([
    getFeaturedProviders().catch(() => [] as Provider[]),
    getAllBlogPosts(3).catch(() => [] as BlogPost[]),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero — Medvi-inspired editorial deep violet ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #2e1065 0%, #4c1d95 60%, #5b21b6 100%)",
        }}
      >
        {/* Big watermark wordmark behind everything */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="font-heading font-black uppercase tracking-tighter text-white/[0.04]"
            style={{
              fontSize: "clamp(180px, 25vw, 360px)",
              lineHeight: 1,
            }}
          >
            WLR
          </span>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-40 text-center">
          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 font-semibold mb-6">
            Independent Editorial Rankings
          </p>

          {/* Headline with mixed weights */}
          <h1
            className="font-heading font-black text-white tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              lineHeight: 1.05,
            }}
          >
            Find the best
            <br />
            <span className="font-light italic text-white/80">
              {" "}weight loss{" "}
            </span>
            provider for you
          </h1>

          {/* Subtitle */}
          <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-white/80 leading-relaxed">
            We independently rank GLP-1 telehealth providers, weight loss
            programs, and the pharmacies behind them — so you can save money
            without falling for sketchy ads.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CTAButton href="/compare" size="lg" variant="white">
              Compare All Providers
            </CTAButton>
            <Link
              href="/savings-calculator"
              className="text-white/90 hover:text-white font-semibold underline underline-offset-4"
            >
              Calculate your savings →
            </Link>
          </div>
        </div>

        {/* Category cards — overhang the hero bottom */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/best/${cat.slug}`}
                className="group rounded-2xl bg-white border border-brand-violet/10 shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {/* Pastel image tile */}
                <div
                  className="aspect-[4/3] relative"
                  style={{ background: cat.bgColor }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover mix-blend-multiply opacity-95"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                {/* Label */}
                <div className="p-4 sm:p-5 flex items-center justify-between">
                  <span className="font-heading font-bold text-brand-text-primary text-sm sm:text-base">
                    {cat.label}
                  </span>
                  <span className="text-brand-violet text-xl group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="border-y border-brand-violet/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs uppercase tracking-[0.15em] text-brand-text-secondary font-semibold">
          <span>Licensed Editorial</span>
          <span aria-hidden>·</span>
          <span>80+ Providers Tracked</span>
          <span aria-hidden>·</span>
          <span>Updated Monthly</span>
          <span aria-hidden>·</span>
          <span>Independent Reviews</span>
          <span aria-hidden>·</span>
          <span>Evidence-Based</span>
        </div>
      </div>

      {/* ── Stat bar (moved below trust strip) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4">
          <div className="text-center sm:text-left">
            <dt className="sr-only">Providers tracked</dt>
            <dd className="font-heading text-3xl sm:text-4xl font-bold text-brand-violet leading-none tracking-tight">
              80+
            </dd>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
              Providers tracked
            </p>
          </div>
          <div className="text-center sm:text-left">
            <dt className="sr-only">States covered</dt>
            <dd className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary leading-none tracking-tight">
              50
            </dd>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
              States covered
            </p>
          </div>
          <div className="text-center sm:text-left">
            <dt className="sr-only">Drug &amp; provider guides</dt>
            <dd className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary leading-none tracking-tight">
              15
            </dd>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
              In-depth guides
            </p>
          </div>
          <div className="text-center sm:text-left">
            <dt className="sr-only">Editorial independence</dt>
            <dd className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary leading-none tracking-tight">
              100%
            </dd>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary">
              Independent editorial
            </p>
          </div>
        </dl>
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
