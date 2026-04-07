import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "retatrutide-triple-agonist-evidence-2026";

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

// Every clinical claim in this article was verified against
// peer-reviewed primary sources or Eli Lilly investor releases
// before publication. The phase 2 result (24.2% body weight
// reduction at 48 weeks) is from Jastreboff et al., NEJM 2023
// (PMID 37366315). The TRIUMPH design paper is PMID 41090431
// (Diabetes, Obesity and Metabolism 2026). The TRIUMPH-4 readout
// (December 11, 2025) is from Lilly's investor press release
// directly. We deliberately mark TRIUMPH-1, -2, -3 as "expected
// 2026" because they have not yet read out as of this writing.
// Detailed safety characterization will wait for the full
// peer-reviewed TRIUMPH-4 manuscript; we do not speculate about
// safety signals beyond what Lilly has explicitly disclosed.

export default function RetatrutideArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors:
        "Jastreboff AM, Kaplan LM, Frías JP, Wu Q, Du Y, Gurbuz S, Coskun T, Haupt A, Milicevic Z, Hartman ML; Retatrutide Phase 2 Obesity Trial Investigators.",
      title:
        "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial.",
      source: "N Engl J Med",
      year: 2023,
      pmid: "37366315",
    },
    {
      authors:
        "Giblin J, Wadden TA, Coskun T, Haupt A, Bunck MC, Tham LS, Hardy E, Frías JP.",
      title:
        "Retatrutide for the treatment of obesity, obstructive sleep apnea and knee osteoarthritis: Rationale and design of the TRIUMPH registrational clinical trials.",
      source: "Diabetes, Obesity and Metabolism",
      year: 2026,
      pmid: "41090431",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "Lilly's triple agonist, retatrutide, delivered weight loss of up to an average of 71.2 lbs along with substantial relief from osteoarthritis pain in first successful Phase 3 trial.",
      source: "Lilly Investor Press Release, December 11, 2025",
      year: 2025,
      url: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-weight-loss-average",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "A Study of Retatrutide (LY3437943) in Adult Participants With Obesity (TRIUMPH-1).",
      source: "ClinicalTrials.gov NCT05929066",
      year: 2024,
      url: "https://clinicaltrials.gov/study/NCT05929066",
    },
    {
      authors:
        "Coskun T, Urva S, Roell WC, Qu H, Loghin C, Moyers JS, O'Farrell LS, Briere DA, Sloop KW, Thomas MK, Pirro V, Wainscott DB, Willard FS, Abernathy M, Morford L, Du Y, Benson C, Gimeno RE, Haupt A, Milicevic Z.",
      title:
        "LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist for glycaemic control and weight loss: from discovery to clinical proof of concept.",
      source: "Cell Metabolism",
      year: 2022,
      pmid: "36240769",
    },
    {
      authors:
        "Rosenstock J, Frías JP, Jastreboff AM, Du Y, Lou J, Gurbuz S, Thomas MK, Hartman ML, Haupt A, Milicevic Z, Coskun T.",
      title:
        "Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo and active-controlled, parallel-group, phase 2 trial conducted in the USA.",
      source: "Lancet",
      year: 2023,
      pmid: "37364502",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Retatrutide (Eli Lilly internal designation LY3437943) is
        the most-anticipated obesity drug in the late-stage
        pipeline. It&apos;s a single molecule that simultaneously
        activates three different gut hormone receptors — GLP-1,
        GIP, and glucagon — making it the first triple agonist to
        reach phase 3 development. The phase 2 trial in adults
        with obesity (Jastreboff et al., NEJM 2023) reported up
        to <strong>24.2% body weight reduction at 48 weeks</strong>{" "}
        on the highest dose [1] — the largest weight loss any
        pharmacological obesity therapy had ever produced in a
        controlled trial at the time of publication. The first
        phase 3 readout, TRIUMPH-4, came in on December 11, 2025
        in adults with knee osteoarthritis and obesity:{" "}
        <strong>28.7% mean weight loss</strong> (about 71 pounds)
        at the highest dose, plus 75.8% reduction in OA pain [3].
        Seven additional TRIUMPH phase 3 readouts are expected
        throughout 2026. This article walks through the verified
        phase 2 and TRIUMPH-4 data, the proposed mechanism, and the
        regulatory and compounding considerations that apply while
        the full phase 3 safety dataset is still being assembled.
      </p>

      <h2>What a triple agonist actually means</h2>

      <p>
        The body has multiple gut-hormone receptor systems that
        regulate appetite, glucose metabolism, and energy
        expenditure. The three relevant for retatrutide are:
      </p>

      <ul>
        <li>
          <strong>GLP-1 receptor:</strong> activated by
          semaglutide and tirzepatide. Reduces appetite, slows
          gastric emptying, increases insulin secretion in a
          glucose-dependent manner, and signals satiety in
          hindbrain reward circuits.
        </li>
        <li>
          <strong>GIP receptor:</strong> activated by tirzepatide
          (which is a dual GLP-1 + GIP agonist). Glucose-dependent
          insulinotropic polypeptide enhances insulin secretion
          and may modulate adipose tissue energy storage. The
          additive effect of GIP on top of GLP-1 is part of why
          tirzepatide outperforms semaglutide.
        </li>
        <li>
          <strong>Glucagon receptor:</strong> activated only by
          retatrutide in this drug class. Glucagon is best known
          as a hyperglycemic counter-regulatory hormone, but it
          also <em>increases energy expenditure</em>, stimulates
          lipolysis, and reduces hepatic fat. The glucagon-receptor
          arm is what makes retatrutide&apos;s effect size larger
          than tirzepatide&apos;s — but it also creates the most
          interesting safety questions, since you&apos;re
          simultaneously activating a hormone that <em>raises</em>{" "}
          blood glucose alongside two that lower it.
        </li>
      </ul>

      <p>
        Coskun et al. published the discovery and preclinical
        proof-of-concept work for LY3437943 in Cell Metabolism in
        2022 [5], establishing the receptor binding profile and
        the in vivo metabolic effects in animal models that
        justified progression to human trials.
      </p>

      <h2>The phase 2 trial: where the 24% number came from</h2>

      <p>
        Jastreboff et al., NEJM 2023, was the phase 2 randomized
        trial of retatrutide in adults with obesity (no diabetes)
        [1]. Verified design and result:
      </p>

      <ul>
        <li>
          <strong>Sample size:</strong> 338 adults randomized
          across multiple dose arms and placebo
        </li>
        <li>
          <strong>Doses:</strong> 1 mg, 4 mg (with two different
          escalation schedules), 8 mg, and 12 mg subcutaneously
          weekly
        </li>
        <li>
          <strong>Duration:</strong> 48 weeks
        </li>
        <li>
          <strong>Primary endpoint:</strong> percent change in
          body weight from baseline at week 24 (and week 48)
        </li>
      </ul>

      <table>
        <thead>
          <tr>
            <th>Arm at 48 weeks</th>
            <th>Mean weight loss</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Retatrutide 12 mg</td>
            <td>
              <strong>−24.2%</strong>
            </td>
          </tr>
          <tr>
            <td>Retatrutide 8 mg</td>
            <td>−22.8%</td>
          </tr>
          <tr>
            <td>Retatrutide 4 mg</td>
            <td>−17.5%</td>
          </tr>
          <tr>
            <td>Retatrutide 1 mg</td>
            <td>−7.2%</td>
          </tr>
          <tr>
            <td>Placebo</td>
            <td>−2.1%</td>
          </tr>
        </tbody>
      </table>

      <p>
        The 24.2% mean weight loss at the highest dose was
        unprecedented for the obesity drug class. For context,
        SURMOUNT-1 had reported tirzepatide 15 mg producing 20.9%
        at 72 weeks — a longer trial — and STEP-1 had reported
        semaglutide 2.4 mg producing 14.9% at 68 weeks. Retatrutide
        12 mg was producing more weight loss in 48 weeks than
        either of the highest-effect-size drugs in the existing
        market did over their longer trial durations.
      </p>

      <p>
        Jastreboff et al. also published the diabetes phase 2 trial
        in The Lancet in 2023 [6], showing dose-dependent weight
        loss and HbA1c reduction in T2D patients consistent with
        the obesity-trial signal.
      </p>

      <h2>The TRIUMPH phase 3 program</h2>

      <p>
        Lilly designed the TRIUMPH program as a portfolio of
        registrational trials across obesity, T2D, knee
        osteoarthritis, obstructive sleep apnea, cardiovascular
        outcomes, MASLD/MASH, and chronic low back pain. The
        rationale and design were published by Giblin et al. in
        Diabetes, Obesity and Metabolism in 2026 [2]. The full
        TRIUMPH program enrolls more than 5,800 participants
        across multiple trials.
      </p>

      <p>
        The four headline trials are:
      </p>

      <ul>
        <li>
          <strong>TRIUMPH-1</strong> (NCT05929066) [4]: phase 3
          weight management in adults with obesity or overweight
          + ≥1 weight-related comorbidity (no T2D), with nested
          OSA and OA cohorts. Expected readout: 2026.
        </li>
        <li>
          <strong>TRIUMPH-2:</strong> phase 3 weight management
          basket trial including patients with T2D. Expected
          readout: 2026.
        </li>
        <li>
          <strong>TRIUMPH-3:</strong> phase 3 weight management
          in adults with established cardiovascular disease.
          Expected readout: 2026.
        </li>
        <li>
          <strong>TRIUMPH-4</strong>{" "}
          (
          <em>read out December 11, 2025</em>
          ): phase 3 stand-alone study in adults with obesity and
          knee osteoarthritis [3].
        </li>
      </ul>

      <h2>TRIUMPH-4: the first phase 3 readout</h2>

      <p>
        TRIUMPH-4 reported topline results on December 11, 2025
        [3]. Verified details:
      </p>

      <ul>
        <li>
          <strong>Sample size:</strong> 445 participants
        </li>
        <li>
          <strong>Population:</strong> adults with obesity or
          overweight + knee osteoarthritis
        </li>
        <li>
          <strong>Duration:</strong> 68 weeks
        </li>
        <li>
          <strong>Doses tested:</strong> retatrutide 9 mg and 12
          mg subcutaneously once weekly
        </li>
        <li>
          <strong>Primary endpoints:</strong> percent change in
          body weight, change in OA pain (WOMAC pain subscale)
        </li>
      </ul>

      <p>
        Lilly reported that retatrutide met all primary and key
        secondary endpoints in TRIUMPH-4 [3]:
      </p>

      <ul>
        <li>
          <strong>Weight loss up to 28.7% (~71.2 lbs)</strong> at
          the highest dose
        </li>
        <li>
          <strong>OA pain reduction up to 75.8%</strong> from
          baseline
        </li>
      </ul>

      <p>
        The 28.7% mean weight loss confirms — and meaningfully
        extends — the phase 2 signal. It is the largest weight
        loss any pharmacological therapy has ever shown in a
        randomized phase 3 trial. The OA pain reduction is also
        clinically transformative for the population enrolled in
        the trial; orthopedic guidelines have historically had
        very few non-surgical options that produce this magnitude
        of pain improvement in obese patients with knee OA.
      </p>

      <h2>Safety profile and what is still unknown</h2>

      <p>
        Lilly&apos;s December 11, 2025 TRIUMPH-4 press release
        reported that retatrutide met all primary and key secondary
        endpoints, with an adverse event profile described as
        consistent with the phase 2 program and with the incretin
        drug class (predominantly gastrointestinal, mild to
        moderate, dose-dependent) [3]. The full TRIUMPH-4 manuscript
        and the detailed safety tables have not yet been published
        in a peer-reviewed journal at the time of this writing, so
        any more granular characterization of adverse events should
        wait for the primary publication.
      </p>

      <p>
        For YMYL editorial purposes, the responsible framing is
        that retatrutide is investigational, the phase 3 program is
        still in flight, and a complete safety profile will not be
        available until (a) the full TRIUMPH-4 manuscript is
        published, (b) the additional TRIUMPH readouts come in
        throughout 2026, and (c) the FDA review process produces a
        public risk-benefit assessment. Until then, any patient
        considering compounded retatrutide from a telehealth
        provider &mdash; and a small number of telehealth clinics
        have begun offering it &mdash; is doing so without the
        full FDA-reviewed safety dataset that the brand-name
        approved GLP-1s have accumulated. We&apos;ll update this
        article as the safety picture clarifies.
      </p>

      <h2>How retatrutide compares to the rest of the obesity drug landscape</h2>

      <table>
        <thead>
          <tr>
            <th>Drug</th>
            <th>Mechanism</th>
            <th>Highest reported weight loss</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wegovy (semaglutide 2.4 mg)</td>
            <td>GLP-1</td>
            <td>−14.9% (STEP-1, 68 wk)</td>
            <td>Approved</td>
          </tr>
          <tr>
            <td>Zepbound (tirzepatide 15 mg)</td>
            <td>GLP-1 + GIP</td>
            <td>−20.9% (SURMOUNT-1, 72 wk)</td>
            <td>Approved</td>
          </tr>
          <tr>
            <td>Foundayo (orforglipron)</td>
            <td>Oral small-molecule GLP-1</td>
            <td>−11.1% (Foundayo PI, 17.2 mg, 72 wk)</td>
            <td>Approved Apr 2026</td>
          </tr>
          <tr>
            <td>CagriSema</td>
            <td>GLP-1 + amylin</td>
            <td>−22.7% (REDEFINE 1, 68 wk adherent)</td>
            <td>NDA pending</td>
          </tr>
          <tr>
            <td>
              <strong>Retatrutide</strong>
            </td>
            <td>
              <strong>GLP-1 + GIP + glucagon</strong>
            </td>
            <td>
              <strong>−24.2% phase 2; −28.7% TRIUMPH-4</strong>
            </td>
            <td>Phase 3</td>
          </tr>
        </tbody>
      </table>

      <p>
        Retatrutide is currently positioned to become the most
        effective obesity drug ever approved, assuming the
        TRIUMPH program continues to produce the kind of results
        TRIUMPH-4 reported and the full safety dataset holds up
        through FDA review. The relevant question for the next
        12-18 months is not whether retatrutide will be approved
        but at what dose, with what label cautions, and at what
        price.
      </p>

      <h2>What about compounded retatrutide?</h2>

      <p>
        A small number of telehealth providers have begun
        offering compounded retatrutide directly to patients,
        framing it as a way to access the next-generation drug
        before FDA approval. We strongly recommend caution here
        for several reasons:
      </p>

      <ol>
        <li>
          <strong>Retatrutide is not FDA-approved.</strong> It
          has not received any of the regulatory scrutiny that
          approved GLP-1s have. The full safety dataset is not
          public.
        </li>
        <li>
          <strong>Compounding pharmacies cannot legally compound
          drugs that are still in active clinical investigation
          unless those drugs are on the FDA bulk substances
          list</strong>, which retatrutide is not. Compounded
          retatrutide is in a regulatory gray zone at best.
        </li>
        <li>
          <strong>The active pharmaceutical ingredient (API)
          source is uncertain.</strong> Without an FDA-approved
          API supply chain, compounded retatrutide is being
          sourced from APIs that have not gone through the
          identity, purity, and potency verification that
          approved drugs require.
        </li>
        <li>
          <strong>The dosing is not standardized.</strong> The
          phase 2 and phase 3 dose schedules used carefully
          characterized titration; off-label compounded use does
          not consistently follow these protocols.
        </li>
      </ol>

      <p>
        For more on the FDA enforcement landscape around
        compounded GLP-1s, see our{" "}
        <Link href="/research/fda-warning-letters-glp1">
          FDA warning letters investigation
        </Link>
        . For the difference between 503A and 503B compounding
        and what each can legally make, see our{" "}
        <Link href="/research/compounded-semaglutide-bioequivalence">
          compounded semaglutide bioequivalence deep-dive
        </Link>
        .
      </p>

      <h2>Open questions</h2>

      <ol>
        <li>
          <strong>Full TRIUMPH-1, -2, -3 readouts.</strong> The
          headline obesity, T2D, and CVD trials are all expected
          in 2026. Magnitude, durability, and adverse event
          profile across these populations will determine the
          final approved indication and dose.
        </li>
        <li>
          <strong>The glucagon-receptor safety question.</strong>{" "}
          Glucagon-receptor agonism is the novel mechanistic
          element. It also creates the most interesting safety
          questions: hepatic effects, glycemic control in T2D, and
          cardiac effects of increased energy expenditure. These
          will be characterized in detail once the full TRIUMPH
          manuscripts are published.
        </li>
        <li>
          <strong>Pricing.</strong> Lilly has not announced
          launch pricing. Given the effect-size advantage,
          retatrutide is likely to launch at premium pricing
          relative to existing brand-name injectables.
        </li>
        <li>
          <strong>Mortality and CV outcomes.</strong> The
          TRIUMPH cardiovascular outcomes trial will need years
          to mature. Until then, there is no hard-outcome
          retatrutide data analogous to the SELECT trial for
          semaglutide.
        </li>
      </ol>

      <h2>Related research</h2>

      <p>
        For the broader obesity drug landscape, see our{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          Foundayo (oral orforglipron) approval analysis
        </Link>
        , the{" "}
        <Link href="/research/cagrisema-redefine-trial-results-2026">
          CagriSema REDEFINE trial deep-dive
        </Link>
        , and the{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide head-to-head
        </Link>
        . For the cardiovascular outcomes evidence on injectable
        semaglutide, see our{" "}
        <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
          SELECT trial deep-dive
        </Link>
        . For pricing context, see our{" "}
        <Link href="/research/glp1-pricing-index">
          GLP-1 pricing index
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
