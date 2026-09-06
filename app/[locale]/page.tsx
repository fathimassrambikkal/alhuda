import type { Metadata } from "next";

import { getTranslations } from "@/i18n/getTranslations";
import type { Locale } from "@/i18n/config";

import HomeSection from "@/components/sections/Home";
import AboutSection from "@/components/sections/About";
import ProductsSection from "@/components/sections/Products";
import CompanySection from "@/components/sections/Company";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = locale === "ar";

  const title = isArabic
    ? "الهدى للمطاط | منتجات وحلول المطاط في قطر"
    : "Alhuda for Rubber | Rubber Products & Solutions in Qatar";

  const description = isArabic
    ? "الهدى للمطاط تقدم منتجات وحلول تركيب المطاط عالية الجودة في قطر، بما في ذلك الأرضيات المطاطية والسيور الناقلة والأسطح الرياضية والحلول المطاطية المخصصة."
    : "Alhuda for Rubber provides premium rubber products and installation solutions in Qatar, including rubber flooring, conveyor belts, sports surfaces, and customized rubber solutions.";

  return {
    title,
    description,

    alternates: {
      canonical: `https://alhudaqa.com/${locale}`,
      languages: {
        en: "https://alhudaqa.com/en",
        ar: "https://alhudaqa.com/ar",
      },
    },

    openGraph: {
      title,
      description,
      url: `https://alhudaqa.com/${locale}`,
      locale: isArabic ? "ar_QA" : "en_QA",
      type: "website",
    },
  };
}

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params;

  const translations = await getTranslations(locale);

  return (
    <>
      <HomeSection translations={translations.hero} />

      <AboutSection
        translations={translations.about}
        locale={locale}
      />

      <ProductsSection
        translations={translations.products}
        locale={locale}
      />

      <CompanySection translations={translations.company} />
    </>
  );
}