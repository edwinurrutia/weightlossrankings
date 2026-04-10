/**
 * Author registry — single source of truth for editorial bylines on
 * Weight Loss Rankings.
 *
 * Why this file exists:
 *
 *   YMYL (Your Money Your Life) health content is held to Google's
 *   strictest E-E-A-T bar. The Search Quality Rater Guidelines
 *   explicitly require that medical content be attributed to
 *   identifiable people whose background and credentials a reader
 *   can verify. Institutional bylines like "By the editorial team"
 *   are flagged as low-quality on YMYL pages.
 *
 *   This registry powers:
 *     - Visible bylines on every research article and provider review
 *       (via src/components/shared/AuthorByline.tsx)
 *     - Per-author /authors/[slug] bio pages with ProfilePage + Person
 *       JSON-LD schema (Google reads sameAs and hasCredential to
 *       reconcile authors against the Knowledge Graph)
 *     - Article-level Person attribution in MedicalWebPage,
 *       ScholarlyArticle, and Review JSON-LD instead of the previous
 *       hard-coded Organization entry
 *
 *   The architecture is intentionally extensible: as we hire writers,
 *   contributing experts, or a credentialed medical reviewer, we add
 *   their record here and reference them by `slug` in the
 *   RESEARCH_ARTICLES registry (src/lib/research.ts). The byline
 *   component picks up new authors automatically.
 *
 * Honest disclosure principle:
 *
 *   Every author entry must accurately reflect what the person can
 *   actually claim. If they're not a licensed clinician, the bio
 *   says so explicitly. If they're an industry expert without
 *   formal medical training, we describe the relevant industry
 *   background and don't imply clinical authority. Google's
 *   YMYL framework rewards sites that are transparent about what
 *   they DON'T have, more than sites that overclaim.
 */

export interface Author {
  /** URL slug — must be lowercase, kebab-case, stable. */
  slug: string;
  /** Display name as it appears on bylines and in JSON-LD. */
  name: string;
  /** Professional title within Weight Loss Rankings. */
  jobTitle: string;
  /**
   * One-line tagline shown next to the byline (e.g.
   * "Founding Editor · 10+ years in pharmaceutical R&D").
   * Used in the visible byline strip on article headers and as the
   * Person.description in JSON-LD.
   */
  tagline: string;
  /**
   * Full multi-paragraph bio shown on the /authors/[slug] page.
   * Markdown-friendly plain text with newline-separated paragraphs.
   * Should be honest about credentials — don't imply clinical
   * authority that doesn't exist.
   */
  bio: string;
  /**
   * Subject areas this author has demonstrated expertise in. Maps
   * to Person.knowsAbout in JSON-LD. Helps Google's Knowledge
   * Graph reconcile the author against entities in those domains.
   */
  knowsAbout: string[];
  /**
   * Whether the author is a licensed medical clinician. Drives the
   * editorial-vs-clinical reviewer disclaimer on every article.
   * If false, we explicitly disclose that on every page.
   */
  isClinician: boolean;
  /**
   * Optional medical credentials (MD, PharmD, RN, NP, etc.) — only
   * populate when the person is a licensed clinician.
   */
  medicalCredentials?: string;
  /**
   * Optional sameAs URLs — LinkedIn, X, ORCID, PubMed, GitHub,
   * institutional faculty page, NPI registry, etc. Each one is a
   * Knowledge Graph entity-disambiguation signal. Empty array is
   * fine; populate as accounts come online.
   */
  sameAs: string[];
  /**
   * Optional avatar URL relative to /public. If not set, the bio
   * page renders an initials placeholder.
   */
  avatar?: string;
  /**
   * BCP-47 language codes the author can edit content in. Maps to
   * Person.knowsLanguage in JSON-LD. For Weight Loss Rankings,
   * having a real bilingual editor on the Spanish corpus is a
   * meaningful E-E-A-T signal — it tells Google the /es/* content
   * is first-party-edited rather than machine-translated, which
   * Google's Helpful Content guidance treats differently.
   */
  knowsLanguage?: string[];
}

