import { getI18n } from "react-i18next";
import { changeLanguage } from "i18next";
import { ChatboxColors, Crisp } from "crisp-sdk-web";
import type { LoaderFunction } from "react-router-dom";

import { keys } from "@/api/keys";
import initI18n from "@/lib/i18next";
import { defaultTheme } from "@/theme";
import { useTheme } from "@/store/theme";
import { getSetting } from "@/api/queries";
import queryClient from "@/lib/react-query";
const fontsStyleElem = document.createElement("style");

const settingsLoader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  const { data } = await queryClient.fetchQuery({
    queryFn: () => getSetting("en"),
    queryKey: [keys.SETTING],
  });

  if (!fontsStyleElem.innerHTML) {
    fontsStyleElem.innerHTML = `
    @font-face {
      font-family: Poppins;
      src: url(${data.themeData.font_en});
      font-display: swap;
    }

    @font-face {
      font-family: Morabba;
      src: url(${data.themeData.font_fa});
      font-display: swap;
    }
  `;

    document.head.appendChild(fontsStyleElem);
  }

  if (!getI18n()) await initI18n(data.default_lang);
  if (getI18n().language === "fa") document.dir = "rtl";

  await useTheme.getState().setTheme(data.themeData);
  const currentTheme = useTheme.getState().theme ?? defaultTheme;

  if (!useTheme.getState().isConfigured) {
    if (data.logo) {
      const favicon = `<link ref="icon" type="image/png" href="${data.logo}" />`;
      document.head.innerHTML += favicon;
    }

    if (data.title) document.title = data.title;

    const lang = searchParams.get("lang");

    document.documentElement.style.setProperty(
      "--default-bg",
      `url("${currentTheme.default_bg}")`,
    );

    document.documentElement.style.setProperty(
      "--home-bg-mobile",
      `url("${currentTheme.home_bg_mobile}")`,
    );
    document.documentElement.style.setProperty(
      "--home-bg-tablet",
      `url("${currentTheme.home_bg_tablet}")`,
    );
    document.documentElement.style.setProperty(
      "--home-bg-desktop",
      `url("${currentTheme.home_bg_desktop}")`,
    );

    document.documentElement.style.setProperty(
      "--detail-bg-mobile",
      `url("${currentTheme.detail_bg_mobile}")`,
    );
    document.documentElement.style.setProperty(
      "--detail-bg-tablet",
      `url("${currentTheme.detail_bg_tablet}")`,
    );
    document.documentElement.style.setProperty(
      "--detail-bg-desktop",
      `url("${currentTheme.detail_bg_desktop}")`,
    );

    document.title = currentTheme.title;

    if (lang) {
      changeLanguage(lang);
      document.dir = lang === "en" ? "ltr" : "rtl";
      document.documentElement.setAttribute("lang", lang);
    }

    useTheme.setState({ isConfigured: true });
  }

  if (!useTheme.getState().crispLoaded && !!data.crisp_id) {
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

export default settingsLoader;
