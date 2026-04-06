import { ImageResponse } from "next/og";
import { getDrugBySlug } from "@/lib/drugs";

// Per-route OG image for /drugs/[drug]. See blog/[slug]/opengraph-image.tsx
// for the full rationale on why per-route OG images are necessary for
// Discover and social-share quality.

export const alt = "Weight Loss Rankings — drug profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ drug: string }>;
}) {
  const { drug: slug } = await params;
  const drug = getDrugBySlug(slug);

  const name = drug?.name ?? "GLP-1 Drug";
  const generic = drug?.generic_name && drug.generic_name !== drug.name
    ? drug.generic_name
    : null;
  const brands = (drug?.brand_names ?? []).slice(0, 3).join(" · ");

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
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Drug Profile
          </div>
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {name}
          </div>
          {generic && (
            <div style={{ fontSize: 36, opacity: 0.85, marginTop: 8 }}>
              {generic}
            </div>
          )}
          {brands && (
            <div style={{ fontSize: 28, opacity: 0.7, marginTop: 4 }}>
              {`Brand names: ${brands}`}
            </div>
          )}
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
          <div>Pricing · providers · trial data</div>
        </div>
      </div>
    ),
    size,
  );
}
