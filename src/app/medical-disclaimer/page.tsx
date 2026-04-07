import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Weight Loss Rankings",
  description:
    "Weight Loss Rankings publishes educational research about GLP-1 weight-loss medications. We are not a healthcare provider and our content is not medical advice. Read the full disclaimer for what our content is, what it is not, and when to call your prescriber or 911.",
  alternates: { canonical: "/medical-disclaimer" },
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary mb-6">
        Medical Disclaimer
      </h1>

      <p className="text-sm text-brand-text-secondary mb-8">
        Last updated: April 7, 2026
      </p>

      <div className="space-y-5 text-brand-text-secondary leading-relaxed">
        <p>
          <strong className="text-brand-text-primary">
            Weight Loss Rankings is an educational publisher, not a healthcare
            provider.
          </strong>{" "}
          The content on WeightLossRankings.org — including our research
          articles, drug interaction checker, BMI calculator, weight loss
          calculator, dose plotters, savings calculators, washout calculator,
          provider directories, and any other tool or page on this site — is
          published for general educational and informational purposes only. It
          is not, and should not be treated as, medical advice, a medical
          diagnosis, a treatment recommendation, or a substitute for the
          professional judgment of a qualified healthcare provider.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          Always consult a qualified healthcare provider
        </h2>
        <p>
          Always seek the advice of your physician, nurse practitioner,
          physician assistant, pharmacist, or other qualified healthcare
          provider with any questions you may have regarding a medical
          condition, a medication, a dose, an interaction, a side effect, or
          any decision to start, stop, switch, or modify a treatment. Never
          disregard professional medical advice or delay seeking it because
          of something you have read on Weight Loss Rankings.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          In case of a medical emergency, call 911
        </h2>
        <p>
          If you are experiencing a medical emergency — including but not
          limited to severe abdominal pain, persistent vomiting, signs of
          dehydration, signs of a severe allergic reaction, signs of
          pancreatitis, severe hypoglycemia, sudden vision changes, chest
          pain, difficulty breathing, or any other acute medical concern —
          call 911 or go to your nearest emergency department immediately. Do
          not use Weight Loss Rankings to diagnose or self-manage an acute
          medical situation.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          We are not your prescriber, your pharmacy, or your telehealth provider
        </h2>
        <p>
          Weight Loss Rankings does not write prescriptions, dispense
          medication, conduct clinical examinations, deliver telehealth
          services, or establish a doctor-patient relationship of any kind
          with our readers. Use of this website does not create a healthcare
          provider-patient relationship between you and Weight Loss Rankings,
          its writers, its editors, or its operators. The provider directories
          and ranked lists we publish are independent reviews; we link to
          third-party providers but do not vouch for the medical care those
          providers deliver. Verify any provider directly before signing up.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          Drug information is sourced from FDA labels and PubMed
        </h2>
        <p>
          The clinical claims, trial data, dose information, side effect
          rates, and drug interaction entries on this site are sourced from
          the FDA-approved prescribing information (the official label) for
          each drug, the published peer-reviewed clinical trial literature
          (NEJM, JAMA, Lancet, BMJ, etc.), the Pharmacovigilance Risk
          Assessment Committee of the European Medicines Agency, the American
          Society of Anesthesiologists, the American Diabetes Association,
          the Obesity Medicine Association, and other recognized clinical
          authorities. Where we cite a number, we cite the source. We
          intentionally avoid anecdotal or unverified claims as the basis for
          clinical content.
        </p>
        <p>
          Even with rigorous sourcing, our content may contain errors,
          omissions, or out-of-date information. Drug labels are updated
          frequently. Trial data is reanalyzed and republished. New side
          effect signals emerge. New drugs receive approval (such as the
          April 2026 Foundayo / orforglipron approval). We update our
          content as we become aware of changes, but we cannot guarantee
          that every page is current as of the moment you read it. Always
          confirm clinically meaningful information with the most recent
          FDA-approved prescribing information for the drug in question and
          with your prescribing clinician.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          Individual outcomes vary
        </h2>
        <p>
          The trial-reported weight loss percentages, side effect rates,
          half-lives, blood pressure changes, and other clinical figures we
          cite are <em>population means</em> from the registration trials.
          Individual patient outcomes vary substantially based on starting
          weight, age, sex, body composition, comorbidities, concurrent
          medications, dose, adherence, lifestyle, genetics, and many other
          factors. The fact that the average STEP-1 patient lost 14.9% of
          body weight on semaglutide 2.4 mg (or that the average SURMOUNT-1
          patient lost 20.9% on tirzepatide 15 mg, or that the average
          ATTAIN-1 patient lost 11.1% at the labeled 17.2 mg dose of
          orforglipron) does not mean that you will. Roughly 10-15% of trial
          participants lost less than 5% even at the maintenance dose, and
          another 10-15% lost considerably more. Our weight loss calculator,
          BMI calculator, and other prediction tools are educational
          extrapolations of trial data — they are not personalized medical
          predictions.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          Pricing and availability change frequently
        </h2>
        <p>
          The pricing tiers, savings card amounts, formulary inclusion,
          insurance coverage, and provider availability we publish are
          accurate as of the publication date stated on each page. The GLP-1
          market is unusually volatile — manufacturer programs change,
          insurance formularies update annually or more frequently,
          compounded telehealth providers come and go, and FDA shortage
          status flips. Always verify current pricing and availability
          directly with the provider, pharmacy, or insurer before signing up
          or paying.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          Drug interactions, contraindications, and warnings
        </h2>
        <p>
          Our GLP-1 drug interaction checker and our research articles
          discuss known interactions, contraindications, and warnings sourced
          from the FDA-approved prescribing information. <strong>This is not
          an exhaustive interaction database</strong> and is not a substitute
          for the real-time drug interaction checking your pharmacist
          performs when you fill a prescription. Always tell every
          prescriber and every pharmacist about every medication, supplement,
          and over-the-counter product you take, and confirm any specific
          interaction with them before starting or stopping anything.
        </p>
        <p>
          The boxed warnings, contraindications, and clinically significant
          warnings that apply to GLP-1 receptor agonists include but are not
          limited to: medullary thyroid carcinoma (MTC) and multiple
          endocrine neoplasia syndrome type 2 (MEN2), acute pancreatitis,
          acute kidney injury, hypoglycemia (especially in combination with
          insulin or sulfonylureas), gallbladder disease, diabetic
          retinopathy complications in patients with type 2 diabetes,
          hypersensitivity reactions, and pulmonary aspiration risk under
          general anesthesia. Read the actual FDA-approved prescribing
          information for the specific drug you have been prescribed and
          discuss every concern with your prescribing clinician.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          Pregnancy, breastfeeding, and reproductive health
        </h2>
        <p>
          GLP-1 receptor agonists are generally not recommended during
          pregnancy or breastfeeding, and the Wegovy prescribing information
          recommends discontinuing semaglutide at least two months before a
          planned pregnancy. If you are pregnant, breastfeeding, planning to
          become pregnant, or could become pregnant, do not start, continue,
          or stop a GLP-1 based on anything you read on Weight Loss Rankings
          — discuss the decision with your obstetrician, your endocrinologist
          if applicable, and your prescribing clinician.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          No off-label or non-FDA-approved-use guidance
        </h2>
        <p>
          We do not recommend, endorse, or instruct on off-label dosing,
          microdosing, splitting weekly doses, combining medications outside
          of FDA-approved indications, or any use of GLP-1 receptor agonists
          that is inconsistent with the FDA-approved prescribing
          information. Where we discuss off-label practices in our articles
          (such as the tirzepatide microdosing evidence guide or the
          phentermine-plus-GLP-1 combination article), we do so as
          educational summaries of what the published evidence shows and
          what some prescribers do — not as recommendations. Off-label
          decisions are between you and a qualified prescriber, not between
          you and a website.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          Affiliate relationships
        </h2>
        <p>
          Weight Loss Rankings is reader-supported. When you click on a
          provider link from our site and sign up or make a purchase, we may
          receive a commission at no additional cost to you. We disclose
          these relationships on every relevant page. Affiliate compensation
          does not influence our editorial process, our trial-data citations,
          our drug interaction database, our safety warnings, or our ranked
          provider lists. See our{" "}
          <Link href="/disclosure" className="text-brand-violet hover:underline">
            full affiliate disclosure
          </Link>{" "}
          and our{" "}
          <Link
            href="/nature-of-reviews"
            className="text-brand-violet hover:underline"
          >
            nature-of-reviews methodology
          </Link>{" "}
          for the full editorial framework.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          Limitation of liability
        </h2>
        <p>
          To the fullest extent permitted by law, Weight Loss Rankings, its
          operators, its writers, its editors, and its affiliates disclaim
          all warranties — express or implied — relating to the content on
          this website, including but not limited to warranties of accuracy,
          completeness, fitness for a particular purpose, and
          non-infringement. We are not liable for any harm, injury, loss,
          damage, or adverse outcome arising from your use of, reliance on,
          or inability to use the content on this website. Your use of this
          website constitutes your acknowledgment and acceptance of this
          disclaimer.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          Reporting an error
        </h2>
        <p>
          We take YMYL accuracy seriously. If you believe a clinical claim,
          a trial number, a drug interaction entry, a dose, a price, or any
          other piece of information on Weight Loss Rankings is incorrect or
          out of date, please contact us via our{" "}
          <Link href="/contact" className="text-brand-violet hover:underline">
            contact page
          </Link>{" "}
          and we will review and correct it. Please include the URL of the
          page, the specific claim in question, and the source you believe is
          authoritative for the correction.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary mt-8">
          Acceptance
        </h2>
        <p>
          By using WeightLossRankings.org, you acknowledge that you have
          read, understood, and agreed to this Medical Disclaimer in
          addition to our{" "}
          <Link href="/terms" className="text-brand-violet hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand-violet hover:underline">
            Privacy Policy
          </Link>
          . If you do not agree with any portion of this disclaimer, please
          do not use this website.
        </p>
      </div>
    </div>
  );
}
