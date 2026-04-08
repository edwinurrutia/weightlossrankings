"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ALL_DRUG_CLASSES,
  DRUGS,
  compareByWeightDirection,
  searchDrugs,
  type DrugEntry,
  type WeightDirection,
} from "@/lib/non-glp1-drug-effects";
import { trackToolEvent } from "@/lib/analytics";

const DIRECTION_FILTER_OPTIONS: Array<{
  value: WeightDirection | "all";
  label: string;
}> = [
  { value: "all", label: "All directions" },
  { value: "loss", label: "Causes weight LOSS" },
  { value: "neutral", label: "Weight neutral" },
  { value: "gain", label: "Causes weight GAIN" },
];

const DIRECTION_BADGE_CLASSES: Record<WeightDirection, string> = {
  loss: "bg-brand-violet text-white",
  neutral: "bg-slate-400 text-white",
  gain: "bg-slate-300 text-slate-800",
};

const DIRECTION_LABEL: Record<WeightDirection, string> = {
  loss: "Loss",
  neutral: "Neutral",
  gain: "Gain",
};

function formatMagnitude(d: DrugEntry): string {
  if (d.magnitudeKg == null && d.magnitudePctBodyWeight == null) return "—";
  if (d.weightDirection === "neutral") return "≈ 0";
  const sign = d.weightDirection === "loss" ? "−" : "+";
  if (d.magnitudeKg != null) {
    return `${sign}${Math.abs(d.magnitudeKg).toFixed(1)} kg`;
  }
  return `${sign}${Math.abs(d.magnitudePctBodyWeight ?? 0).toFixed(1)}%`;
}

export default function DrugLookup() {
  const [query, setQuery] = useState("");
  const [directionFilter, setDirectionFilter] = useState<
    WeightDirection | "all"
  >("all");
  const [classFilter, setClassFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const base = query.trim() ? searchDrugs(query) : DRUGS;
    return base
      .filter((d) =>
        directionFilter === "all" ? true : d.weightDirection === directionFilter,
      )
      .filter((d) => (classFilter === "All" ? true : d.drugClass === classFilter))
      .sort(compareByWeightDirection);
  }, [query, directionFilter, classFilter]);

  return (
    <div className="not-prose">
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm mb-6">
        <div className="grid gap-4 sm:grid-cols-[1fr_220px_220px]">
          <div>
            <label
              htmlFor="drug-search"
              className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-2"
            >
              Search drug name or brand
            </label>
            <input
              id="drug-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. metformin, Wellbutrin, Jardiance, Topamax"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-2">
              Weight direction
            </label>
            <select
              value={directionFilter}
              onChange={(e) => {
                setDirectionFilter(e.target.value as WeightDirection | "all");
                trackToolEvent("drug_lookup", "direction_filter", {
                  direction: e.target.value,
                });
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base"
            >
              {DIRECTION_FILTER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-2">
              Drug class
            </label>
            <select
              value={classFilter}
              onChange={(e) => {
                setClassFilter(e.target.value);
                trackToolEvent("drug_lookup", "class_filter", {
                  drugClass: e.target.value,
                });
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base"
            >
              <option value="All">All classes</option>
              {ALL_DRUG_CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-4 text-xs text-brand-text-secondary">
          Showing {filtered.length} of {DRUGS.length} drugs.
          Sorted by weight direction (loss → neutral → gain).
        </p>
      </div>

      <div className="space-y-4">
        {filtered.map((d) => (
          <article
            key={d.id}
            className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm transition hover:border-brand-violet/40"
          >
            <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-brand-text-primary">
                  {d.name}
                </h3>
                <p className="text-xs text-brand-text-secondary mt-0.5">
                  {d.brandNames.join(" · ")}
                </p>
                <p className="text-xs text-brand-violet mt-1 font-semibold uppercase tracking-wider">
                  {d.drugClass}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${DIRECTION_BADGE_CLASSES[d.weightDirection]}`}
                >
                  {DIRECTION_LABEL[d.weightDirection]}
                </span>
                {d.fdaApprovedForWeightLoss && (
                  <span className="text-[10px] font-bold text-brand-violet uppercase tracking-wider">
                    FDA-approved for weight
                  </span>
                )}
              </div>
            </header>

            <div className="grid gap-3 sm:grid-cols-2 mb-4">
              <div className="rounded-lg bg-brand-bg-purple p-3 border border-brand-violet/15">
                <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold">
                  Typical magnitude
                </div>
                <div className="text-2xl font-bold text-brand-violet mt-1">
                  {formatMagnitude(d)}
                </div>
                <div className="text-[11px] text-brand-text-secondary">
                  {d.vsGlp1Magnitude}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
                <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold">
                  Cost / month
                </div>
                <div className="text-base font-bold text-brand-text-primary mt-1">
                  {d.costPerMonth}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
                FDA-approved indications
              </div>
              <p className="text-sm text-brand-text-primary">
                {d.fdaApprovedFor.join("; ")}
              </p>
            </div>

            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
                Weight effect detail
              </div>
              <p className="text-sm text-brand-text-secondary leading-relaxed">
                {d.magnitudeNote}
              </p>
            </div>

            {d.primaryStudy.pmid && (
              <div className="mb-3 rounded-lg bg-slate-50 p-3 border border-slate-200">
                <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
                  Primary study
                </div>
                <p className="text-sm text-brand-text-primary">
                  <strong>{d.primaryStudy.authors}</strong>{" "}
                  <em>{d.primaryStudy.journal}</em>{" "}
                  {d.primaryStudy.year ?? ""} · {d.primaryStudy.trial}
                  {d.primaryStudy.n != null && ` · n=${d.primaryStudy.n.toLocaleString()}`}
                </p>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${d.primaryStudy.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-violet hover:underline mt-2 inline-block"
                >
                  PMID {d.primaryStudy.pmid} →
                </a>
              </div>
            )}

            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
                Mechanism
              </div>
              <p className="text-sm text-brand-text-primary">{d.mechanism}</p>
            </div>

            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
                Combining with a GLP-1
              </div>
              <p className="text-sm text-brand-text-secondary">
                {d.interactionWithGlp1}
              </p>
            </div>

            <div className="mb-2">
              <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
                Safety
              </div>
              <p className="text-xs text-brand-text-secondary">
                {d.safetyNotes}
              </p>
            </div>

            {d.linkedArticleSlug && (
              <div className="pt-3 mt-3 border-t border-slate-100">
                <Link
                  href={`/research/${d.linkedArticleSlug}`}
                  className="text-sm font-semibold text-brand-violet hover:underline"
                >
                  Read the dedicated deep-dive →
                </Link>
              </div>
            )}
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-brand-violet/30 bg-white p-10 text-center">
            <p className="text-sm text-brand-text-secondary">
              No drugs match those filters. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
