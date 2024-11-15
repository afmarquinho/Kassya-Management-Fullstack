"use client";
import { useCustomerStore, useSupplierStore } from "@/store";
import { useUserStore } from "@/store/userStore";
import { Plus } from "lucide-react";

type Props = { name: string; module: "users" | "suppliers" | "customers" };

export const NewButton = ({ name, module }: Props) => {
  const { toggleUsersModal } = useUserStore();
  const { toggleSupplierModal } = useSupplierStore();
  const { toggleCustomerModal } = useCustomerStore();

  const onNew = () => {
    switch (module) {
      case "users":
        toggleUsersModal();
        break;
      case "suppliers":
        toggleSupplierModal();
        break;
      case "customers":
        toggleCustomerModal()
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
      <Plus className={`w-5`} />
      {name}
    </button>
  );
};
