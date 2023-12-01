import { RouterProvider } from "react-router-dom";
import { createRouter } from ".";

import type { QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

interface RouterElementProps {
  queryClient: QueryClient;
}

export default function RouterElement(props: RouterElementProps) {
  const router = useMemo(
    () => createRouter(props.queryClient),
    [props.queryClient]
  );
  
  return <RouterProvider router={router} />;
}
