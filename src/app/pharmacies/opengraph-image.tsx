import { ImageResponse } from "next/og";
import { getAllPharmacies } from "@/lib/pharmacies";

// Per-route OG image for the /pharmacies index. Individual
// pharmacy pages already have OG images via /pharmacies/[slug].

export const alt = "Weight Loss Rankings — Compounding Pharmacies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const count = getAllPharmacies().length;
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
            Pharmacy Directory
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Compounding Pharmacies
          </div>
          <div style={{ fontSize: 32, opacity: 0.85, marginTop: 12 }}>
            {`${count} 503A / 503B pharmacies · GLP-1 compounding · US licensed`}
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
          <div>weightlossrankings.org/pharmacies</div>
          <div>Independent directory</div>
        </div>
      </div>
    ),
    size,
  );
}
