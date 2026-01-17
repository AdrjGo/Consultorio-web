import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Theme = "light" | "dark";
type ThemeSource = "system" | "user";

type ThemeState = {
  theme: Theme;
  source: ThemeSource;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  useSystemTheme: () => void;
};

const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: getSystemTheme(),
      source: "system",

      toggleTheme: () => {
        const next: Theme = get().theme === "light" ? "dark" : "light";
        set({ theme: next, source: "user" });
      },

      setTheme: (theme) => set({ theme, source: "user" }),

      useSystemTheme: () => set({ theme: getSystemTheme(), source: "system" }),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
      // opcional: solo persistir estas keys
      partialize: (s) => ({ theme: s.theme, source: s.source }),
    },
  ),
);
