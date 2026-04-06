import { ImageResponse } from "next/og";
import { getCityBySlug, getCityDrugLabel, isCityDrugSlug } from "@/lib/cities";

// Per-route OG image for /cities/[city]/[drug]. These are
// programmatic SEO pages targeting "[drug] in [city]" queries —
// per-route OG images are essential for both Discover surfacing
// and per-page social-share differentiation.

export const alt = "Weight Loss Rankings — drug availability by city";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ city: string; drug: string }>;
}) {
  const { city: citySlug, drug: drugSlug } = await params;
  const city = getCityBySlug(citySlug);
  const drugLabel = isCityDrugSlug(drugSlug)
    ? getCityDrugLabel(drugSlug)
    : drugSlug;

  const cityName = city?.city ?? "Your City";
  const stateCode = city?.state_code ?? "";

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
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Where to get
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              letterSpacing: -2.5,
              lineHeight: 1,
            }}
          >
            {drugLabel}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 600,
              opacity: 0.9,
              marginTop: 12,
            }}
          >
            in {cityName}
            {stateCode ? `, ${stateCode}` : ""}
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
          <div>Telehealth providers · Pricing · Pharmacies</div>
        </div>
      </div>
    ),
    size,
  );
}
