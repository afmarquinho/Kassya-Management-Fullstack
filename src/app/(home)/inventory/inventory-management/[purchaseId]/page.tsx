import { getPurchaseInventory } from "@/server-actions/inventory/inventory-actions";
import { desformatearFecha } from "@/utils";
import {
  FolderClosed,
  LogIn,
  MessageSquare,
  SendHorizontal,
} from "lucide-react";
import { toast } from "react-toastify";

interface PageProps {
  params: { purchaseId: string }; // El parámetro dinámico de la URL
}

const InventoryItemsManagementPage = async ({ params }: PageProps) => {
  const { purchaseId } = await params;
  const purchaseIdInt = parseInt(purchaseId, 10); // Convertir el parámetro a número

  const { ok, data } = await getPurchaseInventory(purchaseIdInt);

  if (!ok || !data) {
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
      <h3 className={`font-medium my-2`}>Detalle de Compra</h3>

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

      <h3 className={`font-medium my-2`}>Control de Ingreso</h3>
      <>
        <table
          className={`w-full rounded-lg border-collapse text-left overflow-hidden shadow-md text-sm mb-5`}
        >
          <thead
            className={`bg-indigo-900 dark:bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
          >
            <tr>
              <th className={`py-3 px-2`}>Item</th>
              <th className={`py-3 px-2`}>Ref</th>
              <th className={`py-3 px-2`}>Nombre</th>
              <th className={`py-3 px-1`}>Descripción</th>
              <th className={`py-3 px-1`}>Cant. Ordenada</th>
              <th className={`py-3 px-1`}>Faltantes</th>
              <th className={`py-3 px-1`}>Recibido</th>
              <th className={`py-3 px-1`}>Ingresar</th>
            </tr>
          </thead>
          <tbody className={`px-10`}>
            {data.PurchaseItem.map((item, i) => (
              <tr
                key={item.Item_id}
                className={` dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                  i % 2 === 0 && "bg-slate-300 dark:bg-slate-800"
                }`}
              >
                <td className={`py-2 px-2`}>{i + 1}</td>
                <td className={`py-2 px-1`}>{item.Item_ref}</td>
                <td className={`py-2 px-1`}>{item.Item_name}</td>
                <td className={`py-2 px-1`}>{item.Item_description}/</td>
                <td className={`py-2 px-1`}>{item.Item_qtyOrdered}</td>
                <td className={`py-2 px-1`}>
                  {item.Item_qtyOrdered - item.Item_qtyReceived}
                </td>
                <td className={`py-2 px-1`}>
                  {item.Item_qtyOrdered > item.Item_qtyReceived && (
                    <input
                      type="number"
                      name=""
                      id=""
                      className={`w-10 text-center outline-none`}
                    />
                  )}
                </td>
                <td className={`py-2 px-1`}>
                  {item.Item_qtyOrdered > item.Item_qtyReceived && (
                    <button
                      className={`bg-gradient-to-b from-rose-600 to-rose-700 w-8 h-full flex justify-center items-center shadow-md rounded-sm`}
                      // onClick={() => handleEdit(item)}
                    >
                      <LogIn className={`text-white w-5`} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      <h3 className={`font-medium my-2`}>Anotaciones</h3>
      <div className="flex flex-col md:flex-row gap-5 w-full mb-5 ps-1">
        <form className="flex-1">
          <textarea
            name=""
            id=""
            className="w-full h-20 outline-none rounded-lg bg-white dark:bg-slate-900 resize-none p-2 shadow-md focus:ring-2 focus:ring-teal-600"
            placeholder="Escribe tu comentario..."
          />
          <button
            type="submit"
            className="bg-teal-600 dark:bg-teal-700 rounded-full text-white p-2 my-2 hover:bg-teal-500 dark:hover:bg-teal-500 shadow-md transition-all"
          >
            <SendHorizontal />
          </button>
        </form>
        {/* Línea divisoria adaptable */}
        <div className="relative">
          <div className="hidden md:block w-[1px] bg-slate-400 h-full mx-auto" />
          <div className="block md:hidden h-[1px] bg-slate-400 w-full my-2" />
        </div>
        {/* Sección de comentarios con scroll */}
        <div className="flex-1 overflow-y-auto max-h-60 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shadow-md">
          <p className={`mb-2 flex gap-2`}>
            <MessageSquare /> Comentarios
          </p>

          {data.PurchaseNote.length < 1 ? (
            <div className={`italic font-medium text-sm`}>
              No hay comentarios
            </div>
          ) : (
            <>
              {data.PurchaseNote.map((note) => (
                <div
                  className="mb-2 p-2 bg-white dark:bg-slate-700 rounded-lg shadow"
                  key={note.Note_id}
                >
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    {note.Note_content}
                  </p>
                  <div
                    className={`w-full text-right text-[11px] italic flex gap-2 items-center justify-end`}
                  >
                    <span className={`font-medium`}>
                      {note.User.User_name} {note.User.User_surname}
                    </span>

                    <span>-</span>

                    {desformatearFecha(note.Note_createdAt)}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {!data.Purchase_close && (
        <button
          type="button"
          className={`bg-rose-600 shadow-lg rounded-lg p-2 flex gap-2 text-xs text-white items-center justify-center my-5 hover:bg-rose-700`}
        >
          <FolderClosed strokeWidth={1.5} />
          Cerrar Compras
        </button>
      )}
    </>
  );
};
export default InventoryItemsManagementPage;
