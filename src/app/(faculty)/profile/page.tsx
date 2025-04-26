// src/app/(faculty)/profile/page.tsx
'use client'; // To use useSession hook

import React from 'react';
import { useSession } from 'next-auth/react';

// We'll define a proper User type later in src/types
interface SessionUser {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null; // Assuming role is added to session
}

export default function ProfilePage() {
    const { data: session, status } = useSession();

    // Type assertion for user data from session
    const user = session?.user as SessionUser | undefined;

    if (status === 'loading') {
        return <div className="p-6">Loading profile...</div>;
    }

    if (status === 'unauthenticated' || !user) {
        // Middleware should handle this, but good as a fallback
        return <div className="p-6">Access Denied. Please sign in.</div>;
    }

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-semibold text-[#003153]">
                My Profile
            </h1>

            <div className="rounded border border-gray-200 bg-white p-6 shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500">Name:</label>
                    <p className="text-lg text-gray-900">{user.name ?? 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500">Email:</label>
                    <p className="text-lg text-gray-900">{user.email ?? 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500">Role:</label>
                    <p className="text-lg text-gray-900">{user.role ?? 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500">User ID:</label>
                    <p className="text-sm text-gray-700">{user.id ?? 'N/A'}</p>
                </div>

                {/* Placeholder for edit button/functionality */}
                <div className="mt-6">
                     <button
                        // onClick={handleEdit} // Add edit functionality later
                        className="rounded bg-[#003153] px-4 py-2 text-white shadow hover:bg-[#002742] focus:outline-none focus:ring-2 focus:ring-[#003153] focus:ring-offset-2 disabled:opacity-50"
                        disabled // Disable button for now
                    >
                        Edit Profile (Coming Soon)
                    </button>
                </div>
            </div>

             {/* Later: Add sections for CV details fetched from DB */}

        </div>
    );
}