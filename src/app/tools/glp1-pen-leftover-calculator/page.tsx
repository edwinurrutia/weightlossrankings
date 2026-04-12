import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import FaqSchema from "@/components/research/FaqSchema";
import Calculator from "./Calculator";
import { PEN_PRESETS } from "@/lib/glp1-pen-leftover";

export const metadata: Metadata = {
  title: "GLP-1 Pen Leftover Calculator: Ozempic & Saxenda Dose Tracker",
  description:
    "Free calculator for how many doses are left in your Ozempic or Saxenda pen. Built on FDA-label fill volumes and dose counts. Explains why Wegovy, Zepbound, and Mounjaro pens are single-dose and cannot be extended.",
  alternates: { canonical: "/tools/glp1-pen-leftover-calculator" },
};

const CITATIONS = [
  {
    authors: "Novo Nordisk Inc.",
    title:
      "OZEMPIC (semaglutide) injection — US Prescribing Information, Section 3 Dosage Forms and Strengths and Section 16 How Supplied (multi-dose pen fill volumes and labeled dose counts).",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s035,209637s037lbl.pdf",
  },
  {
    authors: "Novo Nordisk Inc.",
    title:
      "WEGOVY (semaglutide) injection — US Prescribing Information, Section 16 How Supplied (single-dose prefilled pen).",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s026lbl.pdf",
  },
  {
    authors: "Novo Nordisk Inc.",
    title:
      "SAXENDA (liraglutide) injection — US Prescribing Information, Section 3 Dosage Forms and Strengths (18 mg/3 mL multi-dose pen).",
    source: "FDA Approved Labeling",
    year: 2024,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/206321s022lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "MOUNJARO (tirzepatide) injection — US Prescribing Information, Section 16 How Supplied (single-dose prefilled pen).",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s039lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 16 How Supplied (single-dose prefilled pen and single-dose vial).",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/217806s002lbl.pdf",
  },
];

const FAQS = [
  {
    question: "How many doses are in an Ozempic pen?",
    answer:
      "Per the FDA Ozempic label (Section 3 Dosage Forms and Strengths): the 0.25 mg/0.5 mg starter pen contains 2 mg of semaglutide in 3 mL and is labeled to deliver 4 weekly doses at either 0.25 mg or 0.5 mg. The 1 mg pen contains 4 mg in 3 mL and delivers 4 doses at 1 mg. The 2 mg pen contains 8 mg in 3 mL and delivers 4 doses at 2 mg. Each Ozempic pen is a 4-week supply at the labeled dose.",
  },
  {
    question: "Can I get extra doses out of a Wegovy pen?",
    answer:
      "No. Wegovy is a single-dose prefilled pen — each pen delivers one weekly injection and is then discarded. Although the cartridge contains a small overfill for manufacturing tolerance, the device is designed to deliver exactly one dose and cannot be re-used. Do not attempt to extract additional drug with a syringe.",
  },
  {
    question: "What do I do with leftover liquid in my Saxenda pen?",
    answer:
      "Discard the pen 30 days after first use, even if drug remains, because the preservative system is only validated for that period. Do not draw leftover liquid into a syringe — sterility and dose accuracy cannot be guaranteed outside the pen's metered mechanism. Contact your prescriber for a refill before you run low.",
  },
  {
    question: "Is it safe to use a partial dose if I run out?",
    answer:
      "No. Multi-dose pens like Ozempic and Saxenda physically stop dialing once the labeled dose count is exhausted, and a partial dose from any GLP-1 pen is not validated for accuracy. If you run out before your refill arrives, contact your prescriber — do not improvise with syringes or by combining pens.",
  },
  {
    question: "How long does an Ozempic pen last?",
    answer:
      "At the labeled weekly dose, every Ozempic pen is a 4-week supply: the 0.25 mg, 0.5 mg, 1 mg, and 2 mg pens each deliver 4 weekly doses. The 0.25 mg/0.5 mg starter pen lasts 8 weeks if you're still on the 0.25 mg starting dose. Once opened, a pen is good for 56 days at room temperature per the FDA label.",
  },
  {
    question: "What if I dialed too much by accident?",
    answer:
      "Ozempic and Saxenda pens let you dial back without losing drug — turn the dial counter-clockwise until it shows the correct dose. If you've already injected an over-dose, contact your prescriber or poison control. Do not skip your next dose without clinical guidance — GLP-1 overdose protocols depend on which drug, how much, and your symptoms.",
  },
];

