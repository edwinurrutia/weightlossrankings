/**
 * /corrections — corrections policy page.
 *
 * Why this exists:
 *
 *   Google's Search Quality Rater Guidelines for YMYL content
 *   explicitly require a "clear policy for how to report errors and
 *   have them fixed." Sites without a dedicated corrections policy
 *   are flagged as low quality on health content.
 *
 *   This page is also referenced by the Organization schema
 *   `correctionsPolicy` property in src/app/layout.tsx, which
 *   Google's Knowledge Graph reads to determine the authoritativeness
 *   of a publisher entity.
 */

import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/shared/JsonLd";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

export const metadata: Metadata = {
  title: "Corrections Policy — Weight Loss Rankings",
  description:
    "How to report errors on Weight Loss Rankings and how we handle corrections. Independent editorial policy with named human author and transparent verification.",
  alternates: { canonical: "/corrections" },
  openGraph: {
    title: "Corrections Policy — Weight Loss Rankings",
    description:
      "How to report errors on Weight Loss Rankings and how we handle corrections.",
    type: "article",
    url: "/corrections",
    siteName: "Weight Loss Rankings",
  },
  twitter: { card: "summary" },
};

export default function CorrectionsPolicyPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/corrections`,
    url: `${SITE_URL}/corrections`,
    name: "Corrections Policy",
    description:
      "How to report errors on Weight Loss Rankings and how we handle corrections.",
    isPartOf: {
      "@type": "WebSite",
      name: "Weight Loss Rankings",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
      url: SITE_URL,
    },
    inLanguage: "en-US",
  };

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Corrections Policy", url: "/corrections" },
  ];

  return (
    <>
      <JsonLd data={webPageSchema} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <main className="min-h-screen bg-white pb-24">
        <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
          {/* Visible breadcrumb */}
          <nav className="mb-6 text-sm text-brand-text-secondary" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-violet">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-text-primary">Corrections Policy</span>
          </nav>

          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
              Editorial Standards
            </p>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-brand-text-primary tracking-tight leading-[1.1]">
              Corrections Policy
            </h1>
            <p className="mt-5 text-lg text-brand-text-secondary leading-relaxed">
              Weight Loss Rankings publishes YMYL health content. Errors get
              corrected promptly, transparently, and with the change history
              visible to readers. Here is exactly how that works.
            </p>
          </header>

          <div className="prose prose-base max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-brand-text-primary prose-p:text-brand-text-primary prose-p:leading-relaxed prose-a:text-brand-violet prose-a:no-underline hover:prose-a:underline prose-li:text-brand-text-primary">
            <h2>How to report an error</h2>
            <p>
              If you find a factual error in any article, provider review,
              data table, pricing claim, or quoted study, email{" "}
              <a href="mailto:hello@weightlossrankings.org">
                hello@weightlossrankings.org
              </a>{" "}
              with:
            </p>
            <ul>
              <li>The page URL where you saw the error</li>
              <li>The specific claim or sentence that is wrong</li>
              <li>The correct information (and a primary-source link if you have one)</li>
            </ul>
            <p>
              We respond to corrections requests within one business day,
              typically faster. Anonymous reports are welcome — we do not
              require you to identify yourself to file a correction.
            </p>

            <h2>What counts as a correction</h2>
            <p>
              We distinguish three categories of edits and handle them differently:
            </p>
            <ol>
              <li>
                <strong>Factual corrections</strong> — incorrect numbers,
                wrong drug names, mis-cited studies, outdated FDA actions,
                wrong state coverage lists, wrong pricing. These trigger a
                visible &ldquo;Correction&rdquo; stamp at the top of the
                article noting what was changed and when. The
                article&apos;s structured data <code>dateModified</code>{" "}
                field updates immediately, and the article enters our
                re-verification queue for an additional pass against
                primary sources.
              </li>
              <li>
                <strong>Updates from new evidence</strong> — when a new
                clinical trial publishes, an FDA action changes, or a
                provider updates their pricing or state list, we update
                the article body and bump <code>lastUpdated</code> on the
                article registry. The visible &ldquo;Last reviewed&rdquo;{" "}
                date in the byline updates accordingly.
              </li>
              <li>
                <strong>Copy edits</strong> — typos, grammar fixes, link
                renames. These do not change <code>dateModified</code> and
                are not surfaced as corrections — they are not material to
                the reader.
              </li>
            </ol>

            <h2>Correction stamp format</h2>
            <p>
              When a factual correction is published, the article header
              receives a visible <strong>Correction</strong> banner with
              the date and a one-line description of what changed. Example:
            </p>
            <blockquote>
              Correction (2026-04-15): An earlier version of this article
              cited the SURMOUNT-1 mean weight loss as 22.5% over 72 weeks.
              The correct figure is 20.9% mean weight loss in the 15&nbsp;mg
              tirzepatide arm of SURMOUNT-1 per the published NEJM trial
              data (PMID: 35658024). The article has been updated.
            </blockquote>
            <p>
              We do not silently rewrite published claims. The original
              error and the correction both stay visible — readers
              deserve to see what changed and when.
            </p>

            <h2>Verification standards before publication</h2>
            <p>
              Every clinical claim on Weight Loss Rankings is sourced to a
              primary document before publication:
            </p>
            <ul>
              <li>
                <strong>Drug efficacy and safety claims</strong> — sourced
                to FDA prescribing information (the official label) or to
                a PubMed-indexed clinical trial via PMID. We do not cite
                press releases, vendor blog posts, or aggregator review
                sites for clinical claims.
              </li>
              <li>
                <strong>FDA enforcement claims</strong> — sourced to the
                actual FDA warning letter URL on{" "}
                <a
                  href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  fda.gov
                </a>
                . If we cannot link the actual letter, we say so explicitly
                and label the claim as unverified.
              </li>
              <li>
                <strong>Provider pricing and state coverage</strong> —
                sourced to the live provider page on the date of
                verification, with the URL stored in the provider record
                and the verification date surfaced in the data confidence
                badge.
              </li>
              <li>
                <strong>Litigation claims</strong> — sourced to court records
                (PACER, CourtListener, Justia) with the case number visible
                in the article body.
              </li>
            </ul>
            <p>
              Read the full editorial workflow at{" "}
              <Link href="/editorial-policy">/editorial-policy</Link>.
            </p>

            <h2>Provider re-verification cadence</h2>
            <p>
              Provider data — pricing, state coverage, drug formulary,
              accreditations — is re-verified against the live provider
              page on a recurring cadence. The most recent verification
              date for each provider is visible in the data confidence
              badge on every <Link href="/reviews">review</Link> page.
              When a provider changes pricing or pulls out of a state, we
              update the record and the corresponding article gets a
              correction stamp if material.
            </p>

            <h2>What we will never do</h2>
            <ul>
              <li>
                Silently delete a published claim that turned out to be wrong
              </li>
              <li>
                Backdate a correction to make it look like the error never
                happened
              </li>
              <li>
                Refuse to correct an error because it would be inconvenient
                for an affiliate partner
              </li>
              <li>
                Decline a correction request because it came from an
                anonymous source
              </li>
            </ul>

            <h2>If we get it wrong about you</h2>
            <p>
              If you operate a provider, pharmacy, or telehealth brand we
              cover and you believe we have published incorrect information
              about your business, email{" "}
              <a href="mailto:hello@weightlossrankings.org">
                hello@weightlossrankings.org
              </a>{" "}
              with the page URL and the corrected information. We do not
              accept payment to remove negative coverage, but we always
              correct factual errors regardless of whether the affected
              party is an affiliate partner.
            </p>

            <h2>Independence and conflicts of interest</h2>
            <p>
              Our editorial scores and rankings are produced independently
              of affiliate relationships. The full disclosure policy is
              published at <Link href="/disclosure">/disclosure</Link> and
              the six-dimension scoring methodology is at{" "}
              <Link href="/methodology">/methodology</Link>. Specific
              conflicts that affect a particular review are disclosed
              inline on that review page.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
