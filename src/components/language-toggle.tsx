"use client";

import { usePathname } from "next/navigation";
import { localePath, stripLocale, type SiteLang } from "@/lib/locale";

export function LanguageToggle({ lang }: { lang: SiteLang }) {
  const pathname = usePathname();
  const bare = stripLocale(pathname || "/");
  const hrefFor = (target: SiteLang) => localePath(target, bare);

  // Plain <a> (full navigation) instead of router.push: the proxy rewrites
  // /en/* to the prefix-less route, so a soft client navigation can reuse the
  // cached other-language render and require a second click. A hard navigation
  // re-runs the proxy and renders the correct locale in one click.
  const base =
    "rounded-full px-2 py-1 transition";
  const activeCls = "navy-gradient text-white";
  const idleCls = "hover:bg-[#eef4ff]";

  return (
    <div className="inline-flex items-center rounded-full border border-[#cbdaf1] bg-white p-1 text-xs font-semibold text-[#21457f]">
      <a
        href={hrefFor("en")}
        aria-current={lang === "en" ? "true" : undefined}
        className={`${base} ${lang === "en" ? activeCls : idleCls}`}
      >
        EN
      </a>
      <a
        href={hrefFor("tr")}
        aria-current={lang === "tr" ? "true" : undefined}
        className={`${base} ${lang === "tr" ? activeCls : idleCls}`}
      >
        TR
      </a>
    </div>
  );
}
