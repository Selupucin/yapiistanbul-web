import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { SiteShell } from "@/components/site-shell";
import { getLang, t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Yapı İstanbul çerez politikası",
};

export default async function CookiesPolicyPage() {
  const lang = await getLang();

  return (
    <SiteShell>
      <PageSeoSchema
        title={t(lang, "Çerez Politikası", "Cookies Policy")}
        description={t(lang, "Yapı İstanbul çerez politikası.", "Yapi Istanbul cookies policy.")}
        path="/cookies-policy"
        breadcrumbs={[
          { name: t(lang, "Ana Sayfa", "Home"), path: "/" },
          { name: t(lang, "Çerez Politikası", "Cookies Policy"), path: "/cookies-policy" },
        ]}
      />

      <Breadcrumb homeLabel={t(lang, "Ana Sayfa", "Home")} items={[{ href: "/cookies-policy", label: t(lang, "Çerez Politikası", "Cookies Policy") }]} />

      <section className="rounded-3xl border border-[#d8e5f8] bg-white p-8 shadow-[0_16px_36px_rgba(12,44,100,0.09)] sm:p-10">
        <h1 className="text-4xl section-title sm:text-5xl">{t(lang, "Çerez Politikası", "Cookies Policy")}</h1>
        <p className="mt-4 max-w-3xl text-sm text-[#607396] sm:text-base">
          {t(lang, "Bu sayfa, sitede kullanılan temel çerez türleri ve bunların hangi amaçlarla değerlendirildiğini açıklar.", "This page explains the basic cookie types used on the site and their purposes.")}
        </p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {[
          {
            title: t(lang, "Zorunlu Çerezler", "Necessary Cookies"),
            text: t(lang, "Site güvenliği, temel gezinme ve oturum işlevleri için gerekli teknik çerezler kullanılabilir.", "Technical cookies may be used for site security, core navigation, and session functionality."),
          },
          {
            title: t(lang, "Analitik Çerezler", "Analytics Cookies"),
            text: t(lang, "Ziyaret davranışlarını anlamak ve site deneyimini iyileştirmek için anonim analitik veriler değerlendirilebilir.", "Anonymous analytics data may be used to understand visit behavior and improve site experience."),
          },
          {
            title: t(lang, "Tercih Çerezleri", "Preference Cookies"),
            text: t(lang, "Dil seçimi gibi kullanıcı tercihlerini hatırlayan işlevsel çerezler kullanılabilir.", "Functional cookies may be used to remember user preferences such as language selection."),
          },
          {
            title: t(lang, "Yönetim", "Management"),
            text: t(lang, "Tarayıcı ayarlarınız üzerinden çerezleri sınırlayabilir veya silebilirsiniz; ancak bu durum bazı işlevleri etkileyebilir.", "You can limit or delete cookies through your browser settings, though some features may be affected."),
          },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-[#dbe7f8] bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-[#0c2c64]">{item.title}</h2>
            <p className="mt-2 text-sm text-[#5b7195]">{item.text}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}