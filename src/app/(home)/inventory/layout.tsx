import { InvetoryMenu } from "@/components";

export default function InventoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className={``}>
          <InvetoryMenu />
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}
