import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { keys } from "@/api/keys";
import { getHeaderButtons } from "@/api/queries";
import { useActiveTheme } from "@/theme/utils/gradient";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import Button from "@/components/ui/Button";

function Header() {
  const { logo } = useActiveTheme();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => getHeaderButtons(i18n.language),
    queryKey: [keys.HEADER_BUTTONS],
  });

  const handleChangeLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fa" : "en", () => {
      document.dir = i18n.language === "en" ? "ltr" : "rtl";
      document.documentElement.setAttribute("lang", i18n.language);
      setSearchParams(search => {
        search.set("lang", i18n.language);
        return search;
      });
    });
  };

  return (
    <nav className="container-app flex items-stretch justify-between flex-col md:items-center md:flex-row-reverse gap-4 py-4 px-6">
      <div className="flex items-center gap-4 shrink-0">
        {pathname !== "/" && (
          <Link className="md:hidden ltr:mr-auto rtl:ml-auto" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#96e0da", stopOpacity: 1 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: "#e8ccf7", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#947ff3", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                stroke="url(#grad1)"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        )}
        <Button
          className={i18n.language === "en" ? "font-fa" : "font-en"}
          size="xs"
          onClick={handleChangeLanguage}>
          {i18n.language === "en" ? "فا" : "en"}
        </Button>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl text-white font-bold uppercase">
            {t("title")}
          </h1>
          <img className="h-9" src={logo} alt="logo" />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-2">
        {pathname !== "/" && (
          <Link className="hidden md:block" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8">
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#96e0da", stopOpacity: 1 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: "#e8ccf7", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#947ff3", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                stroke="url(#grad2)"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        )}
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
              className="py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-[15ch]"
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
