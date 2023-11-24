import type { ReactNode } from "react";

export interface ContainerProps {
  children?: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {children}
    </div>
  );
}

export default Container;
