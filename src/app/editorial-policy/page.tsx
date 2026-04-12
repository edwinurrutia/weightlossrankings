/**
 * /editorial-policy — full editorial standards page.
 *
 * Why this exists:
 *
 *   Google's Helpful Content guidance and Search Quality Rater
 *   Guidelines for YMYL ask: "Who created the content, how was it
 *   created, and why was it created?" Sites that publish a clear
 *   editorial process page get credited for transparency. Sites
 *   that don't are flagged.
 *
 *   This page documents:
 *     - The named human author and their qualifications
 *     - How clinical claims are sourced and verified
 *     - The role of AI tooling in our workflow
 *     - The 125% verification rule for YMYL content
 *     - The hands-on test methodology for provider reviews
 *     - The corrections workflow
 *     - The independence + conflict-of-interest policy
 *
 *   Referenced by Organization schema's `publishingPrinciples`
 *   property in src/app/layout.tsx, and linked from every author
 *   bio page, the AuthorByline component, and the footer.
 */

import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/shared/JsonLd";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.weightlossrankings.org";

export const metadata: Metadata = {
  title: "Editorial Policy — How We Write and Verify Content",
  description:
    "How Weight Loss Rankings produces YMYL health content: named human authors, primary-source verification, transparent AI tooling disclosure, hands-on provider testing, and a 125% accuracy standard.",
  alternates: { canonical: "/editorial-policy" },
  openGraph: {
    title: "Editorial Policy — Weight Loss Rankings",
    description:
      "How we write and verify YMYL health content. Named human authors, primary-source verification, transparent AI disclosure.",
    type: "article",
    url: "/editorial-policy",
    siteName: "Weight Loss Rankings",
  },
  twitter: { card: "summary" },
};

