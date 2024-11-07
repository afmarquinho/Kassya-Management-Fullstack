import { Footer, Header, Sidebar } from "@/components";



export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 px-2 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
}