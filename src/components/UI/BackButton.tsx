"use client";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-white  transition-colors text-xs bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-700 dark:from-amber-800 dark:to-amber-900 dark:hover:from-amber-700 dark:hover:to-amber-700 `}
    >
      <Undo2 className={`w-5`} />
      Atrás
    </button>
  );
};
