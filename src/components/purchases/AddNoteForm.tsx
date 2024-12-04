"use client";

import { addNote } from "@/server-actions";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  purchaseId: number;
};
export const AddNoteForm = ({ purchaseId }: Props) => {
  const router = useRouter();
  const [note, setNote] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* Validaciones

    if (!note.trim()) {
      toast.error("Por favor escribe una nota antes de enviarla.");
      return;
    }
    if (note.length > 100) {
      toast.error("La nota no puede exceder los 100 caracteres.");
      return;
    }

    const { ok, data, message } = await addNote({ purchaseId, note });
    if (ok && data) {
      router.refresh();
      return;
    }

    toast.error(message);
  };

  return (
    <form className="flex-1" onSubmit={handleSubmit}>
      <textarea
        name=""
        id=""
        className="w-full h-20 outline-none rounded-lg bg-white dark:bg-slate-900 resize-none p-2 shadow-md focus:ring-2 focus:ring-teal-600"
        placeholder="Escribe tu comentario, max 100 carctácteres."
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        type="submit"
        className="bg-teal-600 dark:bg-teal-700 rounded-full text-white p-2 my-2 hover:bg-teal-500 dark:hover:bg-teal-500 shadow-md transition-all"
      >
        <SendHorizontal />
      </button>
    </form>
  );
};
