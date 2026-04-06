"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { computeOverallScore } from "@/lib/scoring";
import type { Provider } from "@/lib/types";
import type { FeaturedModalConfig } from "@/lib/featured-modal";

function fireTracking(provider: string, source: string) {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({ provider, source });
    const url = "/api/track-click";
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      const blob = new Blob([payload], { type: "application/json" });
      if (navigator.sendBeacon(url, blob)) return;
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

const LS_KEY = "wlr_modal_dismissed_at";

interface Props {
  config: FeaturedModalConfig;
  provider: Provider;
}

export default function FeaturedProviderModal({ config, provider }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggeredRef = useRef(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const noThanksRef = useRef<HTMLButtonElement | null>(null);

  const isAdmin =
    pathname?.startsWith("/admin") || pathname?.startsWith("/admin-login");

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(LS_KEY, String(Date.now()));
    } catch {
      // ignore storage errors
    }
    setOpen(false);
  }, []);

  // Hydration guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger logic
  useEffect(() => {
    if (!mounted || isAdmin || !config.enabled) return;

    // Frequency cap
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      if (raw) {
        const ts = Number(raw);
        const capMs = config.dismissal_cap_hours * 60 * 60 * 1000;
        if (!Number.isNaN(ts) && Date.now() - ts < capMs) {
          return;
        }
      }
    } catch {
      // ignore
    }

    let armed = false;
    let ticking = false;

    const trigger = () => {
      if (triggeredRef.current || !armed) return;
      triggeredRef.current = true;
      setOpen(true);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const scrolled = window.scrollY + window.innerHeight;
        const total = document.body.scrollHeight;
        if (total <= 0) return;
        const pct = (scrolled / total) * 100;
        if (pct >= config.scroll_trigger_percent) {
          trigger();
        }
      });
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY < 0) trigger();
    };

    const delay = window.setTimeout(() => {
      armed = true;
    }, config.initial_delay_seconds * 1000);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(delay);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [mounted, isAdmin, config]);

  // ESC + focus management + body scroll lock
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus to close button
    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        dismiss();
        return;
      }
      if (e.key === "Tab") {
        // Focus trap across the 3 focusable items
        const order: (HTMLElement | null)[] = [
          closeBtnRef.current,
          ctaRef.current,
          noThanksRef.current,
        ];
        const focusables = order.filter(Boolean) as HTMLElement[];
        if (focusables.length === 0) return;
        const active = document.activeElement as HTMLElement | null;
        const idx = focusables.findIndex((el) => el === active);
        e.preventDefault();
        if (e.shiftKey) {
          const next = idx <= 0 ? focusables.length - 1 : idx - 1;
          focusables[next].focus();
        } else {
          const next = idx === -1 || idx === focusables.length - 1 ? 0 : idx + 1;
          focusables[next].focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, dismiss]);

  if (!mounted || isAdmin || !config.enabled || !open) return null;

  const overall = computeOverallScore(provider.scores);
  const trackSource = `modal_featured_${provider.slug}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-200"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wlr-modal-title"
    >
      <div
        className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl mx-0 sm:mx-4 p-6 sm:p-8"
        style={{ animation: "wlrModalIn 220ms ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Headline badge */}
        <div className="inline-block text-xs font-semibold uppercase tracking-wider bg-brand-gradient text-white px-3 py-1 rounded-full mb-4">
          {config.headline}
        </div>

        {/* Provider header */}
        <div className="flex items-center gap-4 mb-3">
          {provider.logo ? (
            <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src={provider.logo}
                alt={`${provider.name} logo`}
                width={56}
                height={56}
                className="object-contain w-full h-full"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <h2
              id="wlr-modal-title"
              className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight"
            >
              {provider.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-brand-violet/10 text-brand-violet px-2 py-0.5 rounded-full">
                Score {overall.toFixed(1)}
              </span>
              {provider.best_for ? (
                <span className="text-xs text-gray-500 truncate">
                  Best for {provider.best_for}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-5">{config.subheadline}</p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {config.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-gray-800">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-success flex-shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          ref={ctaRef}
          href={provider.affiliate_url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => fireTracking(provider.slug, trackSource)}
          onAuxClick={() => fireTracking(provider.slug, trackSource)}
          className="inline-flex items-center justify-center w-full rounded-full font-semibold tap-target px-8 py-4 text-lg bg-brand-gradient text-white shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
        >
          {config.cta_text} →
        </a>

        {/* No thanks */}
        <div className="text-center mt-4">
          <button
            ref={noThanksRef}
            type="button"
            onClick={dismiss}
            className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-2"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
