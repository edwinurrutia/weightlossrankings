"use client";

import { useState } from "react";
import type { ScrapedPrice, StoredPriceLite } from "@/lib/scraper-report";

interface Props {
  slug: string;
  name: string;
  url: string;
  storedPrices: StoredPriceLite[];
  foundPrices: ScrapedPrice[];
}

type ActionState = "idle" | "loading" | "success" | "error" | "done";

export default function MismatchRow({
  slug,
  name,
  url,
  storedPrices,
  foundPrices,
}: Props) {
  const [state, setState] = useState<ActionState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  // Group scraped prices by drug attribution.
  const byDrug = new Map<string, ScrapedPrice[]>();
  for (const p of foundPrices) {
    const key = p.drug_hint ?? "unknown";
    if (!byDrug.has(key)) byDrug.set(key, []);
    byDrug.get(key)!.push(p);
  }

  // Pick the lowest semaglutide / tirzepatide / first sensible price as the
  // "primary scraped" candidate to approve.
  const primary =
    foundPrices.find((p) => p.drug_hint === "semaglutide") ??
    foundPrices.find((p) => p.drug_hint === "tirzepatide") ??
    foundPrices[0];

  async function callAction(
    action: "approve_price" | "mark_verified" | "ignore",
    scrapedValue?: number,
    drug?: string | null
  ) {
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/admin/scraper/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider_slug: slug,
          action,
          scraped_value: scrapedValue,
          drug: drug ?? undefined,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? `HTTP ${res.status}`);
      }
      setState("done");
      setMessage(
        action === "approve_price"
          ? `Updated stored price to $${scrapedValue}`
          : action === "mark_verified"
          ? "Marked as verified at current price"
          : "Marked as ignored"
      );
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : String(err));
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        <p className="font-semibold">
          {name} ({slug}) — resolved
        </p>
        <p className="text-xs mt-1">{message}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50/40 p-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <p className="font-bold text-brand-text-primary">{name}</p>
          <p className="text-xs text-brand-text-secondary font-mono">{slug}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-brand-violet hover:underline"
        >
          Open site →
        </a>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg bg-white border border-brand-violet/10 p-3">
          <p className="font-bold uppercase tracking-wide text-[10px] text-brand-text-secondary mb-2">
            Stored prices
          </p>
          <ul className="space-y-1">
            {storedPrices.map((p, i) => (
              <li key={i} className="flex justify-between gap-2">
                <span className="text-brand-text-secondary">
                  {p.dose} · {p.form}
                </span>
                <span className="font-bold text-brand-text-primary">
                  ${p.monthly_cost}
                </span>
              </li>
            ))}
            {storedPrices.length === 0 && (
              <li className="text-brand-text-secondary italic">
                No stored prices
              </li>
            )}
          </ul>
        </div>
        <div className="rounded-lg bg-white border border-brand-violet/10 p-3">
          <p className="font-bold uppercase tracking-wide text-[10px] text-brand-text-secondary mb-2">
            Scraped prices
          </p>
          <ul className="space-y-1 max-h-48 overflow-y-auto">
            {Array.from(byDrug.entries()).map(([drug, prices]) => (
              <li key={drug}>
                <p className="text-[10px] font-bold uppercase text-brand-text-secondary/70">
                  {drug}
                </p>
                {prices.map((p, i) => (
                  <div key={i} className="flex justify-between gap-2 pl-2">
                    <a
                      href={p.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-violet hover:underline truncate max-w-[180px]"
                      title={p.source_url}
                    >
                      {new URL(p.source_url).pathname || "/"}
                    </a>
                    <span className="font-bold text-brand-text-primary">
                      ${p.amount}
                    </span>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {state === "error" && message && (
        <p className="mt-3 text-xs text-red-700 font-semibold">Error: {message}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {primary && (
          <button
            type="button"
            disabled={state === "loading"}
            onClick={() =>
              callAction("approve_price", primary.amount, primary.drug_hint)
            }
            className="inline-flex items-center rounded-lg bg-emerald-600 text-white text-xs font-bold px-3 py-2 hover:bg-emerald-700 disabled:opacity-50"
          >
            Approve scraped price (${primary.amount})
          </button>
        )}
        <button
          type="button"
          disabled={state === "loading"}
          onClick={() => callAction("mark_verified")}
          className="inline-flex items-center rounded-lg bg-brand-violet text-white text-xs font-bold px-3 py-2 hover:opacity-90 disabled:opacity-50"
        >
          Mark as verified at current price
        </button>
        <button
          type="button"
          disabled={state === "loading"}
          onClick={() => callAction("ignore")}
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white text-xs font-bold text-brand-text-primary px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
        >
          Ignore
        </button>
      </div>
    </div>
  );
}
