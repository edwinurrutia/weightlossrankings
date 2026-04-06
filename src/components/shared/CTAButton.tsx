import Link from "next/link";

type CTAButtonSize = "sm" | "md" | "lg";
type CTAButtonVariant = "primary" | "outline" | "white";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  size?: CTAButtonSize;
  variant?: CTAButtonVariant;
  className?: string;
}

const sizeClasses: Record<CTAButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses: Record<CTAButtonVariant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-lg hover:shadow-xl hover:brightness-110",
  outline:
    "bg-white text-brand-violet border-2 border-brand-violet hover:bg-brand-violet hover:text-white",
  white:
    "bg-white text-brand-violet shadow-lg hover:shadow-xl hover:bg-white/90",
};

export default function CTAButton({
  href,
  children,
  external = false,
  size = "md",
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all tap-target";
  const classes =
    `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

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
