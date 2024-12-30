import { Prisma } from "@prisma/client";

export type StockMovement = Prisma.StockMovementGetPayload<{
  select: {
    Movement_id: true;
    Movement_type: true;
    Movement_qty: true;
    Movement_reason: true;
    Movement_date: true;
    Movement_productId: true;
    Movement_destination: true;
    Movement_relatedId: true;
    BatchInventory: {
      select: {
        Batch_id: true;
        Batch_code: true;
      };
    };
    User: {
      select: {
        User_surname: true;
        User_name: true;
      };
    };
  };
}>;
