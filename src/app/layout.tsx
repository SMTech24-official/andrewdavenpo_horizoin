import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Event Horizon",
  description: "Event Horizon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <body className={`${lato.className} text-white antialiased`}>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
