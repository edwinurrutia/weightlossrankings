"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import TrackedAffiliateLink from "@/components/shared/TrackedAffiliateLink";

/** Slim provider shape — just enough fields to match and render. The
 *  parent server component projects providers.json down to this so we
 *  don't ship the full review bodies to the client. */
export interface QuickMatchProvider {
  name: string;
  slug: string;
  affiliate_url: string;
  best_for?: string;
  states_available: string[];
  scoreOverall: number;
  prices: Array<{
    form: "compounded" | "brand";
    monthly: number;
  }>;
}

export interface QuickMatchState {
  code: string;
  name: string;
}

interface HomeQuickMatchProps {
  providers: QuickMatchProvider[];
  states: QuickMatchState[];
}

type Budget = "any" | "100" | "200" | "400";
type FormPref = "either" | "compounded" | "brand";

const BUDGET_OPTIONS: Array<{ value: Budget; label: string; max: number }> = [
  { value: "100", label: "Under $100/mo", max: 100 },
  { value: "200", label: "$100 – $200/mo", max: 200 },
  { value: "400", label: "$200 – $400/mo", max: 400 },
  { value: "any", label: "Money is no object", max: Number.POSITIVE_INFINITY },
];

const FORM_OPTIONS: Array<{
  value: FormPref;
  label: string;
  hint: string;
}> = [
  {
    value: "compounded",
    label: "Compounded (cheapest)",
    hint: "Same active drug, made by 503A pharmacies",
  },
  {
    value: "brand",
    label: "Brand-name FDA approved",
    hint: "Wegovy, Ozempic, Mounjaro, Zepbound",
  },
  {
    value: "either",
    label: "Either is fine",
    hint: "Show me the best match overall",
  },
];

const formatUsd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

/**
 * Three-question conversion widget.
 *
 * Visitor picks budget → state → form preference, and we instantly
 * surface the best-matching provider from the ranked dataset. Inline
 * progress chips show how far they are. Re-runnable from the result.
 */
