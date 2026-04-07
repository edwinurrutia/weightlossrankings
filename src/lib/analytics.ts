/**
 * Analytics event tracking helper.
 *
 * Wraps the global gtag() function so client components can fire
 * GA4 events without needing to typecheck `window.gtag` everywhere.
 * The actual gtag global is loaded by src/components/shared/GoogleAnalytics.tsx
 * which gates loading on the cookie consent banner — so trackEvent
 * is a no-op when consent has not been given (the gtag global is
 * undefined and the optional chain just bails out).
 *
 * Usage in a client component:
 *   import { trackEvent } from "@/lib/analytics";
 *   onClick={() => {
 *     setDrug("tirzepatide");
 *     trackEvent("tool_drug_change", { tool: "dose_plotter", drug: "tirzepatide" });
 *   }}
 *
 * GA4 event naming convention:
 *   - snake_case names
 *   - Prefix with "tool_" for tool interactions, "calc_" for calculator
 *     compute events, "switch_" for tab/mode changes
 *   - Keep parameter names short and snake_case
 */

interface GtagFn {
  (
    command: "event",
    eventName: string,
    params?: Record<string, string | number | boolean>,
  ): void;
}

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

/**
 * Fire a GA4 event. No-op if gtag is not loaded (happens when the
 * visitor declined cookies or when running in SSR / dev without GA).
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", eventName, params);
  } catch {
    // Never let analytics break the app
  }
}

/** Convenience wrapper for tool interaction events. */
export function trackToolEvent(
  tool: string,
  action: string,
  params?: Record<string, string | number | boolean>,
): void {
  trackEvent(`tool_${action}`, { tool, ...params });
}
