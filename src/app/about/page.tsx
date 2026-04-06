import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Weight Loss Rankings",
  description:
    "Weight Loss Rankings is an independent review site that evaluates GLP-1 telehealth providers, weight loss programs, and supplements. Read the story behind the site, how it's built, and how it stays independent.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="font-heading text-4xl font-bold text-brand-text-primary mb-4">
        About Weight Loss Rankings
      </h1>
      <p className="text-lg text-brand-text-secondary mb-8">
        An independent comparison site for GLP-1 telehealth providers,
        compounding pharmacies, and weight loss programs — built to give
        people structured, honest answers in a market that doesn&rsquo;t
        offer many.
      </p>

      {/* Intro paragraphs (existing tone, preserved) */}
      <div className="space-y-5 text-brand-text-secondary mb-10">
        <p>
          Weight Loss Rankings exists to cut through the noise in a market
          flooded with telehealth providers, GLP-1 programs, and weight loss
          services making bold claims with little accountability. The goal is
          simple: give people a single place to compare options based on
          evidence, pricing, and real-world experience — instead of whichever
          brand has the biggest ad budget.
        </p>
        <p>
          The site is operated by an independent publisher. Every provider is
          evaluated using a structured scoring methodology that weighs value,
          clinical effectiveness, user experience, safety and compliance,
          accessibility, and ongoing support. The same algorithm is applied to
          every provider, whether or not they have a commercial relationship
          with us. For full details on how commercial relationships affect
          placement (but not scores), see our{" "}
          <Link href="/disclosure" className="text-brand-violet underline">
            Affiliate Disclosure
          </Link>{" "}
          and{" "}
          <Link href="/methodology" className="text-brand-violet underline">
            Methodology
          </Link>{" "}
          pages.
        </p>
      </div>

      {/* Why I built this */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-4">
          Why I built this
        </h2>
        <div className="space-y-4 text-brand-text-secondary">
          <p>
            I built Weight Loss Rankings because the GLP-1 telehealth market
            in 2026 is overwhelming. There are 80+ providers, prices range
            from $75 to $1,500/month, regulations vary by state, and
            information is scattered across forums, ad-driven listicles, and
            provider websites that all claim to be &ldquo;the best.&rdquo; I
            wanted one place where the data is structured, the scoring is
            transparent, and the recommendations are honest about commercial
            relationships.
          </p>
          <p>
            I kept running into the same frustration: you&rsquo;d search for
            &ldquo;cheapest compounded semaglutide&rdquo; and get ten
            near-identical articles, written by people who clearly
            hadn&rsquo;t used any of the services, ranking whichever provider
            paid the highest affiliate commission that quarter. Pricing pages
            were vague. Eligibility rules were buried in FAQs. Nobody was
            doing the boring work of actually keeping a database current.
            This site is my attempt to do that boring work in public.
          </p>
        </div>
      </section>

      {/* My process */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-4">
          My process
        </h2>
        <div className="space-y-4 text-brand-text-secondary">
          <p>
            Every provider in the database starts with a structured intake: I
            pull their current pricing directly from their public site, note
            which states they operate in, record their medication options and
            dose ladders, and document their medical oversight model (async
            vs. synchronous, MD vs. NP, etc.). Where possible, I cross-check
            against state pharmacy board filings and 503A/503B registrations
            for the compounding pharmacies they use.
          </p>
          <p>
            Scoring happens through a fixed algorithm across six weighted
            dimensions — value, effectiveness, user experience, trust and
            safety, accessibility, and ongoing support. The full breakdown
            lives on the{" "}
            <Link href="/methodology" className="text-brand-violet underline">
              methodology page
            </Link>
            . I don&rsquo;t override scores manually. If a provider deserves
            a higher rating, they need to improve on one of the measured
            dimensions.
          </p>
          <p>
            Prices and state availability are reviewed at least monthly. Big
            changes — a provider exits a state, launches a new dose, changes
            compounding partners — get reflected as I find them. If you spot
            something stale, email me and I&rsquo;ll fix it fast.
          </p>
        </div>
      </section>

      {/* What I'm not */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-4">
          What I&rsquo;m not
        </h2>
        <ul className="space-y-2 text-brand-text-secondary list-disc pl-5">
          <li>I am not a doctor. Nothing on this site is medical advice.</li>
          <li>
            I am not a pharmacy. I do not dispense, ship, or handle
            medications.
          </li>
          <li>
            I am not a telehealth provider. I do not run visits or write
            prescriptions.
          </li>
          <li>
            I am not affiliated with Novo Nordisk, Eli Lilly, or any other
            drug manufacturer.
          </li>
          <li>
            I am not owned by any telehealth company, compounding pharmacy,
            or private-equity rollup in the weight-loss space.
          </li>
        </ul>
      </section>

      {/* What I am */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-4">
          What I am
        </h2>
        <div className="space-y-4 text-brand-text-secondary">
          <p>
            I&rsquo;m an independent publisher. The site is reader-supported
            via affiliate partnerships — when a reader signs up with a
            provider through a link on this site, we sometimes earn a
            commission. Those commissions pay for the hosting, the research
            time, the database work, and the long-form medical guides.
          </p>
          <p>
            I&rsquo;m committed to transparency about how those relationships
            work. Commercial relationships can influence{" "}
            <em>placement</em> (which cards are featured, which comparisons
            are highlighted), but they do not influence{" "}
            <em>scores</em>. The scoring algorithm is the same for every
            provider. A provider without any affiliate arrangement is graded
            exactly the same way as one who pays us $200 per signup.
          </p>
        </div>
      </section>

      {/* Long-term vision */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-4">
          Long-term vision
        </h2>
        <p className="text-brand-text-secondary mb-4">
          Where this site is going over the next 12–24 months:
        </p>
        <ul className="space-y-3 text-brand-text-secondary list-disc pl-5">
          <li>
            <strong className="text-brand-text-primary">
              A full compounding pharmacy directory
            </strong>{" "}
            — 503A and 503B, with state licensure, inspection history, and
            which telehealth brands source from each one.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Real-time price tracking
            </strong>{" "}
            — automated monitoring of provider pricing pages so readers see
            price changes as they happen, not months later.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Expanded category coverage
            </strong>{" "}
            — beyond GLP-1s: bariatric programs, behavioral weight-loss apps,
            CGM-based programs, and emerging oral small-molecule obesity
            drugs.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              A medical reviewer network
            </strong>{" "}
            — board-certified MDs reviewing every long-form guide before
            publish, with named bylines and credentials visible on each page.
          </li>
          <li>
            <strong className="text-brand-text-primary">
              Community contributions
            </strong>{" "}
            — structured reader reviews, price reports from actual customers,
            and verified success stories, moderated to filter out astroturf.
          </li>
        </ul>
      </section>

      {/* Funding */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-4">
          How the site makes money
        </h2>
        <div className="space-y-4 text-brand-text-secondary">
          <p>
            Weight Loss Rankings makes money through affiliate commissions.
            When a reader clicks a link to a provider and signs up, we may
            earn a one-time or recurring commission. That&rsquo;s the only
            revenue source right now — no display ads, no paid &ldquo;sponsored
            review&rdquo; content disguised as editorial, no sold rankings.
          </p>
          <p>
            Not every provider on the site has an affiliate relationship with
            us. We rank and review them anyway, because leaving them out
            would defeat the purpose of the site. The full details are on our{" "}
            <Link href="/disclosure" className="text-brand-violet underline">
              affiliate disclosure page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Editorial independence */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-brand-text-primary mb-4">
          Editorial independence
        </h2>
        <div className="space-y-4 text-brand-text-secondary">
          <p>
            Weight Loss Rankings is a reader-supported publication. We
            participate in affiliate programs with some of the providers we
            cover, and we may earn a commission when readers click through
            our links and sign up. Some providers also pay for sponsored
            placements that are clearly labeled wherever they appear.
          </p>
          <p>
            Editorial decisions — what we cover, how we score, what we say
            in a review — are made independently of those commercial
            relationships. Every provider in our database is run through
            the same{" "}
            <Link href="/methodology" className="text-brand-violet underline">
              published scoring methodology
            </Link>{" "}
            (value, effectiveness, UX, trust, accessibility, support), and
            commercial relationships do not change the inputs to that
            algorithm. Sponsored placements affect <em>where</em> a
            provider appears (e.g. a featured slot on a category page) but
            not the underlying score. For the full picture of how
            commercial relationships affect placement on the site, see our{" "}
            <Link href="/disclosure" className="text-brand-violet underline">
              Affiliate Disclosure
            </Link>
            .
          </p>
          <p>
            No provider gets a preview, right of review, or veto over our
            editorial copy before it&rsquo;s published. No provider can
            pull a review by threatening to cancel an affiliate
            relationship. Where the editorial team is wrong about a fact,
            we correct it; where we&rsquo;re wrong about a judgment call,
            we don&rsquo;t.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="mb-10 rounded-2xl bg-brand-violet/5 border border-brand-violet/10 p-6">
        <h2 className="font-heading text-xl font-semibold text-brand-text-primary mb-3">
          Get in touch
        </h2>
        <p className="text-brand-text-secondary mb-3">
          Questions, corrections, tips, press inquiries, or just a friendly
          hello — I read everything.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href="mailto:hello@weightlossrankings.org"
            className="text-brand-violet underline font-medium"
          >
            hello@weightlossrankings.org
          </a>
          <span className="text-brand-text-secondary/40">•</span>
          <Link
            href="/press"
            className="text-brand-violet underline font-medium"
          >
            Press kit
          </Link>
          <span className="text-brand-text-secondary/40">•</span>
          <Link
            href="/methodology"
            className="text-brand-violet underline font-medium"
          >
            Methodology
          </Link>
        </div>
      </section>

      <p className="text-xs text-brand-text-secondary/70 text-right">
        Last updated: April 6, 2026
      </p>
    </div>
  );
}
