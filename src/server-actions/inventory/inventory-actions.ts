"use server";

import { prisma } from "@/lib/db";

export const getPurchaseInventory = async (purchaseId: number) => {
  try {
    const purchases = await prisma.purchase.findUnique({
      where: {
        Purchase_id: purchaseId,
      },

      select: {
        Purchase_id: true,
        Purchase_date: true,
        Purchase_description: true,
        Purchase_dueDate: true,
        Purchase_processed: true,
        Purchase_close: true,
        Supplier: {
          select: {
            Supplier_name: true,
            Supplier_city: true,
            Supplier_contactInfo: true,
            Supplier_email: true,
            Supplier_phoneNumber: true,
          },
        },
        PurchaseItem: {
          select: {
            Item_id: true,
            Item_description: true,
            Item_name: true,
            Item_qtyOrdered: true,
            Item_location: true,
            Item_qtyReceived: true,
            Item_ref: true,
            Item_status: true,
            Category: {
              select: {
                Category_name: true,
              },
            },
          },
        },
        PurchaseNote: {
          orderBy: {
            Note_createdAt: "desc",
          },
          select: {
            Note_id: true,
            Note_content: true,
            Note_createdAt: true,
            User: {
              select: {
                User_name: true,
                User_surname: true,
              },
            },
          },
        },
      },
    });
    if (!purchases) {
      return {
        ok: false,
        data: null,
        message: "El producto no existe en la base de datos",
      };
    }

    return {
      ok: true,
      data: purchases,
      message: "Datos cargados exitosamente",
    };
  } catch (error) {
    console.error("Error al obtener las compras: ", error); // Mejor manejo del error
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        Category: {
          select: {
            Category_name: true,
          },
        },
      },
    });
    if (!products) {
      return {
        ok: false,
        message: "No hay productos en la base de datos",
        data: null,
      };
    }
    return {
      ok: true,
      message: "Productos cargados",
      data: products,
    };
  } catch (error) {
    console.error("Error al obtener las los productos: ", error); // Mejor manejo del error
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const getProductDetails = async (productId: number) => {
  try {
    const productDetails = await prisma.product.findUnique({
      where: { Product_id: productId },
      include: {
        Category: true, // Información de la categoría del producto.
        PurchaseItem: {
          include: {
            Purchase: {
              include: {
                Supplier: true, // Proveedor asociado a la orden de compra.
                User: true, // Usuario que creó la orden de compra.
                PurchaseNote: {
                  select: {
                    Note_content: true,
                    Note_createdAt: true,
                    User: {
                      select: {
                        User_name: true,
                        User_surname: true,
                      },
                    },
                  },
                }, // Notas asociadas a la compra.
              },
            },
          },
        },
      },
    });

    if (!productDetails) {
      return {
        ok: false,
        data: null,
        message: "El producto no existe en la base de datos",
      };
    }

    const product = {
      id: productDetails.Product_id,
      name: productDetails.Product_name,
      reference: productDetails.Product_ref,
      stockQuantity: productDetails.Product_stockQty,
      quantityDispatched: productDetails.Product_qtyDispatched,
      reorderPoint: productDetails.Product_reorderPoint,
      location: productDetails.Product_location,
      lotNumber: productDetails.Product_lotNumber,
      active: productDetails.Product_active,
      createdAt: productDetails.Product_createdAt,
      expiryDate: productDetails.Product_expiryDate,
      category: productDetails.Category?.Category_name || "Sin categoría",
    };

    // const purchaseItems = productDetails.PurchaseItem.map((item) => ({
    //   itemId: item.Item_id,
    //   name: item.Item_name,
    //   qtyOrdered: item.Item_qtyOrdered,
    //   location: item.Item_location,
    //   status: item.Item_status,
    //   purchase: {
    //     id: item.Purchase.Purchase_id,
    //     description: item.Purchase.Purchase_description,
    //     date: item.Purchase.Purchase_date,
    //     supplier: {
    //       id: item.Purchase.Supplier.Supplier_id,
    //       name: item.Purchase.Supplier.Supplier_name,
    //       email: item.Purchase.Supplier.Supplier_email,
    //     },
    //     user: {
    //       id: item.Purchase.User.User_id,
    //       name: `${item.Purchase.User.User_name} ${item.Purchase.User.User_surname}`,
    //     },
    //     notes: item.Purchase.PurchaseNote.map((note) => ({
    //       usser_name: note.User.User_name,
    //       usser_surname: note.User.User_surname,
    //       content: note.Note_content,
    //       createdAt: note.Note_createdAt,
    //     })),
    //   },
    // }));

    return {
      ok: true,
      data: product,
      message: "Datos cargados exitosamente",
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const getProductPurchaseDetails = async (productId: number) => {
  try {
    const productDetails = await prisma.product.findUnique({
      where: { Product_id: productId },
      select: {
        Category: true, // Información de la categoría del producto.
        PurchaseItem: {
          include: {
            Purchase: {
              include: {
                Supplier: true, // Proveedor asociado a la orden de compra.
                User: true, // Usuario que creó la orden de compra.
                PurchaseNote: {
                  select: {
                    Note_content: true,
                    Note_createdAt: true,
                    User: {
                      select: {
                        User_name: true,
                        User_surname: true,
                      },
                    },
                  },
                }, // Notas asociadas a la compra.
              },
            },
          },
        },
      },
    });

    if (!productDetails) {
      return {
        ok: false,
        data: null,
        message: "El producto no existe en la base de datos",
      };
    }

    const purchaseItems = productDetails.PurchaseItem.map((item) => ({
      itemId: item.Item_id,
      name: item.Item_name,
      qtyOrdered: item.Item_qtyOrdered,
      location: item.Item_location,
      status: item.Item_status,
      purchase: {
        id: item.Purchase.Purchase_id,
        description: item.Purchase.Purchase_description,
        date: item.Purchase.Purchase_date,
        supplier: {
          id: item.Purchase.Supplier.Supplier_id,
          name: item.Purchase.Supplier.Supplier_name,
          email: item.Purchase.Supplier.Supplier_email,
        },
        user: {
          id: item.Purchase.User.User_id,
          name: `${item.Purchase.User.User_name} ${item.Purchase.User.User_surname}`,
        },
        notes: item.Purchase.PurchaseNote.map((note) => ({
          usser_name: note.User.User_name,
          usser_surname: note.User.User_surname,
          content: note.Note_content,
          createdAt: note.Note_createdAt,
        })),
      },
    }));

    return {
      ok: true,
      data: purchaseItems,
      message: "Datos cargados exitosamente",
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
