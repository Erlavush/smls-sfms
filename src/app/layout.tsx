// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // Import global styles

export const metadata: Metadata = {
  title: "SMLS-SFMS",
  description: "Skills and Faculty Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI can go here (e.g., header, sidebar if needed globally) */}
        <main>{children}</main> {/* Page content will be injected here */}
        {/* Footer can go here */}
      </body>
    </html>
  );
}