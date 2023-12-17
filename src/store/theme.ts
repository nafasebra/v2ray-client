import { create } from "zustand";
import type { QueryClient } from "@tanstack/react-query";

import type { ITheme } from "@/types";
import { getTheme } from "@/api/queries";
import { keys } from "@/api/keys";

interface UseTheme {
  theme: string;
  isConfigured: boolean;
  crispLoaded: boolean;
  setTheme: (query: QueryClient, name: string) => Promise<void>;
  themes: {
    [prop: string]: ITheme;
  };
}

export const useTheme = create<UseTheme>(set => ({
  isConfigured: false,
  crispLoaded: false,
  theme: "",
  setTheme: async (query, name) => {
    try {
      const theme = await query.fetchQuery({
        queryFn: () => getTheme(name),
        queryKey: [keys.THEME, name],
      });

      set(prev => ({
        theme: name,
        themes: { ...prev.themes, [name]: theme.data },
      }));
    } catch (e) {
      /* empty */
    }
  },
  themes: {},
}));
