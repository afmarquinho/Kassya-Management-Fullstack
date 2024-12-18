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
            Category_id: true;
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
    Product_active: true;
    Product_createdAt: true;
    Category: {
      select: {
        Category_name: true;
      };
    };
  };
}>;

//*TYPES PARA LA PAGINA DE DETALLES DEL PROUCTO EN EL INVENTARIO

export type ProductDetailsType = {
  id: number;
  name: string;
  reference: string;
  stockQuantity: number;
  quantityDispatched: number;
  reorderPoint: number;
  location: string;
  active: boolean;
  createdAt: Date; // Prisma DateTime mapeado a Date de TS.
  category: string;
};

type PurchaseNoteType = {
  usser_name: string;
  usser_surname: string;
  content: string;
  createdAt: Date; // Prisma DateTime mapeado a Date.
};

type SupplierType = {
  id: number;
  name: string;
  email: string;
};

type UserType = {
  id: number;
  name: string;
};

type PurchaseType = {
  id: number;
  description: string;
  date: Date; // Prisma DateTime mapeado a Date.
  supplier: SupplierType;
  user: UserType;
  notes: PurchaseNoteType[];
};

type PurchaseItemType = {
  itemId: number;
  name: string;
  qtyOrdered: number;
  location: string;
  status: string;
  purchase: PurchaseType;
};

//*TYPES PARA MOSTRAR EN PAGINA DE PRODUCTO EL ABASTECIMIENTO DEL ITEM.
export type purchaseItemsType = PurchaseItemType[];

//*Interfaz que se usa en el server action para crear o actualizar productos en el inventario: registerProductWithMovement y en la función para crear o actualizar inventario en el front
export interface ProductData {
  Product_name: string;
  Product_ref: string;
  Product_qtyReceive?: number;
  Product_location?: string;
  Product_lotNumber?: string;
  Product_categoryId: number;
  Item_id: number;
}
