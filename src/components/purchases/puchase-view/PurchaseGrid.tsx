import { PurchaseDetails } from "@/interfaces";
import { PurchaseItemCard } from "./PurchaseItemCard";
import { ProcessPurchaseButton } from "../ProcessPurchaseButton";
import { DeletePurchaseButton } from "../DeletePurchaseButton";

type Props = {
  purchaseDetails: PurchaseDetails | null;
};

export const PurchaseGrid = ({ purchaseDetails }: Props) => {
  return (
    <>
      <h2 className={`font-bold text-center text-base uppercase pb`}>Items</h2>
      {purchaseDetails?.PurchaseItem.length === 0 ? (
        <p className={`text-base italic font-semibold`}>
          Esta órden aún no tiene productos asociados
        </p>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}>
          {purchaseDetails?.PurchaseItem.map((item) => (
            <PurchaseItemCard
              key={item.Item_id}
              item={item}
              purchaseSatus={purchaseDetails.Purchase_processed}
            />
          ))}
        </div>
      )}
      {!purchaseDetails?.Purchase_processed && (
        <div
          className={`w-full bg-red-600 bg-opacity-10 border-4 border-red-600 dark:border-red-300 p-5 `}
        >
          <p
            className={`text-red-600 dark:text-red-200 font-bold uppercase mb-2`}
          >
            Zona de Peligro
          </p>
          <div className={`flex gap-5`}>
            <ProcessPurchaseButton purchaseDetails={purchaseDetails} />
            <DeletePurchaseButton purchaseDetails={purchaseDetails} />
          </div>
        </div>
      )}
    </>
  );
};
