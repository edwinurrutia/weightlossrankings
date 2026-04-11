import { ImageResponse } from "next/og";

// Google Ads square image asset.
// Required ratio: 1:1
// Exact pixels: 1200 × 1200
//
// Served at: https://www.weightlossrankings.org/ads/square
// To use: right-click → Save As → upload to Google Ads.

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(155deg, #1e1b4b 0%, #4c1d95 40%, #6d28d9 100%)",
          position: "relative",
          paddingLeft: 88,
          paddingRight: 88,
          paddingTop: 88,
          paddingBottom: 88,
          justifyContent: "space-between",
        }}
      >
        {/* Decorative gradient orb */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: 600,
            background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0) 70%)",
          }}
        />

        {/* Top: brand lockup */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 28px",
              borderRadius: 999,
              background: "rgba(139, 92, 246, 0.25)",
              border: "1.5px solid rgba(139, 92, 246, 0.5)",
              color: "#e9d5ff",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 0.5,
              alignSelf: "flex-start",
            }}
          >
            WEIGHT LOSS RANKINGS
          </div>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: -4,
            }}
          >
            Compare
          </div>
          <div
            style={{
              color: "white",
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: -4,
            }}
          >
            154+ GLP-1
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: -4,
              marginBottom: 32,
              background: "linear-gradient(90deg, #c4b5fd, #60a5fa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Providers
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.88)",
              fontSize: 40,
              fontWeight: 500,
              lineHeight: 1.25,
              maxWidth: 900,
            }}
          >
            Independent editorial reviews with live pricing and primary-source clinical data.
          </div>
        </div>

        {/* Bottom: stat row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#c4b5fd", fontSize: 22, fontWeight: 600, letterSpacing: 1 }}>FROM</div>
            <div style={{ color: "white", fontSize: 72, fontWeight: 900, lineHeight: 1, marginTop: 4 }}>$99/mo</div>
          </div>
          <div
            style={{
              width: 2,
              height: 96,
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#c4b5fd", fontSize: 22, fontWeight: 600, letterSpacing: 1 }}>COVERAGE</div>
            <div style={{ color: "white", fontSize: 52, fontWeight: 900, lineHeight: 1, marginTop: 4 }}>All 50 states</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 1200 }
  );
}
