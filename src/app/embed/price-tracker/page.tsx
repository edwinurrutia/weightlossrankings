import type { Metadata } from "next";
import { getAllProviders } from "@/lib/data";
import { getRecentChanges, getBestCurrentDeals } from "@/lib/price-history";
import type { Provider } from "@/lib/types";

// Embeddable widget for the GLP-1 price tracker. Designed to be
// dropped into journalists', bloggers', and partner sites via
// <iframe src="https://www.weightlossrankings.org/embed/price-tracker">.
//
// Strategic SEO purpose:
//   Linkbait. Embeddable widgets that auto-update are exactly the
//   kind of asset that earns repeat backlinks at scale. Every site
//   that embeds this gets fresh data on every render and can attribute
//   the data source visually with our small "Powered by" footer that
//   links back to /price-tracker (the canonical, full-feature page).
//
//   Compared to a static screenshot or table dump, an embeddable
//   widget:
//     1. Stays current — partners don't have to manually re-publish
//     2. Drives ongoing referral traffic via the "Powered by" link
//     3. Builds brand recognition wherever it's embedded
//     4. Generates a backlink that benefits SEO without requiring
//        outreach for every placement
//
// SiteChrome is bypassed for /embed/* routes (see SiteChrome.tsx)
// so this page renders without the WLR Navbar/Footer that would
// look out of place inside a partner's article.

export const metadata: Metadata = {
  title: "GLP-1 Price Tracker — Embeddable Widget",
  description: "Live GLP-1 pricing data from Weight Loss Rankings.",
  // Robots: noindex but follow. The embeddable widget itself
  // shouldn't compete with /price-tracker in search results.
  robots: { index: false, follow: true },
};

export const dynamic = "force-static";
export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://weightlossrankings.org";

export default async function PriceTrackerEmbedPage() {
  const [allProviders, recentChanges, bestDeals] = await Promise.all([
    getAllProviders(),
    Promise.resolve(getRecentChanges(90)),
    Promise.resolve(getBestCurrentDeals()),
  ]);

  const providerMap = new Map<string, Provider>(
    allProviders.map((p) => [p.slug, p]),
  );

  // Show top 5 recent price changes (sorted by absolute change pct,
  // already done by getRecentChanges)
  const topChanges = recentChanges.slice(0, 5);
  // Show top 5 cheapest current deals
  const topDeals = bestDeals.slice(0, 5);

  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        maxWidth: 720,
        margin: "0 auto",
        padding: "20px",
        color: "#1e1b4b",
        background: "#fff",
      }}
    >
      <div
        style={{
          borderLeft: "4px solid #8b5cf6",
          paddingLeft: 12,
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#64748b" }}>
          Live · Updated monthly
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 2 }}>
          GLP-1 Compounded Pricing
        </div>
      </div>

      {topChanges.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: "#475569", textTransform: "uppercase", letterSpacing: 1 }}>
            Recent price changes (90 days)
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#64748b" }}>
                <th style={{ textAlign: "left", padding: "6px 4px", fontWeight: 600 }}>Provider</th>
                <th style={{ textAlign: "left", padding: "6px 4px", fontWeight: 600 }}>Dose</th>
                <th style={{ textAlign: "right", padding: "6px 4px", fontWeight: 600 }}>Change</th>
              </tr>
            </thead>
            <tbody>
              {topChanges.map((change, i) => {
                const provider = providerMap.get(change.provider_slug);
                const isDown = change.direction === "down";
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 4px", fontWeight: 600 }}>
                      {provider?.name ?? change.provider_slug}
                    </td>
                    <td style={{ padding: "8px 4px", color: "#64748b" }}>
                      {change.dose} compounded
                    </td>
                    <td style={{ padding: "8px 4px", textAlign: "right" }}>
                      <span style={{ color: "#94a3b8", marginRight: 6 }}>
                        ${change.old_price}
                      </span>
                      →{" "}
                      <span
                        style={{
                          color: isDown ? "#16a34a" : "#dc2626",
                          fontWeight: 700,
                        }}
                      >
                        ${change.new_price}
                      </span>{" "}
                      <span
                        style={{
                          color: isDown ? "#16a34a" : "#dc2626",
                          fontSize: 12,
                          marginLeft: 4,
                        }}
                      >
                        ({isDown ? "▼" : "▲"} {Math.abs(change.change_pct)}%)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}

      {topDeals.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: "#475569", textTransform: "uppercase", letterSpacing: 1 }}>
            Cheapest current pricing
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <tbody>
              {topDeals.map((deal, i) => {
                const provider = providerMap.get(deal.provider_slug);
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 4px", fontWeight: 600 }}>
                      #{i + 1} {provider?.name ?? deal.provider_slug}
                    </td>
                    <td style={{ padding: "8px 4px", color: "#64748b" }}>
                      {deal.dose} compounded
                    </td>
                    <td style={{ padding: "8px 4px", textAlign: "right", fontWeight: 700, color: "#16a34a" }}>
                      ${deal.current_price}/mo
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}

      {/* Attribution footer — this is the SEO part. Every embed
          earns a backlink to /price-tracker via this link. Keep it
          subtle so partners don't strip it, but visible enough to
          drive referral traffic. */}
      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: "1px solid #e5e7eb",
          fontSize: 11,
          color: "#94a3b8",
          textAlign: "center",
        }}
      >
        Data from{" "}
        <a
          href={`${SITE_URL}/price-tracker?utm_source=embed&utm_medium=widget&utm_campaign=price_tracker_embed`}
          target="_blank"
          rel="noopener"
          style={{ color: "#8b5cf6", fontWeight: 600, textDecoration: "none" }}
        >
          weightlossrankings.org
        </a>
        {" · Updated monthly · "}
        <a
          href={`${SITE_URL}/methodology?utm_source=embed&utm_medium=widget&utm_campaign=price_tracker_embed`}
          target="_blank"
          rel="noopener"
          style={{ color: "#94a3b8", textDecoration: "underline" }}
        >
          Methodology
        </a>
      </div>
    </div>
  );
}
