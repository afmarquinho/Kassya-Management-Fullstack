import {
  Footer,
  Sidebar,
  Title,
  ToastNotification,
  TopMenu,
} from "@/components";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-screen w-full overflow-hidden gap-3">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden gap-3 me-3 ms-3 md:ms-0">
          <TopMenu />
          <main className="flex-1 space-y-3">
            <Title />
            {children}
          </main>
          <Footer />
        </div>
      </div>
      <ToastNotification />
    </>
  );
}
