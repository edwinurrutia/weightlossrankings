import Link from "next/link";

interface DYORCalloutProps {
  variant?: "default" | "compact" | "inline";
  providerName?: string;
  className?: string;
}

/**
 * DYORCallout — "Do your own research" trust/notice banner.
 *
 * Visually distinct amber notice that reminds readers to verify
 * pricing, state availability, and clinical claims directly with
 * the provider and their doctor before acting on site content.
 * Links to /nature-of-reviews for the full explanation of how
 * reviews and rankings work.
 */
export default function DYORCallout({
  variant = "default",
  providerName,
  className = "",
}: DYORCalloutProps) {
  if (variant === "inline") {
    return (
      <p className={`text-xs text-amber-900/80 ${className}`}>
        <span aria-hidden="true">⚠️</span> Always verify on{" "}
        {providerName ? `${providerName}'s site` : "the provider's site"} ·{" "}
        <Link
          href="/nature-of-reviews"
          className="underline hover:text-amber-900"
        >
          How our reviews work
        </Link>
      </p>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={`rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900 flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}
      >
        <span aria-hidden="true">⚠️</span>
        <span>
          Always verify pricing and state availability on the provider&apos;s
          website before signing up.
        </span>
        <Link
          href="/nature-of-reviews"
          className="underline font-medium hover:text-amber-950 whitespace-nowrap"
        >
          Read how our reviews work →
        </Link>
      </div>
    );
  }

  // default
  return (
    <aside
      className={`rounded-2xl bg-amber-50 border border-amber-200 p-5 md:p-6 text-amber-900 ${className}`}
      aria-label="Do your own research notice"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl leading-none" aria-hidden="true">
          ⚠️
        </span>
        <div className="flex flex-col gap-2 text-sm leading-relaxed">
          <p className="font-semibold text-amber-950 text-base">
            Always do your own research
          </p>
          <p>
            Prices, state availability, and features change frequently. Verify
            directly on{" "}
            {providerName ? (
              <strong className="text-amber-950">{providerName}</strong>
            ) : (
              "the provider"
            )}
            &apos;s website before signing up. Talk to your doctor before
            starting or changing any medication.
          </p>
          <Link
            href="/nature-of-reviews"
            className="font-medium underline hover:text-amber-950 self-start"
          >
            Read how our reviews work →
          </Link>
        </div>
      </div>
    </aside>
  );
}
