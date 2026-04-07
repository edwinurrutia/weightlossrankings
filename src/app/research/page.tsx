import type { Metadata } from "next";
import Link from "next/link";
import { RESEARCH_ARTICLES } from "@/lib/research";

export const metadata: Metadata = {
  title:
    "Research — Original Data & Scientific Deep-Dives on GLP-1 Weight Loss",
  description:
    "Independent data investigations and scientific deep-dives on GLP-1 weight loss medications. PubMed-cited, regularly updated, and built on a live dataset of 80+ telehealth providers.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research — Weight Loss Rankings",
    description:
      "Original data investigations and PubMed-cited scientific deep-dives on GLP-1 weight loss medications.",
    type: "website",
  },
};

const KIND_LABEL: Record<string, string> = {
  "data-investigation": "Data investigation",
  "scientific-deep-dive": "Scientific deep-dive",
};

export default function ResearchIndexPage() {
  const articles = [...RESEARCH_ARTICLES].sort((a, b) =>
    b.publishedDate.localeCompare(a.publishedDate),
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Language switcher */}
      <div className="mb-6 text-xs">
        <Link
          href="/es/research"
          className="text-brand-violet hover:underline font-semibold"
        >
          Disponible en Español →
        </Link>
      </div>

      {/* Header */}
      <header className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Research
        </p>
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.05]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          Original data &amp; PubMed-cited science on GLP-1 weight loss.
        </h1>
        <p className="mt-6 text-lg text-brand-text-secondary leading-relaxed">
          We track every major GLP-1 telehealth provider in the United States
          and publish two kinds of long-form pieces: data investigations using
          our live dataset, and PubMed-cited scientific deep-dives on the
          studies that actually matter. Both update as the underlying data
          changes.
        </p>
      </header>

      {/* Article list */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/research/${a.slug}`}
              className="group block h-full rounded-3xl border border-brand-violet/15 bg-white p-7 shadow-sm hover:shadow-md hover:border-brand-violet/40 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-brand-violet">
                  {KIND_LABEL[a.kind]}
                </span>
                <span className="text-[10px] text-brand-text-secondary">
                  {a.readMinutes} min · {a.citations} sources
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-brand-text-primary leading-tight tracking-tight group-hover:text-brand-violet transition-colors">
                {a.title}
              </h2>
              <p className="mt-3 text-sm text-brand-text-secondary leading-relaxed">
                {a.excerpt}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {a.tags.map((t) => (
                  <li
                    key={t}
                    className="text-[10px] font-semibold text-brand-text-secondary bg-brand-violet/[0.06] border border-brand-violet/10 rounded-full px-2 py-0.5"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-brand-violet">
                Read the analysis
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Editorial note */}
      <section className="mt-16 rounded-3xl border border-brand-violet/15 bg-brand-violet/[0.04] p-8 sm:p-10">
        <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-3">
          How we work
        </h2>
        <p className="text-sm text-brand-text-secondary leading-relaxed max-w-3xl">
          Every data point in our investigations is verified directly against
          provider websites, and the dataset updates continuously. Every
          scientific deep-dive cites primary literature from PubMed, the FDA,
          or peer-reviewed clinical trials — never blog summaries or
          marketing pages. Articles are reviewed and revised whenever the
          underlying evidence base changes.
        </p>
        <p className="mt-4 text-sm text-brand-text-secondary leading-relaxed max-w-3xl">
          We do not sell or recommend specific medical treatments — talk to a
          licensed clinician before starting any medication.{" "}
          <Link
            href="/methodology"
            className="text-brand-violet font-semibold hover:underline"
          >
            Read our full methodology →
          </Link>
        </p>
      </section>
    </main>
  );
}
