import Link from "next/link";
import type { ResearchArticle } from "@/lib/research";
import JsonLd from "@/components/shared/JsonLd";
import DYORCallout from "@/components/marketing/DYORCallout";
import AuthorByline from "@/components/shared/AuthorByline";
import Breadcrumb from "@/components/shared/Breadcrumb";
import {
  getAuthorBySlug,
  getDefaultAuthor,
  type Author,
} from "@/data/authors";
import { getCitation } from "@/lib/citations";

interface ResearchArticleLayoutProps {
  article: ResearchArticle;
  /** Live "data as of" date string. Falls back to publishedDate. */
  dataAsOf?: string;
  /**
   * Optional list of citation registry IDs from src/lib/citations.ts.
   * When provided, each citation is emitted as a structured
   * `citation` object on the ScholarlyArticle JSON-LD with the
   * canonical PubMed/DOI URL — Google's Knowledge Graph reads this
   * as evidence of primary-source verification and links the article
   * back to the cited publications. Replaces the previous
   * citationCount-only signal which only told Google how many
   * sources existed without identifying which ones.
   *
   * Pass the same array to <SourcesPanel sourceIds={...}/> below the
   * article body so the visible source list and the structured data
   * stay in sync.
   */
  sourceIds?: string[];
  children: React.ReactNode;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

/**
 * Build the JSON-LD Person reference for an author. We use @id to
 * point at the same canonical /authors/[slug]#person identifier the
 * /authors/[slug] page emits, so Google's parser can reconcile the
 * two and treat them as one entity.
 */
function buildPersonRef(author: Author) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/authors/${author.slug}#person`,
    name: author.name,
    url: `${SITE_URL}/authors/${author.slug}`,
    jobTitle: author.jobTitle,
  };
}

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
 * Map article tags to Schema.org MedicalCondition entities for the
 * MedicalWebPage `about` array. Each tag that maps to a condition
 * adds a structured MedicalCondition reference Google's medical
 * knowledge graph can use to link the article to the condition's
 * canonical entity. Multiple conditions are emitted as an array
 * (Schema.org `about` accepts multiple values).
 *
 * Why this exists separately from HEALTH_CONTENT_TAGS: that allow-
 * list gates whether MedicalWebPage is emitted at all, while this
 * map identifies which specific MedicalConditions the article is
 * about. Most YMYL articles touch multiple conditions (e.g., a
 * GLP-1 cardiovascular safety review touches both Type 2 Diabetes
 * and Cardiovascular Disease).
 */
const TAG_TO_MEDICAL_CONDITION: Record<string, { name: string; code?: string; codingSystem?: string; sameAs?: string }> = {
  "Type 2 Diabetes": {
    name: "Type 2 Diabetes Mellitus",
    code: "E11",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Type_2_diabetes",
  },
  "Diabetes": {
    name: "Diabetes Mellitus",
    code: "E11",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Diabetes",
  },
  "Obesity": {
    name: "Obesity",
    code: "E66",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Obesity",
  },
  "Sleep apnea": {
    name: "Obstructive Sleep Apnea",
    code: "G47.33",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Obstructive_sleep_apnea",
  },
  "Cardiovascular": {
    name: "Cardiovascular Disease",
    code: "I25",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Cardiovascular_disease",
  },
  "Heart failure": {
    name: "Heart Failure",
    code: "I50",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Heart_failure",
  },
  "PCOS": {
    name: "Polycystic Ovary Syndrome",
    code: "E28.2",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Polycystic_ovary_syndrome",
  },
  "Liver safety": {
    name: "Non-alcoholic Fatty Liver Disease",
    code: "K76.0",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Non-alcoholic_fatty_liver_disease",
  },
  "Cancer": {
    name: "Medullary Thyroid Cancer",
    code: "C73",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Medullary_thyroid_cancer",
  },
  "MTC": {
    name: "Medullary Thyroid Cancer",
    code: "C73",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Medullary_thyroid_cancer",
  },
  "Hypoglycemia": {
    name: "Hypoglycemia",
    code: "E16.2",
    codingSystem: "ICD-10",
    sameAs: "https://en.wikipedia.org/wiki/Hypoglycemia",
  },
  "Pregnancy": {
    name: "Pregnancy",
    sameAs: "https://en.wikipedia.org/wiki/Pregnancy",
  },
};

