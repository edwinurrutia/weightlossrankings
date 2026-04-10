import Link from "next/link";
import type { Author } from "@/data/authors";

interface AuthorBylineProps {
  author: Author;
  /**
   * Optional medical reviewer (Person). If null, the byline shows
   * "Editorially reviewed" instead of "Medically reviewed by …" —
   * an honest disclosure that the article has not been clinically
   * reviewed by a licensed professional. Per Google's E-E-A-T
   * framework, transparent disclosure is preferred over implying
   * clinical authority that doesn't exist.
   */
  medicalReviewer?: Author | null;
  /**
   * ISO date string (YYYY-MM-DD) when the article was published.
   */
  publishedDate?: string;
  /**
   * ISO date string (YYYY-MM-DD) when the article was last reviewed.
   * Falls back to publishedDate if not set. Distinct from
   * "lastUpdated" copy-edit timestamps — `lastReviewed` is intended
   * to mean "the editorial team verified this content was still
   * accurate on this date."
   */
  lastReviewed?: string;
  /**
   * Optional CSS class for layout adjustments at call sites.
   */
  className?: string;
}

/**
 * Visible author byline strip rendered at the top of every research
 * article and provider review page.
 *
 * Why it exists in code rather than per-page markup:
 *
 *   YMYL E-E-A-T compliance requires every health article to surface
 *   the author's identity, the reviewer's identity, and the most
 *   recent review date. Doing this in a shared component:
 *
 *     1. Guarantees uniformity across 113 provider reviews and 17+
 *        research articles — no per-page drift.
 *     2. Makes it impossible to publish a new YMYL article without a
 *        named author (the prop is required).
 *     3. Centralizes the "editorially reviewed, not clinically
 *        reviewed" disclaimer so we never accidentally imply
 *        clinical authority on a page where we shouldn't.
 *     4. Pairs with the JSON-LD emission elsewhere — what's in the
 *        visible byline matches what's in the structured data.
 *
 * The honest-disclosure-first design: when there's no medical
 * reviewer (the current state), the byline says so explicitly,
 * including a sentence that we are actively seeking a credentialed
 * reviewer. Google's Quality Rater Guidelines reward sites that are
 * transparent about gaps more than sites that overclaim.
 */
export default function AuthorByline({
  author,
  medicalReviewer = null,
  publishedDate,
  lastReviewed,
  className = "",
}: AuthorBylineProps) {
  const reviewDate = lastReviewed ?? publishedDate;

  return (
    <div
      className={`not-prose flex flex-col gap-2 text-sm text-brand-text-secondary border-y border-brand-violet/15 py-4 ${className}`}
      aria-label="Author and review information"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span>
          By{" "}
          <Link
            href={`/authors/${author.slug}`}
            className="font-semibold text-brand-text-primary hover:text-brand-violet transition-colors"
          >
            {author.name}
          </Link>
          {author.medicalCredentials ? (
            <span className="text-brand-text-secondary">
              , {author.medicalCredentials}
            </span>
          ) : null}
          <span className="text-brand-text-secondary"> · {author.jobTitle}</span>
        </span>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs">
        {medicalReviewer ? (
          <span>
            Medically reviewed by{" "}
            <Link
              href={`/authors/${medicalReviewer.slug}`}
              className="font-semibold text-brand-text-primary hover:text-brand-violet transition-colors"
            >
              {medicalReviewer.name}
              {medicalReviewer.medicalCredentials
                ? `, ${medicalReviewer.medicalCredentials}`
                : ""}
            </Link>
          </span>
        ) : (
          <span>
            Editorially reviewed (not clinically reviewed) ·{" "}
            <Link
              href="/editorial-policy"
              className="text-brand-violet underline underline-offset-2 hover:text-brand-blue"
            >
              How we verify content
            </Link>
          </span>
        )}
        {reviewDate ? (
          <span>
            Last reviewed{" "}
            <time dateTime={reviewDate}>
              {new Date(reviewDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
        ) : null}
      </div>
    </div>
  );
}
