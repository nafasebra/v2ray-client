import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function MasterLayout() {
  return (
    <div className="container_app">
      <Header />
      <main className="text-white font-Poppins rtl:font-Morabba">
        {<Outlet />}
      </main>
      <Footer />
    </div>
  );
}
