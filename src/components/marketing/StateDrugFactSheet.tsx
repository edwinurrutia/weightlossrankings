import SourcesPanel from "@/components/research/SourcesPanel";
import Citation from "@/components/research/Citation";

interface FactItem {
  label: string;
  value: string;
  /** Citation source id from the central registry, if applicable. */
  sourceId?: string;
  /** Display number for the footnote marker. */
  citationN?: number;
}

interface StateDrugFactSheetProps {
  /** Drug label, e.g. "Semaglutide". */
  drugLabel: string;
  /** Brand-name comparison drug, e.g. "Wegovy". */
  brandLabel: string;
  /** US state name, e.g. "Texas". */
  stateName: string;
  /** Number of providers shipping this drug to this state. */
  providerCount: number;
  /** Average compounded monthly price in this state. */
  avgPriceMonthly: number;
  /** Brand-name retail price for the comparison. */
  brandPriceMonthly: number;
  /** Adult obesity rate, percent (e.g. 34). */
  obesityRate?: number;
  /** State ranking for obesity, e.g. 16. */
  obesityRank?: number;
  /** Medicaid coverage state, e.g. "Diabetes only". */
  medicaidCoverage?: string;
  /** Top metro area for cross-link copy. */
  topCity?: string;
  /** Date the data was last verified — passed for the freshness stamp. */
  dataAsOf: string;
}

const formatUsd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

// Source IDs used on this component.
// 1 = our dataset · 2 = CDC BRFSS · 3 = manufacturer pricing · 4 = KFF Medicaid · 5 = IRS Pub 502
const SOURCE_OUR_DATASET = "wlr-pricing-index";
const SOURCE_CDC_BRFSS = "cdc-brfss-obesity";
const SOURCE_KFF_MEDICAID = "kff-medicaid-obesity-drug-coverage";
const SOURCE_IRS_PUB_502 = "irs-pub-502-medical-expenses";
// Manufacturer pricing source — Wegovy uses NovoCare, all others use LillyDirect Zepbound
// (shown for semaglutide vs Wegovy; adjust per brand as needed)
const SOURCE_BRAND_PRICING_NOVO = "novocare-wegovy-cash-price";
const SOURCE_BRAND_PRICING_LILLY = "lilly-zepbound-cash-price";

/**
 * Mobile-first intro for state x drug pages.
 *
 * Renders three pieces:
 *   1. A compact 4-tile fact grid (provider count, avg price, savings,
 *      obesity rate). Numbered citations link to the collapsible Sources block.
 *   2. A short two-sentence editorial intro.
 *   3. A collapsible Sources block backed by the central citation registry.
 *
 * All numbers are passed in as props and computed at request time, so the fact
 * sheet stays in sync with providers.json and states-content.
 */
