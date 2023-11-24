import type { ReactNode } from "react";

export interface ContainerProps {
  children?: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="w-full max-w-screen-2xl mx-auto min-h-[50vh]">
      {children}
    </div>
  );
}

export default Container;
