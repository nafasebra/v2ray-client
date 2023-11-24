import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouterElement from "@/router/RouterElement";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterElement />
    </QueryClientProvider>
  );
}

export default App;
