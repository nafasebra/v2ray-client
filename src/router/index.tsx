import { createBrowserRouter } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";

import settingsLoader from "./loaders/settingsLoader";

import Main from "@/pages/Main";
import Details from "@/pages/Details";
import NotFound from "@/pages/NotFound";
import ErrorBoundary from "@/pages/ErrorBoundary";

import MasterLayout from "@/components/layout/MasterLayout";

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      errorElement: <ErrorBoundary />,
      element: <MasterLayout />,
      loader: settingsLoader(queryClient),
      children: [
        { path: "/", element: <Main /> },
        {
          path: "/details/:hash",
          element: <Details />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
