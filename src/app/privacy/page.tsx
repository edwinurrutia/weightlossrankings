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
        Effective date: April 7, 2026
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
          3. Cookies, Tracking Technologies, and Your Consent Choices
        </h2>
        <p>
          <strong className="text-brand-text-primary">
            Your cookie preferences are under your control.
          </strong>{" "}
          On your first visit to the Site you will see a cookie consent
          banner at the bottom of the page with two choices:{" "}
          <em>Accept all</em> (enables Google Analytics and other
          non-essential tracking described below) or{" "}
          <em>Necessary only</em> (only first-party functional storage
          required to make the Site work — no Google Analytics, no
          analytics cookies). Your decision is stored in your
          browser&apos;s local storage. You can change your choice at
          any time by clearing your browser&apos;s site data for
          weightlossrankings.org, which will cause the consent banner
          to reappear on your next visit.
        </p>
        <p>
          The Site uses a small number of cookies and tracking technologies:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-brand-text-primary">
              Analytics cookies (consent-gated).
            </strong>{" "}
            If — and only if — you select &ldquo;Accept all&rdquo; on
            the consent banner, we load Google Analytics 4 (GA4) to
            measure traffic and understand reader behavior in aggregate.
            GA4 automatically anonymizes IP addresses at collection and
            does not allow us to identify individual visitors. If you
            select &ldquo;Necessary only&rdquo; or make no selection,
            the Google Analytics scripts are not loaded at all and no
            GA cookies are set. Google Analytics is also disabled
            entirely on our admin pages. Data Google does process is
            governed by{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-brand-violet underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s Privacy Policy
            </a>
            . You can also opt out of Google Analytics across all sites
            using Google&apos;s{" "}
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
            When you click an outbound affiliate link and leave our
            Site, the destination partner (and its affiliate network)
            may set its own tracking cookies to attribute the
            conversion. These are first-party cookies of the
            destination site, not ours, and are governed by that
            partner&apos;s privacy policy. We do not set affiliate
            pixels on the Weight Loss Rankings domain itself.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Internal click attribution (no personal data).
            </strong>{" "}
            When you click an outbound affiliate link, we record the
            click on our own servers so we can count which reviews
            help readers most and report aggregate traffic to
            partners. This internal tracking does{" "}
            <strong>not</strong> store your IP address, user agent, or
            any personally identifying data. For daily-unique-visitor
            counting we compute a daily-rotating salted hash of your
            IP address and user agent; the hash is rotated every day
            and the raw values are never written to our database.
            This internal click analytics runs whether or not you
            accept GA cookies — it is a necessary functional system
            for our affiliate reporting and cannot be disabled.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Functional storage.
            </strong>{" "}
            We use your browser&apos;s local storage to remember your
            cookie consent choice, any comparison filters you
            applied, and similar preferences. These do not leave
            your device and are not transmitted to our servers. We
            use Vercel KV on the server side to store the
            deduplicated outbound-click counts described above.
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
              Analytics (Google Analytics 4).
            </strong>{" "}
            If — and only if — you have accepted cookies on our
            consent banner, pseudonymous traffic data is processed
            by Google Analytics 4 (GA4) to help us understand site
            usage. GA4 anonymizes IP addresses by default at the
            point of collection. Google acts as a processor on our
            behalf and is bound by its own published terms. See{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-brand-violet underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s Privacy Policy
            </a>
            {" "}for Google&apos;s own disclosures.
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
          5. Your Rights and How to Exercise Them
        </h2>
        <p>
          Regardless of where you live, you may contact us at{" "}
          <a
            href="mailto:hello@weightlossrankings.org?subject=Privacy%20Request"
            className="text-brand-violet underline"
          >
            hello@weightlossrankings.org
          </a>{" "}
          to ask what personal information we hold about you, request that we
          correct or delete it, unsubscribe from our newsletter, or opt out
          of analytics. We aim to respond to verifiable requests within 30
          days. If we need to verify your identity before acting on a
          request, we will ask you for the minimum information needed to
          match your request against records we already hold.
        </p>
        <p>
          For the fastest way to withdraw analytics consent,{" "}
          clear your browser cookies and site data for
          weightlossrankings.org; the cookie consent banner will
          reappear on your next visit, and selecting
          &ldquo;Necessary only&rdquo; will prevent Google Analytics
          from loading on all subsequent visits.
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
            href="mailto:hello@weightlossrankings.org?subject=Privacy%20Request"
            className="text-brand-violet underline"
          >
            hello@weightlossrankings.org
          </a>{" "}
          with &quot;California Privacy Request&quot; in the subject line.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          7. EU / UK Residents (GDPR)
        </h2>
        <p>
          <strong className="text-brand-text-primary">
            Jurisdictional scope.
          </strong>{" "}
          Weight Loss Rankings is a United States publication operated
          by a Delaware-registered company. The GLP-1 telehealth
          providers, compounding pharmacies, and insurance products
          we review are{" "}
          <strong>available only to patients located in the United
          States</strong> and, in most cases, only to patients with
          a valid US prescription issued by a US-licensed healthcare
          provider. We do not market the Site to residents of the
          European Economic Area, the United Kingdom, or Switzerland,
          and the product information on the Site should not be
          construed as an offer of telehealth services or prescription
          medication to EU, UK, or Swiss residents. If you are
          located outside the United States, the reviews and tools
          on this Site are unlikely to be relevant to you, and you
          may not be able to access any of the telehealth or
          compounding-pharmacy services we review.
        </p>
        <p>
          That said, if you are located in the European Economic
          Area, the United Kingdom, or Switzerland and you do visit
          the Site, the General Data Protection Regulation (GDPR)
          and the UK GDPR still give you the rights of access,
          rectification, erasure (&ldquo;right to be forgotten&rdquo;),
          restriction of processing, data portability, and objection
          with respect to any data we process about you. You also
          have the right to withdraw any consent you previously gave
          (for example, by selecting &ldquo;Necessary only&rdquo; on
          our cookie banner to disable Google Analytics), and the
          right to lodge a complaint with your local data protection
          authority (for EU residents, this is typically your
          national DPA; for UK residents, the Information
          Commissioner&apos;s Office). We honor these rights
          regardless of whether you can actually use the products
          we review.
        </p>
        <p>
          <strong className="text-brand-text-primary">
            Our GDPR Article 6 lawful bases for processing.
          </strong>{" "}
          We rely on the following lawful bases under GDPR Article 6(1):
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Art. 6(1)(a) — Consent.</strong> We rely on your
            freely-given, specific, informed, and unambiguous consent
            for (i) loading Google Analytics and its associated
            cookies, which happens only if you click &ldquo;Accept
            all&rdquo; on the cookie consent banner, and (ii)
            subscribing you to our email newsletter. You can withdraw
            either consent at any time — for analytics, by clearing
            your cookies and selecting &ldquo;Necessary only&rdquo;
            when the banner reappears; for newsletters, by clicking
            the unsubscribe link in any email or emailing us. Withdrawal
            does not affect processing that already occurred before
            the withdrawal.
          </li>
          <li>
            <strong>Art. 6(1)(b) — Contract.</strong> When you email
            us with a question or submit a provider correction, we
            process your message to respond to your request. This is
            processing necessary to take steps at your request.
          </li>
          <li>
            <strong>Art. 6(1)(f) — Legitimate interests.</strong> We
            rely on our legitimate interests in running a secure,
            high-quality comparison site for the following: (i)
            operating and securing the Site, including server logs
            and abuse prevention; (ii) the internal click-attribution
            system described in Section 3, which does not store
            personal data but does track outbound click counts; and
            (iii) replying to partner-relationship correspondence.
            We balance these interests against your rights and
            freedoms, and you can object to processing on this basis
            by contacting us at hello@weightlossrankings.org.
          </li>
          <li>
            <strong>Art. 6(1)(c) — Legal obligation.</strong> We
            process data where required by applicable law — for
            example, in response to a valid legal request from a
            competent authority.
          </li>
        </ul>
        <p>
          We do not process special categories of personal data
          (health data, biometric data, etc.) under GDPR Article 9.
          We do not ask for and do not store any patient health
          information; our calculators run in your browser and the
          values you enter are not transmitted to our servers unless
          we explicitly say so.
        </p>
        <p>
          <strong className="text-brand-text-primary">
            Automated decision-making.
          </strong>{" "}
          We do not make any decisions about you that are based
          solely on automated processing (including profiling) that
          produce legal or similarly significant effects, within the
          meaning of GDPR Article 22.
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
