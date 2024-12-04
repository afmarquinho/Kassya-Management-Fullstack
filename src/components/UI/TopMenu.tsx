"use client";

import { useUIStore } from "@/store/UIStore";
import { AlignJustify, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const TopMenu = () => {
  const { isDark, toggleDarkMode, setSidebarCollapsed } = useUIStore();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <header className={`h-9 mt-1`} />;
  }

  return (
    <header
      className={`flex justify-between items-center w-full mt-1 h-9`}
    >
      <button
        onClick={setSidebarCollapsed}
        className={`hover:bg-slate-300 dark:hover:bg-slate-800 p-1 w-8 h-8 rounded-lg  transition flex justify-center items-center`}
      >
        <AlignJustify className={`text-red-500 dark:text-yellow-500 w-full`} />
      </button>
      <div className={`flex-1 flex justify-end items-center gap-3`}>
        <button
          onClick={toggleDarkMode}
          className={`hover:bg-slate-300 dark:hover:bg-slate-800 p-1 w-8 h-8 rounded-lg  transition flex justify-center items-center`}
        >
          {isDark ? (
            <Moon className={`text-red-500 dark:text-yellow-500 w-full`} />
          ) : (
            <Sun className={`text-red-500 dark:text-yellow-500 w-full`} />
          )}
        </button>
        <span>John Doe</span>
      </div>
    </header>
  );
};
