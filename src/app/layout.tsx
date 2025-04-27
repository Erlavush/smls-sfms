// src/app/layout.tsx
import "./globals.css"; // Ensure this is imported EARLY and ONLY HERE
import type { Metadata } from "next";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import { Inter } from 'next/font/google'; // Import the Inter font

// Configure the Inter font
const inter = Inter({
  subsets: ['latin'], // Specify character subsets you need
  display: 'swap', // Use 'swap' for better perceived performance
  variable: '--font-inter', // Define a CSS variable for the font
});

export const metadata: Metadata = {
  title: "SMLS-SFMS",
  description: "Skills and Faculty Management System",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    // Apply the font variable to the html tag
    <html lang="en" className={`${inter.variable}`}>
      <body> {/* The font variable will cascade down */}
         <NextAuthProvider>
           {children}
         </NextAuthProvider>
      </body>
    </html>
  );
}