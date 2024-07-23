import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/providers";
import DeleteModal from "@/components/Home/DeleteModal";
import ShareModal from "@/components/Home/ShareModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lease Calculator App",
  description: "Test App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className + " " + `bg-white`}>
        <Providers>
          <DeleteModal />
          <ShareModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
