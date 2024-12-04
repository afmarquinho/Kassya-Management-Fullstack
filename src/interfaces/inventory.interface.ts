import { Prisma } from "@prisma/client";

export type StockEntry = Prisma.PurchaseGetPayload<{
  select: {
    Purchase_date: true;
    Purchase_dueDate: true;
    Purchase_description: true;
    Supplier: {
      select: {
        Supplier_name: true;
        Supplier_city: true;
        Supplier_contactInfo: true;
        Supplier_email: true;
        Supplier_phoneNumber: true;
      };
    };
    PurchaseItem: {
      select: {
        Item_id: true;
        Item_description: true;
        Item_name: true;
        Item_qtyOrdered: true;
        Item_location: true;
        Item_qtyReceived: true;
        Item_ref: true;
        Item_status: true;
        Category: {
          select: {
            Category_name: true;
          };
        };
      };
    };
    PurchaseNote: {
      select: {
        Note_id: true;
        Note_content: true;
        Note_createdAt: true;
        User: {
          select: {
            User_name: true;
            User_surname: true;
          };
        };
      };
    };
  };
}>;
