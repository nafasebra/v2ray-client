import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { keys } from "@/api/keys";
import { getDetails } from "@/api/queries";

import ActiveChart from "@/components/pice/ActiveChart";
import QRCodeContainer from "@/components/pice/QRCodeContainer";
import AppLinksSection from "@/components/status/AppLinksSection";

function Details() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  const {
    data: details,
    // isLoading: detailsLoading,
    isSuccess: detailsSuccess,
  } = useQuery({
    queryFn: () => getDetails(searchParams.get("identifier")!, i18n.language),
    queryKey: [keys.DETAILS],
    enabled: !!searchParams.get("identifier")?.trim(),
  });

  return (
    <section className="container mx-auto flex flex-col lg:flex-row gap-20 min-h-[calc(100vh-100px)] p-6">
      <aside className="w-full lg:w-[20%] space-y-3">
        <div className="gradient py-2 px-4 rounded-lg font-bold text-3xl text-black text-center">
          15dzzx1..
        </div>
        <QRCodeContainer
          valueQrCode={
            detailsSuccess
              ? details.data.result.connect_link
              : "https://google.com/"
          }
        />
        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-full py-2 px-6 font-bold text-black gradient">
            {t("details.button.copy")}
          </button>
          <button className="rounded-full py-2 px-6 font-bold text-black gradient">
            {t("details.button.change")}
          </button>
        </div>
      </aside>
      <article className="w-full lg:w-[60%]">
        <div className="space-y-5 border border-white rounded-lg p-3">
          <h2 className="text-center text-3xl font-bold gradient text-transparent bg-clip-text">
            {t("details.traffic")}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <p className="font-bold gradient bg-clip-text text-transparent">
                {t("details.status.active")}
              </p>
            </div>
            <ActiveChart />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-bold gradient bg-clip-text text-transparent">
                  {t("details.status.expire")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="font-bold gradient bg-clip-text text-transparent">
                  {t("details.status.totalTraffic")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="font-bold gradient bg-clip-text text-transparent">
                  {t("details.status.totalUsage")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="font-bold gradient bg-clip-text text-transparent">
                  {t("details.status.download")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p className="font-bold gradient bg-clip-text text-transparent">
                  {t("details.status.upload")}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <button className="rounded-full py-2 px-6 font-bold text-black gradient">
              {t("details.button.copyStatus")}
            </button>
            <button className="rounded-full py-2 px-6 font-bold text-black gradient">
              {t("details.button.shareStatus")}
            </button>
          </div>
        </div>
      </article>
      <aside className="w-full lg:w-[20%]">
        <AppLinksSection />
      </aside>
    </section>
  );
}

export default Details;
