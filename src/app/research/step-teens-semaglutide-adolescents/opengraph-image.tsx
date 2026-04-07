import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "step-teens-semaglutide-adolescents";

export const alt =
  "Weight Loss Rankings — STEP-TEENS semaglutide for adolescents";
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
          <div
            style={{
              display: "flex",
              width: 18,
              height: 56,
              background: "#fbbf24",
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
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            STEP-TEENS · scientific deep-dive
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
            Semaglutide for adolescents with obesity
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
                color: "#fbbf24",
                lineHeight: 1,
              }}
            >
              −16.7
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
              percentage points BMI separation vs placebo at 68 weeks
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            opacity: 0.75,
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>weightlossrankings.org</div>
          <div style={{ display: "flex" }}>Weghuber et al, NEJM 2022</div>
        </div>
      </div>
    ),
    size,
  );
}
