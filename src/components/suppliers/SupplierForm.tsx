"use client";

import { createSupplier, updateSupplier } from "@/server-actions";
import { useSupplierStore } from "@/store";
import supplierSchema from "@/validations/supplier.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { LoadingSpinner } from "../UI/LoadingSpinner";

type FormValuesType = z.infer<typeof supplierSchema>;

export const SupplierForm = () => {
  const { supplier, updateSuppliers, toggleSupplierModal, cleanSupplier } =
    useSupplierStore();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(supplierSchema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    setLoading(true)
    if (supplier) {
      //* Actualizar usuario
      const supp = { ...supplier, ...data };
      try {
        const { ok, data } = await updateSupplier(supp);
        if (ok && data) {
          toggleSupplierModal();
          updateSuppliers("update", supp);
          toast.success("Proveedor actualizado exitosamente");
          reset();
        } else {
          toast.error("No se pudo actualizar el proveedor");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error inesperado");
      } 
    } else {
      //* Crear usuario
      try {
        const { ok, data: supplier } = await createSupplier(data);
        if (ok && supplier) {
          toggleSupplierModal();
          updateSuppliers("add", supplier);
          toast.success("Proveedor creado exitosamente");
          reset();
        } else {
          toast.error("No se pudo crear el proveedor");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error inesperado");
      } 
    }
    setLoading(false)
    cleanSupplier();
  };

  return (
    <>
      <h2
        className={`text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2`}
      >
        {supplier ? "Editar Proveedor" : "Crear Nuevo Proveedor"}
      </h2>

      <form
        className={`w-full max-w-[600px] mx-auto py-2 space-y-4`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* //*NIT AND COMPANY NAME */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Nit</label>
            {errors.Supplier_nit && (
              <div
                className={`text-xs text-red-600 my-0 font-medium ${
                  supplier === null ? "" : "text-gray-500"
                }`}
              >
                {errors.Supplier_nit.message}
              </div>
            )}

            <input
              type="number"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                supplier === null ? "" : "text-gray-500"
              }`}
              {...register("Supplier_nit", { valueAsNumber: true })}
              defaultValue={supplier ? supplier.Supplier_nit : ""}
              readOnly={supplier !== null}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Razón Social</label>
            {errors.Supplier_name && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_name.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_name")}
              defaultValue={supplier ? supplier.Supplier_name : ""}
            />
          </div>
        </div>

        {/* //* CONTACT INFO AND EMAIL */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Nombre de contacto</label>
            {errors.Supplier_contactInfo && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_contactInfo.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_contactInfo")}
              defaultValue={supplier ? supplier.Supplier_contactInfo : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Correo Electrónico</label>
            {errors.Supplier_email && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_email.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_email")}
              defaultValue={supplier ? supplier.Supplier_email : ""}
            />
          </div>
        </div>

        {/* //* PHONENUMBER AND CITY */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Teléfono</label>
            {errors.Supplier_phoneNumber && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_phoneNumber.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_phoneNumber")}
              defaultValue={supplier ? supplier.Supplier_phoneNumber : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Ciudad</label>
            {errors.Supplier_city && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_city.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_city")}
              defaultValue={supplier ? supplier.Supplier_city : ""}
            />
          </div>
        </div>

        {/* //* ADDRESS */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Dirección</label>
            {errors.Supplier_address && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_address.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_address")}
              defaultValue={supplier ? supplier.Supplier_address : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}></div>
        </div>

        <div className={`w-ull flex justify-center`}>
          <button
            type="submit"
            className={`bg-indigo-700 hover:bg-indigo-600 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors flex items-center justify-center`}
          >
            {loading ? (
               <LoadingSpinner h={20} b={4} color="blue" />
            ) : (
              <>{supplier ? "Editar" : "Crear"}</>
            )}
          </button>
        </div>
      </form>
    </>
  );
};
