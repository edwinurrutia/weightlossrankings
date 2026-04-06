import { ImageResponse } from "next/og";
import { getStateBySlug } from "@/lib/states";
import { getDrugBySlug } from "@/lib/drugs";

// Per-route OG image for /states/[state]/[drug]. These are
// programmatic SEO pages that scale to 50 states × N drugs each.
// Without per-route OG images, every state/drug combo would share
// the same site-wide image, hurting both Discover eligibility and
// social-share click-through.

export const alt = "Weight Loss Rankings — drug availability by state";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ state: string; drug: string }>;
}) {
  const { state: stateSlug, drug: drugSlug } = await params;
  const state = getStateBySlug(stateSlug);
  const drug = getDrugBySlug(drugSlug);

  const stateName = state?.name ?? "Your State";
  const drugName = drug?.name ?? "GLP-1";

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
            {drugName}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 600,
              opacity: 0.9,
              marginTop: 12,
            }}
          >
            in {stateName}
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
          <div>Providers · Pricing · Telehealth options</div>
        </div>
      </div>
    ),
    size,
  );
}
