import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";
import { getAllInsurers } from "@/lib/insurers";

const SLUG = "glp1-insurance-coverage-audit-2026";

export const alt = "Weight Loss Rankings — GLP-1 insurance coverage audit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const formatMembers = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
};

export default async function Image() {
  const article = getResearchArticleBySlug(SLUG);
  const insurers = getAllInsurers();
  const totalMembers = insurers.reduce(
    (sum, i) => sum + (i.member_count ?? 0),
    0,
  );
  const priorAuthPct =
    insurers.length > 0
      ? Math.round(
          (insurers.filter((i) => i.prior_auth_required).length /
            insurers.length) *
            100,
        )
      : 0;

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
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
            Insurance audit · 2026
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
            GLP-1 coverage at the 10 largest US insurers
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              marginTop: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 156,
                fontWeight: 800,
                letterSpacing: -3,
                color: "#fbbf24",
                lineHeight: 1,
              }}
            >
              {`${priorAuthPct}%`}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 600,
                opacity: 0.9,
                paddingBottom: 16,
                maxWidth: 700,
              }}
            >
              {`require prior authorization · ${formatMembers(totalMembers)} total members`}
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
            {article?.publishedDate ?? "2026"}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
