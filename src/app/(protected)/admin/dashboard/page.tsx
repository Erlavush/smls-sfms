// src/app/admin/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
    UserGroupIcon,
    DocumentCheckIcon,
    TableCellsIcon,
    ChartBarIcon, // Added for stats
    ArrowRightIcon,
} from '@heroicons/react/24/outline'; // Using outline icons
import { getAdminDashboardStats } from '@/lib/actions/dashboardActions'; // Import the action

// Interface for Dashboard Card props
interface DashboardCardProps {
    title: string;
    description: string;
    link: string;
    icon: React.ElementType;
    iconColorClass: string; // Added for icon background color
    statsPlaceholder?: string; // Optional placeholder for stats like counts
}

// Reusable Dashboard Card Component
const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    description,
    link,
    icon: Icon,
    statsPlaceholder,
    iconColorClass,
}) => (
    <Link href={link} legacyBehavior>
        {/* Enhanced Card Styling */}
        <a className="group block rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:border-blue-200 hover:-translate-y-1">
            <div className="flex items-start justify-between">
                {/* Icon with background */}
                <span className={`inline-block rounded-lg p-3 ${iconColorClass} bg-opacity-10`}>
                    <Icon className={`h-6 w-6 ${iconColorClass}`} />
                </span>
                {/* Arrow Icon on hover */}
                <ArrowRightIcon className="ml-4 h-5 w-5 text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                    {title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">{description}</p>
            </div>

            {statsPlaceholder && (
                <p className="mt-4 text-xs font-medium text-gray-500">{statsPlaceholder}</p>
            )}
            {/* Removed the explicit "Go to section" link text, the whole card is the link */}
        </a>
    </Link>
);


export default function AdminDashboardPage() {
    const { data: session, status } = useSession();
    const userRole = (session?.user as any)?.role;

    // --- State for Dashboard Stats ---
    const [stats, setStats] = useState<{ totalFaculty: number; pendingApprovals: number } | null>(null);
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [statsError, setStatsError] = useState<string | null>(null);

    // --- Fetch Stats on Mount ---
    useEffect(() => {
        setIsLoadingStats(true);
        setStatsError(null);
        getAdminDashboardStats()
            .then(response => {
                if (response.success && response.stats) {
                    setStats(response.stats);
                } else {
                    setStatsError(response.error || 'Failed to load dashboard statistics.');
                    setStats(null); // Clear stats on error
                }
            })
            .catch(err => {
                console.error("Dashboard stats fetch error:", err);
                setStatsError('An unexpected error occurred while fetching statistics.');
                setStats(null);
            })
            .finally(() => {
                setIsLoadingStats(false);
            });
    }, []); // Empty dependency array means run once on mount

    if (status === 'loading') {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6">
                <p className="text-gray-500">Loading admin dashboard...</p>
                {/* Consider adding a spinner component here */}
            </div>
        );
    }

    if (status === 'unauthenticated' || userRole !== 'ADMIN') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-red-50 p-6">
                <p className="text-center text-red-700">
                    Access Denied. <br /> You do not have permission to view this page.
                </p>
            </div>
        );
    }

    return (
        // Apply gradient background and adjust padding
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6 md:p-8 lg:p-10">
            <header className="mb-10"> {/* Increased bottom margin */}
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Administrator Dashboard
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Welcome,{' '}
                    <span className="font-medium">
                        {session?.user?.name ?? session?.user?.email}
                    </span>
                    ! This is the central hub for managing faculty and system settings.
                </p>
            </header>

            {/* Stats Section (Placeholder) */}
            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Example Stat Card */}
                <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 rounded-full bg-blue-100 p-2 text-blue-600">
                            <UserGroupIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Faculty</p>
                            <p className="text-xl font-semibold text-gray-900">
                                {/* Display count, loading, or error */}
                                {isLoadingStats ? '...' : statsError ? 'Error' : stats?.totalFaculty ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
                 <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 rounded-full bg-yellow-100 p-2 text-yellow-600">
                            <DocumentCheckIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                            <p className="text-xl font-semibold text-gray-900">
                                {/* Display count, loading, or error */}
                                {isLoadingStats ? '...' : statsError ? 'Error' : stats?.pendingApprovals ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Add more stat cards as needed */}
            </div>

            {/* Dashboard Cards Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                    title="Manage Faculty"
                    description="View, add, and manage faculty profiles and details."
                    link="/admin/faculty"
                    icon={UserGroupIcon}
                    iconColorClass="text-blue-600" // Pass color class
                />
                <DashboardCard
                    title="Document Approvals"
                    description="Review and approve/reject pending document submissions."
                    link="/admin/approvals"
                    icon={DocumentCheckIcon}
                    iconColorClass="text-yellow-600" // Pass color class
                />
                <DashboardCard
                    title="Specialization Matrix"
                    description="View faculty skills, expertise, and generate reports."
                    link="/admin/matrix"
                    icon={TableCellsIcon}
                    iconColorClass="text-purple-600" // Pass color class
                />
                {/* Add more DashboardCard components here as needed for future sections */}
            </div>
        </div>
    );
}