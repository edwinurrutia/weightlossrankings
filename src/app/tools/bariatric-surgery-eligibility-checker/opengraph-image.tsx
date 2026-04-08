import { ImageResponse } from "next/og";

export const alt =
  "Weight Loss Rankings — Bariatric Surgery Eligibility Checker: NIH 1991, ASMBS 2022, Medicare, and major commercial payers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #5b21b6 50%, #3b82f6 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 18, height: 56, background: "#8b5cf6", borderRadius: 4 }} />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
            WEIGHT LOSS RANKINGS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, opacity: 0.9, textTransform: "uppercase", letterSpacing: 2 }}>
            NIH 1991 · ASMBS 2022 · Medicare NCD 100.1 · 5 commercial payers
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.05, maxWidth: 1080 }}>
            Bariatric Surgery Eligibility Checker
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 12 }}>
            <div style={{ display: "flex", fontSize: 132, fontWeight: 800, letterSpacing: -3, color: "#a78bfa", lineHeight: 1 }}>
              8
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, opacity: 0.9, paddingBottom: 12, maxWidth: 700 }}>
              eligibility standards in parallel · 50 unit tests + 1000-iter fuzz · per-payer source URLs
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.85, fontSize: 24 }}>
          <div style={{ display: "flex" }}>weightlossrankings.org/tools</div>
          <div style={{ display: "flex" }}>2026-04-07 · primary-source verified</div>
        </div>
      </div>
    ),
    size,
  );
}
