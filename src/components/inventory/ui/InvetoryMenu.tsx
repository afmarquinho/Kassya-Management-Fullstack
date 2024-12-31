"use client";
import { Home } from "lucide-react";
import { BackButton } from "../../UI/BackButton";
import { InventoryMenuButton } from "./InventoryMenuButton";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const InvetoryMenu = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/inventory" ? (
        <div className={`flex gap-2 mb-2`}>
          <InventoryMenuButton label="Compras" />
          <InventoryMenuButton label="Inventario" />
          <InventoryMenuButton label="Solicitudes" />
          <InventoryMenuButton label="Categoría" />
        </div>
      ) : (
        <div className={`flex justify-end gap-2`}>
          <Link
            href="/inventory"
            className={`p-2 w-12 h-full flex justify-center items-center transition-all duration-300 rounded text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-gray-600`}
          >
            <Home className={`w-full`} />
          </Link>
          <BackButton />
        </div>
      )}
    </>
  );
};
