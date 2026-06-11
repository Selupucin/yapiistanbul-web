import Image from "next/image";
import Link from "next/link";
import type { SiteLang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { localePath } from "@/lib/locale";
import { localizedLocation, localizedName, localizedSummary, projectCoverImage } from "@/lib/content";
import { slugify } from "@/lib/slug";

type ProjectLike = {
  _id: string | number;
  name: string;
  nameEn?: string;
  slug?: string;
  location?: string;
  locationEn?: string;
  status?: string;
  totalArea?: string;
  unitCount?: number;
  unitTypes?: string;
  deliveryDate?: string;
  summary?: string;
  summaryEn?: string;
  images?: string[];
  coverImageIndex?: number;
};

type Variant = "default" | "compact";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1200&q=85",
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&q=85",
];

export function ProjectCard({
  project,
  lang,
  index = 0,
  variant = "default",
}: {
  project: ProjectLike;
  lang: SiteLang;
  index?: number;
  variant?: Variant;
}) {
  const name = localizedName(project, lang);
  const location = localizedLocation(project, lang);
  const summary = localizedSummary(project, lang);
  const slug = project.slug || slugify(project.name);
  const cover = projectCoverImage(project) || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  const facts = [
    project.totalArea,
    project.unitCount && project.unitCount > 0 ? `${project.unitCount} ${t(lang, "daire", "units")}` : "",
    project.unitTypes,
  ].filter(Boolean) as string[];

  return (
    <Link
      href={localePath(lang, `/projects/${slug}`)}
      className="group isolate flex h-full flex-col overflow-hidden rounded-2xl border border-[#dbe5f4] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#1a4f9d] hover:shadow-lg"
    >
      <div
        className={`relative w-full overflow-hidden rounded-t-2xl ${variant === "compact" ? "h-40" : "h-48"}`}
      >
        <Image
          src={cover}
          alt={`${name} — Yapı İstanbul projesi görseli`}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#061a45]/55 to-transparent" />
        {project.status ? (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0c2c64] backdrop-blur">
            {project.status}
          </span>
        ) : null}
        {location ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#0c2c64]/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            📍 {location}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-[#0c2c64] group-hover:text-[#1a4f9d]">
          {name}
        </h3>

        {summary ? (
          <p className="mt-2 line-clamp-2 text-sm text-[#5f7395]">{summary}</p>
        ) : (
          <p className="mt-2 text-sm text-[#7f93b5]">
            {t(lang, "Detaylı bilgi için tıklayın.", "Click for details.")}
          </p>
        )}

        {facts.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {facts.map((f) => (
              <li
                key={f}
                className="rounded-full bg-[#eef4ff] px-2.5 py-0.5 text-[11px] font-medium text-[#1a4f9d]"
              >
                {f}
              </li>
            ))}
          </ul>
        ) : null}

        {project.deliveryDate ? (
          <p className="mt-3 text-xs text-[#6f84a8]">
            {t(lang, "Teslim", "Delivery")}: <span className="font-semibold text-[#0c2c64]">{project.deliveryDate}</span>
          </p>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#0c2c64]">
          {t(lang, "Detayları gör", "View details")} →
        </span>
      </div>
    </Link>
  );
}
