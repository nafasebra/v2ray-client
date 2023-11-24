import { RouterProvider } from "react-router-dom";
import { router } from ".";

export default function RouterElement() {
  return <RouterProvider router={router} />;
}
