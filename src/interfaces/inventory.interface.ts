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



//*TYPES PARA LA PAGINA DE DETALLES DEL PROUCTO EN EL INVENTARIO

// Nota de compra
interface PurchaseNote {
  userName: string;
  userSurname: string;
  content: string;
  createdAt: string;
}

// Usuario asociado a la compra
interface PurchaseUser {
  id: number;
  name: string;
}

// Proveedor asociado a la compra
interface Supplier {
  id: number;
  name: string;
  email: string;
}

// Detalles de la compra
interface PurchaseDetails {
  id: number;
  description: string;
  date: string;
  supplier: Supplier;
  user: PurchaseUser;
  notes: PurchaseNote[];
}

// Elementos de la compra
interface PurchaseItem {
  itemId: number;
  name: string;
  qtyOrdered: number;
  location: string | null;
  status: string;
  purchase: PurchaseDetails;
}

// Detalles del producto
interface ProductDetails {
  id: number;
  name: string;
  reference: string;
  stockQuantity: number;
  quantityDispatched: number;
  reorderPoint: number;
  location: string | null;
  lotNumber: string | null;
  active: boolean;
  createdAt: string;
  expiryDate: string | null;
  category: string;
}

// Estado del producto
export interface ProductState {
  product: ProductDetails | null;
  purchaseItems: PurchaseItem[] | null;
}

