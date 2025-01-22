import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMS - Compras",
  description: "Mange your processes eficiently",
};

export default function PurchaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
