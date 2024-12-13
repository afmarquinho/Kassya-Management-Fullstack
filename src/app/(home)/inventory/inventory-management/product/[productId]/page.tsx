import {
  InventoryProductGrid,
  InventoryProductItems,
  ProvisionRequest,
} from "@/components";
import { getProductDetails } from "@/server-actions";

type Props = {
  params: {
    productId: string;
  };
};

const InventoryProductPage = async ({ params }: Props) => {
  const { productId } = await params;
  const productIdInt = parseInt(productId, 10);
  const { ok, data, message } = await getProductDetails(productIdInt);

  if (!ok || !data) {
    return <div>{message}</div>;
  }

  return (
    <div className="p-5">
      <h2
        className="text-2xl font-bold mb-5 bg-white dark:bg-slate-800 p-4
       rounded shadow-md"
      >
        Producto: {data.name}
      </h2>
      <InventoryProductGrid data={data} />
      <ProvisionRequest productId={productIdInt} />
      <h3 className={`py-4 font-medium`}>Historial de Provisión</h3>
      <InventoryProductItems />
    </div>
  );
};

export default InventoryProductPage;
