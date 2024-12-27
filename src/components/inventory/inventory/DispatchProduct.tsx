"use client";

import { DispatchModal } from "./DispatchModal";
import { useState } from "react";
import { DispatchRequestTable } from "./DispatchRequestTable";

type Props = {
  product: string;
};

export const DispatchProduct = ({ product }: Props) => {
  const [dispRequest, setDispRequest] = useState(null);
  const [dispathRequest, setDispathRequest] = useState<boolean>(false);

  return (
    <div className={`mt-8`}>
      <h2 className="text-lg font-semibold mb-5">Depachos - Entregas</h2>
      {dispathRequest ? (
        <DispatchModal
          dispRequest={dispRequest}
          product={product}
          setDispathRequest={setDispathRequest}
        />
      ) : (
        <DispatchRequestTable
          setDispRequest={setDispRequest}
          setDispathRequest={setDispathRequest}
        />
      )}
    </div>
  );
};
