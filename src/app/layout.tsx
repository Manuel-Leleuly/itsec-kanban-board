import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/queryProvider";
import { ProgressAppProvider } from "@/providers/progressAppProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ITSEC Kanban Board",
  description: "A Kanban Board for ITSEC FE Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", inter.className)}>
        <ProgressAppProvider>
          <QueryProvider>
            {children}
            <Toaster position="bottom-right" closeButton />
          </QueryProvider>
        </ProgressAppProvider>
      </body>
    </html>
  );
}
