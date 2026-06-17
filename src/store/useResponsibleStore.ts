import { create } from "zustand";

interface ResponsibleStoreState {
  responsible: boolean;
  setResponsible: (value: boolean) => void;
  toggleResponsible: () => void;
}

export const useResponsibleStore = create<ResponsibleStoreState>((set) => ({
  responsible: false,
  setResponsible: (value) => set({ responsible: value }),
  toggleResponsible: () =>
    set((state) => ({ responsible: !state.responsible })),
}));
