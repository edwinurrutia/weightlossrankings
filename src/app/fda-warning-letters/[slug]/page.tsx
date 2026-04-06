import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllWarningLetters,
  getAllWarningLetterSlugs,
  getWarningLetterBySlug,
} from "@/lib/fda-warning-letters";
import JsonLd from "@/components/shared/JsonLd";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";
import DYORCallout from "@/components/marketing/DYORCallout";

export async function generateStaticParams() {
  return getAllWarningLetterSlugs().map((slug) => ({ slug }));
}

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const letter = getWarningLetterBySlug(slug);
  if (!letter) return { title: "Warning Letter Not Found" };

  const display = letter.company_dba ?? letter.company_name;
  const title = `${display} FDA Warning Letter (${formatDate(
    letter.letter_date,
  )}) — Compounded GLP-1`;
  const description = `FDA issued a warning letter to ${display} dated ${formatDate(
    letter.letter_date,
  )} (#${letter.letter_number}) regarding ${letter.subject.toLowerCase()}. Direct link to the original fda.gov letter.`;

  return {
    title,
    description,
    alternates: { canonical: `/fda-warning-letters/${slug}` },
    openGraph: {
      title,
      description,
      url: `/fda-warning-letters/${slug}`,
      type: "article",
      siteName: "Weight Loss Rankings",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function FdaWarningLetterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const letter = getWarningLetterBySlug(slug);
  if (!letter) notFound();

  const display = letter.company_dba ?? letter.company_name;
  const otherLetters = getAllWarningLetters()
    .filter((l) => l.id !== letter.id)
    .slice(0, 5);

  const articleJsonLd = {
    "@context": "https://schema.org",
    // NewsArticle (instead of plain Article) — these are timely
    // regulatory news. Google News and Top Stories specifically
    // surface NewsArticle entities, not generic Article.
    "@type": "NewsArticle",
    headline: `${display} FDA Warning Letter (${formatDate(letter.letter_date)})`,
    description: letter.violations_summary,
    image: `https://weightlossrankings.org/fda-warning-letters/${letter.id}/opengraph-image`,
    datePublished: letter.added_date,
    dateModified: letter.added_date,
    author: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
      url: "https://weightlossrankings.org",
    },
    publisher: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
      logo: {
        "@type": "ImageObject",
        url: "https://weightlossrankings.org/logo-600.png",
        width: 600,
        height: 600,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://weightlossrankings.org/fda-warning-letters/${letter.id}`,
    },
    articleSection: "FDA Enforcement",
    keywords: [
      "FDA warning letter",
      "compounded GLP-1",
      "compounded semaglutide",
      "compounded tirzepatide",
      letter.company_name,
    ].join(", "),
    citation: {
      "@type": "GovernmentService",
      name: `FDA Warning Letter #${letter.letter_number}`,
      url: letter.fda_url,
      provider: {
        "@type": "GovernmentOrganization",
        name: "U.S. Food and Drug Administration",
        url: "https://www.fda.gov",
      },
    },
    // Voice-search / Discover-audio support — assistant reads the
    // headline + the violations summary when surfacing this letter.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable='violations']"],
    },
    // The "subject" of this article is the regulatory action itself —
    // a GovernmentService entity that links the company being warned
    // to the FDA office that issued the warning. This is exactly the
    // structure Google's medical knowledge graph uses to surface
    // FDA enforcement in YMYL queries.
    about: {
      "@type": "GovernmentService",
      name: `FDA Warning Letter to ${display}`,
      serviceType: "Pharmaceutical compliance enforcement",
      provider: {
        "@type": "GovernmentOrganization",
        name: letter.issuing_office || "U.S. Food and Drug Administration",
        parentOrganization: {
          "@type": "GovernmentOrganization",
          name: "U.S. Food and Drug Administration",
          url: "https://www.fda.gov",
        },
      },
      audience: {
        "@type": "Organization",
        name: display,
      },
    },
  };

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "FDA Warning Letters", url: "/fda-warning-letters" },
    { name: display, url: `/fda-warning-letters/${letter.id}` },
  ];

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <main className="min-h-screen bg-brand-gradient-light pb-24">
        <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">
          {/* Breadcrumb link */}
          <Link
            href="/fda-warning-letters"
            className="text-sm text-brand-violet hover:underline"
          >
            ← All FDA warning letters
          </Link>

          {/* Header */}
          <header className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-brand-violet">
              FDA Warning Letter · #{letter.letter_number}
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-black text-brand-text-primary leading-tight tracking-tight">
              {display} — FDA Warning Letter ({formatDate(letter.letter_date)})
            </h1>
            {letter.company_dba && letter.company_dba !== letter.company_name && (
              <p className="text-base text-brand-text-secondary">
                Legal name:{" "}
                <strong className="text-brand-text-primary">
                  {letter.company_name}
                </strong>
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-violet/10 text-brand-violet">
                Issued {formatDate(letter.letter_date)}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 capitalize">
                Status: {letter.status}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-violet/5 text-brand-text-secondary">
                {letter.issuing_office}
              </span>
            </div>
          </header>

          {/* Big CTA to FDA */}
          <a
            href={letter.fda_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block bg-white rounded-2xl border-2 border-brand-violet shadow-sm p-5 md:p-6 hover:bg-brand-violet/5"
          >
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-brand-violet">
              Primary Source
            </p>
            <p className="mt-1 font-heading text-lg md:text-xl font-bold text-brand-text-primary">
              View the original FDA letter on fda.gov →
            </p>
            <p className="mt-1 text-xs text-brand-text-secondary break-all">
              {letter.fda_url}
            </p>
          </a>

          {/* Editorial summary */}
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-text-primary">
              Summary
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-wider font-semibold text-brand-text-secondary">
                  Company
                </dt>
                <dd className="mt-1 font-semibold text-brand-text-primary">
                  {letter.company_name}
                  {letter.company_dba && letter.company_dba !== letter.company_name
                    ? ` (dba ${letter.company_dba})`
                    : ""}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider font-semibold text-brand-text-secondary">
                  Letter number
                </dt>
                <dd className="mt-1 font-semibold text-brand-text-primary">
                  #{letter.letter_number}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider font-semibold text-brand-text-secondary">
                  Issue date
                </dt>
                <dd className="mt-1 font-semibold text-brand-text-primary">
                  {formatDate(letter.letter_date)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider font-semibold text-brand-text-secondary">
                  Subject
                </dt>
                <dd className="mt-1 font-semibold text-brand-text-primary">
                  {letter.subject}
                </dd>
              </div>
            </dl>
            <div className="border-t border-brand-violet/10 pt-4">
              <h3 className="text-[10px] uppercase tracking-wider font-semibold text-brand-text-secondary">
                What FDA cited
              </h3>
              <p
                data-speakable="violations"
                className="mt-2 text-base text-brand-text-secondary leading-relaxed"
              >
                {letter.violations_summary}
              </p>
            </div>
          </section>

          {letter.letter_excerpt && letter.letter_excerpt.length > 0 && (
            <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-text-primary">
                  From the letter
                </h2>
                <a
                  href={letter.fda_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-xs font-semibold text-brand-violet hover:underline whitespace-nowrap"
                >
                  Read full letter on FDA.gov →
                </a>
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold text-brand-text-secondary">
                Quoted verbatim from the FDA warning letter dated {formatDate(letter.letter_date)}
              </p>
              <div className="flex flex-col gap-4 border-l-2 border-brand-violet/30 pl-4">
                {letter.letter_excerpt.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base text-brand-text-secondary leading-relaxed italic"
                  >
                    {para}
                  </p>
                ))}
              </div>
              <p className="text-[10px] text-brand-text-secondary/70 mt-2">
                Source: U.S. Food and Drug Administration. Quoted as a verbatim excerpt for editorial commentary;
                no claim is made beyond what FDA itself has published. The full letter is available at{" "}
                <a
                  href={letter.fda_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-brand-violet underline break-all"
                >
                  {letter.fda_url}
                </a>
              </p>
            </section>
          )}

          {/* Boilerplate explainer */}
          <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-text-primary">
              What FDA warning letters mean
            </h2>
            <div className="space-y-3 text-base text-brand-text-secondary leading-relaxed">
              <p>
                A warning letter is FDA&apos;s principal means of telling a
                company that the agency considers something it&apos;s doing
                — a marketing claim, a manufacturing practice, a labeling
                choice — to violate the Federal Food, Drug, and Cosmetic
                Act. Companies typically have 15 working days to respond.
              </p>
              <p>
                A warning letter <strong>is not</strong> a recall, a
                criminal charge, or a finding that the company has broken
                the law. It is the start of a regulatory conversation. FDA
                may issue a <strong>close-out letter</strong> once it is
                satisfied that the company has corrected the cited issues.
              </p>
              <p>
                For compounded GLP-1 telehealth providers, the most common
                citations involve unapproved new drug claims, misbranding,
                and the use of bulk drug substances not on FDA&apos;s
                approved list under FDCA sections 503A and 503B.
              </p>
            </div>
          </section>

          {/* Cross-link */}
          {otherLetters.length > 0 && (
            <section className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-6 md:p-8 flex flex-col gap-4">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-text-primary">
                Other warning letters in our database
              </h2>
              <ul className="flex flex-col gap-2 text-sm">
                {otherLetters.map((l) => (
                  <li key={l.id}>
                    <Link
                      href={`/fda-warning-letters/${l.id}`}
                      className="text-brand-violet hover:underline"
                    >
                      {l.company_dba ?? l.company_name}
                    </Link>{" "}
                    <span className="text-brand-text-secondary">
                      — {formatDate(l.letter_date)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/fda-warning-letters"
                className="text-sm font-semibold text-brand-violet hover:underline"
              >
                View the full database →
              </Link>
            </section>
          )}

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
              The full text of this letter is available on fda.gov via the
              link above.
            </p>
          </section>

          <DYORCallout />
        </div>
      </main>
    </>
  );
}
