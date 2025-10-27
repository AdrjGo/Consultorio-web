import { create } from "zustand";

type UIState = {
  pageTab: string;
  setPageTab: (title: string) => void;
};

export const useTabStore = create<UIState>((set) => ({
  pageTab: "OdontoDIS",
  setPageTab: (title) => set({ pageTab: title }),
}));
