"use client";

import { useMemo, useState } from "react";
import {
  INTERACTIONS,
  searchInteractions,
  sortBySeverity,
  type DrugInteraction,
  type Severity,
} from "@/lib/glp1-drug-interactions";
import { trackToolEvent } from "@/lib/analytics";

const SEVERITY_STYLES: Record<
  Severity,
  { bg: string; border: string; chip: string; label: string; text: string }
> = {
  contraindicated: {
    bg: "bg-red-50",
    border: "border-red-300",
    chip: "bg-red-600 text-white",
    label: "Do not combine",
    text: "text-red-900",
  },
  serious: {
    bg: "bg-orange-50",
    border: "border-orange-300",
    chip: "bg-orange-600 text-white",
    label: "Serious — close monitoring",
    text: "text-orange-900",
  },
  moderate: {
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    chip: "bg-yellow-500 text-white",
    label: "Moderate — be aware",
    text: "text-yellow-900",
  },
  minor: {
    bg: "bg-brand-violet/5",
    border: "border-brand-violet/20",
    chip: "bg-brand-violet text-white",
    label: "Minor — generally safe",
    text: "text-brand-text-primary",
  },
};

const SEVERITY_FILTERS: Array<{ value: Severity | "all"; label: string }> = [
  { value: "all", label: "All severities" },
  { value: "contraindicated", label: "Contraindicated" },
  { value: "serious", label: "Serious" },
  { value: "moderate", label: "Moderate" },
  { value: "minor", label: "Minor" },
];

export default function DrugInteractionChecker() {
  const [query, setQuery] = useState<string>("");
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");

  const results = useMemo<DrugInteraction[]>(() => {
    const base =
      query.trim().length === 0
        ? [...INTERACTIONS]
        : searchInteractions(query);
    const filtered =
      severityFilter === "all"
        ? base
        : base.filter((i) => i.severity === severityFilter);
    return sortBySeverity(filtered);
  }, [query, severityFilter]);

  const onQueryChange = (v: string) => {
    setQuery(v);
    if (v.trim().length >= 2) {
      trackToolEvent("drug_interaction_checker", "search", { query: v.trim() });
    }
  };

  const onSeverityChange = (s: Severity | "all") => {
    setSeverityFilter(s);
    trackToolEvent("drug_interaction_checker", "filter", { severity: s });
  };

  return (
    <div className="not-prose space-y-8">
      {/* ── Search box ── */}
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 sm:p-8 shadow-sm">
        <label
          htmlFor="drug-search"
          className="block text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2"
        >
          Search by drug name, brand, or class
        </label>
        <input
          id="drug-search"
          type="search"
          inputMode="search"
          autoComplete="off"
          placeholder="e.g. insulin, Lantus, warfarin, Synthroid..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full min-h-[44px] rounded-lg border border-slate-300 px-4 py-3 text-base text-brand-text-primary focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
        />

        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-text-secondary font-bold mb-2">
            Filter by severity
          </p>
          <div className="flex flex-wrap gap-2">
            {SEVERITY_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => onSeverityChange(f.value)}
                className={`min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold border ${
                  severityFilter === f.value
                    ? "bg-brand-violet text-white border-brand-violet"
                    : "bg-white text-brand-text-primary border-slate-200 hover:border-brand-violet/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-xs text-brand-text-secondary">
          Showing {results.length} of {INTERACTIONS.length} entries. Every entry
          cites its FDA prescribing information section. This tool is
          educational and does NOT replace your prescriber or pharmacist.
        </p>
      </div>

      {/* ── Results ── */}
      <div className="space-y-4">
        {results.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-base text-brand-text-primary font-semibold">
              No matching interactions in our database.
            </p>
            <p className="mt-2 text-sm text-brand-text-secondary">
              This does NOT mean the combination is safe. Always confirm with
              your prescriber and pharmacist before combining any medication
              with a GLP-1.
            </p>
          </div>
        )}

        {results.map((i) => {
          const s = SEVERITY_STYLES[i.severity];
          return (
            <article
              key={i.id}
              className={`rounded-2xl border-2 ${s.border} ${s.bg} p-5 sm:p-6`}
            >
              <header className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h3 className={`font-heading text-xl font-bold ${s.text}`}>
                    {i.drugName}
                  </h3>
                  <p className="text-xs text-brand-text-secondary mt-1">
                    {i.drugClass}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${s.chip}`}
                >
                  {s.label}
                </span>
              </header>

              {i.brandNames.length > 0 && (
                <div className="mt-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-brand-text-secondary font-bold mb-1">
                    Common brand names
                  </p>
                  <p className="text-sm text-brand-text-primary">
                    {i.brandNames.join(" · ")}
                  </p>
                </div>
              )}

              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-brand-text-secondary font-bold mb-1">
                    Clinical effect
                  </p>
                  <p className="text-sm text-brand-text-primary leading-relaxed">
                    {i.effect}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-brand-text-secondary font-bold mb-1">
                    What to do
                  </p>
                  <p className="text-sm text-brand-text-primary leading-relaxed">
                    {i.recommendation}
                  </p>
                </div>
              </div>

              {i.mechanism && (
                <div className="mt-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-brand-text-secondary font-bold mb-1">
                    Mechanism
                  </p>
                  <p className="text-sm text-brand-text-secondary leading-relaxed">
                    {i.mechanism}
                  </p>
                </div>
              )}

              <footer className="mt-4 pt-3 border-t border-slate-200/60">
                <p className="text-[11px] text-brand-text-secondary">
                  <span className="font-bold uppercase tracking-wider">
                    Source:
                  </span>{" "}
                  {i.source}
                </p>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
