import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllWarningLetters,
  getDatasetFreshnessDate,
} from "@/lib/fda-warning-letters";
import JsonLd from "@/components/shared/JsonLd";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

const PAGE_TITLE =
  "FDA Warning Letters: Compounded GLP-1 Telehealth Providers (2026)";
const PAGE_DESCRIPTION =
  "An independently maintained, primary-source database of FDA warning letters issued to compounded GLP-1 telehealth providers. Every entry links to the original fda.gov letter.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/fda-warning-letters" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/fda-warning-letters",
    type: "website",
    siteName: "Weight Loss Rankings",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const formatDate = (iso: string): string => {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

const formatDateShort = (iso: string): string => {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

export default function FdaWarningLettersIndexPage() {
  const letters = getAllWarningLetters();
  const freshness = getDatasetFreshnessDate();

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "FDA Warning Letters: Compounded GLP-1 Telehealth Providers",
    description: PAGE_DESCRIPTION,
    url: "https://www.weightlossrankings.org/fda-warning-letters",
    creator: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
    },
    license:
      "https://www.weightlossrankings.org/terms",
    isAccessibleForFree: true,
    dateModified: freshness,
    distribution: letters.map((l) => ({
      "@type": "DataDownload",
      contentUrl: l.fda_url,
      encodingFormat: "text/html",
      name: `${l.company_dba ?? l.company_name} (${l.letter_number})`,
    })),
  };

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "FDA Warning Letters", url: "/fda-warning-letters" },
  ];

  return (
    <>
      <JsonLd data={datasetJsonLd} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <main className="min-h-screen bg-brand-gradient-light pb-24">
        <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">
          {/* Header */}
          <header className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-brand-violet">
              Editorial Database
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-black text-brand-text-primary leading-tight tracking-tight">
              FDA Warning Letters: Compounded GLP-1 Telehealth Providers
            </h1>
            <p className="text-base md:text-lg text-brand-text-secondary leading-relaxed">
              An independently maintained, primary-source compilation of FDA
              warning letters issued to telehealth companies marketing
              compounded semaglutide, tirzepatide, and other GLP-1 products.
              Every entry links to the original letter on fda.gov.
            </p>
            <p className="text-xs text-brand-text-secondary">
              Data as of {formatDate(freshness)} ·{" "}
              <Link
                href="/contact"
                className="underline hover:text-brand-violet"
              >
                Report a missing letter
              </Link>
            </p>
          </header>

          {/* What this is / what it isn't */}
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-text-primary">
              What this database is — and what it isn&apos;t
            </h2>
            <div className="space-y-3 text-base text-brand-text-secondary leading-relaxed">
              <p>
                An FDA <strong>warning letter</strong> is the agency&apos;s
                principal means of notifying a company that the agency
                considers one or more of its products, practices, or
                marketing claims to be in violation of the Federal Food,
                Drug, and Cosmetic Act. The letter is a public document and
                appears on fda.gov.
              </p>
              <p>
                A warning letter is <strong>not</strong> a recall, a fine, a
                criminal charge, or a finding of illegal activity. It is the
                start of a regulatory conversation. Companies typically have
                15 working days to respond, and FDA may issue a{" "}
                <strong>close-out letter</strong> once the agency is
                satisfied that the cited issues have been corrected.
              </p>
              <p>
                We compile these letters because they are the best public
                signal of which compounded-GLP-1 telehealth companies have
                drawn FDA scrutiny. We <strong>do not</strong> editorialize
                about whether a company is &quot;bad.&quot; We quote FDA
                language and link to the source.
              </p>
            </div>
          </section>

          {/* The table */}
          <section className="flex flex-col gap-4">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-text-primary">
              {letters.length} warning letter{letters.length === 1 ? "" : "s"}{" "}
              in our database
            </h2>

            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-brand-violet/10 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-brand-violet/5 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-brand-text-primary">
                      Date
                    </th>
                    <th className="px-4 py-3 font-semibold text-brand-text-primary">
                      Company
                    </th>
                    <th className="px-4 py-3 font-semibold text-brand-text-primary">
                      Subject
                    </th>
                    <th className="px-4 py-3 font-semibold text-brand-text-primary">
                      FDA Letter
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {letters.map((l) => {
                    const display = l.company_dba ?? l.company_name;
                    return (
                      <tr
                        key={l.id}
                        className="border-t border-brand-violet/10 hover:bg-brand-violet/5"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-brand-text-secondary">
                          {formatDateShort(l.letter_date)}
                        </td>
                        <td className="px-4 py-3 font-semibold">
                          <Link
                            href={`/fda-warning-letters/${l.id}`}
                            className="text-brand-violet hover:underline"
                          >
                            {display}
                          </Link>
                          {l.company_dba &&
                            l.company_dba !== l.company_name && (
                              <span className="block text-xs text-brand-text-secondary font-normal">
                                {l.company_name}
                              </span>
                            )}
                        </td>
                        <td className="px-4 py-3 text-brand-text-secondary">
                          {l.subject}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <a
                            href={l.fda_url}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="text-brand-violet underline hover:text-brand-violet/80"
                          >
                            #{l.letter_number} ↗
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden flex flex-col gap-3">
              {letters.map((l) => {
                const display = l.company_dba ?? l.company_name;
                return (
                  <Link
                    key={l.id}
                    href={`/fda-warning-letters/${l.id}`}
                    className="block bg-white rounded-xl border border-brand-violet/10 shadow-sm p-4 hover:border-brand-violet/30"
                  >
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-brand-text-secondary">
                      {formatDateShort(l.letter_date)} · #{l.letter_number}
                    </p>
                    <p className="mt-1 font-heading text-lg font-bold text-brand-text-primary leading-tight">
                      {display}
                    </p>
                    {l.company_dba && l.company_dba !== l.company_name && (
                      <p className="text-xs text-brand-text-secondary">
                        {l.company_name}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-brand-text-secondary leading-relaxed">
                      {l.subject}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-brand-violet">
                      View details →
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* How to interpret */}
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-text-primary">
              How to read an FDA warning letter
            </h2>
            <div className="space-y-3 text-base text-brand-text-secondary leading-relaxed">
              <p>
                Each FDA warning letter follows a standard structure: an
                opening paragraph identifying the company and the violations
                FDA is alleging, a numbered list of specific concerns
                (citing the relevant FDCA sections), and a closing paragraph
                explaining what the company must do to respond.
              </p>
              <p>
                For compounded GLP-1 letters, the most common citations are
                under FDCA section 503A (the framework for traditional
                503A compounders) and section 503B (for outsourcing
                facilities). Letters often reference unapproved new drug
                claims, misbranding, or use of bulk drug substances not on
                FDA&apos;s approved list.
              </p>
              <p>
                A warning letter is the start, not the end, of an FDA
                enforcement process. We track <strong>status</strong> on
                each letter — &quot;active&quot; means the letter has not
                been formally closed out by FDA. We update entries when FDA
                publishes a close-out letter or withdraws the warning.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="border-l-4 border-amber-400 bg-amber-50 px-5 py-4 rounded-r-xl">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-amber-800 mb-2">
              Editorial Disclaimer
            </p>
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              FDA warning letters are public regulatory communications and do
              not, on their own, indicate that a company has done anything
              illegal. Companies often respond to warning letters with
              corrective action, and many letters are eventually closed out.
              We compile this database as a public service and link to the
              original FDA letter for every entry. If you believe an entry
              here is inaccurate or out of date,{" "}
              <Link href="/contact" className="underline hover:text-amber-900">
                please contact us
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
