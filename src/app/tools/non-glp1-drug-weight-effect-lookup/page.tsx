import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import ToolDataFreshness from "@/components/tools/ToolDataFreshness";
import { DATA_LAST_VERIFIED } from "@/lib/non-glp1-drug-effects";
import DrugLookup from "./DrugLookup";

export const metadata: Metadata = {
  title:
    "Does My Drug Cause Weight Loss or Weight Gain? Non-GLP-1 Drug Lookup",
  description:
    "Free lookup of 20 prescription drugs and their weight effects: metformin, topiramate, Qsymia, phentermine, Contrave, bupropion, Vyvanse, Adderall, Trulicity, Jardiance, Farxiga, spironolactone, HRT, sertraline, Lexapro, paroxetine, mirtazapine, vortioxetine, rosiglitazone, glyburide. Each entry verified against PubMed primary sources with magnitude vs GLP-1 context.",
  alternates: { canonical: "/tools/non-glp1-drug-weight-effect-lookup" },
};

const CITATIONS = [
  {
    authors: "Knowler WC, Barrett-Connor E, Fowler SE, Hamman RF, Lachin JM, Walker EA, Nathan DM; Diabetes Prevention Program Research Group.",
    title:
      "Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin.",
    source: "N Engl J Med",
    year: 2002,
    pmid: "11832527",
  },
  {
    authors: "Kahn SE, Haffner SM, Heise MA, Herman WH, Holman RR, Jones NP, Kravitz BG, Lachin JM, O'Neill MC, Zinman B, Viberti G; ADOPT Study Group.",
    title: "Glycemic durability of rosiglitazone, metformin, or glyburide monotherapy.",
    source: "N Engl J Med",
    year: 2006,
    pmid: "17145742",
  },
  {
    authors: "Bray GA, Hollander P, Klein S, Kushner R, Levy B, Fitchet M, Perry BH.",
    title:
      "A 6-month randomized, placebo-controlled, dose-ranging trial of topiramate for weight loss in obesity.",
    source: "Obes Res",
    year: 2003,
    pmid: "12805393",
  },
  {
    authors: "Gadde KM, Allison DB, Ryan DH, Peterson CA, Troupin B, Schwiers ML, Day WW.",
    title:
      "Effects of low-dose, controlled-release, phentermine plus topiramate combination on weight (CONQUER).",
    source: "Lancet",
    year: 2011,
    pmid: "21481449",
  },
  {
    authors: "Greenway FL, Fujioka K, Plodkowski RA, et al.; COR-I Study Group.",
    title:
      "Effect of naltrexone plus bupropion on weight loss (COR-I): a multicentre, randomised, double-blind, placebo-controlled, phase 3 trial.",
    source: "Lancet",
    year: 2010,
    pmid: "20673995",
  },
  {
    authors: "Anderson JW, Greenway FL, Fujioka K, Gadde KM, McKenney J, O'Neil PM.",
    title:
      "Bupropion SR enhances weight loss: a 48-week double-blind, placebo-controlled trial.",
    source: "Obes Res",
    year: 2002,
    pmid: "12105285",
  },
  {
    authors: "McElroy SL, Hudson JI, Mitchell JE, et al.",
    title:
      "Efficacy and Safety of Lisdexamfetamine for Treatment of Adults With Moderate to Severe Binge-Eating Disorder.",
    source: "JAMA Psychiatry",
    year: 2015,
    pmid: "25587645",
  },
  {
    authors: "Frias JP, Bonora E, Nevarez Ruiz L, Li YG, Yu Z, Milicevic Z, Malik R, Bethel MA, Cox DA.",
    title:
      "Efficacy and Safety of Dulaglutide 3.0 mg and 4.5 mg Versus Dulaglutide 1.5 mg in Metformin-Treated Patients With Type 2 Diabetes (AWARD-11).",
    source: "Diabetes Obes Metab",
    year: 2021,
    pmid: "34189841",
  },
  {
    authors:
      "Zinman B, Wanner C, Lachin JM, et al.; EMPA-REG OUTCOME Investigators.",
    title:
      "Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes.",
    source: "N Engl J Med",
    year: 2015,
    pmid: "26378978",
  },
  {
    authors: "Wiviott SD, Raz I, Bonaca MP, et al.; DECLARE-TIMI 58 Investigators.",
    title: "Dapagliflozin and Cardiovascular Outcomes in Type 2 Diabetes.",
    source: "N Engl J Med",
    year: 2019,
    pmid: "30415602",
  },
  {
    authors: "Rossouw JE, Anderson GL, Prentice RL, et al.",
    title:
      "Risks and benefits of estrogen plus progestin in healthy postmenopausal women: principal results From the Women's Health Initiative randomized controlled trial.",
    source: "JAMA",
    year: 2002,
    pmid: "12117397",
  },
  {
    authors: "Gafoor R, Booth HP, Gulliford MC.",
    title:
      "Antidepressant utilisation and incidence of weight gain during 10 years' follow-up: population based cohort study.",
    source: "BMJ",
    year: 2018,
    pmid: "29793997",
  },
  {
    authors: "Fava M, Judge R, Hoog SL, Nilsson ME, Koke SC.",
    title:
      "Fluoxetine versus sertraline and paroxetine in major depressive disorder: changes in weight with long-term treatment.",
    source: "J Clin Psychiatry",
    year: 2000,
    pmid: "11105740",
  },
  {
    authors: "Mahableshwarkar AR, Zajecka J, Jacobson W, Chen Y, Keefe RSE.",
    title:
      "A Randomized, Placebo-Controlled, Active-Reference, Double-Blind, Flexible-Dose Study of the Efficacy of Vortioxetine on Cognitive Function in Major Depressive Disorder.",
    source: "Neuropsychopharmacology",
    year: 2015,
    pmid: "25687662",
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

export default function DrugLookupPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="Non-GLP-1 Drug Weight Effect Lookup"
        description="20 prescription drugs and their documented weight effects, anchored on PubMed primary sources. Search by name, filter by direction (loss / neutral / gain) and drug class. Includes interaction notes for combining with a GLP-1."
        url="https://www.weightlossrankings.org/tools/non-glp1-drug-weight-effect-lookup"
        image="https://www.weightlossrankings.org/tools/non-glp1-drug-weight-effect-lookup/opengraph-image"
        isMedical={true}
        datePublished="2026-04-08"
      />
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          Non-GLP-1 Drug Weight Effect Lookup
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          20 prescription drugs · PubMed-verified · with GLP-1 interaction notes
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          Does My Drug Cause Weight Loss or Weight Gain?
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Search any of 20 common prescription drugs to see whether
          it causes weight loss, weight gain, or is weight-neutral
          — with the magnitude in kg or %, the primary trial
          citation, and a note on combining with a GLP-1 receptor
          agonist. Every entry traces to a verified PubMed primary
          source.
        </p>
      </header>

      <DrugLookup />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>How to use this tool</h2>
        <p>
          Search by drug name (generic or brand) or filter by
          weight direction. Each result shows the documented weight
          effect from the largest available trial, the magnitude
          relative to a typical GLP-1 receptor agonist, and a
          one-line note on combining the drug with a GLP-1.
        </p>

        <h2>What this tool covers</h2>
        <ul>
          <li>
            <strong>FDA-approved obesity drugs:</strong> phentermine,
            Qsymia (phentermine + topiramate), Contrave (naltrexone +
            bupropion)
          </li>
          <li>
            <strong>Type 2 diabetes drugs:</strong> metformin,
            sulfonylureas (glyburide), TZDs (rosiglitazone), SGLT2
            inhibitors (Jardiance, Farxiga), and dulaglutide (Trulicity,
            a smaller-magnitude GLP-1)
          </li>
          <li>
            <strong>Antidepressants:</strong> sertraline, escitalopram,
            paroxetine, mirtazapine, vortioxetine, bupropion (which
            uniquely causes weight loss)
          </li>
          <li>
            <strong>Stimulants:</strong> Vyvanse (FDA-approved for BED,
            not weight loss), Adderall (off-label only)
          </li>
          <li>
            <strong>Topiramate</strong> for weight (off-label) — used
            in Qsymia in combination
          </li>
          <li>
            <strong>HRT</strong> (Cochrane review: weight-neutral)
          </li>
          <li>
            <strong>Spironolactone</strong> (weight-neutral; used
            off-label in PCOS)
          </li>
        </ul>

        <h2>What this tool does NOT cover</h2>
        <ul>
          <li>
            <strong>GLP-1 receptor agonists themselves</strong>{" "}
            (Wegovy, Ozempic, Mounjaro, Zepbound, Foundayo) — those
            are covered in our{" "}
            <Link href="/tools/glp1-bmi-calculator">
              GLP-1 BMI calculator
            </Link>{" "}
            and{" "}
            <Link href="/tools/glp1-weight-loss-calculator">
              GLP-1 weight loss calculator
            </Link>
            .
          </li>
          <li>
            <strong>Bariatric surgery</strong> — see our{" "}
            <Link href="/tools/bariatric-surgery-eligibility-checker">
              bariatric surgery eligibility checker
            </Link>
            .
          </li>
          <li>
            <strong>Supplements</strong> — see our{" "}
            <Link href="/tools/supplement-evidence-grader">
              supplement evidence grader
            </Link>
            .
          </li>
          <li>
            <strong>Steroids, antipsychotics, anticonvulsants for
            seizures</strong> — these have weight effects but were
            not in the primary research scope for this tool.
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          This tool is for educational purposes only and does not
          constitute medical advice. Decisions about starting,
          stopping, or switching medications should be made with a
          qualified prescribing clinician. Drug interactions with
          GLP-1 receptor agonists summarized here are based on FDA
          labels and published literature; individual patient
          situations may warrant additional considerations. Every
          primary source cited here was independently verified
          against PubMed on {DATA_LAST_VERIFIED} by a research
          subagent.
        </p>

        <h2>Related research and tools</h2>
        <ul>
          <li>
            <Link href="/research/metformin-vs-glp1-weight-loss-evidence">
              Metformin and non-GLP-1 diabetes drugs deep-dive
            </Link>
          </li>
          <li>
            <Link href="/research/antidepressants-weight-glp1-evidence">
              Antidepressants and weight on a GLP-1
            </Link>
          </li>
          <li>
            <Link href="/research/topamax-qsymia-topiramate-weight-loss">
              Topamax, Qsymia, and topiramate for weight loss
            </Link>
          </li>
          <li>
            <Link href="/research/vyvanse-adderall-stimulants-weight-glp1">
              Vyvanse, Adderall, and stimulants
            </Link>
          </li>
          <li>
            <Link href="/research/sglt2-inhibitors-vs-glp1-jardiance-farxiga">
              SGLT2 inhibitors vs GLP-1s
            </Link>
          </li>
          <li>
            <Link href="/research/hrt-perimenopause-glp1-women-weight">
              HRT, perimenopause, and GLP-1s
            </Link>
          </li>
          <li>
            <Link href="/tools/glp1-drug-interaction-checker">
              GLP-1 drug interaction checker
            </Link>{" "}
            — for safety interactions specifically (vs weight
            outcomes)
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
      <ToolDataFreshness slug="non-glp1-drug-weight-effect-lookup" />
    </main>
  );
}
