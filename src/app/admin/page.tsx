import type { Metadata } from "next";
import {
  getProviderClicks,
  getAllSourceClicks,
  getDailyClicks,
  type DailyClickEntry,
} from "@/lib/kv";

export const metadata: Metadata = {
  title: "Admin · Click Analytics",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isKvConfigured(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  );
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function formatDateLabel(date: string): string {
  // YYYY-MM-DD → "Mar 26"
  const d = new Date(date + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function AdminDashboardPage() {
  if (!isKvConfigured()) {
    return (
      <main className="min-h-screen bg-brand-gradient-light">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl border border-brand-violet/10 shadow-sm p-8">
            <h1 className="font-heading text-2xl font-bold text-brand-text-primary mb-3">
              Click Analytics
            </h1>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-900 leading-relaxed">
              <p className="font-semibold mb-2">Vercel KV is not configured.</p>
              <p>
                To enable click tracking analytics, create a Vercel KV store
                and add the following environment variables to your project:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>
                  <code className="font-mono">KV_REST_API_URL</code>
                </li>
                <li>
                  <code className="font-mono">KV_REST_API_TOKEN</code>
                </li>
              </ul>
              <p className="mt-3">
                Once configured, redeploy and refresh this page.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const [providerClicks, sourceClicks, daily30] = await Promise.all([
    getProviderClicks(),
    getAllSourceClicks(),
    getDailyClicks(30),
  ]);

  const totalClicks = Object.values(providerClicks).reduce(
    (a, b) => a + b,
    0
  );
  const uniqueProviders = Object.keys(providerClicks).length;

  const sortedSources = Object.entries(sourceClicks).sort(
    (a, b) => b[1] - a[1]
  );
  const topSource = sortedSources[0]?.[0] ?? "—";

  // Last 7 days slice (most recent 7 of the 30-day window)
  const last7: DailyClickEntry[] = daily30.slice(-7);
  const last7Total = last7.reduce((acc, d) => acc + d.total, 0);

  // Provider clicks in last 7 days
  const providerClicksLast7: Record<string, number> = {};
  for (const day of last7) {
    for (const [provider, count] of Object.entries(day.byProvider)) {
      providerClicksLast7[provider] =
        (providerClicksLast7[provider] ?? 0) + Number(count);
    }
  }

  const sortedProviders = Object.entries(providerClicks).sort(
    (a, b) => b[1] - a[1]
  );

  const maxDaily = Math.max(1, ...daily30.map((d) => d.total));
  const lastRefreshed = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const hasAnyData = totalClicks > 0;

  return (
    <main className="min-h-screen bg-brand-gradient-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <header className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary">
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Click Analytics
              </span>
            </h1>
            <p className="text-sm text-brand-text-secondary mt-1">
              Last refreshed {lastRefreshed}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-violet/10 shadow-sm text-xs font-semibold text-brand-text-secondary px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-success" />
            KV Connected
          </span>
        </header>

        {!hasAnyData && (
          <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-8 text-center">
            <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
              No clicks tracked yet
            </h2>
            <p className="text-brand-text-secondary text-sm">
              Click data will appear here once visitors start clicking
              affiliate links across the site.
            </p>
          </div>
        )}

        {/* Stat cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Clicks" value={formatNumber(totalClicks)} />
          <StatCard
            label="Unique Providers"
            value={formatNumber(uniqueProviders)}
          />
          <StatCard label="Top Source" value={topSource} />
          <StatCard label="Last 7 Days" value={formatNumber(last7Total)} />
        </section>

        {/* Daily chart */}
        <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-brand-text-primary">
              Daily Clicks (Last 30 Days)
            </h2>
            <span className="text-xs text-brand-text-secondary">
              Max: {formatNumber(maxDaily)}
            </span>
          </div>
          <div className="flex items-end gap-1 h-48">
            {daily30.map((day) => {
              const heightPct = (day.total / maxDaily) * 100;
              return (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center gap-1 group relative"
                >
                  <div
                    className="w-full rounded-t-md bg-brand-gradient transition-opacity hover:opacity-80 min-h-[2px]"
                    style={{ height: `${heightPct}%` }}
                    title={`${day.date}: ${day.total} clicks`}
                  />
                  <span className="absolute -bottom-5 text-[9px] text-brand-text-secondary/60 hidden sm:block">
                    {day.date.slice(-2)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-brand-text-secondary/70 mt-6">
            <span>{daily30[0] && formatDateLabel(daily30[0].date)}</span>
            <span>
              {daily30[daily30.length - 1] &&
                formatDateLabel(daily30[daily30.length - 1].date)}
            </span>
          </div>
        </section>

        {/* Top Providers Table */}
        <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading text-lg font-bold text-brand-text-primary">
              Top Providers
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                  <th className="py-3 px-5 text-left">Provider</th>
                  <th className="py-3 px-5 text-right">Total Clicks</th>
                  <th className="py-3 px-5 text-right">% of All</th>
                  <th className="py-3 px-5 text-right">Last 7 Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedProviders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-brand-text-secondary"
                    >
                      No provider clicks yet.
                    </td>
                  </tr>
                ) : (
                  sortedProviders.map(([provider, clicks]) => {
                    const pct =
                      totalClicks > 0
                        ? ((clicks / totalClicks) * 100).toFixed(1)
                        : "0.0";
                    return (
                      <tr
                        key={provider}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-5 font-semibold text-brand-text-primary">
                          {provider}
                        </td>
                        <td className="py-3 px-5 text-right font-bold text-brand-text-primary">
                          {formatNumber(clicks)}
                        </td>
                        <td className="py-3 px-5 text-right text-brand-text-secondary">
                          {pct}%
                        </td>
                        <td className="py-3 px-5 text-right text-brand-text-secondary">
                          {formatNumber(providerClicksLast7[provider] ?? 0)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Clicks by Source */}
        <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading text-lg font-bold text-brand-text-primary">
              Clicks by Source
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                  <th className="py-3 px-5 text-left">Source</th>
                  <th className="py-3 px-5 text-right">Click Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedSources.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="py-8 text-center text-brand-text-secondary"
                    >
                      No source data yet.
                    </td>
                  </tr>
                ) : (
                  sortedSources.map(([source, count]) => (
                    <tr
                      key={source}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-5 font-medium text-brand-text-primary">
                        {source}
                      </td>
                      <td className="py-3 px-5 text-right font-bold text-brand-text-primary">
                        {formatNumber(count)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold bg-brand-gradient bg-clip-text text-transparent break-words">
        {value}
      </p>
    </div>
  );
}
