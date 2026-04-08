import { ImageResponse } from "next/og";
import { getResearchArticleBySlug } from "@/lib/research";

const SLUG = "topamax-qsymia-topiramate-weight-loss";

export const alt =
  "Weight Loss Rankings — Topamax, Qsymia, and topiramate for weight loss";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  void getResearchArticleBySlug(SLUG);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #6d28d9 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 18, height: 56, background: "#8b5cf6", borderRadius: 4 }} />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
            WEIGHT LOSS RANKINGS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, opacity: 0.9, textTransform: "uppercase", letterSpacing: 2 }}>
            Bray 2003 · Astrup 2004 · CONQUER · EQUIP · SEQUEL
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.05, maxWidth: 1080 }}>
            Topamax, Qsymia &amp; topiramate
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 12 }}>
            <div style={{ display: "flex", fontSize: 132, fontWeight: 800, letterSpacing: -3, color: "#a78bfa", lineHeight: 1 }}>
              −10.2 kg
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, opacity: 0.9, paddingBottom: 12, maxWidth: 700 }}>
              Qsymia 15/92 in CONQUER (n=2,487, 56wk) · ~2/3 of semaglutide · 78.7% T2D risk reduction in SEQUEL
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.85, fontSize: 24 }}>
          <div style={{ display: "flex" }}>weightlossrankings.org</div>
          <div style={{ display: "flex" }}>11 PubMed-verified citations · 2026-04-08</div>
        </div>
      </div>
    ),
    size,
  );
}
