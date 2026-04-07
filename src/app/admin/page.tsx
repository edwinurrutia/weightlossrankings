import type { Metadata } from "next";
import Link from "next/link";
import {
  getProviderClicks,
  getAllSourceClicks,
  getDailyClicks,
  getAllPositionClicks,
  getUniqueVisitorsToday,
  getUniqueVisitorsByProvider,
  getUniqueVisitorsBySource,
  getCountryClicks,
  getRegionClicks,
  getSourceProviderPairs,
  getHourHeatmap,
  type DailyClickEntry,
} from "@/lib/kv";
import { getCurrentAdminUser } from "@/lib/admin-users";

export const metadata: Metadata = {
  title: "Admin · Click Analytics",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isKvConfigured(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
  );
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function formatDateLabel(date: string): string {
  const d = new Date(date + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Range options — keeping these as a const-array so the URL parser
// stays a single source of truth and the chips below can map over it.
// `days` is how many days back from "now" the range covers. For
// "today" and "yesterday" the day-based math still works because
// `getDailyClicks(1)` returns only today and `getDailyClicks(2)`
// returns today + yesterday; we handle the yesterday-specific slice
// below.
const RANGE_OPTIONS = [
  { key: "today", label: "Today", days: 1 },
  { key: "yesterday", label: "Yesterday", days: 2 },
  { key: "7d", label: "7d", days: 7 },
  { key: "30d", label: "30d", days: 30 },
  { key: "90d", label: "90d", days: 90 },
  { key: "all", label: "All", days: 365 },
] as const;

type RangeKey = (typeof RANGE_OPTIONS)[number]["key"];

function parseRange(raw: string | string[] | undefined): RangeKey {
  const r = Array.isArray(raw) ? raw[0] : raw;
  const found = RANGE_OPTIONS.find((o) => o.key === r);
  return (found?.key ?? "30d") as RangeKey;
}

function rangeDays(key: RangeKey): number {
  return RANGE_OPTIONS.find((o) => o.key === key)?.days ?? 30;
}

function rangeLabel(key: RangeKey): string {
  if (key === "today") return "today";
  if (key === "yesterday") return "yesterday";
  if (key === "all") return "all-time";
  return `last ${key}`;
}

function comparisonLabel(key: RangeKey): string {
  if (key === "today") return "yesterday";
  if (key === "yesterday") return "day before";
  if (key === "all") return "period";
  return key;
}

// ISO-2 → display name. Tiny manual list — covers the vast majority of
// real traffic for a US-focused site, falls back to the raw code for
// anything not in the table so nothing breaks if a new country shows up.
const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  CA: "Canada",
  GB: "United Kingdom",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  IN: "India",
  MX: "Mexico",
  BR: "Brazil",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  IE: "Ireland",
  NZ: "New Zealand",
  JP: "Japan",
  PH: "Philippines",
  ZA: "South Africa",
  SG: "Singapore",
  AE: "United Arab Emirates",
  PR: "Puerto Rico",
};

function countryName(code: string): string {
  return COUNTRY_NAMES[code] ?? code;
}

interface PageProps {
  searchParams?: { range?: string };
}

export default async function AdminDashboardPage({ searchParams }: PageProps) {
  const username = await getCurrentAdminUser();
  const rangeKey = parseRange(searchParams?.range);
  const days = rangeDays(rangeKey);

  if (!isKvConfigured()) {
    return (
      <div>
        <div className="max-w-3xl">
          <div className="mb-4">
            <h1 className="font-heading text-2xl font-bold text-brand-text-primary">
              Welcome back{username ? `, ${username}` : ""}
            </h1>
          </div>
          <div className="rounded-2xl border border-brand-violet/15 bg-white p-8 shadow-sm">
            <h1 className="font-heading text-2xl font-bold text-brand-text-primary mb-3">
              Click Analytics
            </h1>
            <div className="rounded-xl border border-brand-violet/20 bg-brand-violet/5 p-5 text-sm text-brand-text-primary leading-relaxed">
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
      </div>
    );
  }

  // Fetch a window twice the size of the selected range so we can
  // compute period-over-period deltas in a single pass — current
  // half is the visible range, the older half is the comparison.
  const fetchDays = Math.max(days * 2, 14);

  const [
    providerClicks,
    sourceClicks,
    dailyAll,
    positionClicks,
    uniqueToday,
    uniqueByProvider7d,
    uniqueBySource7d,
    countryRows,
    regionRows,
    sourceProviderPairs,
    hourGrid,
  ] = await Promise.all([
    getProviderClicks(),
    getAllSourceClicks(),
    getDailyClicks(fetchDays),
    getAllPositionClicks(),
    getUniqueVisitorsToday(),
    getUniqueVisitorsByProvider(Math.min(days, 30)),
    getUniqueVisitorsBySource(Math.min(days, 30)),
    getCountryClicks(),
    getRegionClicks(),
    getSourceProviderPairs(),
    getHourHeatmap(),
  ]);

  // Slice into current vs previous period.
  // Special-case "yesterday" — getDailyClicks(2) returns
  // [yesterday, today] so the current slice is [0, 1] (yesterday
  // only) and the comparison is [-1, 0] (the day before yesterday).
  // Everything else uses the standard trailing-window slice.
  let currentDaily: DailyClickEntry[];
  let prevDaily: DailyClickEntry[];
  if (rangeKey === "yesterday") {
    // dailyAll has `fetchDays` entries. Yesterday = second-to-last.
    const lastIdx = dailyAll.length - 1;
    currentDaily = lastIdx - 1 >= 0 ? [dailyAll[lastIdx - 1]] : [];
    prevDaily = lastIdx - 2 >= 0 ? [dailyAll[lastIdx - 2]] : [];
  } else if (rangeKey === "today") {
    const lastIdx = dailyAll.length - 1;
    currentDaily = lastIdx >= 0 ? [dailyAll[lastIdx]] : [];
    prevDaily = lastIdx - 1 >= 0 ? [dailyAll[lastIdx - 1]] : [];
  } else {
    currentDaily = dailyAll.slice(-days);
    prevDaily = dailyAll.slice(-fetchDays, -days);
  }

  const totalCurrent = currentDaily.reduce((acc, d) => acc + d.total, 0);
  const totalPrev = prevDaily.reduce((acc, d) => acc + d.total, 0);

  // Provider clicks within the selected range, by re-summing the
  // daily breakdown rather than the lifetime counters. This is what
  // makes the date filter actually filter providers.
  const providerCurrent: Record<string, number> = {};
  for (const day of currentDaily) {
    for (const [p, c] of Object.entries(day.byProvider)) {
      providerCurrent[p] = (providerCurrent[p] ?? 0) + Number(c);
    }
  }
  const providerPrev: Record<string, number> = {};
  for (const day of prevDaily) {
    for (const [p, c] of Object.entries(day.byProvider)) {
      providerPrev[p] = (providerPrev[p] ?? 0) + Number(c);
    }
  }

  // Sources don't have per-day breakdowns in storage, so for the
  // range filter we approximate by scaling the lifetime totals to
  // the share of clicks that fell within the range. Not perfect
  // but matches the dominant signal — and the table label says
  // "(lifetime)" to be honest about it.
  const sortedSources = Object.entries(sourceClicks).sort((a, b) => b[1] - a[1]);
  const topSourceLifetime = sortedSources[0]?.[0] ?? "—";

  const sortedProviderCurrent = Object.entries(providerCurrent).sort(
    (a, b) => b[1] - a[1],
  );
  const topProviderInRange = sortedProviderCurrent[0]?.[0] ?? "—";

  const uniqueCurrent = Object.values(uniqueByProvider7d).reduce(
    (a, b) => a + b,
    0,
  );
  // Approx prev-period unique visitors: not stored historically per
  // window, so we show "—" rather than fake a number.
  const uniqueDelta: number | null = null;

  const totalsDelta = totalPrev > 0 ? ((totalCurrent - totalPrev) / totalPrev) * 100 : null;

  const positionRows = Object.entries(positionClicks)
    .map(([source, byPos]) => {
      const total = Object.values(byPos).reduce((a, b) => a + Number(b), 0);
      const byPosition = Object.entries(byPos)
        .map(([pos, count]) => ({
          position: Number(pos),
          count: Number(count),
          share: total > 0 ? (Number(count) / total) * 100 : 0,
        }))
        .sort((a, b) => a.position - b.position);
      return { source, total, byPosition };
    })
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total);

  const lastRefreshed = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const hasAnyData = totalCurrent > 0 || Object.keys(providerClicks).length > 0;

  // ----- Daily line chart geometry -----
  const chartW = 800;
  const chartH = 240;
  const chartPadX = 36;
  const chartPadY = 24;
  const innerW = chartW - chartPadX * 2;
  const innerH = chartH - chartPadY * 2;
  const maxDaily = Math.max(1, ...currentDaily.map((d) => d.total));
  const yTicks = 4;

  const points = currentDaily.map((d, i) => {
    const x =
      chartPadX +
      (currentDaily.length === 1 ? innerW / 2 : (i / (currentDaily.length - 1)) * innerW);
    const y = chartPadY + innerH - (d.total / maxDaily) * innerH;
    return { x, y, date: d.date, total: d.total };
  });

  const linePath =
    points.length > 0
      ? points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
      : "";
  const areaPath =
    points.length > 0
      ? `${linePath} L${points[points.length - 1].x.toFixed(1)},${(chartPadY + innerH).toFixed(1)} L${points[0].x.toFixed(1)},${(chartPadY + innerH).toFixed(1)} Z`
      : "";

  // Top countries / regions for geo bars
  const countryTop = countryRows.slice(0, 10);
  const countryTotal = countryRows.reduce((a, b) => a + b.total, 0);
  const countryMax = Math.max(1, ...countryTop.map((c) => c.total));
  const usRegionTop = regionRows
    .filter((r) => r.region.startsWith("US-"))
    .slice(0, 10);
  const usRegionTotal = usRegionTop.reduce((a, b) => a + b.total, 0);
  const usRegionMax = Math.max(1, ...usRegionTop.map((r) => r.total));

  // Source → provider top 10
  const flowTop = sourceProviderPairs.slice(0, 10);
  const flowMax = Math.max(1, ...flowTop.map((f) => f.total));

  // Hour heatmap derived stats
  const hourMax = Math.max(1, ...hourGrid.flat());
  const dowLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="rounded-2xl border border-brand-violet/15 bg-white p-5 shadow-sm">
          <h1 className="font-heading text-xl font-bold text-brand-text-primary">
            Welcome back{username ? `, ${username}` : ""}
          </h1>
          <p className="text-xs text-brand-text-secondary mt-1">
            Click analytics dashboard · {lastRefreshed}
          </p>
        </div>

        {/* Header + range filter */}
        <header className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Click Analytics
              </span>
            </h2>
            <p className="text-sm text-brand-text-secondary mt-1">
              Showing {rangeLabel(rangeKey)} · compared to{" "}
              {comparisonLabel(rangeKey)}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-violet/15 bg-white px-3 py-1.5 text-xs font-semibold text-brand-text-secondary shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-success" />
              KV Connected
            </span>
            <div className="inline-flex rounded-full border border-brand-violet/15 bg-white p-1 shadow-sm">
              {RANGE_OPTIONS.map((opt) => {
                const active = opt.key === rangeKey;
                return (
                  <Link
                    key={opt.key}
                    href={`/admin?range=${opt.key}`}
                    className={
                      "px-3 py-1 rounded-full text-xs font-semibold transition-colors " +
                      (active
                        ? "bg-brand-violet text-white"
                        : "text-brand-text-secondary hover:text-brand-text-primary")
                    }
                  >
                    {opt.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        {!hasAnyData && (
          <div className="rounded-2xl border border-brand-violet/15 bg-white p-8 shadow-sm text-center">
            <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
              No clicks tracked yet
            </h2>
            <p className="text-brand-text-secondary text-sm">
              Click data will appear here once visitors start clicking
              affiliate links across the site.
            </p>
          </div>
        )}

        {/* KPI strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Total Clicks"
            value={formatNumber(totalCurrent)}
            delta={totalsDelta}
            sub={`vs prev ${comparisonLabel(rangeKey)}`}
          />
          <KpiCard
            label="Unique Visitors"
            value={formatNumber(uniqueCurrent || uniqueToday)}
            delta={uniqueDelta}
            sub="Daily-rotating salted hash · no PII"
          />
          <KpiCard
            label="Top Source"
            value={topSourceLifetime}
            delta={null}
            sub="Lifetime leader"
          />
          <KpiCard
            label="Top Provider (in range)"
            value={topProviderInRange}
            delta={null}
            sub={
              sortedProviderCurrent[0]
                ? `${formatNumber(sortedProviderCurrent[0][1])} clicks`
                : "—"
            }
          />
        </section>

        {/* Daily line chart */}
        <section className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm">
          <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
            <h2 className="font-heading text-lg font-bold text-brand-text-primary">
              Daily Clicks
            </h2>
            <span className="text-xs text-brand-text-secondary">
              Peak: {formatNumber(maxDaily)} on a single day
            </span>
          </div>
          {currentDaily.length === 0 ? (
            <p className="py-8 text-center text-brand-text-secondary text-sm">
              No daily data in this range yet.
            </p>
          ) : (
            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${chartW} ${chartH}`}
                className="w-full max-w-full h-auto"
                role="img"
                aria-label="Daily clicks line chart"
              >
                <defs>
                  <linearGradient id="violetFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {/* Y grid lines */}
                {Array.from({ length: yTicks + 1 }, (_, i) => {
                  const y = chartPadY + (innerH * i) / yTicks;
                  const val = Math.round(maxDaily * (1 - i / yTicks));
                  return (
                    <g key={i}>
                      <line
                        x1={chartPadX}
                        x2={chartPadX + innerW}
                        y1={y}
                        y2={y}
                        stroke="#ede9fe"
                        strokeWidth={1}
                      />
                      <text
                        x={chartPadX - 6}
                        y={y + 3}
                        fontSize={10}
                        textAnchor="end"
                        fill="#94a3b8"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}
                {/* Area fill */}
                {areaPath && <path d={areaPath} fill="url(#violetFade)" />}
                {/* Line */}
                {linePath && (
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth={2.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                {/* Points */}
                {points.map((p) => (
                  <g key={p.date}>
                    <circle cx={p.x} cy={p.y} r={3.25} fill="#7c3aed" />
                    <circle cx={p.x} cy={p.y} r={8} fill="transparent">
                      <title>{`${formatDateLabel(p.date)}: ${formatNumber(p.total)} clicks`}</title>
                    </circle>
                  </g>
                ))}
                {/* X axis labels — first, mid, last to avoid clutter */}
                {points.length > 0 &&
                  [0, Math.floor(points.length / 2), points.length - 1]
                    .filter((idx, i, arr) => arr.indexOf(idx) === i)
                    .map((idx) => {
                      const p = points[idx];
                      return (
                        <text
                          key={`x-${idx}`}
                          x={p.x}
                          y={chartH - 4}
                          fontSize={10}
                          textAnchor="middle"
                          fill="#94a3b8"
                        >
                          {formatDateLabel(p.date)}
                        </text>
                      );
                    })}
              </svg>
            </div>
          )}
        </section>

        {/* Geo breakdown */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GeoBarCard
            title="Top Countries"
            subtitle="By click count, all-time aggregate"
            rows={countryTop.map((c) => ({
              key: c.country,
              label: countryName(c.country),
              count: c.total,
            }))}
            total={countryTotal}
            max={countryMax}
            emptyText="No country data yet — clicks need to come through Vercel edge for x-vercel-ip-country to populate."
          />
          <GeoBarCard
            title="Top US States / Regions"
            subtitle="From x-vercel-ip-country-region (US only)"
            rows={usRegionTop.map((r) => ({
              key: r.region,
              label: r.region,
              count: r.total,
            }))}
            total={usRegionTotal}
            max={usRegionMax}
            emptyText="No US region data yet."
          />
        </section>

        {/* Source → Provider flow */}
        <section className="rounded-2xl border border-brand-violet/15 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading text-lg font-bold text-brand-text-primary">
              Source → Provider Flow
            </h2>
            <p className="text-xs text-brand-text-secondary mt-1">
              Top 10 source-to-provider attribution pairs (lifetime).
            </p>
          </div>
          <div className="overflow-x-auto">
            {flowTop.length === 0 ? (
              <p className="py-8 text-center text-brand-text-secondary text-sm">
                No source→provider pairs tracked yet. New clicks will start
                populating this immediately.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                    <th className="py-3 px-5 text-left">Source</th>
                    <th className="py-3 px-5 text-left">Provider</th>
                    <th className="py-3 px-5">Flow</th>
                    <th className="py-3 px-5 text-right">Clicks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {flowTop.map((row) => {
                    const widthPct = Math.max(
                      4,
                      (row.total / flowMax) * 75,
                    );
                    return (
                      <tr
                        key={`${row.source}-${row.provider}`}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-5 font-medium text-brand-text-primary">
                          {row.source}
                        </td>
                        <td className="py-3 px-5 text-brand-text-secondary">
                          {row.provider}
                        </td>
                        <td className="py-3 px-5">
                          <div className="relative h-5 bg-brand-violet/[0.06] rounded-md overflow-hidden min-w-[120px]">
                            <div
                              className="absolute inset-y-0 left-0 bg-brand-violet rounded-md"
                              style={{ width: `${widthPct}%` }}
                              aria-hidden
                            />
                          </div>
                        </td>
                        <td className="py-3 px-5 text-right font-bold text-brand-text-primary tabular-nums">
                          {formatNumber(row.total)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Hour heatmap */}
        <section className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm">
          <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="font-heading text-lg font-bold text-brand-text-primary">
                When Clicks Happen
              </h2>
              <p className="text-xs text-brand-text-secondary mt-1">
                7×24 day-of-week × hour-of-day heatmap (UTC). Darker = more clicks.
              </p>
            </div>
            <span className="text-xs text-brand-text-secondary">
              Peak hour: {formatNumber(hourMax)} clicks
            </span>
          </div>
          {hourMax === 1 && hourGrid.flat().every((v) => v === 0) ? (
            <p className="py-6 text-center text-brand-text-secondary text-sm">
              No hour data yet — new clicks will start populating this immediately.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="grid grid-cols-[2.5rem_repeat(24,_minmax(1.1rem,_1fr))] gap-[2px] items-center">
                  <div />
                  {Array.from({ length: 24 }, (_, h) => (
                    <div
                      key={`h-${h}`}
                      className="text-[9px] text-brand-text-secondary/70 text-center tabular-nums"
                    >
                      {h % 3 === 0 ? h : ""}
                    </div>
                  ))}
                  {dowLabels.map((dow, dowIdx) => (
                    <DayRow
                      key={dow}
                      dow={dow}
                      dowIdx={dowIdx}
                      hourGrid={hourGrid}
                      hourMax={hourMax}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Top Providers Table */}
        <section className="rounded-2xl border border-brand-violet/15 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading text-lg font-bold text-brand-text-primary">
              Top Providers
            </h2>
            <p className="text-xs text-brand-text-secondary mt-1">
              Filtered to selected range. Lifetime totals shown for context.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                  <th className="py-3 px-5 text-left">Provider</th>
                  <th className="py-3 px-5 text-right">Clicks (range)</th>
                  <th className="py-3 px-5 text-right">% of range</th>
                  <th className="py-3 px-5 text-right">Lifetime</th>
                  <th className="py-3 px-5 text-right">Unique (≤30d)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedProviderCurrent.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-brand-text-secondary"
                    >
                      No provider clicks in this range.
                    </td>
                  </tr>
                ) : (
                  sortedProviderCurrent.map(([provider, clicks]) => {
                    const pct =
                      totalCurrent > 0
                        ? ((clicks / totalCurrent) * 100).toFixed(1)
                        : "0.0";
                    return (
                      <tr
                        key={provider}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-5 font-semibold text-brand-text-primary">
                          {provider}
                        </td>
                        <td className="py-3 px-5 text-right font-bold text-brand-text-primary tabular-nums">
                          {formatNumber(clicks)}
                        </td>
                        <td className="py-3 px-5 text-right text-brand-text-secondary tabular-nums">
                          {pct}%
                        </td>
                        <td className="py-3 px-5 text-right text-brand-text-secondary tabular-nums">
                          {formatNumber(providerClicks[provider] ?? 0)}
                        </td>
                        <td className="py-3 px-5 text-right text-brand-text-secondary tabular-nums">
                          {formatNumber(uniqueByProvider7d[provider] ?? 0)}
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
        <section className="rounded-2xl border border-brand-violet/15 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading text-lg font-bold text-brand-text-primary">
              Clicks by Source
            </h2>
            <p className="text-xs text-brand-text-secondary mt-1">
              Lifetime totals — sources are not stored per-day, so this view is
              not range-filtered.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                  <th className="py-3 px-5 text-left">Source</th>
                  <th className="py-3 px-5 text-right">Click Count</th>
                  <th className="py-3 px-5 text-right">% of total</th>
                  <th className="py-3 px-5 text-right">Unique (≤30d)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedSources.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-brand-text-secondary"
                    >
                      No source data yet.
                    </td>
                  </tr>
                ) : (
                  (() => {
                    const totalLifetimeSources = sortedSources.reduce(
                      (a, [, n]) => a + n,
                      0,
                    );
                    return sortedSources.map(([source, count]) => {
                      const pct =
                        totalLifetimeSources > 0
                          ? ((count / totalLifetimeSources) * 100).toFixed(1)
                          : "0.0";
                      return (
                        <tr
                          key={source}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-5 font-medium text-brand-text-primary">
                            {source}
                          </td>
                          <td className="py-3 px-5 text-right font-bold text-brand-text-primary tabular-nums">
                            {formatNumber(count)}
                          </td>
                          <td className="py-3 px-5 text-right text-brand-text-secondary tabular-nums">
                            {pct}%
                          </td>
                          <td className="py-3 px-5 text-right text-brand-text-secondary tabular-nums">
                            {formatNumber(uniqueBySource7d[source] ?? 0)}
                          </td>
                        </tr>
                      );
                    });
                  })()
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Clicks by Position */}
        <section className="rounded-2xl border border-brand-violet/15 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading text-lg font-bold text-brand-text-primary">
              Clicks by Position
            </h2>
            <p className="text-xs text-brand-text-secondary mt-1">
              Which slot in each list converts best — useful for deciding which
              provider deserves the #1 spot.
            </p>
          </div>
          <div className="overflow-x-auto">
            {positionRows.length === 0 ? (
              <p className="py-8 text-center text-brand-text-secondary text-sm">
                No position data yet. Click some CTAs in lists/cards to seed
                the breakdown.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                    <th className="py-3 px-5 text-left">Source</th>
                    <th className="py-3 px-5 text-right">Position</th>
                    <th className="py-3 px-5 text-right">Clicks</th>
                    <th className="py-3 px-5 text-right">% of Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {positionRows.flatMap((row) =>
                    row.byPosition.map((bp, i) => (
                      <tr
                        key={`${row.source}-${bp.position}`}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-5 font-medium text-brand-text-primary">
                          {i === 0 ? row.source : ""}
                        </td>
                        <td className="py-3 px-5 text-right font-mono text-brand-text-secondary">
                          #{bp.position}
                        </td>
                        <td className="py-3 px-5 text-right font-bold text-brand-text-primary tabular-nums">
                          {formatNumber(bp.count)}
                        </td>
                        <td className="py-3 px-5 text-right text-brand-text-secondary tabular-nums">
                          {bp.share.toFixed(1)}%
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  delta,
  sub,
}: {
  label: string;
  value: string;
  delta: number | null;
  sub?: string;
}) {
  const showDelta = delta !== null && Number.isFinite(delta);
  const positive = showDelta && delta! >= 0;
  return (
    <div className="rounded-2xl border border-brand-violet/15 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold bg-brand-gradient bg-clip-text text-transparent break-words">
        {value}
      </p>
      <div className="mt-1 flex items-center gap-2">
        {showDelta ? (
          <span
            className={
              "inline-flex items-center gap-0.5 text-[11px] font-semibold " +
              (positive ? "text-emerald-600" : "text-rose-600")
            }
          >
            <span aria-hidden>{positive ? "▲" : "▼"}</span>
            {Math.abs(delta!).toFixed(1)}%
          </span>
        ) : null}
        {sub && (
          <span className="text-[10px] text-brand-text-secondary/70 leading-snug">
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

function GeoBarCard({
  title,
  subtitle,
  rows,
  total,
  max,
  emptyText,
}: {
  title: string;
  subtitle: string;
  rows: Array<{ key: string; label: string; count: number }>;
  total: number;
  max: number;
  emptyText: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm">
      <h3 className="font-heading text-lg font-bold text-brand-text-primary">
        {title}
      </h3>
      <p className="text-xs text-brand-text-secondary mt-1 mb-4">{subtitle}</p>
      {rows.length === 0 ? (
        <p className="py-6 text-sm text-brand-text-secondary italic">
          {emptyText}
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {rows.map((row) => {
            const MAX_BAR_PCT = 75;
            const rawPct = max > 0 ? (row.count / max) * MAX_BAR_PCT : 0;
            const widthPct = row.count === 0 ? 0 : Math.max(rawPct, 4);
            const labelInside = widthPct >= 30;
            const sharePct = total > 0 ? (row.count / total) * 100 : 0;
            return (
              <li
                key={row.key}
                className="grid grid-cols-[8rem_1fr_3.5rem] items-center gap-3 text-sm"
              >
                <span className="font-medium text-xs text-brand-text-primary truncate">
                  {row.label}
                </span>
                <div className="relative h-7 bg-brand-violet/[0.06] rounded-md overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-brand-violet rounded-md flex items-center justify-end pr-3"
                    style={{ width: `${widthPct}%` }}
                    aria-hidden
                  >
                    {row.count > 0 && labelInside && (
                      <span className="text-xs font-semibold text-white whitespace-nowrap tabular-nums">
                        {row.count.toLocaleString("en-US")}
                      </span>
                    )}
                  </div>
                  {row.count > 0 && !labelInside && (
                    <span
                      className="absolute inset-y-0 flex items-center text-xs font-semibold text-brand-text-primary whitespace-nowrap tabular-nums"
                      style={{ left: `calc(${widthPct}% + 0.5rem)` }}
                    >
                      {row.count.toLocaleString("en-US")}
                    </span>
                  )}
                </div>
                <span className="text-xs text-brand-text-secondary text-right tabular-nums">
                  {sharePct.toFixed(1)}%
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function DayRow({
  dow,
  dowIdx,
  hourGrid,
  hourMax,
}: {
  dow: string;
  dowIdx: number;
  hourGrid: number[][];
  hourMax: number;
}) {
  return (
    <>
      <div className="text-[10px] font-semibold text-brand-text-secondary pr-1">
        {dow}
      </div>
      {Array.from({ length: 24 }, (_, h) => {
        const v = hourGrid[dowIdx][h] ?? 0;
        const intensity = hourMax > 0 ? v / hourMax : 0;
        // Brand violet at scaled opacity; clamp minimum visible tint
        const opacity = v === 0 ? 0.04 : 0.15 + intensity * 0.85;
        return (
          <div
            key={`c-${dowIdx}-${h}`}
            className="aspect-square rounded-[3px]"
            style={{ backgroundColor: `rgba(124, 58, 237, ${opacity})` }}
            title={`${dow} ${h}:00 UTC — ${v.toLocaleString("en-US")} clicks`}
          />
        );
      })}
    </>
  );
}
