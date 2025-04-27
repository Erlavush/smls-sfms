// src/app/admin/dashboard/page.tsx
'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link'; // For linking to other admin sections later

export default function AdminDashboardPage() {
    const { data: session, status } = useSession();

    // Note: The middleware should already prevent non-admins from reaching here.
    // This check is mostly for display purposes or as an extra layer.
    const userRole = (session?.user as any)?.role;

    if (status === 'loading') {
        return <div className="p-6">Loading admin dashboard...</div>;
    }

    // Extra check, though middleware is primary protection
    if (status !== 'authenticated' || userRole !== 'ADMIN') {
         return <div className="p-6">Access Denied. You do not have permission to view this page.</div>;
    }

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-semibold text-[#003153]">
                Administrator Dashboard
            </h1>

            <p className="mb-4">
                Welcome, Administrator {session?.user?.name ?? session?.user?.email}!
            </p>

            <p>This is the central hub for managing faculty and system settings.</p>

            {/* Placeholder sections for Admin features */}
             <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded border border-gray-200 bg-white p-4 shadow">
                    <h2 className="mb-2 text-lg font-medium text-[#003153]">Manage Faculty</h2>
                    <p className="text-sm text-gray-600">View and manage faculty profiles.</p>
                     {/* <Link href="/admin/faculty">Go</Link> */}
                </div>
                 <div className="rounded border border-gray-200 bg-white p-4 shadow">
                    <h2 className="mb-2 text-lg font-medium text-[#003153]">Document Approvals</h2>
                    <p className="text-sm text-gray-600">Review pending document submissions.</p>
                     {/* <Link href="/admin/approvals">Go</Link> */}
                </div>
                 <div className="rounded border border-gray-200 bg-white p-4 shadow">
                    <h2 className="mb-2 text-lg font-medium text-[#003153]">Specialization Matrix</h2>
                    <p className="text-sm text-gray-600">View faculty skills and expertise.</p>
                     {/* <Link href="/admin/matrix">Go</Link> */}
                </div>
                 {/* Add more admin sections as needed */}
            </div>
        </div>
    );
}