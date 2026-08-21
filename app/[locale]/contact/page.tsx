import ContactPage from "@/components/sections/Contact";
import { getTranslations } from "@/i18n/getTranslations";
import type { Locale } from "@/i18n/config";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const translations = await getTranslations(locale);

  return (
    <ContactPage translations={translations.contact} />
  );
}