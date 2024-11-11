import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { name, description } from "./package";

const font = Inter({
  subsets: ["latin"],
  weight: ["900", "800", "700", "600", "500", "400", "300"],
});

export const metadata: Metadata = {
  title: name,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased preflight`}>
        {children}
      </body>
    </html>
  );
}
