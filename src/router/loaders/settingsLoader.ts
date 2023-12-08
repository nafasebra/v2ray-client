import { QueryClient } from "@tanstack/react-query";
import type { LoaderFunction } from "react-router-dom";

import { keys } from "@/api/keys";
import { useTheme } from "@/store/theme";
import { getSetting } from "@/api/queries";
import { theme } from "@/theme";

type SettingsLoader = (queryClient: QueryClient) => LoaderFunction;

const settingsLoader: SettingsLoader = (queryClient) => {
  return async () => {
    const { data } = await queryClient.fetchQuery({
      queryFn: () => getSetting(),
      queryKey: [keys.SETTING],
    });

    const currentTheme = theme[data.theme as keyof typeof theme] ?? theme['dark1']
    useTheme.setState({theme: data.theme})

    document.documentElement.style.setProperty("--bgImg", currentTheme.bg);

    return null;
  };
};

export default settingsLoader;
