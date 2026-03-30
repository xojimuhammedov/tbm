import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Language } from "@/shared/enums/Language.ts";
import { config } from "@/shared/utils/config.ts";

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    partialBundledLanguages: true,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: [
      config.LANG.NS.DEFAULT,
      config.LANG.NS.VALIDATION,
      config.LANG.NS.ERROR,
    ],
    fallbackLng: config.LANG.DEFAULT,
    debug: false,
    supportedLngs: [Language.UZ, Language.RU, Language.EN],
    detection: {
      order: [
        "cookie",
        "querystring",
        "htmlTag",
        "localStorage",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    saveMissing: false,
    react: {
      useSuspense: false,
    },
  });
export default i18n;
