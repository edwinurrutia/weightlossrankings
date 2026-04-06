import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: "w-7 h-7", text: "text-sm", arrow: "12" },
    md: { icon: "w-9 h-9", text: "text-lg", arrow: "14" },
    lg: { icon: "w-12 h-12", text: "text-2xl", arrow: "18" },
  };

  const s = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div
        className={`${s.icon} rounded-xl bg-brand-gradient flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow relative overflow-hidden`}
      >
        {/* Downward arrow representing weight loss / trending down */}
        <svg
          width={s.arrow}
          height={s.arrow}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 4L12 16L20 4"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 10L12 22L20 10"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </svg>
      </div>
      {showText && (
        <span
          className={`font-heading font-bold text-brand-text-primary ${s.text} tracking-tight`}
        >
          Weight
          <span className="text-gradient">Loss</span>
          Rankings
        </span>
      )}
    </Link>
  );
}
