import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const err = useRouteError();

  console.log(err);

  if (isRouteErrorResponse(err))
    return (
      <div className="min-h-screen flex justify-center items-center text-center text-white">
        {err.status}
      </div>
    );

  return <div>Unknow Error</div>;
}
