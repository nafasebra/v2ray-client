import { getI18n } from "react-i18next";
import { QueryClient } from "@tanstack/react-query";
import type { LoaderFunction } from "react-router-dom";

import { theme } from "@/theme";
import { keys } from "@/api/keys";
import { useTheme } from "@/store/theme";
import { getSetting } from "@/api/queries";

type SettingsLoader = (queryClient: QueryClient) => LoaderFunction;

const settingsLoader: SettingsLoader = (queryClient) => {
  return async () => {
    const { data } = await queryClient.fetchQuery({
      queryFn: () => getSetting(getI18n().language),
      queryKey: [keys.SETTING],
    });

    const currentTheme =
      theme[data.theme as keyof typeof theme] ?? theme["dark1"];

    useTheme.setState({ theme: data.theme, globalLoading: false });

    if (!useTheme.getState().isConfigured) {
      const favicon = `<link ref="icon" type="image/png" href="${currentTheme.logo}" />`;

      document.documentElement.style.setProperty("--bgImg", currentTheme.bg);
      document.head.innerHTML += favicon;
      document.title = currentTheme.title

      useTheme.setState({ isConfigured: true });
    }

    return null;
  };
};

export default settingsLoader;
