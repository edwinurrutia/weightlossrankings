"use client";

import { useState, useEffect, useMemo } from "react";
import type { Provider, Pricing } from "@/lib/types";
import CTAButton from "@/components/shared/CTAButton";
import EmailCapture from "@/components/shared/EmailCapture";
import ProviderCard from "@/components/providers/ProviderCard";

// ---------------------------------------------------------------------------
// Titration schedules
// ---------------------------------------------------------------------------

type DrugType = "semaglutide" | "tirzepatide";

interface TitrationStep {
  week: string;
  dose: string;
  label: string;
}

const TITRATION: Record<DrugType, TitrationStep[]> = {
  semaglutide: [
    { week: "Week 1-4", dose: "0.25mg", label: "Starting dose" },
    { week: "Week 5-8", dose: "0.5mg", label: "First increase" },
    { week: "Week 9-12", dose: "1mg", label: "Second increase" },
    { week: "Week 13-16", dose: "1.7mg", label: "Third increase" },
    { week: "Week 17+", dose: "2.4mg", label: "Maintenance dose" },
  ],
  tirzepatide: [
    { week: "Week 1-4", dose: "2.5mg", label: "Starting dose" },
    { week: "Week 5-8", dose: "5mg", label: "First increase" },
    { week: "Week 9-12", dose: "7.5mg", label: "Second increase" },
    { week: "Week 13-16", dose: "10mg", label: "Third increase" },
    { week: "Week 17+", dose: "15mg", label: "Maintenance dose" },
  ],
};

