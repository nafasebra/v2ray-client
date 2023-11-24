import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Container from "./Container";

import type { ReactNode } from "react";

export interface MasterLayoutProps {
  children?: ReactNode;
}

export default function MasterLayout(props: MasterLayoutProps) {
  return (
    <Container>
      <Header />
      <main className="text-white font-Poppins rtl:font-Morabba">
        {props.children || <Outlet />}
      </main>
      <Footer />
    </Container>
  );
}
