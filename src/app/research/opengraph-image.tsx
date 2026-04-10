import { ImageResponse } from "next/og";
import { RESEARCH_ARTICLES } from "@/lib/research";

// Per-route OG image for the /research index. Individual research
// articles each ship their own OG image via per-article
// opengraph-image.tsx siblings; this one is the hub/listing page.

export const alt = "Weight Loss Rankings — Research Library";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const count = RESEARCH_ARTICLES.length;
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
              background: "#8b5cf6",
              borderRadius: 4,
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
            WEIGHT LOSS RANKINGS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Research Library
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            GLP-1 Research
          </div>
          <div style={{ fontSize: 32, opacity: 0.85, marginTop: 12 }}>
            {`${count} PubMed-cited articles · FDA primary sources · trial data`}
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
          <div>weightlossrankings.org/research</div>
          <div>Primary-source verified</div>
        </div>
      </div>
    ),
    size,
  );
}
