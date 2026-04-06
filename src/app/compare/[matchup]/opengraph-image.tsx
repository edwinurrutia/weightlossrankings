import { ImageResponse } from "next/og";
import { getProviderBySlug } from "@/lib/data";

export const alt = "Head-to-Head Comparison";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function parseMatchup(
  matchup: string
): { slugA: string; slugB: string } | null {
  const vsIndex = matchup.indexOf("-vs-");
  if (vsIndex === -1) return null;
  const slugA = matchup.slice(0, vsIndex);
  const slugB = matchup.slice(vsIndex + 4);
  if (!slugA || !slugB) return null;
  return { slugA, slugB };
}

export default async function Image({
  params,
}: {
  params: Promise<{ matchup: string }>;
}) {
  const { matchup } = await params;
  const parsed = parseMatchup(matchup);

  let nameA = "Provider A";
  let nameB = "Provider B";

  if (parsed) {
    const [providerA, providerB] = await Promise.all([
      getProviderBySlug(parsed.slugA),
      getProviderBySlug(parsed.slugB),
    ]);
    if (providerA) nameA = providerA.name;
    if (providerB) nameB = providerB.name;
  }

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
        <div style={{ fontSize: 32, opacity: 0.8, marginBottom: 16 }}>
          Head-to-Head Comparison
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          <span>{nameA}</span>
          <span style={{ opacity: 0.6, fontSize: 56 }}>vs</span>
          <span>{nameB}</span>
        </div>
        <div style={{ fontSize: 32, marginTop: 28, opacity: 0.85 }}>
          Prices, Scores &amp; Expert Verdict
        </div>
        <div style={{ fontSize: 26, marginTop: 36, opacity: 0.7 }}>
          weightlossrankings.org
        </div>
      </div>
    ),
    size
  );
}
