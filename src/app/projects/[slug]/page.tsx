import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listProjects } from "@repo/api";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { SiteShell } from "@/components/site-shell";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectVideo } from "@/components/project-video";
import { FloorPlansSection, type FloorPlan } from "@/components/floor-plans-section";
import { ProjectClickTracker } from "@/components/project-click-tracker";
import {
  localizedDescription,
  localizedLocation,
  localizedName,
  localizedSummary,
  projectCoverImage,
} from "@/lib/content";
import { dateLocale, getLang, t } from "@/lib/i18n";
import { slugify } from "@/lib/slug";

type RawProject = Awaited<ReturnType<typeof listProjects>>[number];

async function findProjectBySlug(slug: string): Promise<RawProject | null> {
  try {
    const all = await listProjects();
    return (
      all.find(
        (p) =>
          (p.slug && p.slug === slug) ||
          slugify(p.name) === slug ||
          slugify(p.nameEn || "") === slug
      ) || null
    );
  } catch {
    return null;
  }
}

export async function generateMetadata(context: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await context.params;
  const project = await findProjectBySlug(slug);
  if (!project) return { title: "Proje" };
  const cover = projectCoverImage(project);
  return {
    title: project.name,
    description:
      project.summary ||
      `${project.name} — Yapı İstanbul tarafından geliştirilen proje detayları.`,
    openGraph: {
      title: project.name,
      description: project.summary || undefined,
      images: cover ? [{ url: cover }] : undefined,
    },
  };
}

