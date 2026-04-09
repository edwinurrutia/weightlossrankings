"use client";

import Link from "next/link";
import {
  appendKatalysSubIds,
  buildOutboundLink,
  isKatalysTrackingUrl,
} from "@/lib/affiliate-link";

type CTAButtonSize = "sm" | "md" | "lg";
type CTAButtonVariant = "primary" | "outline" | "white";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  size?: CTAButtonSize;
  variant?: CTAButtonVariant;
  className?: string;
  trackProvider?: string;
  trackSource?: string;
  /** 1-indexed position in the list/section this CTA appears in. Used by
   *  granular click attribution to compare slot performance. Omit for
   *  single CTAs that aren't part of an ordered list. */
  trackPosition?: number;
}

const sizeClasses: Record<CTAButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses: Record<CTAButtonVariant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-lg hover:shadow-xl hover:brightness-110",
  outline:
    "bg-white text-brand-violet border-2 border-brand-violet hover:bg-brand-violet hover:text-white",
  white:
    "bg-white text-brand-violet shadow-lg hover:shadow-xl hover:bg-white/90",
};

function fireTracking(
  provider: string,
  source: string,
  position?: number
) {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({
      provider,
      source,
      ...(typeof position === "number" ? { position } : {}),
    });
    const url = "/api/track-click";
    // Prefer sendBeacon — most reliable for link navigations
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      const blob = new Blob([payload], { type: "application/json" });
      const ok = navigator.sendBeacon(url, blob);
      if (ok) return;
    }
    // Fallback: fetch with keepalive
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

export default function CTAButton({
  href,
  children,
  external = false,
  size = "md",
  variant = "primary",
  className = "",
  trackProvider,
  trackSource,
  trackPosition,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all tap-target";
  const classes =
    `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

  const shouldTrack = Boolean(external && trackProvider);

  const handleClick = () => {
    if (!shouldTrack) return;
    fireTracking(
      trackProvider as string,
      trackSource ?? "unknown",
      trackPosition
    );
  };

  if (external) {
    // Three rendering paths for the outbound href:
    //
    //  1. Affiliate-network tracking URL already baked into href
    //     (e.g. https://track.revoffers.com/aff_c?... from Katalys).
    //     Render DIRECTLY in the <a href> with no /go/[slug] wrapper.
    //     Rationale: affiliate networks expect the click to originate
    //     from a same-domain anchor pointing at their tracking host.
    //     Wrapping with /go/[slug] technically still works (we tested
    //     — Katalys honors the server-side 307), but some networks
    //     treat intermediary redirects as "cloaking" or "masking" and
    //     risk TOS issues. Rendering the tracking URL directly is the
    //     transparent, network-preferred pattern. Server-side click
    //     logging is skipped for these clicks — Katalys's own click
    //     dashboard is the source of truth for affiliate conversions
    //     anyway (and it's what the payouts are based on).
    //
    //  2. Known provider slug with a non-tracking affiliate_url
    //     (e.g. https://www.hims.com). Route through /go/[slug] so we
    //     get reliable server-side click logging bypass of ad
    //     blockers. /go applies UTM tagging on the server before
    //     302-ing to the real provider URL.
    //
    //  3. External link not tied to a known provider slug (rare —
    //     non-affiliate outbound links). Tag the href directly with
    //     UTM params and render as an <a>.
    const isAffiliateTrackingHost = isKatalysTrackingUrl(href);
    let outboundHref: string;
    if (isAffiliateTrackingHost) {
      // Render Katalys tracking URLs natively (no /go/ wrapper) but
      // append sub2/sub3 so the placement (page source + position)
      // reaches Katalys's reporting and we can split payouts by slot.
      outboundHref = appendKatalysSubIds(href, {
        source: trackSource,
        position: trackPosition,
      });
    } else if (trackProvider) {
      outboundHref = `/go/${encodeURIComponent(trackProvider)}?src=${encodeURIComponent(
        trackSource ?? "unknown",
      )}${
        typeof trackPosition === "number" ? `&pos=${trackPosition}` : ""
      }`;
    } else {
      outboundHref = buildOutboundLink(href, {
        source: trackSource ?? "unknown",
        provider: trackProvider,
        position: trackPosition,
      });
    }
    return (
      <a
        href={outboundHref}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={classes}
        onClick={shouldTrack ? handleClick : undefined}
        onAuxClick={shouldTrack ? handleClick : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
