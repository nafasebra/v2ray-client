import { useQuery } from "@tanstack/react-query";

import { keys } from "@/api/keys";
import { getSetting } from "@/api/queries";
import { useTranslation } from "react-i18next";

function Footer() {
  const { i18n } = useTranslation();
  const { data, isSuccess } = useQuery({
    queryFn: () => getSetting(i18n.language),
    queryKey: [keys.SETTING],
  });

  return (
    <footer className="rtl:font-Poppins text-white text-center text-xs xl:text-base py-3">
      {/* © All rights of this website belong to{" "}
      <a href="https://t.me/Patrick_Status" className="text-gray-300">
        PatrickStatus
      </a>{" "}
      company */}
      {isSuccess ? `© ${data.data.footer_text_en}` : null}
    </footer>
  );
}

export default Footer;
