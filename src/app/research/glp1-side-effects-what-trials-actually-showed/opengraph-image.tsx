import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "glp1-side-effects-what-trials-actually-showed";

export const alt =
  "Weight Loss Rankings — GLP-1 side effects investigation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const article = getResearchArticleBySlug(SLUG);

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
            Scientific deep-dive
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            GLP-1 side effects
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 600,
              opacity: 0.9,
              maxWidth: 1080,
              lineHeight: 1.15,
              marginTop: 4,
            }}
          >
            What the STEP-1 and SURMOUNT-1 trials actually measured
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 24,
              marginTop: 18,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 84,
                  fontWeight: 800,
                  color: "#fbbf24",
                  lineHeight: 1,
                }}
              >
                43.9%
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  opacity: 0.85,
                  marginTop: 4,
                }}
              >
                semaglutide nausea (STEP-1)
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                opacity: 0.6,
                paddingBottom: 22,
              }}
            >
              vs
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 84,
                  fontWeight: 800,
                  color: "#fbbf24",
                  lineHeight: 1,
                }}
              >
                31.0%
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  opacity: 0.85,
                  marginTop: 4,
                }}
              >
                tirzepatide 15mg nausea (SURMOUNT-1)
              </div>
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
          <div style={{ display: "flex" }}>
            {article?.publishedDate ?? "2026"}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
