import { BackButton, PurchaseView } from "@/components";

interface Props {
  params: {
    purchaseId: string;
  };
}

const PurchasePage = async ({ params }: Props) => {
  const {purchaseId} = await params
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <PurchaseView purchaseId={parseInt(purchaseId, 10)}/> 
    </>
  );
};
export default PurchasePage;
