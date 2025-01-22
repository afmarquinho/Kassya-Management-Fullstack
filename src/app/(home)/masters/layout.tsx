import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMS - Terceros",
  description: "Mange your processes eficiently",
};

export default function MasterLayout({
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
