import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About WeightLossRankings",
  description:
    "WeightLossRankings is an independent review site that evaluates GLP-1 telehealth providers, weight loss programs, and supplements.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        About WeightLossRankings
      </h1>
      <p className="text-gray-600 mb-5">
        WeightLossRankings.org exists to cut through the noise in a market
        flooded with telehealth providers, GLP-1 programs, and weight loss
        services making bold claims with little accountability. The goal is
        simple: give people a single place to compare options based on
        evidence, pricing, and real-world experience — instead of whichever
        brand has the biggest ad budget.
      </p>
      <p className="text-gray-600 mb-5">
        The site is operated by an independent publisher. Every provider is
        evaluated using a structured scoring methodology that weighs value,
        clinical effectiveness, user experience, safety and compliance,
        accessibility, and ongoing support. The same algorithm is applied to
        every provider, whether or not they have a commercial relationship
        with us. For full details on how commercial relationships affect
        placement (but not scores), see our{" "}
        <a href="/disclosure" className="text-brand-violet underline">
          Affiliate Disclosure
        </a>{" "}
        and{" "}
        <a href="/methodology" className="text-brand-violet underline">
          Methodology
        </a>{" "}
        pages.
      </p>
      <p className="text-gray-600">
        We currently cover GLP-1 telehealth providers, medical weight loss
        clinics, semaglutide and tirzepatide programs, and related services
        available in the United States. The database is updated as new
        providers enter the market, pricing changes, and clinical evidence
        evolves. If you believe a provider is missing or a score is
        inaccurate, please reach out at{" "}
        <a
          href="mailto:hello@weightlossrankings.org"
          className="text-brand-violet underline"
        >
          hello@weightlossrankings.org
        </a>
        .
      </p>
    </div>
  );
}
