import { BackButton, GetPurchasesButton } from "@/components";
import NewPurchaseButton from "@/components/purchases/NewPurchaseButton";
import PurchasesTable from "@/components/purchases/PurchasesTable";

const PurchaseManagementPage = () => {
  return (
    <>
      <div className={`flex justify-between gap-5`}>
        <div className={`flex gap-5`}>
          <GetPurchasesButton />
          <NewPurchaseButton />
        </div>

        <BackButton />
      </div>
      
        <PurchasesTable />
      
    </>
  );
};
export default PurchaseManagementPage;
