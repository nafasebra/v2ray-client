import { createBrowserRouter } from "react-router-dom";

import Main from "@/pages/Main";
import Details from "@/pages/Details";
import MasterLayout from "@/components/layout/MasterLayout";
import ErrorBoundary from "@/pages/ErrorBoundary";

import type { QueryClient } from "@tanstack/react-query";
import detailLoader from "./loaders/detailLoader";

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      errorElement: <ErrorBoundary />,
      element: <MasterLayout />,
      children: [
        {
          path: "/details",
          element: <Details />,
          loader: detailLoader(queryClient),
        },
        { path: "/", element: <Main /> },
      ],
    },
  ]);
