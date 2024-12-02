import type { Metadata } from "next";
import Form from 'next/form'
import { Inter_Tight as Inter } from "next/font/google";
import "./globals.css";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const InterFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: "Mango Shop",
  description: "La mejor tienda del mundo. Chúpate esa Sara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${InterFont.variable} antialiased dark`}
      >
        <header className="container max-w-3xl mx-auto px-10 my-4 flex justify-between">
          <Button variant="ghost">
          <Link href="/" className="flex justify-center items-center gap-2">
            <ShoppingBagIcon />
            Mango Shop
          </Link>
          </Button>

          <Form action="/" className="flex gap-2">
            <Input name="query" placeholder="Buscar producto..." />
            <Button>Buscar</Button>
          </Form>
        </header>
  
        {children}
      </body>

    </html>
  );
}
