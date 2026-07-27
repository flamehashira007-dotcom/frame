import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frameonix Studio — Web Design & Development Agency",
  description:
    "Frameonix Studio is a full-service web design and development agency helping SaaS, e-commerce, and creative brands turn ideas into exceptional digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}