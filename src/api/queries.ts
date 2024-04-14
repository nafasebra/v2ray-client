// import { toFormData } from "axios";
import { toFormData } from "axios";
import { api } from ".";
import {
  IButtonsResult,
  IAppsLink,
  ISettingApp,
  IDetails,
  IDetailsReq,
} from "@/types";

export function getTranslations() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return api.get<Record<string, any>>("/api/FrontEnd/texts.php");
}

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

export function getDetails(details: IDetailsReq): Promise<{ data: IDetails }> {
  const { hash, lang, uuid } = details;

  return api.post<IDetails>(
    "/api/get/index.php",
    toFormData({
      text: uuid,
      hash: hash,
      lang,
    }),
    { params: { hash } },
  );
}

export function changeHash(hash: string) {
  return api.get<IDetails>("/api/change/index.php", {
    params: { hash },
  });
}
