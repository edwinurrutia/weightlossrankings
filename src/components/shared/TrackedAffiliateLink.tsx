"use client";

import {
  appendKatalysSubIds,
  buildOutboundLink,
  isKatalysTrackingUrl,
} from "@/lib/affiliate-link";

interface TrackedAffiliateLinkProps {
  href: string;
  provider: string;
  source: string;
  /** 1-indexed position in the surrounding list. Optional. */
  position?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Plain anchor that fires the same /api/track-click beacon as CTAButton
 * but without the pill button styling. Used inside custom hero/card
 * components where we want full layout control but still need granular
 * click attribution (provider, source, and position).
 */
function fireTracking(provider: string, source: string, position?: number) {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({
      provider,
      source,
      ...(typeof position === "number" ? { position } : {}),
    });
    const url = "/api/track-click";
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      const blob = new Blob([payload], { type: "application/json" });
      const ok = navigator.sendBeacon(url, blob);
      if (ok) return;
    }
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never block navigation
  }
}

export default function TrackedAffiliateLink({
  href,
  provider,
  source,
  position,
  className,
  children,
}: TrackedAffiliateLinkProps) {
  const onClick = () => fireTracking(provider, source, position);
  // Three rendering paths, mirroring CTAButton:
  //
  //  1. Katalys tracking URL → render natively with sub2/sub3 appended
  //     so placement reaches Katalys's own reporting (no /go/ wrapper —
  //     affiliate networks treat intermediary redirects as cloaking).
  //
  //  2. Known provider slug, non-tracking affiliate_url → /go/[slug]
  //     wrapper for server-side logging.
  //
  //  3. Defensive fallback for empty provider prop → UTM-tagged direct.
  let outboundHref: string;
  if (isKatalysTrackingUrl(href)) {
    outboundHref = appendKatalysSubIds(href, { source, position });
  } else if (provider) {
    outboundHref = `/go/${encodeURIComponent(provider)}?src=${encodeURIComponent(source)}${
      typeof position === "number" ? `&pos=${position}` : ""
    }`;
  } else {
    outboundHref = buildOutboundLink(href, { source, provider, position });
  }
  return (
    <a
      href={outboundHref}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={className}
      onClick={onClick}
      onAuxClick={onClick}
    >
      {children}
    </a>
  );
}
