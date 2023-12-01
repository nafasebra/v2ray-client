import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import fa from "@/assets/translations/fa.json";
import en from "@/assets/translations/en.json";
import RouterElement from "@/router/RouterElement";

i18n.use(initReactI18next).init({
  resources: {
    fa: fa,
    en: en,
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterElement queryClient={queryClient} />
    </QueryClientProvider>
  );
}

export default App;
