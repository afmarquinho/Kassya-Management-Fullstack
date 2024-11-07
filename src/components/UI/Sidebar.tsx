"use client";
import {
  CircleDollarSign,
  CircleUserRound,
  ClipboardPen,
  NotebookText,
  PanelsTopLeft,
  ShoppingBag,
  UserRoundCog,
  Wrench,
  X,
} from "lucide-react";

import Image from "next/image";
import logo from "../../../public/logo.png";
import { SidebarLink } from "./SidebarLink";
import { useUIStore } from "@/stores/useUIStore";




export const Sidebar = () => {
  const { isSidebarCollapsed, setSidebarCollapsed } = useUIStore();

  return (
    <div
      className={`bg-white dark:bg-slate-800 fixed md:relative min-h-full md:min-h-full z-10 transition-all 
    ${isSidebarCollapsed ? "w-0 md:w-14" : "w-56"}
    `}
    >
      <div className={`flex items-center justify-between p-3`}>
        {/* DIV TO WRAP LOGO AND NAME */}
        <div className={`flex justify-start items-center gap-1`}>
          <div
            className={`bg-white p-1 ${
              isSidebarCollapsed ? "hidden md:block" : "block"
            }`}
          >
            <div className={`w-6 h-7 relative`}>
              <Image
                src={logo}
                alt="Kassya"
                width={100}
                height={100}
                className={``}
              />
            </div>
          </div>
          <p
            className={`font-bold text-2xl text-red-500 ${
              isSidebarCollapsed ? "hidden" : "block"
            }`}
          >
            Kassya
          </p>
        </div>

        <button
          onClick={setSidebarCollapsed}
          className={`hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-full  ${
            isSidebarCollapsed ? "hidden" : "block md:hidden"
          }`}
        >
          <X className={`text-red-500 dark:text-yellow-500`} />
        </button>
      </div>

      <SidebarLink label="Panel" href="/dashboard" icon={PanelsTopLeft} />
      {/* <SidebarLink label="Sales" href="/sales" icon={CircleDollarSign} /> */}
      {/* <SidebarLink label="Purchase Order" href="/purchase" icon={ShoppingBag} /> */}
      {/* <SidebarLink label="Masters" href="/masters" icon={ClipboardPen} /> */}
      {/* <SidebarLink label="Reports" href="/reports" icon={NotebookText} /> */}
      {/* <SidebarLink label="Warranty" href="/warranty" icon={Wrench} /> */}
      <SidebarLink label="Gestor de Usuarios" href="/users" icon={UserRoundCog} />
      {/* <SidebarLink label="My Profile" href="/profile" icon={CircleUserRound} />  */}
    </div>
  );
};
