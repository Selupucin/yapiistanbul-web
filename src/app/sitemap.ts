import { MetadataRoute } from "next";
import { safeBlogs, safeProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://yapiistanbul.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic detail pages. safeProjects/safeBlogs are cached and fall back to []
  // on any error, so the sitemap never fails the build.
  const [projects, blogs] = await Promise.all([safeProjects(), safeBlogs()]);

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p?.slug)
    .map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const blogRoutes: MetadataRoute.Sitemap = blogs
    .filter((b) => b?.slug)
    .map((b) => ({
      url: `${base}/blog/${b.slug}`,
      lastModified: b.updatedAt ? new Date(b.updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
