import { ImageResponse } from "next/og";

export const alt = "Best Rankings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_MAP: Record<string, string> = {
  "semaglutide-providers": "GLP-1 Provider",
  "weight-loss-programs": "Weight Loss Program",
};

function toTitleCase(str: string): string {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const label = CATEGORY_MAP[category] ?? toTitleCase(category);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.85, marginBottom: 16 }}>
          Ranked by WeightLossRankings
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: -2,
            textAlign: "center",
          }}
        >
          Best {label}s in 2026
        </div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.9 }}>
          Independent Scores, Prices &amp; Expert Reviews
        </div>
        <div style={{ fontSize: 28, marginTop: 40, opacity: 0.7 }}>
          weightlossrankings.org
        </div>
      </div>
    ),
    size
  );
}
