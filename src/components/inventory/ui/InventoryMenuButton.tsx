import { useInventoryStore } from "@/store";
import { Archive, PackageOpen, Tag } from "lucide-react";

type Props = {
  label: keyof typeof icons; //* Restringe label a las claves de icons
};

const icons = {
  Compras: <PackageOpen size={20} strokeWidth={1.25} className={`h-4`} />,
  Inventario: <Archive size={20} strokeWidth={1.25} className={`h-4`} />,
  Categoría: <Tag size={20} strokeWidth={1.25} className={`h-4`} />,
};

export const InventoryMenuButton = ({ label }: Props) => {
  const {
    toggleCategoryModal,
    togglePurchaseModal,
    toggleInventoryModal,
    categoryModalOpen,
    purchaseModalOpen,
    inventoryModalOpen,
  } = useInventoryStore();

  const btn1 = ` ${
    purchaseModalOpen
      ? "from-violet-950 to-violet-950 dark:from-amber-700 dark:to-amber-700"
      : "hover:from-purple-600 hover:to-purple-600 hover:dark:from-gray-400 hover:dark:to-gray-500"
  }`;
  const btn2 = `${
    inventoryModalOpen
      ? "from-violet-950 to-violet-950 dark:from-amber-700 dark:to-amber-700"
      : "hover:from-purple-600 hover:to-purple-600 hover:dark:from-gray-400 hover:dark:to-gray-500"
  }`;
  const btn3 = ` ${
    categoryModalOpen
      ? "from-violet-950 to-violet-950 dark:from-amber-700 dark:to-amber-700"
      : "hover:from-purple-600 hover:to-purple-600 hover:dark:from-gray-400 hover:dark:to-gray-500"
  }`;

  const handleClick = () => {
    switch (label) {
      case "Categoría":
        toggleCategoryModal(true);
        break;

      case "Compras":
        togglePurchaseModal(true);
        break;

      case "Inventario":
        toggleInventoryModal(true);
        break;

      default:
        break;
    }
  };

  return (
    <button
      className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-white transition-colors text-xs bg-gradient-to-b from-violet-500 to-violet-700 shadow-md p-2
        ${label === "Compras" ? btn1 : label === "Inventario" ? btn2 : btn3}`}
      onClick={handleClick}
    >
      {icons[label]} {label}
    </button>
  );
};
