import { useQuery } from "@tanstack/react-query";

import { keys } from "@/api/keys";
import { getHeaderButtons } from "@/api/queries";

import Loading from "@/components/loading/Loading";

function Header() {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getHeaderButtons,
    queryKey: [keys.HEADER_BUTTONS],
  });

  const handleChangeLanguage = () => {
    console.log("language is changed!");
  };

  return (
    <nav className="flex items-center justify-between flex-col md:flex-row-reverse md:rtl:flex-row gap-4 py-4 px-6">
      <div className="flex items-center gap-6 shrink-0">
        <img
          className="h-9"
          src={
            "http://content.vip-status.site/site/themes/dark-1/images/Asset3.png"
          }
          alt="logo"
        />
        <button
          className="cursor-pointer px-2 rounded-lg font-bold text-xl text-black bg-gradient-to-r from-light-green to-light-pink to-purple"
          onClick={handleChangeLanguage}>
          Fa
        </button>
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-2">
        {isLoading && <Loading />}
        {isSuccess &&
          data.data.map((item) => (
            <a
              href={item.url}
              target="_blank"
              className="py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-[18ch]"
              style={{
                backgroundColor: `${item.background_color}` || "#fff",
              }}>
              {!!item.icon && <img src={item.icon} className="w-5" />}
              <p
                className="text-xs font-bold"
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
