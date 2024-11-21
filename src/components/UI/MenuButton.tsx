import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = { href: string; icon: LucideIcon; name: string };
export const MenuButton = ({ href, icon: Icon, name }: Props) => {
  return (
    <div className={`group`}>
      <div
        className={`bg-white dark:bg-slate-800 p-2 shadow-lg rounded-lg w-28 h-28 md:w-32 md:h-32`}
      >
        <Link
          href={href}
          className={`flex flex-col gap-1 justify-center items-center  rounded-md  text-white transition-colors shadow-lg bg-gradient-to-b from-indigo-600  to-indigo-600 dark:from-red-600  dark:to-red-600 p-5 w-full h-full font-medium text-xs md:text-sm`}
        >
          <Icon
            className={`w-8 md:w-full h-8 md:h-full group-hover:text-yellow-500 dark: dark:group-hover:text-red-950 `}
          />
          {name}
        </Link>
      </div>
    </div>
  );
};
