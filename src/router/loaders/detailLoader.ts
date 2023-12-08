import { redirect } from "react-router-dom";
import { getI18n } from "react-i18next";

import { keys } from "@/api/keys";
import { IDetails } from "@/types";
import { getDetails } from "@/api/queries";

import type { AxiosError } from "axios";
import type { QueryClient } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router-dom";

export default function (queryClient: QueryClient) {
  return async ({ request }: LoaderFunctionArgs) => {
    const i18n = getI18n();
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get("identifier");
    if (!identifier?.trim()) return redirect("/");

    let data: { data: IDetails };

    try {
      data = await queryClient.fetchQuery({
        queryFn: () => getDetails(identifier!, i18n.language),
        queryKey: [keys.DETAILS, identifier, i18n.language],
      });

      queryClient.setQueryData(
        [keys.DETAILS, data.data.result.hash, i18n.language],
        () => data
      );
    } catch (e) {
      const error = e as AxiosError<{ message?: string; status?: number }>;

      if (error.response?.status === 404)
        throw new Response(error.response?.data.message, { status: 404 });

      throw error;
    }

    if (data.data.result.hash !== searchParams.get("identifier"))
      return redirect("/details?identifier=" + data.data.result.hash);

    return null;
  };
}
