import { ImageResponse } from "next/og";

export const alt = "Weight Loss Rankings";
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
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.85, marginBottom: 16 }}>
          Independent Rankings &amp; Reviews
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -2 }}>
          Weight Loss Rankings
        </div>
        <div style={{ fontSize: 40, marginTop: 20, opacity: 0.9 }}>
          Compare GLP-1 Providers, Prices &amp; Reviews
        </div>
        <div style={{ fontSize: 28, marginTop: 40, opacity: 0.7 }}>
          weightlossrankings.org
        </div>
      </div>
    ),
    size
  );
}
