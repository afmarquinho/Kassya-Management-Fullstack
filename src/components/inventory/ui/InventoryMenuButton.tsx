import { useInventoryStore } from "@/store";
import { Archive, PackageOpen, Tag, Truck } from "lucide-react";

type Props = {
  label: keyof typeof icons; // Restringe label a las claves de icons
};

const icons = {
  Compras: <PackageOpen size={20} strokeWidth={1.25} className="h-4" />,
  Inventario: <Archive size={20} strokeWidth={1.25} className="h-4" />,
  Categoría: <Tag size={20} strokeWidth={1.25} className="h-4" />,
  Solicitudes: <Truck size={20} strokeWidth={1.25} className="h-4" />,
};

export const InventoryMenuButton = ({ label }: Props) => {
  const {
    toggleCategoryModal,
    togglePurchaseModal,
    toggleInventoryModal,
    toggleRequirementModal,
    categoryModalOpen,
    purchaseModalOpen,
    inventoryModalOpen,
    requirementModalOpen,
  } = useInventoryStore();

  // Configuración de modales y estados
  const modalConfig = {
    Compras: { isOpen: purchaseModalOpen, toggle: togglePurchaseModal },
    Inventario: { isOpen: inventoryModalOpen, toggle: toggleInventoryModal },
    Categoría: { isOpen: categoryModalOpen, toggle: toggleCategoryModal },
    Solicitudes: { isOpen: requirementModalOpen, toggle: toggleRequirementModal },
  };

  // Clases dinámicas basadas en el estado del modal
  const dynamicClasses = modalConfig[label].isOpen
    ? "from-gray-300 to-gray-300 dark:from-teal-600 dark:to-teal-600"
    : "hover:from-gray-300 hover:to-gray-300 dark:hover:from-teal-600 dark:hover:to-teal-600";

  const handleClick = () => {
    modalConfig[label].toggle(true);
  };

  return (
    <button
      className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded text-slate-700 dark:text-slate-200 bg-gradient-to-b from-white to-white  border-blue-500 ${dynamicClasses} dark:from-slate-800 dark:to-slate-800`}
      onClick={handleClick}
    >
      {icons[label]} {label}
    </button>
  );
};
