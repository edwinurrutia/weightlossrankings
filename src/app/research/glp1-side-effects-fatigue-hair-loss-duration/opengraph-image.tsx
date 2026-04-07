import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "glp1-side-effects-fatigue-hair-loss-duration";

export const alt =
  "Weight Loss Rankings — GLP-1 side effects duration: fatigue, hair loss, nausea timing";
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
            "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a78bfa 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 18, height: 56, background: "#fbbf24", borderRadius: 4 }} />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>WEIGHT LOSS RANKINGS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, opacity: 0.9, textTransform: "uppercase", letterSpacing: 2 }}>
            Patient guide · STEP-1 + SURMOUNT-1 sourced
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.05, maxWidth: 1080 }}>
            GLP-1 side effects: fatigue, hair loss, duration
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 12 }}>
            <div style={{ display: "flex", fontSize: 156, fontWeight: 800, letterSpacing: -3, color: "#fbbf24", lineHeight: 1 }}>~5%</div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 600, opacity: 0.9, paddingBottom: 12, maxWidth: 700 }}>
              hair loss rate on tirzepatide · fully reversible telogen effluvium
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.85, fontSize: 24 }}>
          <div style={{ display: "flex" }}>weightlossrankings.org</div>
          <div style={{ display: "flex" }}>Wegovy + Zepbound labels</div>
        </div>
      </div>
    ),
    size,
  );
}
