import Link from "next/link";
import { WEGOVY_MONTHLY_USD } from "@/lib/citations";

interface HomeSavingsHeadlineProps {
  /**
   * Median compounded-semaglutide monthly price across all providers.
   * This is the editorial baseline for the savings claim — using the
   * median (rather than the absolute minimum) keeps the headline number
   * defensible because it represents what a typical sustainable monthly
   * rate looks like, not a one-off introductory promo.
   */
  medianCompoundedMonthly: number;
  /**
   * The absolute lowest monthly rate we currently see in the dataset.
   * Surfaced as a smaller "starts at" tag so the marketing remains
   * accurate without overstating the typical experience.
   */
  startingFromMonthly: number;
  /**
   * Brand-name Wegovy monthly retail used as the comparison baseline.
   * Defaults to WEGOVY_MONTHLY_USD from the citation registry.
   */
  brandMonthly?: number;
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
 * Editorial baseline is the MEDIAN compounded price (not the cheapest)
 * because the cheapest entry in the dataset is usually a first-month
 * introductory rate that doesn't reflect what visitors actually pay
 * long-term. The "starts at" tag preserves the marketing hook for the
 * absolute floor without overstating it as the typical experience.
 *
 * All numbers come from providers.json at request time, so the headline
 * stays in sync with the dataset as the scraper updates pricing.
 */
export default function HomeSavingsHeadline({
  medianCompoundedMonthly,
  startingFromMonthly,
  brandMonthly = WEGOVY_MONTHLY_USD,
}: HomeSavingsHeadlineProps) {
  const annualSavings = (brandMonthly - medianCompoundedMonthly) * 12;
  // Round down to the nearest $500 so the headline never overstates and
  // the number reads as a confident editorial figure ("save $14,000+/yr"
  // rather than "save $14,388/yr").
  const roundedAnnualSavings = Math.max(0, Math.floor(annualSavings / 500) * 500);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-brand-violet font-bold mb-4">
        Why readers use us
      </p>
      <h2
        className="font-heading font-black text-brand-text-primary tracking-tight leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
      >
        Readers save{" "}
        <span className="text-brand-violet">
          {formatUsd(roundedAnnualSavings)}+/year
        </span>{" "}
        on weight loss medication.
      </h2>
      <p className="mt-6 text-lg text-brand-text-secondary leading-relaxed max-w-3xl">
        Brand-name Wegovy retails for around{" "}
        <strong className="text-brand-text-primary">
          {formatUsd(brandMonthly)}/month
        </strong>{" "}
        without insurance. The median compounded semaglutide provider in
        our dataset charges{" "}
        <strong className="text-brand-text-primary">
          {formatUsd(medianCompoundedMonthly)}/month
        </strong>
        — same active ingredient, same weekly injection, a fraction of the
        cost.
      </p>
      <p className="mt-3 text-sm text-brand-text-secondary/80 leading-relaxed max-w-3xl">
        Cheapest first-month rate currently in our dataset:{" "}
        <strong className="text-brand-text-primary">
          {formatUsd(startingFromMonthly)}/mo
        </strong>
        . Introductory pricing varies by provider and typically increases
        after the first month — always verify on the provider&apos;s site
        before signing up.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
        <Link
          href="/tools/glp1-savings-calculator"
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
