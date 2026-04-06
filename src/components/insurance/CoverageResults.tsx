import type { InsuranceState } from "./InsuranceWizard";
import type { Provider } from "@/lib/types";
import ProviderCard from "@/components/providers/ProviderCard";

interface CoverageResultsProps {
  state: InsuranceState;
  providers: Provider[];
}

const BRAND_MEDS = [
  "Wegovy (Semaglutide)",
  "Ozempic (Semaglutide)",
  "Mounjaro (Tirzepatide)",
  "Zepbound (Tirzepatide)",
];

function getCoverageMessage(insurance: string, medication: string): {
  headline: string;
  detail: string;
  icon: string;
} {
  const isGovInsurance = insurance === "Medicare" || insurance === "Medicaid";
  const isBrandMed = BRAND_MEDS.includes(medication);

  if (isGovInsurance && isBrandMed) {
    return {
      icon: "⚠️",
      headline: "Limited coverage",
      detail:
        "Typically requires a diabetes diagnosis. Prior authorization required. Weight loss alone is usually not a covered indication under Medicare or Medicaid.",
    };
  }

  if (insurance === "Other / No Insurance") {
    return {
      icon: "❌",
      headline: "No insurance coverage",
      detail:
        "Without insurance, brand-name GLP-1 medications cost $900–$1,349/month. Here are the most affordable compounded alternatives.",
    };
  }

  return {
    icon: "✅",
    headline: "Likely covered with prior authorization",
    detail:
      "Most major insurers cover GLP-1 medications with prior authorization and proof of medical necessity. Estimated copay: $25–$50/month with insurance, $349+/month without.",
  };
}

function getTopCompounded(providers: Provider[]): Provider[] {
  return [...providers]
    .sort((a, b) => (b.scores?.value ?? 0) - (a.scores?.value ?? 0))
    .slice(0, 3);
}

export default function CoverageResults({ state, providers }: CoverageResultsProps) {
  const { headline, detail, icon } = getCoverageMessage(state.insurance, state.medication);
  const topProviders = getTopCompounded(providers);

  return (
    <div className="flex flex-col gap-6">
      {/* Coverage estimate */}
      <div className="text-center">
        <div className="text-5xl mb-3">{icon}</div>
        <h2 className="text-2xl font-bold text-brand-text-primary font-heading">
          {headline}
        </h2>
        <p className="text-brand-text-secondary mt-2 text-sm leading-relaxed max-w-sm mx-auto">
          {detail}
        </p>
      </div>

      {/* Compounded alternatives */}
      {topProviders.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="border-t border-brand-violet/10 pt-4">
            <h3 className="text-lg font-semibold text-brand-text-primary mb-1">
              If your insurance doesn&apos;t cover it, here are compounded alternatives:
            </h3>
            <p className="text-sm text-brand-text-secondary mb-4">
              These providers offer compounded semaglutide and tirzepatide at a fraction of the brand-name cost.
            </p>
          </div>
          {topProviders.map((provider) => (
            <ProviderCard
              key={provider._id}
              provider={provider}
              trackingSource="insurance_results"
            />
          ))}
        </div>
      )}
    </div>
  );
}
