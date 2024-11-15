"use client";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-all bg-orange-600 hover:bg-orange-700 dark:bg-orange-800 dark:hover:bg-orange-700`}
    >
      <Undo2 className={`w-5`} />
      Atrás
    </button>
  );
};