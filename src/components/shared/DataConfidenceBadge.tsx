import Link from "next/link";

type Confidence = "high" | "medium" | "low";

interface Props {
  confidence?: Confidence | string;
  lastVerified?: string;
  verifiedBy?: string;
  notes?: string;
}

/**
 * Transparent data-confidence disclaimer. Shows users exactly how
 * recently we verified this provider's data, what method we used,
 * and when the state list / drug offering could not be independently
 * confirmed from publicly available sources.
 *
 * This is deliberately visible on every review page so users know
 * which fields to trust and which to re-confirm with the provider
 * directly.
 */
export default function DataConfidenceBadge({
  confidence,
  lastVerified,
  verifiedBy,
  notes,
}: Props) {
  if (!confidence && !lastVerified && !notes) return null;

  const level: Confidence =
    confidence === "high" || confidence === "medium" || confidence === "low"
      ? confidence
      : "low";

  const copy = {
    high: {
      label: "High confidence",
      summary:
        "Live-verified from the provider's own site: GLP-1 service confirmed and state availability independently checked.",
    },
    medium: {
      label: "Medium confidence",
      summary:
        "GLP-1 service confirmed on the provider's own site, but the full state availability list is not publicly disclosed — confirm directly with the provider before signing up.",
    },
    low: {
      label: "Low confidence",
      summary:
        "We have not been able to independently verify this provider's current GLP-1 offering or state availability. Confirm directly with the provider before signing up.",
    },
  }[level];

  return (
    <aside
      className="not-prose rounded-xl border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary"
      aria-label="Data confidence disclosure"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
        <span className="inline-flex items-center rounded-full border border-brand-violet/30 bg-white px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-brand-violet">
          {copy.label}
        </span>
        {lastVerified && (
          <span className="text-xs text-brand-text-secondary">
            Last verified {lastVerified}
            {verifiedBy ? ` · ${verifiedBy}` : ""}
          </span>
        )}
      </div>
      <p className="leading-relaxed">
        {copy.summary}
      </p>
      {notes && (
        <p className="mt-2 text-xs leading-relaxed text-brand-text-secondary/90">
          <span className="font-semibold">Verification notes:</span> {notes}
        </p>
      )}
      <p className="mt-2 text-xs">
        <Link
          href="/nature-of-reviews"
          className="text-brand-violet underline underline-offset-2 hover:text-brand-blue"
        >
          How we verify provider data →
        </Link>
      </p>
    </aside>
  );
}
