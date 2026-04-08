import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import LiveDataCallout from "@/components/research/LiveDataCallout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "tirzepatide-vs-semaglutide-head-to-head";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US": `/research/${SLUG}`,
        // Two Spanish guides cover different angles of this English
        // article (semaglutide-focused and tirzepatide-focused). We
        // surface the semaglutide one as the canonical Spanish
        // alternate via es-US, and the tirzepatide one as a regional
        // Spanish-Latin-America alternate. Both ES articles also
        // link back to this canonical English head-to-head, so the
        // hreflang reciprocity check passes for both pairs.
        "es-US": "/es/research/semaglutide-para-que-sirve",
        "es": "/es/research/tirzepatide-para-que-sirve",
      },
    },
    openGraph: {
      title: { absolute: article.title },
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

export default function HeadToHeadArticle() {
  const article = getResearchArticleBySlug(SLUG)!;
  const dataAsOf = getLatestVerificationDate();

  return (
    <ResearchArticleLayout article={article} dataAsOf={dataAsOf}>
      <div className="not-prose mb-6 rounded-lg border border-brand-violet/20 bg-brand-violet/5 p-4 text-sm text-brand-text-secondary">
        <Link
          href="/es/research/semaglutide-para-que-sirve"
          className="text-brand-violet font-semibold hover:underline"
        >
          Disponible en Español →
        </Link>
      </div>

      <p>
        Semaglutide (Wegovy) and tirzepatide (Zepbound) are the two
        injectable weight-loss medications most patients are choosing
        between in 2026. They&apos;re mechanistically similar &mdash; both
        are once-weekly subcutaneous injections that target the body&apos;s
        incretin pathways &mdash; but they aren&apos;t the same drug, and
        the trial evidence comparing them is now substantial enough to say
        meaningful things about which one works better, for whom, and at
        what cost.
      </p>

      <p>
        This piece walks through the head-to-head and parallel trial data
        from the STEP family (semaglutide) and the SURMOUNT family
        (tirzepatide), then layers on the side effect profile,
        discontinuation rates, and the cost-per-pound calculation that
        most patients actually need to make a real decision.
      </p>

      <h2>Mechanism: a single agonist vs a dual agonist</h2>

      <p>
        Semaglutide is a glucagon-like peptide-1 (GLP-1) receptor agonist.
        It mimics the gut hormone GLP-1, which is released in response to
        eating and produces several effects relevant to weight: it slows
        gastric emptying, increases satiety signaling in the brain, and
        improves insulin secretion in response to glucose.
        <Cite n={1} />
      </p>

      <p>
        Tirzepatide is a dual agonist &mdash; it activates both the GLP-1
        receptor and the glucose-dependent insulinotropic polypeptide
        (GIP) receptor. GIP is a sister incretin hormone with overlapping
        but distinct effects on appetite, energy expenditure, and adipose
        tissue metabolism. The combination produces measurably stronger
        effects on weight and glucose control in trials than GLP-1
        agonism alone, and it&apos;s the reason tirzepatide outperforms
        semaglutide on most weight-loss endpoints in head-to-head data.
        <Cite n={2} />
      </p>

      <p>
        Whether GIP&apos;s contribution is purely additive or whether it
        enables novel mechanisms (changes in adipose tissue insulin
        sensitivity, increased energy expenditure) is still a live
        research question. What&apos;s clear from the trials: the dual
        agonist consistently produces more weight loss at any given dose
        equivalence point.
      </p>

      <h2>The headline trial results</h2>

      <p>
        The cleanest comparison is between STEP 1 (semaglutide 2.4 mg
        weekly, 68 weeks, n=1,961) and SURMOUNT-1 (tirzepatide 5/10/15 mg
        weekly, 72 weeks, n=2,539). Both enrolled adults with overweight
        or obesity but without type 2 diabetes, both used the same
        lifestyle intervention background, and both used the highest
        labeled doses for the weight-loss indication.
        <Cite n={3} /><Cite n={4} />
      </p>

      <p>
        At the highest dose:
      </p>

      <ul>
        <li>
          <strong>Semaglutide 2.4 mg:</strong> mean weight loss of
          &minus;14.9% at 68 weeks (STEP-1 treatment-regimen estimand,
          the primary ITT-style published value). About 32% of patients
          reached &ge;20% body weight loss.
        </li>
        <li>
          <strong>Tirzepatide 15 mg:</strong> mean weight loss of
          &minus;20.9% at 72 weeks (SURMOUNT-1 treatment-regimen
          estimand, the primary published value; the lower 5 mg and
          10 mg doses produced &minus;15.0% and &minus;19.5%
          respectively). About 50% of patients reached &ge;20% body
          weight loss on the treatment-regimen estimand.
        </li>
      </ul>

      <p>
        That&apos;s roughly a 6 percentage point absolute difference,
        which translates to about 40% more weight loss on tirzepatide
        than semaglutide at maximum dose. The difference is large, it&apos;s
        statistically robust, and it has held up across subsequent trial
        replications.
      </p>

      <p>
        <strong>A note on estimands.</strong> Both of the numbers above
        are the FDA-approved primary &ldquo;treatment-regimen&rdquo;
        estimand &mdash; the ITT-equivalent that includes all
        randomized participants regardless of whether they stayed
        adherent to the drug. The published &ldquo;efficacy
        estimand&rdquo; (on-treatment, adherent population) is somewhat
        higher for both drugs: roughly &minus;16.0% for semaglutide
        2.4 mg in STEP-1, and &minus;16.0% / &minus;21.4% / &minus;22.5%
        at the 5/10/15 mg tirzepatide doses in SURMOUNT-1. The
        headline &ldquo;22.5% vs 14.9%&rdquo; comparison you&apos;ll
        see quoted in many places mixes a tirzepatide efficacy estimand
        with a semaglutide treatment-regimen estimand, which isn&apos;t
        an apples-to-apples comparison. When comparing GLP-1s, always
        use the same estimand for both drugs. We use the
        treatment-regimen values throughout this article because
        that&apos;s the primary estimand on both the Wegovy and Zepbound
        FDA labels.
      </p>

      <p>
        SURMOUNT-5 &mdash; the first true head-to-head trial &mdash;
        confirmed this. Published in 2025, SURMOUNT-5 randomized 751 adults
        with obesity directly to tirzepatide or semaglutide at maximum
        tolerated doses for 72 weeks. Tirzepatide produced a mean weight
        loss of about 20.2% versus 13.7% for semaglutide. The 6.5 point
        absolute difference was significant for every secondary endpoint,
        including waist circumference, BMI category transitions, and
        fasting glucose.
        <Cite n={5} />
      </p>

      <h2>Side effect profile</h2>

      <p>
        Both drugs share the GI side effect profile that&apos;s
        characteristic of GLP-1 agonism: nausea, vomiting, diarrhea,
        constipation. The pooled rates are higher than placebo for both,
        and meaningfully different between the two only in degree.
      </p>

      <p>
        Across the STEP and SURMOUNT trials, side effect rates at the
        highest doses look roughly like this:
      </p>

      <ul>
        <li>
          <strong>Nausea:</strong> ~44% on semaglutide, ~33% on
          tirzepatide. Most events are mild to moderate and concentrated
          in the dose-escalation period.
        </li>
        <li>
          <strong>Vomiting:</strong> ~24% semaglutide, ~13% tirzepatide.
        </li>
        <li>
          <strong>Diarrhea:</strong> ~30% on both.
        </li>
        <li>
          <strong>Constipation:</strong> ~24% semaglutide, ~17%
          tirzepatide.
        </li>
        <li>
          <strong>Severe / serious adverse events:</strong> roughly
          equivalent, around 8&ndash;10% in both treatment arms versus
          5&ndash;7% in placebo.
        </li>
      </ul>

      <p>
        The somewhat surprising pattern: tirzepatide actually had lower
        rates of upper-GI symptoms (nausea, vomiting) than semaglutide in
        the trials, despite producing more weight loss. The leading
        hypothesis is that GIP receptor activation has a separate
        anti-emetic effect that partially counteracts the nausea induced
        by GLP-1 agonism. This is one of the more intriguing pharmacology
        stories in the field.
        <Cite n={6} />
      </p>

      <h2>Discontinuation rates</h2>

      <p>
        Discontinuation is the metric that matters most in real clinical
        practice, because the trial completion rates &mdash; both around
        75&ndash;80% &mdash; mask the fact that many of the people who
        finished did so on lower doses than planned, after dose
        reductions for tolerability. In the trials:
      </p>

      <ul>
        <li>
          <strong>STEP 1 semaglutide:</strong> 7.0% discontinued for
          adverse events, vs 3.1% on placebo.
        </li>
        <li>
          <strong>SURMOUNT-1 tirzepatide 15 mg:</strong> 6.2%
          discontinued for adverse events, vs 2.6% on placebo.
        </li>
      </ul>

      <p>
        Real-world data is messier and shows much higher attrition. A
        large 2024 commercial-claims analysis of US patients starting
        either drug for obesity found that roughly 70% had stopped within
        12 months &mdash; far higher than the trial dropout rates. The
        leading reasons in the real-world data were cost (in 38% of
        discontinuers), GI side effects (28%), and access problems
        (drug shortages, pharmacy issues, prior auth denials, ~22%).
        <Cite n={7} />
      </p>

      <p>
        Patients who can sustain therapy for at least 6 months tend to
        keep going, while patients who quit before 90 days are usually
        out for good. The first three months are the highest-risk
        window for discontinuation, and they&apos;re also the dose
        escalation window.
      </p>

      <LiveDataCallout
        drug="tirzepatide"
        form="compounded"
        label="Live: cheapest compounded tirzepatide"
      />

      <h2>Cardiovascular and metabolic outcomes</h2>

      <p>
        Trial data on hard cardiovascular outcomes is more mature for
        semaglutide than for tirzepatide, simply because semaglutide has
        been on the market longer. The SELECT trial (2023) showed a 20%
        relative risk reduction for major adverse cardiovascular events
        (MACE) in patients with established cardiovascular disease and
        overweight/obesity but without diabetes. That&apos;s the
        strongest evidence in the field that the cardiovascular benefits
        of GLP-1 weight loss are real and durable.
        <Cite n={8} />
      </p>

      <p>
        Tirzepatide&apos;s cardiovascular outcomes trial &mdash;
        SURPASS-CVOT, a head-to-head against dulaglutide in patients with
        type 2 diabetes &mdash; reported topline results in 2024 showing
        non-inferiority for MACE. The dedicated tirzepatide-for-obesity
        cardiovascular outcomes trial (SURMOUNT-MMO) is ongoing, with
        results expected in 2027. Until that reads out, the assumption in
        the field is that the dual agonist will produce at least as much
        cardiovascular benefit as the GLP-1-only drug, but the formal
        evidence base is currently smaller.
        <Cite n={9} />
      </p>

      <p>
        Both drugs produce roughly equivalent improvements in fasting
        glucose, HbA1c, blood pressure, triglycerides, and liver enzymes.
        For patients with type 2 diabetes specifically, tirzepatide&apos;s
        edge on glucose control is more pronounced &mdash; the SURPASS
        trials showed superior HbA1c reductions head-to-head against
        semaglutide in diabetic populations.
        <Cite n={10} />
      </p>

      <h2>The cost-per-pound calculation</h2>

      <p>
        The interesting question for most patients isn&apos;t which drug
        produces more weight loss in a trial &mdash; it&apos;s which one
        produces the best value, given what they&apos;ll actually pay
        out of pocket.
      </p>

      <p>
        For a hypothetical 220-pound patient:
      </p>

      <ul>
        <li>
          <strong>Brand-name Wegovy</strong> at ~$1,349/month list price,
          producing 14.9% weight loss over 68 weeks: roughly $5,750 per
          15% body weight reduction, or about <strong>$176 per pound
          lost</strong>.
        </li>
        <li>
          <strong>Brand-name Zepbound</strong> at ~$1,086/month list
          price (Lilly recently lowered cash-pay), producing 20.9%
          weight loss over 72 weeks: roughly <strong>$129 per pound
          lost</strong>.
        </li>
        <li>
          <strong>Compounded semaglutide</strong> at the median
          ~$150/month, same trial efficacy assumption: roughly{" "}
          <strong>$20 per pound lost</strong>.
        </li>
        <li>
          <strong>Compounded tirzepatide</strong> at the median
          ~$300/month: roughly <strong>$33 per pound lost</strong>.
        </li>
      </ul>

      <p>
        The compounded forms reverse the cost ranking: semaglutide is
        actually cheaper per pound on a cash-pay basis, even though
        tirzepatide produces more total weight loss, because compounded
        tirzepatide remains roughly 2x the price of compounded
        semaglutide. For patients optimizing pure cost-per-result, that
        flip is the most important practical takeaway from this whole
        comparison.
      </p>

      <p>
        Caveat: these calculations assume trial efficacy translates to
        real-world results, which is generous. Real-world weight loss is
        usually 60&ndash;75% of trial weight loss because patients
        don&apos;t complete the same dose escalation, miss more doses,
        and have less structured lifestyle support. But the relative
        ranking holds.
      </p>

      <h2>Who should pick which</h2>

      <p>
        Working through the trial data and the cost calculations, here&apos;s
        how the choice tends to shake out for different patient profiles:
      </p>

      <ul>
        <li>
          <strong>Higher BMI (40+) seeking maximum weight loss:</strong>{" "}
          tirzepatide. The ~6 point absolute weight-loss advantage is
          larger in absolute terms when you have more weight to lose,
          and the cost differential matters less proportionally.
        </li>
        <li>
          <strong>Type 2 diabetes plus obesity:</strong> tirzepatide.
          The glucose control advantage in the SURPASS trials is
          meaningful and the FDA-approved obesity indication was
          extended to this population first.
        </li>
        <li>
          <strong>Lower BMI (27&ndash;32) needing 10&ndash;15% loss to
          hit a goal:</strong> semaglutide. You don&apos;t need the
          extra horsepower, and you&apos;ll save substantially on cost.
        </li>
        <li>
          <strong>Established cardiovascular disease without
          diabetes:</strong> currently semaglutide, on the strength of
          SELECT. This may change once SURMOUNT-MMO reads out for
          tirzepatide in 2027.
        </li>
        <li>
          <strong>History of severe GI sensitivity or prior GLP-1
          intolerance:</strong> tirzepatide is worth trying given the
          lower nausea and vomiting rates &mdash; but expect to start
          slow regardless of which one.
        </li>
        <li>
          <strong>Cost is the deciding factor:</strong> compounded
          semaglutide remains the lowest cost-per-pound option in the
          market, by a meaningful margin.
        </li>
      </ul>

      <h2>What we&apos;ll be watching in 2026&ndash;2027</h2>

      <p>
        The two big readouts that should change how this comparison
        looks:
      </p>

      <ul>
        <li>
          <strong>SURMOUNT-MMO:</strong> the dedicated tirzepatide
          cardiovascular outcomes trial in patients with obesity but
          without diabetes. If positive (which seems likely), it
          eliminates the last major reason to default to semaglutide for
          patients with cardiovascular risk.
        </li>
        <li>
          <strong>Oral semaglutide in higher doses:</strong> oral
          semaglutide already exists as Rybelsus at low doses for
          diabetes. The OASIS trial showed that higher oral doses produce
          weight loss approaching (but not matching) injectable
          semaglutide. If approved at the higher dose for obesity, it
          could shift the convenience calculus dramatically.
          <Cite n={11} />
        </li>
        <li>
          <strong>Triple agonists (retatrutide).</strong> Eli Lilly&apos;s
          triple GLP-1/GIP/glucagon agonist showed mean weight loss of
          24.2% at 48 weeks in phase 2 &mdash; numerically higher than
          tirzepatide. If phase 3 results are consistent and approval
          comes through in 2027, the entire competitive picture
          resets.
          <Cite n={12} />
        </li>
      </ul>

      <p>
        Until those readouts, the practical answer for most patients
        remains the one above: tirzepatide for maximum effect, semaglutide
        for maximum value, and the compounded forms of either for
        meaningful cost savings against brand. The full comparison across
        every provider in our dataset is on{" "}
        <Link href="/compare">our compare page</Link>.
      </p>

      <h2>Related research</h2>

      <p>
        The head-to-head efficacy comparison above is one of several
        editorial deep dives we maintain on this drug class. For
        readers who want the full picture beyond the weight-loss
        primary endpoint:
      </p>

      <ul>
        <li>
          <strong>Cardiovascular outcomes:</strong>{" "}
          <Link href="/research/select-trial-cardiovascular-benefits-non-diabetics">
            What SELECT showed about semaglutide and heart attack
            risk
          </Link>{" "}
          — the first randomized cardiovascular outcomes trial of
          a GLP-1 in non-diabetic patients, with a 20% MACE reduction.
        </li>
        <li>
          <strong>Sleep apnea:</strong>{" "}
          <Link href="/research/surmount-osa-tirzepatide-sleep-apnea">
            Tirzepatide for sleep apnea — what SURMOUNT-OSA showed
          </Link>{" "}
          — the trial that made Zepbound the first FDA-approved
          medication for obstructive sleep apnea.
        </li>
        <li>
          <strong>What happens when you stop:</strong>{" "}
          <Link href="/research/what-happens-when-you-stop-semaglutide">
            STEP-4, STEP-1 extension, and SURMOUNT-4 on weight regain
          </Link>{" "}
          — the trials that measured what happens to body weight
          after these drugs are discontinued.
        </li>
        <li>
          <strong>Side effects:</strong>{" "}
          <Link href="/research/glp1-side-effects-what-trials-actually-showed">
            GLP-1 side effects from the actual RCT adverse-event tables
          </Link>{" "}
          — including the counterintuitive finding that semaglutide
          had higher nausea rates than tirzepatide at maximum dose.
        </li>
      </ul>

      <References
        items={[
          {
            authors:
              "Müller TD, Finan B, Bloom SR, D'Alessio D, Drucker DJ, et al.",
            title: "Glucagon-like peptide 1 (GLP-1).",
            source: "Mol Metab",
            year: 2019,
            pmid: "31767182",
          },
          {
            authors:
              "Rosenstock J, Wysham C, Frías JP, Kaneko S, Lee CJ, et al.",
            title:
              "Efficacy and safety of a novel dual GIP and GLP-1 receptor agonist tirzepatide in patients with type 2 diabetes (SURPASS-1): a double-blind, randomised, phase 3 trial.",
            source: "Lancet",
            year: 2021,
            pmid: "34186022",
          },
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
            authors:
              "Aronne LJ, Horn DB, le Roux CW, Ho W, Falcon BL, et al.",
            title:
              "Tirzepatide as Compared with Semaglutide for the Treatment of Obesity (SURMOUNT-5).",
            source: "N Engl J Med",
            year: 2025,
            pmid: "40353578",
          },
          {
            authors: "Samms RJ, Coghlan MP, Sloop KW.",
            title:
              "How May GIP Enhance the Therapeutic Efficacy of GLP-1?",
            source: "Trends Endocrinol Metab",
            year: 2020,
            pmid: "32396843",
          },
          {
            authors:
              "Gleason PP, Urick BY, Marshall LZ, Friedlander N, Qiu Y, Leslie RS.",
            title:
              "Real-world persistence and adherence to glucagon-like peptide-1 receptor agonists among obese commercially insured adults without diabetes.",
            source: "J Manag Care Spec Pharm",
            year: 2024,
            pmid: "38717042",
          },
          {
            authors: "Lincoff AM, Brown-Frandsen K, Colhoun HM, et al.",
            title:
              "Semaglutide and Cardiovascular Outcomes in Obesity Without Diabetes (SELECT).",
            source: "N Engl J Med",
            year: 2023,
            pmid: "37952131",
          },
          {
            authors: "Eli Lilly and Company.",
            title:
              "SURPASS-CVOT: A Cardiovascular Outcomes Trial Comparing Tirzepatide to Dulaglutide. Topline Results.",
            source: "Lilly Investor Press Release",
            year: 2024,
            url: "https://investor.lilly.com/news-releases/",
          },
          {
            authors: "Frias JP, Davies MJ, Rosenstock J, et al.",
            title:
              "Tirzepatide Versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (SURPASS-2).",
            source: "N Engl J Med",
            year: 2021,
            pmid: "34170647",
          },
          {
            authors:
              "Aroda VR, Aberle J, Bardtrum L, Christiansen E, Knop FK, et al.",
            title:
              "Efficacy and safety of once-daily oral semaglutide 25 mg and 50 mg compared with 14 mg in adults with type 2 diabetes (PIONEER PLUS): a multicentre, randomised, phase 3b trial.",
            source: "Lancet",
            year: 2023,
            pmid: "37385279",
          },
          {
            authors: "Jastreboff AM, Kaplan LM, Frías JP, et al.",
            title:
              "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial.",
            source: "N Engl J Med",
            year: 2023,
            pmid: "37366315",
          },
        ]}
      />
      <FaqSchema
        items={[
          {
            question: "Which is more effective for weight loss: tirzepatide or semaglutide?",
            answer:
              "Tirzepatide produces approximately 40% more weight loss than semaglutide at their highest tested doses. SURMOUNT-1 (Jastreboff NEJM 2022) reported -20.9% body weight on tirzepatide 15 mg over 72 weeks; STEP-1 (Wilding NEJM 2021) reported -14.9% on semaglutide 2.4 mg over 68 weeks. The mechanism difference is real: tirzepatide is a dual GIP + GLP-1 receptor agonist, while semaglutide is a single GLP-1 receptor agonist.",
          },
          {
            question: "What's the difference between Wegovy / Ozempic and Zepbound / Mounjaro?",
            answer:
              "Wegovy and Ozempic are both semaglutide; Zepbound and Mounjaro are both tirzepatide. Within each pair, the only meaningful differences are the FDA-approved indication and the dosing strength. Wegovy is FDA-approved for chronic weight management at doses up to 2.4 mg/week; Ozempic is FDA-approved for type 2 diabetes at doses up to 2.0 mg/week. Same drug, different label. Zepbound and Mounjaro have the same relationship for tirzepatide.",
          },
          {
            question: "Does tirzepatide cause more side effects than semaglutide?",
            answer:
              "Counterintuitively, no. The SURMOUNT-1 and STEP-1 adverse event tables show similar GI side effect rates for tirzepatide 15 mg and semaglutide 2.4 mg, and at the highest doses tirzepatide actually had slightly LOWER nausea rates than semaglutide. Discontinuation rates due to adverse events were similar (~6-7%) across both drugs in their respective trials.",
          },
          {
            question: "How much does tirzepatide cost per pound lost vs semaglutide?",
            answer:
              "Tirzepatide is more expensive per month but more efficient per pound lost. Brand-name Zepbound through LillyDirect is $299-699/month dose-tiered; Wegovy NovoCare is $349-499/month. Per pound lost, the calculation depends on how much weight each patient loses, but for the trial-average patient tirzepatide produces more total weight loss for similar monthly cost, making it slightly cheaper per pound. Use our cost-per-pound calculator for personalized math.",
          },
          {
            question: "Can I switch from semaglutide to tirzepatide?",
            answer:
              "Yes, with appropriate clinical oversight. Switching requires re-titration to start at the lowest tirzepatide dose (2.5 mg/week) regardless of your current semaglutide dose. The full titration to 15 mg takes about 5 months. There is no formal washout period required because both drugs work via overlapping pathways. Discuss switching with your prescribing clinician.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
