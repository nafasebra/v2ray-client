import { Outlet } from "react-router-dom";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

import type { ReactNode } from "react";

export interface MasterLayoutProps {
  children?: ReactNode;
}

export default function MasterLayout(props: MasterLayoutProps) {
  return (
    <main className="text-white font-Poppins rtl:font-Morabba">
      <Header />
      <Container>{props.children || <Outlet />}</Container>
      <Footer />
    </main>
  );
}
