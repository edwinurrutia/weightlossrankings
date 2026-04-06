import type { ReactNode } from "react";
import TrustBadgesRow from "./TrustBadgesRow";

interface PageHeroProps {
  badges?: Array<{ icon: string; text: string }>;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  size?: "default" | "large";
}

export default function PageHero({
  badges,
  title,
  subtitle,
  children,
  align = "left",
  size = "default",
}: PageHeroProps) {
  const alignClasses =
    align === "center" ? "text-center items-center" : "text-left items-start";
  const titleClasses =
    size === "large"
      ? "font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-text-primary leading-[1.05] tracking-tight"
      : "font-heading text-3xl sm:text-4xl font-extrabold text-brand-text-primary leading-tight tracking-tight";
  const subtitleClasses =
    size === "large"
      ? "text-xl sm:text-2xl text-brand-text-secondary leading-relaxed mt-6 max-w-2xl"
      : "text-brand-text-secondary text-lg leading-relaxed";

  return (
    <section className={`flex flex-col gap-3 ${alignClasses}`}>
      {badges && badges.length > 0 && <TrustBadgesRow badges={badges} />}
      <h1 className={titleClasses}>{title}</h1>
      {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
      {children}
    </section>
  );
}
