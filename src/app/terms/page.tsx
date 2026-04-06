import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The Terms of Service that govern your use of WeightLossRankings.org, an independent comparison site for GLP-1 providers and weight loss programs.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text-primary mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-brand-text-secondary/70 mb-8">
        Effective date: April 6, 2026
      </p>

      <div className="space-y-6 text-brand-text-secondary leading-relaxed">
        <p>
          Welcome to WeightLossRankings.org (the &quot;Site,&quot;
          &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms of
          Service (&quot;Terms&quot;) form a legally binding agreement between
          you and WeightLossRankings.org and govern your access to and use of
          our website, tools, newsletters, and any related services
          (collectively, the &quot;Services&quot;). Please read these Terms
          carefully before using the Site. By accessing or using any part of
          the Services, you agree to be bound by these Terms and by our{" "}
          <Link href="/privacy" className="text-brand-violet underline">
            Privacy Policy
          </Link>
          . If you do not agree, please do not use the Services.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          1. Acceptance of Terms
        </h2>
        <p>
          By using the Site in any way — browsing articles, comparing
          providers, signing up for our newsletter, using our savings
          calculator, or clicking an affiliate link — you confirm that you are
          at least 18 years old (or the age of majority in your state of
          residence) and that you have read, understood, and agreed to these
          Terms. If you are using the Services on behalf of an organization,
          you represent that you have authority to bind that organization to
          these Terms.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          2. Description of Service
        </h2>
        <p>
          WeightLossRankings.org is an independent comparison and review site
          focused on GLP-1 telehealth providers, compounded and brand-name
          weight loss medications, weight loss programs, and related consumer
          health products. We publish editorial reviews, rankings, side-by-side
          comparisons, calculators, and explainers to help readers research
          their options. We are not a medical provider, pharmacy, insurer, or
          telehealth company. We do not prescribe medications, fill
          prescriptions, provide diagnoses, or establish any
          physician–patient relationship with any user of the Site.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          3. Not Medical Advice
        </h2>
        <p>
          The content on the Site is provided for general informational and
          educational purposes only. It is not intended to be, and should not
          be treated as, a substitute for professional medical advice,
          diagnosis, or treatment. Always seek the advice of a qualified
          physician, pharmacist, or other licensed healthcare provider before
          starting, stopping, or changing any medication or treatment, and
          with any questions you may have about a medical condition. Never
          disregard professional medical advice or delay in seeking it because
          of something you have read on this Site. If you think you may have
          a medical emergency, call your doctor or 911 immediately.
        </p>
        <p>
          Weight loss medications, including GLP-1 receptor agonists such as
          semaglutide and tirzepatide, can have serious side effects and are
          not appropriate for everyone. Reliance on any information provided
          by the Site is solely at your own risk.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          4. User Conduct
        </h2>
        <p>
          You agree to use the Services only for lawful purposes and in a way
          that does not infringe the rights of, restrict, or inhibit anyone
          else&apos;s use of the Site. Prohibited conduct includes, without
          limitation: attempting to gain unauthorized access to any portion of
          the Site, its servers, or related systems; scraping or mass-copying
          content without permission; interfering with or disrupting the
          operation of the Site; uploading viruses, malware, or harmful code;
          harvesting email addresses or other contact information; and using
          the Site to harass, defame, or harm any person or entity.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          5. Intellectual Property
        </h2>
        <p>
          All content on the Site that we create — including text, graphics,
          logos, scoring methodology, rankings, calculators, charts, and the
          design and &quot;look and feel&quot; of the Site — is owned by
          WeightLossRankings.org or its licensors and is protected by United
          States and international copyright, trademark, and other
          intellectual property laws. You may view, download, and print
          content from the Site for your own personal, non-commercial use,
          provided you do not remove any copyright or other notices. You may
          not republish, sell, license, or otherwise commercially exploit our
          content without our prior written permission.
        </p>
        <p>
          Provider names, brand names, logos, and trademarks referenced on the
          Site — including Wegovy&reg;, Ozempic&reg;, Zepbound&reg;,
          Mounjaro&reg;, Hims&reg;, Ro&reg;, and others — are the property of
          their respective owners. Their mention on the Site does not imply
          any affiliation with, endorsement by, or sponsorship from those
          companies unless we explicitly state otherwise.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          6. Affiliate Links and Advertising
        </h2>
        <p>
          WeightLossRankings.org is a reader-supported publication. Many of
          the outbound links to providers on this Site are affiliate links,
          meaning that if you click a link and sign up or make a purchase we
          may earn a commission at no additional cost to you. Our commercial
          relationships may influence which providers we feature prominently
          or write about, but they never influence the scores our algorithm
          assigns. For full details, please see our{" "}
          <Link href="/disclosure" className="text-brand-violet underline">
            Affiliate Disclosure
          </Link>{" "}
          and{" "}
          <Link href="/methodology" className="text-brand-violet underline">
            Methodology
          </Link>
          .
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          7. Third-Party Links and Providers
        </h2>
        <p>
          The Site contains links to third-party websites, including provider
          sign-up pages, pharmaceutical manufacturer websites, scientific
          literature, and news sources. We do not control and are not
          responsible for the content, availability, privacy practices, or
          business practices of any third-party site. A link to a provider
          does not constitute an endorsement beyond the score our methodology
          assigns and the commentary in our review. Before entering into any
          transaction with a third party, you should independently verify
          pricing, product availability, licensing, shipping terms, and
          applicable refund or cancellation policies.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          8. Disclaimers
        </h2>
        <p>
          THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
          AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
          OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW,
          WEIGHTLOSSRANKINGS.ORG DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT
          LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY.
        </p>
        <p>
          We make no warranty that (a) the Services will meet your
          requirements, (b) the Services will be uninterrupted, timely,
          secure, or error-free, (c) pricing information, availability,
          ingredient lists, clinical claims, or any other provider data will
          be accurate or current, or (d) any defects in the Services will be
          corrected. Weight loss provider pricing and product offerings
          change frequently; we do our best to keep information up to date,
          but you should verify every material detail directly with the
          provider before acting on it.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          9. Limitation of Liability
        </h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL
          WEIGHTLOSSRANKINGS.ORG, ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS,
          OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES — INCLUDING WITHOUT
          LIMITATION LOST PROFITS, LOST REVENUE, LOST DATA, LOSS OF GOODWILL,
          PERSONAL INJURY, OR EMOTIONAL DISTRESS — ARISING OUT OF OR RELATED
          TO YOUR USE OF OR INABILITY TO USE THE SERVICES, WHETHER BASED ON
          WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR ANY
          OTHER LEGAL THEORY, AND WHETHER OR NOT WE HAVE BEEN ADVISED OF THE
          POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          In jurisdictions that do not allow the exclusion or limitation of
          certain damages, our liability will be limited to the maximum
          extent permitted by law. In no event shall our aggregate liability
          to you for all claims arising out of or related to the Services
          exceed one hundred U.S. dollars (US$100).
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          10. Indemnification
        </h2>
        <p>
          You agree to defend, indemnify, and hold harmless
          WeightLossRankings.org, its affiliates, and their respective
          officers, directors, employees, and agents from and against any
          claims, liabilities, damages, losses, and expenses, including
          reasonable attorneys&apos; fees, arising out of or in any way
          connected with your access to or use of the Services, your
          violation of these Terms, or your violation of any third-party
          right, including any intellectual property or privacy right.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          11. Termination
        </h2>
        <p>
          We reserve the right, in our sole discretion and without notice, to
          suspend or terminate your access to all or any part of the Services
          at any time, with or without cause. Upon termination, all
          provisions of these Terms that by their nature should survive
          termination — including ownership provisions, warranty disclaimers,
          indemnification, and limitations of liability — will survive.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          12. Changes to These Terms
        </h2>
        <p>
          We may revise these Terms from time to time. When we do, we will
          update the &quot;Effective date&quot; at the top of this page and,
          for material changes, take reasonable steps to notify users (for
          example, by posting a notice on the Site or sending an email to
          newsletter subscribers). Your continued use of the Services after
          changes become effective constitutes acceptance of the revised
          Terms.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          13. Governing Law and Dispute Resolution
        </h2>
        <p>
          These Terms and any dispute arising out of or relating to them or
          the Services will be governed by and construed in accordance with
          the laws of the State of Delaware, without regard to its conflict
          of law principles. You agree that any legal action or proceeding
          arising out of or relating to these Terms or the Services will be
          brought exclusively in the state or federal courts located in
          Delaware, and you consent to the personal jurisdiction of those
          courts.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          14. Miscellaneous
        </h2>
        <p>
          These Terms, together with our Privacy Policy and Affiliate
          Disclosure, constitute the entire agreement between you and
          WeightLossRankings.org regarding the Services. If any provision of
          these Terms is held to be invalid or unenforceable, the remaining
          provisions will remain in full force and effect. Our failure to
          enforce any right or provision of these Terms will not be
          considered a waiver of that right or provision.
        </p>

        <h2 className="font-heading text-xl font-bold text-brand-text-primary pt-4">
          15. Contact
        </h2>
        <p>
          Questions about these Terms can be sent to{" "}
          <a
            href="mailto:hello@weightlossrankings.org"
            className="text-brand-violet underline"
          >
            hello@weightlossrankings.org
          </a>
          .
        </p>
      </div>
    </div>
  );
}
