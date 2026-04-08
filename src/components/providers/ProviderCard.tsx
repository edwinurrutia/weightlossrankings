import type { Provider } from "@/lib/types";
import { computeOverallScore } from "@/lib/scoring";
import CTAButton from "@/components/shared/CTAButton";
import FeatureBadge from "./FeatureBadge";
import StarRating from "./StarRating";
import PricingDisplay from "./PricingDisplay";

// Controlled-vocabulary trust badges that are allowed to render on the
// card. Anything outside this whitelist is treated as free-text marketing
// copy and suppressed from card display — those belong on the review page.
const CARD_TRUST_BADGE_WHITELIST = new Set<string>([
  "LegitScript Verified",
  "PCAB Accredited",
  "Board-Certified Clinicians",
]);

/**
 * Derive the card pills deterministically from structured pricing data
 * rather than the free-text features array. This keeps every card visually
 * uniform: at most 2 drug pills + 1 form pill + 1 optional trust badge.
 */
function deriveCardBadges(provider: Provider): {
  drugs: string[];
  form: string | null;
  trust: string | null;
} {
  const drugs = new Set<string>();
  const forms = new Set<string>();

  for (const p of provider.pricing ?? []) {
    if (p.drug) {
      // Capitalize first letter for display.
      drugs.add(p.drug.charAt(0).toUpperCase() + p.drug.slice(1));
    }
    if (p.form) {
      // "compounded" / "brand" → "Compounded" / "Brand"
      forms.add(p.form.charAt(0).toUpperCase() + p.form.slice(1));
    }
  }

  // Single form pill: prefer the dominant form. If a provider sells both
  // compounded and brand, show "Compounded" (the differentiator).
  let formLabel: string | null = null;
  if (forms.has("Compounded")) formLabel = "Compounded";
  else if (forms.has("Brand")) formLabel = "Brand";

  // First whitelisted trust badge from the features array, if any.
  let trustLabel: string | null = null;
  for (const f of provider.features ?? []) {
    if (CARD_TRUST_BADGE_WHITELIST.has(f)) {
      trustLabel = f;
      break;
    }
  }

  return {
    drugs: Array.from(drugs),
    form: formLabel,
    trust: trustLabel,
  };
}

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
    pricing,
    fda_warnings,
    affiliate_url,
    is_featured,
    slug,
  } = provider;

  const { drugs, form, trust } = deriveCardBadges(provider);
  const hasFdaWarning = fda_warnings && fda_warnings.length > 0;
  const hasAnyBadges =
    drugs.length > 0 || form !== null || trust !== null || hasFdaWarning;

  const overall = computeOverallScore(scores);
  const fiveStar = Math.round((overall / 2) * 10) / 10;

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

      {/* Editorial star rating (our own methodology, not third-party) */}
      <StarRating score={fiveStar} />
      <p className="text-[11px] text-brand-text-secondary -mt-2">
        Editorial score · <a href="/methodology" className="underline hover:text-brand-violet">methodology</a>
      </p>

      {/* Pricing */}
      <PricingDisplay pricing={pricing} selectedDose={selectedDose} />

      {/* Structured badges (uniform across every card):
          drug pills → form pill → optional trust badge → optional FDA warning.
          Free-text marketing bullets are suppressed here and render on the
          full review page instead. */}
      {hasAnyBadges && (
        <div className="flex flex-wrap gap-1.5">
          {form && (
            <FeatureBadge key={`form-${form}`} label={form} variant="default" />
          )}
          {drugs.map((drug) => (
            <FeatureBadge key={`drug-${drug}`} label={drug} variant="default" />
          ))}
          {trust && (
            <FeatureBadge key={`trust-${trust}`} label={trust} variant="highlight" />
          )}
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
