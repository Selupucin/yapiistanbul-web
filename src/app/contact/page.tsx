import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { SiteShell } from "@/components/site-shell";
import { safeContact } from "@/lib/data";
import { getLang, t } from "@/lib/i18n";
import { submitMeetingRequestAction } from "./actions";

export const metadata: Metadata = {
  title: "Iletisim",
  description: "Yapi Istanbul iletisime gecin",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ sent?: string }> }) {
  const lang = await getLang();
  const contact = await safeContact();
  const params = await searchParams;
  const isSent = params.sent === "1";

  return (
    <SiteShell>
      <PageSeoSchema
        title={t(lang, "İletişim", "Contact")}
        description={t(lang, "Yapı İstanbul iletişim sayfası.", "Yapi Istanbul contact page.")}
        path="/contact"
        breadcrumbs={[
          { name: t(lang, "Ana Sayfa", "Home"), path: "/" },
          { name: t(lang, "İletişim", "Contact"), path: "/contact" },
        ]}
        isLocalBusiness
        contact={{ phone: contact.phone, email: contact.email, address: contact.address }}
      />

      <Breadcrumb homeLabel={t(lang, "Ana Sayfa", "Home")} items={[{ href: "/contact", label: t(lang, "İletişim", "Contact") }]} />

      <section className="animate-fade-up rounded-3xl border border-[#204d92] bg-[linear-gradient(135deg,#0c2c64_0%,#1a4f9d_100%)] p-8 text-white shadow-[0_16px_36px_rgba(12,44,100,0.2)] sm:p-10">
        <h1 className="text-4xl sm:text-5xl">{t(lang, "İletişim", "Contact")}</h1>
        <p className="mt-3 max-w-3xl text-sm text-white/88 sm:text-base">
          {t(lang, "Proje talepleri, iş birlikleri ve detaylı bilgi için ekibimizle doğrudan iletişime geçebileceğiniz kanalları aşağıda bulabilirsiniz.", "You can find direct channels below for project requests, partnerships, and detailed information.")}
        </p>
      </section>

      <section className="animate-fade-up-delayed mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            title: t(lang, "Yanıt Süresi", "Response Time"),
            text: t(lang, "İş günlerinde gelen talepleri mümkün olduğunda aynı gün içinde değerlendiriyoruz.", "We review incoming requests on business days, often within the same day."),
          },
          {
            title: t(lang, "Görüşme Biçimi", "Meeting Format"),
            text: t(lang, "İlk görüşmeleri çevrim içi veya ofis toplantısı olarak planlayabiliyoruz.", "Initial meetings can be planned online or as in-office sessions."),
          },
          {
            title: t(lang, "Hazırlık", "Preparation"),
            text: t(lang, "Arsa bilgisi, hedef kullanıcı ve proje beklentilerini paylaşmanız süreci hızlandırır.", "Sharing land details, target users, and project expectations accelerates the process."),
          },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-[#dbe7f8] bg-white px-4 py-4 shadow-sm">
            <p className="text-sm font-semibold text-[#0c2c64]">{item.title}</p>
            <p className="mt-2 text-sm text-[#4a668f]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="panel-soft rounded-3xl p-6">
            <h2 className="text-3xl section-title">{t(lang, "İletişim Bilgileri", "Contact Information")}</h2>
            <div className="mt-5 space-y-3 text-[#4f6386]">
              <p><span className="font-semibold text-[#113d7d]">{t(lang, "Telefon:", "Phone:")}</span> <Link href={`tel:${String(contact.phone).replace(/\s+/g, "")}`} className="link-hover">{contact.phone}</Link></p>
              <p><span className="font-semibold text-[#113d7d]">Email:</span> <Link href={`mailto:${contact.email}`} className="link-hover">{contact.email}</Link></p>
              <p><span className="font-semibold text-[#113d7d]">{t(lang, "Adres:", "Address:")}</span> {contact.address}</p>
            </div>

            <a
              href={contact.mapLocation}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover mt-6 inline-block rounded-full navy-gradient px-5 py-2 text-sm font-semibold text-white"
            >
              {t(lang, "Haritayı Ayrı Aç", "Open Map")}
            </a>

            <div className="mt-7 rounded-2xl border border-[#d8e5f8] bg-white p-4 text-sm text-[#5d7193]">
              {t(lang, "Toplantı ve saha ziyaretleri için önce randevu oluşturmanız önerilir.", "We recommend scheduling an appointment before on-site meetings and visits.")}
            </div>
          </div>

          <div className="panel-soft rounded-3xl p-6">
            <h2 className="text-3xl section-title">{t(lang, "Toplantı Talebi", "Meeting Request")}</h2>
            <p className="mt-2 text-sm text-[#5b7195]">
              {t(lang, "Kısa proje özetinizi bırakın; ekibimiz size geri dönüş yapsın.", "Leave a short summary of your project and our team will get back to you.")}
            </p>
            {isSent ? (
              <div className="mt-4 rounded-2xl border border-[#cdddf5] bg-[#eff5ff] px-4 py-3 text-sm text-[#0c2c64]">
                {t(lang, "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.", "Your request has been received. We will contact you shortly.")}
              </div>
            ) : null}
            <form action={submitMeetingRequestAction} className="mt-5 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="fullName"
                placeholder={t(lang, "Ad ve Soyad", "Full Name")}
                aria-label={t(lang, "Ad ve Soyad", "Full Name")}
                className="w-full rounded-2xl border border-[#d8e5f8] bg-white px-4 py-3 text-sm text-[#0c2c64] placeholder-[#9fa9c1] outline-none transition focus:border-[#0c2c64] focus:shadow-[0_0_0_4px_rgba(12,44,100,0.08)]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t(lang, "Email Adresiniz", "Your Email")}
                aria-label={t(lang, "Email Adresiniz", "Your Email")}
                className="w-full rounded-2xl border border-[#d8e5f8] bg-white px-4 py-3 text-sm text-[#0c2c64] placeholder-[#9fa9c1] outline-none transition focus:border-[#0c2c64] focus:shadow-[0_0_0_4px_rgba(12,44,100,0.08)]"
                required
              />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder={t(lang, "Telefon Numarası", "Phone Number")}
                className="w-full rounded-2xl border border-[#d8e5f8] bg-white px-4 py-3 text-sm text-[#0c2c64] placeholder-[#9fa9c1] outline-none transition focus:border-[#0c2c64] focus:shadow-[0_0_0_4px_rgba(12,44,100,0.08)]"
              />
              <textarea
                name="message"
                placeholder={t(lang, "Proje Tanımı ve Talep", "Project Details and Request")}
                rows={5}
                className="w-full rounded-2xl border border-[#d8e5f8] bg-white px-4 py-3 text-sm text-[#0c2c64] placeholder-[#9fa9c1] outline-none transition focus:border-[#0c2c64] focus:shadow-[0_0_0_4px_rgba(12,44,100,0.08)]"
                required
              />
              <button
                type="submit"
                className="btn-hover w-full rounded-full navy-gradient py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(12,44,100,0.16)]"
              >
                {t(lang, "Randevu Talep Et", "Request Appointment")}
              </button>
            </form>
          </div>
        </div>

        <div className="panel-soft rounded-3xl p-6">
          <h2 className="text-3xl section-title">{t(lang, "Harita Konumu", "Map Location")}</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#d6e4f8]">
            <iframe
              title="Yapi Istanbul ornek harita"
              src="https://www.google.com/maps?q=Istanbul&output=embed"
              className="h-96 w-full sm:h-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-[#dce7f8] bg-[#f8fbff] p-7">
        <h2 className="text-3xl section-title">{t(lang, "İletişim Sonrası Süreç", "What Happens Next")}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#deebfb] bg-white p-4 text-sm text-[#5c7193]">{t(lang, "1. Talep değerlendirme ve geri dönüş", "1. Request review and callback")}</div>
          <div className="rounded-2xl border border-[#deebfb] bg-white p-4 text-sm text-[#5c7193]">{t(lang, "2. İhtiyaç odaklı ön görüşme", "2. Needs-focused pre-meeting")}</div>
          <div className="rounded-2xl border border-[#deebfb] bg-white p-4 text-sm text-[#5c7193]">{t(lang, "3. Yol haritası ve süreç planlaması", "3. Roadmap and process planning")}</div>
        </div>
      </section>
    </SiteShell>
  );
}
