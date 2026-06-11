"use client";

import { usePathname, useRouter } from "next/navigation";
import { localePath, stripLocale, type SiteLang } from "@/lib/locale";

export function LanguageToggle({ lang }: { lang: SiteLang }) {
  const router = useRouter();
  const pathname = usePathname();
  const active = lang;

  const goTo = (next: SiteLang) => {
    if (next === active) return;
    // Keep the cookie in sync as a fallback for the prefix-less default.
    document.cookie = `site_lang=${next}; path=/; max-age=31536000; samesite=lax`;
    const bare = stripLocale(pathname || "/");
    router.push(localePath(next, bare));
  };

  return (
    <div className="inline-flex items-center rounded-full border border-[#cbdaf1] bg-white p-1 text-xs font-semibold text-[#21457f]">
      <button
        type="button"
        onClick={() => goTo("en")}
        className={`rounded-full px-2 py-1 transition ${active === "en" ? "navy-gradient text-white" : "hover:bg-[#eef4ff]"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => goTo("tr")}
        className={`rounded-full px-2 py-1 transition ${active === "tr" ? "navy-gradient text-white" : "hover:bg-[#eef4ff]"}`}
      >
        TR
      </button>
    </div>
  );
}
