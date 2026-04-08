import type { Metadata } from "next";
import Link from "next/link";
import {
  getFeaturedProviders,
  getAllProviders,
} from "@/lib/data";
import type { Provider } from "@/lib/types";
import { RESEARCH_ARTICLES, SPANISH_RESEARCH_SLUGS } from "@/lib/research";
import { computeOverallScore } from "@/lib/scoring";
import { US_STATES } from "@/lib/states";
import { WEGOVY_MONTHLY_USD } from "@/lib/citations";
import CTAButton from "@/components/shared/CTAButton";
import EmailCapture from "@/components/shared/EmailCapture";
import JsonLd from "@/components/shared/JsonLd";
import GradientCTACallout from "@/components/marketing/GradientCTACallout";
import TrustMarquee from "@/components/marketing/TrustMarquee";
import HomeSavingsHeadline from "@/components/marketing/HomeSavingsHeadline";
import HomeHeroProviders from "@/components/marketing/HomeHeroProviders";
import HomeQuickMatch, {
  type QuickMatchProvider,
} from "@/components/marketing/HomeQuickMatch";
import StateCoverageMap from "@/components/marketing/StateCoverageMap";

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
  const [featured, allProviders] = await Promise.all([
    getFeaturedProviders().catch(() => [] as Provider[]),
    getAllProviders().catch(() => [] as Provider[]),
  ]);

  // Homepage Latest Research feed: pull the 3 most recently published
  // research articles directly from the registry. We deliberately lead
  // with research (not blog) on the homepage because the research tier
  // is the editorial flagship — primary-source PubMed/FDA-cited deep
  // dives — and that's the E-E-A-T signal we want first-time visitors
  // to see. Blog posts remain available at /blog but are no longer
  // surfaced on the homepage.
  //
  // Spanish-language articles are excluded from this English-homepage
  // feed: they live in RESEARCH_ARTICLES so the registry stays a single
  // source of truth, but they're canonically published at /es/research
  // and surface under the Spanish tab on the /research index page —
  // not on the English homepage where they'd confuse monolingual
  // English visitors.
  const latestResearch = [...RESEARCH_ARTICLES]
    .filter((a) => !SPANISH_RESEARCH_SLUGS.has(a.slug))
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
    .slice(0, 3);

  const KIND_LABEL: Record<string, string> = {
    "data-investigation": "Data investigation",
    "scientific-deep-dive": "Scientific deep-dive",
  };

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

  // ItemList JSON-LD for the featured providers — makes the homepage
  // eligible for Google's "rich list" display in SERPs (the
  // numbered top-N carousel that appears for queries like "best
  // GLP-1 telehealth providers"). Each item is a Product entity
  // with the provider's name, score, and review URL.
  const featuredItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best GLP-1 Telehealth Providers",
    description:
      "Independently ranked GLP-1 telehealth providers for compounded semaglutide and tirzepatide.",
    numberOfItems: featured.length,
    itemListElement: featured.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://weightlossrankings.org/reviews/${p.slug}`,
      name: p.name,
      item: {
        "@type": "Product",
        name: p.name,
        url: `https://weightlossrankings.org/reviews/${p.slug}`,
        ...(p.scores && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: computeOverallScore(p.scores).toFixed(1),
            bestRating: 10,
            worstRating: 0,
            reviewCount: 1,
          },
        }),
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={featuredItemListSchema} />
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

          {/* FTC affiliate disclosure — above the fold per FTC 16 CFR
              Part 255 best practice. Most monetized template pages
              already render the inline AffiliateDisclosure component
              near their links; the homepage hero gets a slimmed-down
              version of the same disclosure so first-time visitors
              see the relationship before they click through to any
              ranked provider page. */}
          <p className="mt-8 text-xs text-white/60 max-w-xl mx-auto">
            Reader-supported. When you sign up with a provider through
            our links we may earn a commission at no extra cost to you.{" "}
            <Link
              href="/disclosure"
              className="underline underline-offset-2 hover:text-white/90"
            >
              How we make money
            </Link>
            .
          </p>
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
        <div className="grid gap-6 md:grid-cols-2">
          <GradientCTACallout
            heading="Free Tools to Save You Money"
            description="Use our savings calculator to see what you could pay — then compare providers side by side to find the best deal."
            ctaHref="/savings-calculator"
            ctaText="Savings Calculator"
          />
          <GradientCTACallout
            heading="GLP-1 Dose Plotter"
            description="Interactive pharmacokinetic simulator showing how semaglutide, tirzepatide, and Foundayo (orforglipron) build up across the standard FDA titration schedule."
            ctaHref="/tools/glp1-dose-plotter"
            ctaText="Open Dose Plotter"
          />
        </div>
      </section>

      {/* ── State Coverage Map ── SEO entry points for "[state] semaglutide" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-6">
          <h2 className="font-heading text-3xl font-bold text-brand-text-primary tracking-tight">
            Find providers in your state
          </h2>
        </div>
        <StateCoverageMap />
      </section>

      {/* ── Latest Research ── */}
      {latestResearch.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-2">
                Editorial flagship
              </p>
              <h2 className="font-heading text-3xl font-bold text-brand-text-primary tracking-tight">
                Latest Research
              </h2>
              <p className="mt-2 text-sm text-brand-text-secondary max-w-2xl">
                Primary-source deep-dives on GLP-1 weight-loss
                medications, every claim cited from FDA prescribing
                information and PubMed.
              </p>
            </div>
            <Link
              href="/research"
              className="text-sm font-medium text-brand-violet hover:underline shrink-0"
            >
              View all research →
            </Link>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestResearch.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/research/${a.slug}`}
                  className="group block h-full rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-violet/40 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-brand-violet">
                      {KIND_LABEL[a.kind]}
                    </span>
                    <span className="text-[10px] text-brand-text-secondary">
                      {a.readMinutes} min · {a.citations} sources
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-brand-text-primary leading-tight tracking-tight group-hover:text-brand-violet transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm text-brand-text-secondary leading-relaxed line-clamp-3">
                    {a.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-violet">
                    Read the analysis
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Email Capture ── */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <EmailCapture source="homepage" />
      </section>
    </main>
  );
}
