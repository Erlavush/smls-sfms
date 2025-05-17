// src/app/(protected)/(faculty)/dashboard/page.tsx
'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getMyProfileData } from '@/lib/userActions';
import type {
    AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation, ApprovalStatus
} from '@/generated/prisma';

import {
    UserCircleIcon,
    DocumentTextIcon,
    ArrowRightIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    SparklesIcon, // For a fresh dashboard feel
} from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid'; // Using solid for more impact on status

type ItemWithStatus = {
    id: string;
    status: ApprovalStatus;
    degree?: string;
    examination?: string;
    position?: string;
    awardName?: string;
    title?: string;
    engagementTitle?: string;
    researchTitle?: string;
    paperTitle?: string;
};

function getItemDisplayName(item: ItemWithStatus): string {
     return item.degree ?? item.examination ?? item.title ?? item.awardName ?? item.engagementTitle ?? item.researchTitle ?? item.paperTitle ?? item.position ?? `Item ID: ${item.id}`;
}

export default function FacultyDashboardPage() {
    const { data: session, status } = useSession();
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
            setIsLoading(true); setError(null);
            getMyProfileData()
                .then(data => {
                    if ('error' in data) {
                        setError(data.error || 'Failed to load profile data.'); setDashboardData(null);
                    } else if (!data.user) {
                        setError('Failed to load user details from profile data.'); setDashboardData(null);
                    } else {
                        let pending: ItemWithStatus[] = []; let approved = 0; let rejected = 0;
                        const allItems = [
                            ...(data.academicQualifications ?? []), ...(data.professionalLicenses ?? []),
                            ...(data.workExperiences ?? []), ...(data.professionalAffiliations ?? []),
                            ...(data.awardsRecognitions ?? []), ...(data.professionalDevelopments ?? []),
                            ...(data.communityInvolvements ?? []), ...(data.publications ?? []),
                            ...(data.conferencePresentations ?? []),
                        ];
                        allItems.forEach(item => {
                            if (item.status === 'PENDING') pending.push(item as ItemWithStatus);
                            else if (item.status === 'APPROVED') approved++;
                            else if (item.status === 'REJECTED') rejected++;
                        });
                        setDashboardData({ pendingItems: pending, approvedCount: approved, pendingCount: pending.length, rejectedCount: rejected });
                    }
                })
                .catch(err => { setError("An error occurred."); setDashboardData(null); })
                .finally(() => setIsLoading(false));
        } else if (status === 'unauthenticated') {
            setIsLoading(false); setError("Access Denied. Please log in.");
        }
    }, [status]);

    if (isLoading || status === 'loading') {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6 bg-spc-blue-lighter">
                <div className="flex items-center gap-3 text-gray-500">
                    <svg className="animate-spin h-6 w-6 text-spc-blue-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Loading your dashboard...</span>
                </div>
            </div>
        );
    }

    if (error || status === 'unauthenticated') {
         return (
             <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 text-center bg-red-50">
                 <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mb-4" />
                 <p className="mb-4 text-xl font-semibold text-red-700">Access Denied or Error</p>
                 <p className="mb-6 text-red-600">{error || "You must be signed in to view this page."}</p>
                 <Link href="/login" legacyBehavior>
                     <button className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105"> Go to Login <ArrowRightIcon className="h-4 w-4" /> </button>
                 </Link>
             </div>
         );
    }

    const greetingName = session?.user?.name ? session.user.name.split(' ')[0] : (session?.user?.email ?? 'Faculty Member');

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-spc-blue-lighter p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-spc-blue-darker flex items-center gap-2">
                        <SparklesIcon className="h-8 w-8 text-smls-gold" /> {/* Added a touch of gold */}
                        Welcome back, {greetingName}!
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Your central hub for managing your professional profile and documents.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                    {/* Left Column - Pending Items & Quick Links */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Pending Approvals Card */}
                        {dashboardData && dashboardData.pendingCount > 0 && (
                            <div className="rounded-xl border border-amber-300 bg-amber-50 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                                <div className="flex items-center gap-3 border-b border-amber-200 bg-amber-100 px-5 py-4">
                                    <ClockIcon className="h-7 w-7 text-amber-600" />
                                    <h2 className="text-lg font-semibold text-amber-800">
                                        Items Pending Approval ({dashboardData.pendingCount})
                                    </h2>
                                </div>
                                <div className="p-5">
                                    {dashboardData.pendingItems.length > 0 ? (
                                        <ul className="space-y-3">
                                            {dashboardData.pendingItems.slice(0, 5).map(item => (
                                                <li key={item.id} className="text-sm text-amber-900 flex justify-between items-center py-1.5 border-b border-amber-100 last:border-b-0">
                                                    <span className="font-medium">{getItemDisplayName(item)}</span>
                                                    <Link href="/profile" className="text-xs text-spc-blue-main hover:underline font-semibold">
                                                        View in Profile →
                                                    </Link>
                                                </li>
                                            ))}
                                            {dashboardData.pendingItems.length > 5 && (
                                                <li className="text-center text-xs text-gray-500 pt-3">
                                                    <Link href="/profile" className="hover:underline font-medium" legacyBehavior>
                                                        + {dashboardData.pendingItems.length - 5} more pending...
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-amber-700 italic">No items currently pending.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Quick Links Grid */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                             {/* Profile Card */}
                             <Link
                                 href="/profile"
                                 className="group flex flex-col justify-between rounded-xl border border-gray-200/80 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-spc-blue-main/50 hover:-translate-y-1"
                             >
                                <div>
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="p-2.5 rounded-lg bg-spc-blue-lighter text-spc-blue-main ring-1 ring-spc-blue-light/30">
                                            <UserCircleIcon className="h-7 w-7" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-spc-blue-darker group-hover:text-spc-blue-main">
                                            My Profile
                                        </h2>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        View, update, and manage your CV, qualifications, and personal details.
                                    </p>
                                </div>
                                <div className="mt-5 flex items-center justify-end text-sm font-semibold text-spc-blue-main group-hover:underline">
                                    Go to Profile
                                    <ArrowRightIcon className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                </div>
                            </Link>

                            {/* Documents Card */}
                            <Link
                                href="/documents"
                                className="group flex flex-col justify-between rounded-xl border border-gray-200/80 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:border-green-500/50 hover:-translate-y-1"
                            >
                                <div>
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="p-2.5 rounded-lg bg-green-50 text-green-600 ring-1 ring-green-200/50">
                                            <DocumentTextIcon className="h-7 w-7" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-spc-blue-darker group-hover:text-green-600">
                                            My Documents
                                        </h2>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Access all your uploaded supporting documents and credentials in one place.
                                    </p>
                                </div>
                                <div className="mt-5 flex items-center justify-end text-sm font-semibold text-green-600 group-hover:underline">
                                    View Documents
                                    <ArrowRightIcon className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) - Profile Summary */}
                    <div className="space-y-6">
                         <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-lg">
                             <h2 className="text-lg font-semibold text-spc-blue-darker mb-4 border-b border-gray-100 pb-2">Profile Summary</h2>
                             {dashboardData ? (
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 flex items-center gap-2"><CheckCircleIcon className="h-5 w-5 text-green-500"/> Approved Items:</span>
                                        <span className="font-semibold text-gray-800 bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{dashboardData.approvedCount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 flex items-center gap-2"><ClockIcon className="h-5 w-5 text-amber-500"/> Pending Items:</span>
                                        <span className="font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">{dashboardData.pendingCount}</span>
                                    </div>
                                     <div className="flex justify-between items-center">
                                        <span className="text-gray-600 flex items-center gap-2"><XCircleIcon className="h-5 w-5 text-red-500"/> Rejected Items:</span>
                                        <span className="font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">{dashboardData.rejectedCount}</span>
                                    </div>
                                </div>
                             ) : (
                                 <p className="text-sm text-gray-500 italic">Summary data is loading...</p>
                             )}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}