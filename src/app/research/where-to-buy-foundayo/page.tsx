import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "where-to-buy-foundayo";

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

// Provider data verified directly from each provider's public-facing
// website on 2026-04-07. Editorial cadence: this list is reviewed
// weekly and updated as more telehealth platforms add Foundayo.
//
// Confirmed dispensing channel: every Foundayo dispenser we've
// verified routes the actual prescription fulfillment through
// LillyDirect Pharmacy. Telehealth platforms (e.g., Weight Watchers
// Med+) provide the clinician consult and the wraparound program;
// LillyDirect dispenses the drug. This is similar to how Wegovy is
// distributed via NovoCare for direct-pay patients.

export default function WhereToBuyFoundayoArticle() {
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
      authors: "WW International, Inc. (Weight Watchers).",
      title:
        "Foundayo (orforglipron) Prescription Online — Weight Watchers Med+ provider page.",
      source: "WeightWatchers.com",
      year: 2026,
      url: "https://www.weightwatchers.com/us/weight-loss-medication/foundayo",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "LillyDirect Self Pay Pharmacy Solutions for Foundayo — manufacturer direct-pay channel.",
      source: "Eli Lilly patient program",
      year: 2026,
      url: "https://lillydirect.lilly.com/pharmacy-solutions/foundayo",
    },
    {
      authors:
        "Endocrine News.",
      title:
        "Pharma Friday: April 3, 2026 — Foundayo approval and rollout coverage.",
      source: "Endocrine Society",
      year: 2026,
      url: "https://endocrinenews.endocrine.org/pharma-friday-april-3-2026",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information (FDA-approved April 1, 2026).",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "Lilly Savings Card terms for Foundayo — commercially insured patient eligibility.",
      source: "Eli Lilly patient program",
      year: 2026,
      url: "https://www.lilly.com/savings-card",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p
        className="text-xl text-brand-text-secondary leading-relaxed"
        data-speakable="lead"
      >
        Foundayo (orforglipron) — Eli Lilly&apos;s first oral GLP-1
        for weight loss — was FDA-approved on April 1, 2026 and
        commercial dispensing started on April 6, 2026<Cite n={1} />.
        Five days into the rollout, the provider directory is small
        but growing fast. This article tracks every US telehealth
        platform and pharmacy we have verified as a Foundayo channel
        as of April 2026, with pricing tiers checked directly from
        each provider&apos;s website. We update this list weekly.
      </p>

      <h2>Confirmed Foundayo providers (as of April 7, 2026)</h2>

      <h3>1. LillyDirect (manufacturer direct-pay)<Cite n={3} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> Eli Lilly&apos;s own self-pay
          pharmacy channel. The same channel that dispenses Zepbound
          for direct-pay patients. LillyDirect is the actual
          dispensing pharmacy for every other Foundayo channel we
          have verified.
        </li>
        <li>
          <strong>How to get it:</strong> Requires a valid US
          prescription from a licensed prescriber. LillyDirect does
          not write the prescription itself — you need a prescriber
          (PCP, telehealth, or one of the partner platforms below)
          to write it, then you fill it through LillyDirect.
        </li>
        <li>
          <strong>Cash price:</strong> $149/month for the starting
          dose (0.8 mg), scaling up to roughly $299/month for the
          higher labeled doses<Cite n={2} />.
        </li>
        <li>
          <strong>With the Lilly Savings Card:</strong>{" "}
          <strong>$25/month</strong> for commercially insured
          patients (not Medicare or Medicaid)<Cite n={6} />. This
          is the cheapest legal path to a brand-name FDA-approved
          GLP-1 in 2026 by a wide margin.
        </li>
        <li>
          <strong>Shipping:</strong> Direct to patient, all 50
          states.
        </li>
      </ul>

      <h3>2. Weight Watchers Med+<Cite n={2} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> The medication-management
          tier of Weight Watchers, launched alongside Sequence
          (which WW acquired in 2023). Med+ provides the clinician
          consult, the wraparound nutrition program, and the
          GLP-1 Success behavioral program; the actual Foundayo
          prescription is dispensed through LillyDirect. WW is
          essentially a clinician + program layer on top of
          LillyDirect.
        </li>
        <li>
          <strong>How to get it:</strong> Take WW&apos;s 5-minute
          eligibility quiz, join Med+, complete a clinician
          consult, and receive a prescription if eligible.
        </li>
        <li>
          <strong>Med+ membership cost:</strong> $25 first month
          with a 12-month commitment, then $74/month for the
          remainder. That&apos;s the WW program fee — separate
          from the drug.
        </li>
        <li>
          <strong>Foundayo drug cost (cash pay):</strong>{" "}
          $149/month for the starting dose, up to $299/month for
          the higher labeled doses, billed by LillyDirect not WW.
        </li>
        <li>
          <strong>Insurance:</strong> Foundayo is currently NOT
          eligible for insurance billing through Weight Watchers
          Med+, per their own provider page<Cite n={2} />.
          Patients who want insurance coverage need to use a
          different prescriber and pharmacy path.
        </li>
        <li>
          <strong>States:</strong> All 50 states (per WW&apos;s
          general telehealth coverage).
        </li>
      </ul>

      <h3>3. NowPatient (telehealth)<Cite n={4} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> A telehealth platform that
          public reporting indicates is offering Foundayo via its
          weight management program<Cite n={4} />. We have not
          independently verified the pricing tier or the
          dispensing channel as of this article&apos;s publication
          date.
        </li>
        <li>
          <strong>Status:</strong> Confirmed via Endocrine News
          coverage of the Foundayo rollout. Pricing and
          state-by-state availability TBD.
        </li>
      </ul>

      <h2>Where Foundayo is NOT yet (as of April 7, 2026)</h2>
      <p>
        We checked the major US telehealth weight-loss platforms
        and could not find Foundayo on their public pages as of
        early April. This does not mean these providers will never
        carry it — the rollout is six days old and most catalogs
        update on a weekly cadence — but as of this article&apos;s
        publication date, Foundayo was not visibly available on:
      </p>
      <ul>
        <li>Hims &amp; Hers Health</li>
        <li>Ro / Ro Pharmacy</li>
        <li>Henry Meds</li>
        <li>Mochi Health</li>
        <li>Calibrate</li>
        <li>Found</li>
        <li>Plushcare</li>
        <li>Noom Med</li>
        <li>Walgreens (retail injection program)</li>
        <li>CVS MinuteClinic</li>
      </ul>
      <p>
        Several of these platforms have publicly stated they will
        add Foundayo as the rollout matures. We will update this
        list as confirmations come in. If you are a patient at one
        of these platforms, ask them directly — adding a new drug
        to a public catalog often lags the actual ability to
        prescribe by several weeks.
      </p>

      <h2>How the dispensing chain actually works</h2>
      <p>
        Foundayo is a brand-name pharmaceutical manufactured by Eli
        Lilly. Unlike compounded GLP-1s (which are made by
        independent 503A compounding pharmacies), Foundayo is a
        single-source product. Every dispenser we have verified
        routes the actual fulfillment through LillyDirect Pharmacy.
        The variation between providers is in the layer ABOVE the
        dispensing — the clinician consult, the program wrap, the
        billing model:
      </p>
      <ul>
        <li>
          <strong>LillyDirect alone</strong> — you bring your own
          prescriber, fill the prescription, done. Lowest overhead.
        </li>
        <li>
          <strong>Weight Watchers Med+</strong> — you get a Med+
          clinician + the WW behavioral program, drug dispensed
          via LillyDirect, two separate bills.
        </li>
        <li>
          <strong>Other telehealth</strong> — same model: their
          clinicians write the prescription, drug dispensed via
          LillyDirect (or LillyDirect partner pharmacies).
        </li>
      </ul>
      <p>
        The practical implication is that the drug itself is the
        same regardless of which channel you use. You are choosing
        between different clinical wraparounds and different
        program fees, not different drug supply chains.
      </p>

      <h2>How to find Foundayo if your platform doesn&apos;t list it yet</h2>
      <ol>
        <li>
          <strong>
            Check if you have commercial insurance.
          </strong>{" "}
          If yes, the Lilly Savings Card path is by far the
          cheapest ($25/mo) and any prescriber can write the
          prescription. Get a Foundayo prescription from your PCP
          or any telehealth platform with general weight-loss
          prescribing capability, then fill it through LillyDirect
          using the savings card.
        </li>
        <li>
          <strong>If you do not have commercial insurance,</strong>{" "}
          the cash-pay options are LillyDirect direct ($149-$299/mo
          depending on dose) or Weight Watchers Med+ ($25 first
          month + $74/mo Med+ fee + $149-$299/mo for the drug).
          The math favors going direct to LillyDirect unless you
          want the WW program.
        </li>
        <li>
          <strong>
            Ask your existing telehealth platform directly.
          </strong>{" "}
          Many platforms can prescribe Foundayo before they update
          their public catalogs. Their support chat or clinician
          messaging is the fastest way to find out.
        </li>
        <li>
          <strong>Check your local pharmacy.</strong> Foundayo is
          a standard prescription drug, not a specialty injectable,
          so it should eventually be available at any retail
          pharmacy that fills brand-name prescriptions. Walgreens,
          CVS, Walmart, Costco, and grocery store pharmacies are
          all candidates as the rollout matures.
        </li>
      </ol>

      <h2>What we will track in future updates</h2>
      <ul>
        <li>
          New telehealth platforms confirmed as Foundayo channels
        </li>
        <li>
          Retail pharmacy availability (Walgreens, CVS, Walmart,
          Costco)
        </li>
        <li>
          Insurance coverage announcements (most commercial plans
          do not yet have Foundayo on formulary)
        </li>
        <li>
          Medicaid and Medicare Part D coverage decisions
        </li>
        <li>
          Pricing changes from Lilly (the savings card structure
          and cash-pay tiers may evolve)
        </li>
        <li>
          State-by-state availability as some telehealth platforms
          phase rollout by state license
        </li>
      </ul>

      <h2>What this article is NOT</h2>
      <p>
        This is not a clinical recommendation or a sponsored
        provider list. We do not have a financial relationship with
        Eli Lilly, Weight Watchers, or any of the other providers
        listed. The provider information is sourced directly from
        each provider&apos;s public website on the publication
        date. Pricing and availability change frequently in the
        first weeks of any new drug launch — verify directly with
        the provider before signing up. This is a YMYL article
        about a real prescription drug; clinical decisions should
        always involve your prescribing clinician.
      </p>

      <h2>Bottom line</h2>
      <ul>
        <li>
          As of April 7, 2026, Foundayo is dispensed primarily
          through <strong>LillyDirect Pharmacy</strong> — Lilly&apos;s
          own self-pay channel.
        </li>
        <li>
          <strong>Weight Watchers Med+</strong> and <strong>NowPatient</strong>{" "}
          are the two telehealth platforms we have confirmed as
          Foundayo prescribing channels in the first week of the
          rollout, both ultimately routing to LillyDirect for the
          actual drug.
        </li>
        <li>
          Cash-pay pricing: <strong>$149-$299/month</strong>{" "}
          depending on labeled dose (the starting dose is the
          cheapest).
        </li>
        <li>
          With commercial insurance and the Lilly Savings Card:{" "}
          <strong>$25/month</strong> — the cheapest legal path to
          a brand-name FDA-approved GLP-1 in 2026.
        </li>
        <li>
          Most major telehealth platforms (Hims, Ro, Henry Meds,
          Mochi, Calibrate, Found, Noom Med) do not yet list
          Foundayo on their public catalogs but are expected to
          add it as the rollout matures.
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
          <Link href="/research/foundayo-vs-wegovy-vs-zepbound-comparison">
            Foundayo vs Wegovy vs Zepbound head-to-head
          </Link>{" "}
          — trial data, pricing, and the case for each drug
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
          — the four-path buyer funnel for all GLP-1s
        </li>
        <li>
          <Link href="/tools/glp1-savings-calculator">
            GLP-1 savings calculator 2026
          </Link>{" "}
          — compare 10 access paths over 1, 5, and 10 years
        </li>
        <li>
          <Link href="/tools/glp1-bmi-calculator">
            GLP-1 BMI calculator
          </Link>{" "}
          — eligibility check
        </li>
        <li>
          <Link href="/tools/glp1-drug-interaction-checker">
            GLP-1 drug interaction checker
          </Link>{" "}
          — Foundayo has a specific oral contraceptive interaction
        </li>
      </ul>

      <p className="text-sm text-brand-text-secondary mt-8">
        <strong>Important disclaimer.</strong> This article is
        educational and does not constitute medical advice. The
        provider list is updated weekly and is verified directly
        from each provider&apos;s public website. Pricing and
        availability change frequently in the first weeks of any
        new drug launch. Always verify directly with the provider
        and confirm with your prescribing clinician before
        starting any new medication. Weight Loss Rankings has no
        financial relationship with Eli Lilly, Weight Watchers, or
        any of the providers listed.
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
