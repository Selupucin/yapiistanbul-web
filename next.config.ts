import type { NextConfig } from "next";

// Content-Security-Policy in REPORT-ONLY mode: the browser logs violations to
// the console but blocks nothing, so it can't break the live site. Once the
// console is clean across all pages, switch the key to "Content-Security-Policy"
// to enforce. Covers: Next inline hydration scripts/styles, self-hosted fonts,
// Unsplash + Cloudinary images, and the Google Maps embed on /contact.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com https://player.vimeo.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  // `upgrade-insecure-requests` is intentionally omitted: it is ignored in
  // Report-Only mode (causes a console error) and re-added when CSP is enforced.
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  // Kept Report-Only because Google Tag Manager injects tag scripts dynamically;
  // a strict enforced policy would block them. Enforce once GTM tags are final.
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/api", "@repo/db"],
  outputFileTracingIncludes: {
    "/**": ["./packages/**/*"],
  },
  serverExternalPackages: ["mongoose"],
  images: {
    // Next 16 requires an explicit quality allowlist. 60 for the dark-overlaid
    // hero (quality loss is invisible under the gradient), 75 default elsewhere.
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
