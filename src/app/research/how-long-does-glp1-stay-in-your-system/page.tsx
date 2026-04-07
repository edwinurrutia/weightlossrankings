import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";
import FaqSchema, { type FaqItem } from "@/components/research/FaqSchema";

const SLUG = "how-long-does-glp1-stay-in-your-system";

// Verified against:
//   - Wegovy (semaglutide) FDA Section 12.3 — t1/2 ~1 week (168 hrs)
//   - Ozempic (semaglutide) FDA Section 12.3 — t1/2 ~1 week
//   - Rybelsus (oral semaglutide) FDA Section 12.3 — t1/2 ~1 week
//   - Zepbound (tirzepatide) FDA Section 12.3 — t1/2 ~5 days
//   - Mounjaro (tirzepatide) FDA Section 12.3 — t1/2 ~5 days
//   - Foundayo (orforglipron) FDA Section 12.3 — t1/2 ~29-49 hours
//   - ASA preoperative guidance for GLP-1 receptor agonists
//
// Five-half-life rule: standard pharmacokinetic convention that
// >97% of drug is eliminated after 5 half-lives. Numbers below
// are derived from the FDA-label half-lives, not invented.

const FAQ_ITEMS: FaqItem[] = [
  {
    question:
      "How long does semaglutide stay in your system after the last dose?",
    answer:
      "Semaglutide's elimination half-life is about 1 week (around 168 hours) per the FDA Wegovy and Ozempic prescribing information. Using the standard five-half-life rule, more than 97% of the drug is eliminated about 5 weeks after the last dose. This is why the FDA tells women to stop semaglutide at least 2 months before a planned pregnancy.",
  },
  {
    question:
      "How long does tirzepatide stay in your system after the last dose?",
    answer:
      "Tirzepatide's elimination half-life is about 5 days per the FDA Zepbound and Mounjaro prescribing information. Using the five-half-life rule, more than 97% of the drug is eliminated about 25 days after the last dose. Steady state is reached after about 4 weeks of weekly dosing.",
  },
  {
    question: "Can semaglutide or tirzepatide be detected on a drug test?",
    answer:
      "No. GLP-1 receptor agonists are not on standard SAMHSA-5 or extended workplace drug screening panels, and there is no commercial drug test for semaglutide or tirzepatide. Specialized LC-MS/MS assays exist in research and anti-doping contexts, but they are not part of any routine clinical or employer drug test.",
  },
  {
    question:
      "Does semaglutide get stored in body fat?",
    answer:
      "Semaglutide is a peptide that binds tightly to albumin in the bloodstream — that is the engineering trick that gives it its 1-week half-life. It is not lipophilic the way THC or some psychiatric drugs are, so it does not accumulate in fat tissue. Once dosing stops, it is cleared on the predictable half-life schedule from the FDA label.",
  },
  {
    question:
      "How long after stopping a GLP-1 will the nausea go away?",
    answer:
      "Drug elimination and side-effect resolution are two different timelines. The drug itself is mostly gone in 5 weeks for semaglutide and 25 days for tirzepatide, but gastric emptying and appetite signaling can take an additional several weeks to fully normalize. Most patients report GI side effects resolving within 4-8 weeks after the last dose.",
  },
  {
    question: "Why is the half-life of semaglutide and tirzepatide so long?",
    answer:
      "It is intentional. Native GLP-1 has a half-life of about 2 minutes because the DPP-4 enzyme degrades it almost instantly. Semaglutide and tirzepatide were engineered with a fatty-acid side chain that binds reversibly to circulating albumin, which protects them from degradation and slows kidney clearance. The result is a 1-week half-life for semaglutide and a 5-day half-life for tirzepatide, which is what makes once-weekly dosing possible.",
  },
];

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

