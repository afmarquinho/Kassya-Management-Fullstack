"use client";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { RefreshCcw, UsersRound } from "lucide-react";

import { useState } from "react";

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
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors ${
        loading
          ? "bg-gray-400"
          : "bg-red-500 hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700"
      }`}
      onClick={handleGetUsers}
      disabled={loading}
    >
      {users ? (
        <RefreshCcw className={`w-5`} />
      ) : (
        <UsersRound className={`w-5`} />
      )}

      {users ? "Refrescar" : "Mostrar Usuarios"}
    </button>
  );
};
