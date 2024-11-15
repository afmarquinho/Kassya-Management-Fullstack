import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = { href: string; icon: LucideIcon; name: string };
export const MenuButton = ({ href, icon: Icon, name }: Props) => {
  return (
    <div className={`group`}>
      <div
        className={`bg-white dark:bg-slate-800 p-4 shadow-lg rounded-lg `}
      >
        <Link
          href={href}
          className={`flex flex-col gap-1 justify-center items-center  rounded-md  text-white transition-colors shadow-lg bg-gradient-to-b from-indigo-600  to-indigo-600 dark:from-red-600  dark:to-red-600 p-5         
         w-40 h-40 text-base font-medium`}
        >
          <Icon className={`w-full h-full group-hover:text-yellow-500 dark: dark:group-hover:text-red-950 `} />
          {name}
        </Link>
      </div>
    </div>
  );
};
