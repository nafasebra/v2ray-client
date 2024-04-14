export interface IButtonsResult {
  icon?: string;
  text: string;
  background_color: string;
  icon_color: string;
  text_color: string;
  url: string;
}

export interface IApp {
  name: string;
  link: string;
  icon?: string;
}
export interface IAppsLink {
  platform: string;
  apps: IApp[];
}

export interface ISettingApp {
  theme: string;
  crisp_id?: string;
  footer_text_en?: string;
  footer_text_fa?: string;
  panels_cache_exp?: string;
  logo?: string;
  themeData: ITheme;
  default_lang: string
}

export interface IDetails {
  ok: boolean;
  lang: string;
  panel: number;
  result: {
    hash: string;
    protocol: string;
    setting: {
      email: string;
      enable: boolean;
      expiryTime: number;
      flow: string;
      id: string;
      reset: number;
      subId: string;
      tgId: string;
      totalGB: number;
    };
    stat: {
      id: number;
      inboundId: number;
      enable: boolean;
      email: string;
      up: number;
      down: number;
      expiryTime: number;
      total: number;
      reset: number;
      totalUsed: number;
      inboundRemark: string;
      online: boolean;
    };
    FrontEnd: {
      expiryTime: string;
      expiryTimeShort: string;
      down: string;
      up: string;
      totalUsed: string;
      total: string;
      trafficRemaining: string;
      email: string;
      status: boolean;
      infoText: string;
    };
    connect_link: string;
  };
}

export interface IDetailsReq {
  uuid?: string;
  lang?: string;
  hash?: string;
}

export interface ITheme {
  primary_text_color: string;
  secondary_text_color: string;
  crispColor: string;
  from: string;
  via: string;
  to: string;
  chartBg: string;
  default_bg: string;
  home_bg_mobile: string;
  home_bg_tablet: string;
  home_bg_desktop: string;
  detail_bg_mobile: string;
  detail_bg_tablet: string;
  detail_bg_desktop: string;
  logo: string;
  btnColor: string;
  htmlColor: string;
  title: string;
  mainPhoto: string;
  font_fa: string;
  font_en: string;
}

export interface IErrorResult {
  error: string;
  ok: boolean;
}
