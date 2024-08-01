import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../public/locales/en/translation.json";
import vi from "../public/locales/vi/translation.json";

if (typeof window !== "undefined") {
  const language = localStorage.getItem("language") ?? "en";
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        vi: {
          translation: vi,
        },
        en: {
          translation: en,
        },
      },
      lng: 'en',
      fallbackLng: 'en',
      keySeparator: '.',
      // keySeparator: false, // this was the line that I've had to remove to make it work
      // keySeparator: '.', // if you want to re-enable it (not "true", but actual separator value)
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
