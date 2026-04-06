import { ImageResponse } from "next/og";
import { findVariant } from "@/lib/variants";

// Per-route OG image for /best/[category]/[variant] — the
// dose/form/insurance variant pages that scale across many
// dimensions. Each variant deserves its own image so they don't
// all share the parent /best/[category] OG image.

export const alt = "Weight Loss Rankings — best providers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; variant: string }>;
}) {
  const { category, variant } = await params;
  const variantConfig = findVariant(category, variant);

  const h1 = variantConfig?.h1 ?? "Best GLP-1 Providers";

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
            Editorial Ranking · 2026
          </div>
          <div
            style={{
              fontSize: h1.length > 60 ? 64 : h1.length > 40 ? 80 : 96,
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            {h1}
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
          <div>80+ providers · monthly updates</div>
        </div>
      </div>
    ),
    size,
  );
}
