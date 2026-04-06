import type { Metadata } from "next";
import { SCORE_DIMENSIONS } from "@/lib/scoring";
import Citation from "@/components/research/Citation";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";

// Per-page citation numbering (1..n) — must match the order in sourceIds below.
const CITE = {
  WLR_PRICING: { id: "wlr-pricing-index", n: 1 },
  WEGOVY_PRICE: { id: "novocare-wegovy-cash-price", n: 2 },
  ZEPBOUND_PRICE: { id: "lilly-zepbound-cash-price", n: 3 },
  STEP1: { id: "step1-nejm-2021", n: 4 },
  SURMOUNT1: { id: "surmount1-nejm-2022", n: 5 },
  PCAB: { id: "pcab-accreditation-standards", n: 6 },
  FDA_503A: { id: "fda-503a-compounding", n: 7 },
  FDA_503B: { id: "fda-503b-outsourcing", n: 8 },
  FDA_WARNING: { id: "fda-glp1-warning-letters", n: 9 },
  AACE: { id: "aace-obesity-guidelines-2016", n: 10 },
  ADA: { id: "ada-standards-of-care-2025", n: 11 },
} as const;

const METHODOLOGY_SOURCE_IDS = [
  CITE.WLR_PRICING.id,
  CITE.WEGOVY_PRICE.id,
  CITE.ZEPBOUND_PRICE.id,
  CITE.STEP1.id,
  CITE.SURMOUNT1.id,
  CITE.PCAB.id,
  CITE.FDA_503A.id,
  CITE.FDA_503B.id,
  CITE.FDA_WARNING.id,
  CITE.AACE.id,
  CITE.ADA.id,
];

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
      <p className="text-gray-600 mb-4">
        Every provider on WeightLossRankings is evaluated using a structured
        scoring system. Each provider is assessed across six weighted
        dimensions, and scores are computed algorithmically to produce an
        overall rating out of 10. The algorithm is applied uniformly to every
        provider — a paid partner does not receive a higher score than a
        non-partner. Below is a full breakdown of each dimension and what it
        measures.
      </p>
      <div className="mb-8 rounded-xl border border-brand-violet/10 bg-brand-violet/[0.03] px-4 py-3 text-sm text-gray-600 leading-relaxed">
        <strong className="text-gray-900">Why each dimension matters:</strong>{" "}
        <em>Value</em> is benchmarked against current brand-name GLP-1 cash
        prices — roughly $1,349/month for Wegovy
        <Citation source={CITE.WEGOVY_PRICE.id} n={CITE.WEGOVY_PRICE.n} /> and
        $1,086/month for Zepbound
        <Citation source={CITE.ZEPBOUND_PRICE.id} n={CITE.ZEPBOUND_PRICE.n} />{" "}
        — against which compounded options are compared using our pricing
        index
        <Citation source={CITE.WLR_PRICING.id} n={CITE.WLR_PRICING.n} />.{" "}
        <em>Effectiveness</em> is grounded in the pivotal trials: STEP 1
        (semaglutide, -14.9% body weight)
        <Citation source={CITE.STEP1.id} n={CITE.STEP1.n} /> and SURMOUNT-1
        (tirzepatide, -20.9% body weight)
        <Citation source={CITE.SURMOUNT1.id} n={CITE.SURMOUNT1.n} />, with
        guideline context from AACE
        <Citation source={CITE.AACE.id} n={CITE.AACE.n} /> and the ADA
        Standards of Care
        <Citation source={CITE.ADA.id} n={CITE.ADA.n} />. <em>Trust</em>{" "}
        reflects PCAB pharmacy accreditation
        <Citation source={CITE.PCAB.id} n={CITE.PCAB.n} />, federal
        compounding rules under 503A
        <Citation source={CITE.FDA_503A.id} n={CITE.FDA_503A.n} /> and 503B
        <Citation source={CITE.FDA_503B.id} n={CITE.FDA_503B.n} />, and any
        FDA warning-letter history
        <Citation source={CITE.FDA_WARNING.id} n={CITE.FDA_WARNING.n} />.
      </div>

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

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 space-y-3 mb-8">
        <h2 className="text-lg font-semibold text-gray-900">
          How We Evaluate Compounding Pharmacies
        </h2>
        <p className="text-gray-600 text-sm">
          For compounded GLP-1 medications, the telehealth provider is only
          half the story — the compounding pharmacy behind the prescription
          actually produces the drug. We maintain a separate{" "}
          <a href="/pharmacies" className="text-brand-violet underline">
            compounding pharmacy directory
          </a>{" "}
          and score each pharmacy across five dimensions: accreditation and
          compliance (PCAB, cGMP, FDA 503B registration), regulatory standing
          (FDA warning letters, Form 483 observations, recalls), state
          coverage (number of states licensed to dispense), GLP-1 production
          (whether semaglutide and tirzepatide are both produced), and track
          record (years in operation).
        </p>
        <p className="text-gray-600 text-sm">
          Pharmacy-level scores are independent from provider-level scores.
          We do not artificially boost a telehealth provider because it
          partners with a highly-rated pharmacy — instead we surface the
          pharmacy relationship so readers can evaluate both the prescriber
          and the pharmacy fulfilling the prescription.
        </p>
      </div>

      <div className="rounded-2xl bg-brand-violet/5 border border-brand-violet/10 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Scores vs. Placement
        </h2>
        <p className="text-gray-600 text-sm">
          <strong className="text-gray-900">
            Score is independent. Placement is not always.
          </strong>{" "}
          Our scoring algorithm runs against every provider equally — a paid
          partner will never receive a higher score than a non-partner with
          equivalent data.
        </p>
        <p className="text-gray-600 text-sm">
          Commercial relationships <em>can</em> influence where a provider
          appears beyond its algorithmic score — for example, featured
          homepage placements, &quot;Top Pick&quot; labels, highlighted cards
          in the comparison tool, or blog coverage frequency. Sponsored
          placements are labeled clearly. Providers without an affiliate
          arrangement are still evaluated and ranked using the same
          methodology. This is disclosed in full on our{" "}
          <a href="/disclosure" className="text-brand-violet underline">
            Affiliate Disclosure
          </a>{" "}
          page, and explained end-to-end on our{" "}
          <a
            href="/nature-of-reviews"
            className="text-brand-violet underline"
          >
            Nature of Reviews &amp; Rankings
          </a>{" "}
          page.
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

      <SourcesPanel
        sourceIds={METHODOLOGY_SOURCE_IDS}
        dataAsOf={getLatestVerificationDate()}
        defaultOpen
      />
    </div>
  );
}
