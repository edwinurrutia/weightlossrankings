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

/**
 * Editorial CTA callout.
 *
 * Note: Despite the legacy name, this callout no longer uses the full
 * brand gradient as a section background. Instead it's a clean off-white
 * card with a left accent bar in brand violet, and the gradient is
 * reserved for the primary CTA button inside.
 */
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
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <section
      className={`relative rounded-2xl bg-brand-bg-purple border border-brand-violet/15 p-8 sm:p-10 flex flex-col gap-4 ${alignClass} overflow-hidden`}
    >
      {/* Left accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1.5 bg-brand-violet"
      />
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary tracking-tight">
        {heading}
      </h2>
      {description && (
        <p className="text-brand-text-secondary max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-2">
        <CTAButton
          href={ctaHref}
          external={external}
          variant="primary"
          size="lg"
          trackProvider={trackProvider}
          trackSource={trackSource}
        >
          {ctaText}
        </CTAButton>
      </div>
    </section>
  );
}
