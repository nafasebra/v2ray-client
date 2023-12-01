import { redirect } from "react-router-dom";

import { keys } from "@/api/keys";
import { IDetails } from "@/types";
import { getDetails } from "@/api/queries";

import type { AxiosError } from "axios";
import type { QueryClient } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router-dom";

export default function (queryClient: QueryClient) {
  return async ({ request }: LoaderFunctionArgs) => {
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get("identifier");
    if (!identifier?.trim()) return redirect("/");

    let data: IDetails;

    try {
      data = (
        await queryClient.fetchQuery({
          queryFn: () => getDetails(identifier!),
          queryKey: [keys.DETAILS, identifier],
        })
      ).data;
    } catch (e) {
      const error = e as AxiosError<{ message?: string; status?: number }>;

      if (error.response?.status === 404)
        throw new Response(error.response?.data.message, { status: 404 });

      throw error;
    }

    return { data };
  };
}
