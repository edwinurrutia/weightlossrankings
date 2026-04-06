import { ImageResponse } from "next/og";
import { getArticleBySlug, getTopicBySlug } from "@/lib/learn";

// Per-route OG image for /learn/[topic]/[slug] long-tail
// educational content. Per-route OG images make each article
// individually shareable + Discover-eligible.

export const alt = "Weight Loss Rankings — learn";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic: topicSlug, slug } = await params;
  const [article, topic] = await Promise.all([
    getArticleBySlug(topicSlug, slug),
    getTopicBySlug(topicSlug),
  ]);

  const title = article?.title ?? "Educational Article";
  const topicLabel = topic?.short_title ?? topic?.title ?? "Learn";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #8b5cf6 100%)",
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
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {`Learn · ${topicLabel}`}
          </div>
          <div
            style={{
              fontSize: title.length > 80 ? 56 : title.length > 50 ? 68 : 80,
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 1080,
            }}
          >
            {title}
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
          <div>weightlossrankings.org</div>
          <div>Independent rankings &amp; reviews</div>
        </div>
      </div>
    ),
    size,
  );
}
