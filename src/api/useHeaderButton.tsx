import { useQuery } from '@tanstack/react-query';

export type buttonType = {
  icon: string;
  text: string;
  background: string;
  iconColor: string;
  textColor: string;
};

export const fetchHeaderButton = async (): Promise<buttonType> => {
  const res = await fetch('https://beta-patrick-stats.ilyagvc.online/PatrickStats/api/FrontEnd/buttons.json');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  const dataButton: buttonType = {
    icon: data.Telegram.icon,
    text: data.Telegram.text,
    background: data.Telegram.background_color,
    iconColor: data.Telegram.icon_color,
    textColor: data.Telegram.text_color
  };
  return dataButton;
};

export const useHeaderButton = () => {
  return useQuery({ queryKey: ['headerButton'], queryFn: fetchHeaderButton });
};