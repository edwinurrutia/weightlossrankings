import type { Metadata } from "next";
import { getAuditLog, type AuditEntry } from "@/lib/audit-log";

export const metadata: Metadata = {
  title: "Admin · Audit Log",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  searchParams?: {
    filter?: string;
    page?: string;
  };
}

const FILTERS: { key: string; label: string; types: string[] }[] = [
  { key: "all", label: "All", types: [] },
  { key: "providers", label: "Providers", types: ["provider"] },
  { key: "content", label: "Content", types: ["blog_post", "state_content"] },
  { key: "verification", label: "Verification", types: ["verification"] },
  { key: "scraper", label: "Scraper", types: ["scraper_run"] },
];

const PAGE_SIZE = 100;

function isKvConfigured(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  );
}

function actionBadgeClass(action: string): string {
  switch (action) {
    case "create":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "update":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "delete":
      return "bg-red-50 text-red-700 border-red-200";
    case "approve":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "reject":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "verify":
      return "bg-violet-50 text-violet-700 border-violet-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

function formatTs(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return iso;
  }
}

export default async function AuditLogPage({ searchParams }: PageProps) {
  const filterKey = searchParams?.filter ?? "all";
  const page = Math.max(1, Number(searchParams?.page ?? 1));

  if (!isKvConfigured()) {
    return (
      <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-8">
        <h1 className="font-heading text-2xl font-bold text-brand-text-primary mb-3">
          Audit Log
        </h1>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-900">
          Vercel KV is not configured. Set <code>KV_REST_API_URL</code> and{" "}
          <code>KV_REST_API_TOKEN</code> to enable the audit log.
        </div>
      </div>
    );
  }

  // Fetch a generous window so we can filter + paginate client-side.
  const allEntries = await getAuditLog(1000);

  const activeFilter =
    FILTERS.find((f) => f.key === filterKey) ?? FILTERS[0];
  const filtered: AuditEntry[] =
    activeFilter.types.length === 0
      ? allEntries
      : allEntries.filter((e) => activeFilter.types.includes(e.resource_type));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageEntries = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
            Audit Log
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            {filtered.length.toLocaleString()} entries
            {activeFilter.key !== "all" && ` · filtered: ${activeFilter.label}`}
          </p>
        </div>
      </header>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = f.key === activeFilter.key;
          return (
            <a
              key={f.key}
              href={`/admin/audit-log?filter=${f.key}`}
              className={[
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                active
                  ? "bg-brand-gradient text-white border-transparent shadow-sm"
                  : "bg-white text-brand-text-primary border-brand-violet/15 hover:bg-brand-violet/5",
              ].join(" ")}
            >
              {f.label}
            </a>
          );
        })}
      </div>

      {pageEntries.length === 0 ? (
        <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-10 text-center">
          <h2 className="font-heading text-lg font-bold text-brand-text-primary mb-1">
            No audit entries yet
          </h2>
          <p className="text-sm text-brand-text-secondary">
            Admin writes will be recorded here as the CMS is used.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-[10px] uppercase tracking-wide">
                  <th className="py-2 px-4 text-left">Timestamp</th>
                  <th className="py-2 px-4 text-left">User</th>
                  <th className="py-2 px-4 text-left">Action</th>
                  <th className="py-2 px-4 text-left">Resource</th>
                  <th className="py-2 px-4 text-left">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pageEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 align-top">
                    <td className="py-2 px-4 font-mono text-[11px] text-brand-text-secondary whitespace-nowrap">
                      {formatTs(entry.timestamp)}
                    </td>
                    <td className="py-2 px-4 font-semibold text-brand-text-primary">
                      {entry.user}
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={[
                          "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                          actionBadgeClass(entry.action),
                        ].join(" ")}
                      >
                        {entry.action}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-brand-text-primary">
                      <div className="font-mono text-[11px] text-brand-text-secondary">
                        {entry.resource_type}
                      </div>
                      <div className="font-semibold">{entry.resource_id}</div>
                    </td>
                    <td className="py-2 px-4 text-brand-text-secondary">
                      <details>
                        <summary className="cursor-pointer text-brand-text-primary">
                          {entry.summary}
                        </summary>
                        {entry.diff && (
                          <pre className="mt-2 text-[10px] bg-gray-50 border border-gray-200 rounded-lg p-2 overflow-x-auto max-w-md">
                            {JSON.stringify(entry.diff, null, 2)}
                          </pre>
                        )}
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-brand-text-secondary">
          <span>
            Page {safePage} of {totalPages}
          </span>
          <div className="flex gap-2">
            {safePage > 1 && (
              <a
                href={`/admin/audit-log?filter=${activeFilter.key}&page=${safePage - 1}`}
                className="rounded-lg border border-brand-violet/15 bg-white px-3 py-1 font-semibold text-brand-text-primary hover:bg-brand-violet/5"
              >
                ← Prev
              </a>
            )}
            {safePage < totalPages && (
              <a
                href={`/admin/audit-log?filter=${activeFilter.key}&page=${safePage + 1}`}
                className="rounded-lg border border-brand-violet/15 bg-white px-3 py-1 font-semibold text-brand-text-primary hover:bg-brand-violet/5"
              >
                Next →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
