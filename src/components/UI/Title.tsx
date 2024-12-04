"use client";
import { usePathname } from "next/navigation";




export const Title = () => {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/dashboard": "Análisis",
    "/purchase": "Módulo de Compras",
    "/inventory": "Módulo de Inventarios",
    "/masters": "Módulo de Terceros: Proveedores - Clientes",
    "/users": "Módulo de Usuarios",
  };

  const title = Object.keys(titles).find((key) => pathname.startsWith(key))
    ? titles[Object.keys(titles).find((key) => pathname.startsWith(key))!]
    : "Página No Encontrada";

  return (
    <>
      {/* <Head>
        <title>{title}</title>
      </Head>  */}
      <h1 className={`italic font-bold uppercase`}>{title}</h1>
    </>
  );
};
