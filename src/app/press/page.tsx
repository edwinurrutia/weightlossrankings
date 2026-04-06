import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press & Media",
  description:
    "Press inquiries, brand assets, and media coverage for WeightLossRankings.org",
  alternates: { canonical: "/press" },
};

const FAST_FACTS = [
  { label: "Providers ranked", value: "87" },
  { label: "States covered", value: "50" },
  { label: "Programmatic comparison pages", value: "100+" },
  { label: "Long-form medical guides", value: "15" },
  { label: "Founded", value: "2026" },
  { label: "Ownership", value: "Independent" },
];

const COVERAGE_TOPICS = [
  "GLP-1 telehealth providers",
  "Compounded semaglutide",
  "Compounded tirzepatide",
  "GLP-1 drug pricing and price tracking",
  "Insurance coverage and prior authorization",
  "State-by-state regulations on compounding",
  "Manufacturer savings programs (Wegovy, Zepbound, Ozempic, Mounjaro)",
  "Drug shortages and FDA shortage list dynamics",
];

const INTERVIEW_TOPICS = [
  "How GLP-1 telehealth pricing actually works (and why it varies so much)",
  "The compounding pharmacy landscape after the FDA semaglutide shortage resolution",
  "How to evaluate a telehealth provider's medical oversight and safety",
  "Affiliate economics in the weight-loss comparison space",
  "Why consumers can't find straight answers on GLP-1 costs",
  "What the 80+ telehealth providers actually differ on",
];

export default function PressPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Hero */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-brand-violet uppercase tracking-wider mb-3">
          Press Kit
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-text-primary mb-4">
          Press &amp; Media
        </h1>
        <p className="text-lg text-brand-text-secondary max-w-3xl">
          Independent rankings and reviews of GLP-1 telehealth providers,
          compounding pharmacies, and weight loss programs.
          WeightLossRankings.org is a comparison site, not a medical provider.
        </p>
      </div>

      {/* Media inquiries */}
      <section className="rounded-2xl bg-brand-violet/5 border border-brand-violet/10 p-6 sm:p-8 mb-10">
        <h2 className="font-heading text-xl font-semibold text-brand-text-primary mb-3">
          Media inquiries
        </h2>
        <p className="text-brand-text-secondary mb-3">
          For press inquiries, please contact{" "}
          <a
            href="mailto:hello@weightlossrankings.org?subject=Press"
            className="text-brand-violet underline font-medium"
          >
            hello@weightlossrankings.org
          </a>{" "}
          with the subject line &ldquo;Press.&rdquo; We typically respond within
          one business day.
        </p>
        <p className="text-sm text-brand-text-secondary/80">
          We&rsquo;re happy to provide data, quotes, background briefings, and
          on-the-record interviews for stories about GLP-1 medications, the
          telehealth weight-loss market, and drug pricing.
        </p>
      </section>

      {/* Fast facts */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-5">
          Fast facts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {FAST_FACTS.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5"
            >
              <div className="text-2xl font-bold text-brand-text-primary mb-1">
                {f.value}
              </div>
              <div className="text-sm text-brand-text-secondary">
                {f.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-brand-text-secondary/80 mt-4">
          WeightLossRankings.org is one of the only independent comparison
          sites covering compounding pharmacies directly, alongside brand-name
          GLP-1 telehealth providers.
        </p>
      </section>

      {/* What we cover */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-5">
          What we cover
        </h2>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COVERAGE_TOPICS.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2.5 text-brand-text-secondary leading-relaxed"
              >
                <span
                  aria-hidden
                  className="text-brand-violet font-bold leading-relaxed flex-shrink-0"
                >
                  •
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interview topics */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-5">
          Available for interviews on
        </h2>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <ul className="space-y-3">
            {INTERVIEW_TOPICS.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2.5 text-brand-text-secondary leading-relaxed"
              >
                <span
                  aria-hidden
                  className="text-brand-violet font-bold leading-relaxed flex-shrink-0"
                >
                  →
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mentions */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-5">
          Recent mentions
        </h2>
        <div className="rounded-2xl bg-white border border-dashed border-gray-200 p-8 text-center">
          <p className="text-brand-text-secondary">
            Recent mentions will appear here as they happen.
          </p>
          <p className="text-sm text-brand-text-secondary/70 mt-2">
            If you&rsquo;ve covered us and want to be listed, email{" "}
            <a
              href="mailto:hello@weightlossrankings.org?subject=Press"
              className="text-brand-violet underline"
            >
              hello@weightlossrankings.org
            </a>
            .
          </p>
        </div>
      </section>

      {/* Brand assets */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-5">
          Brand assets
        </h2>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-brand-text-primary mb-1">
              Display name
            </h3>
            <p className="text-brand-text-secondary text-sm">
              &ldquo;Weight Loss Rankings&rdquo; (three words, with spaces) is
              the editorial display name. Use it in prose, headlines, and any
              written copy where the brand is referenced.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-brand-text-primary mb-1">
              Domain
            </h3>
            <p className="text-brand-text-secondary text-sm">
              &ldquo;weightlossrankings.org&rdquo; (one word, lowercase) is the
              domain and is reserved for URLs, email addresses, and other
              technical contexts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-brand-text-primary mb-1">
              Logo
            </h3>
            <p className="text-brand-text-secondary text-sm">
              SVG logo available on request. Email{" "}
              <a
                href="mailto:hello@weightlossrankings.org?subject=Press"
                className="text-brand-violet underline"
              >
                hello@weightlossrankings.org
              </a>{" "}
              and we&rsquo;ll send the latest version.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-brand-text-primary mb-1">
              Brand colors
            </h3>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg border border-gray-200"
                  style={{ background: "#8b5cf6" }}
                />
                <code className="text-xs text-brand-text-secondary">
                  #8b5cf6 violet
                </code>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg border border-gray-200"
                  style={{ background: "#3b82f6" }}
                />
                <code className="text-xs text-brand-text-secondary">
                  #3b82f6 blue
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topic experts */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-5">
          Topic experts
        </h2>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-brand-text-primary mb-2">
            Weight Loss Rankings Editorial Team
          </h3>
          <p className="text-brand-text-secondary text-sm mb-3">
            Our editorial team researches GLP-1 telehealth providers,
            compounding pharmacies, drug pricing, and the regulatory
            environment around weight-loss medications in the United States.
            The team maintains the full provider database, scoring
            methodology, and long-form guides.
          </p>
          <p className="text-brand-text-secondary text-sm">
            <strong className="text-brand-text-primary">Medical review:</strong>{" "}
            We are contracting a board-certified MD reviewer for ongoing
            medical content review. Until that relationship is finalized, all
            medical guidance on the site cites peer-reviewed sources directly
            and we explicitly note that the site is not a substitute for
            professional medical advice.
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="mb-4">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/about"
            className="text-brand-violet underline text-sm"
          >
            About the site
          </Link>
          <span className="text-brand-text-secondary/40">•</span>
          <Link
            href="/methodology"
            className="text-brand-violet underline text-sm"
          >
            Scoring methodology
          </Link>
          <span className="text-brand-text-secondary/40">•</span>
          <Link
            href="/disclosure"
            className="text-brand-violet underline text-sm"
          >
            Affiliate disclosure
          </Link>
        </div>
      </section>
    </div>
  );
}
