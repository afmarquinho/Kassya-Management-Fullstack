import { InvetoryMenu } from "@/components";

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
