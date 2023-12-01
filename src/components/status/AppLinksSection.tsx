import { useQuery } from "@tanstack/react-query";

import { keys } from "@/api/keys";
import { getAppsLink } from "@/api/queries";

import { IApp, IAppsLink } from "@/types";

function AppLinksSection() {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getAppsLink,
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
            <div className="gradient py-2 px-4 rounded-lg font-bold text-xl text-black text-center">
              {item.platform}
            </div>
            {item?.apps?.map((app: IApp) => (
              <a
                key={app.name}
                className="flex justify-center border border-white rounded-lg py-2 px-4 text-center"
                href={app.link}>
                {app.name}
              </a>
            ))}
          </div>
        ))}
    </aside>
  );
}

export default AppLinksSection;
