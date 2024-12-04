import { Ban } from "lucide-react";
import { UserForm } from "./UserForm";
import { useUserStore } from "@/store/userStore";

export const UserModal = () => {
  const { toggleUsersModal, cleanUser } = useUserStore();

  const handleUser = () => {
    toggleUsersModal();
    cleanUser();
  };
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-start md:items-center overflow-auto pt-5 md:pt-0 backdrop-blur-[1px]`}
    >
      <div className={`bg-white dark:bg-slate-800 p-5 w-11/12 max-w-[800px]`}>
        <UserForm />
        <button
          className={`flex justify-center items-center p-2 text-white gap-1 my-1 bg-gradient-to-b from-red-600 to-red-700 rounded-md`}
          onClick={handleUser}
        >
          <Ban className={`w-5`} />
          Cancelar
        </button>
      </div>
    </div>
  );
};
