'use client'; // Needs to be a client component to use the hook

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
    const { data: session, status } = useSession();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4 text-[#003153]">Welcome to SMLS-SFMS!</h1>
            {status === 'loading' && (
                <p className="text-gray-500">Loading session...</p>
            )}
            {status === 'authenticated' && session?.user && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <p>Signed in as: <strong>{session.user.email}</strong></p>
                    <p>Role: <strong>{(session.user as any).role}</strong></p>
                    <button
                        onClick={() => signOut()}
                        className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow"
                    >
                        Sign Out
                    </button>
                </div>
            )}
            {status === 'unauthenticated' && (
                 <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <p>You are not signed in.</p>
                    <Link href="/login" legacyBehavior>
                       <button
                          className="mt-2 px-4 py-2 bg-[#003153] hover:bg-[#002742] text-white rounded shadow"
                       >
                           Sign In
                       </button>
                    </Link>
                 </div>
            )}
            <p className="mt-4">This is the homepage content.</p>
        </div>
    );
}