export default async function ProjectDetailPage(context: {
  params: Promise<{ slug: string }>;
}) {
  const lang = await getLang();
  const { slug } = await context.params;
  const project = await findProjectBySlug(slug);
  if (!project) notFound();

  const name = localizedName(project, lang);
  const summary = localizedSummary(project, lang);
  const description = localizedDescription(project, lang);
  const location = localizedLocation(project, lang);
  const cover =
    projectCoverImage(project) ||
    "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1800&q=85";
  const images = (project.images || []).filter(Boolean);

  const facts = [
    project.status && {
      label: t(lang, "Durum", "Status"),
      value: project.status,
    },
    location && {
      label: t(lang, "Konum", "Location"),
      value: location,
    },
    project.totalArea && {
      label: t(lang, "Toplam alan", "Total area"),
      value: project.totalArea,
    },
    project.unitCount > 0 && {
      label: t(lang, "Daire sayısı", "Unit count"),
      value: String(project.unitCount),
    },
    project.unitTypes && {
      label: t(lang, "Daire tipleri", "Unit types"),
      value: project.unitTypes,
    },
    project.blockCount > 0 && {
      label: t(lang, "Blok sayısı", "Blocks"),
      value: String(project.blockCount),
    },
    project.floorCount > 0 && {
      label: t(lang, "Kat sayısı", "Floors"),
      value: String(project.floorCount),
    },
    project.deliveryDate && {
      label: t(lang, "Teslim tarihi", "Delivery date"),
      value: project.deliveryDate,
    },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <SiteShell>
      <ProjectClickTracker projectName={project.name} slug={slug} />
      <PageSeoSchema
        title={name}
        description={
          summary ||
          t(
            lang,
            `${name} — Yapı İstanbul tarafından geliştirilen proje hakkında detaylar.`,
            `${name} — details about the project developed by Yapı İstanbul.`
          )
        }
        path={`/projects/${slug}`}
        breadcrumbs={[
          { name: t(lang, "Ana Sayfa", "Home"), path: "/" },
          { name: t(lang, "Projeler", "Projects"), path: "/projects" },
          { name, path: `/projects/${slug}` },
        ]}
      />

      <Breadcrumb
        homeLabel={t(lang, "Ana Sayfa", "Home")}
        items={[
          { href: "/projects", label: t(lang, "Projeler", "Projects") },
          { href: `/projects/${slug}`, label: name },
        ]}
      />

      <article className="mx-auto max-w-6xl">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-[#cfddf4] shadow-[0_18px_40px_rgba(10,44,100,0.14)]">
          <div className="relative h-[320px] sm:h-[460px]">
            <Image
              src={cover}
              alt={`${name} — Yapı İstanbul projesi`}
              fill
              priority
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,44,0.18)_0%,rgba(8,30,74,0.6)_55%,rgba(8,30,74,0.92)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
              {project.status ? (
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                  {project.status}
                </span>
              ) : null}
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                {t(lang, "YAPI İSTANBUL PROJESİ", "YAPI ISTANBUL PROJECT")}
              </p>
              <h1 className="mt-1 text-3xl font-bold sm:text-5xl">{name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/85">
                {location ? <span>📍 {location}</span> : null}
                {project.createdAt ? (
                  <span>
                    {new Date(project.createdAt).toLocaleDateString(dateLocale(lang))}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* OZET KARTLARI */}
        {facts.length > 0 ? (
          <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-[#dbe7fa] bg-white px-4 py-3 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6f84a8]">
                  {f.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0c2c64]">{f.value}</p>
              </div>
            ))}
          </section>
        ) : null}

        {/* ANA ICERIK */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            {/* Galeri */}
            {images.length > 0 ? (
              <div className="rounded-3xl border border-[#dbe7fa] bg-white p-4 shadow-[0_14px_30px_rgba(10,44,100,0.08)]">
                <h2 className="mb-3 text-lg font-semibold text-[#0c2c64]">
                  {t(lang, "Galeri", "Gallery")}
                </h2>
                <ProjectGallery
                  images={images}
                  alt={`${name} — Yapı İstanbul`}
                  initialIndex={project.coverImageIndex ?? 0}
                />
              </div>
            ) : null}

            {/* Aciklama */}
            <div className="rounded-3xl border border-[#dbe7fa] bg-white p-7 shadow-[0_14px_30px_rgba(10,44,100,0.08)]">
              <h2 className="text-2xl section-title">
                {t(lang, "Proje Hakkında", "About the Project")}
              </h2>
              {summary ? (
                <p className="mt-3 text-base font-medium leading-7 text-[#2c4470]">{summary}</p>
              ) : null}
              {description ? (
                <div className="mt-4 whitespace-pre-line leading-7 text-[#46638f]">
                  {description}
                </div>
              ) : !summary ? (
                <p className="mt-3 leading-7 text-[#46638f]">
                  {t(
                    lang,
                    `${name}, Yapı İstanbul'un planlama, tasarım ve uygulama disiplinlerini bir arada yürüttüğü projelerden biridir.`,
                    `${name} is one of the projects where Yapı İstanbul integrates planning, design, and execution.`
                  )}
                </p>
              ) : null}
            </div>

            {/* Video */}
            {project.videoUrl ? (
              <div className="rounded-3xl border border-[#dbe7fa] bg-white p-4 shadow-[0_14px_30px_rgba(10,44,100,0.08)]">
                <h2 className="mb-3 text-lg font-semibold text-[#0c2c64]">
                  {t(lang, "Tanıtım Videosu", "Project Video")}
                </h2>
                <ProjectVideo url={project.videoUrl} title={name} />
              </div>
            ) : null}

            {/* Harita */}
            {project.mapLocation ? (
              <div className="rounded-3xl border border-[#dbe7fa] bg-white p-4 shadow-[0_14px_30px_rgba(10,44,100,0.08)]">
                <h2 className="mb-3 text-lg font-semibold text-[#0c2c64]">
                  {t(lang, "Konum", "Location")}
                </h2>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#dbe7fa] bg-slate-100">
                  <iframe
                    src={project.mapLocation}
                    title={`${name} — ${t(lang, "Harita", "Map")}`}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : null}
          </div>

          {/* SAG SUTUN */}
          <aside className="space-y-4">
            <div className="rounded-3xl navy-gradient p-7 text-white shadow-[0_14px_30px_rgba(10,44,100,0.18)]">
              <h2 className="text-2xl">{t(lang, "Bilgi Talep Edin", "Request Information")}</h2>
              <p className="mt-3 text-sm text-white/85">
                {t(
                  lang,
                  `${name} hakkında detaylı bilgi almak için bizimle iletişime geçin.`,
                  `Get in touch for detailed information about ${name}.`
                )}
              </p>
              <Link
                href="/contact"
                className="btn-hover mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0c2c64] hover:bg-[#eaf2ff]"
              >
                {t(lang, "İletişime Geç", "Contact Us")}
              </Link>
            </div>

            {facts.length > 0 ? (
              <div className="rounded-3xl border border-[#dbe7fa] bg-white p-5 shadow-[0_14px_30px_rgba(10,44,100,0.08)]">
                <h3 className="text-base font-semibold text-[#0c2c64]">
                  {t(lang, "Hızlı Bilgiler", "Quick Facts")}
                </h3>
                <dl className="mt-3 divide-y divide-[#eef2f9] text-sm">
                  {facts.map((f) => (
                    <div key={f.label} className="flex items-start justify-between gap-3 py-2">
                      <dt className="text-[#6f84a8]">{f.label}</dt>
                      <dd className="text-right font-semibold text-[#0c2c64]">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            <FloorPlansSection
              plans={(project.floorPlans || []) as FloorPlan[]}
              title={t(lang, "Kat Planları", "Floor Plans")}
              selectLabel={t(lang, "Kat seçin:", "Select floor:")}
              emptyLabel={t(
                lang,
                "Bu proje için henüz kat planı paylaşılmadı.",
                "No floor plans have been shared for this project yet."
              )}
            />
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-[#dbe7f8] bg-[#f8fbff] p-7">
          <h2 className="text-2xl section-title">{t(lang, "Diğer Projeler", "Other Projects")}</h2>
          <Link
            href="/projects"
            className="mt-4 inline-block rounded-full border border-[#c5d8f5] px-5 py-2 text-sm font-semibold text-[#0c2c64] hover:bg-[#edf4ff]"
          >
            {t(lang, "Tüm projeleri gör", "View all projects")}
          </Link>
        </section>
      </article>
    </SiteShell>
  );
}
