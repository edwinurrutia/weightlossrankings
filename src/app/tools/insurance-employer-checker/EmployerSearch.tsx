"use client";

import { useMemo, useState } from "react";
import employersData from "@/data/employer-coverage.json";
import { trackToolEvent } from "@/lib/analytics";

// Coverage fields are descriptive paragraphs (not short status chips)
// because real-world employer formularies require nuance: BMI
// thresholds, dependent eligibility, vendor routing, prior-auth
// criteria, etc. The original schema used short statuses like
// "Covered" / "Prior auth" but that lost too much fidelity. We now
// render each coverage field as a labeled paragraph and detect a
// short "headline status" from the leading word for the chip badge.
interface Employer {
  employer_id: string;
  employer_name: string;
  industry: string;
  plan_administrator: string;
  wegovy_coverage: string;
  zepbound_coverage: string;
  ozempic_coverage: string;
  mounjaro_coverage: string;
  notes: string;
  data_as_of: string;
  confidence: "high" | "medium" | "low" | "unverified";
}

const EMPLOYERS = employersData as Employer[];

const ALL_INDUSTRIES = Array.from(
  new Set(EMPLOYERS.map((e) => e.industry)),
).sort();

// Pull a short "status headline" from the start of a long coverage
// description so we can render a small color-coded chip alongside
// the full text. This is heuristic — pattern-matches the leading
// phrasing the editorial team consistently uses across the dataset.
type CoverageStatus =
  | "Covered"
  | "Covered (PA)"
  | "Step therapy"
  | "Not covered"
  | "Verify with HR"
  | "Unknown";

function detectStatus(description: string): CoverageStatus {
  const t = description.toLowerCase();
  if (t.includes("not covered") || t.startsWith("excluded")) return "Not covered";
  if (t.includes("step therapy")) return "Step therapy";
  if (
    t.startsWith("fully covered") ||
    t.startsWith("covered for") ||
    t.startsWith("covered via") ||
    t.startsWith("covered with") ||
    t.startsWith("covered by") ||
    t.startsWith("covered (") ||
    t.startsWith("covered.") ||
    t === "covered"
  ) {
    if (t.includes("prior auth") || t.includes("prior authorization")) {
      return "Covered (PA)";
    }
    return "Covered";
  }
  if (t.startsWith("coverage requires") || t.startsWith("coverage available")) {
    return "Covered (PA)";
  }
  if (t.includes("verify") && t.includes("hr")) return "Verify with HR";
  return "Unknown";
}

