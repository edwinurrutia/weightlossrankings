import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";

const SLUG = "wegovy-ozempic-zepbound-mounjaro-brand-name-cheat-sheet";

export async function generateMetadata(): Promise<Metadata> {
  const article = getResearchArticleBySlug(SLUG)!;
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/research/${SLUG}`,
      languages: {
        "en-US": `/research/${SLUG}`,
        es: "/research/guia-marcas-wegovy-ozempic-zepbound-mounjaro",
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

export default function BrandCheatSheetArticle() {
  const article = getResearchArticleBySlug(SLUG)!;

  const citations = [
    {
      authors: "Novo Nordisk Inc.",
      title:
        "WEGOVY (semaglutide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "OZEMPIC (semaglutide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s029lbl.pdf",
    },
    {
      authors: "Novo Nordisk Inc.",
      title:
        "RYBELSUS (semaglutide) tablets — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2024,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/213051s000lbl.pdf",
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
      authors: "Eli Lilly and Company.",
      title:
        "MOUNJARO (tirzepatide) injection — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2025,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s019lbl.pdf",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information.",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/foundayo-pi.pdf",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        The GLP-1 market in 2026 is a brand-name mess. Six products
        share three active ingredients between two manufacturers, and
        the brand names give no hint about which is which. Patients
        consistently search for &ldquo;is Zepbound the same as
        Mounjaro&rdquo; (yes), &ldquo;is Wegovy the same as
        Ozempic&rdquo; (almost), and &ldquo;is Zepbound a
        semaglutide&rdquo; (no — it&apos;s tirzepatide) at a combined
        ~5,800 monthly searches. This cheat sheet untangles all of
        it in one place, with the FDA indications and dosing pulled
        directly from each product&apos;s prescribing information.
      </p>

      <h2>The one-page summary</h2>

      <table>
        <thead>
          <tr>
            <th>Brand name</th>
            <th>Active ingredient</th>
            <th>Manufacturer</th>
            <th>FDA indication</th>
            <th>Form</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Wegovy</strong>
            </td>
            <td>Semaglutide 2.4 mg</td>
            <td>Novo Nordisk</td>
            <td>Chronic weight management</td>
            <td>Weekly injection pen</td>
          </tr>
          <tr>
            <td>
              <strong>Ozempic</strong>
            </td>
            <td>Semaglutide (lower doses)</td>
            <td>Novo Nordisk</td>
            <td>Type 2 diabetes + CV risk reduction + kidney (FLOW)</td>
            <td>Weekly injection pen</td>
          </tr>
          <tr>
            <td>
              <strong>Rybelsus</strong>
            </td>
            <td>Semaglutide (oral peptide)</td>
            <td>Novo Nordisk</td>
            <td>Type 2 diabetes</td>
            <td>Daily oral tablet</td>
          </tr>
          <tr>
            <td>
              <strong>Zepbound</strong>
            </td>
            <td>Tirzepatide</td>
            <td>Eli Lilly</td>
            <td>Chronic weight management + obstructive sleep apnea</td>
            <td>Weekly injection pen</td>
          </tr>
          <tr>
            <td>
              <strong>Mounjaro</strong>
            </td>
            <td>Tirzepatide</td>
            <td>Eli Lilly</td>
            <td>Type 2 diabetes</td>
            <td>Weekly injection pen</td>
          </tr>
          <tr>
            <td>
              <strong>Foundayo</strong>
            </td>
            <td>Orforglipron (small molecule)</td>
            <td>Eli Lilly</td>
            <td>Chronic weight management</td>
            <td>Daily oral tablet</td>
          </tr>
        </tbody>
      </table>

      <h2>Is Wegovy the same as Ozempic?</h2>

      <p>
        <strong>Almost.</strong> Both Wegovy and Ozempic contain the
        same active ingredient — semaglutide — and are made by the
        same manufacturer, Novo Nordisk. Both are weekly subcutaneous
        injection pens. The differences are [1, 2]:
      </p>

      <ul>
        <li>
          <strong>Maximum dose.</strong> Wegovy goes up to 2.4 mg
          weekly (the weight-management dose). Ozempic goes up to
          2.0 mg weekly (the diabetes dose).
        </li>
        <li>
          <strong>FDA indication.</strong> Wegovy is approved for
          chronic weight management in adults and adolescents with
          obesity, plus cardiovascular risk reduction in adults with
          known heart disease and obesity. Ozempic is approved for
          type 2 diabetes, cardiovascular risk reduction in adults
          with T2D and heart disease, and — most recently —
          reducing the risk of kidney disease progression in adults
          with T2D + CKD (the FLOW trial indication, approved
          January 2025).
        </li>
        <li>
          <strong>Insurance coverage.</strong> Ozempic is covered by
          most insurance plans for T2D patients because it&apos;s a
          diabetes drug. Wegovy is frequently excluded from
          commercial plans because anti-obesity drug coverage is
          still a volatile category. This is the single biggest
          practical difference.
        </li>
        <li>
          <strong>Room-temperature storage window.</strong> Ozempic
          gets 56 days at room temperature after first use; Wegovy
          gets only 28 days. See our{" "}
          <Link href="/research/glp1-storage-shelf-life-refrigeration-guide">
            storage guide
          </Link>{" "}
          for the full FDA-label comparison.
        </li>
      </ul>

      <p>
        In clinical effect they are essentially identical at
        equivalent doses. Patients sometimes find their insurance
        will cover Ozempic but not Wegovy even though a prescriber
        could achieve similar weight loss outcomes with either. This
        drives a lot of off-label Ozempic prescribing for weight
        loss — which is legal but complicated.
      </p>

      <h2>Is Zepbound the same as Mounjaro?</h2>

      <p>
        <strong>Yes — they are the same drug.</strong> Both contain
        tirzepatide, are manufactured by Eli Lilly, and are weekly
        subcutaneous injection pens. The only differences [4, 5]:
      </p>

      <ul>
        <li>
          <strong>FDA indication.</strong> Zepbound is approved for
          chronic weight management and obstructive sleep apnea in
          adults with obesity. Mounjaro is approved for type 2
          diabetes. Same molecule, two labels.
        </li>
        <li>
          <strong>Insurance coverage.</strong> Like Ozempic vs
          Wegovy, Mounjaro is covered for diabetes patients while
          Zepbound coverage for weight management is inconsistent
          across commercial plans.
        </li>
        <li>
          <strong>Packaging.</strong> Different pen colors and
          different pharmacy labels, but the active drug inside is
          identical.
        </li>
      </ul>

      <p>
        If you are asking &ldquo;should I use Zepbound or
        Mounjaro?&rdquo; the honest answer is &ldquo;it depends on
        what your insurance covers and what your prescriber writes.
        The drug is the same.&rdquo;
      </p>

      <h2>Is Zepbound a semaglutide? Is Wegovy a tirzepatide?</h2>

      <p>
        <strong>No.</strong> This is the most confused GLP-1 brand
        question on Google:
      </p>

      <ul>
        <li>
          <strong>Zepbound is tirzepatide,</strong> not semaglutide.
          Tirzepatide is a dual GLP-1 + GIP receptor agonist made
          by Eli Lilly. Semaglutide is a single GLP-1 receptor
          agonist made by Novo Nordisk. Different molecules,
          different manufacturers.
        </li>
        <li>
          <strong>Wegovy is semaglutide,</strong> not tirzepatide.
          Same molecule as Ozempic and Rybelsus, different brand and
          indication.
        </li>
      </ul>

      <p>
        The quickest way to remember: if the brand starts with W or
        O, it&apos;s Novo Nordisk&apos;s semaglutide. If the brand
        starts with Z or M, it&apos;s Eli Lilly&apos;s tirzepatide.
        If it&apos;s Rybelsus, it&apos;s oral semaglutide. If
        it&apos;s Foundayo, it&apos;s the new oral non-peptide
        orforglipron.
      </p>

      <h2>What is Rybelsus?</h2>

      <p>
        Rybelsus is <strong>oral semaglutide</strong> — the same
        active ingredient as Wegovy and Ozempic, but formulated as a
        daily pill rather than a weekly injection [3]. To survive
        stomach acid, Rybelsus uses a special absorption enhancer
        (SNAC) and must be taken on an empty stomach with no more
        than 4 ounces of water, then the patient must wait 30 minutes
        before eating, drinking, or taking other oral medications.
      </p>

      <p>
        Rybelsus is FDA-approved for type 2 diabetes only. It is
        not approved for weight management. The practical constraint
        of the empty-stomach-plus-30-minute-wait rule has limited
        its uptake compared to injectable semaglutide.
      </p>

      <h2>What is Foundayo?</h2>

      <p>
        Foundayo (orforglipron) is the newest entry in the category
        — FDA-approved on April 1, 2026 [6]. It is the first
        non-peptide small-molecule GLP-1 receptor agonist approved
        for chronic weight management. Unlike Rybelsus (which is
        still a peptide and requires empty-stomach dosing), Foundayo
        is a true small molecule that can be taken any time of day
        with or without food.
      </p>

      <p>
        Foundayo is made by Eli Lilly and is positioned between the
        injectable drugs and the older oral semaglutide in the
        market. See our{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          Foundayo approval deep-dive
        </Link>{" "}
        for the full ATTAIN-1 trial data and the $25-$149/month
        launch pricing.
      </p>

      <h2>Generic vs compounded vs brand-name</h2>

      <p>
        All of the above are <strong>brand-name products</strong> —
        the FDA-approved, manufacturer-labeled versions sold through
        pharmacies at brand pricing. A separate market exists for{" "}
        <strong>compounded semaglutide and tirzepatide</strong>,
        which are prepared by 503A and 503B compounding pharmacies
        from the same active pharmaceutical ingredients but are not
        FDA-approved as finished products.
      </p>

      <p>
        Compounded GLP-1s are sold primarily through telehealth
        providers at significantly lower cash prices than the brand
        names. They ship in vials rather than pens, and the patient
        draws their own dose with an insulin syringe. They are{" "}
        <em>not generics</em> — a generic is an exact copy of a
        brand-name drug that the FDA has approved as
        bioequivalent, and no such generics exist for these drugs.
        For the distinction and the quality considerations, see our{" "}
        <Link href="/research/compounded-semaglutide-bioequivalence">
          compounded semaglutide bioequivalence investigation
        </Link>
        , our{" "}
        <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
          PCAB accreditation guide
        </Link>
        , and our{" "}
        <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
          Wegovy pen vs compounded vial deep-dive
        </Link>
        .
      </p>

      <h2>Which drug should I ask my prescriber about?</h2>

      <p>
        For most adult patients with obesity and no diabetes, the
        current decision tree looks roughly like this:
      </p>

      <ol>
        <li>
          <strong>If insurance covers it:</strong> Wegovy (larger
          data package for weight management) or Zepbound (larger
          effect size in head-to-head trial comparisons). Zepbound
          wins on effect size; Wegovy wins on cardiovascular
          outcomes data (SELECT).
        </li>
        <li>
          <strong>If you have type 2 diabetes:</strong> Ozempic or
          Mounjaro (insurance coverage is almost universal for T2D)
          with off-label weight management as a secondary benefit.
        </li>
        <li>
          <strong>If cost is the primary constraint:</strong>{" "}
          Foundayo at $149/month self-pay (if the lower effect size
          is acceptable) or compounded semaglutide/tirzepatide
          (typically $150-$300/month).
        </li>
        <li>
          <strong>If needle aversion is the issue:</strong>{" "}
          Foundayo (daily pill, no food restrictions) or Rybelsus
          (daily pill, strict food restrictions — less practical).
        </li>
      </ol>

      <p>
        For the detailed comparison of effect sizes across all the
        approved drugs, see our{" "}
        <Link href="/research/tirzepatide-vs-semaglutide-head-to-head">
          tirzepatide vs semaglutide head-to-head
        </Link>
        .
      </p>

      <h2>Related research and tools</h2>

      <p>
        For the weight loss prediction at each drug scaled to your
        body weight, use our{" "}
        <Link href="/tools/glp1-weight-loss-calculator">
          weight loss calculator
        </Link>
        . For the onset and steady-state timing, see our{" "}
        <Link href="/research/how-long-does-glp1-take-to-work">
          how long does GLP-1 take to work guide
        </Link>
        . For injection technique across all the pens, see our{" "}
        <Link href="/research/where-to-inject-semaglutide-tirzepatide-guide">
          injection guide
        </Link>
        . For the Foundayo approval news, see our{" "}
        <Link href="/research/foundayo-orforglipron-fda-approval-2026">
          Foundayo deep-dive
        </Link>
        . For compounded vs brand comparison, see our{" "}
        <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
          pen vs compounded vial guide
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
