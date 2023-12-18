import { create } from "zustand";
import { createBrowserRouter } from "react-router-dom";

type Router = ReturnType<typeof createBrowserRouter>;

interface RouterStore {
  router?: Router;
  setRouter: (router: Router) => void;
}

export const useRouter = create<RouterStore>(set => ({
  router: undefined,
  setRouter: router => set({ router }),
}));
