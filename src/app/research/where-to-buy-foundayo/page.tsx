import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References, { Cite } from "@/components/research/References";

const SLUG = "where-to-buy-foundayo";

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
      authors: "Eli Lilly and Company.",
      title:
        "Lilly begins commercial dispensing of Foundayo (orforglipron) through LillyDirect — investor update, April 2026.",
      source: "Eli Lilly Investor Relations",
      year: 2026,
      url: "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill",
    },
    {
      authors: "Eli Lilly and Company.",
      title:
        "FOUNDAYO (orforglipron) tablets — US Prescribing Information (FDA-approved April 1, 2026).",
      source: "FDA Approved Labeling",
      year: 2026,
      url: "https://pi.lilly.com/us/foundayo-uspi.pdf",
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

      <h2>Foundayo channels we have verified (as of April 7, 2026)</h2>
      <p className="text-sm text-brand-text-secondary">
        <strong>Verification caveat.</strong> Foundayo commercial
        dispensing began on April 6, 2026 — one day before this
        article&apos;s publication. The only channel we have
        confirmed as operational for Foundayo is{" "}
        <strong>LillyDirect Pharmacy</strong>, the manufacturer&apos;s
        direct-to-patient dispensing channel. Third-party telehealth
        platforms (including Weight Watchers Med+ and NowPatient)
        have publicly signaled intent to add Foundayo to their
        catalogs, but patients should verify directly with any
        telehealth provider before enrolling — catalog updates and
        actual prescribing capability often lag press announcements
        by several weeks in the first month of a new drug launch.
      </p>

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
          <strong>Cash price:</strong> as low as $149/month for
          the lowest dose per Lilly&apos;s published LillyDirect
          pricing. Higher labeled doses are priced above that; the
          precise per-strength pricing tier should be confirmed
          directly on the LillyDirect product page at the time of
          fill<Cite n={3} />.
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

      <h3>2. Weight Watchers Med+ (expected, not yet verified)<Cite n={2} /></h3>
      <ul>
        <li>
          <strong>What it is:</strong> The medication-management
          tier of Weight Watchers, which already prescribes
          injectable GLP-1s through its Sequence-acquired clinician
          network. Weight Watchers has publicly indicated it plans
          to add Foundayo to Med+, with the actual prescription
          expected to be dispensed through LillyDirect. As of
          April 7, 2026, we have <strong>not independently
          verified</strong> that Foundayo is live on Med+ or that
          clinicians are actively writing Foundayo prescriptions on
          the platform. Patients should verify directly with
          Weight Watchers Med+ support before enrolling on the
          expectation of receiving Foundayo.
        </li>
        <li>
          <strong>How to verify:</strong> Contact Weight Watchers
          Med+ support directly and ask whether Foundayo is
          currently being prescribed. Catalog listings often lag
          actual prescribing capability, and vice versa.
        </li>
      </ul>

      <h3>3. Other telehealth platforms (expected additions)</h3>
      <ul>
        <li>
          Industry trade coverage of the Foundayo rollout has named
          several telehealth platforms — including{" "}
          <strong>NowPatient</strong> — as expected early adopters.
          We have not independently confirmed an active Foundayo
          prescribing workflow at any of these platforms as of
          April 7, 2026. Patients interested in Foundayo through a
          non-LillyDirect channel should ask their telehealth
          provider directly and confirm before paying for a
          membership.
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
          the cash-pay path is LillyDirect direct, starting at
          $149/month for the lowest dose per Lilly&apos;s published
          pricing. If and when Weight Watchers Med+ confirms
          Foundayo is live on its platform, the WW path adds the
          Med+ program fee on top of the LillyDirect drug cost —
          the math favors going direct to LillyDirect unless you
          want the WW behavioral program.
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
          <strong>Weight Watchers Med+</strong> and{" "}
          <strong>NowPatient</strong> are two telehealth platforms
          that have publicly signaled intent to add Foundayo, but
          we have not independently verified active prescribing at
          either platform as of April 7, 2026. Verify directly
          before enrolling.
        </li>
        <li>
          Cash-pay pricing: <strong>as low as $149/month</strong>{" "}
          for the lowest dose per Lilly&apos;s published pricing,
          with higher labeled-dose tiers priced above that.
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
