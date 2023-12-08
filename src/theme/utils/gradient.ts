import { useTheme } from "@/store/theme";
import { theme } from "@/theme";

type ThemeKey = keyof typeof theme;

export const useGradientStyle = () => {
  const themeName = useTheme((state) => state.theme);
  const currentTheme = theme[themeName as ThemeKey] ?? theme["dark1"];

  return {
    backgroundImage: `linear-gradient(to right, ${currentTheme?.from}, ${currentTheme?.via}, ${currentTheme?.to})`,
  };
};

export const useActiveTheme = () => {
  const themeName = useTheme((state) => state.theme);
  return theme[themeName as ThemeKey] ?? theme["dark1"];
};

export const useConicStyle = (percent: number) => {
  const themeName = useTheme((state) => state.theme);
  const currentTheme = theme[themeName as ThemeKey] ?? theme["dark1"];

  const deg = (360 / 100) * percent;

  return {
    backgroundImage: `conic-gradient(${currentTheme.from} 0deg, ${currentTheme.to} ${deg}deg, transparent ${deg}deg)`,
  };
};
