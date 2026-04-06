import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

/**
 * Editorial wordmark-led logo.
 *
 * Mark: a simple ascending-bars motif inside a rounded square,
 * rendered in a solid brand violet (no gradient) — conveys ranking
 * data without resorting to a cartoon medal.
 *
 * Wordmark: "WeightLoss" in primary ink + "Rankings" in brand violet,
 * set in the site's heading face. Tightly kerned and flat.
 */
export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { mark: "w-7 h-7", text: "text-base" },
    md: { mark: "w-9 h-9", text: "text-lg" },
    lg: { mark: "w-11 h-11", text: "text-2xl" },
  };

  const s = sizes[size];

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 group"
      aria-label="WeightLossRankings home"
    >
      <span
        className={`${s.mark} inline-flex items-center justify-center rounded-lg bg-brand-violet text-white transition-colors group-hover:bg-brand-text-primary`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[70%] h-[70%]"
        >
          {/* Ascending bars — editorial chart motif */}
          <rect x="4" y="14" width="3.2" height="6" rx="0.6" fill="currentColor" />
          <rect x="10.4" y="10" width="3.2" height="10" rx="0.6" fill="currentColor" />
          <rect x="16.8" y="5" width="3.2" height="15" rx="0.6" fill="currentColor" />
        </svg>
      </span>
      {showText && (
        <span
          className={`font-heading font-bold tracking-tight ${s.text} leading-none whitespace-nowrap`}
        >
          <span className="text-brand-text-primary">WeightLoss</span>
          <span className="text-brand-violet">Rankings</span>
        </span>
      )}
    </Link>
  );
}
