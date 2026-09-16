import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Providers from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import {
  locales,
  isValidLocale,
} from "@/i18n/config";

import type { Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    return {};
  }

  const locale: Locale = rawLocale;
  const isArabic = locale === "ar";

  const title = isArabic
    ? "منتجات وحلول المطاط في قطر | الهدى للمطاط"
    : "Rubber Products & Solutions in Qatar | Alhuda for Rubber";

  const description = isArabic
    ? "الهدى للمطاط تقدم منتجات وحلول المطاط في قطر، بما في ذلك الأرضيات المطاطية، البلاط المطاطي، السيور الناقلة، الأسطح الرياضية والحلول المطاطية المخصصة."
    : "Alhuda for Rubber provides high-quality rubber products, rubber flooring, rubber tiles, conveyor belts, sports surfaces, and customized rubber solutions in Qatar.";

  const url = `https://www.alhudaqa.com/${locale}/`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
      languages: {
        en: "https://www.alhudaqa.com/en/",
        ar: "https://www.alhudaqa.com/ar/",
        "x-default": "https://www.alhudaqa.com/en/",
      },
    },

    openGraph: {
      type: "website",
      locale: isArabic ? "ar_QA" : "en_QA",
      url,
      siteName: "Alhuda for Rubber",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div lang={locale} dir={dir}>
      <OrganizationJsonLd />
      <Providers>
        <Navbar />
        <main>{children}</main>
        <Footer locale={locale} />
      </Providers>
    </div>
  );
}