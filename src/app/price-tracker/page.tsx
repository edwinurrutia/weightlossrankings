import type { Metadata } from "next";
import { getAllProviders } from "@/lib/data";
import {
  getPriceHistory,
  getRecentChanges,
  getBestCurrentDeals,
} from "@/lib/price-history";
import type { Provider } from "@/lib/types";
import ProviderGrid from "@/components/providers/ProviderGrid";
import EmailCapture from "@/components/shared/EmailCapture";
import PriceLineChart from "@/components/charts/PriceLineChart";

export const metadata: Metadata = {
  title: "GLP-1 Price Tracker — Monitor Provider Price History",
  description:
    "Track how GLP-1 medication prices have changed over time across top providers. See recent price drops, best current deals, and 12-month price history charts. Updated monthly.",
  alternates: { canonical: "/price-tracker" },
};

export default async function PriceTrackerPage() {
  const [allProviders, recentChanges, bestDeals, priceHistory] =
    await Promise.all([
      getAllProviders(),
      Promise.resolve(getRecentChanges(90)),
      Promise.resolve(getBestCurrentDeals()),
      Promise.resolve(getPriceHistory()),
    ]);

  // Build a map of slug -> provider name for display
  const providerMap = new Map<string, Provider>(
    allProviders.map((p) => [p.slug, p])
  );

  // Get top 6 providers sorted by current lowest price for Best Deals
  const bestDealSlugs = bestDeals.map((d) => d.provider_slug);
  const bestDealProviders = bestDealSlugs
    .map((slug) => providerMap.get(slug))
    .filter((p): p is Provider => p !== undefined)
    .slice(0, 6);

  const trackedSlugs = [
    "coreage-rx",
    "hims",
    "ro",
    "found",
    "henry-meds",
    "sesame",
  ];

  return (
    <main className="min-h-screen bg-brand-gradient-light">
      {/* Hero */}
      <section className="py-12 sm:py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading leading-tight mb-4">
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              GLP-1 Price Tracker
            </span>
          </h1>
          <p className="text-lg text-brand-text-secondary max-w-xl mx-auto">
            Track how GLP-1 medication prices have changed over time. Updated
            monthly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
        {/* Recent Price Changes */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-brand-text-primary mb-6">
            Recent Price Changes{" "}
            <span className="text-base font-normal text-brand-text-secondary">
              (last 90 days)
            </span>
          </h2>

          {recentChanges.length === 0 ? (
            <p className="text-brand-text-secondary">
              No price changes detected in the last 90 days.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">
                      Dose
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">
                      Price Change
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">
                      % Change
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentChanges.map((change, i) => {
                    const provider = providerMap.get(change.provider_slug);
                    const providerName =
                      provider?.name ?? change.provider_slug;
                    const isDown = change.direction === "down";

                    return (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-brand-text-primary whitespace-nowrap">
                          {providerName}
                        </td>
                        <td className="px-6 py-4 text-sm text-brand-text-secondary whitespace-nowrap">
                          {change.dose} compounded
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <span className="text-brand-text-secondary">
                            ${change.old_price}/mo
                          </span>
                          <span className="mx-2 text-gray-300">&rarr;</span>
                          <span
                            className={
                              isDown
                                ? "font-semibold text-brand-success"
                                : "font-semibold text-red-500"
                            }
                          >
                            ${change.new_price}/mo
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              isDown
                                ? "bg-green-50 text-brand-success"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {isDown ? "▼" : "▲"}{" "}
                            {Math.abs(change.change_pct)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Best Current Deals */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-brand-text-primary mb-2">
            Best Current Deals
          </h2>
          <p className="text-brand-text-secondary mb-6">
            Top providers sorted by current lowest 0.5mg compounded price.
          </p>
          {bestDealProviders.length > 0 ? (
            <ProviderGrid
              providers={bestDealProviders}
              selectedDose="0.5mg"
              trackingSource="price_tracker"
            />
          ) : (
            <p className="text-brand-text-secondary">No deals data available.</p>
          )}
        </section>

        {/* Price History Charts */}
        <section>
          <h2 className="text-2xl font-bold font-heading text-brand-text-primary mb-2">
            Price History Charts
          </h2>
          <p className="text-brand-text-secondary mb-8">
            12-month price history for 0.5mg compounded semaglutide across top
            providers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trackedSlugs.map((slug) => {
              const provider = providerMap.get(slug);
              const providerName = provider?.name ?? slug;
              const entries = priceHistory.filter(
                (e) => e.provider_slug === slug && e.dose === "0.5mg"
              );
              const entry = entries[0];

              if (!entry) return null;

              const currentPrice =
                entry.history[entry.history.length - 1]?.price;

              return (
                <div
                  key={slug}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold font-heading text-brand-text-primary">
                      {providerName}
                    </h3>
                    {currentPrice != null && (
                      <span className="text-sm font-semibold text-brand-violet bg-brand-bg-purple px-3 py-1 rounded-full">
                        ${currentPrice}/mo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brand-text-secondary mb-4">
                    0.5mg compounded · 12-month history
                  </p>
                  <PriceLineChart data={entry.history} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Price Drop Alerts */}
        <section className="max-w-2xl mx-auto">
          <EmailCapture
            heading="Get Price Drop Alerts"
            description="Be the first to know when providers drop their prices."
            buttonText="Get Alerts"
            source="price_tracker"
            successHeading="You're on the price-alert list."
            successMessage="We'll email you when any tracked provider drops a monthly price."
          />
        </section>
      </div>
    </main>
  );
}
