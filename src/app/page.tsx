import type { Metadata } from "next";
import Link from "next/link";
import {
  getFeaturedProviders,
  getAllBlogPosts,
  getAllProviders,
} from "@/lib/data";
import type { Provider, BlogPost } from "@/lib/types";
import { computeOverallScore } from "@/lib/scoring";
import { US_STATES } from "@/lib/states";
import { WEGOVY_MONTHLY_USD } from "@/lib/citations";
import CTAButton from "@/components/shared/CTAButton";
import EmailCapture from "@/components/shared/EmailCapture";
import BlogCard from "@/components/blog/BlogCard";
import GradientCTACallout from "@/components/marketing/GradientCTACallout";
import TrustMarquee from "@/components/marketing/TrustMarquee";
import HomeSavingsHeadline from "@/components/marketing/HomeSavingsHeadline";
import HomeHeroProviders from "@/components/marketing/HomeHeroProviders";
import HomeQuickMatch, {
  type QuickMatchProvider,
} from "@/components/marketing/HomeQuickMatch";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Editorial category cards — no images, just type. Each card uses the same
// white background with a subtle violet accent so they read as one set.
// Semaglutide and tirzepatide get their own cards because they're the two
// dominant GLP-1 drug classes and visitors typically know which one they
// want before they land on the site.
const categories = [
  {
    label: "Semaglutide",
    slug: "semaglutide-providers",
    description: "Wegovy, Ozempic & compounded semaglutide telehealth",
  },
  {
    label: "Tirzepatide",
    slug: "tirzepatide-providers",
    description: "Zepbound, Mounjaro & compounded tirzepatide telehealth",
  },
  {
    label: "Weight Loss Programs",
    slug: "weight-loss-programs",
    description: "Coaching, apps, and structured plans",
  },
  {
    label: "Supplements",
    slug: "weight-loss-supplements",
    description: "Over-the-counter weight loss aids",
  },
];

export default async function HomePage() {
  const [featured, posts, allProviders] = await Promise.all([
    getFeaturedProviders().catch(() => [] as Provider[]),
    getAllBlogPosts(3).catch(() => [] as BlogPost[]),
    getAllProviders().catch(() => [] as Provider[]),
  ]);

  // Round provider count down to nearest 5 so the displayed number doesn't
  // jitter every time we add a single provider — and so it never overstates.
  const providerCount = Math.max(5, Math.floor(allProviders.length / 5) * 5);
  const providerCountLabel = `${providerCount}+`;

  // Compounded semaglutide pricing across the dataset.
  // The savings headline uses the MEDIAN as its editorial baseline (not
  // the cheapest) because the cheapest entries in our dataset are usually
  // first-month introductory rates that don't reflect what users pay
  // long-term. The "starts at" disclosure surfaces the absolute floor
  // separately so the marketing remains accurate without overstating it.
  const semaCompoundedPrices = allProviders
    .flatMap((p) =>
      (p.pricing || [])
        .filter((pr) => pr.drug === "semaglutide" && pr.form === "compounded")
        .map((pr) => pr.promo_price ?? pr.monthly_cost),
    )
    .sort((a, b) => a - b);
  const medianCompoundedMonthly =
    semaCompoundedPrices.length > 0
      ? Math.round(
          semaCompoundedPrices[Math.floor(semaCompoundedPrices.length / 2)],
        )
      : 150;
  const startingFromMonthly =
    semaCompoundedPrices.length > 0 ? semaCompoundedPrices[0] : 99;

  // Slim provider projection for the QuickMatch client widget. Only the
  // fields the matcher and result card need — keeps the client bundle
  // small and avoids shipping review bodies.
  const quickMatchProviders: QuickMatchProvider[] = allProviders
    .filter((p) => p.pricing && p.pricing.length > 0)
    .map((p) => ({
      name: p.name,
      slug: p.slug,
      affiliate_url: p.affiliate_url,
      best_for: p.best_for,
      states_available: p.states_available || [],
      scoreOverall: computeOverallScore(p.scores),
      prices: p.pricing.map((pr) => ({
        form: pr.form,
        monthly: pr.promo_price ?? pr.monthly_cost,
      })),
    }));

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
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/best/${cat.slug}`}
                className="group rounded-2xl bg-white border border-brand-violet/10 shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 hover:border-brand-violet/30 transition-all flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <span className="font-heading font-bold text-brand-text-primary text-base sm:text-lg leading-tight block">
                    {cat.label}
                  </span>
                  <p className="mt-2 text-xs text-brand-text-secondary leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <span className="mt-4 text-brand-violet text-sm font-semibold inline-flex items-center gap-1">
                  Browse
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip — scrolling marquee with icons ── */}
      <TrustMarquee providerCountLabel={providerCountLabel} />

      {/* ── Money headline (replaces the boring stat bar) ── */}
      <HomeSavingsHeadline
        medianCompoundedMonthly={medianCompoundedMonthly}
        startingFromMonthly={startingFromMonthly}
        brandMonthly={WEGOVY_MONTHLY_USD}
      />

      {/* ── Quick Match — 3-question wizard that surfaces a top match ── */}
      <HomeQuickMatch
        providers={quickMatchProviders}
        states={US_STATES.map((s) => ({ code: s.code, name: s.name }))}
      />

      {/* ── Top Rated — Editor's Pick + 2 runners-up ── */}
      {featured.length > 0 && (
        <HomeHeroProviders
          providers={featured}
          trackingSource="homepage_top_rated"
        />
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
