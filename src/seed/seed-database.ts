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
} from "./data";

async function main() {
  try {
    await prisma.purchaseNote.deleteMany();
    await prisma.purchaseItem.deleteMany();
    await prisma.product.deleteMany();
    await prisma.purchase.deleteMany();
    await prisma.category.deleteMany();
    await prisma.supplier.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.user.deleteMany();

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
