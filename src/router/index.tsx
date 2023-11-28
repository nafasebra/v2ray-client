import { createBrowserRouter, type RouteObject } from "react-router-dom";

import Main from "@/pages/Main";
import Details from "@/pages/Details";
import MasterLayout from "@/components/layout/MasterLayout";

const routes: RouteObject[] = [
  {
    element: <MasterLayout />,
    children: [
      { path: "/details", element: <Details /> },
      { path: "/", element: <Main /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
