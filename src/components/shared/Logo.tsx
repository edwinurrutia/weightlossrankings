import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: "w-9 h-9", line1: "text-[11px]", line2: "text-sm" },
    md: { icon: "w-11 h-11", line1: "text-xs", line2: "text-base" },
    lg: { icon: "w-14 h-14", line1: "text-sm", line2: "text-xl" },
  };

  const s = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div
        className={`${s.icon} rounded-xl bg-brand-gradient flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
      >
        {/* Number 1 ribbon / ranking badge */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[65%] h-[65%]"
        >
          {/* Trophy / medal circle */}
          <circle
            cx="16"
            cy="14"
            r="9"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Number 1 inside */}
          <path
            d="M14.5 10.5L16.5 9.5V18.5M14 18.5H19"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Ribbons */}
          <path
            d="M10 21L7 29L11.5 27L13 30"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M22 21L25 29L20.5 27L19 30"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-heading font-bold text-brand-text-primary ${s.line2} tracking-tight`}
          >
            Weight Loss
          </span>
          <span
            className={`font-heading font-bold text-gradient ${s.line2} tracking-tight`}
          >
            Rankings
          </span>
        </div>
      )}
    </Link>
  );
}
