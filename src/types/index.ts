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
}
export interface IAppsLink {
  platform: string;
  apps: IApp[];
}

export interface ISettingApp {
  theme: string;
  crisp_id: string;
  footer_text_en: string;
  footer_text_fa: string;
  panels_cache_exp: string;
}
