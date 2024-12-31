"use client";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`p-2 gap-2 flex justify-center items-center transition-all duration-300 rounded text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-gray-600`}
    >
      <Undo2 className={`w-5`} />
      Atrás
    </button>
  );
};
