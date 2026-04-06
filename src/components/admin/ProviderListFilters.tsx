"use client";

// Client-side filter + sortable table for the admin provider list.
// All data is passed in as props from the server component — we just
// filter/sort in memory.

import Link from "next/link";
import { useMemo, useState } from "react";

export interface ProviderRow {
  slug: string;
  name: string;
  logo?: string;
  category: string;
  overall: number;
  min_price: number | null;
  states_count: number;
  last_verified: string | null;
  confidence: "high" | "medium" | "low" | null;
  is_valid: boolean;
  status: "verified" | "stale" | "unverified" | "invalid";
}

type SortKey =
  | "name"
  | "category"
  | "overall"
  | "min_price"
  | "states_count"
  | "last_verified";

export default function ProviderListFilters({
  rows,
  cmsConfigured,
}: {
  rows: ProviderRow[];
  cmsConfigured: boolean;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const categories = useMemo(() => {
    const s = new Set<string>();
    for (const r of rows) s.add(r.category);
    return Array.from(s).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    let out = rows.filter((r) => {
      if (search && !r.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (category !== "all" && r.category !== category) return false;
      if (status !== "all" && r.status !== status) return false;
      return true;
    });

    out = [...out].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "category":
          cmp = a.category.localeCompare(b.category);
          break;
        case "overall":
          cmp = a.overall - b.overall;
          break;
        case "min_price":
          cmp = (a.min_price ?? Infinity) - (b.min_price ?? Infinity);
          break;
        case "states_count":
          cmp = a.states_count - b.states_count;
          break;
        case "last_verified":
          cmp = (a.last_verified ?? "").localeCompare(b.last_verified ?? "");
          break;
      }
      return sortAsc ? cmp : -cmp;
    });

    return out;
  }, [rows, search, category, status, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((s) => !s);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function arrow(key: SortKey) {
    if (sortKey !== key) return "";
    return sortAsc ? " ↑" : " ↓";
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-4 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name…"
          className="flex-1 min-w-[200px] rounded-lg border border-brand-violet/15 bg-white px-3 py-2 text-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-brand-violet/15 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-brand-violet/15 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="verified">Verified</option>
          <option value="stale">Stale (&gt;30d)</option>
          <option value="unverified">Unverified</option>
          <option value="invalid">Invalid</option>
        </select>
        <span className="text-xs text-brand-text-secondary ml-auto">
          {filtered.length} of {rows.length}
        </span>
      </div>

      <div className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-brand-text-secondary text-xs uppercase tracking-wide">
                <Th onClick={() => toggleSort("name")}>Name{arrow("name")}</Th>
                <Th onClick={() => toggleSort("category")}>
                  Category{arrow("category")}
                </Th>
                <th className="py-3 px-4 text-left">Slug</th>
                <Th onClick={() => toggleSort("overall")} align="right">
                  Score{arrow("overall")}
                </Th>
                <Th onClick={() => toggleSort("min_price")} align="right">
                  Min $/mo{arrow("min_price")}
                </Th>
                <Th onClick={() => toggleSort("states_count")} align="right">
                  States{arrow("states_count")}
                </Th>
                <Th onClick={() => toggleSort("last_verified")}>
                  Verified{arrow("last_verified")}
                </Th>
                <th className="py-3 px-4 text-left">Conf</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="py-8 text-center text-brand-text-secondary"
                  >
                    No providers match your filters.
                  </td>
                </tr>
              )}
              {filtered.map((r) => (
                <tr key={r.slug} className="hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      {r.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={r.logo}
                          alt=""
                          className="w-7 h-7 rounded object-contain bg-white border border-gray-100"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded bg-brand-violet/10 flex items-center justify-center text-[10px] font-bold text-brand-violet">
                          {r.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <Link
                        href={`/admin/providers/${r.slug}/edit`}
                        className="font-semibold text-brand-text-primary hover:text-brand-violet"
                      >
                        {r.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-brand-text-secondary text-xs">
                    {r.category}
                  </td>
                  <td className="py-2 px-4 text-brand-text-secondary text-xs font-mono">
                    {r.slug}
                  </td>
                  <td className="py-2 px-4 text-right font-bold">
                    {r.overall.toFixed(1)}
                  </td>
                  <td className="py-2 px-4 text-right">
                    {r.min_price !== null ? `$${r.min_price}` : "—"}
                  </td>
                  <td className="py-2 px-4 text-right">{r.states_count}</td>
                  <td className="py-2 px-4 text-xs text-brand-text-secondary">
                    {r.last_verified ?? "—"}
                  </td>
                  <td className="py-2 px-4">
                    <StatusBadge status={r.status} confidence={r.confidence} />
                  </td>
                  <td className="py-2 px-4 text-right">
                    <div className="flex justify-end gap-1">
                      {cmsConfigured ? (
                        <Link
                          href={`/admin/providers/${r.slug}/edit`}
                          className="inline-flex rounded-md border border-brand-violet/15 bg-white px-2 py-1 text-[11px] font-semibold text-brand-text-primary hover:bg-brand-violet/5"
                        >
                          Edit
                        </Link>
                      ) : (
                        <span className="inline-flex rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] font-semibold text-gray-400">
                          Read-only
                        </span>
                      )}
                      <Link
                        href={`/providers/${r.slug}`}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex rounded-md border border-brand-violet/15 bg-white px-2 py-1 text-[11px] font-semibold text-brand-text-primary hover:bg-brand-violet/5"
                      >
                        View ↗
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Th({
  children,
  onClick,
  align = "left",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  align?: "left" | "right";
}) {
  return (
    <th
      onClick={onClick}
      className={
        "py-3 px-4 cursor-pointer select-none " +
        (align === "right" ? "text-right" : "text-left")
      }
    >
      {children}
    </th>
  );
}

function StatusBadge({
  status,
  confidence,
}: {
  status: ProviderRow["status"];
  confidence: ProviderRow["confidence"];
}) {
  const map: Record<ProviderRow["status"], string> = {
    verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
    stale: "bg-amber-50 text-amber-700 border-amber-200",
    unverified: "bg-gray-100 text-gray-600 border-gray-200",
    invalid: "bg-red-50 text-red-700 border-red-200",
  };
  const label = confidence ? `${status} · ${confidence}` : status;
  return (
    <span
      className={
        "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase " +
        map[status]
      }
    >
      {label}
    </span>
  );
}
