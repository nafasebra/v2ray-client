import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouterElement from "@/router/RouterElement";

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
      <RouterElement />
    </QueryClientProvider>
  );
}

export default App;
