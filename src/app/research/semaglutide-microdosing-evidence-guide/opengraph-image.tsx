import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "semaglutide-microdosing-evidence-guide";

export const alt =
  "Weight Loss Rankings — Microdosing semaglutide: what the evidence actually says";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  void getResearchArticleBySlug(SLUG);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #581c87 0%, #7e22ce 50%, #a855f7 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "white", fontFamily: "sans-serif", padding: "72px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 18, height: 56, background: "#fbbf24", borderRadius: 4 }} />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>WEIGHT LOSS RANKINGS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, opacity: 0.9, textTransform: "uppercase", letterSpacing: 2 }}>
            Evidence guide · off-label explainer
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.05, maxWidth: 1080 }}>
            Microdosing semaglutide: what the evidence says
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 12 }}>
            <div style={{ display: "flex", fontSize: 156, fontWeight: 800, letterSpacing: -3, color: "#fbbf24", lineHeight: 1 }}>~1%</div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 600, opacity: 0.9, paddingBottom: 12, maxWidth: 700 }}>
              mean weight loss at 0.25 mg for 4 weeks in STEP-1
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.85, fontSize: 24 }}>
          <div style={{ display: "flex" }}>weightlossrankings.org</div>
          <div style={{ display: "flex" }}>STEP-1 dose response · off-label framework</div>
        </div>
      </div>
    ),
    size,
  );
}
