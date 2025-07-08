import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    resources: {
      en: {
        translation: {
          welcome: 'Welcome to React Boilerplate',
          description: 'A modern React TypeScript boilerplate',
          counter: 'Count is {{count}}',
          buttons: {
            increment: 'Increment',
            decrement: 'Decrement',
            reset: 'Reset',
          },
          language: {
            switch: 'Switch Language',
            current: 'Current: {{lng}}',
          },
        },
      },
      es: {
        translation: {
          welcome: 'Bienvenido a React Boilerplate',
          description: 'Un boilerplate moderno de React TypeScript',
          counter: 'El contador es {{count}}',
          buttons: {
            increment: 'Incrementar',
            decrement: 'Decrementar',
            reset: 'Reiniciar',
          },
          language: {
            switch: 'Cambiar Idioma',
            current: 'Actual: {{lng}}',
          },
        },
      },
    },
  });

export default i18n;
