import { cookies, headers } from "next/headers";
import { cache } from "react";

export * from "./locale";
import type { SiteLang } from "./locale";

export const getLang = cache(async (): Promise<SiteLang> => {
  // URL-driven locale (set by proxy.ts from the /en prefix) wins; fall back to
  // the legacy cookie, then default to Turkish.
  const h = await headers();
  const fromHeader = h.get("x-app-locale");
  if (fromHeader === "en" || fromHeader === "tr") return fromHeader;

  const store = await cookies();
  return store.get("site_lang")?.value === "en" ? "en" : "tr";
});
