/**
 * GET /go/[slug] — server-side outbound redirect for provider links.
 *
 * Why this exists alongside the existing /api/track-click beacon:
 *
 *   Beacon-only tracking misses clicks. sendBeacon can be blocked by
 *   ad blockers, fail on slow networks, never fire if a JS error
 *   happens before the click handler, or get dropped by browsers
 *   that aggressively cancel `keepalive` fetches. The beacon also
 *   only carries the three fields the client passes (provider,
 *   source, position).
 *
 *   A server-side redirect captures EVERY click — the request has to
 *   reach our server in order to navigate. We get the full request
 *   context server-side: client IP (rough geolocation), user agent,
 *   referer (which page on our site they clicked from), timestamp,
 *   and any cookies. None of that can be blocked without breaking
 *   the link itself.
 *
 *   It also gives us a single point of control: if we want to pause
 *   a provider's link, swap an affiliate destination, A/B test two
 *   landing URLs, or rotate between programs (Impact ↔ direct), we
 *   change one map (or one KV entry) instead of hunting through 11
 *   components and pushing a deploy.
 *
 * Query params:
 *   ?src=<source-page-slug>   maps to utm_campaign and click attribution
 *   ?pos=<1-indexed position> maps to utm_term=pos-N and click attribution
 *
 * The destination URL is looked up from src/data/providers.json by
 * slug, then UTM-tagged via buildOutboundLink so the destination
 * provider's analytics still attributes the visit to us.
 */

import { redirect } from "next/navigation";
import providersData from "@/data/providers.json";
import { buildOutboundLink } from "@/lib/affiliate-link";
import { incrementClick } from "@/lib/kv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ProviderRecord {
  slug: string;
  name?: string;
  affiliate_url?: string;
}

const providers = providersData as ProviderRecord[];
const providerBySlug = new Map<string, ProviderRecord>();
for (const p of providers) {
  if (p.slug) providerBySlug.set(p.slug, p);
}

function parsePosition(raw: string | null): number | null {
  if (!raw) return null;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n <= 0 || n > 100) return null;
  return n;
}

function sanitizeSource(raw: string | null): string {
  if (!raw) return "go";
  return raw.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80) || "go";
}

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const slug = (params.slug || "").toLowerCase();
  const provider = providerBySlug.get(slug);
  if (!provider || !provider.affiliate_url) {
    // No matching provider — return a 404 page rather than 302ing
    // somewhere arbitrary. Don't leak the slug back into the body.
    return new Response("Provider not found", { status: 404 });
  }

  const url = new URL(req.url);
  const source = sanitizeSource(url.searchParams.get("src"));
  const position = parsePosition(url.searchParams.get("pos"));

  // Server-side click logging — runs unconditionally and can't be
  // blocked by client-side ad blockers. Falls back to a no-op when
  // KV isn't configured (see src/lib/kv.ts).
  //
  // We pass IP + user agent so incrementClick can record a
  // privacy-respecting daily-rotating visitor hash for unique
  // visitor counts. The hash cannot be linked across days even by
  // us, which sidesteps GDPR/CCPA tracking-identifier concerns.
  // See visitorIdFromRequest in src/lib/kv.ts for details.
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null;
    const userAgent = req.headers.get("user-agent");
    await incrementClick(slug, source, position, { ip, userAgent });
  } catch (err) {
    // Never let a logging failure break the redirect. The user came
    // here to be sent to the provider — that's the contract.
    console.error("[/go] click logging failed", err);
  }

  // Tag the outbound URL with UTM params so the destination
  // provider's analytics still sees us as a named referrer.
  const outbound = buildOutboundLink(provider.affiliate_url, {
    source,
    provider: slug,
    position: position ?? undefined,
  });

  // 302 is correct here — the destination is dynamic and may change
  // (affiliate program swap, link rotation), so we don't want
  // browsers or search engines to cache it as a permanent redirect.
  redirect(outbound);
}
