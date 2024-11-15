import { create } from "zustand";
import { persist } from "zustand/middleware";

type States = {
  isDark: boolean;
  isSidebarCollapsed: boolean;
};

type Actions = {
  toggleDarkMode: () => void;
  setSidebarCollapsed: () => void;
};

export const useUIStore = create(
  persist<States & Actions>(
    (set, get) => ({
      isDark: false,
      isSidebarCollapsed: false,

      toggleDarkMode: () => {
        const { isDark } = get();
        document.documentElement.classList.toggle("dark", !isDark);
        set({ isDark: !isDark });
      },

      setSidebarCollapsed: () => {
        const { isSidebarCollapsed } = get();
        set({ isSidebarCollapsed: !isSidebarCollapsed });
      },
    }),
    {
      name: "ui-store",
    }
  )
);
