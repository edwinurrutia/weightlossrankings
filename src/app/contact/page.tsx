import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with WeightLossRankings. Email us for general inquiries, provider corrections, press, partnerships, or privacy requests.",
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
};

const contactCards = [
  {
    heading: "General inquiries",
    description:
      "Questions about the site, a provider, or anything else we cover.",
    email: "hello@weightlossrankings.org",
    subject: "General inquiry",
  },
  {
    heading: "Provider corrections / data updates",
    description:
      "Spotted an out-of-date price, a missing provider, or an inaccurate review?",
    email: "hello@weightlossrankings.org",
    subject: "Provider Correction",
  },
  {
    heading: "Press / Media",
    description:
      "Working on a story? We're happy to share data, sources, and commentary.",
    email: "hello@weightlossrankings.org",
    subject: "Press",
  },
  {
    heading: "Advertising / Partnerships",
    description: (
      <>
        Interested in working with us? See our{" "}
        <Link href="/advertise" className="text-brand-violet underline">
          advertise
        </Link>{" "}
        page first.
      </>
    ),
    email: "hello@weightlossrankings.org",
    subject: "Partnership",
  },
  {
    heading: "Privacy / Data requests",
    description: (
      <>
        CCPA, GDPR, or general privacy questions. See our{" "}
        <Link href="/privacy" className="text-brand-violet underline">
          Privacy Policy
        </Link>
        .
      </>
    ),
    email: "privacy@weightlossrankings.org",
    subject: "Privacy Request",
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
          Please use the address that best fits your question — it helps the
          right message reach the right inbox faster.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        {contactCards.map((card) => (
          <div
            key={card.heading}
            className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-brand-violet/40 transition"
          >
            <h2 className="font-heading text-lg font-bold text-brand-text-primary mb-1">
              {card.heading}
            </h2>
            <p className="text-sm text-brand-text-secondary mb-3 leading-relaxed">
              {card.description}
            </p>
            <a
              href={`mailto:${card.email}?subject=${encodeURIComponent(
                card.subject,
              )}`}
              className="text-sm font-semibold text-brand-violet underline break-all"
            >
              {card.email}
            </a>
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 mb-12">
        <h2 className="font-heading text-2xl font-bold text-brand-text-primary mb-2">
          Send us a message
        </h2>
        <p className="text-sm text-brand-text-secondary mb-6">
          Prefer a form? Fill this out and your default email client will
          open with the message pre-filled.
        </p>
        <form
          action="mailto:hello@weightlossrankings.org"
          method="post"
          encType="text/plain"
          className="grid gap-4 sm:grid-cols-2"
        >
          <label className="text-sm font-medium text-brand-text-primary">
            Name
            <input
              type="text"
              name="Name"
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
            />
          </label>
          <label className="text-sm font-medium text-brand-text-primary">
            Email
            <input
              type="email"
              name="Email"
              required
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
            />
          </label>
          <label className="text-sm font-medium text-brand-text-primary sm:col-span-2">
            Subject
            <select
              name="Subject"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
              defaultValue="General inquiry"
            >
              <option>General inquiry</option>
              <option>Provider Correction</option>
              <option>Press</option>
              <option>Partnership</option>
              <option>Privacy Request</option>
              <option>Other</option>
            </select>
          </label>
          <label className="text-sm font-medium text-brand-text-primary sm:col-span-2">
            Message
            <textarea
              name="Message"
              required
              rows={6}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/20"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center rounded-xl bg-brand-violet px-6 py-3 text-white font-semibold hover:bg-brand-violet/90 transition"
            >
              Open in email client
            </button>
            <p className="text-xs text-brand-text-secondary/70 mt-3">
              If nothing happens when you click, your browser may not have a
              default email client configured. In that case, email{" "}
              <a
                href="mailto:hello@weightlossrankings.org"
                className="text-brand-violet underline"
              >
                hello@weightlossrankings.org
              </a>{" "}
              directly.
            </p>
          </div>
        </form>
      </section>

      <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6 sm:p-8 mb-12">
        <h2 className="font-heading text-xl font-bold text-brand-text-primary mb-2">
          What we can&apos;t do
        </h2>
        <p className="text-sm text-brand-text-secondary leading-relaxed">
          WeightLossRankings is an independent publisher, not a medical
          provider. We cannot provide medical advice, review your symptoms,
          prescribe medications, fill prescriptions, or help with insurance
          disputes. For medical questions please contact a licensed
          healthcare provider. For issues with a specific telehealth
          company, please contact that company&apos;s support team directly
          — we cannot intervene on your behalf.
        </p>
      </section>

      <section className="text-sm text-brand-text-secondary/70">
        <h2 className="font-heading text-base font-semibold text-brand-text-primary mb-1">
          Mailing address
        </h2>
        <p>
          WeightLossRankings.org
          <br />
          Correspondence via email preferred.
        </p>
      </section>
    </div>
  );
}
