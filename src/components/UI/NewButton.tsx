"use client";
import { useUserStore } from "@/stores/userStore";
import { UserPlus } from "lucide-react";

type Props = { name: string; module: "users" };

export const NewButton = ({ name, module }: Props) => {
  const { toggleUsersModal } = useUserStore();

  const onNew = () => {
    switch (module) {
      case "users":
        toggleUsersModal();
        break;

      default:
        break;
    }
  };

  return (
    <button
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-all bg-blue-500 hover:bg-blue-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 `}
      onClick={onNew}
    >
      <UserPlus className={`w-5`} />
      {name}
    </button>
  );
};
