import { create } from "zustand";

type PageType = "onBoarding" | "signin" | "signup" | "profile" | "profileImg";

interface Store {
  page: PageType;
  setPage: (page: PageType) => void;
}

export const useSetPageStore = create<Store>((set) => ({
  page: "onBoarding",
  setPage: (page) => set({ page }),
}));
