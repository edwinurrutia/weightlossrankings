import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";
import { getAllWarningLetters } from "@/lib/fda-warning-letters";

// Per-route OG image. Reads the FDA letter count at render time so
// the image automatically updates when the bi-weekly scraper adds
// new letters — no manual asset to maintain.

const SLUG = "fda-warning-letters-glp1-2025-2026";

export const alt = "Weight Loss Rankings — FDA Warning Letter Investigation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const article = getResearchArticleBySlug(SLUG);
  const letters = getAllWarningLetters();
  const count = letters.length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          // Red enforcement gradient — distinct from the standard
          // purple research gradient. Signals "regulatory news"
          // visually on social timelines.
          background:
            "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              background: "rgba(255,255,255,0.16)",
              padding: "10px 22px",
              borderRadius: 8,
            }}
          >
            FDA INVESTIGATION
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
            Live editorial database
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 178,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {String(count)}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 38,
              fontWeight: 700,
              maxWidth: 1000,
              lineHeight: 1.15,
            }}
          >
            FDA warning letters to compounded GLP-1 telehealth providers
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
            {article?.publishedDate ?? "2026"}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
