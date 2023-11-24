import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

export interface ConfirmModalProps {
  show?: boolean;
}

export default function ConfirmModal(props: ConfirmModalProps) {
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
      <div ref={nodeRef}>ConfirmModal</div>
    </CSSTransition>
  );
}
