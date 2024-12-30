import {
  DispatchProduct,
  InventoryProductGrid,
  InventoryProductItems,
  ItemByBatch,
  MovementsDetails,
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
    <div className="p-5 space-y-5">
      <h2 className="text-2xl font-bold">Producto: {data.name}</h2>
      <InventoryProductGrid data={data} />
      <DispatchProduct product={data.name} />
      <ProvisionRequest productId={productIdInt} />
      <MovementsDetails productId={productIdInt} />
      <ItemByBatch />
      <InventoryProductItems />
    </div>
  );
};

export default InventoryProductPage;
