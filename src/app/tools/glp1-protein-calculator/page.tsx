import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import ToolDataFreshness from "@/components/tools/ToolDataFreshness";
import ProteinCalculator from "./ProteinCalculator";

export const metadata: Metadata = {
  title:
    "GLP-1 Protein & Macro Calculator — Preserve Muscle on Wegovy, Zepbound, and Foundayo",
  description:
    "Free protein and macro calculator for patients on (or starting) a GLP-1 receptor agonist. Computes daily protein target (1.2-2.0 g/kg/day per published evidence), Mifflin-St Jeor BMR, TDEE, and a per-meal split. Anchored on Bauer 2013 PROT-AGE, Longland 2016, ISSN 2017, and the Neeland 2024 GLP-1 lean mass mitigation review.",
  alternates: { canonical: "/tools/glp1-protein-calculator" },
};

const CITATIONS = [
  {
    authors: "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO.",
    title:
      "A new predictive equation for resting energy expenditure in healthy individuals.",
    source: "Am J Clin Nutr",
    year: 1990,
    pmid: "2305711",
  },
  {
    authors: "Bauer J, Biolo G, Cederholm T, et al.",
    title:
      "Evidence-based recommendations for optimal dietary protein intake in older people: a position paper from the PROT-AGE Study Group.",
    source: "J Am Med Dir Assoc",
    year: 2013,
    pmid: "23867520",
  },
  {
    authors: "Longland TM, Oikawa SY, Mitchell CJ, Devries MC, Phillips SM.",
    title:
      "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss: a randomized trial.",
    source: "Am J Clin Nutr",
    year: 2016,
    pmid: "26817506",
  },
  {
    authors:
      "Jäger R, Kerksick CM, Campbell BI, Cribb PJ, Wells SD, Skwiat TM, Purpura M, Ziegenfuss TN, Ferrando AA, Arent SM, Smith-Ryan AE, Stout JR, Arciero PJ, Ormsbee MJ, Taylor LW, Wilborn CD, Kalman DS, Kreider RB, Willoughby DS, Hoffman JR, Krzykowski JL, Antonio J.",
    title:
      "International Society of Sports Nutrition Position Stand: protein and exercise.",
    source: "J Int Soc Sports Nutr",
    year: 2017,
    pmid: "28642676",
  },
  {
    authors: "Mamerow MM, Mettler JA, English KL, Casperson SL, Arentson-Lantz E, Sheffield-Moore M, Layman DK, Paddon-Jones D.",
    title:
      "Dietary protein distribution positively influences 24-h muscle protein synthesis in healthy adults.",
    source: "J Nutr",
    year: 2014,
    pmid: "24477298",
  },
  {
    authors: "Helms ER, Aragon AA, Fitschen PJ.",
    title:
      "Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation.",
    source: "J Int Soc Sports Nutr",
    year: 2014,
    pmid: "24864135",
  },
  {
    authors: "Mettler S, Mitchell N, Tipton KD.",
    title:
      "Increased protein intake reduces lean body mass loss during weight loss in athletes.",
    source: "Med Sci Sports Exerc",
    year: 2010,
    pmid: "19927027",
  },
  {
    authors: "Deutz NEP, Bauer JM, Barazzoni R, et al.",
    title:
      "Protein intake and exercise for optimal muscle function with aging: recommendations from the ESPEN Expert Group.",
    source: "Clin Nutr",
    year: 2014,
    pmid: "24814383",
  },
  {
    authors: "Neeland IJ, Linge J, Birkenfeld AL.",
    title:
      "Changes in lean body mass with glucagon-like peptide-1-based therapies and mitigation strategies.",
    source: "Diabetes Obes Metab",
    year: 2024,
    pmid: "38937282",
  },
  {
    authors: "Hall KD, Sacks G, Chandramohan D, et al.",
    title:
      "Quantification of the effect of energy imbalance on bodyweight.",
    source: "Lancet",
    year: 2011,
    pmid: "21872751",
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
  {
    authors: "Food and Agriculture Organization / World Health Organization / United Nations University.",
    title:
      "Human Energy Requirements: Report of a Joint FAO/WHO/UNU Expert Consultation. Rome, October 17-24, 2001 — Physical Activity Level (PAL) multipliers.",
    source: "FAO Food and Nutrition Technical Report Series",
    year: 2004,
    url: "https://www.fao.org/3/y5686e/y5686e00.htm",
  },
];

export default function ProteinCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="GLP-1 Protein & Macro Calculator"
        description="Daily protein target, BMR, TDEE, and macro split for patients on or starting a GLP-1 receptor agonist. Anchored on Bauer 2013 PROT-AGE, Longland 2016, ISSN 2017, Neeland 2024 GLP-1 lean mass mitigation review, and the Mifflin-St Jeor BMR equation."
        url="https://weightlossrankings.org/tools/glp1-protein-calculator"
        image="https://weightlossrankings.org/tools/glp1-protein-calculator/opengraph-image"
        isMedical={true}
        datePublished="2026-04-07"
      />
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">GLP-1 protein calculator</span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          Protein & macro calculator with GLP-1 muscle-preservation overlay
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 Protein & Macro Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Calculate your daily protein target, BMR, TDEE, and macro
          split. The calculator bumps the protein target one tier higher
          when you flag &ldquo;on a GLP-1&rdquo; because the published
          STEP-1 and SURMOUNT-1 body composition substudies show
          25-45% of weight loss is lean tissue without protein and
          resistance training intervention.
        </p>
      </header>

      <ProteinCalculator />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>How the calculator works</h2>
        <p>
          The math is simple but every coefficient is sourced from a
          peer-reviewed primary source.
        </p>
        <ul>
          <li>
            <strong>BMR (Mifflin-St Jeor 1990, PMID 2305711) [1]:</strong>
            <br />
            Male: 10×W(kg) + 6.25×H(cm) − 5×age + 5
            <br />
            Female: 10×W(kg) + 6.25×H(cm) − 5×age − 161
          </li>
          <li>
            <strong>TDEE (FAO/WHO/UNU 2001 PAL multipliers) [13]:</strong>{" "}
            BMR × {`{1.2, 1.375, 1.55, 1.725, 1.9}`} for sedentary,
            light, moderate, very, and extremely active.
          </li>
          <li>
            <strong>Caloric deficit (Hall 2011, PMID 21872751) [10]:</strong>{" "}
            500 kcal/day deficit for weight loss yields ~0.45 kg/week at
            steady state. Real rates are slower due to metabolic
            adaptation.
          </li>
          <li>
            <strong>Protein tier selection</strong> (see below).
          </li>
          <li>
            <strong>Per-meal split (Mamerow 2014, PMID 24477298) [5]:</strong>{" "}
            even distribution across 3 main meals increased 24-h muscle
            protein synthesis by ~25% versus skewed.
          </li>
        </ul>

        <h2>The protein tier ladder</h2>
        <p>
          Five tiers, each anchored on a specific published recommendation:
        </p>
        <ul>
          <li>
            <strong>0.8 g/kg/day</strong> &mdash; the RDA. Sufficient for
            sedentary adults at maintenance, almost certainly insufficient
            for anyone losing weight on a GLP-1.
          </li>
          <li>
            <strong>1.0-1.2 g/kg/day</strong> &mdash; PROT-AGE 2013 [2]
            recommendation for healthy older adults at maintenance.
          </li>
          <li>
            <strong>1.2-1.6 g/kg/day</strong> &mdash; PROT-AGE for
            disease/exercise, ESPEN 2014 [8] for older adults with
            disease, and the lower end of the ISSN 2017 [4] range for
            active individuals.
          </li>
          <li>
            <strong>1.6-2.0 g/kg/day</strong> &mdash; ISSN 2017 [4]
            recommendation for active individuals, and the Neeland 2024
            [9] target for GLP-1 patients.
          </li>
          <li>
            <strong>2.0-2.4 g/kg/day</strong> &mdash; Longland 2016 [3]
            high arm (added LBM during a 4-week severe deficit + RT),
            Mettler 2010 [7] LBM preservation in trained athletes
            during weight loss, and Helms 2014 [6] contest-prep range.
          </li>
        </ul>

        <h2>The GLP-1 bump</h2>
        <p>
          Patients flagging that they are on (or starting) a GLP-1
          receptor agonist get bumped <em>one tier higher</em> than they
          would otherwise. The reason: the STEP-1 [11] and SURMOUNT-1
          [12] body composition substudies show 25-45% of total weight
          loss on these drugs is lean tissue without protein and
          resistance training intervention, and the Neeland 2024 [9]
          review on GLP-1 lean mass mitigation specifically recommends
          targeting the higher end of the protein range (1.6-2.3 g/kg
          fat-free mass) for this population. The bump is the clinical
          translation of that finding.
        </p>

        <h2>What this calculator does NOT do</h2>
        <ul>
          <li>
            It does not measure your body fat or lean mass. The protein
            target is based on total body weight, not fat-free mass.
            DXA-based fat-free-mass targeting is more precise and is
            what clinical trials use; for home use, total body weight is
            an acceptable proxy.
          </li>
          <li>
            It does not adjust for kidney disease. Patients with
            chronic kidney disease (eGFR &lt; 60) should discuss protein
            intake with their nephrologist before pushing into the
            higher tiers.
          </li>
          <li>
            It does not provide a meal plan. It tells you targets; you
            and a registered dietitian can build the plan.
          </li>
          <li>
            It does not replace a clinical conversation with your
            prescriber, especially if you are managing diabetes,
            kidney disease, or any condition that affects nutrition.
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          This calculator is for educational purposes only and does not
          constitute medical advice or dietary prescription. The
          published protein recommendations are from healthy adult and
          older-adult populations and do not directly apply to patients
          with chronic kidney disease, advanced liver disease, or
          metabolic disorders. Patients with any of these conditions
          should consult a registered dietitian or their prescribing
          clinician before adopting the targets in this tool. Every
          coefficient was verified against PubMed primary sources by a
          research subagent on 2026-04-07.
        </p>

        <h2>Related tools and research</h2>
        <ul>
          <li>
            <Link href="/research/semaglutide-muscle-mass-loss">
              Semaglutide and muscle mass loss
            </Link>{" "}
            — the lean tissue loss problem this tool is designed to
            mitigate
          </li>
          <li>
            <Link href="/research/loose-skin-after-glp1-weight-loss">
              Loose skin after rapid GLP-1 weight loss
            </Link>{" "}
            — downstream effect of inadequate lean-mass preservation
          </li>
          <li>
            <Link href="/research/what-to-eat-on-glp1-diet-protein-guide">
              What to eat on a GLP-1
            </Link>{" "}
            — practical food choices for the protein target
          </li>
          <li>
            <Link href="/tools/glp1-bmi-calculator">GLP-1 BMI calculator</Link>{" "}
            — see your starting BMI and trial endpoint projections
          </li>
          <li>
            <Link href="/tools/glp1-weight-loss-calculator">
              GLP-1 weight loss calculator
            </Link>{" "}
            — week-by-week trial projections
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
      <ToolDataFreshness slug="glp1-protein-calculator" />
    </main>
  );
}
