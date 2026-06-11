import type { Metadata } from "next";
import { headers } from "next/headers";
import { Playfair_Display, Manrope } from "next/font/google";
import { getLang } from "@/lib/i18n";
import { localePath, stripLocale } from "@/lib/locale";
import { safeSettings } from "@/lib/data";
import "./globals.css";

const titleFont = Playfair_Display({
  variable: "--font-title",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const [settings, lang, h] = await Promise.all([safeSettings(), getLang(), headers()]);

  // Build per-locale URLs from the real request path so every page emits
  // correct canonical + hreflang alternates centrally.
  const bare = stripLocale(h.get("x-pathname") || "/");
  const selfUrl = localePath(lang, bare);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yapiistanbul.com"),
    title: {
      default: "Yapı İstanbul",
      template: "%s | Yapı İstanbul",
    },
    description: "Yapı İstanbul — İstanbul odaklı premium konut ve ticari proje geliştirme firması.",
    keywords: [
      "Yapı İstanbul",
      "inşaat firması",
      "istanbul projeleri",
      "kentsel proje geliştirme",
      "premium konut",
    ],
    alternates: {
      canonical: selfUrl,
      languages: {
        tr: bare,
        en: localePath("en", bare),
        "x-default": bare,
      },
    },
    icons: settings.siteFavicon ? { icon: settings.siteFavicon } : undefined,
    openGraph: {
      type: "website",
      locale: lang === "tr" ? "tr_TR" : "en_US",
      siteName: "Yapı İstanbul",
      title: "Yapı İstanbul",
      description: "İstanbul odaklı premium konut ve ticari proje geliştirme firması.",
      url: selfUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: "Yapı İstanbul",
      description: "İstanbul odaklı premium konut ve ticari proje geliştirme firması.",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  return (
    <html
      lang={lang}
      className={`${titleFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
