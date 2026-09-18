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
    ? "منتجات المطاط في قطر | الهدى للمطاط"
    : "Rubber Products in Qatar | Alhuda for Rubber";

  const description = isArabic
    ? "الهدى للمطاط شركة متخصصة في منتجات المطاط وحلول المطاط في قطر، بما في ذلك الأرضيات المطاطية، البلاط المطاطي، السيور الناقلة، الأسطح الرياضية والحلول المطاطية المخصصة."
    : "Alhuda for Rubber provides rubber products and industrial rubber solutions in Qatar, including rubber flooring, rubber tiles, conveyor belts, sports surfaces, and customized rubber solutions.";

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
      title,
      description,
      url,
      locale: isArabic ? "ar_QA" : "en_QA",
      type: "website",
      siteName: "Alhuda for Rubber",
    },

    robots: {
      index: true,
      follow: true,
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