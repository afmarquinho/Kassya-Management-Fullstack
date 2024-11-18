"use client";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { RefreshCcw, UsersRound } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "../UI/LoadingSpinner";

export const GetUsersButton = () => {
  const { users, setUsers } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetUsers = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/users");
      const { ok, data } = response.data;

      if (ok) {
        setUsers(data);
      } else {
        console.error("Error al obtener los usuarios");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`w-44 h-10 flex justify-center items-center gap-1 rounded-md text-white transition-colors bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-500`}
      onClick={handleGetUsers}
      disabled={loading}
    >
    {loading ? (
          <LoadingSpinner/>
        ) : (
          <>
            {users ? (
              <RefreshCcw className={`w-5`} />
            ) : (
              <UsersRound className={`w-5`} />
            )}
            {users ? "Refrescar" : "Mostrar Usuarios"}
          </>
        )}
    </button>
  );
};