/**
 * The author registry. Add a new author by appending a record here
 * and referencing the slug from RESEARCH_ARTICLES or BLOG_POSTS.
 *
 * Slug-based lookup helpers below allow case-insensitive defaulting
 * to the founding editor when an article doesn't specify an author.
 */
export const AUTHORS: Author[] = [
  {
    slug: "eli-marsden",
    name: "Eli Marsden",
    jobTitle: "Founding Editor",
    tagline: "Founding Editor · 10+ years building pharmaceutical companies",
    bio: [
      "Eli Marsden is the founding editor of Weight Loss Rankings. He spent his early career in healthcare investment banking and the past 10+ years building pharmaceutical companies — leading drug development programs that resulted in FDA approvals and named inventor on multiple patents for new therapeutics.",
      "Eli is bilingual (English and Spanish) and personally edits both the English and the Spanish corpus on Weight Loss Rankings. The /es/research articles are first-party translations and adaptations, not machine-translated copies of the English versions — clinical terminology, dosing units, and regulatory references are reviewed in both languages by the same editor who shipped the English original.",
      "Eli is not a licensed clinician. Every clinical claim on Weight Loss Rankings is sourced to FDA prescribing information, PubMed-indexed primary research, or named regulatory filings. All health content is editorially reviewed by Eli with the support of structured verification workflows; we are actively seeking a credentialed medical reviewer (MD, PharmD, NP) to join the editorial team.",
      "Weight Loss Rankings is reader-supported via affiliate commissions on a subset of provider links. Editorial scores and rankings are produced independently of the affiliate relationships and are not for sale. The full disclosure policy is published at /disclosure and the six-dimension scoring methodology is at /methodology.",
      "When Eli is not editing, he is still in the pharma industry — which is both a meaningful experience signal for understanding how the GLP-1 telehealth market actually works and a potential conflict of interest readers should be aware of. Any direct conflicts on a specific provider are disclosed inline on that provider's review page.",
    ].join("\n\n"),
    knowsAbout: [
      "GLP-1 receptor agonists",
      "Semaglutide",
      "Tirzepatide",
      "Orforglipron",
      "Pharmaceutical drug development",
      "FDA drug approval process",
      "Compounded medications regulation",
      "Telehealth weight management",
      "Healthcare investment banking",
      "Biotechnology",
      "Drug patent prosecution",
    ],
    isClinician: false,
    sameAs: [],
    knowsLanguage: ["en", "es"],
  },
];

/**
 * Look up an author by slug. Case-insensitive. Returns null if not
 * found — call sites should handle the null case rather than
 * defaulting silently, so missing-author bugs surface during build
 * instead of in production.
 */
export function getAuthorBySlug(slug: string | undefined | null): Author | null {
  if (!slug) return null;
  const target = slug.toLowerCase();
  return AUTHORS.find((a) => a.slug === target) ?? null;
}

/**
 * Get every author for the /authors index page.
 */
export function getAllAuthors(): Author[] {
  return [...AUTHORS];
}

/**
 * Default author slug when an article doesn't specify one. Used by
 * RESEARCH_ARTICLES and BLOG_POSTS so we can opt every existing
 * article into a real human byline immediately without per-article
 * manual edits.
 */
export const DEFAULT_AUTHOR_SLUG = "eli-marsden";

/**
 * Get the default editorial author. Convenience wrapper that always
 * returns a non-null Author — used by templates that need a fallback
 * when no per-article author is specified.
 */
export function getDefaultAuthor(): Author {
  const author = getAuthorBySlug(DEFAULT_AUTHOR_SLUG);
  if (!author) {
    throw new Error(
      `DEFAULT_AUTHOR_SLUG "${DEFAULT_AUTHOR_SLUG}" does not exist in AUTHORS registry`,
    );
  }
  return author;
}
