// src/app/(protected)/admin/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react'; // Added React for Fragment
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
    UserGroupIcon,
    DocumentCheckIcon,
    TableCellsIcon,
    ArrowRightIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline';
import { getAdminDashboardStats } from '@/lib/actions/dashboardActions';
import AestheticClock from '@/components/ui/AestheticClock';

interface DashboardCardProps {
    title: string;
    description: string;
    link: string;
    icon: React.ElementType;
    headerBgClass: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    description,
    link,
    icon: Icon,
    headerBgClass,
}) => {
    // Split title into words to style the first letter of each
    const titleWords = title.split(' ');

    return (
        <Link
            href={link}
            className={`group flex flex-col rounded-xl overflow-hidden bg-white shadow-lg
                      transition-all duration-300 ease-in-out
                      hover:shadow-2xl hover:-translate-y-1.5 border border-transparent hover:border-spc-blue-light/50`}
        >
            <div className={`p-5 ${headerBgClass} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <span className={`inline-block rounded-md p-2 bg-white/20 backdrop-blur-sm`}>
                        <Icon className={`h-6 w-6 text-white`} />
                    </span>
                    {/* Updated h2 for stylized title */}
                    <h2 className={`text-lg font-semibold text-white flex items-baseline`}> {/* items-baseline helps align text of different sizes */}
                        {titleWords.map((word, index) => (
                            <React.Fragment key={index}>
                                <span className="text-4xl font-bold leading-none align-middle mr-[-0.08em]"> {/* Increased size, bold, adjusted leading & margin */}
                                    {word.charAt(0)}
                                </span>
                                <span className="align-middle">{word.substring(1)}</span>
                                {index < titleWords.length - 1 && <span className="mx-1.5"> </span>} {/* Space between words */}
                            </React.Fragment>
                        ))}
                    </h2>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-white/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-1" />
            </div>
            <div className="p-5 flex-grow">
                <p className="text-sm text-slate-600">{description}</p>
            </div>
        </Link>
    );
};


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
                    setStats(null);
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
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-spc-blue-lighter p-6">
                 <div className="flex items-center gap-3 text-gray-500">
                    <svg className="animate-spin h-5 w-5 text-spc-blue-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading admin dashboard...</span>
                </div>
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
        <div className="min-h-[calc(100vh-4rem)] bg-spc-blue-lighter p-6 md:p-8 lg:p-10">
            <header className="mb-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-spc-blue-darker">
                        Administrator Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Welcome,{' '}
                        <span className="font-medium text-spc-blue-DEFAULT">
                            {session?.user?.name ?? session?.user?.email}
                        </span>
                        ! This is the central hub for managing faculty and system settings.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <AestheticClock />
                </div>
            </header>

            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-spc-blue-main">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 rounded-full bg-spc-blue-lighter p-2.5 text-spc-blue-main">
                            <UserGroupIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Faculty</p>
                            <p className="text-xl font-semibold text-spc-blue-darker">
                                {isLoadingStats ? '...' : statsError ? 'Error' : stats?.totalFaculty ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
                 <div className="rounded-lg bg-white p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-amber-500">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 rounded-full bg-amber-100 p-2.5 text-amber-700">
                            <DocumentCheckIcon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
                            <p className="text-xl font-semibold text-amber-700">
                                {isLoadingStats ? '...' : statsError ? 'Error' : stats?.pendingApprovals ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                    title="Manage Faculty"
                    description="View, add, and manage faculty profiles and details."
                    link="/admin/faculty"
                    icon={UserGroupIcon}
                    headerBgClass="bg-spc-blue-main"
                />
                <DashboardCard
                    title="Document Approvals"
                    description="Review and approve/reject pending document submissions."
                    link="/admin/approvals"
                    icon={DocumentCheckIcon}
                    headerBgClass="bg-amber-600"
                />
                <DashboardCard
                    title="Specialization Matrix"
                    description="View faculty skills, expertise, and generate reports."
                    link="/admin/matrix"
                    icon={TableCellsIcon}
                    headerBgClass="bg-purple-600"
                />
                 <DashboardCard
                    title="Manage Courses"
                    description="Define and manage academic courses and their requirements."
                    link="/admin/courses"
                    icon={BookOpenIcon}
                    headerBgClass="bg-teal-600"
                />
            </div>
        </div>
    );
}