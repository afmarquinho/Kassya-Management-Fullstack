
import { motion } from "framer-motion";

type Props = {
  setDispRequest: React.Dispatch<React.SetStateAction<T>>;
  setDispathRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DispatchRequestTable = ({
  setDispRequest,
  setDispathRequest,
}: Props) => {
  const request = [
    {
      cantidad: 1,
      date: "20/12/2024",
      area: "Ventas",
      usuario: "María Smith",
    },
    {
      cantidad: 5,
      date: "25/12/2024",
      area: "Ventas",
      usuario: "John Doe",
    },
    {
      cantidad: 10,
      date: "23/12/2024",
      area: "compras",
      usuario: "John Doe",
    },
  ];

  const handleDispatchItem = (item) => {
    setDispathRequest(true)
    setDispRequest(item);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`bg-white dark:bg-slate-800 p-5 w-full rounded-md shadow-lg`}
    >
      <h3 className={`italic font-medium text-base mb-5`}>
        Solicitudes de Despachos
      </h3>
      <div className="bg-white dark:bg-slate-800 p-4 shadow rounded">
        <table className="min-w-full border-collapse border border-gray-200 dark:border-slate-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-700">
              <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Item
              </th>
              <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Cantidad
              </th>
              <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Fecha
              </th>
              <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Área
              </th>
              <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Usuario
              </th>
              <th className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {request.map((item, i) => (
              <tr className="hover:bg-blue-200 dark:hover:bg-slate-600" key={i}>
                <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                  {i + 1}
                </td>
                <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                  {item.cantidad}
                </td>
                <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                  {item.date}
                </td>
                <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                  {item.area}
                </td>
                <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">
                  {item.usuario}
                </td>
                <td className="border border-gray-200 dark:border-slate-600 px-4 py-2 text-sm">
                  <button
                    className="px-4 py-1 bg-gradient-to-b from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-700 hover:from-blue-500 hover:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700"
                    onClick={() => handleDispatchItem(item)}
                  >
                    Despechar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
