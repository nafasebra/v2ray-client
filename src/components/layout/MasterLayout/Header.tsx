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
    <nav className="flex items-center justify-between flex-row-reverse rtl:flex-row gap-4 py-4 px-6">
      <div className="flex items-center gap-6">
        <img
          className="h-8"
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
      <div className="flex items-center gap-2">
        {isLoading && <Loading />}
        {isSuccess &&
          data.data.map((item) => (
            <button
              className="py-3 px-4 rounded-lg flex items-center gap-3"
              style={{
                backgroundColor: `${item.background_color}` || "#fff",
              }}>
              <div
                style={{
                  color: `${item.icon_color}` || "#fff",
                }}>
                <img src={item.icon} className="w-[25px]" />
              </div>
              <p
                style={{
                  color: `${item.text_color}` || "#fff",
                }}>
                {item.text || "text"}
              </p>
            </button>
          ))}
      </div>
    </nav>
  );
}

export default Header;