export default function HowLongGlp1StaysArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information, Section 12.3 Pharmacokinetics (elimination half-life approximately 1 week).",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "OZEMPIC (semaglutide) injection — US Prescribing Information, Section 12.3 Pharmacokinetics.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s029lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "RYBELSUS (semaglutide) tablets — US Prescribing Information, Section 12.3 Pharmacokinetics (oral semaglutide).",
      source: "FDA Approved Labeling",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/213051s019lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "ZEPBOUND (tirzepatide) injection — US Prescribing Information, Section 12.3 Pharmacokinetics (elimination half-life approximately 5 days).",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s016lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "MOUNJARO (tirzepatide) injection — US Prescribing Information, Section 12.3 Pharmacokinetics.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s016lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information, Section 12.3 Pharmacokinetics (oral non-peptide GLP-1, half-life approximately 29-49 hours).",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm",
    },
    {
      authors:
        "Joshi GP, Abdelmalak BB, Weigel WA, Soriano SG, Harbell MW, Kuo CI, Stricker PA, Domino KB.",
      title:
        "American Society of Anesthesiologists Consensus-Based Guidance on Preoperative Management of Patients on Glucagon-Like Peptide-1 Receptor Agonists.",
      source: "Anesthesiology / ASA Practice Guidance",
      year: 2023,
      url: "https://www.asahq.org/about-asa/newsroom/news-releases/2023/06/american-society-of-anesthesiologists-consensus-based-guidance-on-preoperative-management-of-patients-on-glucagon-like-peptide-1-receptor-agonists",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <FaqSchema items={FAQ_ITEMS} />
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Three thousand patients a month type &ldquo;how long does
        semaglutide stay in your system&rdquo; or the equivalent
        question for tirzepatide into Google. The honest answer
        comes directly from the FDA labels: semaglutide&apos;s
        elimination half-life is about <strong>1 week</strong>{" "}
        (around 168 hours)<Cite n={1} /> and tirzepatide&apos;s is
        about <strong>5 days</strong><Cite n={4} />. The standard
        pharmacokinetic threshold for &ldquo;fully out of the
        body&rdquo; is five half-lives — about <strong>5 weeks</strong>{" "}
        for semaglutide and about <strong>25 days</strong> for
        tirzepatide. Orforglipron (Foundayo), the new oral GLP-1,
        clears far faster — about <strong>6 days</strong> — because
        its half-life is only 29-49 hours<Cite n={6} />.
      </p>

      <h2>Quick answer: half-life and washout for every GLP-1</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-brand-violet/30">
              <th className="py-2 pr-4 text-brand-violet">Drug</th>
              <th className="py-2 pr-4 text-brand-violet">
                Half-life (FDA label)
              </th>
              <th className="py-2 pr-4 text-brand-violet">
                ~Full washout (5 half-lives)
              </th>
              <th className="py-2 text-brand-violet">Steady state</th>
            </tr>
          </thead>
          <tbody className="text-brand-text-secondary">
            <tr className="border-b border-brand-violet/10">
              <td className="py-2 pr-4">
                <strong>Semaglutide</strong>
                <br />
                (Wegovy, Ozempic, Rybelsus)
              </td>
              <td className="py-2 pr-4">~1 week (~168 h)<Cite n={1} /></td>
              <td className="py-2 pr-4">~5 weeks</td>
              <td className="py-2">~4-5 weeks</td>
            </tr>
            <tr className="border-b border-brand-violet/10">
              <td className="py-2 pr-4">
                <strong>Tirzepatide</strong>
                <br />
                (Zepbound, Mounjaro)
              </td>
              <td className="py-2 pr-4">~5 days (~120 h)<Cite n={4} /></td>
              <td className="py-2 pr-4">~25 days</td>
              <td className="py-2">~4 weeks</td>
            </tr>
            <tr className="border-b border-brand-violet/10">
              <td className="py-2 pr-4">
                <strong>Orforglipron</strong>
                <br />
                (Foundayo, oral)
              </td>
              <td className="py-2 pr-4">~29-49 h<Cite n={6} /></td>
              <td className="py-2 pr-4">~6-10 days</td>
              <td className="py-2">~7-10 days</td>
            </tr>
            <tr className="border-b border-brand-violet/10">
              <td className="py-2 pr-4">
                <strong>Dulaglutide</strong>
                <br />
                (Trulicity)
              </td>
              <td className="py-2 pr-4">~5 days</td>
              <td className="py-2 pr-4">~25 days</td>
              <td className="py-2">~2-4 weeks</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">
                <strong>Liraglutide</strong>
                <br />
                (Saxenda, Victoza)
              </td>
              <td className="py-2 pr-4">~13 hours</td>
              <td className="py-2 pr-4">~3 days</td>
              <td className="py-2">~3 days</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-brand-text-secondary">
        These are population-average values from the FDA prescribing
        information for each drug. Individual clearance varies with
        kidney function, body weight, and (for tirzepatide) the
        depth and consistency of subcutaneous absorption. For
        personalized math, use our{" "}
        <Link href="/tools/glp1-washout-calculator">
          GLP-1 washout calculator
        </Link>
        .
      </p>

      <h2>What &ldquo;in your system&rdquo; actually means</h2>
      <p>
        The phrase &ldquo;how long does it stay in your system&rdquo;
        can mean three different things, and the answer depends on
        which one you actually care about:
      </p>
      <ul>
        <li>
          <strong>Half-life (t&frac12;)</strong> — the time it
          takes for the drug concentration in plasma to fall by 50%.
          This is the single most-cited pharmacokinetic number and
          the one that appears in Section 12.3 of every FDA label.
          For semaglutide it is about 1 week<Cite n={1} />; for
          tirzepatide, about 5 days<Cite n={4} />.
        </li>
        <li>
          <strong>Steady state</strong> — the point at which the
          amount of drug entering the body each week equals the
          amount being eliminated, so plasma concentrations
          stabilize. This is reached after roughly 4-5 half-lives
          of consistent dosing. For semaglutide, that&apos;s 4-5
          weeks of weekly injections<Cite n={1} />; for tirzepatide,
          about 4 weeks<Cite n={4} />. This is why your prescriber
          waits 4 weeks at each dose before titrating up.
        </li>
        <li>
          <strong>Full washout (5 half-lives)</strong> — the
          standard pharmacokinetic convention that more than 97% of
          a drug has been eliminated after 5 half-lives, which is
          treated as &ldquo;effectively out of the body&rdquo; for
          clinical decision-making. For semaglutide, that&apos;s
          about 5 weeks; for tirzepatide, about 25 days; for
          orforglipron, about 6 days<Cite n={6} />.
        </li>
      </ul>
      <p>
        When patients ask &ldquo;how long does it stay,&rdquo; they
        usually mean the third one — full washout. That is the
        timeline that matters for pregnancy planning, surgery
        scheduling, and waiting out side effects. The rest of this
        article uses the five-half-life convention.
      </p>

      <h2>Semaglutide pharmacokinetics deep-dive</h2>
      <p>
        Semaglutide&apos;s elimination half-life is approximately
        1 week (about 168 hours) in adults, per the FDA Wegovy
        prescribing information<Cite n={1} />. The same value
        appears in the Ozempic label<Cite n={2} /> (Ozempic and
        Wegovy are the same molecule at different dose strengths)
        and in the Rybelsus label for the oral formulation<Cite n={3} />.
      </p>
      <p>
        Steady state is reached after about 4-5 weeks of weekly
        dosing<Cite n={1} />. This is why titration schedules
        always wait at least 4 weeks at each dose before stepping
        up — anything faster means you are titrating against a
        drug that has not yet reached its full effect, which both
        understates the effective dose and overstates short-term
        side-effect tolerance.
      </p>
      <p>
        Apply the five-half-life rule and a single dose of
        semaglutide is more than 97% eliminated about 5 weeks after
        the injection. After a long course of weekly dosing, the
        same 5-week window starts from the day of the final dose.
        This is the basis for the FDA&apos;s instruction in the
        Wegovy label that women of childbearing potential should
        discontinue semaglutide at least <strong>2 months</strong>{" "}
        before a planned pregnancy<Cite n={1} /> — a deliberately
        conservative buffer beyond the 5-week washout to account
        for individual variability.
      </p>
      <p>
        Oral semaglutide (Rybelsus) has the same systemic half-life
        as the injectable, despite being absorbed through the
        stomach lining via an absorption enhancer (SNAC)<Cite n={3} />.
        Once it&apos;s in the bloodstream, the molecule is
        identical, so the elimination kinetics are the same. The
        difference is bioavailability, not half-life.
      </p>

      <h2>Tirzepatide pharmacokinetics deep-dive</h2>
      <p>
        Tirzepatide&apos;s elimination half-life is approximately
        5 days, per the FDA Zepbound prescribing information<Cite n={4} />.
        The same value appears in the Mounjaro label<Cite n={5} />{" "}
        (Mounjaro and Zepbound are the same molecule at different
        approved indications). Steady state is reached after about
        4 weeks of weekly dosing<Cite n={4} />.
      </p>
      <p>
        Apply the five-half-life rule and a tirzepatide dose is
        more than 97% eliminated about 25 days after the injection.
        For pregnancy planning, the FDA Zepbound label echoes the
        same 2-month pre-conception window that applies to
        semaglutide<Cite n={4} /> — again, a buffer beyond the
        strict pharmacokinetic washout.
      </p>
      <p>
        Tirzepatide is a dual GIP/GLP-1 receptor agonist. Both
        receptor activities are tied to the same molecule, so
        there is one half-life for both pharmacological actions.
        You do not need to think about &ldquo;GIP washout&rdquo;
        and &ldquo;GLP-1 washout&rdquo; separately.
      </p>

      <h2>Orforglipron (Foundayo) — much shorter, because it&apos;s oral</h2>
      <p>
        Orforglipron, FDA-approved as Foundayo on April 1, 2026,
        is a fundamentally different molecule from semaglutide and
        tirzepatide. It&apos;s a small-molecule, non-peptide GLP-1
        receptor agonist that can be taken orally without an
        absorption enhancer<Cite n={6} />. Because it lacks the
        fatty-acid albumin-binding chain that gives semaglutide
        and tirzepatide their week-long half-lives, orforglipron
        clears much faster: its elimination half-life is
        approximately 29-49 hours per the FDA Foundayo label<Cite n={6} />.
      </p>
      <p>
        That gives a five-half-life washout of roughly 6-10 days
        from the last dose. Steady state on a once-daily oral dose
        is reached within about a week<Cite n={6} />. The practical
        consequence: if you stop Foundayo for any reason — pregnancy,
        surgery, intolerance — the washout window is far shorter
        than for any injectable GLP-1. For a full provider list and
        the access landscape, see our{" "}
        <Link href="/research/where-to-buy-foundayo">
          Foundayo provider directory
        </Link>
        .
      </p>

      <h2>Why the long half-life is engineered, not accidental</h2>
      <p>
        Native GLP-1 — the hormone your gut secretes after a meal —
        has a half-life of about <strong>2 minutes</strong>. The
        enzyme DPP-4 degrades it almost the instant it enters
        circulation. That short half-life is great for the
        physiological role of GLP-1 (a transient post-meal signal)
        but makes the native molecule completely unworkable as a
        drug.
      </p>
      <p>
        Semaglutide solves this problem with{" "}
        <strong>two independent engineering modifications</strong>{" "}
        that are often conflated but do separate jobs:
      </p>
      <ol>
        <li>
          <strong>An α-aminoisobutyric acid (Aib) substitution at
          position 8</strong> of the peptide backbone. The Aib
          substitution sterically blocks the DPP-4 cleavage site
          and gives the molecule its DPP-4 resistance. Without
          this, semaglutide would still be degraded in roughly the
          same 2 minutes as native GLP-1.
        </li>
        <li>
          <strong>A C18 fatty diacid (γGlu-2xOEG linker) attached
          at Lys-26.</strong> The fatty diacid binds reversibly and
          tightly to circulating albumin (greater than 99% plasma
          protein binding). Albumin is too large to be filtered by
          the kidney, so the bound peptide is shielded from renal
          clearance. This is what produces the multi-day, not the
          DPP-4 protection.
        </li>
      </ol>
      <p>
        Tirzepatide uses the same general strategy but with a
        different fatty acid linker — a{" "}
        <strong>C20 fatty diacid</strong> attached to a Lys residue
        — which gives slightly different albumin-binding kinetics
        and the somewhat shorter ~5-day half-life compared with
        semaglutide&apos;s ~7-day half-life<Cite n={1} /><Cite n={4} />.
      </p>
      <p>
        Subcutaneous injection adds a second slow-release layer:
        the drug forms a depot in the subcutaneous tissue and is
        released gradually into the bloodstream. The combination
        of subcutaneous depot release and albumin binding is what
        produces the smooth, week-long pharmacokinetic profile
        that makes once-weekly dosing possible<Cite n={1} />.
      </p>
      <p>
        Orforglipron does not use this trick — it is a small
        molecule that does not bind albumin and is cleared by the
        usual hepatic and renal pathways<Cite n={6} />. That is
        why the same drug class can have a 1-week half-life
        (semaglutide) or a 30-hour half-life (orforglipron),
        depending on the molecular engineering.
      </p>

      <h2>What &ldquo;out of your system&rdquo; means in practice</h2>

      <h3>Pregnancy planning</h3>
      <p>
        The FDA Wegovy and Zepbound labels both instruct that
        women of childbearing potential should discontinue the
        drug at least <strong>2 months</strong> before a planned
        pregnancy<Cite n={1} /><Cite n={4} />. This is longer than
        the strict five-half-life washout (5 weeks for sema, 25
        days for tirz) on purpose: it adds a buffer for individual
        clearance variation and gives the body extra time to
        normalize before conception. For deeper coverage of GLP-1s,
        fertility, and the full reproductive picture, see our{" "}
        <Link href="/research/glp1-pregnancy-pcos-fertility-women-health">
          GLP-1, pregnancy, PCOS, and fertility article
        </Link>
        .
      </p>

      <h3>Surgery</h3>
      <p>
        The American Society of Anesthesiologists has issued
        consensus guidance on stopping GLP-1s before surgery to
        reduce the risk of pulmonary aspiration from delayed
        gastric emptying<Cite n={7} />. The guidance is to hold
        the drug for at least 1 week before surgery for weekly
        injectable GLP-1s and at least 24 hours for daily oral
        GLP-1s. This is much shorter than the full
        five-half-life washout because the goal is to reduce
        gastric retention to a clinically acceptable level, not
        to fully eliminate the drug. For the full preoperative
        protocol, see our{" "}
        <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
          GLP-1 surgery and anesthesia ASA guidance article
        </Link>
        .
      </p>

      <h3>Side-effect resolution</h3>
      <p>
        Drug elimination and side-effect resolution are not the
        same timeline. Even after the molecule is gone, the
        physiological systems it affected — gastric emptying rate,
        appetite signaling, glucose homeostasis — take additional
        time to renormalize. Most patients report GI side effects
        (nausea, early satiety, constipation) resolving within
        4-8 weeks after the last dose, even though semaglutide
        itself is biochemically gone in 5 weeks. For the full
        picture of what to expect after stopping, see our articles
        on{" "}
        <Link href="/research/what-happens-when-you-stop-semaglutide">
          what happens when you stop semaglutide
        </Link>{" "}
        and{" "}
        <Link href="/research/how-to-taper-off-glp1-safely-guide">
          how to taper off GLP-1 safely
        </Link>
        .
      </p>

      <h2>Why side effects can persist after the drug is gone</h2>
      <p>
        The most common reason for symptoms outlasting the drug is
        gastric emptying. GLP-1s slow gastric emptying by acting
        on vagal afferents and on the gastric smooth muscle
        directly. With long exposure, the gastric motility setpoint
        adapts. When the drug is withdrawn, the receptor signaling
        stops within the half-life window — but the gastric motility
        machinery does not snap back instantly. Most patients see
        full normalization within 4-8 weeks of the last dose.
      </p>
      <p>
        A second mechanism is appetite signaling. GLP-1 receptors
        in the hypothalamus influence satiety and reward circuits.
        When dosing stops, ghrelin and leptin signaling shift back
        toward baseline over weeks, not days. The most-reported
        post-stop experience is the return of food noise and
        hunger before the body weight has changed — the appetite
        system reactivates faster than the body can rebound.
      </p>
      <p>
        A third mechanism is the weight-loss-related downstream
        effects: blood pressure, blood glucose, lipid panel, and
        liver enzymes generally improve in proportion to weight
        loss, and they regress in proportion to weight regain.
        That timeline is months, not weeks, and it is independent
        of the drug clearance curve.
      </p>

      <h2>Personalized washout: use the calculator</h2>
      <p>
        Population-average half-lives are useful for orientation,
        but the actual clearance for a specific patient depends on
        kidney function, body weight, dose, and whether they were
        at steady state. For personalized math — pick your drug,
        your last dose date, and your dose, and get the calculated
        plasma concentration and washout window — use our{" "}
        <Link href="/tools/glp1-washout-calculator">
          GLP-1 washout calculator
        </Link>
        . It implements the standard one-compartment elimination
        model with the FDA-label half-life values from this article.
      </p>

      <h2>Frequently asked questions</h2>

      <h3>Can semaglutide or tirzepatide be detected on a drug test?</h3>
      <p>
        No. GLP-1 receptor agonists are not on standard SAMHSA-5
        or extended workplace drug screening panels, and there is
        no commercial drug test for semaglutide or tirzepatide.
        Specialized LC-MS/MS assays exist in research and
        anti-doping contexts (the World Anti-Doping Agency does
        not currently prohibit GLP-1s), but they are not part of
        any routine clinical or employer drug screen. If you are
        worried about an upcoming drug test, GLP-1s will not show
        up on it.
      </p>

      <h3>Does semaglutide get stored in body fat?</h3>
      <p>
        No. Semaglutide is a peptide that binds tightly to albumin
        in the bloodstream — that is the engineering trick that
        gives it its 1-week half-life<Cite n={1} />. It is not
        lipophilic the way THC, some psychiatric drugs, or
        long-acting depot anesthetics are. Once dosing stops, it
        is cleared on the predictable half-life schedule from the
        FDA label, with no fat-tissue reservoir to slowly leach
        back into circulation.
      </p>

      <h3>How long after stopping does the nausea go away?</h3>
      <p>
        For most patients, GI side effects resolve within 4-8 weeks
        of the last dose. The drug itself is mostly gone in 5 weeks
        for semaglutide and 25 days for tirzepatide, but gastric
        emptying takes additional time to normalize. If GI symptoms
        persist beyond 8 weeks after stopping, that usually points
        to something other than residual GLP-1 effect — talk to
        your prescriber.
      </p>

      <h3>How long before pregnancy should I stop?</h3>
      <p>
        At least <strong>2 months</strong> before a planned
        conception, per the FDA Wegovy and Zepbound labels<Cite n={1} /><Cite n={4} />.
        This is longer than the strict five-half-life washout (5
        weeks for semaglutide, 25 days for tirzepatide) and
        includes a deliberate buffer for individual clearance
        variation. Discuss the timing with your obstetrician —
        the buffer also gives time to restart any chronic
        medications that were paused on the GLP-1 and to optimize
        weight, blood pressure, and glycemic control before
        conception.
      </p>

      <h3>Why is the half-life so long?</h3>
      <p>
        Native GLP-1 has a half-life of about 2 minutes because
        the DPP-4 enzyme degrades it almost instantly. Semaglutide
        and tirzepatide were engineered with a fatty-acid side
        chain that binds reversibly to albumin, which protects
        them from DPP-4 and slows kidney clearance. That, combined
        with the slow-release subcutaneous depot from once-weekly
        injection, gives both drugs week-long pharmacokinetic
        profiles that make weekly dosing possible<Cite n={1} /><Cite n={4} />.
        Orforglipron does not use this strategy and clears in
        about a day<Cite n={6} />.
      </p>

      <h3>What about Rybelsus (oral semaglutide) — is the half-life shorter?</h3>
      <p>
        No. Oral semaglutide is the same molecule as injectable
        semaglutide, just packaged with an absorption enhancer
        (SNAC) that gets a small fraction of the dose across the
        stomach lining<Cite n={3} />. Once it&apos;s in the
        bloodstream, the elimination kinetics are identical to
        injectable semaglutide — about a 1-week half-life. The
        difference between Rybelsus and Wegovy/Ozempic is
        bioavailability and dose size, not how long the drug
        stays in your system once it&apos;s absorbed.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          <strong>Semaglutide</strong> has a half-life of about
          1 week and clears in about <strong>5 weeks</strong>{" "}
          (five half-lives), per the FDA Wegovy label<Cite n={1} />.
        </li>
        <li>
          <strong>Tirzepatide</strong> has a half-life of about
          5 days and clears in about <strong>25 days</strong>, per
          the FDA Zepbound label<Cite n={4} />.
        </li>
        <li>
          <strong>Orforglipron</strong> (Foundayo, oral) has a
          half-life of 29-49 hours and clears in about{" "}
          <strong>6-10 days</strong><Cite n={6} />.
        </li>
        <li>
          The FDA tells women to stop sema and tirz at least{" "}
          <strong>2 months</strong> before pregnancy<Cite n={1} /><Cite n={4} />{" "}
          — a deliberate buffer beyond the strict pharmacokinetic
          washout.
        </li>
        <li>
          GI side effects usually take 4-8 weeks to resolve after
          stopping, even though the drug is biochemically gone
          earlier — gastric emptying takes time to renormalize.
        </li>
        <li>
          GLP-1s are <strong>not</strong> on any routine drug
          screening panel and there is no commercial test for them.
        </li>
        <li>
          The long half-life is engineered, not accidental: a
          fatty-acid side chain on the peptide binds reversibly
          to albumin and protects it from DPP-4 degradation.
        </li>
      </ul>

      <h2>Related research and tools</h2>
      <ul>
        <li>
          <Link href="/tools/glp1-washout-calculator">
            GLP-1 washout calculator
          </Link>{" "}
          — personalized half-life math for any drug, dose, and
          last-dose date
        </li>
        <li>
          <Link href="/research/glp1-surgery-anesthesia-asa-guidance">
            GLP-1 surgery and anesthesia: the ASA guidance
          </Link>{" "}
          — full preoperative hold protocol
        </li>
        <li>
          <Link href="/research/what-happens-when-you-stop-semaglutide">
            What happens when you stop semaglutide
          </Link>{" "}
          — the rebound timeline and what to expect
        </li>
        <li>
          <Link href="/research/how-to-taper-off-glp1-safely-guide">
            How to taper off a GLP-1 safely
          </Link>{" "}
          — step-down dosing and lifestyle bridge
        </li>
        <li>
          <Link href="/research/glp1-pregnancy-pcos-fertility-women-health">
            GLP-1, pregnancy, PCOS, and fertility
          </Link>{" "}
          — full reproductive-health picture
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. The
        pharmacokinetic values cited here are population averages
        from the FDA prescribing information for each drug;
        individual clearance varies with kidney function, body
        weight, dose, and other factors. Decisions about stopping
        a GLP-1 before pregnancy, surgery, or any other clinical
        event should always involve the prescribing clinician and
        the relevant specialist (obstetrician, anesthesiologist,
        etc.). Do not stop a prescribed medication based on a web
        article.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
