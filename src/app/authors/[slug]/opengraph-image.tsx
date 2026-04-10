import { ImageResponse } from "next/og";
import { getAuthorBySlug } from "@/data/authors";

// Per-route OG image for /authors/[slug]. Author bio pages are the
// landing target for every article byline, so a named-author OG card
// is critical for social sharing of research articles where the
// byline is the hook.

export const alt = "Weight Loss Rankings — Author Bio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  const name = author?.name ?? "Editorial Team";
  const jobTitle = author?.jobTitle ?? "Editorial contributor";
  const credentialLine = author?.isClinician && author?.medicalCredentials
    ? `${author.medicalCredentials} · Medical reviewer`
    : "Editorial role · not a licensed clinician";

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
            Editorial Team
          </div>
          <div
            style={{
              fontSize: 112,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: 36, opacity: 0.85, marginTop: 8 }}>
            {jobTitle}
          </div>
          <div style={{ fontSize: 26, opacity: 0.7, marginTop: 4 }}>
            {credentialLine}
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
          <div>{`weightlossrankings.org/authors/${slug}`}</div>
          <div>Author bio</div>
        </div>
      </div>
    ),
    size,
  );
}
