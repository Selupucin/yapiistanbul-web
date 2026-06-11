import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { SiteShell } from "@/components/site-shell";
import { localizedContent, localizedTitle } from "@/lib/content";
import { dateLocale, getLang, t } from "@/lib/i18n";
import { safeBlogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Yapi Istanbul blog yazilari",
};

export default async function BlogPage() {
  const lang = await getLang();
  const blogs = await safeBlogs();

  return (
    <SiteShell>
      <PageSeoSchema
        title="Blog"
        description={t(lang, "Yapı İstanbul blog içerikleri.", "Yapi Istanbul blog articles.")}
        path="/blog"
        breadcrumbs={[
          { name: t(lang, "Ana Sayfa", "Home"), path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <Breadcrumb homeLabel={t(lang, "Ana Sayfa", "Home")} items={[{ href: "/blog", label: "Blog" }]} />

      <section className="animate-fade-up rounded-3xl border border-[#d8e5f8] bg-white p-8 shadow-[0_16px_36px_rgba(12,44,100,0.09)] sm:p-10">
        <h1 className="text-4xl section-title sm:text-5xl">Blog</h1>
        <p className="mt-3 max-w-2xl text-sm text-[#607396] sm:text-base">
          {t(lang, "İnşaat, tasarım ve yatırım perspektifi üzerine hazırlanan kısa ama güçlü içeriklerimizle karar süreçlerini destekliyoruz.", "We support decision-making with concise but valuable articles on construction, design, and investment.")}
        </p>
      </section>

      <section className="animate-fade-up-delayed mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            title: t(lang, "İçerik Odağı", "Content Focus"),
            text: t(lang, "Yatırım, mimari ve proje yönetimi ekseninde karar destekleyici içerikler sunuyoruz.", "We publish decision-supporting content around investment, architecture, and project management."),
          },
          {
            title: t(lang, "Okuma Yapısı", "Reading Format"),
            text: t(lang, "Yazılar kısa, okunabilir ve sahadaki gerçek ihtiyaçlara cevap verecek şekilde hazırlanır.", "Articles are concise, readable, and built around real field needs."),
          },
          {
            title: t(lang, "Güncelleme", "Updates"),
            text: t(lang, "Yeni sektör başlıkları ve kurumsal bakış açıları düzenli olarak eklenir.", "New sector topics and corporate perspectives are added regularly."),
          },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-[#dde8f9] bg-white px-4 py-4 shadow-sm">
            <p className="text-sm font-semibold text-[#0c2c64]">{item.title}</p>
            <p className="mt-2 text-sm text-[#4c6790]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {blogs.map((post, index) => (
            <article key={String(post._id)} className="panel-soft overflow-hidden rounded-2xl p-0">
              <div className="relative h-40 w-full">
                <Image
                  src={
                    post.coverImage ||
                    (index % 2 === 0
                      ? "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&q=85"
                      : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&q=85")
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
              <p className="text-xs text-[#6d81a4]">{new Date(post.createdAt).toLocaleDateString(dateLocale(lang))}</p>
              <h2 className="mt-2 text-xl section-title">{localizedTitle(post, lang)}</h2>
              <p className="mt-3 line-clamp-3 text-sm text-[#5a6d8f]">{localizedContent(post, lang)}</p>
              <Link href={`/blog/${post.slug}`} className="btn-hover mt-4 inline-block rounded-full border border-[#c5d8f5] px-4 py-2 text-sm font-semibold text-[#0d3370] hover:bg-[#edf4ff]">
                {t(lang, "Yazıyı oku", "Read article")}
              </Link>
              </div>
            </article>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="panel-soft rounded-2xl p-6 text-sm text-[#5c7092]">
            {t(lang, "Henüz blog yazısı bulunmuyor. Admin panelinden ilk yazıyı ekleyebilirsiniz.", "No blog posts yet. You can add the first one from the admin panel.")}
          </div>
        )}
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <article className="panel-soft rounded-3xl p-7">
          <h2 className="text-3xl section-title">{t(lang, "Neden Bu İçerikler?", "Why This Content?")}</h2>
          <p className="mt-3 text-sm text-[#5e7394]">
            {t(lang, "Blog içerikleri, proje karar süreçlerinde doğru soruları sorabilmeniz ve piyasa dinamiklerini takip edebilmeniz için hazırlanır.", "Our blog articles are crafted to help you ask the right questions and follow market dynamics during project decisions.")}
          </p>
        </article>
        <article className="rounded-3xl navy-gradient p-7 text-white">
          <h2 className="text-3xl">{t(lang, "E-Bülten Çok Yakında", "Newsletter Coming Soon")}</h2>
          <p className="mt-3 text-sm text-white/90">
            {t(lang, "Yeni içerik ve proje duyurularını düzenli almak için iletişim sayfasından talep bırakabilirsiniz.", "Leave a request on the contact page to receive updates on new content and project announcements.")}
          </p>
        </article>
      </section>
    </SiteShell>
  );
}
