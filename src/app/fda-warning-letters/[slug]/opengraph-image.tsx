import { ImageResponse } from "next/og";
import { getWarningLetterBySlug } from "@/lib/fda-warning-letters";

// Per-route OG image for /fda-warning-letters/[slug]. FDA enforcement
// pages are exactly the kind of timely news content Discover loves
// to surface — but only if each one has a unique large image. See
// blog/[slug]/opengraph-image.tsx for the rationale.

export const alt = "Weight Loss Rankings — FDA warning letter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const letter = getWarningLetterBySlug(slug);

  const company = letter?.company_name ?? "FDA Warning Letter";
  const dba = letter?.company_dba;
  const date = formatDate(letter?.letter_date);
  const subject = letter?.subject ?? "";
  const office = letter?.issuing_office ?? "FDA";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          // Editorial red gradient — signals enforcement / regulatory news,
          // distinct from the standard purple brand gradient
          background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 18,
                height: 56,
                background: "#fbbf24",
                borderRadius: 4,
              }}
            />
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
              WEIGHT LOSS RANKINGS
            </div>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              background: "rgba(255,255,255,0.16)",
              padding: "10px 22px",
              borderRadius: 8,
            }}
          >
            FDA WARNING LETTER
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: company.length > 30 ? 64 : 84,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            {company}
          </div>
          {dba && (
            <div style={{ fontSize: 32, opacity: 0.9 }}>dba {dba}</div>
          )}
          {subject && (
            <div
              style={{
                fontSize: 28,
                opacity: 0.85,
                marginTop: 12,
                maxWidth: 1080,
                lineHeight: 1.3,
              }}
            >
              {subject.length > 120 ? subject.slice(0, 117) + "…" : subject}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            opacity: 0.85,
            fontSize: 24,
          }}
        >
          <div>{date}</div>
          <div>{office}</div>
        </div>
      </div>
    ),
    size,
  );
}
