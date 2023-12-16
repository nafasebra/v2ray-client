import { useGradientStyle } from "@/theme/utils/gradient";
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import Button from "../ui/Button";

export interface ConfirmModalProps {
  show?: boolean;
  onHide?: () => void;
  onSuccess?: () => void;
  disabled?: boolean;
}

function ConfirmModal(
  props: ConfirmModalProps,
  ref: ForwardedRef<{ hide(): void }>
) {
  const { t } = useTranslation();
  const bgStyle = useGradientStyle();
  const nodeRef = useRef<HTMLDivElement>(null);
  const { onHide = () => {}, onSuccess = () => {}, disabled } = props;

  useImperativeHandle(ref, () => ({ hide: onHide }));

  return (
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={300}
      nodeRef={nodeRef}
      classNames="fade">
      <div className="relative z-[60]" ref={nodeRef}>
        <div
          onClick={onHide}
          className="fixed inset-0 bg-black/80 z-[61]"></div>
        <div
          style={bgStyle}
          className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[62] p-1.5 rounded-xl w-[90%] max-w-md">
          <div className="bg-black p-4 rounded-xl">
            <p>
              <span>{t("details.modal.confirm_1")}</span>
              <br />
              <span>{t("details.modal.confirm_2")}</span>
            </p>
            <div className="grid grid-cols-2 gap-2 mt-6">
              <Button disabled={disabled} onClick={onSuccess} size="sm">
                {t("confirm_modal.yes")}
              </Button>
              <Button disabled={disabled} onClick={onHide} size="sm">
                {t("confirm_modal.no")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

const ConfirmModalWithRef = forwardRef(ConfirmModal);

export default ConfirmModalWithRef;
