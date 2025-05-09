// src/app/(protected)/(faculty)/dashboard/page.tsx
'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getMyProfileData } from '@/lib/userActions'; // Assuming this fetches all needed data
import type {
    AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation, ApprovalStatus
} from '@/generated/prisma';

import {
    UserCircleIcon,
    DocumentTextIcon,
    CalendarDaysIcon, // Keep for future events
    ArrowRightIcon,
    ClockIcon, // For pending items
    ExclamationTriangleIcon, // For alerts
    BellIcon, // For announcements
    CheckCircleIcon // For approved items
} from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/outline';
// Define a type for items with status
type ItemWithStatus = {
    id: string;
    status: ApprovalStatus;
    // Add fields needed for display title (adjust as needed)
    degree?: string;
    examination?: string;
    position?: string;
    awardName?: string;
    title?: string;
    engagementTitle?: string;
    researchTitle?: string;
    paperTitle?: string;
};

// Helper to get a display name for different item types
function getItemDisplayName(item: ItemWithStatus): string {
     return item.degree ?? item.examination ?? item.title ?? item.awardName ?? item.engagementTitle ?? item.researchTitle ?? item.paperTitle ?? item.position ?? `Item ID: ${item.id}`;
}


export default function FacultyDashboardPage() {
    const { data: session, status } = useSession();
    // State to hold dashboard-specific data (pending items, counts)
    const [dashboardData, setDashboardData] = useState<{
        pendingItems: ItemWithStatus[];
        approvedCount: number;
        pendingCount: number;
        rejectedCount: number;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'authenticated') {
            setIsLoading(true);
            setError(null);
            getMyProfileData()
                .then(data => {
                    if (data.error || !data.user) {
                        setError(data.error || 'Failed to load profile data.');
                        setDashboardData(null);
                    } else {
                        // Process data to get counts and pending items
                        let pending: ItemWithStatus[] = [];
                        let approved = 0;
                        let rejected = 0;
                        const allItems = [
                            ...(data.academicQualifications ?? []),
                            ...(data.professionalLicenses ?? []),
                            ...(data.workExperiences ?? []),
                            ...(data.professionalAffiliations ?? []),
                            ...(data.awardsRecognitions ?? []),
                            ...(data.professionalDevelopments ?? []),
                            ...(data.communityInvolvements ?? []),
                            ...(data.publications ?? []),
                            ...(data.conferencePresentations ?? []),
                        ];

                        allItems.forEach(item => {
                            if (item.status === 'PENDING') {
                                pending.push(item as ItemWithStatus);
                            } else if (item.status === 'APPROVED') {
                                approved++;
                            } else if (item.status === 'REJECTED') {
                                rejected++;
                            }
                        });

                        setDashboardData({
                            pendingItems: pending,
                            approvedCount: approved,
                            pendingCount: pending.length,
                            rejectedCount: rejected,
                        });
                    }
                })
                .catch(err => {
                    console.error("Dashboard fetch error:", err);
                    setError("An error occurred while loading dashboard data.");
                    setDashboardData(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else if (status === 'unauthenticated') {
            setIsLoading(false);
            // Middleware should handle redirect, but good to have a fallback state
             setError("Access Denied. Please log in.");
        }
    }, [status]); // Re-run effect when session status changes

    // --- Loading State ---
    if (isLoading || status === 'loading') {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6 bg-gray-50">
                <div className="flex items-center gap-3 text-gray-500">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading dashboard...</span>
                </div>
            </div>
        );
    }

    // --- Error or Unauthenticated State ---
    if (error || status === 'unauthenticated') {
         return (
             <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 text-center bg-red-50">
                 <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mb-4" />
                 <p className="mb-4 text-xl font-semibold text-red-700">Access Denied or Error</p>
                 <p className="mb-6 text-red-600">{error || "You must be signed in to view this page."}</p>
                 <Link href="/login" legacyBehavior>
                     <button className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                         Go to Login
                         <ArrowRightIcon className="h-4 w-4" />
                     </button>
                 </Link>
             </div>
         );
    }

    // --- Authenticated State ---
    const userRole = (session?.user as any)?.role;
    const greetingName = session?.user?.name ? session.user.name.split(' ')[0] : (session?.user?.email ?? 'Faculty Member');

    return (
        // Main container with background and padding
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-sky-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold leading-tight text-gray-800 sm:text-3xl">
                        Welcome back, {greetingName}!
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Your central hub for managing skills and documents.
                    </p>
                </div>

                {/* Main Content Grid - Adjusted layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

                    {/* Left Column (Wider) - Pending Items & Quick Links */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Pending Approvals Card */}
                        {dashboardData && dashboardData.pendingCount > 0 && (
                            <div className="rounded-lg border border-yellow-200 bg-yellow-50 shadow-sm overflow-hidden">
                                <div className="flex items-center gap-3 border-b border-yellow-200 bg-yellow-100 px-4 py-3">
                                    <ClockIcon className="h-6 w-6 text-yellow-700" />
                                    <h2 className="text-lg font-semibold text-yellow-800">
                                        Items Pending Approval ({dashboardData.pendingCount})
                                    </h2>
                                </div>
                                <div className="p-4">
                                    {dashboardData.pendingItems.length > 0 ? (
                                        <ul className="space-y-3">
                                            {dashboardData.pendingItems.slice(0, 5).map(item => ( // Show first 5
                                                (<li key={item.id} className="text-sm text-yellow-900 flex justify-between items-center">
                                                    <span>{getItemDisplayName(item)}</span>
                                                    <Link href="/profile" className="text-xs text-blue-600 hover:underline">
                                                        View in Profile
                                                    </Link>
                                                </li>)
                                            ))}
                                            {dashboardData.pendingItems.length > 5 && (
                                                <li className="text-center text-xs text-gray-500 pt-2">
                                                    <Link href="/profile" className="hover:underline" legacyBehavior>
                                                        + {dashboardData.pendingItems.length - 5} more pending...
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    ) : (
                                        (<p className="text-sm text-yellow-700 italic">No items currently pending.</p>) // Should not happen if count > 0, but safe fallback
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Quick Links Card */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                             {/* Profile Card */}
                             <Link
                                 href="/profile"
                                 className="group flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition duration-300 ease-in-out hover:shadow-md hover:border-blue-300"
                             >
                                <> {/* Single React Fragment as the child */}
                                    <div>
                                        <div className="mb-2 flex items-center gap-3">
                                            <UserCircleIcon className="h-7 w-7 text-blue-600" />
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                My Profile
                                            </h2>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            View and manage your CV, qualifications, and details.
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-end text-sm font-medium text-blue-600 group-hover:underline">
                                        Go to Profile
                                        <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                    </div>
                                </>
                            </Link>

                            {/* Documents Card */}
                            <Link
                                href="/documents"
                                className="group flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition duration-300 ease-in-out hover:shadow-md hover:border-green-300"
                            >
                                <> {/* Single React Fragment as the child */}
                                    <div>
                                        <div className="mb-2 flex items-center gap-3">
                                            <DocumentTextIcon className="h-7 w-7 text-green-600" />
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                My Documents
                                            </h2>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Upload and manage your supporting credentials.
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-end text-sm font-medium text-green-600 group-hover:underline">
                                        Manage Documents
                                        <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                    </div>
                                </>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) - Stats & Announcements */}
                    <div className="space-y-6">
                        {/* Profile Summary/Stats Card */}
                         <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                             <h2 className="text-base font-semibold text-gray-700 mb-3">Profile Summary</h2>
                             {dashboardData ? (
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 flex items-center gap-1.5"><CheckCircleIcon className="h-4 w-4 text-green-500"/> Approved Items:</span>
                                        <span className="font-medium text-gray-800">{dashboardData.approvedCount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 flex items-center gap-1.5"><ClockIcon className="h-4 w-4 text-yellow-500"/> Pending Items:</span>
                                        <span className="font-medium text-yellow-700">{dashboardData.pendingCount}</span>
                                    </div>
                                     <div className="flex justify-between items-center">
                                        <span className="text-gray-600 flex items-center gap-1.5"><XCircleIcon className="h-4 w-4 text-red-500"/> Rejected Items:</span>
                                        <span className="font-medium text-red-600">{dashboardData.rejectedCount}</span>
                                    </div>
                                    {/* Add more stats here - e.g., Last Updated */}
                                </div>
                             ) : (
                                 <p className="text-sm text-gray-500 italic">Summary unavailable.</p>
                             )}
                         </div>

                        {/* Announcements Card (Placeholder) */}
                        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <BellIcon className="h-5 w-5 text-indigo-600" />
                                <h2 className="text-base font-semibold text-gray-700">Announcements</h2>
                            </div>
                            <div className="mt-2 rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-sm italic text-gray-500">
                                No recent announcements.
                            </div>
                            {/* Later: Map over actual announcements */}
                        </div>

                         {/* Upcoming Events Card (Placeholder) */}
                        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <CalendarDaysIcon className="h-5 w-5 text-purple-600" />
                                <h2 className="text-base font-semibold text-gray-700">Upcoming Events</h2>
                            </div>
                            <div className="mt-2 rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-sm italic text-gray-500">
                                No upcoming events scheduled.
                            </div>
                        </div>
                    </div>

                </div> {/* End Main Grid */}
            </div>
        </div>
    );
}