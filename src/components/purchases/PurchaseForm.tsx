"use client";

import { updatePurchase } from "@/server-actions";
import { usePurchaseStore, useSupplierStore } from "@/store";
import purchaseSchema from "@/validations/purchase.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Decimal } from "@prisma/client/runtime/library";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { z } from "zod";

type FormValuesTypes = z.infer<typeof purchaseSchema>;

export const PurchaseForm = () => {
  const {
    purchase,
    togglePurchaseModal,
    cleanPurchase,
    updatePurchases,
    // updatePurchases,
  } = usePurchaseStore();
  const { supplierList } = useSupplierStore();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValuesTypes>({
    resolver: zodResolver(purchaseSchema),
    //defaultValues: purchase || {},
  });

  // const onSubmit: SubmitHandler<FormValuesTypes> = async (data) => {
  //   setLoading(true);
  //   // try {
  //   if (purchase) {
  //     const { Supplier, Purchase_totalAmount, ...purchaseWithoutSupplier } =
  //       purchase;

  //     const total = new Decimal(Purchase_totalAmount);

  //     const updatedPurchase = {
  //       ...purchaseWithoutSupplier,
  //       ...data,
  //       Purchase_totalAmount: total,
  //     };

  //     try {
  //       const { ok, data } = await updatePurchase(updatedPurchase);
  //       if (ok && data) {
  //         const upData = {...data, Purchase_totalAmount}
  //         updatePurchases("update", upData);
  //         togglePurchaseModal();
  //         toast.success("Compra actaulizada");
  //         cleanPurchase();
  //       }
  //     } catch (error) {
  //       toast.error("Error al actualizar la compra");
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }

  //   } else {
      
  //   }
  //   reset();
  // };

  useEffect(() => {
    setValue("Purchase_userId", 1);

    if (purchase) {
      console.log(typeof purchase.Purchase_dueDate);
      setValue("Purchase_description", purchase.Purchase_description);
      setValue("Purchase_supplierId", purchase.Purchase_supplierId);
      setValue("Purchase_paymentMethod", purchase.Purchase_paymentMethod);
      setValue("Purchase_supplierId", purchase.Purchase_supplierId);
    }
  }, [setValue, purchase]);

  // function desformatearFecha() {
  //   const newDate = purchase?.Purchase_dueDate?.split("T");

  //   return newDate ? newDate[0] : "";
  // }

  return (
    <>
      <h2 className="text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2">
        {purchase ? "Editar Compra" : "Crear Nueva Orden de Compra"}
      </h2>

      <form
        className="w-full max-w-[600px] mx-auto py-2 space-y-4"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          Descripción
          {errors.Purchase_description && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Purchase_description.message}
            </div>
          )}
          <textarea
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md resize-none h-32"
            {...register("Purchase_description")}
          />
        </label>

        <label className="flex flex-col">
          Proveedor
          {errors.Purchase_supplierId && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Purchase_supplierId.message}
            </div>
          )}
          <select
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
            {...register("Purchase_supplierId", { valueAsNumber: true })}
          >
            <option value="">-- Seleccione --</option>
            {supplierList?.map((supplier, i) => (
              <option key={i} value={supplier.Supplier_id}>
                {supplier.Supplier_name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          Método de Pago
          {errors.Purchase_paymentMethod && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Purchase_paymentMethod.message}
            </div>
          )}
          <input
            type="text"
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
            {...register("Purchase_paymentMethod")}
          />
        </label>

        <label className="flex flex-col">
          Término de Pago
          {errors.Purchase_dueDate && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Purchase_dueDate.message}
            </div>
          )}
          <input
            type="date"
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
            {...register("Purchase_dueDate")}
            // defaultValue={purchase ? desformatearFecha() : ""}
          />
        </label>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-blue-600 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors"
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>{purchase ? "Editar" : "Crear"}</>
            )}
          </button>
        </div>
      </form>
    </>
  );
};
