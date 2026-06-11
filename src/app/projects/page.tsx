import { Metadata } from "next";
import Link from "next/link";
import { listProjects } from "@repo/api";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { getLang, t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Projelerimiz",
  description:
    "Yapı İstanbul'un geliştirdiği konut, ticari ve karma kullanımlı projeler.",
};

export default async function ProjectsPage() {
  const lang = await getLang();
  let projects: Awaited<ReturnType<typeof listProjects>> = [];
  try {
    projects = await listProjects();
  } catch {
    projects = [];
  }

  return (
    <SiteShell>
      <PageSeoSchema
        title={t(lang, "Projelerimiz", "Our Projects")}
        description={t(
          lang,
          "Yapı İstanbul tarafından geliştirilen tüm projeler.",
          "All projects developed by Yapı İstanbul."
        )}
        path="/projects"
        breadcrumbs={[
          { name: t(lang, "Ana Sayfa", "Home"), path: "/" },
          { name: t(lang, "Projeler", "Projects"), path: "/projects" },
        ]}
      />

      <Breadcrumb
        homeLabel={t(lang, "Ana Sayfa", "Home")}
        items={[{ href: "/projects", label: t(lang, "Projeler", "Projects") }]}
      />

      <section className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f79a3]">
            {t(lang, "Yapı İstanbul", "Yapi Istanbul")}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#0c2c64] sm:text-4xl">
            {t(lang, "Projelerimiz", "Our Projects")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#4f6080] sm:text-base">
            {t(
              lang,
              "İstanbul'un farklı bölgelerinde geliştirdiğimiz konut ve karma kullanımlı projelerimizi keşfedin.",
              "Discover our residential and mixed-use developments across various districts of Istanbul."
            )}
          </p>
        </header>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#cdd9ee] bg-white p-10 text-center">
            <p className="text-[#4f6080]">
              {t(
                lang,
                "Yakında daha fazla proje paylaşacağız.",
                "More projects will be shared soon."
              )}
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-block rounded-full bg-[#0c2c64] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1a4f9d]"
            >
              {t(lang, "Bize ulaşın", "Contact us")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                lang={lang}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
