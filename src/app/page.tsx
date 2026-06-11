import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteShell } from "@/components/site-shell";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { ProjectCard } from "@/components/project-card";
import { getLang, t } from "@/lib/i18n";
import { safeBlogs, safeProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Anasayfa",
  description:
    "Yapi Istanbul ile Istanbul odakli premium konut ve ticari proje gelistirme deneyimi.",
};

export default async function Home() {
  const lang = await getLang();
  const [projects, blogs] = await Promise.all([safeProjects(), safeBlogs()]);

  const processSteps = [
    {
      num: "01",
      title: t(lang, "Keşif & Analiz", "Discovery & Analysis"),
      desc: t(
        lang,
        "Arsa, çevre ve ihtiyaç analizi ile doğru başlangıç stratejisini oluşturuyoruz.",
        "We define the right starting strategy through land, context, and needs analysis."
      ),
    },
    {
      num: "02",
      title: t(lang, "Konsept Tasarım", "Concept Design"),
      desc: t(
        lang,
        "Mimari dili, fonksiyonu ve estetiği tek bir güçlü çerçevede birleştiriyoruz.",
        "We merge architectural language, function, and aesthetics into one strong framework."
      ),
    },
    {
      num: "03",
      title: t(lang, "Uygulama", "Execution"),
      desc: t(
        lang,
        "Kalite ve takvim odağında şantiye süreçlerini şeffaf şekilde yönetiyoruz.",
        "We manage on-site execution transparently with quality and schedule focus."
      ),
    },
    {
      num: "04",
      title: t(lang, "Teslim & Destek", "Delivery & Support"),
      desc: t(
        lang,
        "Proje tesliminden sonra da teknik ve operasyonel desteği sürdürüyoruz.",
        "We continue technical and operational support after project delivery."
      ),
    },
  ];

  return (
    <SiteShell>
      <PageSeoSchema
        title={t(lang, "Yapı İstanbul Ana Sayfa", "Yapi Istanbul Home")}
        description={t(lang, "Yapı İstanbul ile İstanbul odaklı premium konut ve ticari proje geliştirme deneyimi.", "Premium residential and commercial development experience in Istanbul.")}
        path="/"
        breadcrumbs={[{ name: t(lang, "Ana Sayfa", "Home"), path: "/" }]}
      />

      <section className="relative -mx-4 -mt-10 mb-20 min-h-[calc(100vh-68px)] overflow-hidden sm:-mx-6 lg:-mx-8">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=85"
            alt="Istanbul mimari gorunum"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(3,15,40,0.84)_0%,rgba(12,44,100,0.74)_45%,rgba(9,37,86,0.55)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(120,191,255,0.22),transparent_40%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-6xl flex-col items-start justify-center px-6 py-16 text-white sm:px-8 lg:px-10">
          <p className="mb-4 rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
            {t(lang, "Yapı İstanbul", "Yapi Istanbul")}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
            {t(lang, "Yapı İstanbul", "Yapi Istanbul")}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/90 sm:text-xl">
            {t(
              lang,
              "İstanbul'da güçlü mimari vizyonu, mühendislik disiplini ve sürdürülebilir yaşam yaklaşımıyla geleceği inşa ediyoruz.",
              "Discover a modern company in Istanbul created with mission and vision, embracing social responsibility as a principle."
            )}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0c2c64] transition hover:-translate-y-0.5 hover:bg-[#eaf2ff]"
            >
              {t(lang, "Projeleri İncele", "Explore Projects")}
            </Link>
            <Link
              href="/about"
              className="inline-flex rounded-full border border-white/60 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              {t(lang, "Hakkımızda Oku", "Read About Us")}
            </Link>
          </div>
        </div>
      </section>

      <section className="my-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5f79a3]">{t(lang, "Temel Yaklaşım", "Core Approach")}</p>
          <h2 className="mt-2 text-2xl font-bold text-[#0c2c64] sm:text-3xl">{t(lang, "Konum, Tasarım ve Uygulama", "Location, Design and Execution")}</h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              title: t(lang, "Konum", "Location"),
              text: t(
                lang,
                "İstanbul'un değer üreten bölgelerinde, ulaşım ve yaşam kalitesini merkez alan lokasyonlar seçiyoruz.",
                "We select value-generating locations in Istanbul centered on transport and quality of life."
              ),
              image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1000&q=85",
            },
            {
              title: t(lang, "Tasarım", "Design"),
              text: t(
                lang,
                "Mimari kimliği güçlü, estetik ve fonksiyonel mekanlar ile uzun ömürlü bir yaşam standardı kuruyoruz.",
                "We establish a long-term living standard with spaces that are aesthetic, functional, and architecturally strong."
              ),
              image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000&q=85",
            },
            {
              title: t(lang, "Uygulama", "Execution"),
              text: t(
                lang,
                "Planlama, kalite denetimi ve saha operasyonlarını şeffaf biçimde yöneterek güvenli teslim sağlıyoruz.",
                "We ensure reliable delivery by transparently managing planning, quality control, and field operations."
              ),
              image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=85",
            },
          ].map((item) => (
            <article key={item.title} className="group relative overflow-hidden rounded-3xl border border-[#d9e5f8] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-[320px]">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,17,44,0.12)_0%,rgba(7,27,68,0.55)_45%,rgba(8,30,74,0.88)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">Yapı İstanbul</p>
                  <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/88">{item.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="my-20 overflow-hidden rounded-3xl border border-[#214f93] bg-[linear-gradient(135deg,#0c2c64_0%,#1a4f9d_100%)] p-8 text-white shadow-lg sm:p-10">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          {t(lang, "Hizmet Süreci", "Service Process")}
        </h2>
        <div className="relative mt-8 grid gap-4 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-0.5 bg-white/25 lg:block" />
          {processSteps.map((step) => (
            <article key={step.num} className="relative rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white text-sm font-bold text-[#0c2c64]">
                {step.num}
              </div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-white/85">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {projects.length > 0 && (
        <section className="my-20">
          <h2 className="text-center text-2xl font-bold text-[#0c2c64] sm:text-3xl">
            {t(lang, "Projelerimiz", "Our Projects")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                lang={lang}
                index={index}
                variant="compact"
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/projects"
              className="inline-block rounded-full border border-[#c5d8f5] px-5 py-2 text-sm font-semibold text-[#0c2c64] hover:bg-[#edf4ff]"
            >
              {t(lang, "Tüm projeleri gör", "View all projects")}
            </Link>
          </div>
        </section>
      )}

      <section className="my-20 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-3">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#4b6692]">{t(lang, "Sayılarla Güç", "Strength in Numbers")}</p>
        </div>
        <div className="contents">
          {[
            { value: "50+", label: t(lang, "Tamamlanmış Proje", "Completed Projects") },
            { value: "5000+", label: t(lang, "Mutlu Müşteri", "Happy Customers") },
            { value: "15+", label: t(lang, "Yıl Deneyim", "Years Experience") },
          ].map((stat) => (
            <article key={stat.label} className="group relative overflow-hidden rounded-2xl border border-[#d5e2f7] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(31,107,191,0.12),transparent_58%)]" />
              <p className="relative text-4xl font-bold text-[#0c2c64] transition group-hover:scale-105">{stat.value}</p>
              <p className="relative mt-2 text-sm font-medium text-[#4f6080]">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="my-20">
        <h2 className="text-center text-2xl font-bold text-[#0c2c64] sm:text-3xl">
          {t(lang, "Uzmanlık Alanları", "Areas of Expertise")}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            {
              title: t(lang, "Konut Projeleri", "Residential Projects"),
              text: t(lang, "Aile yaşamına odaklı, sosyal alanlarla güçlendirilmiş yaşam kompleksleri.", "Family-focused living complexes strengthened with social spaces."),
              image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=900&q=85",
            },
            {
              title: t(lang, "Ticari Mekânlar", "Commercial Spaces"),
              text: t(lang, "Markaların görünürlüğünü artıran, yüksek yaya trafiği odaklı ticari çözümler.", "Commercial solutions focused on high foot traffic and brand visibility."),
              image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=85",
            },
            {
              title: t(lang, "Karma Kullanımlı Projeler", "Mixed-Use Projects"),
              text: t(lang, "Konut, ofis ve perakende alanlarını tek merkezde birleştiren dengeli planlama.", "Balanced planning that combines residential, office, and retail zones in one center."),
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=85",
            },
            {
              title: t(lang, "Yenileme Projeleri", "Renovation Projects"),
              text: t(lang, "Mevcut yapıları modern standartlarla yeniden yorumlayan dönüşüm yaklaşımı.", "A transformation approach that reinterprets existing buildings with modern standards."),
              image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85",
            },
          ].map((area) => (
            <article key={area.title} className="group relative overflow-hidden rounded-3xl border border-[#d9e5f8] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-[320px]">
                <Image src={area.image} alt={area.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,17,44,0.12)_0%,rgba(7,27,68,0.55)_45%,rgba(8,30,74,0.88)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">Yapı İstanbul</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{area.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/88">{area.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {blogs.length > 0 && (
        <section className="my-20">
          <h2 className="text-center text-2xl font-bold text-[#0c2c64] sm:text-3xl">
            {t(lang, "Son Blog Yazıları", "Latest Blog Posts")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {blogs.slice(0, 4).map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="group block overflow-hidden rounded-2xl border border-[#dbe5f4] bg-white transition hover:-translate-y-1 hover:border-[#1a4f9d] hover:shadow-lg"
              >
                <div className="relative h-36">
                  <Image
                    src={blog.coverImage || "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85"}
                    alt={`${blog.title} — Yapı İstanbul blog`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    unoptimized={!!blog.coverImage}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#04173f]/80 via-[#0a2b66]/25 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 sm:line-clamp-1 font-semibold text-[#0c2c64] group-hover:text-[#1a4f9d]">
                    {blog.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#4f6080] line-clamp-2 sm:line-clamp-3">
                    {blog.content.substring(0, 150)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
