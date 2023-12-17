import { createBrowserRouter } from "react-router-dom";

import Main from "@/pages/Main";
import Details from "@/pages/Details";
import ErrorBoundary from "@/pages/ErrorBoundary";
import settingsLoader from "./loaders/settingsLoader";
import MasterLayout from "@/components/layout/MasterLayout";

import type { QueryClient } from "@tanstack/react-query";

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
      ],
    },
  ]);