function chipClasses(status: CoverageStatus): string {
  switch (status) {
    case "Covered":
      return "bg-brand-violet text-white";
    case "Covered (PA)":
      return "bg-brand-blue text-white";
    case "Step therapy":
      return "bg-slate-500 text-white";
    case "Not covered":
      return "bg-slate-300 text-slate-800";
    case "Verify with HR":
      return "bg-slate-200 text-slate-700";
    case "Unknown":
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function confidenceLabel(c: Employer["confidence"]): string {
  switch (c) {
    case "high":
      return "Verified from primary employer or plan source";
    case "medium":
      return "Reported from secondary source — patient should confirm";
    case "low":
      return "Low confidence — patient must confirm with HR";
    case "unverified":
    default:
      return "Unverified — patient must confirm";
  }
}

function CoverageBlock({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  const status = detectStatus(description);
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-bold text-brand-text-primary">
          {label}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${chipClasses(
            status,
          )}`}
        >
          {status}
        </span>
      </div>
      <p className="text-xs text-brand-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function EmployerSearch() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string>("All");
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>(
    {},
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EMPLOYERS.filter((e) => {
      const matchesQuery =
        q.length === 0 || e.employer_name.toLowerCase().includes(q);
      const matchesIndustry = industry === "All" || e.industry === industry;
      return matchesQuery && matchesIndustry;
    }).sort((a, b) => a.employer_name.localeCompare(b.employer_name));
  }, [query, industry]);

  return (
    <div>
      <div className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
          <div>
            <label
              htmlFor="employer-search"
              className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-2"
            >
              Search employer
            </label>
            <input
              id="employer-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Amazon, Walmart, JPMorgan"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-brand-text-primary placeholder:text-slate-400 focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
            />
          </div>
          <div>
            <label
              htmlFor="industry-filter"
              className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-2"
            >
              Industry
            </label>
            <select
              id="industry-filter"
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                trackToolEvent("employer_checker", "industry_filter", {
                  industry: e.target.value,
                });
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-brand-text-primary focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
            >
              <option value="All">All industries</option>
              {ALL_INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-4 text-xs text-brand-text-secondary">
          Showing {results.length} of {EMPLOYERS.length} employers.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {results.map((e) => {
          const isExpanded = expandedNotes[e.employer_id] ?? false;
          const notesPreview =
            e.notes.length > 220 && !isExpanded
              ? e.notes.slice(0, 220).trimEnd() + "…"
              : e.notes;
          return (
            <article
              key={e.employer_id}
              className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm transition hover:border-brand-violet/40"
            >
              <header className="mb-5 pb-4 border-b border-slate-100">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-brand-text-primary leading-tight">
                    {e.employer_name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-violet whitespace-nowrap pt-1">
                    {e.industry}
                  </span>
                </div>
                <p className="mt-2 text-xs text-brand-text-secondary">
                  Plan administrator:{" "}
                  <span className="text-brand-text-primary font-medium">
                    {e.plan_administrator}
                  </span>
                </p>
              </header>

              <div className="space-y-4">
                <CoverageBlock
                  label="Wegovy"
                  description={e.wegovy_coverage}
                />
                <CoverageBlock
                  label="Zepbound"
                  description={e.zepbound_coverage}
                />
                <CoverageBlock label="Ozempic" description={e.ozempic_coverage} />
                <CoverageBlock
                  label="Mounjaro"
                  description={e.mounjaro_coverage}
                />
              </div>

              {e.notes && (
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-text-secondary mb-2">
                    Verification details
                  </p>
                  <p className="text-xs text-brand-text-secondary leading-relaxed whitespace-pre-line">
                    {notesPreview}
                  </p>
                  {e.notes.length > 220 && (
                    <button
                      onClick={() =>
                        setExpandedNotes((prev) => ({
                          ...prev,
                          [e.employer_id]: !isExpanded,
                        }))
                      }
                      className="mt-2 text-xs font-semibold text-brand-violet hover:underline"
                    >
                      {isExpanded ? "Show less" : "Read full source notes"}
                    </button>
                  )}
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-brand-text-secondary">
                <span>Data as of {e.data_as_of}</span>
                <span className="font-semibold text-brand-violet">
                  {confidenceLabel(e.confidence)}
                </span>
              </div>

              <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-brand-text-secondary">
                Always verify with your HR / benefits portal before assuming
                coverage.
              </p>
            </article>
          );
        })}

        {results.length === 0 && (
          <div className="sm:col-span-2 rounded-2xl border border-dashed border-brand-violet/30 bg-white p-10 text-center">
            <p className="text-sm text-brand-text-secondary">
              No employers match your search. Try a different name or
              industry filter.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-brand-violet/15 bg-slate-50 p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-text-primary mb-3">
          Coverage status key
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              "Covered",
              "Covered (PA)",
              "Step therapy",
              "Verify with HR",
              "Not covered",
            ] as CoverageStatus[]
          ).map((s) => (
            <span
              key={s}
              className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${chipClasses(
                s,
              )}`}
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-brand-text-secondary leading-relaxed">
          Covered = no prior authorization required. Covered (PA) =
          covered with prior authorization. Step therapy = patient must
          try a preferred drug first. Verify with HR = framework
          confirmed but employer-specific election not publicly
          documented.
        </p>
      </div>
    </div>
  );
}
