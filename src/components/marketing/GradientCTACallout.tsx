import CTAButton from "@/components/shared/CTAButton";

interface GradientCTACalloutProps {
  heading: string;
  description?: string;
  ctaHref: string;
  ctaText: string;
  external?: boolean;
  trackProvider?: string;
  trackSource?: string;
  align?: "left" | "center";
}

export default function GradientCTACallout({
  heading,
  description,
  ctaHref,
  ctaText,
  external,
  trackProvider,
  trackSource,
  align = "center",
}: GradientCTACalloutProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  return (
    <section
      className={`rounded-2xl bg-brand-gradient p-6 sm:p-8 text-white ${alignClass}`}
    >
      <h2 className="font-heading text-2xl font-bold mb-2">{heading}</h2>
      {description && <p className="text-white/85 mb-5">{description}</p>}
      <CTAButton
        href={ctaHref}
        external={external}
        variant="white"
        size="lg"
        trackProvider={trackProvider}
        trackSource={trackSource}
      >
        {ctaText}
      </CTAButton>
    </section>
  );
}
