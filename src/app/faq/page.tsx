import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/marketing/FAQSection";
import SourcesPanel from "@/components/research/SourcesPanel";
import { getLatestVerificationDate } from "@/lib/pricing-analytics";

// Central-registry source ids backing the clinical / regulatory / insurance
// answers in the FAQ below. Ordered for readability in the SourcesPanel.
const FAQ_SOURCE_IDS = [
  "step1-nejm-2021",                    // semaglutide pivotal
  "surmount1-nejm-2022",                // tirzepatide pivotal
  "surmount5-nejm-2025",                // head-to-head sema vs tirz
  "fda-wegovy-approval",                // Wegovy approval
  "fda-zepbound-approval",              // Zepbound approval
  "fda-ozempic-label",                  // Ozempic label (diabetes only)
  "fda-mounjaro-label",                 // Mounjaro label (diabetes only)
  "fda-503a-compounding",               // 503A compounding rules
  "fda-drug-shortage-list",             // shortage-based compounding legality
  "cms-medicare-part-d",                // Medicare Part D exclusion
  "kff-medicaid-obesity-drug-coverage", // Medicaid coverage context
  "irs-pub-502-medical-expenses",       // FSA/HSA eligibility
];

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Weight Loss Rankings, GLP-1 medications like semaglutide and tirzepatide, choosing a telehealth provider, insurance, and how to use our comparison tools.",
  alternates: { canonical: "/faq" },
  robots: { index: true, follow: true },
};

const aboutFaqs = [
  {
    question: "What is Weight Loss Rankings?",
    answer:
      "WeightLossRankings.org is an independent comparison site for GLP-1 telehealth providers, weight loss programs, and related products. We publish scored rankings, side-by-side comparisons, plain-English drug guides, and tools like our savings calculator and insurance checker. Our goal is to be the most trusted starting point for anyone researching semaglutide, tirzepatide, or a structured weight loss program.",
  },
  {
    question: "Are you a medical provider?",
    answer:
      "No. We are not a doctor, pharmacy, telehealth company, or insurer. We do not prescribe medications, fill prescriptions, diagnose conditions, or establish a doctor-patient relationship with readers. Everything on the site is informational. Always consult a licensed healthcare provider before starting or changing any medication.",
  },
  {
    question: "How do you make money?",
    answer:
      "We are reader-supported through affiliate commissions. When you click a link to a provider on our site and sign up or make a purchase, we may earn a commission at no additional cost to you. These commissions may affect which providers we feature most prominently, but they never affect the scores our algorithm assigns. For full details, see our Affiliate Disclosure.",
  },
  {
    question: "How is your scoring methodology different?",
    answer:
      "We score every provider across six weighted dimensions: value, clinical effectiveness, user experience, safety and compliance, accessibility, and ongoing support. The same algorithm runs on every provider whether or not we have a commercial relationship with them. You can read the full weights and sub-factors on our Methodology page.",
  },
  {
    question: "How do you decide which provider to feature?",
    answer:
      "Two things work in parallel. First, our scoring algorithm runs against every provider we cover — same six weighted dimensions, same formula, regardless of whether we have a commercial relationship with them. That drives the numeric score and the baseline ranking order. Second, placement — featured homepage cards, 'Top Pick' labels, highlighted comparison cards, and blog coverage frequency — can be influenced by commercial relationships, and we label sponsored placements clearly. Put simply: score is independent, placement is not always. For the full breakdown, see our Nature of Reviews & Rankings page at /nature-of-reviews.",
  },
  {
    question: "Who's behind the site?",
    answer:
      "Weight Loss Rankings is an independent comparison site for GLP-1 telehealth providers, compounding pharmacies, and weight loss programs — built to give people structured, honest answers in a market that doesn't offer many. The site is reader-supported through affiliate relationships with some of the providers we cover; editorial decisions and our scoring algorithm are made independently of those commercial relationships. You can read the full story on our About page, and questions can always go to hello@weightlossrankings.org.",
  },
];

