"use client";

import { useUIStore } from "@/store/UIStore";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  path: string;
  subtitle?: string;
  href: string;
  icon: LucideIcon;
};

export const SidebarLink = ({
  path,
  href,
  icon: Icon,
  subtitle = "",
}: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href);
  const { isSidebarCollapsed } = useUIStore();

  return (
    <Link
      href={href}
      className={`${isSidebarCollapsed ? "hidden md:block" : "block"}`}
    >
      <div
        className={`group flex justify-start items-center gap-2 px-4 py-3 w-full hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-400 dark:hover:from-zinc-800 dark:hover:to-gray-600 ${
          isActive && "bg-slate-200 dark:bg-slate-700"
        }
        `}
      >
        <Icon
          className={`group-hover:text-indigo-600 dark:group-hover:text-red-500 ${
            isActive
              ? "text-indigo-600 dark:text-red-500 "
              : "text-red-500 dark:text-yellow-500 "
          }`}
          strokeWidth={1.5}
        />
        <div className={`${isSidebarCollapsed ? "hidden" : "block"} flex flex-col`}>
          <span className={``}>
            {path}
          </span>
          <span className={`italic text-xs text-gray-500 dark:text-gray-400`}>{subtitle}</span>
        </div>
      </div>
    </Link>
  );
};
