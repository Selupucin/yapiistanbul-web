import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { SiteShell } from "@/components/site-shell";
import { getLang, t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Yapı İstanbul gizlilik politikası",
};

export default async function PrivacyPolicyPage() {
  const lang = await getLang();

  return (
    <SiteShell>
      <PageSeoSchema
        title={t(lang, "Gizlilik Politikası", "Privacy Policy")}
        description={t(lang, "Yapı İstanbul gizlilik politikası.", "Yapi Istanbul privacy policy.")}
        path="/privacy-policy"
        breadcrumbs={[
          { name: t(lang, "Ana Sayfa", "Home"), path: "/" },
          { name: t(lang, "Gizlilik Politikası", "Privacy Policy"), path: "/privacy-policy" },
        ]}
      />

      <Breadcrumb homeLabel={t(lang, "Ana Sayfa", "Home")} items={[{ href: "/privacy-policy", label: t(lang, "Gizlilik Politikası", "Privacy Policy") }]} />

      <section className="rounded-3xl border border-[#d8e5f8] bg-white p-8 shadow-[0_16px_36px_rgba(12,44,100,0.09)] sm:p-10">
        <h1 className="text-4xl section-title sm:text-5xl">{t(lang, "Gizlilik Politikası", "Privacy Policy")}</h1>
        <p className="mt-4 max-w-3xl text-sm text-[#607396] sm:text-base">
          {t(lang, "Bu sayfa, Yapı İstanbul web sitesinde işlenen temel kişisel veriler ve kullanım ilkeleri hakkında bilgilendirme sunar.", "This page explains the basic personal data processing and usage principles on the Yapi Istanbul website.")}
        </p>
      </section>

      <section className="mt-8 grid gap-5">
        {[
          {
            title: t(lang, "Toplanan Bilgiler", "Collected Information"),
            text: t(lang, "İletişim formları üzerinden ad, e-posta, telefon ve mesaj içeriği gibi bilgiler alınabilir.", "Information such as name, email, phone, and message content may be collected through contact forms."),
          },
          {
            title: t(lang, "Kullanım Amacı", "Purpose of Use"),
            text: t(lang, "Toplanan bilgiler yalnızca taleplere dönüş yapmak, iletişim kurmak ve hizmet süreçlerini yönetmek amacıyla kullanılır.", "Collected data is used only to respond to requests, establish communication, and manage service workflows."),
          },
          {
            title: t(lang, "Veri Saklama", "Data Retention"),
            text: t(lang, "Bilgiler, operasyonel gereklilikler ve yasal yükümlülükler çerçevesinde makul süre boyunca saklanır.", "Information is retained for a reasonable period in line with operational needs and legal obligations."),
          },
          {
            title: t(lang, "İletişim", "Contact"),
            text: t(lang, "Veri kullanımıyla ilgili sorularınız için iletişim sayfasındaki kanallardan bizimle iletişime geçebilirsiniz.", "For questions about data use, you may contact us through the channels on the contact page."),
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