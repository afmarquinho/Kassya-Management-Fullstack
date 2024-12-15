import {
  AddNoteForm,
  CommentsSection,
  IncomeTrackingTable,
} from "@/components";
import { getPurchaseInventory } from "@/server-actions/inventory/inventory-actions";
import { FolderClosed } from "lucide-react";
import { toast } from "react-toastify";

interface PageProps {
  params: { purchaseId: string }; // El parámetro dinámico de la URL
}

const InventoryItemsManagementPage = async ({ params }: PageProps) => {
  const { purchaseId } = await params;
  const purchaseIdInt = parseInt(purchaseId, 10); // Convertir el parámetro a número

  const { ok, data } = await getPurchaseInventory(purchaseIdInt);

  if (!ok || data === null) {
    toast.error("Error al cargar la compra");
    return (
      <div className={`italic font-medium text-base`}>
        No hay compra seleccionada
      </div>
    );
  }

  return (
    <>
      <h2 className={`font-medium text-center`}>
        Detalle de Compra e Ingreso a Inventario
      </h2>
      <h3 className={`font-medium mb-1 mt-4 md:mt-3`}>Detalle de Compra</h3>

      <table className="bg-white dark:bg-slate-700 rounded-lg shadow-lg w-full max-w-[900px] overflow-hidden mx-auto">
        <tbody className="text-left">
          {/* <!-- Encabezado general --> */}
          <tr className="bg-gray-100 dark:bg-slate-800 font-bold border-b-2 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-[12rem] border-r-2 border-gray-300 dark:border-gray-500">
              Serial:
            </th>
            <td className="p-3">{data.Purchase_id}</td>
          </tr>
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Descripción:
            </th>
            <td className="p-3">{data.Purchase_description}</td>
          </tr>

          {/* <!-- Subtítulo centrado --> */}
          <tr>
            <td
              colSpan={2}
              className="bg-gray-200 dark:bg-slate-800 text-center font-semibold text-gray-700 dark:text-gray-200 p-3 uppercase text-xs border-b-2 dark:border-gray-500"
            >
              Datos del Proveedor
            </td>
          </tr>

          {/* <!-- Contenido del subtítulo --> */}
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Proveedor:
            </th>
            <td className="p-3">{data.Supplier.Supplier_name}</td>
          </tr>
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Cuidad:
            </th>
            <td className="p-3">{data.Supplier.Supplier_city}</td>
          </tr>
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Nombre de Contacto
            </th>
            <td className="p-3">{data.Supplier.Supplier_contactInfo}</td>
          </tr>
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Correo:
            </th>
            <td className="p-3">{data.Supplier.Supplier_email}</td>
          </tr>
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Teléfono:
            </th>
            <td className="p-3">{data.Supplier.Supplier_phoneNumber}</td>
          </tr>
        </tbody>
      </table>

      <h3 className={`font-medium mb-1 mt-4 md:mt-3`}>Control de Ingreso</h3>
      <>
        <IncomeTrackingTable data={data} />
      </>

      <h3 className={`font-medium mb-1 mt-4 md:mt-3`}>Anotaciones</h3>
      <div className="flex flex-col md:flex-row gap-5 w-full mb-5 ps-1">
        <AddNoteForm purchaseId={data.Purchase_id} />

        {/* //*Línea divisoria adaptable */}
        <div className="relative">
          <div className="hidden md:block w-[1px] bg-slate-400 h-full mx-auto" />
          <div className="block md:hidden h-[1px] bg-slate-400 w-full my-2" />
        </div>

        {/* //*Sección de comentarios con scroll */}

        <CommentsSection data={data} />
      </div>
      {!data.Purchase_close && (
        <button
          type="button"
          className={`bg-rose-600 shadow-lg rounded-lg p-2 flex gap-2 text-xs text-white items-center justify-center my-5 hover:bg-rose-700`}
        >
          <FolderClosed strokeWidth={1.5} />
          Cerrar Compra
        </button>
      )}
    </>
  );
};
export default InventoryItemsManagementPage;
