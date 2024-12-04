

import { MenuButton } from "@/components";
import { BriefcaseBusiness, ChartNoAxesCombined } from "lucide-react";

const PurchaseOrderPage = () => {
  return (
    <div>
    
    <div className={`flex gap-5`}>
      <MenuButton href="purchase/analytics" icon={ChartNoAxesCombined} name="Análisis" />
      <MenuButton href="purchase/management" icon={BriefcaseBusiness} name="Gestión"/>
    </div>
    </div>
  );
};
export default PurchaseOrderPage;
