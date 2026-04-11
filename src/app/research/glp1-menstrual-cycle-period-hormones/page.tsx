import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Does semaglutide affect your period?",
    answer:
      "Semaglutide does not directly target the hypothalamic-pituitary-ovarian axis, but the rapid weight loss it produces frequently changes menstrual patterns. Women with PCOS often see ovulation restored. Women with very low body fat percentages may experience temporary irregularity. Cycles can shorten or lengthen by a few days as the body adapts. Persistent amenorrhea (more than 3 months without a period) warrants a workup.",
  },
  {
    question: "Does tirzepatide affect your period?",
    answer:
      "Same answer as semaglutide — tirzepatide does not have a direct hormonal effect, but the weight loss it produces (typically larger than semaglutide) often changes menstrual patterns. PCOS patients commonly see restored ovulation. Track your cycle for 2-3 months before assuming something is wrong.",
  },
  {
    question: "Does GLP-1 affect birth control?",
    answer:
      "Injectable GLP-1s (Wegovy, Ozempic, Zepbound, Mounjaro) have NOT been shown to reduce oral contraceptive efficacy in pharmacokinetic studies. Foundayo (oral orforglipron) is different — its label specifically recommends backup contraception (barrier, IUD, implant, or non-oral hormonal) for 30 days after starting and 30 days after each dose increase, because it co-localizes with oral contraceptives in the GI tract during absorption.",
  },
  {
    question: "Can GLP-1 help with PCOS?",
    answer:
      "Yes — published evidence suggests GLP-1s help PCOS via the weight loss they produce. Studies show restored menstrual regularity in women with PCOS who lose more than 5% body weight, improved ovulation rates compared to baseline, improved IVF outcomes in obese women with poor first-line response, and reduced androgen levels (downstream of weight loss). Restored fertility is a real outcome — contraception planning is important if you don't want to be pregnant.",
  },
  {
    question: "How long after stopping a GLP-1 should I wait to get pregnant?",
    answer:
      "The Wegovy label specifically recommends discontinuing semaglutide at least 2 months before a planned pregnancy because of the long elimination half-life (~7 days) and limited human pregnancy data. The same 2-month rule is generally applied to tirzepatide. Foundayo, with its much shorter half-life (~36 hours), has a shorter washout. Use the GLP-1 washout calculator to see the residual concentration timeline.",
  },
  {
    question: "Why did my period stop on a GLP-1?",
    answer:
      "Several possible reasons: rapid weight loss with very low body fat can cause functional hypothalamic amenorrhea, especially in patients who started with lower BMI or who are losing more than 2 lb/week. PCOS patients sometimes paradoxically have their cycles change in unexpected ways as ovulation returns. Could also be unrelated (thyroid disease, hyperprolactinemia, pregnancy). Persistent amenorrhea over 3 months warrants a workup with your prescriber or OB/GYN.",
  },
];

const SLUG = "glp1-menstrual-cycle-period-hormones";

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

// Verified against (PubMed-confirmed 2026-04-07):
//   - Jensterle et al. 2019 — GLP-1 in reproduction review, Hum Reprod Update (PMID 31260047)
//   - Jensterle et al. 2020 — long-term metformin in PCOS, Endocr Connect (PMID 31829964)
//   - Salamun et al. 2018 — liraglutide PCOS IVF, Eur J Endocrinol (PMID 29703793)
//   - Cena et al. 2020 — PCOS obesity GLP-1 RA review, JCEM (PMID 32442310)
//   - ASRM Practice Committee 2021 — obesity and reproduction, Fertil Steril (PMID 34583840)
//   - Zhou et al. 2023 — GLP-1 RAs and menstrual cyclicity in PCOS meta-analysis, BMC Endocr Disord (PMID 37940910)
//   - Wegovy/Foundayo PI Section 8.3 (Females and Males of Reproductive Potential)
//   - Foundayo PI Section 7.1 (Oral Contraceptive interaction)