export default function HomeQuickMatch({
  providers,
  states,
}: HomeQuickMatchProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [stateCode, setStateCode] = useState<string>("");
  const [formPref, setFormPref] = useState<FormPref | null>(null);

  const matches = useMemo(() => {
    if (!budget || !stateCode || !formPref) return [];
    const maxBudget = BUDGET_OPTIONS.find((b) => b.value === budget)?.max ?? 0;
    return providers
      .filter((p) => p.states_available.includes(stateCode))
      .filter((p) =>
        p.prices.some((pr) => {
          if (formPref !== "either" && pr.form !== formPref) return false;
          return pr.monthly <= maxBudget;
        }),
      )
      .map((p) => {
        const eligiblePrices = p.prices.filter((pr) => {
          if (formPref !== "either" && pr.form !== formPref) return false;
          return pr.monthly <= maxBudget;
        });
        const cheapest = Math.min(...eligiblePrices.map((pr) => pr.monthly));
        return { ...p, displayPrice: cheapest };
      })
      .sort((a, b) => b.scoreOverall - a.scoreOverall)
      .slice(0, 3);
  }, [providers, budget, stateCode, formPref]);

  const restart = () => {
    setBudget(null);
    setStateCode("");
    setFormPref(null);
    setStep(1);
  };

  const progressLabel =
    step === 1
      ? "Step 1 of 3 · Your budget"
      : step === 2
        ? "Step 2 of 3 · Your state"
        : step === 3
          ? "Step 3 of 3 · Brand vs compounded"
          : "Your top match";

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="rounded-3xl border border-brand-violet/15 bg-gradient-to-br from-white via-white to-brand-violet/[0.04] shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-7 sm:p-9 border-b border-brand-violet/10">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-2">
            Quick Match
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary tracking-tight">
            Find your provider in 30 seconds
          </h2>
          <p className="mt-3 text-base text-brand-text-secondary max-w-2xl">
            Three questions. We&apos;ll instantly show you the highest-rated
            provider that matches your budget, state, and preference — based
            on real pricing data.
          </p>

          {/* Progress bar */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex gap-1.5 flex-1 max-w-xs">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    step > n
                      ? "bg-brand-violet"
                      : step === n
                        ? "bg-brand-violet"
                        : "bg-brand-violet/15"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">
              {progressLabel}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-7 sm:p-9">
          {step === 1 && (
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-5">
                What&apos;s your monthly budget?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setBudget(opt.value);
                      setStep(2);
                    }}
                    className="text-left rounded-2xl border border-brand-violet/15 hover:border-brand-violet hover:bg-brand-violet/5 px-5 py-4 font-semibold text-brand-text-primary transition-all"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-5">
                Which state do you live in?
              </h3>
              <select
                value={stateCode}
                onChange={(e) => {
                  setStateCode(e.target.value);
                  if (e.target.value) setStep(3);
                }}
                className="w-full sm:max-w-sm rounded-2xl border border-brand-violet/20 bg-white px-5 py-4 text-base font-semibold text-brand-text-primary focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
              >
                <option value="">Select your state...</option>
                {states.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="ml-4 text-sm font-semibold text-brand-text-secondary hover:text-brand-violet"
              >
                ← Back
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-text-primary mb-5">
                Brand-name or compounded?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FORM_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setFormPref(opt.value);
                      setStep(4);
                    }}
                    className="text-left rounded-2xl border border-brand-violet/15 hover:border-brand-violet hover:bg-brand-violet/5 px-5 py-4 transition-all"
                  >
                    <div className="font-bold text-brand-text-primary text-sm">
                      {opt.label}
                    </div>
                    <div className="text-xs text-brand-text-secondary mt-1 leading-snug">
                      {opt.hint}
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-4 text-sm font-semibold text-brand-text-secondary hover:text-brand-violet"
              >
                ← Back
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              {matches.length === 0 ? (
                <div className="text-center py-6">
                  <p className="font-heading text-xl font-bold text-brand-text-primary">
                    No exact matches in our database for that combination.
                  </p>
                  <p className="mt-2 text-sm text-brand-text-secondary">
                    Try a higher budget or a different drug form.
                  </p>
                  <button
                    type="button"
                    onClick={restart}
                    className="mt-5 inline-flex items-center justify-center bg-brand-violet hover:bg-brand-violet/90 text-white font-bold text-sm px-5 py-3 rounded-full"
                  >
                    Start over
                  </button>
                </div>
              ) : (
                <>
                  {/* #1 match */}
                  <div className="rounded-2xl bg-brand-violet/[0.04] border border-brand-violet/20 p-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-bold bg-brand-violet text-white px-2.5 py-1 rounded-full mb-3">
                          Your top match
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text-primary">
                          {matches[0].name}
                        </h3>
                        {matches[0].best_for && (
                          <p className="text-sm text-brand-text-secondary mt-1">
                            Best for {matches[0].best_for}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-heading text-3xl font-black text-brand-violet leading-none">
                          {matches[0].scoreOverall.toFixed(1)}
                          <span className="text-base font-semibold text-brand-text-secondary">
                            /10
                          </span>
                        </div>
                        <div className="mt-2 font-heading text-xl font-bold text-brand-text-primary">
                          {formatUsd(matches[0].displayPrice)}
                          <span className="text-xs font-normal text-brand-text-secondary ml-1">
                            /mo
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col sm:flex-row gap-3">
                      <TrackedAffiliateLink
                        href={matches[0].affiliate_url}
                        provider={matches[0].slug}
                        source="homepage_quick_match"
                        position={1}
                        className="flex-1 inline-flex items-center justify-center bg-brand-violet hover:bg-brand-violet/90 text-white font-bold text-base px-6 py-3.5 rounded-full transition-colors"
                      >
                        Get started with {matches[0].name}
                      </TrackedAffiliateLink>
                      <Link
                        href={`/providers/${matches[0].slug}`}
                        className="inline-flex items-center justify-center text-brand-text-primary font-semibold text-sm px-5 py-3.5 rounded-full border border-brand-violet/20 hover:border-brand-violet/40 hover:text-brand-violet transition"
                      >
                        Read review
                      </Link>
                    </div>
                  </div>

                  {/* Runners-up */}
                  {matches.length > 1 && (
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-[0.12em] font-bold text-brand-text-secondary mb-3">
                        Other strong matches
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {matches.slice(1).map((m) => (
                          <li
                            key={m.slug}
                            className="rounded-xl border border-brand-violet/10 bg-white p-4 flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="font-bold text-sm text-brand-text-primary truncate">
                                {m.name}
                              </div>
                              <div className="text-xs text-brand-text-secondary">
                                {m.scoreOverall.toFixed(1)}/10 ·{" "}
                                {formatUsd(m.displayPrice)}/mo
                              </div>
                            </div>
                            <Link
                              href={`/providers/${m.slug}`}
                              className="text-xs font-semibold text-brand-violet whitespace-nowrap hover:underline"
                            >
                              View →
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={restart}
                    className="mt-5 text-sm font-semibold text-brand-text-secondary hover:text-brand-violet"
                  >
                    ← Start over
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
