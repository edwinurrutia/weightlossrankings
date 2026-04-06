import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description:
    "Our editorial code of conduct, conflict-of-interest standards, provider relations rules, and community guidelines for WeightLossRankings.org.",
  alternates: { canonical: "/code-of-conduct" },
  robots: { index: true, follow: true },
};

export default function CodeOfConductPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary mb-4">
        Code of Conduct
      </h1>
      <p className="text-brand-text-secondary leading-relaxed mb-8">
        WeightLossRankings.org is an independent publisher covering a market
        where bad information has real consequences for people&apos;s health
        and wallets. This page sets out the editorial and community standards
        we hold ourselves and our readers to. If you think we are falling
        short of any of them, please tell us at{" "}
        <a
          href="mailto:hello@weightlossrankings.org"
          className="text-brand-violet underline"
        >
          hello@weightlossrankings.org
        </a>
        .
      </p>

      <div className="space-y-6 text-brand-text-secondary leading-relaxed">
        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-2">
          Editorial Independence
        </h2>
        <p>
          We have affiliate relationships with many of the providers we
          review. Those relationships can influence which providers we
          feature most prominently on the homepage and in marketing emails,
          but they never influence the scores our algorithm assigns. Our
          scoring methodology runs the same way on every provider in the
          database, whether we have a commercial relationship with them or
          not. You can read the exact weights and sub-factors on our{" "}
          <Link href="/methodology" className="text-brand-violet underline">
            Methodology page
          </Link>
          .
        </p>
        <p>
          No provider has veto rights over our coverage. We publish
          critical reviews of companies we have affiliate relationships
          with, and we publish favorable reviews of companies we have no
          relationship with. If a commercial partner objects to coverage,
          we discuss specific factual claims, not the overall opinion.
        </p>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-2">
          Accuracy Standards
        </h2>
        <p>
          Every factual claim on the site should be traceable to a primary
          source: a published study, an FDA label, a manufacturer
          statement, a state pharmacy board listing, or a direct quote from
          the provider. Clinical claims around GLP-1 efficacy, side
          effects, and approvals are sourced from the FDA label, the
          relevant clinical trial publications (STEP, SURMOUNT, SUSTAIN,
          etc.), or peer-reviewed literature. Pricing is sourced from the
          provider&apos;s own site as of the last verification date.
        </p>
        <p>
          We publish a last-verified date on provider reviews where
          possible and update our price tracker on a regular cadence.
          Corrections are made promptly when we discover or are notified of
          errors. Material corrections are disclosed on the corrected page.
        </p>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-2">
          Conflict of Interest
        </h2>
        <p>
          We disclose every commercial relationship that affects what you
          read. Affiliate links are disclosed on our{" "}
          <Link href="/disclosure" className="text-brand-violet underline">
            Affiliate Disclosure
          </Link>{" "}
          page and, where required, inline on individual articles. We do
          not accept payment in exchange for specific scores, specific
          rankings, or favorable review wording. We do not accept gifts of
          meaningful value, free long-term product, travel, or hospitality
          from providers beyond standard affiliate commissions and
          occasional sample product for verification purposes.
        </p>
        <p>
          Contributors are required to disclose any personal financial
          interest in a provider they cover. Any writer who holds equity in
          a provider cannot write that provider&apos;s review or
          ranking-affecting content.
        </p>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-2">
          Provider Relations Standards
        </h2>
        <p>
          We work with providers as sources, not as clients. Specifically:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            We do not allow providers to preview reviews or rankings before
            publication. Factual checks by email, yes; copy approval, no.
          </li>
          <li>
            We do not accept gifts beyond standard affiliate commissions
            and sample product used for verification.
          </li>
          <li>
            We publish criticism of commercial partners when our
            methodology or reporting calls for it.
          </li>
          <li>
            We do not run sponsored content dressed up as editorial. Any
            paid placement is labeled.
          </li>
          <li>
            If a provider materially misleads us and we publish based on
            that information, we update the piece and note the correction.
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-2">
          Community Guidelines
        </h2>
        <p>
          If and when we open up reviews, comments, or community features,
          participation is governed by a few simple rules:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Be respectful. No harassment, threats, or personal attacks.</li>
          <li>
            Stay on topic. Commercial spam, affiliate link dumping, and
            off-topic promotion will be removed.
          </li>
          <li>
            No medical advice. Do not tell other readers to take, avoid, or
            change specific medications. Share experience, not
            prescriptions.
          </li>
          <li>
            Respect privacy. Do not post other people&apos;s personal or
            health information.
          </li>
          <li>
            Be honest about affiliations. If you work for a provider or
            competitor, disclose it.
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-2">
          Reader Standards
        </h2>
        <p>
          We will not tolerate harassment of our contributors, reviewers,
          or other readers. Abusive email, threats, or coordinated
          harassment campaigns will result in permanent blocking of the
          offending email addresses and, where appropriate, reports to
          relevant authorities.
        </p>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-2">
          Reporting Concerns
        </h2>
        <p>
          If you spot an inaccuracy, believe a score is wrong, or have a
          concern about our editorial integrity, please email{" "}
          <a
            href="mailto:hello@weightlossrankings.org"
            className="text-brand-violet underline"
          >
            hello@weightlossrankings.org
          </a>{" "}
          with the page URL and a clear description of the issue. We aim
          to acknowledge every concern within a few business days and act
          on verified issues promptly. Serious allegations — for example,
          undisclosed conflicts, pay-for-ranking, or deliberately
          misleading content — will be investigated and the findings
          published where appropriate.
        </p>
      </div>
    </div>
  );
}
