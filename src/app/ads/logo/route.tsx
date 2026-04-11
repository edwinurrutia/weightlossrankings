import { ImageResponse } from "next/og";

// Google Ads logo asset (also works as a brand logo elsewhere).
// Required ratio: 1:1
// Pixels: 1200 × 1200
//
// Design: clean centered wordmark with a decorative gradient pill
// beneath it. Works on light or dark backgrounds because the
// background fills the full square with the brand gradient.
//
// Served at: https://www.weightlossrankings.org/ads/logo

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 160,
        }}
      >
        {/* Icon mark — upward chart arrow glyph rendered with pure
            SVG primitives. Contained in a rounded violet square. */}
        <div
          style={{
            width: 440,
            height: 440,
            borderRadius: 88,
            background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 56,
            boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3)",
          }}
        >
          {/* Inner stylized "WLR" wordmark-as-icon */}
          <div
            style={{
              color: "white",
              fontSize: 260,
              fontWeight: 900,
              letterSpacing: -8,
              lineHeight: 1,
              fontFamily: "serif",
            }}
          >
            W
          </div>
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              color: "#1e1b4b",
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            Weight Loss
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1,
              background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Rankings
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 1200 }
  );
}
