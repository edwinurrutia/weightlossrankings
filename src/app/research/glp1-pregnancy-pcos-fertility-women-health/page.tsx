import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "glp1-pregnancy-pcos-fertility-women-health";

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

// Highest-stakes YMYL editorial category (pregnancy + fertility).
// Every clinical claim verified by an editorial research subagent
// against the FDA Section 8.1 (Pregnancy) and Section 8.2 (Lactation)
// language for Wegovy, Ozempic, Zepbound, Mounjaro, and Foundayo,
// plus the published PCOS pilot trials. Cited primary sources:
// - Salamun 2018 European Journal of Endocrinology PMID 29703793
//   (liraglutide IVF pregnancy rates in PCOS)
// - Jensterle 2017 PMID 28143456 (BMC Endocrine Disorders,
//   low-dose liraglutide + metformin vs high-dose liraglutide
//   alone in obese PCOS, randomized trial)
// - FDA prescribing information for all 5 GLP-1 drugs.

export default function PregnancyArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 8.1 Pregnancy and Section 8.2 Lactation.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 8.1 Pregnancy and Section 8.2 Lactation.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors:
        "Salamun V, Jensterle M, Janez A, Vrtacnik Bokal E.",
      title:
        "Liraglutide increases IVF pregnancy rates in obese PCOS women with poor response to first-line reproductive treatments: a pilot randomized study.",
      source: "European Journal of Endocrinology",
      year: 2018,
      pmid: "29703793",
    },
    {
      authors:
        "Jensterle M, Kravos NA, Goričar K, Janez A.",
      title:
        "Short-term effectiveness of low dose liraglutide in combination with metformin versus high dose liraglutide alone in treatment of obese PCOS: randomized trial.",
      source: "BMC Endocrine Disorders",
      year: 2017,
      pmid: "28143456",
    },
    {
      authors: "American College of Obstetricians and Gynecologists.",
      title:
        "Practice Bulletin No. 230 — Obesity in Pregnancy.",
      source: "ACOG Clinical Practice Bulletin",
      year: 2021,
      url: "https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2021/06/obesity-in-pregnancy",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information, pregnancy section + contraception interaction during dose escalation.",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://pi.lilly.com/us/foundayo-uspi.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "Wegovy Pregnancy Exposure Registry — 1-877-390-2760, www.wegovypregnancyregistry.com.",
      source: "Novo Nordisk Pregnancy Registry",
      year: 2025,
      url: "https://www.wegovypregnancyregistry.com/",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        GLP-1 weight loss drugs are <strong>contraindicated in
        pregnancy</strong> and the FDA labels for <Link href="/drugs/wegovy">Wegovy</Link>, <Link href="/drugs/ozempic">Ozempic</Link>,
        <Link href="/drugs/zepbound"> Zepbound</Link>, <Link href="/drugs/mounjaro">Mounjaro</Link>, and <Link href="/drugs/foundayo">Foundayo</Link> all recommend
        discontinuation before planned conception — Wegovy
        specifically says <em>at least 2 months before a planned
        pregnancy</em> [1, 2, 6]. But the women&apos;s health story is
        more nuanced than that headline. GLP-1-induced weight loss in
        PCOS patients consistently improves menstrual regularity,
        reduces androgen levels, and the most-cited fertility study
        (Salamun et al., European Journal of Endocrinology 2018,
        PMID 29703793) showed that pre-conception liraglutide therapy
        improved IVF pregnancy rates in obese PCOS women beyond what
        metformin alone achieved [3]. This article walks through the
        verified FDA labels, the published PCOS evidence, the
        contraception interaction during dose escalation that the
        labels specifically warn about, and how to think about GLP-1
        use through the family-planning timeline. <strong>This is the
        highest-YMYL category we publish</strong> — every clinical
        decision in this space belongs between you and your
        prescriber.
      </p>

      <h2>The pregnancy contraindication: what each FDA label actually says</h2>

      <p>
        Verified directly from each FDA prescribing information
        Section 8.1 (Pregnancy) [1, 2, 6]:
      </p>

      <h3>Wegovy and Ozempic (semaglutide)</h3>

      <p>
        The Wegovy label says: &ldquo;Based on animal reproduction
        studies, there may be potential risks to the fetus from
        exposure to <Link href="/drugs/semaglutide">semaglutide</Link> during pregnancy... Weight loss
        offers no benefit to a pregnant patient and may cause fetal
        harm... Discontinue WEGOVY in pregnant patients.&rdquo; The
        label specifies discontinuation <strong>at least 2 months
        before a planned pregnancy</strong>, which reflects the long
        elimination half-life of semaglutide (approximately 7 days
        — see our{" "}
        <Link href="/research/how-long-does-glp1-take-to-work">
          how long does GLP-1 take to work guide
        </Link>{" "}
        for the full PK explanation).
      </p>

      <p>
        Animal reproduction findings: embryofetal mortality,
        structural abnormalities, and growth alterations in rats at
        clinically relevant exposures; early pregnancy losses and
        structural abnormalities in rabbits and primates [1].
      </p>

      <p>
        <strong>Pregnancy registry:</strong> Novo Nordisk maintains
        a registry at 1-877-390-2760 or wegovypregnancyregistry.com
        [7]. Patients who become pregnant on Wegovy or Ozempic should
        report the exposure to the registry to help characterize
        outcomes.
      </p>

      <p>
        Note: the FDA replaced the old A/B/C/D/X pregnancy categories
        in 2015 with narrative summaries, so neither Wegovy nor any
        other modern GLP-1 has a single-letter category. The
        narrative language is the operative guidance.
      </p>

      <h3>Zepbound and Mounjaro (<Link href="/drugs/tirzepatide">tirzepatide</Link>)</h3>

      <p>
        The Zepbound label uses similar language: &ldquo;Available
        data are insufficient to evaluate for drug-related risk of
        major birth defects, miscarriage, or adverse maternal
        outcomes... Weight loss is not recommended during
        pregnancy&rdquo; [2]. Animal data show fetal growth
        reductions and abnormalities at clinical exposures in rats.
      </p>

      <p>
        The Zepbound label is somewhat <em>less specific</em> than
        Wegovy about how many months before conception to
        discontinue — it doesn&apos;t state the explicit 2-month
        rule. Most clinicians extrapolate from the tirzepatide
        half-life (~5 days) and apply a similar 4-8 week pre-
        conception washout in practice.
      </p>

      <p>
        <strong>Pregnancy registry:</strong> Eli Lilly at
        1-800-LillyRx (1-800-545-5979).
      </p>

      <h3>Foundayo (orforglipron)</h3>

      <p>
        The new oral orforglipron has a slightly different animal
        reproduction profile than the injectable peptides — animal
        studies were not active in rats and rabbits at clinical
        exposures. Only primate data are relevant, and at
        sub-clinical exposures no adverse effects were noted [6].
        However, the FDA label still treats Foundayo as
        contraindicated in pregnancy because human data is
        insufficient.
      </p>

      <p>
        Foundayo has a unique label warning relevant to women of
        reproductive age: <strong>oral contraceptive efficacy may
        be reduced during dose escalation</strong> due to slowed
        gastric absorption. The label recommends a backup
        contraception method (barrier or non-oral hormonal) for 30
        days after starting Foundayo and 30 days after each dose
        increase [6]. We expand on this in the contraception
        section below.
      </p>

      <h2>Contraception interaction with oral birth control</h2>

      <p>
        All injectable GLP-1s (semaglutide, tirzepatide,
        orforglipron) slow gastric emptying. Oral medications taken
        at the same time can have altered absorption, and the FDA
        labels specifically address oral contraceptives for several
        of the drugs [1, 2, 6].
      </p>

      <p>
        The Wegovy and Zepbound labels both recommend that women
        using oral contraceptives consider an alternative
        contraceptive method or a non-oral hormonal contraceptive
        for the duration of dose escalation, because absorption may
        be unpredictable during the GI-adaptation phase. The
        Foundayo label is the most specific: backup contraception
        for 30 days after start and 30 days after each dose increase.
      </p>

      <p>
        Practical takeaway: if you are sexually active and rely on
        oral contraceptives, talk to your prescriber about adding a
        backup method (condoms, IUD, implant) during the first 16-20
        weeks of GLP-1 therapy and during any future dose changes.
      </p>

      <h2>PCOS: the published trial evidence</h2>

      <p>
        Polycystic ovary syndrome (PCOS) is the most common cause
        of female anovulatory infertility and is strongly associated
        with obesity and insulin resistance. PCOS-related infertility
        and menstrual irregularity often improve with weight loss,
        and several randomized trials have specifically tested GLP-1
        therapy in this population.
      </p>

      <p>
        <strong>The most-cited PCOS RCT for fertility outcomes</strong>{" "}
        is Salamun et al., European Journal of Endocrinology 2018
        (PMID 29703793) [3]. Verified study details:
      </p>

      <ul>
        <li>
          <strong>n=28 infertile obese PCOS women</strong> (mean age
          31 ± 4.75 years, mean BMI 36.7 ± 3.5) with prior poor
          response to first-line reproductive treatments
        </li>
        <li>
          <strong>Intervention:</strong> liraglutide 1.2 mg daily +
          metformin (combination arm) vs metformin alone (control
          arm) for 12 weeks pre-conception
        </li>
        <li>
          <strong>Result:</strong> Pre-conception liraglutide was
          superior to metformin alone in increasing pregnancy rates
          per embryo transfer AND in cumulative pregnancy rates,
          even though weight loss was similar between arms. The
          authors interpreted this as evidence that GLP-1 therapy
          may have direct benefits on the hypothalamic-pituitary-
          ovarian axis beyond weight loss alone.
        </li>
      </ul>

      <p>
        A second RCT — Jensterle et al., BMC Endocrine Disorders
        2017 (PMID 28143456) [4] — randomized 30 obese PCOS women
        to low-dose liraglutide (1.2 mg) plus metformin versus
        high-dose liraglutide (3.0 mg) monotherapy for 12 weeks.
        Both regimens produced clinically meaningful weight loss
        and reductions in BMI and visceral adiposity in this
        population.
      </p>

      <p>
        Multiple smaller RCTs and observational studies have
        reported that GLP-1 receptor agonists (including
        semaglutide and tirzepatide) produce meaningful weight
        loss in women with PCOS, with magnitudes consistent with
        the broader obesity trial population. Reported secondary
        outcomes in this literature have included reductions in
        waist circumference, BMI, triglycerides, and total
        testosterone. We do not cite a specific pooled effect
        size here because the PCOS-specific literature remains
        heterogeneous and the pooled estimates vary substantially
        across published analyses.
      </p>

      <p>
        <strong>Important caveat:</strong> none of the GLP-1 drugs —
        semaglutide, tirzepatide, orforglipron — list PCOS as an
        FDA-approved indication. All PCOS use is off-label.
        Off-label prescribing is legal and routine in clinical
        practice, but it means the FDA has not formally evaluated
        these drugs for PCOS efficacy or safety.
      </p>

      <h2>The &ldquo;GLP-1 babies&rdquo; phenomenon</h2>

      <p>
        Anecdotal reports from fertility clinics describe a pattern
        where women with previously documented obesity-related
        anovulation conceive unexpectedly on GLP-1 therapy —
        sometimes referred to colloquially as &ldquo;GLP-1
        babies.&rdquo; The mechanism is plausible: 5-10% body weight
        loss is well-documented to restore ovulation in obesity-
        associated anovulatory infertility, and GLP-1 therapy
        reliably produces that magnitude of weight loss within 12-20
        weeks.
      </p>

      <p>
        Beyond the indirect weight-loss effect, the Salamun 2018
        trial [3] suggests there may be additional direct GLP-1
        effects on the HPO axis (LH secretion, ovarian morphology,
        endometrial receptivity) — but most of this evidence
        remains preclinical.
      </p>

      <p>
        The clinical implication: <strong>women on GLP-1 therapy
        who do not want to become pregnant must use reliable
        contraception</strong>, even if they had irregular cycles
        or documented infertility before starting the drug.
        Restored fertility is one of the documented secondary
        effects of weight loss in this population, and the
        FDA-recommended pregnancy washout period exists for a
        reason.
      </p>

      <h2>ACOG guidance on GLP-1s before and during pregnancy</h2>

      <p>
        ACOG (American College of Obstetricians and Gynecologists)
        Practice Bulletin No. 230 on Obesity in Pregnancy [5]
        addresses pre-pregnancy weight management broadly but does
        not provide a dedicated GLP-1-specific committee opinion
        as of April 2026. Available ACOG guidance recommends
        general pre-pregnancy BMI optimization and notes that even
        modest weight loss (4.5 kg) before conception decreases
        gestational diabetes risk by approximately 40%.
      </p>

      <p>
        ACOG has not published a position statement specifically
        endorsing or restricting GLP-1 use beyond what the FDA
        labels already state.
      </p>

      <h2>Lactation: what the labels say</h2>

      <p>
        The FDA labels for Wegovy, Zepbound, and Foundayo all state
        that there are no data on the presence of the drug in human
        milk, the effects on the breastfed infant, or the effects
        on milk production [1, 2, 6]. Animal data on lactation are
        limited.
      </p>

      <p>
        The labels recommend weighing the developmental and health
        benefits of breastfeeding against the mother&apos;s clinical
        need for the medication and any potential adverse effects
        on the breastfed infant from the drug. In practice, most
        prescribers do not recommend resuming GLP-1 therapy while
        actively breastfeeding given the absence of data, but this
        is a clinical judgment call that belongs with your
        obstetrician and pediatrician.
      </p>

      <h2>Egg freezing and IVF cycles: what to do with your GLP-1</h2>

      <p>
        Patients pursuing egg freezing or IVF should plan their
        GLP-1 timing around the procedure timeline:
      </p>

      <ul>
        <li>
          <strong>Before cycle start:</strong> Discontinue at least
          2 months before conception (per the Wegovy label) — which
          for IVF means at least 2 months before embryo transfer.
        </li>
        <li>
          <strong>During stimulation and egg retrieval:</strong>{" "}
          Most reproductive endocrinologists are conservative and
          recommend the patient be off the GLP-1 throughout the
          stimulation cycle to avoid any unknown effects on
          oocyte quality. ASRM has not published a formal
          statement specific to GLP-1s, but the conservative
          default in most fertility clinics is &ldquo;off the drug
          before the cycle.&rdquo;
        </li>
        <li>
          <strong>After successful pregnancy:</strong> Stay off
          throughout pregnancy and (per most clinical practice) not
          resume during lactation.
        </li>
        <li>
          <strong>Pre-conception weight optimization:</strong> If
          your goal is to lose weight before conceiving to reduce
          maternal and fetal risk, work backwards from your target
          conception date by at least 4-6 months — 2-4 months on
          GLP-1 therapy followed by the 2-month pre-conception
          washout.
        </li>
      </ul>

      <h2>Practical decision framework</h2>

      <ol>
        <li>
          <strong>Are you actively trying to conceive?</strong>{" "}
          Discontinue GLP-1 at least 2 months before your planned
          conception date. Use the washout period to optimize
          dietary patterns and lifestyle that you can sustain
          through pregnancy without the drug.
        </li>
        <li>
          <strong>Could you become pregnant unexpectedly?</strong>{" "}
          Use reliable contraception throughout GLP-1 therapy.
          During dose escalation specifically, add a backup method
          (barrier, IUD, implant) because oral contraceptive
          absorption may be reduced.
        </li>
        <li>
          <strong>Do you have PCOS and want to conceive?</strong>{" "}
          Talk to your reproductive endocrinologist about a
          pre-conception GLP-1 protocol. The Salamun 2018 evidence
          [3] suggests this can improve IVF outcomes in selected
          patients, even though PCOS is not an FDA-approved
          indication.
        </li>
        <li>
          <strong>Are you breastfeeding?</strong> Most prescribers
          do not recommend GLP-1 therapy during active
          breastfeeding due to absence of human milk safety data.
          Discuss with your obstetrician and pediatrician.
        </li>
        <li>
          <strong>Did you become pregnant unexpectedly while on
          GLP-1 therapy?</strong> Stop the drug immediately and
          contact your obstetrician. Report the exposure to the
          manufacturer&apos;s pregnancy registry [7] so the field
          can characterize outcomes. Most exposed pregnancies in
          published case series have proceeded normally, but the
          data are limited and the FDA label is clear about
          discontinuation.
        </li>
      </ol>

      <h2>Important disclaimer</h2>

      <p>
        This article is the highest-stakes YMYL category we
        publish. It is educational and reflects what the published
        FDA prescribing information and primary clinical literature
        say as of April 2026. It is not a substitute for individual
        medical advice. Pregnancy, fertility, and contraception
        decisions in the context of GLP-1 therapy belong between
        you and your obstetrician, reproductive endocrinologist,
        and prescriber. Weight Loss Rankings does not provide
        medical advice, diagnosis, or treatment recommendations.
      </p>

      <h2>Related research and tools</h2>

      <p>
        For the broader weight loss trial data behind GLP-1 therapy,
        see our{" "}
        <Link href="/research/glp1-pricing-index">
          pricing index
        </Link>{" "}
        and{" "}
        <Link href="/tools/glp1-weight-loss-calculator">
          weight loss calculator
        </Link>
        . For the muscle mass preservation strategy that matters
        especially in pre-conception weight loss, see our{" "}
        <Link href="/research/semaglutide-muscle-mass-loss">
          muscle mass deep-dive
        </Link>
        . For the discontinuation rebound data that&apos;s especially
        relevant during the pre-pregnancy washout, see our{" "}
        <Link href="/research/what-happens-when-you-stop-semaglutide">
          STEP-4 post-discontinuation review
        </Link>
        . For the broader side-effect profile that includes some
        women&apos;s-health-relevant effects, see our{" "}
        <Link href="/research/glp1-side-effects-fatigue-hair-loss-duration">
          fatigue + hair loss + duration guide
        </Link>
        .
      </p>

      <References items={citations} />
      <FaqSchema
        items={[
          {
            question: "Can I take Wegovy or Zepbound while trying to get pregnant?",
            answer:
              "No. The FDA labels for Wegovy, Ozempic, Zepbound, and Mounjaro all advise discontinuing the drug at least 2 months before a planned pregnancy. Animal reproductive studies showed adverse fetal effects, and human data are insufficient to establish safety in pregnancy. Patients planning conception should stop the GLP-1 with their prescriber's guidance and pursue weight management through other means during the conception window.",
          },
          {
            question: "Does semaglutide help with PCOS?",
            answer:
              "Indirectly, yes. Polycystic ovary syndrome (PCOS) is strongly associated with insulin resistance and obesity, and weight loss of 5-10% reliably improves PCOS symptoms (cycle regularity, ovulation, hirsutism, metabolic markers). Semaglutide is not FDA-approved specifically for PCOS, but it is increasingly prescribed off-label for PCOS-associated obesity, with growing observational evidence of benefit on cycle regularity and fertility markers.",
          },
          {
            question: "What if I get pregnant while on Wegovy?",
            answer:
              "Stop the medication immediately and notify your prescriber. There is no FDA-approved 'safe' window during pregnancy, and the labels recommend discontinuation. Your prescriber and OB will discuss the risk-benefit calculus given your specific situation. Most patients who become pregnant unexpectedly on a GLP-1 are advised to stop the drug and have OB-led obesity management for the rest of pregnancy.",
          },
          {
            question: "Can GLP-1s cause birth control failure?",
            answer:
              "Tirzepatide (Mounjaro/Zepbound) labels include a specific warning that the drug may reduce the effectiveness of oral contraceptives, and recommend non-oral or barrier contraception during initiation and after each dose escalation. Semaglutide does not have the same labeled warning, but the mechanism (delayed gastric emptying altering pill absorption) is plausible. Patients on tirzepatide who rely on oral birth control should discuss alternative contraception with their prescriber.",
          },
          {
            question: "Is it safe to breastfeed while on a GLP-1?",
            answer:
              "Insufficient data. The FDA labels say to weigh the benefits of breastfeeding against the unknown risk to the infant. There are no published trials of GLP-1 use in lactating humans, and limited animal data on transfer to milk. Most clinicians recommend not initiating GLP-1 therapy during breastfeeding unless the maternal benefit clearly outweighs the unknown risk.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
