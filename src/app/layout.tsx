import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/contexts/SidebarContext";

export const metadata: Metadata = {
  title: "F1 Race Times | Schedule Dashboard",
  description: "Formula 1 race schedule, session times and results",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased isolate font-sans">
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}
