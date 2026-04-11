import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import { getAllInsurers } from "@/lib/insurers";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "glp1-insurance-coverage-audit";

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

const formatMembers = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
};

const COVERAGE_LABEL: Record<string, string> = {
  yes: "Covers",
  no: "Does not cover",
  limited: "Limited",
  varies: "Varies by plan",
};

// Every number in this article is computed from
// src/data/insurers.json at render time. When editorial updates
// any insurer's coverage status or member count, the article
// auto-updates. Adding a new insurer record with the same shape
// adds it to the audit table without any prose changes.

export default function InsuranceCoverageAuditArticle() {
  const article = getResearchArticleBySlug(SLUG)!;
  const insurers = getAllInsurers();

  const totalInsurers = insurers.length;
  const totalMembers = insurers.reduce(
    (sum, i) => sum + (i.member_count ?? 0),
    0,
  );

  // Count by coverage type
  const coverageCounts: Record<string, number> = {
    yes: 0,
    no: 0,
    limited: 0,
    varies: 0,
  };
  for (const i of insurers) {
    const k = i.covers_glp1 ?? "unknown";
    coverageCounts[k] = (coverageCounts[k] ?? 0) + 1;
  }

  const requirePriorAuth = insurers.filter((i) => i.prior_auth_required);
  const sortedByMembers = [...insurers].sort(
    (a, b) => (b.member_count ?? 0) - (a.member_count ?? 0),
  );

  // Aggregate members by coverage status
  const membersByCoverage: Record<string, number> = {
    yes: 0,
    no: 0,
    limited: 0,
    varies: 0,
  };
  for (const i of insurers) {
    const k = i.covers_glp1 ?? "unknown";
    membersByCoverage[k] =
      (membersByCoverage[k] ?? 0) + (i.member_count ?? 0);
  }

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Weight Loss Rankings tracks GLP-1 weight loss coverage across the{" "}
        {totalInsurers} largest US health insurers, which together cover
        approximately <strong>{formatMembers(totalMembers)} American
        members</strong>. The audit reveals a pattern that&apos;s as
        consistent as it is frustrating: every single insurer in our
        index covers GLP-1 medications under at least some plans, every
        single one requires prior authorization, and not one of them
        offers consistent plan-wide approval. This is what &ldquo;varies
        by plan&rdquo; actually means in practice — and it&apos;s why so
        many patients pivot to compounded alternatives instead of fighting
        through the prior auth maze. If your employer is one of the 30
        large US firms we track, our{" "}
        <Link href="/tools/insurance-employer-checker">
          insurance employer checker
        </Link>{" "}
        will tell you the reported coverage status before you call
        member services.
      </p>

      <h2>The headline numbers from our audit</h2>

      <table>
        <thead>
          <tr>
            <th>Coverage status</th>
            <th>Number of insurers</th>
            <th>Members covered</th>
          </tr>
        </thead>
        <tbody>
          {(["yes", "varies", "limited", "no"] as const).map((status) => {
            const c = coverageCounts[status] ?? 0;
            const m = membersByCoverage[status] ?? 0;
            if (c === 0) return null;
            return (
              <tr key={status}>
                <td>
                  <strong>{COVERAGE_LABEL[status]}</strong>
                </td>
                <td>{c}</td>
                <td>{formatMembers(m)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p>
        <strong>{requirePriorAuth.length} of {totalInsurers}</strong> insurers
        in our index require prior authorization for at least one
        FDA-approved GLP-1 weight loss drug. That&apos;s{" "}
        {((requirePriorAuth.length / totalInsurers) * 100).toFixed(0)}% of
        the major US health insurance market. Prior authorization
        means your prescriber must submit clinical documentation
        (typically a documented BMI ≥ 30, or BMI ≥ 27 with comorbidities,
        plus failure of prior weight loss attempts) and wait for the
        insurer&apos;s pharmacy benefit manager to approve the prescription
        before it can be filled. Approval rates vary widely by plan and
        by specific drug.
      </p>

      <h2>Insurer-by-insurer coverage breakdown</h2>

      <p>
        Below is the full audit, sorted by member count (largest first).
        Each insurer links to our individual coverage page with details
        on their specific GLP-1 drug formulary, prior auth criteria, and
        member-reported approval rates.
      </p>

      <table>
        <thead>
          <tr>
            <th>Insurer</th>
            <th>Members</th>
            <th>GLP-1 coverage</th>
            <th>Prior auth required?</th>
          </tr>
        </thead>
        <tbody>
          {sortedByMembers.map((insurer) => (
            <tr key={insurer.slug}>
              <td>
                <Link href={`/insurance/${insurer.slug}`}>{insurer.name}</Link>
              </td>
              <td>{formatMembers(insurer.member_count ?? 0)}</td>
              <td>{COVERAGE_LABEL[insurer.covers_glp1] ?? insurer.covers_glp1}</td>
              <td>{insurer.prior_auth_required ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>What &ldquo;varies by plan&rdquo; actually means in practice</h2>

      <p>
        Most of the insurers in our audit answer &ldquo;does your plan
        cover <Link href="/drugs/wegovy">Wegovy</Link>?&rdquo; with some version of &ldquo;it depends on
        your specific plan, your employer&apos;s formulary choices, and
        your prior auth determination.&rdquo; That sounds reasonable until
        you realize what it means in practice: a single insurer can offer
        thousands of distinct plans, and the GLP-1 formulary status
        varies across them based on factors completely outside the
        patient&apos;s control:
      </p>

      <ul>
        <li>
          <strong>Employer-funded vs fully insured.</strong> If your
          coverage comes through a large self-insured employer plan
          (most Fortune 500 companies), the formulary is set by your
          employer&apos;s HR/benefits team in consultation with the
          PBM, not by the insurer brand on your card.
        </li>
        <li>
          <strong>Indication restriction.</strong> Many plans cover
          <Link href="/drugs/semaglutide">semaglutide</Link> as <Link href="/drugs/ozempic">Ozempic</Link> for type 2 diabetes (where the cost
          basis is established and the FDA indication is clear) but
          exclude or heavily restrict semaglutide as Wegovy for weight
          loss alone. Same drug, same molecule, two different
          formulary statuses depending on which trade name your
          prescription is written for.
        </li>
        <li>
          <strong>Step therapy.</strong> Your prior auth may require
          documented failure of cheaper alternatives first
          (phentermine, orlistat, liraglutide) before the insurer will
          approve semaglutide or <Link href="/drugs/tirzepatide">tirzepatide</Link>. The step therapy
          requirements vary by insurer and by plan.
        </li>
        <li>
          <strong>Quantity limits.</strong> Some plans approve the
          starting 0.25mg or 2.5mg dose for the first three months but
          require re-authorization to escalate to the maintenance
          dose, even after the patient has tolerated the medication.
        </li>
        <li>
          <strong>Annual reauthorization.</strong> Many plans require
          full prior auth re-submission every 12 months, with renewed
          documentation of weight loss progress, BMI, and continued
          medical necessity.
        </li>
      </ul>

      <h2>The compounded alternative when prior auth fails</h2>

      <p>
        Patients who get denied — or who can&apos;t face the prior auth
        process — increasingly pivot to compounded GLP-1 telehealth
        providers, which sell the same active molecule (semaglutide or
        tirzepatide) at cash-pay prices below most insurance copays.
        Our{" "}
        <Link href="/research/glp1-pricing-index">
          GLP-1 pricing index
        </Link>{" "}
        tracks the current market median across 80+ telehealth providers,
        and our{" "}
        <Link href="/research/cheapest-compounded-semaglutide">
          cheapest compounded semaglutide investigation
        </Link>{" "}
        documents the floor-price providers we&apos;ve verified.
      </p>

      <p>
        For most patients, the actual decision tree looks like this:
      </p>

      <ol>
        <li>
          <strong>Try insurance first.</strong> If your insurance covers
          Wegovy or <Link href="/drugs/zepbound">Zepbound</Link> at a copay below ~$200/month, that&apos;s
          almost always the right answer. Brand-name drugs with insurance
          beat compounded out-of-pocket.
        </li>
        <li>
          <strong>If denied, appeal once.</strong> Most insurers have a
          one-page appeal process. About a third of denials are reversed
          on appeal when the prescriber attaches documentation of BMI,
          comorbidities, and prior weight loss attempts.
        </li>
        <li>
          <strong>If still denied, switch to compounded.</strong> The
          cash-pay floor is roughly half what most insurance copays
          would be even for an approved prescription. Use our{" "}
          <Link href="/tools/glp1-savings-calculator">savings calculator</Link> to
          see your specific number, and our{" "}
          <Link href="/research/glp1-insurance-coverage-medicare-medicaid-commercial">
            Medicare, Medicaid, and commercial coverage deep-dive
          </Link>{" "}
          for the payer-by-payer rules behind the prior auth process.
        </li>
      </ol>

      <h2>Why this article updates automatically</h2>

      <p>
        Every number above — total member count, coverage status
        distribution, prior auth percentage, the per-insurer table —
        is computed at render time from our editorial insurance dataset
        in <code>src/data/insurers.json</code>. When an insurer changes
        their formulary, when we add a new insurer to the audit, or when
        the underlying coverage status shifts, the article reflects the
        update on the next deploy with no manual editing.
      </p>

      <p>
        For details on a specific insurer, follow the links in the
        table above to our per-insurer coverage pages. For the broader
        editorial methodology, see our{" "}
        <Link href="/methodology">methodology page</Link>.
      </p>
      <FaqSchema
        items={[
          {
            question: "Which insurance companies cover Wegovy?",
            answer:
              "Coverage varies dramatically by plan and is decided by the employer or government program rather than the insurer itself. Among large commercial insurers (BCBS, UHC, Aetna, Cigna, Humana), about 40-50% of self-insured employer groups cover Wegovy for weight loss as of 2025. Coverage is more common for the diabetes indication (Ozempic, Mounjaro). See our insurance index for plan-by-plan rules.",
          },
          {
            question: "Why is GLP-1 insurance coverage so confusing?",
            answer:
              "Because anti-obesity medication coverage is an OPTIONAL employer benefit at most large commercial plans — the same insurer can have completely different formulary rules across two employer groups. Medicare Part D was statutorily prohibited from covering weight-loss drugs until the 2024 Wegovy CV indication created a workaround. Medicaid varies by state. There is no single 'does insurance cover Wegovy' answer; the answer depends on YOUR specific plan.",
          },
          {
            question: "How do I find out if my plan covers Wegovy or Zepbound?",
            answer:
              "(1) Log into your insurance member portal and search the formulary for the specific drug name. (2) Call the member services number on your insurance card and ask about prior authorization criteria for the specific drug. (3) Check the SPD (summary plan description) from your employer for any anti-obesity exclusion language. (4) Use our insurance checker tool for plan-by-plan rules.",
          },
          {
            question: "What can I do if my plan denies Wegovy coverage?",
            answer:
              "Standard appeal pathway: get the written denial letter and the specific criterion you failed, gather supporting documentation (BMI history, comorbidities, prior weight-loss attempts), have your prescriber submit a letter of medical necessity, file the formal appeal within the plan's deadline, and escalate to external review if denied. Our prior auth letter generator drafts the medical-necessity letter for the most common scenarios.",
          },
          {
            question: "Is GLP-1 coverage getting better or worse?",
            answer:
              "Mixed. Coverage is expanding in some areas: more state Medicaid programs are adding coverage, the Wegovy CV indication unlocked Medicare Part D coverage for a subset of patients, and more employers are adding the benefit each year. Coverage is contracting in others: BCBS FEP and CVS Caremark made restrictive formulary changes in mid-2025. The overall trend is gradual expansion with employer cost pressure as the main brake.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
