import Link from "next/link";
import type { ResearchArticle } from "@/lib/research";
import JsonLd from "@/components/shared/JsonLd";
import DYORCallout from "@/components/marketing/DYORCallout";

interface ResearchArticleLayoutProps {
  article: ResearchArticle;
  /** Live "data as of" date string. Falls back to publishedDate. */
  dataAsOf?: string;
  children: React.ReactNode;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

// Tags that mark an article as YMYL health content. When an article
// has any of these tags, ResearchArticleLayout emits a MedicalWebPage
// JSON-LD block in addition to the ScholarlyArticle one. Google's
// medical knowledge graph and the "About this result" panel
// specifically look for MedicalWebPage on health content — it's a
// stronger E-E-A-T signal than ScholarlyArticle alone for health
// queries. The two schemas are complementary, not duplicative.
const HEALTH_CONTENT_TAGS = new Set<string>([
  "Side effects",
  "Safety",
  "Cancer",
  "Black box warning",
  "MTC",
  "Pregnancy",
  "Hormones",
  "Menstrual cycle",
  "PCOS",
  "Liver safety",
  "Cardiovascular",
  "Blood pressure",
  "Surgery",
  "Anesthesia",
  "Patient safety",
  "Nausea",
  "Drug interactions",
  "Hypoglycemia",
  "Combination therapy",
  "Phentermine",
  "Microdosing",
  "Off-label",
  "Women's health",
  "Patient question",
  "FAQ",
  "Patient guide",
]);

function isHealthContent(article: ResearchArticle): boolean {
  return article.tags.some((t) => HEALTH_CONTENT_TAGS.has(t));
}

/**
 * Shared chrome for every /research/[slug] piece. Provides:
 *   - Editorial header (eyebrow, title, byline, freshness stamp)
 *   - Schema.org Article JSON-LD for Google rich results
 *   - DYOR callout near the bottom
 *   - "More from research" cross-sell row
 *
 * The article body itself is whatever children are passed in — usually
 * a long-form prose section with embedded LiveDataCallouts and figures.
 */
export default function ResearchArticleLayout({
  article,
  dataAsOf,
  children,
}: ResearchArticleLayoutProps) {
  // dateModified resolution order:
  //   1. dataAsOf prop (live datasets like the FDA letters tracker
  //      pass the latest data point's date so the schema reflects
  //      the actual freshness, not a stale publish date)
  //   2. article.lastUpdated (registry field — bump when content
  //      meaningfully changes, e.g., trial-number corrections,
  //      pricing refreshes, URL renames)
  //   3. article.publishedDate (fallback — first-published date)
  // The earliest of these is what Google ranks against when it
  // computes "freshness" for time-sensitive YMYL queries.
  const dateModified =
    dataAsOf ?? article.lastUpdated ?? article.publishedDate;

  // Research articles use ScholarlyArticle (a more specific Article
  // subtype) because they are first-party data investigations and
  // scientific deep-dives, not editorial blog posts. ScholarlyArticle
  // is what Google Scholar indexes, and Google's medical/YMYL
  // guidelines treat it as a higher-trust signal than plain Article.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}/research/${article.slug}/opengraph-image`,
    datePublished: article.publishedDate,
    dateModified,
    author: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-600.png`,
        width: 600,
        height: 600,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/research/${article.slug}`,
    },
    articleSection:
      article.kind === "data-investigation"
        ? "Data Investigation"
        : "Scientific Deep-Dive",
    keywords: article.tags.join(", "),
    // Citation count is a real signal — research papers with more
    // citations rank higher in Scholar and in Google's medical
    // knowledge graph. We expose ours via citationCount.
    citationCount: article.citations,
    // Mark the headline + lead description as speakable so voice
    // assistants and Discover audio surface this content.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable='lead']"],
    },
  };

  // BreadcrumbList JSON-LD — Google renders breadcrumb rich results
  // in the SERP and uses them as a CTR signal. Every research article
  // gets the same 3-step path: Home → Research → [Article Title].
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Research",
        item: `${SITE_URL}/research`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/research/${article.slug}`,
      },
    ],
  };

  // MedicalWebPage JSON-LD for YMYL health content. Google's medical
  // knowledge graph specifically looks for this schema type on health
  // pages — it's the strongest single E-E-A-T signal we can emit
  // short of named human authors with credentials. We emit it
  // ALONGSIDE ScholarlyArticle (not instead of) because the two
  // schemas serve different parts of Google's pipeline:
  // ScholarlyArticle for Scholar / news / general indexing,
  // MedicalWebPage for the medical knowledge graph and the
  // "About this result" panel.
  //
  // Gated by the HEALTH_CONTENT_TAGS allow-list above so we don't
  // emit it on non-health articles like the savings calculator
  // walkthroughs or the FDA warning letters tracker (those use
  // their own more-specific schemas already).
  const isHealth = isHealthContent(article);
  const medicalWebPageSchema = isHealth
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: article.title,
        description: article.description,
        url: `${SITE_URL}/research/${article.slug}`,
        datePublished: article.publishedDate,
        dateModified,
        inLanguage: "en-US",
        // medicalAudience tells Google's knowledge graph who this
        // page is FOR. "Patient" is the most-recognized value.
        medicalAudience: {
          "@type": "MedicalAudience",
          audienceType: "Patient",
        },
        // about: the medical condition or treatment the page covers.
        // We use a generic Drug entity referencing the GLP-1 RA class
        // because most of our YMYL articles cover the class as a
        // whole rather than a single named drug.
        about: {
          "@type": "Drug",
          name: "GLP-1 receptor agonists",
          alternateName: [
            "Glucagon-like peptide-1 receptor agonists",
            "Semaglutide",
            "Tirzepatide",
            "Orforglipron",
          ],
        },
        // primaryImageOfPage uses the per-route OG image
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/research/${article.slug}/opengraph-image`,
        },
        // lastReviewed signals editorial freshness on YMYL content.
        // Same value as dateModified for now; will diverge once we
        // add a separate `reviewedDate` field for periodic editorial
        // re-reviews vs minor copy edits.
        lastReviewed: dateModified,
        reviewedBy: {
          "@type": "Organization",
          name: "Weight Loss Rankings",
          url: SITE_URL,
        },
        // mainContentOfPage limits the indexable selectors so the
        // crawler can ignore boilerplate (back link, share buttons,
        // related-research footer).
        mainContentOfPage: {
          "@type": "WebPageElement",
          cssSelector: "article",
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "[data-speakable='lead']"],
        },
      }
    : null;

  const eyebrow =
    article.kind === "data-investigation"
      ? "Data investigation"
      : "Scientific deep-dive";

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {medicalWebPageSchema && <JsonLd data={medicalWebPageSchema} />}

      {/* Breadcrumb + back link */}
      <nav className="mb-6 text-xs text-brand-text-secondary">
        <Link href="/research" className="hover:text-brand-violet">
          ← All research
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          {eyebrow}
        </p>
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
        >
          {article.title}
        </h1>
        <p
          data-speakable="lead"
          className="mt-5 text-lg text-brand-text-secondary leading-relaxed"
        >
          {article.description}
        </p>

        {/* Byline + meta row */}
        <div className="mt-7 pt-5 border-t border-brand-violet/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-brand-text-secondary">
          <span>
            By the{" "}
            <strong className="text-brand-text-primary">
              Weight Loss Rankings
            </strong>{" "}
            editorial team
          </span>
          <span>·</span>
          <span>{article.readMinutes} min read</span>
          <span>·</span>
          <span>{article.citations} citations</span>
          <span>·</span>
          <span>
            Published{" "}
            <strong className="text-brand-text-primary">
              {article.publishedDate}
            </strong>
          </span>
          {dateModified !== article.publishedDate && (
            <>
              <span>·</span>
              <span>
                Updated{" "}
                <strong className="text-brand-text-primary">
                  {dateModified}
                </strong>
              </span>
            </>
          )}
        </div>

        {/* Tag chips */}
        {article.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <li
                key={t}
                className="text-[11px] font-semibold text-brand-violet bg-brand-violet/8 border border-brand-violet/15 rounded-full px-2.5 py-1"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* Body — passed in by the route */}
      <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-brand-text-primary prose-p:text-brand-text-primary prose-p:leading-relaxed prose-a:text-brand-violet prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-text-primary prose-li:text-brand-text-primary prose-li:leading-relaxed">
        {children}
      </div>

      {/* DYOR */}
      <div className="mt-12">
        <DYORCallout />
      </div>

      {/* Methodology / sources footer */}
      <footer className="mt-16 pt-10 border-t border-brand-violet/15">
        <h2 className="font-heading text-base font-bold text-brand-text-primary mb-3">
          About this analysis
        </h2>
        <p className="text-sm text-brand-text-secondary leading-relaxed">
          Weight Loss Rankings is an independent editorial publication. Our
          provider dataset is verified directly against each provider&apos;s
          website and updated continuously.{" "}
          <Link
            href="/methodology"
            className="text-brand-violet hover:underline"
          >
            Read our full methodology →
          </Link>
        </p>
      </footer>
    </article>
  );
}
