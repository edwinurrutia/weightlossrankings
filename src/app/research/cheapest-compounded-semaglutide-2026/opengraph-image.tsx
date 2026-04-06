import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";
import { getPricingStats } from "@/lib/pricing-analytics";

// Per-route OG image. Reads the floor price + median at render
// time so the image automatically updates whenever the pricing
// dataset changes.

const SLUG = "cheapest-compounded-semaglutide-2026";

export const alt = "Weight Loss Rankings — cheapest compounded semaglutide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const formatUsd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default async function Image() {
  const article = getResearchArticleBySlug(SLUG);
  const stats = getPricingStats("semaglutide", "compounded");
  const floor = stats.min;
  const median = stats.median;

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
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            Cheapest compounded semaglutide:
          </div>
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
            {formatUsd(floor)}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 600,
              opacity: 0.9,
              marginTop: 8,
            }}
          >
            {`per month, vs market median ${formatUsd(median)}`}
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
