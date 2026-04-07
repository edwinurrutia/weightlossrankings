"use client";

import { useMemo, useState } from "react";
import employersData from "@/data/employer-coverage.json";
import { trackToolEvent } from "@/lib/analytics";

type CoverageStatus =
  | "Covered"
  | "Prior auth"
  | "Step therapy"
  | "Not covered"
  | "Unknown";

interface Employer {
  employer_id: string;
  employer_name: string;
  industry: string;
  plan_administrator: string;
  wegovy_coverage: CoverageStatus;
  zepbound_coverage: CoverageStatus;
  ozempic_coverage: CoverageStatus;
  mounjaro_coverage: CoverageStatus;
  notes: string;
  data_as_of: string;
  confidence: "verified" | "reported" | "unverified";
}

const EMPLOYERS = employersData as Employer[];

const ALL_INDUSTRIES = Array.from(
  new Set(EMPLOYERS.map((e) => e.industry))
).sort();

function chipClasses(status: CoverageStatus): string {
  switch (status) {
    case "Covered":
      return "bg-brand-violet text-white";
    case "Prior auth":
      return "bg-brand-blue text-white";
    case "Step therapy":
      return "bg-slate-400 text-white";
    case "Not covered":
      return "bg-slate-300 text-slate-800";
    case "Unknown":
    default:
      return "bg-slate-200 text-slate-700";
  }
}

function confidenceLabel(c: Employer["confidence"]): string {
  switch (c) {
    case "verified":
      return "Verified from plan documents";
    case "reported":
      return "Reported / publicly discussed";
    case "unverified":
    default:
      return "Unverified — patient must confirm";
  }
}

function CoverageRow({
  label,
  status,
}: {
  label: string;
  status: CoverageStatus;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium text-brand-text-primary">
        {label}
      </span>
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${chipClasses(
          status
        )}`}
      >
        {status}
      </span>
    </div>
  );
}

export default function EmployerSearch() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string>("All");

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

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {results.map((e) => (
          <article
            key={e.employer_id}
            className="rounded-2xl border border-brand-violet/15 bg-white p-6 shadow-sm transition hover:border-brand-violet/40"
          >
            <header className="mb-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-brand-text-primary">
                  {e.employer_name}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet whitespace-nowrap">
                  {e.industry}
                </span>
              </div>
              <p className="mt-1 text-xs text-brand-text-secondary">
                Plan administrator:{" "}
                <span className="text-brand-text-primary">
                  {e.plan_administrator}
                </span>
              </p>
            </header>

            <div className="space-y-2.5 border-t border-slate-100 pt-4">
              <CoverageRow label="Wegovy" status={e.wegovy_coverage} />
              <CoverageRow label="Zepbound" status={e.zepbound_coverage} />
              <CoverageRow label="Ozempic" status={e.ozempic_coverage} />
              <CoverageRow label="Mounjaro" status={e.mounjaro_coverage} />
            </div>

            {e.notes && (
              <p className="mt-4 text-xs text-brand-text-secondary leading-relaxed">
                {e.notes}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-brand-text-secondary">
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
        ))}

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
          Coverage chip key
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              "Covered",
              "Prior auth",
              "Step therapy",
              "Not covered",
              "Unknown",
            ] as CoverageStatus[]
          ).map((s) => (
            <span
              key={s}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${chipClasses(
                s
              )}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
