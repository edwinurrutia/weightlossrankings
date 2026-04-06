import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

/**
 * Editorial masthead logo (variation 10B).
 *
 * Wordmark: "WEIGHT LOSS" in deep indigo primary ink, a thin vertical violet
 * bar separator, "RANKINGS" in brand violet. All-caps, tightly tracked,
 * set in the site's heading face — newsroom masthead vibe.
 *
 * When `showText={false}`, renders a compact 32px favicon-like mark:
 * a deep indigo rounded square with a violet accent bar on the left
 * and a white "W" letterform — recognizable at small sizes.
 */
export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: {
      text: "text-xs sm:text-sm",
      bar: "h-4 w-[1.5px]",
      gap: "gap-2",
      mark: "w-6 h-6",
      markText: "text-[10px]",
      markAccent: "w-[2px]",
    },
    md: {
      text: "text-sm sm:text-base",
      bar: "h-5 w-[1.5px]",
      gap: "gap-2.5",
      mark: "w-8 h-8",
      markText: "text-xs",
      markAccent: "w-[2.5px]",
    },
    lg: {
      text: "text-base sm:text-lg",
      bar: "h-6 w-[2px]",
      gap: "gap-3",
      mark: "w-10 h-10",
      markText: "text-sm",
      markAccent: "w-[3px]",
    },
  };

  const s = sizes[size];

  return (
    <Link
      href="/"
      className="inline-flex items-center group"
      aria-label="WeightLossRankings home"
    >
      {showText ? (
        <span
          className={`font-heading font-black tracking-[0.04em] uppercase flex items-center ${s.gap} ${s.text} leading-none whitespace-nowrap`}
        >
          <span style={{ color: "#1e1b4b" }}>Weight Loss</span>
          <span
            className={`inline-block ${s.bar}`}
            style={{ background: "#8b5cf6" }}
            aria-hidden="true"
          />
          <span style={{ color: "#8b5cf6" }}>Rankings</span>
        </span>
      ) : (
        <span
          className={`${s.mark} relative inline-flex items-center justify-center rounded-md overflow-hidden`}
          style={{ background: "#1e1b4b" }}
          aria-hidden="true"
        >
          <span
            className={`absolute left-0 top-[15%] bottom-[15%] ${s.markAccent}`}
            style={{ background: "#8b5cf6" }}
          />
          <span
            className={`font-heading font-black text-white tracking-tight ${s.markText} leading-none`}
          >
            W
          </span>
        </span>
      )}
    </Link>
  );
}
