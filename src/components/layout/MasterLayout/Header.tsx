import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { keys } from "@/api/keys";
import { getHeaderButtons } from "@/api/queries";

function Header() {
  const { t, i18n } = useTranslation();

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getHeaderButtons,
    queryKey: [keys.HEADER_BUTTONS],
  });

  const handleChangeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fa" : "en", () => {
      document.dir = i18n.language === "en" ? "ltr" : "rtl";
      document.documentElement.setAttribute("lang", i18n.language);
    });
  };

  return (
    <nav className="flex items-center justify-between flex-col md:flex-row-reverse gap-4 py-4 px-6">
      <div className="flex items-center gap-6 shrink-0">
        <div className="flex items-center gap-3">
          <img
            className="h-9"
            src="/logo.png"
            alt="logo"
          />
          <h1 className="text-2xl text-white font-bold uppercase">
            {t("title")}
          </h1>
        </div>
        <button
          className="cursor-pointer px-2 rounded-lg font-bold text-xl text-black bg-gradient-to-r from-light-green to-light-pink to-purple"
          onClick={handleChangeLanguage}>
          {i18n.language}
        </button>
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-2">
        {isLoading && (
          <>
            <div className="w-[18ch] h-[36px] rounded-lg bg-gray-400/50 animate-pulse"></div>
            <div className="w-[18ch] h-[36px] rounded-lg bg-gray-400/50 animate-pulse"></div>
            <div className="w-[18ch] h-[36px] rounded-lg bg-gray-400/50 animate-pulse"></div>
          </>
        )}
        {isSuccess &&
          data.data.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              className="py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-[18ch]"
              style={{
                backgroundColor: `${item.background_color}` || "#fff",
              }}>
              {!!item.icon && <img src={item.icon} className="w-5" />}
              <p
                className="text-xs font-bold truncate"
                style={{
                  color: `${item.text_color}` || "#fff",
                }}>
                {item.text || "empty"}
              </p>
            </a>
          ))}
      </div>
    </nav>
  );
}

export default Header;
