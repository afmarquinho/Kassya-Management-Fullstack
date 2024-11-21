"use client";

import { useCustomerStore, usePurchaseStore, useSupplierStore } from "@/store";
import { useUserStore } from "@/store/userStore";
import {
  ArchiveRestore,
  BaggageClaim,
  PackagePlus,
  UserRoundPlus,
} from "lucide-react";

type Props = {
  name: string;
  module: "users" | "suppliers" | "customers" | "purchases";
};

const icons = {
  users: <UserRoundPlus className={`w-5`} />,
  suppliers: <PackagePlus className={`w-5`} />,
  customers: <BaggageClaim className={`w-5`} />,
  purchases: <ArchiveRestore className={`w-5`} />,
};



export const NewButton = ({ name, module }: Props) => {
  const { toggleUsersModal } = useUserStore();
  const { toggleSupplierModal} = useSupplierStore();
  const { toggleCustomerModal } = useCustomerStore();
  const { togglePurchaseModal } = usePurchaseStore();

  const onNew = () => {
    switch (module) {
      case "users":
        toggleUsersModal();
        break;
      case "suppliers":
        toggleSupplierModal();
        break;
      case "customers":
        toggleCustomerModal();
        break;
      case "purchases":
        togglePurchaseModal();

        break;

      default:
        break;
    }
  };

  return (
    <button
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-all bg-blue-500 hover:bg-blue-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 text-xs`}
      onClick={onNew}
    >
      {icons[module]}
      {name}
    </button>
  );
};
