import type { Metadata } from "next";
import Link from "next/link";
import { getAllCitations } from "@/lib/citations";
import type { CitationCategory, CitationEntry } from "@/lib/citations";

export const metadata: Metadata = {
  title: "Sources & Methodology",
  description:
    "Every external claim on Weight Loss Rankings traces back to a primary source. Browse our full citation registry — clinical trials, FDA regulatory documents, CDC statistics, and manufacturer pricing data.",
  alternates: { canonical: "/sources" },
  openGraph: {
    title: "Sources & Methodology | Weight Loss Rankings",
    description:
      "Our complete citation registry: clinical trials, FDA regulatory documents, CDC statistics, and manufacturer pricing data behind every claim on this site.",
  },
};

const CATEGORY_LABELS: Record<CitationCategory, string> = {
  "clinical-trial": "Clinical Trials",
  regulatory: "Regulatory & FDA",
  statistics: "Statistics & Epidemiology",
  pricing: "Pricing & Cost Data",
  guideline: "Clinical Guidelines",
};

const CATEGORY_DESCRIPTIONS: Record<CitationCategory, string> = {
  "clinical-trial":
    "Peer-reviewed randomized controlled trials and outcome studies published in indexed medical journals.",
  regulatory:
    "U.S. Food and Drug Administration guidance documents, warning letters, drug shortage listings, and compounding regulations.",
  statistics:
    "Government and non-profit epidemiological datasets covering obesity prevalence, Medicaid coverage, and health insurance policy.",
  pricing:
    "Manufacturer-published list prices, patient-assistance program rates, and our own independently collected provider pricing dataset.",
  guideline:
    "Professional society and regulatory treatment guidelines that inform our editorial standards.",
};

function sourceUrl(entry: CitationEntry): string {
  if (entry.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${entry.pmid}/`;
  if (entry.doi) return `https://doi.org/${entry.doi}`;
  return entry.url;
}

function CategorySection({
  category,
  entries,
}: {
  category: CitationCategory;
  entries: CitationEntry[];
}) {
  if (entries.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-1">
        {CATEGORY_LABELS[category]}
      </h2>
      <p className="text-sm text-brand-text-secondary mb-5">
        {CATEGORY_DESCRIPTIONS[category]}
      </p>
      <div className="flex flex-col gap-3">
        {entries.map((entry) => {
          const url = sourceUrl(entry);
          const isInternal = url.startsWith("/");

          return (
            <div
              key={entry.id}
              id={`source-${entry.id}`}
              className="rounded-xl border border-brand-violet/10 bg-white px-5 py-4 hover:border-brand-violet/25 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {isInternal ? (
                    <Link
                      href={url}
                      className="font-semibold text-brand-text-primary hover:text-brand-violet transition-colors text-sm leading-snug"
                    >
                      {entry.label}
                    </Link>
                  ) : (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-text-primary hover:text-brand-violet transition-colors text-sm leading-snug break-words"
                    >
                      {entry.label}
                      <span
                        aria-hidden
                        className="ml-1 text-brand-violet text-xs"
                      >
                        ↗
                      </span>
                    </a>
                  )}
                  <p className="mt-0.5 text-xs text-brand-text-secondary">
                    {entry.publisher}
                  </p>
                  {entry.pmid && (
                    <p className="mt-0.5 text-xs text-brand-text-secondary">
                      PubMed:{" "}
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${entry.pmid}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-violet hover:underline font-mono"
                      >
                        {entry.pmid}
                      </a>
                      {entry.doi && (
                        <>
                          {" "}· DOI:{" "}
                          <a
                            href={`https://doi.org/${entry.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-violet hover:underline font-mono break-all"
                          >
                            {entry.doi}
                          </a>
                        </>
                      )}
                    </p>
                  )}
                </div>
                <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 sm:items-end shrink-0 mt-1 sm:mt-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-text-secondary bg-brand-violet/5 px-2 py-0.5 rounded-full">
                    {CATEGORY_LABELS[entry.category]}
                  </span>
                  <span className="text-[10px] text-brand-text-secondary whitespace-nowrap">
                    Data year: {entry.dataYear}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function SourcesPage() {
  const all = getAllCitations();

  // Group by category preserving the sort order from getAllCitations()
  const grouped = new Map<CitationCategory, CitationEntry[]>();
  for (const entry of all) {
    const existing = grouped.get(entry.category) ?? [];
    existing.push(entry);
    grouped.set(entry.category, existing);
  }

  const totalSources = all.length;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-3">
          Editorial Standards
        </p>
        <h1
          className="font-heading font-black text-brand-text-primary tracking-tight leading-tight mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
        >
          Sources &amp; Methodology
        </h1>
        <p className="text-base text-brand-text-secondary leading-relaxed">
          Weight Loss Rankings is an independent editorial site. Every
          statistical claim, pricing figure, and clinical reference on this
          site traces back to a primary source listed here. We do not cite
          secondary summaries when a primary source is available.
        </p>
        <p className="mt-4 text-base text-brand-text-secondary leading-relaxed">
          Our pricing data is collected directly from telehealth provider
          websites and updated continuously. Manufacturer list prices (Wegovy,
          Ozempic, Zepbound, Mounjaro) are pulled from official patient
          assistance program pages. Clinical data comes exclusively from
          peer-reviewed trials published in indexed journals.
        </p>
        <p className="mt-4 text-base text-brand-text-secondary leading-relaxed">
          For a full explanation of how we score and rank providers, see our{" "}
          <Link href="/methodology" className="text-brand-violet hover:underline font-semibold">
            Methodology page
          </Link>
          . For affiliate and commercial disclosure, see our{" "}
          <Link href="/disclosure" className="text-brand-violet hover:underline font-semibold">
            Disclosure page
          </Link>
          .
        </p>

        {/* Summary badge */}
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-violet bg-brand-violet/8 px-4 py-2 rounded-full">
          <span>{totalSources} primary sources tracked</span>
        </div>
      </div>

      {/* Category sections */}
      {(Array.from(grouped.entries()) as [CitationCategory, CitationEntry[]][]).map(
        ([category, entries]) => (
          <CategorySection
            key={category}
            category={category}
            entries={entries}
          />
        )
      )}

      {/* Footer note */}
      <div className="mt-8 pt-8 border-t border-brand-violet/10 text-xs text-brand-text-secondary leading-relaxed">
        <p>
          <strong className="text-brand-text-primary">Reporting a broken link or outdated source?</strong>{" "}
          Please{" "}
          <Link href="/contact" className="text-brand-violet hover:underline">
            contact us
          </Link>{" "}
          and we will verify and update the registry within 5 business days.
          Source URLs are re-verified by the editorial team monthly.
        </p>
      </div>
    </main>
  );
}
