import type { Metadata } from "next";
import Link from "next/link";
import DosePlotter from "./DosePlotter";

export const metadata: Metadata = {
  title:
    "GLP-1 Dose & Concentration Plotter | Semaglutide, Tirzepatide, Orforglipron",
  description:
    "Free interactive pharmacokinetic simulator for semaglutide (Wegovy/Ozempic), tirzepatide (Zepbound/Mounjaro), and orforglipron (Foundayo). Visualize titration schedules, steady-state buildup, and missed-dose recovery. PK parameters sourced from FDA prescribing information and PubMed primary literature.",
  alternates: { canonical: "/tools/glp1-dose-plotter" },
};

// The PK math driving this page is implemented in src/lib/pk-model.ts
// and is exhaustively tested by scripts/test-pk-model.ts (79 unit tests
// + 1000 random fuzz iterations + clinical landmark regressions). The
// model is a one-compartment Bateman-equation simulation with linear
// superposition for repeated dosing. Parameters are documented inline
// in pk-model.ts and on this page below.

export default function GlpDosePlotterPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/tools" className="hover:text-slate-900">
          Tools
        </Link>
        {" / "}
        <span className="text-slate-700">GLP-1 dose plotter</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
          Pharmacokinetic simulator
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          GLP-1 Dose &amp; Concentration Plotter
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Visualize how injectable semaglutide, injectable tirzepatide,
          and oral orforglipron build up in the body across the
          standard titration ramp. See steady-state convergence, peak
          and trough patterns, and what happens when a dose is missed.
        </p>
      </header>

      <DosePlotter />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>How this plotter works</h2>
        <p>
          The chart shows a relative plasma concentration curve for the
          selected GLP-1 drug across a 24-week titration timeline. The
          underlying math is a one-compartment pharmacokinetic model
          with first-order absorption and elimination — the standard
          Bateman equation — with linear superposition across repeated
          doses to capture accumulation toward steady state. The
          maintenance-dose steady-state peak is normalized to 100% so
          the chart shows relative buildup, not absolute blood levels.
        </p>
        <p>
          The titration schedules are taken directly from each drug&apos;s
          FDA prescribing information:
        </p>
        <ul>
          <li>
            <strong>Semaglutide:</strong> 0.25 mg → 0.5 mg → 1 mg →
            1.7 mg → 2.4 mg, increased every 4 weeks (Wegovy /
            Ozempic prescribing information)
          </li>
          <li>
            <strong>Tirzepatide:</strong> 2.5 mg → 5 mg → 7.5 mg → 10
            mg → 12.5 mg → 15 mg, increased every 4 weeks
            (Zepbound / Mounjaro prescribing information)
          </li>
          <li>
            <strong>Orforglipron (Foundayo):</strong> 0.8 mg → 2.5 mg →
            5.5 mg → 9 mg → 14.5 mg → 17.2 mg, increased every 4 weeks
            (Foundayo prescribing information)
          </li>
        </ul>

        <h2>Half-life and steady state</h2>
        <p>
          The single most important number for understanding how a
          GLP-1 dose &ldquo;feels&rdquo; over time is the elimination
          half-life. For semaglutide it&apos;s about 7 days. For
          tirzepatide, about 5 days. For oral orforglipron, about 36
          hours. After 4-5 half-lives of constant dosing the drug
          reaches steady state, which is the plateau the chart shows
          at the yellow dashed line. This is why GLP-1 prescribers tell
          patients it can take 4-5 weeks at each dose level for the
          full effect to be felt.
        </p>

        <h2>The missed-dose simulator</h2>
        <p>
          For weekly drugs (semaglutide, tirzepatide), missing one
          dose causes plasma concentrations to drop by approximately
          50% at the would-be next dose, and it usually takes 2-3
          subsequent doses for levels to recover. The general FDA
          label guidance is: if your missed dose is less than 5 days
          late, take it as soon as you remember. If more than 5 days
          late, skip it and resume on your normal schedule.
        </p>
        <p>
          The missed-dose simulator below the chart lets you skip any
          single dose in the first 12 weeks and see how the
          concentration curve responds.
        </p>

        <h2>Sources</h2>
        <ul>
          <li>
            Wegovy (semaglutide 2.4 mg) US Prescribing Information,
            Novo Nordisk
          </li>
          <li>
            Ozempic (semaglutide) US Prescribing Information, Novo
            Nordisk
          </li>
          <li>
            Zepbound and Mounjaro (tirzepatide) US Prescribing
            Information, Eli Lilly
          </li>
          <li>
            Foundayo (orforglipron) US Prescribing Information, Eli
            Lilly (April 2026)
          </li>
          <li>
            Ma X et al. Effect of Food Consumption on the
            Pharmacokinetics, Safety, and Tolerability of Once-Daily
            Orally Administered Orforglipron. <em>Diabetes Therapy</em>{" "}
            2024. PMID 38402332.
          </li>
          <li>
            Hall S et al. Clinical Pharmacokinetics of Semaglutide.
            <em>Clinical Pharmacokinetics</em> 2019.
          </li>
          <li>
            Urva S et al. Tirzepatide Pharmacokinetics. <em>Clinical
            Pharmacokinetics</em> 2022.
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          This tool is for educational purposes only and does not
          constitute medical advice. The concentration curves show
          relative pharmacokinetic patterns based on published
          parameters and should not be interpreted as actual blood
          levels in any individual patient. Real plasma concentrations
          vary substantially between patients based on body weight,
          injection site, hepatic and renal function, drug
          interactions, and many other factors. Dosing decisions
          should always be made with a qualified healthcare provider.
          Weight Loss Rankings does not provide medical advice,
          diagnosis, or treatment recommendations.
        </p>

        <h2>Verification</h2>
        <p>
          The pharmacokinetic math powering this plotter is implemented
          in <code>src/lib/pk-model.ts</code> and verified by 79 unit
          tests plus 1,000 randomized fuzz simulations covering
          single-dose Bateman properties, half-life decay, steady-state
          convergence, titration schedule construction, missed-dose
          recovery, ka == ke degenerate cases, multi-miss stress
          testing, 104-week numerical stability, and three clinical
          landmark regressions. The full test suite is in{" "}
          <code>scripts/test-pk-model.ts</code> and can be run with{" "}
          <code>npx tsx scripts/test-pk-model.ts</code>.
        </p>

        <h2>Related research</h2>
        <p>
          For the clinical trial evidence behind each drug:
        </p>
        <ul>
          <li>
            <Link href="/research/foundayo-orforglipron-fda-approval-2026">
              Foundayo (orforglipron) FDA approval and ATTAIN-1 deep-dive
            </Link>
          </li>
          <li>
            <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
              Tirzepatide vs semaglutide head-to-head comparison
            </Link>
          </li>
          <li>
            <Link href="/research/glp1-side-effects-what-trials-actually-showed">
              GLP-1 side effects: what the trials actually showed
            </Link>
          </li>
          <li>
            <Link href="/research/what-happens-when-you-stop-semaglutide">
              What happens when you stop semaglutide
            </Link>
          </li>
          <li>
            <Link href="/research/glp-1-pricing-index-2026">
              GLP-1 compounded pricing index
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
