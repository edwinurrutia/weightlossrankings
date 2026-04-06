import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nature of Our Reviews & Rankings",
  description:
    "How WeightLossRankings researches providers, what shapes our ranking order, what commercial relationships affect, and what you should always verify on your own.",
  alternates: { canonical: "/nature-of-reviews" },
  robots: { index: true, follow: true },
};

export default function NatureOfReviewsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary mb-4">
          Nature of Our Reviews &amp; Rankings
        </h1>
        <p className="text-lg text-brand-text-secondary leading-relaxed">
          How we research providers, what shapes our ranking order, and what
          you should verify on your own before acting on anything you read
          here.
        </p>
      </div>

      {/* TL;DR card */}
      <section
        aria-label="Summary"
        className="rounded-2xl bg-amber-50 border border-amber-200 p-6 md:p-7 mb-12 text-amber-950"
      >
        <h2 className="font-heading text-lg font-bold mb-3">
          Three things to know before you act on anything you read here
        </h2>
        <ol className="list-decimal list-outside ml-5 space-y-3 text-sm leading-relaxed">
          <li>
            <strong>Always do your own research.</strong> Cross-check pricing,
            state availability, and clinical claims with the provider&apos;s
            own website and your doctor before you commit.
          </li>
          <li>
            <strong>
              We have commercial relationships with some providers.
            </strong>{" "}
            This affects placement on our site (featured listings, homepage
            callouts, blog frequency) but never the underlying scoring
            algorithm.
          </li>
          <li>
            <strong>We don&apos;t catalog every provider.</strong> Our coverage
            is based on editorial priorities, market reach, and reader
            interest. Smaller or newer providers may not appear yet.
          </li>
        </ol>
      </section>

      <div className="space-y-10 text-brand-text-secondary leading-relaxed">
        {/* What our reviews are */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
            What our reviews are
          </h2>
          <p className="mb-4">
            WeightLossRankings.org is an independent editorial comparison site
            for GLP-1 telehealth providers, weight loss programs, compounding
            pharmacies, and related products. Our reviews are opinion pieces
            grounded in publicly available information: pricing pages, clinical
            study results, state licensing databases, pharmacy registries,
            user-submitted feedback, and our own hands-on evaluation of
            provider onboarding flows where practical.
          </p>
          <p>
            We are not a pharmacy, prescriber, shipper, or insurer. We have no
            formal affiliation with any pharmaceutical manufacturer beyond
            standard affiliate agreements that some telehealth providers offer
            to publishers. We are not paid by any manufacturer to rank or
            review a specific drug.
          </p>
        </section>

        {/* What our reviews are NOT */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
            What our reviews are NOT
          </h2>
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>Not personalized medical advice.</li>
            <li>
              Not a substitute for talking to a licensed clinician who knows
              your history.
            </li>
            <li>
              Not exhaustive — we do not cover every provider in the market.
            </li>
            <li>
              Not a guarantee of accuracy at the exact moment you are reading.
              Pricing, availability, and features can change between our last
              refresh and your visit.
            </li>
            <li>
              Not free of commercial relationships. See our{" "}
              <Link
                href="/disclosure"
                className="text-brand-violet underline"
              >
                Affiliate Disclosure
              </Link>{" "}
              for the full picture.
            </li>
          </ul>
        </section>

        {/* How we score */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
            How we score
          </h2>
          <p>
            Every provider is evaluated across six weighted dimensions: value,
            clinical effectiveness, user experience, trust and safety,
            accessibility, and ongoing support. The same algorithm runs on
            every provider we cover, regardless of whether we have a
            commercial relationship with them. For the full breakdown of each
            dimension and its weight, see our{" "}
            <Link
              href="/methodology"
              className="text-brand-violet underline"
            >
              Methodology
            </Link>{" "}
            page.
          </p>
        </section>

        {/* How rankings can move */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
            How rankings can move
          </h2>
          <p className="mb-4">
            This is the part most comparison sites are less transparent about,
            so we will be direct.
          </p>
          <p className="mb-4">
            <strong className="text-brand-text-primary">
              Score is independent. Placement is not always.
            </strong>{" "}
            A provider&apos;s numeric score is determined entirely by our
            scoring algorithm and the underlying data — a paid partner will
            never receive a higher score than a non-partner with equivalent
            data.
          </p>
          <p className="mb-4">
            What commercial relationships <em>can</em> influence:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
            <li>
              Featured placements on the homepage and category landing pages.
            </li>
            <li>&quot;Top Pick,&quot; &quot;Editor&apos;s Choice,&quot; or similar promotional labels.</li>
            <li>
              Highlighted cards inside the comparison tool and blog sidebars.
            </li>
            <li>How frequently we publish new blog coverage about a provider.</li>
          </ul>
          <p className="mb-4">
            When a placement is paid or sponsored, we label it clearly as
            &quot;Featured&quot; or &quot;Sponsored.&quot; Providers without a
            commercial arrangement still appear in our rankings and still get
            full reviews — they simply may not receive promotional emphasis
            outside of the algorithmically derived ranking order.
          </p>
          <p>
            See our{" "}
            <Link
              href="/disclosure"
              className="text-brand-violet underline"
            >
              Affiliate Disclosure
            </Link>{" "}
            for the full policy and our{" "}
            <Link
              href="/code-of-conduct"
              className="text-brand-violet underline"
            >
              Code of Conduct
            </Link>{" "}
            for the editorial guardrails we hold ourselves to.
          </p>
        </section>

        {/* What to verify yourself */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
            What to verify yourself
          </h2>
          <p className="mb-4">
            Before you sign up with any provider or start any new medication,
            confirm the following directly with the provider and your
            clinician:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>
              <strong className="text-brand-text-primary">
                Current pricing.
              </strong>{" "}
              Telehealth pricing changes frequently — promotional rates expire,
              dose tiers get repriced.
            </li>
            <li>
              <strong className="text-brand-text-primary">
                State availability.
              </strong>{" "}
              State-by-state regulations around compounding and telehealth
              shift often.
            </li>
            <li>
              <strong className="text-brand-text-primary">
                LegitScript certification.
              </strong>{" "}
              Look up any provider at{" "}
              <a
                href="https://www.legitscript.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-violet underline"
              >
                legitscript.com
              </a>
              .
            </li>
            <li>
              <strong className="text-brand-text-primary">
                Pharmacy sourcing.
              </strong>{" "}
              Ask which specific compounding pharmacy actually fills your
              order and check its record.
            </li>
            <li>
              <strong className="text-brand-text-primary">
                Medical oversight.
              </strong>{" "}
              Confirm there is a real, licensed prescriber evaluating you and
              not a rubber-stamp intake form.
            </li>
            <li>
              <strong className="text-brand-text-primary">
                Cold-chain shipping.
              </strong>{" "}
              Semaglutide and tirzepatide need refrigeration; ensure the
              provider ships with validated cold-chain packaging.
            </li>
            <li>
              <strong className="text-brand-text-primary">
                Insurance coverage.
              </strong>{" "}
              Your plan may require prior authorization, step therapy, or may
              not cover weight loss indications at all.
            </li>
            <li>
              <strong className="text-brand-text-primary">
                Drug interactions and contraindications.
              </strong>{" "}
              Only your doctor can evaluate these against your personal
              medical history.
            </li>
          </ul>
        </section>

        {/* Talk to a doctor */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
            Talk to a doctor
          </h2>
          <p>
            Nothing on this site is a substitute for a conversation with a
            qualified clinician. Before starting, stopping, or changing any
            medication — especially injectable GLP-1s like semaglutide and
            tirzepatide — please talk to a licensed healthcare provider.
            GLP-1 prescribing decisions involve weighing personal medical
            history, contraindications (pancreatitis history, medullary
            thyroid carcinoma risk, pregnancy, and more), concurrent
            medications, and individual risk factors that a comparison site
            cannot evaluate. A 10/10 score on our rankings does not mean a
            provider or drug is the right fit for you specifically.
          </p>
        </section>

        {/* Updating frequency */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
            How often we update each type of data
          </h2>
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>
              <strong className="text-brand-text-primary">Pricing:</strong>{" "}
              monthly, or sooner when our scrapers detect a change.
            </li>
            <li>
              <strong className="text-brand-text-primary">
                State availability:
              </strong>{" "}
              quarterly.
            </li>
            <li>
              <strong className="text-brand-text-primary">
                Full written reviews:
              </strong>{" "}
              quarterly.
            </li>
            <li>
              <strong className="text-brand-text-primary">
                Provider rankings:
              </strong>{" "}
              continuously, as the underlying data updates.
            </li>
            <li>
              <strong className="text-brand-text-primary">
                Last-updated badges:
              </strong>{" "}
              each provider card shows the most recent verification date so
              you can see at a glance how fresh the data is.
            </li>
          </ul>
        </section>

        {/* Reporting inaccuracies */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
            How to report inaccuracies
          </h2>
          <p>
            We are committed to accuracy. If you find an outdated price, a
            missing state, or a factual error, please email{" "}
            <a
              href="mailto:hello@weightlossrankings.org"
              className="text-brand-violet underline"
            >
              hello@weightlossrankings.org
            </a>{" "}
            with the provider name and the specific issue. We typically
            correct verified inaccuracies within 1-2 business days.
          </p>
        </section>

        {/* Related */}
        <section className="pt-6 border-t border-brand-violet/10">
          <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-4">
            Related pages
          </h2>
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>
              <Link href="/methodology" className="text-brand-violet underline">
                Methodology
              </Link>{" "}
              — full scoring formula and dimension weights.
            </li>
            <li>
              <Link href="/disclosure" className="text-brand-violet underline">
                Affiliate Disclosure
              </Link>{" "}
              — how we earn revenue and what it affects.
            </li>
            <li>
              <Link
                href="/code-of-conduct"
                className="text-brand-violet underline"
              >
                Code of Conduct
              </Link>{" "}
              — our editorial guardrails.
            </li>
            <li>
              <Link href="/about" className="text-brand-violet underline">
                About WeightLossRankings
              </Link>{" "}
              — who runs the site.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
