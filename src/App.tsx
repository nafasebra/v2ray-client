import RouterElement from "@/router/RouterElement";

import type { QueryClient } from "@tanstack/react-query";

interface AppProps {
  queryClient: QueryClient;
}

function App(props: AppProps) {
  return <RouterElement queryClient={props.queryClient} />;
}

export default App;
