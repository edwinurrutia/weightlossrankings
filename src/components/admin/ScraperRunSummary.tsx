"use client";

import { useState } from "react";

interface Props {
  generatedAt: string;
  filename: string;
  total: number;
  matched: number;
  mismatched: number;
  noData: number;
  failed: number;
}

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return iso;
  }
}

export default function ScraperRunSummary({
  generatedAt,
  filename,
  total,
  matched,
  mismatched,
  noData,
  failed,
}: Props) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <section className="rounded-2xl bg-white border border-brand-violet/10 shadow-sm p-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-brand-text-primary">
            Latest Scraper Run
          </h2>
          <p className="text-xs text-brand-text-secondary mt-1">
            Generated {formatTimestamp(generatedAt)} · {filename}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowInstructions((v) => !v)}
          className="inline-flex items-center rounded-lg bg-brand-gradient text-white text-xs font-bold px-4 py-2 shadow-sm hover:opacity-90"
        >
          ↻ Run scraper now
        </button>
      </div>

      {showInstructions && (
        <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 leading-relaxed">
          <p className="font-semibold mb-2">Run the scraper locally:</p>
          <pre className="bg-white/60 rounded-md p-3 text-xs font-mono overflow-x-auto">
            npm run scrape:fast
          </pre>
          <p className="mt-2 text-xs">
            Then commit & push the updated{" "}
            <code className="font-mono">docs/scraper-report-*.json</code> file
            and refresh this page. Future enhancement: queue-backed remote
            triggering via Vercel Cron / Inngest / Trigger.dev.
          </p>
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Stat label="Total" value={total} tone="neutral" />
        <Stat label="Matched" value={matched} tone="green" />
        <Stat label="Mismatched" value={mismatched} tone="red" />
        <Stat label="No Data" value={noData} tone="yellow" />
        <Stat label="Failed" value={failed} tone="gray" />
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "neutral" | "green" | "red" | "yellow" | "gray";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-brand-violet/5 border-brand-violet/10 text-brand-text-primary",
    green: "bg-emerald-50 border-emerald-200 text-emerald-900",
    red: "bg-red-50 border-red-200 text-red-900",
    yellow: "bg-amber-50 border-amber-200 text-amber-900",
    gray: "bg-gray-50 border-gray-200 text-gray-700",
  };
  return (
    <div className={`rounded-xl border p-3 ${tones[tone]}`}>
      <p className="text-[10px] font-bold uppercase tracking-wide opacity-70">
        {label}
      </p>
      <p className="mt-1 text-2xl font-extrabold">
        {value.toLocaleString("en-US")}
      </p>
    </div>
  );
}
