import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { routes } from "./routes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techeer Tree",
  description: "Good-Night-Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {routes.map(({ path, component }) =>
          path === "/" ? children : component
        )}
      </body>
    </html>
  );
}
