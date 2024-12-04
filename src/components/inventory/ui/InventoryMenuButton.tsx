import { useInventoryStore } from "@/store";
import { Archive, PackageOpen, Tag } from "lucide-react";

type Props = {
  label: keyof typeof icons; //* Restringe label a las claves de icons
  color: "red" | "blue" | "violet" | "indigo" | "rose" | "purple";
};
const red =
  "from-red-500 to-red-700 dark:from-red-800 dark:to-red-900 hover:from-red-700 hover:to-red-700";
const blue =
  "from-blue-500 to-blue-700 dark:from-blue-800 dark:to-blue-900 hover:from-blue-700 hover:to-blue-700";

const violet =
  "from-violet-500 to-violet-700 dark:from-violet-800 dark:to-violet-900 hover:from-violet-700 hover:to-violet-700";

const indigo =
  "from-indigo-500 to-indigo-700 dark:from-indigo-800 dark:to-indigo-900 hover:from-indigo-700 hover:to-indigo-700";
const rose =
  "from-rose-500 to-rose-700 dark:from-rose-800 dark:to-rose-900 hover:from-rose-700 hover:to-rose-700";

const purple =
  "from-purple-500 to-purple-700 dark:from-purple-800 dark:to-purple-900 hover:from-purple-700 hover:to-purple-700";

const icons = {
  Compras: <PackageOpen size={20} strokeWidth={1.25} className={`h-4`} />,
  Inventarios: <Archive size={20} strokeWidth={1.25} className={`h-4`} />,
  Categoría: <Tag size={20} strokeWidth={1.25} className={`h-4`} />,
};

export const InventoryMenuButton = ({ label, color }: Props) => {
  const { toggleCategoryModal, togglePurchaseModal } = useInventoryStore();

  const handleClick = () => {
    switch (label) {
      case "Categoría":
        toggleCategoryModal(true);
        togglePurchaseModal(false);

        break;
      case "Compras":
        toggleCategoryModal(false);
        togglePurchaseModal(true);

        break;

      default:
        break;
    }
  };

  return (
    <button
      className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-white transition-colors text-xs bg-gradient-to-b
        ${
          color === "red"
            ? red
            : color === "blue"
            ? blue
            : color === "violet"
            ? violet
            : color === "indigo"
            ? indigo
            : color === "rose"
            ? rose
            : purple
        } hover:dark:from-orange-700 hover:dark:to-orange-900 shadow-md p-2 text-xs`}
      onClick={handleClick}
    >
      {icons[label]} {label}
    </button>
  );
};