import Link from "next/link";

type Confidence = "high" | "medium" | "low";

interface Props {
  confidence?: Confidence | string;
  lastVerified?: string;
  verifiedBy?: string;
}

/**
 * Transparent data-confidence disclosure — a single-line note telling
 * users (a) which confidence tier this provider's data is at, (b) when
 * we last verified it, and (c) where to read the full methodology.
 *
 * Previous version rendered a large purple box with the entire
 * `verification.notes` string dumped inline. That was wrong on two
 * counts:
 *
 *   1. `verification.notes` is INTERNAL-only editorial documentation
 *      — it contains operational details like Katalys program IDs,
 *      affiliate URL swap instructions, "promoted to hero on DATE to
 *      test CTR", and other stuff that should never be user-facing.
 *      Rendering it publicly was a data-leak bug.
 *   2. The verbose canned "summary" copy + notes paragraph + heavy
 *      purple styling was visually dominating the review page over
 *      the actual editorial content.
 *
 * This version keeps the disclosure signal (confidence tier + last
 * verified date + link to methodology) but renders it as a subtle
 * inline line — matching the AffiliateDisclosure pattern on /compare
 * rather than a standalone callout box.
 */
export default function DataConfidenceBadge({
  confidence,
  lastVerified,
  verifiedBy,
}: Props) {
  if (!confidence && !lastVerified) return null;

  const level: Confidence =
    confidence === "high" || confidence === "medium" || confidence === "low"
      ? confidence
      : "low";

  const label =
    level === "high"
      ? "High confidence"
      : level === "medium"
        ? "Medium confidence"
        : "Low confidence";

  return (
    <p
      className="not-prose text-xs text-brand-text-secondary/80 leading-relaxed"
      aria-label="Data confidence disclosure"
    >
      <span className="font-semibold text-brand-text-secondary">{label}</span>
      {lastVerified ? (
        <>
          {" · "}Last verified {lastVerified}
          {verifiedBy ? ` via ${verifiedBy}` : ""}
        </>
      ) : null}
      {" · "}
      <Link
        href="/nature-of-reviews"
        className="text-brand-violet underline underline-offset-2 hover:text-brand-blue"
      >
        How we verify provider data
      </Link>
    </p>
  );
}
