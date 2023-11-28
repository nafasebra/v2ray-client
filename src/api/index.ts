import axios from "axios";

export const api = axios.create({
  baseURL: "https://beta-patrick-stats.ilyagvc.online/PatrickStats",
});
