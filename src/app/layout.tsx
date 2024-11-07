import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kassya Management System",
  description: "Mange your processes eficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={``}>
      <body
        className={`min-h-screen w-full ${geistSans.variable} ${geistMono.variable} text-sm bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
