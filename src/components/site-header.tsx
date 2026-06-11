"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/language-toggle";
import { NavLinks } from "@/components/nav-links";
import { MobileNav } from "@/components/mobile-nav";
import { localePath, type SiteLang } from "@/lib/locale";

type NavItem = {
  href: string;
  label: string;
};

export function SiteHeader({
  lang,
  settings,
  navItems,
  menuLabel,
  closeLabel,
}: {
  lang: SiteLang;
  settings: { siteLogo?: string };
  navItems: NavItem[];
  menuLabel: string;
  closeLabel: string;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[#e0e8f5] bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href={localePath(lang, "/")} className="inline-flex items-center gap-3 text-lg font-bold tracking-wide text-[#0c2c64]">
          {settings.siteLogo ? (
            <Image
              src={settings.siteLogo}
              alt="Yapı İstanbul logo"
              width={126}
              height={36}
              unoptimized
              className="h-8 w-auto object-contain"
            />
          ) : null}
          <span>YAPI İSTANBUL</span>
        </Link>
        <NavLinks items={navItems} currentPath={pathname} />

        <div className="hidden sm:block">
          <LanguageToggle lang={lang} />
        </div>

        <MobileNav lang={lang} navItems={navItems} menuLabel={menuLabel} closeLabel={closeLabel} />
      </div>
    </header>
  );
}
