"use client";
import { BackButton } from "../../UI/BackButton";
import { InventoryMenuButton } from "./InventoryMenuButton";
import { usePathname } from "next/navigation";

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
          <BackButton />
        </div>
      )}
    </>
  );
};
