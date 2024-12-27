import { getPurchaseDetails } from "@/server-actions";
import { desformatearFecha } from "@/utils";
import { Lock, LockOpen } from "lucide-react";
import { PurchaseModalContainer } from "../PurchaseModalContainer";
import { PurchaseDetails } from "@/interfaces";
import { PurchaseGrid } from "./PurchaseGrid";

interface Props {
  purchaseId: number;
}

export const PurchaseView = async ({ purchaseId }: Props) => {
  //   const { isProductModalOpen, toggleProductModal, isDeleteProductModalOpen } =
  //     productStore();

  let purchaseDetails: PurchaseDetails | null = null;

  try {
    const { ok, data } = await getPurchaseDetails(purchaseId);

    if (ok && data) {
      purchaseDetails = data;
      // toast.success("Detalle de la compra cargado exitosamente");
    } else {
      // toast.error("Error de al cargar la compra, intenta nuevamente");
    }
  } catch (error) {
    console.error(error);
    // toast.error("Error desconocido");
  }
  if (!purchaseDetails) {
    return (
      <p className={`text-base italic font-semibold`}>
        No has seleccionado una compra visualizar.
      </p>
    );
  }

  return (
    <>
      <div className={`space-y-5 mb-5`}>
        <div className={`bg-white dark:bg-slate-900 shadow-lg p-5`}>
          <h2 className={`font-bold text-center text-base uppercase`}>
            Detalle de la Compra
          </h2>
          <table border={1}>
            <tbody className={`text-left`}>
              <tr>
                <th className={`italic font-semibold`}>Consecutivo</th>
                <td className={`p-1`}>{purchaseDetails.Purchase_id}</td>
              </tr>
              <tr>
                <th className={`italic font-semibold`}>Descripcion</th>
                <td className={`p-1`}>
                  {purchaseDetails?.Purchase_description}
                </td>
              </tr>
              <tr>
                <th className={`italic font-semibold`}>Fecha</th>
                <td className={`p-1`}>
                  {desformatearFecha(purchaseDetails.Purchase_date)}
                </td>
              </tr>
              <tr>
                <th className={`italic font-semibold`}>Fecha de Vencimiento</th>
                <td className={`p-1`}>
                  {desformatearFecha(purchaseDetails.Purchase_dueDate)}
                </td>
              </tr>

              <tr>
                <th className={`italic font-semibold`}>Término de pago</th>
                <td className={`p-1`}>
                  {purchaseDetails?.Purchase_paymentMethod}
                </td>
              </tr>
              <tr>
                <th className={`italic font-semibold`}>Estado</th>
                <td className={`p-1`}>
                  <div className={`flex gap-2 items-center justify-start`}>
                    {purchaseDetails?.Purchase_processed ? (
                      <Lock className={`w-5`} />
                    ) : (
                      <LockOpen className={`w-5`} />
                    )}
                    {purchaseDetails?.Purchase_processed
                      ? "Cerrada"
                      : "Abierta"}
                  </div>
                </td>
              </tr>
              <tr>
                <th className={`italic font-semibold`}>Monto</th>
                <td className={`p-1 font-bold`}>
                  {" "}
                  {purchaseDetails.Purchase_totalAmount}
                </td>
              </tr>
              <tr>
                <th className={`italic font-semibold`}>Creado por</th>
                <td className={`p-1`}>
                  {purchaseDetails?.User.User_name}{" "}
                  {purchaseDetails?.User.User_surname}
                </td>
              </tr>
            </tbody>
          </table>
          {!purchaseDetails.Purchase_processed && (
            <button
              className={`px-2 py-1 mt-2 bg-gradient-to-b from-indigo-600 to-indigo-600 text-white rounded`}
              //   onClick={toggleProductModal}
            >
              Agregar Item
            </button>
          )}
        </div>

        <PurchaseGrid purchaseDetails={purchaseDetails} />
      </div>
      <PurchaseModalContainer />
    </>
  );
};
