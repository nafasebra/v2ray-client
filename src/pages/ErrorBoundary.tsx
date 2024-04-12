import { useActiveTheme } from "@/theme/utils/gradient";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const err = useRouteError();
  const theme = useActiveTheme();

  console.log(err);

  if (isRouteErrorResponse(err))
    return (
      <div
        style={{ color: theme.secondary_text_color }}
        className="min-h-screen flex justify-center items-center text-center">
        {err.status}
      </div>
    );

  return <div>Unknow Error</div>;
}
