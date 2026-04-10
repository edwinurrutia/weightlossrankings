import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Weight Loss Rankings is a small, independent operation. We're not actively hiring, but we're always interested in hearing from medical reviewers, writers, and data engineers.",
  alternates: { canonical: "/careers" },
  robots: { index: true, follow: true },
};

export default function CareersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary mb-4">
        Careers at Weight Loss Rankings
      </h1>

      <div className="space-y-6 text-brand-text-secondary leading-relaxed">
        <p>
          Weight Loss Rankings is a small, independent operation focused on
          building the most trusted GLP-1 and weight loss comparison site on
          the web. We are not venture-backed, we don&apos;t have a sales
          floor, and we don&apos;t have a 40-person content team. We are
          one founder plus a small group of freelance contributors. That
          shapes everything we publish.
        </p>
        <p>
          We are not actively hiring full-time roles right now, but we are
          always interested in hearing from people who care deeply about
          health information quality and want to work with us on a project,
          freelance, or contractor basis.
        </p>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-4">
          Who we&apos;d like to hear from
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-brand-text-primary">
              Medical reviewers.
            </strong>{" "}
            Board-certified physicians, PharmDs, or NPs with experience in
            obesity medicine or endocrinology who can review our drug
            guides, provider reviews, and clinical claims.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Freelance writers.
            </strong>{" "}
            Health and science writers with bylines at reputable outlets who
            can produce explainers, provider reviews, or long-form features.
            Prior coverage of telehealth, pharmacy, or GLP-1s is a plus.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Data engineers.
            </strong>{" "}
            Engineers interested in building scrapers, price trackers, and
            structured data pipelines around the GLP-1 market. TypeScript,
            Python, and SQL.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Growth marketers.
            </strong>{" "}
            SEO, lifecycle email, and content distribution specialists who
            understand how to grow an independent publisher ethically.
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-4">
          Our values
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-brand-text-primary">Independence.</strong>{" "}
            Commercial relationships may influence placement but never
            scoring. We turn down partnerships that compromise that rule.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Evidence-based.
            </strong>{" "}
            Claims link to primary sources. Reviews are based on what we can
            verify, not on marketing copy or provider-supplied assets.
          </li>
          <li>
            <strong className="text-brand-text-primary">Transparency.</strong>{" "}
            Methodology is public. Commercial disclosures are clear. We
            publish corrections and last-verified dates.
          </li>
          <li>
            <strong className="text-brand-text-primary">User-first.</strong>{" "}
            Every decision — from the scoring algorithm to the ads we accept
            — is filtered through what&apos;s actually useful for someone
            trying to make a real weight loss decision.
          </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-4">
          How we work
        </h2>
        <p>
          We are fully remote, asynchronous by default, and output-focused.
          There are no standups and no mandatory meeting hours. We care
          about clarity in writing, care for the reader, and willingness to
          dig into primary sources. Contractors typically work on
          milestone-based engagements with clear scopes and deliverables.
        </p>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-4">
          Open roles
        </h2>

        {/* Medical reviewer is genuinely open as a freelance/consultant
            engagement and actively recruited from the /authors page.
            Listed here as a real role so the messaging matches across
            both pages. */}
        <div className="rounded-2xl bg-brand-violet/5 border border-brand-violet/20 p-6 space-y-3">
          <p className="font-semibold text-brand-text-primary">
            Open · Medical Reviewer (Freelance / Consultant)
          </p>
          <p className="text-sm leading-relaxed">
            We are actively looking for a board-certified clinician
            (MD, PharmD, NP, RN, or RD) with experience in obesity
            medicine, endocrinology, or pharmacy to review our research
            articles, drug guides, and provider reviews on a freelance
            or consultant basis. The role is asynchronous, paid per
            article reviewed, and fits naturally alongside an active
            clinical practice. When the role is filled, the byline on
            every YMYL article switches from{" "}
            <em>&ldquo;Editorially reviewed (not clinically reviewed)&rdquo;</em>{" "}
            to{" "}
            <em>
              &ldquo;Medically reviewed by [Your Name],
              [Credentials]&rdquo;
            </em>{" "}
            with a link to your{" "}
            <Link
              href="/authors"
              className="text-brand-violet underline underline-offset-2 hover:text-brand-blue"
            >
              author bio page
            </Link>
            .
          </p>
          <p className="text-sm leading-relaxed">
            Interested? Email us with subject line{" "}
            <strong className="text-brand-text-primary">
              &ldquo;Medical Reviewer&rdquo;
            </strong>{" "}
            (see &ldquo;Get in touch&rdquo; below) and include your
            credentials, license state(s), specialty, and a sentence
            on why this matters to you.
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">
          <p className="font-semibold text-brand-text-primary mb-1">
            Other roles · Project basis
          </p>
          <p className="text-sm">
            We maintain a list of freelance writers, data engineers,
            and growth contributors we work with periodically. We do
            not have full-time W-2 roles open right now, but if any of
            the contributor profiles above describes you,
            we&apos;d love to hear from you — even if we don&apos;t
            have a project open today, we keep warm leads on file for
            when we do.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold text-brand-text-primary pt-4">
          Get in touch
        </h2>
        <p>
          Send a short note and a link to your work to{" "}
          <a
            href="mailto:hello@weightlossrankings.org?subject=Careers"
            className="text-brand-violet underline"
          >
            hello@weightlossrankings.org
          </a>{" "}
          with the subject line &quot;Careers.&quot; Please tell us which
          category above fits you, one or two samples of your work, and
          what you&apos;d most want to contribute. See also our{" "}
          <Link href="/about" className="text-brand-violet underline">
            About
          </Link>{" "}
          and{" "}
          <Link href="/code-of-conduct" className="text-brand-violet underline">
            Code of Conduct
          </Link>{" "}
          pages to understand how we work.
        </p>
      </div>
    </div>
  );
}
