"use client";

import { usePathname, useRouter } from "next/navigation";
import { localePath, stripLocale, type SiteLang } from "@/lib/locale";

export function LanguageToggle({ lang }: { lang: SiteLang }) {
  const router = useRouter();
  const pathname = usePathname();
  const bare = stripLocale(pathname || "/");

  // Smooth, no full reload, keeps scroll position:
  // - router.push(..., { scroll: false }) changes the URL without jumping to top
  // - router.refresh() forces the server to re-render in the new locale, which
  //   is required because the /en proxy rewrite resolves to the same underlying
  //   route and would otherwise reuse the current-language render.
  const switchTo = (target: SiteLang) => {
    if (target === lang) return;
    router.push(localePath(target, bare), { scroll: false });
    router.refresh();
  };

  const base = "rounded-full px-2 py-1 transition";
  const activeCls = "navy-gradient text-white";
  const idleCls = "hover:bg-[#eef4ff]";

  return (
    <div className="inline-flex items-center rounded-full border border-[#cbdaf1] bg-white p-1 text-xs font-semibold text-[#21457f]">
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-pressed={lang === "en"}
        className={`${base} ${lang === "en" ? activeCls : idleCls}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchTo("tr")}
        aria-pressed={lang === "tr"}
        className={`${base} ${lang === "tr" ? activeCls : idleCls}`}
      >
        TR
      </button>
    </div>
  );
}
