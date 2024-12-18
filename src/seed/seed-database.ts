import { prisma } from "../lib/db";
import {
  customers,
  purchaseItems,
  purchases,
  suppliers,
  users,
  categories,
  purchasesNotes,
  products,
  provisionRequests,
} from "./data";


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
      data: users,
    });
    await prisma.customer.createMany({
      data: customers,
    });
    await prisma.supplier.createMany({
      data: suppliers,
    });
    await prisma.category.createMany({
      data: categories,
    });
    await prisma.purchase.createMany({
      data: purchases,
    });
    await prisma.product.createMany({
      data: products,
    });
    await prisma.purchaseItem.createMany({
      data: purchaseItems,
    });
    await prisma.purchaseNote.createMany({
      data: purchasesNotes,
    });
    await prisma.provisionRequest.createMany({
      data: provisionRequests,
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
