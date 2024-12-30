"use client";

import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ProductData } from "@/interfaces";
import { registerProductWithMovement } from "@/server-actions";
import { useInventoryStore } from "@/store";
import { Ban, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

type Props = {
  productData: ProductData | null;
  itemQtyRemaining: number;
  setProductData: React.Dispatch<React.SetStateAction<ProductData | null>>;
  setItemQtyRemaining: React.Dispatch<React.SetStateAction<number>>;
};

const AddProductModal = ({
  productData,
  itemQtyRemaining,
  setProductData,
  setItemQtyRemaining,
}: Props) => {
  const router = useRouter();
  const [qtyReceive, setQtyReceive] = useState<number>(0);
  const [lotNumber, setLotNumber] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [lotDate, setLotDate] = useState<string>("");

  const { toggleProductModal } = useInventoryStore();
  const handleCancel = () => {
    toggleProductModal();
    setProductData(null);
    setItemQtyRemaining(0);
  };

  const handleStock = async () => {
    //Recibimos la cantidad faltante como parámetro
    // Verificar si el valor es negativo
    if (qtyReceive <= 0) {
      toast.error("La cantidad no puede ser negativa o cero");
      return;
    }
    // Verificar si el valor no es un número entero
    else if (!Number.isInteger(qtyReceive)) {
      toast.error("La cantidad debe ser un número entero.");
      return;
    }
    // Verificar si el valor es mayor que los faltantes
    else if (qtyReceive > itemQtyRemaining) {
      toast.error("La cantidad no puede ser mayor que los faltantes.");
      return;
    } else if (!reason) {
      toast.error("Indique la razón de ingreso a inventario.");
      return;
    } else {
      //* Actualizamos o creamos la bbdd del inventario con la cantidad recibida.

      if (!productData) return;
      setLoading(true);
      try {
        const { ok, data, message } = await registerProductWithMovement(
          {
            Product_purchaseId: productData.Product_purchaseId,
            Product_name: productData.Product_name,
            Product_ref: productData.Product_ref,
            Product_qtyReceive: qtyReceive,
            Product_location: productData.Product_location,
            Product_lotNumber: lotNumber,
            Product_lotDate: lotDate,
            Product_categoryId: productData.Product_categoryId,
            Item_id: productData.Item_id,
          },
          4, // TODO: ACTUALIZAR EL USERID
          reason
        );

        if (ok && data) {
          toast.success(message);
          setQtyReceive(0);
          setLotNumber("");
          toggleProductModal();
          router.refresh();
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-start md:items-center overflow-auto pt-5 md:pt-0 backdrop-blur-[1px]`}
      onClick={handleCancel}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`bg-white dark:bg-slate-600 p-5 w-11/12 max-w-[300px] shadow`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={`italic font-bold text-center mb-2`}>
          Ingresar: <span>{productData?.Product_name}</span> al Inventario
        </h3>
        <form>
          <label className={`flex gap-2 justify-start items-center mb-2`}>
            <span className={`w-20 italic`}>Cantidad:</span>
            <input
              type="number"
              className={`bg-slate-300 dark:bg-slate-800 p-2 focus:outline-none text-base rounded h-8 flex-1 max-w-20`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQtyReceive(Number(e.target.value))
              }
            />
          </label>
          <label className={`flex gap-2 justify-start items-center mb-2`}>
            <span className={`w-20 italic`}>Lote:</span>
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-800 p-2 focus:outline-none text-base rounded h-8 flex-1 max-w-40 uppercase`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLotNumber(e.target.value.toUpperCase())
              }
            />
          </label>
          <label className={`flex gap-2 justify-start items-center mb-2`}>
            <span className={`w-20 italic`}>Fecha lote:</span>
            <input
              type="date"
              className={`bg-slate-300 dark:bg-slate-800 p-2 focus:outline-none rounded h-8 flex-1 max-w-40 uppercase`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLotDate(e.target.value.toUpperCase())
              }
            />
          </label>
          <label className={`flex gap-2 justify-start items-center mb-2`}>
            <span className={`w-20 italic`}>Razón:</span>
            <select
              className={`outline-none`}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setReason(e.target.value)
              }
            >
              <option value="">-- Seleccione --</option>
              <option value="compra">Compra</option>
              <option value="reposición">Reposición</option>
              <option value="devolución">Devolucón</option>
              <option value="ajuste">Ajuste</option>
            </select>
          </label>
          <div className={`flex gap-2 mt-5`}>
            <button
              className={`flex justify-center items-center py-1 px-2 text-white gap-1 my-1 bg-gradient-to-b from-rose-500 to-rose-600 rounde hover:from-rose-700 hover:to-rose-700 mx-auto rounded mt-2 w-28 transition-all duration-300`}
              onClick={handleCancel}
              disabled={loading}
            >
              <Ban className={`w-5`} />
              Cancelar
            </button>

            <button
              className={`flex justify-center items-center py-1 px-2 text-white gap-1 my-1 bg-gradient-to-b from-indigo-600 to-indigo-700 hover:from-indigo-800 hover:to-indigo-800 rounde mx-auto rounded mt-2 w-28 transition-all duration-300`}
              onClick={handleStock}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <LogIn className={`w-5`} />
                  Enviar
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
export default AddProductModal;
