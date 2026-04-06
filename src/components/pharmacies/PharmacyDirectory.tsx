"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Pharmacy } from "@/lib/pharmacies";

interface PharmacyDirectoryProps {
  pharmacies: Pharmacy[];
}

type SortKey = "score" | "name" | "established";
type TypeFilter = "all" | "503A" | "503B" | "Both";
type DrugFilter = "all" | "semaglutide" | "tirzepatide";

const US_STATE_CODES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

function TypeBadge({ type }: { type: Pharmacy["type"] }) {
  const classes =
    type === "503B"
      ? "bg-brand-violet/10 text-brand-violet border-brand-violet/30"
      : type === "Both"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-emerald-50 text-emerald-700 border-emerald-200";
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-wide border rounded-full px-2 py-0.5 ${classes}`}
    >
      {type}
    </span>
  );
}

export default function PharmacyDirectory({
  pharmacies,
}: PharmacyDirectoryProps) {
  const [sort, setSort] = useState<SortKey>("score");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [drugFilter, setDrugFilter] = useState<DrugFilter>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [pcabOnly, setPcabOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...pharmacies];

    if (typeFilter !== "all") {
      list = list.filter((p) => p.type === typeFilter);
    }
    if (drugFilter === "semaglutide") {
      list = list.filter((p) => p.produces_semaglutide);
    } else if (drugFilter === "tirzepatide") {
      list = list.filter((p) => p.produces_tirzepatide);
    }
    if (stateFilter !== "all") {
      list = list.filter((p) => p.states_licensed.includes(stateFilter));
    }
    if (pcabOnly) {
      list = list.filter((p) => p.certifications.includes("PCAB"));
    }

    list.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "established")
        return (b.established ?? 0) - (a.established ?? 0);
      return b.internal_score - a.internal_score;
    });
    return list;
  }, [pharmacies, sort, typeFilter, drugFilter, stateFilter, pcabOnly]);

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="rounded-2xl border border-brand-violet/10 bg-white p-5 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="text-xs font-medium text-brand-text-secondary flex flex-col gap-1">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-brand-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            >
              <option value="score">Score (high to low)</option>
              <option value="name">Name (A–Z)</option>
              <option value="established">Established (newest)</option>
            </select>
          </label>

          <label className="text-xs font-medium text-brand-text-secondary flex flex-col gap-1">
            Type
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-brand-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            >
              <option value="all">All types</option>
              <option value="503A">503A only</option>
              <option value="503B">503B only</option>
              <option value="Both">503A + 503B</option>
            </select>
          </label>

          <label className="text-xs font-medium text-brand-text-secondary flex flex-col gap-1">
            Drug
            <select
              value={drugFilter}
              onChange={(e) => setDrugFilter(e.target.value as DrugFilter)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-brand-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            >
              <option value="all">All drugs</option>
              <option value="semaglutide">Semaglutide</option>
              <option value="tirzepatide">Tirzepatide</option>
            </select>
          </label>

          <label className="text-xs font-medium text-brand-text-secondary flex flex-col gap-1">
            Licensed in
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-brand-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            >
              <option value="all">All states</option>
              {US_STATE_CODES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm text-brand-text-secondary">
          <input
            type="checkbox"
            checked={pcabOnly}
            onChange={(e) => setPcabOnly(e.target.checked)}
            className="rounded border-gray-300 text-brand-violet focus:ring-brand-violet"
          />
          PCAB-accredited only
        </label>
      </div>

      <div className="text-sm text-brand-text-secondary">
        Showing <strong>{filtered.length}</strong> of {pharmacies.length}{" "}
        pharmacies
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-brand-violet/10 bg-white p-8 text-center text-brand-text-secondary">
          No pharmacies match your filters. Try loosening a criterion.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <Link
              key={p._id}
              href={`/pharmacies/${p.slug}`}
              className="group rounded-2xl border border-brand-violet/10 bg-white p-5 hover:border-brand-violet/40 hover:shadow-md transition-all flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TypeBadge type={p.type} />
                    {p.certifications.includes("PCAB") && (
                      <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wide rounded-full border border-sky-200 bg-sky-50 text-sky-700 px-2 py-0.5">
                        PCAB
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-brand-text-primary text-lg group-hover:text-brand-violet transition-colors">
                    {p.name}
                  </h3>
                  <div className="text-xs text-brand-text-secondary mt-0.5">
                    {p.city}, {p.state}
                    {p.established ? ` • Est. ${p.established}` : ""}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-brand-text-primary leading-none">
                    {p.internal_score.toFixed(1)}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-brand-text-secondary mt-1">
                    Score
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {p.produces_semaglutide && (
                  <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5">
                    Semaglutide
                  </span>
                )}
                {p.produces_tirzepatide && (
                  <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5">
                    Tirzepatide
                  </span>
                )}
                <span className="rounded-full bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5">
                  {p.states_licensed.length} states
                </span>
              </div>

              <div className="text-sm text-brand-text-secondary line-clamp-2">
                {p.description}
              </div>

              <div className="text-xs font-semibold text-brand-violet mt-auto">
                View Details →
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
