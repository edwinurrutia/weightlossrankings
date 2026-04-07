import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "does-glp1-cause-liver-damage-nafld-nash-evidence";

export const alt =
  "Weight Loss Rankings — Does a GLP-1 cause liver damage? The evidence on NAFLD, MASLD, and MASH";
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
            "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6366f1 100%)",
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
            Newsome 2021 · SYNERGY-NASH 2024 · STEP · SURMOUNT
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
            Does a GLP-1 cause liver damage?
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
                fontSize: 120,
                fontWeight: 800,
                letterSpacing: -3,
                color: "#a78bfa",
                lineHeight: 1,
              }}
            >
              opposite
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
              Trials show semaglutide and tirzepatide reduce liver fat
              and improve MASH histology.
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
            MASLD · MASH · ALT/AST · DILI · Hy&apos;s law
          </div>
        </div>
      </div>
    ),
    size,
  );
}
