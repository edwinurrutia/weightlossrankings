import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "wegovy-pen-vs-compounded-vial-practical-differences";

export const alt =
  "Weight Loss Rankings — Wegovy pen vs compounded vial comparison";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const article = getResearchArticleBySlug(SLUG);

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
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
            Practical guide
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            Wegovy pen vs compounded vial
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 600,
              opacity: 0.9,
              maxWidth: 1080,
              lineHeight: 1.15,
              marginTop: 12,
            }}
          >
            12 operational differences before you switch
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
