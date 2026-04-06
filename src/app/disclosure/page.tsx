import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How WeightLossRankings earns revenue and the role of commercial relationships in our content.",
  alternates: { canonical: "/disclosure" },
};

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary mb-6">
        Affiliate Disclosure
      </h1>

      <div className="space-y-5 text-brand-text-secondary leading-relaxed">
        <p>
          WeightLossRankings.org is a reader-supported comparison site. When
          you click links to providers on our site and sign up or make a
          purchase, we may receive a commission at no additional cost to you.
          This compensation helps us operate the site, maintain our data, and
          continue providing free tools like our savings calculator, insurance
          checker, and price tracker.
        </p>

        <p>
          <strong className="text-brand-text-primary">
            The honest truth about commercial relationships:
          </strong>{" "}
          We have affiliate partnerships with many (but not all) of the
          providers listed on our site. Like most comparison sites, this
          compensation{" "}
          <strong className="text-brand-text-primary">
            may impact the location and visibility
          </strong>{" "}
          of certain providers — for example, featured placements on the
          homepage, highlighted cards in our comparison tool, or the frequency
          with which we write about certain products in our blog. Providers
          without affiliate relationships may still appear in our rankings,
          but they typically do not receive promotional emphasis.
        </p>

        <p>
          <strong className="text-brand-text-primary">
            Score is independent. Placement is not always.
          </strong>{" "}
          Our scoring algorithm runs against every provider equally, but
          featured placements, &quot;Top Pick&quot; labels, homepage callouts,
          and blog coverage frequency can be influenced by commercial
          relationships. We label sponsored placements clearly.
        </p>

        <p>
          <strong className="text-brand-text-primary">
            What does NOT change based on commercial relationships:
          </strong>{" "}
          Scores and rankings are determined by our scoring algorithm, which
          evaluates every provider across the same six weighted dimensions
          (see our{" "}
          <a href="/methodology" className="text-brand-violet underline">
            Methodology
          </a>
          ). A provider with an affiliate relationship will not receive a
          higher score than one without. If a provider scores poorly, they
          will be ranked accordingly, regardless of any existing or potential
          commercial relationship. Paid placements — such as featured
          listings or sponsored sections — are clearly labeled when present.
          For the full story of how our reviews and rankings work, see our{" "}
          <a
            href="/nature-of-reviews"
            className="text-brand-violet underline"
          >
            Nature of Reviews &amp; Rankings
          </a>{" "}
          page.
        </p>

        <p>
          WeightLossRankings.org is operated by an independent publisher, not
          a medical provider, pharmacy, or telehealth company. We are not
          affiliated with any specific provider or pharmaceutical manufacturer
          beyond standard affiliate agreements. The site does not include
          every available weight loss option, and the providers we cover are
          based on our editorial priorities, reader interest, and market
          reach.
        </p>

        <p>
          <strong className="text-brand-text-primary">
            Your choice matters more than our recommendation.
          </strong>{" "}
          Weight loss is a personal health decision. The rankings on this site
          are a starting point for research, not medical advice. Always
          consult a licensed healthcare provider before starting any
          medication or weight loss program. Prices, availability, features,
          and regulatory status change frequently — verify current details on
          the provider&apos;s own website before making a purchase.
        </p>

        <p className="text-sm text-brand-text-secondary/70 pt-4 border-t border-brand-violet/10">
          Questions? Contact us at{" "}
          <a
            href="mailto:hello@weightlossrankings.org"
            className="text-brand-violet underline"
          >
            hello@weightlossrankings.org
          </a>
          .
        </p>
      </div>
    </div>
  );
}
