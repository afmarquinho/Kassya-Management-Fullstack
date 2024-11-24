"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.png";

//TODO: Revisar que no puedo hacer el Login.module.css

import { AtSign, KeyRound } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard");
  };
  return (
    <div
      className={`bg-login bg-login w-full h-screen bg-cover bg-top relative flex flex-col`}
    >
      <div className={`absolute inset-0 bg-black bg-opacity-80`}/>
      <h1
        className={`text-red-600 font-black text-2xl md:text-5xl lg:text-7xl relative z-20`}
      >
        Kassya
      </h1>
      <div className={`relative z-20 flex justify-center items-center flex-1`}>
        <div
          className={`absolute w-32 h-32 z-10 bg-gray-500 top-[5rem] md:top-[1rem] p-4 rounded-full`}
        >
          <div
            className={`bg-white h-full w-full rounded-full flex justify-center items-center`}
          >
            <div className={`w-16 relative`}>
              <Image src={logo} width={100} height={100} alt="Kassya" />
            </div>
          </div>
        </div>
        <form
          className={`bg-gray-500 px-6 pb-6 pt-16 w-11/12 max-w-[350px]`}
          onSubmit={handleSubmit}
        >
          <h2 className={`text-center text-white font-light text-xl mb-2`}>
            Mi cuenta
          </h2>
          <div className={`text-base p-6 bg-blue-300 rounded-md`}>
            <h3 className={`text-red-600 font-bold text-center`}>Login</h3>
            <div className={`mb-4`}>
              <div className={`flex gap-1 justify-start items-center mb-2`}>
                <AtSign className={`text-red-600`} />
                <label className={`text-slate-800 dark:text-slate-800`}>
                  Correo
                </label>
              </div>
              <input
                type="text"
                className={`w-full p-2 focus:outline-none bg-gray-100`}
              />
            </div>
            <div className={`mb-5`}>
              <div className={`flex gap-1 justify-start items-center mb-2`}>
                <KeyRound className={`text-red-600`} />
                <label className={`text-slate-800 dark:text-slate-800`}>
                  Contraseña
                </label>
              </div>
              <input
                type="password"
                className={`w-full p-2 focus:outline-none bg-gray-100`}
              />
            </div>
            <div className={`mb-`}>
              <input
                type="submit"
                className={`w-full p-2 focus:outline-none bg-red-600 hover:bg-red-700 text-white transition cursor-pointer text-center font-semibold`}
                value={"Iniciar Sesión"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
