"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ALL_CATEGORIES,
  SUPPLEMENTS,
  compareByGrade,
  gradeLabel,
  type Grade,
} from "@/lib/supplement-evidence";
import { trackToolEvent } from "@/lib/analytics";

const GRADE_FILTER_OPTIONS: Array<{ value: Grade | "all"; label: string }> = [
  { value: "all", label: "All grades" },
  { value: "A", label: "Grade A only" },
  { value: "B", label: "Grade B" },
  { value: "C", label: "Grade C" },
  { value: "D", label: "Grade D" },
  { value: "D-for-weight", label: "Oppositional (D for weight)" },
];

const GRADE_BADGE_CLASSES: Record<Grade, string> = {
  A: "bg-brand-violet text-white",
  B: "bg-brand-blue text-white",
  C: "bg-slate-400 text-white",
  D: "bg-slate-300 text-slate-800",
  "D-for-weight": "bg-slate-300 text-slate-800",
};

export default function SupplementGrader() {
  const [query, setQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState<Grade | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SUPPLEMENTS.filter((s) => {
      const matchesQuery =
        q.length === 0 ||
        s.name.toLowerCase().includes(q) ||
        s.latinName.toLowerCase().includes(q);
      const matchesGrade = gradeFilter === "all" || s.grade === gradeFilter;
      const matchesCategory =
        categoryFilter === "All" || s.category === categoryFilter;
      return matchesQuery && matchesGrade && matchesCategory;
    }).sort(compareByGrade);
  }, [query, gradeFilter, categoryFilter]);

  return (
    <div className="not-prose">
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm mb-6">
        <div className="grid gap-4 sm:grid-cols-[1fr_180px_180px]">
          <div>
            <label
              htmlFor="supplement-search"
              className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-2"
            >
              Search supplement
            </label>
            <input
              id="supplement-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. berberine, ashwagandha, MCT oil"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-2">
              Grade
            </label>
            <select
              value={gradeFilter}
              onChange={(e) => {
                setGradeFilter(e.target.value as Grade | "all");
                trackToolEvent("supplement_grader", "grade_filter", {
                  grade: e.target.value,
                });
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
            >
              {GRADE_FILTER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                trackToolEvent("supplement_grader", "category_filter", {
                  category: e.target.value,
                });
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
            >
              <option value="All">All categories</option>
              {ALL_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-4 text-xs text-brand-text-secondary">
          Showing {filtered.length} of {SUPPLEMENTS.length} supplements.
          Sorted by evidence grade (best first).
        </p>
      </div>

      <div className="space-y-4">
        {filtered.map((s) => (
          <article
            key={s.id}
            className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm transition hover:border-brand-violet/40"
          >
            <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-brand-text-primary">
                  {s.name}
                </h3>
                <p className="text-xs text-brand-text-secondary mt-0.5 italic">
                  {s.latinName}
                </p>
                <p className="text-xs text-brand-violet mt-1 font-semibold uppercase tracking-wider">
                  {s.category}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${GRADE_BADGE_CLASSES[s.grade]}`}
                >
                  Grade {s.grade.replace("-for-weight", "")}
                </span>
                <span className="text-[11px] text-brand-text-secondary">
                  {gradeLabel(s.grade)}
                </span>
              </div>
            </header>

            <div className="grid gap-3 sm:grid-cols-2 mb-4">
              <div className="rounded-lg bg-brand-bg-purple p-3 border border-brand-violet/15">
                <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold">
                  Magnitude vs GLP-1
                </div>
                <div className="text-2xl font-bold text-brand-violet mt-1">
                  ~{s.magnitudeVsGlp1Pct}%
                </div>
                <div className="text-[11px] text-brand-text-secondary">
                  of typical semaglutide / tirzepatide effect
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
                <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold">
                  Cost / month
                </div>
                <div className="text-2xl font-bold text-brand-text-primary mt-1">
                  {s.costPerMonth}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
                Mechanism
              </div>
              <p className="text-sm text-brand-text-primary">
                {s.mechanism}
              </p>
            </div>

            <div className="mb-4 rounded-lg bg-slate-50 p-3 border border-slate-200">
              <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
                Primary study
              </div>
              <p className="text-sm text-brand-text-primary">
                <strong>{s.primaryStudy.authors}</strong>{" "}
                <em>{s.primaryStudy.journal}</em>{" "}
                {s.primaryStudy.year ?? ""} · {s.primaryStudy.design} ·
                n={s.primaryStudy.n} · {s.primaryStudy.duration}
              </p>
              <p className="text-sm text-brand-text-secondary mt-1">
                <strong>Result:</strong> {s.primaryStudy.weightEffect}
              </p>
              {s.primaryStudy.pmid && (
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${s.primaryStudy.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-violet hover:underline mt-2 inline-block"
                >
                  PMID {s.primaryStudy.pmid} →
                </a>
              )}
            </div>

            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
                Confidence note
              </div>
              <p className="text-sm text-brand-text-secondary leading-relaxed">
                {s.confidenceNote}
              </p>
            </div>

            <div className="mb-2">
              <div className="text-[10px] uppercase tracking-wider text-brand-text-secondary font-bold mb-1">
                Safety
              </div>
              <p className="text-xs text-brand-text-secondary">
                {s.safetyConcerns}
              </p>
            </div>

            {s.linkedArticleSlug && (
              <div className="pt-3 mt-3 border-t border-slate-100">
                <Link
                  href={`/research/${s.linkedArticleSlug}`}
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
              No supplements match those filters. Try a different search
              term or grade filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
