import { ImageResponse } from "next/og";
import { getProviderBySlug } from "@/lib/data";
import { computeOverallScore } from "@/lib/scoring";

export const alt = "Provider Review";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider: slug } = await params;
  const provider = await getProviderBySlug(slug);

  const name = provider?.name ?? "Provider";
  const score = provider ? computeOverallScore(provider.scores) : null;
  const scoreDisplay = score !== null ? score.toFixed(1) : "—";

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
        <div style={{ fontSize: 32, opacity: 0.8, marginBottom: 12 }}>
          Review &amp; Score
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -2,
            textAlign: "center",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            marginTop: 24,
            background: "rgba(255,255,255,0.2)",
            padding: "16px 48px",
            borderRadius: 16,
          }}
        >
          {scoreDisplay} / 10
        </div>
        <div style={{ fontSize: 28, marginTop: 36, opacity: 0.75 }}>
          Read full review at weightlossrankings.org
        </div>
      </div>
    ),
    size
  );
}
