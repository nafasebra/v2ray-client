import type { ReactNode } from "react";

export interface ContainerProps {
  children?: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="w-full max-w-6xl mx-auto min-h-[calc(100vh-100px)]">
      {children}
    </div>
  );
}

export default Container;
