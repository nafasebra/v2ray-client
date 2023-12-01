import { api } from ".";
import { IButtonsResult, IAppsLink, ISettingApp, IDetails } from "@/types";

export function getHeaderButtons() {
  return api.get<IButtonsResult[]>("/api/FrontEnd/buttons.php");
}

export function getAppsLink() {
  return api.get<IAppsLink[]>("/api/FrontEnd/apps.php");
}

export function getSetting() {
  return api.get<ISettingApp>("/settings.php");
}

export function getDetails(uuid: string, lang?: string) {
  return api.get<IDetails>("/api/get", {
    params: {
      text: uuid,
      lang,
    },
  });
}
