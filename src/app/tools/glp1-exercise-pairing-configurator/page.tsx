import type { Metadata } from "next";
import Link from "next/link";
import References from "@/components/research/References";
import ToolSchema from "@/components/research/ToolSchema";
import ToolDataFreshness from "@/components/tools/ToolDataFreshness";
import ExerciseConfigurator from "./ExerciseConfigurator";

export const metadata: Metadata = {
  title:
    "GLP-1 Exercise Pairing Configurator — Personalized Weekly Plan for Wegovy, Zepbound, Foundayo",
  description:
    "Free configurator that builds a personalized weekly exercise template for patients on (or starting) a GLP-1 receptor agonist. Inputs your fitness level, age, goal, and time on the drug; outputs research-backed resistance days, cardio minutes, step target, and protein guidance. Anchored on the S-LiTE trial (Lundgren NEJM 2021), ACSM 2009/2011 position stands, Saint-Maurice 2020 step count cohort, and the Neeland 2024 GLP-1 lean mass mitigation review.",
  alternates: { canonical: "/tools/glp1-exercise-pairing-configurator" },
};

const CITATIONS = [
  {
    authors:
      "Lundgren JR, Janus C, Jensen SBK, Juhl CR, Olsen LM, Christensen RM, Svane MS, Bandholm T, Bojsen-Møller KN, Blond MB, Jensen JB, Stallknecht BM, Holst JJ, Madsbad S, Torekov SS.",
    title:
      "Healthy Weight Loss Maintenance with Exercise, Liraglutide, or Both Combined.",
    source: "N Engl J Med",
    year: 2021,
    pmid: "33951361",
  },
  {
    authors: "Cava E, Yeat NC, Mittendorfer B.",
    title: "Preserving Healthy Muscle during Weight Loss.",
    source: "Adv Nutr",
    year: 2017,
    pmid: "28507015",
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
    authors: "Longland TM, Oikawa SY, Mitchell CJ, Devries MC, Phillips SM.",
    title:
      "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss.",
    source: "Am J Clin Nutr",
    year: 2016,
    pmid: "26817506",
  },
  {
    authors: "Murphy MH, Nevill AM, Murtagh EM, Holder RL.",
    title:
      "The effect of walking on fitness, fatness and resting blood pressure: a meta-analysis of randomised, controlled trials.",
    source: "Prev Med",
    year: 2007,
    pmid: "17275896",
  },
  {
    authors:
      "Saint-Maurice PF, Troiano RP, Bassett DR Jr, Graubard BI, Carlson SA, Shiroma EJ, Fulton JE, Matthews CE.",
    title:
      "Association of Daily Step Count and Step Intensity With Mortality Among US Adults.",
    source: "JAMA",
    year: 2020,
    pmid: "32207799",
  },
  {
    authors: "Wewege M, van den Berg R, Ward RE, Keech A.",
    title:
      "The effects of high-intensity interval training vs. moderate-intensity continuous training on body composition in overweight and obese adults: a systematic review and meta-analysis.",
    source: "Obes Rev",
    year: 2017,
    pmid: "28401638",
  },
  {
    authors:
      "Donnelly JE, Blair SN, Jakicic JM, Manore MM, Rankin JW, Smith BK; American College of Sports Medicine.",
    title:
      "American College of Sports Medicine Position Stand. Appropriate physical activity intervention strategies for weight loss and prevention of weight regain for adults.",
    source: "Med Sci Sports Exerc",
    year: 2009,
    pmid: "19127177",
  },
  {
    authors:
      "Garber CE, Blissmer B, Deschenes MR, Franklin BA, Lamonte MJ, Lee IM, Nieman DC, Swain DP; American College of Sports Medicine.",
    title:
      "American College of Sports Medicine position stand. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults: guidance for prescribing exercise.",
    source: "Med Sci Sports Exerc",
    year: 2011,
    pmid: "21694556",
  },
  {
    authors: "Murphy C, Koehler K.",
    title:
      "Energy deficiency impairs resistance training gains in lean mass but not strength: A meta-analysis and meta-regression.",
    source: "Scand J Med Sci Sports",
    year: 2022,
    pmid: "34623696",
  },
];

