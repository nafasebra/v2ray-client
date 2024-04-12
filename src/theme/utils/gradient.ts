import { useTheme } from "@/store/theme";
import { defaultTheme } from "@/theme";

export const useGradientStyle = () => {
  const theme = useTheme(state => state.theme);
  const currentTheme = theme ?? defaultTheme;

  return {
    backgroundImage: `linear-gradient(to right, ${currentTheme?.from}, ${currentTheme?.via}, ${currentTheme?.to})`,
  };
};

export const useActiveTheme = () => {
  const theme = useTheme(state => state.theme);
  return theme ?? defaultTheme;
};

export const useConicStyle = (percent: number) => {
  const theme = useTheme(state => state.theme);
  const currentTheme = theme ?? defaultTheme;

  const deg = (360 / 100) * percent;

  return {
    backgroundImage: `conic-gradient(${currentTheme.from} 0deg, ${currentTheme.to} ${deg}deg, transparent ${deg}deg)`,
  };
};
