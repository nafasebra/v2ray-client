import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import queryClient from "./react-query";
import { keys } from "@/api/keys";
import { getTranslations } from "@/api/queries";

async function initI18n(defaultLang: string) {
  const { data } = await queryClient.fetchQuery({
    queryFn: getTranslations,
    queryKey: [keys.TRANSLATIONS],
  });

  await i18n.use(initReactI18next).init({
    resources: data,
    lng: defaultLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default initI18n;
