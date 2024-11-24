"use client";
import { createUser, updateUser } from "@/server-actions";
import { useUserStore } from "@/store/userStore";
import { userSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { LoadingSpinner } from "../UI/LoadingSpinner";

type FormValuesType = z.infer<typeof userSchema>;

export const UserForm = () => {
  const { user, cleanUser, updateUsers, toggleUsersModal } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    setLoading(true); // Inicia el estado de carga

    if (user) {
      const upUser = { ...user, ...data };
      const {
        User_passwordConfirm,
        User_password,
        User_dni,
        User_name,
        User_surname,
        ...usr
      } = upUser; // Quitar confirmación de password

      try {
        const { ok, data: user } = await updateUser(usr);

        if (ok && user) {
          updateUsers("add", user); // Agregar usuario
          toast.success("Usuario creado con éxito"); // Notificación de éxito
          reset(); //* Resetear el formulario
          toggleUsersModal(); //* Cerrar el modal
        } else {
          toast.error("No se pudo crear el usuario"); // Notificación de error
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
        cleanUser(); //* Limpiar cualquier estado
      }
    } else {
      const { User_passwordConfirm, ...usr } = data; // Quitar confirmación de password
      try {
        const { ok, data: user } = await createUser(usr);
        if (ok && user) {
          updateUsers("add", user); // Agregar usuario
          toast.success("Usuario creado con éxito"); // Notificación de éxito
          reset(); //* Resetear el formulario
          toggleUsersModal(); //* Cerrar el modal
        } else {
          toast.error("No se pudo crear el usuario"); // Notificación de error
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
        cleanUser(); //* Limpiar cualquier estado
      }
    }
  };

  return (
    <>
      <h2
        className={`text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2`}
      >
        {false ? "Editar Usuario" : "Crear Nuevo Usuario"}
      </h2>

      <form
        action=""
        className={`w-full max-w-[600px] mx-auto py-2 space-y-4`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* NAME AND SURENAME */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Nombre</label>
            {errors.User_name && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.User_name.message}
              </div>
            )}

            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                user === null ? "" : "text-gray-500"
              }`}
              {...register("User_name")}
              defaultValue={user ? user.User_name : ""}
              readOnly={user !== null}
              autoFocus={user == null}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Apellido</label>
            {errors.User_surname && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.User_surname.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                user === null ? "" : "text-gray-500"
              }`}
              {...register("User_surname")}
              defaultValue={user ? user.User_surname : ""}
              readOnly={user !== null}
            />
          </div>
        </div>
        {/* DNI AND ADDRESS */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>
              Cédula{" "}
              <span className={`text-red-500 text-xs`}>
                (Sin puntos ni comas)
              </span>
            </label>
            {errors.User_dni && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.User_dni.message}
              </div>
            )}
            <input
              type="number"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                user === null ? "" : "text-gray-500"
              }`}
              {...register("User_dni", { valueAsNumber: true })}
              defaultValue={user ? user.User_dni : ""}
              readOnly={user !== null}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Dirección</label>
            {errors.User_address && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.User_address.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("User_address")}
              defaultValue={user ? user.User_address : ""}
              autoFocus={user !== null}
            />
          </div>
        </div>
        {/* PHONENUMBER AND ROLE */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Teléfono</label>
            {errors.User_phoneNumber && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.User_phoneNumber.message}
              </div>
            )}
            <input
              type="tel"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("User_phoneNumber")}
              defaultValue={user ? user.User_phoneNumber : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Rol</label>
            {errors.User_role && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.User_role.message}
              </div>
            )}
            <select
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("User_role")}
              defaultValue={user ? user.User_role : ""}
            >
              <option value="">-- Seleccione --</option>
              <option value="ADMIN">Administrador</option>
              <option value="MANAGER">Gerente</option>
              <option value="USER">Usuario</option>
            </select>
          </div>
        </div>
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Email</label>
            {errors.User_email && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.User_email.message}
              </div>
            )}
            <input
              type="email"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("User_email")}
              defaultValue={user ? user.User_email : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}></div>
        </div>
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Contraseña</label>
            {errors.User_password && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.User_password.message}
              </div>
            )}
            <input
              type="password"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("User_password")}
              defaultValue={user ? user.User_password : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Confirma Contraseña</label>
            {errors.User_passwordConfirm && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.User_passwordConfirm.message}
              </div>
            )}
            <input
              type="password"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("User_passwordConfirm")}
              defaultValue={user ? user.User_password : ""}
              readOnly={loading}
            />
          </div>
        </div>
        <div className={`w-full flex justify-center`}>
          <button
            type="submit"
            className={`bg-indigo-700 hover:bg-indigo-600 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors flex justify-center items-center`}
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner />
            ) : user ? (
              "Editar"
            ) : (
              "Crear"
            )}
          </button>
        </div>
      </form>
    </>
  );
};
