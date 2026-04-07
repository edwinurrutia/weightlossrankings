import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import DrugInteractionChecker from "./DrugInteractionChecker";
import { getInteractionCount } from "@/lib/glp1-drug-interactions";

export const metadata: Metadata = {
  title:
    "GLP-1 Drug Interaction Checker — Wegovy, Ozempic, Zepbound, Mounjaro, Foundayo",
  description:
    "Free GLP-1 drug interaction checker. Search any medication to see how it interacts with Wegovy, Ozempic, Zepbound, Mounjaro, or Foundayo. Severity-tiered results with FDA prescribing-information citations and clear what-to-do guidance.",
  alternates: { canonical: "/tools/glp1-drug-interaction-checker" },
};

const CITATIONS = [
  {
    authors: "Novo Nordisk Inc.",
    title:
      "WEGOVY (semaglutide) injection — US Prescribing Information, Section 7: Drug Interactions.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
  },
  {
    authors: "Novo Nordisk Inc.",
    title:
      "OZEMPIC (semaglutide) injection — US Prescribing Information, Section 7: Drug Interactions.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s024lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 7: Drug Interactions.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
  },
  {
    authors: "Eli Lilly and Company.",
    title:
      "MOUNJARO (tirzepatide) injection — US Prescribing Information, Section 7: Drug Interactions.",
    source: "FDA Approved Labeling",
    year: 2025,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s015lbl.pdf",
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
      "European Medicines Agency, Pharmacovigilance Risk Assessment Committee (PRAC).",
    title:
      "GLP-1 receptor agonists — review of psychiatric adverse events. PRAC Assessment Report.",
    source: "EMA",
    year: 2024,
    url: "https://www.ema.europa.eu/en/news/meeting-highlights-pharmacovigilance-risk-assessment-committee-prac-8-11-april-2024",
  },
];

