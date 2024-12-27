import { motion } from "framer-motion";
import { Ban } from "lucide-react";

type Props = {
  dispRequest: any | null;
  product: string;
  setDispathRequest: React.Dispatch<React.SetStateAction<boolean>>
};

export const DispatchModal = ({ dispRequest, product, setDispathRequest }: Props) => {
  

  const handleCancel = () => {
    setDispathRequest(false)
  };

  return (
    // // <motion.div
    // //   initial={{ opacity: 0, scale: 0.9 }}
    // //   animate={{ opacity: 1, scale: 1 }}
    // //   exit={{ opacity: 0, scale: 0.9 }}
    // //   transition={{ duration: 0.3, ease: "easeInOut" }}
    // //   className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-start md:items-center overflow-auto pt-5 md:pt-0 backdrop-blur-[1px]`}
    // // >
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`bg-white dark:bg-slate-800 p-5 w-full rounded-md shadow-lg`}
    >
      <h3 className={`font-bold text-center uppercase`}>
        Confirmar Despacho y Salida de Producto de Inventario
      </h3>
      <h4 className={`font-semibold`}>Solicitud</h4>
      <ol>
        <li className={`font-semibold`}>
          Producto: <span className={`italic font-normal`}>{product}</span>
        </li>
        <li className={`font-semibold`}>
          Cantidad a despachar:{" "}
          <span className={`italic font-normal`}>{dispRequest.cantidad}</span>
        </li>
        <li className={`font-semibold`}>
          Fecha:{" "}
          <span className={`italic font-normal`}>{dispRequest.date}</span>
        </li>
        <li className={`font-semibold`}>
          Área: <span className={`italic font-normal`}>{dispRequest.area}</span>
        </li>
        <li className={`font-semibold`}>
          Solicitante:{" "}
          <span className={`italic font-normal`}>{dispRequest.usuario}</span>
        </li>
      </ol>
      <button
        className={`flex justify-center items-center p-2 text-white gap-1 my-1 bg-gradient-to-b from-red-600 to-red-700 rounded-md`}
        onClick={handleCancel}
      >
        <Ban className={`w-5`} />
        Cancelar
      </button>
    </motion.div>
    // </motion.div>
  );
};
