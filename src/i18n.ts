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


// {
//   "code": "12-14",
//   "order_date": "2026-01-15T10:00:00.000Z",
//   "to": [
//     "69b92665f998b76cd7fb0bbb",
//         "69b9308a2aca4704f479096a"
//   ],
//   "copy": [
//     "Technical Department"
//   ],

//   "payload": { //17-48
//     "basic": {
//       "title": "Rejadan tashqari ta’mirlash-sozlash ishlari to‘g‘risida",
//       "start_time": "2026-01-16T09:00:00.000Z",
//       "end_time": "2026-01-16T11:00:00.000Z",
//       "base_file": "file-69131cfc69544251bfc137e8-1774501670846.png"
//     },
//     "content": "XKM-1, XKM-4 stansiyalaridagi shaharlararo va mobil aloqa operatorlarining oqimlarini Toshkent va Nurafshon ZTE MGW qurilmasiga koʻchirish ishlarining 6-bosqichi bajarilsin.",
//     "stopped_flows": [
//       "031"
//     ],
//     "including": "",
//     "main_routes": "",
//     "reserve_routes": "",
//     "responsible_person": "“O‘zbektelekom” AK Markaziy filiali TTEQ va R xizmati boshligʻi – Z. Irismetov, 7-bogʻlama bosh muhandisi – Z. Toshev.",
//     "concert_text": "“O‘zbektelekom” AK boshqaruv raisining birinchi o‘rinbosari – J. Aripov, “O‘zbektelekom” АК “IT” filiali direktori oʻrinbosari – Gʻ. Roʻzimatov Markaziy filiali direktorining birinchi oʻrinbosari - Z. Saidazimov.",
//     "concert_second":"UzMTRK",
//     "basis": "MBB-2 muhandisi Z. Odilovaning 2026-yil 13-yanvardagi 6-son talabnomasi."
//   }
  
// }