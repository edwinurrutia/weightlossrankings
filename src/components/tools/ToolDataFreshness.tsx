import { getToolBySlug } from "@/lib/tools";

interface ToolDataFreshnessProps {
  /** Tool slug exactly as it appears in src/lib/tools.ts TOOLS registry. */
  slug: string;
}

/**
 * Visible "Data last verified" footer used on every interactive tool
 * page. Reads from the TOOLS registry in src/lib/tools.ts so a single
 * data update propagates to:
 *   - This footer (visible to readers)
 *   - The sitemap.ts auto-iteration
 *   - The check:tool-freshness build-time validator
 *
 * The Wave 5 staleness audit identified the lack of a visible
 * freshness signal on tool pages as a credibility gap; this is the
 * fix.
 */
export default function ToolDataFreshness({ slug }: ToolDataFreshnessProps) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;
  const { lastVerified, nextReview, cadence, sourceSummary } = tool.dataFreshness;
  return (
    <footer className="mt-12 rounded-2xl border border-brand-violet/15 bg-brand-bg-purple p-5 text-sm text-brand-text-secondary">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="text-xs font-bold uppercase tracking-wide text-brand-violet">
          Data freshness
        </span>
        <span>
          Last verified <time dateTime={lastVerified}>{lastVerified}</time>
        </span>
        <span className="text-brand-text-secondary/70">·</span>
        <span>
          Next review <time dateTime={nextReview}>{nextReview}</time>
        </span>
        <span className="text-brand-text-secondary/70">·</span>
        <span>Cadence: {cadence}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed">
        Source: {sourceSummary}. The build fails if this date goes
        stale per the freshness check (
        <code className="text-brand-violet">npm run check:tool-freshness</code>
        ), so the value above is always current.
      </p>
    </footer>
  );
}
