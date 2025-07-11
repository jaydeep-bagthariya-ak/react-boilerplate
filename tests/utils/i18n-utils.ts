// Enhanced test i18n utilities
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../../public/locales/en/translation.json';
import esTranslations from '../../public/locales/es/translation.json';

// Type-safe language keys
export type SupportedLanguage = 'en' | 'es';

// Translation resources mapping
const translationResources = {
  en: enTranslations,
  es: esTranslations,
} as const;

/**
 * Creates a test i18n instance with specified language
 * @param language - The language to use for tests (default: 'en')
 * @param debug - Enable debug mode (default: false)
 */
export function createTestI18n(
  language: SupportedLanguage = 'en',
  debug = false
) {
  const testI18n = i18n.createInstance();

  testI18n.use(initReactI18next).init({
    lng: language,
    fallbackLng: 'en',
    debug,
    interpolation: {
      escapeValue: false,
    },
    resources: Object.entries(translationResources).reduce(
      (acc, [lang, translations]) => ({
        ...acc,
        [lang]: { translation: translations },
      }),
      {}
    ),
  });

  return testI18n;
}

// Default test i18n instance
export const defaultTestI18n = createTestI18n();

// Helper to add new languages in the future
export function addTestLanguage(
  language: string,
  translations: Record<string, unknown>
) {
  const testI18n = createTestI18n();
  testI18n.addResourceBundle(language, 'translation', translations);
  return testI18n;
}

// Helper to switch language in existing test instance
export function switchTestLanguage(
  testI18n: typeof i18n,
  language: SupportedLanguage
) {
  testI18n.changeLanguage(language);
  return testI18n;
}
