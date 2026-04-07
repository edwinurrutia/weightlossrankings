import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
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
// in pk-model.ts and listed in the References block below.

const CITATIONS = [
  {
    authors: "Novo Nordisk Inc.",
    title:
      "WEGOVY (semaglutide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
  },
  {
    authors: "Novo Nordisk Inc.",
    title:
      "OZEMPIC (semaglutide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s029lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "ZEPBOUND (tirzepatide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "MOUNJARO (tirzepatide) injection — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s019lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "FOUNDAYO (orforglipron) tablets — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2026,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/foundayo-pi.pdf",
  },
  {
    authors:
      "Ma X, Liu R, Pratt EJ, Benson CT, Bhattachar SN, Sloop KW.",
    title:
      "Effect of Food Consumption on the Pharmacokinetics, Safety, and Tolerability of Once-Daily Orally Administered Orforglipron (LY3502970), a Non-peptide GLP-1 Receptor Agonist.",
    source: "Diabetes Therapy",
    year: 2024,
    pmid: "38402332",
  },
  {
    authors:
      "Hall S, Isaacs D, Clements JN.",
    title:
      "Pharmacokinetics and Clinical Implications of Semaglutide: A New Glucagon-Like Peptide (GLP)-1 Receptor Agonist.",
    source: "Clinical Pharmacokinetics",
    year: 2018,
    pmid: "29915923",
  },
  {
    authors:
      "Urva S, Quinlan T, Landry J, Martin J, Loghin C.",
    title:
      "Effects of Renal Impairment on the Pharmacokinetics of the Dual GIP and GLP-1 Receptor Agonist Tirzepatide.",
    source: "Clinical Pharmacokinetics",
    year: 2021,
    pmid: "33704694",
  },
  {
    authors:
      "Coskun T, Urva S, Roell WC, Qu H, Loghin C, Moyers JS, O'Farrell LS, Briere DA, Sloop KW, Thomas MK, Pirro V, Wainscott DB, Willard FS, Abernathy M, Morford L, Du Y, Benson C, Gimeno RE, Haupt A, Milicevic Z.",
    title:
      "LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist for glycaemic control and weight loss: from discovery to clinical proof of concept (retatrutide).",
    source: "Cell Metabolism",
    year: 2022,
    pmid: "36240769",
  },
];

export default function GlpDosePlotterPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">GLP-1 dose plotter</span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Pharmacokinetic simulator
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 Dose &amp; Concentration Plotter
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
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
          FDA prescribing information for the approved drugs [1, 2, 3, 4, 5]
          and from the published phase 2 / phase 3 trial protocols for
          investigational drugs:
        </p>
        <ul>
          <li>
            <strong>Semaglutide</strong> (Wegovy / Ozempic): 0.25 mg → 0.5
            mg → 1 mg → 1.7 mg → 2.4 mg, increased every 4 weeks
          </li>
          <li>
            <strong>Tirzepatide</strong> (Zepbound / Mounjaro): 2.5 mg →
            5 mg → 7.5 mg → 10 mg → 12.5 mg → 15 mg, increased every 4
            weeks
          </li>
          <li>
            <strong>Orforglipron</strong> (Foundayo): 0.8 mg → 2.5 mg →
            5.5 mg → 9 mg → 14.5 mg → 17.2 mg, increased every 4 weeks
          </li>
          <li>
            <strong>Retatrutide</strong> (LY3437943, investigational):
            2 mg → 4 mg → 6 mg → 8 mg → 10 mg → 12 mg, increased every 4
            weeks. Sourced from the Jastreboff phase 2 trial (NEJM 2023)
            and the TRIUMPH phase 3 program protocol. Retatrutide is{" "}
            <strong>not yet FDA-approved</strong>; we include it for
            educational comparison only.
          </li>
        </ul>

        <h2>Half-life and steady state</h2>
        <p>
          The single most important number for understanding how a
          GLP-1 dose &ldquo;feels&rdquo; over time is the elimination
          half-life. For semaglutide it&apos;s about 7 days [7]. For
          tirzepatide, about 5 days [8]. For oral orforglipron, about
          36 hours [6]. For investigational retatrutide, about 6 days
          [9]. After 4-5 half-lives of constant dosing the drug reaches
          steady state, which is the plateau the chart shows at the
          dashed reference line. This is why GLP-1 prescribers tell
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
          late, skip it and resume on your normal schedule [1, 3].
        </p>
        <p>
          The missed-dose simulator below the chart lets you skip any
          single dose across the full 24-week window and see how the
          concentration curve responds.
        </p>

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
            <Link href="/research/glp1-pricing-index">
              GLP-1 compounded pricing index
            </Link>
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
