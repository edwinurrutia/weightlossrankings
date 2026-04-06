import type { Provider } from "@/lib/types";
import { computeOverallScore } from "@/lib/scoring";
import CTAButton from "@/components/shared/CTAButton";
import FeatureBadge from "./FeatureBadge";
import StarRating from "./StarRating";
import PricingDisplay from "./PricingDisplay";

interface ProviderCardProps {
  provider: Provider;
  selectedDose?: string;
  trackingSource?: string;
  /** 1-indexed position in the surrounding list. Used for click attribution. */
  position?: number;
}

export default function ProviderCard({
  provider,
  selectedDose,
  trackingSource = "unknown",
  position,
}: ProviderCardProps) {
  const {
    name,
    scores,
    best_for,
    external_reviews,
    pricing,
    features,
    fda_warnings,
    affiliate_url,
    is_featured,
    slug,
  } = provider;

  const visibleFeatures = features.slice(0, 4);
  const hasFdaWarning = fda_warnings && fda_warnings.length > 0;

  const trustpilot = external_reviews?.trustpilot_score;
  const trustpilotCount = external_reviews?.trustpilot_count;
  const overall = computeOverallScore(scores);

  return (
    <div
      className={`relative bg-white rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        is_featured
          ? "border-gray-200 border-l-4 border-l-brand-violet"
          : "border-gray-200 hover:border-brand-violet/40"
      }`}
    >
      {/* Header: score + name */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-brand-violet tabular-nums leading-none tracking-tight">
              {overall.toFixed(1)}
            </span>
            <span className="text-xs font-medium text-brand-text-secondary uppercase tracking-wider">
              / 10
            </span>
          </div>
          <h3 className="text-xl font-bold text-brand-text-primary leading-tight truncate pr-2">
            {name}
          </h3>
          {best_for && (
            <p className="text-xs text-brand-text-secondary">
              Best for: {best_for}
            </p>
          )}
        </div>
      </div>

      {/* Star rating */}
      {trustpilot !== undefined && (
        <StarRating score={trustpilot} count={trustpilotCount} />
      )}

      {/* Pricing */}
      <PricingDisplay pricing={pricing} selectedDose={selectedDose} />

      {/* Feature badges */}
      {(visibleFeatures.length > 0 || hasFdaWarning) && (
        <div className="flex flex-wrap gap-1.5">
          {visibleFeatures.map((feature) => (
            <FeatureBadge key={feature} label={feature} variant="default" />
          ))}
          {hasFdaWarning && (
            <FeatureBadge label="FDA Warning" variant="warning" />
          )}
        </div>
      )}

      {/* CTA */}
      <CTAButton
        href={affiliate_url}
        external
        size="md"
        className="w-full mt-auto"
        trackProvider={slug}
        trackSource={trackingSource}
        trackPosition={position}
      >
        Get Started
      </CTAButton>
    </div>
  );
}
