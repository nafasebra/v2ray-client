import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fa from "@/assets/translations/fa.json";
import en from "@/assets/translations/en.json";

async function initI18n() {
  await i18n.use(initReactI18next).init({
    resources: {
      fa: fa,
      en: en,
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default initI18n;
