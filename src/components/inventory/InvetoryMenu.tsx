"use client";
import { BackButton } from "../UI/BackButton";
import { InventoryMenuButton } from "./InventoryMenuButton";
import { usePathname } from "next/navigation";

export const InvetoryMenu = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/inventory" ? (
        <div className={`flex gap-4 mb-2`}>
          <InventoryMenuButton label="Órdenes de Compra" color="violet" />
          <InventoryMenuButton label="Inventarios" color="red" />
        </div>
      ) : (
        <div className={`flex justify-end gap-5`}>
          <BackButton />
        </div>
      )}
    </>
  );
};
