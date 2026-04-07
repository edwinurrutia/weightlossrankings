"use client";

import { useEffect } from "react";

/**
 * Sets <html lang="es"> on Spanish (/es/*) routes after hydration.
 *
 * The root layout in src/app/layout.tsx hardcodes lang="en" because
 * Next.js 14 only allows one root layout. Rather than introduce a
 * middleware-based solution that rewrites the html element on the
 * server, we flip lang client-side on Spanish routes. SEO impact is
 * minimal because each Spanish page also emits hreflang alternates
 * (en-US / es-US) and Spanish-language metadata (title, description,
 * og:locale) — Google primarily uses those signals plus on-page
 * content language detection. The client-side lang flip exists for
 * accessibility (screen readers) and to match the user's perception
 * once the page is interactive.
 *
 * Cleanup: when the user navigates back to an English route under
 * the same SPA session, the EnglishHtmlLang reset is handled by
 * Next.js routing implicitly because the SpanishHtmlLang component
 * unmounts and we restore lang="en".
 */
export default function SpanishHtmlLang() {
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.lang;
    html.lang = "es";
    return () => {
      html.lang = previous || "en";
    };
  }, []);

  return null;
}
