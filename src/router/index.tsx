import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Main from "@/page/main";
import Confirm from "@/page/confirm";
import MasterLayout from "@/components/layout/MasterLayout";

const routes: RouteObject[] = [
  {
    element: <MasterLayout />,
    children: [
      { path: "/confirm", element: <Confirm /> },
      { path: "/", element: <Main /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
