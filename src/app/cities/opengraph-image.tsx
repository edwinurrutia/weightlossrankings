import { ImageResponse } from "next/og";

export const alt = "GLP-1 Providers by City — 20 Largest US Cities";
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
          Local GLP-1 access
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          GLP-1 Providers
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          by City
        </div>
        <div style={{ fontSize: 36, marginTop: 28, opacity: 0.92 }}>
          20 largest US cities · telehealth + local
        </div>
        <div style={{ fontSize: 26, marginTop: 36, opacity: 0.7 }}>
          weightlossrankings.org/cities
        </div>
      </div>
    ),
    size,
  );
}
