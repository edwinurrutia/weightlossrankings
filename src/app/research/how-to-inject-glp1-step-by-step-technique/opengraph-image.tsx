import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "how-to-inject-glp1-step-by-step-technique";

export const alt =
  "Weight Loss Rankings — How to inject a GLP-1: step-by-step technique guide";
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
            "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #6366f1 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 18,
              height: 56,
              background: "#8b5cf6",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            WEIGHT LOSS RANKINGS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.9,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Pen · Multi-dose · Vial · Insulin syringe
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            How to inject a GLP-1: the step-by-step technique guide
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              marginTop: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 156,
                fontWeight: 800,
                letterSpacing: -3,
                color: "#a78bfa",
                lineHeight: 1,
              }}
            >
              10s
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 600,
                opacity: 0.9,
                paddingBottom: 12,
                maxWidth: 700,
              }}
            >
              hold the pen against the skin after the click — the #1
              technique step
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            opacity: 0.85,
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>weightlossrankings.org</div>
          <div style={{ display: "flex" }}>
            FDA labels: Wegovy · Ozempic · Zepbound · Mounjaro
          </div>
        </div>
      </div>
    ),
    size,
  );
}
