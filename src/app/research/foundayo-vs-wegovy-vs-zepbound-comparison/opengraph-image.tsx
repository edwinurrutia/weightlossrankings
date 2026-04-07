import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "foundayo-vs-wegovy-vs-zepbound-comparison";

export const alt =
  "Weight Loss Rankings — Foundayo vs Wegovy vs Zepbound: head-to-head comparison 2026";
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
            "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #8b5cf6 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 18, height: 56, background: "#a78bfa", borderRadius: 4 }} />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
            WEIGHT LOSS RANKINGS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, opacity: 0.9, textTransform: "uppercase", letterSpacing: 2 }}>
            ATTAIN-1 + STEP-1 + SURMOUNT-1 head-to-head
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.05, maxWidth: 1080 }}>
            Foundayo vs Wegovy vs Zepbound
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 16 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 18, fontWeight: 700, color: "#c4b5fd", letterSpacing: 1 }}>FOUNDAYO</div>
              <div style={{ display: "flex", fontSize: 56, fontWeight: 800, color: "#a78bfa", lineHeight: 1, marginTop: 4 }}>11.1%</div>
              <div style={{ display: "flex", fontSize: 16, opacity: 0.85, marginTop: 4 }}>oral · $25-149/mo</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 18, fontWeight: 700, color: "#c4b5fd", letterSpacing: 1 }}>WEGOVY</div>
              <div style={{ display: "flex", fontSize: 56, fontWeight: 800, color: "#a78bfa", lineHeight: 1, marginTop: 4 }}>14.9%</div>
              <div style={{ display: "flex", fontSize: 16, opacity: 0.85, marginTop: 4 }}>weekly · $199-499/mo</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 18, fontWeight: 700, color: "#c4b5fd", letterSpacing: 1 }}>ZEPBOUND</div>
              <div style={{ display: "flex", fontSize: 56, fontWeight: 800, color: "#a78bfa", lineHeight: 1, marginTop: 4 }}>20.9%</div>
              <div style={{ display: "flex", fontSize: 16, opacity: 0.85, marginTop: 4 }}>weekly · $299-449/mo</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.85, fontSize: 24 }}>
          <div style={{ display: "flex" }}>weightlossrankings.org</div>
          <div style={{ display: "flex" }}>FDA-approved 2026 · trial data + 2026 pricing</div>
        </div>
      </div>
    ),
    size,
  );
}
