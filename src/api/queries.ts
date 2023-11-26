import { api } from ".";
import { IButtonsResult } from "@/types/HeaderButton";

export function getHeaderButtons() {
  return api.get<IButtonsResult[]>("/FrontEnd/buttons.php");
}
