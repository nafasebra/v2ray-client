import { useTheme } from "@/store/theme";
import { defaultTheme } from "@/theme";

export const useGradientStyle = () => {
  const themes = useTheme(state => state.themes);
  const themeName = useTheme(state => state.theme);
  const currentTheme = themes[themeName] ?? defaultTheme;

  return {
    backgroundImage: `linear-gradient(to right, ${currentTheme?.from}, ${currentTheme?.via}, ${currentTheme?.to})`,
  };
};

export const useActiveTheme = () => {
  const themes = useTheme(state => state.themes);
  const themeName = useTheme(state => state.theme);
  return themes[themeName] ?? defaultTheme;
};

export const useConicStyle = (percent: number) => {
  const themes = useTheme(state => state.themes);
  const themeName = useTheme(state => state.theme);
  const currentTheme = themes[themeName] ?? defaultTheme;

  const deg = (360 / 100) * percent;

  return {
    backgroundImage: `conic-gradient(${currentTheme.from} 0deg, ${currentTheme.to} ${deg}deg, transparent ${deg}deg)`,
  };
};
