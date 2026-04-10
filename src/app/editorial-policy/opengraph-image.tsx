import { ImageResponse } from "next/og";

// Per-route OG image for /editorial-policy. The editorial policy page
// is the Organization.publishingPrinciples target and one of the three
// E-E-A-T anchor pages (alongside /corrections and /authors). A
// distinct OG card makes social shares of the trust-signal pages
// visually distinct from content pages.

export const alt = "Weight Loss Rankings — Editorial Policy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
            How We Work
          </div>
          <div
            style={{
              fontSize: 112,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Editorial Policy
          </div>
          <div style={{ fontSize: 32, opacity: 0.85, marginTop: 12 }}>
            Named authors · primary-source verification · 125% standard
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
          <div>weightlossrankings.org/editorial-policy</div>
          <div>YMYL transparency</div>
        </div>
      </div>
    ),
    size,
  );
}
