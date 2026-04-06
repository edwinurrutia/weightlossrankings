import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/data";

// Per-route OG image. Without this, every blog post falls back to
// the site-wide /opengraph-image, which:
//   1. Kills Google Discover eligibility (Discover requires unique
//      large hero images per article to surface)
//   2. Makes every Twitter / Facebook / LinkedIn share preview
//      look identical, hurting click-through
//   3. Tells search engines "this is generic site chrome" instead
//      of "this is a unique article"
//
// Generated dynamically at request time via Next.js ImageResponse —
// no static asset to maintain. The post title is rendered server-side
// into a 1200×630 PNG branded with the WLR gradient + wordmark.

export const alt = "Weight Loss Rankings — blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  const title = post?.title ?? "Weight Loss Rankings";
  const category = post?.category ?? "Article";

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
              fontSize: 24,
              fontWeight: 600,
              opacity: 0.85,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {category}
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
            alignItems: "center",
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
