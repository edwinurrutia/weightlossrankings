import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About WeightLossRankings",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        About WeightLossRankings
      </h1>
      <p className="text-gray-600 mb-5">
        WeightLossRankings exists to cut through the noise in a market flooded
        with telehealth providers, GLP-1 programs, and weight loss services
        making bold claims with little accountability. Our mission is to give
        people a single, trustworthy place to compare options based on evidence,
        transparency, and real-world outcomes — not advertising dollars or
        sponsored placement.
      </p>
      <p className="text-gray-600 mb-5">
        We are an independent publication. Our editorial team evaluates programs
        using a structured scoring methodology that weighs clinical
        effectiveness, value, user experience, safety and compliance,
        accessibility, and ongoing support. No provider can buy a better
        ranking. We accept affiliate commissions from some providers, but these
        relationships are disclosed and have no bearing on the scores or
        rankings you see on this site.
      </p>
      <p className="text-gray-600">
        We currently cover GLP-1 telehealth providers, medical weight loss
        clinics, semaglutide and tirzepatide programs, and related services
        available in the United States. Our database is updated continuously as
        new providers enter the market, pricing changes, and clinical evidence
        evolves. If you believe a provider is missing or a score is inaccurate,
        we welcome feedback through our contact page.
      </p>
    </div>
  );
}
