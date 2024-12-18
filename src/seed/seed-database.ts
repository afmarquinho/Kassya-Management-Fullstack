import { prisma } from "../lib/db";
import { Category } from "./data/Category";
import { Customer } from "./data/Customer";
import { Product } from "./data/Product";
import { ProvisionRequest } from "./data/ProvisionRequest";
import { Purchase } from "./data/Purchase";
import { PurchaseItem } from "./data/PurchaseItem";
import { PurchaseNote } from "./data/PurchaseNote";
import { StockMovement } from "./data/StockMovement";
import { Supplier } from "./data/Supplier";
import { User } from "./data/User";


async function main() {
  try {
    // 1. Eliminar registros de tablas dependientes
    await prisma.stockMovement.deleteMany();
    await prisma.provisionRequest.deleteMany();
    await prisma.purchaseNote.deleteMany();
    await prisma.purchaseItem.deleteMany();

    // 2. Eliminar registros de tablas relacionadas con otras
    await prisma.product.deleteMany();
    await prisma.purchase.deleteMany();

    // 3. Eliminar registros de tablas intermedias o independientes
    await prisma.category.deleteMany();
    await prisma.supplier.deleteMany();
    await prisma.customer.deleteMany();

    // 4. Finalmente, eliminar registros de la tabla principal
    await prisma.user.deleteMany();

    // 5. Insertar datos en el orden correcto
    await prisma.user.createMany({
      data: User,
    });
    await prisma.customer.createMany({
      data: Customer,
    });
    await prisma.supplier.createMany({
      data: Supplier,
    });
    await prisma.category.createMany({
      data:Category,
    });
    await prisma.purchase.createMany({
      data: Purchase,
    });
     await prisma.product.createMany({
       data: Product,
     });
    await prisma.purchaseItem.createMany({
      data: PurchaseItem,
    });
    await prisma.purchaseNote.createMany({
      data: PurchaseNote,
    });
    await prisma.provisionRequest.createMany({
     data: ProvisionRequest,
    });
    await prisma.stockMovement.createMany({
     data: StockMovement,
    });
    
  } catch (error) {
    console.log(error);
  }

}

// // Función anónima auto invocada
(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();

// (() => {
//   main()
//     .then(async () => {
//       await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//       console.error(e);
//       await prisma.$disconnect();
//       process.exit(1);
//     });
// })();
