import { ImageResponse } from "next/og";

export const alt = "Does My Insurance Cover GLP-1s? Browse Major Insurers — Weight Loss Rankings";
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
          Coverage by plan
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          Does My Insurance
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          Cover GLP-1s?
        </div>
        <div style={{ fontSize: 34, marginTop: 28, opacity: 0.92 }}>
          BCBS · UHC · Aetna · Cigna · Humana · Medicare · Medicaid
        </div>
        <div style={{ fontSize: 26, marginTop: 36, opacity: 0.7 }}>
          weightlossrankings.org/insurance
        </div>
      </div>
    ),
    size,
  );
}
