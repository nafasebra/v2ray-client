import { api } from ".";
import { IButtonsResult, IAppsLink } from "@/types";

export function getHeaderButtons() {
  return api.get<IButtonsResult[]>("/FrontEnd/buttons.php");
}

export function getAppsLink() {
  return api.get<IAppsLink[]>("/FrontEnd/apps.json");
}
