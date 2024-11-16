

import { MenuButton } from "@/components";
import { BriefcaseBusiness, ChartNoAxesCombined } from "lucide-react";

const PurchaseOrderPage = () => {
  return (
    <div className={`flex gap-5`}>
      <MenuButton href="purchase/analytics" icon={ChartNoAxesCombined} name="Analytics" />
      <MenuButton href="purchase/management" icon={BriefcaseBusiness} name="Management"/>
    </div>
  );
};
export default PurchaseOrderPage;
