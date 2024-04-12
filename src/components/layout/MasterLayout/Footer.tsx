import { useQuery } from "@tanstack/react-query";

import { keys } from "@/api/keys";
import { getSetting } from "@/api/queries";
import { useTranslation } from "react-i18next";
import { useActiveTheme } from "@/theme/utils/gradient";

function Footer() {
  const theme = useActiveTheme();
  const { i18n } = useTranslation();
  const { data, isSuccess } = useQuery({
    queryFn: () => getSetting(i18n.language),
    queryKey: [keys.SETTING],
  });

  return (
    <footer
      style={{ color: theme.secondary_text_color }}
      className="rtl:font-Poppins text-center text-xs xl:text-base py-3">
      {isSuccess
        ? i18n.language === "fa"
          ? data.data.footer_text_fa
          : i18n.language === "en"
          ? data.data.footer_text_en ?? "safdasifas"
          : null
        : null}
    </footer>
  );
}

export default Footer;