export default function DrugInteractionCheckerPage() {
  const count = getInteractionCount();
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="GLP-1 Drug Interaction Checker"
        description="Free GLP-1 drug interaction checker. Search any medication to see how it interacts with Wegovy, Ozempic, Zepbound, Mounjaro, or Foundayo. Severity-tiered results with FDA prescribing-information citations and clear what-to-do guidance."
        url="https://weightlossrankings.org/tools/glp1-drug-interaction-checker"
        image="https://weightlossrankings.org/tools/glp1-drug-interaction-checker/opengraph-image"
        isMedical={true}
        datePublished="2026-04-07"
      />
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          GLP-1 drug interaction checker
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          GLP-1 drug interactions
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 Drug Interaction Checker
        </h1>
        <p
          className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed"
          data-speakable="lead"
        >
          Search any medication to see how it interacts with Wegovy, Ozempic,
          Zepbound, Mounjaro, or Foundayo. Every entry is severity-tiered and
          cites the specific FDA prescribing-information section it comes from.
          Currently {count} verified interactions in the database.
        </p>
      </header>

      <DrugInteractionChecker />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>How to read the severity tiers</h2>
        <ul>
          <li>
            <strong>Contraindicated</strong> — Do not combine. The combination
            is either explicitly contraindicated by the FDA label or universally
            recognized as unsafe (e.g., two GLP-1 receptor agonists at the same
            time).
          </li>
          <li>
            <strong>Serious</strong> — Combination is allowed but requires
            close monitoring or proactive dose adjustment of one of the drugs.
            The classic example is insulin or a sulfonylurea — both can cause
            hypoglycemia, and adding a GLP-1 on top requires reducing the dose
            of the existing diabetes medication before the first GLP-1 dose.
          </li>
          <li>
            <strong>Moderate</strong> — Be aware. The interaction is real but
            usually does not require dose adjustment. Often involves slowed
            gastric emptying affecting the absorption rate (not total
            bioavailability) of an oral medication. Examples: warfarin,
            levothyroxine, oral contraceptives.
          </li>
          <li>
            <strong>Minor</strong> — Generally no action needed. Either no
            documented interaction or the effect is clinically irrelevant
            (e.g., a 30-60 minute delay in acetaminophen onset).
          </li>
        </ul>

        <h2>Why GLP-1s have so many gastric-emptying interactions</h2>
        <p>
          GLP-1 receptor agonists slow gastric emptying as part of their
          mechanism of action — that&apos;s a major contributor to the
          satiety effect that produces weight loss. The same mechanism delays
          the absorption of orally administered medications by 30-60 minutes
          on average. For most drugs, total bioavailability (the area under
          the curve, AUC) is preserved, so the drug still works, but it may
          take slightly longer to reach peak concentration. The clinical
          significance is small for most medications and meaningful only for
          drugs with a narrow therapeutic window or a time-sensitive onset.
        </p>

        <h2>Hypoglycemia risk with insulin and sulfonylureas</h2>
        <p>
          The most clinically important GLP-1 interaction is the additive
          hypoglycemia risk when combined with insulin or a sulfonylurea
          (glipizide, glyburide, glimepiride). GLP-1s enhance{" "}
          <em>glucose-dependent</em> insulin secretion — meaning they only
          push insulin when blood sugar is elevated — but adding insulin or
          a sulfonylurea on top can produce dangerous lows. The standard
          protocol is to reduce the insulin dose by approximately 20% (or
          taper off the sulfonylurea) BEFORE the first GLP-1 dose. This
          should be discussed with your prescriber in advance, not after
          the fact.
        </p>

        <h2>Oral contraceptives and Foundayo</h2>
        <p>
          Foundayo (orforglipron, the new oral GLP-1 approved April 2026)
          carries a more specific drug interaction warning for oral
          contraceptives than the injectable GLP-1s. The Foundayo label
          recommends backup contraception (barrier, IUD, implant, or
          non-oral hormonal) for 30 days after starting the drug and 30 days
          after each dose increase. Women on oral birth control who plan to
          start any GLP-1 should discuss a backup contraception strategy
          with their prescriber.
        </p>

        <h2>What this tool is NOT</h2>
        <p>
          This is an educational lookup tool, not a clinical decision support
          system. It is not a substitute for your prescriber, your pharmacist,
          or a real-time interaction checker built into electronic health
          records. The database covers the highest-frequency clinically
          meaningful interactions but is not exhaustive. Always tell every
          prescriber and pharmacist about every medication you take,
          including over-the-counter products and supplements, and confirm
          any specific interaction with them before starting or stopping
          anything.
        </p>

        <h2>Related tools and research</h2>
        <ul>
          <li>
            <Link href="/tools/glp1-dose-plotter">GLP-1 dose plotter</Link> —
            see how each titration step builds up in your bloodstream
          </li>
          <li>
            <Link href="/tools/glp1-unit-converter">GLP-1 unit converter</Link>{" "}
            — mg ↔ insulin syringe units for compounded vials
          </li>
          <li>
            <Link href="/research/glp1-side-effect-questions-answered">
              17 GLP-1 side effect questions answered
            </Link>{" "}
            — every common side effect with the trial-data context
          </li>
          <li>
            <Link href="/research/switching-between-glp1-medications-guide">
              Switching between GLP-1 medications
            </Link>{" "}
            — the protocol for moving from one GLP-1 to another
          </li>
          <li>
            <Link href="/research/how-to-taper-off-glp1-safely-guide">
              How to taper off a GLP-1 safely
            </Link>{" "}
            — the discontinuation guide
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          This tool is for educational purposes only and does not constitute
          medical advice. Drug interactions are highly individual and depend
          on dose, timing, and your overall medication list. Weight Loss
          Rankings does not provide medical advice, diagnosis, or treatment
          recommendations. Always consult your prescribing clinician and
          pharmacist before combining any medication with a GLP-1 receptor
          agonist.
        </p>
      </section>

      <References items={CITATIONS} />
    </main>
  );
}
