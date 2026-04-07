import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free GLP-1 Tools & Calculators",
  description:
    "Free, evidence-based tools for patients on or considering GLP-1 weight loss medications. Dose plotters, PK simulators, and pricing calculators sourced from FDA prescribing information and PubMed primary literature.",
  alternates: { canonical: "/tools" },
};

const TOOLS = [
  {
    slug: "glp1-weight-loss-calculator",
    title: "GLP-1 Weight Loss Calculator",
    description:
      "STEP-1, SURMOUNT-1, and ATTAIN-1 trial-data-backed predictor. Enter your starting weight and target week to see week-by-week predicted weight loss across all three drugs.",
    tag: "Weight loss predictor",
  },
  {
    slug: "glp1-bmi-calculator",
    title: "GLP-1 BMI Calculator",
    description:
      "BMI calculator with a GLP-1 outcome overlay. See your current WHO BMI category, your Wegovy/Zepbound FDA eligibility, and what category you'd land in at each trial endpoint.",
    tag: "BMI + eligibility",
  },
  {
    slug: "glp1-savings-calculator",
    title: "GLP-1 Savings Calculator",
    description:
      "Compare 10 different access paths — brand-name, manufacturer direct-pay, compounded vials, and Foundayo at $149/month — and see your monthly, yearly, and 5-year savings or extra cost. Updated with current pricing.",
    tag: "Cost comparison",
  },
  {
    slug: "glp1-unit-converter",
    title: "GLP-1 Unit ↔ mg Converter",
    description:
      "Convert prescribed milligrams of compounded semaglutide or tirzepatide to insulin syringe units (and back) at any vial concentration. Now includes a reconstitution (BAC water) calculator for lyophilized vials. FDA prescribing information cited.",
    tag: "Dosage calculator",
  },
  {
    slug: "glp1-dose-plotter",
    title: "GLP-1 Dose & Concentration Plotter",
    description:
      "Visualize how semaglutide, tirzepatide, orforglipron, and retatrutide build up in the body across the standard titration schedule. Sourced from FDA prescribing information and the published pharmacokinetic literature.",
    tag: "Pharmacokinetics",
  },
  {
    slug: "glp1-washout-calculator",
    title: "GLP-1 Washout Calculator",
    description:
      "How long does semaglutide / tirzepatide / orforglipron stay in your system after your last dose? See exactly when you reach 50%, 25%, 5%, 1% remaining — built on FDA-label half-lives. Includes clinical scenarios for switching, surgery hold, pregnancy planning, and trial enrollment.",
    tag: "Pharmacokinetics",
  },
  {
    slug: "glp1-drug-interaction-checker",
    title: "GLP-1 Drug Interaction Checker",
    description:
      "Search any medication to see how it interacts with Wegovy, Ozempic, Zepbound, Mounjaro, or Foundayo. Severity-tiered results — contraindicated, serious, moderate, minor — with FDA prescribing-information citations and what-to-do guidance.",
    tag: "Drug interactions",
  },
  {
    slug: "glp1-pen-leftover-calculator",
    title: "GLP-1 Pen Leftover Calculator",
    description:
      "How many doses are left in your Ozempic or Saxenda pen? Built on FDA-label fill volumes and dose counts. Explains why Wegovy, Zepbound, and Mounjaro pens are single-dose and cannot be extended.",
    tag: "Pen tracker",
  },
  {
    slug: "insurance-employer-checker",
    title: "Insurance Employer Checker",
    description:
      "Look up Wegovy, Zepbound, Ozempic, and Mounjaro coverage at 30 large US employers including Amazon, Walmart, Google, Microsoft, and the federal government. Patient-reported and publicly-sourced — verify with your HR before assuming coverage.",
    tag: "Insurance coverage",
  },
];

export default function ToolsIndex() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Free tools
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 calculators &amp; simulators
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary">
          Evidence-based, FDA-label-cited interactive tools for patients
          on or considering weight-loss medications. Every calculation is
          educational and the underlying clinical sources are documented
          on each tool page.
        </p>
      </header>

      <ul className="space-y-6">
        {TOOLS.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="block rounded-2xl border border-brand-violet/15 bg-white p-8 shadow-sm transition hover:border-brand-violet/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
                    {tool.tag}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-brand-text-primary">
                    {tool.title}
                  </h2>
                  <p className="mt-3 text-brand-text-secondary">{tool.description}</p>
                </div>
                <div className="text-2xl text-brand-violet">→</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm text-brand-text-secondary">
        These tools are educational and do not provide medical advice,
        diagnosis, or treatment recommendations. Dosing decisions should
        always be made with a qualified healthcare provider.
      </p>
    </main>
  );
}
