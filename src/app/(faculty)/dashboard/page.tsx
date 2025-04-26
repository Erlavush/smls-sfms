// src/app/(faculty)/dashboard/page.tsx
'use client'; // Mark as Client Component to potentially use hooks later
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react'; // Can use this to show user info

export default function FacultyDashboardPage() {
    const { data: session, status } = useSession();

    // You can add loading state based on session status if needed
    if (status === 'loading') {
        return <div className="p-6">Loading dashboard...</div>;
    }

    // Basic check if authenticated (though middleware/layout should handle this ideally)
    if (status === 'unauthenticated') {
         // This shouldn't usually be reached if protected routes are set up correctly
         // Redirecting or showing an error might be better.
        return <div className="p-6">Access Denied. Please sign in.</div>;
    }

    // Get user role (added in callbacks)
    const userRole = (session?.user as any)?.role;

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-semibold text-[#003153]">
                Faculty Dashboard
            </h1>

            {session?.user && (
                <p className="mb-4">
                    Welcome, {session.user.name ?? session.user.email}!
                    (Role: {userRole})
                </p>
            )}

            <p>This is where faculty-specific information and actions will go.</p>

            {/* Example placeholder sections */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Wrap Profile card with Link */}
                <Link href="/profile" className="block rounded border border-gray-200 bg-white p-4 shadow transition hover:shadow-lg">
                     <h2 className="mb-2 text-lg font-medium text-[#003153]">My Profile</h2>
                     <p className="text-sm text-gray-600">View or update your profile details.</p>
                </Link>
                {/* End Profile card Link */}

                <div className="rounded border border-gray-200 bg-white p-4 shadow"> {/* Document Card - Add link later */}
                    <h2 className="mb-2 text-lg font-medium text-[#003153]">My Documents</h2>
                    <p className="text-sm text-gray-600">Upload and manage your credentials.</p>
                </div>
                <div className="rounded border border-gray-200 bg-white p-4 shadow"> {/* Events Card */}
                    <h2 className="mb-2 text-lg font-medium text-[#003153]">Upcoming Events</h2>
                    <p className="text-sm text-gray-600">View relevant seminars or deadlines.</p>
                </div>
            </div>
        </div>
    );
}