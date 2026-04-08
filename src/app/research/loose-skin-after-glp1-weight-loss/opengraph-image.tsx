import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "loose-skin-after-glp1-weight-loss";

export const alt =
  "Weight Loss Rankings — Loose skin after rapid GLP-1 weight loss: the evidence";
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
            Hasanbegovic 2013 · Longland 2016 · STEP-1 · SURMOUNT-1
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.05, maxWidth: 1080 }}>
            Loose skin after GLP-1 weight loss
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 12 }}>
            <div style={{ display: "flex", fontSize: 132, fontWeight: 800, letterSpacing: -3, color: "#a78bfa", lineHeight: 1 }}>
              92.8%
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, opacity: 0.9, paddingBottom: 12, maxWidth: 700 }}>
              of bariatric patients losing &gt;50 kg report redundant skin · what protein and resistance training do about it
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.85, fontSize: 24 }}>
          <div style={{ display: "flex" }}>weightlossrankings.org</div>
          <div style={{ display: "flex" }}>12 PubMed-verified citations · 2026-04-07</div>
        </div>
      </div>
    ),
    size,
  );
}
