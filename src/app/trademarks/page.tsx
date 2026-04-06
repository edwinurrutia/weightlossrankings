import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trademark Disclaimer",
  description:
    "Trademark notice for Wegovy, Ozempic, Mounjaro, Zepbound, and other brand names used on WeightLossRankings.org.",
  alternates: { canonical: "/trademarks" },
  robots: { index: true, follow: true },
};

interface MarkEntry {
  mark: string;
  owner: string;
  description: string;
}

const DRUG_MARKS: MarkEntry[] = [
  {
    mark: "Wegovy®",
    owner: "Novo Nordisk A/S",
    description: "semaglutide injection for chronic weight management",
  },
  {
    mark: "Ozempic®",
    owner: "Novo Nordisk A/S",
    description: "semaglutide injection for type 2 diabetes",
  },
  {
    mark: "Rybelsus®",
    owner: "Novo Nordisk A/S",
    description: "oral semaglutide tablet for type 2 diabetes",
  },
  {
    mark: "Mounjaro®",
    owner: "Eli Lilly and Company",
    description: "tirzepatide injection for type 2 diabetes",
  },
  {
    mark: "Zepbound®",
    owner: "Eli Lilly and Company",
    description: "tirzepatide injection for chronic weight management",
  },
  {
    mark: "Saxenda®",
    owner: "Novo Nordisk A/S",
    description: "liraglutide injection for chronic weight management",
  },
  {
    mark: "Victoza®",
    owner: "Novo Nordisk A/S",
    description: "liraglutide injection for type 2 diabetes",
  },
  {
    mark: "SELECT™",
    owner: "Novo Nordisk A/S",
    description: "semaglutide cardiovascular outcomes trial",
  },
  {
    mark: "STEP™",
    owner: "Novo Nordisk A/S",
    description: "semaglutide weight management clinical trial program",
  },
  {
    mark: "SURMOUNT™",
    owner: "Eli Lilly and Company",
    description: "tirzepatide weight management clinical trial program",
  },
];

const PROVIDER_MARKS: MarkEntry[] = [
  {
    mark: "Hims® & Hers®",
    owner: "Hims & Hers Health, Inc.",
    description: "telehealth weight loss and GLP-1 services",
  },
  {
    mark: "Ro®",
    owner: "Roman Health Ventures Inc.",
    description: "telehealth weight loss and GLP-1 services",
  },
  {
    mark: "Found®",
    owner: "Findhealth, Inc.",
    description: "telehealth weight loss program",
  },
  {
    mark: "Calibrate®",
    owner: "Calibrate Health, Inc.",
    description: "metabolic reset weight loss program",
  },
  {
    mark: "Noom®",
    owner: "Noom, Inc.",
    description: "behavioral weight loss and GLP-1 program",
  },
  {
    mark: "WeightWatchers® / WW®",
    owner: "WW International, Inc.",
    description: "weight management program and Sequence telehealth clinic",
  },
  {
    mark: "Sequence®",
    owner: "WW International, Inc.",
    description: "telehealth GLP-1 clinic (acquired by WeightWatchers)",
  },
  {
    mark: "Eden®",
    owner: "Eden Health, Inc.",
    description: "telehealth compounded GLP-1 provider",
  },
  {
    mark: "Mochi Health®",
    owner: "Mochi Health, Inc.",
    description: "telehealth weight loss clinic",
  },
];

