import type { Metadata } from "next";
import { SCORE_DIMENSIONS } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "How We Rank — Our Methodology",
};

const DIMENSION_DESCRIPTIONS: Record<string, string> = {
  value:
    "Price relative to category average, cost transparency, hidden fees",
  effectiveness:
    "Clinical evidence, published weight loss outcomes, and clinical trial data",
  ux: "App quality, onboarding flow, website experience, and customer support responsiveness",
  trust:
    "FDA compliance, medical oversight quality, pharmacy verification, and company transparency",
  accessibility:
    "State availability, insurance acceptance, FSA/HSA eligibility, and shipping speed",
  support:
    "Access to dietitians, coaching, community features, and quality of follow-up care",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        How We Rank — Our Methodology
      </h1>
      <p className="text-gray-600 mb-8">
        Every program on WeightLossRankings is evaluated using an independent,
        structured scoring system. We do not accept payment to influence
        rankings. Each provider is assessed across six weighted dimensions, and
        scores are computed algorithmically to produce an overall rating out of
        10. Below is a full breakdown of each dimension and what it measures.
      </p>

      <div className="space-y-4 mb-8">
        {SCORE_DIMENSIONS.map((dim) => (
          <div key={dim.key} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {dim.label}
              </h2>
              <span className="text-sm font-medium text-brand-violet bg-brand-violet/10 px-3 py-1 rounded-full">
                {dim.weight}
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              {DIMENSION_DESCRIPTIONS[dim.key]}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-brand-violet/5 border border-brand-violet/10 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Editorial Independence
        </h2>
        <p className="text-gray-600 text-sm">
          Our rankings are produced independently of any commercial relationship
          with the providers we review. Affiliate commissions we may earn do not
          affect scores or placement. If a provider&apos;s score changes, it is
          because their offering changed — not because of a business arrangement.
          We update scores when new clinical data, pricing changes, or service
          quality shifts are identified.
        </p>
      </div>
    </div>
  );
}
