import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/providers/themeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <>
            {children}
            <Toaster position="top-right" closeButton />
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}