const glpFaqs = [
  {
    question: "What are GLP-1 medications?",
    answer:
      "GLP-1 receptor agonists are a class of injectable medications originally developed for type 2 diabetes that also produce significant weight loss. They mimic the hormone glucagon-like peptide-1, which slows gastric emptying, regulates blood sugar, and reduces appetite. The most prescribed GLP-1s for weight loss are semaglutide (Wegovy, Ozempic) and tirzepatide (Zepbound, Mounjaro). Tirzepatide is technically a dual GLP-1/GIP agonist.",
  },
  {
    question: "What's the difference between semaglutide and tirzepatide?",
    answer:
      "Semaglutide (sold as Wegovy and Ozempic) is a single GLP-1 agonist. Tirzepatide (sold as Zepbound and Mounjaro) is a dual GLP-1/GIP agonist, meaning it targets an additional gut hormone receptor. In head-to-head studies, tirzepatide has produced more weight loss on average — roughly 20% of body weight at the highest dose vs. about 15% for semaglutide — but both are highly effective compared to older weight loss drugs. Side effect profiles are broadly similar.",
  },
  {
    question: "Is compounded semaglutide safe?",
    answer:
      "Compounded semaglutide is made by licensed compounding pharmacies and is legal when the branded version is on the FDA shortage list or when it is compounded for an individual patient's needs. Safety depends heavily on the pharmacy: look for 503A or 503B registration, third-party sterility testing, and USP-grade API sourcing. It is not FDA-approved the way Wegovy is, and quality varies. Our provider reviews note which compounding partners each telehealth company uses.",
  },
  {
    question: "How much do GLP-1s cost without insurance?",
    answer:
      "Brand-name Wegovy and Zepbound typically run $1,000-$1,350 per month at list price, though Eli Lilly and Novo Nordisk have direct-pay programs at around $499 for certain doses. Compounded semaglutide from telehealth providers generally ranges from $150-$400 per month, and compounded tirzepatide from roughly $250-$550 per month. See our Price Tracker for current ranges.",
  },
  {
    question: "Are GLP-1s FDA-approved for weight loss?",
    answer:
      "Yes. Semaglutide is FDA-approved for chronic weight management under the brand name Wegovy (Ozempic is approved only for type 2 diabetes). Tirzepatide is approved for weight management under the brand name Zepbound (Mounjaro is the diabetes version). Compounded versions of these molecules are not individually FDA-approved but may be legally dispensed under compounding pharmacy rules.",
  },
];

const providerFaqs = [
  {
    question: "How do I choose a GLP-1 telehealth provider?",
    answer:
      "Start with the basics: is the provider prescribing a real GLP-1 (semaglutide or tirzepatide), is the pharmacy licensed, how much does a full month cost after the introductory period, and is there an async or synchronous visit with a licensed clinician? Our Methodology page walks through the full checklist, and our Best Semaglutide and Best Tirzepatide rankings apply it to every provider we track.",
  },
  {
    question: "What's the difference between brand name and compounded?",
    answer:
      "Brand-name Wegovy, Ozempic, Zepbound, and Mounjaro are manufactured by Novo Nordisk and Eli Lilly and are FDA-approved products with strict quality controls. Compounded semaglutide and tirzepatide are made by compounding pharmacies, usually at significantly lower prices, and are legal while the branded products are in shortage or when prescribed for individualized patient needs. Compounded versions are not FDA-approved as finished products.",
  },
  {
    question: "What should I look for in a provider?",
    answer:
      "Look for: licensed US prescribers in your state, a licensed compounding pharmacy (503A or 503B) or real brand-name supply, transparent pricing with no surprise auto-renewals, dose flexibility, access to a clinician for side effects, clear shipping timelines, and a reasonable cancellation policy. Avoid any provider that prescribes without any medical intake or that ships from unverified international pharmacies.",
  },
  {
    question: "How do I avoid scam providers?",
    answer:
      "Red flags include: no required medical intake, prescriptions issued in minutes without any clinician review, pricing that is dramatically below market rates, claims of 'research-only' peptides being sold for injection, no US pharmacy license listed, no company address, and pressure tactics. Stick to providers with transparent ownership, verified pharmacy partners, and a real clinician on staff. Every provider we rank has been verified against these criteria.",
  },
  {
    question: "Are telehealth GLP-1 prescriptions legal?",
    answer:
      "Yes, telehealth prescribing of GLP-1 medications is legal in all 50 states when done by a clinician licensed in your state and when the prescription is written for a legitimate medical purpose after an appropriate evaluation. Compounded GLP-1s are legal under FDA compounding rules. What is not legal: buying unprescribed 'research' peptides for injection, or obtaining prescriptions without any clinician involvement at all.",
  },
];

