import { create } from "zustand";

type UIState = {
  pageTitle: string;
  setPageTitle: (title: string) => void;
};

export const useTitleStore = create<UIState>((set) => ({
  pageTitle: "OdontoDIS",
  setPageTitle: (title) => set({ pageTitle: title }),
}));
