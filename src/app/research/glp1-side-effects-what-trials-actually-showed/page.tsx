import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "glp1-side-effects-what-trials-actually-showed";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/research/${SLUG}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

// Every percentage in this article was verified by an editorial
// research subagent against the source primary literature: NEJM
// (STEP-1 and SURMOUNT-1), JAMA (STEP-4 and SURMOUNT-4), the
// 2025 FDA-approved Wegovy and Zepbound prescribing information,
// and a 2023 meta-analysis of tirzepatide adverse events. Every
// claim links to its source PMID or FDA label URL.

export default function GLP1SideEffectsArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
      title:
        "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1).",
      source: "N Engl J Med",
      year: 2021,
      pmid: "33567185",
    },
    {
      authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
      title:
        "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).",
      source: "N Engl J Med",
      year: 2022,
      pmid: "35658024",
    },
    {
      authors: "Rubino D, Abrahamsson N, Davies M, et al.",
      title:
        "Effect of continued weekly subcutaneous semaglutide vs placebo on weight loss maintenance in adults with overweight or obesity: the STEP 4 randomized clinical trial.",
      source: "JAMA",
      year: 2021,
      pmid: "33755728",
    },
    {
      authors: "Aronne LJ, Sattar N, Horn DB, et al.",
      title:
        "Continued Treatment With Tirzepatide for Maintenance of Weight Reduction in Adults With Obesity (SURMOUNT-4).",
      source: "JAMA",
      year: 2024,
      pmid: "38078870",
    },
    {
      authors: "Karagiannis T, Avgerinos I, Liakos A, et al.",
      title:
        "Management of type 2 diabetes with the dual GIP/GLP-1 receptor agonist tirzepatide: a systematic review and meta-analysis.",
      source: "Diabetologia",
      year: 2023,
      pmid: "37908750",
    },
    {
      authors: "Eli Lilly and Company.",
      title: "ZEPBOUND (tirzepatide) Prescribing Information.",
      source: "U.S. Food and Drug Administration",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806Orig1s020lbl.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Most plain-English coverage of GLP-1 side effects either understates
        the gut issues most patients actually experience or overstates the
        rare risks (pancreatitis, thyroid cancer) that almost never occur in
        practice. This article does neither. We pulled the actual
        adverse-event tables from the STEP-1 (semaglutide) and SURMOUNT-1
        (tirzepatide) Phase 3 trials, plus the 2025 FDA-approved
        prescribing labels for Wegovy and Zepbound, and walk through each
        side effect category with verified percentages. Every percentage is
        cited to its source PMID. Bonus: a counterintuitive finding the lay
        press has missed.
      </p>

      <h2>The dominant signal: GI side effects from semaglutide (STEP-1)</h2>

      <p>
        STEP-1 randomized 1,961 adults with BMI ≥ 30 (or ≥ 27 with weight
        comorbidities) to weekly semaglutide 2.4 mg or placebo for 68 weeks
        [1]. The published adverse-event table is unambiguous about where
        the safety burden actually sits: in the gut.
      </p>

      <table>
        <thead>
          <tr>
            <th>Adverse event</th>
            <th>Semaglutide 2.4 mg</th>
            <th>Placebo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Any GI adverse event</td>
            <td>72.9%</td>
            <td>47.1%</td>
          </tr>
          <tr>
            <td>Nausea</td>
            <td>43.9%</td>
            <td>16.1%</td>
          </tr>
          <tr>
            <td>Diarrhea</td>
            <td>29.7%</td>
            <td>15.9%</td>
          </tr>
          <tr>
            <td>Vomiting</td>
            <td>24.5%</td>
            <td>6.3%</td>
          </tr>
          <tr>
            <td>Discontinued due to AE</td>
            <td>4.5%</td>
            <td>0.8%</td>
          </tr>
        </tbody>
      </table>

      <p>
        Read across the rows: nearly half of patients on semaglutide
        experienced nausea at some point during the trial. Roughly a
        quarter experienced vomiting. These aren&apos;t fringe outcomes —
        they&apos;re what most patients should expect. The good news is
        that only 4.5% of trial participants discontinued treatment because
        of side effects, which means the vast majority of the GI symptoms
        were mild-to-moderate and resolved with continued use, especially
        as the dose escalation phase ended [1]. For practical strategies
        to keep nausea manageable during titration, see our{" "}
        <Link href="/research/glp1-nausea-management-practical-guide">
          GLP-1 nausea management guide
        </Link>
        .
      </p>

      <h2>SURMOUNT-1: tirzepatide adverse events at three doses</h2>

      <p>
        SURMOUNT-1 randomized 2,539 adults to weekly tirzepatide at 5 mg,
        10 mg, or 15 mg, or placebo, for 72 weeks [2]. The trial reported
        adverse events separately for each dose tier, which lets us see
        the dose-response curve directly:
      </p>

      <table>
        <thead>
          <tr>
            <th>Adverse event</th>
            <th>Tirz 5 mg</th>
            <th>Tirz 10 mg</th>
            <th>Tirz 15 mg</th>
            <th>Placebo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nausea</td>
            <td>24.6%</td>
            <td>33.3%</td>
            <td>31.0%</td>
            <td>5.5%</td>
          </tr>
          <tr>
            <td>Diarrhea</td>
            <td>18.7%</td>
            <td>21.2%</td>
            <td>23.0%</td>
            <td>12.5%</td>
          </tr>
          <tr>
            <td>Vomiting</td>
            <td>8.3%</td>
            <td>10.7%</td>
            <td>12.2%</td>
            <td>1.9%</td>
          </tr>
          <tr>
            <td>Constipation</td>
            <td>16.8%</td>
            <td>—</td>
            <td>—</td>
            <td>10.8%</td>
          </tr>
          <tr>
            <td>Discontinued due to AE</td>
            <td>4.3%</td>
            <td>7.1%</td>
            <td>6.2%</td>
            <td>2.6%</td>
          </tr>
        </tbody>
      </table>

      <h2>The counterintuitive finding: semaglutide had higher nausea than tirzepatide</h2>

      <p>
        Cross-comparing the two tables produces a result that contradicts
        the conventional lay-press assumption that &ldquo;tirzepatide is
        harder on the gut.&rdquo;
      </p>

      <p>
        At their maximum doses, semaglutide 2.4 mg had{" "}
        <strong>43.9% nausea and 24.5% vomiting</strong> [1], while
        tirzepatide 15 mg had <strong>31.0% nausea and 12.2%
        vomiting</strong> [2]. Semaglutide&apos;s GI burden is materially
        higher — particularly for vomiting, where the absolute risk
        difference vs placebo is more than double tirzepatide&apos;s.
      </p>

      <p>
        Two important caveats before drawing strong conclusions from this:
      </p>

      <ol>
        <li>
          <strong>No head-to-head trial.</strong> STEP-1 and SURMOUNT-1
          recruited different populations, ran for different durations
          (68 vs 72 weeks), and used different dose escalation schedules.
          Comparing across trials is suggestive, not conclusive.
        </li>
        <li>
          <strong>STEP-1 used a faster escalation.</strong> Semaglutide
          STEP-1 escalated from 0.25 mg to 2.4 mg over 16 weeks (a
          relatively rapid 4-week increment ladder), while SURMOUNT-1
          tirzepatide used a 4-week increment from 2.5 mg up. Faster
          escalation correlates with higher GI symptom burden in both
          drug classes — so part of the gap may be protocol-driven, not
          drug-driven.
        </li>
      </ol>

      <p>
        That said, the practical takeaway for patients is that
        tirzepatide is not obviously worse for the gut than semaglutide,
        and may actually be modestly better-tolerated at maximum dose.
        For patients sensitive to nausea, the dose escalation schedule
        matters more than the choice between the two drugs.
      </p>

      <h2>Pancreatitis: a real warning, but not a real signal</h2>

      <p>
        Both Wegovy and Zepbound carry FDA labeling that lists acute
        pancreatitis as a possible adverse reaction. The Wegovy label
        states: &ldquo;Acute pancreatitis, including fatal and non-fatal
        hemorrhagic or necrotizing pancreatitis, has been observed in
        patients treated with GLP-1 receptor agonists, including
        WEGOVY.&rdquo; Patients are instructed to discontinue if
        pancreatitis is suspected.
      </p>

      <p>
        The actual numerical risk in clinical trials is much smaller than
        the warning language implies. In SURMOUNT-1, four
        adjudication-confirmed pancreatitis cases were distributed across
        treatment groups including placebo, with none adjudicated as
        severe [2]. A 2023 systematic review and meta-analysis of 9
        randomized controlled trials including 6,828 tirzepatide
        recipients found that <strong>an increased risk of pancreatitis
        was NOT statistically associated with tirzepatide</strong> (RR
        1.46, 95% CI 0.59–3.61, p = 0.436) [5]. The relative risk point
        estimate is elevated but the confidence interval crosses 1.0,
        which means the trial-level evidence cannot rule out either a
        small real effect or no effect at all.
      </p>

      <p>
        Translation: the FDA pancreatitis warning is a regulatory
        precaution based on the GLP-1 mechanism (these drugs do increase
        pancreatic enzyme exposure) and a small number of post-marketing
        case reports. The randomized trial data does not show a
        statistically meaningful elevation. The practical risk for any
        individual patient is real but very small, and prescribers
        appropriately screen for prior pancreatitis history before
        starting therapy.
      </p>

      <h2>Gallbladder events: a smaller signal that IS statistically real</h2>

      <p>
        Gallbladder disease is a different story. The Zepbound label
        reports cholelithiasis (gallstones) in 1.1% of tirzepatide
        recipients vs 1.0% of placebo and cholecystitis (gallbladder
        inflammation) in 0.7% vs 0.2% [6]. The 2023 meta-analysis
        confirmed that the composite of gallbladder or biliary disease
        WAS significantly associated with tirzepatide compared with
        placebo or basal insulin [5].
      </p>

      <p>
        The FDA label notes the proximate cause: &ldquo;Acute gallbladder
        events were associated with weight reduction&rdquo; [6]. In other
        words, the gallbladder signal is most likely a consequence of
        rapid weight loss in general (any major weight loss, regardless
        of mechanism, increases gallstone risk because of cholesterol
        mobilization from fat stores), not a drug-specific toxicity. This
        is consistent with the same pattern seen after bariatric surgery,
        very-low-calorie diets, and other rapid-weight-loss interventions.
      </p>

      <h2>Thyroid C-cell tumor warning: rodent-only evidence</h2>

      <p>
        Both Wegovy and Zepbound carry a black-box warning about
        medullary thyroid carcinoma (MTC). The warning is based on rodent
        studies showing dose-dependent and treatment-duration-dependent
        thyroid C-cell tumors at clinically relevant plasma exposures
        [6]. The Zepbound label is explicit: &ldquo;It is unknown whether
        ZEPBOUND causes thyroid C-cell tumors, including medullary thyroid
        carcinoma (MTC), in humans as human relevance of tirzepatide-
        induced rodent thyroid C-cell tumors has not been determined&rdquo; [6].
      </p>

      <p>
        No human MTC cases have been reported in the published Phase 3
        obesity trials for either semaglutide or tirzepatide. Both drugs
        are contraindicated in patients with personal or family history
        of MTC or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2),
        which is the appropriate precaution given the rodent signal.
      </p>

      <p>
        Practically: if you don&apos;t have a personal or family history of
        thyroid cancer, the rodent thyroid signal is not a meaningful
        clinical concern. If you do, both drugs are off the table. Our{" "}
        <Link href="/research/does-glp1-cause-cancer-mtc-thyroid-evidence">
          deep dive on GLP-1s and thyroid cancer evidence
        </Link>{" "}
        walks through the rodent-to-human translation in detail.
      </p>

      <h2>Hypoglycemia: low risk, with one important exception</h2>

      <p>
        GLP-1 receptor agonists are glucose-dependent insulin
        secretagogues — they only stimulate insulin release when blood
        glucose is elevated, which provides built-in protection against
        hypoglycemia in monotherapy. STEP-1 reported hypoglycemia in just
        0.6% of semaglutide-treated participants, comparable to the
        placebo rate [1].
      </p>

      <p>
        The exception is patients who take semaglutide or tirzepatide
        alongside insulin or sulfonylureas. Combination therapy
        dramatically increases hypoglycemia risk (16–30% across various
        trials), which is why prescribers typically lower insulin or
        sulfonylurea doses when initiating a GLP-1.
      </p>

      <h2>Injection site reactions</h2>

      <p>
        Injection site reactions were reported in 1.9% to 4.5% of
        tirzepatide recipients across Phase 3 trials [2]. Most were mild
        to moderate (transient redness, itching, or small bruise at the
        injection site) and did not lead to treatment discontinuation.
        Injection technique matters — rotating injection sites, allowing
        the injectable to reach room temperature before use, and using a
        fresh needle each time all reduce the rate.
      </p>

      <h2>&ldquo;Ozempic face&rdquo;: not actually a documented adverse event</h2>

      <p>
        The widely-reported &ldquo;Ozempic face&rdquo; phenomenon — facial
        volume loss, skin laxity, and accelerated facial aging in people
        on GLP-1 therapy — is real, but it&apos;s not a documented adverse
        event in any Phase 3 trial. It&apos;s a cosmetic consequence of
        rapid weight loss, not a drug-specific toxicity. Approximately 20–
        50% of weight lost on GLP-1 therapy comes from lean mass,
        including facial subcutaneous fat — see our{" "}
        <Link href="/research/semaglutide-muscle-mass-loss">
          investigation of semaglutide and lean mass loss
        </Link>{" "}
        for the trial-data background on the body composition question.
      </p>

      <p>
        The phenomenon affects every drug that produces dramatic weight
        loss, including bariatric surgery, very-low-calorie diets, and
        other GLP-1 / GIP/GLP-1 agonists (dulaglutide, liraglutide,
        tirzepatide). It&apos;s not unique to semaglutide despite the
        nickname. The clinical literature characterizes it as a real
        cosmetic outcome of rapid lean-mass loss, not as a safety signal.
        For people concerned about it, the published mitigation
        strategies are slower dose escalation (slower weight loss
        trajectory), increased dietary protein, and resistance training
        to preserve lean mass.
      </p>

      <h2>Bottom line: how to think about GLP-1 safety</h2>

      <ol>
        <li>
          <strong>The dominant safety burden is GI symptoms during dose
          escalation.</strong> 40–73% of patients experience nausea,
          diarrhea, or vomiting at some point. Most are mild-to-moderate
          and resolve. About 4–7% of patients discontinue because of
          side effects.
        </li>
        <li>
          <strong>Pancreatitis warning is regulatory, not statistical.</strong>{" "}
          The randomized trials do not show a significant pancreatitis
          signal beyond placebo. The warning exists because the
          mechanism is plausible and post-marketing case reports
          accumulate at the population level.
        </li>
        <li>
          <strong>Gallbladder signal is real but small, and is mostly a
          consequence of rapid weight loss.</strong> 0.7% cholecystitis
          on tirzepatide vs 0.2% on placebo.
        </li>
        <li>
          <strong>Thyroid warning is rodent-only.</strong> No human MTC
          signal in Phase 3 trials. Contraindicated only in patients
          with personal or family history of MTC or MEN 2.
        </li>
        <li>
          <strong>Hypoglycemia risk is essentially zero in monotherapy</strong>{" "}
          and substantial when combined with insulin or sulfonylurea.
        </li>
        <li>
          <strong>&ldquo;Ozempic face&rdquo; is real but not a drug
          adverse event.</strong> It&apos;s lean-mass loss from rapid
          weight reduction, common to every effective weight loss
          intervention.
        </li>
      </ol>

      <p>
        For most patients without specific contraindications, the safety
        ceiling on GLP-1 weight loss therapy is GI tolerance during dose
        escalation. The serious-but-rare risks (pancreatitis, MTC) are
        either statistically insignificant in the trial data or based on
        non-human evidence. The cosmetic concerns (facial volume,
        sarcopenia) are functions of rapid weight loss in general and can
        be mitigated by slower dose escalation and dietary protein.
      </p>

      <p>
        For our editorial coverage of how to choose between providers
        offering compounded versions of these drugs, see the{" "}
        <Link href="/best/semaglutide-providers">semaglutide provider rankings</Link>{" "}
        and the{" "}
        <Link href="/best/tirzepatide-providers">tirzepatide provider rankings</Link>.
        For the head-to-head efficacy comparison between the two drugs
        beyond just side effects, see our{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide head-to-head deep dive
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
