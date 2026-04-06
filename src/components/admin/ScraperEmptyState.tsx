import Link from "next/link";

export default function ScraperEmptyState() {
  return (
    <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-8">
      <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
        No scraper reports yet
      </h2>
      <p className="text-sm text-brand-text-secondary leading-relaxed">
        Generate the first report by running the scraper locally:
      </p>
      <pre className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs font-mono overflow-x-auto">
        npm run scrape:fast
      </pre>
      <p className="mt-3 text-sm text-brand-text-secondary">
        The script writes a JSON report to{" "}
        <code className="font-mono text-xs">docs/scraper-report-YYYY-MM-DD.json</code>
        . Commit and push it, and this page will populate.
      </p>
      <p className="mt-4 text-sm">
        In the meantime, you can{" "}
        <Link
          href="/admin/providers"
          className="text-brand-violet font-semibold hover:underline"
        >
          verify providers manually →
        </Link>
      </p>
    </div>
  );
}
