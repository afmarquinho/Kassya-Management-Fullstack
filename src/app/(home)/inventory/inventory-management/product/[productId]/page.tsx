import { getProductDetails } from "@/server-actions";
import { desformatearFecha } from "@/utils";

type Props = {
  params: {
    productId: string;
  };
};

const InventoryProductPage = async ({ params }: Props) => {
  const { productId } = await params;
  const productIdInt = parseInt(productId, 10);
  const { ok, data, message } = await getProductDetails(productIdInt);

  if (!ok || !data) {
    return <div>{message}</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 bg-white dark:bg-slate-800 p-4 rounded shadow-md">Producto: {data.product.name}</h2>
      {/* <h2 className="text-2xl font-bold mb-5">Producto: {data.product.name}</h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Card: General Info */}
        <div className="bg-white dark:bg-slate-800 hover:bg-blue-200 dark:hover:bg-slate-600 p-4 rounded shadow-md ">
          <h2 className="font-semibold text-lg mb-2">Información General</h2>
          <p><strong>ID:</strong> {data.product.id}</p>
          <p><strong>Referencia:</strong> {data.product.reference}</p>
          <p><strong>Categoría:</strong> {data.product.category}</p>
        </div>

        {/* Card: Stock Info */}
        <div className="bg-white dark:bg-slate-800 hover:bg-blue-200 dark:hover:bg-slate-600 p-4 rounded shadow-md ">
          <h2 className="font-semibold text-lg mb-2">Inventario</h2>
          <p><strong>En Stock:</strong> {data.product.stockQuantity}</p>
          <p><strong>Ubicación:</strong> {data.product.location || "N/A"}</p>
          <p><strong>Despachados:</strong> {data.product.quantityDispatched}</p>
          <p><strong>Punto de Reorden:</strong> {data.product.reorderPoint}</p>
        </div>

        {/* Card: Estado */}
        <div className="bg-white dark:bg-slate-800 hover:bg-blue-200 dark:hover:bg-slate-600 p-4 rounded shadow-md ">
          <h2 className="font-semibold text-lg mb-2">Estado</h2>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                data.product.active ? "bg-green-400" : "bg-red-500"
              }`}
            />
            {data.product.active ? "Disponible" : "No Disponible"}
          </div>
          <p><strong>Lote:</strong> {data.product.lotNumber || "N/A"}</p>
        </div>

        {/* Card: Fechas */}
        <div className="bg-white dark:bg-slate-800 hover:bg-blue-200 dark:hover:bg-slate-600 p-4 rounded shadow-md ">
          <h2 className="font-semibold text-lg mb-2">Fechas</h2>
          <p><strong>Creación:</strong> {desformatearFecha(data.product.createdAt)}</p>
          <p><strong>Expiración:</strong> {desformatearFecha(data.product.expiryDate) || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryProductPage;
