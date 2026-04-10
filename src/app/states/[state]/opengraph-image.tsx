import { ImageResponse } from "next/og";
import { US_STATES } from "@/lib/states";

// Per-route OG image for /states/[state]. Individual state pages
// show the state name + provider count so social shares look
// localized rather than generic. /states/[state]/[drug] has its
// own per-route OG image.

export const alt = "Weight Loss Rankings — GLP-1 Providers by State";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const stateData = US_STATES.find((s) => s.slug === state);
  const stateName = stateData?.name ?? "United States";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #8b5cf6 100%)",
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
            State Guide
          </div>
          <div
            style={{
              fontSize: 112,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {stateName}
          </div>
          <div style={{ fontSize: 32, opacity: 0.85, marginTop: 12 }}>
            Best GLP-1 telehealth providers · pricing · state coverage
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
          <div>{`weightlossrankings.org/states/${state}`}</div>
          <div>2026 ranking</div>
        </div>
      </div>
    ),
    size,
  );
}
