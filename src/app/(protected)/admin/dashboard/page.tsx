// src/app/(protected)/admin/dashboard/page.tsx
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
    BookOpenIcon, // Added for Manage Courses card
} from '@heroicons/react/24/outline'; // Using outline icons
import { getAdminDashboardStats } from '@/lib/actions/dashboardActions'; // Import the action

// Interface for Dashboard Card props
interface DashboardCardProps { // Keep existing props
    title: string;
    description: string;
    link: string;
    icon: React.ElementType;
    iconColorClass: string;
    statsPlaceholder?: string;
}

// Add animationDelayClass to the props for DashboardCard
const DashboardCard: React.FC<DashboardCardProps> = ({ // Removed: & { animationDelayClass?: string }
    title,
    description,
    link,
    icon: Icon,
    iconColorClass,
    statsPlaceholder, // Add statsPlaceholder back
    // animationDelayClass, // REMOVE
}) => (
    <Link
        href={link}
        className={`group block rounded-xl border border-slate-200 bg-white p-6 shadow-md
                      transition-all duration-300 ease-in-out
                      hover:shadow-xl hover:border-spc-blue-light hover:-translate-y-1`}
    >
        {/* REMOVED: animate-fade-in-scale ${animationDelayClass || ''} */}
        {/* The content of the card now directly inside Link */}
        <div className="flex items-start justify-between">
            <span className={`inline-block rounded-lg p-3 ${iconColorClass} bg-opacity-10`}>
                <Icon className={`h-6 w-6 ${iconColorClass}`} />
            </span>
            <ArrowRightIcon className="ml-4 h-5 w-5 text-slate-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-spc-blue-light" />
        </div>

        <div className="mt-4">
            <h2 className="text-lg font-semibold text-spc-blue-darker group-hover:text-spc-blue-DEFAULT">
                {title}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>

        {statsPlaceholder && ( // Keep if you plan to use it
            (<p className="mt-4 text-xs font-medium text-slate-500">{statsPlaceholder}</p>)
        )}
    </Link>
);


export default function AdminDashboardPage() {
    const { data: session, status } = useSession();
    const userRole = (session?.user as any)?.role;

    const [stats, setStats] = useState<{ totalFaculty: number; pendingApprovals: number } | null>(null);
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [statsError, setStatsError] = useState<string | null>(null);

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
    }, []);

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
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6 md:p-8 lg:p-10"> {/* Kept existing light gradient background */}
            <header className="mb-10"> {/* REMOVED animate-fade-in-scale if it was here */}
                <h1 className="text-3xl font-bold tracking-tight text-spc-blue-darker"> {/* UPDATED */}
                    Administrator Dashboard
                </h1>
                <p className="mt-2 text-sm text-slate-600"> {/* UPDATED */}
                    Welcome,{' '}
                    <span className="font-medium text-spc-blue-DEFAULT"> {/* UPDATED for name emphasis */}
                        {session?.user?.name ?? session?.user?.email}
                    </span>
                    ! This is the central hub for managing faculty and system settings.
                </p>
            </header>

            {/* Stats Section */}
            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"> {/* REMOVED animation classes */}
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 rounded-full bg-spc-blue-lighter p-2 text-spc-blue-DEFAULT"> {/* UPDATED */}
                            <UserGroupIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Faculty</p> {/* UPDATED */}
                            <p className="text-xl font-semibold text-spc-blue-darker"> {/* UPDATED */}
                                {isLoadingStats ? '...' : statsError ? 'Error' : stats?.totalFaculty ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
                 <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"> {/* REMOVED animation classes */}
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 rounded-full bg-amber-100 p-2 text-amber-700"> {/* UPDATED (using amber for pending) */}
                            <DocumentCheckIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Pending Approvals</p> {/* UPDATED */}
                            <p className="text-xl font-semibold text-amber-700"> {/* UPDATED (amber for pending count) */}
                                {isLoadingStats ? '...' : statsError ? 'Error' : stats?.pendingApprovals ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Cards Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                    title="Manage Faculty"
                    description="View, add, and manage faculty profiles and details."
                    link="/admin/faculty"
                    icon={UserGroupIcon}
                    iconColorClass="text-spc-blue-DEFAULT" // UPDATED
                    // REMOVE: animationDelayClass="animation-delay-300"
                />
                <DashboardCard
                    title="Document Approvals"
                    description="Review and approve/reject pending document submissions."
                    link="/admin/approvals"
                    icon={DocumentCheckIcon}
                    iconColorClass="text-amber-600" // UPDATED (consistent with stat card)
                    // REMOVE: animationDelayClass="animation-delay-400"
                />
                <DashboardCard
                    title="Specialization Matrix"
                    description="View faculty skills, expertise, and generate reports."
                    link="/admin/matrix"
                    icon={TableCellsIcon}
                    iconColorClass="text-purple-600" // Kept purple for variety, ensure it looks good
                    // REMOVE: animationDelayClass="animation-delay-500"
                />
                 <DashboardCard // Example if you add a Courses card
                    title="Manage Courses"
                    description="Define and manage academic courses and their requirements."
                    link="/admin/courses"
                    icon={BookOpenIcon} // Make sure BookOpenIcon is imported
                    iconColorClass="text-teal-600" // Example color
                    // REMOVE: animationDelayClass="animation-delay-[600ms]"
                />
            </div>
        </div>
    );
}