export default function EditorialPolicyPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/editorial-policy`,
    url: `${SITE_URL}/editorial-policy`,
    name: "Editorial Policy",
    description:
      "How Weight Loss Rankings produces and verifies YMYL health content.",
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
    { name: "Editorial Policy", url: "/editorial-policy" },
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
            <span className="text-brand-text-primary">Editorial Policy</span>
          </nav>

          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
              How We Work
            </p>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-brand-text-primary tracking-tight leading-[1.1]">
              Editorial Policy
            </h1>
            <p className="mt-5 text-lg text-brand-text-secondary leading-relaxed">
              Weight Loss Rankings publishes YMYL (Your Money Your Life)
              health content. Every clinical claim is verified against a
              primary source before publication. Here is exactly how that
              process works, who runs it, and the role of AI tooling in
              our workflow.
            </p>
          </header>

          <div className="prose prose-base max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-brand-text-primary prose-p:text-brand-text-primary prose-p:leading-relaxed prose-a:text-brand-violet prose-a:no-underline hover:prose-a:underline prose-li:text-brand-text-primary">
            <h2>Who writes Weight Loss Rankings</h2>
            <p>
              The site is written and edited by{" "}
              <Link href="/authors/eli-marsden">Eli Marsden</Link>,
              founding editor. Eli spent his early career in healthcare
              investment banking and the past 10+ years building
              pharmaceutical companies — leading drug development programs
              that resulted in FDA approvals and named inventor on
              multiple patents for new therapeutics. He is bilingual
              (English and Spanish) and personally edits both the English
              and the Spanish corpus on this site.
            </p>
            <p>
              <strong>Eli is not a licensed clinician.</strong> He brings
              deep pharmaceutical industry experience to the editorial
              role but does not hold a medical degree, nursing license,
              or pharmacy license. We are explicit about this on every
              YMYL page so readers know what kind of expertise the
              content is anchored in.
            </p>
            <p>
              We are actively seeking a credentialed medical reviewer
              (MD, PharmD, NP, RN, or RD) to join the editorial team
              on a freelance / consultant basis. When that role is
              filled, the byline on every clinical article will switch
              from &ldquo;Editorially reviewed (not clinically
              reviewed)&rdquo; to &ldquo;Medically reviewed by [Name,
              Credentials]&rdquo; automatically — the infrastructure
              is already in place. If you are a credentialed clinician
              interested in this role, see the open posting on our{" "}
              <Link href="/careers">Careers page</Link> for details
              and how to apply.
            </p>

            <h2>The 125% verification standard</h2>
            <p>
              For YMYL content, &ldquo;good enough&rdquo; is not the bar. Every clinical
              claim is verified at least twice against independent
              primary sources before publication. We call this the 125%
              standard — we want to be more accurate than necessary, not
              less.
            </p>
            <p>
              Concrete example of what 125% looks like in practice: when
              we publish that a GLP-1 trial showed X% mean weight loss
              over Y weeks at Z dose, we cite the published NEJM/JAMA
              paper with PMID, we cite the FDA prescribing information
              that quotes the same trial in the label, and we cite the
              clinicaltrials.gov registration. Three independent primary
              sources for one number. If any of the three disagrees,
              we either reconcile the discrepancy in the article body
              or hold the claim until we can.
            </p>

            <h2>How we source clinical claims</h2>
            <p>The acceptable source hierarchy for clinical claims:</p>
            <ol>
              <li>
                <strong>FDA prescribing information</strong> (the official
                drug label) — the highest-trust source for approved
                indications, dosing, contraindications, and warnings.
              </li>
              <li>
                <strong>PubMed-indexed peer-reviewed primary research</strong>{" "}
                with PMID — for trial efficacy, mechanism, and safety
                data not yet on the FDA label.
              </li>
              <li>
                <strong>Published regulatory filings</strong> — FDA warning
                letters (with the actual letter URL on fda.gov), DOJ
                press releases, FTC enforcement orders, court records
                (PACER, CourtListener) for litigation claims.
              </li>
              <li>
                <strong>Clinicaltrials.gov</strong> — for trial design,
                enrollment, and primary endpoints.
              </li>
            </ol>
            <p>
              <strong>What we do NOT cite for clinical claims:</strong>{" "}
              press releases, vendor blog posts, aggregator review sites,
              &ldquo;GLP-1 best of&rdquo; listicles, social media, AI-generated
              summaries, or our own previously published articles
              (recursive sourcing is not sourcing).
            </p>

            <h2>How we source provider data</h2>
            <p>
              Pricing, state coverage, drug formulary, accreditations,
              and pharmacy partners for every telehealth provider in our
              dataset are sourced directly from the live provider page
              on the date of verification:
            </p>
            <ul>
              <li>
                The verification URL is stored in the provider record
                under <code>verification.source_urls</code>
              </li>
              <li>
                The verification date is surfaced visibly on every{" "}
                <Link href="/reviews">review page</Link> as
                &ldquo;Last verified [date]&rdquo;
              </li>
              <li>
                The confidence tier (high / medium / low) reflects how
                independently verifiable the provider&apos;s claims are
                — if a provider does not publish a state list, we
                explicitly mark it as low confidence rather than
                pretending we know
              </li>
              <li>
                Providers are re-verified on a recurring cadence; bulk
                pricing changes trigger a re-verification pass on
                affected articles
              </li>
            </ul>

            <h2>The role of AI tooling in our workflow</h2>
            <p>
              We use AI assistance for drafting, formatting, structured
              data generation, and verification scaffolding. We do{" "}
              <strong>not</strong> publish content that has not been
              read, fact-checked, and approved by a named human editor
              — every word on every page goes through Eli before it
              ships.
            </p>
            <p>
              Specifically, AI tooling is used to:
            </p>
            <ul>
              <li>
                <strong>Draft article structure</strong> — turning a
                research outline into a first-pass article that the
                human editor then rewrites and verifies
              </li>
              <li>
                <strong>Cross-check citations</strong> — confirming that
                cited PMIDs resolve to the claimed paper, that cited FDA
                URLs return the actual letter, that cited court cases
                exist in PACER
              </li>
              <li>
                <strong>Maintain JSON-LD structured data</strong> —
                generating Product, Review, MedicalWebPage, and Person
                schemas from the provider and author registries
              </li>
              <li>
                <strong>Surface consistency issues</strong> — flagging when
                a claim in one article contradicts a claim in another
              </li>
            </ul>
            <p>
              AI tooling is <strong>never</strong> used to:
            </p>
            <ul>
              <li>
                Generate or fabricate clinical claims, trial numbers,
                pricing data, or state coverage lists
              </li>
              <li>
                Write the final published version of any YMYL claim
                without human verification
              </li>
              <li>
                Generate or fabricate citations, PMIDs, FDA letter URLs,
                or court case numbers
              </li>
              <li>
                Auto-translate Spanish content (the /es/ corpus is
                first-party translated and edited by the same bilingual
                editor)
              </li>
            </ul>
            <p>
              This policy follows Google&apos;s public guidance that
              AI-assisted content is fine when it is high quality and
              human-verified, and is treated as scaled content abuse
              when it is mass-generated without value or verification.
            </p>

            <h2>The 6-dimension scoring rubric</h2>
            <p>
              Provider scores are calculated from a transparent
              6-dimension rubric: value, effectiveness, user experience,
              trust &amp; safety, accessibility, and ongoing support.
              Each dimension is weighted (value 25%, effectiveness 25%,
              UX 15%, trust 15%, accessibility 10%, support 10%) and the
              breakdown is visible on every <Link href="/reviews">review</Link>{" "}
              page. The full methodology is published at{" "}
              <Link href="/methodology">/methodology</Link>.
            </p>

            <h2>Independence and conflicts of interest</h2>
            <p>
              Weight Loss Rankings is reader-supported via affiliate
              commissions on a subset of provider links. <strong>Editorial
              scores and rankings are produced independently of affiliate
              relationships and are not for sale.</strong>
            </p>
            <p>
              Specific independence guarantees:
            </p>
            <ul>
              <li>
                We rank providers by editorial score, not by affiliate
                payout. The Editor&apos;s Pick on the homepage is whichever
                provider has the highest overall score among the
                Katalys-approved set, and the score is calculated from
                the rubric above before the Katalys approval status is
                even checked
              </li>
              <li>
                We disclose when a covered provider has known FDA
                enforcement history, pending litigation, or BBB
                complaints — including providers we monetize. See the
                Direct Meds and Zealthy review pages for examples
              </li>
              <li>
                We list providers we do <strong>not</strong> monetize
                alongside ones we do, with no visual distinction in the
                ranking — the affiliate disclosure is at the link level,
                not the listing level
              </li>
              <li>
                When a provider we cover has a direct conflict with the
                founding editor&apos;s industry background (e.g., a
                portfolio company, a brand he holds patents on), the
                conflict is disclosed inline on that provider&apos;s
                review page
              </li>
            </ul>
            <p>
              The full affiliate disclosure is at{" "}
              <Link href="/disclosure">/disclosure</Link>. Errors get
              corrected per <Link href="/corrections">/corrections</Link>{" "}
              regardless of whether the affected party is an affiliate
              partner.
            </p>

            <h2>What we will never do</h2>
            <ul>
              <li>
                Publish a clinical claim without a primary source
              </li>
              <li>
                Auto-generate content without human review
              </li>
              <li>
                Hide or rewrite a published claim that turned out to be
                wrong (we mark corrections visibly per{" "}
                <Link href="/corrections">/corrections</Link>)
              </li>
              <li>
                Accept payment to influence editorial scores or rankings
              </li>
              <li>
                Cite our own articles as a primary source for claims they
                were never primary on
              </li>
              <li>
                Pretend we have credentials we do not have
              </li>
              <li>
                Publish AI-translated Spanish content (the /es/ corpus is
                first-party translated and edited by the same editor)
              </li>
            </ul>

            <h2>How to reach us about editorial questions</h2>
            <p>
              Editorial questions, source requests, factual disputes, and
              correction requests:{" "}
              <a href="mailto:hello@weightlossrankings.org">
                hello@weightlossrankings.org
              </a>
              . We respond within one business day.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
