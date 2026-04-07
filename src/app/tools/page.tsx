import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free GLP-1 Tools & Calculators | Weight Loss Rankings",
  description:
    "Free, evidence-based tools for patients on or considering GLP-1 weight loss medications. Dose plotters, PK simulators, and pricing calculators sourced from FDA prescribing information and PubMed primary literature.",
  alternates: { canonical: "/tools" },
};

const TOOLS = [
  {
    slug: "glp1-dose-plotter",
    title: "GLP-1 Dose & Concentration Plotter",
    description:
      "Visualize how semaglutide, tirzepatide, and orforglipron build up in the body across the standard titration schedule. Sourced from FDA prescribing information and the published pharmacokinetic literature.",
    tag: "Pharmacokinetics",
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