export default function MenstrualArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 8.1 Pregnancy and Section 8.3 Females and Males of Reproductive Potential.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information, Section 7.1 Drugs Affected by Gastrointestinal Absorption (oral contraceptive interaction).",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
    },
    {
      authors:
        "Jensterle M, Kravos NA, Ferjan S, Goricar K, Dolzan V, Janez A.",
      title:
        "Long-term efficacy of metformin in overweight-obese PCOS: longitudinal follow-up of retrospective cohort.",
      source: "Endocr Connect",
      year: 2020,
      pmid: "31829964",
    },
    {
      authors:
        "Salamun V, Jensterle M, Janez A, Vrtacnik Bokal E.",
      title:
        "Liraglutide increases IVF pregnancy rates in obese PCOS women with poor response to first-line reproductive treatments: a pilot randomized study.",
      source: "Eur J Endocrinol",
      year: 2018,
      pmid: "29703793",
    },
    {
      authors:
        "Jensterle M, Janez A, Fliers E, DeVries JH, Vrtacnik-Bokal E, Siegelaar SE.",
      title:
        "The role of glucagon-like peptide-1 in reproduction: from physiology to therapeutic perspective.",
      source: "Hum Reprod Update",
      year: 2019,
      pmid: "31260047",
    },
    {
      authors:
        "Zhou L, Qu H, Yang L, Shou L.",
      title:
        "Effects of GLP1RAs on pregnancy rate and menstrual cyclicity in women with polycystic ovary syndrome: a meta-analysis and systematic review.",
      source: "BMC Endocr Disord",
      year: 2023,
      pmid: "37940910",
    },
    {
      authors:
        "Cena H, Chiovato L, Nappi RE.",
      title:
        "Obesity, Polycystic Ovary Syndrome, and Infertility: A New Avenue for GLP-1 Receptor Agonists.",
      source: "J Clin Endocrinol Metab",
      year: 2020,
      pmid: "32442310",
    },
    {
      authors:
        "Practice Committee of the American Society for Reproductive Medicine.",
      title:
        "Obesity and reproduction: a committee opinion.",
      source: "Fertil Steril",
      year: 2021,
      pmid: "34583840",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        GLP-1 receptor agonists do not act directly on the
        hypothalamic-pituitary-ovarian (HPO) axis, so they do not
        change your hormones the way hormonal birth control does.
        But the rapid weight loss they produce often <em>does</em>{" "}
        change menstrual patterns — sometimes for the better
        (restoring ovulation in PCOS), sometimes for the worse
        (temporary cycle irregularity in women with very low body
        fat), and sometimes via a separate mechanism entirely (the
        gastric-emptying interaction with oral contraceptives that
        the FDA flags on the <Link href="/drugs/foundayo">Foundayo</Link> and <Link href="/drugs/wegovy">Wegovy</Link> labels). This
        article walks through each scenario and the practical
        guidance.
      </p>

      <h2>Do GLP-1s have a direct hormonal effect?</h2>
      <p>
        No, not in the sense that estrogen, progesterone, or oral
        contraceptives do. GLP-1 receptors are present on a number
        of reproductive tissues — the hypothalamus, the pituitary,
        the ovary, and the endometrium — and there is active
        research on what they do there<Cite n={5} />. But the
        clinically observed effects of GLP-1 receptor agonists on
        the menstrual cycle in published trials are dominated by
        the indirect effect of weight loss, not by a direct
        endocrine action.
      </p>
      <p>
        That distinction matters for what to expect: changes in your
        period on a GLP-1 are usually proportional to the magnitude
        and speed of your weight loss, not to which specific GLP-1
        you take.
      </p>

      <h2>The PCOS scenario — restored ovulation</h2>
      <p>
        Polycystic ovary syndrome (PCOS) is the single most common
        reproductive condition in women with obesity, and it is
        characterized by oligo-ovulation or anovulation, irregular
        or absent periods, hyperandrogenism, and frequent
        weight-loss difficulty. Weight loss of even 5-10% of body
        weight has been shown for decades to restore ovulation in a
        substantial fraction of women with PCOS<Cite n={7} />.
      </p>
      <p>
        GLP-1 receptor agonists are increasingly studied for PCOS
        specifically because they produce the kind of meaningful
        weight loss that the older first-line PCOS therapies
        (lifestyle, metformin) struggle to achieve in many patients
        <Cite n={7} />. The published GLP-1 PCOS literature shows:
      </p>
      <ul>
        <li>
          <strong>Restored menstrual regularity</strong> in a
          majority of women with PCOS who lose &gt;5% body weight on
          a GLP-1<Cite n={5} /><Cite n={6} />.
        </li>
        <li>
          <strong>Improved ovulation rates</strong> compared with
          baseline, including in women who had been anovulatory
          before treatment<Cite n={4} />.
        </li>
        <li>
          <strong>Improved IVF outcomes</strong> in pilot trials of
          obese women with poor response to first-line fertility
          treatment, when GLP-1 was given before IVF cycles
          <Cite n={4} />.
        </li>
        <li>
          <strong>Reduced androgen levels</strong> in some studies,
          though the magnitude is modest and the effect appears to
          be downstream of weight loss rather than independent.
        </li>
      </ul>
      <p>
        <strong>Practical implication for women with PCOS:</strong>{" "}
        if you have PCOS and start a GLP-1, expect your menstrual
        pattern to change as you lose weight — possibly significantly.
        Cycles that were skipped or 60+ days long may shorten and
        normalize. Ovulation that wasn&apos;t happening may resume.
        This means fertility may also return abruptly. If you are
        not actively trying to conceive, contraception planning is
        important <em>before</em> the weight loss, not after you
        find out it worked.
      </p>
      <p>
        See our{" "}
        <Link href="/research/glp1-pregnancy-pcos-fertility-women-health">
          GLP-1, pregnancy, PCOS, and fertility article
        </Link>{" "}
        for the full reproductive workup and the IVF / preconception
        protocol.
      </p>

      <h2>The low-body-fat scenario — temporary irregularity</h2>
      <p>
        At the other end of the spectrum, women whose body fat
        percentage drops to very low levels during rapid weight loss
        sometimes experience temporary menstrual irregularity or
        amenorrhea (absence of periods). This is not specific to
        GLP-1s — it&apos;s the same physiology that causes
        functional hypothalamic amenorrhea in athletes and women
        with energy-deficiency states. The HPO axis suppresses
        gonadotropin pulses when energy availability falls below a
        threshold.
      </p>
      <p>
        This is uncommon in patients on a GLP-1 for weight management
        because most patients in the registration trials had BMI
        ≥30 at baseline and a substantial reserve. But it can happen,
        particularly in patients who:
      </p>
      <ul>
        <li>
          Started with a lower BMI (off-label use at BMI &lt;27)
        </li>
        <li>
          Are losing weight very rapidly (&gt;2 lb/week sustained)
        </li>
        <li>
          Have markedly reduced caloric intake (often a side effect
          of severe nausea on a GLP-1)
        </li>
        <li>
          Combine GLP-1 therapy with very high training volume
        </li>
      </ul>
      <p>
        If you stop having periods entirely on a GLP-1, that&apos;s
        worth a conversation with your prescriber — both because it
        can indicate an energy-availability problem and because
        amenorrhea has long-term bone-health implications.
      </p>

      <h2>The contraception interaction</h2>
      <p>
        This is the most concrete and best-documented GLP-1 effect
        on women&apos;s health — and it has nothing to do with
        hormones directly. GLP-1 receptor agonists slow gastric
        emptying, which can reduce or delay the absorption of any
        oral medication. For oral contraceptives, the FDA labels
        approach this differently for injectable vs oral GLP-1s:
      </p>

      <h3>Injectable GLP-1s (Wegovy, <Link href="/drugs/ozempic">Ozempic</Link>, <Link href="/drugs/zepbound">Zepbound</Link>, <Link href="/drugs/mounjaro">Mounjaro</Link>)</h3>
      <p>
        Pharmacokinetic studies of injectable <Link href="/drugs/semaglutide">semaglutide</Link> and
        <Link href="/drugs/tirzepatide">tirzepatide</Link> have NOT demonstrated a clinically meaningful
        reduction in oral contraceptive bioavailability<Cite n={1} />.
        The Wegovy and Zepbound labels mention the theoretical
        concern but do not require backup contraception. Most
        prescribers and most major medical societies do not require
        backup contraception for women on injectable GLP-1s using
        combined oral contraceptive pills.
      </p>

      <h3>Foundayo (oral orforglipron) — different story<Cite n={2} /></h3>
      <p>
        Foundayo, the new oral non-peptide GLP-1 approved April
        2026, carries a more specific oral contraceptive
        interaction warning in Section 7.1 of its label. The
        Foundayo label recommends:
      </p>
      <ul>
        <li>
          Use a non-oral contraceptive method (barrier, IUD,
          implant, injectable, or transdermal patch) OR add a
          barrier method to the oral contraceptive
        </li>
        <li>
          For 30 days after starting Foundayo
        </li>
        <li>
          For 30 days after each dose increase
        </li>
      </ul>
      <p>
        The reason Foundayo is treated differently is that as an
        oral drug it co-localizes with the oral contraceptive in
        the GI tract during absorption, and the gastric emptying
        delay has a more direct effect on a co-administered oral
        drug than on an injectable.
      </p>
      <p>
        See our{" "}
        <Link href="/tools/glp1-drug-interaction-checker">
          GLP-1 drug interaction checker
        </Link>{" "}
        for the full oral contraceptive entry with the FDA citation.
      </p>

      <h2>Other reported menstrual changes on a GLP-1</h2>
      <p>
        Patient communities and case reports have described a
        number of additional menstrual changes that are less
        well-characterized in the formal literature:
      </p>
      <ul>
        <li>
          <strong>Heavier or lighter periods</strong> — usually
          attributed to weight-related changes in estrogen
          metabolism (adipose tissue is a peripheral source of
          estrogen, so significant fat loss can change estrogen
          balance)
        </li>
        <li>
          <strong>Worse PMS symptoms</strong> in the first few
          months — possibly related to the GI side effects of the
          drug overlapping with luteal-phase symptoms
        </li>
        <li>
          <strong>More cyclical nausea</strong> — some patients
          report that GLP-1 nausea is worse around menstruation
        </li>
        <li>
          <strong>
            Cycle shortening or lengthening by a few days
          </strong>{" "}
          — reflecting the HPO axis re-equilibrating to the new
          weight
        </li>
      </ul>
      <p>
        These are anecdotal patterns, not labeled effects, and most
        resolve within a few months as weight loss slows and the
        body adapts.
      </p>

      <h2>What to do if your period changes on a GLP-1</h2>
      <ul>
        <li>
          <strong>
            Track your cycle for 2-3 months before assuming
            something is wrong.
          </strong>{" "}
          A few short or long cycles in the first months of weight
          loss is usually normal HPO axis re-equilibration, not
          pathology.
        </li>
        <li>
          <strong>
            Use reliable contraception if you do not want to be
            pregnant.
          </strong>{" "}
          This is especially important if you have PCOS — restored
          fertility is a real outcome of weight loss on a GLP-1
          and it can happen before you notice your period has
          normalized.
        </li>
        <li>
          <strong>If you are on Foundayo</strong>, follow the
          30-day backup contraception recommendation for the
          starting dose and after each dose increase.
        </li>
        <li>
          <strong>
            If you have not had a period for more than 3 months
          </strong>{" "}
          on a GLP-1 (and you are not pregnant), see your OB/GYN
          or primary care prescriber. Persistent amenorrhea is
          worth a workup — it&apos;s not a normal effect of GLP-1
          therapy and can indicate an underlying issue like
          functional hypothalamic amenorrhea, thyroid disease, or
          (less commonly) hyperprolactinemia.
        </li>
        <li>
          <strong>
            If you have unusually heavy bleeding, severe pelvic
            pain, or bleeding between periods
          </strong>{" "}
          — get it worked up. These are not expected GLP-1 effects
          and should not be attributed to the drug without
          ruling out other causes.
        </li>
      </ul>

      <h2>Pregnancy planning while on a GLP-1</h2>
      <p>
        The Wegovy label specifically recommends discontinuing the
        drug at least <strong>2 months</strong> before a planned
        pregnancy, because of the long elimination half-life (~7
        days for semaglutide) and the limited human pregnancy data
        <Cite n={1} />. The same 2-month rule is generally applied
        to tirzepatide. Foundayo, with its much shorter half-life
        (~36 hours), has a shorter washout. Use our{" "}
        <Link href="/tools/glp1-washout-calculator">
          washout calculator
        </Link>{" "}
        to see the residual concentration timeline for any GLP-1.
      </p>
      <p>
        See our{" "}
        <Link href="/research/glp1-pregnancy-pcos-fertility-women-health">
          full pregnancy and fertility article
        </Link>{" "}
        for the obstetric safety review, the breastfeeding data,
        and the preconception checklist.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          GLP-1s do not directly target the menstrual cycle, but
          the weight loss they produce frequently does.
        </li>
        <li>
          PCOS patients often see ovulation restored and menstrual
          regularity return as they lose weight — meaning fertility
          can also return unexpectedly.
        </li>
        <li>
          Women with very low body fat percentages may experience
          temporary cycle disruption from energy-availability
          changes.
        </li>
        <li>
          Injectable GLP-1s have not been shown to reduce oral
          contraceptive efficacy in PK studies; Foundayo (oral)
          carries a specific 30-day backup-contraception warning.
        </li>
        <li>
          Persistent amenorrhea (&gt;3 months without a period) on
          a GLP-1 is not a normal effect and warrants a workup.
        </li>
        <li>
          Pregnancy planning: discontinue injectable GLP-1s at
          least 2 months before trying to conceive.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/glp1-pregnancy-pcos-fertility-women-health">
            GLP-1s, pregnancy, PCOS, and women&apos;s health
          </Link>{" "}
          — the full obstetric and reproductive review
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          — oral contraceptive entry with FDA citations
        </li>
        <li>
          <Link href="/tools/glp1-washout-calculator">
            GLP-1 washout calculator
          </Link>{" "}
          — preconception washout timeline
        </li>
        <li>
          <Link href="/research/glp1-side-effect-questions-answered">
            17 GLP-1 side effect questions answered
          </Link>
        </li>
        <li>
          <Link href="/research/glp1-side-effects-fatigue-hair-loss-duration">
            GLP-1 fatigue, hair loss, and side-effect duration
          </Link>
        </li>
        <li>
          <Link href="/research/why-am-i-not-losing-weight-glp1-plateau">
            Why am I not losing weight on a GLP-1? Plateau guide
          </Link>
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. Changes
        in menstrual pattern, fertility planning, and contraception
        decisions should always be discussed with your prescribing
        clinician and OB/GYN. If you experience persistent
        amenorrhea, abnormal bleeding, severe pelvic pain, or
        suspect pregnancy on a GLP-1, contact your provider
        promptly.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
