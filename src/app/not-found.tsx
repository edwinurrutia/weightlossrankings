import type { Metadata } from "next";
import Link from "next/link";
import { RESEARCH_ARTICLES } from "@/lib/research";
import providersData from "@/data/providers.json";
import fdaWarningLettersData from "@/data/fda-warning-letters.json";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "We searched the entire site and couldn't find what you're looking for. Here are the parts of Weight Loss Rankings that DO exist — research articles, calculators, provider rankings, and the FDA warning letters database.",
  // 404s should not be indexed and should not pass link equity
  robots: { index: false, follow: false },
};

// Dynamic counts so the 404 stays in sync with the actual content
// surface as we add more research, more providers, more letters.
// Same data sources the rest of the site reads — single source of truth.
const RESEARCH_COUNT = RESEARCH_ARTICLES.length;
const PROVIDER_COUNT = (providersData as unknown[]).length;
const FDA_LETTER_COUNT = (fdaWarningLettersData as unknown[]).length;

// Round provider count down to nearest 5 so the displayed number
// matches the rest of the site (homepage uses the same rounding).
const providerCountDisplay = `${Math.max(5, Math.floor(PROVIDER_COUNT / 5) * 5)}+`;

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Big 404 with brand-violet gradient */}
        <p
          className="font-heading font-black tracking-tight text-brand-violet/15 select-none leading-none"
          style={{ fontSize: "clamp(7rem, 18vw, 14rem)" }}
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary tracking-tight mt-2">
          This page is on a permanent fast.
        </h1>

        <p className="mt-5 text-lg text-brand-text-secondary leading-relaxed max-w-xl mx-auto">
          We searched <strong>{RESEARCH_COUNT} research articles</strong>,{" "}
          <strong>6 calculators</strong>,{" "}
          <strong>{providerCountDisplay} telehealth providers</strong>, and{" "}
          <strong>{FDA_LETTER_COUNT} FDA warning letters</strong>.
          {" "}Couldn&apos;t find this one. The URL may have moved, been renamed,
          or never existed.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
          <Link
            href="/research"
            className="group rounded-2xl border border-brand-violet/15 bg-white p-5 hover:border-brand-violet/40 hover:shadow-md transition"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-brand-violet">
              Editorial
            </p>
            <p className="mt-1 font-semibold text-brand-text-primary">
              Latest Research →
            </p>
            <p className="mt-1 text-xs text-brand-text-secondary">
              {RESEARCH_COUNT} PubMed and FDA-cited deep-dives on GLP-1
              weight loss
            </p>
          </Link>

          <Link
            href="/best/semaglutide-providers"
            className="group rounded-2xl border border-brand-violet/15 bg-white p-5 hover:border-brand-violet/40 hover:shadow-md transition"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-brand-violet">
              Compare
            </p>
            <p className="mt-1 font-semibold text-brand-text-primary">
              Best Semaglutide Providers →
            </p>
            <p className="mt-1 text-xs text-brand-text-secondary">
              Independent rankings of every Wegovy / Ozempic / compounded
              semaglutide telehealth
            </p>
          </Link>

          <Link
            href="/best/tirzepatide-providers"
            className="group rounded-2xl border border-brand-violet/15 bg-white p-5 hover:border-brand-violet/40 hover:shadow-md transition"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-brand-violet">
              Compare
            </p>
            <p className="mt-1 font-semibold text-brand-text-primary">
              Best Tirzepatide Providers →
            </p>
            <p className="mt-1 text-xs text-brand-text-secondary">
              Zepbound, Mounjaro, and compounded tirzepatide rankings
            </p>
          </Link>

          <Link
            href="/tools"
            className="group rounded-2xl border border-brand-violet/15 bg-white p-5 hover:border-brand-violet/40 hover:shadow-md transition"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-brand-violet">
              Tools
            </p>
            <p className="mt-1 font-semibold text-brand-text-primary">
              Calculators &amp; Checkers →
            </p>
            <p className="mt-1 text-xs text-brand-text-secondary">
              BMI, weight loss prediction, savings, drug interactions, washout
            </p>
          </Link>

          <Link
            href="/research/fda-warning-letters-glp1"
            className="group rounded-2xl border border-brand-violet/15 bg-white p-5 hover:border-brand-violet/40 hover:shadow-md transition sm:col-span-2"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-brand-violet">
              Live database
            </p>
            <p className="mt-1 font-semibold text-brand-text-primary">
              FDA Warning Letters Database →
            </p>
            <p className="mt-1 text-xs text-brand-text-secondary">
              Every FDA warning letter to a compounded GLP-1 telehealth
              provider — {FDA_LETTER_COUNT} entries, updated bi-weekly
            </p>
          </Link>
        </div>

        <p className="mt-10 text-xs text-brand-text-secondary/70">
          Still can&apos;t find what you need?{" "}
          <Link
            href="/contact"
            className="text-brand-violet underline hover:no-underline"
          >
            Contact us
          </Link>{" "}
          and tell us what URL sent you here — we&apos;ll add a redirect.
        </p>
      </div>
    </main>
  );
}
