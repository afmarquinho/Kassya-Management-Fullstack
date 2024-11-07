import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className={`bg-slate-300 dark:bg-slate-800 transition-colors`}>
      <div className={`hidden md:flex justify-center items-center gap-2`}>
        <div className={`w-6 h-7 relative`}>
          <Image
            src={logo}
            alt="Kassya"
            width={100}
            height={100}
            className={``}
          />
        </div>
        <span className={`text-red-500 font-bold text-xl`}>Kassya</span>
      </div>

      <div className="w-full">
        <div
          className={`flex flex-col md:flex-row gap-0 md:gap-5 w-full justify-center items-center`}
        >
          <p>Desarrollado por Kassya Dev</p>
          <p>&copy; 2.024. Todos los derechos reservados.</p>
        </div>
        <p
          className={`text-center bg-slate-200 dark:bg-slate-900 hidden md:block transition-all`}
        >
          Contacto:{" "}
          <span className={`space-x-2`}>
            <Link href="mailto:fernandez9029@gmail.com">
              fernandez9029@gmail.com
            </Link>
            <Link href="tel:+573028189863">+57 302 818 9863</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};
