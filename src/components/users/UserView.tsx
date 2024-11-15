"use client";

import { Power, PowerOff, ShieldMinus, User } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { ActiveUserModal } from "./AcitveUserModal";

export const UserView = () => {
  const { user, activeUserModal, toggleActiveUserModal } = useUserStore();

  if (!user) {
    return (
      <div className={`text-base italic font-semibold`}>
        No has seleccionado un usuario para visualizar
      </div>
    );
  }

  return (
    <div className={`flex gap-5`}>
      {/* //*PROFILE PIC BOX */}
      <div
        className={`bg-white dark:bg-slate-900 rounded-lg h-52 w-52  flex justify-center items-center p-5 transition-colors shadow-lg`}
      >
        <div
          className={`relative w-full h-full  rounded-full flex items-center justify-center overflow-hidden`}
        >
          <User className={` w-full h-full`} />
        </div>
      </div>
      {/* //*END PROFILE PIC BOX */}

      {/* //*PROFILE INFO BOX */}
      <div
        className={`bg-white dark:bg-slate-900 rounded-lg flex-1 shadow-lg p-5 border-t-8 ${
          user.User_active ? "border-green-500" : "border-red-500"
        }`}
      >
        <table border={1}>
          <tbody className={`text-left`}>
            <tr>
              <th className={`italic`}>Cédula de Ciudadanía</th>
              <td className={`p-3`}>{user?.User_dni}</td>
            </tr>
            <tr>
              <th className={`italic`}>Nombre</th>
              <td className={`p-3`}>{user?.User_name}</td>
            </tr>
            <tr>
              <th className={`italic`}>Apellido</th>
              <td className={`p-3`}>{user?.User_surname}</td>
            </tr>
            <tr>
              <th className={`italic`}>Teléfono</th>
              <td className={`p-3`}>{user?.User_phoneNumber}</td>
            </tr>
            <tr>
              <th className={`italic`}>Dirección</th>
              <td className={`p-3`}>{user?.User_address}</td>
            </tr>
            <tr>
              <th className={`italic`}>Email</th>
              <td className={`p-3`}>{user?.User_email}</td>
            </tr>
            <tr>
              <th className={`italic`}>Rol</th>
              <td className={`p-3`}>
                {user?.User_role === "ADMIN"
                  ? "Administrador"
                  : user?.User_role === "MANAGER"
                  ? "Gerente"
                  : "Usuario"}
              </td>
            </tr>
            <tr>
              <th className={`italic`}>Estado</th>
              <td className={`p-3`}>
                <div className={`flex gap-1 items-center`}>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      user.User_active ? "bg-green-500" : "bg-red-600"
                    }`}
                  ></div>{" "}
                  {user.User_active ? "Activo" : "No Activo"}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={`flex gap-5`}>
          <button
            className={`bg-gradient-to-b flex justify-center items-center gap-2 shadow-md text-white py-1 px-3 rounded-lg mt-5 transition-colors duration-300 ${
              user.User_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
            onClick={toggleActiveUserModal}
          >
            {user.User_active ? <PowerOff /> : <Power />}
            {user.User_active ? "Desactivar" : "Activar"}
          </button>

          <button
            className={`bg-gradient-to-b flex justify-center items-center gap-2 shadow-md text-white py-1 px-3 rounded-lg mt-5 from-blue-600 to-indigo-700 hover:blue-700 hover:to-indigo-800 transition-colors duration-300`}
            // onClick={toggleActiveUserModal}
          >
            <ShieldMinus /> Cambiar Contraseña
          </button>
        </div>
      </div>
      {activeUserModal && <ActiveUserModal />}
    </div>
  );
};
