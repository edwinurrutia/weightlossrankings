import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "select-trial-cardiovascular-benefits-non-diabetics";

export const alt =
  "Weight Loss Rankings — SELECT trial cardiovascular benefits";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Pull article record so a future variant can use publishedDate
  // or other metadata. Currently the OG image renders the
  // hardcoded SELECT trial reference instead because the trial
  // identity is the visual hook, not the post date.
  void getResearchArticleBySlug(SLUG);

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
              display: "flex",
              width: 18,
              height: 56,
              background: "#fbbf24",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            WEIGHT LOSS RANKINGS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            SELECT trial · scientific deep-dive
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            Semaglutide cuts MACE by
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              marginTop: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 200,
                fontWeight: 800,
                letterSpacing: -4,
                lineHeight: 1,
                color: "#fbbf24",
              }}
            >
              20%
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 600,
                opacity: 0.9,
                paddingBottom: 18,
                maxWidth: 700,
              }}
            >
              in non-diabetic adults with established cardiovascular disease
            </div>
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
          <div style={{ display: "flex" }}>weightlossrankings.org</div>
          <div style={{ display: "flex" }}>
            {`Lincoff et al, NEJM 2023 · n=17,604`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