const insuranceFaqs = [
  {
    question: "Does insurance cover Wegovy?",
    answer:
      "Coverage is inconsistent. Some commercial plans cover Wegovy for patients who meet BMI criteria, typically with prior authorization. Medicare traditionally did not cover weight loss drugs, though this is slowly changing for cardiovascular risk indications. Medicaid coverage varies by state. Use our Insurance Checker to look up typical coverage by insurer and see sample prior authorization requirements.",
  },
  {
    question: "What if I don't have insurance?",
    answer:
      "You have several options. Novo Nordisk and Eli Lilly offer direct-pay programs (NovoCare and LillyDirect) at around $499 per month for certain doses of Wegovy and Zepbound. Compounded semaglutide and tirzepatide from licensed telehealth providers often run $150-$400 per month. Our Cheapest Semaglutide and Cheapest Tirzepatide rankings are updated weekly.",
  },
  {
    question: "How can I save money on GLP-1s?",
    answer:
      "The biggest savings levers are: (1) switching to a compounded version from a licensed pharmacy, (2) using the manufacturer direct-pay programs for brand-name Wegovy or Zepbound, (3) using manufacturer savings cards if you have commercial insurance, (4) buying multi-month supplies where providers discount them, and (5) using FSA or HSA funds if available. Our Savings Calculator compares all of these side by side.",
  },
  {
    question: "Can I use FSA/HSA?",
    answer:
      "Yes, in most cases. Prescription GLP-1 medications for weight management are FSA- and HSA-eligible when prescribed by a licensed clinician. Most telehealth providers issue receipts compatible with FSA/HSA administrators. Check with your benefits provider on documentation requirements for weight management prescriptions specifically.",
  },
];

const siteFaqs = [
  {
    question: "How do I compare providers?",
    answer:
      "The fastest way is the Compare page, where you can pick any two providers and see price, dose, pharmacy, clinician model, and scoring side by side. You can also browse our Best Of rankings by category or drill into any provider's full review.",
  },
  {
    question: "Why don't you list every provider?",
    answer:
      "We focus on providers that meet our baseline criteria — licensed US prescribers, licensed pharmacy partners, transparent pricing, and verifiable company information. Providers that fail these checks, that we cannot independently verify, or that operate in legal gray areas are intentionally excluded. If you think we've missed a legitimate provider, email hello@weightlossrankings.org.",
  },
  {
    question: "How often do you update prices?",
    answer:
      "Prices in our Price Tracker and provider reviews are reviewed at least weekly for our top providers and at least monthly for every provider on the site. Because telehealth pricing can change abruptly, we always recommend verifying the current price on the provider's own site before signing up.",
  },
  {
    question: "How can I report inaccurate information?",
    answer:
      "Send an email to hello@weightlossrankings.org with 'Provider Correction' in the subject line, include the URL of the page in question, and describe what is incorrect. If you are from the provider in question, please include a link to the official source (pricing page, FAQ, or a pharmacy listing). We aim to review corrections within a few business days.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary mb-3">
        Frequently Asked Questions
      </h1>
      <p className="text-brand-text-secondary leading-relaxed max-w-3xl mb-10">
        Answers to the questions we hear most often about GLP-1 medications,
        choosing a telehealth provider, insurance coverage, and how to use
        WeightLossRankings.org. Can&apos;t find what you&apos;re looking for?
        Email{" "}
        <a
          href="mailto:hello@weightlossrankings.org"
          className="text-brand-violet underline"
        >
          hello@weightlossrankings.org
        </a>
        .
      </p>

      <div className="space-y-12">
        <FAQSection
          id="about-wlr"
          title="About Weight Loss Rankings"
          items={aboutFaqs}
        />
        <FAQSection id="glp-1-meds" title="GLP-1 Medications" items={glpFaqs} />
        <FAQSection
          id="choosing-provider"
          title="Choosing a Provider"
          items={providerFaqs}
        />
        <FAQSection
          id="insurance-cost"
          title="Insurance & Cost"
          items={insuranceFaqs}
        />
        <FAQSection id="using-site" title="Using Our Site" items={siteFaqs} />
      </div>

      {/* Central citation registry — backs every clinical, regulatory, and
          insurance answer in the FAQ sections above. */}
      <div className="mt-14">
        <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-3">
          Sources
        </h2>
        <p className="text-sm text-brand-text-secondary mb-3">
          The clinical, regulatory, and insurance answers above draw from the
          primary sources below. For the complete registry of every citation
          used across the site, see our{" "}
          <Link href="/sources" className="text-brand-violet underline">
            master source list
          </Link>
          .
        </p>
        <SourcesPanel
          sourceIds={FAQ_SOURCE_IDS}
          dataAsOf={getLatestVerificationDate()}
          defaultOpen
        />
      </div>

      <div className="mt-14 rounded-2xl bg-brand-violet/5 border border-brand-violet/20 p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-2">
          Still have questions?
        </h2>
        <p className="text-brand-text-secondary mb-4">
          We respond to most messages within one business day.
        </p>
        <a
          href="mailto:hello@weightlossrankings.org"
          className="inline-flex items-center rounded-xl bg-brand-violet px-6 py-3 text-white font-semibold hover:bg-brand-violet/90 transition"
        >
          Email hello@weightlossrankings.org
        </a>
        <p className="text-sm text-brand-text-secondary/70 mt-4">
          Or visit our{" "}
          <Link href="/contact" className="text-brand-violet underline">
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
