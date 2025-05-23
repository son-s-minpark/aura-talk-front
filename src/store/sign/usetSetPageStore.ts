import { pageType } from "@/type/sign/setPageType";
import { create } from "zustand";

type setPageProps = {
  page: pageType;
  setPage: (page: pageType) => void;
};

export const useSetPageStore = create<setPageProps>((set) => ({
  page: "onBoarding",
  setPage: (page) => set({ page }),
}));
