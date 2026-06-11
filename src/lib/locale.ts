// Client-safe locale helpers (no next/headers import → usable in client
// components too). Server-side getLang() lives in i18n.ts.
export type SiteLang = "en" | "tr";
export const LOCALES: SiteLang[] = ["tr", "en"];

export const t = (lang: SiteLang, tr: string, en: string) => {
  return lang === "tr" ? tr : en;
};

export function dateLocale(lang: SiteLang) {
  return lang === "tr" ? "tr-TR" : "en-US";
}

/** Prefix an internal path with /en for the English locale (TR stays bare). */
export function localePath(lang: SiteLang, path: string): string {
  if (lang !== "en") return path;
  if (path === "/") return "/en";
  return path.startsWith("/en/") || path === "/en" ? path : `/en${path}`;
}

/** Strip a leading /en from a pathname (used to map between locales). */
export function stripLocale(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}
