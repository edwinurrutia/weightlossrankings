"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getCookieConsent,
  onCookieConsentChange,
} from "@/components/shared/CookieConsent";

const GA_MEASUREMENT_ID = "G-HWDYD2CWL8";

/**
 * Loads Google Analytics on every public page, with two important gates:
 *
 *   1. Skips /admin/* routes so internal traffic doesn't pollute marketing
 *      analytics.
 *   2. Only loads when the visitor has actively consented via the cookie
 *      banner. Subscribes to consent changes so flipping the decision
 *      mounts/unmounts GA without a reload.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(getCookieConsent() === "accepted");
    return onCookieConsentChange((value) => {
      setConsented(value === "accepted");
    });
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  if (!consented) {
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
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