export default function TrademarksPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-brand-text-secondary/70 mb-3">
            Legal Notice
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary mb-4">
            Trademark Disclaimer
          </h1>
          <p className="text-brand-text-secondary leading-relaxed">
            WeightLossRankings.org is an independent editorial publication. We
            review and compare prescription weight loss medications and
            telehealth providers. Because we write about real products, we use
            their real brand names. This page explains who owns the trademarks
            we reference, why we use them, and what that means for you.
          </p>
        </div>

        {/* Primary disclaimer card */}
        <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6 sm:p-8 mb-10">
          <h2 className="font-heading text-lg font-bold text-brand-text-primary mb-3">
            The short version
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed">
            Names and marks including Wegovy®, Ozempic®, and Rybelsus® are
            registered trademarks of Novo Nordisk A/S. Mounjaro® and Zepbound®
            are registered trademarks of Eli Lilly and Company. All other
            product names, logos, brands, and trademarks referenced on this
            site are the property of their respective owners.
            WeightLossRankings.org uses these names only to identify the
            products and services discussed in our reviews, comparisons, and
            guides. Use of these marks does not imply endorsement, sponsorship,
            or affiliation. WeightLossRankings.org is not affiliated with Novo
            Nordisk, Eli Lilly, or any other pharmaceutical manufacturer.
          </p>
        </section>

        {/* Drug marks table */}
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
            Drug trademarks referenced on this site
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed mb-4">
            Below are the GLP-1 and related weight loss medications we discuss,
            along with the companies that own the underlying trademarks.
          </p>
          <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                  <th className="py-3 px-5 text-left">Mark</th>
                  <th className="py-3 px-5 text-left">Owner</th>
                  <th className="py-3 px-5 text-left hidden sm:table-cell">
                    Product
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {DRUG_MARKS.map((m) => (
                  <tr key={m.mark}>
                    <td className="py-3 px-5 font-semibold text-brand-text-primary whitespace-nowrap">
                      {m.mark}
                    </td>
                    <td className="py-3 px-5 text-brand-text-secondary">
                      {m.owner}
                    </td>
                    <td className="py-3 px-5 text-brand-text-secondary hidden sm:table-cell">
                      {m.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Provider marks table */}
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
            Provider and program trademarks
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed mb-4">
            We also review telehealth providers and weight loss programs. These
            names and logos are trademarks of the companies that operate those
            services.
          </p>
          <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                  <th className="py-3 px-5 text-left">Mark</th>
                  <th className="py-3 px-5 text-left">Owner</th>
                  <th className="py-3 px-5 text-left hidden sm:table-cell">
                    Service
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {PROVIDER_MARKS.map((m) => (
                  <tr key={m.mark}>
                    <td className="py-3 px-5 font-semibold text-brand-text-primary whitespace-nowrap">
                      {m.mark}
                    </td>
                    <td className="py-3 px-5 text-brand-text-secondary">
                      {m.owner}
                    </td>
                    <td className="py-3 px-5 text-brand-text-secondary hidden sm:table-cell">
                      {m.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-brand-text-secondary/70 leading-relaxed">
            This list is not exhaustive. Any other trademarks, service marks,
            trade names, product names, or logos appearing on
            WeightLossRankings.org are the property of their respective owners.
          </p>
        </section>

        {/* What this means */}
        <section className="mb-10 space-y-4">
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary">
            What this disclaimer means in plain English
          </h2>
          <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6 space-y-3 text-sm text-brand-text-secondary leading-relaxed">
            <p>
              <strong className="text-brand-text-primary">
                We are not the manufacturer.
              </strong>{" "}
              WeightLossRankings.org is not Novo Nordisk, Eli Lilly, or any
              pharmaceutical company. We do not make, sell, ship, prescribe, or
              dispense any of the medications we write about.
            </p>
            <p>
              <strong className="text-brand-text-primary">
                We are not the provider.
              </strong>{" "}
              We are not Hims, Ro, Found, Calibrate, Noom, WeightWatchers, or
              any of the other telehealth clinics and programs we review. We
              are an independent editorial site.
            </p>
            <p>
              <strong className="text-brand-text-primary">
                We use brand names only to identify products.
              </strong>{" "}
              When we say &ldquo;Wegovy&rdquo; or &ldquo;Mounjaro,&rdquo; we
              mean the specific FDA-approved product sold under that name. This
              is known as nominative fair use: you can&apos;t meaningfully
              compare weight loss drugs without naming them.
            </p>
            <p>
              <strong className="text-brand-text-primary">
                Manufacturers have not endorsed our content.
              </strong>{" "}
              Nothing we publish has been reviewed, approved, or endorsed by
              Novo Nordisk, Eli Lilly, or any trademark holder. Any opinions,
              rankings, or evaluations represent our independent editorial
              judgment.
            </p>
            <p>
              <strong className="text-brand-text-primary">
                Reviews are our opinion, not the manufacturer&apos;s.
              </strong>{" "}
              Our provider rankings and drug guides reflect our scoring
              methodology and editorial perspective. They do not represent the
              views of any trademark holder.
            </p>
          </div>
        </section>

        {/* Generic vs brand */}
        <section className="mb-10 space-y-3">
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary">
            Generic names versus brand names
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed">
            Every prescription drug has both a chemical (generic) name and one
            or more brand names. The generic name identifies the active
            ingredient and is not a trademark. The brand name is a trademark
            owned by the manufacturer. We use both throughout the site, and
            they are not interchangeable in a legal sense.
          </p>
          <ul className="text-sm text-brand-text-secondary leading-relaxed list-disc pl-6 space-y-2">
            <li>
              <strong className="text-brand-text-primary">Semaglutide</strong>{" "}
              is the generic name for the active molecule sold by Novo Nordisk
              under the brand names Wegovy® (for weight management), Ozempic®
              (for type 2 diabetes), and Rybelsus® (oral formulation).
            </li>
            <li>
              <strong className="text-brand-text-primary">Tirzepatide</strong>{" "}
              is the generic name for the active molecule sold by Eli Lilly
              under the brand names Mounjaro® (for type 2 diabetes) and
              Zepbound® (for weight management).
            </li>
            <li>
              <strong className="text-brand-text-primary">Liraglutide</strong>{" "}
              is the generic name for the molecule previously sold as Saxenda®
              (for weight management) and Victoza® (for type 2 diabetes).
            </li>
          </ul>
          <p className="text-sm text-brand-text-secondary leading-relaxed">
            When we write about &ldquo;compounded semaglutide&rdquo; or
            &ldquo;compounded tirzepatide,&rdquo; we are referring to the
            active pharmaceutical ingredient prepared by a licensed compounding
            pharmacy under Section 503A or 503B of the Federal Food, Drug, and
            Cosmetic Act. Compounded medications are not Wegovy®, Ozempic®,
            Rybelsus®, Mounjaro®, or Zepbound®. They are separate preparations
            that contain the same active molecule. We take care to make this
            distinction clear wherever we discuss compounded GLP-1 products.
          </p>
        </section>

        {/* Source */}
        <section className="mb-10 space-y-3">
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary">
            Source of trademark information
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed">
            Trademark ownership information on this page is based on public
            records from the United States Patent and Trademark Office. You
            can verify any U.S. trademark registration yourself using the
            USPTO Trademark Electronic Search System (TESS):
          </p>
          <p className="text-sm">
            <a
              href="https://tmsearch.uspto.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-violet underline hover:text-brand-violet/80"
            >
              tmsearch.uspto.gov
            </a>
          </p>
          <p className="text-xs text-brand-text-secondary/70 leading-relaxed">
            Trademark registrations change over time. If you notice an
            inaccuracy on this page, please let us know using the contact
            information below and we will correct it.
          </p>
        </section>

        {/* Reporting concerns */}
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-3">
            Reporting trademark concerns
          </h2>
          <div className="rounded-2xl bg-brand-violet/5 border border-brand-violet/15 p-6 text-sm text-brand-text-secondary leading-relaxed">
            <p>
              If you are a trademark holder, an authorized agent of a
              trademark holder, or legal counsel representing a trademark
              holder, and you believe WeightLossRankings.org is using your
              mark inappropriately, please contact us at{" "}
              <a
                href="mailto:hello@weightlossrankings.org?subject=Trademark%20Concern"
                className="text-brand-violet underline"
              >
                hello@weightlossrankings.org
              </a>{" "}
              with the subject line <em>Trademark Concern</em>. Please
              include the specific mark, the registration number if
              applicable, the URL of the page in question, and a description
              of the concern. We review all trademark correspondence and will
              respond within 5 business days.
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="pt-6 border-t border-brand-violet/10">
          <p className="text-sm text-brand-text-secondary leading-relaxed">
            Related policies:{" "}
            <Link href="/disclosure" className="text-brand-violet underline">
              Affiliate Disclosure
            </Link>
            {" · "}
            <Link
              href="/methodology"
              className="text-brand-violet underline"
            >
              Methodology
            </Link>
            {" · "}
            <Link href="/about" className="text-brand-violet underline">
              About
            </Link>
            {" · "}
            <Link href="/terms" className="text-brand-violet underline">
              Terms
            </Link>
            {" · "}
            <Link href="/privacy" className="text-brand-violet underline">
              Privacy
            </Link>
          </p>
          <p className="mt-4 text-xs text-brand-text-secondary/60">
            Last reviewed: April 2026. This notice is provided for
            informational purposes and is not legal advice.
          </p>
        </section>
      </div>
    </main>
  );
}
