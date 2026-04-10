import { ImageResponse } from "next/og";
import { TOOLS } from "@/lib/tools";

// Per-route OG image for the /tools index. Individual tools each
// have their own OG image via per-tool opengraph-image.tsx siblings;
// this one is the hub/listing page.

export const alt = "Weight Loss Rankings — GLP-1 Tools & Calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const count = TOOLS.length;
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
            Interactive Tools
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            GLP-1 Calculators
          </div>
          <div style={{ fontSize: 32, opacity: 0.85, marginTop: 12 }}>
            {`${count} free calculators · BMI · dose · savings · reconstitution`}
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
          <div>weightlossrankings.org/tools</div>
          <div>Free · no signup</div>
        </div>
      </div>
    ),
    size,
  );
}
