import { create } from "zustand";

interface UseTheme {
  theme: string;
  setTheme: (name: string) => void;
}

export const useTheme = create<UseTheme>((set) => ({
  theme: "dark1",
  setTheme: (name: string) => set({ theme: name }),
}));
