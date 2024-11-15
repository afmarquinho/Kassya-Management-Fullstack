import { prisma } from "../lib/db";
import { customers } from "./data/customers";
// import { devolutions } from "./data/devolutions";
// import { purchases } from "./data/purchases";
// import { saleDetails } from "./data/saleDetails";
// import { sales } from "./data/sales";
import { suppliers } from "./data/suppliers";
import { users } from "./data/users";
// import { warranties } from "./data/warranties";

async function main() {
  // await prisma.warranty.deleteMany();
  // await prisma.devolution.deleteMany();
  // await prisma.purchase.deleteMany();
  // await prisma.sale.deleteMany();
  // await prisma.saleDetails.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  try {
    await prisma.user.createMany({
      data: users,
    });
    await prisma.customer.createMany({
      data: customers,
    });
    await prisma.supplier.createMany({
      data: suppliers,
    });
    // await prisma.purchase.createMany({
    //   data: purchases,
    // });
    // await prisma.product.createMany({
    //   data: products,
    // });
    // await prisma.sale.createMany({
    //   data: sales,
    // });
    // await prisma.saleDetails.createMany({
    //   data: saleDetails,
    // });
    // await prisma.devolution.createMany({
    //   data: devolutions,
    // });
    // await prisma.warranty.createMany({
    //   data: warranties,
    // });
  } catch (error) {
    console.log(error);
  }
}

// // Función anónima auto invocada
// (() => {
//   if (process.env.NODE_ENV === "production") return;

//   main();
// })();

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

