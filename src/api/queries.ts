import { api } from ".";
import { IButtonsResult, IAppsLink, ISettingApp } from "@/types";

export function getHeaderButtons() {
  return api.get<IButtonsResult[]>("/api/FrontEnd/buttons.php");
}

export function getAppsLink() {
  return api.get<IAppsLink[]>("/api/FrontEnd/apps.php");
}

export function getSetting() {
  return api.get<ISettingApp>("/settings.php");
}
