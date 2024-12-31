import { Prisma } from "@prisma/client";

export type InventoryRequestType = Prisma.InventoryRequestsGetPayload<{
  select: {
    Req_id: true;
    Req_desc: true;
    Req_depId: true;
    Req_prodId: true;
    Req_qty: true;
    Department: {
      select: {
        Dep_name: true;
      };
    };
  };
}>;
