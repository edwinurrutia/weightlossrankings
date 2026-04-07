import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import { getAllWarningLetters } from "@/lib/fda-warning-letters";

const SLUG = "fda-warning-letters-glp1";

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
          drugs. Compounded semaglutide is not FDA-approved, no matter how
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
          What is the exact form of semaglutide or tirzepatide in your
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
      </ul>
    </ResearchArticleLayout>
  );
}
