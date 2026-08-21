import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

import type { Locale } from "./config";

const translations = {
  en,
  ar,
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}