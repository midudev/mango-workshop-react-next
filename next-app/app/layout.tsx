import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const InterFont = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: "Mango Workshop & midu",
  description: "Hermosa página web creada con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${InterFont.variable} antialiased`}
      >
        <header className="container max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button size='icon' asChild>
            <Link href="/">
              <ShoppingBagIcon />
            </Link>
          </Button>
        </header>

        {children}
      </body>
    </html>
  );
}
