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

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold bg-brand-gradient bg-clip-text text-transparent">
          ${displayPrice}
        </span>
        <span className="text-sm text-brand-text-secondary">/mo</span>
      </div>
      {cheapest.promo_price && cheapest.promo_code && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-brand-text-secondary line-through">
            ${cheapest.monthly_cost}
          </span>
          <span className="text-xs font-medium text-brand-success bg-brand-success/10 rounded-full px-2 py-0.5">
            Code: {cheapest.promo_code}
          </span>
        </div>
      )}
    </div>
  );
}
