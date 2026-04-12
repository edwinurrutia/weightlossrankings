/**
 * /authors/[slug] — author bio page.
 *
 * Why this exists:
 *
 *   YMYL E-E-A-T compliance requires that every author named on a
 *   medical content page have a verifiable bio destination a reader
 *   can click through to. Per Google's Search Quality Rater
 *   Guidelines, "information about the author or website creator
 *   should be easily accessible," including credentials relevant to
 *   the topic. A byline that doesn't link anywhere is treated as
 *   functionally anonymous.
 *
 *   This page emits two pieces of structured data:
 *
 *     1. ProfilePage — Schema.org type explicitly designed for
 *        author/profile pages. Required by Google's Profile Page
 *        rich result documentation.
 *     2. Person — nested as ProfilePage.mainEntity. Carries the
 *        author's identity, credentials, sameAs links to authoritative
 *        external profiles, knowsAbout subject areas, and worksFor
 *        relationship to Weight Loss Rankings.
 *
 *   Both schemas tie back to the Person reference used in the
 *   research article and provider review JSON-LD via the
 *   author.url field, so Google's Knowledge Graph can reconcile
 *   "the Eli Marsden writing this article" with "the Eli Marsden
 *   on this bio page."
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AUTHORS, getAuthorBySlug, type Author } from "@/data/authors";
import JsonLd from "@/components/shared/JsonLd";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.weightlossrankings.org";

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) {
    return { title: "Author Not Found" };
  }

  const title = `${author.name} — ${author.jobTitle} at Weight Loss Rankings`;
  const description = author.tagline;

  return {
    title,
    description,
    alternates: { canonical: `/authors/${author.slug}` },
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/authors/${author.slug}`,
      siteName: "Weight Loss Rankings",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function buildPersonSchema(author: Author): Record<string, unknown> {
  const personId = `${SITE_URL}/authors/${author.slug}#person`;
  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: author.name,
    url: `${SITE_URL}/authors/${author.slug}`,
    jobTitle: author.jobTitle,
    description: author.tagline,
    knowsAbout: author.knowsAbout,
    worksFor: {
      "@type": "Organization",
      name: "Weight Loss Rankings",
      url: SITE_URL,
    },
  };

  // sameAs only emitted when populated — don't ship empty arrays
  // (cleaner JSON-LD, fewer "warning: empty value" notes from
  // Google's Rich Results Test).
  if (author.sameAs.length > 0) {
    person.sameAs = author.sameAs;
  }

  // knowsLanguage is a meaningful E-E-A-T signal for sites with
  // multi-language corpora — Google treats first-party translation
  // (the same editor producing both languages) differently from
  // machine-translated content per the Helpful Content guidance.
  if (author.knowsLanguage && author.knowsLanguage.length > 0) {
    person.knowsLanguage = author.knowsLanguage;
  }

  // Medical credentials only emitted for licensed clinicians.
  // Industry expertise without a clinical license is described in
  // the bio body and the knowsAbout array, NOT as hasCredential —
  // hasCredential is reserved for actual licenses and degrees so
  // we don't accidentally imply clinical authority that doesn't
  // exist on the author.
  if (author.isClinician && author.medicalCredentials) {
    person.hasCredential = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Medical License",
      name: author.medicalCredentials,
    };
  }

  return person;
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) {
    notFound();
  }

  const personSchema = buildPersonSchema(author);

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/authors/${author.slug}`,
    url: `${SITE_URL}/authors/${author.slug}`,
    name: `${author.name} — ${author.jobTitle}`,
    description: author.tagline,
    mainEntity: personSchema,
  };

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Authors", url: "/authors" },
    { name: author.name, url: `/authors/${author.slug}` },
  ];

  // Get initials for avatar placeholder
  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <JsonLd data={profilePageSchema} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <main className="min-h-screen bg-white pb-24">
        <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">
          {/* Visible breadcrumb */}
          <nav className="text-sm text-brand-text-secondary" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-violet">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/authors" className="hover:text-brand-violet">
              Authors
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-text-primary">{author.name}</span>
          </nav>

          {/* Author header */}
          <header className="flex items-start gap-6">
            <div className="flex-shrink-0 w-24 h-24 rounded-full bg-brand-violet/10 border-2 border-brand-violet/20 flex items-center justify-center">
              <span className="font-heading text-2xl font-bold text-brand-violet">
                {initials}
              </span>
            </div>
            <div className="flex flex-col gap-2 min-w-0 flex-1">
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary tracking-tight">
                {author.name}
              </h1>
              <p className="text-base text-brand-text-secondary">
                {author.jobTitle}
                {author.medicalCredentials ? `, ${author.medicalCredentials}` : ""}
              </p>
              {!author.isClinician && (
                <p className="text-xs text-brand-text-secondary/80 italic">
                  Editorial role · not a licensed clinician
                </p>
              )}
            </div>
          </header>

          {/* Bio body */}
          <section className="prose prose-base max-w-none">
            {author.bio.split("\n\n").map((para, i) => (
              <p key={i} className="text-brand-text-primary leading-relaxed">
                {para}
              </p>
            ))}
          </section>

          {/* Subject expertise */}
          <section>
            <h2 className="font-heading text-lg font-bold text-brand-text-primary mb-3">
              Subject expertise
            </h2>
            <ul className="flex flex-wrap gap-2">
              {author.knowsAbout.map((subject) => (
                <li
                  key={subject}
                  className="text-xs font-semibold text-brand-violet bg-brand-violet/8 border border-brand-violet/15 rounded-full px-3 py-1.5"
                >
                  {subject}
                </li>
              ))}
            </ul>
          </section>

          {/* External profiles (only if populated) */}
          {author.sameAs.length > 0 && (
            <section>
              <h2 className="font-heading text-lg font-bold text-brand-text-primary mb-3">
                External profiles
              </h2>
              <ul className="flex flex-col gap-2">
                {author.sameAs.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-violet hover:underline"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Editorial standards anchor — links to the trust pages so
              every author bio is one click from the methodology that
              backs the byline. */}
          <section className="rounded-xl border border-brand-violet/15 bg-brand-violet/5 p-5 text-sm text-brand-text-secondary">
            <h2 className="font-heading text-base font-bold text-brand-text-primary mb-2">
              How {author.name} reviews content for Weight Loss Rankings
            </h2>
            <p className="leading-relaxed mb-3">
              Every research article and provider review goes through a
              structured verification workflow before publication. Clinical
              claims are sourced to FDA prescribing information,
              PubMed-indexed primary research, or named regulatory filings.
              Provider data is verified against the live provider page.
              Pricing is re-verified on a recurring cadence.
            </p>
            <p className="leading-relaxed">
              Read the full editorial process at{" "}
              <Link
                href="/editorial-policy"
                className="text-brand-violet underline underline-offset-2 hover:text-brand-blue"
              >
                /editorial-policy
              </Link>
              , the six-dimension scoring rubric at{" "}
              <Link
                href="/methodology"
                className="text-brand-violet underline underline-offset-2 hover:text-brand-blue"
              >
                /methodology
              </Link>
              , the corrections policy at{" "}
              <Link
                href="/corrections"
                className="text-brand-violet underline underline-offset-2 hover:text-brand-blue"
              >
                /corrections
              </Link>
              , and our affiliate disclosure at{" "}
              <Link
                href="/disclosure"
                className="text-brand-violet underline underline-offset-2 hover:text-brand-blue"
              >
                /disclosure
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
