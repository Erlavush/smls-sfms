// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "@/components/providers/NextAuthProvider"; // Import the provider

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
        {/* Wrap the main content (or entire body content) with the provider */}
        <NextAuthProvider>
           {/* You can add global layout elements like Header/Footer here if needed */}
           {/* Make sure they are inside NextAuthProvider if they need session data */}
           <main>{children}</main> {/* Page content */}
        </NextAuthProvider>
      </body>
    </html>
  );
}