"use server";

import { prisma } from "@/lib/db";
import { Customer } from "@prisma/client";

export const getCustomers = async () => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        Customer_name: "asc",
      },
    });
    return { ok: true, data: customers };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

export const createCustomer = async (customer: unknown) => {
  console.log(customer)
  
};


export const updateCustomer = async (customer: Customer) => {
  try {
    const Updatedcustomer = await prisma.customer.update({
      where: {
        Customer_id: customer.Customer_id,
      },
      data: customer,
    });
    return { ok: true, data: Updatedcustomer };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};
