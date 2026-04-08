import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticleBySlug } from "@/lib/research";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";
import ResearchArticleLayout from "@/components/research/ResearchArticleLayout";
import LiveDataCallout from "@/components/research/LiveDataCallout";
import References, { Cite } from "@/components/research/References";
import FaqSchema from "@/components/research/FaqSchema";

const SLUG = "compounded-semaglutide-bioequivalence";

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

export default function CompoundedBioequivalenceArticle() {
  const article = getResearchArticleBySlug(SLUG)!;
  const dataAsOf = getLatestVerificationDate();

  return (
    <ResearchArticleLayout article={article} dataAsOf={dataAsOf}>
      <p>
        Compounded semaglutide is, by some estimates, the most prescribed
        weight-loss medication in the United States that doesn&apos;t
        legally exist as an FDA-approved drug. Tens of thousands of vials
        a week ship from compounding pharmacies through telehealth
        intermediaries, sold at a fraction of the cash price of brand-name
        Wegovy or Ozempic. The marketing on both sides of the debate is
        loud and confident: telehealth companies imply the molecule is
        identical to what Novo Nordisk sells, and Novo Nordisk implies
        compounded versions are unregulated and dangerous. Neither
        framing survives a careful look at the regulatory rules.
      </p>

      <p>
        The honest version of the story is that compounded semaglutide
        sits in a deliberate carveout in federal drug law &mdash; one
        that has nothing to do with bioequivalence trials, never
        required them in the first place, and was originally written
        for a totally different purpose. Whether the compounded vial in
        a patient&apos;s refrigerator is &ldquo;the same molecule&rdquo;
        as Wegovy depends on which pharmacy made it, what salt form
        they sourced, what tests they ran, and whether they meet a
        standard most patients have never heard of. This is a walk
        through the actual rules and what they do and don&apos;t
        guarantee.
        <Cite n={1} />
      </p>

      <h2>Why compounded semaglutide exists at all</h2>

      <p>
        The legal foundation for compounding sits in two sections of
        the Federal Food, Drug, and Cosmetic Act: section 503A, which
        covers traditional compounding pharmacies that fill
        patient-specific prescriptions, and section 503B, which created
        a newer category of &ldquo;outsourcing facilities&rdquo; that
        can ship larger volumes without a name on every vial. Both
        carveouts let pharmacies prepare drug products that are not
        FDA-approved, under conditions that exempt them from the
        new-drug application process that brand-name manufacturers go
        through.
        <Cite n={2} />
      </p>

      <p>
        The catch is that, ordinarily, you can&apos;t compound a copy
        of a commercially available FDA-approved drug. That rule
        exists to prevent compounders from simply undercutting brand
        manufacturers on patented medications. The exception &mdash;
        and the entire reason compounded semaglutide became a
        category at all &mdash; is section 506E of the FDCA, which
        directs the FDA to maintain a public drug shortage list. When
        a drug is on that list, the prohibition against compounding
        copies of it is temporarily lifted. The intent was clearly to
        let hospitals and infusion centers keep critical drugs flowing
        during supply disruptions, not to stand up a parallel
        retail market for weight-loss injections, but the statute
        doesn&apos;t distinguish.
        <Cite n={3} />
      </p>

      <p>
        Semaglutide was added to the FDA drug shortage list in 2022 as
        Novo Nordisk struggled to keep up with Ozempic and Wegovy
        demand. That listing, which lasted into early 2025, was the
        legal hook that made it possible for compounding pharmacies
        and the telehealth companies that contract with them to
        produce and sell semaglutide at scale. When the FDA officially
        declared the shortage resolved in early 2025, the compounding
        carveout under 506E technically closed for semaglutide, though
        the FDA gave pharmacies a wind-down window and several
        compounders are now relying on alternative legal arguments
        (custom dosing, allergy exemptions, peptide formulations) to
        continue dispensing.
        <Cite n={2} />
      </p>

      <h2>503A vs 503B: a meaningful distinction</h2>

      <p>
        Not all &ldquo;compounding pharmacies&rdquo; are the same.
        Section 503A pharmacies are state-licensed, regulated
        primarily by state boards of pharmacy, and required to fill
        prescriptions one patient at a time. They can&apos;t legally
        ship across state lines in bulk without a patient-specific
        prescription, and the FDA does not routinely inspect them.
        Their quality bar is set by the United States Pharmacopeia
        (USP) chapters &mdash; principally USP &lt;797&gt; for sterile
        compounding &mdash; plus whatever their state board enforces.
        <Cite n={4} />
      </p>

      <p>
        Section 503B outsourcing facilities are a different animal.
        They register directly with the FDA, submit to FDA
        inspections, and are required to comply with current Good
        Manufacturing Practice (cGMP) regulations &mdash; the same
        framework that governs brand-name pharmaceutical
        manufacturing. They can ship in bulk to clinics and hospitals
        without patient-specific prescriptions. The cGMP requirement
        is the meaningful difference: it imposes documented batch
        records, validated processes, environmental monitoring,
        stability testing, and out-of-specification investigations
        that 503A pharmacies are not required to do at the same
        level.
        <Cite n={2} />
      </p>

      <p>
        For a patient receiving compounded semaglutide through a
        telehealth provider, the question of whether the source
        pharmacy is 503A or 503B is one of the most consequential
        pieces of information about the product, and one of the
        hardest to extract from the marketing copy. Most large
        telehealth GLP-1 brands source from 503A pharmacies, because
        the lower regulatory overhead translates to lower per-vial
        cost. A smaller number source from 503B outsourcing
        facilities; those tend to be the ones whose pricing sits at
        the higher end of the compounded market.
      </p>

      <h2>The salt-form controversy</h2>

      <p>
        Brand-name semaglutide &mdash; Ozempic, Wegovy, and the oral
        Rybelsus &mdash; is formulated as a specific molecular entity
        that the FDA approved on the basis of Novo Nordisk&apos;s
        pivotal trials. The active ingredient is the semaglutide
        peptide in its base form. A significant fraction of compounded
        semaglutide on the U.S. market is, by contrast, formulated as
        semaglutide sodium or semaglutide acetate &mdash; salt forms
        of the same peptide that have never been used in any FDA
        approval and never appeared in a pivotal trial.
        <Cite n={6} />
      </p>

      <p>
        The FDA has flagged this directly. In a series of
        communications beginning in late 2023, the agency stated that
        semaglutide salts are &ldquo;different active ingredients&rdquo;
        than the semaglutide base used in Ozempic and Wegovy, and that
        compounders using salt forms are not, in the agency&apos;s
        view, producing a drug whose safety and effectiveness can be
        inferred from the brand-name clinical record. Compounders
        argue that the peptide is the same molecule once it dissolves
        in solution, and that the counter-ion (sodium or acetate) is
        biologically inert. Both positions have a kernel of truth.
        Pharmacologically, salt forms of the same active moiety
        usually do behave similarly in vivo &mdash; that&apos;s why
        the FDA allows generic manufacturers to use different salts
        of an active ingredient under certain conditions. But
        &ldquo;usually&rdquo; isn&apos;t a clinical trial, and there
        is no published head-to-head pharmacokinetic study comparing
        semaglutide base to semaglutide sodium or semaglutide acetate
        in humans at therapeutic weight-loss doses.
        <Cite n={6} />
      </p>

      <p>
        The honest assessment is that most of the rapid weight loss
        being reported in the wild on compounded semaglutide is
        clinically consistent with what you would expect from a real
        GLP-1 receptor agonist hitting its target, which suggests the
        salt-form question is probably not a complete deal-breaker
        in practice. But absence of pharmacokinetic data is not
        evidence of equivalence, and patients deserve to know which
        category their product falls into.
      </p>

      <h2>What &ldquo;bioequivalence&rdquo; actually means</h2>

      <p>
        The word &ldquo;bioequivalence&rdquo; gets thrown around a
        lot in compounded GLP-1 marketing, almost always
        incorrectly. The FDA&apos;s definition is precise: two drug
        products are bioequivalent if they have no significant
        difference in the rate and extent to which the active
        ingredient becomes available at the site of action when
        administered at the same molar dose under similar conditions.
        Operationally, that gets measured as the area under the
        plasma concentration-time curve (AUC) and the peak plasma
        concentration (Cmax), with the generic product&apos;s 90%
        confidence interval required to fall within 80&ndash;125% of
        the reference product on both metrics.
        <Cite n={2} />
      </p>

      <p>
        Bioequivalence trials are the regulatory mechanism by which
        generic drugs get approved as substitutable for brand-name
        originators. They require dosing healthy volunteers,
        sampling plasma at intervals, running mass-spectrometry
        assays, and statistical analysis of the resulting curves.
        They are not cheap, but they are the cheapest path to a
        therapeutically substitutable copy of an existing drug.
      </p>

      <p>
        Compounded products are not generic drugs, do not go through
        the abbreviated new drug application (ANDA) pathway, and by
        definition have not undergone bioequivalence testing. This
        is not a regulatory loophole or an oversight &mdash; it is
        the explicit structure of the compounding carveout.
        Compounders are not making the claim that their product is
        therapeutically equivalent to Wegovy in the regulatory
        sense, and they are not legally allowed to make that claim.
        The carveout exists precisely so they don&apos;t have to.
        Anyone marketing a compounded GLP-1 as &ldquo;bioequivalent
        to Wegovy&rdquo; is using the word in the colloquial sense
        (&ldquo;basically the same&rdquo;) rather than the
        regulatory sense, and the distinction matters because no
        compounded product on the market has the data that would
        actually support the regulatory claim.
        <Cite n={6} />
      </p>

      <h2>What 503A pharmacies actually test</h2>

      <p>
        If compounders aren&apos;t running bioequivalence trials,
        what are they testing? The required quality controls under
        USP &lt;797&gt; for sterile preparations are real and
        meaningful, even if they&apos;re narrower than what brand
        manufacturers do. A reputable 503A pharmacy compounding
        injectable semaglutide is required, at minimum, to perform
        or arrange for:
      </p>

      <ul>
        <li>
          <strong>Sterility testing under USP &lt;71&gt;.</strong>{" "}
          Cultures grown from finished product samples to verify the
          absence of bacterial and fungal contamination. Required
          before release for any sterile compound with a beyond-use
          date longer than the immediate dispensing window.
        </li>
        <li>
          <strong>Endotoxin testing under USP &lt;85&gt;.</strong>{" "}
          Bacterial endotoxins (lipopolysaccharide fragments from
          gram-negative bacteria) can contaminate sterile injections
          even when the product itself is technically sterile,
          because dead bacterial debris survives sterilization.
          Endotoxins cause fever, hypotension, and shock at very
          low concentrations. Pyrogen testing is one of the most
          important quality checks in injectable compounding.
          <Cite n={4} />
        </li>
        <li>
          <strong>Potency / assay testing.</strong> A high-pressure
          liquid chromatography (HPLC) or mass spectrometry assay
          to confirm the actual concentration of semaglutide in the
          finished vial matches the labeled concentration. USP
          allows a typical tolerance band of roughly
          90&ndash;110% of label claim, though the standard varies
          by drug class.
        </li>
        <li>
          <strong>Identity verification.</strong> Confirmation that
          the active ingredient actually is semaglutide, typically
          via mass spectrometry of the bulk powder before
          compounding, and ideally again on finished product.
        </li>
        <li>
          <strong>Beyond-use dating studies.</strong> Stability data
          to support the expiration date printed on each vial,
          accounting for the specific formulation, container, and
          storage conditions used.
        </li>
      </ul>

      <p>
        What 503A pharmacies do <em>not</em> have to test is also
        worth being explicit about: there is no requirement for
        bioavailability studies, no requirement for clinical
        efficacy data, no requirement for head-to-head comparison
        against Wegovy, no requirement for long-term stability
        beyond the labeled beyond-use date, and no required
        post-marketing adverse event reporting comparable to what
        brand manufacturers submit through FAERS. The quality
        signal from a 503A pharmacy is a snapshot of identity,
        sterility, and potency at the moment of dispensing &mdash;
        nothing about clinical performance.
      </p>

      <LiveDataCallout
        drug="semaglutide"
        form="compounded"
        label="Live: cheapest compounded semaglutide"
      />

      <h2>What 503B outsourcing facilities do differently</h2>

      <p>
        Outsourcing facilities operating under section 503B layer
        cGMP requirements on top of the USP chapters. In practice
        that means a meaningfully thicker quality system: validated
        equipment cleaning protocols, written master batch records
        signed off by quality assurance, environmental monitoring
        of compounding suites, formal supplier qualification of
        active pharmaceutical ingredient (API) sources, stability
        programs that follow ICH guidelines, and FDA inspections
        that look like the inspections done at brand-name
        manufacturing sites.
        <Cite n={2} />
      </p>

      <p>
        The result is not the same thing as an FDA-approved drug
        &mdash; there is still no NDA, no clinical trial data, no
        bioequivalence package &mdash; but the manufacturing process
        looks structurally similar to how brand drugs are made. For
        patients who care about quality assurance and are willing
        to pay a premium for it, sourcing from a 503B outsourcing
        facility is the closest thing to a brand-equivalent
        compounded product currently available. The trade-off is
        cost: 503B-sourced compounded semaglutide typically lands
        at 50&ndash;100% above the cheapest 503A-sourced offerings.
      </p>

      <h2>The PCAB accreditation distinction</h2>

      <p>
        PCAB (the Pharmacy Compounding Accreditation Board, now part
        of ACHC) is a third-party accrediting body that audits
        compounding pharmacies against a published standard
        substantially more rigorous than baseline state-board
        licensure. PCAB accreditation is voluntary &mdash; pharmacies
        choose to apply, pay for the audit, and submit to ongoing
        inspections. The accreditation verifies that a pharmacy has
        documented standard operating procedures, a functional
        quality assurance program, trained personnel, and a track
        record of compliance with USP chapters and applicable state
        and federal regulations.
        <Cite n={5} />
      </p>

      <p>
        It is not the same as an FDA inspection, and it does not
        substitute for cGMP, but it is one of the few external
        signals available to a patient or prescriber that a 503A
        pharmacy operates above the regulatory floor. PCAB
        accreditation status is publicly searchable through the
        ACHC directory; a pharmacy that claims accreditation but
        does not appear in the directory is a red flag, and a
        pharmacy that has never sought accreditation is not
        necessarily bad but is also not externally audited beyond
        what its state board requires. For a high-volume product
        like compounded semaglutide, where quality variability has
        real clinical stakes, PCAB accreditation is the single
        easiest filter a patient can apply.
      </p>

      <h2>Real-world quality concerns</h2>

      <p>
        The FDA&apos;s Adverse Event Reporting System has logged a
        meaningful number of reports tied to compounded GLP-1s
        since the category became mainstream. The agency&apos;s
        public statements on the topic identify a handful of
        recurring issues: overdose events traced to confusion
        between micrograms and milligrams in compounded
        formulations (semaglutide is dosed in fractions of a
        milligram, and a tenfold mislabeling error is functionally
        a tenfold overdose); adverse events tied to non-base salt
        forms whose pharmacokinetics are not fully characterized;
        contamination events in pharmacies that cut corners on USP
        &lt;797&gt; aseptic technique; and potency variability in
        which finished vials assayed substantially below or above
        label claim.
        <Cite n={8} />
      </p>

      <p>
        The right way to read these reports is neither
        &ldquo;compounded GLP-1s are reckless&rdquo; nor
        &ldquo;everything is fine.&rdquo; The base rate of
        catastrophic adverse events from any reputable
        PCAB-accredited compounder is quite low, and the bulk of
        the reported overdoses trace to a handful of pharmacies
        with documented quality system failures and to telehealth
        intermediaries that pushed do-it-yourself dosing
        instructions onto patients without adequate guardrails.
        The variance across compounders is the actual story
        &mdash; the ceiling is reasonable, the floor is not, and
        which one a patient gets depends on the specific pharmacy
        their telehealth provider contracts with.
        <Cite n={7} />
      </p>

      <p>
        Pharmacy professional organizations including ASHP and ISMP
        have published guidance specifically flagging compounded
        GLP-1s as a high-alert medication category, primarily
        because of the dosing-error risk and the absence of
        manufacturer-grade labeling on most compounded vials. The
        guidance recommends that prescribers and pharmacies treat
        compounded semaglutide with the same caution applied to
        insulin and chemotherapy &mdash; double-check dose
        calculations, verify patient understanding of the
        injection volume, and avoid handing off
        dose-conversion math to patients without supervision.
        <Cite n={9} />
      </p>

      <h2>What a careful patient should ask</h2>

      <p>
        For a patient who has decided that compounded semaglutide
        is the right call &mdash; whether for cost, access, or
        flexibility reasons &mdash; the questions worth getting
        clear answers to before the first injection are concrete
        and answerable. None of them require a pharmacology
        degree, and none of them are unreasonable for a telehealth
        provider to address in writing.
      </p>

      <ol>
        <li>
          <strong>Which pharmacy fills the prescription, and is it a
          503A or a 503B facility?</strong> The answer should be a
          specific pharmacy name. &ldquo;Our network of partner
          pharmacies&rdquo; is not an answer. If the provider
          can&apos;t or won&apos;t name the source, that is a
          meaningful signal.
        </li>
        <li>
          <strong>Is the pharmacy PCAB accredited?</strong> Verify
          the answer independently in the ACHC directory rather
          than taking the marketing copy at face value.
        </li>
        <li>
          <strong>What salt form of semaglutide is used?</strong>{" "}
          Semaglutide base is the form used in Wegovy and Ozempic.
          Semaglutide sodium and semaglutide acetate are the
          alternative forms the FDA has flagged. There is no
          shame in either answer, but a provider unwilling to
          state which form they sell is a problem.
        </li>
        <li>
          <strong>Does the pharmacy provide a certificate of
          analysis on each batch?</strong> A reputable compounder
          will produce documentation of identity, potency, and
          sterility testing on the specific lot the patient
          receives. Asking for it once is reasonable; being
          refused is informative.
        </li>
        <li>
          <strong>Who calculates the dose, and how?</strong> The
          answer should not be &ldquo;you do, based on the
          instructions on the box.&rdquo; A safer setup involves
          a clinician confirming the injection volume in writing
          and the pharmacy labeling each vial with the
          milligrams-per-milliliter concentration in plain
          language.
        </li>
      </ol>

      <p>
        The compounded semaglutide market is going to keep
        existing for the foreseeable future, regardless of where
        the FDA drug shortage list lands and regardless of which
        legal theories survive Novo Nordisk&apos;s ongoing
        lawsuits against the largest telehealth players. The
        category isn&apos;t going away because the underlying
        access and cost problems with brand-name GLP-1s
        haven&apos;t gone away. The right response from a
        consumer-protection standpoint isn&apos;t to pretend the
        product doesn&apos;t exist or to assume it&apos;s
        uniformly dangerous &mdash; it&apos;s to ask the small
        number of questions that separate the responsible end of
        the market from the careless end. The information is
        available; the gap is between patients knowing they have
        the right to ask and providers being willing to answer
        plainly.
      </p>

      <h2>Related research</h2>

      <p>
        For the regulatory and market context behind the
        bioequivalence question:
      </p>

      <ul>
        <li>
          <Link href="/research/fda-warning-letters-glp1">
            FDA warning letters to compounded GLP-1 telehealth
            providers
          </Link>{" "}
          — every letter we&apos;ve verified, with the violation
          patterns FDA is actually citing in 2025-2026 enforcement
          actions, including the salt-form sourcing issue
          discussed above.
        </li>
        <li>
          <Link href="/research/cheapest-compounded-semaglutide">
            Is $99 compounded semaglutide real?
          </Link>{" "}
          — verification of the floor-price providers we track
          against our pharmacy database, including which
          compounders have transparent pharmacy partner disclosures.
        </li>
        <li>
          <Link href="/research/wegovy-pen-vs-compounded-vial-practical-differences">
            Wegovy pen vs compounded vial: 12 operational
            differences
          </Link>{" "}
          — the practical patient-experience side of the same
          choice this article addresses scientifically.
        </li>
        <li>
          <Link href="/research/pcab-accreditation-compounding-pharmacy-investigation">
            PCAB accreditation investigation
          </Link>{" "}
          — the voluntary quality framework used to filter the
          503A pharmacies most likely to produce bioequivalent
          preparations.
        </li>
        <li>
          <Link href="/research/where-to-buy-semaglutide">
            Where to buy semaglutide
          </Link>{" "}
          — the sourcing decision framework that uses the
          bioequivalence findings above as one input.
        </li>
      </ul>

      <References
        items={[
          {
            authors: "U.S. Food and Drug Administration.",
            title:
              "Compounding and the FDA: Questions and Answers.",
            source: "FDA.gov",
            year: 2024,
            url: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
          },
          {
            authors: "U.S. Food and Drug Administration.",
            title:
              "FDA Drug Shortages: Semaglutide Injection.",
            source: "FDA Drug Shortages Database",
            year: 2025,
            url: "https://www.accessdata.fda.gov/scripts/drugshortages/dsp_ActiveIngredientDetails.cfm?AI=Semaglutide+Injection",
          },
          {
            authors: "U.S. Congress.",
            title:
              "Federal Food, Drug, and Cosmetic Act, Sections 503A, 503B, and 506E.",
            source: "21 U.S.C. §§ 353a, 353b, 356e",
            year: 2013,
            url: "https://www.fda.gov/drugs/human-drug-compounding/section-503a-federal-food-drug-and-cosmetic-act",
          },
          {
            authors: "United States Pharmacopeia.",
            title:
              "USP General Chapter <797> Pharmaceutical Compounding — Sterile Preparations.",
            source: "United States Pharmacopeia",
            year: 2023,
            url: "https://www.usp.org/compounding/general-chapter-797",
          },
          {
            authors:
              "Accreditation Commission for Health Care (ACHC/PCAB).",
            title:
              "Pharmacy Compounding Accreditation Board Standards.",
            source: "ACHC",
            year: 2024,
            url: "https://www.achc.org/pharmacy/",
          },
          {
            authors: "U.S. Food and Drug Administration.",
            title:
              "FDA's Concerns with Unapproved GLP-1 Drugs Used for Weight Loss (including statements on semaglutide salt forms).",
            source:
              "FDA Drug Safety and Availability",
            year: 2024,
            url: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
          },
          {
            authors: "Whitley HP, Trujillo JM, Neumiller JJ.",
            title:
              "Special Report: Potential Strategies for Addressing GLP-1 Receptor Agonist Shortages.",
            source: "Clin Diabetes",
            year: 2023,
            pmid: "37456095",
          },
          {
            authors: "U.S. Food and Drug Administration.",
            title:
              "FDA Alerts Health Care Providers, Compounders and Patients of Dosing Errors Associated with Compounded Injectable Semaglutide Products.",
            source:
              "FDA Center for Drug Evaluation and Research / FAERS",
            year: 2024,
            url: "https://www.fda.gov/drugs/human-drug-compounding/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
          },
          {
            authors:
              "American Society of Health-System Pharmacists / Institute for Safe Medication Practices.",
            title:
              "ISMP List of High-Alert Medications in Acute Care Settings, Including Compounded GLP-1 Receptor Agonists.",
            source: "ISMP",
            year: 2024,
            url: "https://www.ismp.org/recommendations/high-alert-medications-acute-list",
          },
        ]}
      />
      <FaqSchema
        items={[
          {
            question: "Is compounded semaglutide the same as Wegovy?",
            answer:
              "Same active ingredient (semaglutide) but produced by different manufacturers under different regulatory frameworks. Brand-name Wegovy is FDA-approved with rigorous purity, potency, and stability testing. Compounded semaglutide is produced by 503A or 503B compounding pharmacies under more limited oversight. There are no head-to-head bioequivalence studies between brand and compounded semaglutide.",
          },
          {
            question: "Is compounded semaglutide as effective as Wegovy?",
            answer:
              "Probably similar in patients receiving correctly-dosed, high-quality compounded product, but there is no rigorous head-to-head evidence proving bioequivalence. The clinical effectiveness depends on the API source quality, the compounding pharmacy's processes, and dosing accuracy. Patient reports range from 'identical experience' to 'noticeably different,' which is consistent with variable quality across the 503A pharmacy market.",
          },
          {
            question: "Is compounded semaglutide FDA-approved?",
            answer:
              "No. Compounded semaglutide is NOT FDA-approved. Compounding pharmacies are regulated under sections 503A (state-licensed) and 503B (federal outsourcing facilities), but the compounded products themselves do not undergo FDA pre-market review for efficacy, safety, or quality. As of February 2025, FDA enforcement discretion for compounded semaglutide ended, with grace periods through April 2025 for 503A and May 2025 for 503B.",
          },
          {
            question: "How do I know if my compounded semaglutide is high quality?",
            answer:
              "Look for: (1) PCAB accreditation of the compounding pharmacy, (2) third-party purity and potency testing certificates, (3) clear labeling with concentration in mg/mL, (4) appropriate refrigerated storage and shipping, (5) disclosed lot numbers and beyond-use dates. Avoid pharmacies that won't disclose where they source the API, won't share testing results, or that ship at room temperature. See our PCAB accreditation investigation for the vetting framework.",
          },
          {
            question: "Are compounded semaglutide and tirzepatide legal in 2026?",
            answer:
              "The legal landscape is unsettled. After February 2025 (tirzepatide) and April 2025 (semaglutide), FDA enforcement discretion for routine compounding ended. 503A pharmacies can still compound for individual patients with specific clinical needs (e.g., documented allergy to brand-name inactive ingredients), but routine compounding for patients who could use the brand-name product is no longer protected. Some pharmacies continue compounding under various interpretations of the law; this is an active enforcement area.",
          },
        ]}
      />
    </ResearchArticleLayout>
  );
}
