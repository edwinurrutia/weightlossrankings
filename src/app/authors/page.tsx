/**
 * /authors — index page listing every named editorial contributor.
 *
 * The /authors index gives Google's crawler and any human reader a
 * canonical entry point that lists everyone who's bylined on the
 * site. Every per-article byline links to /authors/[slug], and the
 * /authors index links back to each individual bio page — closing
 * the loop so the author entities are mutually reinforcing in the
 * site's link graph.
 *
 * For YMYL E-E-A-T this is a small but meaningful signal: a site
 * with a real editorial team has a real /authors page. Sites that
 * publish anonymously do not.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { AUTHORS } from "@/data/authors";
import JsonLd from "@/components/shared/JsonLd";
import BreadcrumbSchema from "@/components/marketing/BreadcrumbSchema";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

export const metadata: Metadata = {
  title: "Editorial Team — Weight Loss Rankings",
  description:
    "Meet the editorial team behind Weight Loss Rankings. Independent rankings, primary-source verification, and transparent disclosure.",
  alternates: { canonical: "/authors" },
  openGraph: {
    title: "Editorial Team — Weight Loss Rankings",
    description:
      "Meet the editorial team behind Weight Loss Rankings. Independent rankings, primary-source verification, and transparent disclosure.",
    type: "website",
    url: "/authors",
    siteName: "Weight Loss Rankings",
  },
  twitter: { card: "summary" },
};

export default function AuthorsIndexPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Editorial Team",
    description:
      "Authors and editorial contributors at Weight Loss Rankings.",
    url: `${SITE_URL}/authors`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Weight Loss Rankings",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: AUTHORS.map((author, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/authors/${author.slug}`,
        name: author.name,
        item: {
          "@type": "Person",
          "@id": `${SITE_URL}/authors/${author.slug}#person`,
          name: author.name,
          jobTitle: author.jobTitle,
          url: `${SITE_URL}/authors/${author.slug}`,
        },
      })),
    },
  };

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Authors", url: "/authors" },
  ];

  return (
    <>
      <JsonLd data={collectionSchema} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <main className="min-h-screen bg-white pb-24">
        <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-10">
          {/* Visible breadcrumb */}
          <nav className="text-sm text-brand-text-secondary" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-violet">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-text-primary">Authors</span>
          </nav>

          {/* Page header */}
          <header className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold">
              Editorial Team
            </p>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-brand-text-primary tracking-tight">
              Who writes Weight Loss Rankings
            </h1>
            <p className="text-base text-brand-text-secondary leading-relaxed max-w-2xl">
              Every research article and provider review on this site is
              attributed to a named human editor. Click any author to see
              their full bio, subject expertise, and disclosed conflicts of
              interest.
            </p>
          </header>

          {/* Author cards */}
          <ul className="grid gap-6 sm:grid-cols-2">
            {AUTHORS.map((author) => {
              const initials = author.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              return (
                <li key={author.slug}>
                  <Link
                    href={`/authors/${author.slug}`}
                    className="group block rounded-2xl border border-gray-200 hover:border-brand-violet/40 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-violet/10 border-2 border-brand-violet/20 flex items-center justify-center">
                        <span className="font-heading text-lg font-bold text-brand-violet">
                          {initials}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <h2 className="font-heading text-xl font-bold text-brand-text-primary group-hover:text-brand-violet transition-colors leading-tight">
                          {author.name}
                          {author.medicalCredentials
                            ? `, ${author.medicalCredentials}`
                            : ""}
                        </h2>
                        <p className="text-sm text-brand-text-secondary">
                          {author.jobTitle}
                        </p>
                        {!author.isClinician && (
                          <p className="text-[11px] text-brand-text-secondary/80 italic">
                            Editorial role · not a licensed clinician
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-brand-text-secondary leading-relaxed line-clamp-3">
                      {author.tagline}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hiring callout — honest disclosure that we are seeking
              a credentialed clinician for medical review. Per Google's
              YMYL framework, transparent disclosure of gaps is a
              stronger trust signal than hiding them. The role is
              listed on the /careers page as a freelance/consultant
              engagement, not a full-time position — both pages
              reference each other so the messaging stays consistent. */}
          <section className="rounded-xl border border-brand-violet/15 bg-brand-violet/5 p-6">
            <h2 className="font-heading text-lg font-bold text-brand-text-primary mb-2">
              We are seeking a credentialed medical reviewer
            </h2>
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              Weight Loss Rankings is actively looking to add a licensed
              clinician (MD, PharmD, NP, RN, or RD) to the editorial team
              as a freelance medical reviewer. Until that role is filled,
              all clinical content is editorially reviewed against primary
              sources (FDA prescribing information, PubMed-indexed
              research, regulatory filings) but is not clinically reviewed
              by a licensed practitioner.{" "}
              <Link
                href="/careers"
                className="text-brand-violet underline underline-offset-2 hover:text-brand-blue"
              >
                See the open role on our Careers page
              </Link>{" "}
              for details, compensation model, and how to apply.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
