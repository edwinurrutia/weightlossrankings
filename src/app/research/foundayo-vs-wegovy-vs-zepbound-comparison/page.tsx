import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "foundayo-vs-wegovy-vs-zepbound-comparison";

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

// Verified against:
//   - Wegovy PI (2025) — STEP-1 −14.9% at week 68
//   - Zepbound PI (2025) — SURMOUNT-1 −20.9% at week 72
//   - Foundayo FDA label — 17.2 mg labeled max produces -11.1% / -24.9 lbs
//     in adults without T2D, -9.6% / -21.2 lbs in adults with T2D, both 72 wk
//   - ATTAIN-1 trial publication: Wharton S et al. NEJM 2025 PMID 40960239,
//     NCT05869903. Tested 6/12/36 mg (NOT 17.2 mg) over 72 weeks.
//     36 mg arm: -12.4% efficacy estimand / -11.2% treatment-regimen estimand
//     vs -2.1% placebo.
//   - STEP-1 (Wilding NEJM 2021, PMID 33567185)
//   - SURMOUNT-1 (Jastreboff NEJM 2022, PMID 35658024)
//   - Ma et al. 2024 orforglipron PK (PMID 38402332)
//   - LillyDirect Self-Pay 2026 pricing tiers
//   - NovoCare Wegovy direct-pay 2026 pricing
//   - Lilly Foundayo savings card terms

