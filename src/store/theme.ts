import { create } from "zustand";
import type { ITheme } from "@/types";

interface UseTheme {
  isConfigured: boolean;
  crispLoaded: boolean;
  setTheme: (theme: ITheme) => void;
  theme: ITheme | undefined;
}

export const useTheme = create<UseTheme>(set => ({
  isConfigured: false,
  crispLoaded: false,
  theme: undefined,
  setTheme: themeData => {
    set({
      theme: themeData,
    });
  },
}));
