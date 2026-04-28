import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZulCode",
  description: "Aprenda programação de forma gamificada",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-zul-dark text-white min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
