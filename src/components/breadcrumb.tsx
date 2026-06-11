import Link from "next/link";
import { getLang } from "@/lib/i18n";
import { localePath } from "@/lib/locale";

type BreadcrumbItem = {
  href: string;
  label: string;
};

export async function Breadcrumb({ items, homeLabel }: { items: BreadcrumbItem[]; homeLabel: string }) {
  const lang = await getLang();
  const lp = (path: string) => localePath(lang, path);

  return (
    <nav aria-label="Breadcrumb" className="mb-5 rounded-2xl border border-[#deebfb] bg-white px-4 py-2 text-sm text-[#4a678f]">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={lp("/")} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[#1d4b90] hover:bg-[#edf4ff]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M4 11.5L12 5l8 6.5V20a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{homeLabel}</span>
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.href} className="inline-flex items-center gap-2">
            <span className="text-[#8ca1c3]">/</span>
            <Link href={lp(item.href)} className="rounded-full px-2 py-1 text-[#1d4b90] hover:bg-[#edf4ff]">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
