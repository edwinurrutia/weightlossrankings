import { getCitation } from "@/lib/citations";

interface CitationProps {
  /**
   * Registered citation id from src/lib/citations.ts.
   * The component links to #source-{id} on the current page, which
   * SourcesPanel renders as the matching anchor target.
   */
  source: string;
  /**
   * Display number shown inside the superscript bracket, e.g. [1].
   * When omitted the raw id is shown — always pass a number for
   * human-readable output.
   */
  n?: number;
}

/**
 * Inline superscript footnote that links to the matching entry inside a
 * nearby <SourcesPanel />.
 *
 * Usage:
 *   <Citation source="cdc-brfss-obesity" n={1} />
 *
 * Renders:
 *   <sup><a href="#source-cdc-brfss-obesity">[1]</a></sup>
 *
 * This component is intentionally stateless so it is safe to render
 * server-side inside any React Server Component.
 */
export default function Citation({ source, n }: CitationProps) {
  // Validate at build/request time — surfaces typos immediately.
  getCitation(source);

  const label = n !== undefined ? `[${n}]` : `[${source}]`;

  return (
    <sup className="ml-0.5">
      <a
        href={`#source-${source}`}
        className="text-brand-violet hover:underline font-semibold text-[0.7em]"
        aria-label={`See source${n !== undefined ? ` ${n}` : ""}`}
      >
        {label}
      </a>
    </sup>
  );
}
