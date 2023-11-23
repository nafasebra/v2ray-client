import React from "react";

type PropType = {
  children: React.ReactNode | React.ReactNode[];
};

function Container({ children }: PropType) {
  return (
    <section className="w-full max-w-[1100px] mx-auto h-[calc(100vh-250px)]">
      {children}
    </section>
  );
}

export default Container;
