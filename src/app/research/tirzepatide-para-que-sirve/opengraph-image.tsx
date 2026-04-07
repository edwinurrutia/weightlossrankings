import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

// Per-route OG image for /research/tirzepatide-para-que-sirve (Spanish).
// Uses the same flex-everywhere safari-safe pattern as the English
// research articles so it renders identically on every platform.

const SLUG = "tirzepatide-para-que-sirve";

export const alt = "Weight Loss Rankings — Investigación";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const article = getResearchArticleBySlug(SLUG);
  const title = article?.title ?? "Tirzepatida";
  const citations = article?.citations;

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
              width: 18,
              height: 56,
              background: "#fbbf24",
              borderRadius: 4,
            }}
          />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
            WEIGHT LOSS RANKINGS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Investigación · Guía en español
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 70 ? 56 : title.length > 50 ? 68 : 80,
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            {title}
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
          {typeof citations === "number" && (
            <div style={{ display: "flex" }}>{`${citations} referencias primarias`}</div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
