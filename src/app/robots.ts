import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://yapiistanbul.com.tr";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/admin", "/dashboard"],
    },
    host: base,
    sitemap: `${base}/sitemap.xml`,
  };
}
