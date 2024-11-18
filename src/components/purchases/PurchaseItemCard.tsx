"use client";

import { PurchaseItems } from "@/interfaces";
import { usePurchaseItemStore} from "@/store";
import { Pencil, X } from "lucide-react";

type Props = {
  item: PurchaseItems;
  purchaseSatus: boolean;
};
const totalFormatted = (value: any) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const PurchaseItemCard = ({ item, purchaseSatus }: Props) => {
  const { setItem, toggleDeleteItemModal } = usePurchaseItemStore();
 

  //   const { toggleDeleteProductModal, setPurchaseItem, toggleProductModal } =
  //     productStore();
  //   const handleEdit = (item: ProductType) => {
  //     setPurchaseItem(product);
  //     toggleProductModal();
  //   };

  const handleDelete = (item: PurchaseItems) => {
    setItem(item);
    toggleDeleteItemModal();
  };

  return (
    <div
      className={`bg-white dark:bg-slate-900 shadow-lg px-5 pt-10 pb-5 w-full hover:bg-blue-200 dark:hover:bg-slate-600 relative`}
    >
      {!purchaseSatus && (
        <div className={`flex gap-5 absolute right-2 top-2`}>
          <button
            className={`flex gap-1 text-xs items-center justify-center  text-yellow-700 dark:text-white  font-bold w-20`}
            // onClick={() => handleEdit(item)}
          >
            <Pencil className={`w-5`} /> Editar
          </button>
          <button
            className={`flex gap-1 text-xs items-center justify-center  text-red-500 font-bold w-20`}
            onClick={() => handleDelete(item)}
          >
            <X className={`w-5`} /> Eliminar
          </button>
        </div>
      )}

      <table className={`text-left`}>
        <tbody>
          <tr>
            <th className={`pe-24`}>Referencia</th>
            <td>{item.Item_ref}</td>
          </tr>
          <tr>
            <th>Nombre</th>
            <td className={`font-bold`}>{item.Item_name}</td>
          </tr>
          <tr>
            <th>Descripción</th>
            <td>{item.Item_description}</td>
          </tr>
          <tr>
            <th>Costo</th>
            <td> {totalFormatted(item.Item_unitCost)}</td>
          </tr>
          <tr>
            <th>Cantidad</th>
            <td>{item.Item_qtyOrdered}</td>
          </tr>
          <tr>
            <th>TOTAL</th>
            <td className={`font-medium text-base`}>
              {totalFormatted(item.Item_totalAmount)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
