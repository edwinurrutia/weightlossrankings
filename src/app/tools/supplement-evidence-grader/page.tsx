import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import ToolDataFreshness from "@/components/tools/ToolDataFreshness";
import { DATA_LAST_VERIFIED } from "@/lib/supplement-evidence";
import SupplementGrader from "./SupplementGrader";

export const metadata: Metadata = {
  title:
    "Supplement Evidence Grader — Berberine, Ashwagandha, Magnesium, MCT Oil, and 12 More",
  description:
    "Free supplement evidence grader for weight loss. 16 popular supplements graded A through D against verified PubMed primary sources. Search by name, filter by grade, see magnitude vs GLP-1 and the primary study citation for each entry. Berberine, green tea, MCT oil, glucomannan, psyllium, CLA, ashwagandha, magnesium, collagen, cinnamon, ACV, garcinia, chromium, creatine, lemon balm, L-lysine — all evaluated.",
  alternates: { canonical: "/tools/supplement-evidence-grader" },
};

const CITATIONS = [
  {
    authors: "Asbaghi O, Ghanbari N, Shekari M, et al.",
    title:
      "The effect of berberine supplementation on obesity parameters, inflammation and liver function enzymes: A systematic review and meta-analysis.",
    source: "Phytother Res",
    year: 2020,
    pmid: "32690176",
  },
  {
    authors: "Hursel R, Viechtbauer W, Westerterp-Plantenga MS.",
    title:
      "The effects of green tea on weight loss and weight maintenance: a meta-analysis.",
    source: "Int J Obes (Lond)",
    year: 2009,
    pmid: "19597519",
  },
  {
    authors: "Mumme K, Stonehouse W.",
    title:
      "Effects of medium-chain triglycerides on weight loss and body composition: a meta-analysis of randomized controlled trials.",
    source: "J Acad Nutr Diet",
    year: 2015,
    pmid: "25636220",
  },
  {
    authors: "Sood N, Baker WL, Coleman CI.",
    title:
      "Effect of glucomannan on plasma lipid and glucose concentrations, body weight, and blood pressure: systematic review and meta-analysis.",
    source: "Am J Clin Nutr",
    year: 2008,
    pmid: "18842808",
  },
  {
    authors: "Whigham LD, Watras AC, Schoeller DA.",
    title:
      "Efficacy of conjugated linoleic acid for reducing fat mass: a meta-analysis in humans.",
    source: "Am J Clin Nutr",
    year: 2007,
    pmid: "17490954",
  },
  {
    authors: "Onakpoya I, Hung SK, Perry R, Wider B, Ernst E.",
    title:
      "The Use of Garcinia Extract (Hydroxycitric Acid) as a Weight loss Supplement: A Systematic Review and Meta-Analysis of Randomised Clinical Trials.",
    source: "J Obes",
    year: 2011,
    pmid: "21197150",
  },
  {
    authors: "Onakpoya I, Posadzki P, Ernst E.",
    title:
      "Chromium supplementation in overweight and obesity: a systematic review and meta-analysis of randomized clinical trials.",
    source: "Obes Rev",
    year: 2013,
    pmid: "23495911",
  },
  {
    authors: "Launholt TL, Kristiansen CB, Hjorth P.",
    title:
      "Safety and side effects of apple vinegar intake and its effect on metabolic parameters and body weight: a systematic review.",
    source: "Eur J Nutr",
    year: 2020,
    pmid: "32170375",
  },
  {
    authors: "Heshmati J, Morvaridzadeh M, Sepidarkish M, et al.",
    title:
      "Effects of Melissa officinalis (Lemon Balm) on cardio-metabolic outcomes: A systematic review and meta-analysis.",
    source: "Phytother Res",
    year: 2020,
    pmid: "32614129",
  },
  {
    authors: "Proksch E, Segger D, Degwert J, Schunck M, Zague V, Oesser S.",
    title:
      "Oral supplementation of specific collagen peptides has beneficial effects on human skin physiology: a double-blind, placebo-controlled study.",
    source: "Skin Pharmacol Physiol",
    year: 2014,
    pmid: "23949208",
  },
  {
    authors: "Choudhary D, Bhattacharyya S, Joshi K.",
    title:
      "Body Weight Management in Adults Under Chronic Stress Through Treatment With Ashwagandha Root Extract.",
    source: "J Evid Based Complement Altern Med",
    year: 2017,
    pmid: "27055824",
  },
  {
    authors:
      "Wilding JPH, Batterham RL, Calanna S, Davies M, Van Gaal LF, Lingvay I, McGowan BM, Rosenstock J, Tran MTD, Wadden TA, Wharton S, Yokote K, Zeuthen N, Kushner RF; STEP 1 Study Group.",
    title:
      "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1).",
    source: "N Engl J Med",
    year: 2021,
    pmid: "33567185",
  },
  {
    authors:
      "Jastreboff AM, Aronne LJ, Ahmad NN, Wharton S, Connery L, Alves B, Kiyosue A, Zhang S, Liu B, Bunck MC, Stefanski A; SURMOUNT-1 Investigators.",
    title:
      "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).",
    source: "N Engl J Med",
    year: 2022,
    pmid: "35658024",
  },
];

export default function SupplementEvidenceGraderPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="Supplement Evidence Grader"
        description="16 popular weight-loss supplements graded A through D against verified PubMed primary sources. Search by name, filter by grade, see magnitude vs GLP-1 and the primary study citation for each entry."
        url="https://weightlossrankings.org/tools/supplement-evidence-grader"
        image="https://weightlossrankings.org/tools/supplement-evidence-grader/opengraph-image"
        isMedical={true}
        datePublished="2026-04-08"
      />
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">Supplement Evidence Grader</span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          16 supplements · graded A-D · PubMed-verified
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          Supplement Evidence Grader
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Search any popular weight-loss supplement and see its evidence
          grade against PubMed primary sources. Only one (berberine)
          reaches grade A. Six reach grade B. Nine are grade C or D
          with weak or no evidence. Even the best supplements produce
          roughly 1-5% of GLP-1 magnitude.
        </p>
      </header>

      <SupplementGrader />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>How the grades work</h2>
        <ul>
          <li>
            <strong>Grade A:</strong> Multiple RCTs converge on a
            consistent effect; meta-analysis with statistically
            significant magnitude; mechanism well-characterized.
          </li>
          <li>
            <strong>Grade B:</strong> Single decent meta-analysis or
            multiple RCTs with directional signal; modest magnitude;
            some methodological caveats.
          </li>
          <li>
            <strong>Grade C:</strong> Animal or pilot human data only;
            single underpowered RCT; or evidence that disappears under
            quality filters.
          </li>
          <li>
            <strong>Grade D:</strong> No human RCT evidence for weight
            loss specifically; folklore or marketing claims only.
          </li>
          <li>
            <strong>D for weight (oppositional):</strong> Reserved for
            supplements like creatine that actually <em>increase</em>{" "}
            scale weight (water retention) but support lean mass
            preservation in resistance training.
          </li>
        </ul>

        <h2>Why most supplements don&apos;t work for weight loss</h2>
        <p>
          The published evidence on weight-loss supplements is
          consistently disappointing. Even berberine — the highest-
          graded entry on this list — produces roughly &minus;2 kg over
          12 weeks in the largest meta-analysis. Compare to semaglutide
          (&minus;14.9% body weight in STEP-1) or tirzepatide
          (&minus;20.9% in SURMOUNT-1) and the magnitude gap is
          7-10×. Marketing volume vastly exceeds evidence: lemon balm
          has 2,700+ monthly searches and zero human weight-loss RCTs.
        </p>
        <p>
          The cleanest interpretation: supplements occupy a small
          adjunct role for patients already pursuing evidence-based
          weight management. They are not substitutes for FDA-approved
          obesity pharmacotherapy or lifestyle intervention.
        </p>

        <h2>What we excluded and why</h2>
        <p>
          A few supplements are not on this list because they are
          either pharmaceuticals (orlistat, FDA-approved as Xenical
          and Alli) or because the evidence was so thin we couldn&apos;t
          even verify a primary source (raspberry ketone, hoodia,
          chitosan, some greens powders). The <a href="https://ods.od.nih.gov/factsheets/WeightLoss-HealthProfessional/" target="_blank" rel="noopener noreferrer">NIH Office of Dietary Supplements weight-loss
          factsheet</a> is the most conservative summary and aligns
          closely with this article.
        </p>

        <h2>Important disclaimer</h2>
        <p>
          This tool is for educational purposes only and does not
          constitute medical advice. Dietary supplements are not
          FDA-approved for weight loss and may interact with
          prescription medications. Patients on statins (berberine
          inhibits CYP3A4), anticoagulants (cinnamon at high doses),
          antidepressants, thyroid medication, or any GLP-1 receptor
          agonist should discuss supplement use with their prescribing
          clinician before starting. Every primary source cited here
          was independently verified against PubMed on{" "}
          {DATA_LAST_VERIFIED} by a research subagent. Items the
          subagent could not confirm are explicitly graded D and
          flagged as UNVERIFIED in the data file rather than fabricated.
        </p>

        <h2>Related research and tools</h2>
        <ul>
          <li>
            <Link href="/research/supplements-weight-loss-glp1-evidence-grade">
              Supplements for weight loss on a GLP-1 — full deep-dive
            </Link>
          </li>
          <li>
            <Link href="/research/berberine-vs-glp1-evidence-review">
              Berberine vs GLP-1 — the dedicated myth-bust
            </Link>
          </li>
          <li>
            <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
              Exercise pairing on a GLP-1
            </Link>{" "}
            — for the creatine + resistance training context
          </li>
          <li>
            <Link href="/research/loose-skin-after-glp1-weight-loss">
              Loose skin after rapid GLP-1 weight loss
            </Link>{" "}
            — for the collagen peptide context
          </li>
          <li>
            <Link href="/tools/glp1-protein-calculator">
              GLP-1 protein calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/glp1-drug-interaction-checker">
              GLP-1 drug interaction checker
            </Link>
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
      <ToolDataFreshness slug="supplement-evidence-grader" />
    </main>
  );
}
