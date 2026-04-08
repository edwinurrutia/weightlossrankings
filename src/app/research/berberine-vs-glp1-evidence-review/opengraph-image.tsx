import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "berberine-vs-glp1-evidence-review";

export const alt =
  "Weight Loss Rankings — Berberine vs GLP-1s: the evidence behind 'nature's Ozempic'";
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
            "linear-gradient(135deg, #1e1b4b 0%, #5b21b6 50%, #8b5cf6 100%)",
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
            Asbaghi 2020 · STEP-1 · SURMOUNT-1
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
            Berberine vs GLP-1s: what the evidence shows
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
              −2.07 kg
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 600,
                opacity: 0.9,
                paddingBottom: 12,
                maxWidth: 700,
              }}
            >
              berberine, 12-RCT meta-analysis · vs −14.9% (sema) and −20.9% (tirz)
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
            11 PubMed-verified citations · 2026-04-07
          </div>
        </div>
      </div>
    ),
    size,
  );
}
