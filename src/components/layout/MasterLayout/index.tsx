import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useActiveTheme } from "@/theme/utils/gradient";

export default function MasterLayout() {
  const theme = useActiveTheme();

  return (
    <div className="container_app">
      <Header />
      <main
        style={{ color: theme.secondary_text_color }}
        className=" font-Poppins rtl:font-Morabba">
        {<Outlet />}
      </main>
      <Footer />
    </div>
  );
}
