import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How WeightLossRankings.org collects, uses, and protects your personal information, including our GDPR and CCPA practices.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-brand-text-secondary/70 mb-8">
        Effective date: April 6, 2026
      </p>

      <div className="space-y-6 text-brand-text-secondary leading-relaxed">
        <p>
          WeightLossRankings.org (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) is owned and operated by{" "}
          <strong className="text-brand-text-primary">MEAS Partners, LLC</strong>,
          a Delaware limited liability company with a registered address at
          131 Continental Dr, Suite 305, Newark, DE 19713. We respect your privacy.
          This Privacy Policy explains what information we collect when you
          visit our website, how we use that information, who we share it
          with, and the rights you have over your personal data. By using
          the Site you consent to the practices described here. If you do
          not agree, please do not use the Site.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          1. Information We Collect
        </h2>
        <p>
          We collect only the data we need to operate and improve our
          comparison service. Specifically:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-brand-text-primary">
              Information you provide directly.
            </strong>{" "}
            When you subscribe to our newsletter, send us a message, or submit
            a provider correction, we collect your email address, any name you
            choose to share, and the contents of your message.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Automatically collected information.
            </strong>{" "}
            When you browse the Site, our servers and analytics tools
            automatically collect standard web log data: IP address,
            approximate location derived from IP, browser type and version,
            operating system, referring and exit pages, pages viewed, time on
            page, and the date and time of your visit.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Cookies and similar technologies.
            </strong>{" "}
            We and our third-party partners use cookies, pixel tags, local
            storage, and similar technologies to remember your preferences,
            measure traffic, understand how readers interact with our content,
            and attribute outbound clicks to affiliate partners.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Click and conversion data.
            </strong>{" "}
            When you click an outbound affiliate link, we may record that
            click (and, if the partner reports it, the resulting conversion)
            so we can understand which reviews are helpful and report accurate
            analytics to our partners.
          </li>
        </ul>
        <p>
          We do not ask for, collect, or store sensitive health information
          such as diagnoses, prescriptions, lab results, body weight, or
          insurance member IDs. Any calculators on the Site (for example, the
          Savings Calculator) run in your browser, and the values you enter
          are not transmitted to us or stored on our servers unless we
          explicitly say so.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          2. How We Use Your Information
        </h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Operate, maintain, and secure the Site;</li>
          <li>
            Send our email newsletter and reply to questions you send us;
          </li>
          <li>
            Understand which pages, reviews, and tools are useful to readers
            so we can improve the Site;
          </li>
          <li>
            Attribute outbound affiliate clicks and report aggregate traffic
            to our partners;
          </li>
          <li>
            Prevent fraud, abuse, and security incidents and enforce our
            Terms of Service; and
          </li>
          <li>Comply with applicable legal obligations.</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          3. Cookies and Tracking Technologies
        </h2>
        <p>
          The Site uses a small number of cookies and tracking technologies:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-brand-text-primary">
              Analytics cookies.
            </strong>{" "}
            We use Google Analytics to measure traffic and understand reader
            behavior in aggregate. Google Analytics sets its own cookies and
            collects data governed by{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-brand-violet underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s Privacy Policy
            </a>
            . You can opt out of Google Analytics using Google&apos;s{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              className="text-brand-violet underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              browser add-on
            </a>
            .
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Affiliate tracking pixels.
            </strong>{" "}
            Some of our affiliate partners use pixels and first-party cookies
            to attribute conversions. These are set when you click an
            affiliate link and leave our Site.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Functional storage.
            </strong>{" "}
            We use local storage and Vercel KV to remember small preferences
            (for example, which comparison filters you applied) and to
            deduplicate outbound-click counts.
          </li>
        </ul>
        <p>
          You can disable cookies in your browser settings, but parts of the
          Site may not work as intended.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          4. Third Parties We Share Data With
        </h2>
        <p>
          We do not sell your personal information. We share limited data
          only with service providers who help us operate the Site:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-brand-text-primary">
              Email service provider (Kit / ConvertKit).
            </strong>{" "}
            When you subscribe to our newsletter, your email address and
            subscription preferences are stored with Kit so we can send you
            emails.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Analytics (Google Analytics).
            </strong>{" "}
            Pseudonymous traffic data is processed by Google to help us
            understand site usage.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Hosting and infrastructure (Vercel).
            </strong>{" "}
            Our site is hosted on Vercel, which processes server logs and
            stores some operational data on our behalf.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Affiliate networks and partners.
            </strong>{" "}
            When you click an outbound affiliate link, the destination
            partner and its tracking network will receive referral data. They
            do not receive any information you provided directly to us.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Legal and safety.
            </strong>{" "}
            We may share information when legally required (for example, in
            response to a valid subpoena) or when necessary to protect the
            rights, property, or safety of our readers or the public.
          </li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          5. Your Rights
        </h2>
        <p>
          Regardless of where you live, you may contact us at{" "}
          <a
            href="mailto:privacy@weightlossrankings.org"
            className="text-brand-violet underline"
          >
            privacy@weightlossrankings.org
          </a>{" "}
          to ask what personal information we hold about you, request that we
          correct or delete it, unsubscribe from our newsletter, or opt out
          of analytics. We aim to respond to verifiable requests within 30
          days.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          6. California Residents (CCPA / CPRA)
        </h2>
        <p>
          If you are a California resident, the California Consumer Privacy
          Act and California Privacy Rights Act give you the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Know what personal information we have collected about you and
            how we use it;
          </li>
          <li>Request deletion of your personal information;</li>
          <li>
            Correct inaccurate personal information we maintain about you;
          </li>
          <li>
            Opt out of the &quot;sale&quot; or &quot;sharing&quot; of your
            personal information;
          </li>
          <li>
            Exercise these rights without being discriminated against for
            doing so.
          </li>
        </ul>
        <p>
          <strong className="text-brand-text-primary">
            We do not sell personal information
          </strong>{" "}
          as that term is defined under the CCPA, and we do not knowingly
          share personal information of minors under 16 for cross-context
          behavioral advertising. To exercise any of the above rights, email{" "}
          <a
            href="mailto:privacy@weightlossrankings.org"
            className="text-brand-violet underline"
          >
            privacy@weightlossrankings.org
          </a>{" "}
          with &quot;California Privacy Request&quot; in the subject line.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          7. EU / UK Residents (GDPR)
        </h2>
        <p>
          If you are located in the European Economic Area, the United
          Kingdom, or Switzerland, the General Data Protection Regulation
          gives you the rights of access, rectification, erasure, restriction
          of processing, data portability, and objection. You also have the
          right to lodge a complaint with your local data protection
          authority.
        </p>
        <p>
          The legal bases on which we process your personal data are: (a)
          your <strong>consent</strong> for newsletter subscriptions and
          non-essential cookies, which you can withdraw at any time; (b) our{" "}
          <strong>legitimate interests</strong> in operating and improving a
          secure, high-quality comparison site, which includes aggregate
          analytics and affiliate-click attribution; and (c) compliance with
          a <strong>legal obligation</strong> where required.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          8. Children&apos;s Privacy
        </h2>
        <p>
          The Site is intended for adults and is not directed to children
          under 13. In line with the Children&apos;s Online Privacy
          Protection Act (COPPA), we do not knowingly collect personal
          information from children under 13. If you believe a child has
          provided us with personal information, please contact us and we
          will delete it promptly.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          9. Data Retention
        </h2>
        <p>
          We retain personal data only for as long as needed for the purposes
          described in this policy. Newsletter subscriber data is retained
          until you unsubscribe and then purged from active lists. Google
          Analytics data is retained for up to 26 months. Server logs are
          typically rotated within 30 to 90 days. Correspondence sent to our
          contact addresses is retained as long as reasonably necessary to
          respond and for a reasonable period afterward for reference.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          10. Security
        </h2>
        <p>
          We use industry-standard technical and organizational safeguards —
          including HTTPS encryption in transit, access controls, and
          reputable hosting providers — to protect the information we
          collect. However, no method of transmission or storage is 100%
          secure, and we cannot guarantee absolute security. Please use
          strong passwords and keep your devices up to date.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          11. International Data Transfers
        </h2>
        <p>
          We are based in the United States, and the service providers we
          use may process data in the United States and other countries.
          Where required by law, we rely on appropriate safeguards such as
          standard contractual clauses for international data transfers.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          12. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. When we do,
          we will revise the &quot;Effective date&quot; at the top of the
          page. For material changes, we will take reasonable steps to
          notify users (for example, by posting a notice on the Site or
          emailing newsletter subscribers). Your continued use of the Site
          after the changes become effective constitutes acceptance of the
          updated policy.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          13. Contact
        </h2>
        <p>
          For privacy questions, requests, or complaints, please email{" "}
          <a
            href="mailto:hello@weightlossrankings.org"
            className="text-brand-violet underline"
          >
            hello@weightlossrankings.org
          </a>{" "}
          or write to us at the address below. See also our{" "}
          <Link href="/terms" className="text-brand-violet underline">
            Terms of Service
          </Link>
          .
        </p>
        <address className="not-italic rounded-2xl bg-brand-violet/5 border border-brand-violet/10 p-5 text-sm">
          <strong className="text-brand-text-primary">MEAS Partners, LLC</strong><br />
          Attn: Privacy<br />
          131 Continental Dr, Suite 305<br />
          Newark, DE 19713<br />
          United States<br />
          <a href="mailto:hello@weightlossrankings.org" className="text-brand-violet underline">hello@weightlossrankings.org</a>
        </address>
      </div>
    </div>
  );
}
