import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const cdn = axios.create({
  baseURL: import.meta.env.VITE_CDN,
});
