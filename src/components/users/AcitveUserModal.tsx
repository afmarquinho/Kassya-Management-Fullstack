"use client";
import { updateUser } from "@/server-actions";
import { useUserStore } from "@/store/userStore";
import { User } from "@prisma/client";
import { TriangleAlert, UserRoundX, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../UI/LoadingSpinner";


export const ActiveUserModal = () => {
  const { user, toggleActiveUserModal, updateUsers, setUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>();

  const handleActiveUser = async () => {
    setLoading(true);
    const usr: User | null = user
      ? {
          ...user,
          User_active: !user?.User_active,
        }
      : null;
    try {
      if (!usr) return;
      await updateUser(usr);
      toggleActiveUserModal();
      setUser(usr);
      updateUsers("update", usr);

      toast.success(
        `¡Usuario ${usr.User_active ? "Activado" : "Desactivado"} con éxito!`
      );
    } catch (error) {
      console.error(error);
      toast.error(
        "¡Usuario No se puedo actualizar el estado del usuario con éxito!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center`}
    >
      <div className={`w-full max-w-96 bg-white dark:bg-slate-700`}>
        <div className={`relative`}>
          <TriangleAlert
            className={`absolute top-2 left-2 text-yellow-400`}
            strokeWidth={3}
          />
          <button
            className={`absolute top-2 right-2 ${
              user?.User_active
                ? "bg-red-800 hover:bg-red-950"
                : "bg-green-800 hover:bg-green-950"
            }`}
            onClick={toggleActiveUserModal}
          >
            <X className={`  text-yellow-400 cursor-pointer`} strokeWidth={3} />
          </button>
          <h2
            className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 ${
              user?.User_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
          >
            Alerta
          </h2>
        </div>
        <div className={`p-4`}>
          <p>
            ¿Realmente deseas {user?.User_active ? "Desactivar" : "Activar"} a{" "}
            <span className={`font-bold`}>
              {user?.User_name} {user?.User_surname}?
            </span>
          </p>

          <button
            className={`w-32 h-8 flex gap-1 justify-center items-center  rounded-md text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b ${
              user?.User_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
            onClick={handleActiveUser}
          >
            {loading ? (
              <LoadingSpinner/>
            ) : (
              <>
                <UserRoundX className={`w-5`} />
                {user?.User_active ? "Desactivar" : "Activar"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
