// src/app/(protected)/layout.tsx
import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

// No font or globals.css imports here

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}