export default function FoundayoComparisonArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Eli Lilly and Company.",
      title:
        "FDA approves Lilly's Foundayo (orforglipron), the only GLP-1 pill for weight loss — investor press release.",
      source: "Eli Lilly Investor Relations",
      year: 2026,
      url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
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
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors:
        "Ma X, Liu R, Pratt E, Benson C, Bhattachar SN, Sloop KW, Haupt A, Karanikas C, Thomas MK.",
      title:
        "Effect of food intake on the pharmacokinetics of orforglipron, a non-peptide oral GLP-1 receptor agonist.",
      source: "Diabetes Therapy",
      year: 2024,
      pmid: "38402332",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "NovoCare Pharmacy direct-pay program for Wegovy — patient-facing pricing tiers updated 2026.",
      source: "Novo Nordisk patient program",
      year: 2026,
      url: "https://www.novocare.com/wegovy.html",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "LillyDirect Self Pay Pharmacy Solutions for Zepbound — pricing tiers December 2025 update.",
      source: "Eli Lilly patient program",
      year: 2026,
      url: "https://lillydirect.lilly.com/pharmacy-solutions/zepbound",
    },
    {
      authors:
        "Frías JP, Davies MJ, Rosenstock J, Pérez Manghi FC, Fernández Landó L, Bergman BK, Liu B, Cui X, Brown K; SURPASS-2 Investigators.",
      title:
        "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (SURPASS-2) — head-to-head trial of the two injectables.",
      source: "N Engl J Med",
      year: 2021,
      pmid: "34170647",
    },
    {
      authors:
        "Wharton S, Aronne LJ, Stefanski A, et al.",
      title:
        "Orforglipron, an Oral Small-Molecule GLP-1 Receptor Agonist for Obesity Treatment (ATTAIN-1, NCT05869903). Tested 6, 12, and 36 mg dose arms over 72 weeks.",
      source: "N Engl J Med",
      year: 2025,
      pmid: "40960239",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information, Section 14 Clinical Studies. Labeled maintenance dose 17.2 mg produces −11.1% / −24.9 lbs in adults without T2D and −9.6% / −21.2 lbs with T2D, both at 72 weeks.",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8ac446c5-feba-474f-a103-23facb9b5c62",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        On April 1, 2026, the FDA approved Foundayo (orforglipron),
        the first oral non-peptide GLP-1 receptor agonist for
        chronic weight management<Cite n={1} />. It enters a market
        dominated by two injectable heavyweights: Wegovy
        (semaglutide 2.4 mg) and Zepbound (tirzepatide 15 mg). The
        three drugs differ on every dimension that matters to a
        patient — effect size, delivery, price, titration, side
        effects, and access. This is the head-to-head with the
        trial data, the 2026 pricing, and the case for picking
        each.
      </p>

      <h2>The 30-second answer</h2>
      <ul>
        <li>
          <strong>Want the biggest weight loss?</strong> Zepbound
          (tirzepatide 15 mg) — 20.9% mean at 72 weeks in
          SURMOUNT-1<Cite n={3} />.
        </li>
        <li>
          <strong>Want the cheapest drug if you have commercial
          insurance?</strong> Foundayo with the Lilly Savings Card
          — $25/month<Cite n={1} />.
        </li>
        <li>
          <strong>Want the cheapest brand-name injectable
          self-pay?</strong> Wegovy NovoCare at $199/month
          all-dose subscription<Cite n={7} />.
        </li>
        <li>
          <strong>Hate needles?</strong> Foundayo (oral pill, no
          injections, no refrigeration).
        </li>
        <li>
          <strong>Have type 2 diabetes too?</strong> Zepbound
          (tirzepatide is also Mounjaro for diabetes — proven
          A1C reduction).
        </li>
      </ul>

      <h2>The drugs at a glance</h2>
      <p>
        Three FDA-approved weight management GLP-1 receptor
        agonists, three different mechanisms and delivery formats:
      </p>
      <ul>
        <li>
          <strong>Wegovy (semaglutide 2.4 mg)</strong> — once-weekly
          subcutaneous injection. Pure GLP-1 receptor agonist.
          Approved for chronic weight management since June 2021.
          Manufacturer: Novo Nordisk.
        </li>
        <li>
          <strong>Zepbound (tirzepatide 15 mg)</strong> —
          once-weekly subcutaneous injection. Dual GLP-1 +
          GIP (glucose-dependent insulinotropic polypeptide)
          receptor agonist. Approved for chronic weight management
          since November 2023. Manufacturer: Eli Lilly.
        </li>
        <li>
          <strong>Foundayo (orforglipron)</strong> — daily oral
          tablet. Non-peptide small-molecule GLP-1 receptor agonist
          (chemically very different from semaglutide and
          tirzepatide, which are peptide drugs). Approved for
          chronic weight management on April 1, 2026<Cite n={1} />.
          Manufacturer: Eli Lilly.
        </li>
      </ul>

      <h2>Effect size — the trial data, head to head</h2>
      <p>
        All three drugs were tested in 68-72 week phase 3 obesity
        trials with similar designs (placebo-controlled, mean BMI
        ~37, primary endpoint = percent change in body weight).
        The published mean weight loss results:
      </p>
      <ul>
        <li>
          <strong>Wegovy (STEP-1)</strong><Cite n={2} /> —
          <strong> −14.9%</strong> mean weight loss at week 68 vs
          −2.4% on placebo. n=1,961. About 86% of patients lost
          ≥5% body weight.
        </li>
        <li>
          <strong>Zepbound (SURMOUNT-1)</strong><Cite n={3} /> —
          <strong> −20.9%</strong> mean at week 72 vs −3.1% placebo.
          n=2,539. About 91% lost ≥5%. (5 mg dose: −16.0%; 10 mg:
          −19.5%; 15 mg: −20.9%.)
        </li>
        <li>
          <strong>Foundayo</strong> at the FDA-labeled maximum
          dose of <strong>17.2 mg</strong> in adults without type
          2 diabetes — <strong>−11.1%</strong> mean weight loss
          (about −24.9 lbs) at 72 weeks per the FDA-approved
          prescribing information<Cite n={11} />. In adults with
          type 2 diabetes the labeled-dose result is −9.6% (about
          −21.2 lbs).
        </li>
      </ul>
      <p className="text-sm text-brand-text-secondary">
        <strong>Important note on Foundayo numbers.</strong> The
        ATTAIN-1 phase 3 trial<Cite n={10} /> tested 6, 12, and{" "}
        <strong>36 mg</strong> orforglipron arms — not the
        FDA-approved 17.2 mg labeled maximum. The 36 mg trial arm
        produced −11.2% on the treatment-regimen (ITT) estimand
        and −12.4% on the efficacy (completers) estimand. Some
        third-party marketing pages quote the 36 mg trial result
        without disclosing it is a supra-labeled dose; the
        labeled-dose figure (−11.1% at 17.2 mg) is what
        consumers should expect when prescribed Foundayo.
      </p>
      <p>
        Two important caveats on direct comparison:
      </p>
      <ol>
        <li>
          These are not head-to-head trials. STEP-1, SURMOUNT-1, and
          ATTAIN-1 each compared their drug against placebo, not
          against each other. The only published direct head-to-head
          between any two of these drugs is SURPASS-2<Cite n={9} />,
          which compared tirzepatide vs semaglutide in type 2
          diabetes (not obesity) and showed tirzepatide&apos;s
          superiority on both A1C and weight loss.
        </li>
        <li>
          Patient populations differ slightly across trials. STEP-1
          and ATTAIN-1 enrolled patients with mean BMI ~38; SURMOUNT-1
          enrolled patients with mean BMI ~38 as well, but with
          different prior weight loss attempts and different
          regional distributions. Effect sizes are comparable but
          not perfectly interchangeable.
        </li>
      </ol>

      <h2>Cost — the 2026 cash-pay landscape</h2>
      <p>
        This is where Foundayo changes the market most dramatically.
        Pricing as of April 2026:
      </p>

      <h3>Wegovy<Cite n={7} /></h3>
      <ul>
        <li>
          <strong>$499/month</strong> standard NovoCare direct-pay
          (any dose strength)
        </li>
        <li>
          <strong>$199/month</strong> all-dose subscription (cash
          pay only, no insurance, includes free shipping)
        </li>
        <li>
          With commercial insurance covering Wegovy: typically
          $25-$100/month copay after PA approval
        </li>
      </ul>

      <h3>Zepbound<Cite n={8} /></h3>
      <ul>
        <li>
          <strong>$299/month</strong> for the 2.5 mg starter dose
          via LillyDirect Self Pay (price drop December 1, 2025)
        </li>
        <li>
          <strong>$399/month</strong> for the 5 mg dose
        </li>
        <li>
          <strong>$449/month</strong> for the 7.5 mg and higher
          doses
        </li>
        <li>
          With commercial insurance covering Zepbound: typically
          $25-$100/month copay
        </li>
      </ul>

      <h3>Foundayo<Cite n={1} /></h3>
      <ul>
        <li>
          <strong>$25/month</strong> with the Lilly Savings Card
          for commercially insured patients (not Medicare or
          Medicaid)
        </li>
        <li>
          <strong>$149/month</strong> list price for cash-pay
          patients without insurance
        </li>
        <li>
          No syringes, no needles, no cold chain, no shipping cost
          structure (it&apos;s a pill — distributed through
          standard pharmacy channels)
        </li>
      </ul>

      <p>
        The Foundayo $25/month savings card price is the cheapest
        legal path to a brand-name FDA-approved GLP-1 in 2026 by a
        wide margin. It is roughly 1/20th the cost of Wegovy
        NovoCare and 1/18th the cost of Zepbound at the maintenance
        dose. The catch: the savings card requires commercial
        insurance, not Medicare or Medicaid.
      </p>

      <h2>Delivery — pill vs injection</h2>
      <p>
        Wegovy and Zepbound are subcutaneous injections delivered by
        single-use auto-injector pens. You inject once a week, you
        rotate sites, you store the pens in the refrigerator, and
        you travel with a cooler if you fly. See our{" "}
        <Link href="/research/how-to-inject-glp1-step-by-step-technique">
          step-by-step injection technique guide
        </Link>{" "}
        for the operational details.
      </p>
      <p>
        Foundayo is a daily oral tablet. No injections, no needle
        disposal, no refrigeration, no cold chain, no airport
        pat-down conversation about medical-device exemptions. It
        is taken in the morning on an empty stomach, with water
        only, at least 30 minutes before any food, drink, or other
        oral medication<Cite n={6} />. The empty-stomach
        requirement is the practical pitfall: any food or beverage
        other than water in the 30-minute window before dosing
        substantially reduces absorption. Patients who cannot
        reliably fast for 30 minutes after waking (shift workers,
        parents of young children, anyone with a chaotic morning
        routine) may struggle with adherence.
      </p>
      <p>
        See our (forthcoming){" "}
        <Link href="/research/how-to-take-foundayo-orforglipron-guide">
          how to take Foundayo guide
        </Link>{" "}
        for the full daily protocol, food restrictions, and
        missed-dose rules.
      </p>

      <h2>Titration schedule</h2>
      <ul>
        <li>
          <strong>Wegovy</strong> — 5 dose steps: 0.25 mg → 0.5 mg
          → 1 mg → 1.7 mg → 2.4 mg, 4 weeks per step. Total
          escalation time to maintenance: ~16-20 weeks.
        </li>
        <li>
          <strong>Zepbound</strong> — 6 dose steps: 2.5 mg → 5 mg
          → 7.5 mg → 10 mg → 12.5 mg → 15 mg, 4 weeks per step.
          Total: ~20-24 weeks. Lower maintenance doses (5 mg or 10
          mg) are also FDA-labeled and produce meaningful weight
          loss, so not every patient escalates to 15 mg.
        </li>
        <li>
          <strong>Foundayo</strong> — 6 dose steps per the FDA
          label: 0.8 mg → 2.5 mg → 5.5 mg → 9 mg → 14.5 mg →
          17.2 mg, 4 weeks per step. Total: ~24 weeks to the
          maintenance dose.
        </li>
      </ul>
      <p>
        All three follow the same general principle of slow upward
        titration to manage GI side effects. Foundayo&apos;s steps
        are smaller in fractional terms, which may help tolerance.
      </p>

      <h2>Side effect profile — the trial-reported rates</h2>
      <p>
        All three drugs share the GLP-1 class side effects:
        nausea, vomiting, diarrhea, constipation, dyspepsia. The
        trial-reported rates at the maintenance dose:
      </p>
      <ul>
        <li>
          <strong>Wegovy (STEP-1)</strong><Cite n={2} /> — 44.2%
          nausea, 24.8% vomiting, 31.5% diarrhea, 23.4%
          constipation. ~4.5% discontinued for GI side effects.
        </li>
        <li>
          <strong>Zepbound (SURMOUNT-1)</strong><Cite n={3} /> —
          33.3% nausea, 11.5% vomiting, 23.0% diarrhea, 17.1%
          constipation. ~4.3% discontinued for GI.
        </li>
        <li>
          <strong>Foundayo (ATTAIN-1)</strong> — preliminary data
          suggest a lower nausea rate than Wegovy, similar to or
          slightly above tirzepatide. The full AE table will be in
          the published manuscript and the FDA label.
        </li>
      </ul>
      <p>
        See our{" "}
        <Link href="/research/glp1-nausea-management-practical-guide">
          GLP-1 nausea management guide
        </Link>{" "}
        for the practical strategies that apply across all three
        drugs.
      </p>

      <h2>Drug interaction profile</h2>
      <p>
        All three carry the same boxed warning for medullary
        thyroid carcinoma based on rodent studies (see our{" "}
        <Link href="/research/does-glp1-cause-cancer-mtc-thyroid-evidence">
          cancer and MTC article
        </Link>
        ), and all three are contraindicated in MEN2 and personal
        or family MTC history. The injectable GLP-1s and Foundayo
        differ on one important interaction:
      </p>
      <ul>
        <li>
          <strong>Wegovy and Zepbound</strong> — no specific oral
          contraceptive warning. PK studies have not shown
          clinically meaningful reduction in OCP bioavailability
          for the injectables.
        </li>
        <li>
          <strong>Foundayo</strong> — Section 7.1 of the label
          specifically recommends a non-oral contraceptive method
          (or barrier backup) for 30 days after starting and 30
          days after each dose increase. This is because Foundayo
          is itself an oral drug and the gastric-emptying-and-
          absorption interaction is more direct.
        </li>
      </ul>
      <p>
        See our{" "}
        <Link href="/tools/glp1-drug-interaction-checker">
          GLP-1 drug interaction checker
        </Link>{" "}
        for the full per-drug interaction database.
      </p>

      <h2>Pharmacokinetics and washout</h2>
      <ul>
        <li>
          <strong>Wegovy</strong> — semaglutide t½ ~7 days. Steady
          state in 4-5 weeks. Pre-pregnancy washout: 2 months
          (per the label).
        </li>
        <li>
          <strong>Zepbound</strong> — tirzepatide t½ ~5 days.
          Steady state in 3-4 weeks. Same 2-month pre-pregnancy
          washout in clinical practice.
        </li>
        <li>
          <strong>Foundayo</strong> — orforglipron t½ ~36 hours.
          Steady state in 3-5 days. Much shorter washout — useful
          for pre-procedure hold and pre-pregnancy planning.
        </li>
      </ul>
      <p>
        Use our{" "}
        <Link href="/tools/glp1-washout-calculator">
          GLP-1 washout calculator
        </Link>{" "}
        to see the residual concentration timeline for any of the
        three drugs.
      </p>

      <h2>The case for each drug</h2>

      <h3>Pick Wegovy if...</h3>
      <ul>
        <li>
          You have insurance that covers it on formulary, OR
        </li>
        <li>
          You want the cheapest brand-name injectable cash-pay
          option ($199/month NovoCare all-dose), OR
        </li>
        <li>
          You have cardiovascular disease (the SELECT trial
          showed a 20% reduction in cardiovascular events on
          semaglutide 2.4 mg, which gave Wegovy a labeled CV
          benefit indication that Zepbound and Foundayo do not
          yet have)
        </li>
      </ul>

      <h3>Pick Zepbound if...</h3>
      <ul>
        <li>
          You want the largest expected weight loss (20.9% mean
          in SURMOUNT-1 vs 14.9% Wegovy and 11.1% Foundayo at the
          17.2 mg labeled max dose)
        </li>
        <li>
          You have type 2 diabetes (tirzepatide also exists as
          Mounjaro for diabetes — same drug, same manufacturer,
          different label)
        </li>
        <li>
          You have obstructive sleep apnea (the SURMOUNT-OSA
          trial showed tirzepatide reduced sleep apnea severity,
          and Zepbound has a labeled OSA indication)
        </li>
      </ul>

      <h3>Pick Foundayo if...</h3>
      <ul>
        <li>
          You have commercial insurance and qualify for the
          $25/month savings card
        </li>
        <li>
          You hate needles and would prefer a daily pill
        </li>
        <li>
          You travel frequently and don&apos;t want to manage cold
          chain logistics
        </li>
        <li>
          You expect to need short-notice surgery or a procedure
          (Foundayo&apos;s 36-hour half-life means a much shorter
          ASA hold timeline than the injectables)
        </li>
        <li>
          You can reliably take a pill on an empty stomach 30
          minutes before food every morning
        </li>
        <li>
          An ~11% expected weight loss is meaningful enough for
          your goals (most patients with BMI ≥35 will say yes)
        </li>
      </ul>

      <h2>What this comparison is NOT</h2>
      <p>
        This is a head-to-head <em>summary</em>, not a clinical
        recommendation. The right drug for any individual patient
        depends on their full medical history, comorbidities,
        insurance situation, lifestyle, and tolerance for the GI
        side effects in the first 2-4 months. Discuss the choice
        with a qualified prescriber. This article is informational
        only.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          All three drugs are FDA-approved for chronic weight
          management with BMI ≥30 (or ≥27 with comorbidity).
        </li>
        <li>
          Effect size: Zepbound &gt; Wegovy &gt; Foundayo on the
          published mean trial data.
        </li>
        <li>
          Cost (commercial insurance): Foundayo $25 savings card
          &lt;&lt; Wegovy/Zepbound copays.
        </li>
        <li>
          Cost (cash pay): Foundayo $149 &lt; Wegovy NovoCare $199
          all-dose &lt; Zepbound LillyDirect $299-$449.
        </li>
        <li>
          Delivery: Foundayo daily pill (no needles, no
          refrigeration); Wegovy and Zepbound weekly subcutaneous
          injections.
        </li>
        <li>
          Unique features: Wegovy has a labeled cardiovascular
          benefit, Zepbound has a labeled OSA indication, Foundayo
          has the lowest cost and the easiest logistics.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/research/foundayo-orforglipron-fda-approval-2026">
            Foundayo (orforglipron) approval deep-dive
          </Link>{" "}
          — the full ATTAIN-1 trial review and approval narrative
        </li>
        <li>
          <Link href="/research/how-to-take-foundayo-orforglipron-guide">
            How to take Foundayo
          </Link>{" "}
          — daily protocol, food restrictions, missed dose rules
        </li>
        <li>
          <Link href="/research/how-to-get-glp1-prescription">
            How to get a GLP-1 prescription in 2026
          </Link>{" "}
          — buyer funnel for all four paths
        </li>
        <li>
          <Link href="/research/wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet">
            Wegovy vs Ozempic vs Zepbound vs Mounjaro brand name
            cheat sheet
          </Link>
        </li>
        <li>
          <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
            Tirzepatide vs semaglutide head-to-head
          </Link>{" "}
          — the SURPASS-2 direct comparison
        </li>
        <li>
          <Link href="/tools/glp1-savings-calculator">
            GLP-1 savings calculator 2026
          </Link>{" "}
          — compare 10 access paths over 1, 5, and 10 years
        </li>
        <li>
          <Link href="/tools/glp1-weight-loss-calculator">
            GLP-1 weight loss calculator
          </Link>{" "}
          — STEP-1 / SURMOUNT-1 / ATTAIN-1 trial-data-backed
          predictor
        </li>
        <li>
          <Link href="/tools/glp1-bmi-calculator">
            GLP-1 BMI calculator
          </Link>{" "}
          — eligibility check + outcome overlay for all three
          drugs
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. The
        choice between Foundayo, Wegovy, and Zepbound should be
        made with a prescribing clinician who knows your medical
        history. Pricing is current as of April 2026 and is updated
        as the manufacturer programs change. Effect size data is
        from the cited registration trials and reflects population
        means; individual outcomes vary substantially.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
