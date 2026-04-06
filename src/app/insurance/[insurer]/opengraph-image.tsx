import { ImageResponse } from "next/og";
import { getInsurerBySlug } from "@/lib/insurers";

// Per-route OG image for /insurance/[insurer]. See
// blog/[slug]/opengraph-image.tsx for the full rationale.

export const alt = "Weight Loss Rankings — insurance coverage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ insurer: string }>;
}) {
  const { insurer: slug } = await params;
  const insurer = getInsurerBySlug(slug);

  const name = insurer?.name ?? "Insurance Coverage";
  const coversLabel = (() => {
    switch (insurer?.covers_glp1) {
      case "yes":
        return "Covers GLP-1";
      case "no":
        return "Does not cover";
      case "limited":
        return "Limited coverage";
      case "varies":
        return "Coverage varies by plan";
      default:
        return "GLP-1 Coverage";
    }
  })();
  const coversColor = insurer?.covers_glp1 === "no" ? "#dc2626" : "#16a34a";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #8b5cf6 100%)",
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
              width: 18,
              height: 56,
              background: "#8b5cf6",
              borderRadius: 4,
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
            WEIGHT LOSS RANKINGS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Insurance Coverage
          </div>
          <div
            style={{
              fontSize: name.length > 25 ? 84 : 104,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 8,
              gap: 14,
            }}
          >
            <span
              style={{
                background: coversColor,
                color: "white",
                fontSize: 26,
                fontWeight: 700,
                padding: "10px 22px",
                borderRadius: 10,
              }}
            >
              {coversLabel}
            </span>
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
          <div>weightlossrankings.org</div>
          <div>Wegovy · Ozempic · Mounjaro · Zepbound</div>
        </div>
      </div>
    ),
    size,
  );
}
