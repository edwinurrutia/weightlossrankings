import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
};

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Affiliate Disclosure
      </h1>
      <p className="text-gray-600 mb-5">
        WeightLossRankings participates in affiliate marketing programs. This
        means that when you click certain links on our site and make a purchase
        or sign up for a service, we may receive a commission from the provider
        at no additional cost to you.{" "}
        <strong>
          These commissions help fund the research, testing, and editorial work
          that keeps this site free and independent.
        </strong>
      </p>
      <p className="text-gray-600 mb-5">
        Affiliate relationships exist with some, but not all, of the providers
        listed on this site. Providers that do not have an affiliate arrangement
        with us are evaluated and displayed using the same methodology as those
        that do.{" "}
        <strong>
          A commercial relationship with a provider has no influence on their
          score, ranking position, or editorial coverage.
        </strong>{" "}
        Rankings are determined solely by our scoring algorithm, which is
        applied uniformly across all providers.
      </p>
      <p className="text-gray-600 mb-5">
        Our editorial team operates independently from our business development
        function. Reviewers and analysts who produce scores and written content
        do not have visibility into affiliate commission rates, and business
        relationships are not a factor in editorial decisions. If a provider
        scores poorly, they will be ranked accordingly — regardless of any
        existing or potential commercial relationship.
      </p>
      <p className="text-gray-600">
        This disclosure is made in compliance with the Federal Trade
        Commission&apos;s guidelines on endorsements and testimonials (16 CFR
        Part 255).{" "}
        <strong>
          We are committed to transparency and will always clearly identify
          affiliate links and sponsored content where applicable.
        </strong>{" "}
        If you have questions about our affiliate relationships or editorial
        policies, please contact us through our website.
      </p>
    </div>
  );
}
