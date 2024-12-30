import { motion } from "framer-motion";
import { Ban } from "lucide-react";

type Props = {
  dispRequest: any | null;
  product: string;
  setDispathRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DispatchConfirmation = ({
  dispRequest,
  product,
  setDispathRequest,
}: Props) => {
  const handleCancel = () => {
    setDispathRequest(false);
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

      <div className={`flex flex-col md:flex-row gap-5`}>

        <p className={`font-semibold text-base`}>
          Producto: <span className={`italic font-normal`}>{product}</span>
        </p>
        <div>
          <p className={`font-semibold`}>
            Cantidad a despachar:{" "}
            <span className={`italic font-normal`}>{dispRequest.cantidad}</span>
          </p>
          <p className={`font-semibold`}>
            Fecha:{" "}
            <span className={`italic font-normal`}>{dispRequest.date}</span>
          </p>
          <p className={`font-semibold`}>
            Área:{" "}
            <span className={`italic font-normal`}>{dispRequest.area}</span>
          </p>
          <p className={`font-semibold`}>
            Solicitante:{" "}
            <span className={`italic font-normal`}>{dispRequest.usuario}</span>
          </p>
        </div>
      </div>
      <button
        className={`flex justify-center items-center p-2 text-slate-200 gap-1 mt-5 bg-red-500 dark:bg-red-700 h-full rounded hover:bg-red-600 dark:hover:bg-red-500 transition-colors duration-300 ease-in-out`}
        onClick={handleCancel}
      >
        <Ban className={`w-5`} />
        Cancelar
      </button>
    </motion.div>
    // </motion.div>
  );
};
