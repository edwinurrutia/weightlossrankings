import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";
import pharmaciesData from "@/data/pharmacies.json";

const SLUG = "pcab-accreditation-compounding-pharmacy-investigation";

export const alt =
  "Weight Loss Rankings — PCAB accreditation: what it actually verifies in compounding pharmacies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  void getResearchArticleBySlug(SLUG);
  const total = pharmaciesData.length;
  const pcab = (pharmaciesData as { certifications?: string[] }[]).filter(
    (p) =>
      (p.certifications ?? []).some((c) => c.toUpperCase().includes("PCAB")),
  ).length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%)",
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
              opacity: 0.9,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            PCAB · data investigation
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
            What PCAB accreditation actually verifies (and doesn&apos;t)
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
              {`${pcab}/${total}`}
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
              compounding pharmacies in our database with PCAB accreditation
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
          <div style={{ display: "flex" }}>503A vs 503B · USP 797 · FDA warnings</div>
        </div>
      </div>
    ),
    size,
  );
}
