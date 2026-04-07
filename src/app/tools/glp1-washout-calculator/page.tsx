import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import WashoutCalculator from "./WashoutCalculator";

export const metadata: Metadata = {
  title:
    "GLP-1 Washout Calculator — How Long Does Semaglutide / Tirzepatide Stay in Your System",
  description:
    "Free GLP-1 washout calculator. Pick your drug (semaglutide, tirzepatide, orforglipron, or retatrutide) and see exactly how long until 50%, 25%, 10%, 5%, 1% remain after your last dose. Built on FDA-label half-life values, with clinical scenarios for switching, surgery, pregnancy planning, and trial enrollment.",
  alternates: { canonical: "/tools/glp1-washout-calculator" },
};

const CITATIONS = [
  {
    authors: "Novo Nordisk Inc.",
    title:
      "WEGOVY (semaglutide) injection — US Prescribing Information, Section 12.3 Pharmacokinetics (elimination half-life ~7 days).",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 12.3 Pharmacokinetics (elimination half-life ~5 days).",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "FOUNDAYO (orforglipron) tablets — US Prescribing Information.",
    source: "FDA Approved Labeling",
    year: 2026,
    url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
  },
  {
    authors:
      "Hall S, Isaacs D, Clements JN.",
    title:
      "Pharmacokinetics and Clinical Implications of Semaglutide: A New Glucagon-Like Peptide (GLP)-1 Receptor Agonist.",
    source: "Clin Pharmacokinet",
    year: 2018,
    pmid: "29915923",
  },
  {
    authors:
      "Urva S, Quinlan T, Landry J, Martin J, Loghin C.",
    title:
      "Effects of Renal Impairment on the Pharmacokinetics of the Dual GLP-1 and GIP Receptor Agonist Tirzepatide.",
    source: "Clin Pharmacokinet",
    year: 2021,
    pmid: "33704694",
  },
  {
    authors:
      "American Society of Anesthesiologists, American Gastroenterological Association, American Society for Metabolic and Bariatric Surgery, International Society of Perioperative Care of Patients with Obesity, Society of American Gastrointestinal and Endoscopic Surgeons.",
    title:
      "Multisociety Clinical Practice Guidance for the Safe Use of GLP-1 Receptor Agonists in the Perioperative Period.",
    source: "ASA / AGA / ASMBS / IPSO / SAGES Joint Statement",
    year: 2024,
    url: "https://www.asahq.org/about-asa/newsroom/news-releases/2024/10/multisociety-clinical-practice-guidance-for-the-safe-use-of-glp-1s",
  },
];

