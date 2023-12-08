import { useGradientStyle } from "@/theme/utils/gradient";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";

export interface ConfirmModalProps {
  show?: boolean;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const { t } = useTranslation();
  const bgStyle = useGradientStyle();
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={300}
      nodeRef={nodeRef}
      classNames={{
        enter: "opacity-0",
        enterActive: "transition-all opacity-100",
        enterDone: "opacity-100",
        exit: "opacity-100",
        exitActive: "opacity-0 transition-all",
        exitDone: "opacity-0",
      }}>
      <div ref={nodeRef}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur z-50"></div>
        <div
          style={bgStyle}
          className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[51] p-1.5 rounded w-full max-w-md">
          <div className="bg-black p-4 rounded">
            <p>
              <span>{t("details.modal.confirm_1")}</span>
              <br />
              <span>{t("details.modal.confirm_2")}</span>
            </p>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
