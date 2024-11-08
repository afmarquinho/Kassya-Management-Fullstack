"use client";

import { useUIStore } from "@/stores/UIStore";
import { AlignJustify, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const Header = () => {
  const { isDark, toggleDarkMode, setSidebarCollapsed } = useUIStore();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={``}>
      <div className={`flex justify-between`}>
        <button
          onClick={setSidebarCollapsed}
          className={`hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-full  transition`}
        >
          <AlignJustify className={`text-red-500 dark:text-yellow-500`} />
        </button>
        <div className={`flex-1 flex justify-end items-center gap-3`}>
          <button
            onClick={toggleDarkMode}
            className={`hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-full  transition`}
          >
            {isDark ? (
              <Moon className={`text-red-500 dark:text-yellow-500`} />
            ) : (
              <Sun className={`text-red-500 dark:text-yellow-500`} />
            )}
          </button>
          <span>John Doe</span>
        </div>
      </div>
    </div>
  );
};
