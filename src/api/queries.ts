import { api } from ".";

interface ButtonsResult {
  icon?: string;
  text: string;
  background_color: string;
  icon_color: string;
  text_color: string;
  url: string;
}

export function getHeaderButtons() {
  return api.get<ButtonsResult[]>("/FrontEnd/buttons.php");
}
