import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "metformin-vs-glp1-weight-loss-evidence";

export const alt =
  "Weight Loss Rankings — Metformin vs GLP-1s: DPP, DPPOS, ADOPT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  void getResearchArticleBySlug(SLUG);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e1b4b 0%, #5b21b6 50%, #8b5cf6 100%)",
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
            DPP · DPPOS 15-year · ADOPT · Seifarth 2013
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.05, maxWidth: 1080 }}>
            Metformin vs GLP-1s
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 12 }}>
            <div style={{ display: "flex", fontSize: 132, fontWeight: 800, letterSpacing: -3, color: "#a78bfa", lineHeight: 1 }}>
              −2.1 kg
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, opacity: 0.9, paddingBottom: 12, maxWidth: 700 }}>
              metformin in DPP vs −15.3 kg semaglutide vs −22 kg tirzepatide · ~1/5 to 1/7 the magnitude
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.85, fontSize: 24 }}>
          <div style={{ display: "flex" }}>weightlossrankings.org</div>
          <div style={{ display: "flex" }}>11 PubMed-verified citations · 2026-04-08</div>
        </div>
      </div>
    ),
    size,
  );
}
