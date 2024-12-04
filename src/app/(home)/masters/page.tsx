import { MenuButton } from "@/components";
import { HandCoins, Truck } from "lucide-react";

const MastersPage = () => {
  return (
    <div className={`flex gap-5`}>
      <MenuButton href="masters/suppliers" icon={Truck} name="Proveedores" />
      <MenuButton href="masters/customers" icon={HandCoins} name="Clientes" />
    </div>
  );
};
export default MastersPage;