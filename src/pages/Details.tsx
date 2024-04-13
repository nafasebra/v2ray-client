import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { keys } from "@/api/keys";
import useCopy from "@/hooks/useCopy";
import { getDetails, changeHash } from "@/api/queries";
import { useActiveTheme, useGradientStyle } from "@/theme/utils/gradient";

import Button from "@/components/ui/Button";
import Loading from "@/components/loading/Loading";
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
  const theme = useActiveTheme();
  const routeParams = useParams();
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const modalController = useRef<{ hide: () => void }>(null);
  const { copy: copyStatus, copied: statusCopied } = useCopy();
  const { copy: copyConnectLink, copied: connectLinkCopied } = useCopy();

  const hash = routeParams.hash;

  const bgStyle = useGradientStyle();
  const [showModal, setShowModal] = useState(false);

  const { mutate: mutateChangeHash, isPending: changePending } = useMutation({
    mutationFn: changeHash,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        exact: false,
        queryKey: [keys.DETAILS],
      });
      modalController.current?.hide();
    },
  });

  const { data: details, isLoading: detailsLoading } = useQuery({
    queryFn: () =>
      getDetails(
      //   {
      //   lang: i18n.language,
      //   hash: hash ?? undefined,
      // }
      ),
    queryKey: [keys.DETAILS, hash, i18n.language],
    enabled: !!hash?.trim(),
    retry: false,
  });

  return (
    <>
      <ConfirmModal
        ref={modalController}
        onSuccess={() => {
          if (details) mutateChangeHash(details.data.result.hash);
        }}
        onHide={() => setShowModal(false)}
        show={showModal}
        disabled={changePending}
      />
      {detailsLoading && (
        <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-lg flex flex-col items-center justify-center">
          <Loading />
        </div>
      )}
      <section className="max-w-md mx-auto lg:container-app flex flex-col items-stretch justify-center min-h-[calc(100vh-120px)] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="w-full lg:col-span-1 gap-3 flex flex-col items-stretch pb-3.5">
            <div
              style={{ ...bgStyle, color: theme.primary_text_color }}
              className="py-2 px-4 rounded-lg font-bold text-3xl text-center truncate font-en">
              {details?.data.result.FrontEnd.email}
            </div>
            <QRCodeContainer
              valueQrCode={details?.data.result.connect_link || ""}
            />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
              <Button
                round
                size="sm"
                onClick={() =>
                  copyConnectLink(details?.data.result.connect_link || "")
                }>
                {connectLinkCopied ? t("copied") : t("details.button.copy")}
              </Button>
              <Button round size="sm" onClick={() => setShowModal(true)}>
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
                <div />
                <ActiveChart
                  total={details?.data.result.stat.total ?? 0}
                  used={details?.data.result.stat.totalUsed ?? 0}
                  text={details?.data.result.FrontEnd.trafficRemaining ?? ""}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <p
                      style={bgStyle}
                      className="font-bold bg-clip-text text-transparent">
                      {t("details.status.current")}
                    </p>
                    <div className="flex justify-end items-center gap-1">
                      <div className="font-bold text-end">
                        {details?.data.result.stat.online ? (
                          <p>
                            <span
                              style={bgStyle}
                              className="bg-clip-text text-transparent">
                              {t("details.status.active")}
                            </span>
                          </p>
                        ) : details?.data.result.FrontEnd.status ? (
                          <p>
                            <span
                              style={bgStyle}
                              className="bg-clip-text text-transparent">
                              {t("details.status.active")}
                            </span>
                          </p>
                        ) : (
                          <p>
                            <span
                              style={bgStyle}
                              className="bg-clip-text text-transparent">
                              {t("details.status.deactive")}
                            </span>
                          </p>
                        )}
                      </div>
                      <div className="w-5 h-5 shrink-0">
                        {details?.data.result.stat.online ? (
                          <span className="block animate-pulse w-4 h-4 ml-1 mt-0.5 rounded-full bg-green-600" />
                        ) : details?.data.result.FrontEnd.status ? (
                          <span className="block w-4 h-4 ml-1 mt-0.5 rounded-full bg-green-600" />
                        ) : (
                          <span className="block w-4 h-4 ml-1 mt-0.5 rounded-full bg-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <p
                      style={bgStyle}
                      className="font-bold bg-clip-text text-transparent">
                      {t("details.status.expire")}
                    </p>
                    <div className="flex justify-end text-end items-center gap-1">
                      <p
                        style={bgStyle}
                        className="font-bold bg-clip-text text-transparent">
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
                    <div className="flex justify-end text-end items-center gap-1">
                      <p
                        style={bgStyle}
                        className="font-bold bg-clip-text text-transparent">
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
                    <div className="flex items-center justify-end text-end gap-1">
                      <p
                        style={bgStyle}
                        className="font-bold bg-clip-text text-transparent">
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
                    <div className="flex justify-end text-end items-center gap-1">
                      <p
                        style={bgStyle}
                        className="font-bold bg-clip-text text-transparent">
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
                    <div className="flex justify-end text-end items-center gap-1">
                      <p
                        style={bgStyle}
                        className="font-bold bg-clip-text text-transparent">
                        {details?.data.result.FrontEnd.up}
                      </p>
                      <ArrowUpTrayIcon className="w-5 h-5 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Button
                  onClick={() =>
                    copyStatus(details?.data.result.FrontEnd.infoText || "")
                  }
                  round
                  size="sm">
                  {statusCopied ? t("copied") : t("details.button.copyStatus")}
                </Button>
                <Button
                  onClick={() =>
                    navigator.canShare &&
                    navigator.canShare() &&
                    navigator.share({
                      text: details?.data.result.FrontEnd.infoText,
                    })
                  }
                  round
                  size="sm">
                  {t("details.button.shareStatus")}
                </Button>
              </div>
            </div>
          </article>
          <aside className="w-full lg:col-span-1 font-en">
            <AppLinksSection />
          </aside>
        </div>
      </section>
    </>
  );
}

export default Details;
