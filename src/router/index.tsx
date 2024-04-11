import { createBrowserRouter } from "react-router-dom";

import Main from "@/pages/Main";
import Details from "@/pages/Details";
import NotFound from "@/pages/NotFound";
import ErrorBoundary from "@/pages/ErrorBoundary";
import settingsLoader from "./loaders/settingsLoader";
import MasterLayout from "@/components/layout/MasterLayout";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    element: <MasterLayout />,
    loader: settingsLoader,
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
