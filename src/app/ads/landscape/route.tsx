import { ImageResponse } from "next/og";

// Google Ads landscape image asset.
// Required ratio: 1.91:1 (Google Ads display/Performance Max spec).
// Exact pixels: 1200 × 628.
//
// Served at: https://www.weightlossrankings.org/ads/landscape
// To use: right-click → Save As → upload to Google Ads.
//
// This is a brand-safe, policy-compliant ad creative:
//   - No medical outcome claims ("lose X lbs")
//   - No pharma-sales language ("buy Wegovy cheap")
//   - Describes the site's function (compare, review, rank)
//   - Brand-consistent gradient + typography

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 45%, #6d28d9 100%)",
          position: "relative",
        }}
      >
        {/* Decorative diagonal accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 12,
            height: "100%",
            background: "linear-gradient(180deg, #8b5cf6, #3b82f6)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 72,
            paddingRight: 48,
          }}
        >
          {/* Eyebrow badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(139, 92, 246, 0.25)",
              border: "1.5px solid rgba(139, 92, 246, 0.5)",
              color: "#e9d5ff",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 0.5,
              marginBottom: 22,
              alignSelf: "flex-start",
            }}
          >
            WEIGHTLOSSRANKINGS.ORG
          </div>

          {/* Headline */}
          <div
            style={{
              color: "white",
              fontSize: 78,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -2.5,
              marginBottom: 20,
            }}
          >
            Compare 154+
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -2.5,
              marginBottom: 28,
              background: "linear-gradient(90deg, #c4b5fd, #60a5fa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            GLP-1 Providers
          </div>

          {/* Subheadline */}
          <div
            style={{
              color: "rgba(255,255,255,0.88)",
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.3,
              maxWidth: 700,
            }}
          >
            Independent editorial reviews with live pricing, state coverage, and primary-source clinical data.
          </div>
        </div>

        {/* Right-side stat column */}
        <div
          style={{
            width: 340,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingRight: 60,
            gap: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#c4b5fd", fontSize: 18, fontWeight: 600, letterSpacing: 1 }}>STARTING AT</div>
            <div style={{ color: "white", fontSize: 64, fontWeight: 900, lineHeight: 1, marginTop: 4 }}>$99/mo</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, marginTop: 4 }}>compounded GLP-1</div>
          </div>
          <div
            style={{
              height: 1,
              width: 220,
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#c4b5fd", fontSize: 18, fontWeight: 600, letterSpacing: 1 }}>COVERAGE</div>
            <div style={{ color: "white", fontSize: 38, fontWeight: 800, lineHeight: 1, marginTop: 4 }}>All 50 states</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 628 }
  );
}
