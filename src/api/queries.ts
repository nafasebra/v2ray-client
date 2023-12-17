import { toFormData } from "axios";
import { api, cdn } from ".";
import {
  IButtonsResult,
  IAppsLink,
  ISettingApp,
  IDetails,
  IDetailsReq,
  ITheme,
} from "@/types";

export function getHeaderButtons(lang: string) {
  return api.get<IButtonsResult[]>("/api/FrontEnd/buttons.php", {
    params: { lang },
  });
}

export function getAppsLink(lang: string) {
  return api.get<IAppsLink[]>("/api/FrontEnd/apps.php", { params: { lang } });
}

export function getSetting(lang: string) {
  return api.get<ISettingApp>("/settings.php", { params: { lang } });
}

export function getDetails({ uuid, lang, hash }: IDetailsReq) {
  return api.post<IDetails>(
    "/api/get/index.php",
    toFormData({
      text: uuid,
      hash: hash,
      lang,
    }),
    { params: { hash } }
  );
}

export function changeHash(hash: string) {
  return api.get<IDetails>("/api/change/index.php", {
    params: { hash },
  });
}

export function getTheme(name: string) {
  return cdn.get<ITheme>(`/themes/${name}.json`);
}
