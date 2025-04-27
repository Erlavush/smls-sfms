// src/app/(faculty)/dashboard/page.tsx
'use client';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

// Example: Using Heroicons (install @heroicons/react)
// npm install @heroicons/react
import {
    UserCircleIcon,
    DocumentTextIcon,
    CalendarDaysIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline'; // Using outline style

export default function FacultyDashboardPage() {
    const { data: session, status } = useSession();

    // --- Loading State ---
    if (status === 'loading') {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6 bg-gray-50"> {/* Added bg */}
                {/* Basic Spinner Example */}
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="ml-3 text-gray-600">Loading dashboard...</p>
            </div>
        );
    }

    // --- Unauthenticated State ---
    if (status === 'unauthenticated') {
         return (
             <div className="flex h-screen flex-col items-center justify-center p-6 text-center bg-gray-50">
                 <p className="mb-4 text-xl font-semibold text-red-600">Access Denied</p>
                 <p className="mb-6 text-gray-700">You must be signed in to view this page.</p>
                 <Link href="/login">
                     <button className="inline-flex items-center gap-2 rounded-md bg-[#003153] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#002742] focus:outline-none focus:ring-2 focus:ring-[#003153] focus:ring-offset-2">
                         Go to Login
                         <ArrowRightIcon className="h-4 w-4" />
                     </button>
                 </Link>
             </div>
        );
    }

    // --- Authenticated State ---
    const userRole = (session?.user as any)?.role;
    // More friendly greeting
    const greetingName = session?.user?.name ? session.user.name.split(' ')[0] : (session?.user?.email ?? 'Faculty Member');

    return (
        // Main container with background and padding
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold leading-tight text-gray-800 sm:text-3xl">
                        Welcome back, {greetingName}!
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Your central hub for managing skills and documents. (Role: {userRole || 'N/A'})
                    </p>
                </div>

                {/* Main Content Grid - More spacing */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {/* Profile Card - Refined styling */}
                    <Link href="/profile" className="group flex flex-col justify-between rounded-lg border border-transparent bg-white p-6 shadow-lg transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-blue-100 dark:bg-gray-800 dark:hover:shadow-blue-900/30">
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <UserCircleIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    My Profile
                                </h2>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                View and manage your CV, qualifications, and personal details.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center justify-end text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                            Go to Profile
                            <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                    </Link>

                    {/* Documents Card - Refined styling */}
                     <Link href="/documents" className="group flex flex-col justify-between rounded-lg border border-transparent bg-white p-6 shadow-lg transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-green-100 dark:bg-gray-800 dark:hover:shadow-green-900/30">
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <DocumentTextIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    My Documents
                                </h2>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Upload, view, and manage your supporting credentials and files.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center justify-end text-sm font-medium text-green-600 dark:text-green-400 group-hover:underline">
                            Manage Documents
                            <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                     </Link>

                    {/* Upcoming Events Card - Refined styling */}
                     <div className="flex flex-col justify-between rounded-lg border border-transparent bg-white p-6 shadow-lg dark:bg-gray-800">
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <CalendarDaysIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    Upcoming Events
                                </h2>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                View relevant seminars, deadlines, or faculty meetings.
                            </p>
                        </div>
                         <div className="mt-4 rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-sm italic text-gray-500 dark:border-gray-700 dark:bg-gray-700/50 dark:text-gray-400">
                             No upcoming events scheduled.
                         </div>
                    </div>

                     {/* Add more cards here following a similar pattern */}

                </div>
            </div>
        </div>
    );
}