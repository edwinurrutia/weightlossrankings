import type { Metadata } from "next";
import { SCORE_DIMENSIONS } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "How We Rank — Our Methodology",
  description:
    "Our independent methodology for scoring and ranking GLP-1 providers, weight loss programs, and supplements across six weighted dimensions.",
  alternates: { canonical: "/methodology" },
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
        Every provider on WeightLossRankings is evaluated using a structured
        scoring system. Each provider is assessed across six weighted
        dimensions, and scores are computed algorithmically to produce an
        overall rating out of 10. The algorithm is applied uniformly to every
        provider — a paid partner does not receive a higher score than a
        non-partner. Below is a full breakdown of each dimension and what it
        measures.
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

      <div className="rounded-2xl bg-brand-violet/5 border border-brand-violet/10 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Scores vs. Placement
        </h2>
        <p className="text-gray-600 text-sm">
          Our scoring algorithm determines how a provider is rated. Commercial
          relationships do not influence the score a provider receives — the
          same formula is applied across every provider on the site,
          regardless of whether they are a paid partner.
        </p>
        <p className="text-gray-600 text-sm">
          <strong className="text-gray-900">Placement is separate.</strong>{" "}
          Commercial relationships may influence where a provider appears
          beyond its algorithmic score — for example, featured homepage
          placements, highlighted cards in the comparison tool, or blog
          coverage. This is common practice among affiliate comparison sites
          and is disclosed in full on our{" "}
          <a href="/disclosure" className="text-brand-violet underline">
            Affiliate Disclosure
          </a>{" "}
          page. Providers without an affiliate arrangement are still evaluated
          and ranked using the same methodology.
        </p>
        <p className="text-gray-600 text-sm">
          Scores are updated when new clinical data, pricing changes, or
          service quality shifts are identified. If you find a score that
          seems out of date or inaccurate, please let us know.
        </p>
        <p className="text-gray-600 text-sm">
          For the story behind the site and how it stays independent, see{" "}
          <a href="/about" className="text-brand-violet underline">
            About WeightLossRankings
          </a>
          .
        </p>
      </div>
    </div>
  );
}
