import { InvetoryMenu } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMS - Inventarios",
  description: "Mange your processes eficiently",
};

export default function InventoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col h-full">
        <InvetoryMenu />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
