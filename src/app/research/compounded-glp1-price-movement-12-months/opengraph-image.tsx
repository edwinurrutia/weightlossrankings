import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";
import { getPriceHistory } from "@/lib/price-history";

// Per-route OG image. Reads the price-history dataset at render
// time and renders the average % cut as a giant headline figure.
// Updates automatically as new monthly snapshots roll in.

const SLUG = "compounded-glp1-price-movement-12-months";

export const alt =
  "Weight Loss Rankings — compounded GLP-1 price movement, 16-month trajectory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const article = getResearchArticleBySlug(SLUG);
  const history = getPriceHistory();

  // Compute average % cut across providers with multi-point series
  const trajectories = history
    .filter((e) => e.history.length >= 6)
    .map((e) => {
      const sorted = [...e.history].sort((a, b) =>
        a.date.localeCompare(b.date),
      );
      const start = sorted[0].price;
      const end = sorted[sorted.length - 1].price;
      return ((end - start) / start) * 100;
    });
  const avgCutPct =
    trajectories.length > 0
      ? Math.abs(
          trajectories.reduce((sum, t) => sum + t, 0) / trajectories.length,
        )
      : 0;
  const providerCount = trajectories.length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #8b5cf6 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 18,
              height: 56,
              background: "#fbbf24",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            WEIGHT LOSS RANKINGS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Live data investigation
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            Compounded GLP-1 prices have fallen
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              marginTop: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 200,
                fontWeight: 800,
                letterSpacing: -4,
                lineHeight: 1,
                color: "#fbbf24",
              }}
            >
              {`${avgCutPct.toFixed(0)}%`}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 36,
                fontWeight: 600,
                opacity: 0.9,
                paddingBottom: 18,
              }}
            >
              {`average across ${providerCount} tracked providers`}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            opacity: 0.75,
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>weightlossrankings.org</div>
          <div style={{ display: "flex" }}>
            {article?.publishedDate ?? "2026"}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
