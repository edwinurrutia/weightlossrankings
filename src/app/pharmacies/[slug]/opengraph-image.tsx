import { ImageResponse } from "next/og";
import { getPharmacyBySlug } from "@/lib/pharmacies";

// Per-route OG image for /pharmacies/[slug]. See
// blog/[slug]/opengraph-image.tsx for the rationale.

export const alt = "Weight Loss Rankings — pharmacy profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pharmacy = getPharmacyBySlug(slug);

  const name = pharmacy?.name ?? "Compounding Pharmacy";
  const location =
    pharmacy?.city && pharmacy?.state
      ? `${pharmacy.city}, ${pharmacy.state}`
      : pharmacy?.state ?? "";
  const type = pharmacy?.type ?? "";
  const score = pharmacy?.internal_score;
  const scoreDisplay =
    typeof score === "number" && Number.isFinite(score)
      ? score.toFixed(1)
      : null;

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
            Compounding Pharmacy {type && `· ${type}`}
          </div>
          <div
            style={{
              fontSize: name.length > 30 ? 76 : 96,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            {name}
          </div>
          {location && (
            <div style={{ fontSize: 36, opacity: 0.85, marginTop: 8 }}>
              📍 {location}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: 0.75,
            fontSize: 24,
          }}
        >
          <div>weightlossrankings.org</div>
          {scoreDisplay && (
            <div
              style={{
                background: "rgba(255,255,255,0.18)",
                padding: "10px 24px",
                borderRadius: 12,
                fontSize: 28,
                fontWeight: 700,
                opacity: 1,
              }}
            >
              {scoreDisplay} / 10
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
