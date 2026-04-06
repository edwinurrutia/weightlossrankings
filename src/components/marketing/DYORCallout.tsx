import Link from "next/link";

interface DYORCalloutProps {
  variant?: "default" | "compact" | "inline";
  providerName?: string;
  className?: string;
}

/**
 * DYORCallout — "Do your own research" trust/notice.
 *
 * Quiet editorial note (not a warning banner) that reminds readers to
 * verify pricing, state availability, and clinical claims directly with
 * the provider and their doctor. Links to /nature-of-reviews.
 */
export default function DYORCallout({
  variant = "default",
  providerName,
  className = "",
}: DYORCalloutProps) {
  if (variant === "inline") {
    return (
      <p className={`text-xs text-brand-text-secondary ${className}`}>
        Always verify on{" "}
        {providerName ? `${providerName}'s site` : "the provider's site"} ·{" "}
        <Link
          href="/nature-of-reviews"
          className="underline hover:text-brand-violet"
        >
          How our reviews work
        </Link>
      </p>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={`border-l-2 border-brand-violet/40 pl-4 py-1 text-sm text-brand-text-secondary flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}
      >
        <span>
          Always verify pricing and state availability on the provider&apos;s
          website before signing up.
        </span>
        <Link
          href="/nature-of-reviews"
          className="underline font-medium hover:text-brand-violet whitespace-nowrap"
        >
          How our reviews work →
        </Link>
      </div>
    );
  }

  // default
  return (
    <aside
      className={`border-l-2 border-brand-violet/40 pl-5 py-2 text-brand-text-secondary ${className}`}
      aria-label="Editor's note"
    >
      <p className="text-xs uppercase tracking-[0.15em] font-semibold text-brand-violet mb-2">
        Editor&apos;s Note
      </p>
      <p className="text-sm leading-relaxed">
        Prices, state availability, and features change frequently. Verify
        directly on{" "}
        {providerName ? (
          <strong className="text-brand-text-primary">{providerName}</strong>
        ) : (
          "the provider"
        )}
        &apos;s website before signing up, and talk to your doctor before
        starting or changing any medication.{" "}
        <Link
          href="/nature-of-reviews"
          className="font-medium underline hover:text-brand-violet"
        >
          How our reviews work →
        </Link>
      </p>
    </aside>
  );
}
