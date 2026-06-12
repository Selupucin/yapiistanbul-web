"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getCookiePreferences, type CookiePreferences } from "./cookie-consent";

/**
 * Consent-gated Google Analytics. The gtag.js script is NOT loaded until the
 * visitor accepts the "Analytics" cookie category (KVKK/GDPR compliant). It
 * activates instantly when consent is granted via the `yi:consent-change`
 * event, and stays off for visitors who reject or haven't decided.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const apply = (prefs: CookiePreferences | null) => setAllowed(Boolean(prefs?.analytics));
    apply(getCookiePreferences());

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<CookiePreferences>).detail;
      apply(detail ?? getCookiePreferences());
    };
    window.addEventListener("yi:consent-change", handler);
    return () => window.removeEventListener("yi:consent-change", handler);
  }, []);

  if (!allowed || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
