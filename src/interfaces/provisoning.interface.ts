import { Prisma } from "@prisma/client";

export type ProvisionRequest = Prisma.ProvisionRequestGetPayload<{
  select: {
    Prov_id: true;
    Prov_desc: true;
    Prov_productId: true;
    Prov_quantity: true;
    Prov_requestedBy: true;
    Prov_status: true;
    createdAt: true;
    User: {
      select: {
        User_name: true;
        User_surname: true;
      };
    };
  };
}>;
