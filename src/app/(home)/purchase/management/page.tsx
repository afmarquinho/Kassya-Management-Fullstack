import {
  BackButton,
  FormContainer,
  GetPurchasesButton,
  NewButton,
} from "@/components";

import PurchasesTable from "@/components/purchases/PurchasesTable";

const PurchaseManagementPage = () => {
  return (
    <>
      <div className={`flex justify-between gap-2`}>
        <div className={`flex gap-2`}>
          <GetPurchasesButton />
          <NewButton name="Nueva compra" module="purchases" />
        </div>

        <BackButton />
      </div>

      <PurchasesTable />
      <FormContainer />
    </>
  );
};
export default PurchaseManagementPage;
