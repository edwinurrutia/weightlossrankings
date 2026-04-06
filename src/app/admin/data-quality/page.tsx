import type { Metadata } from "next";
import { getValidationReport } from "@/lib/data";

export const metadata: Metadata = {
  title: "Data Quality — Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "default" | "success" | "danger" | "warning" | "orange";
}) {
  const toneClasses: Record<string, string> = {
    default: "border-brand-violet/10 text-brand-text-primary",
    success: "border-brand-success/30 text-brand-success",
    danger: "border-red-200 text-red-600",
    warning: "border-yellow-200 text-yellow-600",
    orange: "border-orange-200 text-orange-600",
  };
  return (
    <div
      className={`bg-white rounded-2xl border ${toneClasses[tone]} shadow-sm p-5 flex flex-col gap-1`}
    >
      <span className="text-xs uppercase tracking-wide text-brand-text-secondary font-semibold">
        {label}
      </span>
      <span className="font-heading text-3xl font-bold">{value}</span>
    </div>
  );
}

export default async function DataQualityPage() {
  const report = await getValidationReport();
  const refreshedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <main className="min-h-screen bg-brand-gradient-light">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8">
        <header className="flex flex-col gap-1">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-text-primary">
            Data Quality
          </h1>
          <p className="text-sm text-brand-text-secondary">
            Last refreshed: {refreshedAt}
          </p>
        </header>

        {/* Overview cards */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Total" value={report.total} tone="default" />
          <StatCard label="Valid" value={report.valid} tone="success" />
          <StatCard label="Invalid" value={report.invalid} tone="danger" />
          <StatCard label="Stale" value={report.stale.length} tone="orange" />
          <StatCard
            label="Unverified"
            value={report.unverified.length}
            tone="warning"
          />
        </section>

        {/* Issues table */}
        {report.issues.length > 0 && (
          <section className="bg-white rounded-2xl border border-red-200 shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-red-600">
              Validation Errors ({report.issues.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-2 pr-4 font-semibold text-brand-text-primary">
                      Name
                    </th>
                    <th className="py-2 pr-4 font-semibold text-brand-text-primary">
                      Slug
                    </th>
                    <th className="py-2 font-semibold text-brand-text-primary">
                      Errors
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {report.issues.map((issue) => (
                    <tr
                      key={issue.slug}
                      className="border-b border-gray-50 last:border-0 align-top"
                    >
                      <td className="py-2.5 pr-4 font-medium text-brand-text-primary">
                        {issue.name}
                      </td>
                      <td className="py-2.5 pr-4 text-brand-text-secondary font-mono text-xs">
                        {issue.slug}
                      </td>
                      <td className="py-2.5 text-red-600">
                        <ul className="flex flex-col gap-1">
                          {issue.errors.map((err, i) => (
                            <li key={i} className="text-xs">
                              {err}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Unverified table */}
        {report.unverified.length > 0 && (
          <section className="bg-white rounded-2xl border border-yellow-200 shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-yellow-600">
              Unverified ({report.unverified.length})
            </h2>
            <p className="text-sm text-brand-text-secondary">
              Providers with no verification metadata.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-2 pr-4 font-semibold text-brand-text-primary">
                      Name
                    </th>
                    <th className="py-2 font-semibold text-brand-text-primary">
                      Slug
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {report.unverified.map((p) => (
                    <tr
                      key={p.slug}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="py-2.5 pr-4 font-medium text-brand-text-primary">
                        {p.name}
                      </td>
                      <td className="py-2.5 text-brand-text-secondary font-mono text-xs">
                        {p.slug}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Stale table */}
        {report.stale.length > 0 && (
          <section className="bg-white rounded-2xl border border-orange-200 shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-orange-600">
              Stale ({report.stale.length})
            </h2>
            <p className="text-sm text-brand-text-secondary">
              Verified more than 30 days ago, oldest first.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-2 pr-4 font-semibold text-brand-text-primary">
                      Name
                    </th>
                    <th className="py-2 pr-4 font-semibold text-brand-text-primary">
                      Slug
                    </th>
                    <th className="py-2 pr-4 font-semibold text-brand-text-primary">
                      Last verified
                    </th>
                    <th className="py-2 font-semibold text-brand-text-primary">
                      Days
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {report.stale.map((p) => (
                    <tr
                      key={p.slug}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="py-2.5 pr-4 font-medium text-brand-text-primary">
                        {p.name}
                      </td>
                      <td className="py-2.5 pr-4 text-brand-text-secondary font-mono text-xs">
                        {p.slug}
                      </td>
                      <td className="py-2.5 pr-4 text-brand-text-secondary">
                        {p.last_verified}
                      </td>
                      <td className="py-2.5 font-semibold text-orange-600">
                        {p.days_since_verified}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Recently verified */}
        {report.recently_verified.length > 0 && (
          <section className="bg-white rounded-2xl border border-brand-success/30 shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold text-brand-success">
              Recently Verified ({report.recently_verified.length})
            </h2>
            <p className="text-sm text-brand-text-secondary">
              Verified within the last 7 days.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-2 pr-4 font-semibold text-brand-text-primary">
                      Name
                    </th>
                    <th className="py-2 pr-4 font-semibold text-brand-text-primary">
                      Slug
                    </th>
                    <th className="py-2 font-semibold text-brand-text-primary">
                      Last verified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {report.recently_verified.map((p) => (
                    <tr
                      key={p.slug}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="py-2.5 pr-4 font-medium text-brand-text-primary">
                        {p.name}
                      </td>
                      <td className="py-2.5 pr-4 text-brand-text-secondary font-mono text-xs">
                        {p.slug}
                      </td>
                      <td className="py-2.5 text-brand-text-secondary">
                        {p.last_verified}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
