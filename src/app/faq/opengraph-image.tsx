import { ImageResponse } from "next/og";

export const alt = "Frequently Asked Questions — Weight Loss Rankings";
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
          GLP-1s · providers · insurance · cost
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          Frequently
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          Asked Questions
        </div>
        <div style={{ fontSize: 34, marginTop: 28, opacity: 0.92 }}>
          Plain answers from our editorial team
        </div>
        <div style={{ fontSize: 26, marginTop: 36, opacity: 0.7 }}>
          weightlossrankings.org/faq
        </div>
      </div>
    ),
    size,
  );
}
