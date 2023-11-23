import { useHeaderButton } from "@/api/useHeaderButton";
import Loading from "./Loading";

function Header() {
  const { data, error, isLoading } = useHeaderButton();

  const handleChangeLanguage = () => {
    console.log('language is changed!')
  }

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
          className="cursor-pointer px-2 rounded-lg font-bold text-xl text-black bg-gradient-to-r from-light-green via-light-pink to-purple"
          onClick={handleChangeLanguage}
        >
          fa
        </button>
      </div>
      <div className="flex items-center gap-5">
        {
          isLoading ? (
            <Loading />
          ) : (
            (
              !error ? (
                <button className="py-3 px-4 rounded-lg flex items-center gap-3" style={{
                  backgroundColor: `${data?.background}` || '#fff'
                }}>
                  <div style={{
                    color: `${data?.iconColor}` || "#fff"
                  }}>
                    <img src={data?.icon || ""} className="w-[25px]" />
                  </div>
                  <p style={{
                    color: `${data?.textColor}` || "#fff"
                  }}>
                    {data?.text || "text"}
                  </p>
                </button>
              ) : null
            )
          )
        }
      </div>
    </nav>
  );
}

export default Header;
