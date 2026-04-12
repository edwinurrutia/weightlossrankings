"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-HWDYD2CWL8";

/**
 * Loads Google Analytics 4 on every public page. Skips /admin/* routes
 * so internal traffic doesn't pollute marketing analytics.
 *
 * This is a US-only weight loss review site. CCPA is an opt-out regime,
 * not an opt-in regime like GDPR, so GA4 loads unconditionally on public
 * pages and the CookieConsent banner acts as a transparency notice
 * rather than a pre-consent gate. Visitors can always opt out of GA4
 * tracking via Google's own Analytics Opt-out Browser Add-on or by
 * clicking "Necessary only" in the banner, which writes a "necessary"
 * flag that this component respects as a legal opt-out.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Respect an explicit CCPA opt-out ("Necessary only") from the
          // CookieConsent banner. If present, deny analytics storage and
          // set the GA4 property to non-personalized signals.
          try {
            var optOut = window.localStorage.getItem('wlr-cookie-consent') === 'necessary';
            if (optOut) {
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
            }
          } catch (e) {}

          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
