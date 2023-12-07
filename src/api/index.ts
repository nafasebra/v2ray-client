import axios from "axios";

export const api = axios.create({
  baseURL: "https://beta.vip-status.site/PatrickStats",
});
