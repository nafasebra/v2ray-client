/* eslint-disable @typescript-eslint/no-unused-vars */
// import { toFormData } from "axios";
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
  return api
    .get<ISettingApp>("/settings.php", { params: { lang } })
    .then(res => ({
      ...res,
      data: { ...res.data, logo: "https://picsum.photos/305" },
    }));
}

export async function getDetails(
  detail: IDetailsReq
): Promise<{ data: IDetails }> {
  return {
    data: {
      ok: true,
      lang: "fa",
      panel: 2342,
      result: {
        hash: "ffffffasdwaer",
        protocol: "vmess",
        setting: {
          email: "xsamansafaeix@gmail.com",
          enable: true,
          expiryTime: 5,
          flow: "",
          id: "23432",
          reset: 3,
          subId: "",
          tgId: "",
          totalGB: 5,
        },
        stat: {
          id: 1,
          inboundId: 4,
          enable: true,
          email: "xsamansafaeix@gmail.com",
          up: 3,
          down: 3,
          expiryTime: 5,
          total: 3,
          reset: 2,
          totalUsed: 2,
          inboundRemark: "",
          online: true,
        },
        FrontEnd: {
          expiryTime: "5 GIG",
          expiryTimeShort: "5GB",
          down: "2",
          up: "2",
          totalUsed: "4",
          total: "5",
          trafficRemaining: "1",
          email: "xsamansafaeix@gmail.com",
          status: true,
          infoText: "fasfsf",
        },
        connect_link: "vmess://hollow.com/",
      },
    },
  };
  // return api.post<IDetails>(
  //   "/api/get/index.php",
  //   toFormData({
  //     text: uuid,
  //     hash: hash,
  //     lang,
  //   }),
  //   { params: { hash } }
  // );
}

export function changeHash(hash: string) {
  return api.get<IDetails>("/api/change/index.php", {
    params: { hash },
  });
}

export function getTheme(name: string) {
  return cdn.get<ITheme>(`/themes/${name}.json`);
}
