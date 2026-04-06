import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with WeightLossRankings. Email us for general inquiries, provider corrections, press, partnerships, or privacy requests.",
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
};

const CONTACT_EMAIL = "hello@weightlossrankings.org";

const contactCategories = [
  {
    heading: "General inquiries",
    description:
      "Questions about the site, a provider, or anything else we cover.",
  },
  {
    heading: "Provider corrections / data updates",
    description:
      "Spotted an out-of-date price, a missing provider, or an inaccurate review?",
  },
  {
    heading: "Press / Media",
    description:
      "Working on a story? We're happy to share data, sources, and commentary.",
  },
  {
    heading: "Advertising / Partnerships",
    descriptionNode: (
      <>
        Interested in working with us? See our{" "}
        <Link href="/advertise" className="text-brand-violet underline">
          advertise
        </Link>{" "}
        page first.
      </>
    ),
  },
  {
    heading: "Privacy / Data requests",
    descriptionNode: (
      <>
        CCPA, GDPR, or general privacy questions. See our{" "}
        <Link href="/privacy" className="text-brand-violet underline">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
] as const;

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-sm text-brand-text-secondary/70 mb-2">
          Already checked our{" "}
          <Link href="/faq" className="text-brand-violet underline">
            FAQ
          </Link>
          ? Great — most common questions are answered there.
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary mb-3">
          Contact WeightLossRankings
        </h1>
        <p className="text-brand-text-secondary leading-relaxed max-w-3xl">
          We read every message and respond to most within one business day.
          Email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-brand-violet underline"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          or use the form below.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        {contactCategories.map((card) => (
          <div
            key={card.heading}
            className="rounded-2xl border border-gray-200 bg-white p-6"
          >
            <h2 className="font-heading text-lg font-bold text-brand-text-primary mb-2">
              {card.heading}
            </h2>
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              {"descriptionNode" in card
                ? card.descriptionNode
                : card.description}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 mb-12">
        <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-2">
          Send us a message
        </h2>
        <p className="text-sm text-brand-text-secondary mb-6">
          Fill this out and we&apos;ll get back to you within one business day.
        </p>
        <ContactForm />
      </section>

      <section className="rounded-2xl border-l-2 border-brand-violet/40 pl-5 py-3">
        <h2 className="font-heading text-base font-bold text-brand-text-primary mb-2">
          What we can&apos;t do
        </h2>
        <p className="text-sm text-brand-text-secondary leading-relaxed">
          WeightLossRankings is an independent publisher, not a medical
          provider. We cannot provide medical advice, review your symptoms,
          prescribe medications, fill prescriptions, or help with insurance
          disputes. For medical questions please contact a licensed healthcare
          provider. For issues with a specific telehealth company, please
          contact that company&apos;s support team directly — we cannot
          intervene on your behalf.
        </p>
      </section>
    </div>
  );
}
