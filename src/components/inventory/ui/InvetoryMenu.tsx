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
          <InventoryMenuButton label="Categoría" />
        </div>
      ) : (
        <div className={`flex justify-end gap-5`}>
          <Link
            href="/inventory"
            className={`bg-red-500 dark:bg-red-700 h-full p-2 rounded text-slate-200 hover:bg-red-600 dark:hover:bg-red-500 transition-colors duration-300 ease-in-out`}
          >
            <Home />
          </Link>
          <BackButton />
        </div>
      )}
    </>
  );
};
