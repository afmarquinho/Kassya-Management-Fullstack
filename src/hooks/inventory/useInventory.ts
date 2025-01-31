import { ProductData } from "@/interfaces";
import axios from "axios";

const API = axios.create({ baseURL: "/api/inventory/purchases" });

export const useInventory = () => {
  const getProcessedPurchases = async () => {
    try {
      const { data } = await API.get("/");
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Check if error in instance of AxiosError or Error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al hacer la solicitud de las compras";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  const updatePurchaseItemStock = async (
    purchaseId: number,
    productData: ProductData,
    userId: number
  ) => {
  
    try {
      const { data } = await API.put(`/${purchaseId}`, { productData, userId });
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesar la entrada del producto:", error);

      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al hacer la solicitud de entrada del producto";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  return { getProcessedPurchases, updatePurchaseItemStock };
};
