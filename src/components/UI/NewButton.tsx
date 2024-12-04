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
  const { toggleSupplierModal } = useSupplierStore();
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
      className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-white transition-colors text-xs bg-gradient-to-b from-blue-500 to-indigo-700 hover:from-indigo-700 hover:to-indigo-700 dark:from-blue-700 dark:to-indigo-800 dark:hover:from-indigo-600 dark:hover:to-indigo-600`}
      onClick={onNew}
    >
      {icons[module]}
      {name}
    </button>
  );
};
