import { Prisma } from "@prisma/client";

export type StockMovement = Prisma.StockMovementGetPayload<{
  select: {
    Movement_date: true;
    Movement_id: true;
    Movement_lotNumber: true;
    Movement_productId: true;
    Movement_qty: true;
    Movement_reason: true;
    Movement_relatedId: true;
    Movement_type: true;
    Movement_userId: true;
    User: {
      select: {
        User_surname: true;
        User_name: true;
      };
    };
  };
}>;
