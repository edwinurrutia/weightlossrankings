import type { Pricing } from "@/lib/types";

interface PricingDisplayProps {
  pricing: Pricing[];
  selectedDose?: string;
}

export default function PricingDisplay({
  pricing,
  selectedDose,
}: PricingDisplayProps) {
  if (!pricing || pricing.length === 0) return null;

  const candidates = selectedDose
    ? pricing.filter((p) => p.dose === selectedDose)
    : pricing;

  const cheapest =
    candidates.length > 0
      ? candidates.reduce((min, p) => {
          const effectivePrice = p.promo_price ?? p.monthly_cost;
          const minEffective = min.promo_price ?? min.monthly_cost;
          return effectivePrice < minEffective ? p : min;
        }, candidates[0])
      : pricing.reduce((min, p) => {
          const effectivePrice = p.promo_price ?? p.monthly_cost;
          const minEffective = min.promo_price ?? min.monthly_cost;
          return effectivePrice < minEffective ? p : min;
        }, pricing[0]);

  const displayPrice = cheapest.promo_price ?? cheapest.monthly_cost;

  // Promo codes intentionally hidden site-wide. The data still flows
  // through (so promo_price keeps powering the displayPrice number used
  // for ranking and the cheapest-by lists), but we no longer surface the
  // strikethrough list price or the "Code: X" chip on cards. Easier to
  // re-enable later by uncommenting the strikethrough block below.
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold bg-brand-gradient bg-clip-text text-transparent">
          ${displayPrice}
        </span>
        <span className="text-sm text-brand-text-secondary">/mo</span>
      </div>
    </div>
  );
}
