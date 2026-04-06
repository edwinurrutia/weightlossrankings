import type { CalcState } from "./StepWizard";
import type { Provider } from "@/lib/types";
import ProviderCard from "@/components/providers/ProviderCard";

interface SavingsResultsProps {
  state: CalcState;
  providers: Provider[];
}

const BRAND_PRICES: Record<string, number> = {
  wegovy: 1349,
  ozempic: 935,
  mounjaro: 1023,
  zepbound: 1059,
};

function getBaselineCost(state: CalcState): number {
  if (state.currentCost !== null) return state.currentCost;
  const key = state.medication.toLowerCase();
  return BRAND_PRICES[key] ?? 1023;
}

function getCheapestCompounded(provider: Provider): number | null {
  const compounded = provider.pricing.filter((p) => p.form === "compounded");
  if (compounded.length === 0) return null;
  const prices = compounded.map((p) => p.promo_price ?? p.monthly_cost);
  return Math.min(...prices);
}

export default function SavingsResults({ state, providers }: SavingsResultsProps) {
  const baseline = getBaselineCost(state);

  const providersWithSavings = providers
    .map((provider) => {
      const cheapest = getCheapestCompounded(provider);
      const savings = cheapest !== null ? baseline - cheapest : null;
      return { provider, cheapest, savings };
    })
    .filter((p) => p.savings !== null && p.savings > 0)
    .sort((a, b) => (b.savings ?? 0) - (a.savings ?? 0));

  const topSavings = providersWithSavings[0]?.savings ?? 0;
  const annualSavings = topSavings * 12;

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-lg text-brand-text-secondary font-medium mb-1">
          You could save up to
        </p>
        <p className="text-5xl font-bold text-gradient">
          ${topSavings.toLocaleString()}/mo
        </p>
        {annualSavings > 0 && (
          <p className="text-brand-text-secondary mt-2 text-sm">
            That&apos;s{" "}
            <span className="font-semibold text-brand-violet">
              ${annualSavings.toLocaleString()}
            </span>{" "}
            in annual savings
          </p>
        )}
      </div>

      {providersWithSavings.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-brand-text-primary">
            Top providers for you
          </h3>
          {providersWithSavings.map(({ provider }, idx) => (
            <ProviderCard
              key={provider._id}
              provider={provider}
              selectedDose={state.dose}
              trackingSource="savings_results"
              position={idx + 1}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-brand-text-secondary text-sm py-6">
          No compounded providers found matching your criteria.
        </div>
      )}
    </div>
  );
}
