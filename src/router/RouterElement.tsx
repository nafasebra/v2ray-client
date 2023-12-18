import { RouterProvider } from "react-router-dom";
import { createRouter } from ".";

import type { QueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useRouter } from "@/store/router";

interface RouterElementProps {
  queryClient: QueryClient;
}

export default function RouterElement(props: RouterElementProps) {
  const setRouter = useRouter(state => state.setRouter);

  const router = useMemo(
    () => createRouter(props.queryClient),
    [props.queryClient]
  );

  useEffect(() => {
    setRouter(router);
  }, [router, setRouter]);

  return <RouterProvider router={router} />;
}
