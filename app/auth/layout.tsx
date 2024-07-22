import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "lease calculator App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-white">{children}</div>;
}
