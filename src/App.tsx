import { Route, Routes } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import routes from "@/router";
import Container from "@/components/layout/Container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="text-white font-Poppins rtl:font-Morabba">
        <Header />
        <Container>
          <Routes>
            {routes.map((r, index) => {
              return <Route key={index} {...r} />;
            })}
          </Routes>
        </Container>
        <Footer />
      </section>
    </QueryClientProvider>
  );
}

export default App;
