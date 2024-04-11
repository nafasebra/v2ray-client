import axios, { AxiosError } from "axios";

import { router } from "@/router";
import { IErrorResult } from "@/types";

const baseUrl = new URL("/PatrickStats", window.location.origin);

export const api = axios.create({
  baseURL: import.meta.env.DEV ? import.meta.env.VITE_API : baseUrl.href,
});

api.interceptors.response.use(undefined, err => {
  const axiosError = err as AxiosError<IErrorResult>;

  router?.navigate(
    {
      pathname: "/ErrorPage",
      search: `?message=${axiosError.response?.data.error}`,
    },
    { replace: true }
  );

  Promise.reject(err);
});

export const cdn = axios.create({
  baseURL: import.meta.env.VITE_CDN,
});
