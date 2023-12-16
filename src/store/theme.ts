import { create } from "zustand";

interface UseTheme {
  globalLoading: boolean;
  theme: string;
  isConfigured: boolean;
  setTheme: (name: string) => void;
  setGlobalLoading: (bool: boolean) => void;
}

export const useTheme = create<UseTheme>((set) => ({
  globalLoading: false,
  isConfigured: false,
  theme: "dark1",
  setTheme: (name) => set({ theme: name }),
  setGlobalLoading: (bool) => set({ globalLoading: bool }),
}));
