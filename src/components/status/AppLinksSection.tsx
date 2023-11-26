import { useQuery } from "@tanstack/react-query";

import { keys } from "@/api/keys";
import { getAppsLink } from "@/api/queries";

import Loading from "@/components/loading/Loading";
import { IApp, IAppsLink } from "@/types";

function AppLinksSection() {
    const { data, isLoading, isSuccess } = useQuery({
    queryFn: getAppsLink,
    queryKey: [keys.APPS],
  });


  return (
    <>
      {isLoading ? <Loading /> : null}
      {
        isSuccess ? (
          data?.data?.map((item: IAppsLink) => (
            <div className="space-y-2" key={item.platform}>
              <div className="gradient py-2 px-4 rounded-lg font-bold text-xl text-black text-center">
                {item.platform}
              </div>
              {item?.apps?.map((app: IApp) => (
                <a key={app.name} className="flex justify-center border border-white rounded-lg py-2 px-4 text-center" href={app.link}>{app.name}</a>
              ))}
            </div>
          ))
        ) : null
      }
    </>
  )
}

export default AppLinksSection