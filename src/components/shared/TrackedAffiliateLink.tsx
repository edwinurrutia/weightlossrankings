"use client";

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
  return (
    <a
      href={href}
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
