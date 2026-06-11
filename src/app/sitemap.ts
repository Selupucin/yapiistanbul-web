import { MetadataRoute } from "next";
import { safeBlogs, safeProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://yapiistanbul.com";
  const now = new Date();

  const en = (path: string) => (path === "/" ? "/en" : `/en${path}`);

  // Each entry lists the TR url plus its /en alternate (hreflang in the sitemap).
  const entry = (
    path: string,
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly",
    priority: number,
    lastModified: Date = now
  ): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: { tr: `${base}${path}`, en: `${base}${en(path)}` } },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    entry("/", "daily", 1),
    entry("/about", "monthly", 0.7),
    entry("/projects", "weekly", 0.9),
    entry("/blog", "weekly", 0.85),
    entry("/contact", "monthly", 0.8),
    entry("/privacy-policy", "yearly", 0.3),
    entry("/cookies-policy", "yearly", 0.3),
  ];

  // Dynamic detail pages. safeProjects/safeBlogs are cached and fall back to []
  // on any error, so the sitemap never fails the build.
  const [projects, blogs] = await Promise.all([safeProjects(), safeBlogs()]);

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p?.slug)
    .map((p) => entry(`/projects/${p.slug}`, "weekly", 0.8, p.updatedAt ? new Date(p.updatedAt) : now));

  const blogRoutes: MetadataRoute.Sitemap = blogs
    .filter((b) => b?.slug)
    .map((b) => entry(`/blog/${b.slug}`, "monthly", 0.7, b.updatedAt ? new Date(b.updatedAt) : now));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
