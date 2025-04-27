// src/app/layout.tsx
import "./globals.css"; // Ensure this is imported EARLY
import type { Metadata } from "next";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
// Removed font imports/setup

export const metadata: Metadata = {
  title: "SMLS-SFMS",
  description: "Skills and Faculty Management System",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      {/* Simple body tag, no custom font classes */}
      <body>
         <NextAuthProvider>
           <main>{children}</main>
         </NextAuthProvider>
      </body>
    </html>
  );
}