export default function WashoutCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="GLP-1 Washout Calculator"
        description="Free GLP-1 washout calculator. Pick your drug (semaglutide, tirzepatide, orforglipron, or retatrutide) and see exactly how long until 50%, 25%, 10%, 5%, 1% remain after your last dose. Built on FDA-label half-life values, with clinical scenarios for switching, surgery, pregnancy planning, and trial enrollment."
        url="https://weightlossrankings.org/tools/glp1-washout-calculator"
        image="https://weightlossrankings.org/tools/glp1-washout-calculator/opengraph-image"
        isMedical={true}
        datePublished="2026-04-07"
      />
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          GLP-1 washout calculator
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          GLP-1 washout / clearance calculator
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          How long does a GLP-1 stay in your system?
        </h1>
        <p
          className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed"
          data-speakable="lead"
        >
          Pick your GLP-1 and see how long after your last dose the
          drug level drops to 50%, 25%, 10%, 5%, 1%, and 0.1% of peak.
          Built on the FDA-label elimination half-lives — semaglutide
          ~7 days, tirzepatide ~5 days, orforglipron ~36 hours,
          retatrutide ~6 days. Includes clinical scenarios for
          switching between GLP-1s, pre-surgery hold, pregnancy
          planning, and clinical trial enrollment.
        </p>
      </header>

      <WashoutCalculator />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>The math, explained</h2>
        <p>
          GLP-1 receptor agonists clear from the body via first-order
          elimination kinetics, which means a fixed{" "}
          <em>fraction</em> of the drug is eliminated per unit time
          rather than a fixed amount. The result is exponential decay:
          after one half-life, 50% of the peak concentration remains;
          after two half-lives, 25%; after three, 12.5%; and so on. The
          formula is:
        </p>
        <p>
          <code>C(t) = C_peak × 0.5^(t / t_half)</code>
        </p>
        <p>
          The half-life values used by this calculator come from the
          FDA prescribing information and the published clinical
          pharmacology literature [1][2][3][4][5]:
        </p>
        <ul>
          <li>
            <strong>Semaglutide</strong> — 7 days (168 hours).
            Sourced from the Wegovy and Ozempic prescribing
            information and the Hall 2018 PK review[4].
          </li>
          <li>
            <strong>Tirzepatide</strong> — 5 days (120 hours).
            Sourced from the Zepbound and Mounjaro prescribing
            information and Urva 2021[5].
          </li>
          <li>
            <strong>Orforglipron</strong> — ~36 hours. The newer
            non-peptide oral GLP-1 has a much shorter half-life than
            the injectable peptides.
          </li>
          <li>
            <strong>Retatrutide</strong> — ~6 days (144 hours), per
            the published phase 2 obesity trial.
          </li>
        </ul>

        <h2>The clinical milestones the calculator reports</h2>
        <ul>
          <li>
            <strong>Switching to another GLP-1.</strong> No biological
            washout is required — start the new drug at its lowest
            titration step on the next scheduled injection day. See
            our{" "}
            <Link href="/research/switching-between-glp1-medications-guide">
              switching guide
            </Link>{" "}
            for the dose mapping and protocol.
          </li>
          <li>
            <strong>Pre-surgery hold.</strong> The American Society
            of Anesthesiologists 2023 statement and the 2024
            multi-society update[6] recommend holding weekly GLP-1s
            for 1 week before any procedure under general anesthesia
            or deep sedation. See our{" "}
            <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
              ASA guidance article
            </Link>{" "}
            for the full protocol.
          </li>
          <li>
            <strong>Pregnancy planning.</strong> The Wegovy
            prescribing information recommends discontinuing
            semaglutide at least 2 months before a planned pregnancy
            because of the long half-life and limited human
            pregnancy data. The same 2-month rule is generally
            applied to tirzepatide. Foundayo (orforglipron) has a
            shorter washout because of its 36-hour half-life. See
            our{" "}
            <Link href="/research/glp1-pregnancy-pcos-fertility-women-health">
              pregnancy and fertility guide
            </Link>{" "}
            for the full obstetric guidance.
          </li>
          <li>
            <strong>5 half-lives ≈ 97% cleared.</strong> The
            standard pharmacology textbook definition of
            &ldquo;washed out.&rdquo; Used as the cutoff for many
            crossover trial designs.
          </li>
          <li>
            <strong>10 half-lives ≈ 99.9% cleared.</strong> The
            research-grade washout used by some clinical trials to
            declare a patient drug-free for enrollment in a different
            GLP-1 study.
          </li>
        </ul>

        <h2>Important caveats</h2>
        <ul>
          <li>
            <strong>Population means, not your half-life.</strong>{" "}
            Individual half-lives vary by ±30% based on body
            composition, kidney function, and the steady-state
            context. Patients with reduced kidney function may
            clear semaglutide and tirzepatide more slowly.
          </li>
          <li>
            <strong>Steady state vs partial titration.</strong> The
            calculator assumes you were on a stable maintenance
            dose for at least 5 half-lives before stopping. Patients
            who stopped during titration have lower starting
            concentrations and clear faster.
          </li>
          <li>
            <strong>Effect outlasts blood level.</strong> Gastric
            emptying delay, satiety, and weight-loss effects often
            persist for days or weeks after blood levels become
            negligible. Washout of the drug is NOT the same as
            washout of the clinical effect.
          </li>
          <li>
            <strong>No standardized assay.</strong> &ldquo;Undetectable&rdquo;
            depends entirely on which assay you use. There is no
            routine clinical lab for semaglutide or tirzepatide
            blood levels — the &ldquo;0.1%&rdquo; milestone is a
            research/PK concept, not a clinical lab result you can
            order.
          </li>
        </ul>

        <h2>What this is NOT</h2>
        <p>
          This is an educational calculator built on standard
          pharmacokinetic principles and FDA-label half-life values.
          It is not a substitute for clinical judgment. If you need
          to make a real decision about stopping a GLP-1 — for
          surgery, pregnancy, switching drugs, or any other reason —
          confirm the timing with your prescribing clinician and (for
          surgery) with your anesthesia team.
        </p>

        <h2>Related tools and research</h2>
        <ul>
          <li>
            <Link href="/tools/glp1-dose-plotter">
              GLP-1 dose plotter
            </Link>{" "}
            — see the buildup curve during titration (the inverse of
            the washout curve)
          </li>
          <li>
            <Link href="/tools/glp1-drug-interaction-checker">
              GLP-1 drug interaction checker
            </Link>{" "}
            — search any medication for interaction during washout
            or restart
          </li>
          <li>
            <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
              Stopping GLP-1s before surgery
            </Link>{" "}
            — the full ASA hold guidance
          </li>
          <li>
            <Link href="/research/switching-between-glp1-medications-guide">
              Switching between GLP-1 medications
            </Link>{" "}
            — protocol for moving between drugs
          </li>
          <li>
            <Link href="/research/how-to-taper-off-glp1-safely-guide">
              How to taper off a GLP-1 safely
            </Link>{" "}
            — discontinuation guide for permanent stops
          </li>
          <li>
            <Link href="/research/what-happens-when-you-stop-semaglutide">
              What happens when you stop semaglutide
            </Link>{" "}
            — the rebound and weight regain literature
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          This tool is for educational purposes only and does not
          constitute medical advice. The calculator uses
          population-mean half-lives from the FDA prescribing
          information, and individual values vary substantially.
          Always discuss any decision to stop, hold, or restart a
          GLP-1 with your prescribing clinician.
        </p>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
