import { getTranslations } from "@/i18n/getTranslations";
import type { Locale } from "@/i18n/config";

import HomeSection from "@/components/sections/Home";
import AboutSection from "@/components/sections/About";
import ProductsSection from "@/components/sections/Products";
import CompanySection from "@/components/sections/Company";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const translations = await getTranslations(locale);

  return (
    <main>
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
    </main>
  );
}