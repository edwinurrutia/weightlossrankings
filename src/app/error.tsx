"use client";

import { useEffect } from "react";
import Link from "next/link";

// Next.js error boundary for the App Router. Catches uncaught errors
// in any route segment under app/ and renders this UI instead of
// crashing the whole tree. Must be a client component because it
// receives an `error` prop and a `reset` callback.
//
// Critically, this is NOT an SEO surface — Next.js returns a 500
// status code so the page is never indexed. We just need a friendly
// fallback for the rare patient who actually hits a server error.
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this would forward to Sentry / Datadog / etc.
    // For now we just log to the browser console for visibility.
    // eslint-disable-next-line no-console
    console.error("[Weight Loss Rankings] Unhandled route error:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <p
          className="font-heading font-black tracking-tight text-brand-violet/15 select-none leading-none"
          style={{ fontSize: "clamp(7rem, 18vw, 14rem)" }}
          aria-hidden="true"
        >
          500
        </p>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary tracking-tight mt-2">
          Something on our side broke.
        </h1>

        <p className="mt-5 text-lg text-brand-text-secondary leading-relaxed max-w-xl mx-auto">
          A page on Weight Loss Rankings failed to load. This is on us, not
          you. Try again in a moment, or head back to one of the parts of
          the site that&apos;s still working below.
        </p>

        {error.digest && (
          <p className="mt-3 text-xs text-brand-text-secondary/60">
            Error reference:{" "}
            <code className="font-mono">{error.digest}</code>
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-brand-violet text-white font-semibold hover:bg-brand-violet/90 transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-brand-violet/30 text-brand-violet font-semibold hover:bg-brand-violet/5 transition"
          >
            Go to homepage
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left text-xs">
          <Link
            href="/research"
            className="rounded-xl border border-brand-violet/15 bg-white p-4 hover:border-brand-violet/40 transition"
          >
            <p className="font-semibold text-brand-text-primary">
              Latest Research
            </p>
            <p className="mt-1 text-brand-text-secondary">
              PubMed-cited GLP-1 deep-dives
            </p>
          </Link>
          <Link
            href="/tools"
            className="rounded-xl border border-brand-violet/15 bg-white p-4 hover:border-brand-violet/40 transition"
          >
            <p className="font-semibold text-brand-text-primary">Calculators</p>
            <p className="mt-1 text-brand-text-secondary">
              BMI, savings, drug interactions
            </p>
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-brand-violet/15 bg-white p-4 hover:border-brand-violet/40 transition"
          >
            <p className="font-semibold text-brand-text-primary">Contact</p>
            <p className="mt-1 text-brand-text-secondary">
              Tell us what broke
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
