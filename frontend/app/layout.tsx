import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Labdox",
  description: "AI Powered Interview Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}