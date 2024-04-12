import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { keys } from "@/api/keys";
import { getAppsLink } from "@/api/queries";

import { IApp, IAppsLink } from "@/types";
import { useActiveTheme, useGradientStyle } from "@/theme/utils/gradient";

function AppLinksSection() {
  const theme = useActiveTheme();
  const { i18n } = useTranslation();
  const bgStyle = useGradientStyle();

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => getAppsLink(i18n.language),
    queryKey: [keys.APPS],
  });

  return (
    <aside className="space-y-3">
      {isLoading && (
        <>
          <div className="space-y-2">
            <div className="h-[44px] rounded-lg bg-gray-400/50 animate-pulse"></div>
            <div className="h-[41.6px] rounded-lg bg-gray-400/50 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-[44px] rounded-lg bg-gray-400/50 animate-pulse"></div>
            <div className="h-[41.6px] rounded-lg bg-gray-400/50 animate-pulse"></div>
            <div className="h-[41.6px] rounded-lg bg-gray-400/50 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-[44px] rounded-lg bg-gray-400/50 animate-pulse"></div>
            <div className="h-[41.6px] rounded-lg bg-gray-400/50 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-[44px] rounded-lg bg-gray-400/50 animate-pulse"></div>
            <div className="h-[41.6px] rounded-lg bg-gray-400/50 animate-pulse"></div>
            <div className="h-[41.6px] rounded-lg bg-gray-400/50 animate-pulse"></div>
          </div>
        </>
      )}
      {isSuccess &&
        data?.data?.map((item: IAppsLink) => (
          <div key={item.platform} className="space-y-2">
            <div
              style={{ ...bgStyle, color: theme.primary_text_color }}
              className="py-2 px-4 rounded-lg font-bold text-xl text-center">
              {item.platform}
            </div>
            {item?.apps?.map((app: IApp) => (
              <a
                key={app.name}
                className="flex justify-between items-center border border-white rounded-lg py-2 px-4 text-center"
                href={app.link}>
                <div className="w-6 h-6 shrink-0" />
                <span>{app.name}</span>
                {app.icon ? (
                  <img
                    className="w-6 h-6 object-contain shrink-0"
                    src={app.icon}
                    alt={app.name}
                  />
                ) : (
                  <div className="h-6 w-6 shrink-0" />
                )}
              </a>
            ))}
          </div>
        ))}
    </aside>
  );
}

export default AppLinksSection;
