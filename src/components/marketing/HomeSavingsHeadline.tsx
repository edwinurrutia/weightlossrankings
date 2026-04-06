import Link from "next/link";

interface HomeSavingsHeadlineProps {
  /** Cheapest compounded-semaglutide monthly price across all providers. */
  cheapestCompoundedMonthly: number;
  /** Brand-name Wegovy monthly retail used as the comparison baseline. */
  brandMonthly: number;
}

const formatUsd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

/**
 * The "money headline" that replaces the boring 4-column stat bar.
 *
 * Leads with a single emotional number (annual savings vs brand Wegovy)
 * computed from real provider data, with a calculator CTA. The full
 * width is given to the headline + supporting copy — secondary stat
 * chips were removed because they duplicated the trust marquee above
 * and pushed the converting copy down on mobile.
 */
export default function HomeSavingsHeadline({
  cheapestCompoundedMonthly,
  brandMonthly,
}: HomeSavingsHeadlineProps) {
  const annualSavings = (brandMonthly - cheapestCompoundedMonthly) * 12;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
        Why readers use us
      </p>
      <h2
        className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
      >
        Readers save up to{" "}
        <span className="text-brand-violet">
          {formatUsd(annualSavings)}/year
        </span>{" "}
        on weight loss medication.
      </h2>
      <p className="mt-6 text-lg text-brand-text-secondary leading-relaxed max-w-3xl">
        Brand-name Wegovy costs around{" "}
        <strong className="text-brand-text-primary">
          {formatUsd(brandMonthly)}/month
        </strong>{" "}
        without insurance. Our top-rated providers offer compounded
        semaglutide from{" "}
        <strong className="text-brand-text-primary">
          {formatUsd(cheapestCompoundedMonthly)}/month
        </strong>
        . Same active ingredient. Same weekly injection. A fraction of the
        cost.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
        <Link
          href="/savings-calculator"
          className="inline-flex items-center justify-center gap-2 bg-brand-violet hover:bg-brand-violet/90 text-white font-bold text-base px-6 py-3.5 rounded-full transition-colors"
        >
          Calculate your savings
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/compare"
          className="inline-flex items-center justify-center gap-2 text-brand-text-primary font-semibold text-base px-2 py-2 hover:text-brand-violet transition-colors"
        >
          Or compare all providers
        </Link>
      </div>
    </section>
  );
}
