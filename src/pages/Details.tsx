import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { keys } from "@/api/keys";
import { getDetails } from "@/api/queries";
import { useGradientStyle } from "@/theme/utils/gradient";

import Button from "@/components/ui/Button";
import ActiveChart from "@/components/piece/ActiveChart";
import ConfirmModal from "@/components/modal/ConfirmModal";
import QRCodeContainer from "@/components/piece/QRCodeContainer";
import AppLinksSection from "@/components/status/AppLinksSection";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

function Details() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const identifier = searchParams.get("identifier");

  const bgStyle = useGradientStyle();

  const { data: details } = useQuery({
    queryFn: () => getDetails(identifier!, i18n.language),
    queryKey: [keys.DETAILS, identifier, i18n.language],
    enabled: !!identifier?.trim(),
    retry: false,
  });

  return (
    <>
      <section className="container-app mx-auto flex flex-col items-stretch justify-center min-h-[calc(100vh-120px)] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="w-full lg:col-span-1 space-y-3">
            <div
              style={bgStyle}
              className="py-2 px-4 rounded-lg font-bold text-3xl text-black text-center truncate">
              {details?.data.result.FrontEnd.email}
            </div>
            <QRCodeContainer
              valueQrCode={details?.data.result.connect_link || ""}
            />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
              <Button round size="sm">
                {t("details.button.copy")}
              </Button>
              <Button round size="sm">
                {t("details.button.change")}
              </Button>
            </div>
          </aside>
          <article className="w-full lg:col-span-2">
            <div className="space-y-5 border border-white rounded-lg p-3">
              <h2
                style={bgStyle}
                className="text-center text-3xl font-bold text-transparent bg-clip-text">
                {t("details.traffic")}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <p
                    style={bgStyle}
                    className="font-bold bg-clip-text text-transparent">
                    {details?.data.result.FrontEnd.status
                      ? t("details.status.active")
                      : t("details.status.deactive")}
                  </p>
                </div>
                <ActiveChart
                  total={details?.data.result.stat.total || 1}
                  used={details?.data.result.stat.totalUsed || 1}
                  text={details?.data.result.FrontEnd.trafficRemaining ?? ""}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <p
                      style={bgStyle}
                      className="font-bold bg-clip-text text-transparent">
                      {t("details.status.expire")}
                    </p>
                    <div className="flex justify-end items-center gap-1">
                      <p
                        style={bgStyle}
                        className="font-bold bg-clip-text text-transparent text-right">
                        {details?.data.result.FrontEnd.expiryTime}
                      </p>
                      <div className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <p
                      style={bgStyle}
                      className="font-bold bg-clip-text text-transparent">
                      {t("details.status.totalTraffic")}
                    </p>
                    <div className="flex justify-end items-center gap-1">
                      <p
                        style={bgStyle}
                        className="font-bold bg-clip-text text-transparent text-right">
                        {details?.data.result.FrontEnd.total}
                      </p>
                      <div className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <p
                      style={bgStyle}
                      className="font-bold bg-clip-text text-transparent">
                      {t("details.status.totalUsage")}
                    </p>
                    <div className="flex items-center justify-end gap-1">
                      <p
                        style={bgStyle}
                        className="font-bold bg-clip-text text-transparent text-right">
                        {details?.data.result.FrontEnd.totalUsed}
                      </p>
                      <ArrowsUpDownIcon className="w-5 h-5 shrink-0" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <p
                      style={bgStyle}
                      className="font-bold bg-clip-text text-transparent">
                      {t("details.status.download")}
                    </p>
                    <div className="flex justify-end items-center gap-1">
                      <p
                        style={bgStyle}
                        className="font-bold bg-clip-text text-transparent text-right">
                        {details?.data.result.FrontEnd.down}
                      </p>
                      <ArrowDownTrayIcon className="w-5 h-5 shrink-0" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <p
                      style={bgStyle}
                      className="font-bold bg-clip-text text-transparent">
                      {t("details.status.upload")}
                    </p>
                    <div className="flex justify-end items-center gap-1">
                      <p
                        style={bgStyle}
                        className="font-bold bg-clip-text text-transparent text-right">
                        {details?.data.result.FrontEnd.up}
                      </p>
                      <ArrowUpTrayIcon className="w-5 h-5 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Button round size="sm">
                  {t("details.button.copyStatus")}
                </Button>
                <Button round size="sm">
                  {t("details.button.shareStatus")}
                </Button>
              </div>
            </div>
          </article>
          <aside className="w-full lg:col-span-1">
            <AppLinksSection />
          </aside>
        </div>
      </section>
      <ConfirmModal />
    </>
  );
}

export default Details;
