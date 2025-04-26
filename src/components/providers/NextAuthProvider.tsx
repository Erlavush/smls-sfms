// src/components/providers/NextAuthProvider.tsx
'use client'; // This component wraps SessionProvider, so it must be a Client Component

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface Props {
    children: React.ReactNode;
    // We might pass the session from the server later for optimization,
    // but for now, SessionProvider will fetch it client-side.
}

export default function NextAuthProvider({ children }: Props) {
    return <SessionProvider>{children}</SessionProvider>;
}