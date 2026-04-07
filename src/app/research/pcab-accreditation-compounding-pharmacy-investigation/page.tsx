import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import References from "@/components/research/References";
import pharmaciesData from "@/data/pharmacies.json";

const SLUG = "pcab-accreditation-compounding-pharmacy-investigation";

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

interface Pharmacy {
  _id: string;
  name: string;
  slug: string;
  type?: string;
  certifications?: string[];
  city?: string;
  state?: string;
  produces_semaglutide?: boolean;
  produces_tirzepatide?: boolean;
}

export default function PcabInvestigation() {
  const article = getResearchArticleBySlug(SLUG)!;
  const pharmacies = pharmaciesData as Pharmacy[];

  // Compute live stats from our pharmacy database
  const total = pharmacies.length;
  const pcabAccredited = pharmacies.filter((p) =>
    (p.certifications ?? []).some((c) => c.toUpperCase().includes("PCAB")),
  );
  const fda503b = pharmacies.filter((p) =>
    (p.certifications ?? []).some((c) => c.toUpperCase().includes("503B")),
  );
  const stateLicensedOnly = pharmacies.filter(
    (p) =>
      !(p.certifications ?? []).some((c) =>
        c.toUpperCase().includes("PCAB"),
      ) &&
      !(p.certifications ?? []).some((c) =>
        c.toUpperCase().includes("503B"),
      ),
  );

  const citations = [
    {
      authors: "Pharmacy Compounding Accreditation Board (PCAB).",
      title:
        "PCAB Standards of Practice and Accreditation Standards for Compounding Pharmacies.",
      source: "Accreditation Commission for Health Care (ACHC)",
      year: 2025,
      url: "https://www.achc.org/pcab",
    },
    {
      authors: "U.S. Pharmacopeial Convention.",
      title:
        "USP General Chapter <797> Pharmaceutical Compounding — Sterile Preparations.",
      source: "USP-NF",
      year: 2023,
      url: "https://www.usp.org/compounding/general-chapter-797",
    },
    {
      authors: "U.S. Pharmacopeial Convention.",
      title:
        "USP General Chapter <795> Pharmaceutical Compounding — Nonsterile Preparations.",
      source: "USP-NF",
      year: 2023,
      url: "https://www.usp.org/compounding/general-chapter-795",
    },
    {
      authors: "U.S. Food and Drug Administration.",
      title:
        "Compounding and the FDA: Questions and Answers (503A vs 503B distinctions, bulk drug substances, registration requirements).",
      source: "FDA Drug Compounding Resources",
      year: 2024,
      url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
    },
    {
      authors: "National Association of Boards of Pharmacy (NABP).",
      title:
        "Verified Pharmacy Program (VPP) and the Compounding Pharmacy Accreditation Workgroup.",
      source: "NABP",
      year: 2024,
      url: "https://nabp.pharmacy/programs/accreditations-inspections/vpp/",
    },
  ];

  return (
    <ResearchArticleLayout article={article}>
      <p data-speakable="lead">
        Compounded GLP-1 telehealth providers love to advertise that
        their fulfillment pharmacy has PCAB accreditation. The acronym
        gets dropped on landing pages, in checkout flows, and in
        provider FAQ sections — usually with no explanation of what
        it actually means or why it matters. This investigation walks
        through the PCAB program in plain language, explains how it
        relates to (and differs from) FDA 503B registration, USP 797
        compliance, NABP verification, and state board licensure, and
        gives patients the specific questions to ask any compounded
        GLP-1 provider before placing a first order. We&apos;ve also
        published the PCAB status of every pharmacy in the Weight
        Loss Rankings database below.
      </p>

      <h2>What PCAB actually is</h2>

      <p>
        PCAB stands for the <strong>Pharmacy Compounding Accreditation
        Board</strong>. It is operated by the Accreditation Commission
        for Health Care (ACHC), a third-party non-profit accreditor.
        PCAB accreditation is a <em>voluntary</em> credential — no
        federal law requires a 503A compounding pharmacy to have it,
        and no state licensure board mandates it. A pharmacy applies,
        pays an inspection fee, undergoes an on-site quality audit
        against PCAB&apos;s published standards (which are aligned
        with USP General Chapters &lt;795&gt; and &lt;797&gt;), and
        either receives accreditation or is required to remediate the
        cited deficiencies before receiving it [1].
      </p>

      <p>
        Re-accreditation typically occurs every three years, with
        unannounced surveys possible in the interim. PCAB&apos;s
        scope covers personnel training, facility design, equipment,
        environmental monitoring, sterile and non-sterile compounding
        processes, batch documentation, beyond-use dating, and
        complaint handling. It is the most-recognized voluntary
        quality program for 503A compounding pharmacies in the US.
      </p>

      <h2>The credentials hierarchy patients should understand</h2>

      <p>
        PCAB is one rung in a multi-level system. Here&apos;s how the
        whole stack actually works:
      </p>

      <table>
        <thead>
          <tr>
            <th>Credential</th>
            <th>Issued by</th>
            <th>Required?</th>
            <th>What it verifies</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>State pharmacy license</td>
            <td>State board of pharmacy</td>
            <td>
              <strong>Yes — legally required</strong>
            </td>
            <td>
              Basic legal authorization to operate as a pharmacy in
              that state
            </td>
          </tr>
          <tr>
            <td>USP &lt;797&gt; / &lt;795&gt; compliance</td>
            <td>USP standards (not a credential)</td>
            <td>Required by most state boards by reference</td>
            <td>
              Process standards for sterile (797) and nonsterile
              (795) compounding [2, 3]
            </td>
          </tr>
          <tr>
            <td>FDA 503A registration</td>
            <td>FDA</td>
            <td>
              No (503A is a statutory category, not a registration)
            </td>
            <td>
              Patient-specific compounding under section 503A of the
              FD&amp;C Act; cannot manufacture for resale [4]
            </td>
          </tr>
          <tr>
            <td>FDA 503B outsourcing facility registration</td>
            <td>FDA</td>
            <td>
              <strong>Yes</strong> — required to manufacture without
              patient-specific prescriptions
            </td>
            <td>
              Compliance with current Good Manufacturing Practice
              (cGMP), the same standard the FDA enforces for branded
              drug manufacturers [4]
            </td>
          </tr>
          <tr>
            <td>
              <strong>PCAB accreditation</strong>
            </td>
            <td>ACHC (third-party non-profit)</td>
            <td>
              <strong>No — voluntary</strong>
            </td>
            <td>
              On-site verification of process compliance,
              documentation, environmental monitoring, personnel
              training [1]
            </td>
          </tr>
          <tr>
            <td>NABP Verified Pharmacy Program (VPP)</td>
            <td>National Association of Boards of Pharmacy</td>
            <td>No — voluntary</td>
            <td>
              Multi-state inspection sharing program; reduces
              duplicative inspections [5]
            </td>
          </tr>
          <tr>
            <td>ACHC accreditation</td>
            <td>ACHC (parent of PCAB)</td>
            <td>No — voluntary</td>
            <td>
              Broader healthcare accreditation; encompasses PCAB
              for compounding-specific scope
            </td>
          </tr>
        </tbody>
      </table>

      <h2>What PCAB does NOT verify</h2>

      <p>
        This is the part patients almost never hear:
      </p>

      <ol>
        <li>
          <strong>PCAB does not verify the active pharmaceutical
          ingredient (API) source.</strong> A PCAB-accredited
          pharmacy can — and often does — purchase API from
          third-party suppliers whose own quality systems are not
          audited as part of the PCAB process. The pharmacy is
          responsible for ingredient verification, but PCAB
          inspectors do not independently test the API lot.
        </li>
        <li>
          <strong>PCAB does not run independent batch potency or
          purity testing on the finished compounded product.</strong>{" "}
          The pharmacy may run its own batch testing (and good
          ones do), but third-party lab verification is not part
          of the PCAB process.
        </li>
        <li>
          <strong>PCAB does not enforce compounding limits on
          drugs that have not been approved by the FDA.</strong>{" "}
          For example, compounded retatrutide is not eligible
          under section 503A (it&apos;s an investigational
          molecule), but PCAB accreditation alone does not stop
          a pharmacy from compounding it. Whether a pharmacy
          actually does so is a separate question of regulatory
          compliance, and FDA enforcement covers that gap.
        </li>
        <li>
          <strong>PCAB does not verify telehealth provider
          claims about which pharmacy fulfills their orders.</strong>{" "}
          A telehealth company can advertise that they use a
          PCAB-accredited pharmacy and then ship orders through
          a different, non-accredited pharmacy. This is a
          documented enforcement issue — see our{" "}
          <Link href="/research/fda-warning-letters-glp1">
            FDA warning letters investigation
          </Link>{" "}
          for examples.
        </li>
      </ol>

      <h2>The 503A vs 503B distinction matters more than PCAB</h2>

      <p>
        For compounded GLP-1s specifically, the most important
        credential is not PCAB — it&apos;s whether the pharmacy is
        a section 503A traditional compounder or a section 503B
        outsourcing facility. The two operate under fundamentally
        different rules [4]:
      </p>

      <ul>
        <li>
          <strong>503A:</strong> Patient-specific prescriptions only.
          Cannot manufacture in advance for sale to other entities.
          Subject to USP standards and state board oversight, but
          not to FDA cGMP enforcement. Most compounding pharmacies
          in the US are 503A.
        </li>
        <li>
          <strong>503B (outsourcing facility):</strong> Can produce
          drugs without patient-specific prescriptions for sale to
          healthcare entities. Must register with the FDA, must
          comply with cGMP (the same standard branded
          manufacturers meet), subject to direct FDA inspection,
          must report adverse events to FDA, and must use only API
          from FDA-registered facilities.
        </li>
      </ul>

      <p>
        503B is a substantially higher quality bar than 503A, and a
        substantially higher bar than PCAB accreditation alone. A
        503B-registered facility that is <em>also</em> PCAB-accredited
        is the highest quality combination available for compounded
        GLP-1s in the US. For the bioequivalence and quality
        differences, see our{" "}
        <Link href="/research/compounded-semaglutide-bioequivalence">
          compounded semaglutide bioequivalence deep-dive
        </Link>
        .
      </p>

      <h2>PCAB status of every pharmacy in our database</h2>

      <p>
        We track {total} compounding pharmacies that fulfill GLP-1
        orders for telehealth providers in the Weight Loss Rankings
        marketplace. Of those, {pcabAccredited.length} are
        PCAB-accredited and {fda503b.length} are also FDA 503B
        outsourcing facilities (the highest tier). The remaining{" "}
        {stateLicensedOnly.length} are state-licensed but not PCAB-
        accredited at the time of our last verification.
      </p>

      <table>
        <thead>
          <tr>
            <th>Pharmacy</th>
            <th>Type</th>
            <th>Certifications</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((p) => (
              <tr key={p._id}>
                <td>
                  <Link href={`/pharmacies/${p.slug}`}>{p.name}</Link>
                </td>
                <td>{p.type ?? "—"}</td>
                <td>
                  {(p.certifications ?? []).join(", ") || "State licensed only"}
                </td>
                <td>
                  {p.city ?? ""}
                  {p.city && p.state ? ", " : ""}
                  {p.state ?? ""}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <p>
        These numbers update automatically as our pharmacy database
        is verified and refreshed. The{" "}
        <Link href="/pharmacies">full pharmacy directory</Link>{" "}
        contains additional detail on each facility, including
        states licensed, drug menu, and any documented regulatory
        actions.
      </p>

      <h2>Specific questions to ask a compounded GLP-1 provider</h2>

      <p>
        Before placing a first order with any compounded GLP-1
        telehealth provider, ask the following — and get answers in
        writing:
      </p>

      <ol>
        <li>
          <strong>Which specific pharmacy fulfills my prescription,
          and is it PCAB-accredited?</strong> Ask for the
          pharmacy&apos;s legal name and physical address. Verify
          that the name matches a known PCAB-accredited facility
          on the ACHC public directory.
        </li>
        <li>
          <strong>Is the pharmacy a 503A or a 503B?</strong> 503B
          is a higher quality tier with cGMP enforcement and direct
          FDA oversight. 503A is the more common patient-specific
          model.
        </li>
        <li>
          <strong>Does the pharmacy run third-party batch potency
          and sterility testing?</strong> A pharmacy that performs
          independent batch testing through a separate accredited
          analytical lab is providing a quality signal that PCAB
          accreditation alone does not.
        </li>
        <li>
          <strong>Where does the API come from, and is the supplier
          FDA-registered?</strong> For 503B facilities, the API must
          come from an FDA-registered manufacturer. For 503A
          facilities the rules are looser, but a serious pharmacy
          should be able to name its API supplier.
        </li>
        <li>
          <strong>Has the pharmacy received any FDA warning
          letters in the past three years?</strong> Cross-check
          against our{" "}
          <Link href="/research/fda-warning-letters-glp1">
            FDA warning letters database
          </Link>
          . A warning letter does not automatically disqualify a
          pharmacy — many remediate cited issues — but it tells
          you what to ask about.
        </li>
        <li>
          <strong>What is the form of the active ingredient?</strong>{" "}
          Specifically: is it the semaglutide base molecule, or a
          salt form (sodium or acetate)? Salt forms are not the
          same active ingredient as the base molecule used in
          FDA-approved semaglutide products, and FDA has flagged
          salt-form sourcing as a quality concern in the warning
          letter program.
        </li>
      </ol>

      <h2>What this means for patients</h2>

      <p>
        PCAB accreditation is a meaningful quality signal for a
        503A compounding pharmacy. It says the facility has been
        independently audited against published standards by a
        non-profit third party and has chosen to subject itself to
        ongoing oversight that is not legally required. That is
        not nothing — and a pharmacy without PCAB accreditation is
        meaningfully harder to evaluate from the outside.
      </p>

      <p>
        But PCAB accreditation is not a substitute for the harder
        questions: API source, batch testing, salt-form vs base
        molecule, regulatory history, and which legal compounding
        category the pharmacy operates under. The patients who get
        burned by compounded GLP-1s almost never get burned because
        their pharmacy lacked PCAB accreditation. They get burned
        because the API was sourced from an unverified supplier,
        because the salt form differed from the FDA-approved base
        molecule, because the dosing was wrong, or because the
        telehealth provider routed their prescription through a
        different pharmacy than the one they advertised.
      </p>

      <p>
        Use PCAB as a screening filter, not a final answer. Combine
        it with the 503A vs 503B distinction, the questions above,
        and our{" "}
        <Link href="/research/fda-warning-letters-glp1">
          FDA warning letter cross-check
        </Link>{" "}
        to build a complete picture before placing an order.
      </p>

      <h2>Related research</h2>

      <p>
        For the broader compounded GLP-1 quality and regulatory
        landscape, see our{" "}
        <Link href="/research/compounded-semaglutide-bioequivalence">
          compounded semaglutide bioequivalence investigation
        </Link>
        , our{" "}
        <Link href="/research/fda-warning-letters-glp1">
          FDA warning letters database
        </Link>
        , and our{" "}
        <Link href="/research/cheapest-compounded-semaglutide">
          floor-price provider verification
        </Link>
        . For context on the specific drugs being compounded, see
        the{" "}
        <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
          Wegovy pen vs compounded vial practical comparison
        </Link>
        .
      </p>

      <References items={citations} />
    </ResearchArticleLayout>
  );
}
