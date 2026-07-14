import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design work, the efficient way",
  description:
    "Innovative design solutions for technology firms and emerging businesses weary of the typical aesthetic methodology. Arriving shortly.",
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