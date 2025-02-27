import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { name, description } from "./package";
import { cx } from "@/util/cx";
import "./globals.css";

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
      <body className={cx(font.className, "antialiased preflight")}>
        {children}
      </body>
    </html>
  );
}