function buildMedicalConditionsFromTags(tags: string[]) {
  const seen = new Set<string>();
  const conditions: Array<Record<string, unknown>> = [];
  for (const tag of tags) {
    const cond = TAG_TO_MEDICAL_CONDITION[tag];
    if (cond && !seen.has(cond.name)) {
      seen.add(cond.name);
      const node: Record<string, unknown> = {
        "@type": "MedicalCondition",
        name: cond.name,
      };
      if (cond.code && cond.codingSystem) {
        node.code = {
          "@type": "MedicalCode",
          codeValue: cond.code,
          codingSystem: cond.codingSystem,
        };
      }
      if (cond.sameAs) {
        node.sameAs = cond.sameAs;
      }
      conditions.push(node);
    }
  }
  return conditions;
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
  sourceIds,
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

  // Resolve the author from the article registry. Defaults to Eli
  // Marsden (DEFAULT_AUTHOR_SLUG) when an article doesn't specify an
  // author override — opts every existing article into a real human
  // byline immediately without per-article manual edits. New articles
  // can override by setting `author: "<slug>"` on the registry record.
  const author =
    getAuthorBySlug(article.author ?? null) ?? getDefaultAuthor();
  // Optional medical reviewer — currently always null because we
  // don't yet have a credentialed clinician on staff. The infra is
  // wired so we just populate `medicalReviewer` on the article record
  // when we hire someone.
  const medicalReviewer =
    getAuthorBySlug(article.medicalReviewer ?? null) ?? null;
  const authorPersonRef = buildPersonRef(author);
  const reviewerPersonRef = medicalReviewer
    ? buildPersonRef(medicalReviewer)
    : null;

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
    // Named human author per Google's E-E-A-T guidance for YMYL
    // medical content. Resolves to a Person reference whose @id
    // matches the /authors/[slug]#person canonical so Google's
    // Knowledge Graph can reconcile the byline with the author bio
    // page in one entity.
    author: authorPersonRef,
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
    // Structured citation array — when the article passes
    // sourceIds, each citation is emitted as a ScholarlyArticle
    // reference with the canonical PubMed/DOI URL. This tells
    // Google's Knowledge Graph WHICH primary sources we cite,
    // not just how many. Optional — articles without sourceIds
    // continue to ship the citationCount-only signal.
    ...(sourceIds && sourceIds.length > 0
      ? {
          citation: sourceIds.map((id) => {
            const entry = getCitation(id);
            const url = entry.pmid
              ? `https://pubmed.ncbi.nlm.nih.gov/${entry.pmid}/`
              : entry.doi
                ? `https://doi.org/${entry.doi}`
                : entry.url;
            return {
              "@type": "ScholarlyArticle",
              headline: entry.label,
              publisher: {
                "@type": "Organization",
                name: entry.publisher,
              },
              url,
              ...(entry.pmid
                ? {
                    identifier: {
                      "@type": "PropertyValue",
                      propertyID: "PMID",
                      value: entry.pmid,
                    },
                  }
                : {}),
              ...(entry.doi
                ? {
                    sameAs: `https://doi.org/${entry.doi}`,
                  }
                : {}),
            };
          }),
        }
      : {}),
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
        // about: the medical entities the page covers. Always
        // includes the GLP-1 receptor agonist drug class. When the
        // article tags map to specific MedicalConditions (Type 2
        // Diabetes, Obesity, Sleep Apnea, etc.), those are added
        // alongside the Drug entity so Google's medical knowledge
        // graph can link the article to both the drug and the
        // conditions it discusses.
        about: [
          {
            "@type": "Drug",
            name: "GLP-1 receptor agonists",
            alternateName: [
              "Glucagon-like peptide-1 receptor agonists",
              "Semaglutide",
              "Tirzepatide",
              "Orforglipron",
            ],
          },
          ...buildMedicalConditionsFromTags(article.tags),
        ],
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
        // reviewedBy resolves to the medical reviewer Person if one
        // is set on the article, otherwise falls back to the author
        // (named human, not Organization). Per Google's YMYL E-E-A-T
        // framework, named-Person reviewedBy is meaningfully stronger
        // than Organization-only attribution. When we hire a
        // credentialed clinician, set article.medicalReviewer and
        // this field will switch automatically.
        reviewedBy: reviewerPersonRef ?? authorPersonRef,
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

      {/* Visible breadcrumb — paired with the BreadcrumbList JSON-LD
          above. Distributes PageRank up to /research and /research/topics
          on every article view. */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: article.title },
        ]}
      />

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

        {/* Named author byline strip — links to /authors/[slug] bio
            page, surfaces medical reviewer (or honest "editorially
            reviewed" disclosure when none), and shows last-reviewed
            date. Replaces the previous Organization-only "By the
            Weight Loss Rankings editorial team" line that was a YMYL
            E-E-A-T weak point. */}
        <AuthorByline
          author={author}
          medicalReviewer={medicalReviewer}
          publishedDate={article.publishedDate}
          lastReviewed={dateModified}
          className="mt-7"
        />

        {/* Secondary meta row — read time + citations */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-text-secondary">
          <span>{article.readMinutes} min read</span>
          <span>·</span>
          <span>{article.citations} citations</span>
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
