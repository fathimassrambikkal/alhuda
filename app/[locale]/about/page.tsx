import Intro from "./Intro";
import GetToKnowUs from "../../../components/sections/GetToKnowUs";
import { getTranslations } from "@/i18n/getTranslations";
import type { Locale } from "@/i18n/config";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const translations = await getTranslations(locale);

  return (
    <main className="bg-white text-black">
      <Intro translations={translations.principles} />

      <GetToKnowUs
  text={translations.getToKnowUs.text}
  href={`/${locale}/contact`}
/>
    </main>
  );
}