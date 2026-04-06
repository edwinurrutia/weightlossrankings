import type { Metadata } from "next";
import Link from "next/link";
import ScraperRunSummary from "@/components/admin/ScraperRunSummary";
import MismatchRow from "@/components/admin/MismatchRow";
import ScraperEmptyState from "@/components/admin/ScraperEmptyState";
import { readLatestScraperReport } from "@/lib/scraper-report";

export const metadata: Metadata = {
  title: "Scraper Review · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return iso;
  }
}

export default function ScraperReviewPage() {
  const latest = readLatestScraperReport();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            Scraper Review Queue
          </span>
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Triage scraper output: approve mismatches, mark verified, or ignore.
        </p>
      </header>

      {!latest ? (
        <ScraperEmptyState />
      ) : (
        <>
          <ScraperRunSummary
            generatedAt={latest.report.generated_at}
            filename={latest.filename}
            total={latest.report.summary.total}
            matched={latest.report.summary.matched}
            mismatched={latest.report.summary.mismatched}
            noData={latest.report.summary.no_data}
            failed={latest.report.summary.failed}
          />

          <MismatchSection results={latest.report.results} />
          <NoDataSection results={latest.report.results} />
          <FailedSection results={latest.report.results} />
          <MatchedSection results={latest.report.results} />
        </>
      )}
    </div>
  );
}

import type { ScraperResult } from "@/lib/scraper-report";

function MismatchSection({ results }: { results: ScraperResult[] }) {
  const mismatches = results.filter((r) => r.match_status === "mismatch");
  if (mismatches.length === 0) return null;

  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-heading text-lg font-bold text-red-700">
          ⚠ Mismatches — high priority ({mismatches.length})
        </h2>
      </div>
      <div className="space-y-3">
        {mismatches.map((r) => (
          <MismatchRow
            key={r.slug}
            slug={r.slug}
            name={r.name}
            url={r.url}
            storedPrices={r.stored_prices}
            foundPrices={r.found_prices}
          />
        ))}
      </div>
    </section>
  );
}

function NoDataSection({ results }: { results: ScraperResult[] }) {
  const noData = results.filter((r) => r.match_status === "no_data_found");
  if (noData.length === 0) return null;

  return (
    <section>
      <h2 className="font-heading text-lg font-bold text-amber-700 mb-3">
        ⚑ No price data found ({noData.length})
      </h2>
      <div className="space-y-3">
        {noData.map((r) => (
          <div
            key={r.slug}
            className="rounded-xl border border-amber-200 bg-amber-50/40 p-5"
          >
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <p className="font-bold text-brand-text-primary">{r.name}</p>
                <p className="text-xs text-brand-text-secondary font-mono">
                  {r.slug}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-amber-300 bg-white text-xs font-bold text-brand-text-primary px-3 py-2 hover:bg-amber-50"
                >
                  Open site →
                </a>
                <Link
                  href={`/admin/providers/${r.slug}/edit`}
                  className="inline-flex items-center rounded-lg bg-brand-violet text-white text-xs font-bold px-3 py-2 hover:opacity-90"
                >
                  Manually verify
                </Link>
              </div>
            </div>
            {r.fetched_urls.length > 0 && (
              <div className="mt-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-text-secondary mb-1">
                  URLs tried
                </p>
                <ul className="text-xs space-y-0.5">
                  {r.fetched_urls.map((u) => (
                    <li key={u} className="font-mono text-brand-text-secondary truncate">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-3 text-xs text-amber-900">{r.diff}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FailedSection({ results }: { results: ScraperResult[] }) {
  const failed = results.filter((r) => r.match_status === "fetch_failed");
  if (failed.length === 0) return null;

  return (
    <section>
      <h2 className="font-heading text-lg font-bold text-gray-700 mb-3">
        ✕ Failed fetches ({failed.length})
      </h2>
      <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-brand-text-secondary text-xs uppercase tracking-wide">
              <th className="py-2 px-4 text-left">Provider</th>
              <th className="py-2 px-4 text-left">Error</th>
              <th className="py-2 px-4 text-left">Last attempt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {failed.map((r) => (
              <tr key={r.slug}>
                <td className="py-2 px-4 font-semibold text-brand-text-primary">
                  {r.name}
                  <span className="ml-2 font-mono text-xs text-brand-text-secondary">
                    {r.slug}
                  </span>
                </td>
                <td className="py-2 px-4 text-xs text-red-700">
                  {r.error ?? r.diff ?? "Unknown error"}
                </td>
                <td className="py-2 px-4 text-xs text-brand-text-secondary">
                  {formatTimestamp(r.fetched_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MatchedSection({ results }: { results: ScraperResult[] }) {
  const matched = results.filter((r) => r.match_status === "match");
  if (matched.length === 0) return null;

  return (
    <section>
      <details className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
        <summary className="cursor-pointer font-heading text-lg font-bold text-emerald-700">
          ✓ Successfully verified ({matched.length})
        </summary>
        <ul className="mt-3 space-y-1 text-sm">
          {matched.map((r) => (
            <li key={r.slug} className="flex justify-between gap-4">
              <span className="font-semibold text-brand-text-primary">
                {r.name}
                <span className="ml-2 font-mono text-xs text-brand-text-secondary">
                  {r.slug}
                </span>
              </span>
              <span className="text-xs text-emerald-800">{r.diff}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
