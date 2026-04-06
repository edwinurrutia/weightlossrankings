"use client";

import { useEffect, useState } from "react";
import CTAButton from "./CTAButton";

interface StickyCTABarProps {
  // Single mode (review pages)
  provider?: {
    name: string;
    slug: string;
    price?: number | null;
    affiliateUrl: string;
  };
  // Dual mode (head-to-head)
  providers?: Array<{
    name: string;
    slug: string;
    affiliateUrl: string;
  }>;
  trackingSource: string;
}

export default function StickyCTABar({
  provider,
  providers,
  trackingSource,
}: StickyCTABarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 400);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Nothing to render
  if (!provider && (!providers || providers.length === 0)) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-brand-violet/15 shadow-[0_-4px_16px_rgba(80,40,160,0.08)] pb-[env(safe-area-inset-bottom)] px-4 py-3 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="complementary"
      aria-label="Quick action bar"
    >
      {provider && (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-xs text-brand-text-secondary leading-tight">
              {provider.price != null ? `From $${provider.price}/mo` : "Visit"}
            </div>
            <div className="font-bold text-brand-text-primary truncate">
              {provider.name}
            </div>
          </div>
          <CTAButton
            href={provider.affiliateUrl}
            external
            size="md"
            trackProvider={provider.slug}
            trackSource={trackingSource}
            className="shrink-0"
          >
            Visit →
          </CTAButton>
        </div>
      )}

      {!provider && providers && providers.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {providers.slice(0, 2).map((p, i) => (
            <CTAButton
              key={p.slug}
              href={p.affiliateUrl}
              external
              size="md"
              variant={i === 0 ? "primary" : "outline"}
              trackProvider={p.slug}
              trackSource={trackingSource}
              className="w-full truncate"
            >
              {p.name} →
            </CTAButton>
          ))}
        </div>
      )}
    </div>
  );
}