// Drug type keywords used to match providers by their pricing dose strings
const DRUG_KEYWORDS: Record<DrugType, string[]> = {
  semaglutide: ["semaglutide", "0.25mg", "0.5mg", "1mg", "1.7mg", "2.4mg"],
  tirzepatide: ["tirzepatide", "2.5mg", "5mg", "7.5mg", "10mg", "15mg"],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Given a provider's pricing array and a dose string (e.g. "0.5mg"),
 * find the monthly_cost of the best matching entry.
 * Returns null if no match is found.
 */
function findPriceForDose(pricing: Pricing[], dose: string): number | null {
  if (!pricing || pricing.length === 0) return null;

  // Normalise the target dose for comparison
  const normTarget = dose.toLowerCase().replace(/\s/g, "");

  // Exact dose match (any form)
  const exactMatch = pricing.find((p) => {
    const normDose = p.dose.toLowerCase().replace(/\s/g, "");
    return normDose === normTarget || normDose.includes(normTarget) || normTarget.includes(normDose);
  });

  if (exactMatch) return exactMatch.monthly_cost;
  return null;
}

/**
 * Determine whether a provider offers pricing for a given drug type.
 * Strategy: check dose strings in pricing for known dose values for that drug.
 */
function providerMatchesDrug(provider: Provider, drug: DrugType): boolean {
  if (!provider.pricing || provider.pricing.length === 0) return false;
  const keywords = DRUG_KEYWORDS[drug];
  return provider.pricing.some((p) =>
    keywords.some((kw) => p.dose.toLowerCase().includes(kw.toLowerCase()))
  );
}

/**
 * Calculate the step cost (one month = one 4-week stage).
 * For "Week 17+" we use 2 months in the 6-month total (months 5 & 6).
 */
function computeTotals(
  steps: TitrationStep[],
  pricing: Pricing[]
): { stepCosts: (number | null)[]; sixMonthTotal: number; annualTotal: number } {
  const stepCosts = steps.map((step) => findPriceForDose(pricing, step.dose));

  // 5 steps, each = 1 month (4 weeks). For 6-month total: steps 0-3 = 1 month each,
  // step 4 (Week 17+) = 2 months (months 5 & 6).
  let sixMonthTotal = 0;
  stepCosts.forEach((cost, idx) => {
    if (cost === null) return;
    const months = idx < 4 ? 1 : 2; // step 4 covers the remainder up to 6 months
    sixMonthTotal += cost * months;
  });

  // Annual: steps 0-3 are each 1 month, step 4 covers the remaining 8 months
  let annualTotal = 0;
  stepCosts.forEach((cost, idx) => {
    if (cost === null) return;
    const months = idx < 4 ? 1 : 8;
    annualTotal += cost * months;
  });

  return { stepCosts, sixMonthTotal, annualTotal };
}

function formatCost(value: number): string {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

// ---------------------------------------------------------------------------
// Skeleton for loading state
// ---------------------------------------------------------------------------

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="h-10 bg-gray-200 rounded-full mt-4" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function DoseTimelinePage() {
  const [allProviders, setAllProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrug, setSelectedDrug] = useState<DrugType>("semaglutide");
  const [selectedProviderSlug, setSelectedProviderSlug] = useState<string>("coreage-rx");

  // Fetch providers once on mount
  useEffect(() => {
    async function fetchProviders() {
      try {
        const res = await fetch("/api/providers");
        if (!res.ok) throw new Error("Failed to fetch providers");
        const data: Provider[] = await res.json();
        setAllProviders(data);
      } catch (err) {
        console.error("Error loading providers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProviders();
  }, []);

  // Providers that match the selected drug
  const matchingProviders = useMemo(
    () => allProviders.filter((p) => providerMatchesDrug(p, selectedDrug)),
    [allProviders, selectedDrug]
  );

  // Reset provider selection when drug changes (keep coreage-rx if available, else first match)
  useEffect(() => {
    if (matchingProviders.length === 0) return;
    const hasCoreage = matchingProviders.some((p) => p.slug === "coreage-rx");
    if (hasCoreage) {
      setSelectedProviderSlug("coreage-rx");
    } else {
      setSelectedProviderSlug(matchingProviders[0].slug);
    }
  }, [matchingProviders]);

  const selectedProvider = useMemo(
    () => matchingProviders.find((p) => p.slug === selectedProviderSlug) ?? matchingProviders[0],
    [matchingProviders, selectedProviderSlug]
  );

  const steps = TITRATION[selectedDrug];
  const { stepCosts, sixMonthTotal, annualTotal } = useMemo(() => {
    if (!selectedProvider) return { stepCosts: steps.map(() => null), sixMonthTotal: 0, annualTotal: 0 };
    return computeTotals(steps, selectedProvider.pricing);
  }, [selectedProvider, steps]);

  // Running totals for the timeline
  const runningTotals = useMemo(() => {
    const totals: (number | null)[] = [];
    let sum = 0;
    let hasAny = false;
    stepCosts.forEach((cost, idx) => {
      if (cost === null) {
        totals.push(hasAny ? sum : null);
      } else {
        hasAny = true;
        const months = idx < 4 ? 1 : 1; // each step is 1 month for running display
        sum += cost * months;
        totals.push(sum);
      }
    });
    return totals;
  }, [stepCosts]);

  // Alternative providers: cheapest 3 from matching providers (excluding selected)
  const alternativeProviders = useMemo(() => {
    return matchingProviders
      .filter((p) => p.slug !== selectedProviderSlug)
      .sort((a, b) => {
        const aMin = Math.min(...a.pricing.map((p) => p.monthly_cost));
        const bMin = Math.min(...b.pricing.map((p) => p.monthly_cost));
        return aMin - bMin;
      })
      .slice(0, 3);
  }, [matchingProviders, selectedProviderSlug]);

  return (
    <div className="min-h-screen bg-brand-gradient-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-text-primary leading-tight mb-3">
            GLP-1{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              Dose Timeline
            </span>
          </h1>
          <p className="text-brand-text-secondary text-base max-w-xl mx-auto">
            See the full titration schedule and total cost of your GLP-1 journey.
          </p>
        </div>

        {/* Drug selector */}
        <div className="flex justify-center gap-3 mb-8">
          {(["semaglutide", "tirzepatide"] as DrugType[]).map((drug) => (
            <button
              key={drug}
              onClick={() => setSelectedDrug(drug)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all border ${
                selectedDrug === drug
                  ? "bg-brand-gradient text-white border-transparent shadow-md"
                  : "bg-white text-brand-text-primary border-gray-200 hover:border-brand-violet/40"
              }`}
            >
              {drug === "semaglutide" ? "Semaglutide" : "Tirzepatide"}
            </button>
          ))}
        </div>

        {/* Provider selector */}
        <div className="mb-8">
          <label
            htmlFor="provider-select"
            className="block text-sm font-medium text-brand-text-secondary mb-2"
          >
            Compare pricing from:
          </label>
          {loading ? (
            <div className="h-11 rounded-xl bg-gray-200 animate-pulse w-full" />
          ) : (
            <select
              id="provider-select"
              value={selectedProviderSlug}
              onChange={(e) => setSelectedProviderSlug(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-violet/40 text-sm"
            >
              {matchingProviders.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Timeline */}
        {loading ? (
          <div className="space-y-4 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="relative mb-10">
            {/* Vertical connecting line */}
            <div className="absolute left-[7px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-violet to-brand-blue opacity-30" />

            {steps.map((step, idx) => {
              const price = stepCosts[idx];
              const runningTotal = runningTotals[idx];

              return (
                <div key={step.week} className="relative flex gap-5 mb-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-brand-gradient mt-5 z-10 ring-2 ring-white" />

                  {/* Card */}
                  <div className="flex-1 rounded-2xl bg-white border border-brand-violet/10 p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <span className="text-xs font-medium text-brand-text-secondary uppercase tracking-wide">
                          {step.week}
                        </span>
                        <h3 className="text-lg font-bold text-brand-text-primary leading-tight">
                          {step.dose}
                        </h3>
                        <p className="text-xs text-brand-text-secondary">{step.label}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-brand-text-secondary mb-0.5">Monthly cost</p>
                        <p className="text-xl font-bold text-brand-text-primary">
                          {price !== null ? formatCost(price) : "N/A"}
                        </p>
                      </div>
                    </div>

                    {runningTotal !== null && (
                      <p className="text-xs text-brand-text-secondary border-t border-gray-100 pt-2 mt-2">
                        Total so far:{" "}
                        <span className="font-semibold text-brand-violet">
                          {formatCost(runningTotal)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary card */}
        {!loading && selectedProvider && (
          <div className="rounded-2xl p-6 text-white mb-10" style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>
            <h2 className="text-xl font-bold mb-4">Cost Summary</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/15 rounded-xl p-4">
                <p className="text-sm text-white/80 mb-1">Total First 6 Months</p>
                <p className="text-2xl font-extrabold">
                  {sixMonthTotal > 0 ? formatCost(sixMonthTotal) : "N/A"}
                </p>
              </div>
              <div className="bg-white/15 rounded-xl p-4">
                <p className="text-sm text-white/80 mb-1">Estimated Annual Cost</p>
                <p className="text-2xl font-extrabold">
                  {annualTotal > 0 ? formatCost(annualTotal) : "N/A"}
                </p>
              </div>
            </div>

            <CTAButton
              href={selectedProvider.affiliate_url}
              external
              size="lg"
              variant="white"
              className="w-full"
              trackProvider={selectedProvider.slug}
              trackSource="dose_timeline"
            >
              Get Started with {selectedProvider.name}
            </CTAButton>
          </div>
        )}

        {/* Alternative providers */}
        {!loading && alternativeProviders.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-brand-text-primary mb-4">
              Alternative Providers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {alternativeProviders.map((provider) => (
                <ProviderCard
                  key={provider._id}
                  provider={provider}
                  trackingSource="dose_timeline"
                />
              ))}
            </div>
          </div>
        )}

        {/* Email capture */}
        <EmailCapture
          heading="Get the Free GLP-1 Titration Guide"
          description="Weekly dose tips, cost alerts, and provider reviews delivered to your inbox."
          source="dose_timeline"
        />
      </div>
    </div>
  );
}
