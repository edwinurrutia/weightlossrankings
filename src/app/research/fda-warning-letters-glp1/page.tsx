import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import { getAllWarningLetters } from "@/lib/fda-warning-letters";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "fda-warning-letters-glp1";

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

// All article numbers below are computed at render time from
// src/data/fda-warning-letters.json — when the bi-weekly FDA scraper
// adds new letters, this article updates automatically. No prose
// hardcodes a count; everything comes from the dataset.

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function FdaWarningLettersInvestigation() {
  const article = getResearchArticleBySlug(SLUG)!;
  const allLetters = getAllWarningLetters();

  // Sort newest first by issue date
  const letters = [...allLetters].sort((a, b) =>
    b.letter_date.localeCompare(a.letter_date),
  );
  const totalLetters = letters.length;

  // Group by subject category — the scraper imports a verbatim
  // FDA subject line on every letter, so we can pattern-match the
  // canonical violation categories.
  const subjectBuckets = new Map<string, number>();
  for (const l of letters) {
    const key = (l.subject ?? "Uncategorized").trim();
    subjectBuckets.set(key, (subjectBuckets.get(key) ?? 0) + 1);
  }
  const sortedSubjects = Array.from(subjectBuckets.entries()).sort(
    (a, b) => b[1] - a[1],
  );

  // Group by issuing office — also editorially significant. Most
  // GLP-1 enforcement comes out of CDER, but a few come out of
  // ORA field offices and the difference signals enforcement type.
  const officeBuckets = new Map<string, number>();
  for (const l of letters) {
    const key = (l.issuing_office ?? "Unknown").trim();
    officeBuckets.set(key, (officeBuckets.get(key) ?? 0) + 1);
  }
  const sortedOffices = Array.from(officeBuckets.entries()).sort(
    (a, b) => b[1] - a[1],
  );

  // Identify the date range we cover
  const dates = letters
    .map((l) => l.letter_date)
    .filter(Boolean)
    .sort();
  const earliestDate = dates[0];
  const latestDate = dates[dates.length - 1];

  // Count compounded-GLP-1-specific letters vs everything else.
  // Anything with "compounded" or "GLP-1" or "misbranded" or
  // "marketing" in the subject is treated as a compounded GLP-1
  // enforcement action.
  const compoundedKeywords =
    /compound|glp-?1|misbrand|misleading|marketing|labeling|adulterat/i;
  const compoundedLetters = letters.filter((l) =>
    compoundedKeywords.test(l.subject ?? ""),
  );
  const nonCompoundedLetters = letters.filter(
    (l) => !compoundedKeywords.test(l.subject ?? ""),
  );

  return (
    <ResearchArticleLayout article={article} dataAsOf={latestDate}>
      <p data-speakable="lead">
        Weight Loss Rankings maintains a continuously-updated database of every
        FDA warning letter we&apos;ve been able to identify that targets a
        compounded GLP-1 telehealth provider, compounding pharmacy, or related
        weight-loss business. As of {formatDate(latestDate ?? article.publishedDate)},
        the database contains <strong>{totalLetters} letters</strong> spanning
        from {earliestDate ? formatDate(earliestDate) : "early 2025"} to{" "}
        {latestDate ? formatDate(latestDate) : "the present day"}. This
        investigation breaks down what FDA is actually citing — the violation
        categories, issuing offices, and the patterns that should make a
        prospective patient cautious about specific business models.
      </p>

      <h2>What FDA is citing, by subject category</h2>

      <p>
        Every letter in our database carries a verbatim subject line from the
        FDA letter itself. Grouping by subject reveals what the agency is
        actually concerned about right now.
      </p>

      <table>
        <thead>
          <tr>
            <th>Subject category</th>
            <th>Letters</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {sortedSubjects.map(([subject, count]) => (
            <tr key={subject}>
              <td>{subject}</td>
              <td>{count}</td>
              <td>{((count / totalLetters) * 100).toFixed(0)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        The dominant pattern is clear: <strong>{compoundedLetters.length} of{" "}
        {totalLetters}</strong> letters in the database{" "}
        ({((compoundedLetters.length / totalLetters) * 100).toFixed(0)}%) target
        marketing, labeling, or compounding-quality issues at compounded GLP-1
        telehealth businesses. Only {nonCompoundedLetters.length} letters in
        the dataset address other concerns.
      </p>

      <h2>Issuing offices</h2>

      <p>
        Where the letter comes from inside FDA matters. Letters from the Center
        for Drug Evaluation and Research (CDER) are typically the result of an
        internet sweep — FDA staff find a website making questionable claims,
        and the violation letter follows. Letters from district field offices
        usually follow an in-person inspection of a compounding pharmacy.
      </p>

      <table>
        <thead>
          <tr>
            <th>Issuing office</th>
            <th>Letters</th>
          </tr>
        </thead>
        <tbody>
          {sortedOffices.map(([office, count]) => (
            <tr key={office}>
              <td>{office}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Every letter in our database</h2>

      <p>
        Each entry below links to our editorial summary plus a verbatim excerpt
        of what FDA cited. We add new letters within two weeks of FDA
        publication via an{" "}
        <Link href="/methodology">automated discovery and review process</Link>.
      </p>

      <ul>
        {letters.map((l) => (
          <li key={l.id}>
            <Link href={`/fda-warning-letters/${l.id}`}>
              {l.company_name}
              {l.company_dba ? ` (dba ${l.company_dba})` : ""}
            </Link>{" "}
            — {formatDate(l.letter_date)}
            {l.subject ? `, ${l.subject}` : ""}
          </li>
        ))}
      </ul>

      <h2>The patterns that should make you cautious</h2>

      <p>
        Reading every letter in the database reveals three recurring
        red flags worth knowing about as a patient:
      </p>

      <ol>
        <li>
          <strong>Branded compounded products.</strong> Several letters cite
          telehealth providers for putting their own brand name on the vial
          label of a compounded drug, suggesting to consumers that the
          compounded product was manufactured by the telehealth company
          itself. FDA considers this misbranding because the actual compounder
          is a third-party 503A pharmacy that the patient never sees.
        </li>
        <li>
          <strong>Implied FDA approval.</strong> Multiple letters cite
          marketing language that uses words like &ldquo;safe,&rdquo;
          &ldquo;FDA-approved,&rdquo; or &ldquo;FDA-registered&rdquo; in
          contexts that misrepresent the regulatory status of compounded
          drugs. Compounded <Link href="/drugs/semaglutide">semaglutide</Link> is not FDA-approved, no matter how
          the website phrases it.
        </li>
        <li>
          <strong>Adulteration findings on inspection.</strong> The letters
          from district field offices (rather than CDER) typically follow an
          in-person inspection that found cGMP violations — sterility
          failures, environmental monitoring lapses, or use of bulk drug
          substances that aren&apos;t eligible under the 503A or 503B
          exemptions. These are the most serious letters in the database.
        </li>
      </ol>

      <h2>How to use this database as a patient</h2>

      <p>
        Before you start a compounded GLP-1 program, search this database
        for the telehealth provider you&apos;re considering AND the
        compounding pharmacy they list as their fulfillment partner. A
        warning letter doesn&apos;t automatically mean the company is unsafe
        — many companies remediate the cited violations and continue
        operating — but it tells you what to ask about during your
        consultation.
      </p>

      <p>
        Specific questions to ask any compounded GLP-1 provider:
      </p>

      <ul>
        <li>
          Has your company or your fulfillment pharmacy received any FDA
          warning letters? If yes, what was cited and what changed?
        </li>
        <li>
          Is your pharmacy registered with FDA as a 503B outsourcing
          facility? If not, which state board of pharmacy licenses them?
        </li>
        <li>
          What is the exact form of semaglutide or <Link href="/drugs/tirzepatide">tirzepatide</Link> in your
          product — base molecule, sodium salt, or acetate salt? FDA has
          warned that salt forms are not the same active ingredient as the
          base molecule used in approved drugs.
        </li>
      </ul>

      <h2>Methodology</h2>

      <p>
        Our FDA letter database is updated bi-weekly via an automated
        scraper that pulls from{" "}
        <a
          href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters"
          target="_blank"
          rel="noopener"
        >
          FDA&apos;s public warning letters index
        </a>
        . Every letter we add is verified against the original FDA
        publication URL, with violation summaries quoted verbatim from the
        FDA letter text. We never paraphrase a violation. The full
        methodology is documented in our{" "}
        <Link href="/methodology">editorial standards</Link>.
      </p>

      <p>
        Our pricing index, pharmacy database, and the rest of the WLR
        editorial dataset is documented at{" "}
        <Link href="/sources">our master sources page</Link>. The
        underlying FDA letter records are in our public repository.
      </p>

      <h2>Related research</h2>

      <p>
        For the regulatory and market context this enforcement
        database fits into:
      </p>

      <ul>
        <li>
          <Link href="/research/compounded-semaglutide-bioequivalence">
            Compounded semaglutide bioequivalence
          </Link>{" "}
          — what 503A and 503B compounding pharmacies are actually
          required to test, including the salt-form sourcing issue
          that drives several of the warning letters in our
          database.
        </li>
        <li>
          <Link href="/research/cheapest-compounded-semaglutide">
            Is $99 compounded semaglutide real?
          </Link>{" "}
          — verification of the floor-price providers we track,
          which uses this enforcement database as one of the
          editorial inputs to the verification process.
        </li>
        <li>
          <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
            Wegovy pen vs compounded vial: 12 operational
            differences
          </Link>{" "}
          — the practical-experience comparison between the two
          delivery formats. The compounded format is what most
          enforcement letters in this database concern.
        </li>
        <li>
          <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
            PCAB accreditation investigation
          </Link>{" "}
          — the voluntary quality framework that is the strongest
          forward-looking signal for which 503A pharmacies are
          unlikely to end up on this enforcement list.
        </li>
        <li>
          <Link href="/research/where-to-buy-semaglutide">
            Where to buy semaglutide
          </Link>{" "}
          — patient-facing decision guide that uses this
          enforcement database as one of the verification inputs.
        </li>
      </ul>
      <FaqSchema
        items={[
          {
            question: "Has the FDA issued warning letters about compounded GLP-1 products?",
            answer:
              "Yes. The FDA has issued multiple warning letters and import alerts to compounding pharmacies, online sellers, and foreign suppliers selling semaglutide and tirzepatide products that violate federal law — including unapproved salt forms, contaminated peptides, and unregistered facilities. Our database compiles publicly posted FDA enforcement actions specific to GLP-1 compounding.",
          },
          {
            question: "Is it illegal to buy compounded semaglutide?",
            answer:
              "No. Compounded semaglutide dispensed by a state-licensed 503A pharmacy from a valid prescription is legal under section 503A of the Federal Food, Drug, and Cosmetic Act. What is illegal is selling 'research peptides' for human use, importing semaglutide salt forms (e.g., semaglutide sodium), or compounding without a prescription. The FDA enforcement actions in this database target these illegal activities, not legitimate 503A compounding.",
          },
          {
            question: "Why did the FDA take Wegovy and Zepbound off the shortage list?",
            answer:
              "FDA declared Wegovy and Zepbound resolved from the drug shortage list in 2025 because Novo Nordisk and Eli Lilly demonstrated they could meet projected national demand. The end of shortage status changed the legal landscape for 503A and 503B compounding under sections 503A(b)(1)(D) and 503B(a)(2) of the FD&C Act, narrowing which compounded preparations can be lawfully made.",
          },
          {
            question: "How can I verify a compounding pharmacy is FDA-compliant?",
            answer:
              "Check (1) state pharmacy board licensure, (2) FDA registration if 503B, (3) PCAB accreditation status (Pharmacy Compounding Accreditation Board — voluntary but a strong signal), (4) the FDA warning letters database (this article), and (5) state board disciplinary action records. Compounded GLP-1 from any source flagged in FDA enforcement should be avoided.",
          },
          {
            question: "Are foreign-sourced semaglutide and tirzepatide safe?",
            answer:
              "No, in most cases. The FDA has issued multiple import alerts and warning letters about counterfeit semaglutide and tirzepatide products entering the US from foreign sellers — products lacking sterility testing, contaminated with unknown peptides, or sold as 'research chemicals not for human consumption.' Stick to US-licensed pharmacies (brand or compounded) and avoid international peptide sellers.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
