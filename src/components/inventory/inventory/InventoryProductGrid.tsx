import { ProductDetailsType } from "@/interfaces";

type Props = {
  data: ProductDetailsType;
};
export const InventoryProductGrid = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Card: General Info */}
      <div className="bg-white dark:bg-slate-800 hover:bg-blue-200 dark:hover:bg-slate-600 p-4 rounded shadow-md ">
        <h2 className="font-semibold text-lg mb-2">Información General</h2>
        <p>
          <strong>ID:</strong> {data.id}
        </p>
        <p>
          <strong>Referencia:</strong> {data.reference}
        </p>
        <p>
          <strong>Categoría:</strong> {data.category}
        </p>
      </div>

      {/* Card: Stock Info */}
      <div className="bg-white dark:bg-slate-800 hover:bg-blue-200 dark:hover:bg-slate-600 p-4 rounded shadow-md ">
        <h2 className="font-semibold text-lg mb-2">Inventario</h2>
        <p>
          <strong>En Stock:</strong> {data.stockQuantity}
        </p>
        <p>
          <strong>Ubicación:</strong> {data.location || "N/A"}
        </p>
        <p>
          <strong>Despachados:</strong> {data.quantityDispatched}
        </p>
        <p>
          <strong>Punto de Reorden:</strong> {data.reorderPoint}
        </p>
      </div>

      {/* Card: Estado */}
      <div className="bg-white dark:bg-slate-800 hover:bg-blue-200 dark:hover:bg-slate-600 p-4 rounded shadow-md ">
        <h2 className="font-semibold text-lg mb-2">Estado</h2>
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              data.active ? "bg-green-400" : "bg-red-500"
            }`}
          />
          {data.active ? "Disponible" : "No Disponible"}
        </div>
      </div>
    </div>
  );
};
