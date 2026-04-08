import { ImageResponse } from "next/og";

export const alt = "Compare GLP-1 Providers, Programs & Prices — Weight Loss Rankings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          padding: 64,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.85, marginBottom: 12 }}>
          Side-by-side comparison
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          Compare GLP-1
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          Providers &amp; Prices
        </div>
        <div style={{ fontSize: 36, marginTop: 28, opacity: 0.92 }}>
          Filter by price, drug, dose, insurance &amp; more
        </div>
        <div style={{ fontSize: 26, marginTop: 36, opacity: 0.7 }}>
          weightlossrankings.org/compare
        </div>
      </div>
    ),
    size,
  );
}
