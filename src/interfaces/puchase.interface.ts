import { Purchase } from "@prisma/client";
import { PurchaseItems } from "./purchaseItem.interfaces";


export type Purchases = Omit<Purchase, "Purchase_totalAmount"> & {
  Purchase_totalAmount: string;
  Supplier: {
    Supplier_name: string;
  };
};



export type PurchaseDetails = Omit<Purchase, "Purchase_totalAmount"> & {
  Purchase_totalAmount: string;
  Supplier: {
    Supplier_nit: number;
    Supplier_contactInfo: string;
    Supplier_email: string;
    Supplier_phoneNumber: string;
    Supplier_name: string;
  };
  User: {
    User_name: string;
    User_surname: string;
  };
  PurchaseItem: PurchaseItems[];
};