export default function ExerciseConfiguratorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <ToolSchema
        name="GLP-1 Exercise Pairing Configurator"
        description="Personalized weekly exercise template for patients on (or starting) a GLP-1 receptor agonist. Generates a research-backed weekly plan with resistance days, cardio minutes, step target, and protein guidance based on fitness level, age, goal, and time on the drug."
        url="https://weightlossrankings.org/tools/glp1-exercise-pairing-configurator"
        image="https://weightlossrankings.org/tools/glp1-exercise-pairing-configurator/opengraph-image"
        isMedical={true}
        datePublished="2026-04-08"
      />
      <nav className="mb-6 text-sm text-brand-text-secondary">
        <Link href="/tools" className="hover:text-brand-violet">
          Tools
        </Link>
        {" / "}
        <span className="text-brand-text-primary">
          GLP-1 Exercise Pairing Configurator
        </span>
      </nav>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
          S-LiTE trial · ACSM 2009/2011 · Saint-Maurice 2020 · Neeland 2024
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text-primary">
          GLP-1 Exercise Pairing Configurator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-text-secondary leading-relaxed">
          Build a personalized weekly exercise template for your
          GLP-1 weight loss journey. Inputs your fitness level, age,
          goal, and time on the drug; outputs research-backed
          resistance days, cardio minutes, step target, and protein
          guidance. The S-LiTE trial showed exercise + GLP-1
          produced 40% more weight loss than the drug alone.
        </p>
      </header>

      <ExerciseConfigurator />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>Why exercise pairing matters on a GLP-1</h2>
        <p>
          GLP-1 trial body composition substudies show that 25-45%
          of weight loss is lean tissue without exercise
          intervention. Resistance training plus adequate protein
          is the highest-leverage intervention to mitigate this.
          The S-LiTE trial (Lundgren NEJM 2021, PMID 33951361)
          randomized 195 adults to liraglutide alone, exercise
          alone, or both combined, and the combination produced
          &minus;9.5 kg vs &minus;6.8 kg with the drug alone &mdash;
          40% bigger weight loss with roughly double the body fat
          reduction.
        </p>

        <h2>How the configurator works</h2>
        <p>
          Each recommendation is anchored on a peer-reviewed primary
          source:
        </p>
        <ul>
          <li>
            <strong>Resistance training days:</strong> ACSM 2011 position
            stand (Garber, PMID 21694556) sets the floor at 2-3
            days/week of compound multi-joint resistance training.
            We bump to 3-4 days for lean-mass-preservation goal.
          </li>
          <li>
            <strong>Cardio minutes:</strong> ACSM 2009 position stand
            (Donnelly, PMID 19127177) recommends &gt;250 min/week of
            moderate-intensity activity for clinically significant
            weight loss; 150-250 min/wk for modest goals or
            maintenance.
          </li>
          <li>
            <strong>Step target:</strong> Saint-Maurice 2020 JAMA
            cohort (PMID 32207799) identifies 8,000 steps/day as the
            inflection point for mortality benefit (51% reduction vs
            4,000 steps/day). 12,000 steps adds further protection.
          </li>
          <li>
            <strong>HIIT vs MICT:</strong> Wewege 2017 meta-analysis
            (PMID 28401638) shows equivalent body fat outcomes with
            HIIT in roughly 40% less time. Reserved for intermediate
            and advanced patients past the first 4 weeks of GLP-1.
          </li>
          <li>
            <strong>Protein target:</strong> Neeland 2024 (PMID
            38937282) recommends 1.6-2.3 g/kg fat-free mass for GLP-1
            patients; we conservatively translate to 1.4-2.0 g/kg
            total body weight depending on goal and age.
          </li>
          <li>
            <strong>Deficit ceiling caveat:</strong> Murphy &amp;
            Koehler 2022 (PMID 34623696) showed deficits &gt;500
            kcal/day below maintenance impair lean mass gains during
            resistance training. GLP-1 appetite suppression can mask
            under-eating; track calories and protein.
          </li>
        </ul>

        <h2>Important disclaimer</h2>
        <p>
          This configurator is for educational purposes only and
          does not constitute medical advice or an exercise
          prescription. Patients with cardiovascular disease, joint
          pathology, or other conditions limiting exertion should
          consult a clinician (and ideally a credentialed exercise
          physiologist or physical therapist) before starting any
          new exercise program. The S-LiTE trial used liraglutide 3
          mg specifically; the directional inference to semaglutide
          and tirzepatide is reasonable but not yet replicated in a
          head-to-head trial. Every primary source cited here was
          independently verified against PubMed by a research
          subagent on 2026-04-08.
        </p>

        <h2>Related research and tools</h2>
        <ul>
          <li>
            <Link href="/research/exercise-pairing-glp1-lean-mass-preservation">
              Exercise pairing on a GLP-1 — full research deep-dive
            </Link>
          </li>
          <li>
            <Link href="/tools/glp1-protein-calculator">
              GLP-1 protein &amp; macro calculator
            </Link>{" "}
            — for the nutrition side of muscle preservation
          </li>
          <li>
            <Link href="/research/loose-skin-after-glp1-weight-loss">
              Loose skin after rapid GLP-1 weight loss
            </Link>
          </li>
          <li>
            <Link href="/research/semaglutide-muscle-mass-loss">
              Semaglutide and muscle mass loss
            </Link>
          </li>
          <li>
            <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
              Why am I not losing weight on a GLP-1?
            </Link>
          </li>
          <li>
            <Link href="/tools/glp1-bmi-calculator">
              GLP-1 BMI calculator
            </Link>
          </li>
        </ul>
      </section>

      <References items={CITATIONS} />
      <ToolDataFreshness slug="glp1-exercise-pairing-configurator" />
    </main>
  );
}
