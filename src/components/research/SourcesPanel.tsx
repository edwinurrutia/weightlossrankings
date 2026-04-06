import Link from "next/link";
import { getCitation } from "@/lib/citations";
import type { CitationEntry } from "@/lib/citations";

interface SourcesPanelProps {
  /**
   * Ordered list of citation ids to display. Ids are validated against the
   * registry at render time — unknown ids throw so typos surface early.
   */
  sourceIds: string[];
  /**
   * Optional label for the summary row.
   * Defaults to "Sources & methodology".
   */
  heading?: string;
  /**
   * Optional "data as of" stamp. Accepts either an ISO YYYY-MM-DD string
   * (which is reformatted to "Month YYYY") or any free-form string.
   * Per editorial policy, only the month + year are shown to readers — the
   * exact day is internal-only.
   */
  dataAsOf?: string;
  /**
   * When true the <details> element starts open.
   * Defaults to false (collapsed).
   */
  defaultOpen?: boolean;
}

function sourceUrl(entry: CitationEntry): string {
  if (entry.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${entry.pmid}/`;
  if (entry.doi) return `https://doi.org/${entry.doi}`;
  return entry.url;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Format an ISO YYYY-MM-DD into "Month YYYY". Falls back to the input if it
 * doesn't look like an ISO date so callers can pass already-friendly labels.
 */
function formatMonthYear(value?: string): string | null {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})(?:-\d{2})?$/.exec(value);
  if (!m) return value;
  const year = Number(m[1]);
  const monthIdx = Number(m[2]) - 1;
  if (monthIdx < 0 || monthIdx > 11) return value;
  return `${MONTH_NAMES[monthIdx]} ${year}`;
}

/**
 * Collapsible "Sources" disclosure block.
 *
 * Accepts an ordered list of citation ids from the central registry and
 * renders each source with its full details, a freshness stamp, and a live
 * link to the primary source URL. Uses a native <details> element so no
 * client-side JavaScript is needed.
 *
 * Usage:
 *   <SourcesPanel
 *     sourceIds={["cdc-brfss-obesity", "kff-medicaid-obesity-drug-coverage"]}
 *     dataAsOf="Q1 2026"
 *   />
 */
export default function SourcesPanel({
  sourceIds,
  heading = "Sources & methodology",
  dataAsOf,
  defaultOpen = false,
}: SourcesPanelProps) {
  if (sourceIds.length === 0) return null;

  const entries = sourceIds.map((id) => getCitation(id));
  const dataAsOfLabel = formatMonthYear(dataAsOf);

  return (
    <details
      open={defaultOpen || undefined}
      className="group mt-5 rounded-xl border border-brand-violet/10 bg-brand-violet/[0.02] px-4 py-3"
    >
      <summary className="text-xs font-semibold text-brand-text-secondary cursor-pointer list-none flex items-center justify-between gap-2 select-none">
        <span>
          {heading}
          {dataAsOfLabel ? ` — as of ${dataAsOfLabel}` : ""}
        </span>
        <span
          aria-hidden
          className="text-brand-violet text-base group-open:rotate-180 transition-transform"
        >
          &#8964;
        </span>
      </summary>

      <ol className="mt-3 flex flex-col gap-2.5 text-xs text-brand-text-secondary leading-relaxed">
        {entries.map((entry, i) => {
          const url = sourceUrl(entry);
          const isInternal = url.startsWith("/");

          return (
            <li
              key={entry.id}
              id={`source-${entry.id}`}
              className="flex gap-2"
            >
              <span className="font-mono font-bold text-brand-text-primary shrink-0">
                {i + 1}.
              </span>
              <span>
                {isInternal ? (
                  <Link
                    href={url}
                    className="text-brand-violet hover:underline"
                  >
                    {entry.label}
                  </Link>
                ) : (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-violet hover:underline break-all"
                  >
                    {entry.label}
                  </a>
                )}
                <span className="text-brand-text-secondary/60 ml-1">
                  — {entry.publisher}.
                </span>
                {entry.pmid && (
                  <span className="ml-1 text-brand-text-secondary/60">
                    PMID:{" "}
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${entry.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-violet hover:underline"
                    >
                      {entry.pmid}
                    </a>
                    .
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </details>
  );
}