export default function StateDrugFactSheet({
  drugLabel,
  brandLabel,
  stateName,
  providerCount,
  avgPriceMonthly,
  brandPriceMonthly,
  obesityRate,
  obesityRank,
  medicaidCoverage,
  topCity,
  dataAsOf,
}: StateDrugFactSheetProps) {
  const monthlySavings = brandPriceMonthly - avgPriceMonthly;
  const annualSavings = monthlySavings * 12;
  const pctOff = Math.round((1 - avgPriceMonthly / brandPriceMonthly) * 100);

  // Select manufacturer pricing source based on brand label
  const brandPricingSource =
    brandLabel === "Wegovy" ? SOURCE_BRAND_PRICING_NOVO : SOURCE_BRAND_PRICING_LILLY;

  // Build fact tiles
  const facts: FactItem[] = [
    {
      label: `${drugLabel} providers`,
      value: providerCount.toString(),
      sourceId: SOURCE_OUR_DATASET,
      citationN: 1,
    },
    {
      label: "Avg monthly cost",
      value: formatUsd(avgPriceMonthly),
      sourceId: SOURCE_OUR_DATASET,
      citationN: 1,
    },
    {
      label: `Savings vs ${brandLabel}`,
      value: `${pctOff}%`,
      sourceId: brandPricingSource,
      citationN: 3,
    },
    {
      label: "State obesity rate",
      value: obesityRate ? `${obesityRate}%` : "—",
      sourceId: obesityRate ? SOURCE_CDC_BRFSS : undefined,
      citationN: obesityRate ? 2 : undefined,
    },
  ];

  // Source ids in display order (must match citationN numbering above)
  const sourceIds = [
    SOURCE_OUR_DATASET,       // 1
    SOURCE_CDC_BRFSS,         // 2
    brandPricingSource,       // 3
    SOURCE_KFF_MEDICAID,      // 4
    SOURCE_IRS_PUB_502,       // 5
  ];

  return (
    <section className="not-prose">
      {/* Fact tiles — mobile: 2x2 grid, tablet+: 4-up row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {facts.map((f) => (
          <div
            key={f.label}
            className="rounded-xl border border-brand-violet/15 bg-white px-4 py-3.5 sm:px-5 sm:py-4"
          >
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-brand-text-secondary leading-tight">
              {f.label}
              {f.sourceId && f.citationN !== undefined && (
                <Citation source={f.sourceId} n={f.citationN} />
              )}
            </p>
            <p className="mt-1.5 font-heading text-2xl sm:text-3xl font-black text-brand-text-primary leading-none tracking-tight">
              {f.value}
            </p>
          </div>
        ))}
      </div>

      {/* Short prose intro */}
      <div className="mt-6 space-y-3 text-base text-brand-text-secondary leading-relaxed">
        <p>
          {providerCount} licensed telehealth providers ship compounded{" "}
          {drugLabel} to {stateName} addresses, with monthly prices averaging{" "}
          <strong className="text-brand-text-primary">
            {formatUsd(avgPriceMonthly)}
          </strong>
          {" "}— a roughly {pctOff}% discount to brand-name {brandLabel} at{" "}
          {formatUsd(brandPriceMonthly)}/month
          <Citation source={brandPricingSource} n={3} />
          .{" "}
          {obesityRate && obesityRank
            ? `${stateName}'s adult obesity rate of ${obesityRate}% (#${obesityRank} nationally)`
            : `Demand for medically-supervised weight loss in ${stateName}`}{" "}
          has driven the state into one of the country&apos;s most active
          cash-pay GLP-1 markets.
        </p>
        {medicaidCoverage && (
          <p>
            <strong className="text-brand-text-primary">
              {stateName} Medicaid &amp; brand-name {brandLabel}:
            </strong>{" "}
            {medicaidCoverage.toLowerCase()}
            <Citation source={SOURCE_KFF_MEDICAID} n={4} />
            . Compounded {drugLabel.toLowerCase()} is{" "}
            <strong className="text-brand-text-primary">
              typically cash-pay
            </strong>{" "}
            — it isn&apos;t covered by Medicaid, Medicare, or commercial
            insurance in most cases. Brand-name {brandLabel} is generally{" "}
            <strong className="text-brand-text-primary">
              FSA/HSA eligible
            </strong>{" "}
            with a prescription, and many plan administrators also accept
            compounded GLP-1s as an FSA/HSA expense with a Letter of Medical
            Necessity
            <Citation source={SOURCE_IRS_PUB_502} n={5} />
            . At the median compounded price, switching from brand-name{" "}
            {brandLabel} would save roughly{" "}
            <strong className="text-brand-text-primary">
              {formatUsd(annualSavings)}/year
            </strong>{" "}
            out of pocket
            {topCity ? `, with providers shipping statewide from ${topCity} to smaller towns` : ""}
            .
          </p>
        )}
      </div>

      {/* Sources panel — backed by the central citation registry */}
      <SourcesPanel
        sourceIds={sourceIds}
        heading="Sources & methodology"
        dataAsOf={dataAsOf}
      />
    </section>
  );
}
