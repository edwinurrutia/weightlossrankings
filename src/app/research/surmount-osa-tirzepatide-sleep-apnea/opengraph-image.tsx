import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "surmount-osa-tirzepatide-sleep-apnea";

export const alt =
  "Weight Loss Rankings — SURMOUNT-OSA tirzepatide for sleep apnea";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // The article record exists for future variants; the visual hook
  // is the trial result, not the post date.
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
            SURMOUNT-OSA · scientific deep-dive
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            Tirzepatide cut sleep apnea events by
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              marginTop: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 200,
                fontWeight: 800,
                letterSpacing: -4,
                lineHeight: 1,
                color: "#fbbf24",
              }}
            >
              ~50%
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 600,
                opacity: 0.9,
                paddingBottom: 18,
                maxWidth: 700,
              }}
            >
              from a severe baseline · first FDA-approved drug for OSA
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
            Malhotra et al, NEJM 2024
          </div>
        </div>
      </div>
    ),
    size,
  );
}
