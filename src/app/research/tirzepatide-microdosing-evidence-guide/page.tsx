import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "tirzepatide-microdosing-evidence-guide";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: { canonical: `/research/${SLUG}` },
    openGraph: {
      title: { absolute: article.title },
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

// Editorial YMYL framing note: this article does NOT provide
// dose recommendations. It summarizes the published SURMOUNT-1
// dose-ranging arms (2.5, 5, 7.5, 10, 15 mg), explains that no
// formal trial has tested sub-2.5 mg doses, and frames any dose
// below the FDA-approved starting dose as off-label. Patients
// who choose to microdose should do so with their prescriber's
// involvement, not in isolation. The article exists to answer the
// patient's question honestly and redirect to the prescriber.

export default function TirzMicrodoseArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
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
      authors:
        "Frias JP, Davies MJ, Rosenstock J, Pérez Manghi FC, Fernández Landó L, Bergman BK, Liu B, Cui X, Brown K; SURPASS-2 Investigators.",
      title:
        "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (SURPASS-2).",
      source: "N Engl J Med",
      year: 2021,
      pmid: "34170647",
    },
    {
      authors:
        "Coskun T, Sloop KW, Loghin C, Alsina-Fernandez J, Urva S, Bokvist KB, Cui X, Briere DA, Cabrera O, Roell WC, Kuchibhotla U, Moyers JS, Benson CT, Gimeno RE, D'Alessio DA, Haupt A.",
      title:
        "LY3298176, a novel dual GIP and GLP-1 receptor agonist for the treatment of type 2 diabetes mellitus: From discovery to clinical proof of concept.",
      source: "Mol Metab",
      year: 2018,
      pmid: "30473097",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 2.2 Important Administration Instructions and Section 2.3 Dosage Escalation.",
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
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s015lbl.pdf",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Off-Label Use of Approved Drugs and the Role of the Prescriber — FDA Basics for Patients.",
      source: "FDA Drug Information",
      year: 2023,
      url: "https://www.fda.gov/patients/learn-about-expanded-access-and-other-treatment-options/understanding-unapproved-use-approved-drugs-label",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Tirzepatide microdosing — using doses below the FDA-approved
        2.5 mg starting dose — has become a popular strategy in
        patient communities, mostly for cost reasons (compounded
        vials are priced per mg) and side effect tolerance. The
        SURMOUNT-1 trial<Cite n={1} /> tested 5, 10, and 15 mg
        maintenance doses with a 2.5 mg starter; no formal trial has
        tested anything below 2.5 mg. This article walks through
        what the published dose-response curve actually shows, why
        any dose below the FDA-approved starting dose is off-label,
        and the conversation patients should have with their
        prescriber rather than self-microdosing in isolation.
      </p>

      <h2>What &ldquo;microdosing&rdquo; actually means in this context</h2>
      <p>
        In tirzepatide patient communities, &ldquo;microdosing&rdquo;
        typically refers to one of three things:
      </p>
      <ul>
        <li>
          <strong>Sub-2.5 mg doses</strong> (e.g., 1 mg, 1.25 mg, or
          1.5 mg weekly) — below the FDA-approved 2.5 mg starting
          dose
        </li>
        <li>
          <strong>Staying on 2.5 mg indefinitely</strong> rather
          than escalating to the 5/10/15 mg maintenance doses — this
          is technically a label-allowed starter dose but not a
          maintenance dose per the prescribing information
        </li>
        <li>
          <strong>Splitting the weekly dose into two smaller
          injections</strong> (e.g., half-dose Mondays and half-dose
          Thursdays) — pharmacologically distinct from microdosing
          but often grouped under the same patient term
        </li>
      </ul>
      <p>
        None of these is FDA-approved as a maintenance regimen for
        Zepbound or Mounjaro<Cite n={4} /><Cite n={5} />. The
        first and third are completely off-label; the second is on
        the label as a starter dose only.
      </p>

      <h2>The published SURMOUNT-1 dose-response data</h2>
      <p>
        SURMOUNT-1<Cite n={1} /> was the obesity registration trial
        for tirzepatide and tested three maintenance doses against
        placebo over 72 weeks in 2,539 adults with BMI ≥30 (or ≥27
        with comorbidity). Mean weight loss at 72 weeks:
      </p>
      <ul>
        <li>
          <strong>Placebo</strong> — −3.1%
        </li>
        <li>
          <strong>Tirzepatide 5 mg</strong> — −16.0%
        </li>
        <li>
          <strong>Tirzepatide 10 mg</strong> — −19.5%
        </li>
        <li>
          <strong>Tirzepatide 15 mg</strong> — −20.9%
        </li>
      </ul>
      <p>
        Notice the shape of the curve: the jump from placebo to
        5 mg is large (16 percentage points), the jump from 5 mg to
        10 mg is moderate (3.5 points), and the jump from 10 mg to
        15 mg is small (1.4 points). The dose-response is steep at
        the low end and flattens at the high end. This is the
        scientific basis for the microdosing argument: if 5 mg
        produces 16% weight loss, what does 2.5 mg or 1.25 mg do?
      </p>

      <h2>What we know (and don&apos;t know) about doses below 5 mg</h2>
      <p>
        The 2.5 mg dose was used in SURMOUNT-1 as a 4-week starter
        dose only, not as a maintenance dose. There is no published
        72-week efficacy result for tirzepatide 2.5 mg as a
        maintenance dose, and there is no published trial of any
        dose below 2.5 mg. Inferences from the SURMOUNT-1
        dose-response curve and from the SURPASS diabetes trials
        <Cite n={2} /> suggest that:
      </p>
      <ul>
        <li>
          <strong>2.5 mg as a starter</strong> produces a small
          amount of weight loss (~2-3% over 4 weeks in the trial
          run-in periods)
        </li>
        <li>
          <strong>2.5 mg as a sustained dose</strong> would
          probably produce more weight loss than placebo but
          substantially less than 5 mg — extrapolating the
          dose-response curve
        </li>
        <li>
          <strong>1-1.25 mg doses</strong> — completely
          uncharacterized in the published literature. We have no
          trial data on what they actually do
        </li>
      </ul>
      <p>
        The pharmacokinetics<Cite n={3} /> are linear in the
        labeled dose range (2.5-15 mg), so a 1.25 mg dose would
        produce roughly half the steady-state plasma concentration
        of a 2.5 mg dose. Whether that produces meaningful weight
        loss is an empirical question that has not been answered.
      </p>

      <h2>Why patients microdose anyway</h2>
      <p>
        Three motivations dominate:
      </p>
      <ol>
        <li>
          <strong>Cost.</strong> Compounded tirzepatide is priced
          per mg in many telehealth pharmacies. A 1.25 mg weekly
          regimen costs roughly half as much as a 2.5 mg regimen
          and a quarter as much as 5 mg. For patients paying out of
          pocket, the cost difference is large.
        </li>
        <li>
          <strong>Side effect tolerance.</strong> Some patients
          who cannot tolerate the standard 2.5 mg starter dose due
          to nausea, vomiting, or fatigue find that a fractional
          dose is tolerable. For these patients, microdosing is
          the difference between staying on tirzepatide and
          stopping entirely.
        </li>
        <li>
          <strong>
            Avoiding the &ldquo;rebound&rdquo; from full
            discontinuation.
          </strong>{" "}
          Patients who reach their goal weight on a higher dose
          but want to maintain on a lower dose to avoid the
          weight regain documented in the SURMOUNT-4 trial
          sometimes microdose as a maintenance strategy.
        </li>
      </ol>

      <h2>The risks and unknowns</h2>
      <ul>
        <li>
          <strong>Efficacy is unknown</strong> at doses below 2.5
          mg. Patients may believe they are getting a benefit
          that&apos;s not actually there (or that&apos;s smaller
          than expected).
        </li>
        <li>
          <strong>
            Compounded tirzepatide quality varies.
          </strong>{" "}
          A microdose from a high-quality PCAB-accredited compounder
          is a different thing from a microdose from a grey-market
          source. See our{" "}
          <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
            PCAB accreditation investigation
          </Link>{" "}
          for our vetting framework.
        </li>
        <li>
          <strong>
            Splitting weekly doses changes the pharmacokinetics.
          </strong>{" "}
          Tirzepatide&apos;s once-weekly dosing is designed for the
          ~5-day half-life. Splitting into two injections per week
          shifts the peak-to-trough ratio in ways that have not
          been formally studied.
        </li>
        <li>
          <strong>
            Off-label dosing puts the prescriber at higher risk.
          </strong>{" "}
          A prescriber writing for a non-labeled dose is taking on
          additional clinical and medicolegal exposure compared
          with a labeled dose. Some legitimate prescribers will not
          do it.
        </li>
        <li>
          <strong>
            Insurance and brand-name programs do not cover
            microdosing.
          </strong>{" "}
          Wegovy NovoCare, Zepbound LillyDirect, and most insurance
          formularies dispense in standard label doses only.
          Microdosing is essentially a compounded-pharmacy-only
          phenomenon.
        </li>
      </ul>

      <h2>The conversation to have with your prescriber</h2>
      <p>
        If you are considering microdosing tirzepatide — for cost,
        for tolerance, or for maintenance after goal weight — bring
        it up explicitly with your prescriber rather than doing it
        in isolation. Useful framing for that conversation:
      </p>
      <ul>
        <li>
          <strong>State the reason.</strong> Cost, tolerance, or
          maintenance? Each reason maps to different alternative
          strategies.
        </li>
        <li>
          <strong>Ask about staying on a lower labeled dose.</strong>{" "}
          For some patients, the right answer is to stay on Zepbound
          5 mg long-term rather than escalating to 15 mg, or to
          de-escalate from 15 mg back to 10 mg or 5 mg as a
          maintenance strategy. These are still labeled doses but at
          the lower end.
        </li>
        <li>
          <strong>
            Ask about Foundayo (oral orforglipron) as an alternative.
          </strong>{" "}
          The new oral GLP-1 has a different titration schedule and
          more granular dose levels. For some cost-sensitive
          patients it&apos;s the better answer than microdosing
          tirzepatide.
        </li>
        <li>
          <strong>Document your weight and symptoms</strong> so you
          and your prescriber can tell whether the microdose is
          actually doing anything.
        </li>
        <li>
          <strong>
            Use a PCAB-accredited compounder
          </strong>{" "}
          if you go this route. The compounded supply chain is the
          weakest link.
        </li>
      </ul>

      <h2>What this article is NOT</h2>
      <p>
        This article does not endorse or recommend tirzepatide
        microdosing. There is no published efficacy or safety data
        at doses below 2.5 mg, and any dose below the FDA-approved
        starting dose is off-label<Cite n={6} />. The article
        exists to answer the question patients are actually
        searching for, summarize the trial data that does exist,
        and redirect the decision back to a clinical conversation
        with a qualified prescriber.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          SURMOUNT-1 tested 5, 10, and 15 mg as maintenance doses
          and 2.5 mg as a 4-week starter. No formal trial has
          tested doses below 2.5 mg.
        </li>
        <li>
          The dose-response curve is steep at the low end and
          flattens at the high end — so a 5 mg dose is much closer
          to 15 mg in efficacy than the dose ratio would suggest.
        </li>
        <li>
          Doses below 2.5 mg are off-label and not characterized in
          the published literature. Inferring from linear PK,
          steady-state concentration scales with dose, but the
          weight-loss effect at fractional doses is unknown.
        </li>
        <li>
          Patient motivations for microdosing are real (cost,
          tolerance, maintenance), and there are sometimes better
          on-label alternatives (lower labeled dose, switching to
          Foundayo, switching to compounded semaglutide).
        </li>
        <li>
          If you choose to microdose, do it with your prescriber, a
          PCAB-accredited compounder, and documented monitoring —
          not in isolation.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/semaglutide-microdosing-evidence-guide">
            Semaglutide microdosing evidence guide
          </Link>{" "}
          — same analysis for semaglutide
        </li>
        <li>
          <Link href="/tools/glp1-dose-plotter">
            GLP-1 dose plotter
          </Link>{" "}
          — visualize how each dose builds up in your bloodstream
        </li>
        <li>
          <Link href="/tools/glp1-unit-converter">
            GLP-1 unit converter
          </Link>{" "}
          — mg ↔ insulin syringe units math for compounded vials
        </li>
        <li>
          <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
            Why am I not losing weight on a GLP-1?
          </Link>{" "}
          — the plateau response distribution
        </li>
        <li>
          <Link href="/research/switching-between-glp1-medications-guide">
            Switching between GLP-1 medications
          </Link>
        </li>
        <li>
          <Link href="/research/foundayo-orforglipron-fda-approval-2026">
            Foundayo (orforglipron) approval deep-dive
          </Link>{" "}
          — the new oral option with different dose levels
        </li>
        <li>
          <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
            PCAB accreditation: how to vet a compounded pharmacy
          </Link>
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice or a
        recommendation to use any particular dose of tirzepatide.
        Off-label dosing decisions should be made with a qualified
        prescriber who knows your medical history. Tirzepatide is
        FDA-approved as Zepbound and Mounjaro at the labeled doses
        only; any dose below 2.5 mg is unstudied, and any
        compounded supply should come from a PCAB-accredited
        pharmacy.
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "What is tirzepatide microdosing?",
            answer:
              "Tirzepatide microdosing is the practice of using doses below the FDA-approved 2.5/5/7.5/10/12.5/15mg titration schedule — typically 0.5mg to 2mg weekly. It is most often discussed in the context of compounded vials where the prescriber has flexibility to dose by volume. There are no FDA-approved microdosing protocols and no published RCTs of tirzepatide microdosing for weight loss.",
          },
          {
            question: "Does microdosing tirzepatide work?",
            answer:
              "There are no published randomized controlled trials of tirzepatide microdosing. The pivotal SURMOUNT trials studied the 2.5-15mg titration. Anecdotal patient reports describe meaningful effects at lower doses, but the evidence base is observational. Most clinicians reserve microdosing for patients who cannot tolerate standard doses or who have specific clinical reasons.",
          },
          {
            question: "Is tirzepatide microdosing safer than full doses?",
            answer:
              "Lower doses generally produce fewer GI side effects (nausea, vomiting, diarrhea, constipation) but the formal safety profile of microdosing is uncharacterized. Risks not directly tied to dose — pancreatitis, gallbladder disease, contraindications, the labeled contraceptive interaction — apply at any dose. Always work with a prescriber who is monitoring you.",
          },
          {
            question: "How much weight will I lose on a tirzepatide microdose?",
            answer:
              "Without published trial data, defensible averages don't exist. Anecdotal reports vary widely. The dose-response relationship for tirzepatide is not linear at the lower end of the curve, and individual response varies. Patients seeking the predictable efficacy shown in SURMOUNT-1 should follow the standard titration schedule.",
          },
          {
            question: "Why would a prescriber recommend tirzepatide microdosing?",
            answer:
              "Common reasons: severe GI intolerance at standard doses, lower BMI patients, supply or cost constraints, post-discontinuation maintenance, or tolerability concerns from prior GLP-1 use. Microdosing tirzepatide is an off-label clinical decision that should be made jointly with a clinician who knows your full medical history.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
