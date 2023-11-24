import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Confirm() {
  const [config, setConfig] = useState<string>("");
  const [uuid, setUuid] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const navigate = useNavigate();

  console.log(lang)

  const handleClick = () => {
    if (config === "") return;

    if (config.startsWith("vless://")) {
      const matches = config.match(/vless:\/\/(.*?)@/);
      if (matches && matches.length > 1) {
        setUuid(matches[1]);
      } else {
        setUuid("");
      }
    } else if (config.startsWith("vmess://")) {
      const base64Text = config.substr(
        config.indexOf("vmess://") + "vmess://".length
      );
      const decodedText = atob(base64Text);
      const vmessData = JSON.parse(decodedText);
      setUuid(vmessData.id || "");
    }

    const url = new URL(config, window.location.href);
    const params = new URLSearchParams(url.search);
    setLang(params.get('lang') || 'en')

    if (uuid) {
      navigate('')
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-full">
      <div className="w-full md:w-1/2 flex flex-col items-start gap-3">
        <label htmlFor="" className="text-2xl font-bold">
          Your config
        </label>
        <textarea
          onChange={(e) => setConfig(e.target.value)}
          name=""
          id=""
          className="text-white p-3 w-64 md:w-80 lg:w-[40vw] h-36 border-4 border-white bg-transparent rounded-xl focus:outline-none"
          rows={5}
        ></textarea>
        <button
          onClick={() => handleClick()}
          type="submit"
          className="font-bold bg-gradient-to-r from-light-green via-light-pink to-purpl text-black rounded-lg py-3 px-6 hover:opacity-70"
        >
          Check and connect
        </button>
      </div>
      <div className="w-full md:w-1/2 flex jsutify-center">
        <img
          src="http://content.vip-status.site/site/themes/dark-1/images/Asset2.png"
          alt="confirm-image"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default Confirm;
