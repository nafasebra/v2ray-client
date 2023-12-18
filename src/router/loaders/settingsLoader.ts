import { getI18n } from "react-i18next";
import { QueryClient } from "@tanstack/react-query";
import type { LoaderFunction } from "react-router-dom";
import { keys } from "@/api/keys";
import { useTheme } from "@/store/theme";
import { getSetting } from "@/api/queries";
import { defaultTheme } from "@/theme";
import { ChatboxColors, Crisp } from "crisp-sdk-web";
import { changeLanguage } from "i18next";

type SettingsLoader = (queryClient: QueryClient) => LoaderFunction;

const settingsLoader: SettingsLoader = queryClient => {
  return async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const { data } = await queryClient.fetchQuery({
      queryFn: () => getSetting(getI18n().language),
      queryKey: [keys.SETTING],
    });

    await useTheme.getState().setTheme(queryClient, data.theme);
    const currentTheme = useTheme.getState().themes[data.theme] ?? defaultTheme;

    if (!useTheme.getState().isConfigured) {
      const favicon = `<link ref="icon" type="image/png" href="${currentTheme.logo}" />`;

      const lang = searchParams.get("lang");
      document.documentElement.style.setProperty("--bgImg", currentTheme.bg);
      document.head.innerHTML += favicon;
      document.title = currentTheme.title;

      if (lang) {
        changeLanguage(lang);
        document.dir = lang === "en" ? "ltr" : "rtl";
        document.documentElement.setAttribute("lang", lang);
      }

      useTheme.setState({ isConfigured: true });
    }

    if (!useTheme.getState().crispLoaded) {
      try {
        type CColor = keyof typeof ChatboxColors;

        Crisp.setColorTheme(ChatboxColors[currentTheme.crispColor as CColor]);
        Crisp.configure(data.crisp_id);
        useTheme.setState({ crispLoaded: true });
      } catch (e) {
        /* empty */
      }
    }

    return null;
  };
};

export default settingsLoader;
