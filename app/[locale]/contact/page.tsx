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

  return {
    title,
    description,

    alternates: {
      canonical: `https://alhudaqa.com/${locale}/contact`,
      languages: {
        en: "https://alhudaqa.com/en/contact",
        ar: "https://alhudaqa.com/ar/contact",
      },
    },

    openGraph: {
      title,
      description,
      url: `https://alhudaqa.com/${locale}/contact`,
      locale: isArabic ? "ar_QA" : "en_QA",
      type: "website",
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