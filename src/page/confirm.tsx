import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

function Confirm() {
  const textAreaId = useId();
  const [config, setConfig] = useState<string>("");
  const [uuid, setUuid] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const navigate = useNavigate();

  console.log(lang);

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
    setLang(params.get("lang") || "en");

    if (uuid) {
      navigate("");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-100px)] p-6">
      <div className="w-full flex flex-col items-stretch order-2 md:order-1 gap-3">
        <label htmlFor={textAreaId} className="text-2xl font-bold">
          Your config
        </label>
        <textarea
          onChange={(e) => setConfig(e.target.value)}
          id={textAreaId}
          
          className="text-white p-3 h-36 border-4 border-white bg-transparent rounded-xl focus:outline-none resize-none"
          rows={5}></textarea>
        <button
          onClick={() => handleClick()}
          type="submit"
          className="font-bold bg-gradient-to-r from-light-green to-light-pink to-purpl text-black rounded-lg py-3 px-6 hover:brightness-110 active:brightness-90 transition-all">
          Check
        </button>
      </div>
      <div className="w-full order-1 md:order-2">
        <img
          src="http://content.vip-status.site/site/themes/dark-1/images/Asset2.png"
          alt="banner"
          className="w-full max-w-sm mx-auto"
        />
      </div>
    </div>
  );
}

export default Confirm;
