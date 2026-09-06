import type { Metadata } from "next";

import Intro from "./Intro";
import GetToKnowUs from "@/components/sections/GetToKnowUs";
import { getTranslations } from "@/i18n/getTranslations";
import type { Locale } from "@/i18n/config";

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = locale === "ar";

  const title = isArabic
    ? "من نحن | الهدى للمطاط"
    : "About Alhuda for Rubber";

  const description = isArabic
    ? "تعرف على الهدى للمطاط وخبرتنا في منتجات وحلول المطاط وتركيبها في قطر، مع التركيز على الجودة والحرفية والحلول المخصصة."
    : "Learn about Alhuda for Rubber, our experience in rubber products and installation, and our commitment to quality, craftsmanship, and customized solutions in Qatar.";

  return {
    title,
    description,

    alternates: {
      canonical: `https://alhudaqa.com/${locale}/about`,
      languages: {
        en: "https://alhudaqa.com/en/about",
        ar: "https://alhudaqa.com/ar/about",
      },
    },

    openGraph: {
      title,
      description,
      url: `https://alhudaqa.com/${locale}/about`,
      locale: isArabic ? "ar_QA" : "en_QA",
      type: "website",
    },
  };
}

export default async function AboutPage({
  params,
}: AboutPageProps) {
  const { locale } = await params;

  const translations = await getTranslations(locale);

  return (
    <div className="bg-white text-black">
      <Intro translations={translations.principles} />

      <GetToKnowUs
        text={translations.getToKnowUs.text}
        href={`/${locale}/contact`}
      />
    </div>
  );
}