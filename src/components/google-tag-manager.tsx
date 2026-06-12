"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getCookiePreferences, type CookiePreferences } from "./cookie-consent";

/**
 * Consent-gated Google Tag Manager. The gtm.js loader is NOT injected until the
 * visitor accepts the Analytics OR Marketing cookie category (GTM can serve
 * both). It activates instantly on the `yi:consent-change` event and stays off
 * for visitors who reject or haven't decided. The <noscript> iframe is omitted
 * on purpose: a no-JS visitor cannot give consent, so firing GTM for them would
 * bypass the cookie policy.
 */
export function GoogleTagManager({ gtmId }: { gtmId: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const apply = (prefs: CookiePreferences | null) =>
      setAllowed(Boolean(prefs?.analytics || prefs?.marketing));
    apply(getCookiePreferences());

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<CookiePreferences>).detail;
      apply(detail ?? getCookiePreferences());
    };
    window.addEventListener("yi:consent-change", handler);
    return () => window.removeEventListener("yi:consent-change", handler);
  }, []);

  if (!allowed || !gtmId) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}
