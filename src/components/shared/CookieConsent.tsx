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
 * Cookie consent banner.
 *
 * Mounts on first render, checks localStorage for an existing decision,
 * and shows a bottom-fixed banner if the visitor has not chosen yet.
 *
 * Two choices:
 *   - "Accept all"     → enables analytics + functional cookies
 *   - "Necessary only" → only first-party session cookies, no analytics
 *
 * Respects "Necessary" cookies as always-on per GDPR/CCPA. The actual
 * gating of Google Analytics happens in the GoogleAnalytics component
 * which subscribes to onCookieConsentChange.
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
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-4 sm:pb-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-brand-violet/20 bg-white shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 text-sm text-brand-text-secondary leading-relaxed">
          <p>
            <strong className="text-brand-text-primary">
              We use cookies.
            </strong>{" "}
            Weight Loss Rankings uses first-party cookies to make the site
            work and (with your consent) Google Analytics to understand
            which pages help readers most. We do not sell your data and
            we do not show third-party ads. See our{" "}
            <Link
              href="/privacy"
              className="text-brand-violet underline font-semibold"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            type="button"
            onClick={reject}
            className="inline-flex items-center justify-center rounded-full border border-brand-violet/30 px-4 py-2.5 text-sm font-semibold text-brand-text-primary hover:border-brand-violet/60 hover:text-brand-violet transition whitespace-nowrap"
          >
            Necessary only
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-full bg-brand-violet px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-violet/90 transition whitespace-nowrap"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
