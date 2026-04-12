"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "wlr-cookie-consent";
const EVENT_NAME = "wlr-cookie-consent-changed";

export type CookieConsentValue = "accepted" | "necessary" | null;

/**
 * Read the visitor's current consent value. Returns null if no decision
 * has been made yet OR if we're rendering on the server.
 */
export function getCookieConsent(): CookieConsentValue {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "necessary") return v;
    return null;
  } catch {
    return null;
  }
}

/**
 * Subscribe to consent changes. Returns an unsubscribe function. Used by
 * GoogleAnalytics so the GA scripts mount/unmount when the visitor flips
 * their decision without requiring a page reload.
 */
export function onCookieConsentChange(
  cb: (value: CookieConsentValue) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<CookieConsentValue>).detail;
    cb(detail ?? getCookieConsent());
  };
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}

function setConsent(value: "accepted" | "necessary"): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, { detail: value }),
    );
  } catch {
    // localStorage may be blocked in private mode — fail open.
  }
}

/**
 * Cookie consent / privacy notice banner.
 *
 * Mounts on first render, checks localStorage for an existing decision,
 * and shows a bottom-fixed banner if the visitor has not chosen yet.
 *
 * Two choices:
 *   - "Got it"         → acknowledges the notice, analytics stay on
 *   - "Opt out"        → writes "necessary" flag that GoogleAnalytics
 *                        reads to disable analytics_storage for this
 *                        visitor (CCPA opt-out for US visitors)
 *
 * This is a US-only site, so CCPA (opt-out) applies, not GDPR (opt-in).
 * Google Analytics loads by default; the banner is a transparency +
 * opt-out mechanism, not a pre-consent gate. Visitors who click "Opt
 * out" have their decision persisted to localStorage and GA respects
 * it via the consent-default denied path in GoogleAnalytics.tsx.
 */
export default function CookieConsent() {
  // null = unknown (waiting on first effect), value = decided
  const [decision, setDecision] = useState<CookieConsentValue>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDecision(getCookieConsent());
  }, []);

  // Don't render anything during SSR or before we've checked localStorage.
  if (!mounted) return null;
  // Already decided — banner stays hidden.
  if (decision === "accepted" || decision === "necessary") return null;

  const accept = () => {
    setConsent("accepted");
    setDecision("accepted");
  };

  const reject = () => {
    setConsent("necessary");
    setDecision("necessary");
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[60] px-2 pb-2 sm:px-4 sm:pb-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-xl sm:rounded-2xl border border-brand-violet/20 bg-white shadow-xl p-3 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex-1 text-[11px] sm:text-sm text-brand-text-secondary leading-snug sm:leading-relaxed">
          <p>
            <strong className="text-brand-text-primary">
              Cookies & analytics.
            </strong>{" "}
            <span className="hidden sm:inline">
              Weight Loss Rankings uses first-party cookies and Google
              Analytics to understand which pages help readers most. We
              do not sell or share your data for advertising, and we do
              not run display-ad or programmatic-ad networks. We do earn
              affiliate commissions when readers click through to partner
              providers — this never affects our editorial scoring. US
              visitors can opt out at any time. See our{" "}
            </span>
            <span className="sm:hidden">
              First-party cookies + GA. No data sold, no display ads.
              Affiliate-supported.{" "}
            </span>
            <Link
              href="/privacy"
              className="text-brand-violet underline font-semibold"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-row gap-2 shrink-0">
          <button
            type="button"
            onClick={reject}
            className="inline-flex flex-1 sm:flex-none items-center justify-center rounded-full border border-brand-violet/30 px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-brand-text-primary hover:border-brand-violet/60 hover:text-brand-violet transition whitespace-nowrap"
          >
            Opt out
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex flex-1 sm:flex-none items-center justify-center rounded-full bg-brand-violet px-4 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-brand-violet/90 transition whitespace-nowrap"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
