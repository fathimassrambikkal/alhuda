import type { Metadata } from "next";

import ContactPage from "./Contact";
import { getTranslations } from "@/i18n/getTranslations";
import type { Locale } from "@/i18n/config";

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = locale === "ar";

  const title = isArabic
    ? "اتصل بنا | الهدى للمطاط"
    : "Contact Alhuda for Rubber";

  const description = isArabic
    ? "تواصل مع الهدى للمطاط في الدوحة، قطر للاستفسار عن منتجات المطاط وتركيبها والحلول المطاطية المخصصة."
    : "Contact Alhuda for Rubber in Doha, Qatar for rubber product enquiries, installation services, and customized rubber solutions.";

  const url = `https://www.alhudaqa.com/${locale}/contact`;

  return {
    metadataBase: new URL("https://www.alhudaqa.com"),

    title,
    description,

    alternates: {
      canonical: url,

      languages: {
        en: "https://www.alhudaqa.com/en/contact",
        ar: "https://www.alhudaqa.com/ar/contact",
        "x-default": "https://www.alhudaqa.com/en/contact",
      },
    },

    openGraph: {
      title,
      description,
      url,
      locale: isArabic ? "ar_QA" : "en_QA",
      type: "website",
      siteName: isArabic ? "الهدى للمطاط" : "Alhuda for Rubber",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({
  params,
}: ContactPageProps) {
  const { locale } = await params;

  const translations = await getTranslations(locale);

  return (
    <ContactPage translations={translations.contact} />
  );
}