export default function PenLeftoverCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="GLP-1 Pen Leftover Units Calculator"
        description="Free GLP-1 pen leftover calculator. Track how many doses remain in your Ozempic or Saxenda multi-dose pen, with FDA-label fill volumes and dose counts. Explains why Wegovy, Zepbound, and Mounjaro pens are single-dose."
        url="https://www.weightlossrankings.org/tools/glp1-pen-leftover-calculator"
        isMedical={true}
        applicationCategory="HealthApplication"
        datePublished="2026-04-07"
      />
      <FaqSchema items={FAQS} />

      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          GLP-1 pen leftover calculator
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          GLP-1 pen leftover calculator
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          How many doses are left in your GLP-1 pen?
        </h1>
        <p
          className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed"
          data-speakable="lead"
        >
          A patient question nobody answers cleanly: at the dose you&rsquo;re
          dialing, how many doses does your pen actually contain, how
          many are left, and when do you need a refill? This tool uses
          FDA-label fill volumes and dose counts for the multi-dose
          pens (Ozempic, Saxenda) and explains why the single-dose
          pens (Wegovy, Zepbound, Mounjaro) cannot be extended.
        </p>
      </header>

      {/* ── Decision card: single-dose vs multi-dose ── */}
      <section className="rounded-2xl border border-brand-violet/15 bg-brand-violet/[0.06] p-6 sm:p-8 mb-10">
        <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-3">
          First: is your pen single-dose or multi-dose?
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mt-4">
          <div className="rounded-xl bg-white border border-brand-violet/15 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-violet font-bold mb-2">
              Single-dose pens
            </p>
            <p className="font-bold text-brand-text-primary">
              Wegovy &middot; Zepbound &middot; Mounjaro
            </p>
            <p className="mt-3 text-sm text-brand-text-secondary leading-relaxed">
              Each pen delivers <strong>one weekly injection</strong>{" "}
              and is then discarded. There is no &ldquo;leftover&rdquo;
              — the device is engineered to dispense exactly one dose
              and cannot be re-used. Do not attempt to extract any
              residual liquid with a syringe.
            </p>
          </div>
          <div className="rounded-xl bg-white border border-brand-violet/15 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-violet font-bold mb-2">
              Multi-dose pens
            </p>
            <p className="font-bold text-brand-text-primary">
              Ozempic &middot; Saxenda
            </p>
            <p className="mt-3 text-sm text-brand-text-secondary leading-relaxed">
              The patient dials each dose from a shared cartridge.
              Use the calculator below to track how many doses are
              left and when you&rsquo;ll need a refill.
            </p>
          </div>
        </div>
      </section>

      <Calculator />

      {/* ── Static fallback table for SEO indexing ── */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-4">
          Multi-dose GLP-1 pen reference table
        </h2>
        <p className="text-brand-text-secondary mb-4">
          From the FDA prescribing information for each pen. Total
          doses are computed as <code>fill / dose volume</code> rounded
          down — the dose-stop mechanism in the pen physically prevents
          dispensing beyond the labeled count.
        </p>
        <div className="overflow-x-auto rounded-xl border border-brand-violet/15">
          <table className="w-full text-sm">
            <thead className="bg-brand-violet/[0.06] text-brand-text-primary">
              <tr>
                <th className="text-left p-3 font-bold">Pen</th>
                <th className="text-left p-3 font-bold">Fill</th>
                <th className="text-left p-3 font-bold">Dose</th>
                <th className="text-left p-3 font-bold">Doses per pen</th>
                <th className="text-left p-3 font-bold">Schedule</th>
              </tr>
            </thead>
            <tbody className="text-brand-text-secondary">
              {PEN_PRESETS.flatMap((pen) =>
                pen.doses.map((d, i) => (
                  <tr
                    key={`${pen.id}-${d.label}`}
                    className="border-t border-brand-violet/10"
                  >
                    {i === 0 ? (
                      <td
                        className="p-3 font-bold text-brand-text-primary align-top"
                        rowSpan={pen.doses.length}
                      >
                        {pen.label}
                        <div className="text-xs font-normal text-brand-text-secondary mt-1">
                          {pen.totalMg} mg / {pen.totalMl} mL
                        </div>
                      </td>
                    ) : null}
                    {i === 0 ? (
                      <td
                        className="p-3 align-top"
                        rowSpan={pen.doses.length}
                      >
                        {pen.totalMl} mL
                      </td>
                    ) : null}
                    <td className="p-3">{d.label}</td>
                    <td className="p-3">{d.dosesPerPen}</td>
                    <td className="p-3">
                      {pen.frequency === "weekly" ? "Weekly" : "Daily"}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>Why brand pens won&rsquo;t let you &ldquo;squeeze extra doses&rdquo;</h2>
        <p>
          Every brand-name GLP-1 pen contains a small overfill — a
          manufacturing tolerance that ensures the labeled number of
          doses can always be delivered, even if a tiny amount is lost
          to priming or trapped in the cartridge deadspace. Patients
          sometimes notice this and ask whether they can dial one more
          dose.
        </p>
        <p>
          The answer from the FDA labels is no, for two independent
          reasons:
        </p>
        <ul>
          <li>
            <strong>Mechanical stop.</strong> Multi-dose pens like
            Ozempic and Saxenda have a physical mechanism that
            prevents the dose dial from advancing past the labeled
            dose count once the cartridge has dispensed its rated
            volume. The dial will simply not turn far enough to
            inject another full dose.
          </li>
          <li>
            <strong>Dose accuracy not validated past the label.</strong>{" "}
            The overfill is not consistent enough to be a reliable
            dose. Manufacturing tolerance is on the order of a few
            percent — not enough for a full additional dose, but
            enough that any &ldquo;bonus&rdquo; injection would be a
            partial, unvalidated dose that could be far above or
            below the labeled mg.
          </li>
        </ul>

        <h2>What to do if you have leftover liquid</h2>
        <p>
          Discard the pen per the FDA label instructions. Do{" "}
          <strong>not</strong> attempt to draw the residual liquid
          out with an insulin syringe. Sterility cannot be guaranteed
          once the pen is opened to atmosphere, and the dose accuracy
          of a hand-drawn syringe from a brand pen has never been
          validated. If you&rsquo;re running low between refills,
          contact your prescriber — most telehealth clinics will
          authorize an early refill or a bridge prescription.
        </p>

        <h2>Compounded vials are different</h2>
        <p>
          The rules above apply to brand-name <em>pens</em>. Compounded
          GLP-1 vials — sold as multi-use vials of semaglutide or
          tirzepatide reconstituted with bacteriostatic water — work on
          a totally different model. The patient draws each dose with
          an insulin syringe, and the &ldquo;leftover&rdquo; question
          becomes a units-conversion question. See our{" "}
          <Link href="/research/compounded-glp1-reconstitution-mixing-guide">
            compounded GLP-1 reconstitution guide
          </Link>{" "}
          and the{" "}
          <Link href="/tools/glp1-unit-converter">
            GLP-1 unit converter
          </Link>{" "}
          for the math.
        </p>

        <h2>Related research and tools</h2>
        <ul>
          <li>
            <Link href="/research/glp1-storage-shelf-life-refrigeration-guide">
              GLP-1 storage and shelf life
            </Link>{" "}
            — refrigeration windows and 56-day room-temperature
            limits per FDA label
          </li>
          <li>
            <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
              Wegovy pen vs compounded vial
            </Link>{" "}
            — single-dose pens vs multi-use vials, end-to-end
          </li>
          <li>
            <Link href="/research/how-to-inject-glp1-step-by-step-technique">
              How to inject a GLP-1 step by step
            </Link>{" "}
            — injection technique for both pens and syringes
          </li>
          <li>
            <Link href="/tools/glp1-unit-converter">
              GLP-1 unit converter
            </Link>{" "}
            — mg ↔ insulin syringe units for compounded vials
          </li>
          <li>
            <Link href="/tools/glp1-washout-calculator">
              GLP-1 washout calculator
            </Link>{" "}
            — how long the drug stays in your system after the last
            dose
          </li>
        </ul>

        <h2>Frequently asked questions</h2>
        {FAQS.map((f) => (
          <div key={f.question}>
            <h3>{f.question}</h3>
            <p>{f.answer}</p>
          </div>
        ))}

        <h2>Important disclaimer</h2>
        <p>
          This tool is for educational purposes only and does not
          constitute medical advice. All fill volumes and dose counts
          are taken directly from the FDA prescribing information for
          each pen. If you have any question about whether your pen
          has a dose left, contact your prescribing clinician — do not
          improvise. Never attempt to extract drug from any
          single-dose or multi-dose pen with a syringe.
        </p>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
