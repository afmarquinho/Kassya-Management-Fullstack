import { Prisma } from "@prisma/client";

export type StockEntry = Prisma.PurchaseGetPayload<{
  select: {
    Purchase_id: true;
    Purchase_date: true;
    Purchase_description: true;
    Purchase_dueDate: true;
    Purchase_processed: true;
    Purchase_close: true;
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

export type InventoryTable = Prisma.ProductGetPayload<{
  select: {
    Product_id: true;
    Product_name: true;
    Product_ref: true;
    Product_stockQty: true;
    Product_reorderPoint: true;
    Product_location: true;
    Product_lotNumber: true;
    Product_active: true;
    Product_createdAt: true;
    Category: {
      select: {
        Category_name: true;
      };
    };
  };
}>;
