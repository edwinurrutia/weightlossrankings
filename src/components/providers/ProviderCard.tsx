import type { Provider } from "@/lib/types";
import CTAButton from "@/components/shared/CTAButton";
import ScoreBadge from "./ScoreBadge";
import FeatureBadge from "./FeatureBadge";
import StarRating from "./StarRating";
import PricingDisplay from "./PricingDisplay";

interface ProviderCardProps {
  provider: Provider;
  selectedDose?: string;
}

export default function ProviderCard({
  provider,
  selectedDose,
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
  } = provider;

  const visibleFeatures = features.slice(0, 4);
  const hasFdaWarning = fda_warnings && fda_warnings.length > 0;

  const trustpilot = external_reviews?.trustpilot_score;
  const trustpilotCount = external_reviews?.trustpilot_count;

  return (
    <div
      className={`relative bg-white rounded-2xl border p-5 flex flex-col gap-4 shadow-sm transition-shadow hover:shadow-md ${
        is_featured
          ? "border-brand-violet/40"
          : "border-brand-violet/10"
      }`}
    >
      {is_featured && (
        <span className="absolute top-4 right-4 rounded-full bg-brand-gradient text-white text-xs font-semibold px-2.5 py-0.5">
          Sponsored
        </span>
      )}

      {/* Header: name + score badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="text-lg font-bold text-brand-text-primary leading-tight truncate pr-2">
            {name}
          </h3>
          {best_for && (
            <p className="text-xs text-brand-text-secondary">
              Best for: {best_for}
            </p>
          )}
        </div>
        <ScoreBadge scores={scores} size="md" />
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
      <CTAButton href={affiliate_url} external size="md" className="w-full mt-auto">
        Get Started
      </CTAButton>
    </div>
  );
}
