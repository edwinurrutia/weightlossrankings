import Link from "next/link";
import type { FdaWarningLetter } from "@/lib/fda-warning-letters";

interface FdaWarningFlagProps {
  letter: FdaWarningLetter;
  /** Optional override for the display name (defaults to company_dba ?? company_name). */
  providerName?: string;
  className?: string;
}

const formatDate = (iso: string): string => {
  // Render as "February 20, 2026" — use UTC parsing to avoid TZ drift
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

/**
 * FdaWarningFlag — review-page alert.
 *
 * Surfaces on /reviews/[provider] when a provider has a matched FDA
 * warning letter in our dataset. Editorially measured: states the fact
 * (FDA issued a letter on date X), links to our per-letter detail page,
 * and includes the disclaimer language.
 */
export default function FdaWarningFlag({
  letter,
  providerName,
  className = "",
}: FdaWarningFlagProps) {
  const displayName =
    providerName ?? letter.company_dba ?? letter.company_name;
  return (
    <aside
      role="alert"
      aria-label="FDA warning letter notice"
      className={`rounded-2xl border-2 border-amber-400 bg-amber-50 p-5 md:p-6 ${className}`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-400 text-white font-bold text-base"
        >
          !
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-amber-800 mb-1">
            FDA Warning Letter
          </p>
          <p className="font-heading text-base md:text-lg font-bold text-brand-text-primary leading-snug">
            {displayName} received an FDA warning letter dated{" "}
            {formatDate(letter.letter_date)} regarding {letter.subject.toLowerCase()}.
          </p>
          <p className="mt-2 text-sm text-brand-text-secondary leading-relaxed">
            FDA warning letters are public regulatory communications and do not,
            on their own, constitute a finding of illegal activity. Companies
            often respond with corrective action.{" "}
            <Link
              href={`/fda-warning-letters/${letter.id}`}
              className="font-semibold text-amber-900 underline hover:text-amber-700"
            >
              View the full letter →
            </Link>
          </p>
        </div>
      </div>
    </aside>
  );
}
