import Link from "next/link";

type CTAButtonSize = "sm" | "md" | "lg";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  size?: CTAButtonSize;
  className?: string;
}

const sizeClasses: Record<CTAButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function CTAButton({
  href,
  children,
  external = false,
  size = "md",
  className = "",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full bg-brand-gradient text-white font-semibold shadow-lg hover:shadow-xl hover:brightness-110 transition-all tap-target";
  const classes = `${base} ${sizeClasses[size]} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
