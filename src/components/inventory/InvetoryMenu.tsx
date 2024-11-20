import { InventoryMenuButton } from "./InventoryMenuButton";

export const InvetoryMenu = () => {
  return (
    <div className={`flex gap-4 mb-2`}>
      <InventoryMenuButton label="Órdenes de Compra" color="violet" />
      <InventoryMenuButton label="Inventarios" color="red" />
    </div>
  );
};
